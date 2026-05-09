import {
  Class,
  ClassArchetype,
  RankAbility,
} from './types';
import { titleCase } from '../latex/format/title_case';
import { getClassName, getClassShorthand } from './metadata';
import { latexify } from '../latex/format/latexify';

import * as barbarian from './archetypes/barbarian';
import * as fighter from './archetypes/fighter';
import * as monk from './archetypes/monk';
import * as ranger from './archetypes/ranger';
import * as rogue from './archetypes/rogue';
import * as cleric from './archetypes/cleric';
import * as druid from './archetypes/druid';
import * as paladin from './archetypes/paladin';
import * as sorcerer from './archetypes/sorcerer';
import * as votive from './archetypes/votive';
import * as wizard from './archetypes/wizard';
import * as automaton from './archetypes/automaton';
import * as dragon from './archetypes/dragon';
import * as dryad from './archetypes/dryad';
import * as harpy from './archetypes/harpy';
import * as incarnation from './archetypes/incarnation';
import * as naiad from './archetypes/naiad';
import * as oozeborn from './archetypes/oozeborn';
import * as treant from './archetypes/treant';
import * as troll from './archetypes/troll';
import * as vampire from './archetypes/vampire';

export function getArchetypeClass(archetype: ClassArchetype): Class {
  switch (archetype) {
    case 'Blank':
      return 'Fighter';
    // Barbarian
    case 'BattleforgedResilience':
    case 'Battlerager':
    case 'OutlandSavage':
    case 'PrimalWarrior':
    case 'Totemist':
      return 'Barbarian';
    // Cleric
    case 'ClericDivineMagic':
    case 'DivineSpellMastery':
    case 'DomainInfluence':
    case 'Healer':
    case 'Preacher':
      return 'Cleric';
    // Druid
    case 'Elementalist':
    case 'NatureMagic':
    case 'NatureSpellMastery':
    case 'Shifter':
    case 'Wildspeaker':
      return 'Druid';
    // Fighter
    case 'CombatDiscipline':
    case 'EquipmentTraining':
    case 'MartialMastery':
    case 'Sentinel':
    case 'Tactician':
      return 'Fighter';
    // Monk
    case 'Airdancer':
    case 'EsotericWarrior':
    case 'Ki':
    case 'PerfectedForm':
    case 'TranscendentSage':
      return 'Monk';
    // Paladin
    case 'DevotedParagon':
    case 'PaladinDivineMagic':
    case 'DivineSpellExpertise':
    case 'StalwartGuardian':
    case 'ZealousWarrior':
      return 'Paladin';
    // Ranger
    case 'Beastmaster':
    case 'BoundaryWarden':
    case 'Huntmaster':
    case 'Scout':
    case 'WildernessWarrior':
      return 'Ranger';
    // Rogue
    case 'Assassin':
    case 'BardicMusic':
    case 'CombatTrickster':
    case 'JackOfAllTrades':
    case 'SuaveScoundrel':
      return 'Rogue';
    // Sorcerer
    case 'SorcererArcaneMagic':
    case 'SorcererArcaneSpellMastery':
    case 'DraconicMagic':
    case 'InnateArcanist':
    case 'WildMagic':
      return 'Sorcerer';
    // Votive
    case 'CovenantKeeper':
    case 'PactMagic':
    case 'PactSpellMastery':
    case 'PactboundWarrior':
    case 'Soulforged':
      return 'Votive';
    // Wizard
    case 'Alchemist':
    case 'WizardArcaneMagic':
    case 'WizardArcaneSpellMastery':
    case 'ArcaneScholar':
    case 'SchoolSpecialist':
      return 'Wizard';
    // Uncommon species
    case 'Automaton':
      return 'Automaton';
    case 'Dragon':
      return 'Dragon';
    case 'Dryad':
      return 'Dryad';
    case 'Harpy':
      return 'Harpy';
    case 'Incarnation':
      return 'Incarnation';
    case 'Naiad':
      return 'Naiad';
    case 'Oozeborn':
      return 'Oozeborn';
    case 'Treant':
      return 'Treant';
    case 'Troll':
      return 'Troll';
    case 'Vampire':
      return 'Vampire';
  }
}

