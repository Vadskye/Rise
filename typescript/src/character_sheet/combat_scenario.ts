import { Creature } from './creature';
import { Grimoire } from '../monsters/grimoire';
import { handleEverything } from './sheet_worker';
import { setCurrentCharacterSheet, getCurrentCharacterSheet, clearAllCharacterSheets } from './current_character_sheet';
import { RiseBaseClass } from './rise_data';

export interface CombatSimulationResult {
    averageRounds: number;
    winRates: Record<string, number>;
    averageHpPercentRemaining: Record<string, number>;
}

export interface CombatTeam {
    name: string;
    members: Creature[];
}

/**
 * Manages a combat encounter between multiple creatures.
 */
export class CombatScenario {
    constructor(public teams: CombatTeam[]) { }

    /**
     * Simulates the combat until a victor is determined.
     * Runs multiple iterations to gather statistics.
     */
    public simulate(iterations: number = 1000): CombatSimulationResult {
        if (this.teams.length < 2) {
            throw new Error('Combat requires at least two teams.');
        }

        let totalRounds = 0;
        const wins: Record<string, number> = {};
        const totalHpPercents: Record<string, number> = {};
        this.teams.forEach(t => {
            wins[t.name] = 0;
            totalHpPercents[t.name] = 0;
        });

        for (let i = 0; i < iterations; i++) {
            const result = this.simulateSingleFight();
            totalRounds += result.rounds;
            if (result.winner) {
                wins[result.winner]++;
            }
            for (const name in result.teamHpPercents) {
                totalHpPercents[name] += result.teamHpPercents[name];
            }
        }

        const stats: CombatSimulationResult = {
            averageRounds: totalRounds / iterations,
            winRates: {},
            averageHpPercentRemaining: {}
        };

        for (const name in wins) {
            stats.winRates[name] = (wins[name] / iterations) * 100;
            stats.averageHpPercentRemaining[name] = totalHpPercents[name] / iterations;
        }

        console.log('--- Combat Simulation Results ---');
        console.log(`Teams: ${this.teams.map(t => `${t.members.length} ${t.name}`).join(' vs ')}`);
        console.log(`Average Rounds: ${stats.averageRounds.toFixed(2)}`);
        for (const name in stats.winRates) {
            console.log(`${name} Win Rate: ${stats.winRates[name].toFixed(2)}% | Avg HP Remaining: ${stats.averageHpPercentRemaining[name].toFixed(2)}%`);
        }
        console.log('---------------------------------');

        return stats;
    }

    private simulateSingleFight(): { winner: string | null, rounds: number, teamHpPercents: Record<string, number> } {
        const hp: Map<string, number> = new Map();
        const memberToTeam: Map<string, CombatTeam> = new Map();
        const aliveMembersByTeam: Map<string, Creature[]> = new Map();
        const initialTotalHpByTeam: Record<string, number> = {};

        this.teams.forEach(team => {
            const aliveMembers: Creature[] = [];
            let teamInitialHp = 0;
            team.members.forEach(member => {
                hp.set(member.name, member.hit_points);
                memberToTeam.set(member.name, team);
                aliveMembers.push(member);
                teamInitialHp += member.hit_points;
            });
            aliveMembersByTeam.set(team.name, aliveMembers);
            initialTotalHpByTeam[team.name] = teamInitialHp;
        });

        const getHpPercents = (): Record<string, number> => {
            const percents: Record<string, number> = {};
            this.teams.forEach(team => {
                let currentTeamHp = 0;
                team.members.forEach(member => {
                    currentTeamHp += Math.max(0, hp.get(member.name)!);
                });
                percents[team.name] = initialTotalHpByTeam[team.name] > 0
                    ? (currentTeamHp / initialTotalHpByTeam[team.name]) * 100
                    : 0;
            });
            return percents;
        };

        // Determine initiative order for teams.
        const teamInitiatives = this.teams.map(team => ({
            team,
            initiative: this.rollD10(false),
        }));
        teamInitiatives.sort((a, b) => b.initiative - a.initiative);

        let rounds = 0;
        while (rounds < 100) {
            rounds++;
            for (const { team } of teamInitiatives) {
                // If this team is dead, skip its turn
                if (aliveMembersByTeam.get(team.name)!.length === 0) continue;

                // For each alive member of the team
                const attackers = [...aliveMembersByTeam.get(team.name)!];
                for (const attacker of attackers) {
                    if (hp.get(attacker.name)! <= 0) continue;

                    // Find potential targets (any member of any other team that is alive)
                    const potentialTargets: Creature[] = [];
                    for (const [otherTeamName, members] of aliveMembersByTeam.entries()) {
                        if (otherTeamName !== team.name) {
                            potentialTargets.push(...members);
                        }
                    }

                    if (potentialTargets.length === 0) break;

                    // Simple targeting: pick the first one
                    const defender = potentialTargets[0];

                    const damage = this.resolveAttack(attacker, defender);
                    const newHp = hp.get(defender.name)! - damage;
                    hp.set(defender.name, newHp);

                    if (newHp <= 0) {
                        // Remove from alive members
                        const defenderTeamName = memberToTeam.get(defender.name)!.name;
                        const teamAlive = aliveMembersByTeam.get(defenderTeamName)!;
                        const index = teamAlive.indexOf(defender);
                        if (index > -1) {
                            teamAlive.splice(index, 1);
                        }
                    }

                    // Check for victory (only one team has alive members)
                    const teamsWithAlive = Array.from(aliveMembersByTeam.entries())
                        .filter(([_, members]) => members.length > 0);

                    if (teamsWithAlive.length === 1) {
                        return { winner: teamsWithAlive[0][0], rounds, teamHpPercents: getHpPercents() };
                    }
                    if (teamsWithAlive.length === 0) {
                        return { winner: null, rounds, teamHpPercents: getHpPercents() };
                    }
                }
            }
        }

        return { winner: null, rounds, teamHpPercents: getHpPercents() };
    }

