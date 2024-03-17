use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;

pub fn combat_discipline<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Enduring Discipline",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to your Mental defense, \glossterm{vital rolls}, and \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Mental, 1),
                Modifier::VitalRoll(1),
                Modifier::Resource(Resource::FatigueTolerance, 1),
            ]),
        },
        RankAbility {
            name: "Enduring Discipline+",
            is_magical: false,
            rank: 5,
            description: r"
                The bonuses increase to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Mental, 1),
                Modifier::VitalRoll(1),
                Modifier::Resource(Resource::FatigueTolerance, 1),
            ]),
        },
        RankAbility {
            name: "Cleansing Discipline",
            is_magical: false,
            rank: 2,
            description: r"
                You can use the \textit{cleansing discipline} ability as a \glossterm{standard action}.
                \begin{activeability}{Cleansing Discipline}[\abilitytag{Swift}]
                    \rankline
                    Remove one \glossterm{condition} affecting you.
                    Because this ability has the \abilitytag{Swift} tag, the removed condition does not affect you during the current phase.
                    In addition, you \glossterm{briefly} cannot gain any new conditions.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Cleansing Discipline+",
            is_magical: false,
            rank: 6,
            description: r"
                You can use your \ability{cleansing discipline} ability as a \glossterm{minor action}.
                When you do, you increase your \glossterm{fatigue level} by one.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Disciplined Strike",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{disciplined strike} ability.
                \begin{activeability}{Disciplined Strike}
                    \rankline
                    Make a \glossterm{strike} with 1d6 \glossterm{extra damage}.
                    You cannot get a \glossterm{critical hit} with this strike.
                    \miss Half damage.

                    \rankline
                    \rank{4} The extra damage increases to 1d10.
                    \rank{5} The \glossterm{weapon damage} is doubled.
                    \rank{6} The extra damage increases to 2d10.
                    \rank{7} The \glossterm{weapon damage} is tripled.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Disciplined Reaction",
            is_magical: false,
            rank: 4,
            description: r"
                Whenever you gain a \glossterm{condition}, you \glossterm{briefly} ignore its effects.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Vital Discipline",
            is_magical: false,
            rank: 7,
            description: r"
                You \glossterm{briefly} ignore the vital wound effect of each vital wound you gain.
                While a vital wound is delayed in this way, you do not suffer any effects from its specific vital wound effect, but you still consider it when calculating your penalties to \glossterm{vital rolls}.
            ",
            modifiers: None,
        },
    ]
}

pub fn equipment_training<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Weapon Training",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{weapon training} ability by spending an hour training with a weapon.
                You cannot use this ability with an \glossterm{exotic weapon} that is from a \glossterm{weapon group} you are not proficient with.
                \begin{activeability}{Weapon Training}
                    \rankline
                    You become proficient with the weapon you trained with.
                    You gain a \plus1 bonus to \glossterm{accuracy} with that weapon unless it is an \glossterm{exotic weapon} that you would not be proficient with without this ability.
                    This ability's effect lasts until you use this ability again.
                \end{activeability}
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Weapon Training+",
            is_magical: false,
            rank: 4,
            description: r"
                The effect of your \ability{weapon training} ability is permanent.
            ",
            modifiers: None,
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
            name: "Equipment Efficiency+",
            is_magical: false,
            rank: 5,
            description: r"
                You can use the \ability{item attunement} ability to attune to weapons and armor as a \glossterm{minor action} (see \pcref{Item Attunement}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Armor Expertise",
            is_magical: false,
            rank: 3,
            description: r"
                You reduce the \glossterm{encumbrance} of body armor you wear by 1, and you gain a special ability based on the usage class of your body armor.
                \begin{itemize}
                    \item Light: You gain a \plus10 foot bonus to your land speed.
                    \item Medium: You gain a \plus1 bonus to all defenses.
                    \item Heavy: You add half your Dexterity to your Armor defense.
                \end{itemize}
            ",
            // Assume medium armor, since it's the easiest to represent
            modifiers: Some(vec![
                Modifier::Encumbrance(-1),
                Modifier::AllDefenses(1),
            ]),
        },
        RankAbility {
            name: "Armor Expertise+",
            is_magical: false,
            rank: 7,
            description: r"
                The encumbrance reduction increases to 2, and you gain an additional special ability based on the usage class of your body armor.
                \begin{itemize}
                    \item Light: You take no damage from \glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
                        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                    \item Medium: The bonus increases to \plus2.
                    \item Heavy: Your armor's bonus to your damage resistance also applies to your hit points.
                        This includes the multiplier from special materials or magic armor, but does not include any \glossterm{enhancement bonuses} provided by the armor's special effects.
                \end{itemize}
            ",
            modifiers: Some(vec![
                Modifier::AllDefenses(1),
                Modifier::Encumbrance(-1),
            ]),
        },
        RankAbility {
            name: "Weapon Expertise",
            is_magical: false,
            rank: 6,
            description: r"
                While you are wielding a weapon, you gain a \plus1 bonus to your \glossterm{accuracy}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn martial_mastery<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            name: "Martial Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your martial prowess into dangerous attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{blunt force}, \textit{penetrating precision}, or \textit{rip and tear}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn martial \glossterm{maneuvers} from martial combat styles that you have access to.

                You learn two rank 1 martial \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some martial maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Martial Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You learn an additional martial maneuver.
                In addition, you gain access to rank 3 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Martial Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Martial Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional martial maneuver.
                In addition, you gain access to rank 7 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your martial maneuvers.
                For each rank 1 martial maneuver you know, choose one augment from the list below and apply it to that maneuver.
                Augments scale in power with your excess rank which is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 martial maneuvers.
                {
                    \parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who made a \glossterm{strike} against you during the previous round.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this augment to maneuvers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Guarding Maneuver} You gain a bonus to your Armor defense equal to half your excess rank (minimum 1) when you use the maneuver.
                    This is an \abilitytag{Swift} effect, so it protects you from attacks against you during the current phase.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 4 - your excess rank but the strike deals double \glossterm{weapon damage}.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an augment for each of your rank 3 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 martial maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}

