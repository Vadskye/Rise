use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Resource};
use crate::core_mechanics::attacks::Maneuver;
use crate::creatures::Modifier;
use crate::skills::{KnowledgeSubskill, Skill};

pub fn assassin<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 1,
            name: "Sneak Attack",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Sneak Attack}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike} with a \weapontag{Light} or \weapontag{Compact} weapon against a creature within \rngshort range (see \pcref{Weapon Tags}).

                    The strike deals 1d4 \glossterm{extra damage} if the target is \unaware or \partiallyunaware of your attack, or if they are adjacent to one of your \glossterm{allies}.
                    This extra damage is doubled if the target is fully unaware of your attack.
                    You do not gain this damage against creatures that you are unable to score a \glossterm{critical hit} against.

                    \rankline
                    \rank{2} The extra damage increases to 1d6.
                    \rank{3} The extra damage increases to 1d10.
                    \rank{4} The extra damage increases to 2d8.
                    \rank{5} The extra damage increases to 4d8.
                    \rank{6} The extra damage increases to 6d8.
                    \rank{7} The extra damage increases to 8d10.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Exotic Assassination Tools",
            is_magical: false,
            rank: 1,
            description: r"
                If you spend an \glossterm{insight point}, you can become proficient with all \weapontag{Compact} and \weapontag{Light} exotic weapons (see \pcref{Exotic Weapons}).
                You must already be proficient with all Compact and Light non-exotic weapons.
            ",
            // This is an abstraction of the effect of exotic weapons being better
            modifiers: Some(vec![Modifier::ExtraDamage(DamageDice::new(0))]),
        },
        RankAbility {
            complexity: 1,
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
                You take no damage from \glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
                This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Evasion+",
            is_magical: false,
            rank: 6,
            description: r"
                This ability also protects you from area attacks against your Fortitude and Mental defenses.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Darkstalker",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{attuneability}{Darkstalker}{\abilitytag{Attune}}
                    \abilityusagetime Standard action.
                    \rankline
                    You become completely undetectable by your choice of one of the following sense groups:
                    \begin{itemize}
                        \item \trait{Blindsense} and \trait{blindsight}
                        \item \trait{Darkvision}
                        \item \abilitytag{Detection} abilities
                        \item \trait{Lifesense} and \trait{lifesight}
                        \item \trait{Scent}
                        \item \abilitytag{Scrying} abilities
                        \item \trait{Tremorsense} and \trait{tremorsight}
                    \end{itemize}
                    If you have access to any other more unusual senses, such as the \textit{blood sense} ability from the Executioner feat, you may also choose one of those senses as a separate sense group.
                \end{attuneability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Darkstalker+",
            is_magical: false,
            rank: 5,
            description: r"
                You can attune to this ability multiple times.
                Each time, you can choose a different sense group.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Darkstalker++",
            is_magical: false,
            rank: 7,
            description: r"
                When you use this ability, you become undetectable by up to three of the possible sense groups rather than only one.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Hide in Plain Sight",
            is_magical: false,
            rank: 4,
            description: r"
                You can use the \textit{hide} ability without moving in a way that causes observers to lose sight of you.
                This does not remove the bonus that observers receive if you have no cover or concealment at all.
                After you hide in this way, you \glossterm{briefly} cannot do so again.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Assassination",
            is_magical: false,
            rank: 5,
            description: r"
                \begin{activeability}{Assassination}
                    \abilityusagetime Standard action.
                    \rankline
                    You study a creature within \rngmed range, finding weak points you can take advantage of.
                    As a \glossterm{brief} effect, whenever you make a \glossterm{strike} against the target while it is adjacent to you and \unaware of the attack, the strike deals maximum damage and automatically \glossterm{explodes} regardless of what you roll.
                \end{activeability}
            ",
            modifiers: None,
        },
    ];
    add_sneak_attack(&mut abilities);
    abilities
}