export function getArchetypeName(archetype: ClassArchetype): string {
  switch (archetype) {
    case 'Blank':
      return 'Blank';
    case 'BattleforgedResilience':
      return 'Battleforged Resilience';
    case 'Battlerager':
      return 'Battlerager';
    case 'OutlandSavage':
      return 'Outland Savage';
    case 'PrimalWarrior':
      return 'Primal Warrior';
    case 'Totemist':
      return 'Totemist';
    case 'ClericDivineMagic':
      return 'Divine Magic';
    case 'DivineSpellMastery':
      return 'Divine Spell Mastery';
    case 'DomainInfluence':
      return 'Domain Influence';
    case 'Healer':
      return 'Healer';
    case 'Preacher':
      return 'Preacher';
    case 'Elementalist':
      return 'Elementalist';
    case 'NatureMagic':
      return 'Nature Magic';
    case 'NatureSpellMastery':
      return 'Nature Spell Mastery';
    case 'Shifter':
      return 'Shifter';
    case 'Wildspeaker':
      return 'Wildspeaker';
    case 'CombatDiscipline':
      return 'Combat Discipline';
    case 'EquipmentTraining':
      return 'Equipment Training';
    case 'MartialMastery':
      return 'Martial Mastery';
    case 'Sentinel':
      return 'Sentinel';
    case 'Tactician':
      return 'Tactician';
    case 'Airdancer':
      return 'Airdancer';
    case 'EsotericWarrior':
      return 'Esoteric Warrior';
    case 'Ki':
      return 'Ki';
    case 'PerfectedForm':
      return 'Perfected Form';
    case 'TranscendentSage':
      return 'Transcendent Sage';
    case 'DevotedParagon':
      return 'Devoted Paragon';
    case 'PaladinDivineMagic':
      return 'Divine Magic';
    case 'DivineSpellExpertise':
      return 'Divine Spell Expertise';
    case 'StalwartGuardian':
      return 'Stalwart Guardian';
    case 'ZealousWarrior':
      return 'Zealous Warrior';
    case 'Beastmaster':
      return 'Beastmaster';
    case 'BoundaryWarden':
      return 'Boundary Warden';
    case 'Huntmaster':
      return 'Huntmaster';
    case 'Scout':
      return 'Scout';
    case 'WildernessWarrior':
      return 'Wilderness Warrior';
    case 'Assassin':
      return 'Assassin';
    case 'BardicMusic':
      return 'Bardic Music';
    case 'CombatTrickster':
      return 'Combat Trickster';
    case 'JackOfAllTrades':
      return 'Jack of All Trades';
    case 'SuaveScoundrel':
      return 'Suave Scoundrel';
    case 'SorcererArcaneMagic':
      return 'Arcane Magic';
    case 'SorcererArcaneSpellMastery':
      return 'Arcane Spell Mastery';
    case 'DraconicMagic':
      return 'Draconic Magic';
    case 'InnateArcanist':
      return 'Innate Arcanist';
    case 'WildMagic':
      return 'Wild Magic';
    case 'CovenantKeeper':
      return 'Covenant Keeper';
    case 'PactMagic':
      return 'Pact Magic';
    case 'PactSpellMastery':
      return 'Pact Spell Mastery';
    case 'PactboundWarrior':
      return 'Pactbound Warrior';
    case 'Soulforged':
      return 'Soulforged';
    case 'Alchemist':
      return 'Alchemist';
    case 'WizardArcaneMagic':
      return 'Arcane Magic';
    case 'WizardArcaneSpellMastery':
      return 'Arcane Spell Mastery';
    case 'ArcaneScholar':
      return 'Arcane Scholar';
    case 'SchoolSpecialist':
      return 'School Specialist';
    case 'Automaton':
      return 'Automaton Archetype';
    case 'Dragon':
      return 'Dragon Archetype';
    case 'Dryad':
      return 'Dryad Archetype';
    case 'Harpy':
      return 'Harpy Archetype';
    case 'Incarnation':
      return 'Incarnation Archetype';
    case 'Naiad':
      return 'Naiad Archetype';
    case 'Oozeborn':
      return 'Oozeborn Archetype';
    case 'Treant':
      return 'Treant Archetype';
    case 'Troll':
      return 'Troll Archetype';
    case 'Vampire':
      return 'Vampire Archetype';
  }
}

