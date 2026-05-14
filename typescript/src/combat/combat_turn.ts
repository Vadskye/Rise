import { Creature } from '@src/character_sheet/creature';
import { CombatTeam, FightState } from '@src/combat/combat_scenario';
import { getWeaponAccuracy } from '@src/monsters/weapons';
import { ActiveAbility, SimulatorReadyAttack } from '@src/abilities/active_abilities';
import { calculateStrikeDamage } from '@src/latex/monsters/player_abilities';
import { rollD10, rollDice } from '@src/combat/dice';
import { selectTarget } from '@src/combat/combat_targeting';
import { parseAttackEffect } from '@src/combat/parse_attack_effect';
import { DicePool } from '@src/core_mechanics/dice_pool';

/**
 * Outcome of a single combat step or action.
 */
export enum CombatStepStatus {
  Ongoing,
  Victory,
  Draw,
}

/**
 * Result of a single combat action, tracking status and potential winner.
 */
export interface CombatStepResult {
  status: CombatStepStatus;
  winner: string | null;
}

export function executeTeamTurn(team: CombatTeam, state: FightState): CombatStepResult {
  // Decrement cooldowns for all members of the team at the start of their team turn.
  // Cooldowns are tracked in state.cooldowns[creatureId][abilityName].
  for (const member of team.members) {
    const creatureCooldowns = state.cooldowns[member.id];
    if (creatureCooldowns) {
      for (const abilityName in creatureCooldowns) {
        if (creatureCooldowns[abilityName] > 0) {
          creatureCooldowns[abilityName]--;
        }
      }
    }
  }

  const attackers = [...state.aliveMembersByTeam[team.name]];
  for (const attacker of attackers) {
    if (state.hp[attacker.id] <= 0) continue;

    const result = executeAttackerAction(attacker, team, state);
    if (result.status !== CombatStepStatus.Ongoing) return result;
  }
  return { status: CombatStepStatus.Ongoing, winner: null };
}

export function executeAttackerAction(
  attacker: Creature,
  team: CombatTeam,
  state: FightState,
): CombatStepResult {
  const potentialTargets = getPotentialTargets(team, state);
  if (potentialTargets.length === 0) return { status: CombatStepStatus.Ongoing, winner: null };

  // Parse all available abilities
  const attacks: SimulatorReadyAttack[] = attacker.getActiveAbilities()
    .map((ability) => parseAttackEffect(ability, attacker))
    .filter((a): a is SimulatorReadyAttack => !!a);

  // Add default attack
  attacks.push(getDefaultAttack(attacker));
  attacks.push(getDefaultEliteAttack(attacker));

  // Elite Action
  if (attacker.elite) {
    const eliteAttacks = attacks.filter((a) => a.usageTime === 'elite');
    const result = selectAndExecuteAction(attacker, team, state, eliteAttacks);
    if (result.status !== CombatStepStatus.Ongoing) return result;
  }

  const standardAttacks = attacks.filter((a) => a.usageTime === 'standard');

  return selectAndExecuteAction(attacker, team, state, standardAttacks);
}

function scoreAttack(attack: SimulatorReadyAttack): number {
  const avgDamage = attack.damage.averageDamage();
  const accuracyFactor = (10 + attack.accuracyModifier) / 10;
  const areaFactor = attack.areaRank !== null ? 1 + attack.areaRank : 1;
  return avgDamage * accuracyFactor * areaFactor;
}

function selectAndExecuteAction(
  attacker: Creature,
  team: CombatTeam,
  state: FightState,
  availableAttacks: SimulatorReadyAttack[],
): CombatStepResult {
  const potentialTargets = getPotentialTargets(team, state);
  if (potentialTargets.length === 0) return { status: CombatStepStatus.Ongoing, winner: null };

  // Select best attack, filtering out those on cooldown
  let bestAttack: SimulatorReadyAttack | null = null;
  let bestScore = -1;

  for (const attack of availableAttacks) {
    // Check cooldown
    const currentCooldown = state.cooldowns[attacker.id]?.[attack.name] || 0;
    if (currentCooldown > 0) continue;

    const score = scoreAttack(attack);
    if (score > bestScore) {
      bestScore = score;
      bestAttack = attack;
    }
  }

  // If no attack was selected (all on cooldown or no attacks provided), skip.
  if (!bestAttack) {
    return { status: CombatStepStatus.Ongoing, winner: null };
  }

  // Set cooldown if applicable
  if (bestAttack.cooldown > 0) {
    if (!state.cooldowns[attacker.id]) {
      state.cooldowns[attacker.id] = {};
    }
    state.cooldowns[attacker.id][bestAttack.name] = bestAttack.cooldown;
  }

  state.attacksByTeam[team.name]++;

  const isAreaAttack = bestAttack.areaRank !== null;
  const targets = isAreaAttack
    ? potentialTargets.slice(0, 1 + bestAttack.areaRank!)
    : [selectTarget(attacker, potentialTargets, state)];

  for (const target of targets) {
    const { damage, hit } = resolveAttack(attacker, target, bestAttack);
    if (hit) state.hitsByTeam[team.name]++;

    state.hp[target.id] -= damage;

    if (state.hp[target.id] <= 0) {
      handleCreatureDeath(target, state);
    }
  }

  return checkVictory(state);
}

