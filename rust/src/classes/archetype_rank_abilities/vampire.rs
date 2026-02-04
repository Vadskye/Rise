use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::Defense;
use crate::creatures::Modifier;

pub fn vampire<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Blood Drain",
            complexity: 2,
            description: r"
                Whenever you \glossterm{injure} a creature with blood using your bite natural weapon, you can increase your \glossterm{fatigue level} by one.
                If you do, you regain \glossterm{hit points} at the end of the round.
                The recovery is equal to the hit points the target lost from the strike, ignoring negative hit points and any damage increase from critical hits.

                Unless otherwise specified, all living creatures have blood.
                Some nonliving creatures, such as vampires, also have blood.
            ",
            is_magical: false,
            modifiers: None,
            rank: 1,
        },
        RankAbility {
            name: "Gentle Fangs",
            complexity: 1,
            description: r"
                Whenever you deal damage using your bite natural weapon, you can choose not to reduce the target's hit points below 0, or you can treat the damage as \glossterm{subdual damage}.
                In addition, damage dealt using your bite natural weapon does not wake sleeping creatures unless you inflict a vital wound.
            ",
            is_magical: false,
            modifiers: None,
            rank: 2,
        },
        RankAbility {
            name: "Sheltering Coffin",
            complexity: 2,
            description: r"
                You can designate a coffin as your home by completing a long rest in it every day for a week.
                When you take a \glossterm{long rest} in your home coffin, you recover two \glossterm{vital wounds} instead of one.
                In addition, you can cross running water without penalty while in your home coffin.
            ",
            is_magical: true,
            modifiers: None,
            rank: 2,
        },
        RankAbility {
            name: "Charming Gaze",
            complexity: 2,
            description: r"
              \begin{magicalsustainability}{Charming Gaze}{Standard action}
                \abilitytags \abilitytag{Emotion}, \abilitytag{Subtle}, \abilitytag{Sustain} (minor), \abilitytag{Visual}
                \rankline
                Make an attack vs. Mental against all humanoid creatures and undead creatures in a \medarea cone from you.
                You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
                \hit The target is \charmed by you.
                Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
                Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
                An observant target may interpret overt threats to its allies as a threat to itself.

                \rankline
                The attack's \glossterm{accuracy} increases by \plus2 for each rank beyond 3.
              \end{magicalsustainability}
            ",
            is_magical: true,
            modifiers: None,
            rank: 3,
        },
        RankAbility {
            name: "Creature of the Night",
            complexity: 4,
            description: r"
              \begin{magicalattuneability}{Creature of the Night}{Standard action}
                \abilitytags \abilitytag{Attune}
                \rankline
                You \glossterm{shapeshift} into the form of a Tiny bat, a Medium cloud of mist, or your normal humanoid form.
                \begin{raggeditemize}
                  \item Bat: While in your bat form, you gain \sense{blindsense} (120 ft.) and \sense{blindsight} (30 ft.).
                    You cannot speak and have no \glossterm{free hands}.
                    All of your normal movement modes are replaced with an average fly speed with a 60 ft. height limit.
                  \item Mist: While in your mist form, you become \trait{floating}, \trait{intangible}, and \trait{legless}.
                    You cannot speak and have no \glossterm{free hands}.
                    All of your normal movement modes are replaced with a slow \glossterm{fly speed} with a 30 foot \glossterm{height limit} (see \pcref{Flight}).
                \end{raggeditemize}

                In either non-humanoid form, you are unable to take any standard actions, but you can still take \glossterm{move actions} in place of standard actions.
                Since you have no walk speed in those forms, flying does not make you \unsteady.
                You cannot use this ability while \paralyzed.
              \end{magicalattuneability}
            ",
            is_magical: true,
            modifiers: None,
            rank: 4,
        },
        RankAbility {
            name: "Reviving Coffin",
            complexity: 1,
            description: r"
                Your home coffin can revive you from death.
                As long as some part of your corpse, even just a pinch of ash, is placed inside your home coffin, you will resurrect there after 24 hours.
                Only the destruction of your home coffin or the total annihilation of your corpse can prevent your return.
            ",
            is_magical: true,
            modifiers: None,
            rank: 5,
        },
        RankAbility {
            complexity: 0,
            description: r"You gain a +1 bonus to your Armor, Brawn, Reflex, and Mental defenses. However, you take a -2 penalty to your Fortitude defense.",
            is_magical: false,
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Brawn, 1),
                Modifier::Defense(Defense::Reflex, 1),
                Modifier::Defense(Defense::Mental, 1),
                Modifier::Defense(Defense::Fortitude, -2),
            ]),
            rank: 5,
            name: "Unholy Resilience",
        },
        // Injury-only confused is 2.9 EA, or r9. Limited scope drops to r8, humanoid-only drops 0.1 EA to r7, and class feature drops
        // it to r6.
        RankAbility {
            name: "Dominating Gaze",
            complexity: 2,
            description: r"
              \begin{magicalactiveability}{Dominating Gaze}{Standard action}
                \abilitytags \abilitytag{Emotion}, \abilitytag{Visual}
                \rankline
                Make an attack vs. Mental against all humanoid \glossterm{enemies} and undead enemies within a \medarea \glossterm{cone} from you.
                \hit If the target is \glossterm{injured} or its \glossterm{character rank} is at least 2 lower than yours, it is \confused as a \glossterm{condition}.
                \crit If the target was already confused from a previous use of this ability, you may \glossterm{attune} to this ability.
                When you do, the target becomes \dominated by you for the duration of that attunement.
                This attunement only allows you to control one creature, not each target of this spell, and you can only attune to this effect once.

                \rankline
                The attack's \glossterm{accuracy} increases by \plus2 for each rank beyond 6.
              \end{magicalactiveability}
            ",
            is_magical: true,
            modifiers: None,
            rank: 6,
        },
        RankAbility {
            name: "Blood Drain+",
            complexity: 1,
            description: r"
                You can use this ability without increasing your fatigue level.
                After you do, you \glossterm{briefly} cannot do so again.
            ",
            is_magical: true,
            modifiers: None,
            rank: 7,
        },
        RankAbility {
            name: "Eternal Undeath",
            complexity: 1,
            description: r"
                You can designate up to three home coffins, rather than only one.
                This can allow you to travel with one coffin while keeping others safe for emergencies.
            ",
            is_magical: true,
            modifiers: None,
            rank: 7,
        },
    ]
}
