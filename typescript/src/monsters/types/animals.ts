import { addType } from "./add_type";

export const animals = addType("animal", [
  // Brown bear
  {
    level: 3,
    name: "Bear, brown",
    size: "large" as const,
    startingAttributes: {
      str: 3,
      con: 2,
      per: 5,
    },
  },
]);
