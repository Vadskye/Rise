use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::Skill;

use super::standard_modifiers::add_standard_spell_modifiers;

pub fn blessings_of_the_abyss<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{abyssal rebuke} ability as a standard action.
                \begin{magicalactiveability}{Abyssal Rebuke}
                    \rankline
                    Make an attack vs. Armor against one creature or object within \rngmed range.
                    You gain a \plus2 accuracy bonus with this attack against any creature that attacked you during the previous round.
                    If you suffered a vital wound from that attack, this bonus increases to \plus5.
                    \hit \damagerankone{fire}.

                    \rankline
                    \rank{2} The base damage increases to 1d8.
                    \rank{3} The damage bonus from your \glossterm{power} increases to be equal to your power.
                    \rank{4} You can choose an additional target within range.
                    \rank{5} The damage bonus from your power increases to 1d8 per 3 power.
                    \rank{6} The base damage increases to 2d8.
                    \rank{7} The damage bonus from your power increases to 1d8 per 2 power.
                \end{magicalactiveability}
            ",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(1).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(2).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(3).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(4).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(5).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(6).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Rebuke",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::Attack(
                StandardAttack::AbyssalRebuke(7).attack(),
            )]),
        },
        RankAbility {
            name: "Abyssal Magic",
            is_magical: true,
            rank: 2,
            description: r"
                If you have access to pact magic, choose one of the following \glossterm{mystic spheres}: \sphere{astromancy}, \sphere{enchantment}, \sphere{pyromancy}, or \sphere{summoning}.
                You gain access to that mystic sphere.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Abyssal Magic+",
            is_magical: true,
            rank: 5,
            description: r"
                If you have access to pact magic, you learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Resist the Dark Call",
            is_magical: true,
            rank: 2,
            description: r"
                If you do not have access to pact magic, you gain a +2 bonus to your Mental defense.
            ",
            // Assume that the warlock has pact magic
            modifiers: None,
        },
        RankAbility {
            name: "Resist the Dark Call+",
            is_magical: true,
            rank: 5,
            description: r"
                If you do not have access to pact magic, you gain a +1 bonus to your Willpower.
            ",
            // Assume that the warlock has pact magic
            modifiers: None,
        },
        RankAbility {
            name: "Banish to the Abyss",
            is_magical: true,
            rank: 3,
            description: r"
                You can use the \textit{banish to the abyss} ability as a standard action.
                \begin{magicalactiveability}{Banish to the Abyss}
                    \rankline
                    Make an attack vs. Mental against one creature within \rngmed range.
                    \hit \damagerankthree{fire}.
                    If the target loses \glossterm{hit points} from this damage, it is briefly teleported into the Abyss.
                    At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
                    After it returns, it becomes immune to being teleported in this way until it finishes a \glossterm{short rest}.

                    \rankline
                    \rank{4} You gain a +1 accuracy bonus with the attack.
                    \rank{5} The accuracy bonus increases to +2.
                    \rank{6} The damage bonus from your power increases to 1d6 per 3 power.
                    \rank{7} The accuracy bonus increases to +3.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Hellfire",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power}.
                In addition, whenever you use an ability that deals fire damage, you can change the type of the damage to be energy damage instead of fire damage.
                Any other aspects of the ability, including damage types other than fire, remain unchanged.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Hellfire+",
            is_magical: true,
            rank: 7,
            description: r"
                The power bonus increases to +2.
                In addition, whenever you use an ability that deals fire damage, you can change that ability to deal damage of all types.
                Any other aspects of the ability remain unchanged.
            ",
            modifiers: Some(vec![Modifier::Power(3)]),
        },
        RankAbility {
            name: "Abyssal Curse",
            is_magical: true,
            rank: 6,
            description: r"
                You can use the \textit{abyssal curse} ability as a standard action.
                \begin{magicalactiveability}{Abyssal Curse}[\abilitytag{Curse}]
                    \rankline
                    Make an attack vs. Fortitude against one creature or object within \rngmed range.
                    \hit The target is \stunned until it finishes a \glossterm{short rest}.
                    \crit The effect lasts until this curse is removed.

                    \rankline
                    \rank{7} You gain a \plus2 \glossterm{accuracy} bonus with the attack.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}

