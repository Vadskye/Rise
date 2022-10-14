use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
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
    ];
}

pub fn divine_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.
                You can also spend \glossterm{insight points} to learn one additional metamagic ability per insight point.
                You cannot choose the same spell with more than two metamagic abilities.
                {
                    \parhead{Distant Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
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
                    \parhead{Widened Spell} Choose a divine \glossterm{spell} you know with a standard \glossterm{area}: Small, Medium, Large, Huge, or Gargantuan.
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
                \begin{activeability}{Turn Undead}
                    \rankline
                    Make an attack vs. Mental against all undead creatures within a \largearea radius from you.
                    \hit Each target is \frightened by you as a \glossterm{condition}.
                    Once this effect ends, the creature becomes immune to this effect until it takes a \glossterm{short rest}.
                    \crit As above, and each target with no remaining \glossterm{damage resistance} immediately dies.

                    \rankline
                    This attack's accuracy increases by \plus2 for each rank beyond 2.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{power}.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Wellspring of Power+",
            is_magical: true,
            rank: 6,
            description: r"
                The power bonus increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::Power(4)]),
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
    ];
}

pub fn domain_influence<'a>() -> Vec<RankAbility<'a>> {
    return vec![
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
                Once per week, you can request a miracle as a standard action.
                You mentally specify your request, and your deity fulfills that request in the manner it sees fit.
                At your deity's discretion, this can emulate the effects of any divine spell or ritual, or have any other effect of a similar power level.

                Miracles are most effective when your request is directly related to your deity's domains and general purview.
                They do not have to be extremely specific, since deities prefer to have leeway to act as they see fit, but they should not be overly broad or vague.
                If the deity has a direct interest in your situation, the miracle may be of even greater power.

                If you perform an extraordinary service for your deity, you can gain the ability to request an additional miracle that week.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Miracle+",
            is_magical: true,
            rank: 7,
            description: r"
                You can use this ability once per 24 hours instead of once per week.
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
    ];
}

pub fn healer<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Divine Aid",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{divine aid} ability as a standard action.
                \begin{activeability}{Divine Aid}[\abilitytag{Magical}, \abilitytag{Swift} (see text)]
                    \rankline
                    Choose yourself or one adjacent living \glossterm{ally}.
                    The target regains 1d8 \add \glossterm{power} \glossterm{hit points}.
                    In addition, if the target is an \glossterm{ally}, it gains a \plus2 bonus to \glossterm{vital rolls} and all defenses this round.
                    These defensive benefits are \abilitytag{Swift}, but the healing is not.

                    Normally, this healing cannot increase the target's hit points above half its maximum hit points.
                    If you increase your \glossterm{fatigue level} by one, you can ignore this limitation.

                    \rankline
                    \rank{2} The healing increases to 1d10.
                    \rank{3} The healing increases to 2d8.
                    \rank{4} The healing increases to 2d10.
                    \rank{5} The healing increases to 4d8.
                    \rank{6} The healing increases to 4d10.
                    \rank{7} The healing increases to 6d10.
                \end{activeability}

                \advancement This ability improves at each rank as described above.
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
                \begin{activeability}{Vital Restoration}[\abilitytag{Magical}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by three (see \pcref{Fatigue}).

                    Choose yourself or one adjacent living \glossterm{ally}.
                    The target removes one of its \glossterm{vital wounds}.

                    \rankline
                    \rank{5} If the target's level is at least two levels lower than your level,
                        you do not increase your fatigue level when you use this ability.
                    \rank{7} The target can remove an additional \glossterm{vital wound}.
                \end{activeability}
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
                \begin{activeability}{Revivify}
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by four (see \pcref{Fatigue}).

                    Choose one adjacent intact corpse.
                    If it belongs to a creature that has been dead for no more than 1 minute, that creature is restored to life, as the \ritual{resurrection} ritual.
                    After using this ability, you cannot use it again until you take a \glossterm{long rest}.
                \end{activeability}
            ",
            modifiers: None,
        },
    ];
}

pub fn preacher<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Denounce the Heathens",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{denounce the heathens} ability as a standard action.
                \begin{activeability}{Denounce the Heathens}
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \glossterm{briefly} \dazed.

                    \rankline
                    \rank{3} Each target with no remaining \glossterm{damage resistance} is \stunned instead of dazed.
                    \rank{5} Each target is stunned instead of dazed.
                    \rank{7} Each target with no remaining \glossterm{damage resistance} is \confused instead of stunned.
                \end{activeability}
            ",
            modifiers: None,
        },
        // TODO: this is a little weak
        RankAbility {
            name: "Practiced Persuasion",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus3 bonus to the Persuasion skill.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::Persuasion, 3)]),
        },
        RankAbility {
            name: "Bless the Worthy",
            is_magical: false,
            rank: 3,
            description: r"
                You can use the \textit{bless the worthy} ability as a standard action.
                \begin{activeability}{Bless the Worthy}
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
        RankAbility {
            name: "Condemn the Fearful",
            is_magical: false,
            rank: 5,
            description: r"
                You can use the \textit{condemn the fearful} ability as a standard action.
                \begin{activeability}{Condemn the Fearful}
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \largearea radius from you.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit Each target is \shaken by you as a \glossterm{condition}.

                    \rankline
                    \rank{7} Each target with no remaining \glossterm{damage resistance} is \frightened instead of shaken.
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
                \begin{activeability}{Convert the Irresolute}
                    \rankline
                    Make an attack vs. Mental against one creature within \rngmed range.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit The target is \stunned until it finishes a \glossterm{long rest}.
                    At the end of that time, if its Willpower is 0 or lower and it is at least 3 levels lower than you, it changes its mind and begins worshipping your deity permanently if it is capable of doing so.
                \end{activeability}
            ",
            modifiers: None,
        },
    ];
}
