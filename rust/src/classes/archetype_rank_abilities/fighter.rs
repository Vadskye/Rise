use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn combat_discipline<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Disciplined Reaction",
            is_magical: false,
            rank: 1,
            description: r"
                Whenever you gain a \glossterm{condition}, you \glossterm{briefly} ignore its effects.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Enduring Discipline",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to the Endurance skill and to your \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Resource(Resource::FatigueTolerance, 2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Enduring Discipline+",
            is_magical: false,
            rank: 5,
            description: r"
                The bonuses increase to \plus4.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Resource(Resource::FatigueTolerance, 2),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Disciplined Blow",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Disciplined Blow}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike} that deals \glossterm{extra damage} equal to half your \glossterm{power}.
                    You cannot get a \glossterm{critical hit} with this strike.
                    \miss Half damage.

                    \rankline
                    \rank{4} The extra damage increases to 1d6 \add half your power.
                    \rank{5} The extra damage increases to 1d6 \add your power.
                    \rank{6} The extra damage increases to 3d6 \add your power.
                    \rank{7} The \glossterm{weapon damage} is doubled.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Cleansing Discipline",
            is_magical: false,
            rank: 4,
            description: r"
                \begin{activeability}{Cleansing Discipline}[\abilitytag{Swift}]
                    \abilityusagetime Standard action. You can increase your \glossterm{fatigue level} by one to use this ability as a \glossterm{minor action} instead.
                    \rankline
                    Remove all \glossterm{conditions} affecting you.
                    Because this ability has the \abilitytag{Swift} tag, the removed condition does not affect you during the current phase.
                    In addition, you \glossterm{briefly} become immune to all conditions.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Vital Discipline",
            is_magical: false,
            rank: 6,
            description: r"
                You \glossterm{briefly} ignore the vital wound effect of each vital wound you gain.
                While a vital wound is delayed in this way, you do not suffer any effects from its specific vital wound effect, but you still consider it when calculating your penalties to \glossterm{vital rolls}.
            ",
            modifiers: None,
        },
        RankAbility {
            // This retroactively removes some of the complexity of the earlier abilities
            complexity: 0,
            name: "True Discipline",
            is_magical: false,
            rank: 7,
            description: r"
                You are immune to \glossterm{conditions}.
            ",
            modifiers: None,
        },
    ]
}

