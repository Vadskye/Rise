use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;




pub fn beastmaster<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Animal Companion",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \ability{animal companion} ability.
                This ability requires 8 hours of training and attunement which the target must actively participate in.
                You can convince a wild animal to undergo this training with the Creature Handling skill (see \pcref{Creature Handling}).
                \begin{magicalattuneability}{Animal Companion}{8 hours}
                    \abilitytags \abilitytag{Attune}, \abilitytag{Emotion}
                    \rankline
                    This ability requires eight hours of training with a non-\glossterm{elite} Medium or smaller animal \glossterm{ally}.
                    Its level must not exceed your level.
                    The target serves as a loyal companion to you.
                    It follows your directions to the best of its ability.

                    Your magical connection to the animal improves its resilience and strength in combat.
                    Its combat statistics are replaced with the values below.
                    All other aspects of the animal, such as its speed and natural weapons, are unchanged.
                    Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
                    Generally, your animal companion acts immediately before or after your action in combat, though the GM may decide that it acts separately in specific circumstances.

                    % Same as Natural Servant except that it gains more resistance since having the animal die is more problematic
                    \begin{raggeditemize}
                        \item Its size category is Medium, and its \glossterm{base speed} is 30 feet.
                        \item Its level is equal to your level.
                        \item It has no \glossterm{resources}, and it cannot use abilities that would increase its fatigue level.
                        \item Its maximum \glossterm{hit points} are equal to your level \x your rank in this archetype, plus 10 additional hit points.
                        \item Its \glossterm{injury point} is equal to half its maximum hit points.
                        \item Each of its \glossterm{defenses} is equal to 4 \add half your level.
                        \item Its \glossterm{accuracy} is equal to your accuracy, but it makes its own attack rolls.
                        \item Its \glossterm{power} is equal to half your power. You can use the higher of your \glossterm{mundane power} and \glossterm{magical power} for this ability.
                        \item It does not make \glossterm{vital rolls}, but it automatically drops unconscious if it gains a \glossterm{vital wound}. If it gains three vital wounds, it dies.
                    \end{raggeditemize}

                    % TODO: awkward scaling
                    \rankline
                    \rank{3} The animal's \glossterm{power} becomes equal to your \glossterm{power}.
                    \rank{5} The animal's strikes deal double \glossterm{weapon damage}.
                    \rank{7} The animal's strikes deal triple \glossterm{weapon damage}.
                \end{magicalattuneability}

            ",
            // TODO: represent extra creature?
        },
        RankAbility {
            complexity: 1,
            name: "Animal Companion+",
            is_magical: true,
            rank: 4,
            description: r"
                Your animal companion gains an \glossterm{attunement point}.
                In addition, it gains a \plus1 bonus to its \glossterm{defenses}.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Animal Companion+",
            is_magical: true,
            rank: 7,
            description: r"
                Your animal companion gains an additional attunement point.
                In addition, its defense bonus increases to \plus2.
            ",
        },
        RankAbility {
            complexity: 2,
            name: "Tag-Team Takedown",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \ability{tag-team takedown} ability.
                When you use this ability, your animal companion generally waits until after you attack to make its own attack.
                \begin{activeability}{Tag-Team Takedown}{Standard action}
                    \rankline
                    Make a \glossterm{strike} that deals 1d4 \glossterm{extra damage}.
                    Your \ability{animal companion} gains the same extra damage this turn against each damaged creature.

                    \rankline
                    \rank{4} The extra damage increases to 1d10.
                    \rank{5} The extra damage increases to 1d10 \add half your \glossterm{power}.
                    \rank{6} The extra damage increases to 2d10 \add half your \glossterm{power}.
                    \rank{7} The extra damage increases to 2d10 \add your \glossterm{power}.
                \end{activeability}
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Survival Bond",
            is_magical: false,
            rank: 6,
            description: r"
                Whenever you regain \glossterm{hit points}, your animal companion also regains that many hit points.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Beast Bond",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus3 bonus to the Creature Handling skill and a \plus1 bonus to \glossterm{vital rolls}.
                In addition, your \ability{animal companion} gains a \plus1 bonus to its defenses.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Beast Bond+",
            is_magical: false,
            rank: 5,
            description: r"
                The Creature Handling bonus increases to \plus6.
                In addition, your animal companion's defense bonus increases to \plus2.
            ",
        },
    ]
}

