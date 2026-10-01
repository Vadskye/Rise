# Implementation Plan: Accurate Weapon Strike Damage & Power Scaling

## 1. Overview & Context

In Rise, strike damage is defined by [comprehensive_codex/Combat.tex](file:///home/vadskye/github/Rise/comprehensive_codex/Combat.tex#L48-L55) and [Equipment.tex](file:///home/vadskye/github/Rise/comprehensive_codex/Equipment.tex#L324-L369):
- **Base Rule:** Strikes deal weapon damage dice plus **half** relevant Power ($\lfloor\text{Power} / 2\rfloor$, multiplier `0.5`).
- **Heavy Tag:** Wielded in two hands adds **full** Power (multiplier `1.0`).
- **Versatile Grip Tag:** Wielded in two hands adds **full** Power (multiplier `1.0`); in one hand adds **half** Power (`0.5`).
- **Versatile Stance Tag:** Quadrupedal, multipedal, or flying/gliding (for Beak) adds **full** Power (multiplier `1.0`); bipedal adds **half** Power (`0.5`).

Currently, [`typescript/src/monsters/weapons.ts`](file:///home/vadskye/github/Rise/typescript/src/monsters/weapons.ts#L117-L133) uses an inaccurate heuristic:
- Unconditionally grants `1.0` to all natural weapons (even those without Versatile Stance like Slam, Tentacle, or Claw).
- Unconditionally grants `0.5` to all manufactured weapons unless tagged Heavy, with hardcoded ad-hoc overrides for `giant boulder`, `pick`, and `heavy crossbow`.

This plan aligns the codebase with the rulebook using three explicit simplifying assumptions.

---

## 2. Simplifying Assumptions (To Be Documented in Code)

1. **Assume all creatures are quadrupedal:**
   - Any weapon with the `Versatile Stance` tag grants **full Power** (`1.0`).
   - Natural weapons **without** `Versatile Stance` (e.g. Claw, Punch/Kick, Slam, Talon, Tentacle) do not qualify and receive standard **half Power** (`0.5`).
2. **Assume all Heavy weapons are held in two hands:**
   - Any weapon with the `Heavy` tag grants **full Power** (`1.0`).
3. **Assume all Versatile Grip weapons are held in one hand:**
   - Any weapon with `Versatile Grip` (and lacking `Heavy`) receives standard **half Power** (`0.5`).
4. **Plural Weapons:**
   - Plural weapons (e.g. Claws, Smallswords, Talons, Darts, Fists) represent paired/dual weapons and receive **half Power** (`0.5`).
5. **Default:**
   - All other weapons default to standard **half Power** (`0.5`).

---

## 3. Detailed Changes

### A. Equipment Definitions ([`typescript/src/equipment/weapons.ts`](file:///home/vadskye/github/Rise/typescript/src/equipment/weapons.ts))
- **`GiantBoulder` Tagging:** Add `'Heavy'` tag to `StandardWeapon.GiantBoulder` in `STANDARD_WEAPONS` (`tags: ['Heavy', 'Impact', { kind: 'Thrown', close: 90, long: 180 }]`). Giant boulders thrown by giants require two hands, so giving them `Heavy` allows them to cleanly use the standard two-handed Heavy rule rather than an ad-hoc name-check in `monsters/weapons.ts`.
- **Audit Natural Weapon Tags:** Ensure all natural weapons match [Equipment.tex](file:///home/vadskye/github/Rise/comprehensive_codex/Equipment.tex#L591-L603):
  - With `Versatile Stance`: `Beak`, `Bite`, `Horns`, `Ram`, `Stinger`.
  - Without `Versatile Stance`: `Claw`, `PunchKick`, `Slam`, `Talon`, `Tentacle`.

### B. Power Multiplier Implementation ([`typescript/src/monsters/weapons.ts`](file:///home/vadskye/github/Rise/typescript/src/monsters/weapons.ts))
Refactor `getWeaponPowerMultiplier()` with thorough JSDoc documentation:
```typescript
/**
 * Calculates the power multiplier (0.5 for half power, 1.0 for full power) for a weapon strike.
 *
 * Ground truth rules (comprehensive_codex/Combat.tex and Equipment.tex):
 * - Base strike damage adds half relevant power (multiplier 0.5).
 * - Heavy: adding full power (multiplier 1.0) requires holding in two hands.
 * - Versatile Grip: adding full power (multiplier 1.0) requires holding in two hands (otherwise half power).
 * - Versatile Stance: adding full power (multiplier 1.0) requires being quadrupedal, multipedal, or flying/gliding for Beak.
 *
 * Simplifying assumptions:
 * 1. Assume that all creatures are quadrupedal: weapons with the 'Versatile Stance' tag grant full power (1.0).
 * 2. Assume that all Heavy weapons are held in two hands: weapons with the 'Heavy' tag grant full power (1.0).
 * 3. Assume that all Versatile Grip weapons are held in one hand: weapons with 'Versatile Grip' do not grant full power (remain 0.5).
 * 4. Plural weapons (e.g. claws, talons) represent paired/dual weapons and use half power (0.5).
 */
export function getWeaponPowerMultiplier(weaponName: MonsterWeapon): 0.5 | 1 {
  const base = resolveBaseWeapon(weaponName);
  if (base.isPlural) {
    return 0.5;
  }
  if (base.tags.includes('Heavy')) {
    return 1.0;
  }
  if (base.tags.includes('Versatile Stance')) {
    return 1.0;
  }
  return 0.5;
}
```
- Remove hardcoded `if (weaponName === 'giant boulder' || weaponName === 'pick') return 1.0;` (`pick` is Versatile Grip, so in 1 hand it correctly gets 0.5).
- Remove hardcoded `if (weaponName === 'heavy crossbow') return 0.5;` (heavy crossbow has `Heavy`, so under the assumption it gets 1.0).

### C. Update Rules Reference ([`.agent/rules/combat-math.md`](file:///home/vadskye/github/Rise/.agent/rules/combat-math.md))
Update Section 7 (Strike Damage Calculation):
- Document the tag-based Power Multiplier logic and the three simplifying assumptions.
- Clarify which natural weapons gain 1.0 (those with `Versatile Stance`) vs 0.5 (those without).
- Clarify that Versatile Grip weapons default to 0.5 under the 1-handed assumption.

### D. Update Test Suite
1. **[`typescript/src/monsters/weapons.test.ts`](file:///home/vadskye/github/Rise/typescript/src/monsters/weapons.test.ts):**
   - Add unit tests for `getWeaponPowerMultiplier()`:
     - Heavy weapons (`greatsword`, `greataxe`, `heavy flail`, `heavy crossbow`) -> `1.0`
     - Versatile Stance natural weapons (`bite`, `horn`, `ram`, `stinger`, `beak`) -> `1.0`
     - Natural weapons without Versatile Stance (`claw`, `slam`, `tentacle`, `fist`) -> `0.5`
     - Versatile Grip weapons (`broadsword`, `battleaxe`, `pick`, `warhammer`, `spear`) -> `0.5`
     - Plural weapons (`claws`, `talons`, `fists`, `smallswords`) -> `0.5`
2. **[`typescript/src/latex/monsters/replace_placeholders.test.ts`](file:///home/vadskye/github/Rise/typescript/src/latex/monsters/replace_placeholders.test.ts):**
   - Update line 340 test: `claw` now receives `0.5` power multiplier instead of `1.0` (Power 4 * 0.5 = 2 -> `1d6+2`).
   - Add or retain a test for `bite` (Versatile Stance -> Power 4 * 1.0 = 4 -> `1d10+4`).
3. **[`typescript/src/latex/monsters/player_abilities.test.ts`](file:///home/vadskye/github/Rise/typescript/src/latex/monsters/player_abilities.test.ts):**
   - Update line 175 test: change weapon from `tentacle` to `bite` or adjust expected damage for `tentacle` to reflect 0.5 power multiplier.

---

## 4. Verification Plan

1. **Unit Tests:**
   Run `npx tap dist-test/monsters/weapons.test.js` and `dist-test/latex/monsters/*.test.js` to ensure all tests pass.
2. **Full Test Suite:**
   Run `npm run build:test && npx tap dist-test/**/*.test.js` to verify no regressions across the entire suite.
3. **CLI Tools:**
   Execute `npx tsx src/scripts/explain_stock_character.ts` and verify stock characters (Fighter broadsword 0.5, etc.) compute damage correctly.
