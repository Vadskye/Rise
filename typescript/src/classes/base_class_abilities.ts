import {
  Class,
  ArmorProficiencies,
  WeaponProficiencies,
} from './types';
import { RiseDefense } from '../core_mechanics/attributes';
import {
  getClassTrainedSkills,
  latexClassSkills,
} from './class_skills';
import { clericDomains } from './cleric_domains';
import { joinStringList } from '../latex/format/join_string_list';
import { latexify } from '../latex/format/latexify';

export function getClassName(cls: Class): string {
  // Rust returns lowercase name
  return cls.toLowerCase();
}

export function getClassAlignment(_cls: Class): string {
  return 'Any';
}

export function getClassShorthand(cls: Class): string {
  switch (cls) {
    case 'Automaton':
      return 'Aut';
    case 'Barbarian':
      return 'Bbn';
    case 'Cleric':
      return 'Clr';
    case 'Dragon':
      return 'Drg';
    case 'Druid':
      return 'Drd';
    case 'Dryad':
      return 'Dry';
    case 'Fighter':
      return 'Ftr';
    case 'Harpy':
      return 'Hrp';
    case 'Incarnation':
      return 'Inc';
    case 'Monk':
      return 'Mnk';
    case 'Naiad':
      return 'Nai';
    case 'Oozeborn':
      return 'Ooz';
    case 'Paladin':
      return 'Pal';
    case 'Ranger':
      return 'Rgr';
    case 'Rogue':
      return 'Rog';
    case 'Sorcerer':
      return 'Sor';
    case 'Treant':
      return 'Tre';
    case 'Troll':
      return 'Trl';
    case 'Vampire':
      return 'Vmp';
    case 'Votive':
      return 'Vot';
    case 'Wizard':
      return 'Wiz';
  }
}

export function getCoreClasses(): Class[] {
  return [
    'Barbarian',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Votive',
    'Wizard',
  ];
}

