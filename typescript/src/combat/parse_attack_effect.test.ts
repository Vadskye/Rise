import tap from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { handleEverything } from '@src/character_sheet/sheet_worker';
import { parseAttackEffect } from './parse_attack_effect';
import { ActiveAbility } from '@src/abilities/active_abilities';

tap.test('parseAttackEffect', (t) => {
  const creature = Creature.new();
  creature.setRequiredProperties({
    alignment: 'neutral',
    base_class: 'wizard',
    creature_origin: 'natural',
    creature_type: 'humanoid',
    level: 1,
    size: 'medium',
    elite: false,
  });
  creature.setProperties({
    willpower_at_creation: 4, // Willpower = 4 -> Magical Power = 4
    strength_at_creation: 4, // Strength = 4 -> Mundane Power = 4
    dexterity_at_creation: 2,
    is_monster: true,
  });
  // Trigger recalculation to ensure derived attributes like magical_power are updated.
  creature.getSheetForTesting().triggerRecalculation();

  t.test('should parse a simple spell vs. Reflex', (t) => {
    const ability: ActiveAbility = {
      name: 'Test Spell',
      rank: 1,
      isMagical: true,
      kind: 'spell',
      roles: ['burst'],
      attack: {
        hit: '\\damagerankone.',
        targeting: 'Make an attack vs. Reflex against one creature.',
      },
    };

    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.same(parsed?.defenses, ['reflex'], 'should parse reflex defense');
    t.equal(parsed?.damage.toString(), '1d6+2', 'should calculate correct damage');
    t.end();
  });

  t.test('should parse an area-of-effect spell', (t) => {
    const ability: ActiveAbility = {
      name: 'Fireball',
      rank: 3,
      isMagical: true,
      kind: 'spell',
      roles: ['clear'],
      attack: {
        hit: '\\damageranktwo.',
        targeting: 'Make an attack vs. Reflex against everything in a \\smallarea radius.',
      },
    };

    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.same(parsed?.defenses, ['reflex'], 'should parse reflex defense');
    t.equal(parsed?.areaRank, 3, 'should parse smallarea radius as rank 3');
    t.equal(parsed?.damage.toString(), '1d10+2', 'should calculate correct damage');
    t.end();
  });

  t.test('should parse a strike-based maneuver', (t) => {
    const ability: ActiveAbility = {
      name: 'Heavy Strike',
      rank: 1,
      isMagical: false,
      kind: 'maneuver',
      roles: ['burst'],
      weapon: 'slam' as any,
      effect: 'Make a strike with a \\plus2 accuracy bonus. It deals double damage.',
    };

    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.same(parsed?.defenses, ['armor_defense'], 'should default to armor for strikes');
    t.equal(parsed?.accuracyModifier, 2, 'should parse accuracy modifier');
    t.equal(parsed?.damage.toString(), '2d10+8', 'should calculate correct double damage');
    t.end();
  });

  t.test('should return null for non-combat abilities', (t) => {
    const ability: ActiveAbility = {
      name: 'Light',
      rank: 0,
      isMagical: true,
      kind: 'cantrip',
      roles: ['narrative'],
      effect: 'You create light.',
    };

    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed, null, 'should return null for non-attacks');
    t.end();
  });

  t.test('should parse multiple defenses', (t) => {
    const ability: ActiveAbility = {
      name: 'Pyrohemia',
      rank: 1,
      isMagical: true,
      kind: 'spell',
      roles: ['wildfire'],
      attack: {
        hit: '\\damagerankone.',
        targeting: 'Make an attack vs. Fortitude and Reflex against everything.',
      },
    };

    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed?.defenses.includes('fortitude'), 'should include fortitude');
    t.ok(parsed?.defenses.includes('reflex'), 'should include reflex');
    t.end();
  });

  t.end();
});
