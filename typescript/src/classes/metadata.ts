import {
  Class,
  ClassArchetype,
  RankAbility,
  ArmorProficiencies,
  WeaponProficiencies,
} from './types';
import { RiseSkill, RiseDefense, RiseAlignment } from '../character_sheet/rise_data';
import { ArmorKind, ArmorUsageClass } from '../equipment/armor';
import { dedent } from '../util/dedent';

import { titleCase } from '../latex/format/title_case';
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

export function getClassName(cls: Class): string {
  // Rust returns lowercase name
  return cls.toLowerCase();
}

export function getClassAlignment(cls: Class): string {
  return 'Any';
}


export function getClassSkills(cls: Class): RiseSkill[] {
  switch (cls) {
    case 'Automaton':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deduction',
        'devices',
        'disguise',
        'endurance',
        'jump',
        'knowledge_engineering',
        'knowledge_items',
      ];
    case 'Barbarian':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'medicine',
        'persuasion',
        'ride',
        'survival',
        'swim',
      ];
    case 'Cleric':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_local',
        'knowledge_planes',
        'knowledge_religion',
        'medicine',
        'persuasion',
        'social_insight',
      ];
    case 'Dragon':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'medicine',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Druid':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'disguise',
        'endurance',
        'intimidate',
        'jump',
        'knowledge_dungeoneering',
        'knowledge_items',
        'knowledge_nature',
        'persuasion',
        'ride',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Dryad':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'disguise',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_arcana',
        'knowledge_nature',
        'medicine',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Fighter':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deception',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_items',
        'medicine',
        'persuasion',
        'ride',
        'swim',
      ];
    case 'Harpy':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'flexibility',
        'intimidate',
        'jump',
        'perform',
        'persuasion',
        'social_insight',
        'stealth',
        'survival',
      ];
    case 'Incarnation':
      return [
        'climb',
        'craft_untrained',
        'jump',
        'balance',
        'flexibility',
        'endurance',
        'knowledge_arcana',
        'knowledge_nature',
        'knowledge_planes',
        'awareness',
        'intimidate',
      ];
    case 'Monk':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'medicine',
        'perform',
        'persuasion',
        'ride',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Naiad':
      return [
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'flexibility',
        'intimidate',
        'knowledge_nature',
        'medicine',
        'perform',
        'persuasion',
        'sleight_of_hand',
        'social_insight',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Oozeborn':
      return [
        'awareness',
        'balance',
        'climb',
        'endurance',
        'flexibility',
        'intimidate',
        'knowledge_dungeoneering',
        'sleight_of_hand',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Paladin':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'endurance',
        'intimidate',
        'knowledge_local',
        'knowledge_religion',
        'medicine',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Ranger':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'creature_handling',
        'deception',
        'deduction',
        'endurance',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_religion',
        'knowledge_souls',
        'medicine',
        'persuasion',
        'ride',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Rogue':
      return [
        'awareness',
        'balance',
        'climb',
        'craft_untrained',
        'deception',
        'deduction',
        'devices',
        'disguise',
        'flexibility',
        'intimidate',
        'jump',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'perform',
        'persuasion',
        'ride',
        'sleight_of_hand',
        'social_insight',
        'stealth',
        'swim',
      ];
    case 'Sorcerer':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'endurance',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_planes',
        'persuasion',
      ];
    case 'Treant':
      return [
        'awareness',
        'balance',
        'craft_untrained',
        'creature_handling',
        'endurance',
        'intimidate',
        'knowledge_nature',
        'survival',
        'swim',
      ];
    case 'Troll':
      return [
        'awareness',
        'climb',
        'endurance',
        'intimidate',
        'jump',
        'stealth',
        'survival',
        'swim',
      ];
    case 'Vampire':
      return [
        'awareness',
        'balance',
        'climb',
        'creature_handling',
        'deception',
        'deduction',
        'disguise',
        'intimidate',
        'jump',
        'knowledge_dungeoneering',
        'knowledge_religion',
        'persuasion',
        'social_insight',
        'stealth',
      ];
    case 'Votive':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'disguise',
        'intimidate',
        'knowledge_arcana',
        'knowledge_items',
        'knowledge_planes',
        'knowledge_religion',
        'persuasion',
        'ride',
        'social_insight',
      ];
    case 'Wizard':
      return [
        'awareness',
        'craft_untrained',
        'deception',
        'deduction',
        'devices',
        'intimidate',
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_religion',
        'knowledge_souls',
        'persuasion',
      ];
    default:
      return [];
  }
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

