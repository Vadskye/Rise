import { test } from 'tap';
import { getWeaponDamageDice } from './weapons';

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

  t.end();
});