fn add_sneak_attack(abilities: &mut Vec<RankAbility<'_>>) {
    for rank in 1..8 {
        abilities.append(&mut vec![
            RankAbility {
                name: "Sneak Attack Scaling",
                rank,
                modifiers: Some(vec![Modifier::Maneuver(Maneuver::SneakAttack(rank))]),
                ..Default::default()
            },
        ]);
    }
}

pub fn bardic_music<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 3,
            name: "Bardic Performances",
            is_magical: true,
            rank: 1,
            description: r"
                You learn two \textit{bardic performances} from the list below.
                You can also spend \glossterm{insight points} to learn one additional bardic performance per \glossterm{insight point}.

                When you use a \textit{bardic performance} ability, you begin a performance using one of your Perform skills.
                If you have a Perform \glossterm{trained skill} that you can use to make an relevant performance, you gain a \plus1 bonus to \glossterm{accuracy} with any \textit{bardic performance} ability using that Perform skill.
                There are four types of performances: dance, instrumental, manipulation, and vocal.
                \begin{raggeditemize}
                    \item Dance: You use your body to dance or act. This limits your ability to defend yourself, giving you a \minus2 penalty to your Armor and Reflex defenses as a \atSwift effect. Dance performances have the \atVisual tag.
                    \item Instrumental: You use an instrument to make music. This requires at least one \glossterm{free hand} to use the instrument. Instrumental performances have the \atAuditory tag.
                    \item Manipulation: You use objects or gestures to perform, such as juggling or puppetry. This requires at least one \glossterm{free hand} to use the objects. Manipulation performances have the \atVisual tag.
                    \item Vocal: You use your voice to orate or sing. This prevents you from talking or using other abilities with \glossterm{verbal components}. Vocal performances have the \atAuditory tag.
                \end{raggeditemize}

                The names of bardic performances do not have to precisely match your actual performance.
                For example, you can use the \textit{palliative poem} ability with a gentle song using Perform (wind instruments) or a distracting joke using Perform (comedy) instead of a poem.

                Many bardic performances require you to sustain the performance as a \glossterm{minor action}.
                If the targets stop being able to see or hear you, depending on the nature of your performance, the effect ends for them as if you had stopped sustaining the performance.
                However, targets do not stop being affected by your performance simply by travelling beyond the initial range of the bardic performance ability.
                Using a bardic performance ability with an immediate effect does not interfere with your ability to sustain other bardic performance abilities.
                {
                    % Bardic performance power guidelines:
                    % These generally start from the same rank 1 baseline effect as spells.
                    % Since there are no higher rank bardic performances, they need more aggressive rank scalings to ensure
                    % that a rank 7 bardic performance is comparable to a rank 7 spell.
                    % In general, bardsongs are likely to trade damage or accuracy for increased area.
                    %
                    % Bardsong debuffs are interesting, since they can't be removed like conditions, but also can't be stacked.
                    % For now, they're just ranked in the same way as conditions.
                    \begin{magicalsustainability}{Ballad of Belligerence}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit For the duration of your performance, the target is \enraged.
                        Every round, it must spend a \glossterm{standard action} to make an attack.

                        \rankline
                        The attack gains a \plus2 accuracy bonus for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalactiveability}{Boastful Bravura}
                        \abilityusagetime Standard action.
                        \rankline
                        This ability affects all \glossterm{enemies} within a \largearea radius from you.
                        You \glossterm{briefly} gain a \plus4 accuracy bonus against each target.

                        \rankline
                        \rank{3} The area increases to a \hugearea radius.
                        \rank{5} The area increases to a \gargarea radius.
                        \rank{7} The ability affects all enemies who can see or hear you.
                    \end{magicalactiveability}

                    \begin{magicalsustainability}{Cadenza of Courage}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Choose one \glossterm{ally} within \medrange.
                        For the duration of your performance, the target gains a \plus1 \glossterm{accuracy} bonus.

                        \rankline
                        \rank{3} The target also gains a \plus2 bonus to its Mental defense.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{7} The bonus to Mental defense increases to \plus4.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Cantata of Caution}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Choose one \glossterm{ally} within \medrange.
                        For the duration of your performance, the target gains a \plus1 bonus to its Armor and Reflex defenses.

                        \rankline
                        \rank{3} The bonus applies to all defenses.
                        \rank{5} The bonus to Armor and Reflex defenses increases to \plus2.
                        \rank{7} The bonus to Fortitude and Mental defenses also increases to \plus2.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Cleansing Counterpoint}{\abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Choose one \glossterm{ally} within \rngmed range.
                        The target chooses one of its \glossterm{conditions}.
                        For the duration of your performance, the target is unaffected by that condition.

                        \rankline
                        \rank{3} You can target an additional \glossterm{ally} within range.
                        \rank{5} If a target increases its \glossterm{fatigue level} by one, it can remove the chosen effect permanently.
                        \rank{7} This ability affects two conditions instead of one.
                        A target must increase its fatigue level by two to remove both conditions.
                    \end{magicalsustainability}

                    \begin{magicalactiveability}{Crashing Cacaphony}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Fortitude against all \glossterm{enemies} in a \tinyarea radius from you.
                        \hit \damagerankonelow.
                        \miss Half damage.

                        \rankline
                        \rank{2} The damage increases to \damageranktwolow.
                        \rank{3} The area increases to a \smallarea radius.
                        \rank{4} The damage increases to \damagerankthreelow.
                        \rank{5} The area increases to a \medarea radius.
                        \rank{6} The damage increases to \damagerankfivelow.
                        \rank{7} The area increases to a \largearea radius.
                    \end{magicalactiveability}

                    \begin{magicalsustainability}{Dazzling Discordance}{\abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} within a \smallarea radius from you.
                        \hit For the duration of your performance, each target is \dazzled.

                        \rankline
                        \rank{2} The area increases to a \medarea radius.
                        \rank{3} You gain a \plus1 \glossterm{accuracy} bonus with the attack.
                        \rank{4} The area increases to a \largearea radius.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{6} The area increases to a \hugearea radius.
                        \rank{7} The accuracy bonus increases to \plus3.
                    \end{magicalsustainability}

                    \begin{magicalactiveability}{Dirge of Doom}[\abilitytag{Emotion}]
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit \damagerankonelow.

                        \rankline
                        \rank{2} The damage increases to \damageranktwolow.
                        \rank{3} The damage increases to \damagerankthreelow.
                        \rank{4} The damage increases to \damagerankfourlow.
                        \rank{5} The damage increases to \damagerankfivelow.
                        \rank{6} The damage increases to \damageranksixlow.
                        \rank{7} The damage increases to \damageranksevenlow.
                    \end{magicalactiveability}

                    \begin{magicalsustainability}{Dizzying Ditty}{\abilitytag{Compulsion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit For the duration of your performance, the target is \stunned while it has no remaining \glossterm{damage resistance}.
                        \crit The target is stunned even if it has damage resistance remaining.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Frightening Fugue}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one creature within \shortrange.
                        \hit The target is \frightened by you for the duration of your performance.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Hypnotic Hymn}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
                        \hit For the duration of your performance, the target is \charmed by you.
                        This ability does not have the \abilitytag{Subtle} tag, so an observant target may notice it is being influenced either during this effect or after it ends.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Intonation of Ingenuity}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        Choose one \glossterm{ally} within \rngmed range.
                        For the duration of your performance, the target gains a \plus1 bonus to \glossterm{checks}.

                        \rankline
                        \rank{3} The bonus increases to \plus2.
                        \rank{5} The bonus increases to \plus3.
                        \rank{7} The bonus increases to \plus4.
                    \end{magicalsustainability}

                    \begin{magicalactiveability}{Palliative Poem}[\abilitytag{Swift}]
                        \abilityusagetime Standard action.
                        \rankline
                        Choose one living \glossterm{ally} within \medrange.
                        The target regains 2d6 \glossterm{damage resistance} and increases its \glossterm{fatigue level} by one.
                        In addition, it \glossterm{briefly} gains a +2 bonus to its Mental defense.

                        \rankline
                        \rank{2} The recovery increases to 2d10.
                        \rank{3} The recovery increases to 4d6.
                        \rank{4} The recovery increases to 6d6.
                        \rank{5} The recovery increases to 5d10.
                        \rank{6} The recovery increases to 7d10.
                        \rank{7} The recovery increases to 10d10.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Partita of Provocation}[\abilitytag{Emotion}]
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against one \glossterm{enemy} adjacent to you.
                        \hit The target is \goaded by you for the duration of your performance.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{magicalactiveability}

                    \begin{magicalsustainability}{Serenade of Serenity}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime \glossterm{Minor action}.
                        \rankline
                        For the duration of your performance, you and all \glossterm{allies} within a \largearea radius from you gain a \plus4 bonus to their defenses against \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.

                        \rankline
                        \rank{3} At the end of each round, each target removes all \glossterm{conditions} caused by Compulsion and Emotion effects that were not applied during that round.
                        \rank{5} The area increases to a \areahuge radius.
                        \rank{7} Each target is immune to Compulsion and Emotion attacks.
                    \end{magicalsustainability}

                    \begin{magicalactiveability}{Stutterstep Staccato}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Fortitude against all \glossterm{enemies} within a \smallarea radius from you.
                        \hit For the duration of your performance, each target is \slowed while it has no remaining \glossterm{damage resistance}.
                        \crit The target is slowed even if it has damage resistance remaining.

                        \rankline
                        \rank{2} The area increases to a \medarea radius.
                        \rank{3} You gain a \plus1 \glossterm{accuracy} bonus with the attack.
                        \rank{4} The area increases to a \largearea radius.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{6} The area increases to a \hugearea radius.
                        \rank{7} The accuracy bonus increases to \plus3.
                    \end{magicalactiveability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Bardic Performances+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional bardic performance.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Bardic Lore",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to your rank in this archetype to Knowledge skills that you are untrained in (see \pcref{Trained Skills}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Bardic Lore+",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus2 bonus to all Knowledge skills.
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
            complexity: 1,
            name: "Musical Tolerance",
            is_magical: false,
            rank: 2,
            description: r"
                You are \impervious to \abilitytag{Auditory} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Musical Tolerance+",
            is_magical: false,
            rank: 5,
            description: r"
                You are \glossterm{immune} to \abilitytag{Auditory} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Bardic Training",
            is_magical: false,
            rank: 3,
            description: r"
                You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::TrainedSkill, 1)]),
        },
        RankAbility {
            complexity: 2,
            name: "Virtuoso",
            is_magical: true,
            rank: 4,
            // Has to be minor -> free instead of "sustain two performances at once" to allow bards
            // to active a second performance as a minor action while sustaining their previous
            // performance as a free action.
            description: r"
                Once per round, you can \glossterm{sustain} one bardic performance as a \glossterm{free action} if it would normally require a \glossterm{minor action}.
                You cannot sustain multiple instances of the same performance, but you can sustain two different performances.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "All the World's a Stage",
            is_magical: true,
            rank: 7,
            description: r"
                Your targeted \textit{bardic performance} abilities no longer have range limits.
                Instead, you can target any creatures who can see or hear you, even if you do not have \glossterm{line of sight} or \glossterm{line of effect}.
                You must still decide who you are intending to target, and attempting to target a nonexistent creature can cause the bardic performance to fail without effect.
                This does not affect area abilities, and it does not increase the number of targets you can choose.
            ",
            modifiers: None,
        },
    ]
}