export function getArchetypeShortDescription(archetype: ClassArchetype): string {
  let description = '';
  switch (archetype) {
    case 'Blank':
      description = 'For testing purposes';
      break;
    case 'BattleforgedResilience':
      description = 'This archetype improves your durability in combat.';
      break;
    case 'Battlerager':
      description = 'This archetype grants you a devastating rage, improving your combat prowess.';
      break;
    case 'OutlandSavage':
      description =
        'This archetype improves your mobility and combat prowess with direct, brutal abilities.';
      break;
    case 'PrimalWarrior':
      description = 'This archetype grants you powerful abilities to use in combat.';
      break;
    case 'Totemist':
      description =
        'This archetype allows you to embody the spirits of apex predators to improve your combat ability.';
      break;
    case 'ClericDivineMagic':
      description = 'This archetype grants you the ability to cast divine spells.';
      break;
    case 'DivineSpellMastery':
      description =
        'You must have the Divine Magic archetype from the cleric class to gain the abilities from this archetype.';
      break;
    case 'DomainInfluence':
      description = 'This archetype grants you divine influence over two domains of your choice.';
      break;
    case 'Healer':
      description = 'This archetype grants you healing abilities.';
      break;
    case 'Preacher':
      description =
        'This archetype grants you the ability to inspire your allies and denounce or even convert your foes.';
      break;
    case 'Elementalist':
      description =
        'This archetype grants you influence over four elements that define the natural world: air, earth, fire, and water.';
      break;
    case 'NatureMagic':
      description = 'This archetype grants you the ability to cast nature spells.';
      break;
    case 'NatureSpellMastery':
      description =
        'You must have the Nature Magic archetype from the druid class to gain the abilities from this archetype.';
      break;
    case 'Shifter':
      description =
        'This archetype grants you the ability to embody aspects of the natural world in your own form.';
      break;
    case 'Wildspeaker':
      description =
        'This archetypes deepens your connection to animals and plants, and allows you to call animals to aid you in combat.';
      break;
    case 'CombatDiscipline':
      description = 'This archetype allows you to improve your defenses and resist conditions.';
      break;
    case 'EquipmentTraining':
      description = 'This archetype improves your combat prowess with weapons and armor.';
      break;
    case 'MartialMastery':
      description = 'This archetype grants you special abilities to use in combat.';
      break;
    case 'Sentinel':
      description =
        'This archetype improves your ability to protect your allies in combat and control the battlefield.';
      break;
    case 'Tactician':
      description =
        'This archetype helps you lead your allies in combat with tactical abilities that allow you to adapt to different circumstances.';
      break;
    case 'Airdancer':
      description = 'This archetype improves your acrobatic ability and mobility in combat.';
      break;
    case 'EsotericWarrior':
      description =
        'This archetype improves your combat prowess with unusual abilities you can use in combat.';
      break;
    case 'Ki':
      description =
        'This archtype grants you unusual abilities based on tapping into your inner ki.';
      break;
    case 'PerfectedForm':
      description =
        'This archetype improves the perfection of your physical body through rigorous training.';
      break;
    case 'TranscendentSage':
      description =
        'This archetype grants you abilities to ignore debilitating effects and sense life energy.';
      break;
    case 'DevotedParagon':
      description =
        'This archetype deepens your connection to your alignment, granting you an aura and improving your combat abilities.';
      break;
    case 'PaladinDivineMagic':
      description = 'This archetype grants you the ability to cast divine spells.';
      break;
    case 'DivineSpellExpertise':
      description =
        'You must have the Divine Magic archetype from the paladin class to gain the abilities from this archetype.';
      break;
    case 'StalwartGuardian':
      description =
        'This archetype grants you healing abilities and improves your defensive prowess.';
      break;
    case 'ZealousWarrior':
      description =
        'This archetype improves your combat prowess, especially against foes who do not share your devoted alignment.';
      break;
    case 'Beastmaster':
      description =
        'This archetype improves your connection to animals, allowing you to control and command them in battle.';
      break;
    case 'BoundaryWarden':
      description =
        'This archetype improves your ability to guard the boundaries between civilization and nature.';
      break;
    case 'Huntmaster':
      description =
        'This archetype grants you and your allies abilities to hunt down specific foes.';
      break;
    case 'Scout':
      description = 'This archetype improves your senses and overall scouting ability.';
      break;
    case 'WildernessWarrior':
      description = 'This archetype grants you wild abilities to use in combat.';
      break;
    case 'Assassin':
      description =
        'This archetype improves your agility, stealth, and combat prowess against unaware targets.';
      break;
    case 'BardicMusic':
      description =
        'This archetype grants you the ability to inspire your allies and impair your foes with musical performances.';
      break;
    case 'CombatTrickster':
      description = 'This archetype grants you tricky abilities to use in combat.';
      break;
    case 'JackOfAllTrades':
      description = 'This archetype improves your skills and versatility.';
      break;
    case 'SuaveScoundrel':
      description =
        'This archetype improves your deceptiveness and helps you make use of that talent in combat.';
      break;
    case 'SorcererArcaneMagic':
      description = 'This archetype grants you the ability to cast arcane spells.';
      break;
    case 'SorcererArcaneSpellMastery':
      description =
        'You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.';
      break;
    case 'DraconicMagic':
      description =
        'Not all sorcerers know the reason for their innate connection to magic. Some discover that they have draconic blood in their veins, and some of those sorcerers learn how to tap into their heritage. This archetype deepens your magical connection to your draconic ancestor and enhances your spellcasting. You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.';
      break;
    case 'InnateArcanist':
      description =
        'This archetype deepens your innate connection to arcane magic and improves your ability to defeat other spellcasters. You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.';
      break;
    case 'WildMagic':
      description =
        'This archetype makes the magic you cast more chaotic, generally increasing its power at the cost of your control over your magic. You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.';
      break;
    case 'PactboundWarrior':
      description = 'This archetype grants you martial prowess through your pact.';
      break;
    case 'CovenantKeeper':
      description =
        'This archetype grants you access to powerful covenants you can forge with your soulkeeper, building on your basic pact.';
      break;
    case 'PactMagic':
      description = 'This archetype grants you the ability to cast pact spells.';
      break;
    case 'PactSpellMastery':
      description =
        'This archetype improves your ability to cast spells with the power of your dark pact. You must have the Pact Magic archetype to gain the abilities from this archetype.';
      break;
    case 'Soulforged':
      description =
        'This archetype enhances your connection to your soulkeeper, granting you abilities relating to your pact.';
      break;
    case 'Alchemist':
      description =
        'This archetype improves your ability to use alchemy to create unusual concoctions to aid your allies and harm your foes.';
      break;
    case 'WizardArcaneMagic':
      description = 'This archetype grants you the ability to cast arcane spells.';
      break;
    case 'ArcaneScholar':
      description =
        'This archetype deepens your study of arcane magic. You must have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.';
      break;
    case 'WizardArcaneSpellMastery':
      description =
        'You must have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.';
      break;
    case 'SchoolSpecialist':
      description =
        'This archetype improves your ability to cast spells from a particular school of magic while sacrificing some versatility. You must have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.';
      break;
    default:
      description = '';
      break;
  }

  const magicalNote = isArchetypeMagical(archetype)
    ? 'All abilities from this archetype are \\magical.'
    : '';
  return `${description.trim()} ${magicalNote}`.trim();
}

