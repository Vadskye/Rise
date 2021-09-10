use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::creatures::{Maneuver, Modifier};
use crate::core_mechanics::{Defense, Resource};

pub fn combat_discipline<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Mental Discipline",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a \plus2 bonus to your Mental defense.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Cleansing Discipline",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{cleansing discipline} ability as a \glossterm{standard action}.
                \begin{instantability}{Cleansing Discipline}[Instant]
                    \rankline
                    Remove up to two \glossterm{brief} effects or \glossterm{conditions} affecting you.
                    This cannot remove effects applied during the current round.

                    \rankline
                    \rank{3} This ability gains the \abilitytag{Swift} tag.
                    When you use it, the removed effects do not affect you during the current phase.
                    In addition, you \glossterm{briefly} cannot gain any \glossterm{conditions}.
                    \rank{5} You can use this ability as a \glossterm{minor action}.
                    When you do, you increase your \glossterm{fatigue level} by one.
                    \rank{7} You can remove any number of effects.
                \end{instantability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enduring Discipline",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to \glossterm{vital rolls} and your \glossterm{fatigue tolerance} (see \pcref{Vital Rolls}, and \pcref{Fatigue Tolerance}).
            ",
            modifiers: Some(vec![Modifier::VitalRoll(1)]),
        },
        RankAbility {
            name: "Disciplined Force",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Disciplined Reaction",
            is_magical: false,
            rank: 4,
            description: r"
                You do not suffer any effects from \glossterm{conditions} or \glossterm{vital wounds} until the next round after they are applied.
                While a vital wound is delayed in this way, you do not suffer any effects from its specific vital wound effect, but you still consider it when calculating your penalties to future \glossterm{vital rolls}.
                You suffer their normal effects in the following round.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Enduring Discipline",
            is_magical: false,
            rank: 5,
            description: r"
                The bonuses from your \textit{enduring discipline} ability increase to \plus2.
            ",
            modifiers: Some(vec![Modifier::VitalRoll(1)]),
        },
        RankAbility {
            name: "Greater Disciplined Force",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{disciplined force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Disciplined Reaction",
            is_magical: false,
            rank: 7,
            description: r"
                The delay from your \textit{disciplined reaction} ability increases by an additional round.
                You suffer their normal effects after that time.
            ",
            modifiers: None,
        },
    ];
}

pub fn equipment_training<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Armor Expertise",
            is_magical: false,
            rank: 0,
            description: r"
                You reduce the \glossterm{encumbrance} of body armor you wear by 1.
            ",
            modifiers: Some(vec![Modifier::Encumbrance(-1)]),
        },
        RankAbility {
            name: "Weapon Training",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{weapon training} ability by spending an hour training with a weapon.
                You cannot use this ability with an \glossterm{exotic weapon} that is from a \glossterm{weapon group} you are not proficient with.
                \begin{instantability}{Weapon Training}[Duration]
                    \rankline
                    You become proficient with the weapon you trained with.
                    You gain a \plus1 bonus to \glossterm{accuracy} with that weapon unless it is an \glossterm{exotic weapon} that you would not be proficient with without this ability.
                    This ability's effect lasts until you use this ability again.

                    \rankline
                    \rank{4} You can use this ability with only five minutes of training.
                    \rank{6} You can use this ability as a \glossterm{minor action}.
                \end{instantability}
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Equipment Efficiency",
            is_magical: false,
            rank: 2,
            description: r"
                You gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic weapons and magic armor.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Greater Armor Expertise",
            is_magical: false,
            rank: 3,
            description: r"
                The penalty reduction from your \textit{armor expertise} ability increases to 2.
                In addition, you reduce the movement speed penalty from body armor you wear by 5 feet.
                Your base Dexterity also contributes more to your Armor defense than normal for your armor.
                A multiplier of \mult1/2 becomes \mult1, and a multiplier of \mult0 becomes a \mult1/2.
            ",
            // TODO: figure out how to represent dexterity and speed
            modifiers: Some(vec![Modifier::Encumbrance(-1), Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Weapon Expertise",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Equipment Efficiency",
            is_magical: false,
            rank: 5,
            description: r"
                The number of attunement points you gain from your \textit{efficient equipment} ability increases to two.
                In addition, you can use the attunement points from that ability to attune to any magic item, not just weapons and armor.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Supreme Armor Expertise",
            is_magical: false,
            rank: 6,
            description: r"
                The \glossterm{encumbrance} reduction from your \textit{armor expertise} ability increases to 3.
                In addition, the movement speed penalty reduction from your \textit{greater armor expertise} ability improves to 10 feet.
                You also always apply your full base Dexterity to your Armor defense, regardless of the armor you use.
            ",
            modifiers: Some(vec![Modifier::Encumbrance(-1)]),
        },
        RankAbility {
            name: "Greater Weapon Expertise",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{weapon expertise} ability increases to \plus3d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(2)]),
        },
    ];
}