// TODO: This archetype has several abilities that are hard to represent numerically
pub fn sentinel<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Protect",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{protect} ability as a \glossterm{free action}.
                \begin{activeability}{Protect}[\abilitytag{Swift}]
                    \rankline
                    Choose yourself or an \glossterm{ally} adjacent to you.
                    The target gains a bonus to its Armor defense this round.
                    If you choose yourself, the bonus is \plus1. Otherwise, the bonus is \plus2.

                    A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty value} 5 Awareness check.
                    While this ability is active, you cannot be affected by other creatures using this ability on you.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Protect+",
            is_magical: false,
            rank: 5,
            description: r"
                The Armor defense bonus increases to \plus3 on an ally, or \plus2 on yourself.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Threatening Influence",
            is_magical: false,
            rank: 2,
            description: r"
                Your \glossterm{enemies} move at half speed while within a \smallarea radius \glossterm{emanation} from you.
                This it does not affect creatures who are moving in a straight line directly towards you.
                It also has no effect on enemies that are able to move through your space freely, such as \trait{incorporeal} or very large creatures.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Threatening Influence+",
            is_magical: false,
            rank: 6,
            description: r"
                The area affected by this ability increases to a \medarea radius \glossterm{emanation} from you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Guarding Strike",
            is_magical: false,
            rank: 3,
            description: r"
                You can use the \textit{guarding strike} ability as a standard action.
                \begin{activeability}{Guarding Strike}
                    \rankline
                    Make a melee \glossterm{strike}.
                    \hit The target is \goaded by you as a \glossterm{condition}.
                    On a \glossterm{critical hit}, the penalty from the condition increases to -4.

                    \rankline
                    \rank{4} You gain a +1 accuracy bonus with the strike.
                    \rank{5} The accuracy bonus increases to +2.
                    \rank{6} The strike deals double \glossterm{weapon damage}.
                    \rank{7} The accuracy bonus increases to +4.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Stalwart Sentinel",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Armor defense, and a \plus1 bonus to vital rolls.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
            ]),
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
    ]
}

