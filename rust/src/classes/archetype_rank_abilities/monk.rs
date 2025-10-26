use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, DamageDice, Defense, MovementMode};
use crate::creatures::Modifier;

use super::standard_modifiers::add_standard_maneuver_modifiers;

pub fn airdancer<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Float Like Air",
            is_magical: false,
            rank: 1,
            description: r"
                Your maximum jumping height is equal to your maximum horizontal jump distance, rather than half that distance (see \pcref{Jumping}).
                You can also use Willpower in place of Strength to determine your horizontal jump distance.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Float Like Air+",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus10 bonus to your maximum horizontal jump distance.
                In addition, you are immune to \glossterm{falling damage}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Heart of Air",
            is_magical: true,
            rank: 4,
            description: r"
                When you jump, you can land in midair as if it was solid ground.
                Your landing location has a \glossterm{height limit} of 30 feet, like a fly speed (see \pcref{Flight}).
                You cannot walk in the air, but you can continue jumping or remain in place.
                The air holds you until the end of the current round, at which point you fall normally.
                After you land on air in this way, you \glossterm{briefly} cannot do so again.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
                You take no damage from \glossterm{glancing blows} or misses caused by abilities that affect an area and attack your Armor or Reflex defense.
                This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                If you have the \textit{evasion} rogue ability with the same effect as this ability, you also gain a \plus2 bonus to your Armor and Reflex defenses against area attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Evasion+",
            is_magical: false,
            rank: 5,
            description: r"
                This ability also protects you from area attacks against your Brawn, Fortitude, and Mental defenses.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Death From Above",
            is_magical: false,
            rank: 3,
            // Expected jump height: 15 from speed, so can reliably jump completely
            // over Medium creatures.
            description: r"
                \begin{activeability}{Death From Above}{Standard action}
                    \rankline
                    You jump and move as normal for the jump (see \pcref{Jumping}).
                    In addition, you can make a \glossterm{strike} that deals 1d6 \glossterm{extra damage} at any point during that jump.

                    % Damage scaling assumes that the extra damage is doubled
                    \rankline
                    % TODO: is Jump clear enough about how to be directly above a creature?
                    \rank{4} This extra damage is doubled against each creature that you are directly above when you make the strike.
                    \rank{5} The extra damage increases to 2d6.
                    \rank{6} The extra damage increases to 2d6 \add half \glossterm{power}.
                    \rank{7} The extra damage increases to 4d6 \add half \glossterm{power}.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Move Like Wind",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{speed}.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            complexity: 1,
            name: "Airdance",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a slow \glossterm{fly speed} with a \glossterm{height limit} of 15 feet (see \pcref{Flight}).
                Flying using this fly speed does not cause you to suffer penalties for being \glossterm{midair}.
                While flying, you can jump as if you were on solid ground, allowing you to rapidly gain height and change directions unexpectedly.
            ",
            modifiers: None,
        },
    ]
}

pub fn esoteric_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 3,
            name: "Esoteric Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can perform a wide variety of unusual attacks.
                You gain access to one of the following \glossterm{combat styles}: \combatstyle{dirty fighting}, \combatstyle{flurry of blows}, or \combatstyle{mobile hunter}.
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point, including combat styles other than those three.
                You can only learn esoteric \glossterm{maneuvers} from esoteric combat styles that you have access to.

                You learn two rank 1 esoteric \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some esoteric maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Esoteric Weaponry",
            is_magical: false,
            rank: 1,
            description: r"
                If you spend an \glossterm{insight point}, you can become proficient with exotic monk weapons (see \pcref{Exotic Weapons}).
                You must already be proficient with all non-exotic monk weapons.
            ",
            // This is an abstraction of the effect of exotic weapons being better
            modifiers: Some(vec![Modifier::ExtraDamage(DamageDice::new(0))]),
        },
        RankAbility {
            complexity: 1,
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You gain access to rank 3 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You gain access to rank 7 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Augmented Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your esoteric maneuvers.
                For each rank 1 esoteric maneuver you know, choose one augment from the list below and apply it to that maneuver.
                The augment permanently changes the maneuver, so you can't use an unaugmented version of the maneuver.
                However, you can learn the same maneuver more than once and apply different augments to each version.

                Augments scale in power with your ``excess rank''.
                Your excess rank with a maneuver is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your augments.
                However, you must still apply them to rank 1 esoteric maneuvers.
                {
                    \parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your excess rank against creatures who made a \glossterm{strike} against you during the previous round.
                    You can only apply this augment to maneuvers which cause you to make a \glossterm{strike}.

                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your excess rank.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this augment to maneuvers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Mighty Maneuver} You take a \\minus1 accuracy penalty, but you deal \glossterm{extra damage} equal to twice your excess rank.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per excess rank before or after using your chosen maneuver, up to a maximum distance equal to your speed.
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
                You can also choose an augment for each of your rank 3 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Augmented Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an augment for each of your rank 5 esoteric maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    abilities
}

