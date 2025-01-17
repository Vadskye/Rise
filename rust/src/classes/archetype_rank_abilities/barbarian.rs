use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Defense};
use crate::creatures::Modifier;
use crate::skills::Skill;

use super::standard_modifiers::{add_hp_scaling, add_standard_maneuver_modifiers};

pub fn battleforged_resilience<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 2,
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
            complexity: 0,
            name: "Battle-Scarred",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{hit points} (see \pcref{Hit Points}).
                In addition, you gain a +1 bonus to your \glossterm{vital rolls} (see \pcref{Vital Wounds}).
            ",
            // HP is handled by add_hp_scaling()
            modifiers: Some(vec![Modifier::VitalRoll(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Battle-Scarred+",
            is_magical: false,
            rank: 6,
            description: r"
                The hit point bonus increases to four times your rank in this archetype.
            ",
            modifiers: None,
        },
        // TODO: This doesn't pay enough of a damage penalty for its incredible defenses. Also it
        // encourages high-defense barbarians, which is weird; barbarians should generally be more
        // low-defense than fighters, but higher survivability.
        RankAbility {
            complexity: 1,
            name: "Resilient Blow",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Resilient Blow}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a melee \glossterm{strike} with 1d4 \glossterm{extra damage}.
                    You also \glossterm{briefly} gain a \plus4 bonus to defenses against damaging attacks.

                    \rankline
                    \rank{4} The extra damage increases to 1d10.
                    \rank{5} The extra damage increases to 3d6.
                    \rank{6} The extra damage increases to 3d10.
                    \rank{7} The extra damage increases to 5d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Primal Resilience",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Limitless Recovery",
            is_magical: false,
            rank: 5,
            description: r"
                You can use the \ability{recover} ability any number of times between short rests.
                In addition, when you use it as a standard action, you only increase your \glossterm{fatigue level} by one.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Unbreakable",
            is_magical: false,
            rank: 7,
            description: r"
                You cannot lose more than 100 hit points per round.
                Any excess damage beyond that point does not reduce your hit points.
                This includes hit point loss below 0 hit points.
                Attacks with special effects, such as inflicting conditions on you, still treat you as if you lost hit points from the attack.
            ",
            modifiers: None,
        },
    ];
    add_hp_scaling(&mut abilities, 2, 6);
    abilities
}

pub fn battlerager<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Rage",
            is_magical: false,
            rank: 1,
            description: r"
                For most barbarians, this represents entering a furious rage.
                Some barbarians instead enter a joyous battle trance or undergo a partial physical transformation into a more fearsome form.
                \begin{sustainability}{Rage}{\atEmotion, \atSustain (free), \atSwift}
                    \abilityusagetime \glossterm{Free action} while not already in a rage.
                    \rankline
                    For the duration of this ability, you gain the following benefits and drawbacks:
                    \begin{itemize}
                        \item You gain a +2 accuracy bonus with \glossterm{mundane} abilities that are not \weapontag{Projectile} strikes.
                        \item You take a \minus2 penalty to your Armor and Reflex defenses.
                        \item You are unaffected by all \glossterm{conditions}.
                        \item You are \enraged.
                    \end{itemize}

                    Because this ability has the \atSwift tag, the defense penalties apply to attacks against you during the current phase.
                \end{sustainability}
            ",
            modifiers: Some(vec![
                Modifier::Accuracy(2),
                Modifier::Defense(Defense::Armor, -2),
                Modifier::Defense(Defense::Reflex, -2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Amplified Anger",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to your \glossterm{mundane power}.
                If your Willpower is 3 or higher, you gain an additional \plus1 bonus.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Aggravated Violence",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Aggravated Violence}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a melee \glossterm{strike}.
                    The strike deals double \glossterm{weapon damage} against any creature that dealt damage to you during the previous round.

                    \rankline
                    \rank{4} You gain a +1 accuracy bonus with the strike.
                    % Note: rank 5 and 6 could flip order; will either be overpowered or underpowered at specifically rank 5
                    \rank{5} The accuracy bonus increases to +2.
                    \rank{6} The strike deals triple weapon damage instead of double weapon damage.
                    \rank{7} The accuracy bonus increases to +4.
                \end{activeability}
            ",
            // This is too inconsistent to add as a generally usable strike
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Primal Brawn",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Strength.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Strength, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Insensible Rage",
            is_magical: false,
            rank: 5,
            description: r"
                During your \ability{rage} ability, you are unaffected by all \glossterm{vital wound} effects except for unconsciousness and death.
                Each vital wound still causes the normal \minus2 penalty to \glossterm{vital rolls}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Amplified Anger+",
            is_magical: false,
            rank: 6,
            description: r"
                The power bonus increases to +2.
                If your Willpower is 6 or higher, you gain an additional \plus1 bonus.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Titanic Rage",
            is_magical: false,
            rank: 7,
            description: r"
                When you use your \textit{rage} ability, you can grow by one \glossterm{size category}, to a maximum of Huge.
                Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
                It also increases your \glossterm{base speed} (see \pcref{Size Categories}).
                Since this is a \glossterm{mundane} ability, it stacks with other size-increasing effects.
            ",
            // TODO: fully represent an increased size category
            modifiers: Some(vec![Modifier::BaseSpeed(10)]),
        },
    ]
}

