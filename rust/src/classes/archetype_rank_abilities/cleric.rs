use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Divine Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your deity grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn divine spells from divine mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each mystic sphere you have access to.
                In addition, you learn two rank 1 divine \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                Unless otherwise noted in a spell's description, casting any spell requires a \glossterm{standard action}.
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of divine spells that you can learn is equal to your rank in this archetype.
                Divine spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
    ]
}

pub fn divine_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                You can only choose spells with a rank no higher than your rank in this archetype.
                In addition, you cannot choose the same spell with more than two metamagic abilities.
                {
                    \parhead{Distant Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Mystic Sphere} You gain access to an additional divine \glossterm{mystic sphere}, including all \glossterm{cantrips} from that sphere.
                        You cannot choose this ability multiple times.
                    \parhead{Precise Spell} Choose a divine \glossterm{spell} you know.
                        You gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Rituals} You gain the ability to perform divine rituals to create unique magical effects (see \pcref{Rituals}).
                        The maximum \glossterm{rank} of divine ritual you can learn or perform is equal to the maximum \glossterm{rank} of divine spell that you can cast.
                        In addition, you automatically learn one free divine ritual of each rank you have access to, including new ranks as you gain access to them.
                        You cannot choose this ability multiple times.
                    \parhead{Widened Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Turn Undead",
            is_magical: true,
            rank: 2,
            description: r"
                As a standard action, you can use the \ability{turn undead} ability.
                \begin{magicalactiveability}{Turn Undead}
                    \rankline
                    Make an attack vs. Mental against all undead creatures within a \largearea radius from you.
                    \hit Each target is turned by you as a \glossterm{condition}.
                    This functions as if the target is \frightened by you, but creatures that are immune to being frightened are still affected.
                    Once this effect ends, the creature becomes immune to this effect until it finishes a \glossterm{short rest}.
                    \crit As above, and each target with no remaining \glossterm{damage resistance} immediately dies.

                    \rankline
                    This attack's accuracy increases by \plus2 for each rank beyond 2.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} with spells.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Experienced Spellcaster+",
            is_magical: true,
            rank: 6,
            description: r"
                The accuracy bonus increases to +2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(2)]),
        },
        RankAbility {
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
    ]
}

pub fn domain_influence<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Domain Gifts",
            is_magical: true,
            rank: 1,
            description: r"
                You choose two domains which represent your personal spiritual inclinations.
                You must choose your domains from among those your deity offers.
                The domains are listed below.

                Each domain has a corresponding \textit{domain gift}.
                A domain gift is a passive ability that reinforces your ability to embody your domain.
                You gain the \textit{domain gift} for both of your domains (see \pcref{Cleric Domain Abilities}).

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
            name: "Domain Aspect",
            is_magical: true,
            rank: 2,
            description: r"
                Each domain has a corresponding \textit{domain aspect}.
                A domain aspect is an active ability that allows you to exert the influence of your domain in the world.
                You gain the \textit{domain aspect} ability for one of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            // Domain aspects are also weird. Some give statistical benfits, but many don't
            modifiers: None,
        },
        RankAbility {
            name: "Domain Aspect+",
            is_magical: true,
            rank: 3,
            description: r"
                At rank 3, you gain the \textit{domain aspect} for another one of your domains.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Domain Essences",
            is_magical: true,
            rank: 4,
            description: r"
                Each domain has a corresponding \textit{domain essence}.
                You gain the \textit{domain essence} for both of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Miracle",
            is_magical: true,
            rank: 5,
            description: r"
                You can request a \textit{miracle} as a standard action.
                \begin{magicalactiveability}{Miracle}[\abilitytag{Exertion})]
                    You mentally specify a request to your deity, and your deity fulfills that request in the manner it sees fit.
                    At your deity's discretion, this can emulate the effects of any divine spell or ritual, or have any other effect of a similar power level.
                    After you use this ability, you increase your \glossterm{fatigue level} by three, and you cannot request another miracle for a week.

                    Miracles are most effective when your request is directly related to your deity's domains and general purview.
                    They do not have to be extremely specific, since deities prefer to have leeway to act as they see fit, but they should not be overly broad or vague.
                    If the deity has a direct interest in your situation, the miracle may be of even greater power.

                    If you perform an extraordinary service for your deity, you may gain the ability to request an additional miracle, at your deity's discretion.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Miracle+",
            is_magical: true,
            rank: 7,
            description: r"
                Your \ability{miracle} ability loses the \abilitytag{Exertion} tag and does not increase your fatigue level.
                In addition, you can perform two miracles per week instead of only one.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Domain Masteries",
            is_magical: true,
            rank: 6,
            description: r"
                Each domain has a corresponding \textit{domain mastery}.
                You gain the \textit{domain mastery} for both of your domains (see \pcref{Cleric Domain Abilities}).
            ",
            modifiers: None,
        },
    ]
}

