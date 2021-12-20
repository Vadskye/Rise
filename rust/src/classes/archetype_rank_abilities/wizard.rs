use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;
use crate::skills::{KnowledgeSubskill, Skill};

pub fn alchemist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Alchemical Infusion",
            is_magical: true,
            rank: 0,
            description: r"
                You may add half your magical \glossterm{power} to the damage or healing caused by any alchemical items you use.
                In addition, whenever you use an alchemical item, you gain a \plus1d bonus to any damage or healing caused by the item for each rank by which your rank in this archetype exceeds the item's rank.
            ",
            // TODO: add alchemical items as unique attacks
            modifiers: None,
        },
        RankAbility {
            name: "Portable Workshop",
            is_magical: true,
            rank: 1,
            description: r"
                You carry materials necessary to refine low-grade alchemical items wherever you are.
                Where you lack material components, you fill in with some of your own magic, allowing you to create items more easily.
                The items are just as effective when used as items created normally.
                However, they are less durable, since they are partially sustained by your magic.
                Items created with this ability deteriorate and become useless after 24 hours or after you finish a long rest, whichever comes first.

                You can use this ability to create alchemical items with a rank up to your rank in this archetype (see \pcref{Item Ranks}).
                Creating an item in this way functions in the same way as crafting alchemical items normally, with the following changes.
                First, you do not require any raw materials.
                Second, you can create up to three items with this ability with 5 minutes of work.
                Third, you can only maintain the existence of three items with this ability at once.
                If you try to create a fourth item, you must stop maintaining the existence of another item created.
                You can do this as a \glossterm{free action} regardless of distance.
                This removes any lingering effects from the removed item, such as the protective qualities of an \textit{antitoxin elixir}.

            ",
            modifiers: None,
        },
        RankAbility {
            name: "Alchemical Discovery",
            is_magical: true,
            rank: 2,
            description: r"
                You learn how to create alchemical items more effectively.
                You gain your choice of one of the following benefits.
                Each benefit can only be chosen once.
                {
                    \parhead{Aerodynamic Construction} You double the range of thrown alchemical items you create.
                        This does not affect alchemical items that are not designed to be thrown.
                    \parhead{Complex Construction} You can use your portable workshop ability to create items with a rank up to one higher than your rank in this archetype.
                    \parhead{Efficient Crafting} When you craft an alchemical item without using your \textit{portable workshop} ability, you treat it as if it was one rank lower than its actual rank for the purpose of determining its material requirements.
                    % TODO: wording
                    % \parhead{Enduring Construction} The duration of any alchemical item you create is doubled.
                        % In addition, alchemical items that last for a fixed number of uses have their number of uses doubled.
                    \parhead{Explosive Construction} The area affected by any alchemical item you create is doubled.
                    \parhead{Potent Construction} Whenever you create an alchemical item that deals damage or regains hit points, you double the item's flat modifier to damage or healing.
                    For example, a firebomb would deal 1d10+2 damage instead of 1d10+1 damage.
                    This modifier applies you apply any other damage modifiers, such as the power bonus from your \textit{alchemical infusion} ability.
                    \parhead{Repetitive Construction} Whenever you use your \textit{portable workshop} ability, you can create two copies of the same alchemical item.
                    This only counts as one item for the purpose of determining the number of items you can maintain with that ability.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Alchemical Tolerance",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your Fortitude defense.
                In addition, you are immune to poisons.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 2)]),
        },
        RankAbility {
            name: "Alchemical Discovery",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional \textit{alchemical discovery} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Portable Workshop",
            is_magical: true,
            rank: 5,
            description: r"
                The number of items you can simultaneously create and maintain with your \textit{portable workshop} ability increases to 5.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Experienced Quaffing",
            is_magical: false,
            rank: 5,
            description: r"
                You can drink up to two doses of potions, elixirs, and other drinkable alchemical items as part of the same standard action.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Alchemical Discovery",
            is_magical: true,
            rank: 6,
            description: r"
                You gain an additional \textit{alchemical discovery} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Alchemical Tolerance",
            is_magical: true,
            rank: 7,
            description: r"
                The bonus from your \textit{alchemical tolerance} ability increases to \plus4.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 2)]),
        },
        RankAbility {
            name: "Greater Experienced Quaffing",
            is_magical: true,
            rank: 7,
            description: r"
                You can drink a single dose of a potion, elixir, or other drinkable alchemical item as a \glossterm{minor action}.
            ",
            modifiers: None,
        },
    ];
}

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            is_magical: true,
            rank: 0,
            description: r"
                You have the ability to use arcane magic.
                You gain access to one arcane \glossterm{mystic sphere} (see \pcref{Arcane Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional arcane \glossterm{mystic sphere} per two \glossterm{insight points}.
                You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
                You do not yet gain access to any other spells from those mystic spheres.

                Arcane spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Casting Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 0,
            description: r"
                You can use the \textit{mage armor} ability as a standard action.
                \begin{durationability}{Mage Armor}[Duration]
                    \rankline
                    You create a translucent suit of magical armor on your body and over your hands.
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a bonus to \glossterm{damage resistance} equal to twice your rank in this archetype (minimum 1).

                    You can also use a \glossterm{free hand} to wield the barrier as a shield.
                    This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                    Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

                    This ability lasts until you use it again or until you \glossterm{dismiss} it as a free action.
                    In addition, it is automatically dismissed if you wear other body armor of any kind.
                \end{durationability}
            ",
            // Assuming no other armor
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 3),
                Modifier::DamageResistance(1),
            ]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 1,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(2)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(4)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(15)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(24)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(28)]),
        },
        RankAbility {
            name: "Spellcasting",
            is_magical: true,
            rank: 1,
            description: r"
                You become a rank 1 arcane spellcaster.
                You learn two rank 1 \glossterm{spells} from arcane \glossterm{mystic spheres} you have access to.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
                Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.
                All of those spells must be from arcane mystic spheres you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (2)",
            is_magical: true,
            rank: 2,
            description: r"
                You become a rank 2 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (3)",
            is_magical: true,
            rank: 3,
            description: r"
                You become a rank 3 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Mage Armor",
            is_magical: true,
            rank: 3,
            description: r"
                The damage resistance bonus from your \textit{mage armor} ability increases to three times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (4)",
            is_magical: true,
            rank: 4,
            description: r"
                You become a rank 4 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (5)",
            is_magical: true,
            rank: 5,
            description: r"
                You become a rank 5 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (6)",
            is_magical: true,
            rank: 6,
            description: r"
                You become a rank 6 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Mage Armor",
            is_magical: true,
            rank: 6,
            description: r"
                The damage resistance bonus from your \textit{mage armor} ability increases to four times your rank in this archetype.
                In addition, the defense bonus from the body armor increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Spell Rank (7)",
            is_magical: true,
            rank: 7,
            description: r"
                You become a rank 7 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
    ];
}

