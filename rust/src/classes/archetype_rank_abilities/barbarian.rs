use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Defense};
use crate::creatures::Modifier;

use super::standard_modifiers::{add_hp_scaling, add_standard_maneuver_modifiers};

pub fn battleforged_resilience<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
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
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{hit points} (see \pcref{Hit Points}).
                In addition, you gain a +1 bonus to your \glossterm{vital rolls} (see \pcref{Vital Wounds}).
            ",
            // HP is handled by add_hp_scaling()
            modifiers: Some(vec![Modifier::VitalRoll(1)]),
        },
        RankAbility {
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
            name: "Resilient Strike",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{resilient strike} ability.
                \begin{activeability}{Resilient Strike}
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
            name: "Primal Resilience",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
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
            name: "Unbloodied Resilience",
            is_magical: false,
            rank: 7,
            description: r"
                While you have at least half your maximum hit points remaining, you cannot gain \glossterm{conditions}.
                Recovering hit points above this value does not automatically remove any conditions you already have.
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
            name: "Rage",
            is_magical: false,
            rank: 1,
            description: r"
                For most barbarians, this represents entering a furious rage.
                Some barbarians instead enter a joyous battle trance or undergo a partial physical transformation into a more fearsome form.
                \begin{sustainability}{Rage}{\abilitytag{Emotion}, \abilitytag{Sustain} (free)}
                    \abilityusagetime \glossterm{Free action} while not already in a rage.
                    \rankline
                    When you use this ability, you gain \glossterm{damage resistance} equal to half your maximum hit points.
                    In addition, for the duration of this ability, you gain the following benefits and drawbacks:
                    \begin{itemize}
                        \item Your current damage resistance can increase beyond your normal maximum.
                        \item You gain a +2 accuracy bonus with melee and thrown \glossterm{strikes}.
                        \item You reduce your \glossterm{explosion target} by 1 (see \pcref{Exploding Attacks}).
                        \item You take a \minus2 penalty to your Armor and Reflex defenses.
                        \item You are \enraged.
                    \end{itemize}

                    When this ability ends for any reason, you increase your \glossterm{fatigue level} by one, and you lose damage resistance equal to the amount you gained when you used this ability.
                    If this would reduce your damage resistance below 0, the excess loss has no effect.
                \end{sustainability}
            ",
            modifiers: Some(vec![
                Modifier::Accuracy(2),
                Modifier::ExplosionTarget(-1),
                Modifier::Defense(Defense::Armor, -2),
                Modifier::Defense(Defense::Reflex, -2),
            ]),
        },
        RankAbility {
            name: "Fearless Anger",
            is_magical: false,
            rank: 2,
            description: r"
                You are immune to being \frightened and \panicked.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enraged Strike",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{enraged strike} ability.
                \begin{activeability}{Enraged Strike}
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
            name: "Primal Brawn",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Strength.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Strength, 1)]),
        },
        RankAbility {
            name: "Insensible Anger",
            is_magical: false,
            rank: 5,
            description: r"
                You ignore all \glossterm{vital wound} effects except for unconsciousness and death.
                Each vital wound still causes the normal \minus2 penalty to \glossterm{vital rolls}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Unwavering Rage",
            is_magical: false,
            rank: 6,
            description: r"
                You are immune to \glossterm{Compulsion} and \glossterm{Emotion} attacks during your \ability{rage} ability.
            ",
            modifiers: None,
        },
        RankAbility {
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
            name: "Savage Precision",
            is_magical: false,
            rank: 1,
            description: r"
                Your base accuracy with \abilitytag{Brawling} abilities is equal to the higher of your Strength and Dexterity, plus half your level (see \pcref{Special Combat Abilities}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Precision+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus2 \glossterm{accuracy} bonus with those abilities.
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
            // This is an abstraction of the effect of exotic weapons being better
            modifiers: Some(vec![Modifier::ExtraDamage(DamageDice::new(0))]),
        },
        RankAbility {
            name: "Versatile Savagery",
            is_magical: false,
            rank: 2,
            description: r"
                Choose one of the following \glossterm{weapon tags} (see \pcref{Weapon Tags}): \weapontag{Grappling}, \weapontag{Mounted}, \weapontag{Thrown} (30/60), or \weapontag{Tripping}.
                You may treat all non-projectile weapons you use as if they had the chosen weapon tag.
                If you choose the Thrown weapon tag, it does not affect your \glossterm{natural weapons}.
                Whenever your rank in this archetype increases, you can change which weapon tag you chose with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Savage Rush",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{savage rush} ability.
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
            name: "Primal Agility",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Dexterity.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            name: "Endless Rush",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{land speed}.
            ",
            modifiers: None,
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
    ]
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
                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are at less than their maximum \glossterm{hit points}.
                    You can only apply this augment to maneuvers which cause you to make a melee \glossterm{strike}.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 4 - your excess rank but the strike deals double \glossterm{weapon damage}.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Reckless Maneuver} You gain an accuracy bonus equal to twice your excess rank.
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
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an augment for each of your rank 3 primal maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
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
            name: "Totem Animal",
            is_magical: false,
            rank: 1,
            description: r"
                You choose a totem animal that represents you.
                Each totem animal grants you abilities that are associated with that animal.

                \subcf{Bear} You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
                In addition, you gain a \plus1 bonus to your Fortitude defense.

                \subcf{Crocodile} Once per round, when you damage a creature with a melee \glossterm{strike}, you can use this ability to \glossterm{push} it into any space adjacent to you.
                This is a \abilitytag{Size-Based} ability, so it has no effect on creatures that are two or more size categories larger than you.

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
                This is a \abilitytag{Size-Based} ability.

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
            name: "Feral Strike",
            is_magical: false,
            rank: 3,
            description: r"
                As a standard action, you can use the \textit{feral strike} ability.
                \begin{activeability}{Feral Strike}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a melee or thrown \glossterm{strike}.
                    % 50% chance of +5.5 accuracy, so almost +3 accuracy
                    You reduce your \glossterm{explosion target} with the attack by 5, which makes it much more likely to \glossterm{explode} (see \pcref{Exploding Attacks}).

                    \rankline
                    % This strike is basically just used for crit-fishing, which only matters when you explode.
                    % So this is roughly +1-2 accuracy, but doesn't strictly require explosion.
                    \rank{4} You also get a +2 accuracy bonus for the purpose of determining whether you get a \glossterm{critical hit} with the strike.
                    \rank{5} The accuracy bonus increases to +4.
                    \rank{6} If you get a \glossterm{critical hit}, your \glossterm{weapon damage} with the attack is doubled.
                    \rank{7} Your weapon damage with the attack is always doubled.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Feral Explosion",
            is_magical: false,
            rank: 5,
            // Math: By default, 10% chance of +2 accuracy and 1% chance of +4 accuracy, so +0.24
            // accuracy. But +0.5 accuracy if you can explode on a 9 from something else like
            // Executioner, and of course +2 accuracy with Feral Strike specifically.
            description: r"
                Whenever you \glossterm{explode} with an attack roll, you gain a \plus2 \glossterm{accuracy} bonus with the attack (see \pcref{Exploding Attacks}).
                As normal, this bonus does not stack with itself, even if you explode multiple times with the same attack roll.
            ",
            // TODO: figure out how to represent this
            modifiers: None,
        },
        RankAbility {
            name: "Animal Instincts",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to your Reflex defense.
                In addition, you gain a +1 bonus to your \glossterm{vital rolls} (see \pcref{Vital Wounds}).
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Reflex, 2)]),
        },
        RankAbility {
            name: "Animal Instincts+",
            is_magical: false,
            rank: 6,
            description: r"
                The defense bonus increases to \plus4.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Reflex, 2)]),
        },
    ]
}