pub fn outland_savage<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Savage Precision",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a +2 bonus to your \glossterm{brawling accuracy} (see \pcref{Brawling Accuracy}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Savage Precision+",
            is_magical: false,
            rank: 5,
            description: r"
                The accuracy bonus increases to +4.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Outlandish Weaponry",
            is_magical: false,
            rank: 1,
            description: r"
                You can gain proficiency with \glossterm{exotic weapons} at the cost of one \glossterm{insight point} per weapon group (see \pcref{Exotic Weapons}).
                You must already be proficient with all non-exotic weapons from that weapon group.
            ",
            // This is an abstraction of the effect of exotic weapons being better
            modifiers: Some(vec![Modifier::ExtraDamage(DamageDice::new(0))]),
        },
        RankAbility {
            complexity: 1,
            name: "Versatile Savagery",
            is_magical: false,
            rank: 2,
            description: r"
                Choose one of the following \glossterm{weapon tags} (see \pcref{Weapon Tags}): \weapontag{Clinch}, \weapontag{Maneuverable}, \weapontag{Mounted}, or \weapontag{Thrown} (30/60).
                You may treat all non-projectile weapons you use as if they had the chosen weapon tag.
                If you choose the Thrown weapon tag, it does not affect your \glossterm{natural weapons}.
                Whenever your rank in this archetype increases, you can change which weapon tag you chose with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Savage Rush",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Savage Rush}
                    \abilityusagetime Standard action.
                    \rankline
                    Move up to your movement speed.
                    During this movement, you can pass through spaces occupied by your \glossterm{enemies} as if they were unoccupied.
                    At the end of this movement, you may make a melee \glossterm{strike}.

                    \rankline
                    \rank{4} You can make a second melee strike at any point during your movement.
                    You cannot include the same creature or object as a target of both strikes.
                    \rank{5} Your \glossterm{weapon damage} with both strikes is doubled.
                    \rank{6} You gain a \plus1 accuracy bonus with both strikes.
                    \rank{7} Your weapon damage with both strikes is tripled.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Primal Agility",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Dexterity.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Endless Rush",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{land speed}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Primal Rush",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \textit{sprint} ability during the \glossterm{movement phase} without increasing your \glossterm{fatigue level}.
                After you use this ability, you \glossterm{briefly} cannot use it again.
            ",
            modifiers: None,
        },
    ]
}

pub fn primal_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Primal Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can channel your primal energy into ferocious attacks.
                You gain access to one of the following \glossterm{combat styles}: \combatstyle{dirty fighting}, \combatstyle{herald of war}, or \combatstyle{unbreakable defense}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn primal \glossterm{maneuvers} from primal combat styles that you have access to.

                You learn two rank 1 primal \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some primal maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
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
            complexity: 0,
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your primal maneuvers.
                For each rank 1 primal maneuver you know, choose one augment from the list below and apply it to that maneuver.
                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 primal maneuvers.
                {
                    \parhead{Devastating Maneuver} The maneuver deals double damage, but you take an accuracy penalty equal to 4 - your excess rank.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You cannot apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are at less than their maximum \glossterm{hit points}.

                    \parhead{Mighty Maneuver} All strikes from the maneuver deal double \glossterm{weapon damage}, but you take an accuracy penalty equal to 4 - your excess rank.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Reckless Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you \glossterm{briefly} take a \minus4 penalty to your defenses after you use the maneuver.
                    You can only apply this augment to maneuvers which cause you to make a melee \glossterm{strike}.
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
                You can also choose an augment for each of your rank 3 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 primal maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}