pub fn keeper_of_forbidden_knowledge<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Reader of Hidden Tomes",
            is_magical: true,
            rank: 1,
            description: r"
                You treat all Knowledge skills as class skills for you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 1,
            description: r"
                You learn one secret of your choice from the following list.
                Each secret grants great power at a cost.
                {
                    \subcf{Secret of Bloodforging} While you are not wearing other body armor, your blood flows to the surface of your skin, manifesting a carapace around you.
                    This functions like light body armor that provides a \plus4 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a \plus1 bonus to your vital rolls and a bonus equal to five times your rank in this archetype to your \glossterm{damage resistance}.
                    However, the \ability{recover} ability no longer causes you to recover hit points or damage resistance (see \pcref{Recover}).

                    \subcf{Secret of Bloodsharing} At the end of each round, if you dealt damage to a creature that caused it to lose \glossterm{hit points} during that round, you regain \glossterm{hit points} equal to 1d4 +1 per two \glossterm{power}.
                    You cannot regain more hit points in this way than the target lost from your attack.
                    However, whenever you take damage, half of that damage is applied to your \glossterm{hit points} directly, ignoring your \glossterm{damage resistance}.

                    \subcf{Secret of Soulcursing} Whenever you would inflict a \glossterm{condition} on a creature that is not already under the effects of a Curse, that effect becomes a Curse on it instead of a condition.
                    It is removed when the creature finishes a \glossterm{short rest}.
                    However, whenever you would gain a \glossterm{condition} that you are not \trait{immune} to, that effect becomes a \abilitytag{Curse} on you instead of a condition.
                    If you were already affected by a Curse from this ability, the old Curse becomes a condition instead.
                    Whenever you finish a \glossterm{short rest}, you remove any Curse affecting you as a result of this ability.
                }
            ",
            // Assume secret of bloodforging
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 4),
                Modifier::DamageResistance(3),
            ]),
        },
        RankAbility {
            name: "Eldritch Secret+",
            is_magical: true,
            rank: 4,
            description: r"
                The effect of your chosen secret improves.
                {
                    \subcf{Secret of Bloodforging} The bonus to damage resistance from the armor increases to seven times your rank in this archetype.

                    \subcf{Secret of Bloodsharing} The healing increases to 1d6 +1 per \glossterm{power}.

                    \subcf{Secret of Soulcursing} You can convert conditions into Curse effects against creatures that already have a single Curse effect active on them.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Eldritch Secret+",
            is_magical: true,
            rank: 7,
            description: r"
                Your understanding of your chosen secret reaches its full potential.
                {
                    \parhead{Secret of Bloodforging} The bonus to damage resistance from the armor increases to ten times your rank in this archetype.
                    In addition, the defense bonus increases to \plus6.

                    \parhead{Secret of Bloodsharing} The healing increases to 1d8 plus 1d8 per 3 power.

                    \parhead{Secret of Soulcursing} You can convert conditions into Curse effects with this ability regardless of the number of Curse effects active on the target.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(6)]),
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(20)]),
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(25)]),
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(49)]),
        },
        RankAbility {
            name: "Unnatural Insight",
            is_magical: true,
            rank: 2,
            description: r"
                You gain up to two additional \glossterm{insight points}.
                For each insight point you gain in this way, you take a \minus1 penalty to all skills other than Knowledge skills.
                For each insight point you choose not to gain in this way, you gain a \plus1 bonus to all Knowledge skills.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::InsightPoint, 2),
                Modifier::Skill(Skill::Awareness, -2),
                Modifier::Skill(Skill::Balance, -2),
                Modifier::Skill(Skill::Climb, -2),
                Modifier::Skill(Skill::Craft, -2),
                Modifier::Skill(Skill::CreatureHandling, -2),
                Modifier::Skill(Skill::Deception, -2),
                Modifier::Skill(Skill::Deduction, -2),
                Modifier::Skill(Skill::Devices, -2),
                Modifier::Skill(Skill::Disguise, -2),
                Modifier::Skill(Skill::Endurance, -2),
                Modifier::Skill(Skill::Flexibility, -2),
                Modifier::Skill(Skill::Intimidate, -2),
                Modifier::Skill(Skill::Medicine, -2),
                Modifier::Skill(Skill::Perform, -2),
                Modifier::Skill(Skill::Persuasion, -2),
                Modifier::Skill(Skill::Profession, -2),
                Modifier::Skill(Skill::Ride, -2),
                Modifier::Skill(Skill::SleightOfHand, -2),
                Modifier::Skill(Skill::SocialInsight, -2),
                Modifier::Skill(Skill::Stealth, -2),
                Modifier::Skill(Skill::Survival, -2),
                Modifier::Skill(Skill::Swim, -2),
            ]),
        },
        RankAbility {
            name: "Unnatural Insight+",
            is_magical: true,
            rank: 5,
            description: r"
                The maximum number of insight points you can gain with this ability increases to four.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::InsightPoint, 2),
                Modifier::Skill(Skill::Awareness, -2),
                Modifier::Skill(Skill::Balance, -2),
                Modifier::Skill(Skill::Climb, -2),
                Modifier::Skill(Skill::Craft, -2),
                Modifier::Skill(Skill::CreatureHandling, -2),
                Modifier::Skill(Skill::Deception, -2),
                Modifier::Skill(Skill::Deduction, -2),
                Modifier::Skill(Skill::Devices, -2),
                Modifier::Skill(Skill::Disguise, -2),
                Modifier::Skill(Skill::Endurance, -2),
                Modifier::Skill(Skill::Flexibility, -2),
                Modifier::Skill(Skill::Intimidate, -2),
                Modifier::Skill(Skill::Medicine, -2),
                Modifier::Skill(Skill::Perform, -2),
                Modifier::Skill(Skill::Persuasion, -2),
                Modifier::Skill(Skill::Profession, -2),
                Modifier::Skill(Skill::Ride, -2),
                Modifier::Skill(Skill::SleightOfHand, -2),
                Modifier::Skill(Skill::SocialInsight, -2),
                Modifier::Skill(Skill::Stealth, -2),
                Modifier::Skill(Skill::Survival, -2),
                Modifier::Skill(Skill::Swim, -2),
            ]),
        },
        RankAbility {
            name: "Lore of Corrupting Power",
            is_magical: true,
            rank: 3,
            description: r"
                You can choose to gain a \plus2 bonus to your \glossterm{power} with all abilities.
                If you do, you take a \minus2 penalty to your Fortitude and Mental defenses.
                Otherwise, you gain a +2 bonus to your Mental defense.
            ",
            modifiers: Some(vec![
                Modifier::Power(2),
                Modifier::Defense(Defense::Fortitude, 2),
                Modifier::Defense(Defense::Mental, 2),
            ]),
        },
        RankAbility {
            name: "Lore of Corrupting Power+",
            is_magical: true,
            rank: 6,
            description: r"
                If you chose the power bonus, it increases to +4.
                Otherwise, the defense bonus increases to +4.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
    ]
}

