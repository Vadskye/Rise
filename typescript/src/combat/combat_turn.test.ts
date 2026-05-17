import t from 'tap';
import { createCreature } from '@src/combat/combat_scenario';
import {
  removeDebuffs,
  handleEndOfTurn,
  calculateHitDegree,
  calculateDamageDealt,
  applyDamage,
} from './combat_turn';
import { FightState } from '@src/combat/combat_scenario';
import { Creature } from '@src/character_sheet/creature';
import { SimulatorReadyAttack } from '@src/abilities/active_abilities';

t.test('removeDebuffs removes specified number of debuffs', (t) => {
  const creature = createCreature('Test Creature');
  const state: Partial<FightState> = {
    conditions: {
      [creature.id]: [
        { type: 'stunned', sourceId: 'source' },
        { type: 'poisoned', sourceId: 'source' },
        { type: 'blinded', sourceId: 'source' },
      ],
    },
    verbose: false,
    round: 1,
  };

  removeDebuffs(creature, state as FightState, 2);

  t.equal(state.conditions![creature.id].length, 1, 'Should have 1 debuff left');
  t.equal(state.conditions![creature.id][0].type, 'blinded', 'Remaining debuff should be the last one');
  t.end();
});

t.test('removeDebuffs handles removing more debuffs than present', (t) => {
  const creature = createCreature('Test Creature');
  const state: Partial<FightState> = {
    conditions: {
      [creature.id]: [
        { type: 'stunned', sourceId: 'source' },
      ],
    },
    verbose: false,
    round: 1,
  };

  removeDebuffs(creature, state as FightState, 5);

  t.equal(state.conditions![creature.id].length, 0, 'Should have 0 debuffs left');
  t.end();
});

t.test('handleEndOfTurn expires brief conditions applied by attacker', (t) => {
  const attacker = createCreature('Attacker');
  const target = createCreature('Target');
  const state: Partial<FightState> = {
    conditions: {
      [target.id]: [
        { type: 'stunned', sourceId: attacker.id, durationRemaining: 1 },
        { type: 'poisoned', sourceId: 'other', durationRemaining: 1 },
        { type: 'blinded', sourceId: attacker.id, durationRemaining: 2 },
      ],
    },
    aliveMembersByTeam: {
      'Team A': [attacker],
      'Team B': [target],
    },
    verbose: false,
    round: 1,
  };

  handleEndOfTurn(attacker, state as FightState);

  const targetConditions = state.conditions![target.id];
  t.equal(targetConditions.length, 2, 'Should have 2 conditions left');
  
  // Stunned should be removed (duration was 1 -> 0)
  t.notOk(targetConditions.some(c => c.type === 'stunned'), 'Stunned should be removed');
  
  // Poisoned should remain (sourceId was 'other')
  t.ok(targetConditions.some(c => c.type === 'poisoned'), 'Poisoned should remain');
  t.equal(targetConditions.find(c => c.type === 'poisoned')!.durationRemaining, 1, 'Poisoned duration should not change');
  
  // Blinded should remain (duration was 2 -> 1)
  t.ok(targetConditions.some(c => c.type === 'blinded'), 'Blinded should remain');
  t.equal(targetConditions.find(c => c.type === 'blinded')!.durationRemaining, 1, 'Blinded duration should be decremented');
  
  t.end();
});

t.test('calculateHitDegree returns correct hit degree', (t) => {
  const attacker = createCreature('Attacker');
  attacker.setProperties({ accuracy: 5 });
  
  const defender = createCreature('Defender');
  defender.setProperties({ armor_defense: 10 });
  
  const attack: Partial<SimulatorReadyAttack> = {
    name: 'Test Attack',
    defenses: ['armor_defense'],
    accuracyModifier: 0,
    damage: null as any,
    cooldown: 0,
    halfOnMiss: false,
    usageTime: 'standard',
    areaRank: null,
  };

  const originalRandom = Math.random;

  // Case 1: Miss (Roll 1 -> total 6 < 10)
  Math.random = () => 0.0; // Roll 1
  let result = calculateHitDegree(attacker, defender, attack as SimulatorReadyAttack, {} as FightState);
  t.equal(result.degree, 'Miss', 'Should miss');

  // Case 2: Hit (Roll 5 -> total 10 >= 10)
  Math.random = () => 0.4; // Roll 5 (0.4 * 10 = 4, floor is 4 + 1 = 5)
  result = calculateHitDegree(attacker, defender, attack as SimulatorReadyAttack, {} as FightState);
  t.equal(result.degree, 'Hit', 'Should hit');

  // Case 3: Crit (Roll 10 + 5 -> total 20 >= 20)
  let rollCount = 0;
  Math.random = () => {
    rollCount++;
    if (rollCount === 1) return 0.99; // Roll 10
    return 0.4; // Roll 5
  };
  result = calculateHitDegree(attacker, defender, attack as SimulatorReadyAttack, {} as FightState);
  t.equal(result.degree, 'Crit', 'Should crit on exploding roll');

  Math.random = originalRandom;
  t.end();
});

t.test('applyDamage reduces HP and handles death', (t) => {
  const target = createCreature('Target');
  target.setProperties({ hit_points: 10 });
  
  const state: Partial<FightState> = {
    hp: { [target.id]: 10 },
    aliveMembersByTeam: {
      'Team A': [target],
    },
    memberToTeam: {
      [target.id]: { name: 'Team A', members: [target] },
    },
    verbose: false,
    round: 1,
  };

  applyDamage(target, 5, state as FightState);
  t.equal(state.hp![target.id], 5, 'HP should be reduced');
  t.equal(state.aliveMembersByTeam!['Team A'].length, 1, 'Target should still be alive');

  applyDamage(target, 5, state as FightState);
  t.equal(state.hp![target.id], 0, 'HP should be 0');
  t.equal(state.aliveMembersByTeam!['Team A'].length, 0, 'Target should be dead and removed from team');
  t.end();
});