pub fn equipment_training<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Exotic Weapon Training",
            is_magical: false,
            rank: 1,
            description: r"
                You can gain proficiency with \glossterm{exotic weapons} at the cost of one \glossterm{insight point} per weapon group (see \pcref{Exotic Weapons}).
                You must already be proficient with all non-exotic weapons from that weapon group.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Weapon Training",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Weapon Training}
                    \abilityusagetime One hour of training with a weapon.
                    \rankline
                    You become proficient with the specific item you trained with.
                    This does not grant you proficiency with any other similar weapons.

                    If you would already be proficient with that weapon without this ability, you gain a \plus1 accuracy bonus with it.
                    If the weapon is an exotic weapon that you are not already proficient with, you take a \minus1 accuracy penalty with it.

                    This ability's effect is permanent.
                \end{activeability}
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 2,
            name: "Weapon Training+",
            is_magical: false,
            rank: 5,
            description: r"
                Whenever you use your \textit{weapon training} ability, you can choose one of the following weapon tags: \weapontag{Impact}, \weapontag{Keen}, \weapontag{Long}, \weapontag{Parrying}, \weapontag{Resonating}, or \weapontag{Sweeping} (1).
                You treat the weapon you trained with as if it had the chosen weapon tag.

                If you use this ability to train with the same weapon again, you can change its weapon tag, but it loses the previous weapon tag.
                If you would add Sweeping (1) to a weapon that already has the Sweeping weapon tag, you increase its Sweeping value by one instead.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Armor Expertise",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a special ability based on the \glossterm{usage class} of your body armor.
                \begin{itemize}
                    \item Light: You gain a \plus10 foot bonus to your land speed.
                    \item Medium: You add your full Dexterity to your Armor defense, rather than only half your Dexterity like normal for medium armor.
                        However, the maximum Armor defense bonus you can gain from Dexterity is \plus4.
                        Using a medium armor shield also does not reduce your Dexterity bonus to Armor defense, but using a heavy armor shield still halves it.
                    \item Heavy: You gain a \plus1 bonus to your Armor, Fortitude, and Mental defenses.
                \end{itemize}
            ",
            // Assume light armor, since it's the easiest to represent
            modifiers: Some(vec![
                Modifier::BaseSpeed(10),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Armored Crush",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Armored Crush}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike} with a \minus1 accuracy penalty.
                    If your Armor defense is higher than the target's Armor defense against this attack, the strike deals double \glossterm{weapon damage}.
                    Otherwise, the strike deals \glossterm{extra damage} equal to half your \glossterm{power}.

                    \rankline
                    \rank{4} The accuracy penalty is removed.
                    \rank{5} You gain a \plus2 accuracy bonus with the strike.
                    \rank{6} If your Armor defense is higher than the target's Armor defense, the strike deals triple weapon damage. Otherwise, the extra damage increases to be equal to your power.
                    \rank{7} If your Armor defense is higher than the target's Armor defense, the strike deals quadruple weapon damage. Otherwise, the extra damage increases to 2d8 \add your \glossterm{power}.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Equipment Efficiency",
            is_magical: false,
            rank: 4,
            description: r"
                You gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic weapons and magic armor.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 2,
            name: "Equipment Efficiency+",
            is_magical: false,
            rank: 6,
            description: r"
                You can use the \ability{item attunement} ability to attune to weapons and armor as a \glossterm{minor action} (see \pcref{Item Attunement}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Armor Expertise+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain an additional special ability based on the usage class of your body armor.
                \begin{itemize}
                    \item Light: You take no damage from \glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
                        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                    \item Medium: You gain a \plus2 bonus to your Fortitude, Reflex, and Mental defenses, up to a maximum equal to your Armor defense.
                    \item Heavy: Your armor's bonus to your maximum damage resistance also applies to your maximum hit points.
                        This includes the multiplier from special materials or magic armor, but does not include any \glossterm{enhancement bonuses} provided by the armor's special effects.
                \end{itemize}
            ",
            modifiers: None,
        },
    ]
}