pub fn combat_trickster<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Trick Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can confuse and confound your foes in combat.
                You gain access to one of the following \glossterm{combat styles}: \combatstyle{dirty fighting}, \combatstyle{ebb and flow}, or \combatstyle{mobile hunter}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn trick \glossterm{maneuvers} from trick combat styles that you have access to.

                You learn two rank 1 trick \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some trick maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Trick Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You learn an additional trick maneuver.
                In addition, you gain access to rank 3 trick maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Trick Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 trick maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Trick Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 trick maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your trick maneuvers.
                For each rank 1 trick maneuver you know, choose one augment from the list below and apply it to that maneuver.
                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 trick maneuvers.
                {
                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this augment to maneuvers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are at less than their maximum \glossterm{hit points}.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 4 - your excess rank but the strike deals double \glossterm{weapon damage}.
                    If your excess rank is at least 5, this becomes an accuracy bonus.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your land speed.
                    You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.
                    This movement is never \abilitytag{Swift}.
                    If your chosen maneuver is Swift, you can only walk after using the maneuver, not before.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your excess rank.
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
                You can also choose an augment for each of your rank 3 trick maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 trick maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}

pub fn jack_of_all_trades<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Dabbler",
            is_magical: false,
            rank: 1,
            description: r"
                You gain two additional \glossterm{insight points}.
                In addition, you can spend insight points to gain one additional \glossterm{trained skill} per insight point.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::InsightPoint, 2)]),
        },
        RankAbility {
            complexity: 1,
            name: "Dabbler+",
            is_magical: false,
            rank: 4,
            description: r"
                You gain an additional \glossterm{insight point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::InsightPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Skill Exemplar",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to all skills.
                In addition, using the \ability{desperate exertion} ability to affect a skill check only increases your \glossterm{fatigue level} by one.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 1),
                Modifier::Skill(Skill::Awareness, 1),
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Climb, 1),
                Modifier::Skill(Skill::Craft, 1),
                Modifier::Skill(Skill::CreatureHandling, 1),
                Modifier::Skill(Skill::Deception, 1),
                Modifier::Skill(Skill::Deduction, 1),
                Modifier::Skill(Skill::Devices, 1),
                Modifier::Skill(Skill::Disguise, 1),
                Modifier::Skill(Skill::Endurance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Intimidate, 1),
                Modifier::Skill(
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
                    1,
                ),
                Modifier::Skill(Skill::Medicine, 1),
                Modifier::Skill(Skill::Perform, 1),
                Modifier::Skill(Skill::Persuasion, 1),
                Modifier::Skill(Skill::Profession, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::SocialInsight, 1),
                Modifier::Skill(Skill::Stealth, 1),
                Modifier::Skill(Skill::Survival, 1),
                Modifier::Skill(Skill::Swim, 1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Skill Exemplar+",
            is_magical: false,
            rank: 5,
            description: r"
                The skill bonus increases to \plus3.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 2),
                Modifier::Skill(Skill::Awareness, 2),
                Modifier::Skill(Skill::Balance, 2),
                Modifier::Skill(Skill::Climb, 2),
                Modifier::Skill(Skill::Craft, 2),
                Modifier::Skill(Skill::CreatureHandling, 2),
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Deduction, 2),
                Modifier::Skill(Skill::Devices, 2),
                Modifier::Skill(Skill::Disguise, 2),
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Skill(Skill::Flexibility, 2),
                Modifier::Skill(Skill::Intimidate, 2),
                Modifier::Skill(
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
                ),
                Modifier::Skill(Skill::Medicine, 2),
                Modifier::Skill(Skill::Perform, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::Profession, 2),
                Modifier::Skill(Skill::Ride, 2),
                Modifier::Skill(Skill::SleightOfHand, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
                Modifier::Skill(Skill::Stealth, 2),
                Modifier::Skill(Skill::Survival, 2),
                Modifier::Skill(Skill::Swim, 2),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Skill Exemplar+",
            is_magical: false,
            rank: 7,
            description: r"
                The skill bonus increases to \plus5.
                In addition, once per \glossterm{short rest} you can use the \ability{desperate exertion} ability to affect a skill check without increasing your fatigue level.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 2),
                Modifier::Skill(Skill::Awareness, 2),
                Modifier::Skill(Skill::Balance, 2),
                Modifier::Skill(Skill::Climb, 2),
                Modifier::Skill(Skill::Craft, 2),
                Modifier::Skill(Skill::CreatureHandling, 2),
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Deduction, 2),
                Modifier::Skill(Skill::Devices, 2),
                Modifier::Skill(Skill::Disguise, 2),
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Skill(Skill::Flexibility, 2),
                Modifier::Skill(Skill::Intimidate, 2),
                Modifier::Skill(
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
                ),
                Modifier::Skill(Skill::Medicine, 2),
                Modifier::Skill(Skill::Perform, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::Profession, 2),
                Modifier::Skill(Skill::Ride, 2),
                Modifier::Skill(Skill::SleightOfHand, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
                Modifier::Skill(Skill::Stealth, 2),
                Modifier::Skill(Skill::Survival, 2),
                Modifier::Skill(Skill::Swim, 2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Versatile Expertise",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to an attribute of your choice.
            ",
            // Arbitrarily choose Dex, which should be good for rogues
            modifiers: Some(vec![Modifier::Attribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Versatile Expertise+",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to a different attribute of your choice.
            ",
            // Arbitrarily choose Intelligence
            modifiers: Some(vec![Modifier::Attribute(Attribute::Intelligence, 1)]),
        },
    ]
}

pub fn suave_scoundrel<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Confound",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Confound}[\abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against a creature within \shortrange.
                    Your \glossterm{accuracy} is equal to your Deception skill.
                    \hit The target it is compelled to spend its next \glossterm{standard action} doing nothing at all.
                    After it takes this standard action, it becomes immune to this effect until it finishes a \glossterm{short rest}.

                    \rankline
                    \rank{3} You can target an additional creature within range.
                    \rank{5} The range increases to \longrange.
                    \rank{7} The maximum number of targets increases to 3.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Trick Magic Device",
            is_magical: true,
            rank: 2,
            description: r"
                You can use wands as if you were able to cast arcane spells.
                Your maximum spell rank is equal to your rank in this archetype.
                In addition, you gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic wands or apparel items.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Trick Magic Device+",
            is_magical: true,
            rank: 5,
            description: r"
                You can use wands as if you were able to cast spells from all \glossterm{magic sources}, not just arcane spells.
                In addition, you gain a \plus2 bonus to \glossterm{accuracy} with abilities granted to you by magic items.
                This includes spells cast from wands, the special strike you can make with a \mitem{flaming} weapon, and other similar abilities.
                However, it does not include ordinary strikes or maneuvers that simply use a magic weapon.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Exploit Distraction",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{Exploit Distraction}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike}.
                    If the target gained a new \glossterm{condition} this round, the strike deals double \glossterm{weapon damage}.
                    This does not apply if the creature was already suffering an identical condition when it gained the new condition.

                    \rankline
                    \rank{4} The increased damage also applies if the target gained a new condition during the previous round, as long as it is still affected by that condition.
                    \rank{5} You gain a +1 accuracy bonus with the strike.
                    \rank{6} The strike deals triple weapon damage instead of double weapon damage.
                    \rank{7} The accuracy bonus increases to +3.
                \end{activeability}
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "What's That Over There",
            is_magical: false,
            rank: 4,
            description: r"
                \begin{activeability}{What's That Over There}[\abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make a attack vs. Mental against a creature within \medrange.
                    Your \glossterm{accuracy} is equal to your Deception skill.
                    In addition, choose a location on stable ground within range.
                    \hit As a \glossterm{brief} effect, the target is compelled to move to the location you chose if it can do so safely, and it cannot take any actions except to move to the location and look around at it.
                    After this effect ends, the target becomes immune to it until it finishes a \glossterm{short rest}.

                    \rankline
                    \rank{6} You can target an additional creature within range.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Master of Deceit",
            is_magical: false,
            rank: 6,
            description: r"
                Whenever you make a Deception attack or check, you can roll twice and keep the higher result.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Nothing Is Real",
            is_magical: false,
            rank: 7,
            description: r"
                \begin{activeability}{Nothing Is Real}[\abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against a creature within \shortrange.
                    Your \glossterm{accuracy} is equal to your Deception skill.
                    \hit The target is \glossterm{briefly} convinced that nothing is real.
                    It is unable to take any actions and is \unaware of all attacks against it.
                    After this effect ends, the target becomes immune to it until it finishes a \glossterm{short rest}.
                \end{activeability}
            ",
            modifiers: None,
        },
    ]
}
