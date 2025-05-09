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
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
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
                You learn an additional pact maneuver.
                In addition, you gain access to rank 3 pact maneuvers.
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
                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are below their maximum \glossterm{hit points}.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 5 - your excess rank but the strike deals double \glossterm{weapon damage}.
                    If your excess rank is at least 6, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

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
                    This functions like light body armor that provides a \plus4 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a \plus1 bonus to your vital rolls and a bonus equal to five times your rank in this archetype to your maximum \glossterm{damage resistance}.
                    In exchange, the \ability{recover} ability no longer causes you to recover hit points or damage resistance (see \pcref{Recover}).

                    \subcf{Covenant of Bloodsharing} At the end of each round, if you dealt damage to a creature that caused it to lose \glossterm{hit points} during that round, you regain \glossterm{hit points} equal to 1d4 \add half your \glossterm{power}.
                    You cannot regain more hit points in this way than the target lost from your attack.
                    In exchange, whenever you take damage, half of that damage is applied to your \glossterm{hit points} directly, ignoring your \glossterm{damage resistance}.

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
                Modifier::DamageResistance(3),
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
                    \subcf{Covenant of Bloodforging} The damage resistance bonus from the armor increases to seven times your rank in this archetype.

                    \subcf{Covenant of Bloodsharing} The healing increases to 1d6 +1 per \glossterm{power}.

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
                    \parhead{Covenant of Bloodforging} The damage resistance bonus from the armor increases to ten times your rank in this archetype.
                    In addition, the defense bonus increases to \plus5.

                    \parhead{Covenant of Bloodsharing} The healing increases to 1d6 plus 1d6 per 2 power.

                    \parhead{Covenant of Soulcursing} You can convert conditions into Curse effects with this ability regardless of the number of Curse effects active on the target.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(6)]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(20)]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(25)]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            complexity: 0,
            name: "Sacrificial Covenant",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(49)]),
        },
        RankAbility {
            complexity: 1,
            name: "Covenant of Power",
            is_magical: true,
            rank: 2,
            description: r"
                You can choose to gain a \plus2 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
                If you do, you take a \minus1 penalty to your \glossterm{fatigue tolerance}.
                Otherwise, you gain a +2 bonus to your \glossterm{fatigue tolerance}.
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
            complexity: 1,
            name: "Exchange Soul Fragment",
            is_magical: true,
            rank: 3,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a fragment of your soul through the link in exchange for aid.
                \begin{magicalactiveability}{Exchange Soul Fragment}[\abilitytag{Swift}]
                    \abilityusagetime Standard action.
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
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
            complexity: 1,
            name: "Exchange Vitality",
            is_magical: true,
            rank: 6,
            description: r"
                Your connection to your soulkeeper deepens, allowing you to send a larger fragment of your soul through the link fragment in exchange for greater aid.
                \begin{magicalactiveability}{Exchange Vitality}
                    \abilityusagetime Standard action.
                    \abilitycost Two \glossterm{fatigue levels}.
                    \rankline
                    Remove one of your \glossterm{vital wounds}.
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
            complexity: 1,
            name: "Pact Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Pact Spells+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional pact spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Survival Pact",
            is_magical: true,
            rank: 1,
            description: r"
                You gain a bonus to your maximum \glossterm{damage resistance} equal to your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Survival Pact+",
            is_magical: true,
            rank: 4,
            description: r"        
                The bonus increases to twice your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Survival Pact+",
            is_magical: true,
            rank: 7,
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
                You cannot choose the same spell with more than two metamagic abilities.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Desperate Spell} Choose a pact \glossterm{spell} you know.
                        When you cast the spell, you may choose to increase your \glossterm{fatigue level} by one.
                        If you do, you gain a +2 accuracy bonus with the spell that round and roll accuracy twice, keeping the higher result.
                        However, you cannot use the \ability{desperate exertion} ability to affect the spell that round.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Distant Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Powerful Spell} Choose a damaging pact \glossterm{spell} you know.
                        It deals \glossterm{extra damage} equal to half your \glossterm{magical power}.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Rituals} You gain the ability to perform pact rituals to create unique magical effects (see \pcref{Spell and Ritual Mechanics}).
                        The maximum \glossterm{rank} of pact ritual you can learn or perform is equal to the maximum \glossterm{rank} of pact spell that you can cast.
                        When you gain this ability, you can memorize a rank 1 pact ritual from any pact mystic sphere you have access to.
                        Whenever you gain access to a new spellcasting rank, you can memorize an additional ritual of that rank or lower.
                        You cannot choose this ability multiple times.
                    \parhead{Widened Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
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
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
                In addition, the extra damage from Powerful Spell increases to be equal to your magical power.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 accuracy bonus.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
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

                \subcf{Devil -- Calculating} You can use your Intelligence in place of your Dexterity to determine your Armor defense.
                Your Intelligence is still halved by armor, just like your Dexterity would be.

                \subcf{Fae -- Alluring} You gain a \plus3 \glossterm{enhancement bonus} to the Deception, Perform, and Persuasion skills.
                
                \subcf{Moirai -- Fatebound} You gain a \plus2 bonus to your \glossterm{vital rolls}.

                \subcf{Precursor -- Burgeoning} You gain a bonus equal to twice your rank in this archetype to your maximum \glossterm{hit points} (see \pcref{Hit Points}).
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

                \subcf{Devil} You gain a \plus1 bonus to your Intelligence.

                \subcf{Fae} You gain a \plus1 bonus to your Perception.
                
                \subcf{Moirai} You gain a \plus1 bonus to your two lowest attributes.
                You can choose between equally low attributes.

                \subcf{Precursor} You gain a \plus1 bonus to your Constitution.
                In addition, your tentacle now deals 1d8 damage and gains the \weapontag{Clinch} \glossterm{weapon tag} (see \pcref{Weapon Tags}).
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

                \subcf{Devil} You gain a bonus to your Mental defense equal to half your Intelligence.

                \subcf{Fae} The skill bonuses increase to \plus5.
                In addition, the Perception bonus increases to \plus2.
                
                \subcf{Moirai} The vital roll bonus increases to \plus5.
                In addition, the attribute bonus also applies to your third lowest attribute.

                \subcf{Precursor} The hit point bonus increases to four times your rank in this archetype.
                In addition, your tentacle now deals 1d10 damage and gains the \weapontag{Long} \glossterm{weapon tag}.
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
                When you gain access to new spell ranks, you can change which spell you know with this ability, including spells with a higher rank.
                {
                    \subcf{Devil -- Tormenting Spell} Each creature hit by the spell becomes tormented by the spell as a \glossterm{condition}.
                    If it loses hit points while it is tormented, the spell \glossterm{repeats} on that creature, and all instances of the condition are removed.
                    You gain a \plus2 accuracy bonus with the repeat for each additional instance of this condition, but the spell still only repeats once.

                    \subcf{Fae -- Hidden Spell} The spell does not have \glossterm{verbal components} or \glossterm{somatic components}.
                    In addition, if it does not deal damage, it gains the \atSubtle tag.

                    \subcf{Moirai -- Inevitable Spell} Whenever you make an attack roll with the spell, if the roll would be less than a 5, treat it as a 5 instead.
                    This does not affect extra dice from exploding attacks.
                    If any other effect would set the minimum roll result of the spell, increase that minimum roll result by 2.

                    \subcf{Precursor -- Eldritch Spell} You gain a \plus2 accuracy bonus with the spell.
                    However, whenever you cast the spell, you \glossterm{briefly} take a \minus2 penalty to your Fortitude and Reflex defenses.
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
                You can \glossterm{attune} to that magic weapon property.
                If you do, you treat all of your weapons, including \glossterm{natural weapons}, as if they had that property.
                This applies in addition to any other special material or magical properties.
                However, it does not stack if the item would already have that property normally.

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
                If you do, you treat your body armor as if it had that property, which changes its \glossterm{damage resistance} appropriately.
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
                You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{damage resistance}.
                In addition, you take half the normal penalties for being \glossterm{resurrected} (see \pcref{Resurrection}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Soulbound Resilience+",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus increases to four times your rank in this archetype.
                In addition, you take no penalties for being \glossterm{resurrected}.
            ",
            modifiers: None,
        },
    ]
}
