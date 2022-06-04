use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn beastmaster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Animal Companion",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{animal companion} ability.
                This ability requires 8 hours of training and attunement which the target must actively participate in.
                You can compel a wild animal to undergo this training by sustaining the \textit{command} ability from the Creature Handling skill (see \pcref{Command}).
                \begin{attuneability}{Animal Companion}[\abilitytag{Attune}]
                    \abilitytag{Emotion}, \glossterm{Magical}
                    \rankline
                    Choose a Medium or smaller animal \glossterm{ally} within your \glossterm{reach} with a level no higher than your level and a \glossterm{challenge rating} no higher than 1.
                    The target serves as a loyal companion to you.
                    It follows your directions to the best of its ability.

                    Your magical connection to the animal improves its resilience and strength in combat.
                    If any of its statistics are higher than the normal values below, the animal uses its own statistics instead.
                    All other aspects of the animal, such as its speed and natural weapons, are unchanged.
                    % Same as Natural Servant except that it gains more resistance since having the animal die is more problematic
                    \begin{itemize}
                        % TODO: figure out why this is a 2
                        \item Its \glossterm{fatigue tolerance} is 2.
                        \item Its \glossterm{hit points} and \glossterm{damage resistance} are equal to the standard value for your Constitution \add your level (see \tref{Hit Points and Damage Resistance}).
                        \item Each of its \glossterm{defenses} is equal to 5 \add half your level.
                        \item Its \glossterm{accuracy} is equal to half your level \add half your Perception.
                        \item Its \glossterm{power} with its attacks is 0.
                        \item It has no \glossterm{attunement points}.
                        \item The damage dealt by its natural weapons increases by \plus1d for each rank in this archetype beyond 1.
                        \item It does not make \glossterm{vital rolls}, but it automatically drops unconscious if it gains a \glossterm{vital wound}. If it gains three vital wounds, it dies.
                        \item It automatically shares the benefits of all of your \glossterm{magic bonuses} to hit points, damage resistance, and power.
                    \end{itemize}

                    % Oddly placed? there must be text between an itemize block and the end of a mdframed env
                    Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
                \end{attuneability}
            ",
            // TODO: represent extra creature?
            modifiers: None,
        },
        RankAbility {
            name: "Pack Tactics",
            is_magical: false,
            rank: 2,
            description: r"
                Any \glossterm{enemy} that is adjacent to both you and your animal companion takes a \minus1 penalty to \glossterm{accuracy} against creatures other than you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Beast Affinity",
            is_magical: false,
            rank: 3,
            description: r"
                The bonus to the Creature Handling skill from your \textit{beast affinity} ability increases to \plus3.
                In addition, the bonus to accuracy from that ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::CreatureHandling, 1)]),
        },
        RankAbility {
            name: "Power of Beasts",
            is_magical: false,
            rank: 3,
            description: r"
                You and your \textit{animal companion} gain a \plus1d damage bonus with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Animal Companion",
            is_magical: true,
            rank: 4,
            description: r"
                Your \textit{animal companion} gains an \glossterm{attunement point}.
                In addition, it gains a \plus1 bonus to \glossterm{accuracy}, \glossterm{defenses}, and \glossterm{vital rolls}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Pack Tactics",
            is_magical: false,
            rank: 5,
            description: r"
                The penalty from your \textit{pack tactics} ability increases to \plus2.
            ",
            // It's actually better than this, since it applies to all allies
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Reflex, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Greater Power of Beasts",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{power of beasts} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Supreme Beast Affinity",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus to the Creature Handling skill from your \textit{beast affinity} ability increases to \plus4.
                In addition, the bonus to defenses from that ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::CreatureHandling, 1)]),
        },
        RankAbility {
            name: "Supreme Animal Companion",
            is_magical: true,
            rank: 7,
            description: r"
                Your \textit{animal companion} gains an additional \glossterm{attunement point}.
                In addition, the bonuses from your \textit{greater animal companion} ability increase to \plus2.
            ",
            modifiers: None,
        },
    ];
}

