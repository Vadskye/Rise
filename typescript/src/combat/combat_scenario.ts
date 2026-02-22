import { Creature } from '@src/character_sheet/creature';
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

export interface CombatSimulationResult {
  averageRounds: number;
  winRates: Record<string, number>;
  averageHpPercentRemaining: Record<string, number>;
  averageHitRates: Record<string, number>;
}

export interface CombatTeam {
  name: string;
  members: Creature[];
}

/**
 * Internal state for a single fight simulation iteration.
 */
interface FightState {
  hp: Record<string, number>;
  memberToTeam: Record<string, CombatTeam>;
  aliveMembersByTeam: Record<string, Creature[]>;
  initialTotalHpByTeam: Record<string, number>;
  hitsByTeam: Record<string, number>;
  attacksByTeam: Record<string, number>;
}

/**
 * Outcome of a single combat step or action.
 */
enum CombatStepStatus {
  Ongoing,
  Victory,
  Draw,
}

/**
 * Result of a single combat action, tracking status and potential winner.
 */
interface CombatStepResult {
  status: CombatStepStatus;
  winner: string | null;
}

/**
 * Manages a combat encounter between multiple creatures.
 */
export class CombatScenario {
  constructor(public teams: CombatTeam[]) {}

  /**
   * Simulates the combat until a victor is determined.
   * Runs multiple iterations to gather statistics.
   */
  public simulate(iterations: number = 200): CombatSimulationResult {
    if (this.teams.length < 2) {
      throw new Error('Combat requires at least two teams.');
    }

    const stats = this.runSimulationIterations(iterations);

    this.logSimulationResults(stats);

    return stats;
  }

  private runSimulationIterations(iterations: number): CombatSimulationResult {
    let totalRounds = 0;
    const wins: Record<string, number> = {};
    const totalHpPercents: Record<string, number> = {};
    const totalHits: Record<string, number> = {};
    const totalAttacks: Record<string, number> = {};

    for (const t of this.teams) {
      wins[t.name] = 0;
      totalHpPercents[t.name] = 0;
      totalHits[t.name] = 0;
      totalAttacks[t.name] = 0;
    }

    for (let i = 0; i < iterations; i++) {
      const result = this.simulateSingleFight();
      totalRounds += result.rounds;
      if (result.winner) {
        wins[result.winner]++;
      }
      for (const name in result.teamHpPercents) {
        totalHpPercents[name] += result.teamHpPercents[name];
        totalHits[name] += result.hitsByTeam[name];
        totalAttacks[name] += result.attacksByTeam[name];
      }
    }

    const winRates: Record<string, number> = {};
    const averageHpPercentRemaining: Record<string, number> = {};
    const averageHitRates: Record<string, number> = {};

    for (const name in wins) {
      winRates[name] = (wins[name] / iterations) * 100;
      averageHpPercentRemaining[name] = totalHpPercents[name] / iterations;
      averageHitRates[name] =
        totalAttacks[name] > 0 ? (totalHits[name] / totalAttacks[name]) * 100 : 0;
    }

    return {
      averageRounds: totalRounds / iterations,
      winRates,
      averageHpPercentRemaining,
      averageHitRates,
    };
  }

  private logSimulationResults(stats: CombatSimulationResult): void {
    console.log('--- Combat Simulation Results ---');
    console.log(`Teams: ${this.teams.map((t) => `${t.members.length} ${t.name}`).join(' vs ')}`);
    console.log(`Average Rounds: ${stats.averageRounds.toFixed(2)}`);
    for (const name in stats.winRates) {
      console.log(
        `${name} Win Rate: ${stats.winRates[name].toFixed(2)}% | Avg HP Remaining: ${stats.averageHpPercentRemaining[name].toFixed(2)}% | Hit Rate: ${stats.averageHitRates[name].toFixed(2)}%`,
      );
    }
    console.log('---------------------------------');
  }

  private simulateSingleFight(): {
    winner: string | null;
    rounds: number;
    teamHpPercents: Record<string, number>;
    hitsByTeam: Record<string, number>;
    attacksByTeam: Record<string, number>;
  } {
    const state = this.initializeFightState();
    const teamInitiatives = this.determineTeamInitiative();

    let rounds = 0;
    while (rounds < 100) {
      rounds++;
      for (const { team } of teamInitiatives) {
        if (state.aliveMembersByTeam[team.name].length === 0) continue;

        const result = this.executeTeamTurn(team, state);
        if (result.status !== CombatStepStatus.Ongoing) {
          return {
            winner: result.winner,
            rounds,
            teamHpPercents: this.getTeamHpPercents(state),
            hitsByTeam: state.hitsByTeam,
            attacksByTeam: state.attacksByTeam,
          };
        }
      }
    }

    return {
      winner: null,
      rounds,
      teamHpPercents: this.getTeamHpPercents(state),
      hitsByTeam: state.hitsByTeam,
      attacksByTeam: state.attacksByTeam,
    };
  }

