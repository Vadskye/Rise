import t from 'tap';
import { parseAttackEffect } from '@src/combat/parse_attack_effect';
import { ActiveAbility } from '@src/abilities/active_abilities';
import { Creature } from '@src/character_sheet/creature';

t.test('parseCooldown - Cooldown in Cost', (t) => {
  const creature = Creature.fromName('Test Creature');

  const ability: ActiveAbility = {
    name: 'Cooldown in Cost',
    rank: 1,
    isMagical: false,
    kind: 'maneuver',
    roles: ['burst'],
    cost: 'Briefly cannot use again',
    effect: 'Hit some things',
    attack: {
      hit: '10 damage',
      targeting: 'Attack vs. Armor',
    },
  };

  const parsed = parseAttackEffect(ability, creature);
  t.ok(parsed, 'Ability should be parsed');
  t.equal(parsed?.cooldown, 2, 'Cooldown should be 2 for "Briefly"');

  const ability2: ActiveAbility = {
    name: 'Numeric Cooldown in Cost',
    rank: 1,
    isMagical: false,
    kind: 'maneuver',
    roles: ['burst'],
    cost: '3-round cooldown',
    effect: 'Hit some things',
    attack: {
      hit: '10 damage',
      targeting: 'Attack vs. Armor',
    },
  };

  const parsed2 = parseAttackEffect(ability2, creature);
  t.ok(parsed2, 'Ability 2 should be parsed');
  t.equal(parsed2?.cooldown, 3, 'Cooldown should be 3');

  t.end();
});