pub fn tactician<'a>() -> Vec<RankAbility<'a>> {
    vec![
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
                Your \textit{battle tactics} affect yourself and your \glossterm{allies} who can either see or hear your chosen communication style.

                All \textit{battle tactics} have the \abilitytag{Sustain} (minor) tag, so they last as long as you \glossterm{sustain} them (see \pcref{Sustained Abilities}).
                You cannot sustain multiple battle tactics simultaneously, and any existing \textit{battle tactics} end as soon as you activate another battle tactic.

                {
                    \begin{sustainability}{Break Through}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target gains a \plus2 bonus to \glossterm{accuracy} with the \textit{overrun} and \textit{shove} abilities (see \pcref{Special Combat Abilities}).

                        \rankline
                        \rank{3} The bonus increases to \plus3.
                        \rank{5} The bonus increases to \plus4.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Dogpile}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target gains a \plus2 bonus to \glossterm{accuracy} with the \ability{grapple} and \ability{maintain grapple} abilities (see \pcref{Special Combat Abilities}).

                        \rankline
                        \rank{3} The bonus increases to \plus3.
                        \rank{5} The bonus increases to \plus4.
                        \rank{7} The bonus increases to \plus5.
                    \end{sustainability}

                    \begin{sustainability}{Duck and Cover}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target gains a \plus1 bonus to its Armor defense against ranged \glossterm{strikes}.

                        \rankline
                        \rank{3} The bonus increases to \plus2.
                        \rank{5} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Group Up}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target that is adjacent to at least one other target gains a \plus1 bonus to its Armor defense.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Mental defense.
                        \rank{5} The Mental defense bonus increases to \plus2.
                        \rank{7} The Mental defense bonus increases to \plus3.
                    \end{sustainability}

                    \begin{sustainability}{Hold The Line}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Your \glossterm{enemies} move at half speed while adjacent to any two targets.

                        \rankline
                        \rank{3} The effect persists for an additional five feet of the enemy's movement.
                        \rank{5} The extra length increases to 10 feet.
                        \rank{7} The extra length increases to 15 feet.
                    \end{sustainability}

                    \begin{sustainability}{Keep Moving}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target that ends the \glossterm{movement phase} at least twenty feet away from where it started the round
                            gains a \plus1 bonus to its Armor defense this round.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Reflex defense.
                        \rank{5} The Reflex defense bonus increases to \plus2.
                        \rank{7} The Reflex defense bonus increases to \plus3.
                    \end{sustainability}

                    \begin{sustainability}{Rush}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target gains a \plus5 foot bonus to its land speed during any phase that it takes the \textit{sprint} action.

                        \rankline
                        \rank{3} The speed bonus increases to \plus10 feet.
                        \rank{5} The speed bonus increases to \plus15 feet.
                        \rank{7} The speed bonus increases to \plus20 feet.
                    \end{sustainability}

                    \begin{sustainability}{Stand Your Ground}{\abilitytag{Sustain} (minor)}
                        \rankline
                        Each target that ends the \glossterm{movement phase} without changing its location gains a \plus1 bonus to its Armor defense until its location changes.

                        \rankline
                        \rank{3} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Fortitude defense.
                        \rank{5} The Fortitude defense bonus increases to \plus2.
                        \rank{7} The Fortitude defense bonus increases to \plus3.
                    \end{sustainability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Battle Tactics+",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional battle tactic.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Battle Tactics+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional battle tactic.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Shifting Stance",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to one of the following statistics: \glossterm{accuracy} against adjacent enemies, Armor defense, or \glossterm{vital rolls}.
                As a \glossterm{minor action}, you can change which of these bonuses you gain.
                This ability has the \abilitytag{Swift} tag, so changing your stance affects attacks against you during the current phase.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Shifting Stance+",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Coordinated Assault",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{coordinated assault} ability.
                \begin{activeability}{Coordinated Assault}
                    \rankline
                    You can move up to half your land speed.
                    You can \glossterm{push} one adjacent \glossterm{ally} along to match your movement.
                    Then, you can make a \glossterm{strike}.
                    You gain a +1 \glossterm{accuracy} bonus with the strike for each of your \glossterm{allies} that is adjacent to the target, to a maximum of +3.

                    \rankline
                    \rank{4} If you have at least two \glossterm{allies} adjacent to you, the strike deals double \glossterm{weapon damage}.
                    \rank{5} The strike always deals double weapon damage.
                    \rank{6} If you have at least two \glossterm{allies} adjacent to you, the strike deals triple \glossterm{weapon damage}.
                    \rank{7} The strike always deals triple \glossterm{weapon damage}.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Hybrid Battle Tactics",
            is_magical: false,
            rank: 7,
            description: r"
                You can activate and sustain two different battle tactics simultaneously as part of the same action.
                Bonuses from multiple battle tactics, such as the bonus to Armor defense from the \textit{duck and cover} and \textit{group up} abilities, do not stack.
                However, each creature can benefit from both battle tactics at once.
            ",
            modifiers: None,
        },
    ]
}
