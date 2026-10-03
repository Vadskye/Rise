import { test } from 'tap';
import { getWeaponDamageDice, isHeavyWeapon, getWeaponPowerMultiplier } from './weapons';

test('getWeaponDamageDice', (t) => {
  t.test('returns base damage dice without increments', (t) => {
    t.same(getWeaponDamageDice('claw'), { count: 1, size: 4 });
    t.same(getWeaponDamageDice('bite'), { count: 1, size: 8 });
    t.same(getWeaponDamageDice('greatclub'), { count: 1, size: 10 });
    t.end();
  });

  t.test('doubles count for plural weapons without increments', (t) => {
    t.same(getWeaponDamageDice('claws'), { count: 2, size: 4 });
    t.same(getWeaponDamageDice('fists'), { count: 2, size: 6 });
    t.same(getWeaponDamageDice('smallswords'), { count: 2, size: 4 });
    t.end();
  });

  t.test('increments singular weapon damage dice along ladder', (t) => {
    // 1d4 -> 1d6 (+1) -> 1d8 (+2) -> 1d10 (+3)
    t.same(getWeaponDamageDice('claw', 1), { count: 1, size: 6 });
    t.same(getWeaponDamageDice('claw', 2), { count: 1, size: 8 });
    t.same(getWeaponDamageDice('claw', 3), { count: 1, size: 10 });

    // 1d8 -> 1d10 (+1) -> 2d6 (+2) -> 2d8 (+3)
    t.same(getWeaponDamageDice('bite', 1), { count: 1, size: 10 });
    t.same(getWeaponDamageDice('bite', 2), { count: 2, size: 6 });
    t.same(getWeaponDamageDice('bite', 3), { count: 2, size: 8 });
    t.end();
  });

  t.test('increments plural weapon damage dice correctly', (t) => {
    // Claws: base 1d4. +1 -> 1d6, plural -> 2d6
    t.same(getWeaponDamageDice('claws', 1), { count: 2, size: 6 });
    // +2 -> 1d8, plural -> 2d8
    t.same(getWeaponDamageDice('claws', 2), { count: 2, size: 8 });
    // +3 -> 1d10, plural -> 2d10
    t.same(getWeaponDamageDice('claws', 3), { count: 2, size: 10 });
    t.end();
  });

  t.test('isHeavyWeapon correctly identifies heavy and non-heavy weapons', (t) => {
    t.ok(isHeavyWeapon('greatsword'), 'greatsword is heavy');
    t.ok(isHeavyWeapon('greataxe'), 'greataxe is heavy');
    t.ok(isHeavyWeapon('greatclub'), 'greatclub is heavy');
    t.ok(isHeavyWeapon('greatmace'), 'greatmace is heavy');
    t.ok(isHeavyWeapon('heavy crossbow'), 'heavy crossbow is heavy');
    t.ok(isHeavyWeapon('heavy flail'), 'heavy flail is heavy');
    t.ok(isHeavyWeapon('giant boulder'), 'giant boulder is heavy');

    t.notOk(isHeavyWeapon('broadsword'), 'broadsword is not heavy');
    t.notOk(isHeavyWeapon('spear'), 'spear is not heavy');
    t.notOk(isHeavyWeapon('dagger'), 'dagger is not heavy');
    t.notOk(isHeavyWeapon('claw'), 'claw is not heavy');
    t.notOk(isHeavyWeapon('unknown_weapon_xyz'), 'unknown weapon is not heavy');
    t.end();
  });

  t.end();
});

test('getWeaponPowerMultiplier', (t) => {
  t.test('returns 1.0 for Heavy weapons', (t) => {
    t.equal(getWeaponPowerMultiplier('greatsword'), 1.0);
    t.equal(getWeaponPowerMultiplier('greataxe'), 1.0);
    t.equal(getWeaponPowerMultiplier('greatclub'), 1.0);
    t.equal(getWeaponPowerMultiplier('greatmace'), 1.0);
    t.equal(getWeaponPowerMultiplier('heavy flail'), 1.0);
    t.equal(getWeaponPowerMultiplier('heavy crossbow'), 1.0);
    t.equal(getWeaponPowerMultiplier('giant boulder'), 1.0);
    t.end();
  });

  t.test('returns 1.0 for natural weapons with Versatile Stance', (t) => {
    t.equal(getWeaponPowerMultiplier('bite'), 1.0);
    t.equal(getWeaponPowerMultiplier('horn'), 1.0);
    t.equal(getWeaponPowerMultiplier('horns'), 1.0);
    t.equal(getWeaponPowerMultiplier('ram'), 1.0);
    t.equal(getWeaponPowerMultiplier('stinger'), 1.0);
    t.equal(getWeaponPowerMultiplier('beak'), 1.0);
    t.end();
  });

  t.test('returns 0.5 for natural weapons without Versatile Stance', (t) => {
    t.equal(getWeaponPowerMultiplier('claw'), 0.5);
    t.equal(getWeaponPowerMultiplier('claws'), 0.5);
    t.equal(getWeaponPowerMultiplier('slam'), 0.5);
    t.equal(getWeaponPowerMultiplier('tentacle'), 0.5);
    t.equal(getWeaponPowerMultiplier('fist'), 0.5);
    t.equal(getWeaponPowerMultiplier('fists'), 0.5);
    t.equal(getWeaponPowerMultiplier('punch/kick'), 0.5);
    t.equal(getWeaponPowerMultiplier('talon'), 0.5);
    t.equal(getWeaponPowerMultiplier('talons'), 0.5);
    t.end();
  });

  t.test('returns 0.5 for Versatile Grip weapons (assumed 1-handed)', (t) => {
    t.equal(getWeaponPowerMultiplier('broadsword'), 0.5);
    t.equal(getWeaponPowerMultiplier('battleaxe'), 0.5);
    t.equal(getWeaponPowerMultiplier('pick'), 0.5);
    t.equal(getWeaponPowerMultiplier('warhammer'), 0.5);
    t.equal(getWeaponPowerMultiplier('spear'), 0.5);
    t.equal(getWeaponPowerMultiplier('club'), 0.5);
    t.equal(getWeaponPowerMultiplier('morning star'), 0.5);
    t.end();
  });

  t.test('returns 0.5 for standard light/other weapons', (t) => {
    t.equal(getWeaponPowerMultiplier('dart'), 0.5);
    t.equal(getWeaponPowerMultiplier('javelin'), 0.5);
    t.equal(getWeaponPowerMultiplier('smallsword'), 0.5);
    t.end();
  });

  t.end();
});