// Every rank within this archetype applies a HP bonus to represent Martial Expertise
pub fn martial_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Martial Expertise",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a bonus equal to twice your rank in this archetype to your \glossterm{hit points} (minimum 1).
            ",
            modifiers: Some(vec![Modifier::HitPoints(1)]),
        },
        RankAbility {
            name: "Combat Styles",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your martial prowess into dangerous attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{blunt force}, \textit{penetrating precision}, or \textit{rip and tear}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
                You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers, including maneuvers of the higher rank.
            ",
            modifiers: Some(vec![
                Modifier::HitPoints(1),
                Modifier::Maneuver(Maneuver::CertainStrike(1)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(1)),
                Modifier::Maneuver(Maneuver::PowerStrike(1)),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank",
            is_magical: false,
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
            modifiers: Some(vec![Modifier::HitPoints(2)]),
        },
        RankAbility {
            name: "Martial Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank",
            is_magical: false,
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3 and can improve the effectiveness of your existing maneuvers.
            ",
            modifiers: Some(vec![
                Modifier::HitPoints(2),
                Modifier::Maneuver(Maneuver::CertainStrike(3)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(3)),
                Modifier::Maneuver(Maneuver::PowerStrike(3)),
            ]),
        },
        RankAbility {
            name: "Glancing Strikes",
            is_magical: false,
            rank: 3,
            description: r"
                Whenever you miss by 2 or less with a \glossterm{strike}, the target takes half damage from the strike.
                This is called a \glossterm{glancing blow}.
            ",
            // TODO: figure out how to represent glancing blows
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank",
            is_magical: false,
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4 and can improve the effectiveness of your existing maneuvers.
            ",
            modifiers: Some(vec![Modifier::HitPoints(2)]),
        },
        RankAbility {
            name: "Martial Maneuver",
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
            modifiers: Some(vec![
                Modifier::HitPoints(2),
                Modifier::Maneuver(Maneuver::CertainStrike(5)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(5)),
                Modifier::Maneuver(Maneuver::PowerStrike(5)),
            ]),
        },
        RankAbility {
            name: "Greater Martial Force",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{martial force} ability increases to \plus2d.
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
            name: "Greater Martial Expertise",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{martial expertise} ability increases to three times your rank in this archetype.
            ",
            // Rank 5 HP: +10. Rank 6 HP: +18.
            modifiers: Some(vec![Modifier::HitPoints(8)]),
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            is_magical: false,
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
            modifiers: Some(vec![
                Modifier::HitPoints(3),
                Modifier::Maneuver(Maneuver::CertainStrike(7)),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(7)),
                Modifier::Maneuver(Maneuver::PowerStrike(7)),
            ]),
        },
        RankAbility {
            name: "Martial Maneuver",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
    ];
}

