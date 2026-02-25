import { Creature } from '@src/character_sheet/creature';
import { CombatTeam, FightState } from '@src/combat/combat_scenario';
import { Grimoire } from '@src/monsters/grimoire';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  setCurrentCharacterSheet,
  getCurrentCharacterSheet,
  clearAllCharacterSheets,
} from '@src/character_sheet/current_character_sheet';
import { RiseBaseClass, RiseWeaponTag } from '@src/character_sheet/rise_data';
import {
  getWeaponAccuracy,
  getWeaponDamageDice,
  getWeaponPowerMultiplier,
  MonsterWeapon,
  MONSTER_WEAPONS,
} from '@src/monsters/weapons';
import { ActiveAbility } from '@src/abilities/active_abilities';
import { calculateStrikeDamage } from '@src/latex/monsters/player_abilities';
import { rollD10, rollDice } from '@src/combat/dice';
import { selectTarget } from '@src/combat/combat_targeting';

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

  // Elite Area Attack
  if (attacker.elite) {
    const areaTargets = getPotentialTargets(team, state);
    for (const areaTarget of areaTargets) {
      state.attacksByTeam[team.name]++;
      // Area attacks for elites are currently generic; we can keep them that way for now
      // or refine them later.
      const { damage, hit } = resolveAttack(attacker, areaTarget, undefined, -2);
      if (hit) state.hitsByTeam[team.name]++;

      state.hp[areaTarget.id] -= damage;

      if (state.hp[areaTarget.id] <= 0) {
        handleCreatureDeath(areaTarget, state);
      }
    }
    const areaResult = checkVictory(state);
    if (areaResult.status !== CombatStepStatus.Ongoing) return areaResult;
  }

  // Standard Attack
  const potentialTargetsAfterArea = getPotentialTargets(team, state);
  if (potentialTargetsAfterArea.length === 0)
    return { status: CombatStepStatus.Ongoing, winner: null };

  const defender = selectTarget(attacker, potentialTargetsAfterArea, state);
  state.attacksByTeam[team.name]++;

  // If the monster has any active weapon-based abilities, arbitrarily choose the first.
  // In the future, we should find the best ability and use it.
  const explicitAbility = attacker.getActiveAbilities().filter((ability) => ability.weapon)[0];

  const { damage, hit } = resolveAttack(attacker, defender, explicitAbility);
  if (hit) state.hitsByTeam[team.name]++;

  state.hp[defender.id] -= damage;

  if (state.hp[defender.id] <= 0) {
    handleCreatureDeath(defender, state);
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
  explicitAbility?: ActiveAbility,
  rankOffset: number = 0,
): { damage: number; hit: boolean } {
  const roll = rollD10(true);
  let accuracy = attacker.accuracy;

  if (explicitAbility?.weapon) {
    accuracy += getWeaponAccuracy(explicitAbility.weapon);
  }

  const total = roll + accuracy;
  const targetDefense = defender.armor_defense;

  if (total >= targetDefense + 10) {
    // Critical Hit: Double damage
    return { damage: calculateDamage(attacker, explicitAbility, rankOffset) * 2, hit: true };
  } else if (total >= targetDefense) {
    // Regular Hit
    return { damage: calculateDamage(attacker, explicitAbility, rankOffset), hit: true };
  }

  return { damage: 0, hit: false }; // Miss
}

export function calculateDamage(
  creature: Creature,
  explicitAbility?: ActiveAbility,
  rankOffset: number = 0,
): number {
  // For now, we ignore the fact that attacks should theoretically be intrinsically either magical or mundane, and we just use the highest power on the premise that monsters should generally have abilities that use their highest power.
  const power = Math.max(creature.mundane_power, creature.magical_power);
  const rank = Math.floor((creature.level + 2) / 3) + rankOffset;
  const halfPower = Math.floor(power / 2);

  if (explicitAbility && explicitAbility.kind === 'maneuver' && explicitAbility.weapon) {
    const diceExpr = calculateStrikeDamage(creature, explicitAbility, explicitAbility.isMagical);
    return rollDice(diceExpr);
  }

  // Standard targeted medium damage ranks from sheet_worker.ts
  const damageTable: Record<number, string> = {
    [-1]: String(halfPower),
    0: `1d4+${halfPower}`,
    1: `1d6+${halfPower}`,
    2: `1d10+${halfPower}`,
    3: `1d8+${power}`,
    4: `${halfPower}d6`,
    5: `${halfPower + 1}d6`,
    6: `${halfPower + 1}d8`,
    7: `${halfPower + 1}d10`,
  };

  const diceExpr = damageTable[rank];
  if (!diceExpr) {
    throw new Error(`Unknown rank: ${rank}`);
  }
  return rollDice(diceExpr);
}
