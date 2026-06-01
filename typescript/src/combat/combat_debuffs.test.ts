import t from 'tap';
import { createCreature } from '@src/combat/combat_scenario';
import { applyDamageAndEffects } from './combat_turn';
import { FightState } from '@src/combat/combat_scenario';
import { Creature } from '@src/character_sheet/creature';
import { SimulatorReadyAttack } from '@src/abilities/active_abilities';

t.test('applyDamageAndEffects applies conditional debuffs only when injured', (t) => {
  const target = createCreature('Target');
  
  // Set explicit values to avoid edge cases with defaults
  target.setProperties({ hit_points: 100, injury_point: 50 });
  
  const state: Partial<FightState> = {
    hp: { [target.id]: 100 }, // Start uninjured
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
    debuffsToApply: [{ type: 'dazed', duration: 'condition', requirement: 'injured' }],
  };
  const attacker: Partial<Creature> = { id: 'attacker' };

  // Case 1: Target is NOT injured (HP > injury point)
  applyDamageAndEffects(
    target,
    0,
    'Hit',
    attack as SimulatorReadyAttack,
    state as FightState,
    attacker as Creature,
  );

  t.notOk(state.debuffs![target.id]?.length, 'Should NOT apply debuff when target is not injured');

  // Case 2: Target IS injured (HP <= injury point)
  state.hp![target.id] = 50;
  applyDamageAndEffects(
    target,
    0,
    'Hit',
    attack as SimulatorReadyAttack,
    state as FightState,
    attacker as Creature,
  );

  t.ok(state.debuffs![target.id]?.length, 'Should apply debuff when target is injured');
  t.equal(state.debuffs![target.id][0].type, 'dazed', 'Debuff should be dazed');

  t.end();
});
