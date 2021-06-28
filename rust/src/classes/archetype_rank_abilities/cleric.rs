use crate::classes::archetype_rank_abilities::RankAbility;

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            rank: 0,
            description: r"
                Your deity grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere} (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
                You do not yet gain access to any other spells from those mystic spheres.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.
            ",
        },
        RankAbility {
            name: "Spellcasting",
            rank: 1,
            description: r"
                You become a rank 1 divine spellcaster.
                You learn two rank 1 \glossterm{spells} from divine \glossterm{mystic spheres} you have access to.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
                Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.
                All of those spells must be from divine mystic spheres you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 2,
            description: r"
                You become a rank 2 divine spellcaster.
                This gives you access to spells that require a minimum rank of 2.
            ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 2,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 3,
            description: r"
                You become a rank 3 divine spellcaster.
                This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 4,
            description: r"
                You become a rank 4 divine spellcaster.
                This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 4,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 5,
            description: r"
                You become a rank 5 divine spellcaster.
                This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 6,
            description: r"
                You become a rank 6 divine spellcaster.
                This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 7,
            description: r"
                You become a rank 7 divine spellcaster.
                This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 7,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
    ];
}

pub fn divine_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Mystic Sphere",
            rank: 0,
            description: r"
         You gain access to an additional divine \glossterm{mystic sphere}, including all \glossterm{cantrips} from that sphere.

                ",
        },
        RankAbility {
            name: "Mystic Insight",
            rank: 1,
            description: r"
                You gain your choice of one of the following abilities.
                Whenever you increase your rank in this archetype, you may change your choice.
                This can allow you to apply the benefits of insights like \textit{signature spell} to higher rank spells.

                \parhead{Focused Caster} You reduce your \glossterm{focus penalty} by 1.
                    You cannot choose this ability multiple times.
                \parhead{Insight Point} You gain an additional \glossterm{insight point}.
                    You can choose this ability multiple times, gaining an additional insight point each time.
                \parhead{Rituals} You gain the ability to perform divine rituals to create unique magical effects (see \pcref{Rituals}).
                    The maximum \glossterm{rank} of divine ritual you can learn or perform is equal to the maximum \glossterm{rank} of divine spell that you can cast.
                    You cannot choose this ability multiple times.
                \parhead{Signature Spell} Choose a divine \glossterm{spell} you know.
                    The spell loses the \abilitytag{Focus} tag, allowing you to cast it without lowering your guard in combat.
                    In adition, you gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                    You can choose this ability multiple times, choosing a different spell each time.
                \parhead{Spell Power} Choose a divine \glossterm{spell} you know.
                    You gain a bonus equal to your rank in this archetype to your \glossterm{power} with that spell.
                    You can choose this ability multiple times, choosing a different spell each time.
            ",
        },
        RankAbility {
            name: "Turn Undead",
            rank: 2,
            description: r"
                As a standard action, you can use the \ability{turn undead} ability.
                \begin{instantability}
                    Make an attack vs. Mental against all undead creatures within a \medarea radius from you.
                    \hit Each subject is \frightened by you as a \glossterm{condition}.
                    Once this effect ends, the creature becomes immune to this effect until it takes a \glossterm{short rest}.
                    \crit As above, and each subject with no remaining \glossterm{damage resistance} immediately dies.

                    \rankline
                    This attack's accuracy increases by \plus2 for each rank beyond 2.
                    \rank{3} On a \glossterm{glancing blow}, each subject is \glossterm{briefly} \frightened by you.
                \end{instantability}
            ",
        },
        RankAbility {
            name: "Wellspring of Power",
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
            ",
        },
        RankAbility {
            name: "Mystic Insight",
            rank: 4,
            description: r"
                You gain an additional \textit{mystic insight} ability.
            ",
        },
        RankAbility {
            name: "Attunement Point",
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
        },
        RankAbility {
            name: "Greater Wellspring of Power",
            rank: 6,
            description: r"
                The bonus from your \textit{wellspring of power} ability increases to \plus6.
            ",
        },
        RankAbility {
            name: "Mystic Insights",
            rank: 7,
            description: r"
                You gain two additional \textit{mystic insight} abilities.
            ",
        },
    ];
}