pub fn boundary_warden<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Warden's Wisdom",
            is_magical: false,
            rank: 1,
            description: r"
                You gain two additional \glossterm{insight points}.
                In addition, you can spend insight points to gain one additional Knowledge \glossterm{trained skill} per insight point.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Know Your Weapons",
            is_magical: false,
            rank: 1,
            description: r"
                You can gain proficiency with \glossterm{exotic weapons} at the cost of one \glossterm{insight point} per weapon group (see \pcref{Exotic Weapons}).
                You must already be proficient with all non-exotic weapons from that weapon group.
            ",
            // This is an abstraction of the effect of exotic weapons being better
        },
        RankAbility {
            complexity: 0,
            name: "Know Your Enemy",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 \glossterm{accuracy} bonus against creatures associated with Knowledge skills that you are trained with.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Know Your Enemy+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain a \plus2 bonus to all defenses against creatures associated with Knowledge skills that you are trained with.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Guide",
            is_magical: false,
            rank: 2,
            description: r"
                You and your \glossterm{allies} who can see or hear you can ignore \glossterm{difficult terrain} from inanimate natural sources, such as \glossterm{heavy undergrowth}.
                This also applies during overland travel.
                In addition, each ally who can see or hear you can use half of your skill modifier in place of its own for the Balance, Climb, Survival, and Swim skills.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Warden's Warning",
            is_magical: false,
            rank: 6,
            description: r"
                You and your \glossterm{allies} who can see or hear you take no damage when an area ability attacks and misses a target's Armor or Reflex defense.
                This does not protect creatures from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Steadfast Warden",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
        },
        RankAbility {
            complexity: 2,
            name: "Banestrike",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Banestrike}{Standard action}
                    \rankline
                    Make a \glossterm{strike}.
                    If the target is \vulnerable to the strike or is \glossterm{injured}, the strike deals double damage.

                    \rankline
                    \rank{4} You gain a \plus1 accuracy bonus with the strike.
                    \rank{5} The strike deals double \glossterm{weapon damage}.
                    \rank{6} The strike deals triple \glossterm{weapon damage}.
                    % TODO: wording
                    \rank{7} If the strike would deal double damage, it deals triple damage instead.
                \end{activeability}
            ",
        },
    ]
}

