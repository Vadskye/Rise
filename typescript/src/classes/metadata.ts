import {
  Class,
  ClassArchetype,
  RankAbility,
  ArmorProficiencies,
  WeaponProficiencies,
} from './types';
import { RiseSkill } from '../core_mechanics/skills';
import { RiseDefense } from '../core_mechanics/attributes';
import { ArmorKind, ArmorUsageClass } from '../equipment/armor';
import { dedent } from '../util/dedent';
import {
  getClassSkills,
  getClassTrainedSkills,
} from './class_skills';

import {
  getArchetypesForClass,
} from './archetypes';

import {
  getClassName,
  getClassShorthand,
  getClassAlignment,
  getClassDefenseBonus,
  getClassFatigueTolerance,
  getClassInsightPoints,
  getClassVitalRollBonus,
  getClassAttunementPoints,
  getClassArmorProficiencies,
  getClassWeaponProficiencies,
  getCoreClasses,
  getUncommonClasses,
  getAllClasses,
  isUncommonClass,
  getClassSpecialAbilities,
  getClassSuffix,
} from './base_class_abilities';

export {
  getClassName,
  getClassShorthand,
  getClassAlignment,
  getClassDefenseBonus,
  getClassFatigueTolerance,
  getClassInsightPoints,
  getClassVitalRollBonus,
  getClassAttunementPoints,
  getClassArmorProficiencies,
  getClassWeaponProficiencies,
  getCoreClasses,
  getUncommonClasses,
  getAllClasses,
  isUncommonClass,
  getClassSpecialAbilities,
  getClassSuffix,
};

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
        Druids are nature spellcasters who draw power from their worship of the natural world.
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
