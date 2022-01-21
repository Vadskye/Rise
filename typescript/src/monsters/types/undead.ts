import { parseActiveAbility, parseAttack, passiveAbilities } from "@src/monsters/mechanics";
import { MonsterBaseInput } from "@src/monsters/reformat_monster_input";
import { addType, TypelessMonsterInput } from "./add_type";

export const undeadInput: TypelessMonsterInput[] = [];

export const undead = addType("undead", undeadInput);
