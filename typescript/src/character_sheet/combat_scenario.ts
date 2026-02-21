import { Creature } from './creature';
import { Grimoire } from '../monsters/grimoire';
import { handleEverything } from './sheet_worker';
import { setCurrentCharacterSheet, getCurrentCharacterSheet } from './current_character_sheet';
import { RiseBaseClass } from './rise_data';

/**
 * Manages a combat encounter between multiple creatures.
 */
export class CombatScenario {
    constructor(public combatants: Creature[]) { }

    /**
     * Simulates the combat until a victor is determined.
     * Returns the victor, or null if no one won (e.g. everyone died).
     */
    public simulate(): Creature | null {
        // TODO: Implement actual combat logic.
        // This will involve handling turns, actions, and damage until only one side remains.

        if (this.combatants.length === 0) {
            return null;
        }

        // For now, we report the first combatant as the winner to satisfy the current requirement.
        // The actual combat implementation is deferred to a later session.
        const victor = this.combatants[0];

        console.log('--- Combat Simulation Started ---');
        console.log(`Combatants: ${this.combatants.map(c => c.name).join(', ')}`);
        console.log('... simulating ...');
        console.log(`Victor: ${victor.name}`);
        console.log('--- Combat Simulation Ended ---');

        return victor;
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
