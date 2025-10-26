use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Defense, MovementMode};
use crate::creatures::Modifier;
use crate::skills::Skill;

use super::standard_modifiers::add_standard_maneuver_modifiers;

pub fn battleforged_resilience<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Second Wind",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Second Wind}{\glossterm{Minor action}}
                    \abilitytags \atSwift
                    \abilitycost Two \glossterm{fatigue levels}, and you cannot use this ability again until you finish a \glossterm{short rest}.
                    \rankline
                    You regain half of your maximum \glossterm{hit points}.
                \end{activeability}
            ",
            modifiers: None,
        },
        // A normal rank 2 ability would give +3 durability. This gives +2HP for +4 IP.
        RankAbility {
            complexity: 0,
            name: "Battle-Scarred",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus4 bonus to your \glossterm{durability} (see \pcref{Durability}).
                However, you also increase your \glossterm{injury point} by 4.
            ",
            modifiers: None,
        },
        // A normal rank 6 ability would give +5 durability. This gives +18 HP for +18 IP.
        RankAbility {
            complexity: 0,
            name: "Battle-Scarred+",
            is_magical: false,
            rank: 6,
            description: r"
                The durability bonus increases to \plus8, and the injury point bonus increases to 20.
            ",
            modifiers: None,
        },
        // Half HP damage is roughly half as effective as half damage, so 0.4 EA.
        // A maneuver can get 0.4 EA buff on hit, so this class feature can give a 0.4 EA buff
        // regardless of the hit.
        RankAbility {
            complexity: 2,
            name: "Resilient Blow",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Resilient Blow}{Standard action}
                    \abilitytags \atSwift (see text)
                    \rankline
                    Make a melee \glossterm{strike}.
                    In addition, whenever you would reduce your \glossterm{hit points} below your \glossterm{injury point} this round, you lose half that many hit points instead (minimum 1).
                    This effect is \atSwift, but the strike is not.

                    \rankline
                    \rank{4} You gain a \plus1 accuracy bonus with the strike.
                    \rank{5} If you not \glossterm{injured}, the strike deals double damage.
                    \rank{6} The strike always deals double damage.
                    \rank{7} The strike deals triple damage instead of double damage.
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
                You can use the \ability{recover} and \ability{second wind} abilities any number of times between short rests.
                In addition, when you use the \ability{recover} ability, you can also remove a \glossterm{vital wound}.
                When you do, you increase your \glossterm{fatigue level} by two.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Unbreakable",
            is_magical: false,
            rank: 7,
            description: r"
                Your hit points cannot decrease by more than 100 during each round.
                This includes hit point loss below 0 hit points.
                Any excess damage beyond that point does not reduce your hit points, but it does offset any healing you receive during the same round.
                Attacks with special effects, such as inflicting conditions on you, still treat you as if you lost hit points from the attack.
            ",
            modifiers: None,
        },
    ]
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
                \begin{sustainability}{Rage}{\glossterm{Free action}}
                    \abilitytags \atEmotion, \atSustain (free), \atSwift
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
                    For the duration of this ability, you gain the following benefits and drawbacks:
                    \begin{raggeditemize}
                        \item You gain a \plus2 accuracy bonus with \glossterm{mundane} abilities that are not \weapontag{Projectile} strikes.
                        \item You take a \minus2 penalty to your Armor and Reflex defenses.
                        \item You are \enraged.
                    \end{raggeditemize}

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
            complexity: 2,
            name: "Aggravated Violence",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Aggravated Violence}{Standard action}
                    \rankline
                    Make a melee \glossterm{strike}.
                    The strike deals double damage against any creature that dealt damage to you during the previous round.

                    \rankline
                    \rank{4} You gain a \plus1 accuracy bonus with the strike.
                    \rank{5} The strike deals double \glossterm{weapon damage}.
                    \rank{6} The strike deals triple \glossterm{weapon damage}.
                    \rank{7} If the strike would deal double damage, it deals triple damage instead.
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
                The power bonus increases to \plus2.
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
                When you use your \ability{rage} ability, you can grow by one \glossterm{size category}, to a maximum of Huge.
                Increasing your size gives you a \plus1 bonus to Strength for the purpose of determining your \glossterm{weight limits}, a \plus1 bonus to your Brawn defense, a \minus1 penalty to your Reflex defense, and a \minus4 penalty to the Stealth skill.
                It also increases your \glossterm{base speed} (see \pcref{Size Categories}).
                Since this is a \glossterm{mundane} ability, it stacks with other size-increasing effects (see \pcref{Stacking Rules}).
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
            complexity: 0,
            name: "Savage Precision",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to your \glossterm{brawling accuracy} (see \pcref{Brawling Accuracy}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Outlandish Movement",
            is_magical: false,
            rank: 2,
            description: r"
                You gain your choice of one of the following benefits:
                \begin{raggeditemize}
                    \item Climb: A \glossterm{climb speed} 10 feet slower than your \glossterm{base speed}.
                    \item Jump: A \plus10 foot bonus to your maximum horizontal jump distance.
                    \item Swim: A \glossterm{swim speed} 10 feet slower than your \glossterm{base speed}.
                \end{raggeditemize}

                You can invest up to two additional \glossterm{insight points} into this ability.
                For each insight point, you can choose a different one of these benefits.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            complexity: 2,
            name: "Savage Rush",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Savage Rush}{Standard action}
                    \rankline
                    Move up to your speed.
                    During this movement, you can pass through spaces occupied by your \glossterm{enemies} as if they were unoccupied.
                    You must still end your movement in an unoccupied space.
                    At any two points during this movement, you may make a melee \glossterm{strike}.
                    You cannot include the same creature or object as a target of both strikes.

                    \rankline
                    \rank{4} The strike deals double \glossterm{weapon damage}.
                    \rank{5} The strike deals \glossterm{extra damage} equal to half your \glossterm{power}.
                    \rank{6} The extra damage increases to be equal to your power.
                    \rank{7} The strike deals quadruple \glossterm{weapon damage}.
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
            name: "Outlandish Speed",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{speed}.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            complexity: 1,
            name: "Versatile Savagery",
            is_magical: false,
            rank: 6,
            description: r"
                Choose one of the following tags: \abilitytag{Clinch}, \abilitytag{Impact}, \weapontag{Maneuverable}, or \weapontag{Thrown} (30/60).
                You may treat all non-projectile weapons you use as if they had the chosen tag.
                If you choose the Thrown weapon tag, it does not affect your \glossterm{natural weapons}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Primal Rush",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \ability{sprint} ability during the \glossterm{movement phase} without increasing your \glossterm{fatigue level}.
                After using this ability, you \glossterm{briefly} cannot use it again.
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
                You gain access to one of the following \glossterm{combat styles}: \combatstyle{brute force}, \combatstyle{dirty fighting}, or \combatstyle{herald of war}.
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
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
            complexity: 0,
            name: "Primal Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You gain access to rank 3 primal maneuvers.
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
                The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
                However, you can learn the same maneuver more than once and apply different augments to each version.

                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 primal maneuvers.
                {
                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \glossterm{injured}.

                    \parhead{Mighty Maneuver} You take a \\minus1 accuracy penalty, but you deal \glossterm{extra damage} equal to twice your excess rank.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Reckless Maneuver} You deal \glossterm{extra damage} equal to twice your excess rank.
                    However, you \glossterm{briefly} take a \minus4 penalty to your defenses after you use the maneuver.
                    You can only apply this augment to maneuvers which cause you to make a melee \glossterm{strike}.

                    \parhead{Widened Maneuver} The area affected by your chosen maneuver doubles.
                    If your excess rank is at least 4, the area triples instead.
                    You can only apply this augment to maneuvers that affect an area.
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

                \subcf{Crocodile} Once per round, when you damage a creature with a melee \glossterm{strike}, you can use this ability to \glossterm{push} it up to 5 feet into unoccupied space.
                This is a \abilitytag{Size-Based} ability, so it has no effect on creatures that are two or more size categories larger than you.

                \subcf{Eagle} You gain \sense{low-light vision}, allowing you to see in \glossterm{dim illumination} (see \pcref{Low-light Vision}).
                In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).

                \subcf{Lion} You add half your Willpower to your \glossterm{mundane power}.

                \subcf{Shark} You gain a \plus1 \glossterm{accuracy} bonus against creatures that are \glossterm{injured}.
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

                \subcf{Crocodile} When you use this ability, if your strike \glossterm{injures} the target, you can also knock it \prone or enter a grapple with it (see \pcref{Grappling}).
                This is a \abilitytag{Size-Based} ability.

                \subcf{Eagle} You gain a \plus1 bonus to your Perception.

                \subcf{Lion} You add half your Willpower to your accuracy with \atAuditory attacks.

                \subcf{Shark} The accuracy bonus increases to \plus2.
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

                \subcf{Crocodile} If your attack hits the target's Brawn defense, you do not have to \glossterm{injure} it to knock it prone or grapple it.

                % Too much?
                \subcf{Eagle} The Perception bonus increases to \plus2.

                \subcf{Lion} You gain a \plus1 bonus to your Willpower.

                \subcf{Shark} The accuracy bonus increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 2,
            name: "Feral Frenzy",
            is_magical: false,
            rank: 3,
            // TODO: run this through the spreadsheet
            description: r"
                At the end of each round, if you attacked a creature other than yourself that round, you gain a frenzy point.
                Otherwise, you lose a frenzy point.
                You can have a maximum of 4 frenzy points and a minimum of 0.
                Frenzy points increase the power of your \ability{feral frenzy} ability.
                \begin{activeability}{Feral Frenzy}{Standard action}
                    \rankline
                    Make a melee or thrown \glossterm{strike}.
                    Then, you can spend three frenzy points to make an additional melee or thrown strike.

                    % TODO: wonky scaling, but nothing too insane after the initial rank 3 power spike
                    \rankline
                    \rank{4} You gain a \plus2 accuracy bonus with the first strike you make with this ability each round.
                    \rank{5} The second strike you make with this ability each round deals double damage.
                    \rank{6} The accuracy bonus applies to both strikes.
                    \rank{7} Both strikes deal 1d8 \glossterm{extra damage}.
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
                    \itemhead{Bear} \plus2 Endurance and \plus1 to your \glossterm{vital rolls}.
                    \itemhead{Crocodile} \plus2 Stealth and you can hold your breath ten times as long as normal (see \pcref{Endurance}).
                    \itemhead{Eagle} \plus2 Awareness and \plus10 feet to your maximum horizontal jump distance (see \pcref{Jumping}).
                    \itemhead{Lion} \plus2 Intimidate and \plus10 feet to your \glossterm{speed} while you are affected by the \ability{sprint} ability.
                        This speed bonus is doubled as normal for that ability.
                    \itemhead{Shark} \plus2 Swim and you gain the \sense{scent} ability (see \pcref{Tracking}).
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
                    \itemhead{Bear} \plus4 Endurance and \plus2 to your \glossterm{vital rolls}.
                    \itemhead{Crocodile} \plus4 Stealth and you can hold your breath indefinitely, though you cannot rest while holding your breath.
                    \itemhead{Eagle} \plus4 Awareness and \plus20 feet to your maximum horizontal jump distance.
                    \itemhead{Lion} \plus4 Intimidate and the movement speed bonus applies at all times, not only while sprinting.
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
