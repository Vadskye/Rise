use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;

pub fn devoted_paragon<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a bonus equal to twice your rank in this archetype to your maximum \glossterm{hit points} (minimum 1).
            ",
            modifiers: Some(vec![Modifier::HitPoints(1)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 1,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(2)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(4)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(6)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(8)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 5,
            description: "",
            // This rank is when greater enduring devotion kicks in
            modifiers: Some(vec![Modifier::HitPoints(15)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(18)]),
        },
        RankAbility {
            name: "Enduring Devotion",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::HitPoints(21)]),
        },
        RankAbility {
            name: "Aligned Aura",
            is_magical: true,
            rank: 1,
            description: r"
                Your devotion to your alignment affects the world around you, bringing it closer to your ideals.
                You constantly radiate an aura in a \areamed radius \glossterm{emanation} from you.
                You can suppress or resume the aura as a \glossterm{minor action}.
                Whenever you resume the aura, you can choose which creatures within the area are affected by aura as any combination of yourself, your \glossterm{allies}, your \glossterm{enemies}, and other creatures.
                The effect of the aura depends on your devoted alignment, as described below.

                \subparhead{Chaos} Whenever a target rolls a 1 on an attack roll with a \glossterm{strike}, it \glossterm{explodes} (see \pcref{Exploding Attacks}.
                This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
                \subparhead{Evil} Each target suffers a \minus1 penalty to \glossterm{defenses} as long as it is affected by at least one \glossterm{condition}.
                % TODO: clarify what happens if multiple people try to Good aura the same target
                \subparhead{Good} Whenever a target gains a \glossterm{vital wound}, you may gain a \glossterm{vital wound} instead.
                You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                The target suffers any other effects of the attack normally.
                \subparhead{Law} Whenever a target rolls a 1 on an attack roll with a \glossterm{strike}, the attack roll is treated as a 6.
                This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
            ",
            // Most auras loosely correlate to +0.5 accuracy in an AOE? For power level purposes,
            // approximate as a personal +1 accuracy.
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Aligned Immunity",
            is_magical: true,
            rank: 2,
            description: r"
                Your devotion to your alignment grants you immunities.

                \subparhead{Chaos} You are immune to the \slowed, \decelerated, and \immobilized effects.
                \subparhead{Evil} You are immune to \abilitytag{Curse} effects.
                \subparhead{Good} You are immune to the \shaken, \frightened, and \panicked effects.
                \subparhead{Law} You are immune to the \dazed, \stunned, and \confused effects.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Paragon Power",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{power} with all abilities.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(2), Modifier::MundanePower(2)]),
        },
        RankAbility {
            name: "Greater Aligned Aura",
            is_magical: true,
            rank: 4,
            description: r"
                The effect of your \textit{aligned aura} becomes stronger, as described below.
                In addition, the area increases to a \largearea radius \glossterm{emanation} from you.

                \subparhead{Chaos} The effect applies to all attacks, not just \glossterm{strikes}.
                % TODO: explain how this works on monsters
                \subparhead{Evil} Whenever a target removes a \glossterm{condition}, it takes 2d8 \add half \glossterm{power} energy damage.
                This damage increases by \plus1d for each rank beyond 4.
                \subparhead{Good} When a target would lose \glossterm{hit points}, you may lose those hit points instead.
                The target suffers any other effects of the attack normally, though it is not treated as if it lost hit points from the attack for the purpose of special attack effects.
                \subparhead{Law} The effect applies to all attacks, not just \glossterm{strikes}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Enduring Devotion",
            is_magical: true,
            rank: 5,
            description: r"
                The bonus from your \textit{enduring devotion} ability increases to three times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Aligned Immunity",
            is_magical: true,
            rank: 5,
            description: r"
                The effect of your \textit{aligned immunity} ability is shared with your \glossterm{allies} within the area of your \textit{aligned aura}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Paragon Power",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{paragon power} ability increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(4), Modifier::MundanePower(4)]),
        },
        RankAbility {
            name: "Supreme Aligned Aura",
            is_magical: true,
            rank: 7,
            description: r"
                The effect of your \textit{aligned aura} reaches its full power, as described below.
                In addition, the area increases to a \hugearea radius \glossterm{emanation} from you.

                \subparhead{Chaos} The effect triggers on rolling either a 1 or a 2.
                \subparhead{Evil} The penalty increases to \minus2.
                \subparhead{Good} The \glossterm{vital roll} bonus increases to \plus5.
                \subparhead{Law} The effect triggers on rolling either a 1 or a 2.
            ",
            // Another awkward approximation
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ];
}

