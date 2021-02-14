import { attackIsDamaging, parseAttack } from "@src/attacks";
import { MonsterBase } from "@src/monsters";
import { StandardWeaponName, Weapon } from "@src/weapons";
import { calculateAttack, CalculatedDamagingAttack } from "./calculate_attack";

export function calculateStrike(monster: MonsterBase, weapon: Weapon): CalculatedDamagingAttack {
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