pub fn domain_influence<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Domains",
            rank: 0,
            description: r"
                You choose two domains which represent your personal spiritual inclinations.
                You must choose your domains from among those your deity offers.
                The domains are listed below.

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
        },
        RankAbility {
            name: "Domain Gift",
            rank: 0,
            description: r"
                Each domain has a corresponding \textit{domain gift}.
                A domain gift is a passive ability that reinforces your ability to embody your domain.
                You gain the \textit{domain gift} for one of your domains (see \pcref{Cleric Domain Abilities}).
            ",
        },
        RankAbility {
            name: "Domain Gift",
            rank: 1,
            description: r"
                You gain the \textit{domain gift} for another one of your domains.
            ",
        },
        RankAbility {
            name: "Domain Aspect",
            rank: 2,
            description: r"
                Each domain has a corresponding \textit{domain aspect}.
                A domain aspect is an active ability that allows you to exert the influence of your domain in the world.
                You gain the \textit{domain aspect} ability for one of your domains (see \pcref{Cleric Domain Abilities}).
            ",
        },
        RankAbility {
            name: "Domain Aspect",
            rank: 3,
            description: r"
                You gain the \textit{domain aspect} for another one of your domains.
            ",
        },
        RankAbility {
            name: "Domain Essences",
            rank: 4,
            description: r"
                Each domain has a corresponding \textit{domain essence}.
                You gain the \textit{domain essence} for both of your domains (see \pcref{Cleric Domain Abilities}).
            ",
        },
        RankAbility {
            name: "Miracle",
            rank: 5,
            description: r"
                Once per week, you can request a miracle as a standard action.
                You mentally specify your request, and your deity fulfills that request in the manner it sees fit.
                This can emulate the effects of any spell or ritual, or have any other effect of a similar power level.
                If the deity has a direct interest in your situation, the miracle may be of even greater power.

                If you perform an extraordinary service for your deity, you can gain the ability to request an additional miracle that week.
            ",
        },
        RankAbility {
            name: "Domain Masteries",
            rank: 6,
            description: r"
                Each domain has a corresponding \textit{domain mastery}.
                You gain the \textit{domain mastery} for both of your domains (see \pcref{Cleric Domain Abilities}).
            ",
        },
        RankAbility {
            name: "Greater Miracle",
            rank: 7,
            description: r"
                You can use your \textit<miracle> ability once per \glossterm{long rest} instead of once per week.
            ",
        },
    ];
}

pub fn healer<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Desperate Healing",
            rank: 0,
            description: r"
        When you use the \textit{desperate exertion} ability to affect a Medicine check, you gain a \plus3 bonus to the check.
        This stacks with the normal +2 bonus from the \textit{desperate exertion} ability.
        In addition, using the \textit{desperate exertion} ability to affect a roll using the Medicine skill only causes you to increase your \glossterm{fatigue level} by one instead of two.

                ",
        },
        RankAbility {
            name: "Restoration",
            rank: 1,
            description: r"
         You can use the \textit{restoration} ability as a standard action.
        \begin{instantability}{Restoration}[Instant]
            \abilitytag{Healing}, \glossterm{Magical}
            \rankline
            Choose yourself or one living \glossterm{ally} within your \glossterm{reach}.
            % +1d in exchange for not applying power to self
            The subject regains 2d6 \glossterm{hit points}.
            If the subject is a creature other than yourself, they also regain hit points equal to your \glossterm{power}.
            After you use this ability, you \\glossterm{briefly} cannot use it or any other \abilitytag{Healing} ability.

            \rankline
            \rank{2} The healing increases to 2d8.
            \rank{3} The healing increases to 4d6.
            \rank{4} The healing increases to 4d8.
            \rank{5} The healing increases to 5d10.
            \rank{6} The healing increases to 6d10.
            \rank{7} The healing increases to 8d10.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Healer's Grace",
            rank: 2,
            description: r"
         You gain a \plus1 bonus to all defenses.
        Whenever you attack or deal damage to a living creature, you \glossterm{briefly} lose this bonus.

                ",
        },
        RankAbility {
            name: "Divine Healing",
            rank: 3,
            description: r"
         You can use the \textit{divine healing} ability as a standard action.
        \begin{instantability}{Divine Healing}[Instant]
            \glossterm{Magical}
            \rankline
            When you use this ability, you increase your \glossterm{fatigue level} by two (see \pcref{Fatigue}).

            Choose yourself or one living \glossterm{ally} within your \glossterm{reach}.
            The subject removes one of its \glossterm{vital wounds}.

            \rankline
            \rank{5} If the subject's level is at least two levels lower than your level,
                you do not increase your fatigue level when you use this ability.
            \rank{7} The subject can remove an additional \glossterm{vital wound}.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Called to the Needy",
            rank: 4,
            description: r"
                At the end of each phase, if a living \glossterm{ally} within \distrange of you gained a \glossterm{vital wound} during that phase, you can \glossterm{teleport} into the unoccupied square closest to that creature.
            ",
        },
        RankAbility {
            name: "Greater Healer's Grace",
            rank: 5,
            description: r"
                The bonus from your \textit{healer's grace} ability increases to \plus2.
            ",
        },
        RankAbility {
            name: "Revivify",
            rank: 6,
            description: r"
         You can use the \textit{revivify} ability as a standard action.
        \begin{instantability}{Revivify}[Instant]
            \rankline
            When you use this ability, you increase your \glossterm{fatigue level} by three (see \pcref{Fatigue}).

            Choose one intact corpse within your \glossterm{reach}.
            If it belongs to a creature that has been dead for no more than 1 minute, that creature is restored to life, as the \ritual{resurrection} ritual.
            After using this ability, you cannot use it again until you take a \glossterm{long rest}.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Greater Called to the Needy",
            rank: 7,
            description: r"
                You can use your \textit{called to the needy} ability to teleport to allies that lost \glossterm{hit points} in addition to allies that gained vital wounds.
                In addition, the range limit increases to \extrange, and it no longer requires \glossterm{line of sight} or \glossterm{line of effect}.
            ",
        },
    ];
}

