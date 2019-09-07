import { addType } from "./add_type";

export const animals = addType("animal", [
  // Brown bear
  {
    attributes: {
      str: 3,
      per: 5,
    },
    level: 3,
    name: "Bear, brown",
  },
]);
