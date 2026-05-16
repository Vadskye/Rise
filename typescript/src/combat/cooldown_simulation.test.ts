import t from 'tap';
import { createCreature, createTeam, createScenario } from '@src/combat/combat_scenario';
import { ActiveAbility } from '@src/abilities/active_abilities';

t.test('Cooldown Tracking in Simulation', (t) => {
  // Create a creature with a powerful ability that has a cooldown
  const attacker = createCreature('Attacker', (c) => {
    c.setProperties({
      hit_points: 100,
      accuracy: 20, // Guaranteed hit
      mundane_power: 10,
    });

    // Powerful ability with 1-round cooldown
    const powerBlast: ActiveAbility = {
      name: 'Power Blast',
      rank: 1,
      isMagical: false,
      kind: 'maneuver',
      roles: ['burst'],
      effect: "You \\briefly can't use this ability again.",
      attack: {
        hit: '100 damage', // High damage
        targeting: 'Make an attack vs. Armor.',
      },
    };
    c.addActiveAbility(powerBlast);

    // Weak ability with no cooldown
    const weakPoke: ActiveAbility = {
      name: 'Weak Poke',
      rank: 1,
      isMagical: false,
      kind: 'maneuver',
      roles: ['burst'],
      attack: {
        hit: '1 damage', // Low damage
        targeting: 'Make an attack vs. Armor.',
      },
    };
    c.addActiveAbility(weakPoke);
  });

  const target = createCreature('Target', (c) => {
    c.setProperties({
      hit_points: 1000,
      armor_defense: 0,
    });
  });

  const team1 = createTeam('Attackers', [attacker]);
  const team2 = createTeam('Targets', [target]);

  const scenario = createScenario([team1, team2]);

  // We'll simulate a single fight and check the HP progress if possible,
  // or just use the average turns to infer behavior.
  // Power Blast (100) + Weak Poke (1) = 101 damage every 2 turns.
  // To deal 1000 damage:
  // Turn 1: Power Blast (100) -> 900 left
  // Turn 2: Weak Poke (1) -> 899 left
  // Turn 3: Power Blast (100) -> 799 left
  // ...
  // It takes 10 cycles of (100 + 1) = 1010 damage.
  // 10 cycles * 2 turns/cycle = 20 turns.
  // If it could use Power Blast every turn, it would take 10 turns.
  // If it only used Weak Poke, it would take 1000 turns.

  // Power Blast (200 damage on crit) + Weak Poke (2 damage on crit) = 202 damage every 2 turns.
  // To deal 1000 damage: ~5 cycles.
  // Turn 1, 3, 5, 7, 9 (Power Blast)
  // Turn 2, 4, 6, 8 (Weak Poke)
  // Total damage after Turn 9: (5 * 200) + (4 * 2) = 1008.
  // So it should take exactly 9 turns.

  const result = scenario.simulate(100);

  // Expected turns: 9
  t.equal(result.averageTurns, 9, 'Average turns should be exactly 9 if alternating correctly');

  t.end();
});
