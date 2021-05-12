import { MonsterBase } from "@src/monsters";
import { attackIsDamaging, parseAttack, StandardWeaponName, Weapon } from "@src/monsters/mechanics";
import { calculateAttack, CalculatedDamagingAttack } from "./calculate_attack";

export function calculateStrike(
  monster: Pick<
    MonsterBase,
    "challengeRating" | "level" | "name" | "accuracy" | "magicalPower" | "mundanePower"
  >,
  weapon: Weapon,
): CalculatedDamagingAttack {
  const attack = parseAttack({
    baseDamageDie: weapon.baseDamageDie,
    name: weapon.name,
    powerMultiplier: weapon.powerMultiplier,
    weaponName: weapon.name as StandardWeaponName,
  });
  if (attackIsDamaging(attack)) {
    return calculateAttack(attack, monster);
  } else {
    throw new Error("Unable to calculate strike without base damage die");
  }
}
