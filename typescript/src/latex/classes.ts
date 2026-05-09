import { Class, ClassArchetype } from '@src/classes/types';
import { RiseDefense } from '@src/core_mechanics/attributes';
import {
  getClassName,
  getClassAlignment,
  getClassDefenseBonus,
  getClassFatigueTolerance,
  getClassInsightPoints,
  getClassVitalRollBonus,
  getClassAttunementPoints,
  getClassArmorProficiencies,
  getClassWeaponProficiencies,
  getClassNarrativeText,
  getClassSpecialAbilities,
  getClassSuffix,
  getClassShorthand,
  getCoreClasses,
  validateClassPoints,
} from '@src/classes/metadata';
import {
  getArchetypesForClass,
  getArchetypeName,
  latexArchetypeTable,
  latexArchetypeDescription,
} from '@src/classes/archetypes';
import { latexClassSkills, getClassTrainedSkills } from '@src/classes/class_skills';
import { titleCase } from '@src/latex/format/title_case';
import { joinStringList } from '@src/latex/format/join_string_list';
import { latexifyClass } from '@src/latex/format/latexify_class';

export { validateClassPoints, latexifyClass, latexArchetypeDescription };

export function generateArchetypeDescriptions(): string {
  const archetypes: ClassArchetype[] = [
    // Barbarian
    'BattleforgedResilience',
    'Battlerager',
    'OutlandSavage',
    'PrimalWarrior',
    'Totemist',
    // Cleric
    'ClericDivineMagic',
    'DivineSpellMastery',
    'DomainInfluence',
    'Healer',
    'Preacher',
    // Druid
    'Elementalist',
    'NatureMagic',
    'NatureSpellMastery',
    'Shifter',
    'Wildspeaker',
    // Fighter
    'CombatDiscipline',
    'EquipmentTraining',
    'MartialMastery',
    'Sentinel',
    'Tactician',
    // Monk
    'Airdancer',
    'EsotericWarrior',
    'Ki',
    'PerfectedForm',
    'TranscendentSage',
    // Paladin
    'DevotedParagon',
    'PaladinDivineMagic',
    'DivineSpellExpertise',
    'StalwartGuardian',
    'ZealousWarrior',
    // Ranger
    'Beastmaster',
    'BoundaryWarden',
    'Huntmaster',
    'Scout',
    'WildernessWarrior',
    // Rogue
    'Assassin',
    'BardicMusic',
    'CombatTrickster',
    'JackOfAllTrades',
    'SuaveScoundrel',
    // Sorcerer
    'SorcererArcaneMagic',
    'SorcererArcaneSpellMastery',
    'DraconicMagic',
    'InnateArcanist',
    'WildMagic',
    // Votive
    'CovenantKeeper',
    'PactMagic',
    'PactSpellMastery',
    'PactboundWarrior',
    'Soulforged',
    // Wizard
    'WizardArcaneMagic',
    'WizardArcaneSpellMastery',
    'Alchemist',
    'ArcaneScholar',
    'SchoolSpecialist',
    // Uncommon species
    'Automaton',
    'Dragon',
    'Dryad',
    'Harpy',
    'Incarnation',
    'Naiad',
    'Oozeborn',
    'Treant',
    'Troll',
    'Vampire',
  ];

  return archetypes.map(latexArchetypeDescription).join('\n\\newpage\n');
}

export function generateClassesChapter(): string {
  return getCoreClasses().map(latexClassSection).join('\n');
}

export function universalCharacterProgressionAtLevel(level: number): string {
  switch (level) {
    case 3:
      return '+1 to two attributes';
    case 4:
      return 'HP: 2x \\glossterm{durability}';
    case 7:
      return 'HP: 3x durability';
    case 9:
      return '+1 to two attributes';
    case 10:
      return 'HP: 4x durability';
    case 13:
      return 'HP: 6x durability';
    case 15:
      return '+1 to two attributes';
    case 16:
      return 'HP: 8x durability';
    case 19:
      return 'HP: 10x durability';
    case 21:
      return '+2 to two attributes';
    default:
      return '\\tdash';
  }
}

export function latexBaseClassTable(cls: Class): string {
  return latexifyClass(`
        \\begin<columntable>
            \\begin<dtabularx><\\columnwidth><l l l l ${'>{\\lcol}X'}>
                \\tb<Level> & \\tb<Rank> & \\tb<Durability> & \\tb<Bonus>\\fn<1> & \\tb<Special> \\tableheaderrule
                ${latexBaseClassTableRows(cls)}
            \\end<dtabularx>
            1. This bonus applies to your \\glossterm<accuracy>, \\magical power, mundane power, trained skills, and defenses. \\
        \\end<columntable>
    `);
}