pub fn healer<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Divine Aid",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{divine aid} ability as a standard action.
                \begin{magicalactiveability}{Divine Aid}[\abilitytag{Swift}]
                    \rankline
                    Choose yourself or one living \glossterm{ally} you \glossterm{touch}.
                    The target regains 1d6 \glossterm{hit points} +1 per 2 \glossterm{power}.
                    In addition, if the target is an \glossterm{ally}, it gains a \plus2 bonus to \glossterm{vital rolls} and all defenses this round.

                    Normally, this healing cannot increase the target's hit points above half its maximum hit points.
                    If you increase your \glossterm{fatigue level} by one, you can ignore this limitation.

                    \rankline
                    \rank{2} The base healing increases to 1d8.
                    \rank{3} The bonus healing increases to \plus1 per power.
                    \rank{4} The base healing increases to 1d10.
                    \rank{5} The bonus healing increases to 1d8 per 3 power.
                    \rank{6} The base healing increases to 2d8.
                    \rank{7} The bonus healing increases to 1d8 per 2 power.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Healer's Grace",
            is_magical: true,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to all defenses.
                Whenever you attack or deal damage to a living creature, you \glossterm{briefly} lose this bonus.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Reflex, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Healer's Grace+",
            is_magical: true,
            rank: 5,
            description: r"
                The defense bonus increases to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Vital Restoration",
            is_magical: true,
            rank: 3,
            description: r"
                You can use the \textit{vital restoration} ability as a standard action.
                \begin{magicalactiveability}{Vital Restoration}[\abilitytag{Exertion}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by three (see \pcref{Fatigue}).

                    Choose yourself or one living \glossterm{ally} you \glossterm{touch}.
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
            name: "Called to the Needy+",
            is_magical: true,
            rank: 7,
            description: r"
                This ability no longer requires \glossterm{line of sight} or \glossterm{line of effect}, and the range increases to \extrange.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Revivify",
            is_magical: true,
            rank: 6,
            description: r"
                You can use the \textit{revivify} ability as a standard action.
                \begin{magicalactiveability}{Revivify}[\abilitytag{Exertion}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by four (see \pcref{Fatigue}).

                    Choose one intact corpse you \glossterm{touch}.
                    If it belongs to a creature that has been dead for no more than 1 minute, that creature is \glossterm{resurrected} (see \pcref{Resurrection}).
                    After using this ability, you cannot use it again until you finish a \glossterm{long rest}.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}

pub fn preacher<'a>() -> Vec<RankAbility<'a>> {
    vec![
        // enemies in medium radius is a t3 area
        // assuming -1ct for brief, stunned would be t1, for a total of a r2 effect??
        RankAbility {
            name: "Denounce the Heathens",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{denounce the heathens} ability as a standard action.
                \begin{activeability}{Denounce the Heathens}[\abilitytag{Emotion}]
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \glossterm{briefly} \stunned.

                    \rankline
                    \rank{3} Each target with no remaining \glossterm{damage resistance} is stunned as a \glossterm{condition} instead of only briefly.
                    \rank{5} Each target is stunned as a condition instead of only briefly.
                    \rank{7} Each target with no remaining \glossterm{damage resistance} is also briefly \confused.
                \end{activeability}
            ",
            modifiers: None,
        },
        // TODO: this is a little weak
        RankAbility {
            name: "Persuasive Certainty",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus3 bonus to the Persuasion skill.
                In addition, you gain a \plus1 bonus to your Mental defense.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Persuasion, 3),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Bless the Worthy",
            is_magical: false,
            rank: 3,
            description: r"
                You can use the \textit{bless the worthy} ability as a standard action.
                \begin{activeability}{Bless the Worthy}[\abilitytag{Exertion}, \abilitytag{Swift}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by one.

                    You and all \glossterm{allies} within a \medarea radius from you each regain 1d10 \glossterm{damage resistance}.
                    In addition, each ally affected by more than one \glossterm{condition} can remove one of those conditions.

                    \rankline
                    \rank{4} The recovery increases to 2d6.
                    \rank{5} The recovery increases to 2d10.
                    \rank{5} The recovery increases to 4d6.
                    \rank{6} The recovery increases to 4d10.
                    \rank{7} The recovery increases to 5d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Inspiring Oration",
            is_magical: false,
            rank: 4,
            description: r"
                Your \glossterm{allies} who can hear you in a fight gain a \plus1 bonus to their Mental defense.
                You must generally say inspiring words every few rounds to grant your allies this effect, though they can be brief, so this does not take an action.
            ",
            // TODO: figure out allies-only buffs
            modifiers: None,
        },
        RankAbility {
            name: "Inspiring Oration+",
            is_magical: false,
            rank: 6,
            description: r"
                The defense bonus increases to \plus2.
            ",
            modifiers: None,
        },
        // t1.5 debuff in t5 area is a r6 effect
        RankAbility {
            name: "Condemn the Fearful",
            is_magical: false,
            rank: 5,
            description: r"
                You can use the \textit{condemn the fearful} ability as a standard action.
                \begin{activeability}{Condemn the Fearful}[\abilitytag{Emotion}]
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \hugearea radius from you.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \frightened of you as a \glossterm{condition}.

                    \rankline
                    \rank{7} Each target with no remaining \glossterm{damage resistance} is \panicked by you instead of frightened.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Convert the Irresolute",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \textit{convert the irresolute} ability as a standard action.
                \begin{activeability}{Convert the Irresolute}[\abilitytag{Emotion}]
                    \rankline
                    Make an attack vs. Mental against one creature within \rngmed range.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit The target is \stunned until it finishes a \glossterm{long rest}.
                    At the end of that time, if its Willpower is 0 or lower and it is at least 3 levels lower than you, it changes its mind and begins worshipping your deity permanently if it is capable of doing so.
                \end{activeability}
            ",
            modifiers: None,
        },
    ]
}