    private resolveAttack(attacker: Creature, defender: Creature): number {
        const roll = this.rollD10(true);
        const accuracy = attacker.accuracy;
        const total = roll + accuracy;
        const targetDefense = defender.armor_defense;

        if (total >= targetDefense + 10) {
            // Critical Hit: Double damage
            return this.calculateDamage(attacker) * 2;
        } else if (total >= targetDefense) {
            // Regular Hit
            return this.calculateDamage(attacker);
        }

        return 0; // Miss
    }

    private calculateDamage(creature: Creature): number {
        const rank = Math.max(0, Math.min(7, Math.floor((creature.level + 2) / 3)));
        const power = creature.mundane_power;
        const halfPower = Math.floor(power / 2);

        // Standard targeted medium damage ranks from sheet_worker.ts
        const diceExpr = {
            0: `1d4+${halfPower}`,
            1: `1d6+${halfPower}`,
            2: `1d10+${halfPower}`,
            3: `1d8+${power}`,
            4: `${halfPower}d6`,
            5: `${halfPower + 1}d6`,
            6: `${halfPower + 1}d8`,
            7: `${halfPower + 1}d10`,
        }[rank] || '1d6';

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

/**
 * Facilitates the creation and setup of combat scenarios.
 */
export class CombatScenarioGenerator {
    public grimoire: Grimoire;

    constructor() {
        this.grimoire = new Grimoire();
    }

    /**
     * Resets the global character sheet state.
     */
    public reset() {
        clearAllCharacterSheets();
    }

    /**
     * Loads all monsters from all groups. This may be slow.
     */
    public loadAllMonsters() {
        this.grimoire.addAllMonsters();
    }

    /**
     * Retrieves a monster from the grimoire by its name.
     * CAUTION: This currently returns the shared instance from the grimoire.
     * If multiple of the same monster are needed, they will share state.
     */
    public getMonster(name: string): Creature {
        const monster = this.grimoire.getMonster(name);
        if (!monster) {
            throw new Error(`Monster with name "${name}" not found in the grimoire.`);
        }
        return monster;
    }

    /**
     * Creates a new creature with the specified name and optional properties.
     * Ensures the creature has its own character sheet in the global state.
     */
    public createCreature(name: string, initializer?: (creature: Creature) => void): Creature {
        // We use a unique ID to ensure this creature has its own character sheet
        const uniqueId = Math.random().toString(36).substring(7);
        const uniqueSheetName = `${name}_${uniqueId}`;

        setCurrentCharacterSheet(uniqueSheetName);
        const sheet = getCurrentCharacterSheet();
        sheet.setProperties({ name });

        const creature = new Creature(sheet);
        if (initializer) {
            initializer(creature);
        }
        handleEverything();

        return creature;
    }

    /**
     * Convenience method to create a character with common properties.
     */
    public createCharacter(name: string, level: number, baseClass: RiseBaseClass): Creature {
        return this.createCreature(name, (c) => {
            // Use setRequiredProperties if needed, but setProperties covers most basics
            c.setProperties({ level, base_class: baseClass });
        });
    }

    /**
     * Creates a combat team with the provided name and members.
     */
    public createTeam(name: string, members: Creature[]): CombatTeam {
        return { name, members };
    }

    /**
     * Creates a combat scenario with the provided teams.
     */
    public createScenario(teams: CombatTeam[]): CombatScenario {
        return new CombatScenario(teams);
    }
}
