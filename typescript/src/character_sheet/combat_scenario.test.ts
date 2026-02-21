import t from 'tap';
import { CombatScenarioGenerator } from './combat_scenario';
import { addBeasts } from '../monsters/individual_monsters/beasts';

t.test('CombatScenarioGenerator can create a monster', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  addBeasts(gen.grimoire);
  const ankheg = gen.getMonster('Ankheg');
  t.equal(ankheg.name, 'Ankheg');
  t.end();
});

t.test('CombatScenarioGenerator can create a custom character', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  const hero = gen.createCharacter('Hero', 5, 'fighter');
  t.equal(hero.name, 'Hero');
  t.equal(hero.level, 5);
  t.equal(hero.base_class, 'fighter');
  t.end();
});

t.test('CombatScenario can simulate a fight and report statistics', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  addBeasts(gen.grimoire);
  const ankheg = gen.getMonster('Ankheg');
  const wasp = gen.getMonster('Giant Wasp');

  const team1 = gen.createTeam('Wasp Team', [wasp]);
  const team2 = gen.createTeam('Ankheg Team', [ankheg]);

  const scenario = gen.createScenario([team1, team2]);
  const result = scenario.simulate(20);

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(
    result.winRates['Ankheg Team'] > 0 || result.winRates['Wasp Team'] > 0,
    'There should be at least one winner',
  );
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 10 Wasps', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  addBeasts(gen.grimoire);

  const ankheg = gen.getMonster('Ankheg');
  const wasps = [];
  const baseWasp = gen.getMonster('Giant Wasp');

  for (let i = 0; i < 10; i++) {
    wasps.push(
      gen.createCreature(`Wasp ${i}`, (c) => {
        c.setProperties({
          level: baseWasp.level,
          hit_points: baseWasp.hit_points,
          accuracy: baseWasp.accuracy,
          armor_defense: baseWasp.armor_defense,
          mundane_power: baseWasp.mundane_power,
        });
      }),
    );
  }

  const waspTeam = gen.createTeam('Wasps', wasps);
  const ankhegTeam = gen.createTeam('Ankheg', [ankheg]);

  const scenario = gen.createScenario([waspTeam, ankhegTeam]);
  const result = scenario.simulate(10); // Very few iterations for speed

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['Ankheg'] >= 0, 'Ankheg should have a win rate');
  t.ok(result.winRates['Wasps'] >= 0, 'Wasps should have a win rate');
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 5 Wasps', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  addBeasts(gen.grimoire);

  const ankheg = gen.getMonster('Ankheg');
  const wasps = [];
  const baseWasp = gen.getMonster('Giant Wasp');

  for (let i = 0; i < 5; i++) {
    wasps.push(
      gen.createCreature(`Wasp ${i}`, (c) => {
        c.setProperties({
          level: baseWasp.level,
          hit_points: baseWasp.hit_points,
          accuracy: baseWasp.accuracy,
          armor_defense: baseWasp.armor_defense,
          mundane_power: baseWasp.mundane_power,
        });
      }),
    );
  }

  const waspTeam = gen.createTeam('Wasps', wasps);
  const ankhegTeam = gen.createTeam('Ankheg', [ankheg]);

  const scenario = gen.createScenario([waspTeam, ankhegTeam]);
  const result = scenario.simulate(20);

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['Ankheg'] >= 0, 'Ankheg should have a win rate');
  t.ok(result.winRates['Wasps'] >= 0, 'Wasps should have a win rate');
  t.end();
});

t.test('Creatures have independent sheets', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  const c1 = gen.createCreature('C1');
  const c2 = gen.createCreature('C2');

  c1.setProperties({ level: 10 });
  c2.setProperties({ level: 20 });

  t.equal(c1.level, 10);
  t.equal(c2.level, 20);
  t.not(c1.level, c2.level);
  t.end();
});

t.test('CombatScenario can simulate teams of multiple monsters', (t) => {
  const gen = new CombatScenarioGenerator();
  gen.reset();
  addBeasts(gen.grimoire);

  // Team A: 2 Carrion Crows, 2 Wargs
  const teamA_members = [
    gen.createMonster('Carrion Crow'),
    gen.createMonster('Carrion Crow'),
    gen.createMonster('Warg'),
    gen.createMonster('Warg'),
  ];
  const teamA = gen.createTeam('A-Team', teamA_members);

  // Team B: 1 Ankheg, 1 Giant Wasp
  const teamB_members = [gen.createMonster('Ankheg'), gen.createMonster('Giant Wasp')];
  const teamB = gen.createTeam('B-Team', teamB_members);

  const scenario = gen.createScenario([teamA, teamB]);
  const result = scenario.simulate(20);

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['A-Team'] >= 0, 'A-Team should have a win rate');
  t.ok(result.winRates['B-Team'] >= 0, 'B-Team should have a win rate');
  t.ok(result.averageHpPercentRemaining['A-Team'] >= 0, 'A-Team should have avg HP remaining');
  t.ok(result.averageHpPercentRemaining['B-Team'] >= 0, 'B-Team should have avg HP remaining');
  t.end();
});
