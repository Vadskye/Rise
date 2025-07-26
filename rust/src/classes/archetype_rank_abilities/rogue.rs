use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Resource};
use crate::core_mechanics::attacks::Maneuver;
use crate::creatures::Modifier;
use crate::skills::{KnowledgeSubskill, Skill};

pub fn assassin<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 2,
            name: "Sneak Attack",
            is_magical: false,
            rank: 1,
            description: r"
                \begin{activeability}{Sneak Attack}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike} with a \weapontag{Light} or \weapontag{Compact} weapon against a creature within \shortrange (see \pcref{Weapon Tags}).

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
                This ability also protects you from area attacks against your Brawn, Fortitude, and Mental defenses.
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
                    If you have access to any other more unusual senses, such as the \textit{mindsight} ability from the Telepath feat, you may also choose one of those senses as a separate sense group.

                    You can attune to this ability multiple times.
                    Each time, you can choose a different sense group.
                \end{attuneability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Darkstalker+",
            is_magical: false,
            rank: 7,
            description: r"
                Each time you attune to this ability, you can choose up to three of the possible sense groups rather than only one.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Assassin's Grace",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Dexterity.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Assassination",
            is_magical: false,
            rank: 5,
            description: r"
                \begin{activeability}{Assassination}
                    \abilityusagetime Standard action.
                    \rankline
                    You study a creature within \rngmed range, finding weak points you can take advantage of.
                    As a \glossterm{brief} effect, whenever you make a \glossterm{strike} against the target while it is adjacent to you and \unaware of the attack, you are \maximized and \primed with that attack.
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

// Reasonable music terms to use:
// * Aria
// * Ballad
// * Bridge
// * Bravura
// * Cabaletta
// * Cadenza
// * Canon
// * Cantata
// * Capriccio
// * Chorus
// * Coda
// * Concerto
// * Duet
// * Elegy
// * Etude
// * Fantasia
// * Finale
// * Fugue
// * Interlude
// * March
// * Medley
// * Minuet
// * Nocturne
// * Overture
// * Prelude
// * Requiem
// * Rhapsody
// * Scherzo
// * Sonata
// * Song
// * Threnody
// * Toccata
// * Waltz

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

                When you use a \textit{bardic performance} ability, you begin a performance using a Perform skill.
                If you are not trained with that Perform skill, you take a \minus2 accuracy penalty with the bardic performance ability.
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
                When you use a bardic performance ability again while you are already sustaining that same ability, you can increase the number of targets affected by your existing performance rather than starting a separate performance.
                Sustaining that single performance allows the effect to continue on any number of targets.
                Using a different bardic performance ability still requires a separate performance and a separate action to sustain that performance.

                If a target of a sustained bardic performance ability stop being able to see or hear you, depending on the nature of your performance, the effect ends for them as if you had stopped sustaining the performance.
                However, targets do not stop being affected by your performance simply by travelling beyond the initial range of the bardic performance ability.
                {
                    % Bardic performance power guidelines:
                    % These generally start from the same rank 1 baseline effect as spells.
                    % Since there are no higher rank bardic performances, they need more aggressive rank scalings to ensure
                    % that a rank 7 bardic performance is comparable to a rank 7 spell.
                    % In general, bardsongs are likely to trade damage or accuracy for increased area.
                    %
                    % Bardsong debuffs are interesting, since they can't be removed like conditions, but also can't be stacked.
                    % For now, they're just ranked in the same way as conditions.

                    % Bards don't pay any EA cost for ally buffs

                    % Primed is 0.8 EA
                    \begin{magicalactiveability}{Boastful Bravura}
                        \abilityusagetime Standard action.
                        \rankline
                        You are \glossterm{briefly} \primed.

                        \rankline
                        % +0.2 EA
                        \rank{3} You are also \glossterm{briefly} \empowered.
                        \rank{5} You are also \glossterm{briefly} immune to being \frightened.
                        \rank{7} You are also \glossterm{briefly} immune to being \panicked.
                    \end{magicalactiveability}

                    % Everyone fortified is 1 EA
                    \begin{magicalsustainability}{Cadenza of Courage}{\abilitytag{Emotion}, \abilitytag{Sustain} (standard), \abilitytag{Swift}}
                        \abilityusagetime Standard action.
                        \rankline
                        All \glossterm{allies} who can see or hear your performance are \fortified.
                        Since this ability has the \atSwift tag, it affects attacks against those allies during the current phase.

                        \rankline
                        \rank{3} This ability also affects you.
                        \rank{5} Each target is also immune to being \frightened.
                        \rank{7} Each target is also immune to being \panicked.
                    \end{magicalsustainability}

                    % Everyone shielded is 1 EA
                    \begin{magicalsustainability}{Cantata of Caution}{\abilitytag{Emotion}, \abilitytag{Sustain} (standard), \abilitytag{Swift}}
                        \abilityusagetime Standard action.
                        \rankline
                        All \glossterm{allies} who can see or hear your performance are \shielded.
                        Since this ability has the \atSwift tag, it affects attacks against those allies during the current phase.

                        \rankline
                        \rank{3} This ability also affects you.
                        % TODO: awkward wording
                        \rank{5} Each target is also immune to being \goaded.
                        \rank{7} Each target is also immune to being \partiallyunaware.
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
                        \rank{7} This ability can affect two conditions instead of one.
                        A target must increase its fatigue level by two to remove both conditions.
                    \end{magicalsustainability}

                    % r1 area gets drX. Normally, small radius would be r2, but idk bard.
                    \begin{magicalactiveability}{Crashing Cacaphony}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Fortitude against all \glossterm{enemies} in a \smallarea radius from you.
                        \hit \damagerankonelow.
                        \miss Half damage.

                        \rankline
                        \rank{2} The damage increases to \damageranktwolow.
                        \rank{3} The damage increases to \damagerankthreelow.
                        \rank{4} The damage increases to \damagerankfourlow.
                        \rank{5} The damage increases to \damagerankfivelow.
                        \rank{6} The damage increases to \damageranksixlow.
                        \rank{7} The damage increases to \damageranksevenlow.
                    \end{magicalactiveability}

                    % Dazzled is 1.8 EA, so we can get away with it with limited scope
                    \begin{magicalsustainability}{Dazzling Discordance}{\abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} within a \tinyarea radius from you.
                        \hit For the duration of your performance, the target is \dazzled.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 2.

                        \rank{2} The area increases to a \medarea radius.
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

                    % Stunned in HP is 1.2 EA, +0.4 for prefire = 1.6 EA. We can do that with limited scope.
                    \begin{magicalsustainability}{Dizzying Ditty}{\abilitytag{Compulsion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} in a \tinyarea radius from you.
                        \hit For the duration of your performance, the target is \stunned while it has no remaining \glossterm{damage resistance}.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 2.

                        \rank{2} The area increases to a \medarea radius.
                    \end{magicalsustainability}

                    % Any two focused is 1 EA
                    \begin{magicalsustainability}{Focusing Fantasia}{\abilitytag{Emotion}, \abilitytag{Sustain} (standard)}
                        \abilityusagetime Standard action.
                        \rankline
                        Choose up to two \glossterm{allies} within \shortrange.
                        For the duration of your performance, each target is \focused.

                        \rankline
                        % Full 1 EA
                        \rank{3} You can choose any two allies who can see or hear you, regardless of distance.
                        % Closer to 1.4 EA from 'all allies'
                        \rank{5} You can choose a third ally.
                        % Basically 1.4 EA, bard nonsense
                        \rank{7} You can choose a fourth ally.
                    \end{magicalsustainability}

                    % Frightened by you is 1.7 EA, we can get away with it using limited scope
                    \begin{magicalsustainability}{Frightening Fugue}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} in a \tinyarea radius from you.
                        \hit For the duration of your performance, the target is \frightened by you.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 2.

                        \rank{2} The area increases to a \medarea radius.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Hypnotic Hymn}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against up to two creatures within \shortrange.
                        You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
                        \hit For the duration of your performance, the target is \charmed by you.
                        This ability does not have the \abilitytag{Subtle} tag, so an observant target may notice it is being influenced either during this effect or after it ends.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Intonation of Ingenuity}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Choose one \glossterm{ally} within \rngmed range.
                        For the duration of your performance, the target gains a \plus1 bonus to \glossterm{checks}.

                        \rankline
                        \rank{3} The bonus increases to \plus2.
                        \rank{5} You can choose an additional target within range.
                        \rank{7} The bonus increases to \plus3.
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

                    % Brief goad is 1 EA. We normally don't do crit conversion, but it might make sense here, since there's no good way to do the scaling otherwise.
                    \begin{magicalsustainability}{Partita of Provocation}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} in a \tinyarea radius from you.
                        \hit The target is \glossterm{briefly} \goaded by you.
                        \crit The target is also \glossterm{goaded} by you for the duration of your performance.

                        \rankline
                        You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 1.
                    \end{magicalsustainability}

                    \begin{magicalsustainability}{Serenade of Serenity}{\abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                        \abilityusagetime Standard action.
                        \rankline
                        Choose any number of \glossterm{allies} within \medrange.
                        For the duration of your performance, each target is \trait{impervious} to \atCompulsion and \atEmotion attacks.

                        \rankline
                        \rank{3} At the end of each round, each target removes all \glossterm{conditions} caused by Compulsion and Emotion effects that were not applied during that round.
                        \rank{5} The range increases to a \distrange.
                        \rank{7} Each target is \trait{immune} to Compulsion and Emotion attacks.
                    \end{magicalsustainability}
                }
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
            complexity: 0,
            name: "Rhythm of War",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{power}.
                If you know at least five bardic performances, this bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
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
            complexity: 0,
            name: "Critical Eye",
            is_magical: false,
            rank: 5,
            description: r"
                You are \impervious to \abilitytag{Visual} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Steady Beat",
            is_magical: false,
            rank: 5,
            description: r"
                You are \trait{immune} to \abilitytag{Auditory} attacks.
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
                You gain access to rank 3 trick maneuvers.
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
                The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
                However, you can learn the same maneuver more than once and apply different augments to each version.

                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 trick maneuvers.
                {
                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this augment to maneuvers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are below their maximum \glossterm{hit points}.

                    \parhead{Mighty Maneuver} You deal \glossterm{extra damage} equal to your excess rank.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \glossterm{movement speed}.
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
            name: "Skill Exemplar",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to all skills.
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
            complexity: 2,
            name: "Arcane Dilettante",
            is_magical: true,
            rank: 3,
            description: r"
                You can use wands as if you were able to cast arcane spells.
                Your maximum spell rank is equal to your rank in this archetype.
                In addition, you gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic wands.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Well Rounded",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to all of your defenses that are lower than your highest defense.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Skill Exemplar+",
            is_magical: false,
            rank: 5,
            description: r"
                The skill bonus increases to \plus2.
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
            name: "Versatile Expertise",
            is_magical: false,
            rank: 4,
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
            rank: 7,
            description: r"
                You gain a \plus1 bonus to two attributes of your choice.
            ",
            // Arbitrarily choose Intelligence
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Intelligence, 1),
                Modifier::Attribute(Attribute::Perception, 1),
            ]),
        },
    ]
}

