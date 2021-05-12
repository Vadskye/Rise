import { AbilityTag } from "@src/data";

interface StandardActiveAbilityInput {
  name: StandardActiveAbilityName;
}

interface CustomActiveAbilityInput {
  effect: string;
  name: string;
  target: string;
  tags: AbilityTag[];
  source?: "magical" | "mundane";
}

export type ActiveAbilityInput = StandardActiveAbilityInput | CustomActiveAbilityInput;

export type ActiveAbility = Required<CustomActiveAbilityInput>;

function isStandardActiveAbility(
  activeAbility: ActiveAbilityInput,
): activeAbility is StandardActiveAbilityInput {
  return Boolean(standardActiveAbilities[(activeAbility as StandardActiveAbilityInput).name]);
}

type StandardActiveAbilityName = "propulsion";

const standardActiveAbilities: Record<StandardActiveAbilityName, Omit<ActiveAbility, "name">> = {
  propulsion: {
    effect: "wheeee",
    source: "magical",
    tags: [],
    target: "someone",
  },
};

export function parseActiveAbility(input: ActiveAbilityInput): ActiveAbility {
  if (isStandardActiveAbility(input)) {
    return {
      ...standardActiveAbilities[input.name],
      ...input,
    };
  } else {
    return {
      source: "mundane",
      ...input,
    };
  }
}
