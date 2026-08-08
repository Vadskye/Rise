import { Grimoire } from '../monsters/grimoire';
import { checkValidMonster } from '../monsters/monster_validation';

function main() {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const requirementsByRule = new Map<string, { monster: string; fullWarning: string }[]>();
  const guidelinesByRule = new Map<string, { monster: string; fullWarning: string }[]>();
  const monsterWarnings: { name: string; requirements: string[]; guidelines: string[] }[] = [];
  let totalMonstersWithRequirements = 0;
  let totalMonstersWithGuidelines = 0;

  const names = [...grimoire.getMonsterNames(), ...grimoire.getMonsterGroupNames()].sort();
  for (const name of names) {
    const m = grimoire.getMonster(name);
    const mg = grimoire.getMonsterGroup(name);
    if (m) {
      const { requirements, guidelines } = checkValidMonster(m);
      if (requirements.length > 0 || guidelines.length > 0) {
        monsterWarnings.push({ name: m.name, requirements, guidelines });
      }
    } else if (mg) {
      for (const gm of mg.monsters) {
        const { requirements, guidelines } = checkValidMonster(gm, mg);
        if (requirements.length > 0 || guidelines.length > 0) {
          monsterWarnings.push({ name: `${mg.name}.${gm.name}`, requirements, guidelines });
        }
      }
    }
  }

  for (const { name, requirements, guidelines } of monsterWarnings) {
    if (requirements.length > 0) {
      totalMonstersWithRequirements++;
    }
    if (guidelines.length > 0) {
      totalMonstersWithGuidelines++;
    }

    for (const r of requirements) {
      const ruleKey = r.replace(
        /Has -?\d+ attributes, expected (min|max) \d+/,
        'Attribute sum out of range',
      );
      if (!requirementsByRule.has(ruleKey)) {
        requirementsByRule.set(ruleKey, []);
      }
      requirementsByRule.get(ruleKey)!.push({ monster: name, fullWarning: r });
    }

    for (const g of guidelines) {
      const ruleKey = g.replace(
        /Has -?\d+ attributes, expected (min|max) \d+/,
        'Attribute sum out of range',
      );
      if (!guidelinesByRule.has(ruleKey)) {
        guidelinesByRule.set(ruleKey, []);
      }
      guidelinesByRule.get(ruleKey)!.push({ monster: name, fullWarning: g });
    }
  }

  console.log('TOTAL MONSTERS WITH WARNINGS:', monsterWarnings.length);
  console.log(`  - With Requirement Violations: ${totalMonstersWithRequirements}`);
  console.log(`  - With Guideline Warnings: ${totalMonstersWithGuidelines}`);

  console.log('\n==================================================');
  console.log('REQUIREMENT VIOLATIONS BY RULE:');
  console.log('==================================================');
  if (requirementsByRule.size === 0) {
    console.log('No requirement violations.');
  } else {
    for (const [rule, list] of requirementsByRule.entries()) {
      console.log(`\n=== Rule: ${rule} (${list.length} occurrences) ===`);
      for (const item of list) {
        console.log(`  - ${item.monster}: ${item.fullWarning}`);
      }
    }
  }

  console.log('\n==================================================');
  console.log('GUIDELINE WARNINGS BY RULE:');
  console.log('==================================================');
  if (guidelinesByRule.size === 0) {
    console.log('No guideline warnings.');
  } else {
    for (const [rule, list] of guidelinesByRule.entries()) {
      console.log(`\n=== Rule: ${rule} (${list.length} occurrences) ===`);
      for (const item of list) {
        console.log(`  - ${item.monster}: ${item.fullWarning}`);
      }
    }
  }
}

main();
