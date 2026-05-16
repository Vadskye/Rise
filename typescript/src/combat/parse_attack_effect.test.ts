import tap from 'tap';
import { StockCharacters } from '@src/character_sheet/stock_characters';
import { parseAttackEffect } from './parse_attack_effect';
import { getSpellByName } from '@src/abilities/mystic_spheres';

tap.test('parseAttackEffect', (t) => {
  const stock = new StockCharacters();
  stock.addAllCharacters();
  const creature = stock.getCharacter('Barbarian 4')!;
  creature.setProperties({ is_monster: true });
  // Trigger recalculation to ensure derived attributes are updated.
  creature.getSheetForTesting().triggerRecalculation();

  t.test('Fireball', (t) => {
    creature.addSpell('Fireball');
    const ability = creature.getActiveAbility('Fireball')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Fireball');
    t.equal(parsed?.name, 'Fireball', 'should have correct name');
    t.same(parsed?.defenses, ['reflex'], 'should target Reflex');
    // Rank 3 Fireball deals \damageranktwo.
    // Magical Power 2, Rank 3 -> Excess 0 -> dr2 -> 1d10+1
    t.equal(parsed?.damage.toString(), '1d10+1', 'should calculate correct damage');
    t.equal(parsed?.areaRank, 3, 'should have correct area rank (Small radius in Short range)');
    t.equal(parsed?.accuracyModifier, 0, 'should have no accuracy modifier');
    t.equal(parsed?.cooldown, 0, 'should have no cooldown');
    t.equal(parsed?.halfOnMiss, true, 'should have halfOnMiss true');
    t.equal(parsed?.usageTime, 'standard', 'should default to standard usage time');
    t.end();
  });

  t.test('Disintegrate', (t) => {
    creature.addSpell('Disintegrate');
    const ability = creature.getActiveAbility('Disintegrate')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Disintegrate');
    t.same(parsed?.defenses, ['fortitude'], 'should target Fortitude');
    // Disintegrate is Rank 4, dr7. Wizard is Rank 1. 
    // dr7 power scaling is 1d10 per 2 power. Power 2 -> 1d10.
    // Base dice for dr7 is 1d10. So 1d10 + 1d10 = 2d10.
    t.equal(parsed?.damage.toString(), '2d10', 'should calculate correct damage (dr7 for power 2)');
    t.equal(parsed?.accuracyModifier, -4, 'should parse accuracy penalty');
    t.equal(parsed?.halfOnMiss, false, 'should have halfOnMiss false');
    t.end();
  });

  t.test('Searing Light', (t) => {
    creature.addSpell('Searing Light');
    const ability = creature.getActiveAbility('Searing Light')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Searing Light');
    // parseDefenses order is fortitude then reflex
    t.same(parsed?.defenses, ['fortitude', 'reflex'], 'should target Fortitude and Reflex');
    // drl(2) is 1d8+1d6. Barbarian 4 is Rank 2. Searing Light is Rank 1.
    // Excess 1 -> add 1d6 -> 2d6+1d8.
    t.equal(parsed?.damage.toString(), '2d6+1d8', 'should calculate correct damage (dr2low + excess 1)');
    t.end();
  });

  t.test('Mending', (t) => {
    creature.addSpell('Mending');
    const ability = creature.getActiveAbility('Mending')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Mending');
    // Mending is Rank 1, hprankfour.
    // dr(4) power scaling is 1d6 per 2 power. Power 2 -> 1d6.
    // Base dice for dr(4) is empty. So 1d6.
    t.equal(parsed?.damage.toString(), '1d6', 'should calculate correct healing (dr4 for power 2)');
    t.end();
  });

  t.test('Flame Breath', (t) => {
    creature.addSpell('Flame Breath');
    const ability = creature.getActiveAbility('Flame Breath')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Flame Breath');
    t.equal(parsed?.areaRank, 2, 'should have correct area rank (Medium cone)');
    t.equal(parsed?.cooldown, 2, 'should parse "briefly" cooldown');
    t.end();
  });

  t.test('Wall of Fire', (t) => {
    creature.addSpell('Wall of Fire');
    const ability = creature.getActiveAbility('Wall of Fire')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Wall of Fire');
    t.equal(parsed?.areaRank, 3, 'should have correct area rank (Medium wall in Medium range)');
    // BARRIER_COOLDOWN contains "briefly", so it parses as 2.
    t.equal(parsed?.cooldown, 2, 'should parse BARRIER_COOLDOWN as briefly (2)');
    t.end();
  });

  t.test('Fleshspike', (t) => {
    creature.addSpell('Fleshspike');
    const ability = creature.getActiveAbility('Fleshspike')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Fleshspike');
    t.same(parsed?.defenses, ['armor_defense'], 'should default strike to Armor');
    t.equal(parsed?.areaRank, 0, 'should have correct area rank (Adjacent)');
    // Fleshspike is Rank 1, damagerankthree. Barbarian 4 is Rank 2.
    // dr(3) power scaling is +1 per 1 power. Power 2 -> +2.
    // Base dice for dr(3) is 1d8. Excess 1 -> add 1d6. So 1d6+1d8+2.
    t.equal(parsed?.damage.toString(), '1d6+1d8+2', 'should calculate correct damage (dr3 + excess 1)');
    t.end();
  });

  t.test('Flesh-Rending Claw', (t) => {
    // Flesh-Rending Claw is a strike but lacks a weapon property, so it should still parse
    // but have an empty damage pool.
    creature.addSpell('Flesh-Rending Claw');
    const ability = creature.getActiveAbility('Flesh-Rending Claw')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Flesh-Rending Claw');
    t.same(parsed?.defenses, ['armor_defense'], 'should recognize strike as Armor');
    t.equal(parsed?.damage.toString(), '0', 'should have empty damage due to missing weapon');
    t.end();
  });

  t.test('Giant Wasp Venom', (t) => {
    creature.addSpell('Poison -- Giant Wasp Venom');
    const ability = creature.getActiveAbility('Poison -- Giant Wasp Venom')!;
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Giant Wasp Venom');
    t.equal(parsed?.accuracyModifier, 2, 'should parse accuracy bonus');
    t.end();
  });

  t.test('Manual usageTime override', (t) => {
    creature.addSpell('Fireball');
    const ability = creature.getActiveAbility('Fireball')!;
    ability.usageTime = 'minor';
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.usageTime, 'minor', 'should respect manual usageTime');
    t.end();
  });

  t.test('should find nothing for purely narrative spell (Forge)', (t) => {
    creature.addSpell('Forge');
    const ability = creature.getActiveAbility('Forge')!;
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed, null, 'should not parse purely narrative spell');
    t.end();
  });

  t.test('Psionic Blast', (t) => {
    creature.addSpell('Psionic Blast');
    const ability = creature.getActiveAbility('Psionic Blast')!;
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.areaRank, 3, 'should have correct area rank (Enemies in Medium cone)');
    t.end();
  });

  t.test('Hurricane', (t) => {
    creature.addSpell('Hurricane');
    const ability = creature.getActiveAbility('Hurricane')!;
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.areaRank, 4, 'should have correct area rank (Enemies in Medium radius from you)');
    t.end();
  });

  t.test('Windsnipe', (t) => {
    creature.addSpell('Windsnipe');
    const ability = creature.getActiveAbility('Windsnipe')!;
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.areaRank, 2, 'should have correct area rank (Something in Distant range)');
    t.end();
  });

  t.test('Split Fireball', (t) => {
    creature.addSpell('Split Fireball');
    const ability = creature.getActiveAbility('Split Fireball')!;
    const parsed = parseAttackEffect(ability, creature);
    t.equal(parsed?.areaRank, 3, 'should have correct area rank (Two tiny radii in Short range)');
    t.end();
  });

  t.test('Aggravated Violence (Archetype Ability)', (t) => {
    const ability = creature.getActiveAbility('Aggravated Violence')!;
    t.ok(ability, 'should have Aggravated Violence ability');
    const parsed = parseAttackEffect(ability, creature);
    t.ok(parsed, 'should parse Aggravated Violence');
    t.equal(parsed?.name, 'Aggravated Violence');
    t.same(parsed?.defenses, ['armor_defense'], 'should target Armor');
    t.equal(parsed?.accuracyModifier, 1, 'should parse accuracy bonus from rank 4 scaling');
    t.end();
  });

  t.end();
});