export function isArchetypeMagical(archetype: ClassArchetype): boolean {
  return getArchetypeRankAbilities(archetype).every((a) => a.isMagical);
}

export function getArchetypeRankAbilities(archetype: ClassArchetype): RankAbility[] {
  switch (archetype) {
    // Barbarian
    case 'BattleforgedResilience':
      return barbarian.battleforgedResilienceAbilities();
    case 'Battlerager':
      return barbarian.battleragerAbilities();
    case 'OutlandSavage':
      return barbarian.outlandSavageAbilities();
    case 'PrimalWarrior':
      return barbarian.primalWarriorAbilities();
    case 'Totemist':
      return barbarian.totemistAbilities();

    // Fighter
    case 'CombatDiscipline':
      return fighter.combatDisciplineAbilities();
    case 'EquipmentTraining':
      return fighter.equipmentTrainingAbilities();
    case 'MartialMastery':
      return fighter.martialMasteryAbilities();
    case 'Sentinel':
      return fighter.sentinelAbilities();
    case 'Tactician':
      return fighter.tacticianAbilities();

    // Monk
    case 'Airdancer':
      return monk.airdancerAbilities();
    case 'EsotericWarrior':
      return monk.esotericWarriorAbilities();
    case 'Ki':
      return monk.kiAbilities();
    case 'PerfectedForm':
      return monk.perfectedFormAbilities();
    case 'TranscendentSage':
      return monk.transcendentSageAbilities();

    // Ranger
    case 'Beastmaster':
      return ranger.beastmasterAbilities();
    case 'BoundaryWarden':
      return ranger.boundaryWardenAbilities();
    case 'Huntmaster':
      return ranger.huntmasterAbilities();
    case 'Scout':
      return ranger.scoutAbilities();
    case 'WildernessWarrior':
      return ranger.wildernessWarriorAbilities();

    // Rogue
    case 'Assassin':
      return rogue.assassinAbilities();
    case 'BardicMusic':
      return rogue.bardicMusicAbilities();
    case 'CombatTrickster':
      return rogue.combatTricksterAbilities();
    case 'JackOfAllTrades':
      return rogue.jackOfAllTradesAbilities();
    case 'SuaveScoundrel':
      return rogue.suaveScoundrelAbilities();

    // Cleric
    case 'ClericDivineMagic':
      return cleric.divineMagicAbilities();
    case 'DivineSpellMastery':
      return cleric.divineSpellMasteryAbilities();
    case 'DomainInfluence':
      return cleric.domainInfluenceAbilities();
    case 'Healer':
      return cleric.healerAbilities();
    case 'Preacher':
      return cleric.preacherAbilities();

    // Druid
    case 'Elementalist':
      return druid.elementalistAbilities();
    case 'NatureMagic':
      return druid.natureMagicAbilities();
    case 'NatureSpellMastery':
      return druid.natureSpellMasteryAbilities();
    case 'Shifter':
      return druid.shifterAbilities();
    case 'Wildspeaker':
      return druid.wildspeakerAbilities();

    // Paladin
    case 'DevotedParagon':
      return paladin.devotedParagonAbilities();
    case 'PaladinDivineMagic':
      return paladin.divineMagicAbilities();
    case 'DivineSpellExpertise':
      return paladin.divineSpellExpertiseAbilities();
    case 'StalwartGuardian':
      return paladin.stalwartGuardianAbilities();
    case 'ZealousWarrior':
      return paladin.zealousWarriorAbilities();

    // Sorcerer
    case 'SorcererArcaneMagic':
      return sorcerer.arcaneMagicAbilities();
    case 'SorcererArcaneSpellMastery':
      return sorcerer.arcaneSpellMasteryAbilities();
    case 'DraconicMagic':
      return sorcerer.draconicMagicAbilities();
    case 'InnateArcanist':
      return sorcerer.innateArcanistAbilities();
    case 'WildMagic':
      return sorcerer.wildMagicAbilities();

    // Votive
    case 'CovenantKeeper':
      return votive.covenantKeeperAbilities();
    case 'PactMagic':
      return votive.pactMagicAbilities();
    case 'PactSpellMastery':
      return votive.pactSpellMasteryAbilities();
    case 'PactboundWarrior':
      return votive.pactboundWarriorAbilities();
    case 'Soulforged':
      return votive.soulforgedAbilities();

    // Wizard
    case 'Alchemist':
      return wizard.alchemistAbilities();
    case 'WizardArcaneMagic':
      return wizard.arcaneMagicAbilities();
    case 'WizardArcaneSpellMastery':
      return wizard.arcaneSpellMasteryAbilities();
    case 'ArcaneScholar':
      return wizard.arcaneScholarAbilities();
    case 'SchoolSpecialist':
      return wizard.schoolSpecialistAbilities();

    // Uncommon species
    case 'Automaton':
      return automaton.automatonAbilities();
    case 'Dragon':
      return dragon.dragonAbilities();
    case 'Dryad':
      return dryad.dryadAbilities();
    case 'Harpy':
      return harpy.harpyAbilities();
    case 'Incarnation':
      return incarnation.incarnationAbilities();
    case 'Naiad':
      return naiad.naiadAbilities();
    case 'Oozeborn':
      return oozeborn.oozebornAbilities();
    case 'Treant':
      return treant.treantAbilities();
    case 'Troll':
      return troll.trollAbilities();
    case 'Vampire':
      return vampire.vampireAbilities();

    default:
      return [];
  }
}

