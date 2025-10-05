use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::Resource;
use crate::creatures::Modifier;

pub fn automaton<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Modular Carapace",
            is_magical: false,
            rank: 1,
            description: r"
                You can adjust the density and layering of your hardened exterior to augment your defenses.
                Changing your configuration in this way requires 10 minutes of work, and spare armor parts that you generally keep with you.
                You can choose to treat your carapace as being either light, medium, or heavy armor.
                To gain the full benefits of your carapace, you must have proficiency with armor of the appropriate usage class.
                The benefits from this ability are considered to come from body armor, and do not stack with actual body armor.

                You can use magic armor to build your carapace.
                If you do, the magic armor becomes embedded in your body.
                You can attune to it to benefit from its effects.
                If you use light modular carapace, this can allow you to benefit from two different magic armor effects.

                \begin{raggeditemize}
                    \item Light armor: You gain a \plus3 bonus to your Armor defense and a \plus2 bonus to your \glossterm{durability}.
                    You can wear body armor on top of this carapace.
                    Although the benefits of that armor do not stack with the carapace, you can use the higher Armor defense value and durability bonus from either armor.
                    \item Medium armor: You gain a \plus5 bonus to your Armor defense, a \plus4 bonus to your \glossterm{durability}, and a \plus1 bonus to \glossterm{vital rolls}.
                    However, your Dexterity bonus to your Armor defense is halved, and you cannot wear body armor.
                    \item Heavy armor: You gain a \plus6 bonus to your Armor defense, a \plus8 bonus to your \glossterm{durability}, and a \plus2 bonus to \glossterm{vital rolls}.
                    However, your Dexterity bonus to your Armor defense is halved, you take a \minus10 foot penalty to your speed with all movement modes, and you cannot wear body armor.
                    Unlike normal for heavy body armor, you do not need a minimum Strength to use this armor.
                \end{raggeditemize}

                If you lose your original armor parts, you can create or buy new parts that are suited to your body.
                These parts are considered a Rank 1 (40 gp) item.
            ",
            modifiers: None, // Too complex for simple modifiers, description handles it
        },
        RankAbility {
            complexity: 1,
            name: "Modular Armaments",
            is_magical: false,
            rank: 2,
            description: r"
                You can customize your arms.
                Changing your arm configuration in this way requires 10 minutes of work, and spare arm and weapon parts that you generally keep with you.
                It also requires at least one \glossterm{free hand}.
                You can combine any number of different customizations with this ability.
                Some customizations apply to both of your arms, but others apply to only one arm, as indicated.
                \begin{raggeditemize}
                    \item Bulky: You augment both of your arms with additional strength.
                    You gain a \plus1 bonus to your \glossterm{mundane power}, and to your Strength for the purpose of determining your \glossterm{weight limits}.
                    However, you take a \minus1 penalty to your Reflex defense.
                    \item Plated: You add additional protective plating to both of your arms.
                    You gain a \plus1 bonus to your Armor defense.
                    However, you take a \minus1 penalty to your \glossterm{accuracy} with \glossterm{strikes}.
                    \item Slim: You trim away excess muscle from both of your arms to make their movements more precise.
                    You gain a \plus1 bonus to your \glossterm{accuracy} with \glossterm{strikes}.
                    However, you take a \minus1 penalty to your \glossterm{mundane power} and your Brawn defense.
                    \item Weapon: You convert one of your arms into a manufactured weapon of your choice that you are \glossterm{proficient} with.
                    It is considered either a \glossterm{natural weapon}, a manufactured weapon, or both whenever it would be beneficial for you.
                    However, that arm no longer has a \glossterm{free hand}.
                    You can incorporate a magic weapon into this process or find a smith to imbue your arm parts as if they were a magic weapon.
                    If you do, you can attune to the magic weapon property, and it affects this weapon.
                \end{raggeditemize}

                If you lose your original arm and weapon parts, you can create or buy new parts that are suited to your body.
                These parts are considered a Rank 1 (40 gp) item.
            ",
            modifiers: None, // Too complex for simple modifiers, description handles it
        },
        RankAbility {
            complexity: 2,
            name: "Sharpening Slash",
            is_magical: true,
            rank: 3,
            description: r"
                \begin{activeability}{Sharpening Slash}{Standard action}
                    \rankline
                    Make a \glossterm{strike} that deals \glossterm{extra damage} equal to half your \glossterm{power}.
                    Then, if you did not get a critical hit with the strike, you are \glossterm{briefly} \honed.

                    \rankline
                    \rank{4} The extra damage increases to 1d6 \add half your power.
                    \rank{5} The extra damage increases to 1d6 \add your power.
                    \rank{6} The extra damage increases to 3d6 \add your power.
                    \rank{7} The strike deals double \glossterm{weapon damage}.
                \end{activeability}
            ",
            modifiers: None, // Damage scaling handled by description
        },
        RankAbility {
            complexity: 1,
            name: "Embedded Apparel",
            is_magical: true,
            rank: 4,
            description: r"
                You can embed magic apparel into your body with an hour of work.
                The item becomes a part of your body, and would require another hour of work to remove.
                This allows you to use one additional apparel item from each body slot (see \pcref{Body Slots}).
                For example, you could embed one set of magic boots into your feet and then wear another pair of magic boots over them.
                You also gain an additional \glossterm{attunement point} that you can only use to attune to items embedded into your body.
                You cannot embed a \glossterm{legacy item} in this way.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Reassembly",
            is_magical: false,
            rank: 5,
            description: r"
                You can recover from vital wounds more easily by simply replacing broken parts. 
                You can remove a vital wound with ten minutes of work.
                This increases your \glossterm{fatigue level} by three, and it requires replacement parts that you generally keep with you.
                The parts are considered a consumable Rank 3 (200 gp) item.

                This can even save you from death, though that is more difficult and requires more advanced parts.
                A creature can spend eight hours replacing broken parts of your corpse to \glossterm{resurrect} you (see \pcref{Resurrection}).
                This requires a \glossterm{difficulty value} 20 \glossterm{extended check} using a Craft skill appropriate to the composition of your body.
                The parts required to perform this feat are considered a consumable Rank 5 (5,000 gp) item.
            ",
            modifiers: None, // Complex effect, description handles it
        },
        RankAbility {
            complexity: 1,
            name: "Artificial Mind",
            is_magical: false,
            rank: 6,
            description: r"
                You become immune to \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.
            ",
            modifiers: None, // Immunity, description handles it
        },
        RankAbility {
            complexity: 1,
            name: "Infinite Edge",
            is_magical: false,
            rank: 7,
            description: r"
                You are always \honed.
                When an ability would cause you to become honed, such as your \ability{sharpening slash} ability, you become \empowered instead.
            ",
            modifiers: None, // Complex effect, description handles it
        },
    ]
}
