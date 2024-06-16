use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, MovementMode, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn beastmaster<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Animal Companion",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{animal companion} ability.
                This ability requires 8 hours of training and attunement which the target must actively participate in.
                You can compel a wild animal to undergo this training by sustaining the \textit{command} ability from the Creature Handling skill (see \pcref{Command}).
                \begin{magicalattuneability}{Animal Companion}{\abilitytag{Attune} (deep), \abilitytag{Emotion}}
                    \rankline
                    Choose a non-\glossterm{elite} Medium or smaller animal \glossterm{ally} that you \glossterm{touch}.
                    Its level must not exceed your level.
                    The target serves as a loyal companion to you.
                    It follows your directions to the best of its ability.

                    Your magical connection to the animal improves its resilience and strength in combat.
                    Its combat statistics are replaced with the values below.
                    All other aspects of the animal, such as its speed and natural weapons, are unchanged.
                    Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
                    Generally, your animal companion acts immediately before or after your action in combat, though the GM may decide that it acts separately in specific circumstances.

                    % Same as Natural Servant except that it gains more resistance since having the animal die is more problematic
                    \begin{itemize}
                        \item Its size category is Medium, and its \glossterm{base speed} is 30 feet.
                        \item It has no \glossterm{resources}, and it cannot use \abilitytag{Exertion} abilities.
                        \item Its \glossterm{hit points} are equal to the standard value for your level, base class, and Constitution (see Base Class Abilities, above).
                        \item Its \glossterm{damage resistance} is equal to half its hit points, ignoring any \glossterm{enhancement bonuses} to hit points.
                        \item Each of its \glossterm{defenses} is equal to 5 \add half your level.
                        \item Its \glossterm{accuracy} is equal to half the sum of your level and Perception.
                        \item Its \glossterm{power} is 0.
                        \item It does not make \glossterm{vital rolls}, but it automatically drops unconscious if it gains a \glossterm{vital wound}. If it gains three vital wounds, it dies.
                        \item It automatically shares the benefits of all of your \glossterm{enhancement bonuses} to hit points and damage resistance.
                    \end{itemize}
                    % There must be text between an itemize block and the end of a mdframed env

                    \rankline
                    \rank{3} The animal's \glossterm{power} becomes equal to your \glossterm{magical power}, which increases its \glossterm{weapon damage} as normal (see \pcref{Weapon Damage}).
                    \rank{4} The animal gains a +1 \glossterm{accuracy} bonus with \glossterm{strikes}.
                    \rank{5} The accuracy bonus increases to +2.
                    \rank{6} The accuracy bonus increases to +4.
                    \rank{7} The animal's \glossterm{weapon damage} is doubled.
                    However, the accuracy bonus is reduced to +2.
                \end{magicalattuneability}

            ",
            // TODO: represent extra creature?
            modifiers: None,
        },
        RankAbility {
            name: "Animal Companion+",
            is_magical: true,
            rank: 4,
            description: r"
                Your animal companion gains an \glossterm{attunement point}.
                In addition, it gains a \plus1 bonus to its \glossterm{defenses}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Companion+",
            is_magical: true,
            rank: 7,
            description: r"
                Your animal companion gains an additional attunement point.
                In addition, its bonuses to defenses increases to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Tag-Team Takedown",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \ability{tag-team takedown} ability.
                When you use this ability, your animal companion generally waits until after you attack to make its own attack.
                \begin{activeability}{Tag-Team Takedown}
                    \rankline
                    Make a \glossterm{strike} with 1d4 \glossterm{extra damage}.
                    Your \ability{animal companion} gains the same extra damage this round against each damaged creature.

                    \rankline
                    \rank{4} The extra damage increases to 1d8.
                    \rank{5} The extra damage increases to 2d8.
                    \rank{6} The extra damage increases to 3d10.
                    \rank{7} The extra damage increases to 5d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Survival Bond",
            is_magical: false,
            rank: 6,
            description: r"
                Whenever you regain \glossterm{hit points} or \glossterm{damage resistance}, your animal companion also regains that many hit points or damage resistance.
                If the healing ability had any limit, such as only healing up to half your maximum hit points, that limit also applies to your animal companion.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Beast Bond",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus3 bonus to the Creature Handling skill.
                In addition, you gain a \plus1 bonus to \glossterm{vital rolls}, and your \textit{animal companion} can remain conscious after suffering a single vital wound (see \pcref{Vital Wounds}).
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::CreatureHandling, 3)]),
        },
        RankAbility {
            name: "Beast Bond+",
            is_magical: false,
            rank: 5,
            description: r"
                The Creature Handling bonus increases to \plus6.
                In addition, your animal companion can remain conscious after suffering two vital wounds, and it does not die until it has five vital wounds.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::CreatureHandling, 3)]),
        },
    ]
}

