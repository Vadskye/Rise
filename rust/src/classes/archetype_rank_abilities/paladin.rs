use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

pub fn devoted_paragon<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Aligned Aura",
            is_magical: true,
            rank: 1,
            description: r"
                Your devotion to your alignment affects the world around you, bringing it closer to your ideals.
                You constantly radiate an aura in a \areamed radius \glossterm{emanation} from you.
                You can create the aura as a \glossterm{free action}, and it lasts until it is dismissed.
                Creating the aura has the \abilitytag{Swift} ability tag.

                Whenever you create the aura, you can choose which creatures within the area are affected by the aura.
                You can choose whether it affects any combination of yourself, your \glossterm{allies}, your \glossterm{enemies}, and other creatures.
                The effect of the aura depends on your devoted alignment, as described below.

                % 10% chance of +5.5a, so 0.55a per ally.
                \subcf{Chaos} Whenever a target rolls a 1 on an attack roll, the attack roll \glossterm{explodes} (see \pcref{Exploding Attacks}).
                This does not affect bonus dice rolled for exploding attacks.

                \subcf{Evil} Each target suffers a \minus1 penalty to its Armor defense as long as it is affected by at least one \glossterm{condition}.

                % TODO: clarify what happens if multiple people try to Good aura the same target
                \subcf{Good} Whenever a targeted \glossterm{ally} would gain a \glossterm{vital wound}, you may gain a \glossterm{vital wound} instead.
                You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                The target suffers any other effects of the attack normally.

                % 10% chance of +4a, so 0.4a per ally
                \subcf{Law} Whenever a target rolls a 1 on an attack roll, their attack result becomes equal to 5 \add their \glossterm{accuracy} with the attack.
                This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
            ",
            // Most auras loosely correlate to +0.5 accuracy in an AOE? For power level purposes,
            // approximate as a personal +1 accuracy.
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Aligned Aura+",
            is_magical: true,
            rank: 4,
            description: r"
                The effect of your \textit{aligned aura} becomes stronger, as described below.
                In addition, the area increases to a \largearea radius \glossterm{emanation} from you.

                \subcf{Chaos} The effect triggers on rolling either a 1 or a 2.
                \subcf{Evil} The penalty applies to all defenses.
                \subcf{Good} When a targeted \glossterm{ally} would lose \glossterm{hit points}, you may lose those hit points instead.
                This causes you to suffer any special effects of the attack that trigger on taking damage or losing hit points, while the target does not.
                The target suffers any other effects of the attack normally.
                % 0.7a per ally
                \subcf{Law} The effect triggers on rolling either a 1 or a 2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Aligned Aura++",
            is_magical: true,
            rank: 7,
            description: r"
                The effect of your \textit{aligned aura} reaches its full power, as described below.
                In addition, the area increases to a \hugearea radius \glossterm{emanation} from you.

                \subparhead{Chaos} This also affects bonus dice rolled for exploding attacks.
                \subparhead{Evil} The penalty increases to \minus2.
                \subparhead{Good} The \glossterm{vital roll} bonus increases to \plus10.
                % 1a per ally (0.4+0.3+0.2+0.1)
                \subparhead{Law} The effect triggers on rolling anything less than a 5.
            ",
            // Another awkward approximation
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Aligned Immunity",
            is_magical: true,
            rank: 2,
            description: r"
                Your devotion to your alignment grants you immunities.

                \subparhead{Chaos} You are immune to \atCompulsion attacks.
                \subparhead{Evil} You are immune to being \charmed and \goaded.
                \subparhead{Good} You are immune to \atCurse attacks and being \dominated.
                \subparhead{Law} You are immune to \atEmotion attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Aligned Immunity+",
            is_magical: true,
            rank: 5,
            description: r"
                This immunity is shared with your \glossterm{allies} within the area of your \textit{aligned aura}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Paragon Power",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Paragon Power+",
            is_magical: false,
            rank: 6,
            description: r"
                The power bonuses increase to \plus2.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
    ]
}

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![RankAbility {
        complexity: 4,
        name: "Divine Spells",
        is_magical: true,
        rank: 1,
        description: r"
                Your devotion to your alignment grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn divine spells from divine mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 divine \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Ability Usage Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of divine spells that you can learn is equal to your rank in this archetype.
                Divine spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
        modifiers: None,
    }]
}

pub fn divine_spell_expertise<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Divine Conduit",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever you cast a \glossterm{targeted} spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may add yourself or a creature adjacent to you as a \glossterm{secondary target} of the spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Divine Spell Versatility",
            is_magical: true,
            rank: 2,
            description: r"
                You learn a spell from one of the mystic spheres that are unique to divine spellcasters: \sphere{channel divinity} or \sphere{prayer}.
                You do not have to have access to that mystic sphere.
                When you gain access to new spell ranks, you can change which spell you know with this ability, including spells with a higher rank.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Divine Spell Versatility+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Divine Conduit+",
            is_magical: true,
            rank: 6,
            description: r"
                You can add a second \glossterm{secondary target}, and each additional target can be within 10 feet instead of adjacent to you.
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
            rank: 4,
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
                You gain a \plus1 bonus to your \glossterm{accuracy} and Armor defense.
            ",
            modifiers: Some(vec![
                Modifier::Accuracy(1),
                Modifier::Defense(Defense::Armor, 1),
            ]),
        },
    ]
}

