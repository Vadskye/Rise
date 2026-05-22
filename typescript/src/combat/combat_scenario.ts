import { Creature } from '@src/character_sheet/creature';
import { Grimoire } from '@src/monsters/grimoire';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import {
  setCurrentCharacterSheet,
  getCurrentCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { RiseBaseClass } from '@src/character_sheet/rise_data';
import {
  CombatStepStatus,
  executeTeamTurn,
  getDefaultAttack,
  getDefaultEliteAttack,
} from '@src/combat/combat_turn';
import { rollD10 } from '@src/combat/dice';
import { parseAttackEffect } from '@src/combat/parse_attack_effect';
import { SimulatorReadyAttack } from '@src/abilities';
import { StockCharacters } from '@src/character_sheet/stock_characters';

export interface CombatSimulationResult {
  averageTurns: number;
  winRates: Record<string, number>;
  averageHpPercentRemaining: Record<string, number>;
  averageHitRates: Record<string, number>;
  actionHitRates: Record<string, number>;
  targetHitRates: Record<string, number>;
}

export interface CombatTeam {
  name: string;
  members: Creature[];
}

export interface Debuff {
  /** The property name on the character sheet (e.g., 'grappled') that this debuff sets to true. */
  type: string;
  /** The ID of the creature that applied this debuff. Used for expiration of brief debuffs. */
  sourceId?: string;
  /** If present, the debuff expires at the end of the source's turn when this reaches 0. */
  durationRemaining?: number;
  duration?: DebuffDuration;
}

/** The category of debuff, determining how it is removed. */
// Fixed: Lasts a specific number of turns. Generally 2, for brief effects.
export type DebuffDuration = 'fixed' | 'condition' | 'poison' | 'circumstance';

/**
 * State for a single fight simulation iteration.
 */
export interface FightState {
  aliveMembersByTeam: Record<string, Creature[]>;
  attacksByTeam: Record<string, number>;
  hitsByTeam: Record<string, number>;
  targetAttemptsByTeam: Record<string, number>;
  actionHitsByTeam: Record<string, number>;
  hp: Record<string, number>;
  initialTotalHpByTeam: Record<string, number>;
  memberToTeam: Record<string, CombatTeam>;
  cooldowns: Record<string, Record<string, number>>; // creatureId -> abilityName -> roundsRemaining
  debuffs: Record<string, Debuff[]>; // creatureId -> array of active conditions
  verbose: boolean;
  round: number;
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
  public simulate(iterations: number = 200, verbose: boolean = false): CombatSimulationResult {
    if (this.teams.length < 2) {
      throw new Error('Combat requires at least two teams.');
    }

    const stats = this.runSimulationIterations(iterations, verbose);

    // this.logSimulationResults(stats);

    return stats;
  }

  private runSimulationIterations(iterations: number, verbose: boolean): CombatSimulationResult {
    let totalTurns = 0;
    const wins: Record<string, number> = {};
    const totalHpPercents: Record<string, number> = {};
    const totalHits: Record<string, number> = {};
    const totalAttacks: Record<string, number> = {};
    const totalTargetAttempts: Record<string, number> = {};
    const totalActionHits: Record<string, number> = {};

    for (const t of this.teams) {
      wins[t.name] = 0;
      totalHpPercents[t.name] = 0;
      totalHits[t.name] = 0;
      totalAttacks[t.name] = 0;
      totalTargetAttempts[t.name] = 0;
      totalActionHits[t.name] = 0;
    }

    for (let i = 0; i < iterations; i++) {
      const result = this.simulateSingleFight(verbose && i === 0);
      totalTurns += result.turns;
      if (result.winner) {
        wins[result.winner]++;
      }
      for (const name in result.teamHpPercents) {
        totalHpPercents[name] += result.teamHpPercents[name];
        totalHits[name] += result.hitsByTeam[name];
        totalAttacks[name] += result.attacksByTeam[name];
        totalTargetAttempts[name] += result.targetAttemptsByTeam[name];
        totalActionHits[name] += result.actionHitsByTeam[name];
      }
    }

    const winRates: Record<string, number> = {};
    const averageHpPercentRemaining: Record<string, number> = {};
    const averageHitRates: Record<string, number> = {};
    const actionHitRates: Record<string, number> = {};
    const targetHitRates: Record<string, number> = {};

    for (const name in wins) {
      winRates[name] = (wins[name] / iterations) * 100;
      averageHpPercentRemaining[name] = totalHpPercents[name] / iterations;
      actionHitRates[name] =
        totalAttacks[name] > 0 ? (totalActionHits[name] / totalAttacks[name]) * 100 : 0;
      targetHitRates[name] =
        totalTargetAttempts[name] > 0 ? (totalHits[name] / totalTargetAttempts[name]) * 100 : 0;
      // Set averageHitRates to targetHitRates to maintain backward compatibility but with fixed values
      averageHitRates[name] = targetHitRates[name];
    }

    return {
      averageTurns: totalTurns / iterations,
      winRates,
      averageHpPercentRemaining,
      averageHitRates,
      actionHitRates,
      targetHitRates,
    };
  }

  private logSimulationResults(stats: CombatSimulationResult): void {
    console.log('--- Combat Simulation Results ---');
    console.log(`Teams: ${this.teams.map((t) => `${t.members.length} ${t.name}`).join(' vs ')}`);
    console.log(`Average Turns: ${stats.averageTurns.toFixed(2)}`);
    for (const name in stats.winRates) {
      console.log(
        `${name} Win Rate: ${stats.winRates[name].toFixed(2)}% | Avg HP Remaining: ${stats.averageHpPercentRemaining[name].toFixed(2)}% | Hit Rate: ${stats.averageHitRates[name].toFixed(2)}%`,
      );
    }
    console.log('---------------------------------');
  }

  private simulateSingleFight(verbose: boolean = false): {
    winner: string | null;
    turns: number;
    teamHpPercents: Record<string, number>;
    hitsByTeam: Record<string, number>;
    attacksByTeam: Record<string, number>;
    targetAttemptsByTeam: Record<string, number>;
    actionHitsByTeam: Record<string, number>;
  } {
    const state = this.initializeFightState(verbose);
    const teamInitiatives = this.determineTeamInitiative();

    let turns = 0;
    while (turns < 100) {
      turns++;
      state.round = turns;
      for (const { team } of teamInitiatives) {
        if (state.aliveMembersByTeam[team.name].length === 0) continue;

        const result = executeTeamTurn(team, state);
        if (result.status !== CombatStepStatus.Ongoing) {
          return {
            winner: result.winner,
            turns,
            teamHpPercents: this.getTeamHpPercents(state),
            hitsByTeam: state.hitsByTeam,
            attacksByTeam: state.attacksByTeam,
            targetAttemptsByTeam: state.targetAttemptsByTeam,
            actionHitsByTeam: state.actionHitsByTeam,
          };
        }
      }
    }

    return {
      winner: null,
      turns,
      teamHpPercents: this.getTeamHpPercents(state),
      hitsByTeam: state.hitsByTeam,
      attacksByTeam: state.attacksByTeam,
      targetAttemptsByTeam: state.targetAttemptsByTeam,
      actionHitsByTeam: state.actionHitsByTeam,
    };
  }

  public initializeFightState(verbose: boolean = false): FightState {
    const hp: Record<string, number> = {};
    const memberToTeam: Record<string, CombatTeam> = {};
    const aliveMembersByTeam: Record<string, Creature[]> = {};
    const initialTotalHpByTeam: Record<string, number> = {};
    const hitsByTeam: Record<string, number> = {};
    const attacksByTeam: Record<string, number> = {};
    const targetAttemptsByTeam: Record<string, number> = {};
    const actionHitsByTeam: Record<string, number> = {};
    const cooldowns: Record<string, Record<string, number>> = {};
    const debuffs: Record<string, Debuff[]> = {};

    for (const team of this.teams) {
      const aliveMembers: Creature[] = [];
      let teamInitialHp = 0;
      for (const member of team.members) {
        hp[member.id] = member.hit_points;
        memberToTeam[member.id] = team;
        aliveMembers.push(member);
        teamInitialHp += member.hit_points;
        cooldowns[member.id] = {};
        debuffs[member.id] = [];

        // Populate simulator attacks cache if not present
        if (!member.simulatorAttacks) {
          member.simulatorAttacks = member
            .getActiveAbilities()
            .map((ability) => parseAttackEffect(ability, member))
            .filter((a): a is SimulatorReadyAttack => !!a);

          // Add default attacks
          member.simulatorAttacks.push(getDefaultAttack(member));
          member.simulatorAttacks.push(getDefaultEliteAttack(member));
        }
      }
      aliveMembersByTeam[team.name] = aliveMembers;
      initialTotalHpByTeam[team.name] = teamInitialHp;
      hitsByTeam[team.name] = 0;
      attacksByTeam[team.name] = 0;
      targetAttemptsByTeam[team.name] = 0;
      actionHitsByTeam[team.name] = 0;
    }

    return {
      hp,
      memberToTeam,
      aliveMembersByTeam,
      initialTotalHpByTeam,
      hitsByTeam,
      attacksByTeam,
      targetAttemptsByTeam,
      actionHitsByTeam,
      cooldowns,
      debuffs,
      verbose,
      round: 1,
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
      initiative: rollD10(false),
    }));
    teamInitiatives.sort((a, b) => b.initiative - a.initiative);
    return teamInitiatives;
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

export function createStandardAdventuringParty(level: number): CombatTeam {
  const stock = new StockCharacters();
  stock.addAllCharacters();
  return {
    name: 'Standard Adventuring Party',
    members: [
      stock.getCharacter(`Cleric ${level}`)!,
      stock.getCharacter(`Fighter ${level}`)!,
      stock.getCharacter(`Rogue ${level}`)!,
      stock.getCharacter(`Wizard ${level}`)!,
    ],
  };
}

/**
 * Creates a combat scenario with the provided teams.
 */
export function createScenario(teams: CombatTeam[]): CombatScenario {
  return new CombatScenario(teams);
}