pub fn huntmaster<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Quarry",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{sustainability}{Quarry}{\glossterm{Minor action}}
                    \abilitytags \abilitytag{Sustain} (attunable, free), \abilitytag{Subtle}
                    \rankline
                    Choose a creature you can see.
                    That creature becomes your quarry.
                    You gain a \plus1 \glossterm{accuracy} bonus against your quarry, and you gain a \plus5 bonus to checks you make to follow tracks left by your quarry.
                \end{sustainability}
            ",
            // TODO: this also affects allies
        },
        RankAbility {
            complexity: 0,
            name: "Quarry+",
            is_magical: false,
            rank: 6,
            description: r"
                The accuracy bonus from your \ability{quarry} ability increases to \plus2.
            ",
        },
        RankAbility {
            complexity: 3,
            name: "Hunting Styles",
            is_magical: false,
            rank: 2,
            description: r"
                You learn specific hunting styles to defeat specific quarries.
                While your \ability{quarry} ability is active, you and your \glossterm{allies} who can see or hear you are called your hunting party.
                Hunting styles improve your hunting party's ability to fight your quarry.

                Choose two hunting styles from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{hunting style} per \glossterm{insight point}.
                When you use your \textit{quarry} ability, you may also use one of your \textit{hunting styles}.
                Each \textit{hunting style} ability lasts as long as the \textit{quarry} ability you used it with.
                {
                    \begin{magicaltriggeredability}{Anchoring}{Triggered}
                        \rankline
                        As long as your quarry is within \medrange of any member of your hunting party, it cannot \glossterm{teleport}.

                        \rankline
                        \rank{5} The range increases to \distrange.
                    \end{magicaltriggeredability}

                    \begin{magicaltriggeredability}{Bring Down}{Triggered}
                        \rankline
                        If your quarry is \glossterm{midair}, the accuracy bonus from \ability{quarry} also applies to all members of your hunting party.

                        \rankline
                        \rank{5} The accuracy bonus also applies if your quarry used a fly or glide speed at any point since your last turn, even if it is currently grounded.
                    \end{magicaltriggeredability}

                    \begin{triggeredability}{Coordinated Stealth}{Triggered}
                        \rankline
                        Your quarry takes a \minus4 penalty to Awareness checks to notice members of your hunting party.

                        \rankline
                        \rank{5} The penalty increases to \minus6.
                    \end{triggeredability}

                    \begin{triggeredability}{Decoy}{Triggered}
                        \abilitytags \abilitytag{Emotion}
                        \rankline
                        If your quarry is within \shortrange of you, it is \goaded by you.

                        \rankline
                        \rank{5} This effect instead applies if your quarry is within \medrange of you.
                    \end{triggeredability}

                    \begin{magicaltriggeredability}{Distraction}{Triggered}
                        \rankline
                        You do not gain the normal accuracy bonus against your quarry.
                        If you are adjacent to your quarry, the rest of your hunting party gains a \plus1 accuracy bonus against it.

                        \rankline
                        \rank{5} The accuracy bonus applies as long as you are within \medrange of your quarry.
                    \end{magicaltriggeredability}

                    \begin{triggeredability}{Swarm Hunter}{Triggered}
                        \rankline
                        When you use your \textit{quarry} ability, you can choose five additional targets as your quarry.

                        \rankline
                        \rank{5} The number of additional targets is unlimited.
                    \end{triggeredability}

                    \begin{magicaltriggeredability}{Titanslayer}{Triggered}
                        \rankline
                        If your quarry is Gargantuan or larger, the accuracy bonus from \ability{quarry} also applies to all members of your hunting party that are adjacent to it.

                        \rankline
                        \rank{5} The accuracy bonus instead applies to each member that is within \medrange of it.
                    \end{magicaltriggeredability}

                    \begin{triggeredability}{Vigilant}{Triggered}
                        \rankline
                        Your quarry takes a \minus4 penalty to Sleight of Hand and Stealth checks against members of your hunting party.

                        \rankline
                        \rank{5} The penalty increases to \minus6.
                    \end{triggeredability}

                    \begin{triggeredability}{Wolfpack}{Triggered}
                        \rankline
                        While your quarry is adjacent to at least two members of your hunting party, each adjacent \glossterm{ally} gains a \plus1 accuracy bonus against it.

                        \rankline
                        \rank{5} This effect instead applies if your quarry is within \shortrange of at least two members of your hunting party.
                    \end{triggeredability}
                }
            ",
        },
        // Brief ranged slow is 2 EA, or 2.4 EA with injury effect Normal rank 3 would be strike and 1.2 EA.
        // That's enough of a buff to justify the class feature + movement trigger.
        RankAbility {
            complexity: 2,
            name: "No Escape",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{No Escape}{Standard action}
                    \rankline
                    Make a strike that deals 1d6 \glossterm{extra damage}.
                    \hit If the target is your \ability{quarry} and it moved away from you since your last turn, it is \glossterm{briefly} \slowed.
                    \injury If the target would be briefly slowed, it is also slowed as a \glossterm{condition}.

                    \rankline
                    \rank{4} The strike deals double \glossterm{weapon damage}.
                    \rank{5} The extra damage increases to 1d6 \add half \glossterm{power}.
                    \rank{6} The strike deals triple \glossterm{weapon damage}.
                    \rank{7} The extra damage increases to 1d6 per 2 power.
                \end{activeability}
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Agile Hunter",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Dexterity.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Tracking Expert",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \ability{quarry} ability to follow tracks from your quarry increases to \plus20.
                In addition, whenever your quarry \glossterm{teleports}, you automatically know the distance and direction of the teleport if you can see them.
                If you are following their tracks, you can track where they teleported to in the same way.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Apex Hunter",
            is_magical: false,
            rank: 7,
            description: r"
                While your \ability{quarry} ability is active, if your quarry is aware of you, it is \frightened of you.
                This is an \atEmotion effect.
            ",
        },
    ]
}