pub fn boundary_warden<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Know Your Enemy",
            is_magical: false,
            rank: 1,
            description: r"
                Whenever you take a \glossterm{short rest}, you can choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
                You gain a \plus1 bonus to \glossterm{accuracy} against creatures of that type.
                This benefit lasts until you choose a different creature type with this ability.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Experienced Guide",
            is_magical: false,
            rank: 2,
            description: r"
                You and your \glossterm{allies} who can see or hear you can ignore \glossterm{difficult terrain} from all sources except for creature abilities.
                In addition, any group you are part of can travel at full speed through difficult terrain during overland travel (see \pcref{Overland Movement}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Warden's Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to damage with projectile weapons and light weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Warden's Instincts",
            is_magical: false,
            rank: 3,
            description: r"
                You and your \glossterm{allies} who can see or hear you gain a \plus1 bonus to \glossterm{initiative} checks.
            ",
            // TODO: affect allies?
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Greater Know Your Enemy",
            is_magical: false,
            rank: 4,
            description: r"
                The bonus from your \textit{know your enemy} ability increases to \plus2.
                In addition, you can choose two creature types with that ability instead of one.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Experienced Guide",
            is_magical: false,
            rank: 5,
            description: r"
                You and your \glossterm{allies} who can see or hear you gain a \plus5 foot bonus to land speed.
                This does not affect any other movement modes.
            ",
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Greater Warden's Force",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{warden's force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Warden's Instincts",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{warden's instincts} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Supreme Know Your Enemy",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{know your enemy} ability increases to \plus3.
                In addition, you can choose three creature types with that ability instead of two.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ];
}

pub fn huntmaster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Quarry",
            is_magical: false,
            rank: 1,
            description: r"
            \label{Quarry} You can use the \textit{quarry} ability as a \glossterm{minor action}.
                \begin{attuneability}{Quarry}[\abilitytag{Attune}]
                    \abilitytag{Swift}, \abilitytag{Subtle}
                    \rankline
                    Choose a creature within \longrange.
                    The target becomes your quarry.
                    You and your \glossterm{allies} within the same range are called your hunting party.
                    Your hunting party gains a \plus1 bonus to \glossterm{accuracy} against your quarry.
                    Because this ability has the \abilitytag{Swift} tag, this affects attacks against the target during the current phase.
                \end{attuneability}
            ",
            // TODO: this also affects allies
            modifiers: Some(vec![
                Modifier::Accuracy(1),
                Modifier::Resource(Resource::AttunementPoint, -1),
            ]),
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
                    \begin{durationability}{Anchoring}[Duration]
                        \abilitytag{Magical}
                        \rankline
                        As long as your quarry is adjacent to any member of your hunting party, it cannot travel extradimensionally.
                        This prevents all \abilitytag{Manifestation} and \glossterm{teleportation} effects.

                        \rankline
                        \rank{4} This effect instead applies if your quarry is within \medrange of any member of your hunting party.
                        \rank{6} This effect instead applies if your quarry is within \distrange of any member of your hunting party.
                    \end{durationability}

                    \begin{durationability}{Coordinated Stealth}[Duration]
                        \rankline
                        Your quarry takes a \minus4 penalty to Awareness checks to notice members of your hunting party.

                        \rankline
                        \rank{4} The Awareness penalty increases to \minus8.
                        \rank{6} The Awareness penalty increases to \minus12.
                    \end{durationability}

                    \begin{durationability}{Cover Weaknesses}[Duration]
                        \rankline
                        The accuracy bonus against your quarry is replaced with a \plus1 bonus to Armor and Reflex defenses against your quarry's attacks.

                        \rankline
                        \rank{4} The defense bonus applies to all defenses.
                        \rank{6} The defense bonus increases to \plus2.
                    \end{durationability}

                    \begin{durationability}{Decoy}[Duration]
                        \rankline
                        If you are adjacent to your quarry, it takes a \minus2 accuracy penalty on attacks against members of your hunting party other than you.

                        \rankline
                        \rank{4} The penalty increases to \minus3.
                        \rank{6} The penalty increases to \minus4.
                    \end{durationability}

                    \begin{durationability}{Lifeseal}[Duration]
                        \abilitytag{Magical}
                        \rankline
                        As long as your quarry is adjacent to any member of your hunting party, it cannot regain \glossterm{hit points}.

                        \rankline
                        \rank{4} This effect instead applies if the target is within \rngmed range of any member of your hunting party.
                        \rank{6} This effect instead applies if your quarry is within \rngdist range of any member of your hunting party.
                    \end{durationability}

                    \begin{durationability}{Martial Suppression}[Duration]
                        \rankline
                        As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 accuracy penalty with \glossterm{mundane} attacks.

                        \rankline
                        \rank{4} The penalty increases to \minus2.
                        \rank{6} The penalty increases to \minus3.
                    \end{durationability}

                    \begin{durationability}{Mystic Suppression}[Duration]
                        \rankline
                        As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 penalty to \glossterm{accuracy} with \glossterm{magical} attacks.

                        \rankline
                        \rank{4} The penalty increases to \minus2. 
                        \rank{6} The penalty increases to \minus3.
                    \end{durationability}

                    \begin{durationability}{Solo Hunter}[Duration]
                        \rankline
                        Your hunting party other than you gains no benefit from your \textit{quarry} ability.
                        In exchange, you gain a \plus1 bonus to your defenses against your quarry.

                        \rankline
                        \rank{4} The accuracy bonus from your \textit{quarry} ability increases to \plus2.
                        \rank{6} The defense bonus increases to \plus2.
                    \end{durationability}

                    \begin{durationability}{Swarm Hunter}[Duration]
                        \rankline
                        When you use your \textit{quarry} ability, you can target any number of creatures to be your quarry.

                        \rankline
                        \rank{4} Your hunting party gains a \plus1 bonus to \glossterm{initiative} checks.
                        \rank{6} The initiative bonus increases to \plus2.
                    \end{durationability}

                    \begin{durationability}{Wolfpack}[Duration]
                        \rankline
                        At the start of each \glossterm{phase}, if your quarry is adjacent to at least two members of your hunting party, it moves at half speed until the end of that phase.

                        \rankline
                        \rank{4} This effect instead applies if your quarry is adjacent to any member of your hunting party.
                        \rank{6} Your quarry is \slowed instead of moving at half speed.
                    \end{durationability}
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
            name: "Hunter's Prowess",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Quarry",
            is_magical: false,
            rank: 4,
            description: r"
                You can use your \textit{quarry} ability with the \abilitytag{Sustain} (free) tag instead of the \abilitytag{Attune} tag.
                If you originally use your \textit{quarry} ability as a sustained ability, you can attune to the same quarry as a free action, even if your quarry is no longer in sight.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Flexible Hunting Style",
            is_magical: false,
            rank: 5,
            description: r"
                As a \glossterm{minor action}, you can change which \textit{hunting style} you have active.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Tracker",
            is_magical: false,
            rank: 6,
            description: r"
                The Survival bonus from your \textit{tracker} ability increases to \plus5.
                In addition, the bonus to follow tracks from your quarry increases to \plus20.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Hunter's Prowess",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{hunter's prowess} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Supreme Quarry",
            is_magical: false,
            rank: 7,
            description: r"
                The accuracy bonus from your \textit{quarry} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ];
}