pub fn martial_mastery<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Martial Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your martial prowess into dangerous attacks.
                You gain access to any two combat styles of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn martial \glossterm{maneuvers} from martial combat styles that you have access to.

                You learn two rank 1 martial \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some martial maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
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
            complexity: 0,
            name: "Martial Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Martial Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your martial maneuvers.
                For each rank 1 martial maneuver you know, choose one augment from the list below and apply it to that maneuver.
                The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
                However, you can learn the same maneuver more than once and apply different augments to each version.

                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 martial maneuvers.
                {
                    \parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who made a \glossterm{strike} against you during the previous round.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this augment to maneuvers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Defensive Maneuver} You gain a bonus to your Armor defense equal to half your excess rank (minimum 1) when you use the maneuver.
                    This is an \abilitytag{Swift} effect, so it protects you from attacks against you during the current phase.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Mighty Maneuver} You deal \glossterm{extra damage} equal to your excess rank.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an augment for each of your rank 3 martial maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
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
            complexity: 2,
            name: "Protect",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Protect}[\abilitytag{Swift}]
                    \abilityusagetime \glossterm{Free action} once per round.
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
            complexity: 0,
            name: "Protect+",
            is_magical: false,
            rank: 5,
            description: r"
                The Armor defense bonus increases to \plus3 on an ally, or \plus2 on yourself.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Threatening Influence",
            is_magical: false,
            rank: 2,
            description: r"
                Your \glossterm{enemies} move at half speed while within a \smallarea radius \glossterm{emanation} from you.
                This does not affect creatures who are moving in a straight line directly towards you.
                It also has no effect on enemies that are able to move through your space freely, such as \trait{incorporeal} or very large creatures.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Threatening Influence+",
            is_magical: false,
            rank: 6,
            description: r"
                The area affected by this ability increases to a \medarea radius \glossterm{emanation} from you.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Sentinel's Challenge",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Sentinel's Challenge}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike}.
                    If the target takes damage, it becomes \goaded by you as a \glossterm{condition}.

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
            complexity: 0,
            name: "Stalwart Sentinel",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Constitution, 1),
            ]),
        },
        RankAbility {
            complexity: 1,
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
            complexity: 3,
            name: "Battle Tactics",
            is_magical: false,
            rank: 1,
            description: r"
                You can lead your allies using tactics appropriate for the situation.
                Choose two battle tactics from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{battle tactic} per \glossterm{insight point}.

                You can initiate a \textit{battle tactic} as a \glossterm{minor action}.
                When you initiate a battle tactic, you choose whether to use visual cues like gestures, auditory cues like shouts, or both to communicate your tactic with your allies.
                Your \textit{battle tactics} affect yourself and your \glossterm{allies} who can either see or hear your efforts.

                All \textit{battle tactics} have the \abilitytag{Sustain} (free) tag, so they last as long as you \glossterm{sustain} them (see \pcref{Sustained Abilities}).
                You cannot sustain multiple battle tactics simultaneously, and any existing \textit{battle tactics} end as soon as you activate another battle tactic.

                {
                    \begin{sustainability}{Break Through}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target gains a \plus2 accuracy bonus with the \textit{overrun} and \textit{shove} abilities (see \pcref{Special Combat Abilities}).

                        \rankline
                        \rank{4} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Dogpile}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target gains a \plus2 accuracy bonus with the \ability{grapple} and \ability{maintain grapple} abilities (see \pcref{Special Combat Abilities}).

                        \rankline
                        \rank{4} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Duck and Cover}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target gains a \plus1 bonus to its Armor defense against ranged \glossterm{strikes}.

                        \rankline
                        \rank{4} The bonus also applies against any attacks that a target has \glossterm{cover} from.
                        \rank{7} The bonus increases to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Group Up}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target that is adjacent to at least one other target gains a \plus1 bonus to its Armor defense.

                        \rankline
                        \rank{4} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Mental defense.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Hold The Line}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Your \glossterm{enemies} move at half speed while adjacent to any two targets.

                        \rankline
                        \rank{4} The effect persists for an additional five feet of the enemy's movement after they stop being adjacent to two targets.
                        \rank{7} The extra length increases to 10 feet.
                    \end{sustainability}

                    \begin{sustainability}{Keep Moving}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target that ends the \glossterm{movement phase} at least twenty feet away from where it started the round
                            gains a \plus1 bonus to its Armor defense this round.

                        \rankline
                        \rank{4} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Reflex defense.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Lead From the Front}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target other than you gains a \plus1 accuracy bonus against creatures that you are adjacent to.

                        \rankline
                        \rank{4} The bonus also applies against creatures within \shortrange of you.
                        \rank{7} The bonus increases to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Rush}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target gains a \plus5 foot bonus to its land speed during any phase that it uses the \textit{sprint} ability.
                        This bonus is doubled as normal by the sprint ability.

                        \rankline
                        \rank{4} The speed bonus increases to \plus10 feet.
                        \rank{7} The speed bonus increases to \plus15 feet.
                    \end{sustainability}

                    \begin{sustainability}{Stand Your Ground}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Each target that ends the \glossterm{movement phase} without changing its location gains a \plus1 bonus to its Armor defense until its location changes.

                        \rankline
                        \rank{4} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Fortitude defense.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Battle Tactics+",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional battle tactic.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Shifting Stance",
            is_magical: false,
            rank: 2,
            description: r"
                \begin{sustainability}{Shifting Stance}{\abilitytag{Sustain} (free), \abilitytag{Swift}}
                    \abilityusagetime \glossterm{Minor action}.
                    \rankline
                    You gain one of the following benefits:
                    \begin{itemize}
                        \item Offense: You gain a \plus1 accuracy bonus against adjacent enemies.
                        \item Defense: You gain a \plus1 bonus to your Armor defense.
                        \item Support: One adjacent \glossterm{ally} gains a \plus1 accuracy bonus.
                    \end{itemize}

                    This effect immediately ends if you use this ability again.
                \end{sustainability}
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Shifting Stance+",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus for each stance increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Coordinated Charge",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Coordinated Charge}
                    \abilityusagetime Standard action.
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
            complexity: 2,
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