  private initializeFightState(): FightState {
    const hp: Record<string, number> = {};
    const memberToTeam: Record<string, CombatTeam> = {};
    const aliveMembersByTeam: Record<string, Creature[]> = {};
    const initialTotalHpByTeam: Record<string, number> = {};
    const hitsByTeam: Record<string, number> = {};
    const attacksByTeam: Record<string, number> = {};

    for (const team of this.teams) {
      const aliveMembers: Creature[] = [];
      let teamInitialHp = 0;
      for (const member of team.members) {
        hp[member.id] = member.hit_points;
        memberToTeam[member.id] = team;
        aliveMembers.push(member);
        teamInitialHp += member.hit_points;
      }
      aliveMembersByTeam[team.name] = aliveMembers;
      initialTotalHpByTeam[team.name] = teamInitialHp;
      hitsByTeam[team.name] = 0;
      attacksByTeam[team.name] = 0;
    }

    return {
      hp,
      memberToTeam,
      aliveMembersByTeam,
      initialTotalHpByTeam,
      hitsByTeam,
      attacksByTeam,
    };
  }

  private getTeamHpPercents(state: FightState): Record<string, number> {
    const percents: Record<string, number> = {};
    for (const team of this.teams) {
      let currentTeamHp = 0;
      for (const member of team.members) {
        currentTeamHp += Math.max(0, state.hp[member.id]);
      }
      percents[team.name] =
        state.initialTotalHpByTeam[team.name] > 0
          ? (currentTeamHp / state.initialTotalHpByTeam[team.name]) * 100
          : 0;
    }
    return percents;
  }

  private determineTeamInitiative(): { team: CombatTeam; initiative: number }[] {
    const teamInitiatives = this.teams.map((team) => ({
      team,
      initiative: this.rollD10(false),
    }));
    teamInitiatives.sort((a, b) => b.initiative - a.initiative);
    return teamInitiatives;
  }

  private executeTeamTurn(team: CombatTeam, state: FightState): CombatStepResult {
    const attackers = [...state.aliveMembersByTeam[team.name]];
    for (const attacker of attackers) {
      if (state.hp[attacker.id] <= 0) continue;

      const result = this.executeAttackerAction(attacker, team, state);
      if (result.status !== CombatStepStatus.Ongoing) return result;
    }
    return { status: CombatStepStatus.Ongoing, winner: null };
  }

  private executeAttackerAction(
    attacker: Creature,
    team: CombatTeam,
    state: FightState,
  ): CombatStepResult {
    const potentialTargets = this.getPotentialTargets(team, state);
    if (potentialTargets.length === 0) return { status: CombatStepStatus.Ongoing, winner: null };

    // Elite Area Attack
    if (attacker.elite) {
      const areaTargets = this.getPotentialTargets(team, state);
      for (const areaTarget of areaTargets) {
        state.attacksByTeam[team.name]++;
        const { damage, hit } = this.resolveAttack(attacker, areaTarget, -2);
        if (hit) state.hitsByTeam[team.name]++;

        state.hp[areaTarget.id] -= damage;

        if (state.hp[areaTarget.id] <= 0) {
          this.handleCreatureDeath(areaTarget, state);
        }
      }
      const areaResult = this.checkVictory(state);
      if (areaResult.status !== CombatStepStatus.Ongoing) return areaResult;
    }

    // Standard Attack
    const potentialTargetsAfterArea = this.getPotentialTargets(team, state);
    if (potentialTargetsAfterArea.length === 0)
      return { status: CombatStepStatus.Ongoing, winner: null };

    const defender = this.selectTarget(attacker, potentialTargetsAfterArea, state);
    state.attacksByTeam[team.name]++;
    const { damage, hit } = this.resolveAttack(attacker, defender);
    if (hit) state.hitsByTeam[team.name]++;

    state.hp[defender.id] -= damage;

    if (state.hp[defender.id] <= 0) {
      this.handleCreatureDeath(defender, state);
    }

    return this.checkVictory(state);
  }

  private selectTarget(attacker: Creature, targets: Creature[], state: FightState): Creature {
    const logic = attacker.targetPreference;

    if (logic === 'Random') {
      const index = Math.floor(Math.random() * targets.length);
      return targets[index];
    } else if (logic === 'Vulnerable') {
      // Sort by armor_defense (lowest first), then by current HP (lowest first)
      const sorted = [...targets].sort((a, b) => {
        const defA = a.armor_defense;
        const defB = b.armor_defense;
        if (defA !== defB) return defA - defB;

        const hpA = state.hp[a.id];
        const hpB = state.hp[b.id];
        return hpA - hpB;
      });
      return sorted[0];
    } else if (logic === 'Ordered') {
      return targets[0];
    }

    throw new Error(`Unknown target preference: ${logic}`);
  }

  private getPotentialTargets(team: CombatTeam, state: FightState): Creature[] {
    const potentialTargets: Creature[] = [];
    for (const teamName in state.aliveMembersByTeam) {
      if (teamName !== team.name) {
        potentialTargets.push(...state.aliveMembersByTeam[teamName]);
      }
    }
    return potentialTargets;
  }