export function getClassTrainedSkills(cls: Class): number {
  switch (cls) {
    case 'Automaton':
    case 'Dragon':
    case 'Druid':
    case 'Dryad':
    case 'Incarnation':
    case 'Oozeborn':
    case 'Vampire':
      return 4;
    case 'Barbarian':
    case 'Cleric':
    case 'Fighter':
    case 'Paladin':
    case 'Sorcerer':
    case 'Treant':
    case 'Troll':
    case 'Votive':
    case 'Wizard':
      return 3;
    case 'Harpy':
    case 'Monk':
    case 'Naiad':
    case 'Ranger':
      return 5;
    case 'Rogue':
      return 6;
    default:
      return 0;
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


export function getClassNarrativeText(cls: Class): string {
  switch (cls) {
    case 'Barbarian':
      return dedent(
        `
        Barbarians are primal warriors who fight using raw physical prowess and unfettered emotions.
        Most barbarians originate from the outskirts of civilization, where the societal constraints of civilization are less present.
        Of course, becoming a barbarian is no secret rite.
        The only thing that is required is a willingness to fully experience one's emotions and channel them into physical betterment.
        This path evokes ancient memories from a time when physical supremacy was sufficient for victory, before the complexity of organized warfare.
        Anyone can discover that path for themselves.

        Barbarians are famous for their furious battlerage.
        Anger is one of the easiest emotions to channel into the violence of battle.
        It is a common starting point for new barbarians.
        However, any emotion can be used as a source of primal power, as long as it is sufficiently intense.

        Barbarians and monks have a curious relationship.
        Members of both classes place a great importance on physical excellence, and believe that the mind and body must work together to maximize potential.
        However, a typical monk sees emotions as a tool at best and an obstacle at worst.
        They value serenity and control over their mind and body.
        From the perspective of a barbarian, monks completely surrender to civilization's taming and placating influences, and abandon their primal heritage.

        Rangers and druids are natural allies of barbarians, since all three groups prefer to live at the edges of civilization.
        However, each has different reasons for their preference.
        Barbarians enjoy the freedom of the frontier.
        However, they are often too social to live as hermits in the deep wilderness.
        Druids prefer nature to civilization ideologically, and rangers are best able to fulfill their responsibilities on the frontier.
      `,
        8,
      );
    case 'Cleric':
      return dedent(
        `
        Clerics are divine spellcasters who draw power from their worship of a single deity.
        The powers of any individual cleric can vary greatly depending on their deity, and the specific aspects of that deity they choose to emulate.
        Many clerics have exceptional healing or oratory talents, which are powerful tools in spreading the influence of their deity.

        Deities are a constant background presence in the world of Rise.
        Commoners acknowledge the influence of many deities on their life, and offer gifts or prayers to each deity according to their purview.
        Clerics are the primary conduits through which deities answer these prayers.
        In exchange for their mighty divine power, clerics are charged with serving the deity's interests in the world.

        Clerics are the most common spellcasting class in the world.
        The path to becoming a cleric is easier than for any other spellcasting class except for sorcerers, and unlike sorcerers, clerics require no special birthright.
        Many clerics have responsibilities to their deity that preclude adventuring.
        For example, some clerics provide healing services to anyone who enters their temple.

        Adventuring clerics can exist for a variety of reasons.
        They may be charged to help spread knowledge of their deity, and becoming well-known as an adventurer can serve that end.
        Alternately, they may simply be charged by their deity to grow their personal power.
        Deities need powerful clerics to maximize their influence on the mortal world.

        Paladins and druids are closely related to clerics, since all three draw power from their veneration of external entities.
        However, the specific nature of each connection is quite different.
        Clerics can always be confident that they serve their deity's best interests.
        In contrast, paladins and druids have no oversight and unclear responsibilities.
        This makes them unreliable allies at best and ideological foes at worst.

        Druids and clerics have a degree of intrinsic tension.
        Clerics generally want to expand the worship of their specific deity.
        That task is easiest in civilized areas where many potential worshippers can be found.
        However, it is contrary to the typical druidic preference against civilization.

        The standard pantheon of deities is listed below.
        You can also talk to your GM about worshipping an unusual deity.

        \\begin{dtable!*}
        \\lcaption{Deities}
        \\begin{dtabularx}{\\textwidth}{X l X}
        \\tb{Deity} & \\tb{Alignment} & \\tb{Domains} \\tableheaderrule
            Gregory, warrior god of mundanity     & Lawful good     & Good, Law, Protection, War         \\\\
            Guftas, horse god of justice          & Lawful good     & Good, Law, Life, Travel            \\\\
            Lucied, paladin god of justice        & Lawful good     & Destruction, Good, Law, War        \\\\
            Simor, fighter god of protection      & Lawful good     & Good, Law, Protection, War         \\\\
            Ayala, naiad god of water             & Neutral good    & Good, Magic, Ocean, Wild           \\\\
            Pabs Beerbeard, dwarf god of drink    & Neutral good    & Good, Earth, Forge, Life           \\\\
            Rucks, monk god of pragmatism         & Neutral good    & Good, Law, Protection, Travel      \\\\
            Vanya, centaur god of nature          & Neutral good    & Good, Travel, War, Wild            \\\\
            Brushtwig, pixie god of creativity    & Chaotic good    & Chaos, Good, Trickery, Wild        \\\\
            Camilla, tiefling god of fire         & Chaotic good    & Chaos, Good, Magic, Sun            \\\\
            Chavi, wandering god of stories       & Chaotic good    & Chaos, Good, Knowledge, Trickery   \\\\
            Chort, dwarf god of optimism          & Chaotic good    & Chaos, Good, Life, Travel, Wild    \\\\
            Ivan Ivanovitch, bear god of strength & Chaotic good    & Chaos, Good, War, Wild             \\\\
            Krunch, barbarian god of destruction  & Chaotic good    & Chaos, Destruction, Good, War      \\\\
            Sir Cakes, dwarf god of freedom       & Chaotic good    & Chaos, Good, Earth, Forge          \\\\
            Mikolash, scholar god of knowledge    & Lawful neutral  & Knowledge, Law, Magic, Protection  \\\\
            Raphael, monk god of retribution      & Lawful neutral  & Death, Destiny, Law, Protection    \\\\
            Declan, god of fire                   & True neutral    & Destruction, Knowledge, Magic, Sun \\\\
            Mammon, golem god of endurance        & True neutral    & Destiny, Knowledge, Magic, Protection \\\\
            Kurai, shaman god of nature           & True neutral    & Earth, Ocean, Sky, Sun             \\\\
            Amanita, druid god of decay           & Chaotic neutral & Chaos, Destruction, Life, Wild     \\\\
            Antimony, elf god of necromancy       & Chaotic neutral & Chaos, Death, Knowledge, Life      \\\\
            Clockwork, elf god of time            & Chaotic neutral & Chaos, Magic, Trickery, Travel     \\\\
            Diplo, doll god of destruction        & Chaotic neutral & Chaos, Destruction, Trickery, War  \\\\
            Lord Khallus, fighter god of pride    & Chaotic neutral & Chaos, Forge, Protection, War      \\\\
            Celeano, sorcerer god of deception    & Chaotic neutral & Chaos, Magic, Protection, Trickery \\\\
            Murdoc, god of mercenaries            & Chaotic neutral & Destruction, Knowledge, Travel, War \\\\
            Tak, orc god of war                   & Lawful evil     & Forge, Evil, Law, War              \\\\
            Theodolus, sorcerer god of ambition   & Neutral evil    & Evil, Knowledge, Magic, Trickery   \\\\
            Daeghul, demon god of slaughter       & Chaotic evil    & Chaos, Destruction, Evil, War      \\\\
        \\end{dtabularx}
        \\end{dtable!*}
      `,
        8,
      );
    case 'Druid':
      return dedent(
        `
        Druids are nature spellcasters who draw power from their veneration of the natural world.
        They worship Gaia, the embodiment of life.
        Gaia grants her followers influence over her domain in gratitude for their service.

        All druids value the continuation of life - in the abstract, universal sense, not the specific sense.
        Predation is a critical part of the natural world, and most druids have no prohibitions against killing.
        Life as a whole, across all species and levels of sentience, must continue.
        The worst nightmare of all druids is a dead world, inhabited only by rocks and memories of the life that once existed.

        Individual druids have a great variety of opinions and interpretations about which aspects of nature are most important.
        Some druids treat all forms of life as equal.
        Others draw distinctions between different forms of life, such as prioritizing the needs of highly sentient or highly complex life over others.
        Of course, many druids don't dwell on philosophical questions about the precise value of Gaia's various aspects. 
        They focus more on practical maintenance of the natural world according to their own instincts.
        Gaia's domain is immense, and her guidance is virtually nonexistent.

        Many druids avoid or actively reject overly developed civilization.
        The details and causes of this aversion can be source of great disagreement between different druids.
        Civilization tends to displace or kill natural life.
        It replaces the vibrant diversity of life in a forest with a comparatively bland and homogeneous subset of species.
        In general, druids who value all forms of life equally and consider diversity to be intrinsically valuable tend to reject civilization most strongly.
        On the other hand, druids who value life according to its sentience or complexity are typically more tolerant of civilization.

        Most druids belong to a specific druidic circle.
        Druidic circles are groups of druids that share a similar philosophy.
        Like druids, druidic circles have highly varied structures.
        Some druidic circles function as communes where all members live together, either nomadically or in a specific area of land claimed by the circle.
        Others simply have annual meetings to discuss critical matters, with many of the circle's members living in isolation at all other times.

        Since druids tend to be more isolated than most, their attachment to druidic circles may seem odd to outsiders.
        There are many reasons for this tradition, but foremost among them is the importance of continuity of knowledge in the absence of advanced civilization.
        Druids are unlikely to simply go to a library in a city to gain important knowledge about the natural world.
        Instead, they must learn from someone who has the knowledge they lack.
        This means they need access to wise elders who are willing to pass on what they know.
        Their wisdom must be kept alive between generations through oral traditions.
        Druidic circles provide a place for this knowledge transfer to occur, and offer a path to welcoming new druids into the fold.
      `,
        8,
      );
    case 'Fighter':
      return dedent(
        `
        Fighters are highly disciplined warriors who excel in physical combat of any kind.
        They have a deep mastery of the implements and strategies of battle thanks to their extensive training.
        Other martial characters may be physically stronger or capable of strange and improbable tricks, but fighters are unmatched as battlefield champions.

        Each fighter has a different area of specialization, but most fighters have some amount of battlefield control.
        They can guard their allies, impede the movement of their foes, or give battle commands to their allies to guide them.
        This makes fighters invaluable in large-scale battles, and they are the most common class found in organized military forces.
        The regimented nature of army life tends to drive away many people used to more freedom, but fighters are often compatible with the discipline found in armed forces.

        More broadly, fighters are the most common class in many civilized settings.
        A fighter's training requires no secret wisdom, and it can be self-taught or guided by a mentor.
        Many people undergo some battle training regardless of their ultimate path in life, leading them to discover that they may enjoy it for its own sake.

        Monks are closely related to fighters, since both classes use training and discipline to improve themselves.
        However, monks focus more on mental control and exploring the supernatural powers that come from tapping into the body's potential.
        In constrast, fighters have a more grounded approach, and focus more on practical knowledge that can be directly applied to physical combat.
        A typical monk would consider fighters to be overly limited in their focus on day-to-day combat, while a typical fighter would consider monks to be wasting their training with mysticism and esoteric nonsense.
      `,
        8,
      );
    case 'Monk':
      return dedent(
        `
        Monks are agile masters of \`\`ki'' who hone their personal abilities to strike down foes and perform supernatural feats.
        They undergo extensive training to control their mind and body in unison, using each to improve the other.
        The techniques required to become a monk are strange and unintuitive, and only a legendary few can discover them on their own.
        Instead, most monks are trained at monastaries, where they learn how to master themselves long before they turn their attention to besting others in combat.

        Unlike every other class capable of magical feats, monks draw their power entirely from themselves.
        They have learned to tap into the life energy within their bodies, use it to cause dramatic effects in the world around them, and then reclaim that energy instead of letting it dissipate into the world.
        This process is deeply dangerous if misapplied, which is why the training required to become a monk is so rigorous.
        Expending one's life energy without being able to reclaim it is a fast path to inadvertent death.

        Monks are famous for their ability to fight completely unarmed, and for their tendency to use unusual weapons that few non-monks use.
        This is more a matter of tradition than any necessity.
        Some monks prefer more common weapons, and any fighter could learn how to use monk weapons given time to train with them.
        However, the monk weapons are well suited to the fighting styles that monks learn as part of their training.

        The combat training for monks often consists of dueling other monks, and rarely involves fighting non-humanoid monsters.
        As a result, they often try to trip, grapple, or distract their foes in combat.
        These strategies are all most effective against humanoid opponents.
      `,
        8,
      );
    case 'Paladin':
      return dedent(
        `
        Paladins are divinely imbued warriors who exemplify a particular alignment.
        They can shift easily between physical combat and spellcasting depending on the situation.
        Many paladins can heal themselves and their allies, and can share their divine connection with those nearby, making them a beacon on a battlefield.

        The scope of each alignment is quite broad, so even paladins of the same alignment can be as diverse in personality and morality as any other class.
        Paladins of law tend to be the most homogeneous in their beliefs, but even they may have stark disagreements about the rightful code to follow, and in what circumstances a personal or universal code of ethics can supercede the law in a specific territory.

        Paladins are both famous and infamous for their dedication, and for their tendency to exhort those around them to act according to the paladin's ideals.
        There is some truth to the stereotype of the stony-faced paladin who regards any form of compromise as unacceptable.
        However, few of those overly zealous paladins make their way into adventuring parties.
        Only paladins who understand the necessity of working as an effective team with others who do not share their ideals are likely to have any success adventuring.
        For some paladins, this is a compromise they grudgingly make in the pursuit of the greater good - or the greater evil.
        Others perceive no conflict at all, and eagerly work with those of opposed alignments with the goal of demonstrating the superiority of their moral compass by example.

        Of all spellcasting classes, paladins are in some ways the most limited.
        They have access to a relatively small number of mystic spheres.
        However, they are also the only spellcasting class that can naturally use heavy armor, and they have some unique abilities that can make them powerful frontline casters.

        Paladins and fighters share a similar ability to influence a battlefield at a large scale while being difficult to kill.
        Their methods and ideology may be different, but they can often work together easily and effectively.
        It is more difficult to characterize the relationship between paladins and other classes, since so much depends on the paladin's alignment and personal interpretation of that alignment.
        Paladins of law typically despise barbarians and rogues, while paladins of chaos distrust the rigid mentality common to monks and fighters.
        Votives are deeply suspicious to paladins of good, though paladins of good tend to be more forgiving than other paladins.
        Paladins of evil despise druids who have too much respect for the sanctity of life.
        All paladins may have strong feelings about clerics depending on the alignment of that cleric's deity.
      `,
        8,
      );
    case 'Ranger':
      return dedent(
        `
        Rangers are skilled hunters who bridge the divide between nature and civilization.
        They are typically most at home on the frontiers, keeping monsters and civilized groups from interfering with each other.
        Different rangers may have more personal affinity for civilization or for monsters.

        Like druids and monks, rangers are seldom self-taught.
        Just as rangers occupy a middle space between society and the wilds beyond it, their abilities are a complex combination of training, experience, and gifts granted by Gaia.
        The vast majority of people who might attempt to learn how to be a ranger on their own would focus too much on only one aspect of a ranger's abilities.
        These people might find the path to becoming a fighter, druid, or rogue instead.

        Rangers draw their core power from their training, which includes extensive experience with weapons and armaments like a fighter.
        However, they also study the natural world and the environment around them.
        This study is more focused on practical knowlege about survival and hunting than the more reverent study of druids.
        During this wilderness experience, some rangers forge a deep bond with a single animal who follows them everywhere.
        This bond is intensified by Gaia's influence, and has a hint of her magic in it.
        Others shy away from that level of commitment or find no meaning in it, and prefer a more solitary hunt.

        Traditionally, a ranger's training occurs under an experienced ranger leader.
        Some rangers train small packs of new recruits at once, while others prefer to oversee a single apprentice.
        There are many ways that a would-be ranger might find a mentor, but no single certain way.
        Rangers in the wild do not tend to maintain long-term societal bonds like druidic circles, so there are fewer obvious ways to easily find an experienced mentor.
        Without druidic magic for long-distance communication, rangers struggle to maintain cohesion across the vast territories that they patrol, so they typically make no attempt to do so.

        Rangers are sometimes employed by a government to keep its borders safe from monsters.
        They may also be found as bounty hunters, using their skills to hunt prey within civilization instead of at its edges.
        Still others live among druidic circles.
        More than any other class, rangers struggle to find a place to fully call home, and may wander between widely varied walks of life for years at a time.
        They are caught between worlds, and only some rangers find peace in that division.
      `,
        8,
      );
    case 'Rogue':
      return dedent(
        `
        Rogues are exceptionally skillful characters known for their ability to strike at their foe's weak points in combat.
        It is dangerous to make any assumptions about rogues.
        They can be acrobatic fighters, charismatic tricksters, inspiring musicians, stealthy assassins, or all of the above.
        All rogues share a fundamental flexibility, preferring to use the right tools for the situation rather than solving all of their problems in the same way.

        A rogue's power fundamentally comes from experience, but it is seldom the rigorous, structured training that a fighter or monk might undertake.
        More often, rogues develop their talents by following their instincts and seeing what works and what doesn't.
        They may have a natural gift for persuasion that they develop into a fine edge through years of charismatic conversations.
        The back alleys of cities are a natural training ground, where education comes in the form of evading or receiving punishments for misdeeds.

        While most of a rogue's skills are intuitively understandable and mundane, bardic music is an odd exception.
        There is an underlying structure to the universe that some scholars call the Universal Harmony.
        Exceptionally talented performances can hit tones that resonate with the Universal Harmony, which amplifies the effects of the performance beyond mundane limits.
        This is always a simple amplification, taking effects that would be a natural result of the music and multiplying their effects.
        A humorous musical piece can become outrageously funny, and an ominous piece can become utterly terrifying, but the full complexity of true spellcasting cannot be replicated in this way.

        Some rogues discover the effects of the Universal Harmony for themselves.
        There also exist bardic colleges that are dedicated to the study and replication of effects amplified in this way, and rogues may attend these colleges to deepen their skills.
        Officially, bardic colleges train their attendees in musical theory and practical performance.
        Unofficially, many bardic colleges have recognized that many of their students have a variety of less reputable talents.
        These colleges may have night classes that train rogues in other skills, including effective deception and even assassination.
        They maintain a level of plausible deniability, but would-be rogues can often discover the truth and complete their training there.
      `,
        8,
      );
    case 'Sorcerer':
      return dedent(
        `
        Sorcerers are arcane spellcasters who are inherently magical.
        They require no training or external sources to access their magical abilities.
        Many sorcerers intuitively used their magic to influence their surroundings long before they understood exactly what they were doing, or that they were tapping into powers others could not.

        Of all classes, sorcerers are the most likely to be completely self-trained.
        Each sorcerer has a unique connection to their magical nature, and they often have idiosyncratic requirements or limitations.
        For example, a sorcerer may feel ravenously hungry after tapping into their powers, or they may need to spend time upside down each day to \`\`recharge'' their magic.

        The gestures and incanations spoken by sorcerers are similarly diverse - if they require any spellcasting components at all.
        Some sorcerers channel their magic through martial arts and battle cries, and may be easily confused with barbarians or monks.
        Others believe their magic comes from external forces, such as nature spirits or strange entities that they imagine for themselves.
        Still others study magic extensively and imagine themselves to be wizards, but their conclusions are nonsensical and no one else can replicate their findings.
        The only certainty is that each sorcerer is unique.

        The true cause of a sorcerer's magic has more consistency than its expression.
        Sorcerers do not draw power from their life energy or any internal storage, like monks do.
        Instead, they directly manipulate the primal forces of the universe, as wizards do.
        Sorcerers are intrinsic conduits for that raw power, and they can deepen their connection with experience.
        A sorcerer's nature is fundamentally their birthright, and it cannot be learned.

        Of course, that doesn't entirely explain why sorcerers are intrinsic conduits.
        No one knows exactly how to predict or explain sorcerous potential.
        However, sorcerers are much more common in bloodlines that have immortal ancestors.
        Most commonly, this means draconic ancestry, and some sorcerers specifically tap into their draconic potential.
        However, celestial or infernal heritage is also not unheard of, and even stranger ancestry is possible.
        In addition, sorcerers seem to be more common in areas that have been affected by powerful magic.
      `,
        8,
      );
    case 'Votive':
      return dedent(
        `
        Votives are pact spellcasters who draw power from a powerful ally through a binding magical pact.
        In life, they gain great magical power.
        However, their soul passes to their soulkeeper on death, and the pact may have other costs as well.

        Many people view votives with suspicion.
        Votives wield power that is not entirely their own, and may not have any great training or wisdom about how to apply it appropriately.
        Many are short-term thinkers, prioritizing their present needs over the long-term costs, just as they did when they made their pacts.
        In addition, votives may act as unknowing pawns in the cosmic games of their soulkeepers.

        Votives are typically self-taught, or more accurately, educated by their soulkeeper in the use of their powers.
        It is not uncommon for votives to search for votive mentors so they can master their powers without completely trusting their soulkeeper.
        These relationships are typically based on contracts and expectations of future services from the apprentice once their training is complete, just like a soul pact.
        A certain level of mistrust is common, and apprentices sometimes successfully betray their mentors, just like they hope to escape their soulkeeper's clutches.
        To minimize the danger of these relationships, votive mentors almost never take more than a single apprentice at a time.

        Clerics and votives have a complicated relationship.
        From a certain perspective, they both gain power in exchange for their service to a powerful extraplanar entity.
        Votives often enjoy emphasizing the similarity, which can be a useful rhetorical tool to mitigate anti-votive prejudice.
        For their part, clerics tend to strongly disagree with this analogy.

        Rogues tend to get along better with votives than most classes do.
        Many rogues have a \`\`do whatever works'' attitude that helps them understand why votives would make a soul pact, even if they might not make the same pact themselves.
        In addition, rogues are generally flexible about their companions, and wouldn't begrudge having a votive in a group as long as the votive doesn't cause problems.
      `,
        8,
      );
    case 'Wizard':
      return dedent(
        `
        Wizards are arcane spellcasters who study magic to unlock its powerful secrets.
        They have spent years studying the primal forces that define the universe.
        Their extensive research has revealed complicated ways in which those forces can be accessed and manipulated by mere mortals.

        Wizards are almost never completely self-taught.
        The primal forces of the universe do not give up their power easily, and the methods used to access that power are unintuitive.
        Most wizards learn at arcane colleges or through direct mentorship by older, wiser wizards.
        Even wizard prodigies who learn alone have some access to the research performed by wizards over the centuries, generally in the form of massive books.

        There are two fundamental principles of arcane magic that are shared by all wizards.
        The first principle is the creation of links between planes.
        A wizard can expend a small amount of energy to open an extremely small, extremely short-lived interdimensional gate that leads to a source of power.
        The destination for this gate depends on the \\glossterm{mystic sphere} the wizard are manipulating.
        As a simple example, \\sphere{pyromancy} spells generally require gates to the Plane of Fire.
        Other spheres can be more complex.
        For example, \\sphere{revelation} spells generally require gates that lead to prescient entities or extraplanar sites with powerful ambient magic.

        The second principle is the manipulation of raw power accessed through these gates.
        Wizards learn how to create complex magical bindings that can store power and release it in highly specific ways.
        This allows them to create long-lasting effects that were fueled by extremely brief flashes of power.

        Sorcerers are an endless fascination and source of frustration to wizards.
        While wizards must spend years or decades perfecting their art, sorcerers are able to easily and intuitively replicate the same techniques for accessing and binding magical energy.
        This often makes younger wizards jealous.
        Wizards have spent centuries trying to understand how to mimic the shortcuts that sorcerers use, with little success.
        However, sorcerers lack the ability to perform complex arcane rituals that do not allow any simple shortcuts.
        Many older wizards regard this as a crippling weakness.
      `,
        8,
      );
    default:
      return '';
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

import { clericDomains } from './cleric_domains';

export function getClassSuffix(cls: Class): string {
  switch (cls) {
    case 'Cleric':
      return clericDomains();
    default:
      return '';
  }
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


export function calculateClassPointTotal(cls: Class): number {
  const skills = getClassSkills(cls);
  // Group knowledge skills into a single "Knowledge" skill for point calculation to match Rust logic
  const uniqueSkillGroups = new Set(
    skills.map((s) => (s.startsWith('knowledge_') ? 'knowledge' : s)),
  );
  const skillCount = uniqueSkillGroups.size;

  return (
    getClassAttunementPoints(cls) * 6 +
    getClassFatigueTolerance(cls) * 2 +
    getClassInsightPoints(cls) * 3 +
    getClassTrainedSkills(cls) * 2 +
    Math.round(skillCount / 8.0) +
    Math.max(0, getClassArmorProficiencies(cls).usage_classes.length - 1) +
    (getClassWeaponProficiencies(cls).custom_weapons ? 1 : 0) +
    (getClassWeaponProficiencies(cls).non_exotic_weapons ? 2 : 0) +
    2 *
      (getClassDefenseBonus(cls, 'brawn') +
        getClassDefenseBonus(cls, 'fortitude') +
        getClassDefenseBonus(cls, 'reflex') +
        getClassDefenseBonus(cls, 'mental')) +
    getClassDefenseBonus(cls, 'armor_defense') * 4 +
    getClassVitalRollBonus(cls) * 4
  );
}

export function validateClassPoints() {
  const expectedPoints = 71;
  for (const cls of getAllClasses()) {
    const actualPoints = calculateClassPointTotal(cls);
    const classExpectedPoints = expectedPoints + (isUncommonClass(cls) ? 2 : 0);
    const tooWeak = actualPoints < classExpectedPoints;
    const tooStrong = actualPoints > classExpectedPoints + 1;
    if (tooWeak || tooStrong) {
      console.warn(
        `Class ${cls.toLowerCase()} has ${actualPoints} points; expected ${classExpectedPoints}`,
      );
    }
  }
}

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
  // This is a placeholder until we have getArchetypeRankAbilities
  // For now, I'll hardcode based on the Rust is_magical() logic which checks if all abilities are magical.
  // Actually, I can just leave it to check abilities once we have them.
  return getArchetypeRankAbilities(archetype).every((a) => a.isMagical);
}

// Placeholder for the ability getter
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
\\cf<${classShorthand}>[${ability.rank}]<${ability.name}>${magical}
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
\\archetypedef${magicalSparkle}<${classShorthand}><${titleCase(getArchetypeName(archetype))}>
${getArchetypeShortDescription(archetype)}

${abilityDescriptions.join('\n\n')}
`.trim();
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
            ${level} & ${rank} & \\plus${durabilityBonus} & ${modifier(miscBonus)} & ${universalCharacterProgressionAtLevel(level)} \\\\
        `.trim(),
    );
  }
  return rows.join('\n');
}

export function latexArchetypeTable(cls: Class): string {
  const archetypes = getArchetypesForClass(cls);
  const archetypeColumns = Array(archetypes.length).fill('>{\\lcol}X').join(' ');
  const archetypeHeaders = archetypes
    .map((a) => {
      const magical = isArchetypeMagical(a) ? '*' : '';
      return `\\tb<\\archetyperef${magical}<${getClassShorthand(cls)}><${getArchetypeName(a)}>>`;
    })
    .join(' & ');

  return latexifyClass(`
        \\begin<dtable!*>
            \\lcaption<${titleCase(getClassName(cls))} Archetypes>
            \\begin<dtabularx><\\textwidth><l ${archetypeColumns}>
                \\tb<Rank> & ${archetypeHeaders} \\tableheaderrule
                ${latexArchetypeRankTableRows(cls)}
            \\end<dtabularx>
        \\end<dtable!*>
    `);
}

export function getArchetypesForClass(cls: Class): ClassArchetype[] {
  // Find all archetypes where getArchetypeClass(a) === cls
  // This is a bit inefficient but works.
  // Actually, we can just hardcode for now as in Rust.
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
        'Alchemist',
        'WizardArcaneMagic',
        'WizardArcaneSpellMastery',
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

function latexArchetypeRankTableRows(cls: Class): string {
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

function generateAbilityNamesByArchetypeRank(cls: Class): string[] {
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

export function latexifyClass(text: string): string {
  return text
    .trim()
    .replace(/</g, '{')
    .replace(/>/g, '}')
    .replace(/ \+ /g, ' \\add ')
    .replace(/}\{\\lcol\}/g, '>{\\lcol}')
    .replace(/\+(\d)/g, '\\plus$1')
    .replace(/ - (\d)/g, ' \\sub $1')
    .replace(/ -(\d)/g, ' \\minus$1');
}

function modifier(val: number): string {
  return val >= 0 ? `+${val}` : `${val}`;
}

function joinStrList(strings: string[]): string {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];
  if (strings.length === 2) return `${strings[0]} and ${strings[1]}`;
  return `${strings.slice(0, -1).join(', ')}, and ${strings[strings.length - 1]}`;
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

        ${latexClassSkills(cls)}
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
  const plus3DefenseText = joinStrList(
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
    customModifiers.length > 0 ? `In addition, you gain ${joinStrList(customModifiers)}.` : '';

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
    // This is simplified compared to Rust which has a way to get names from armor kinds
    const usageClasses = joinStrList(prof.usage_classes);
    const specificArmors = joinStrList(
      prof.specific_armors.map((a) =>
        a
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .toLowerCase(),
      ),
    );
    profText = `You are proficient with ${usageClasses} armor and ${specificArmors}.`;
  } else {
    profText = `You are proficient with ${joinStrList(prof.usage_classes)} armor.`;
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
    profText = `You are proficient with ${joinStrList(components)}.`;
  }

  return `
        \\cf<${getClassShorthand(cls)}><Weapon Proficiencies>
        ${profText}
    `;
}

function latexClassSkills(cls: Class): string {
  const skills = getClassSkills(cls);
  const attributeTexts: string[] = [];
  const attributes: RiseAttribute[] = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'perception',
    'willpower',
  ];

  for (const attr of attributes) {
    const skillsForAttr = skills.filter((s) => SKILL_METADATA[s].attribute === attr);
    if (skillsForAttr.length > 0) {
      attributeTexts.push(
        `\\item \\subparhead<${attr.charAt(0).toUpperCase() + attr.slice(1)}> ${skillsForAttr.map(formatSkillName).join(', ')}.`,
      );
    }
  }

  const skillsWithoutAttr = skills.filter((s) => SKILL_METADATA[s].attribute === null);
  if (skillsWithoutAttr.length > 0) {
    attributeTexts.push(
      `\\item \\subparhead<Other> ${skillsWithoutAttr.map(formatSkillName).join(', ')}.`,
    );
  }

  return `
        \\cf<${getClassShorthand(cls)}><Class Skills>
        You have the following \\glossterm<class skills>:

        \\begin<raggeditemize>
            ${attributeTexts.join('\n            ')}
        \\end<raggeditemize>
    `;
}

function formatSkillName(skill: RiseSkill): string {
  return skill
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

import { SKILL_METADATA } from '../types/skills';
import { RiseAttribute } from '../character_sheet/rise_data';

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
                \\item Any one of the following: ${joinStrList(armorOptions).replace(/ and /g, ' or ').toLowerCase()}
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
    weaponText = `\\item Any one of the following: ${joinStrList(weaponOptions)}`;
  } else if (weaponOptions.length === 2) {
    weaponText = `\\item A ${joinStrList(weaponOptions)}`;
  } else {
    weaponText = `\\item Any two of the following: ${joinStrList(weaponOptions)}`;
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
  const archetypeNames = joinStrList(archetypes.map(getArchetypeName));
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
