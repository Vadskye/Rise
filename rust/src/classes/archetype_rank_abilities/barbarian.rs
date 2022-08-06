use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::attacks::Maneuver;
use crate::core_mechanics::{Attribute, Defense};
use crate::creatures::Modifier;

pub fn battleforged_resilience<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Instant Recovery",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \ability{recover} ability as a \glossterm{minor action}.
                When you do, you do not remove any \glossterm{conditions} affecting you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance} (see \pcref{Damage Resistance}).
            ",
            modifiers: Some(vec![Modifier::DamageResistance(6)]),
        },
        RankAbility {
            name: "Battle-Scarred+",
            is_magical: false,
            rank: 5,
            description: r"
                The damage resistance bonus increases to five times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(20)]),
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(24)]),
        },
        RankAbility {
            name: "Battle-Scarred",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(28)]),
        },
        RankAbility {
            name: "Resilient Recovery",
            is_magical: false,
            rank: 3,
            description: r"
                When you use the \textit{recover} ability, you also regain a quarter of your maximum \glossterm{damage resistance} (see \pcref{Recover}).
                This effect has the \abilitytag{Swift} tag, like the \ability{recover} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Resilient Recovery+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage resistance recovery increases to half your maximum damage resistance.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Battleforged Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Battleforged Force+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::BaseAttribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            name: "Limitless Recovery",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \ability{recover} ability any number of times between short rests.
                In addition, when you use it as a standard action, you only increase your \glossterm{fatigue level} by one.
            ",
            modifiers: None,
        },
    ];
}

pub fn battlerager<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Rage",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{rage} ability as a \glossterm{free action}.
                For most barbarians, this represents entering a furious rage.
                Some barbarians instead enter a joyous battle trance or undergo a partial physical transformation into a more fearsome form.
                \begin{sustainability}{Rage}{\abilitytag{Emotion}, \abilitytag{Sustain} (free), \abilitytag{Swift}}
                    \rankline
                    For the duration of this ability, you gain the following benefits and drawbacks:
                    \begin{itemize}
                        % This is an aggressive scaling that prevents any direct upgrades later in the archetype
                        \item You gain a \plus2 bonus to your \glossterm{power}.
                        \item You gain a \plus2 bonus to \glossterm{vital rolls}.
                        \item You take a \minus2 penalty to Armor and Reflex defenses.
                        \item You are unable to take \glossterm{standard actions} that do not cause you to make \glossterm{mundane} attacks.
                        \item You are unable to use any \glossterm{magical} abilities that require a standard action.
                        \item At the end of each round, if you did not make a \glossterm{mundane} attack during that round, this ability ends.
                        \item When this ability ends for any reason, you \glossterm{briefly} cannot use it again.
                    \end{itemize}

                    \rankline
                    \rank{3} The power bonus increases to \plus4.
                    \rank{5} The power bonus increases to \plus8.
                    \rank{7} The power bonus increases to \plus16.
                \end{sustainability}
            ",
            modifiers: Some(vec![
                Modifier::Power(2),
                Modifier::VitalRoll(2),
                Modifier::Defense(Defense::Armor, -2),
                Modifier::Defense(Defense::Reflex, -2),
            ]),
        },
        RankAbility {
            name: "Rage",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::Power(4)]),
        },
        RankAbility {
            name: "Rage",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::Power(8)]),
        },
        RankAbility {
            name: "Rage",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::Power(16)]),
        },
        RankAbility {
            name: "Enraged Strike",
            is_magical: false,
            rank: 2,
            description: r"
                As a standard action, you can use the \textit{enraged strike} ability.
                \begin{activeability}{Enraged Strike}
                    \rankline
                    Make a melee \glossterm{strike}.
                    You gain a \plus2 accuracy bonus and a \plus4 damage bonus with the strike against each creature that dealt damage to you during the previous round.

                    \rankline
                    \rank{4} The damage bonus increases to \plus8.
                    \rank{6} The damage bonus increases to \plus16.
                \end{activeability}
            ",
            // This is too inconsistent to add as a generally usable strike
            modifiers: None,
        },
        RankAbility {
            name: "Enraged Strike+",
            is_magical: false,
            rank: 7,
            description: r"
                When you use this ability, you gain the accuracy and damage bonuses against each creature that attacked you during the previous round, regardless of whether they dealt damage to you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Insensible Anger",
            is_magical: false,
            rank: 3,
            description: r"
                You ignore all penalties to your accuracy and damage resistance from \glossterm{vital wounds}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Insensible Anger+",
            is_magical: false,
            rank: 6,
            description: r"
                You ignore penalties to your movement speed and defenses from vital wounds.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Furious Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Furious Force+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Primal Brawn",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Strength.
            ",
            modifiers: Some(vec![Modifier::BaseAttribute(Attribute::Strength, 1)]),
        },
        RankAbility {
            name: "Fearless Rage",
            is_magical: false,
            rank: 5,
            description: r"
                You are immune to being \shaken, \frightened, and \panicked during your \textit{rage} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Titanic Rage",
            is_magical: false,
            rank: 7,
            description: r"
                When you use your \textit{rage} ability, you can grow by one \glossterm{size category}.
                Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
                It also increases your \glossterm{base speed} and may increase your \glossterm{reach} (see \pcref{Size Categories}).
            ",
            // TODO: fully represent an increased size category
            modifiers: Some(vec![Modifier::MovementSpeed(10)]),
        },
    ];
}

