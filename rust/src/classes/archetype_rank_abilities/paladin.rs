use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;

pub fn devoted_paragon<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Aligned Aura",
            is_magical: true,
            rank: 1,
            description: r"
                Your devotion to your alignment affects the world around you, bringing it closer to your ideals.
                You constantly radiate an aura in a \areamed radius \glossterm{emanation} from you.
                You can suppress or resume the aura as a \glossterm{free action}.
                Whenever you resume the aura, you can choose which creatures within the area are affected by aura as any combination of yourself, your \glossterm{allies}, your \glossterm{enemies}, and other creatures.
                The effect of the aura depends on your devoted alignment, as described below.

                \subcf{Chaos} Whenever a target \glossterm{explodes} on an attack roll, it gains +2 accuracy with the attack (see \pcref{Exploding Attacks}.

                \subcf{Evil} Each target suffers a \minus1 penalty to its Armor defense as long as it is affected by at least one \glossterm{condition}.

                % TODO: clarify what happens if multiple people try to Good aura the same target
                \subcf{Good} Whenever a targeted \glossterm{ally} would gain a \glossterm{vital wound}, you may gain a \glossterm{vital wound} instead.
                You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                The target suffers any other effects of the attack normally.

                \subcf{Law} Whenever a target rolls a 1 on an attack roll with a \glossterm{strike}, the attack roll is treated as a 6.
                This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
            ",
            // Most auras loosely correlate to +0.5 accuracy in an AOE? For power level purposes,
            // approximate as a personal +1 accuracy.
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Aligned Aura+",
            is_magical: true,
            rank: 4,
            description: r"
                The effect of your \textit{aligned aura} becomes stronger, as described below.
                In addition, the area increases to a \largearea radius \glossterm{emanation} from you.

                \subcf{Chaos} The accuracy bonus increases to +2 accuracy per explosion.
                \subcf{Evil} The penalty applies to all defenses.
                \subcf{Good} When a targeted \glossterm{ally} would lose \glossterm{hit points}, you may lose those hit points instead.
                This causes you to suffer any special effects of the attack that trigger on taking damage or losing hit points, while the target does not.
                The target suffers any other effects of the attack normally.
                \subcf{Law} The effect applies to all attacks, not just \glossterm{strikes}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Aligned Aura+",
            is_magical: true,
            rank: 7,
            description: r"
                The effect of your \textit{aligned aura} reaches its full power, as described below.
                In addition, the area increases to a \hugearea radius \glossterm{emanation} from you.

                \subparhead{Chaos} The accuracy bonus increases to +3 accuracy per explosion.
                \subparhead{Evil} The penalty increases to \minus2.
                \subparhead{Good} The \glossterm{vital roll} bonus increases to \plus10.
                \subparhead{Law} The effect triggers on rolling either a 1 or a 2.
            ",
            // Another awkward approximation
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Aligned Immunity",
            is_magical: true,
            rank: 2,
            description: r"
                Your devotion to your alignment grants you immunities.

                \subparhead{Chaos} You are immune to being \slowed and \immobilized.
                \subparhead{Evil} You are immune to being \charmed and \goaded.
                \subparhead{Good} You are immune to \abilitytag{Curse} attacks and being \dominated.
                \subparhead{Law} You are immune to being \dazed.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Aligned Immunity+",
            is_magical: true,
            rank: 5,
            description: r"
                This immunity is shared with your \glossterm{allies} within the area of your \textit{aligned aura}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Paragon Power",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{power} with all abilities.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Paragon Power+",
            is_magical: false,
            rank: 6,
            description: r"
                The power bonus increases to +3.
            ",
            modifiers: Some(vec![Modifier::Power(4)]),
        },
    ];
}

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Divine Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your devotion to your alignment grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn divine spells from divine mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each mystic sphere you have access to.
                In addition, you learn two rank 1 divine \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                Unless otherwise noted in a spell's description, casting any spell requires a \glossterm{standard action}.
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of divine spells that you can learn is equal to your rank in this archetype.
                Divine spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spells+",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional divine spell.
            ",
            modifiers: None,
        },
    ];
}

pub fn divine_spell_expertise<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Divine Spell Versatility",
            is_magical: false,
            rank: 1,
            description: r"
                You learn a spell from one of the mystic spheres that are unique to divine spellcasters: \sphere{channel divinity} or \sphere{prayer}.
                You do not have to have access to that mystic sphere.
                As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Spell Versatility+",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional spell with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Conduit",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you cast a \glossterm{targeted} spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may target an additional creature adjacent to you with the spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Divine Conduit+",
            is_magical: true,
            rank: 7,
            description: r"
                You can target any number of creatures adjacent to you with this ability instead of only one additional creature.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power}.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Wellspring of Power+",
            is_magical: true,
            rank: 6,
            description: r"
                The power bonus increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
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
    ];
}