// TODO: This archetype has several abilities that are hard to represent numerically
pub fn sentinel<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Threatening Influence",
            is_magical: false,
            rank: 0,
            description: r"
                Your \glossterm{enemies} treat each space adjacent to you as \glossterm{difficult terrain}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Guarding Strike",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{guarding strike} ability as a standard action.
                \begin{durationability}{Guarding Strike}[Duration]
                    \rankline
                    Make a \glossterm{strike} with a \minus2d damage penalty.
                    Your \glossterm{power} with the strike is halved.
                    Each creature damaged by the strike is \goaded by you as a \glossterm{condition}.
                    \rankline
                    \rank{3} You gain a \plus1 \glossterm{accuracy} bonus with the strike.
                    \rank{5} The accuracy bonus increases to \plus2.
                    \rank{7} The accuracy bonus increases to \plus3.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Protect",
            is_magical: false,
            rank: 2,
            description: r"
                You can use the \textit{protect} ability as a \glossterm{minor action}.
                \begin{durationability}{Protect}[Duration]
                    \abilitytag{Swift}
                    \rankline
                    Choose an \glossterm{ally} adjacent to you.
                    It gains a \plus2 bonus to its Armor defense until the end of the round.
                    Because this ability has the \abilitytag{Swift} tag, this bonus applies against attacks made in the current phase.

                    A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty value} 5 Awareness check.
                    While this ability is active, you cannot gain a defense bonus from this ability, even if another creature with this ability uses it on you.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Threatening Influence",
            is_magical: false,
            rank: 3,
            description: r"
                The area affected by your \textit{threatening influence} ability increases to a \smallarea radius \glossterm{emanation} from you.
                However, it does not affect creatures who are moving in a straight line directly towards you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Sentinel's Challenge",
            is_magical: false,
            rank: 4,
            description: r"
                You can use the \textit{sentinel's challenge} ability as a standard action.
                \begin{durationability}{Sentinel's Challenge}[Duration]
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} in a \largearea radius from you.
                    \hit Each subject is \goaded by you as a \glossterm{condition}.
                    \rankline
                    You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Sentinel's Force",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Protect",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{protect} ability increases to \plus3.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Threatening Influence",
            is_magical: false,
            rank: 6,
            description: r"
                Your \textit{threatening influence} ability applies \glossterm{difficult terrain} twice, causing enemies to move at one quarter speed.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Sentinel's Force",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{sentinel's force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Demanding Challenger",
            is_magical: false,
            rank: 7,
            description: r"
                Each creature that is suffering penalties for being \goaded by you takes an additional -2 \glossterm{accuracy} penalty against creatures other than you.
            ",
            modifiers: None,
        },
    ];
}