pub fn suave_scoundrel<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Fool Them Once",
            is_magical: true,
            rank: 1,
            description: r"
                Once per \glossterm{short rest}, you can use this ability as a \glossterm{minor action}.
                The next time this round that you make an attack or check against a creature that it is aware of, you can use your Deception or Persuasion skill instead of your normal \glossterm{accuracy} or check modifier against that creature.
                You must use this ability before making the attack or check.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Silver Tongue",
            is_magical: true,
            rank: 2,
            description: r"
                You gain a \plus2 bonus to your Deception, Persuasion, and Social Insight skills.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "What's That Over There",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{What's That Over There}[\abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make a attack vs. Mental against a creature within \medrange.
                    In addition, choose a location on stable ground within range.
                    \hit As a \glossterm{brief} effect, the target is compelled to move to the location you chose if it can do so safely.
                    It must spend its \glossterm{movement} and \glossterm{standard action} to move to that location, or if it is already there, to do nothing except observe the location carefully.
                    It can use any other actions, including \glossterm{elite actions}, as normal.
                    After this effect ends, the target becomes immune to it until it finishes a \glossterm{short rest}.

                    \rankline
                    You gain a \plus2 \glossterm{accuracy} bonus with the attack for each rank beyond 3.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Slippery Mind",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus2 bonus to your Mental defense, and you are \impervious to \atEmotion attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Fool Them Twice",
            is_magical: false,
            rank: 5,
            description: r"
                You can use your \textit{fool them once} ability twice per \glossterm{short rest}.
                However, after using that ability, you \glossterm{briefly} cannot use it again.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Silver Tongue+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus increases to \plus4.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Nothing Is Real",
            is_magical: false,
            rank: 7,
            description: r"
                \begin{activeability}{Nothing Is Real}[\abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against a creature within \shortrange.
                    \hit The target is \glossterm{briefly} convinced that nothing is real.
                    It is unable to take any actions and is \unaware of all attacks against it.
                    If it loses \glossterm{hit points}, this effect immediately ends.
                    After this effect ends, the target becomes immune to it until it finishes a \glossterm{short rest}.
                \end{activeability}
            ",
            modifiers: None,
        },
    ]
}