pub fn ki<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Ki Energy",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever you make a \glossterm{strike}, you can choose to treat it as a \magical ability.
                This allows you to use your \glossterm{magical power} to determine your damage instead of your \glossterm{mundane power} (see \pcref{Power}).
            ",
            // TODO: use higher of Str/Wil for strikes
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Ki Barrier",
            is_magical: true,
            rank: 1,
            description: r"
                While you are not wearing other body armor, you gain a ki barrier around your body.
                This functions like body armor that provides a \plus2 bonus to your Armor defense and a \plus3 bonus to your \glossterm{durability}.
                It does not require \glossterm{proficiency} with armor to use.

                You can also use a \glossterm{free hand} to wield the barrier as a shield.
                This functions like a buckler, granting you a \plus1 bonus to your Armor and Reflex defenses, except that you do not need to be proficient with light armor.
                Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.
            ",
            // This only works if everyone with this archetype doesn't equip actual armor, since
            // the system won't know not to stack the effects
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 2),
                Modifier::Durability(3),
            ]),
        },
        RankAbility {
            complexity: 3,
            name: "Ki Manifestations",
            is_magical: true,
            rank: 2,
            description: r"
                You can channel your ki to temporarily enhance your abilities.
                Choose two \textit{ki manifestations} from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{ki manifestation} per \glossterm{insight point}.

                After you use a \textit{ki manifestation}, you \glossterm{briefly} cannot use a \textit{ki manifestation} again.
                {
                    \begin{magicalactiveability}{Abandon the Fragile Self}{Free action}
                        \abilitytags \abilitytag{Swift}
                        \rankline
                        You can negate one \glossterm{condition} that would be applied to you this phase.
                        In exchange, you take a \minus2 penalty to \glossterm{defenses} this phase.

                        \rankline
                        \rank{5} The defense penalty is reduced to \minus1.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Burst of Blinding Speed}{Free action}
                        \rankline
                        You gain a \plus10 foot bonus to your \glossterm{speed} this phase.
                        In exchange, you cannot use the \ability{sprint} ability this phase.

                        \rankline
                        \rank{5} The speed bonus increases to \plus20 feet.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Calm the Inner Tempest}{Free action}
                        \rankline
                        You gain a \plus4 bonus to the Endurance skill this round (see \pcref{Endurance}).

                        \rankline
                        \rank{5} The bonus increases to \plus6.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Extend the Flow of Ki}{Free action}
                        \rankline
                        Your melee \glossterm{strikes} gain the \weapontag{Long} weapon tag this round, allowing you to attack targets up to 10 feet away from you (see \pcref{Weapon Tags}).

                        \rankline
                        \rank{5} You can attack enemies up to 15 feet away from you.
                    \end{magicalactiveability}

                    \begin{magicaltriggeredability}{Flash Step}{Triggered}
                        \rankline
                        You can use this ability as part of movement with your walk speed.
                        % TODO: is 'horizontally' the correct word?
                        You \glossterm{teleport} horizontally instead of moving normally.
                        If your \glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.

                        Teleporting a given distance costs movement equal to twice that distance.
                        For example, if you have a 30 foot movement speed, you can move 10 feet, teleport 5 feet, and move an additional 10 feet before your movement ends.
                        If you are unable to use your walk speed, you also cannot move with this ability.

                        \rankline
                        \rank{5} The movement cost to teleport is reduced to be equal to the distance you teleport.
                    \end{magicaltriggeredability}

                    \begin{magicalactiveability}{Flurry of a Thousand Cuts}{Free action}
                        \rankline
                        When you make a \glossterm{strike} this round, you \glossterm{reroll} the attack roll once and take the higher result.
                        However, you cannot get a \glossterm{critical hit} or \glossterm{glancing blow} with strikes.

                        \rankline
                        \rank{5} You also gain a \plus1 \glossterm{accuracy} bonus with strikes.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Hear the Rustling Wings}{Free action}
                        \rankline
                        You gain a \plus4 bonus to the Awareness skill this round (see \pcref{Awareness}).

                        \rankline
                        \rank{5} The bonus increases to \plus6.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Kindle the Living Flame}{Free action}
                        \rankline
                        Your \glossterm{strikes} have the \atFire tag this round.

                        \rankline
                        \rank{5} This effect lasts \glossterm{briefly}.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Leap of the Heavens}{Free action}
                        \rankline
                        You gain a \plus10 foot bonus to your maximum horizontal jump distance (see \pcref{Jumping}).
                        This increases your maximum vertical jump distance normally.

                        \rankline
                        \rank{5} The bonus increases to \plus20 feet.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Rest Atop the Precipice}{Free action}
                        \rankline
                        You gain a \plus4 bonus to the Balance skill this round (see \pcref{Balance}).

                        \rankline
                        \rank{5} The bonus increases to \plus6.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Scale the Highest Tower}{Free action}
                        \rankline
                        You gain a \plus4 bonus to the Climb skill this round (see \pcref{Climb}).
                        % TODO: is this wording correct?

                        \rankline
                        \rank{5} The bonus increases to \plus6.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Shelter from Falling Rain}{Free action}
                        \abilitytags \abilitytag{Swift}
                        \rankline
                        You gain a \plus2 bonus to your defenses against ranged \glossterm{strikes}.
                        However, you take a \minus2 penalty to your defenses against melee \glossterm{strikes}.

                        \rankline
                        \rank{5} The bonus increases to \plus3.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Step Between the Mystic Worlds}{Free action}
                        \abilitytags \abilitytag{Swift}
                        \rankline
                        All attacks against you have a 20\% \glossterm{failure chance} this round.
                        However, your attacks also have a 20\% failure chance this round.

                        \rankline
                        \rank{5} The failure chance for attacks against you increases to 30\%.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Thread the Eye of the Storm}{Free action}
                        \rankline
                        You reduce your \glossterm{longshot penalty} with thrown weapons by 2 this round (see \pcref{Weapon Range Limits}).

                        \rankline
                        \rank{5} The penalty reduction increases to 3.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Surpass the Mortal Limits}{Free action}
                        \abilitytags \abilitytag{Swift}
                        \rankline
                        You can add your Willpower to all \glossterm{checks} you make this phase that are based on Strength, Dexterity, or Constitution.
                        However, you take a \minus2 penalty to Strength, Dexterity, and Constitution checks during the next round.

                        \rankline
                        \rank{5} The penalty during the next round is removed.
                    \end{magicalactiveability}

                    % TODO: add more
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Invested Blow",
            is_magical: true,
            rank: 3,
            description: r"
                \begin{magicalactiveability}{Invested Blow}{Standard action}
                    \abilitycost Two \glossterm{fatigue levels} (see text).
                    \rankline
                    Make a \glossterm{strike} that deals double damage.
                    You cannot use a \weapontag{Heavy} weapon to make the strike.
                    It must target a single creature within \shortrange, with no secondary targets.

                    Whether or not the target takes damage, it becomes invested with your ki.
                    This does not cause it any ill effects.
                    If it dies or falls unconscious, or you finish a \glossterm{short rest}, your ki returns to you.
                    When it does, you reduce your \glossterm{fatigue level} by two.

                    \rankline
                    \rank{4} You gain a \plus1 accuracy bonus with the strike.
                    \rank{5} The strike deals double \glossterm{weapon damage}.
                    \rank{6} The strike deals triple \glossterm{weapon damage}.
                    \rank{7} The strike deals triple damage.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Ki Energy+",
            is_magical: true,
            rank: 5,
            description: r"
                Choose one type of energy: \atCold, \atElectricity, or \atFire.
                You become \impervious to attacks with that ability tag.
                If you are already impervious to attacks with that ability tag, you become immune instead.
                Whenever you make a strike \magical with this ability, you can choose to give it that tag.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Ki-Focused Mind",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Endless Ki",
            is_magical: true,
            rank: 7,
            description: r"
                After using a \textit{ki manifestation}, you can use a different \textit{ki manifestation} next round.
                You still cannot use the same \textit{ki manifestation} in two consecutive rounds.
            ",
            modifiers: None,
        },
    ]
}