pub fn divine_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            is_magical: true,
            rank: 0,
            description: r"
                Your devotion to your alignment grants you the ability to use divine magic.
                You gain access to one divine \glossterm{mystic sphere} (see \pcref{Divine Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional divine \glossterm{mystic sphere} per two \glossterm{insight points}.
                You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
                You do not yet gain access to any other spells from those mystic spheres.

                Divine spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spellcasting",
            is_magical: true,
            rank: 1,
            description: r"
                You become a rank 1 divine spellcaster.
                You learn two rank 1 \glossterm{spells} from divine \glossterm{mystic spheres} you have access to.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
                Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.
                All of those spells must be from divine mystic spheres you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (2)",
            is_magical: true,
            rank: 2,
            description: r"
                You become a rank 2 divine spellcaster.
                This gives you access to spells that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (3)",
            is_magical: true,
            rank: 3,
            description: r"
                You become a rank 3 divine spellcaster.
                This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (4)",
            is_magical: true,
            rank: 4,
            description: r"
                You become a rank 4 divine spellcaster.
                This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (5)",
            is_magical: true,
            rank: 5,
            description: r"
                You become a rank 5 divine spellcaster.
                This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (6)",
            is_magical: true,
            rank: 6,
            description: r"
                You become a rank 6 divine spellcaster.
                This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (7)",
            is_magical: true,
            rank: 7,
            description: r"
                You become a rank 7 divine spellcaster.
                This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
    ];
}

pub fn divine_spell_expertise<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Combat Caster",
            is_magical: true,
            rank: 0,
            description: r"
                You reduce your \glossterm{focus penalty} by 2.
            ",
            modifiers: Some(vec![Modifier::FocusPenalty(-2)]),
        },
        RankAbility {
            name: "Divine Spell Versatility",
            is_magical: false,
            rank: 1,
            description: r"
                You learn a spell from one of the mystic spheres that are unique to divine spellcasters: \sphere{bless} or \sphere{channel divinity}.
                You do not have to have access to that mystic sphere.
                As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Combat Caster",
            is_magical: true,
            rank: 2,
            description: r"
                The penalty reduction from your \textit{combat caster} ability increases to 4.
            ",
            modifiers: Some(vec![Modifier::FocusPenalty(-2)]),
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
            name: "Divine Spell Versatility",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional spell with your \textit{divine spell versatility} ability.
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
            name: "Attunement Point",
            is_magical: true,
            rank: 7,
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
            name: "Stalwart Defense",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a \plus1 bonus to your Fortitude defense and Mental defense.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Lay on Hands",
            is_magical: true,
            rank: 1,
            description: r"
            You can use the \textit{lay on hands} ability as a standard action.
                \begin{instantability}{Lay on Hands}[Instant]
                    \abilitytag{Healing}, \abilitytag{Magical}
                    \rankline
                    Choose yourself or a living \glossterm{ally} within your \glossterm{reach}.
                    The target regains 1d10 \add \glossterm{power} \glossterm{hit points}.
                    After you use this ability, you \glossterm{briefly} cannot use it or any other \abilitytag{Healing} ability.

                    \rankline
                    \rank{2} The healing increases to 2d6.
                    \rank{3} The healing increases to 2d10.
                    \rank{4} The healing increases to 4d6.
                    \rank{5} The healing increases to 4d10.
                    \rank{6} The healing increases to 5d10.
                    \rank{7} The healing increases to 7d10.
                \end{instantability}
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
            name: "Stalward Resilience",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Stalward Resilience",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Stalward Resilience",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(20)]),
        },
        RankAbility {
            name: "Stalward Resilience",
            is_magical: false,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(24)]),
        },
        RankAbility {
            name: "Stalward Resilience",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(28)]),
        },
        RankAbility {
            name: "Greater Stalwart Defense",
            is_magical: false,
            rank: 3,
            description: r"
                The bonus from your \textit{stalwart defense} ability increases to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Greater Lay on Hands",
            is_magical: true,
            rank: 4,
            description: r"
                When you use your \textit{lay on hands} ability, you can choose to remove a \glossterm{brief} effect or \glossterm{condition} of the target's choice from it instead of restoring its hit points.
                Alternately, you can choose to remove a \glossterm{vital wound} of the target's choice from it.
                If a vital wound is removed in this way, you increase your \glossterm{fatigue level} by three.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Stalwart Force",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Stalwart Resilience",
            is_magical: false,
            rank: 5,
            description: r"
                The resistance bonus from your \textit{stalwart resilience} ability increases to four times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Stalwart Defense",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{stalwart defense} ability increases to \plus3.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Defense(Defense::Mental, 1),
            ]),
        },
        RankAbility {
            name: "Supreme Lay on Hands",
            is_magical: true,
            rank: 7,
            description: r"
                When you use your \textit{lay on hands} ability on a creature other than yourself, it also affects you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Stalwart Force",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{stalwart force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
    ];
}

