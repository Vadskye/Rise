import { Rank, SpellLike, StandardAttack } from "@src/mystic_spheres";

export function assertEndsWithPeriod(text: string | null | undefined, effectName: string): void {
  if (text && !(text.trim().endsWith(".") || text.trim().endsWith("{itemizespace}{}"))) {
    console.error(`Text from ${effectName} should end with period: ${text}`);
  }
}

export function assertStartsWithLowercase(text: string | null | undefined, effectName: string): void {
  if (text && !(text.trim().match(/^[a-z]/))) {
    console.error(`Text from ${effectName} should start with lowercase: ${text}`);
  }
}

// TODO: add checking for nonsensical crit effects
function assertHasCorrectCrit(attack: StandardAttack, effectName: string): void {
  const dealsRepeatDamage = /damage.*immediately.*again/.test(attack.hit)
  if (dealsRepeatDamage && attack.crit === undefined) {
    console.error(`Attack from ${effectName} should have explicit crit effect for a multi-hit attack`);
  }

  const inflictsCondition = /condition/.test(attack.hit)
  const dealsDamage = /\\damage/.test(attack.hit)
  const grantsImmunity = /immun.*short rest/.test(attack.hit)
  if (inflictsCondition && !dealsDamage && attack.crit === undefined) {
    console.error(`Attack from ${effectName} should have explicit crit effect for condition removal`);
  } else if (grantsImmunity && !dealsDamage && attack.crit === undefined) {
    console.error(`Attack from ${effectName} should have explicit crit effect for removing immunity`);
  }
}

function assertHasCorrectGlance(attack: StandardAttack, effectName: string) {
  const dealsAoeDamage = /(ach target|verything).*\\damage/.test(attack.hit)
  // We check for undefined to ignore cases where we explicitly defined missGlance to be
  // false, which probably means the omission is intentional.
  if (dealsAoeDamage && attack.missGlance === undefined) {
    console.error(`Attack from ${effectName} should probably have missGlance = true`);
  } else if (attack.missGlance && !dealsAoeDamage) {
    console.error(`Attack from ${effectName} should probably have missGlance = false`);
  }
}

export function spellEffect(
  spell: Pick<SpellLike, "attack" | "castingTime" | "effect" | "functionsLike" | "materialCost" | "rank" | "name">,
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
      const materialCostText = spell.materialCost
        ? ` and the consumption of diamond dust with the equivalent value of a rank ${spell.rank} item (${calculateGp(spell.rank)})`
        : "";
      fatiguePointsText = `\n\nThis ritual requires ${fatigueLevel} from its participants${materialCostText}.`;
    }

    if (spell.attack) {
      assertEndsWithPeriod(spell.attack.targeting, spell.name);
      assertEndsWithPeriod(spell.attack.hit, spell.name);
      assertEndsWithPeriod(spell.attack.crit, spell.name);
      assertHasCorrectGlance(spell.attack, spell.name);
      assertHasCorrectCrit(spell.attack, spell.name);
      // The terminal % prevents a double-space in weird edge cases
      return `
        ${spell.attack.targeting.trim() + fatiguePointsText}%
        \\vspace{0.25em}
        \\hit ${spell.attack.hit.trim()}
        ${spell.attack.crit ? `\\crit ${spell.attack.crit.trim()}` : ""}
        ${spell.attack.missGlance ? "\\miss Half damage." : ""}
        ${spell.attack.miss ? `\\miss ${spell.attack.miss}` : ""}
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
      assertEndsWithPeriod(exceptThat, spell.name);
      assertStartsWithLowercase(exceptThat, spell.name);
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
    if (err instanceof Error) {
      err.message += `Error converting spell ${spell.name} to LaTeX: ${err.message}`;
    }
    throw err;
  }
}

function calculateGp(itemRank?: Rank): string {
  if (itemRank === null || itemRank === undefined) {
    throw new Error("Cannot calculate gp for missing rank");
  }
  return {
    0: '10 gp or less',
    1: '40 gp',
    2: '200 gp',
    3: '1,000 gp',
    4: '5,000 gp',
    5: '25,000 gp',
    6: '125,000 gp',
    7: '625,000 gp',
  }[itemRank] || '';
}
