import t from 'tap';
import {
  loadAllMonsters,
  getMonster,
  createCharacter,
  createTeam,
  createScenario,
  cloneMonster,
  createCreature,
} from './combat_scenario';

loadAllMonsters();

t.test('Can create a monster', (t) => {
  const ankheg = getMonster('Ankheg');
  t.equal(ankheg.name, 'Ankheg');
  t.end();
});

t.test('Can create a custom character', (t) => {
  const hero = createCharacter('Hero', 5, 'fighter');
  t.equal(hero.name, 'Hero');
  t.equal(hero.level, 5);
  t.equal(hero.base_class, 'fighter');
  t.end();
});

t.test('CombatScenario can simulate a fight and report statistics', (t) => {
  const ankheg = getMonster('Ankheg');
  const wasp = getMonster('Giant Wasp');

  const team1 = createTeam('Wasp Team', [wasp]);
  const team2 = createTeam('Ankheg Team', [ankheg]);

  const scenario = createScenario([team1, team2]);
  const result = scenario.simulate();

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(
    result.winRates['Ankheg Team'] > 0 || result.winRates['Wasp Team'] > 0,
    'There should be at least one winner',
  );
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 10 Wasps', (t) => {
  const ankheg = getMonster('Ankheg');
  const wasps = [];

  for (let i = 0; i < 10; i++) {
    wasps.push(cloneMonster('Giant Wasp'));
  }

  const waspTeam = createTeam('Wasps', wasps);
  const ankhegTeam = createTeam('Ankheg', [ankheg]);

  const scenario = createScenario([waspTeam, ankhegTeam]);
  const result = scenario.simulate();

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['Ankheg'] >= 0, 'Ankheg should have a win rate');
  t.ok(result.winRates['Wasps'] >= 0, 'Wasps should have a win rate');
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 1 Ankheg', (t) => {
  const ankheg = getMonster('Ankheg');
  const ankhegs = [];

  for (let i = 0; i < 1; i++) {
    ankhegs.push(cloneMonster('Ankheg'));
  }

  const ankhegTeam = createTeam('Ankheg Team 1', ankhegs);
  const ankhegTeam2 = createTeam('Ankheg Team 2', [ankheg]);

  const scenario = createScenario([ankhegTeam, ankhegTeam2]);
  const result = scenario.simulate();

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['Ankheg Team 1'] >= 0, 'Ankheg Team 1 should have a win rate');
  t.ok(result.winRates['Ankheg Team 2'] >= 0, 'Ankheg Team 2 should have a win rate');
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 5 Carrion Crows', (t) => {
  const ankheg = getMonster('Ankheg');
  const crows = [];

  for (let i = 0; i < 5; i++) {
    crows.push(cloneMonster('Carrion Crow'));
  }

  const crowTeam = createTeam('Crows', crows);
  const ankhegTeam = createTeam('Ankheg', [ankheg]);

  const scenario = createScenario([crowTeam, ankhegTeam]);
  const result = scenario.simulate();

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['Ankheg'] >= 0, 'Ankheg should have a win rate');
  t.ok(result.winRates['Crows'] >= 0, 'Crows should have a win rate');
  t.end();
});

t.test('Creatures have independent sheets', (t) => {
  const c1 = createCreature('C1');
  const c2 = createCreature('C2');

  c1.setProperties({ level: 10 });
  c2.setProperties({ level: 20 });

  t.equal(c1.level, 10);
  t.equal(c2.level, 20);
  t.not(c1.level, c2.level);
  t.end();
});

t.test('CombatScenario can simulate teams of multiple monsters', (t) => {
  // Team A: 2 Carrion Crows, 2 Wargs
  const teamA_members = [
    cloneMonster('Carrion Crow'),
    cloneMonster('Carrion Crow'),
    cloneMonster('Warg'),
    cloneMonster('Warg'),
  ];
  const teamA = createTeam('A-Team', teamA_members);

  // Team B: 1 Ankheg, 1 Giant Wasp
  const teamB_members = [cloneMonster('Ankheg'), cloneMonster('Giant Wasp')];
  const teamB = createTeam('B-Team', teamB_members);

  const scenario = createScenario([teamA, teamB]);
  const result = scenario.simulate();

  t.ok(result.averageRounds > 0, 'Average rounds should be positive');
  t.ok(result.winRates['A-Team'] >= 0, 'A-Team should have a win rate');
  t.ok(result.winRates['B-Team'] >= 0, 'B-Team should have a win rate');
  t.ok(result.averageHpPercentRemaining['A-Team'] >= 0, 'A-Team should have avg HP remaining');
  t.ok(result.averageHpPercentRemaining['B-Team'] >= 0, 'B-Team should have avg HP remaining');
  t.end();
});

t.test('Elite monsters hit multiple targets with area attack', (t) => {
  // Create an elite level 4 monster (Ankheg-like)
  const elite = createCreature('Elite', (c) => {
    c.setRequiredProperties({
      alignment: 'neutral',
      base_class: 'brute',
      elite: true,
      creature_type: 'mortal',
      level: 4,
      size: 'large',
    });
    c.setProperties({
      hit_points: 100,
      accuracy: 20, // Guaranteed hit
      mundane_power: 10,
    });
  });

  // Create 5 weak targets
  const targets = [];
  for (let i = 0; i < 5; i++) {
    targets.push(
      createCreature(`Target ${i}`, (c) => {
        c.setProperties({
          hit_points: 10,
          armor_defense: 0,
        });
      }),
    );
  }

  const team1 = createTeam('Elite Team', [elite]);
  const team2 = createTeam('Target Team', targets);

  const scenario = createScenario([team1, team2]);

  // If no area attack, it takes 5 rounds to kill 5 targets (1 target/round).
  // With area attack, it kills one target and damages others, killing them all in ~2 rounds.
  const result = scenario.simulate();
  t.ok(result.averageRounds <= 2.5, `Should kill targets quickly (${result.averageRounds} rounds)`);
  t.equal(result.winRates['Elite Team'], 100, 'Elite should always win');
  t.end();
});