export function getUncommonClasses(): Class[] {
  return [
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
}

export function getAllClasses(): Class[] {
  return [...getCoreClasses(), ...getUncommonClasses()];
}

export function isUncommonClass(cls: Class): boolean {
  return !getCoreClasses().includes(cls);
}

export function getClassDefenseBonus(cls: Class, defense: RiseDefense): number {
  const baseBonus = defense === 'armor_defense' ? 0 : 3;
  let classBonus = 0;

  switch (cls) {
    case 'Barbarian':
      if (defense === 'fortitude') classBonus = 2;
      break;
    case 'Fighter':
      if (defense === 'armor_defense') classBonus = 1;
      break;
    case 'Monk':
      if (defense === 'armor_defense') classBonus = 1;
      break;
    case 'Oozeborn':
      if (defense === 'fortitude') classBonus = 2;
      break;
    case 'Sorcerer':
      if (defense === 'fortitude') classBonus = 1;
      break;
    case 'Treant':
      if (defense === 'fortitude') classBonus = 2;
      if (defense === 'mental') classBonus = 1;
      break;
  }

  return baseBonus + classBonus;
}

export function getClassFatigueTolerance(cls: Class): number {
  switch (cls) {
    case 'Automaton':
      return 5;
    case 'Barbarian':
    case 'Dragon':
    case 'Fighter':
    case 'Ranger':
    case 'Oozeborn':
    case 'Sorcerer':
    case 'Treant':
      return 3;
    case 'Troll':
      return 4;
    default:
      return 2;
  }
}

export function getClassInsightPoints(cls: Class): number {
  switch (cls) {
    case 'Cleric':
    case 'Dryad':
    case 'Rogue':
    case 'Wizard':
      return 2;
    default:
      return 1;
  }
}

export function getClassVitalRollBonus(cls: Class): number {
  switch (cls) {
    case 'Incarnation':
    case 'Oozeborn':
    case 'Troll':
      return 1;
    default:
      return 0;
  }
}

export function getClassAttunementPoints(cls: Class): number {
  switch (cls) {
    case 'Cleric':
    case 'Dragon':
    case 'Druid':
    case 'Dryad':
    case 'Harpy':
    case 'Incarnation':
    case 'Naiad':
    case 'Paladin':
    case 'Sorcerer':
    case 'Vampire':
    case 'Votive':
    case 'Wizard':
      return 5;
    default:
      return 4;
  }
}

export function getClassArmorProficiencies(cls: Class): ArmorProficiencies {
  switch (cls) {
    case 'Automaton':
    case 'Fighter':
    case 'Paladin':
    case 'Treant':
      return { usage_classes: ['light', 'medium', 'heavy'] };
    case 'Barbarian':
    case 'Cleric':
    case 'Ranger':
    case 'Troll':
    case 'Votive':
      return { usage_classes: ['light', 'medium'] };
    case 'Dragon':
    case 'Dryad':
    case 'Harpy':
    case 'Incarnation':
    case 'Monk':
    case 'Naiad':
    case 'Oozeborn':
    case 'Rogue':
    case 'Vampire':
      return { usage_classes: ['light'] };
    case 'Druid':
      return {
        specific_armors: ['LeatherLamellar', 'StandardShield'],
        usage_classes: ['light'],
      };
    case 'Sorcerer':
    case 'Wizard':
      return { usage_classes: [] };
    default:
      return { usage_classes: [] };
  }
}

export function getClassWeaponProficiencies(cls: Class): WeaponProficiencies {
  switch (cls) {
    case 'Automaton':
    case 'Barbarian':
    case 'Fighter':
    case 'Paladin':
    case 'Ranger':
    case 'Troll':
    case 'Vampire':
    case 'Votive':
      return { simple_weapons: true, non_exotic_weapons: true };
    case 'Cleric':
    case 'Dryad':
    case 'Incarnation':
    case 'Naiad':
    case 'Oozeborn':
    case 'Sorcerer':
    case 'Wizard':
      return { simple_weapons: true, non_exotic_weapons: false };
    case 'Dragon':
    case 'Harpy':
      return { simple_weapons: false, non_exotic_weapons: false };
    case 'Druid':
      return {
        simple_weapons: true,
        non_exotic_weapons: false,
        custom_weapons: "the shepherd's axe and scythe",
      };
    case 'Monk':
      return { simple_weapons: true, non_exotic_weapons: false, custom_weapons: 'monk weapons' };
    case 'Rogue':
      return {
        simple_weapons: true,
        non_exotic_weapons: false,
        custom_weapons:
          'weapons with the \\weapontag{Compact} or \\weapontag{Light} weapon tags (see \\pcref{Weapon Tags})',
      };
    case 'Treant':
      return {
        simple_weapons: true,
        non_exotic_weapons: false,
        custom_weapons: 'club-like weapons',
      };
    default:
      return { simple_weapons: false, non_exotic_weapons: false };
  }
}

export function getClassSpecialAbilities(cls: Class): string {
  switch (cls) {
    case 'Cleric':
      return `
        \\subsection{Special Class Abilities}

        \\cf{Clr}{Deity}
        You must worship a specific deity to be a cleric.
        For details, see \\tref{Deities}.

        \\magicalcf{Clr}{Seek Guidance}
        You can seek guidance from your deity through a ten minute ritual or prayer.
        This provides a vision, emotional instinct, or other guidance on how you can best serve your deity's interests.
        You cannot ask specific questions of your deity, and this is not a general method for sharing information.
        Deities tend to disapprove of clerics who seek guidance to solve mortal problems that they should be able to deal with themselves.
        You are generally informed what your current responsibilities are, such as \`\`tend to the wounded who enter my temple'' or \`\`do battle with those who serve evil''.
      `;
    case 'Paladin':
      return `
        \\subsection{Special Class Abilities}

        \\cf{Pal}{Devoted Alignment} 
        You are devoted to a specific alignment.
        You must choose one of your alignment components: good, evil, lawful, or chaotic.
        The alignment you choose is your devoted alignment.
        Your paladin abilities are affected by this choice.
        % seems unnecessary
        % You excel at slaying creatures with alignments opposed to your devoted alignment.
        Your alignment cannot be changed without extraordinary repurcussions.
      `;
    case 'Votive':
      return `
        \\subsection{Special Class Abilities}

        \\magicalcf{War}{Soul Pact}
        To become a votive, you must be \\trait{ensouled} and make a pact with a creature capable of sharing its power with you.
        That creature is called your soulkeeper, and it will claim your soul for a period of time following your death.
        Your soulkeeper may gain other benefits after your death as well.
        In exchange, it will grant you power during your mortal life.

        Your pact forges a deep connection between you and your soulkeeper.
        This grants your soulkeeper the ability to observe your actions and communicate with you in limited ways.
        Communication from your soulkeeper typically manifests as unnatural emotional urges, whispered voices audible only to you, or intrusive thoughts you can recognize as not your own.
        Each soulkeeper will have its own goals and communication style.

        As part of the terms of a typical pact, your soulkeeper cannot prevent you from being \\glossterm{resurrected} after death.
        However, if your pact imposes a time limit on how long your soulkeeper can retain your soul after death, resurrection restarts that time from zero.

        \\subsubsection{Soulkeepers}
            There are four common types of soulkeeper: devils, fae, moirai, and precursors.
            Each type of soulkeeper has different terms for its pacts and offers different rewards.

            \\parhead{Devils}
            Devils are lawful evil creatures native to the Abyss, the Spiritual Plane of evil.
            Their pacts offer the most generous terms of all soulkeepers, in theory.
            They impose no restrictions on your actions in life, and only affect your soul after death.
            A typical devil will keep your soul in the Abyss for one year for each year that you live after making the pact, to a minimum of ten years.
            Particularly long-lived species like elves can often negotiate better terms than this.
            If your soul survives this period intact, it will proceed to its normal afterlife with no permanent cost.
            Devils offer this bargain because they are experts in torture.
            They can reliably break the will of their votives during that time period, allowing them to permanently gain the power of a full soul.

            Power struggles in the Abyss are common, and mortal souls are an important currency there.
            It is possible for one devil to assume control over another devil's souls, becoming the new soulkeeper for their votives.

            Devil soulkeepers tend to be engaged and communicative.
            They try tempt their votives into greater evil, and encourage acquiring power by any means necessary.

            \\parhead{Fae}
            Fae are chaotic neutral creatures that live on the moon.
            Their pacts can be idiosyncratic, and often come with seemingly arbitrary restrictions on how you must act in life.
            They are also more likely to renegotiate pact details than other soul keepers, often seeking to change the restrictions that the votive must obey in life to suit their whims.
            After death, they will typically keep your soul until you become boring to them, with a guarantee that you will eventually reach your proper afterlife.

            Fae soulkeepers will periodically pay great attention to their votives.
            When they do, they may send a distracting flurry of thoughts and urges that may or may not be relevant to the situation at hand.
            Eventually, they will get bored and disappear entirely until their attention is caught again.

            \\parhead{Moirai}
            Moirai are lawful neutral creatures native to Concord, the Spiritual Plane of law.
            Each moirai is an impartial arbiter and embodiment of a specific concept, directive, or material fact.
            Their pacts always impose one restriction on you in life, and retain your soul in Concord for a hundred years after your death.
            The restriction is always relevant to the moirai's identity, and is focused on you as an individual rather than the world you inhabit.
            For example, a moirai of cleanliness may require you to remain personally clean, but would not require you to clean everywhere you go.

            Moirai soulkeepers typically remain aloof from their votives.
            They only rarely bother to directly observe their votives' current circumstances.
            They will send periodic reminders to maintain the terms of the pact and similar generic urges.

            \\parhead{Precursors}
            The precursors are ancient aberrations that now live in the Eternal Void.
            They generally despise the mortals and deities that replaced them, though their current goals are inscrutable.
            Precursor pacts impose no restrictions on you in life, but they are the only pacts which are guaranteed to claim your soul.
            While you are dead, your soul will be constantly pulled away from your afterlife towards the Eternal Void.
            You can fight this pull to remain in your afterlife for a time.
            As your will and sense of self deteriorates over the years, your concentration will slip and you will drift away.
            There is no return from the Eternal Void.

            Precursor pacts are attractive to votives because they do not constrain you in life or significantly interfere with your normal afterlife experience.
            However, deities universally revile votives who make precusor pacts.
            Stealing souls from deities and feeding them to the precursors threatens to upend the balance of the cosmos and undo the ancient wars that established mortal life.
      `;
    default:
      return '';
  }
}

export function getClassSuffix(cls: Class): string {
  switch (cls) {
    case 'Cleric':
      return clericDomains();
    case 'Druid':
      return `
        \\subsection{Ex-Druids}
        A druid who ceases to revere nature or who changes to a prohibited alignment loses all \\magical druid class abilities.
        They cannot thereafter gain levels as a druid until they atone for their transgressions.
      `;
    case 'Paladin':
      return `
        \\subsection{Ex-Paladins}
        If you cease to follow your devoted alignment, you lose all \\magical paladin class abilities.
        If your atone for your misdeeds and resume the service of your devoted alignment, you can regain your abilities.
      `;
    default:
      return '';
  }
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
  return latexify(`
        \\begin{columntable}
            \\begin{dtabularx}{\\columnwidth}{l l l l ${'>{\\lcol}X'}}
                \\tb{Level} & \\tb{Rank} & \\tb{Durability} & \\tb{Bonus}\\fn{1} & \\tb{Special} \\tableheaderrule
                ${latexBaseClassTableRows(cls)}
            \\end{dtabularx}
            1. This bonus applies to your \\glossterm{accuracy}, \\magical power, mundane power, trained skills, and defenses. \\
        \\end{columntable}
    `);
}

function latexBaseClassTableRows(_cls: Class): string {
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
  return latexify(`
        \\subsection{Base Class Effects}

        If you choose ${getClassName(cls)} as your \\glossterm{base class}, you gain the following benefits.

        ${latexBaseClassTable(cls)}

        ${latexDefenses(cls)}

        ${latexResources(cls)}

        ${latexWeaponProficiencies(cls)}

        ${latexArmorProficiencies(cls)}

        ${latexStartingItems(cls)}

        ${latexClassSkills(cls, getClassShorthand(cls))}
    `);
}

export function latexResources(cls: Class): string {
  return `
        \\cf{${getClassShorthand(cls)}}{Resources}
        \\begin{raggeditemize}
            \\item \\glossterm{Attunement points}: ${getClassAttunementPoints(cls)} (see \\pcref{Attunement Points}).
            \\item \\glossterm{Fatigue tolerance}: ${getClassFatigueTolerance(cls)} \\add your Constitution (see \\pcref{Fatigue}).
            \\item \\glossterm{Insight points}: ${getClassInsightPoints(cls)} \\add your Intelligence (see \\pcref{Insight Points}).
            \\item \\glossterm{Trained skills}: ${getClassTrainedSkills(cls)} from among your \\glossterm{class skills}, plus additional trained skills equal to your Intelligence if it is positive (see \\pcref{Skills}).
        \\end{raggeditemize}
    `;
}

export function latexDefenses(cls: Class): string {
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
      `a \\plus${getClassVitalRollBonus(cls)} bonus to your \\glossterm{vital rolls}`,
    );
  }

  const customModifierText =
    customModifiers.length > 0 ? `In addition, you gain ${joinStringList(customModifiers)}.` : '';

  return latexify(`
        \\cf{${getClassShorthand(cls)}}{Defenses}
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

export function latexArmorProficiencies(cls: Class): string {
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
        \\cf{${getClassShorthand(cls)}}{Armor Proficiencies}
        ${profText}
    `;
}

export function latexWeaponProficiencies(cls: Class): string {
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
        \\cf{${getClassShorthand(cls)}}{Weapon Proficiencies}
        ${profText}
    `;
}

export function latexStartingItems(cls: Class): string {
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
        \\cf{${getClassShorthand(cls)}}{Starting Items and Equipment}
        You can start with the following items and equipment:

        \\begin{raggeditemize}
            ${rank1ItemText}
            ${weaponText}
            ${shieldText}
            \\item A standard adventuring kit (see \\pcref{Standard Adventuring Kit}).
            \\item A rank 0 wealth item (1 gp)
        \\end{raggeditemize}
    `;
}
