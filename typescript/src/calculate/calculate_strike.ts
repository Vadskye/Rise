import { parseAttack } from "@src/attacks";
import { MonsterBase } from "@src/monsters";
import { StandardWeaponName, Weapon } from "@src/weapons";
import { calculateAttack, CalculatedAttack } from "./calculate_attack";

export function calculateStrike(monster: MonsterBase, weapon: Weapon): CalculatedAttack {
  const attack = parseAttack({
    name: weapon.name,
    powerMultiplier: 1,
    weaponName: weapon.name as StandardWeaponName,
  });
  return calculateAttack(attack, monster);
}