pub fn outland_savage<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Savage Precision",
            is_magical: false,
            rank: 1,
            description: r"
                You can use your Strength or Dexterity in place of your Perception to determine your \glossterm{accuracy} with the \textit{dirty trick}, \textit{disarm}, \textit{grapple}, \textit{overrun}, and \textit{trip} abilities, as well as with grapple actions (see \pcref{Special Combat Abilities}, and \pcref{Grapple Actions}).
                In addition, you gain a \plus1 bonus to \glossterm{accuracy} with those abilities and with the \textit{shove} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Precision+",
            is_magical: false,
            rank: 5,
            description: r"
                The accuracy bonus increases to \plus3.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Outlandish Weaponry",
            is_magical: false,
            rank: 1,
            description: r"
                You can gain proficiency with \glossterm{exotic weapons} from \glossterm{weapon groups} that you are already proficient with at the cost of one \glossterm{insight point} per weapon group (see \pcref{Exotic Weapons}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Rush",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.
                In addition, when you use the \ability{sprint} ability, you can move through spaces occupied by enemies during that movement (see \pcref{Sprint}).

            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Savage Rush+",
            is_magical: false,
            rank: 6,
            description: r"
                The speed bonus increases to \plus10 feet.
                In addition, when you use the \ability{overrun} or \ability{shove} abilities, you can simultaneously use the \ability{sprint} ability to increase your movement speed during the effect.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Versatile Savagery",
            is_magical: false,
            rank: 3,
            description: r"
                Choose one of the following \glossterm{weapon tags} (see \pcref{Weapon Tags}): Disarming, Forceful, Grappling, or Tripping.
                You may treat all weapons you wield as if they had the chosen weapon tag.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Savage Force+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Primal Agility",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Dexterity.
            ",
            modifiers: Some(vec![Modifier::BaseAttribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            name: "Unstoppable Rush",
            is_magical: false,
            rank: 7,
            description: r"
                You can move through spaces occupied by enemies as if they were unoccupied.
            ",
            modifiers: None,
        },
    ];
}

pub fn primal_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(9)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(12)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(15)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 6,
            description: "",
            // This rank is when supreme resilience kicks in
            modifiers: Some(vec![Modifier::HitPoints(24)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(28)]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 1,
            description: "",
            modifiers: Some(vec![
                Modifier::Maneuver(Maneuver::CertainStrike(1)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(1)),
                Modifier::Maneuver(Maneuver::MightyStrike(1)),
            ]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![
                Modifier::Maneuver(Maneuver::CertainStrike(3)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(3)),
                Modifier::Maneuver(Maneuver::MightyStrike(3)),
            ]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![
                Modifier::Maneuver(Maneuver::CertainStrike(5)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(5)),
                Modifier::Maneuver(Maneuver::MightyStrike(5)),
            ]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![
                Modifier::Maneuver(Maneuver::CertainStrike(7)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(7)),
                Modifier::Maneuver(Maneuver::MightyStrike(7)),
            ]),
        },
        RankAbility {
            name: "Primal Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your primal energy into ferocious attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{dirty fighting}, \textit{herald of war}, or \textit{unbreakable defense}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn primal \glossterm{maneuvers} from primal combat styles that you have access to.

                You learn two rank 1 primal \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.

                \advancement The maximum rank of primal maneuvers that you can learn is equal to your rank in this archetype.
                Primal maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional primal maneuver.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional primal maneuver.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Primal Force+",
            is_magical: false,
            rank: 5,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Primal Resilience",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{hit points}.
            ",
            // Handled as part of bulk silent scaling
            modifiers: None,
        },
        RankAbility {
            name: "Primal Resilience+",
            is_magical: false,
            rank: 6,
            description: r"
                The hit point bonus increases to four times your rank in this archetype.
            ",
            // Handled as part of bulk silent scaling
            modifiers: None,
        },
    ];
}