pub fn arcane_scholar<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Deep Knowledge",
            is_magical: true,
            rank: 0,
            description: r"
                You gain a \plus2 bonus to all Knowledge skills.
                In addition, using the \textit{desperate exertion} ability to affect a roll using a Knowledge skill only causes you to increase your \glossterm{fatigue level} by one instead of two.
            ",
            modifiers: Some(vec![Modifier::Skill(
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Engineering,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Local,
                    KnowledgeSubskill::Nature,
                    KnowledgeSubskill::Planes,
                    KnowledgeSubskill::Religion,
                ]),
                2,
            )]),
        },
        RankAbility {
            name: "Ritualist",
            is_magical: true,
            rank: 1,
            description: r"
                You gain the ability to perform arcane rituals to create unique magical effects (see \pcref{Rituals}).
                The maximum \glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum rank of arcane spell that you can cast.
                In addition, you automatically learn one free arcane ritual of each rank you have access to, including new ranks as you gain access to them.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 1,
            description: r"
                You learn an additional spell from any arcane \glossterm{mystic sphere} that you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Scholastic Insight",
            is_magical: true,
            rank: 2,
            description: r"
                You gain one of the following insights.
                Some insights can be chosen multiple times, as indicated in their descriptions.

                {
                    \parhead{Esoteric Spell Knowledge} You learn a single spell from any arcane \glossterm{mystic sphere}.
                    You do not not need to have access to that mystic sphere.
                    This does not grant you access to that mystic sphere for any other purposes.
                    Whenever you gain access to a new mystic sphere or spell rank, you may choose a different spell with this ability.
                    \par You can choose this insight multiple times, learning an additional spell each time.

                    \parhead{Expanded Sphere Access} You gain access to a new \glossterm{mystic sphere}.
                    \par You cannot choose this insight multiple times.

                    \parhead{Memorized Sphere} % TODO: clarify you need to be high enough rank?
                    Choose a \glossterm{mystic sphere} you have access to.
                    You can perform rituals from that \glossterm{mystic sphere} without having them written in your ritual book.
                    \par You can choose this insight multiple times, choosing a different \glossterm{mystic sphere} each time.

                    \parhead{Sphere Specialization} Choose a a \glossterm{mystic sphere} you have access to.
                    You gain a \glossterm{power} bonus equal to your rank in this archetype and a \plus1 \glossterm{accuracy} bonus with abilities from that \glossterm{mystic sphere}.
                    In exchange, you must lose access to another \glossterm{mystic sphere} you have.
                    You must exchange all spells you know from that \glossterm{mystic sphere} with spells from other \glossterm{mystic spheres} you have access to.
                    \par You cannot choose this insight multiple times.
                }
            ",
            modifiers: None,
        },
        RankAbility {
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
            name: "Scholastic Insight",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional \textit{scholastic insight}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Ritualist",
            is_magical: true,
            rank: 5,
            description: r"
                Whenever you lead a ritual, it requires half the normal number of \glossterm{fatigue levels} and half the normal time to complete, to a minimum of zero fatigue levels.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Scholastic Insight",
            is_magical: true,
            rank: 6,
            description: r"
                You learn an additional \textit{scholastic insight}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Multiple Contingency",
            is_magical: true,
            rank: 7,
            description: r"
                You may have two separate \textit{contingency} abilities active at the same time.
                Each contingency can have separate triggering conditions.
                Only one contigency can trigger each round.
                If multiple contingencies would activate simultaneously, choose one to activate randomly.
            ",
            modifiers: None,
        },
    ];
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Mystic Sphere",
            is_magical: true,
            rank: 0,
            description: r"
                You gain access to an additional arcane \glossterm{mystic sphere}, including all \glossterm{cantrips} from that sphere.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 1,
            description: r"
                You gain your choice of one of the following abilities.
                You can also spend \glossterm{insight points} to learn one additional \textit{mystic insight} per insight point.
                You cannot apply the benefits of more than two \textit{mystic insight} abilities to the same spell.
                {
                    \parhead{Distant Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Spell Knowledge} You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                        You can choose this ability multiple times, learning an additional spell each time.
                    \parhead{Precise Spell} Choose an arcane \glossterm{spell} you know.
                        You gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Powerful Spell} Choose an arcane \glossterm{spell} you know.
                        You gain a +2 bonus to your \glossterm{power} with that spell.
                        This bonus increases to +4 at rank 3, +8 at rank 5, and +16 at rank 7.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Widened Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{area}: Small, Medium, Large, Huge, or Gargantuan.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Intricate Spell",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you cast a spell during the \glossterm{action phase}, you may use this ability to extend the casting time.
                If you do, the spell does not take effect until the \glossterm{delayed action phase}.
                In exchange, you gain a \plus1 bonus to \glossterm{accuracy} with the spell if you were not attacked during the action phase.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(2)]),
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional \textit{mystic insight} ability.
            ",
            modifiers: None,
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
        RankAbility {
            name: "Greater Wellspring of Power",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{wellspring of power} ability increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(4)]),
        },
        RankAbility {
            name: "Mystic Insights",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional \textit{mystic insight} abilities.
            ",
            modifiers: None,
        },
    ];
}