  private handleCreatureDeath(creature: Creature, state: FightState): void {
    const teamName = state.memberToTeam[creature.id].name;
    const teamAlive = state.aliveMembersByTeam[teamName];
    const index = teamAlive.indexOf(creature);
    if (index > -1) {
      teamAlive.splice(index, 1);
    }
  }

  private checkVictory(state: FightState): CombatStepResult {
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

  private resolveAttack(
    attacker: Creature,
    defender: Creature,
    rankOffset: number = 0,
  ): { damage: number; hit: boolean } {
    const roll = this.rollD10(true);
    let accuracy = attacker.accuracy;

    const weaponName = attacker.weapon_0_name as MonsterWeapon;
    if (MONSTER_WEAPONS.has(weaponName)) {
      accuracy += getWeaponAccuracy(weaponName);
    }

    const total = roll + accuracy;
    const targetDefense = defender.armor_defense;

    if (total >= targetDefense + 10) {
      // Critical Hit: Double damage
      return { damage: this.calculateDamage(attacker, rankOffset) * 2, hit: true };
    } else if (total >= targetDefense) {
      // Regular Hit
      return { damage: this.calculateDamage(attacker, rankOffset), hit: true };
    }

    return { damage: 0, hit: false }; // Miss
  }

  private calculateDamage(creature: Creature, rankOffset: number = 0): number {
    // For now, we ignore the fact that attacks should theoretically be intrinsically either magical or mundane, and we just use the highest power on the premise that monsters should generally have abilities that use their highest power.
    const power = Math.max(creature.mundane_power, creature.magical_power);
    const rank = Math.floor((creature.level + 2) / 3) + rankOffset;
    const halfPower = Math.floor(power / 2);

    const weaponName = creature.weapon_0_name as MonsterWeapon;
    // TODO: scale weapon damage based on a standard maneuver for the given rank
    if (MONSTER_WEAPONS.has(weaponName)) {
      const dice = getWeaponDamageDice(weaponName);
      const multiplier = getWeaponPowerMultiplier(weaponName);
      const bonus = Math.floor(power * multiplier);
      const diceExpr = `${dice.count}d${dice.size}${bonus >= 0 ? '+' : ''}${bonus}`;
      return this.rollDice(diceExpr);
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
    return this.rollDice(diceExpr);
  }

  private rollD10(exploding: boolean): number {
    const firstRoll = Math.floor(Math.random() * 10) + 1;
    if (exploding && firstRoll === 10) {
      const secondRoll = Math.floor(Math.random() * 10) + 1;
      return 10 + secondRoll;
    }
    return firstRoll;
  }

  private rollDice(expression: string): number {
    const match = expression.match(/^(\d+)d(\d+)([+-]\d+)?$/);
    if (!match) {
      return parseInt(expression, 10) || 0;
    }

    const count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const bonus = match[3] ? parseInt(match[3], 10) : 0;

    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total + bonus;
  }
}

export const sharedGrimoire = new Grimoire();

/**
 * Loads all monsters from all groups. This may be slow.
 */
export function loadAllMonsters(): void {
  if (sharedGrimoire.getMonsterNames().length === 0) {
    sharedGrimoire.addAllMonsters();
  }
}

/**
 * Retrieves a monster from the grimoire by its name.
 */
export function getMonster(name: string): Creature {
  const monster = sharedGrimoire.getMonster(name);
  if (!monster) {
    throw new Error(`Monster with name "${name}" not found in the grimoire.`);
  }
  return monster;
}

/**
 * Spawns a new instance of a monster from the grimoire.
 * This ensures the creature has its own character sheet and state.
 */
export function cloneMonster(name: string): Creature {
  const baseMonster = getMonster(name);
  const uniqueId = Math.random().toString(36).substring(7);
  const uniqueName = `${name}_${uniqueId}`;
  return baseMonster.clone(uniqueName);
}

/**
 * Creates a new creature with the specified name and optional properties.
 * Ensures the creature has its own character sheet in the global state.
 */
export function createCreature(name: string, initializer?: (creature: Creature) => void): Creature {
  // We use a unique ID to ensure this creature has its own character sheet
  const uniqueId = Math.random().toString(36).substring(7);
  const uniqueSheetName = `${name}_${uniqueId}`;

  setCurrentCharacterSheet(uniqueSheetName);
  const sheet = getCurrentCharacterSheet();
  sheet.setProperties({ name });

  const creature = new Creature(sheet);
  handleEverything();

  if (initializer) {
    initializer(creature);
  }

  return creature;
}

/**
 * Convenience method to create a character with common properties.
 */
export function createCharacter(name: string, level: number, baseClass: RiseBaseClass): Creature {
  return createCreature(name, (c) => {
    // Use setRequiredProperties if needed, but setProperties covers most basics
    c.setProperties({ level, base_class: baseClass });
  });
}

/**
 * Creates a combat team with the provided name and members.
 */
export function createTeam(name: string, members: Creature[]): CombatTeam {
  return { name, members };
}

/**
 * Creates a combat scenario with the provided teams.
 */
export function createScenario(teams: CombatTeam[]): CombatScenario {
  return new CombatScenario(teams);
}
