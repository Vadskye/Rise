use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

use super::standard_modifiers::{add_standard_maneuver_modifiers, add_standard_spell_modifiers};

pub fn pactbound_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Pact Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can use magically enhanced weaponry to overwhelm your foes in combat.
                You gain access to one \glossterm{combat style} based on your soulkeeper:
                \begin{raggeditemize}
                    \item Devil: Herald of War or Rip and Tear
                    \item Fae: Flurry of Blows or Mobile Hunter
                    \item Moirai: Ebb and Flow or Perfect Precision
                    \item Precursor: Brute Force or Unbreakable Defense
                \end{raggeditemize}
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those from your soulkeeper.
                You can only learn pact \glossterm{maneuvers} from pact combat styles that you have access to.

                You learn two rank 1 pact \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some pact maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Pact Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You gain access to rank 3 pact maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Pact Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 pact maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Pact Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 pact maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Soulblade",
            is_magical: false,
            rank: 1,
            description: r"
                The pact you made to gain martial prowess infuses your weaponry with mystic power.
                All \glossterm{strikes} you make are \magical abilities.
                This means you use your \glossterm{magical power} to determine your damage instead of your \glossterm{mundane power} (see \pcref{Power}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your pact maneuvers.
                For each rank 1 pact maneuver you know, choose one augment from the list below and apply it to that maneuver.
                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 pact maneuvers.
                {
                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \glossterm{injured}.

                    \parhead{Mighty Maneuver} You deal \glossterm{extra damage} equal to twice your excess rank.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.

                    \parhead{Reckless Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you \glossterm{briefly} take a \minus4 penalty to your defenses after you use the maneuver.
                    You can only apply this augment to maneuvers which cause you to make a melee \glossterm{strike}.

                    \parhead{Spellfused Maneuver\sparkle} Choose a \glossterm{ranged} pact spell you know that does not have the \atAttune or \atSustain tags.
                    Its rank most not exceed your excess rank with the maneuver.
                    You treat your rank with that spell as being equal to your excess rank, which limits the bonuses it gains from rank scaling.
                    Each target of the maneuver is also affected by that spell, using separate attack rolls for the spell and maneuver.
                    You do not have to spend time casting the spell, but each target must still meet any targeting requirements for the spell, such as range or touch.

                    You can only apply this augment to maneuvers which cause you to make a melee \glossterm{strike}, and you must choose a different spell each time you apply this augment to a maneuver.
                    After you use this maneuver, you \glossterm{briefly} cannot use any spellfused maneuver again.
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
                You can also choose an augment for each of your rank 3 pact maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 pact maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}

pub fn covenant_keeper<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 1,
            description: r"
                You make one covenant of your choice from the following list.
                Each covenant grants great power at a cost.
                {
                    \subcf{Covenant of Bloodforging} While you are not wearing other body armor, your blood flows to the surface of your skin, manifesting a carapace around you.
                    This functions like light body armor.
                    It provides a \plus4 bonus to your Armor defense, a \plus4 bonus to your \glossterm{durability}, and a \plus1 bonus to your \glossterm{vital rolls}.
                    In exchange, the \ability{recover} ability no longer causes you to recover hit points (see \pcref{Recover}).

                    \subcf{Covenant of Bloodsharing} At the end of each round, if you made a living \glossterm{enemy} lose \glossterm{hit points} during that round, you regain \glossterm{hit points} equal to half your \glossterm{power}.
                    % TODO: do multiple targets sum their HP loss?
                    You cannot regain more hit points in this way than the target lost from your attack.
                    In exchange, you are \glossterm{injured} whenever you are below your maximum hit points, regardless of your normal \glossterm{injury point}.

                    \subcf{Covenant of Soulcursing} Whenever you would inflict a \glossterm{condition} on a creature that is not already under the effects of a Curse, that effect becomes a Curse on it instead of a condition.
                    It is removed when the creature finishes a \glossterm{short rest}.
                    If the condition would normally have a special way to remove it, such as the \spell{ignition} spell, that also removes the curse.

                    In exchange, whenever you would gain a \glossterm{condition} that you are not \trait{immune} to, that effect becomes a \abilitytag{Curse} on you instead of a condition.
                    If you were already affected by a Curse from this ability, the old Curse becomes a condition instead.
                    Whenever you finish a \glossterm{short rest}, you remove any Curse affecting you as a result of this ability.
                }
            ",
            // Assume covenant of bloodforging and already wearing light armor
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 2),
                Modifier::Durability(2),
                Modifier::VitalRoll(1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant+",
            is_magical: true,
            rank: 4,
            description: r"
                The effect of your chosen covenant improves.
                {
                    \subcf{Covenant of Bloodforging} The vital roll bonus from the armor increases to \plus2.

                    \subcf{Covenant of Bloodsharing} The healing increases to 1d6 \add your \glossterm{magical power}.

                    \subcf{Covenant of Soulcursing} You can convert conditions into Curse effects against creatures that already have a single Curse effect active on them.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant++",
            is_magical: true,
            rank: 7,
            description: r"
                Your understanding of your chosen covenant reaches its full potential.
                {
                    \parhead{Covenant of Bloodforging} The durability bonus from the armor increases to \plus5.
                    In addition, the defense bonus increases to \plus5.

                    \parhead{Covenant of Bloodsharing} The healing increases to 1d6 \add 1d6 per 2 \glossterm{magical power}.

                    \parhead{Covenant of Soulcursing} You can convert conditions into Curse effects with this ability regardless of the number of Curse effects active on the target.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Covenant of Power",
            is_magical: true,
            rank: 2,
            description: r"
                You can choose to gain a \plus2 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
                If you do, you take a \minus1 penalty to your \glossterm{fatigue tolerance}.
                Otherwise, you gain a \plus2 bonus to your \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![
                Modifier::Power(2),
                // TODO: add FatigueTolerance modifier
                // Modifier::FatigueTolerance(-1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Covenant of Power+",
            is_magical: true,
            rank: 5,
            description: r"
                The bonus you chose increases to \plus4.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            complexity: 2,
            name: "Exchange Soul Fragment",
            is_magical: true,
            rank: 3,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a fragment of your soul through the link in exchange for aid.
                \begin{magicalactiveability}{Exchange Soul Fragment}{Standard action}
                    \abilitytags \abilitytag{Swift}
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
                    You regain \hprankthree.
                    In addition, you may remove a \glossterm{condition} affecting you.
                    This effect \glossterm{repeats} at the end of the current round.

                    \rankline
                    \rank{4} The recovery increases to \hprankfour.
                    \rank{5} The recovery increases to \hprankfive.
                    \rank{6} The recovery increases to \hpranksix.
                    \rank{7} The recovery increases to \hprankseven.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Exchange Vitality",
            is_magical: true,
            rank: 6,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a larger fragment of your soul through the link fragment in exchange for greater aid.
                \begin{magicalactiveability}{Exchange Vitality}{Standard action}
                    \abilitycost See text.
                    \rankline
                    Remove one of your \glossterm{vital wounds}.
                    If you remove a vital wound in this way, you increase your \glossterm{fatigue level} by 2.
                    This effect \glossterm{repeats} at the end of the current round.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}

pub fn pact_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        // Pact mystic spheres should be simple, physical spheres that directly change the world,
        // typically through energy manipulation.
        // Chronomancy is a bit of a stretch, but it has a number of strike effects, which we want
        // to encourage for votives.
        RankAbility {
            complexity: 4,
            name: "Pact Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your soulkeeper grants you the ability to use pact magic.
                You gain access to two pact \glossterm{mystic spheres}, plus the \sphere{universal} mystic sphere (see \pcref{Pact Mystic Spheres}).
                At least one of those mystic spheres must be from your soulkeeper (see Soulkeeper Spheres, below).
                You can only learn pact spells from pact mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 pact \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per two insight points.

                Pact spells require \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Ability Usage Components}).
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
            complexity: 0,
            name: "Soulkeeper Spheres",
            is_magical: true,
            rank: 1,
            description: r"
                Your soulkeeper has a particular affinity for two \glossterm{mystic spheres}.
                You add them to your list of pact mystic spheres if they are not already present.
                In addition, you must always know least one of your soulkeeper spheres.

                % Each soulkeeper is associated with one sphere that is normally part of the pact list, and one that isn't.
                % Devil: Astromancy (extra), Pyromancy (base)
                % Fae: Enchantment (extra), Photomancy (base)
                % Moirai: Fabrication (base), Revelation (extra)
                % Precursor: Chronomancy (base), Polymorph (extra)
                \begin{raggeditemize}
                    \itemhead{Devil} Astromancy, Pyromancy
                    \itemhead{Fae} Enchantment, Photomancy
                    \itemhead{Moirai} Fabrication, Revelation
                    \itemhead{Precursor} Chronomancy, Polymorph
                \end{raggeditemize}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Survival Pact",
            is_magical: true,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to your \glossterm{durability}.
            ",
            modifiers: Some(vec![Modifier::Durability(1)]),
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    abilities
}

pub fn pact_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Desperate Pact",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \ability{desperate exertion} ability without increasing your fatigue level (see \pcref{Desperate Exertion}).
                When you do, you suffer no immediate negative consequences.
                After 10 minutes, your maximum \glossterm{hit points} are reduced to three-quarters of normal until you complete a \glossterm{long rest}.
                Each time this penalty takes effect, your hit points are reduced by an additional quarter, so using it three times would reduce your maximum hit points to a quarter of their normal value.
                If your hit points would be reduced below 1 in this way, your body and soul are ripped through the planes directly into your soulkeeper's realm.
                This is invariably lethal, and leaves no corpse behind.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Metamagic",
            is_magical: true,
            rank: 2,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                Each individual spell can only have one metamagic applied.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Desperate Spell} Choose a pact \glossterm{spell} you know.
                        When you cast the spell, you may choose to increase your \glossterm{fatigue level} by one.
                        If you do, you become \empowered and \focused that round.
                        However, you cannot use the \ability{desperate exertion} ability to affect the spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Distant Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Powerful Spell} Choose a damaging pact \glossterm{spell} you know.
                        It deals \glossterm{extra damage} equal to your rank in this archetype.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Rituals} You gain the ability to perform pact rituals to create unique magical effects (see \pcref{Spell and Ritual Mechanics}).
                        The maximum \glossterm{rank} of pact ritual you can learn or perform is equal to the maximum \glossterm{rank} of pact spell that you can cast.
                        When you gain this ability, you can memorize a rank 1 pact ritual from any pact mystic sphere you have access to.
                        Whenever you gain access to a new spellcasting rank, you can memorize an additional ritual of that rank or lower.
                        You cannot choose this ability multiple times.
                    \parhead{Widened Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{area}: \tinyarea, \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Spell Knowledge",
            is_magical: true,
            rank: 3,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Attunement Point",
            is_magical: true,
            rank: 6,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus1 bonus to your \glossterm{accuracy} and \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![
                Modifier::Accuracy(1),
                Modifier::Resource(Resource::FatigueTolerance, 1),
            ]),
        },
    ]
}

