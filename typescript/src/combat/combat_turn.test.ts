import t from 'tap';
import { createCreature } from '@src/combat/combat_scenario';
import {
  removeDebuffs,
  handleEndOfTurn,
  calculateHitDegree,
  applyDamageAndEffects,
} from './combat_turn';
import { FightState } from '@src/combat/combat_scenario';
import { Creature } from '@src/character_sheet/creature';
import { SimulatorReadyAttack } from '@src/abilities/active_abilities';

t.test('removeDebuffs removes specified number of debuffs', (t) => {
  const creature = createCreature('Test Creature');
  const state: Partial<FightState> = {
    debuffs: {
      [creature.id]: [
        { type: 'stunned', sourceId: 'source', duration: 'condition' },
        { type: 'poisoned', sourceId: 'source', duration: 'condition' },
        { type: 'blinded', sourceId: 'source', duration: 'condition' },
      ],
    },
    verbose: false,
    round: 1,
  };

  removeDebuffs(creature, state as FightState, 2);

  t.equal(state.debuffs![creature.id].length, 1, 'Should have 1 debuff left');
  t.equal(
    state.debuffs![creature.id][0].type,
    'blinded',
    'Remaining debuff should be the last one',
  );
  t.end();
});

t.test('removeDebuffs handles removing more debuffs than present', (t) => {
  const creature = createCreature('Test Creature');
  const state: Partial<FightState> = {
    debuffs: {
      [creature.id]: [{ type: 'stunned', sourceId: 'source', duration: 'condition' }],
    },
    verbose: false,
    round: 1,
  };

  removeDebuffs(creature, state as FightState, 5);

  t.equal(state.debuffs![creature.id].length, 0, 'Should have 0 debuffs left');
  t.end();
});

t.test('handleEndOfTurn expires brief conditions applied by attacker', (t) => {
  const attacker = createCreature('Attacker');
  const target = createCreature('Target');
  const state: Partial<FightState> = {
    debuffs: {
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

  const targetDebuffs = state.debuffs![target.id];
  t.equal(targetDebuffs.length, 2, 'Should have 2 debuffs left');

  // Stunned should be removed (duration was 1 -> 0)
  t.notOk(
    targetDebuffs.some((c) => c.type === 'stunned'),
    'Stunned should be removed',
  );

  // Poisoned should remain (sourceId was 'other')
  t.ok(
    targetDebuffs.some((c) => c.type === 'poisoned'),
    'Poisoned should remain',
  );
  t.equal(
    targetDebuffs.find((c) => c.type === 'poisoned')!.durationRemaining,
    1,
    'Poisoned duration should not change',
  );

  // Blinded should remain (duration was 2 -> 1)
  t.ok(
    targetDebuffs.some((c) => c.type === 'blinded'),
    'Blinded should remain',
  );
  t.equal(
    targetDebuffs.find((c) => c.type === 'blinded')!.durationRemaining,
    1,
    'Blinded duration should be decremented',
  );

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
  let result = calculateHitDegree(
    attacker,
    defender,
    attack as SimulatorReadyAttack,
    {} as FightState,
  );
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

t.test('applyDamageAndEffects reduces HP and handles death', (t) => {
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
    debuffs: {},
    verbose: false,
    round: 1,
  };

  const dummyAttack: Partial<SimulatorReadyAttack> = {};
  const dummyAttacker: Partial<Creature> = { id: 'attacker' };

  applyDamageAndEffects(
    target,
    5,
    'Hit',
    dummyAttack as SimulatorReadyAttack,
    state as FightState,
    dummyAttacker as Creature,
  );
  t.equal(state.hp![target.id], 5, 'HP should be reduced');
  t.equal(state.aliveMembersByTeam!['Team A'].length, 1, 'Target should still be alive');

  applyDamageAndEffects(
    target,
    5,
    'Hit',
    dummyAttack as SimulatorReadyAttack,
    state as FightState,
    dummyAttacker as Creature,
  );
  t.equal(state.hp![target.id], 0, 'HP should be 0');
  t.equal(
    state.aliveMembersByTeam!['Team A'].length,
    0,
    'Target should be dead and removed from team',
  );
  t.end();
});

t.test('applyDamageAndEffects applies debuffs and updates stats', (t) => {
  const target = createCreature('Target');
  target.setProperties({ hit_points: 10, armor_defense: 10 });

  const state: Partial<FightState> = {
    hp: { [target.id]: 10 },
    aliveMembersByTeam: {
      'Team A': [target],
    },
    memberToTeam: {
      [target.id]: { name: 'Team A', members: [target] },
    },
    debuffs: {},
    verbose: false,
    round: 1,
  };

  const attack: Partial<SimulatorReadyAttack> = {
    debuffsToApply: [{ type: 'stunned', duration: 'condition' }],
  };
  const attacker: Partial<Creature> = { id: 'attacker' };

  applyDamageAndEffects(
    target,
    0,
    'Hit',
    attack as SimulatorReadyAttack,
    state as FightState,
    attacker as Creature,
  );

  t.ok(state.debuffs![target.id], 'Should have debuffs for target');
  t.equal(state.debuffs![target.id].length, 1, 'Should have 1 debuff');
  t.equal(state.debuffs![target.id][0].type, 'stunned', 'Debuff should be stunned');

  const updatedProps = target.getPropertyValues(['armor_defense_debuff_modifier' as any]) as any;
  t.equal(
    updatedProps.armor_defense_debuff_modifier,
    -2,
    'Armor defense debuff modifier should be -2',
  );

  t.end();
});