pub fn totemist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Totem Animal",
            is_magical: false,
            rank: 1,
            description: r"
                You choose a totem animal that represents you.
                Each totem animal grants you abilities that are associated with that animal.

                \subcf{Bear} You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
                In addition, you gain a \plus1 bonus to your Fortitude defense.

                \subcf{Crocodile} Once per round, when you damage a creature with a melee \glossterm{strike}, you can use this ability to \glossterm{push} it into any space adjacent to you.
                This ability has no effect on creatures that are two or more size categories larger than you.

                \subcf{Eagle} You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).

                \subcf{Lion} You gain a \plus1 bonus to \glossterm{accuracy} as long as you have an \glossterm{ally} adjacent to you.

                \subcf{Shark} You gain a \plus2 bonus to \glossterm{accuracy} against creatures within \shortrange of you that are below their maximum hit points.

                \subcf{Wolf} At the start of each round, you may choose one of your \glossterm{allies}.
                That creature gains a \plus1 bonus to \glossterm{accuracy} during that round as long as it is adjacent to you.
            ",
            // For convenience in balancing, assume lion totem instead of representing each totem
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Totem Animal+",
            is_magical: false,
            rank: 4,
            description: r"
                The benefit from your \textit{totem animal} ability improves.

                \subcf{Bear} The hit point bonus increases to four times your rank in this archetype.
                In addition, the Fortitude bonus increases to \plus2.

                \subcf{Crocodile} If the creature loses \glossterm{hit points} from the strike, you can also knock it \prone or enter a grapple with it (see \pcref{Grappling}).

                % TODO: The narrative connection here is loose
                \subcf{Eagle} You gain a \plus3 bonus to the Awareness skill.
                In addition, you are immune to being \dazzled and \blinded.

                \subcf{Lion} You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.

                \subcf{Shark} The accuracy bonus increases to \plus4.

                \subcf{Wolf} You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Totem Animal+",
            is_magical: false,
            rank: 7,
            description: r"
                The benefit from your \textit{totem animal} ability improves further.

                \subcf{Bear} The hit point bonus increases to five times your rank in this archetype.
                In addition, the Fortitude bonus increases to \plus3.

                \subcf{Crocodile} The creature does not have to lose hit points for you to knock it prone or grapple it.

                \subcf{Eagle} The longshot penalty reduction increases to 2.
                In addition, the Awareness bonus increases to \plus6.

                \subcf{Lion} The accuracy bonus increases to \plus2.

                \subcf{Shark} The accuracy bonus increases to \plus6.

                \subcf{Wolf} The accuracy bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Feral Explosion",
            is_magical: false,
            rank: 2,
            description: r"
                Whenever you \glossterm{explode} with an attack roll, you gain a \plus2 \glossterm{accuracy} bonus with the attack (see \pcref{Exploding Attacks}).
                This bonus stacks with itself if you explode multiple times with the same attack roll.
            ",
            // TODO: figure out how to represent this
            modifiers: None,
        },
        RankAbility {
            name: "Feral Explosion+",
            is_magical: false,
            rank: 5,
            description: r"
                Your attacks \glossterm{explode} on a 9 in addition to the normal explosion on a 10.
                This does not affect additional rolls with exploding dice.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Instincts",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your Reflex defense.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Reflex, 2),
            ]),
        },
        RankAbility {
            name: "Animal Instincts+",
            is_magical: false,
            rank: 6,
            description: r"
                The defense bonus increases to \plus3.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Reflex, 1),
            ]),
        },
        RankAbility {
            name: "Totemic Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Totemic Force+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
    ];
}