function latexBaseClassTableRows(cls: Class): string {
  const rows: string[] = [];
  for (let level = 1; level <= 21; level++) {
    const rank = Math.floor((level + 2) / 3);
    const durabilityBonus = level - rank;
    const miscBonus = Math.floor(level / 2);
    rows.push(
      `
            ${level} & ${rank} & \\plus${durabilityBonus} & ${modifierHelper(miscBonus)} & ${universalCharacterProgressionAtLevel(level)} \\\\
        `.trim(),
    );
  }
  return rows.join('\n');
}

function modifierHelper(val: number): string {
  return val >= 0 ? `+${val}` : `${val}`;
}

export function latexBasicClassAbilities(cls: Class): string {
  return latexifyClass(`
        \\subsection<Base Class Effects>

        If you choose ${getClassName(cls)} as your \\glossterm<base class>, you gain the following benefits.

        ${latexBaseClassTable(cls)}

        ${latexDefenses(cls)}

        ${latexResources(cls)}

        ${latexWeaponProficiencies(cls)}

        ${latexArmorProficiencies(cls)}

        ${latexStartingItems(cls)}

        ${latexClassSkills(cls, getClassShorthand(cls))}
    `);
}

function latexResources(cls: Class): string {
  return `
        \\cf<${getClassShorthand(cls)}><Resources>
        \\begin<raggeditemize>
            \\item \\glossterm<Attunement points>: ${getClassAttunementPoints(cls)} (see \\pcref<Attunement Points>).
            \\item \\glossterm<Fatigue tolerance>: ${getClassFatigueTolerance(cls)} \\add your Constitution (see \\pcref<Fatigue>).
            \\item \\glossterm<Insight points>: ${getClassInsightPoints(cls)} \\add your Intelligence (see \\pcref<Insight Points>).
            \\item \\glossterm<Trained skills>: ${getClassTrainedSkills(cls)} from among your \\glossterm<class skills>, plus additional trained skills equal to your Intelligence if it is positive (see \\pcref<Skills>).
        \\end<raggeditemize>
    `;
}

function latexDefenses(cls: Class): string {
  const plus3Defenses: RiseDefense[] = ['brawn', 'fortitude', 'mental', 'reflex'].filter(
    (d) => getClassDefenseBonus(cls, d as RiseDefense) === 3,
  ) as RiseDefense[];
  const plus3DefenseText = joinStringList(
    plus3Defenses.map((d) => d.charAt(0).toUpperCase() + d.slice(1)),
  );

  const customModifiers: string[] = ['brawn', 'fortitude', 'mental', 'reflex', 'armor_defense']
    .filter((d) => getClassDefenseBonus(cls, d as RiseDefense) !== 3)
    .map((d) => formatDefense(d as RiseDefense, getClassDefenseBonus(cls, d as RiseDefense)))
    .filter((t) => t !== null) as string[];

  if (getClassVitalRollBonus(cls) > 0) {
    customModifiers.push(
      `a \\plus${getClassVitalRollBonus(cls)} bonus to your \\glossterm<vital rolls>`,
    );
  }

  const customModifierText =
    customModifiers.length > 0 ? `In addition, you gain ${joinStringList(customModifiers)}.` : '';

  return latexifyClass(`
        \\cf<${getClassShorthand(cls)}><Defenses>
        You gain a \\plus3 bonus to your ${plus3DefenseText} defenses.
        ${customModifierText}
    `);
}

function formatDefense(defense: RiseDefense, modifier: number): string | null {
  const title =
    defense === 'armor_defense' ? 'Armor' : defense.charAt(0).toUpperCase() + defense.slice(1);
  if (modifier > 0) {
    return `a +${modifier} bonus to your ${title} defense`;
  } else if (modifier < 0) {
    return `a ${modifier} penalty to your ${title} defense`;
  } else {
    return null;
  }
}

function latexArmorProficiencies(cls: Class): string {
  const prof = getClassArmorProficiencies(cls);
  let profText = '';

  if (prof.usage_classes.length === 0) {
    profText = 'You are not proficient with any type of armor.';
  } else if (prof.specific_armors && prof.specific_armors.length > 0) {
    const usageClasses = joinStringList(prof.usage_classes);
    const specificArmors = joinStringList(
      prof.specific_armors.sort().map((a) =>
        a
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .toLowerCase(),
      ),
    );
    profText = `You are proficient with ${usageClasses} armor and ${specificArmors}.`;
  } else {
    profText = `You are proficient with ${joinStringList(prof.usage_classes)} armor.`;
  }

  return `
        \\cf<${getClassShorthand(cls)}><Armor Proficiencies>
        ${profText}
    `;
}

