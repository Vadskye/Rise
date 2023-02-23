import { SpellLike } from "@src/mystic_spheres";

export function spellScaling(spell: Pick<SpellLike, "name" | "scaling" | "rank">): string | null {
  if (!spell.scaling) {
    return null;
  }

  if (spell.rank === 7) {
    return null;
  }

  // Cantrips have no rank listed
  const rank = spell.rank || 0;

  if (spell.scaling === "accuracy") {
    return `The attack's \\glossterm{accuracy} increases by +1 for each rank beyond ${rank}.`;
  } else if (spell.scaling.special) {
    return spell.scaling.special;
  } else if (spell.scaling && typeof spell.scaling === "object") {
    const scaling: Record<string, string> = spell.scaling;
    const ranks = Object.keys(scaling).sort((a, b) => Number(a) - Number(b));
    return ranks.map((rank) => `\\rank{${rank}} ${scaling?.[rank]}`).join("\n");
  } else {
    throw new Error(`Spell ${spell.name} has unrecognized scaling: '${spell.scaling}'`);
  }
}
