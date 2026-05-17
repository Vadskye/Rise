import { ActiveAbility, SimulatorReadyAttack } from '@src/abilities/active_abilities';
import { Creature } from '@src/character_sheet/creature';
import { CombatTeam, FightState } from '@src/combat/combat_scenario';
import { rollD10, rollDice } from '@src/combat/dice';
import { selectTarget } from '@src/combat/combat_targeting';
import { parseAttackEffect } from '@src/combat/parse_attack_effect';
import { DicePool } from '@src/core_mechanics/dice_pool';
import { getWeaponAccuracy } from '@src/monsters/weapons';
import { setCurrentCharacterSheet } from '@src/character_sheet/current_character_sheet';
import { handleEverything } from '@src/character_sheet/sheet_worker';

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

    // End of turn processing for attacker
    handleEndOfTurn(attacker, state);

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

  // Use cached simulator attacks
  const attacks: SimulatorReadyAttack[] = attacker.simulatorAttacks || [];

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

  executeAttack(attacker, targets, bestAttack, state, team);

  return checkVictory(state);
}

function executeAttack(
  attacker: Creature,
  targets: Creature[],
  attack: SimulatorReadyAttack,
  state: FightState,
  team: CombatTeam,
): void {
  for (const target of targets) {
    const { degree, total } = calculateHitDegree(attacker, target, attack, state);
    const hit = degree !== 'Miss';
    if (hit) state.hitsByTeam[team.name]++;

    const damage = calculateDamageDealt(degree, attack, state);

    applyDamageAndEffects(target, damage, degree, attack, state, attacker);

    if (state.verbose) {
      const typeStr = attack.areaRank !== null ? 'area' : 'strike';
      const hitStr = hit ? 'hits' : 'misses';
      const defenseStr = attack.defenses.join(', ') || 'Armor';
      console.log(
        `Round ${state.round}: ${attacker.name} uses ${attack.name} (${typeStr}) vs ${defenseStr} → ${hitStr} ${target.name} for ${damage} damage`,
      );
    }
  }
}

function findCreatureById(id: string, state: FightState): Creature | null {
  for (const team of Object.values(state.aliveMembersByTeam)) {
    for (const member of team) {
      if (member.id === id) return member;
    }
  }
  return null;
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

export function calculateHitDegree(
  attacker: Creature,
  defender: Creature,
  attack: SimulatorReadyAttack,
  state: FightState,
): { degree: 'Miss' | 'Hit' | 'Crit'; total: number } {
  const roll = rollD10(true);
  const totalAccuracy = attacker.accuracy + attack.accuracyModifier;
  const total = roll + totalAccuracy;

  const defenses = attack.defenses.length > 0 ? attack.defenses : ['armor_defense' as const];
  const targetDefense = defenses.reduce((acc, def) => acc + defender[def], 0) / defenses.length;

  if (total >= targetDefense + 10) {
    return { degree: 'Crit', total };
  } else if (total >= targetDefense) {
    return { degree: 'Hit', total };
  }
  return { degree: 'Miss', total };
}

export function calculateDamageDealt(
  hitDegree: 'Miss' | 'Hit' | 'Crit',
  attack: SimulatorReadyAttack,
  state: FightState,
): number {
  if (hitDegree === 'Miss') return 0;

  const baseDamage = rollDice(attack.damage.toString());
  if (hitDegree === 'Crit') {
    return baseDamage * 2;
  }
  return baseDamage;
}

export function applyDamageAndEffects(
  target: Creature,
  damage: number,
  hitDegree: 'Miss' | 'Hit' | 'Crit',
  attack: SimulatorReadyAttack,
  state: FightState,
  attacker: Creature,
): void {
  state.hp[target.id] -= damage;

  if (state.hp[target.id] <= 0) {
    handleCreatureDeath(target, state);
    if (state.verbose) {
      console.log(`Round ${state.round}: ${target.name} dies`);
    }
  }

  if (hitDegree !== 'Miss' && attack.debuffsToApply) {
    for (const debuffType of attack.debuffsToApply) {
      if (!state.debuffs[target.id]) {
        state.debuffs[target.id] = [];
      }
      let kind: 'brief' | 'condition' | 'poison' | 'circumstance' = 'condition';
      if (debuffType === 'grappled') {
        kind = 'circumstance';
      } else if (debuffType === 'poisoned') {
        kind = 'poison';
      }

      state.debuffs[target.id].push({
        type: debuffType,
        sourceId: attacker.id,
        debuffType: kind,
      });
      target.setProperties({ [debuffType]: '1' } as any);
      setCurrentCharacterSheet(target.id);
      handleEverything();
      if (state.verbose) {
        console.log(`Round ${state.round}: ${target.name} gains ${debuffType}`);
      }
    }
  }
}

export function handleEndOfTurn(attacker: Creature, state: FightState) {
  // 1. Elite Cleanse
  if (attacker.elite) {
    const roll = rollD10(false);
    if (roll === 10) {
      removeDebuffs(attacker, state, 2);
    } else if (roll >= 6) {
      removeDebuffs(attacker, state, 1);
    }
  }

  // 2. Expire debuffs applied by this attacker with a fixed duration
  for (const targetId in state.debuffs) {
    const debuffs = state.debuffs[targetId];
    const target = findCreatureById(targetId, state);
    if (!target) continue;

    for (let i = debuffs.length - 1; i >= 0; i--) {
      const c = debuffs[i];
      if (c.sourceId === attacker.id && c.durationRemaining !== undefined) {
        c.durationRemaining--;
        if (c.durationRemaining <= 0) {
          debuffs.splice(i, 1);
          // Update sheet
          target.setProperties({ [c.type]: false } as any);
          if (state.verbose) {
            console.log(`Round ${state.round}: Debuff ${c.type} expires on ${target.name}`);
          }
        }
      }
    }
  }
}

export function removeDebuffs(creature: Creature, state: FightState, count: number) {
  const conditions = state.debuffs[creature.id];
  if (!conditions || conditions.length === 0) return;

  for (let i = 0; i < count; i++) {
    const index = conditions.findIndex(c => c.debuffType === 'condition');
    if (index !== -1) {
      const condition = conditions.splice(index, 1)[0];
      creature.setProperties({ [condition.type]: false } as any);
      setCurrentCharacterSheet(creature.id);
      handleEverything();
      if (state.verbose) {
        console.log(`Round ${state.round}: ${creature.name} removes condition ${condition.type}`);
      }
    } else {
      break;
    }
  }
}
