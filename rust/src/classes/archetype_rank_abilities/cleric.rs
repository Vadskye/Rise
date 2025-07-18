use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 4,
            name: "Divine Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your deity grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn divine spells from divine mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 divine \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Ability Usage Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of divine spells that you can learn is equal to your rank in this archetype.
                Divine spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
    ]
}

pub fn divine_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Benediction",
            is_magical: true,
            rank: 1,
            description: r"
                Once per round, when you cast a spell, you can choose one \glossterm{ally} that is either targeted by that spell or \glossterm{attuned} to a spell you cast.
                During the next round, that ally is either \empowered or \steeled, as you choose.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Metamagic",
            is_magical: true,
            rank: 2,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                Each individual spell can normally have one metamagic applied.
                If the spell's rank is lower than your maximum spellcasting rank, you can apply two metamagic effects to it.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Distant Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Precise Spell} Choose a divine \glossterm{spell} you know.
                        You gain a \plus1 accuracy bonus with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Rituals} You gain the ability to perform divine rituals to create unique magical effects (see \pcref{Spell and Ritual Mechanics}).
                        The maximum \glossterm{rank} of divine ritual you can learn or perform is equal to the maximum \glossterm{rank} of divine spell that you can cast.
                        When you gain this ability, you can memorize a rank 1 divine ritual from any divine mystic sphere you have access to.
                        Whenever you gain access to a new spellcasting rank, you can memorize an additional ritual of that rank or lower.
                        You cannot choose this ability multiple times.
                    \parhead{Smiting Spell} Choose a damaging divine \glossterm{spell} you know.
                        It deals \glossterm{extra damage} equal to your rank in this archetype.
                        In addition, your \glossterm{allies} are immune to damage from that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Widened Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 accuracy bonus.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn domain_influence<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Domain Gifts",
            is_magical: false,
            rank: 1,
            description: r"
                You choose two domains which represent your personal spiritual inclinations.
                You must choose your domains from among those your deity offers.
                The domains are listed below.

                Each domain has a corresponding domain gift.
                A domain gift is a passive ability that reinforces your ability to embody your domain.
                You gain the domain gift for both of your domains (see \pcref{Cleric Domain Abilities}).

                \begin{itemize}
                    \item{Air}
                    \item{Chaos}
                    \item{Death}
                    \item{Destruction}
                    \item{Earth}
                    \item{Evil}
                    \item{Fire}
                    \item{Good}
                    \item{Knowledge}
                    \item{Law}
                    \item{Life}
                    \item{Magic}
                    \item{Protection}
                    \item{Strength}
                    \item{Travel}
                    \item{Trickery}
                    \item{War}
                    \item{Water}
                    \item{Wild}
                \end{itemize}
            ",
            // Domain gifts are weird; most don't have direct statistical benefits, so this is
            // mostly irrelevant.
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Domain Aspect",
            is_magical: false,
            rank: 2,
            description: r"
                Each domain has a corresponding domain aspect.
                You gain the domain aspect ability for one of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            // Domain aspects are also weird. Some give statistical benfits, but many don't
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Domain Aspect+",
            is_magical: false,
            rank: 3,
            description: r"
                You gain the domain aspect for another one of your domains.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Domain Essences",
            is_magical: false,
            rank: 4,
            description: r"
                Each domain has a corresponding domain essence.
                You gain the domain essence for both of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Miracle",
            is_magical: true,
            rank: 5,
            description: r"
                You can request a \textit{miracle} as a standard action.
                \begin{magicalactiveability}{Miracle}
                    \abilityusagetime Standard action.
                    \abilitycost Three \glossterm{fatigue levels}, and you cannot use it again for a week.
                    You mentally specify a request to your deity, and your deity fulfills that request in the manner it sees fit.
                    At your deity's discretion, this can emulate the effects of any divine spell, or have any other effect of a similar power level.
                    A miracle can also mimic the effects of many rituals, but rituals that require 24 hours or expensive material components may require a similar time or material investment from you for the miracle to succeed.

                    Miracles are most effective when your request is directly related to your domains, and more generally your deity's domains and purview.
                    They do not have to be extremely specific, since deities prefer to have leeway to act as they see fit, but they should not be overly broad or vague.
                    If the deity has a direct interest in your situation, the miracle may be of even greater power.
                    On the other hand, if your deity sees your request as unbefitting of its involvement or contrary to its goals, the miracle may be weaker or even fail.

                    If you perform an extraordinary service for your deity, you may gain the ability to request an additional miracle, at your deity's discretion.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Miracle+",
            is_magical: true,
            rank: 7,
            description: r"
                Your \ability{miracle} ability does not increase your fatigue level.
                In addition, you can perform two miracles per week instead of only one.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Domain Mastery",
            is_magical: false,
            rank: 6,
            description: r"
                Each domain has a corresponding \textit{domain mastery}.
                You gain the \textit{domain mastery} for one of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Domain Mastery+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain the domain mastery for another one of your domains.
            ",
            modifiers: None,
        },
    ]
}