pub fn stalwart_guardian<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Lay on Hands",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{lay on hands} ability as a standard action.
                \begin{magicalactiveability}{Lay on Hands}[\abilitytag{Swift}]
                    \rankline
                    Choose yourself or an adjacent living \glossterm{ally}.
                    The target regains 1d6 \glossterm{hit points} +1d per 2 power.
                    In addition, it can remove one poison or disease affecting it, and it \glossterm{briefly} becomes immune to poisons and diseases.

                    Normally, this healing cannot increase the target's hit points above half its maximum hit points.
                    If you increase your \glossterm{fatigue level} by one, you can ignore this limitation.
                    % TODO: define when you can make this decision - after learning all damage and healing? don't want to waste fatigue

                    \rankline
                    \rank{2} The base healing increases to 1d8.
                    \rank{3} The bonus healing increases to 1d6 per 4 power.
                    \rank{4} The base healing increases to 2d6.
                    \rank{5} The bonus healing increases to 1d10 per 4 power.
                    \rank{6} The base healing increases to 2d10.
                    \rank{7} The bonus healing increases to 1d10 per 3 power.
                \end{magicalactiveability}

            ",
            modifiers: None,
        },
        RankAbility {
            name: "Lay on Hands+",
            is_magical: true,
            rank: 4,
            description: r"
                In addition to regaining hit points, you can cause the target to either remove a \glossterm{condition} or a \glossterm{vital wound}.
                If a vital wound is removed in this way, you increase your \glossterm{fatigue level} by three.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Lay on Hands+",
            is_magical: true,
            rank: 7,
            description: r"
                When you use this ability on a creature other than yourself, it also targets you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.
            ",
            modifiers: Some(vec![Modifier::DamageResistance(6)]),
        },
        RankAbility {
            name: "Stalwart Resilience+",
            is_magical: false,
            rank: 5,
            description: r"
                This bonus increases to five times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(25)]),
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(35)]),
        },
        RankAbility {
            name: "Stalwart Defense",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Armor, Fortitude, and Mental defenses.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Stalwart Defense+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus to Fortitude and Mental defense increases to +2.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
    ];
}

pub fn zealous_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Detect Anathema",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{detect anathema} ability as a standard action.
                \begin{magicalactiveability}{Detect Anathema}[\abilitytag{Detection}]
                    \rankline
                    You know the number of creatures within a \largearea cone from you that have the alignment opposed to your devoted alignment.
                    This does not give you any specific information about the location of those creatures.
                    Since this is a \abilitytag{Detection} ability, it can penetrate some solid obstacles (see \pcref{Detection}).

                    \rankline
                    \rank{3} You also learn the location of all creatures with that alignment.
                    \rank{5} The area increases to a \largearea cone.
                    \rank{7} You can use this ability as a \glossterm{minor action}.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Smite",
            is_magical: true,
            rank: 2,
            description: r"
                You can use the \textit{smite} ability as a standard action.
                \begin{magicalactiveability}{Smite}
                    \rankline
                    Make a \glossterm{strike}.
                    You add your Strength to your \glossterm{magical power} to determine your total power with this strike (see \pcref{Power}).
                    If the target has your devoted alignment, this becomes a \glossterm{weak strike} instead.

                    \rankline
                    \rank{3} You no longer gain the normal weapon damage bonus of +1d per two power.
                    Instead, you gain 1d6 extra damage per 4 power (minimum 1d6).
                    \rank{4} The extra damage increases to 1d6 per 3 power.
                    \rank{5} The extra damage increases to 1d8 per 3 power.
                    \rank{6} You gain a +2 accuracy bonus with the strike.
                    \rank{7} The extra damage increases to 1d10 per 3 power.
                \end{magicalactiveability}
            ",
            // TODO: represent special attacks
            modifiers: None,
        },
        RankAbility {
            name: "Fearless Zeal",
            is_magical: false,
            rank: 3,
            description: r"
                You are immune to being \shaken, \frightened, and \panicked.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Zealous Fixation",
            is_magical: true,
            rank: 4,
            description: r"
                Whenever you deal damage to a creature, you ignore all \glossterm{miss chances} against that creature with your attacks until you take a \glossterm{short rest}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Pass Judgment",
            is_magical: true,
            rank: 5,
            description: r"
                You can use the \textit{pass judgment} ability as a \glossterm{minor action}.
                \begin{magicalactiveability}{Pass Judgment}
                    \par \noindent Usage time: One \glossterm{minor action}
                    \rankline
                    Choose one creature within \distrange.
                    You always gain the benefit of your \textit{zealous fixation} ability against that creature.
                    In addition, the target is treated as if it had the alignment opposed to your devoted alignment for the purpose of all abilities.
                    This only affects its alignment along the alignment axis your devoted alignment is on.
                    For example, if your devoted alignment was evil, a chaotic neutral target would be treated as chaotic good.
                    This effect lasts until you treat that creature as an \glossterm{ally}, or until you \glossterm{dismiss} this ability as a \glossterm{free action}.

                    You can use this ability to do battle against foes who share your alignment, but you should exercise caution in doing so.
                    Persecution of those who share your ideals can lead you to fall and become an ex-paladin.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Zealous Offense",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to your \glossterm{accuracy}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Zealous Pursuit",
            is_magical: true,
            rank: 7,
            description: r"
                You can use the \textit{zealous pursuit} ability as a \glossterm{minor action}.
                \begin{magicalactiveability}{Zealous Pursuit}
                    \par \noindent Usage time: One \glossterm{minor action}
                    \rankline
                    You \glossterm{teleport} up to \distrange into an unoccupied space on solid ground adjacent to one creature of your choice affected by your \abilitytag{zealous fixation} ability.
                    You do not need \glossterm{line of sight} or \glossterm{line of effect} to the creature.
                    If multiple valid destination spaces exist, you teleport into the one closest to your original location.
                    If no valid destination spaces exist, this ability fails with no effect.

                    After you use this ability, you \glossterm{briefly} cannot use it again.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ];
}
