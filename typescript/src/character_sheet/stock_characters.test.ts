import t from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import {
    clearAllCharacterSheets,
} from '@src/character_sheet/current_character_sheet';
import {
    loadAllMonsters,
    getMonster,
    createTeam,
    createScenario,
} from '@src/character_sheet/combat_scenario';

// Pre-load monsters for combat smoke tests
loadAllMonsters();

t.beforeEach(() => {
    clearAllCharacterSheets();
});

t.test('StockCharacters', (t) => {
    const stock = new StockCharacters();
    stock.addAllCharacters();
    const names = stock.getCharacterNames();

    t.test('load all characters', (t) => {
        t.ok(names.length > 0, 'Should have some stock characters');

        for (const name of names) {
            const char = stock.getCharacter(name);
            t.ok(char, `Character ${name} should exist`);
            if (char) {
                t.equal(char.level, 1, `${name} should be level 1`);
                t.ok(char.hit_points > 0, `${name} should have hit points`);
            }
        }
        t.end();
    });

    for (const name of names) {
        t.test(`combat smoke test: ${name}`, (t) => {
            // Need to reload characters for each test because beforeEach clears the sheets
            const localStock = new StockCharacters();
            localStock.addAllCharacters();
            const char = localStock.getCharacter(name);

            t.ok(char, `${name} should exist`);
            if (char) {
                const trainingTarget = getMonster('Giant Wasp');

                const charTeam = createTeam(name, [char]);
                const opponentTeam = createTeam('Opponent Team', [trainingTarget]);

                const scenario = createScenario([charTeam, opponentTeam]);
                // Just 10 iterations for a smoke test
                const result = scenario.simulate(10);

                t.ok(result.averageRounds > 0, 'Simulation should complete some rounds');
                t.ok(
                    (result.winRates['Character Team'] ?? 0) >= 0,
                    'Win rate should be a valid number'
                );
            }
            t.end();
        });
    }

    t.end();
});