pub fn boundary_warden<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Know Your Enemy",
            is_magical: false,
            rank: 1,
            description: r"
                Whenever you finish a \glossterm{short rest}, you can choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
                You gain a \plus1 bonus to \glossterm{accuracy} against creatures of that type.
                In addition, whenever you see a creature of that type, you intuitively know what effects it is \vulnerable to.
                This benefit lasts until you choose a different creature type with this ability.

            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Know Your Enemy+",
            is_magical: false,
            rank: 4,
            description: r"
                The accuracy bonus increases to \plus2.
                In addition, you can choose two creature types instead of one.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Know Your Enemy+",
            is_magical: false,
            rank: 7,
            description: r"
                The accuracy bonus increases to \plus3.
                In addition, you can choose three creature types instead of two.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Experienced Guide",
            is_magical: false,
            rank: 2,
            description: r"
                You and your \glossterm{allies} who can see or hear you can ignore \glossterm{difficult terrain} from inanimate natural sources, such as \glossterm{heavy undergrowth}.
                In addition, any group you are part of can travel at full speed through difficult terrain during overland travel.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Experienced Guide+",
            is_magical: false,
            rank: 5,
            description: r"
                You and your \glossterm{allies} who can see or hear you can ignore \glossterm{difficult terrain}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Steadfast Warden",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus2 bonus to your Fortitude defense.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 2)]),
        },
        RankAbility {
            name: "Banestrike",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \ability{banestrike} ability.
                \begin{activeability}{Banestrike}
                    \rankline
                    Make a \glossterm{strike}.
                    If the target is \vulnerable to the strike, or if the target is subject to your \ability{know your enemy} ability and has no remaining \glossterm{damage resistance}, the strike deals double \glossterm{weapon damage}.

                    \rankline
                    \rank{4} You gain a +1 accuracy bonus with the strike.
                    % Note: rank 5 and 6 could flip order; will either be overpowered or underpowered at specifically rank 5
                    \rank{5} The strike deals triple weapon damage instead of double weapon damage.
                    \rank{6} The accuracy bonus increases to +2.
                    \rank{7} The accuracy bonus increases to +4.
                \end{activeability}
            ",
            modifiers: None,
        },
    ]
}