// Rank 1/4/7: Passive / body modifier
// Rank 2/5: Spellcasting modifier
// Rank 3/6: Immunities
pub fn soulforged<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Body and Soul As One",
            is_magical: true,
            rank: 1,
            description: r"
                Your body is shaped by your soulkeeper's influence.

                \subcf{Devil -- Calculating} You gain a bonus to your \glossterm{mundane power} and \glossterm{magical power} equal to half your Intelligence.

                \subcf{Fae -- Unconcerned} You gain a \plus1 bonus to \glossterm{accuracy} and all \glossterm{checks}.
                However, you cannot use the \ability{desperate exertion} ability.

                % 1d10! is about 6.1 accuracy, and 1d8+2 is 6.5 accuracy.
                \subcf{Moirai -- Inevitable} You gain a \plus2 \glossterm{accuracy} bonus.
                However, you roll 1d8 instead of 1d10 for attack rolls, and your attack rolls cannot \glossterm{explode}.

                \subcf{Precursor -- Burgeoning} You gain a \plus2 bonus to your \glossterm{durability} (see \pcref{Durability}).
                In addition, you gain a tentacle \glossterm{natural weapon} (see \pcref{Natural Weapons}).
                It deals 1d6 damage, has the \weapontag{Maneuverable} weapon tag, and does not require a \glossterm{free hand}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Body and Soul As One+",
            is_magical: true,
            rank: 4,
            description: r"
                Your body continues to be shaped by your soulkeeper's influence.

                \subcf{Devil -- Specialized Torment} You gain a \plus4 accuracy bonus for the purpose of determining whether your attacks get a \glossterm{critical hit} against creatures that are \vulnerable to the attack.

                \subcf{Fae -- Free Spirit} At the end of each round, you have a 50\% chance to remove a random \glossterm{poison} or \glossterm{condition} affecting you.
                This ability is \glossterm{briefly} disabled whenever you take damage from a cold iron weapon.
                
                \subcf{Moirai -- Inexorable} You gain a \plus2 bonus to all \glossterm{checks}.
                However, you roll 1d8 instead of 1d10 for checks, and your checks cannot \glossterm{explode} even if another ability would cause them to explode.

                \subcf{Precursor -- Grotesque} You gain a \plus1 bonus to your Constitution.
                In addition, your tentacle gains the \weapontag{Sweeping} (1) \glossterm{weapon tag} (see \pcref{Weapon Tags}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Body and Soul As One+",
            is_magical: true,
            rank: 7,
            description: r"
                Your body continues to be shaped by your soulkeeper's influence.

                \subcf{Devil -- Calculating\plus} You gain a bonus to your Mental defense equal to half your Intelligence.

                \subcf{Fae -- Unconcerned\plus} The bonus to accuracy and checks increases to 1d4.
                
                \subcf{Moirai -- Inevitable\plus} The bonus to accuracy and checks increases to \plus3.

                \subcf{Precursor -- Burgeoning\plus} The durability bonus increases to \plus4.
                In addition, your tentacle now deals 1d10 damage.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Soulforged Spell",
            is_magical: true,
            rank: 2,
            description: r"
                If you have access to pact magic, you learn an additional pact spell.
                The spell can be up to rank 2, even if you do not have access to rank 2 spells.
                It gains a special effect based on your soulkeeper.
                This is a metamagic effect, so the spell cannot have other metamagic applied to it.
                When you gain access to new spell ranks, you can change which spell you know with this ability, including spells with a higher rank.
                {
                    \subcf{Devil -- Tormenting Spell} Each creature hit by the spell becomes tormented by the spell as a \glossterm{condition}.
                    If it is \glossterm{injured} while it is tormented, the spell \glossterm{repeats} on that creature, and all instances of the condition are removed.
                    You gain a \plus2 accuracy bonus with the repeat for each additional instance of this condition, but the spell still only repeats once.

                    \subcf{Fae -- Hidden Spell} The spell does not have \glossterm{verbal components} or \glossterm{somatic components}.
                    In addition, if it does not deal damage, it gains the \atSubtle tag.

                    \subcf{Moirai -- Inevitable Spell} Whenever you would make an attack roll, you can instead determine if an attack result of 6 \add your \glossterm{accuracy} with the spell would result in a hit.
                    If it does, you hit the target without making an attack roll.
                    Otherwise, you roll the attack roll normally.
                    This does not allow you to bypass other effects that can cause you to miss without making an attack roll, such as a \glossterm{miss chance}.

                    \subcf{Precursor -- Eldritch Spell} You gain a \plus2 accuracy bonus with the spell.
                    However, whenever you cast the spell, you \glossterm{briefly} take a \minus2 penalty to all defenses.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Soulforged Spell+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell with this ability.
                It can be up to rank 5, even if you do not have access to rank 5 spells.
            ",
            modifiers: None,
        },
        RankAbility {
            // Assume pact magic, so ignore complexity
            complexity: 0,
            name: "Soulforged Weaponry",
            is_magical: true,
            rank: 2,
            description: r"
                If you do not have access to pact magic, choose a magic weapon property with a rank no higher than your rank in this archetype (see \pcref{Magic Weapons}).
                It must not be a \glossterm{deep attunement}.
                You can \glossterm{attune} to that magic weapon property.
                If you do, you always treat one weapon you wield as having that property.
                This applies in addition to any other special material or magical properties.
                However, it does not stack if the item would already have that property normally.
                If you wield more than one weapon at a time, you can choose which of your weapons gains this effect as a \glossterm{free action} once per round.

                Whenever you increase your rank in this archetype, you can change which magic weapon property you have with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            // Assume pact magic, so ignore complexity
            complexity: 0,
            name: "Soulforged Armory",
            is_magical: true,
            rank: 5,
            description: r"
                If you do not have access to pact magic, choose a magic body armor property with a rank no higher than your rank in this archetype (see \pcref{Magic Armor}).
                You can \glossterm{attune} to that magic body armor property.
                If you do, you treat your body armor as if it had that property.
                This applies in addition to any other special material or magical properties.
                However, it does not stack if the item would already have that property normally.

                Whenever you increase your rank in this archetype, you can change which magic body armor property you have with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Soulbound Resilience",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus3 bonus to your \glossterm{durability}.
                In addition, you take half the normal penalties for being \glossterm{resurrected} (see \pcref{Resurrection}).
            ",
            modifiers: Some(vec![Modifier::Durability(3)]),
        },
        RankAbility {
            complexity: 1,
            name: "Soulbound Resilience+",
            is_magical: true,
            rank: 6,
            description: r"
                The durability bonus increases to \plus5.
                In addition, you take no penalties for being \glossterm{resurrected}.
            ",
            modifiers: Some(vec![Modifier::Durability(2)]),
        },
    ]
}