export function latexClassFeature(ability: RankAbility, classShorthand: string): string {
  const magical = ability.isMagical ? '[\\sparkle]' : '';
  const description = cleanDescription(ability.description);
  return `
\\cf{${classShorthand}}[${ability.rank}]{${ability.name}}${magical}
${description}
`.trim();
}

function cleanDescription(description: string): string {
  const lines = description.split('\n');
  // Remove leading and trailing empty lines
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  if (lines.length === 0) return '';

  // Find minimum indentation of non-empty lines
  const minIndent = lines
    .filter((line) => line.trim() !== '')
    .reduce((min, line) => {
      const match = line.match(/^ */);
      const indent = match ? match[0].length : 0;
      return Math.min(min, indent);
    }, Infinity);

  if (minIndent === Infinity) return lines.join('\n');

  return lines.map((line) => (line.trim() === '' ? '' : line.slice(minIndent))).join('\n');
}

export function latexArchetypeDescription(archetype: ClassArchetype): string {
  const cls = getArchetypeClass(archetype);
  const classShorthand = getClassShorthand(cls);
  const abilities = getArchetypeRankAbilities(archetype);

  const abilityDescriptions = abilities
    .filter((a) => a.description.trim() !== '')
    .map((a) => latexClassFeature(a, classShorthand))
    .sort();

  const magicalSparkle = isArchetypeMagical(archetype) ? '*' : '';

  return `
\\archetypedef${magicalSparkle}{${classShorthand}}{${titleCase(getArchetypeName(archetype))}}
${getArchetypeShortDescription(archetype)}

${abilityDescriptions.join('\n\n')}
`.trim();
}