pub fn huntmaster<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Quarry",
            is_magical: false,
            rank: 1,
            description: r"
            \label{Quarry} You can use the \textit{quarry} ability as a \glossterm{minor action}.
                \begin{attuneability}{Quarry}{\abilitytag{Attune}, \abilitytag{Subtle}}
                    \rankline
                    Choose a creature you can see.
                    That creature becomes your quarry.
                    You and your \glossterm{allies} within the same range are called your hunting party.
                    Your hunting party gains a \plus1 bonus to \glossterm{accuracy} against your quarry.
                \end{attuneability}
            ",
            // TODO: this also affects allies
            modifiers: Some(vec![
                Modifier::Accuracy(1),
                Modifier::Resource(Resource::AttunementPoint, -1),
            ]),
        },
        RankAbility {
            name: "Quarry+",
            is_magical: false,
            rank: 4,
            description: r"
                This ability now has the \abilitytag{Sustain} (attuneable, free) tag instead of the \abilitytag{Attune} tag (see \pcref{Sustained Abilities}).
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Quarry+",
            is_magical: false,
            rank: 7,
            description: r"
                The accuracy bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Hunting Styles",
            is_magical: false,
            rank: 2,
            description: r"
                You learn specific hunting styles to defeat particular quarries.
                Choose two hunting styles from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{hunting style} per \glossterm{insight point}.
                When you use your \textit{quarry} ability, you may also use one of your \textit{hunting styles}.
                Each \textit{hunting style} ability lasts as long as the \textit{quarry} ability you used it with.
                {
                    \begin{magicalactiveability}{Anchoring}
                        \rankline
                        As long as your quarry is adjacent to any member of your hunting party, it cannot travel extradimensionally.
                        This prevents all \glossterm{teleportation} effects.

                        \rankline
                        \rank{4} This effect instead applies if your quarry is within \medrange of any member of your hunting party.
                        \rank{6} This effect instead applies if your quarry is within \distrange of any member of your hunting party.
                    \end{magicalactiveability}

                    \begin{activeability}{Coordinated Stealth}
                        \rankline
                        Your quarry takes a \minus4 penalty to Awareness checks to notice members of your hunting party.

                        \rankline
                        \rank{4} The Awareness penalty increases to \minus8.
                        \rank{6} The Awareness penalty increases to \minus12.
                    \end{activeability}

                    \begin{activeability}{Cover Weaknesses}
                        \rankline
                        The accuracy bonus against your quarry is replaced with a \plus1 bonus to Armor and Reflex defenses against your quarry's attacks.

                        \rankline
                        \rank{4} The defense bonus applies to all defenses.
                        \rank{6} The defense bonus increases to \plus2.
                    \end{activeability}

                    \begin{activeability}{Decoy}
                        \rankline
                        If you are adjacent to your quarry, it takes a \minus2 accuracy penalty on attacks against members of your hunting party other than you.

                        \rankline
                        \rank{4} The penalty increases to \minus3.
                        \rank{6} The penalty increases to \minus4.
                    \end{activeability}

                    \begin{magicalactiveability}{Lifeseal}
                        \rankline
                        As long as your quarry is adjacent to any member of your hunting party, it cannot regain \glossterm{hit points} or \glossterm{damage resistance}.

                        \rankline
                        \rank{4} This effect instead applies if the target is within \rngmed range of any member of your hunting party.
                        \rank{6} This effect instead applies if your quarry is within \rngdist range of any member of your hunting party.
                    \end{magicalactiveability}

                    \begin{activeability}{Martial Suppression}
                        \rankline
                        As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 accuracy penalty with \glossterm{mundane} attacks.

                        \rankline
                        \rank{4} The penalty increases to \minus2.
                        \rank{6} The penalty increases to \minus3.
                    \end{activeability}

                    \begin{activeability}{Mystic Suppression}
                        \rankline
                        As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 penalty to \glossterm{accuracy} with \magical attacks.

                        \rankline
                        \rank{4} The penalty increases to \minus2. 
                        \rank{6} The penalty increases to \minus3.
                    \end{activeability}

                    \begin{activeability}{Solo Hunter}
                        \rankline
                        Your hunting party other than you gains no benefit from your \textit{quarry} ability.
                        In exchange, you gain a \plus1 bonus to your defenses against your quarry.

                        \rankline
                        \rank{4} The accuracy bonus from your \textit{quarry} ability increases to \plus2.
                        \rank{6} The defense bonus increases to \plus2.
                    \end{activeability}

                    \begin{activeability}{Swarm Hunter}
                        \rankline
                        When you use your \textit{quarry} ability, you can target any number of creatures to be your quarry.

                        \rankline
                        \rank{4} As a \glossterm{free action}, you can declare one creature you see to be your quarry in addition to any existing creatures.
                        \rank{6} You can add any number of creatures as a free action instead of only one.
                    \end{activeability}

                    \begin{activeability}{Wolfpack}
                        \rankline
                        While your quarry is adjacent to at least three members of your hunting party, those adjacent members gain an additional \plus1 accuracy bonus against it.

                        \rankline
                        \rank{4} This effect instead applies if your quarry is adjacent to at least two members of your hunting party.
                        \rank{6} This effect instead applies if your quarry is adjacent to any member of your hunting party.
                    \end{activeability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Tracker",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus3 bonus to the Survival skill.
                In addition, you gain a \plus10 bonus to follow tracks left by your quarry.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::Survival, 3)]),
        },
        RankAbility {
            name: "Tracker+",
            is_magical: false,
            rank: 6,
            description: r"
                The Survival bonus increases to \plus6.
                In addition, the bonus to follow tracks from your quarry increases to \plus20.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Flexible Hunting Style",
            is_magical: false,
            rank: 5,
            description: r"
                You can change which \textit{hunting style} you have active as a \glossterm{minor action}.
            ",
            modifiers: None,
        },
    ]
}

