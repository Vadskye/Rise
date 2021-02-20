import { Spell } from "@src/mystic_spheres";

function assertEndsWithPeriod(text: string | null | undefined) {
  if (text && !text.trim().endsWith(".")) {
    throw new Error(`Text should end with period: ${text}`);
  }
}

export function spellEffect(
  spell: Pick<Spell, "attack" | "effect" | "functionsLike">,
): string | null {
  if (spell.attack) {
    assertEndsWithPeriod(spell.attack.target);
    assertEndsWithPeriod(spell.attack.hit);
    assertEndsWithPeriod(spell.attack.glance);
    assertEndsWithPeriod(spell.attack.crit);
    return `
      ${spell.attack.target.trim()}
      \\hit ${spell.attack.hit.trim()}
      ${spell.attack.glance ? `\\glance ${spell.attack.glance.trim()}` : ""}
      ${spell.attack.crit ? `\\crit ${spell.attack.crit.trim()}` : ""}
    `;
  } else if (spell.effect) {
    return spell.effect;
  } else if (spell.functionsLike) {
    assertEndsWithPeriod(spell.functionsLike.exceptThat);
    return `
      This spell functions like the \\spell{${
        spell.functionsLike.spell
      }} spell, except that ${spell.functionsLike.exceptThat.trim()}
    `;
  } else {
    return null;
  }
}