function latexWeaponProficiencies(cls: Class): string {
  const prof = getClassWeaponProficiencies(cls);
  let profText = '';

  if (!prof.simple_weapons) {
    profText = `
            You are not proficient with any manufactured weapons, even simple weapons.
            You are still proficient with your natural weapons.
        `;
  } else {
    const components = ['simple weapons'];
    if (prof.custom_weapons) {
      components.push(prof.custom_weapons);
    }
    if (prof.non_exotic_weapons) {
      components.push('all non-exotic weapons');
    }
    profText = `You are proficient with ${joinStringList(components)}.`;
  }

  return `
        \\cf<${getClassShorthand(cls)}><Weapon Proficiencies>
        ${profText}
    `;
}

function latexStartingItems(cls: Class): string {
  const armorProf = getClassArmorProficiencies(cls);
  const weaponProf = getClassWeaponProficiencies(cls);

  const armorOptions: string[] = [];
  for (const usage of armorProf.usage_classes) {
    const name =
      usage === 'light' ? 'Buff leather' : usage === 'medium' ? 'Leather lamellar' : 'Breastplate';
    armorOptions.push(name);
  }

  let rank1ItemText = '';
  if (armorOptions.length === 1) {
    rank1ItemText = `\\item ${armorOptions[0]}`;
  } else if (armorOptions.length > 0) {
    rank1ItemText = `
                \\item Any one of the following: ${joinStringList(armorOptions, 'or').toLowerCase()}
            `;
  } else {
    rank1ItemText =
      '\\item A \\magicitem{spell wand, 1st} with a rank 1 spell from one \\glossterm{mystic sphere} that you have access to';
  }

  const weaponOptions: string[] = [];
  if (weaponProf.custom_weapons) {
    weaponOptions.push(weaponProf.custom_weapons.replace(/ and /g, ' '));
  }
  if (weaponProf.simple_weapons) {
    weaponOptions.push('club');
    weaponOptions.push('dagger');
  }
  if (weaponProf.non_exotic_weapons) {
    weaponOptions.push('broadsword');
    weaponOptions.push('two handaxes');
    weaponOptions.push('spear');
  }

  let weaponText = '';
  if (weaponOptions.length === 0) {
    weaponText = '\\item Two \\magicitem{potions of healing}';
  } else if (weaponOptions.length === 1) {
    weaponText = `\\item Any one of the following: ${joinStringList(weaponOptions)}`;
  } else if (weaponOptions.length === 2) {
    weaponText = `\\item A ${joinStringList(weaponOptions)}`;
  } else {
    weaponText = `\\item Any two of the following: ${joinStringList(weaponOptions)}`;
  }
  weaponText = weaponText.replace(/ and /g, ' or ');

  let shieldText = '';
  if (armorProf.usage_classes.includes('medium')) {
    shieldText = '\\item A buckler or standard shield';
  } else if (armorProf.usage_classes.includes('light') && weaponProf.simple_weapons) {
    shieldText = '\\item A buckler';
  } else {
    shieldText = "\\item A vial of \\magicitem{alchemist's fire}";
  }

  return `
        \\cf<${getClassShorthand(cls)}><Starting Items and Equipment>
        You can start with the following items and equipment:

        \\begin<raggeditemize>
            ${rank1ItemText}
            ${weaponText}
            ${shieldText}
            \\item A standard adventuring kit (see \\pcref<Standard Adventuring Kit>).
            \\item A rank 0 wealth item (1 gp)
        \\end<raggeditemize>
    `;
}

export function latexClassSection(cls: Class): string {
  const archetypes = getArchetypesForClass(cls);
  const archetypeNames = joinStringList(archetypes.map(getArchetypeName));
  const classNameTitle = titleCase(getClassName(cls));

  return latexifyClass(`
        \\newpage
        \\section<${classNameTitle}>\\label<${classNameTitle}>

        \\includegraphics[width=\\columnwidth]<classes/${getClassName(cls).toLowerCase()}>

        ${latexArchetypeTable(cls)}

        ${getClassNarrativeText(cls)}

        \\classbasics<Alignment> ${getClassAlignment(cls)}.

        \\classbasics<Archetypes> ${classNameTitle}s have the ${archetypeNames} archetypes.

        ${latexBasicClassAbilities(cls)}

        ${getClassSpecialAbilities(cls)}

        ${archetypes.map(latexArchetypeDescription).join('\n\n')}

        ${getClassSuffix(cls)}
    `);
}
