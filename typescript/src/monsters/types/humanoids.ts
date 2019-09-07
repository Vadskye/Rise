import { addType } from "./add_type";

export const humanoids = addType("humanoid", [
  // Orc elite
  {
    attributes: {
      str: 3,
    },
    level: 8,
    name: "Orc elite",
  },
]);
