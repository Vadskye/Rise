import t from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import {
  loadAllMonsters,
  getMonster,
  createCharacter,
  createTeam,
  createScenario,
  cloneMonster,
  createCreature,
  CombatSimulationResult,
} from '@src/combat/combat_scenario';
import {
  clearAllCharacterSheets,
  resetDefaultCharacterSheet,
} from '@src/character_sheet/current_character_sheet';
import { handleEverything } from '@src/character_sheet/sheet_worker';

function assertExpectedWinRate(
  tap: any,
  result: CombatSimulationResult,
  teamName: string,
  expected: number,
) {
  const actual = result.winRates[teamName];
  tap.ok(
    Math.abs(actual - expected) <= 10,
    `${teamName} win rate should be ~${expected}% (actual: ${actual.toFixed(2)}%)`,
  );
}

function assertExpectedTurnsCount(tap: any, result: CombatSimulationResult, expected: number) {
  const actual = result.averageTurns;
  const tolerance = Math.max(expected * 0.1, 1.0);
  tap.ok(
    Math.abs(actual - expected) <= tolerance,
    `Average turns should be ~${expected} (actual: ${actual.toFixed(2)}, tolerance: ${tolerance.toFixed(2)})`,
  );
}

loadAllMonsters();

const stock = new StockCharacters();
stock.addAllCharacters();

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

  assertExpectedTurnsCount(t, result, 1.5);
  assertExpectedWinRate(t, result, 'Ankheg Team', 100);
  assertExpectedWinRate(t, result, 'Wasp Team', 0);
  t.end();
});

t.test('CombatScenario can simulate 1 Ankheg vs 10 Carrion Crows', (t) => {
  const ankheg = getMonster('Ankheg');
  const crows = [];

  for (let i = 0; i < 10; i++) {
    crows.push(cloneMonster('Carrion Crow'));
  }

  const crowTeam = createTeam('Crows', crows);
  const ankhegTeam = createTeam('Ankheg', [ankheg]);

  const scenario = createScenario([crowTeam, ankhegTeam]);
  const result = scenario.simulate();

  assertExpectedTurnsCount(t, result, 3);
  assertExpectedWinRate(t, result, 'Ankheg', 20);
  assertExpectedWinRate(t, result, 'Crows', 80);
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

  assertExpectedTurnsCount(t, result, 7.1);
  assertExpectedWinRate(t, result, 'Ankheg Team 1', 50.0);
  assertExpectedWinRate(t, result, 'Ankheg Team 2', 50.0);
  t.end();
});

t.test('CombatScenario can simulate 5 Carrion Crows vs 10 Giant Wasps', (t) => {
  const crows = [];
  const wasps = [];

  for (let i = 0; i < 5; i++) {
    crows.push(cloneMonster('Carrion Crow'));
  }

  for (let i = 0; i < 10; i++) {
    wasps.push(cloneMonster('Giant Wasp'));
  }

  const crowTeam = createTeam('Crows', crows);
  const waspTeam = createTeam('Wasps', wasps);

  const scenario = createScenario([crowTeam, waspTeam]);
  const result = scenario.simulate();

  assertExpectedTurnsCount(t, result, 3.5);
  assertExpectedWinRate(t, result, 'Crows', 0.2);
  assertExpectedWinRate(t, result, 'Wasps', 99.8);
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

  assertExpectedTurnsCount(t, result, 3.3);
  assertExpectedWinRate(t, result, 'A-Team', 0.1);
  assertExpectedWinRate(t, result, 'B-Team', 99.9);
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

  // If no area attack, it takes 5 turns to kill 5 targets (1 target/turn).
  // With area attack, it kills them all in one turn.
  const result = scenario.simulate();
  assertExpectedTurnsCount(t, result, 1.0);
  assertExpectedWinRate(t, result, 'Elite Team', 100);
  t.end();
});

