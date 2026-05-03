import t from 'tap';
import { createCreature, createTeam, createScenario } from '@src/combat/combat_scenario';
import { selectTarget } from '@src/combat/combat_targeting';

t.test('Target Selection: Ordered', (t) => {
  const attacker = createCreature('Attacker');
  attacker.targetPreference = 'Ordered';

  const target1 = createCreature('Target 1');
  const target2 = createCreature('Target 2');

  const enemyTeam = createTeam('Enemy', [target1, target2]);
  const allyTeam = createTeam('Ally', [attacker]);

  const scenario = createScenario([allyTeam, enemyTeam]);
  const selected = selectTarget(attacker, [target1, target2], scenario.initializeFightState());

  t.equal(selected.id, target1.id, 'Should select the first target in the list');
  t.end();
});

t.test('Target Selection: Vulnerable (Defense)', (t) => {
  const attacker = createCreature('Attacker');
  attacker.targetPreference = 'Vulnerable';

  const tank = createCreature('Tank');
  tank.setProperties({ armor_defense: 25, hit_points: 100 });

  const squishy = createCreature('Squishy');
  squishy.setProperties({ armor_defense: 10, hit_points: 100 });

  const enemyTeam = createTeam('Enemy', [tank, squishy]);
  const allyTeam = createTeam('Ally', [attacker]);

  const scenario = createScenario([allyTeam, enemyTeam]);
  const selected = selectTarget(attacker, [tank, squishy], scenario.initializeFightState());

  t.equal(selected.id, squishy.id, 'Should select the target with the lowest defense');
  t.end();
});

t.test('Target Selection: Vulnerable (HP Tie-break)', (t) => {
  const attacker = createCreature('Attacker');
  attacker.targetPreference = 'Vulnerable';

  const target1 = createCreature('Target 1');
  target1.setProperties({ armor_defense: 15, hit_points: 100 });

  const target2 = createCreature('Target 2');
  target2.setProperties({ armor_defense: 15, hit_points: 50 });

  const enemyTeam = createTeam('Enemy', [target1, target2]);
  const allyTeam = createTeam('Ally', [attacker]);

  const scenario = createScenario([allyTeam, enemyTeam]);
  const state = scenario.initializeFightState();
  state.hp[target1.id] = 100;
  state.hp[target2.id] = 50;

  const selected = selectTarget(attacker, [target1, target2], state);

  t.equal(
    selected.id,
    target2.id,
    'Should select the target with the lowest HP when defenses are equal',
  );
  t.end();
});

t.test('Target Selection: Random', (t) => {
  const attacker = createCreature('Attacker');
  attacker.targetPreference = 'Random';

  const targets = [];
  for (let i = 0; i < 10; i++) {
    targets.push(createCreature(`Target ${i}`));
  }

  const enemyTeam = createTeam('Enemy', targets);
  const allyTeam = createTeam('Ally', [attacker]);

  const scenario = createScenario([allyTeam, enemyTeam]);
  const state = scenario.initializeFightState();

  const selections = new Set();
  for (let i = 0; i < 100; i++) {
    const selected = selectTarget(attacker, targets, state);
    selections.add(selected.id);
  }

  t.ok(selections.size > 1, 'Should eventually pick different targets with Random preference');
  t.end();
});