pub fn perfected_form<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 0,
            name: "Unarmed Warrior",
            is_magical: false,
            rank: 1,
            // This starts out equivalent to a smallsword. We don't want to make this exotic by
            // default, because it would invalidate Esoteric Weaponry.
            description: r"
                You deal 1d6 damage with the punch/kick \glossterm{natural weapon} (see \pcref{Natural Weapons}).
                In addition, you treat that weapon as having the \weapontag{Light} weapon tag, which allows you to make dual strikes with it more easily (see \pcref{Dual Strikes}).
            ",
            // TODO: selective bonus with only unarmed? It's easy enough to just give people
            // from this archetype weapons
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Unarmed Warrior+",
            is_magical: false,
            rank: 4,
            description: r"
                Your punch/kick natural weapon gains a \plus1 accuracy bonus.
                Since this bonus is local to the weapon, it is doubled if you make \glossterm{dual strikes} with it.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Unarmed Warrior++",
            is_magical: false,
            rank: 7,
            description: r"
                Your punch/kick damage increases to 1d8.
            ",
            // TODO: At this point, you're probably using unarmed? This is weird.
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Unhindered Agility",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to your Armor and Reflex defenses while you are not wearing medium or heavy body armor.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Reflex, 1),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Unhindered Freedom",
            is_magical: false,
            rank: 4,
            description: r"
                While you are not wearing medium or heavy body armor, you are immune to being \slowed, and your movement is not slowed by \glossterm{difficult terrain}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Unhindered Agility+",
            is_magical: false,
            rank: 7,
            description: r"
                The defense bonus increases to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Reflex, 1),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Perfected Power",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to your \glossterm{mundane power} and \glossterm{magical power}.
                If each of your Strength, Dexterity, and Constitution are 3 or higher, this bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Perfected Power+",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus increases to \plus2, or to \plus3 if you meet the attribute requirement.
            ",
            // Assume the attribute requirement is not met
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Perfect Body",
            is_magical: false,
            rank: 3,
            description: r"
                Choose a physical \glossterm{attribute}: Strength, Dexterity, or Constitution (see \pcref{Attributes}).
                You gain a \plus1 bonus to that attribute.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Dexterity, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Perfect Body+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus applies to all physical attributes, not just the one you chose.
            ",
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Strength, 1),
                Modifier::Attribute(Attribute::Constitution, 1),
            ]),
        },
    ]
}

