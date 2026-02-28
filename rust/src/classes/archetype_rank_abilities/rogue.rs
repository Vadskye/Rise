use super::standard_modifiers::add_standard_maneuver_modifiers;
use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::attacks::Maneuver;
use crate::core_mechanics::{Attribute, DamageDice, Resource};
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
                \begin{activeability}{Sneak Attack}{Standard action}
                    \rankline
                    Make a \glossterm{strike} with a \weapontag{Light} or \weapontag{Compact} weapon against a creature within \shortrange (see \pcref{Weapon Tags}).

                    The strike deals 1d4 \glossterm{extra damage} if the target is \unaware or \partiallyunaware of your attack, or if they are adjacent to one of your \glossterm{allies}.
                    This extra damage is doubled if the target is fully unaware of your attack.
                    It does not apply if the target is immune to \glossterm{critical hits}.

                    \rankline
                    \rank{2} The extra damage increases to 1d6.
                    \rank{3} The extra damage increases to 1d10.
                    \rank{4} The extra damage increases to 2d8.
                    \rank{5} The extra damage increases to 3d10.
                    \rank{6} The extra damage increases to 5d10.
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
                You take no damage when an area ability attacks and misses your Armor or Reflex defense.
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
                \begin{attuneability}{Darkstalker}{Standard action}
                    \abilitytags \atAttune
                    \rankline
                    You become completely undetectable by your choice of one of the following sense groups:
                    \begin{raggeditemize}
                        \item \sense{Blindsense} and \sense{blindsight}
                        \item \sense{Darkvision}
                        \item \abilitytag{Detection} abilities
                        \item \sense{Lifesense} and \sense{lifesight}
                        \item \sense{Scent}
                        \item \abilitytag{Scrying} abilities
                        \item \sense{Tremorsense} and \sense{tremorsight}
                    \end{raggeditemize}
                    If you have access to any other more unusual senses, such as the \ability{mindsight} ability from the Telepath feat, you may also choose one of those senses as a separate sense group.

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
            modifiers: Some(vec![Modifier::Attribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            complexity: 2,
            name: "Assassination",
            is_magical: false,
            rank: 5,
            description: r"
                \begin{activeability}{Assassination}{Standard action}
                    \rankline
                    You study a creature within \rngmed range, finding weak points you can take advantage of.
                    As a \brief effect, whenever you make a \glossterm{strike} against the target while it is adjacent to you and \unaware of the attack, the strike deals double damage.
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
        abilities.append(&mut vec![RankAbility {
            name: "Sneak Attack Scaling",
            rank,
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::SneakAttack(rank))]),
            ..Default::default()
        }]);
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
            name: "Bardic Spells",
            is_magical: true,
            rank: 1,
            description: r"
                You have the ability to use bardic magic.
                You gain access to one bardic \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Bardic Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional bardic \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn bardic spells from bardic mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 bardic \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Bardic spells require you to use a Perform skill that you are trained with.
                There are four types of performances: dance, instrumental, manipulation, and vocal.
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.
                \begin{raggeditemize}
                    \item Dance: You use your body to dance or act. This limits your ability to defend yourself, which \briefly gives you a \minus2 penalty to your Armor and Reflex defenses each time you cast or sustain the spell. Spells you cast using a dance performance gain the \atVisual tag.
                    \item Instrumental: You use an instrument to make music. This requires at least one \glossterm{free hand} to use the instrument. Spells you cast using an instrumental performance gain the \atAuditory tag.
                    \item Manipulation: You use objects or gestures to perform, such as juggling or puppetry. This requires at least one \glossterm{free hand} to use the objects. Spells you cast using a manipulation performance gain the \atVisual tag.
                    \item Vocal: You use your voice to orate or sing. This prevents you from talking or using other abilities with \glossterm{verbal components}. Spells you cast using a vocal performance gain the \atAuditory tag.
                \end{raggeditemize}

                Unlike other spellcasters, you cannot \glossterm{attune} to bardic spells.
                In addition, if a target of a sustained bardic spell stops being able to see or hear you, depending on the nature of your performance, the effect ends for them as if you had stopped sustaining the performance.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of bardic spells that you can learn is equal to your rank in this archetype.
                Bardic spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
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
            rank: 5,
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
            name: "Steady Beat",
            is_magical: false,
            rank: 3,
            description: r"
                You are \buff{immune} to \abilitytag{Auditory} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Rhythm of War",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Critical Eye",
            is_magical: false,
            rank: 6,
            description: r"
                You are \impervious to \abilitytag{Visual} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Virtuoso",
            is_magical: true,
            rank: 7,
            description: r"
                Once per turn, you can \glossterm{sustain} a bardic spell that has the \atSustain (minor) tag as a \glossterm{free action}.
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
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
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

                    \parhead{Finishing Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who are \glossterm{injured}.

                    \parhead{Mighty Maneuver} You take a \minus1 accuracy penalty, but you deal \glossterm{extra damage} equal to twice your excess rank.

                    \parhead{Mobile Maneuver} You can move up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your \glossterm{speed}.
                    This does not reduce your \glossterm{available movement}.
                    You cannot apply this augment to maneuvers that already allow you to move using one of your movement modes.

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
                \begin{activeability}{Fool Them Once}{Minor action}
                    \abilitytags \atCompulsion, \atSubtle
                    \abilitycost You cannot use this ability again until you finish a \glossterm{short rest}.
                    The next time this turn that you make an attack or check against one or more creatures, you can use your Deception or Persuasion skill instead of your normal \glossterm{accuracy} or check modifier against those creatures.
                    Each target must be aware of the attack or check.
                    You must use this ability before making the attack or check.
                    If a target is unaware of the attack or check, or is otherwise immune to this ability, you use your normal accuracy or check modifier against that creature.
                    \rankline
                \end{activeability}
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
            modifiers: Some(vec![
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Silver Tongue+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus increases to \plus4.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
            ]),
        },
        RankAbility {
            complexity: 2,
            name: "What's That Over There",
            is_magical: false,
            rank: 3,
            description: r"
                \begin{activeability}{What's That Over There}{Standard action}
                    \abilitytags \abilitytag{Compulsion}
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
                You can use your \ability{fool them once} ability twice per \glossterm{short rest}.
                However, after using that ability, you \riefly can't use it again.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "No Need For Violence",
            is_magical: false,
            rank: 7,
            description: r"
                Whenever a combat starts, each \glossterm{enemy} that you have been speaking with for at least six seconds takes a \minus5 penalty to \glossterm{initiative}.
                In addition, enemies are at least \partiallyunaware of your attacks until they take their first turn, even if they can see you clearly.
                This does not affect creatures that join while the combat is already active.
            ",
            modifiers: None,
        },
    ]
}
