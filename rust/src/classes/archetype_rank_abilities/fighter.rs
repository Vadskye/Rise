use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

pub fn combat_discipline<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Disciplined Reaction",
            is_magical: false,
            rank: 1,
            description: r"
                You halve all penalties to your \glossterm{accuracy}, \glossterm{defenses}, and \glossterm{speed} from temporary debuffs on you.
                This includes the defense and speed penalties from being \slowed, the accuracy and Mental defense penalty from being \frightened, and so on.
                It does not include permanent effects, such as if you are intrinsically \vulnerable to attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Enduring Discipline",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to your Mental defense and \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Mental, 2),
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
                Modifier::Defense(Defense::Mental, 2),
                Modifier::Resource(Resource::FatigueTolerance, 2),
            ]),
        },
        RankAbility {
            complexity: 2,
            name: "Disciplined Blow",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Disciplined Blow}{Standard action}
                    \rankline
                    Make a \glossterm{strike} that deals \glossterm{extra damage} equal to half your \glossterm{power}.
                    You cannot get a \glossterm{critical hit} with this strike.
                    \miss Half damage.

                    \rankline
                    \rank{4} The strike deals double \glossterm{weapon damage}.
                    \rank{5} The extra damage increases to be equal to your power.
                    \rank{6} The strike deals quadruple \glossterm{weapon damage}.
                    \rank{7} The extra damage increases to 1d6 per 2 power.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Cleansing Discipline",
            is_magical: false,
            rank: 4,
            description: r"
                \begin{activeability}{Cleansing Discipline}{Standard action}
                    \abilitytags \abilitytag{Swift}
                    \abilitycost You can increase your \glossterm{fatigue level} by one to use this ability as a \glossterm{minor action}.
                    \rankline
                    Remove all \glossterm{conditions} affecting you.
                    Because this ability has the \abilitytag{Swift} tag, the removed conditions do not affect you during the current phase.
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
            name: "Armor Expertise",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a special ability based on the \glossterm{usage class} of your body armor.
                \begin{raggeditemize}
                    \item Light: You gain a \plus10 foot bonus to your \glossterm{speed}.
                    \item Medium: You add your full Dexterity to your Armor defense, rather than only half your Dexterity like normal for medium armor.
                        However, the maximum Armor defense bonus you can gain from Dexterity is \plus4.
                        Using a medium armor shield also does not reduce your Dexterity bonus to Armor defense, but using a heavy armor shield still halves it.
                    \item Heavy: You gain a \plus1 bonus to your Armor, Brawn, and Fortitude defenses.
                \end{raggeditemize}
            ",
            // Assume light armor, since it's the easiest to represent
            modifiers: Some(vec![Modifier::BaseSpeed(10)]),
        },
        RankAbility {
            complexity: 1,
            name: "Armed and Ready",
            is_magical: false,
            rank: 2,
            description: r"
                Once per round, you can draw or sheathe any non-shield weapon as a \glossterm{free action}.
                This does not count against your normal one free action \glossterm{object manipulation} per round (see \pcref{Manipulating Objects}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Adaptive Blow",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Adaptive Blow}{Standard action}
                    \rankline
                    Make a \glossterm{strike} that deals double \glossterm{weapon damage}.
                    In addition, choose one of the following tags: \abilitytag{Keen}, \abilitytag{Impact}, or \abilitytag{Subdual} (see \pcref{Ability Tags}).
                    If the strike is a \glossterm{melee} strike, you can alternatively choose the \weapontag{Long} or \weapontag{Sweeping} (1) \glossterm{weapon tags}.
                    The strike gains the benefit of your chosen tag if it did not already have that tag.

                    \rankline
                    \rank{4} The strike deals triple weapon damage.
                    \rank{5} The strike deals \glossterm{extra damage} equal to half your power.
                    \rank{6} The strike deals five times weapon damage.
                    \rank{7} The strike deals eight times weapon damage.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Armored Core",
            is_magical: false,
            rank: 4,
            description: r"
                While wearing body armor, you gain a \plus1 bonus to your Armor defense.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 3,
            name: "Equipment Efficiency",
            is_magical: false,
            rank: 5,
            description: r"
                Whenever you draw a weapon or don a shield, you can attune to it as a \glossterm{free action} (see \pcref{Item Attunement}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Weapon Precision",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus1 \glossterm{accuracy} bonus with \glossterm{strikes}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Armor Expertise+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain an additional special ability based on the usage class of your body armor.
                \begin{raggeditemize}
                    \item Light: You take no damage from \glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
                        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                    \item Medium: You gain a \plus2 bonus to your Brawn, Fortitude, and Reflex defenses, up to a maximum equal to your Armor defense.
                    \item Heavy: You double your armor's \glossterm{durability} bonus.
                \end{raggeditemize}
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
                You gain access to any combat style of your choice (see \pcref{Combat Styles}).
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
                You gain access to rank 3 martial maneuvers.
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

                    \parhead{Mighty Maneuver} You take a \minus1 accuracy penalty, but you deal \glossterm{extra damage} equal to twice your excess rank.

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
            complexity: 0,
            name: "Bulwark",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to all defenses.
            ",
            modifiers: Some(vec![Modifier::AllDefenses(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Specialized Bulwark",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 bonus to your Armor defense and one other defense of your choice.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]), // And one other defense of choice
        },
        RankAbility {
            complexity: 2,
            name: "Threatening Influence",
            is_magical: false,
            rank: 2,
            description: r"
                Your Huge or smaller \glossterm{enemies} move at half speed while within a \smallarea radius \glossterm{emanation} from you.
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
                The area affected by this ability increases to a \medarea radius \glossterm{emanation} from you, and the maximum size category increases to Gargantuan.
            ",
            modifiers: None,
        },
        // Goaded as a condition is 2.6 EA, and a r3 strike should only give 0.8 EA. The double
        // attack is kind of enough, plus the class ability benefit.
        RankAbility {
            complexity: 2,
            name: "Sentinel's Challenge",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Sentinel's Challenge}{Standard action}
                    \abilitytags \abilitytag{Emotion}
                    \rankline
                    Make a \glossterm{strike}.
                    \hit The target is \glossterm{briefly} \goaded by you.
                    If it was already briefly goaded by you, it becomes goaded by you until it finishes a \glossterm{short rest}.

                    % TODO: boring scaling, needs math in the spreadsheet
                    \rankline
                    \rank{4} You gain a \plus1 accuracy bonus with the strike.
                    \rank{5} The strike deals double damage.
                    \rank{6} The accuracy bonus increases to \plus2.
                    \rank{7} The strike deals triple damage.
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
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Demanding Challenger",
            is_magical: false,
            rank: 7,
            description: r"
                Each creature that is suffering penalties for being \goaded by you takes an additional \minus2 \glossterm{accuracy} penalty against creatures other than you.
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
                Your \textit{battle tactics} can affect yourself and your \glossterm{allies} who can either see or hear your efforts.
                Most battle tactics will only affect a limited number of targets.
                You choose the targets whenever you initiate or sustain the battle tactic.

                All \textit{battle tactics} have the \abilitytag{Sustain} (free) tag, so they last as long as you \glossterm{sustain} them (see \pcref{Sustained Abilities}).
                You cannot sustain multiple battle tactics simultaneously, and any existing \textit{battle tactics} end as soon as you activate another battle tactic.

                {
                    \begin{sustainability}{Brace Yourselves}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Two targets gain a \plus2 bonus to their Brawn defense against \atBrawling abilities.

                        \rankline
                        \rank{4} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Dogpile}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Two targets gain a \plus2 accuracy bonus with the \ability{grapple} and \ability{maintain grapple} abilities (see \pcref{Universal Combat Abilities}).

                        \rankline
                        \rank{4} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{sustainability}

                    \begin{sustainability}{Duck and Cover}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Choose two targets.
                        Each target gains a \plus1 bonus to its defenses against ranged \glossterm{strikes}.

                        \rankline
                        \rank{4} The bonus also applies against any attacks that a target has \glossterm{cover} from.
                        \rank{7} The bonus increases to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Follow My Lead}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}                        
                        \rankline
                        One adjacent \glossterm{ally} gains a \plus1 accuracy bonus against any creature that you hit with a \glossterm{strike} during the current round.

                        \rankline
                        \rank{4} The ally can be within \shortrange.
                        \rank{7} You can choose two allies instead of one.
                    \end{sustainability}

                    \begin{sustainability}{Group Up}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Two targets each gain a \plus1 bonus to their Armor defense if they are adjacent to each other.

                        \rankline
                        \rank{4} Both targets also gain a \plus1 bonus to their Mental defense if they are adjacent to each other.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Hold The Line}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Choose two targets.
                        Your \glossterm{enemies} move at half speed while adjacent to either of those targets.

                        \rankline
                        \rank{4} The effect persists for an additional five feet of the enemy's movement after they stop being adjacent to either targets.
                        \rank{7} The extra distance increases to 10 feet.
                    \end{sustainability}

                    \begin{sustainability}{Keep Moving}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Choose two targets.
                        Each target that ended the \glossterm{movement phase} at least twenty feet away from where it started the round
                            gains a \plus1 bonus to its Armor defense this round.

                        \rankline
                        \rank{4} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Reflex defense.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}

                    \begin{sustainability}{Lead From the Front}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        One \glossterm{ally} gains a \plus1 bonus to all defenses against \glossterm{enemies} that you are adjacent to.

                        \rankline
                        \rank{4} The bonus also applies against \glossterm{enemies} within 15 feet of you.
                        \rank{7} You can choose a second ally.
                    \end{sustainability}

                    \begin{sustainability}{Rush}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Each target gains a \plus5 foot bonus to its \glossterm{speed} during any phase that it uses the \textit{sprint} ability.
                        This bonus is doubled as normal by the sprint ability.

                        \rankline
                        \rank{4} The speed bonus increases to \plus10 feet.
                        \rank{7} The speed bonus increases to \plus15 feet.
                    \end{sustainability}

                    \begin{sustainability}{Stand Your Ground}{\glossterm{Minor action}}
                        \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                        \rankline
                        Choose two targets.
                        Each target that ends the \glossterm{movement phase} without changing its location gains a \plus1 bonus to its Armor defense until its location changes.

                        \rankline
                        \rank{4} Each target affected by the Armor defense bonus also gains a \plus1 bonus to its Brawn defense.
                        \rank{7} The bonuses increase to \plus2.
                    \end{sustainability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Reposition",
            is_magical: false,
            rank: 2,
            description: r"
                If you have \glossterm{speed} remaining after the \glossterm{movement phase}, you may use some of that movement during the \glossterm{action phase} as a \glossterm{free action} once per round.
                You cannot carry over more than five feet of movement in this way.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Coordinated Charge",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Coordinated Charge}{Standard action}
                    \rankline
                    You can move up to half your \glossterm{speed}.
                    You can \glossterm{push} one adjacent \glossterm{ally} along to match your movement.
                    After you stop moving, you can make a melee \glossterm{strike}.
                    You gain a \plus2 \glossterm{accuracy} bonus with the strike for each of your \glossterm{allies} that is adjacent to the target, to a maximum of \plus4.
                    

                    \rankline
                    \rank{4} The strike deals double \glossterm{weapon damage}.
                    \rank{5} The strike deals \glossterm{extra damage} equal to half your \glossterm{power}.
                    \rank{6} The strike deals triple weapon damage.
                    \rank{7} The extra damage increases to be equal to your \glossterm{power}, and you can move up to your full speed.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Shifting Stance",
            is_magical: false,
            rank: 4,
            description: r"
                \begin{sustainability}{Shifting Stance}{\glossterm{Minor action}}
                    \abilitytags \abilitytag{Sustain} (free), \abilitytag{Swift}
                    \rankline
                    You gain one of the following benefits:
                    \begin{raggeditemize}
                        \item Offense: You gain a \plus1 accuracy bonus against adjacent \glossterm{enemies}.
                        \item Defense: You gain a \plus1 bonus to your defenses.
                        \item Support: One \glossterm{ally} adjacent to you gains a \plus1 accuracy bonus.
                    \end{raggeditemize}

                    This effect immediately ends if you use this ability again.
                \end{sustainability}
            ",
            // Arbitrarily assume offense
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Strategist",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 bonus to your Intelligence.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Intelligence, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Reposition+",
            is_magical: false,
            rank: 6,
            description: r"
                The maximum movement speed that you can carry over with this ability increases to fifteen feet.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Shifting Stance+",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus for each stance increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}