pub fn transcendent_sage<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Feel the Flow of Life",
            is_magical: true,
            rank: 1,
            description: r"
                You become so attuned to the natural energy of life that you can sense it even when sight fails you.
                You gain \sense{lifesense} with a 120 foot range, allowing you to sense the location of living things without light (see \pcref{Lifesense}).
                In addition, you gain \sense{lifesight} with a 30 foot range, allowing you to see living things without light (see \pcref{Lifesight}).
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Transcend Frailty",
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
            name: "Transcend Frailty+",
            is_magical: false,
            rank: 6,
            description: r"
                The durability bonus increases to +4.
            ",
            modifiers: Some(vec![Modifier::Durability(2)]),
        },
        RankAbility {
            complexity: 1,
            name: "Transcend Uncertainty",
            is_magical: false,
            rank: 3,
            description: r"
                You are immune to being \stunned and \confused.
            ",
            // TODO: represent immunities?
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Transcend Emotion",
            is_magical: false,
            rank: 4,
            description: r"
                You are immune to \abilitytag{Emotion} attacks.
                In addition, you are immune to being \frightened and \panicked.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Transcend Mortality",
            is_magical: true,
            rank: 5,
            description: r"
                You are no longer considered a living creature for the purpose of attacks against you.
                This means that attacks which only affect living creatures have no effect against you.
                In addition, you no longer take penalties to your attributes for aging, and cannot be magically aged.
                You still die of old age when your time is up.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Feel the Flow of Life+",
            is_magical: true,
            rank: 6,
            description: r"
                The range of your lifesense increases by 240 feet, and the range of your lifesight increases by 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Inner Transcendence",
            is_magical: false,
            rank: 7,
            description: r"
                You are immune to \glossterm{conditions}.
            ",
            modifiers: None,
        },
    ]
}