export function latexArchetypeTable(cls: Class): string {
  const archetypes = getArchetypesForClass(cls);
  const archetypeColumns = Array(archetypes.length).fill('>{\\lcol}X').join(' ');
  const archetypeHeaders = archetypes
    .map((a) => {
      const magical = isArchetypeMagical(a) ? '*' : '';
      return `\\tb{\\archetyperef${magical}{${getClassShorthand(cls)}}{${getArchetypeName(a)}}}`;
    })
    .join(' & ');

  return latexify(`
        \\begin{dtable!*}
            \\lcaption{${titleCase(getClassName(cls))} Archetypes}
            \\begin{dtabularx}{\\textwidth}{l ${archetypeColumns}}
                \\tb{Rank} & ${archetypeHeaders} \\tableheaderrule
                ${latexArchetypeRankTableRows(cls)}
            \\end{dtabularx}
        \\end{dtable!*}
    `);
}

export function getArchetypesForClass(cls: Class): ClassArchetype[] {
  switch (cls) {
    case 'Barbarian':
      return [
        'BattleforgedResilience',
        'Battlerager',
        'OutlandSavage',
        'PrimalWarrior',
        'Totemist',
      ];
    case 'Cleric':
      return ['ClericDivineMagic', 'DivineSpellMastery', 'DomainInfluence', 'Healer', 'Preacher'];
    case 'Druid':
      return ['Elementalist', 'NatureMagic', 'NatureSpellMastery', 'Shifter', 'Wildspeaker'];
    case 'Fighter':
      return ['CombatDiscipline', 'EquipmentTraining', 'MartialMastery', 'Sentinel', 'Tactician'];
    case 'Monk':
      return ['Airdancer', 'EsotericWarrior', 'Ki', 'PerfectedForm', 'TranscendentSage'];
    case 'Paladin':
      return [
        'DevotedParagon',
        'PaladinDivineMagic',
        'DivineSpellExpertise',
        'StalwartGuardian',
        'ZealousWarrior',
      ];
    case 'Ranger':
      return ['Beastmaster', 'BoundaryWarden', 'Huntmaster', 'Scout', 'WildernessWarrior'];
    case 'Rogue':
      return ['Assassin', 'BardicMusic', 'CombatTrickster', 'JackOfAllTrades', 'SuaveScoundrel'];
    case 'Sorcerer':
      return [
        'SorcererArcaneMagic',
        'SorcererArcaneSpellMastery',
        'DraconicMagic',
        'InnateArcanist',
        'WildMagic',
      ];
    case 'Votive':
      return ['CovenantKeeper', 'PactMagic', 'PactSpellMastery', 'PactboundWarrior', 'Soulforged'];
    case 'Wizard':
      return [
        'WizardArcaneMagic',
        'WizardArcaneSpellMastery',
        'Alchemist',
        'ArcaneScholar',
        'SchoolSpecialist',
      ];
    case 'Automaton':
      return ['Automaton'];
    case 'Dragon':
      return ['Dragon'];
    case 'Dryad':
      return ['Dryad'];
    case 'Harpy':
      return ['Harpy'];
    case 'Incarnation':
      return ['Incarnation'];
    case 'Naiad':
      return ['Naiad'];
    case 'Oozeborn':
      return ['Oozeborn'];
    case 'Treant':
      return ['Treant'];
    case 'Troll':
      return ['Troll'];
    case 'Vampire':
      return ['Vampire'];
    default:
      return [];
  }
}

