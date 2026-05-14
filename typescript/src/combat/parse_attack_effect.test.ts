import tap from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { parseAttackEffect } from './parse_attack_effect';
import { standardizeManeuver, standardizeSpell } from '@src/abilities/active_abilities';
import { getSpellByName } from '@src/abilities/mystic_spheres';
import { getManeuverByName } from '@src/abilities/combat_styles';

tap.test('parseAttackEffect', (t) => {
  const stock = new StockCharacters();
  stock.addAllCharacters();
  const creature = stock.getCharacter('Wizard')!;
  creature.setProperties({ is_monster: true });
  // Trigger recalculation to ensure derived attributes are updated.
  creature.getSheetForTesting().triggerRecalculation();

  t.test('should parse real Color Spray (vs. Reflex and Mental)', (t) => {
    const ability = standardizeSpell(getSpellByName('Color Spray'));
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.ok(parsed?.defenses.includes('reflex'), 'should parse reflex defense');
    t.ok(parsed?.defenses.includes('mental'), 'should parse mental defense');
    t.end();
  });

  t.test('should parse real simple spell vs. Reflex and Fortitude (Searing Light)', (t) => {
    const ability = standardizeSpell(getSpellByName('Searing Light'));
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.ok(parsed?.defenses.includes('reflex'), 'should parse reflex defense');
    t.ok(parsed?.defenses.includes('fortitude'), 'should parse fortitude defense');
    t.end();
  });

  t.test('should parse real Fireball (Rank 3 AOE)', (t) => {
    const ability = standardizeSpell(getSpellByName('Fireball'));
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.same(parsed?.defenses, ['reflex'], 'should parse reflex defense');
    t.equal(parsed?.areaRank, 3, 'should parse smallarea radius as rank 3');
    // Rank 3 Fireball deals \damageranktwo.
    // Magical Power 2, Rank 3 -> Excess 0 -> dr2 -> 1d10+1
    t.equal(parsed?.damage.toString(), '1d10+1', 'should calculate correct damage');
    t.end();
  });

  t.test('should parse real Sneak Attack 1 (Strike-based)', (t) => {
    const ability = standardizeManeuver(getManeuverByName('Sneak Attack 1'));
    // We need to give it a weapon for the strike to work
    ability.weapon = 'smallswords';

    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should return a parsed attack');
    t.same(parsed?.defenses, ['armor_defense'], 'should default to armor for strikes');
    t.end();
  });

  t.test('should return null for real narrative spell (Forge)', (t) => {
    // Note: cantrips are already standardized in getSpellByName with my recent change, 
    // but standardizeSpell is safe to call.
    const ability = standardizeSpell(getSpellByName('Forge'));
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed, null, 'should return null for non-attacks');
    t.end();
  });

  t.test('should parse real Pyrohemia (Multiple Defenses)', (t) => {
    const ability = standardizeSpell(getSpellByName('Pyrohemia'));
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed?.defenses.includes('fortitude'), 'should include fortitude');
    t.ok(parsed?.defenses.includes('reflex'), 'should include reflex');
    t.end();
  });

  t.test('should parse real Flame Breath (Cooldown)', (t) => {
    const ability = standardizeSpell(getSpellByName('Flame Breath'));
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.cooldown, 2, 'should parse briefly as 2-round cooldown');
    t.end();
  });

  t.test('should return null for Mystic Bolt (No explicit defense)', (t) => {
    const ability = standardizeSpell(getSpellByName('Mystic Bolt'));
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed, null, 'should return null because it has no explicit defense in text');
    t.end();
  });

  t.end();
});