function getPotentialTargets(team: CombatTeam, state: FightState): Creature[] {
  const potentialTargets: Creature[] = [];
  for (const teamName in state.aliveMembersByTeam) {
    if (teamName !== team.name) {
      potentialTargets.push(...state.aliveMembersByTeam[teamName]);
    }
  }
  return potentialTargets;
}

export function handleCreatureDeath(creature: Creature, state: FightState): void {
  const teamName = state.memberToTeam[creature.id].name;
  const teamAlive = state.aliveMembersByTeam[teamName];
  const index = teamAlive.indexOf(creature);
  if (index > -1) {
    teamAlive.splice(index, 1);
  }
}

export function getDefaultAttack(attacker: Creature, rankOffset: number = 0): SimulatorReadyAttack {
  const power = Math.max(attacker.mundane_power, attacker.magical_power);
  const rank = Math.floor((attacker.level + 2) / 3) + rankOffset;
  const halfPower = Math.floor(power / 2);

  // Default medium damage scaling
  const damageTable: Record<number, DicePool> = {
    [-1]: DicePool.flat(halfPower),
    0: DicePool.xdyPlus(1, 4, halfPower),
    1: DicePool.xdyPlus(1, 6, halfPower),
    2: DicePool.xdyPlus(1, 10, halfPower),
    3: DicePool.xdyPlus(1, 8, power),
    4: DicePool.xdyPlus(halfPower, 6, 0),
    5: DicePool.xdyPlus(halfPower + 1, 6, 0),
    6: DicePool.xdyPlus(halfPower + 1, 8, 0),
    7: DicePool.xdyPlus(halfPower + 1, 10, 0),
  };

  return {
    name: 'Default attack',
    defenses: ['armor_defense'],
    areaRank: null,
    accuracyModifier: 0,
    damage: damageTable[rank] || DicePool.empty(),
    cooldown: 0,
    halfOnMiss: false,
    usageTime: 'standard',
  };
}

export function getDefaultEliteAttack(attacker: Creature): SimulatorReadyAttack {
  return {
    ...getDefaultAttack(attacker, -2),
    areaRank: 2, // Standard elite area rank
    name: 'Elite Area Sweep',
    usageTime: 'elite',
  };
}

export function checkVictory(state: FightState): CombatStepResult {
  const teamsWithAlive = Object.entries(state.aliveMembersByTeam).filter(
    ([_, members]) => members.length > 0,
  );

  if (teamsWithAlive.length === 1) {
    return { status: CombatStepStatus.Victory, winner: teamsWithAlive[0][0] };
  }
  if (teamsWithAlive.length === 0) {
    return { status: CombatStepStatus.Draw, winner: null };
  }
  return { status: CombatStepStatus.Ongoing, winner: null };
}

export function resolveAttack(
  attacker: Creature,
  defender: Creature,
  attack: SimulatorReadyAttack,
): { damage: number; hit: boolean } {
  const roll = rollD10(true);
  let totalAccuracy = attacker.accuracy + attack.accuracyModifier;

  const total = roll + totalAccuracy;

  // Target the average of listed defenses, or armor if none
  const defenses = attack.defenses.length > 0 ? attack.defenses : ['armor_defense' as const];
  const targetDefense = defenses.reduce((acc, def) => acc + defender[def], 0) / defenses.length;

  if (total >= targetDefense + 10) {
    // Critical Hit: Double damage
    return { damage: calculateDamage(attack) * 2, hit: true };
  } else if (total >= targetDefense) {
    // Regular Hit
    return { damage: calculateDamage(attack), hit: true };
  }

  return { damage: 0, hit: false }; // Miss
}

export function calculateDamage(attack: SimulatorReadyAttack): number {
  return rollDice(attack.damage.toString());
}
