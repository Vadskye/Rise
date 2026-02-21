import { Creature } from './creature';
import { Grimoire } from '../monsters/grimoire';
import { handleEverything } from './sheet_worker';
import { setCurrentCharacterSheet, getCurrentCharacterSheet } from './current_character_sheet';
import { RiseBaseClass } from './rise_data';

export interface CombatSimulationResult {
    averageRounds: number;
    winRates: Record<string, number>;
}

/**
 * Manages a combat encounter between multiple creatures.
 */
export class CombatScenario {
    constructor(public combatants: Creature[]) { }

    /**
     * Simulates the combat until a victor is determined.
     * Runs multiple iterations to gather statistics.
     */
    public simulate(iterations: number = 1000): CombatSimulationResult {
        if (this.combatants.length < 2) {
            throw new Error('Combat requires at least two combatants.');
        }

        let totalRounds = 0;
        const wins: Record<string, number> = {};
        this.combatants.forEach(c => wins[c.name] = 0);

        for (let i = 0; i < iterations; i++) {
            const result = this.simulateSingleFight();
            totalRounds += result.rounds;
            if (result.winner) {
                wins[result.winner.name]++;
            }
        }

        const stats: CombatSimulationResult = {
            averageRounds: totalRounds / iterations,
            winRates: {}
        };

        for (const name in wins) {
            stats.winRates[name] = (wins[name] / iterations) * 100;
        }

        console.log('--- Combat Simulation Results ---');
        console.log(`Combatants: ${this.combatants.map(c => c.name).join(' vs ')}`);
        console.log(`Average Rounds: ${stats.averageRounds.toFixed(2)}`);
        for (const name in stats.winRates) {
            console.log(`${name} Win Rate: ${stats.winRates[name].toFixed(2)}%`);
        }
        console.log('---------------------------------');

        return stats;
    }

    private simulateSingleFight(): { winner: Creature | null, rounds: number } {
        const hp: Map<string, number> = new Map();
        this.combatants.forEach(c => hp.set(c.name, c.hit_points));

        let rounds = 0;
        while (rounds < 100) { // Limit to 100 rounds to prevent infinity
            rounds++;
            for (let i = 0; i < this.combatants.length; i++) {
                const attacker = this.combatants[i];
                const defender = this.combatants[(i + 1) % this.combatants.length];

                if (hp.get(attacker.name)! <= 0) continue;

                const damage = this.resolveAttack(attacker, defender);
                hp.set(defender.name, hp.get(defender.name)! - damage);

                // Check for victory
                const alive = this.combatants.filter(c => hp.get(c.name)! > 0);
                if (alive.length === 1) {
                    return { winner: alive[0], rounds };
                }
                if (alive.length === 0) {
                    return { winner: null, rounds };
                }
            }
        }

        return { winner: null, rounds };
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
        handleEverything();
        const sheet = getCurrentCharacterSheet();
        sheet.setProperties({ name });

        const creature = new Creature(sheet);
        if (initializer) {
            initializer(creature);
        }

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
     * Creates a combat scenario with the provided creatures.
     */
    public createScenario(combatants: Creature[]): CombatScenario {
        return new CombatScenario(combatants);
    }
}