pub fn zealous_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Unflagging Zeal",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a \plus1 bonus to your \glossterm{fatigue tolerance}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::FatigueTolerance, 1)]),
        },
        RankAbility {
            name: "Smite",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{smite} ability as a standard action.
                \begin{instantability}{Smite}[Instant]
                    \abilitytag{Magical}
                    \rankline
                    Make a \glossterm{strike} with a \plus1d damage bonus.
                    Because this is a \glossterm{magical} ability, you use your magical \glossterm{power} to determine your damage instead of your \glossterm{mundane} power.
                    If your target shares your devoted alignment, you take a single point of \glossterm{energy damage} as feedback from the attack warning you that you are persecuting a creature that shares your alignment.

                    \rankline
                    \rank{3} The damage bonus increases to \plus2d.
                    \rank{5} The damage bonus increases to \plus3d.
                    \rank{7} The damage bonus increases to \plus4d.
                \end{instantability}
            ",
            // TODO: represent special attacks
            modifiers: None,
        },
        RankAbility {
            name: "Detect Anathema",
            is_magical: true,
            rank: 2,
            description: r"
                You can use the \textit{detect anathema} ability as a standard action.
                \begin{instantability}{Detect Anathema}[Instant]
                    \abilitytag{Detection}, \abilitytag{Magical}
                    \rankline
                    You know the number of creatures within a \\largearea cone from you that have the alignment opposed to your devoted alignment.
                    This does not give you any specific information about the location of those creatures.
                    Since this is a \abilitytag{Detection} ability, it can penetrate some solid obstacles (see \pcref{Detection}).

                    \rankline
                    \rank{4} You also learn the location of all creatures with that alignment.
                    \rank{6} You can use this ability as a \glossterm{minor action}.
                    When you do, you \glossterm{briefly} cannot use this ability as a minor action again.
                \end{instantability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Forceful Zeal",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Zealous Fixation",
            is_magical: true,
            rank: 3,
            description: r"
                Whenever you hit a creature with a \glossterm{strike}, you ignore all \glossterm{miss chances} against that creature with your attacks until you take a \glossterm{short rest} or until you hit a different creature with a strike.
                If you hit multiple creatures with the same strike, you may freely choose which creature to fixate on with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Unflagging Zeal",
            is_magical: false,
            rank: 4,
            description: r"
                The bonus from your \textit{unflagging zeal} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::FatigueTolerance, 1)]),
        },
        RankAbility {
            name: "Greater Forceful Zeal",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{forceful zeal} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Pass Judgment",
            is_magical: true,
            rank: 5,
            description: r"
                You can use the \textit{pass judgment} ability as a \glossterm{minor action}.
                \begin{durationability}{Pass Judgment}[Duration]
                    \abilitytag{Magical}
                    \par \noindent Usage time: One \glossterm{minor action}
                    \rankline
                    Choose one creature within \distrange.
                    You always gain the benefit of your \textit{zealous fixation} ability against that creature.
                    In addition, the subject is treated as if it had the alignment opposed to your devoted alignment for the purpose of all abilities.
                    This only affects its alignment along the alignment axis your devoted alignment is on.
                    For example, if your devoted alignment was evil, a chaotic neutral target would be treated as chaotic good.
                    This effect lasts until you treat that creature as an \glossterm{ally}, or until you \glossterm{dismiss} this ability as a \glossterm{free action}.

                    You can use this ability to do battle against foes who share your alignment, but you should exercise caution in doing so.
                    Persecution of those who share your ideals can lead you to fall and become an ex-paladin.
                \end{durationability}
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
                \begin{durationability}{Zealous Pursuit}[Instant]
                    \abilitytag{Magical}
                    \par \noindent Usage time: One \glossterm{minor action}
                    \rankline
                    You \glossterm{teleport} up to \distrange into an unoccupied space on solid ground adjacent to one creature of your choice affected by your \abilitytag{zealous fixation} ability.
                    You do not need \glossterm{line of sight} or \glossterm{line of effect} to the creature.
                    If multiple valid destination spaces exist, you teleport into the one closest to your original location.
                    If no valid destination spaces exist, this ability fails with no effect.

                    After you use this ability, you \glossterm{briefly} cannot use it again.
                \end{durationability}
            ",
            modifiers: None,
        },
    ];
}