pub fn tactician<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Predictive Tactics",
            is_magical: false,
            rank: 0,
            description: r"
                You and each \glossterm{ally} who can see or hear you gain a \plus1 bonus to initiative checks.
            ",
            // TODO: represent ally bonus?
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Battle Tactics",
            is_magical: false,
            rank: 1,
            description: r"
                You can lead your allies using tactics appropriate for the situation.
                Choose two battle tactics from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{battle tactic} per \glossterm{insight point}.

                You can initiate a \textit{battle tactic} as a \glossterm{minor action}.
                When you initiate a battle tactic, you choose whether to use visual cues like gestures, auditory cues like shouts, or both to communicate your tactic with your allies.
                Your \textit{battle tactics} affect yourself and your \glossterm{allies} within a \areahuge radius \glossterm{emanation} from you who can either see or hear your chosen communication style.

                All \textit{battle tactics} have the \abilitytag{Sustain} (minor) tag, so they last as long as you \glossterm{sustain} them (see \pcref{Sustained Abilities}).
                You cannot sustain multiple battle tactics simultaneously, and any existing \textit{battle tactics} end as soon as you activate another battle tactic.

                {
                    \begin{durationability}{Break Through}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target gains a \plus2 bonus to \glossterm{accuracy} with the \textit{overrun} and \textit{shove} abilities (see \pcref{Special Combat Abilities}).

                        \rankline
                        \rank{3} The bonus increases to \plus3.
                        \rank{5} The bonus increases to \plus4.
                        \rank{7} The bonus increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Dogpile}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target gains a \plus2 bonus to \glossterm{accuracy} with the \textit{grapple} ability and with all grapple actions (see \pcref{Grapple}, and \pcref{Grapple Actions}).

                        \rankline
                        \rank{3} The bonus increases to \plus3.
                        \rank{5} The bonus increases to \plus4.
                        \rank{7} The bonus increases to \plus5.
                    \end{durationability}

                    \begin{durationability}{Duck and Cover}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target gains a \plus1 bonus to its Armor defense against non-\glossterm{melee} attacks.

                        \rankline
                        \rank{3} The bonus increases to \plus2.
                        \rank{5} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Group Up}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target that is adjacent to at least one other target gains a \plus1 bonus to its Armor defense.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to its Mental defense.
                        \rank{5} The Armor defense bonus increases to \plus2.
                        \rank{7} The Mental defense bonus increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Hold The Line}[\abilitytag{Sustain} (free)]
                        \rankline
                        Your \glossterm{enemies} treat all areas adjacent to any target as \glossterm{difficult terrain}.

                        \rankline
                        \rank{3} Each area adjacent to any target is doubly difficult terrain, and costs quadruple the normal movement cost to move out of.
                        \rank{5} Each area within a 10 foot radius \glossterm{emanation} from each target is difficult terrain.
                        \rank{7} Each area within a 10 foot radius \glossterm{emanation} from each target is doubly difficult terrain.
                    \end{durationability}

                    \begin{durationability}{Hustle}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each subject gains a \plus5 foot bonus to its speed with all of its \glossterm{movement modes} during any phase that it takes the \textit{sprint} action, or if it moves using a \glossterm{standard action}.

                        \rankline
                        \rank{3} The speed bonus increases to \plus10 feet.
                        \rank{5} The speed bonus increases to \plus15 feet.
                        \rank{7} The speed bonus increases to \plus20 feet.
                    \end{durationability}

                    \begin{durationability}{Keep Moving}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target that ends the \glossterm{movement phase} at least twenty feet away from where it started the round
                            gains a \plus1 bonus to its Armor defense until the end of the round.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to its Reflex defense.
                        \rank{5} The Armor defense bonus increases to \plus2.
                        \rank{7} The Reflex defense bonus increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Stand Your Ground}[\abilitytag{Sustain} (free)]
                        \rankline
                        Each target that ends the \glossterm{movement phase} without changing its location gains a \plus1 bonus to its Armor defense until its location changes.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to its Fortitude defense.
                        \rank{5} The Armor defense bonus increases to \plus2.
                        \rank{7} The Fortitude defense bonus increases to \plus4.
                    \end{durationability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Tactical Precision",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Reactive Tactics",
            is_magical: false,
            rank: 3,
            description: r"
                The bonus from your \textit{reactive tactics} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Greater Battle Tactics",
            is_magical: false,
            rank: 4,
            description: r"
                All of your \textit{battle tactics} abilities gain the \abilitytag{Swift} tag, so their bonuses take effect in the phase that you active them.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Tactical Precision",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{tactical precision} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Supreme Reactive Tactics",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{reactive tactics} ability increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Initiative(1)]),
        },
        RankAbility {
            name: "Supreme Battle Tactics",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \textit{battle tactic}.
                In addition, you can activate and sustain two different battle tactics simultaneously as part of the same action.
                Bonuses from multiple battle tactics, such as the bonus to Armor defense from the \textit{duck and cover} and \textit{group up} abilities, do not stack.
                However, each creature can benefit from both battle tactics at once.
            ",
            modifiers: None,
        },
    ];
}
