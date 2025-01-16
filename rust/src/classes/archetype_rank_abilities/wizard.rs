use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

use super::standard_modifiers::{add_dr_scaling, add_standard_spell_modifiers};

pub fn alchemist<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 3,
            name: "Portable Workshop",
            is_magical: true,
            rank: 1,
            description: r"
                You carry materials necessary to refine low-grade \glossterm{alchemical items} wherever you are.
                This includes any item created using Craft (alchemy), such as potions, elixirs, and alchemist's fire.
                Where you lack material components, you fill in with some of your own magic, allowing you to create items more easily.
                The items are just as effective when used as items created normally.
                However, they are less durable, since they are partially sustained by your magic.

                You can use this ability to create alchemical items with a rank up to your rank in this archetype (see \pcref{Item Ranks}).
                Creating an item in this way functions in the same way as crafting items normally (see \pcref{Crafting Items}), with the following exceptions:
                \begin{raggeditemize}
                    \item You do not require any raw materials or an alchemist's lab.
                    \item Items created with this ability deteriorate and become useless after 24 hours or after you finish a long rest, whichever comes first.
                    \item You can only maintain the existence of four items with this ability at once.
                        If you try to create an item beyond this limit, you must first dismiss another item created.
                        This removes any lingering effects from the removed item, such as the protective qualities of an \textit{antitoxin elixir}.
                    \item Items you create with this ability still have a lingering magic tied to you when destroyed or consumed.
                        With five minutes of work, you can recreate all of those items.
                        This removes any lingering effects from the recreated item.
                \end{raggeditemize}

                You can invest any number of \glossterm{insight points} into this ability.
                Unlike normal for insight points, this does not directly grant you any additional abilities known.
                Instead, for each insight point invested, the number of items you can maintain simultaneously with this ability increases by one.
            ",
            modifiers: None,
        },
        RankAbility{
            complexity: 0,
            name: "Alchemical Toxins",
            is_magical: true,
            rank: 1,
            description: r"
                If you have access to arcane magic, you add the \sphere{toxicology} mystic sphere to your list of arcane mystic spheres (see \pcref{Mystic Spheres}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Alchemical Discovery",
            is_magical: true,
            rank: 2,
            description: r"
                You learn how to create alchemical items more effectively.
                You gain your choice of one of the following benefits.
                Each benefit can only be chosen once.
                You may spend \glossterm{insight points} to gain access to one additional alchemical discovery per two insight points.

                You can only apply one of your alchemical discoveries whenever you create an item.
                For example, if you had both the Aerodynamic Construction and Expanded Construction discoveries, you could not create an item with both double throwing range and double area.
                You would have to choose which alchemical discovery to apply when creating the item.
                {
                    \parhead{Advanced Workshop} You can use your \textit{portable workshop} ability to create items with a rank up to one higher than your rank in this archetype.
                    \parhead{Aerodynamic Construction} You double the range of thrown alchemical items you create.
                        This does not affect alchemical items that are not designed to be thrown.
                    \parhead{Efficient Crafting} When you craft an alchemical item without using your \textit{portable workshop} ability, you treat it as if it was one rank lower than its actual rank for the purpose of determining its material requirements.
                    % TODO: wording, and does this even matter? Affects sunrods.
                    \parhead{Enduring Construction} The duration of alchemical items you create is doubled.
                    In addition, alchemical items that last for a fixed number of uses have that number of uses doubled.
                    \parhead{Expanded Construction} The area affected by any alchemical item you create is doubled.
                    \parhead{Explosive Construction} Whenever you create an alchemical item that deals damage, you can enhance its destructive potential.
                    Attacks with the item gain a \plus2 accuracy bonus.
                    However, if the attacker rolls a 1 on the attack roll, ignoring dice rolled for \glossterm{explosions}, they suffer a \glossterm{glancing blow} from the attack.
                    \parhead{Repetitive Construction} Whenever you use your \textit{portable workshop} ability, you can create two copies of the same alchemical item.
                    This only counts as one item for the purpose of determining the number of items you can maintain with that ability.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Alchemical Discovery+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional \textit{alchemical discovery} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Alchemical Discovery+",
            is_magical: true,
            rank: 6,
            description: r"
                You gain an additional \textit{alchemical discovery} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Alchemical Precision",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a +1 \glossterm{accuracy} bonus with alchemical items.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Alchemical Tolerance",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Fortitude defense.
                In addition, you are immune to \atPoison attacks.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Alchemical Tolerance+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus1 bonus to your Constitution.
                In addition, you are immune to \atAcid attacks.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Quaffing",
            is_magical: false,
            rank: 5,
            description: r"
                You can drink up to two doses of potions, elixirs, and other drinkable alchemical items as part of the same standard action.
            ",
            modifiers: None,
        },
    ]
}

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 4,
            name: "Arcane Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your extensive studies grant you the ability to use arcane magic.
                You gain access to one arcane \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Arcane Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional arcane \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn arcane spells from arcane mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 arcane \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Arcane spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Ability Usage Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of arcane spells that you can learn is equal to your rank in this archetype.
                Arcane spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Arcane Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Arcane Spells+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Mage Armor",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{magicalactiveability}{Mage Armor}
                    \abilityusagetime Standard action.
                    \rankline
                    You create a translucent suit of magical armor on your body and over your hands.
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a bonus to \glossterm{damage resistance} equal to three times your rank in this archetype.

                    You can also use a \glossterm{free hand} to wield the barrier as a shield.
                    This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                    Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

                    This ability lasts until you use it again or until you \glossterm{dismiss} it.
                    In addition, it is automatically dismissed if you wear other body armor of any kind.
                \end{magicalactiveability}
            ",
            // Assuming no other armor
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 2),
                Modifier::DamageResistance(2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Mage Armor+",
            is_magical: true,
            rank: 4,
            description: r"        
                The damage resistance bonus increases to four times your rank in this archetype.
            ",
            // Rank 2: 4. Rank 3: 9.
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Mage Armor+",
            is_magical: true,
            rank: 7,
            description: r"
                The damage resistance bonus increases to five times your rank in this archetype.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    add_dr_scaling(&mut abilities, 1, 3, Some(6));
    abilities
}