pub fn totemist<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Totem Animal",
            is_magical: false,
            rank: 1,
            description: r"
                You choose a totem animal that represents you.
                Each totem animal grants you abilities that are associated with that animal.

                \subcf{Bear} You add half your Constitution to your \glossterm{mundane power}.

                \subcf{Crocodile} Once per round, when you damage a creature with a melee \glossterm{strike}, you can use this ability to \glossterm{push} it into any space adjacent to you.
                This is a \abilitytag{Size-Based} ability, so it has no effect on creatures that are two or more size categories larger than you.

                \subcf{Eagle} You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).

                \subcf{Lion} You add half your Willpower to your \glossterm{mundane power}.

                \subcf{Shark} You gain a \plus2 \glossterm{accuracy} bonus against creatures within \shortrange of you that are below their maximum hit points.
            ",
            // For convenience in balancing, assume lion totem instead of representing each totem
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            // Varies between animal
            complexity: 1,
            name: "Totem Animal+",
            is_magical: false,
            rank: 4,
            description: r"
                The benefit from your \textit{totem animal} ability improves.

                \subcf{Bear} You add half your Constitution to Climb, Swim, and Strength checks.

                \subcf{Crocodile} If the creature loses \glossterm{hit points} from the strike, you can also knock it \prone or enter a grapple with it (see \pcref{Grappling}).
                This is a \abilitytag{Size-Based} ability.

                \subcf{Eagle} You gain a \plus1 bonus to your Perception.

                \subcf{Lion} You add half your Willpower to your accuracy with \atAuditory attacks.

                \subcf{Shark} The accuracy bonus increases to \plus3.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Totem Animal++",
            is_magical: false,
            rank: 7,
            description: r"
                The benefit from your \textit{totem animal} ability improves further.

                \subcf{Bear} You gain a \plus1 bonus to your Constitution.

                \subcf{Crocodile} If your attack hits the target's Fortitude defense, it does not have to lose hit points for you to knock it prone or grapple it.

                % Too much?
                \subcf{Eagle} The Perception bonus increases to \plus2.

                \subcf{Lion} You gain a \plus1 bonus to your Willpower.

                \subcf{Shark} The accuracy bonus increases to \plus4.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Feral Frenzy",
            is_magical: false,
            rank: 3,
            // TODO: run this through the spreadsheet
            description: r"
                \begin{activeability}{Feral Frenzy}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a melee or thrown \glossterm{strike}.
                    If you used this ability last round, you can make an additional melee or thrown strike.

                    \rankline
                    \rank{4} You gain a +2 accuracy bonus with the first strike you make with this ability each round.
                    \rank{5} Your \glossterm{weapon damage} is doubled with the second strike you make with this ability each round.
                    \rank{6} The accuracy bonus applies to both strikes.
                    \rank{7} Your weapon damage is doubled with both strikes.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Animal Ferocity",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 accuracy bonus.
            ",
            // TODO: figure out how to represent this
            modifiers: None,
        },
        RankAbility {
            // Varies between animals
            complexity: 1,
            name: "Animal Instincts",
            is_magical: false,
            rank: 2,
            description: r"
                You gain benefits based on your totem animal:
                \begin{raggeditemize}
                    \itemhead{Bear} \plus2 Endurance and \plus1 to \glossterm{vital rolls}.
                    \itemhead{Crocodile} \plus2 Stealth and you can hold your breath ten times as long as normal (see \pcref{Endurance}).
                    \itemhead{Eagle} \plus2 Awareness and \plus10 feet to your maximum horizontal jump distance (see \pcref{Jumping}).
                    \itemhead{Lion} \plus2 Intimidate and \plus10 feet to your land speed while you are affected by the \ability{sprint} ability.
                        This speed bonus is doubled as normal for that ability.
                    \itemhead{Shark} \plus2 Swim and you gain the \trait{scent} ability (see \pcref{Tracking}).
                \end{raggeditemize}
            ",
            modifiers: Some(vec![
                // Arbitrarily stick with Lion
                Modifier::Skill(Skill::Intimidate, 2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Animal Instincts+",
            is_magical: false,
            rank: 6,
            description: r"
                The benefits based on your totem animal improve:
                \begin{raggeditemize}
                    \itemhead{Bear} \plus4 Endurance and \plus2 to \glossterm{vital rolls}.
                    \itemhead{Crocodile} \plus4 Stealth and you can hold your breath indefinitely, though you cannot rest while holding your breath.
                    \itemhead{Eagle} \plus4 Awareness and \plus20 feet to your maximum horizontal jump distance.
                    \itemhead{Lion} \plus4 Intimidate and the land speed bonus applies at all times, not only while sprinting.
                    \itemhead{Shark} \plus4 Swim, \plus2 Survival, and \plus2 Awareness.
                \end{raggeditemize}
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::CreatureHandling, 2),
                // Arbitrarily stick with Lion
                Modifier::Skill(Skill::Intimidate, 2),
            ]),
        },
    ]
}