pub fn scout<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Keen Vision",
            is_magical: false,
            rank: 1,
            description: r"
                You reduce your \glossterm{longshot penalty} by 1.
                You gain \sense{low-light vision}, allowing you to see in \glossterm{dim illumination} (see \pcref{Low-light Vision}).
                In addition, you gain \sense{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \pcref{Darkvision}).
                If you already have that ability, you increase its range by 60 feet.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Keen Vision+",
            is_magical: false,
            rank: 5,
            description: r"
                The longshot penalty reduction increases to 2.
                In addition, the range of your darkvision increases by 120 feet.
                Your darkvision is also not disabled in \glossterm{bright illumination} or when you become \dazzled.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Swift Step",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{speed}.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Swift Step+",
            is_magical: false,
            rank: 7,
            description: r"
                The speed bonus increases to \plus20 feet.
            ",
        },
        RankAbility {
            complexity: 2,
            name: "Ambush",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Ambush}{Standard action}
                    \rankline
                    Move up to half your speed and make a \glossterm{strike} that deals 1d4 \glossterm{extra damage}.
                    You gain a \plus2 accuracy bonus if the target is \unaware or \partiallyunaware of your attack.

                    \rankline
                    \rank{4} The strike deals double \glossterm{weapon damage}.
                    \rank{5} The extra damage increases to 2d6.
                    \rank{6} The extra damage increases to 3d6 \add half \glossterm{power}.
                    \rank{7} The extra damage increases to 5d6 \add half \glossterm{power}.
                \end{activeability}
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Experienced Scout",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Perception.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Blindsight",
            is_magical: false,
            rank: 6,
            description: r"
                Your perceptions are so finely honed that you can sense your enemies without seeing them.
                You gain \sense{blindsense} with a 120 foot range, allowing you to sense your surroundings without light (see \pcref{Blindsense}).
                If you already have the blindsense ability, you increase its range by 120 feet.
                In addition, you gain \sense{blindsight} with a 60 foot range, allowing you to see without light (see \pcref{Blindsight}).
                If you already have the blindsight ability, you increase its range by 60 feet.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Hyperawareness",
            is_magical: false,
            rank: 7,
            description: r"
                You gain a \plus10 bonus to the Awareness skill.
            ",
        },
    ]
}

pub fn wilderness_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Wild Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your connection to the wilderness into dangerous attacks.
                You gain access to one of the following \glossterm{combat styles}: \combatstyle{mobile hunter}, \combatstyle{perfect precision}, or \combatstyle{rip and tear}.
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
                You can only learn wild \glossterm{maneuvers} from wild combat styles that you have access to.

                You learn two rank 1 wild \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some wild maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You gain access to rank 3 wild maneuvers.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 wild maneuvers.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 wild maneuvers.
            ",
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your wild maneuvers.
                For each rank 1 wild maneuver you know, choose one augment from the list below and apply it to that maneuver.
                The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
                However, you can learn the same maneuver more than once and apply different augments to each version.

                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 wild maneuvers.
                {
                    \parhead{Distant Maneuver} The range of your chosen maneuver doubles, and any \glossterm{longshot penalty} that would apply is reduced by an amount equal to your excess rank.
                    If your excess rank is at least 4, the range triples instead.
                    You can only apply this augment to maneuvers that have a listed range.

                    \parhead{Mighty Maneuver} You deal \glossterm{extra damage} equal to twice your excess rank.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \glossterm{speed}.
                    This does not reduce your \glossterm{available movement}.
                    You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Widened Maneuver} The area affected by your chosen maneuver doubles.
                    If your excess rank is at least 4, the area triples instead.
                    You can only apply this augment to maneuvers that affect an area.
                }
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an augment for each of your rank 3 wild maneuvers.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 wild maneuvers.
            ",
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}