pub fn school_specialist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "School Specialization",
            is_magical: true,
            rank: 0,
            description: r"
                The arcane mystic spheres can be divided into six traditional schools of magic.
                Choose one of the following schools of magic.
                You are a specialist in your chosen school.
                You cannot gain access to any arcane mystic spheres outside of your specialist school, and you cannot learn spells or rituals from those spheres by any means.
                In exchange, you gain an additional \glossterm{insight point}.
                \begin{itemize}
                    \item Abjuration: \sphere{barrier}, \sphere{telekinesis}, \sphere{thaumaturgy}
                    \item Conjuration: \sphere{astromancy}, \sphere{fabrication}, \sphere{summoning}
                    \item Evocation: \sphere{cryomancy}, \sphere{electromancy}, \sphere{pyromancy}
                    \item Illusion: \sphere{enchantment}, \sphere{photomancy}, \sphere{umbramancy}
                    \item Transmutation: \sphere{chronomancy}, \sphere{polymorph}, \sphere{terramancy}
                    \item Necromancy: \sphere{revelation}, \sphere{vivimancy}
                \end{itemize}
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::InsightPoint, 1)]),
        },
        RankAbility {
            name: "School Expertise",
            is_magical: true,
            rank: 1,
            description: r"
                You gain an ability based on your chosen school.
                {
                    \subcf{Abjuration} You gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.

                    \subcf{Conjuration} You double the \glossterm{range} of arcane spells you cast.

                    \subcf{Evocation} You gain a \plus2 bonus to \glossterm{magical} \glossterm{power}.

                    \subcf{Illusion} You gain a \plus1 bonus to \glossterm{accuracy}.

                    \subcf{Transmutation} You gain a \plus2 bonus to your Fortitude, Reflex, or Mental defense.
                    You can change the defense this bonus applies to as a \glossterm{minor action}.

                    \subcf{Necromancy} You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
                    In addition, you gain a \plus1 bonus to Fortitude defense.
                }
            ",
            // Assume evocation
            modifiers: Some(vec![Modifier::MagicalPower(2)]),
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "School Attunement",
            is_magical: true,
            rank: 3,
            description: r"
                You gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to a spell from your chosen school.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Greater School Expertise",
            is_magical: true,
            rank: 4,
            description: r"
                Your understanding of your chosen school improves.
                {
                    \subcf{Abjuration} The bonus to damage resistance increases to four times your rank in this archetype.

                    \subcf{Conjuration} The range improvement increases to triple your range.

                    \subcf{Evocation} The power bonus increases to \plus5.

                    \subcf{Illusion} You gain \stdability{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                    In addition, you gain \stdability{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \pcref{Darkvision}).
                    If you already have that ability, you increase its range by 60 feet.

                    \subcf{Transmutation} The defense bonus increases to \plus3.

                    \subcf{Necromancy} The hit point bonus increases to four times your rank in this archetype.
                    In addition, the Fortitude bonus increases to \plus2.
                }
            ",
            modifiers: Some(vec![Modifier::MagicalPower(3)]),
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "School Resilience",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a defensive ability based on your chosen school.
                {
                    \subcf{Abjuration} You are immune to \glossterm{push} and \glossterm{knockback} effects.
                    In addition, your spells cannot be \glossterm{suppressed} or \glossterm{dismissed} by \glossterm{magical} effects other than your own.

                    \subcf{Conjuration} You passively flicker into the Astral Plane, causing all \glossterm{targeted} attacks against you to have a 10\% \glossterm{failure chance}.

                    \subcf{Evocation} You are \glossterm{impervious} to cold damage, electricity damage, and fire damage.

                    \subcf{Illusion} You are immune to being \dazzled and \blinded.

                    \subcf{Transmutation} You are immune to being \slowed and \immobilized.

                    \subcf{Necromancy} You are \glossterm{impervious} to attacks from creatures with less than half of their maximum hit points remaining and undead creatures.
                }
            ",
            // TODO: represent this somehow?
            modifiers: None,
        },
        RankAbility {
            name: "Supreme School Expertise",
            is_magical: true,
            rank: 7,
            description: r"
                Your understanding of your chosen school improves further.
                {
                    \subcf{Abjuration} The bonus to damage resistance increases to five times your rank in this archetype.

                    \subcf{Conjuration} The range improvement increases to quadruple your range.

                    \subcf{Evocation} The power bonus increases to \plus12.

                    \subcf{Illusion} The accuracy bonus increases to \plus2.

                    \subcf{Transmutation} The defense bonus increases to \plus4.
                    In addition, you can change which defense the bonus applies to as a \glossterm{free action}.

                    \subcf{Necromancy} The hit point bonus increases to five times your rank in this archetype.
                    In addition, the Fortitude bonus increases to \plus3.
                }
            ",
            modifiers: Some(vec![Modifier::MagicalPower(12)]),
        },
    ];
}