pub fn healer<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Divine Aid",
            is_magical: true,
            rank: 1,
            description: r"
                % dr2 for close range, +1dr for touch or healing bonus idk, free defense bonus because class feature
                \begin{magicalactiveability}{Divine Aid}[\abilitytag{Swift}]
                    \abilityusagetime Standard action.
                    \rankline
                    Choose yourself or one adjacent living \glossterm{ally}.
                    The target regains 1d8 \glossterm{hit points} +1 per \glossterm{power}.
                    In addition, if the target is an \glossterm{ally}, it becomes \braced this round.

                    Normally, this healing cannot increase the target's hit points above half its maximum hit points.
                    If you increase your \glossterm{fatigue level} by one, you can ignore this limitation.
                    You can make this decision after seeing how much the target would heal.

                    \rankline
                    \rank{2} The bonus healing increases to 1d6 per 3 power.
                    \rank{3} The bonus healing increases to 1d6 per 2 power.
                    \rank{4} The bonus healing increases to 1d8 per 2 power.
                    \rank{5} The bonus healing increases to 1d10 per 2 power.
                    \rank{6} The bonus healing increases to 1d6 per power.
                    \rank{7} The bonus healing increases to 1d10 per power.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Healer's Grace",
            is_magical: true,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to all defenses.
                Whenever you attack or deal damage to a living creature, you \glossterm{briefly} lose this bonus.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Brawn, 1),
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Reflex, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Healer's Grace+",
            is_magical: true,
            rank: 5,
            description: r"
                The defense bonus increases to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Vital Restoration",
            is_magical: true,
            rank: 3,
            description: r"
                \begin{magicalactiveability}{Vital Restoration}
                    \abilityusagetime Standard action.
                    \abilitycost Three \glossterm{fatigue levels}.
                    \rankline
                    Choose yourself or one adjacent living \glossterm{ally}.
                    The target removes one of its \glossterm{vital wounds}.

                    \rankline
                    \rank{5} If the target's level is at least two levels lower than your level,
                        you do not increase your fatigue level when you use this ability.
                    \rank{7} The target can remove an additional \glossterm{vital wound}.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Called to the Needy",
            is_magical: true,
            rank: 4,
            description: r"
                At the end of each round, you automatically learn the identity and location of each living \glossterm{ally} within \longrange of you that lost \glossterm{hit points} during that round.
                In addition, you can choose to \glossterm{teleport} to any one of those allies.
                You arrive in the unoccupied square on solid ground closest to that ally.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Called to the Needy+",
            is_magical: true,
            rank: 7,
            description: r"
                This ability no longer requires \glossterm{line of sight} or \glossterm{line of effect}, and the range increases to \extrange.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Revivify",
            is_magical: true,
            rank: 6,
            description: r"
                \begin{magicalactiveability}{Revivify}
                    \abilityusagetime Standard action.
                    \abilitycost Four \glossterm{fatigue levels}, and you cannot use this ability again until you finish a \glossterm{long rest}.
                    \rankline
                    Choose one intact corpse within \shortrange.
                    If it belongs to a creature that has been dead for no more than 1 minute, that creature is \glossterm{resurrected} (see \pcref{Resurrection}).
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}

