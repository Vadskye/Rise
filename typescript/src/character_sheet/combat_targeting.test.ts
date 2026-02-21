import t from 'tap';
import { CombatScenarioGenerator } from './combat_scenario';

t.test('Target Selection: Ordered', (t) => {
    const gen = new CombatScenarioGenerator();
    const attacker = gen.createCreature('Attacker');
    attacker.targetPreference = 'Ordered';

    const target1 = gen.createCreature('Target 1');
    const target2 = gen.createCreature('Target 2');

    const enemyTeam = gen.createTeam('Enemy', [target1, target2]);
    const allyTeam = gen.createTeam('Ally', [attacker]);

    const scenario = gen.createScenario([allyTeam, enemyTeam]);
    // @ts-ignore - accessing private for testing
    const selected = (scenario as any).selectTarget(attacker, [target1, target2], (scenario as any).initializeFightState());

    t.equal(selected.id, target1.id, 'Should select the first target in the list');
    t.end();
});

t.test('Target Selection: Vulnerable (Defense)', (t) => {
    const gen = new CombatScenarioGenerator();
    const attacker = gen.createCreature('Attacker');
    attacker.targetPreference = 'Vulnerable';

    const tank = gen.createCreature('Tank');
    tank.setProperties({ armor_defense: 25, hit_points: 100 });

    const squishy = gen.createCreature('Squishy');
    squishy.setProperties({ armor_defense: 10, hit_points: 100 });

    const enemyTeam = gen.createTeam('Enemy', [tank, squishy]);
    const allyTeam = gen.createTeam('Ally', [attacker]);

    const scenario = gen.createScenario([allyTeam, enemyTeam]);
    // @ts-ignore - accessing private for testing
    const selected = (scenario as any).selectTarget(attacker, [tank, squishy], (scenario as any).initializeFightState());

    t.equal(selected.id, squishy.id, 'Should select the target with the lowest defense');
    t.end();
});

t.test('Target Selection: Vulnerable (HP Tie-break)', (t) => {
    const gen = new CombatScenarioGenerator();
    const attacker = gen.createCreature('Attacker');
    attacker.targetPreference = 'Vulnerable';

    const target1 = gen.createCreature('Target 1');
    target1.setProperties({ armor_defense: 15, hit_points: 100 });

    const target2 = gen.createCreature('Target 2');
    target2.setProperties({ armor_defense: 15, hit_points: 50 });

    const enemyTeam = gen.createTeam('Enemy', [target1, target2]);
    const allyTeam = gen.createTeam('Ally', [attacker]);

    const scenario = gen.createScenario([allyTeam, enemyTeam]);
    const state = (scenario as any).initializeFightState();
    state.hp[target1.id] = 100;
    state.hp[target2.id] = 50;

    // @ts-ignore - accessing private for testing
    const selected = (scenario as any).selectTarget(attacker, [target1, target2], state);

    t.equal(selected.id, target2.id, 'Should select the target with the lowest HP when defenses are equal');
    t.end();
});

t.test('Target Selection: Random', (t) => {
    const gen = new CombatScenarioGenerator();
    const attacker = gen.createCreature('Attacker');
    attacker.targetPreference = 'Random';

    const targets = [];
    for (let i = 0; i < 10; i++) {
        targets.push(gen.createCreature(`Target ${i}`));
    }

    const enemyTeam = gen.createTeam('Enemy', targets);
    const allyTeam = gen.createTeam('Ally', [attacker]);

    const scenario = gen.createScenario([allyTeam, enemyTeam]);
    const state = (scenario as any).initializeFightState();

    const selections = new Set();
    for (let i = 0; i < 100; i++) {
        // @ts-ignore - accessing private for testing
        const selected = (scenario as any).selectTarget(attacker, targets, state);
        selections.add(selected.id);
    }

    t.ok(selections.size > 1, 'Should eventually pick different targets with Random preference');
    t.end();
});