pub fn pact_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            name: "Pact Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your soulkeeper grants you the ability to use pact magic.
                You gain access to one pact \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Pact Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional pact \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn pact spells from pact mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 pact \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Pact spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Casting Components}).
                Unless otherwise noted in a spell's description, casting any spell requires a \glossterm{standard action}.
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of pact spells that you can learn is equal to your rank in this archetype.
                Pact spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Pact Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Pact Spells+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Pact Spells+",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Survival Pact",
            is_magical: true,
            rank: 1,
            description: r"
                You gain a bonus to your \glossterm{damage resistance} equal to your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Survival Pact+",
            is_magical: true,
            rank: 3,
            description: r"        
                The bonus increases to twice your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Survival Pact+",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus increases to three times your rank in this archetype.
            ",
            modifiers: None,
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    abilities
}

pub fn pact_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                You can only choose spells with a rank no higher than your rank in this archetype.
                In addition, you cannot choose the same spell with more than two metamagic abilities.
                {
                    \parhead{Distant Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Precise Spell} Choose a pact \glossterm{spell} you know.
                        You gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Powerful Spell} Choose a pact \glossterm{spell} you know.
                        You gain a +2 bonus to your \glossterm{magical power} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Rituals} You gain the ability to perform pact rituals to create unique magical effects (see \pcref{Spells and Rituals}).
                        The maximum \glossterm{rank} of pact ritual you can learn or perform is equal to the maximum \glossterm{rank} of pact spell that you can cast.
                        In addition, you automatically learn one free pact ritual of each rank you have access to, including new ranks as you gain access to them.
                        You cannot choose this ability multiple times.
                    \parhead{Widened Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Desperate Pact",
            is_magical: true,
            rank: 2,
            description: r"
                You can use the \textit{desperate exertion} ability without increasing your fatigue level.
                When you do, you suffer no immediate negative consequences.
                After 10 minutes, your maximum \glossterm{hit points} will be reduced by a quarter until you complete a \glossterm{long rest}.
                Each time this penalty takes effect, you lose a quarter of your original maximum hit points, so using it four times would reduce your maximum hit points to 0.
                If your hit points are reduced below 0 in this way, you die.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} with spells.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Experienced Spellcaster+",
            is_magical: true,
            rank: 6,
            description: r"
                The accuracy bonus increases to +2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(2)]),
        },
        RankAbility {
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
    ]
}

