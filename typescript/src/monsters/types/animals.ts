import { addType } from "./add_type";

export const animals = addType("animal", [
  // Brown bear
  {
    level: 3,
    name: "Bear, brown",
    startingAttributes: {
      str: 3,
      per: 5,
    },
  },
]);