pub fn arcane_scholar<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Ritualist",
            is_magical: true,
            rank: 1,
            description: r"
                You gain the ability to perform arcane rituals to create unique magical effects (see \pcref{Spells and Rituals}).
                The maximum \glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum rank of arcane spell that you can cast.
                In addition, you automatically learn one free arcane ritual of each rank you have access to, including new ranks as you gain access to them.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Spell Knowledge",
            is_magical: true,
            rank: 1,
            description: r"
                You learn an additional spell from any arcane \glossterm{mystic sphere} that you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Scholastic Insight",
            is_magical: true,
            rank: 2,
            description: r"
                You gain one of the following insights.
                Some insights can be chosen multiple times, as indicated in their descriptions.
                You may spend \glossterm{insight points} to gain access to one additional scholastic insight per two insight points.

                {
                    \parhead{Arcane Tattoo} You gain a \plus3 bonus to your Fortitude defense, Reflex defense, or Mental defense.
                    \par You can choose this insight multiple times, choosing a different defense each time.

                    \parhead{Esoteric Spell Knowledge} You learn a single spell from any arcane \glossterm{mystic sphere}.
                    You do not not need to have access to that mystic sphere.
                    This does not grant you access to that mystic sphere for any other purposes.
                    Whenever you gain access to a new mystic sphere or spell rank, you may choose a different spell with this ability.
                    \par You can choose this insight multiple times, learning an additional spell each time.

                    \parhead{Expanded Sphere Access} You gain access to a new \glossterm{mystic sphere}.
                    \par You can choose this insight multiple times, gaining access to an additional mystic sphere each time.

                    \parhead{Soulwoven Spell} Choose a spell you know with the \atAttune tag that is not a \glossterm{deep attunement}.
                    That spell becomes permanently active on you without requiring an \glossterm{attunement point}.
                    No outside force can remove it, and you cannot consciously suppress its effects.
                    If the spell would normally release its own attunement or otherwise end as part of its own effect, it is automatically applied to you again after one minute.
                    \par You cannot choose this insight multiple times.

                    \parhead{Sphere Specialization}\nonsectionlabel{Sphere Specialization} Choose a a \glossterm{mystic sphere} you have access to.
                    You gain \plus2 \glossterm{accuracy} bonus with abilities from that \glossterm{mystic sphere}.
                    You can also perform rituals from that \glossterm{mystic sphere} without having them written in your ritual book.
                    In exchange, you must lose access to another \glossterm{mystic sphere} you have.
                    You must exchange all spells you know from that \glossterm{mystic sphere} with spells from other \glossterm{mystic spheres} you have access to.
                    \par You cannot choose this insight multiple times.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Scholastic Insight+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional scholastic insight.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Scholastic Insight+",
            is_magical: true,
            rank: 6,
            description: r"
                You gain an additional scholastic insight.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Contingency",
            is_magical: true,
            rank: 3,
            description: r"
                You gain the ability to prepare a spell so it takes effect automatically if specific circumstances arise.
                % If any spells take more than one standard action, they would need to be excluded from Contingency, but none exist
                % You can apply this ability to any arcane spell that can be cast as a \glossterm{standard action} or \glossterm{minor action}.
                Preparing a spell with this ability takes 5 minutes.
                When the preparation is complete, the spell has no immediate effect.
                Instead, it automatically takes effect when some specific circumstances arise.
                During the time required to cast the spell, you specify what circumstances cause the spell to take effect.

                The spell can be set to trigger in response to any circumstances that a typical human observing you and your situation could detect.
                For example, you could specify ``when I fall at least 50 feet'' or ``when I take a \glossterm{vital wound}'', but not ``when there is an invisible creature within 50 feet of me'' or ``when I have only one \glossterm{hit point} remaining.''
                The more specific the required circumstances, the better -- vague requirements, such as ``when I am in danger'', may cause the spell to trigger unexpectedly or fail to trigger at all.
                If you attempt to specify multiple separate triggering conditions, such as ``when I take damage or when an enemy is adjacent to me'', the spell will randomly ignore all but one of the conditions.

                If the spell needs to be targeted, the trigger condition can specify a simple rule for identifying how to target the spell, such as ``the closest enemy''.
                If the rule is poorly worded or imprecise, the spell may target incorrectly or fail to activate at all.
                Any spells which require decisions, such as the \spell{dimension door} spell, must have those decisions made at the time it is cast.
                You cannot alter those decisions when the contingency takes effect.

                You can have only one spell with this ability active at a time.
                If you use this ability again with a different spell, the old contingency is removed.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Contingency+",
            is_magical: true,
            rank: 7,
            description: r"
                You may have two separate contingencies active at the same time.
                Each contingency may have separate triggering conditions.
                Only one contigency can trigger each round.
                If multiple contingencies would activate simultaneously, choose one to activate randomly.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Ritual Leader",
            is_magical: true,
            rank: 5,
            description: r"
                Whenever you lead a ritual, it requires half the normal number of \glossterm{fatigue levels} and half the normal time to complete, to a minimum of zero fatigue levels.
            ",
            modifiers: None,
        },
    ]
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                You cannot choose the same spell with more than two metamagic abilities.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Calculated Spell} Choose an arcane \glossterm{spell} you know.
                        As a \glossterm{minor action}, you can calculate the effect that the spell would have.
                        When you do, roll 1d10.
                        If you cast that spell that round, you use that die result as your accuracy roll for any attacks that round, exploding as normal if the die result was a 10.
                        After calculating in this way, you \glossterm{briefly} cannot do so again, whether or not you cast the spell.
                        You cannot choose this ability multiple times.
                    \parhead{Distant Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Researched Spell} Choose an arcane \glossterm{spell} you know.
                        You use your Intelligence in place of your Willpower to determine your \glossterm{power} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Rituals} You gain the ability to perform arcane rituals to create unique magical effects (see \pcref{Spells and Rituals}).
                        The maximum \glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum \glossterm{rank} of arcane spell that you can cast.
                        In addition, you automatically learn one free arcane ritual of each rank you have access to, including new ranks as you gain access to them.
                        You cannot choose this ability multiple times.
                    \parhead{Widened Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
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
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Intricate Spell",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you cast a spell, you can use this ability to make the spell's incantations more nuanced and complex.
                If you do, you gain a \plus1 accuracy bonus with the spell this round.
                However, you take a \minus2 penalty to your Armor and Reflex defenses this round.
                This defense penalty is \abilitytag{Swift}.
            ",
            modifiers: Some(vec![
                Modifier::Accuracy(1),
                Modifier::Defense(Defense::Armor, -2),
                Modifier::Defense(Defense::Reflex, -2),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Expert Metamage",
            is_magical: true,
            rank: 2,
            description: r"
                You can spend \glossterm{insight points} to learn one additional metamagic ability per insight point.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Intelligence.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Intelligence, 1)]),
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
                You gain a \plus1 accuracy bonus with spells.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn school_specialist<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "School Specialization",
            is_magical: true,
            rank: 1,
            description: r"
                The arcane mystic spheres can be divided into six traditional schools of magic.
                Choose one of the following schools of magic.
                You are a specialist in your chosen school.
                You cannot gain access to any arcane mystic spheres outside of your specialized school, and you cannot learn spells or rituals from those spheres by any means.
                In exchange, you gain a benefit based on your specialized school.

                \subcf{Abjuration} The \sphere{telekinesis} and \sphere{thaumaturgy} mystic spheres.
                    If you specialize in this school, you gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.

                \subcf{Conjuration} The \sphere{astromancy}, \sphere{fabrication}, and \sphere{summoning} mystic spheres.
                    If you specialize in this school, you gain a \plus30 foot bonus to the \glossterm{range} of arcane spells you cast.

                \subcf{Evocation} The \sphere{cryomancy}, \sphere{electromancy}, and \sphere{pyromancy} mystic spheres.
                    If you specialize in this school, you gain a \plus2 bonus to your \glossterm{magical power}.

                % TODO: this shouldn't scale to +3 accuracy
                \subcf{Illusion} The \sphere{enchantment}, \sphere{photomancy}, and \sphere{umbramancy} mystic spheres.
                    If you specialize in this school, you gain a \plus1 bonus to your \glossterm{accuracy}.

                \subcf{Transmutation} The \sphere{chronomancy}, \sphere{polymorph}, and \sphere{terramancy} mystic spheres.
                    If you specialize in this school, you gain a \plus2 bonus to your Fortitude, Reflex, or Mental defense.
                    You can change which defense this bonus applies to as a \glossterm{minor action}.
                    This ability has the \abilitytag{Swift} tag, so it protects you from attacks during the current phase.

                \subcf{Necromancy} The \sphere{revelation} and \sphere{vivimancy} mystic spheres.
                    If you specialize in this school, you gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
            ",
            // Assume evocation
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            complexity: 0,
            name: "School Specialization+",
            is_magical: true,
            rank: 4,
            description: r"
                Your understanding of your chosen school improves.
                {
                    \subcf{Abjuration} The bonus to damage resistance increases to four times your rank in this archetype.

                    \subcf{Conjuration} The range improvement increases to \plus60 feet.

                    \subcf{Evocation} The power bonus increases to \plus3.

                    \subcf{Illusion} The accuracy bonus increases to \plus2.

                    \subcf{Transmutation} The defense bonus increases to \plus3.

                    \subcf{Necromancy} The hit point bonus increases to four times your rank in this archetype.
                }
            ",
            modifiers: Some(vec![Modifier::Power(3)]),
        },
        RankAbility {
            complexity: 0,
            name: "School Specialization+",
            is_magical: true,
            rank: 7,
            description: r"
                Your understanding of your chosen school reaches its full potential.
                {
                    % TODO: this seems weaker than the other schools
                    \subcf{Abjuration} The bonus to damage resistance increases to five times your rank in this archetype.

                    \subcf{Conjuration} The range improvement increases to \plus90 feet.

                    \subcf{Evocation} The power bonus increases to \plus4.

                    \subcf{Illusion} The accuracy bonus increases to \plus3.

                    \subcf{Transmutation} The defense bonus increases to \plus4.
                    In addition, you can change which defense the bonus applies to as a \glossterm{free action} instead of as a minor action.

                    \subcf{Necromancy} The hit point bonus increases to five times your rank in this archetype.
                }
            ",
            modifiers: Some(vec![Modifier::Power(4)]),
        },
        RankAbility {
            complexity: 1,
            name: "School Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional spell from any mystic sphere within your chosen school, even if you do not have access to that mystic sphere.
                If you already know at least one spell from all mystic spheres within your chosen school, you can instead gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to a spell from your chosen school.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "School Knowledge+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell from any mystic sphere within your chosen school, even if you do not have access to that mystic sphere.
                If you already know at least three spells from all mystic spheres within your chosen school, you can instead gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to a spell from your chosen school.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "School Resilience",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a defensive ability based on your chosen school.
                {
                    \subcf{Abjuration} You are immune to \glossterm{push} and \glossterm{knockback} effects unless you choose to be affected.

                    \subcf{Conjuration} You passively flicker into the Astral Plane, causing all \glossterm{targeted} attacks against you to have a 10\% \glossterm{failure chance}.

                    \subcf{Evocation} You are \trait{impervious} to attacks from your choice of one of the following tags: \atCold, \atElectricity, or \atFire.

                    \subcf{Illusion} You are immune to being \dazzled and \blinded.

                    \subcf{Transmutation} You gain a \plus1 bonus to \glossterm{vital rolls}.

                    \subcf{Necromancy} You are \trait{impervious} to attacks from creatures with less than half of their maximum hit points remaining.
                }
            ",
            // TODO: represent this somehow?
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "School Resilience+",
            is_magical: true,
            rank: 6,
            description: r"
                Your defensive ability based on your chosen school improves.
                {
                    \subcf{Abjuration} You cannot be \grappled.

                    \subcf{Conjuration} The failure chance increases to 20\%.

                    \subcf{Evocation} You are \trait{impervious} to \atCold, \atElectricity, and \atFire attacks.

                    \subcf{Illusion} You are immune to \abilitytag{Emotion} and \abilitytag{Visual} attacks.

                    \subcf{Transmutation} The vital roll bonus increases to \plus2.

                    \subcf{Necromancy} You are \trait{impervious} to attacks from creatures with any missing hit points and undead creatures.
                }
            ",
            // TODO: represent this somehow?
            modifiers: None,
        },
    ]
}
