export interface PassiveAbility {
  description: string;
  name: string;
}

export const passiveAbilities: Record<string, PassiveAbility> = {
  incorporeal: {
    description: `
      The $name has no physical body.
      It makes no sound while moving, and may be unaffected by other abilities that only affect corporeal creatures, such as \\glossterm{tremorsense}.
      It is immune to \\glossterm{physical} damage and all \\glossterm{mundane} abilities that do not deal damage.
      Whenever it would take damage, it has a 50\\% chance to take no damage instead.

      The $name can enter or pass through solid objects, but it must remain adjacent to the object's exterior at all times.
      While completely inside a solid object, the object provides \\glossterm{total cover}, so it must emerge from the object to attack or be attacked.
    `,
    name: "incorporeal",
  },
};