pub fn stalwart_guardian<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Lay on Hands",
            is_magical: true,
            rank: 1,
            description: r"
                % dr3 for touch range, free poison because class feature
                \begin{magicalactiveability}{Lay on Hands}{Standard action}
                    \abilitytags \abilitytag{Swift}
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
                    Choose yourself or a living \glossterm{ally} you touch.
                    The target regains \glossterm{hit points} equal to 2d6 \add your \glossterm{magical power}.
                    In addition, it removes one \glossterm{condition} or poison affecting it.
                    % TODO: wording
                    This removal can only affect conditions and poisons with a rank no more than two ranks higher than your rank in this archetype.

                    \rankline
                    \rank{3} The bonus healing increases to 1d6 per 2 power.
                    \rank{4} The base healing increases to 4d6.
                    \rank{5} The bonus healing increases to 1d10 per 2 power.
                    \rank{6} The bonus healing increases to 1d6 per power.
                    \rank{7} The base healing increases to 4d8, and the bonus healing increases to 1d8 per power.
                \end{magicalactiveability}

            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Lay on Hands+",
            is_magical: true,
            rank: 4,
            description: r"
                In addition to regaining hit points, you can cause the target to remove a \glossterm{vital wound}.
                If a vital wound is removed in this way, you increase your \glossterm{fatigue level} by three.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Lay on Hands+",
            is_magical: true,
            rank: 7,
            description: r"
                When you use this ability on a creature other than yourself, it also targets you.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Stalwart Resilience",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to your \glossterm{durability}.
                In addition, you gain a \plus1 bonus to your \glossterm{vital rolls} (see \pcref{Vital Wounds}).
            ",
            modifiers: Some(vec![Modifier::Durability(2), Modifier::VitalRoll(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Stalwart Resilience+",
            is_magical: false,
            rank: 5,
            description: r"
                This durability bonus increases to \plus4, and the vital roll bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Durability(2), Modifier::VitalRoll(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Stalwart Defense",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Armor and Fortitude defenses.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Fortitude, 1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Stalwart Core",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
    ]
}

pub fn zealous_warrior<'a>() -> Vec<RankAbility<'a>> {
    vec![
        // Normally we would want some accuracy scaling for a solo attack like this.
        // Here, we rely on the rest of the archetype to compensate for the raw power of smite,
        // with Zealous Fixation particularly helping low-accuracy paladins.
        RankAbility {
            complexity: 2,
            name: "Smite",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{magicalactiveability}{Smite}{Standard action}
                    \rankline
                    Make a \glossterm{strike}.
                    You add half your Strength to your \glossterm{magical power} to determine your total power with this ability (see \pcref{Power}).
                    If the target has your devoted alignment, you take damage equal to half your power (minimum 1), even if you miss with the strike.

                    % This has a scaling dip at rank 4 which lines up with the powerful Zealous Fixation ability
                    \rankline
                    \rank{2} You add your full Strength instead of half your Strength.
                    \rank{3} You deal \glossterm{extra damage} equal to half your power.
                    \rank{4} If you miss, the target still takes half damage.
                    \rank{5} The strike deals double \glossterm{weapon damage}.
                    \rank{6} The extra damage increases to be equal to your power.
                    \rank{7} The strike deals triple \glossterm{weapon damage}.
                \end{magicalactiveability}
            ",
            // TODO: represent special attacks
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Detect Anathema",
            is_magical: true,
            rank: 2,
            description: r"
                \begin{magicalactiveability}{Detect Anathema}{\glossterm{Minor action}}
                    \abilitytags \abilitytag{Detection}
                    \rankline
                    You know the number of creatures within a \largearea cone from you that have the alignment opposed to your devoted alignment.
                    This does not give you any specific information about the location of those creatures.
                    Since this is a \abilitytag{Detection} ability, it can penetrate some solid obstacles (see \pcref{Detection}).

                    \rankline
                    \rank{4} You also learn the location of all creatures with that alignment.
                    \rank{6} The area changes to a \largearea radius instead of a cone.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Fearless Zeal",
            is_magical: false,
            rank: 3,
            description: r"
                You are immune to being \frightened and \panicked.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 3,
            name: "Zealous Fixation",
            is_magical: true,
            rank: 4,
            description: r"
                Whenever you miss a creature with a \glossterm{strike}, you \glossterm{briefly} reroll your attack rolls against that creature once and keep the higher result.
                This does not affect your attack rolls against other creatures.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Zealous Offense",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 \glossterm{accuracy} bonus.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Unwavering Zeal",
            is_magical: false,
            rank: 6,
            description: r"
                You are immune to being \stunned and \confused.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Pass Judgment",
            is_magical: true,
            rank: 7,
            description: r"
                \begin{magicalactiveability}{Pass Judgment}{\glossterm{Minor action}}
                    \abilitytags \atSubtle
                    \abilitycost One \glossterm{fatigue level}.
                    \rankline
                    Choose one creature within \distrange.
                    You always gain the benefit of your \ability{zealous fixation} ability against that creature.
                    In addition, the target is treated as if it had the alignment opposed to your devoted alignment for the purpose of all abilities, not just your own.
                    This only affects its alignment along the alignment axis your devoted alignment is on.
                    For example, if your devoted alignment was evil, a chaotic neutral target would be treated as chaotic good.
                    This effect lasts until you treat that creature as an \glossterm{ally}, or until you \glossterm{dismiss} this ability.

                    You can use this ability to do battle against foes who share your alignment, but you should exercise caution in doing so.
                    Persecution of those who share your ideals can lead you to fall and become an ex-paladin.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}