pub fn soulkeepers_chosen<'a>() -> Vec<RankAbility<'a>> {
    vec![
        // Barbarian rage grants +2 accuracy. Assuming a base hit rate of 60%, that is about
        // 33% more "real" post-accuracy damage. This should grant about 33% more damage to a
        // single-target spell of the same rank, assuming a high power character. Barbarian
        // gives more "true" damage at high Strength, but Possession is better with AOE and
        // low Willpower.
        // Rank: Expected damage, expected extra damage, dice-representable extra damage
        // * 1: 5.6,   1.9, 2.5
        // * 2: 8,     2.6, 3.5
        // * 3: 11.2,  3.7, 4.5
        // * 4: 16,    5.3, 5.5
        // * 5: 22.4,  7.5, 7
        // * 6: 32,   10.6, 10.5
        // * 7: 44.8, 14.9, 14
        RankAbility {
            name: "Possession",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{possession} ability as a \glossterm{free action} to allow your soulkeeper a greater influence over your actions.
                \begin{magicalsustainability}{Possession}{\abilitytag{Exertion}, \abilitytag{Sustain} (free), \abilitytag{Swift}}
                    \rankline
                    You gain the following benefits and drawbacks:
                    \begin{itemize}
                        \item You gain 1d4 \glossterm{extra damage} with \magical abilities.
                        \item You gain a \plus4 bonus to your \glossterm{fatigue tolerance}.
                            If you would be unconscious due to fatigue without this bonus, your soulkeeper directly controls all of your actions.
                            Your soulkeeper's objectives may differ from your own, but except in very unusual circumstances, your soulkeeper is invested in continuing your life and ensuring your victory in difficult circumstances.
                        \item You take a \minus2 penalty to your Fortitude and Mental defenses.
                        \item You are unable to take \glossterm{standard actions} that do not cause you to make \magical attacks.
                        \item At the end of each round, if you did not make a \magical attack during that round, this ability ends.
                        \item When this ability ends for any reason, you increase your \glossterm{fatigue level} by one.
                    \end{itemize}

                    \rankline
                    \rank{2} The extra damage increases to 1d6.
                    \rank{3} The extra damage increases to 1d8.
                    \rank{4} The extra damage increases to 1d10.
                    \rank{5} The extra damage increases to 2d6.
                    \rank{6} The extra damage increases to 3d6.
                    \rank{7} The extra damage increases to 4d6.
                \end{magicalsustainability}
            ",
            modifiers: Some(vec![
                // TODO: add extra damage
                // Modifier::Power(2),
                Modifier::Defense(Defense::Fortitude, -2),
                Modifier::Defense(Defense::Mental, -2),
                Modifier::Resource(Resource::FatigueTolerance, 4),
            ]),
        },
        RankAbility {
            name: "Empowering Whispers",
            is_magical: true,
            rank: 2,
            description: r"
                You gain an ability based on the type of whispers you hear with your \textit{whispers of the lost} ability.
                {
                    \subcf{Mentoring Whispers} You gain an additional \glossterm{insight point} (see \pcref{Trained Skills}).

                    \subcf{Spiteful Whispers} Whenever you miss a creature with an attack, you \glossterm{briefly} gain a \plus1 bonus to \glossterm{accuracy} against that creature.
                    As normal, this bonus does not stack with itself, even if you miss the same creature multiple times.

                    \subcf{Sycophantic Whispers} You gain a \plus2 bonus to your Mental defense.

                    \subcf{Warning Whispers} You gain a \plus2 bonus to your Reflex defense.

                    \subcf{Whispers of the Mighty} You gain a \plus2 bonus to your Fortitude defense.
                }
            ",
            // Assume whispers of the mighty since it's easy
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 2)]),
        },
        RankAbility {
            name: "Empowering Whispers+",
            is_magical: true,
            rank: 6,
            description: r"
                The effect of the whispers you hear improves.
                {
                    \subcf{Mentoring Whispers} You gain an additional \glossterm{insight point}.

                    \subcf{Spiteful Whispers} The bonus from your \textit{empowering whispers} ability increases to \plus2.

                    \subcf{Sycophantic Whispers} You are immune to all \abilitytag{Emotion} attacks.

                    \subcf{Warning Whispers} You are never \unaware or \partiallyunaware.

                    \subcf{Whispers of the Mighty} You gain a \plus1 bonus to \glossterm{vital rolls}.
                }
            ",
            modifiers: Some(vec![Modifier::VitalRoll(1)]),
        },
        RankAbility {
            name: "Exchange Soul Fragment",
            is_magical: true,
            rank: 3,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a fragment of your soul through the link in exchange for aid.
                You can use the \textit{exchange soul fragment} ability as a standard action.
                \begin{magicalactiveability}{Exchange Soul Fragment}[\abilitytag{Exertion}, \abilitytag{Swift}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by one.

                    You regain 1d10 \glossterm{damage resistance} plus 1d6 per 3 \glossterm{power}.
                    In addition, you may remove a \glossterm{condition} affecting you.

                    \rankline
                    \rank{4} The bonus recovery increases to 1d8 per 3 power.
                    \rank{5} The base recovery increases to 2d8.
                    \rank{6} The bonus recovery increases to 1d8 per 2 power.
                    \rank{7} The base recovery increases to 4d8.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Unwavering Possession",
            is_magical: true,
            rank: 4,
            description: r"
                You are immune to being \stunned and \confused during your \textit{possession} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Exchange Vitality",
            is_magical: true,
            rank: 5,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a larger fragment of your soul through the link fragment in exchange for greater aid.
                You can use the \textit{exchange vitality} ability as a standard action.
                \begin{magicalactiveability}{Exchange Vitality}[\abilitytag{Exertion}]
                    \rankline
                    When you use this ability, you increase your \glossterm{fatigue level} by three.

                    Remove one of your \glossterm{vital wounds}.
                \end{magicalactiveability}
            ",
            modifiers: Some(vec![Modifier::Power(4)]),
        },
        RankAbility {
            name: "Soul Fountain",
            is_magical: true,
            rank: 7,
            description: r"
                You reduce the fatigue you gain from using your \ability{exchange soul fragment} and \ability{exchange vitality} abilities by one.
            ",
            modifiers: Some(vec![Modifier::Power(8)]),
        },
    ]
}