pub fn preacher<'a>() -> Vec<RankAbility<'a>> {
    vec![
        // Brief stun is 1.4 EA, so we would normally get a r1 area.
        // As a class feature, this can get +1 rank, so it can affect a r3 area.
        RankAbility {
            complexity: 2,
            name: "Denounce the Heathens",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Denounce the Heathens}[\abilitytag{Emotion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                    For each target, if this is your first time using this ability against that target since you finished a \glossterm{short rest}, your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \glossterm{briefly} \stunned.

                    \rankline
                    \rank{3} Each target with no remaining \glossterm{damage resistance} is stunned as a \glossterm{condition} instead of only briefly.
                    \rank{5} The area increases to a \largearea radius.
                    \rank{7} Each target is stunned as a condition regardless of whether it has remaining damage resistance.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Persuasive Certainty",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to the Persuasion skill.
                In addition, you are immune to being \stunned.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Persuasion, 2),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Persuasive Certainty+",
            is_magical: false,
            rank: 6,
            description: r"
                The Persuasion bonus increases to \plus4.
                In addition, you are immune to being \confused.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Persuasion, 2),
            ]),
        },
        // Assume that it typically affects two people, and anything more than that is a
        // bonus. Normal healing ability would be dr4, so use half of that (where possible).
        RankAbility {
            complexity: 2,
            name: "Bless the Worthy",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Bless the Worthy}[\abilitytag{Emotion}, \abilitytag{Swift}]
                    \abilityusagetime Standard action.
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
                    You and all \glossterm{allies} within a \largearea radius from you each regain 2d8 \glossterm{damage resistance}.
                    In addition, each ally affected by more than one \glossterm{condition} can remove one of those conditions.

                    \rankline
                    \rank{4} The recovery increases to 2d10.
                    \rank{5} The recovery increases to 3d10.
                    \rank{6} The recovery increases to 4d10.
                    \rank{7} The recovery increases to 6d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Steady Oration",
            is_magical: false,
            rank: 4,
            description: r"
                Your \glossterm{allies} who can hear you in a fight are immune to being \stunned.
                You must say inspiring words every few rounds to grant your allies this effect, though they can be brief, so this does not take an action.
            ",
            // TODO: figure out allies-only buffs
            modifiers: None,
        },
        // Brief panic is r6, and frightened as a condition is r3. Smashing them together is
        // tricky, but we can just call that the magic of a class ability.
        RankAbility {
            complexity: 2,
            name: "Condemn the Fearful",
            is_magical: false,
            rank: 5,
            description: r"
                \begin{activeability}{Condemn the Fearful}[\abilitytag{Emotion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                    For each target, if this is your first time using this ability against that target since you finished a \glossterm{short rest}, your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \glossterm{briefly} \panicked by you, and is \frightened of you as a \glossterm{condition}.

                    \rankline
                    \rank{7} Each target with no remaining \glossterm{damage resistance} is \panicked by you as a condition instead of frightened.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Convert the Irresolute",
            is_magical: false,
            rank: 7,
            description: r"
                \begin{activeability}{Convert the Irresolute}[\abilitytag{Emotion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against up to two creatures within \shortrange.
                    If this is your first time using this ability against that target since you finished a \glossterm{short rest}, your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit The target is \stunned until it finishes a \glossterm{long rest}.
                    At the end of that time, if its Willpower is 0 or lower and it is at least 3 levels lower than you, it changes its mind and begins worshipping your deity permanently if it is capable of doing so.
                \end{activeability}
            ",
            modifiers: None,
        },
    ]
}
