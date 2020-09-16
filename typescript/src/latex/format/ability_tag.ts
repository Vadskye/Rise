import { AbilityTag } from "@src/ability_tags";

const tagPattern = /([^(]+)( \([^)]\))?/;

export function abilityTag(tag: AbilityTag) {
  const match = tag.match(tagPattern);
  if (!match) {
    throw new Error(`Unable to parse tag '${tag}'`);
  }

  const tagName = match[1];
  const parenthetical = match[2];
  return parenthetical ? `\\glossterm{${tagName}} (${parenthetical})` : `\\glossterm{${tagName}}`;
}

export function activeAbilityTags(tags: AbilityTag[]) {
  return tags.length > 0 ? `[${tags.map(abilityTag).join(", ")}]` : "";
}
