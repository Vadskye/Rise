use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense};
use crate::creatures::Modifier;

use super::standard_modifiers::add_standard_maneuver_modifiers;

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
                        \item You are unable to use any \magical abilities that require a standard action.
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
                It also increases your \glossterm{base speed} (see \pcref{Size Categories}).
            ",
            // TODO: fully represent an increased size category
            modifiers: Some(vec![Modifier::BaseSpeed(10)]),
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
                You can use your full Strength or Dexterity in place of your Perception to determine your \glossterm{accuracy} with the \textit{dirty trick}, \textit{grapple}, \textit{overrun}, and \textit{trip} abilities, as well as with grapple actions (see \pcref{Special Combat Abilities}, and \pcref{Grapple Actions}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Precision+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus2 \glossterm{accuracy} bonus with those abilities and with the \textit{shove} ability.
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
                When you use the \ability{sprint} ability, you can move through spaces occupied by enemies as if they were unoccupied during that movement (see \pcref{Sprint}).
                In addition, when you use the \ability{charge}, \ability{overrun} or \ability{shove} abilities, you can simultaneously use the \ability{sprint} ability to increase your movement speed during the effect.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Rush+",
            is_magical: false,
            rank: 6,
            description: r"
                You can move through spaces occupied by enemies as if they were unoccupied.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Versatile Savagery",
            is_magical: false,
            rank: 3,
            description: r"
                Choose one of the following \glossterm{weapon tags} (see \pcref{Weapon Tags}): Forceful, Grappling, or Tripping.
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
            name: "Primal Rush",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \textit{sprint} ability during the \glossterm{movement phase} without increasing your \glossterm{fatigue level}.
                After you use this ability, you \glossterm{briefly} cannot use it again.
            ",
            modifiers: None,
        },
    ];
}

pub fn primal_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
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
                    including maneuvers of a higher rank.

                \advancement Some primal maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You learn an additional primal maneuver.
                In addition, you gain access to rank 3 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional primal maneuver.
                In addition, you gain access to rank 7 primal maneuvers.
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
            name: "Enhanced Maneuvers",
            is_magical: false,
            rank: 4,
            description: r"
                You gain the ability to customize your weaker primal maneuvers.
                For each rank 1 and rank 3 primal maneuver you know, choose one enhancement from the list below and apply it to that maneuver.

                Whenever you increase your rank in this archetype, you can change your enhancements.
                However, you must still apply them to rank 1 or rank 3 primal maneuvers.
                {
                    \parhead{Finishing Maneuver} You gain a \plus2 accuracy bonus with your chosen maneuver against creatures who are at less than their maximum \glossterm{hit points}.
                    You can only apply this enhancement to manuevers which cause you to make a melee \glossterm{strike}.

                    % at rank 4, level 10, reasonable base damage would be 2d8+10. Assuming 60% accuracy:
                    % base dpr: 19*0.6 = 11.4
                    % +2 acc: 19*0.8 = 15.2
                    % +4 dmg: 23*0.6 = 13.8
                    % +6 dmg: 25*0.6 = 15.0
                    % +8 dmg: 27*0.6 = 16.2

                    % at rank 6, level 16, reasonable base damage would be 4d6+20. Assuming 60% accuracy:
                    % base dpr: 33*0.6 = 19.8
                    % +2 acc: 33*0.8 = 26.4
                    % +8 dmg: 41*0.6 = 24.6
                    % +16 dmg: 49*0.6 = 29.4
                    \parhead{Powerful Maneuver} You gain a \plus3 bonus to your \glossterm{power} with your chosen maneuver.
                    This bonus increases to \plus5 at rank 6.

                    \parhead{Precise Maneuver} You gain a \plus1 accuracy bonus with your chosen maneuver.

                    \parhead{Reckless Maneuver} You gain a \plus2 accuracy bonus with your chosen maneuver.
                    However, you \glossterm{briefly} take a \minus2 penalty to your defenses after you use that maneuver.
                    You can only apply this enhancement to manuevers which cause you to make a melee \glossterm{strike}.

                    \parhead{Widened Maneuver} The area affected by your chosen maneuver doubles.
                    You can only apply this enhancement to maneuvers that affect an area.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enhanced Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an enhancement for each of your rank 5 primal maneuvers.
                In addition, you double the effect of enhancements you apply to your rank 1 primal maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    return abilities;
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
                That ally gains a \plus1 bonus to \glossterm{accuracy} during that round as long as it is adjacent to you.
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

                \subcf{Lion} The accuracy bonus applies as long as an ally is within \shortrange of you.

                \subcf{Shark} The accuracy bonus increases to \plus4.

                \subcf{Wolf} The accuracy bonus applies as long as the ally is within \shortrange of you.
            ",
            modifiers: None,
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
                The defense bonus increases to \plus4.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Reflex, 2),
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