pub fn scout<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Skirmisher",
            is_magical: false,
            rank: 1,
            description: r"
                At the start of each phase, if there is no more than one creature adjacent to you, you gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes} during that phase.
                In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Keen Vision",
            is_magical: false,
            rank: 2,
            description: r"
                You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                In addition, you gain \trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \pcref{Darkvision}).
                If you already have that ability, you increase its range by 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Perceive Weakness",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to your \glossterm{accuracy}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Blindsight",
            is_magical: false,
            rank: 3,
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
            name: "Greater Skirmisher",
            is_magical: false,
            rank: 4,
            description: r"
                The speed bonus from your \textit{skirmisher} ability increases to \plus10 feet.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Greater Perceive Weakness",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{perceive weakness} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Blindsight",
            is_magical: false,
            rank: 6,
            description: r"
                The range of your \trait{blindsense} increases by 360 feet.
                In addition, the range of your \trait{blindsight} increases by 90 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Skirmisher",
            is_magical: false,
            rank: 7,
            description: r"
                The speed bonus from your \textit{skirmisher} ability increases to \plus15 feet.
                In addition, the penalty reduction from that ability increases to 2.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
    ];
}

pub fn wilderness_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Combat Styles",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your wild energy into ferocious attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{flurry of blows}, \textit{mobile assault}, or \textit{penetrating precision}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} chosen from combat styles you have access to.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (2)",
            is_magical: false,
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank (3)",
            is_magical: false,
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Senses",
            is_magical: false,
            rank: 3,
            description: r"
                 You gain a \plus1 bonus to Perception-based checks, except \glossterm{initiative} checks.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Awareness, 1),
                Modifier::Skill(Skill::CreatureHandling, 1),
                Modifier::Skill(Skill::SocialInsight, 1),
                Modifier::Skill(Skill::Survival, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (4)",
            is_magical: false,
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Maneuver",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            is_magical: false,
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Wild Force",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{wild force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            is_magical: false,
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Wild Senses",
            is_magical: false,
            rank: 6,
            description: r"
                The bonuses from your \textit{wild senses} ability increase to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Awareness, 1),
                Modifier::Skill(Skill::CreatureHandling, 1),
                Modifier::Skill(Skill::SocialInsight, 1),
                Modifier::Skill(Skill::Survival, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            is_magical: false,
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wild Maneuver",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
    ];
}