pub fn scout<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Keen Vision",
            is_magical: false,
            rank: 1,
            description: r"
                You reduce your \glossterm{longshot penalty} by 1.
                You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                In addition, you gain \trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \pcref{Darkvision}).
                If you already have that ability, you increase its range by 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Keen Vision+",
            is_magical: false,
            rank: 5,
            description: r"
                The longshot penalty reduction increases to 2.
                In addition, the range of your darkvision increases by 120 feet.
                Your darkvision is also not disabled in \glossterm{bright illumination} or when you become \dazzled.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Blindsight",
            is_magical: false,
            rank: 2,
            description: r"
                Your perceptions are so finely honed that you can sense your enemies without seeing them.
                You gain \trait{blindsense} with a 120 foot range, allowing you to sense your surroundings without light (see \pcref{Blindsense}).
                If you already have the blindsense ability, you increase its range by 120 feet.
                In addition, you gain \trait{blindsight} with a 30 foot range, allowing you to see without light (see \pcref{Blindsight}).
                If you already have the blindsight ability, you increase its range by 30 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Blindsight+",
            is_magical: false,
            rank: 7,
            description: r"
                The range of your blindsense increases by 240 feet.
                In addition, the range of your blindsight increases by 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Ambush",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \ability{ambush} ability.
                \begin{activeability}{Ambush}
                    \rankline
                    Move up to your speed and make a \glossterm{strike} with a +2 accuracy bonus.
                    The strike deals double damage to \unaware targets.

                    \rankline
                    \rank{4} The strike deals 1d4 \glossterm{extra damage}.
                    \rank{5} The extra damage increases to 1d8.
                    \rank{6} The accuracy bonus increases to +4.
                    \rank{7} The extra damage increases to 2d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Skirmisher",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus10 foot bonus to your land speed.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            name: "Perceive Weakness",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to your \glossterm{accuracy}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn wilderness_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            name: "Wild Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your connection to the wilderness into dangerous attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{flurry of blows}, \textit{mobile assault}, or \textit{penetrating precision}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn wild \glossterm{maneuvers} from wild combat styles that you have access to.

                You learn two rank 1 wild \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some wild maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You learn an additional wild maneuver.
                In addition, you gain access to rank 3 wild maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 wild maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional wild maneuver.
                In addition, you gain access to rank 7 wild maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your wild maneuvers.
                For each rank 1 wild maneuver you know, choose one augment from the list below and apply it to that maneuver.
                Augments scale in power with your excess rank with that maneuver, which is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 wild maneuvers.
                {
                    \parhead{Distant Maneuver} The range of your chosen maneuver doubles.
                    If your excess rank is at least 4, the range triples instead.
                    You can only apply this augment to maneuvers that have a listed range.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 4 - your excess rank but the strike deals double \glossterm{weapon damage}.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your land speed.
                    You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Widened Maneuver} The area affected by your chosen maneuver doubles.
                    If your excess rank is at least 4, the area triples instead.
                    You can only apply this augment to maneuvers that affect an area.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an augment for each of your rank 3 wild maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 wild maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}
