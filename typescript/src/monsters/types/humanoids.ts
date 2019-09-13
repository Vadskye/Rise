import { addType } from "./add_type";

export const humanoids = addType("humanoid", [
  // Orc elite
  {
    level: 8,
    name: "Orc elite",
    resistanceBonuses: {
      physical: 3,
    },
    startingAttributes: {
      str: 3,
    },
    weaponInput: [{ name: "greataxe" }],
  },
]);