export function latexArchetypeRankTableRows(cls: Class): string {
  const abilitiesByRank = generateAbilityNamesByArchetypeRank(cls);
  const rows: string[] = [];
  for (let rank = 1; rank < abilitiesByRank.length; rank++) {
    rows.push(
      `
            ${rank} & ${abilitiesByRank[rank]} \\\\
        `.trim(),
    );
  }
  return rows.join('\n');
}

export function generateAbilityNamesByArchetypeRank(cls: Class): string[] {
  const archetypes = getArchetypesForClass(cls);
  const abilitiesByRankAndArchetype: string[][] = [];

  for (let i = 0; i < archetypes.length; i++) {
    const archetype = archetypes[i];
    for (let rank = 0; rank < 8; rank++) {
      const abilitiesAtRank = getArchetypeRankAbilities(archetype).filter((a) => a.rank === rank);
      abilitiesAtRank.sort((a, b) => a.name.localeCompare(b.name));

      if (!abilitiesByRankAndArchetype[rank]) {
        abilitiesByRankAndArchetype[rank] = [];
      }

      const abilityNames = abilitiesAtRank
        .filter((a) => a.description.trim() !== '')
        .map((a) => a.name.replace(/\+/g, '\\plus'))
        .join(', ')
        .toLowerCase();

      abilitiesByRankAndArchetype[rank].push(
        abilityNames.length > 0 ? abilityNames.charAt(0).toUpperCase() + abilityNames.slice(1) : '',
      );
    }
  }

  const abilitiesByRank: string[] = [];
  for (let rank = 0; rank < abilitiesByRankAndArchetype.length; rank++) {
    abilitiesByRank.push(abilitiesByRankAndArchetype[rank].join(' & '));
  }
  return abilitiesByRank;
}
