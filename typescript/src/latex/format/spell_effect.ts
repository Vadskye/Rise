import { SpellLike } from "@src/mystic_spheres";

export function assertEndsWithPeriod(text: string | null | undefined): void {
  if (text && !text.trim().endsWith(".")) {
    throw new Error(`Text should end with period: ${text}`);
  }
}

export function spellEffect(
  spell: Pick<SpellLike, "attack" | "castingTime" | "effect" | "functionsLike" | "rank" | "name">,
  spellCategory: "spell" | "maneuver" | "ritual",
): string | null {
  try {
    if (spell.castingTime && spell.castingTime !== "minor action") {
      spellCategory = "ritual";
    }

    let fatiguePointsText = "";
    if (spellCategory === "ritual") {
      const fatigueLevel =
        spell.castingTime === "24 hours" || spell.castingTime === "one week"
          ? `${Math.pow(spell.rank || 0, 2) * 2} \\glossterm{fatigue levels}`
          : "one \\glossterm{fatigue level}";
      fatiguePointsText = `\n\nThis ritual requires ${fatigueLevel} from its participants.`;
    }

    if (spell.attack) {
      assertEndsWithPeriod(spell.attack.targeting);
      assertEndsWithPeriod(spell.attack.hit);
      assertEndsWithPeriod(spell.attack.crit);
      // The terminal % prevents a double-space in weird edge cases
      return `
        ${spell.attack.targeting.trim() + fatiguePointsText}%
        \\vspace{0.25em}
        \\hit ${spell.attack.hit.trim()}
        ${spell.attack.crit ? `\\crit ${spell.attack.crit.trim()}` : ""}
      `;
    } else if (spell.effect) {
      return fatiguePointsText
        ? `
          ${spell.effect}
          ${fatiguePointsText}
        `.trim()
        : spell.effect.trim();
    } else if (spell.functionsLike) {
      const exceptThat = spell.functionsLike.mass
        ? "it affects up to five creatures of your choice from among yourself and your \\glossterm{allies} within \\medrange."
        : spell.functionsLike.exceptThat;
      assertEndsWithPeriod(exceptThat);
      if (!exceptThat) {
        throw new Error(`Must have a defined 'exceptThat' in a 'functionsLike'`);
      }

      const referencedCategory = spell.functionsLike.abilityType || spellCategory;

      return `
        This ${spellCategory} functions like the \\${referencedCategory}{${spell.functionsLike.name.toLowerCase()}} ${referencedCategory}, except that ${exceptThat.trim()}
        ${fatiguePointsText}
      `.trim();
    } else {
      return null;
    }
  } catch (err) {
    err.message += `Error converting spell ${spell.name} to LaTeX: ${err.message}`;
    throw err;
  }
}
