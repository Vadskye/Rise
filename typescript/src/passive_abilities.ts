import { MonsterBase } from "@src/monsters/reformat_monster_input";

export interface PassiveAbility {
  description?: ((monster: MonsterBase) => string) | string;
  magical?: boolean;
  name: string;
}

export const passiveAbilities: Record<string, PassiveAbility> = {
  incorporeal: {
    description: `
      The $name is \\glossterm{incorporeal}.
      It does not have a tangible body, and is immune to \\glossterm{physical damage}.
      It can enter or pass through solid objects.
    `,
    name: "Incorporeal",
  },
  pounce: {
    description: `
      The $name can use the \\textit{charge} ability without spending a \\glossterm{hit point} (see \\pcref{Charge}).
    `,
    name: "Pounce",
  },
};
