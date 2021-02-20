import { SpellLike } from "@src/mystic_spheres";

export function spellScaling(spell: Pick<SpellLike, "scaling" | "rank">): string | null {
  if (spell.scaling === "accuracy") {
    return `You gain a +1 bonus to \\glossterm{accuracy} with the attack for each rank beyond ${spell.rank}.`;
  } else if (spell.scaling === "damage") {
    return `The damage increases by +1d for each rank beyond ${spell.rank}.`;
  } else if (spell.scaling) {
    const ranks = Object.keys(spell.scaling)
      .map(Number)
      .sort((a, b) => a - b);
    return ranks.map((rank) => `\\rank{${rank}} ${spell.scaling?.[rank]}`).join("\n");
  } else {
    return null;
  }
}