pub fn preacher<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Practiced Persuasion",
            rank: 0,
            description: r"
         You gain a \plus2 bonus to the Persuasion skill.
        In addition, using the \textit{desperate exertion} ability to affect a roll using the Persuasion skill only causes you to increase your \glossterm{fatigue level} by one instead of two.

                ",
        },
        RankAbility {
            name: "Denounce the Heathens",
            rank: 1,
            description: r"
         You can use the \textit{denounce the heathens} ability as a standard action.
        \begin{instantability}{Denounce the Heathens}[Duration]
            \rankline
            Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
            Your \glossterm{accuracy} is equal to your Persuasion skill.
            \hit Each subject is \glossterm{briefly} \dazed.

            \rankline
            \rank{3} The area increases to a \largearea radius.
            \rank{5} The area increases to a \hugearea radius.
            \rank{7} The area increases to a \gargarea radius.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Inspiring Oration",
            rank: 2,
            description: r"
         Your \glossterm{allies} who can hear you in a fight gain a \plus2 bonus to Mental defense.
        You must generally say inspiring words every few rounds to grant your allies this effect, though they can be brief, so this does not take an action.

                ",
        },
        RankAbility {
            name: "Bless the Worthy",
            rank: 3,
            description: r"
         You can use the \textit{bless the worthy} ability as a standard action.
        \begin{instantability}{Bless the Worthy}[Duration]
            \rankline
            You and all \glossterm{allies} within a \hugearea radius from you can remove a \glossterm{brief} effect \glossterm{condition}.
            This ability cannot remove an effect applied during the current round.
            In addition, one of your allies \glossterm{briefly} gains a \plus2 bonus to \glossterm{accuracy}.

            \rankline
            \rank{5} The accuracy bonus increases to \plus3.
            \rank{7} The accuracy bonus increases to \plus4.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Greater Practiced Persuasion",
            rank: 4,
            description: r"
         The bonus from your \textit{practiced persuasion} ability increases to \plus4.
        In addition, you can use the \textit{desperate exertion} ability any number of times to affect the same Persuasion check.

                ",
        },
        RankAbility {
            name: "Condemn the Fearful",
            rank: 5,
            description: r"
         You can use the \textit{condemn the fearful} ability as a standard action.
        \begin{instantability}{Condemn the Fearful}[Duration]
            \rankline
            Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
            Your \glossterm{accuracy} is equal to your Persuasion skill.
            \hit Each subject is \glossterm{briefly} \frightened by you.

            \rankline
            \rank{7} The area increases to a \largearea radius.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Greater Inspiring Oration",
            rank: 6,
            description: r"
                The bonus from your \textit{inspiring oration} ability increases to \plus4.
            ",
        },
        RankAbility {
            name: "Convert the Irresolute",
            rank: 7,
            description: r"
                You can use the \textit{convert the irresolute} ability as a standard action.
                \begin{instantability}{Convert the Irresolute}[Duration]
                    \rankline
                    Make an attack vs. Mental against one creature within \rngmed range.
                    Your \glossterm{accuracy} is equal to your Persuasion skill.
                    \hit The subject is \glossterm{stunned} until it finishes a \glossterm{long rest}.
                    At the end of that time, if its Willpower is 0 or lower, it changes its mind and begins worshipping your deity permanently if it is capable of doing so.
                \end{instantability}
            ",
        },
    ];
}