// The *goal* of Rise is to make these are equivalent, but in practice that's not true yet, as the test assertions capture.
t.test('One elite Ankheg is equivalent to four non-elite Ankhegs', (t) => {
  const eliteAnkheg = cloneMonster('Ankheg');

  const normalAnkhegs = [];
  for (let i = 0; i < 4; i++) {
    const ank = cloneMonster('Ankheg');
    ank.setProperties({
      elite: false,
    });
    normalAnkhegs.push(ank);
  }

  const eliteTeam = createTeam('Elite Ankheg', [eliteAnkheg]);
  const normalTeam = createTeam('Normal Ankhegs', normalAnkhegs);

  const scenario = createScenario([eliteTeam, normalTeam]);
  // This scenario is particularly flaky due to its complexity
  const result = scenario.simulate(500);

  assertExpectedTurnsCount(t, result, 5.2);
  assertExpectedWinRate(t, result, 'Elite Ankheg', 52);
  assertExpectedWinRate(t, result, 'Normal Ankhegs', 48);
  t.end();
});

t.test('One elite frostweb spider is equivalent to four non-elite frostweb spiders', (t) => {
  const eliteAnkheg = cloneMonster('Frostweb Spider');

  const normalAnkhegs = [];
  for (let i = 0; i < 4; i++) {
    const ank = cloneMonster('Frostweb Spider');
    ank.setProperties({
      elite: false,
    });
    normalAnkhegs.push(ank);
  }

  const eliteTeam = createTeam('Elite Frostweb Spider', [eliteAnkheg]);
  const normalTeam = createTeam('Normal Frostweb Spiders', normalAnkhegs);

  const scenario = createScenario([eliteTeam, normalTeam]);
  const result = scenario.simulate();

  assertExpectedTurnsCount(t, result, 21.0);
  assertExpectedWinRate(t, result, 'Elite Frostweb Spider', 88);
  assertExpectedWinRate(t, result, 'Normal Frostweb Spiders', 12);
  t.end();
});

t.test('Characters with equipped weapons use weapon stats for accuracy and damage', (t) => {
  const barbarian = stock.getCharacter('Barbarian')!;
  const target = stock.getCharacter('Target Dummy')!;

  const team1 = createTeam('Barbarian Team', [barbarian]);
  const team2 = createTeam('Target Team', [target]);

  const scenario = createScenario([team1, team2]);
  const result = scenario.simulate();

  // Barbarian has 1 accuracy vs defense 1, which is 100% hit and 10% crit
  t.equal(result.averageHitRates['Barbarian Team'], 100, 'Barbarian should hit 100% of the time');
  // 1.1x hit damage per turn, 3 power, so 1d8+3 damage per hit. That's 8.25 damage per turn, which is 12.1 turns to kill.
  assertExpectedTurnsCount(t, result, 12.1);
  t.end();
});

// This is demonstrating correct behavior. Now that maneuver details are parsed, high level characters
// use the correct multipliers for their maneuvers.
t.test('High level characters use correct multipliers for maneuvers', (t) => {
  const barbarian = stock.getCharacter('Barbarian 21')!;
  const target = stock.getCharacter('Target Dummy 1000')!;

  const team1 = createTeam('Barbarian Team', [barbarian]);
  const team2 = createTeam('Target Team', [target]);

  const scenario = createScenario([team1, team2]);
  const result = scenario.simulate();

  t.equal(result.averageHitRates['Barbarian Team'], 100, 'Barbarian should hit 100% of the time');
  // 11 accuracy vs defense 0 means 100% crits. Since the combat simulator ignores double crits,
  // we can assume double damage.
  // A max rank weapon mult maneuver has 13 power, 6x weapon damage, extra damage equal to power.
  // Damage on a normal hit is 6d8 + 26 = 53. Damage per attack is 106.
  // So expected turns is 1000 / 106 = 9.43.
  assertExpectedTurnsCount(t, result, 9.43);
  t.end();
});
