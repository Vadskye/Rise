use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, MovementMode};
use crate::creatures::Modifier;

use super::standard_modifiers::add_standard_maneuver_modifiers;

pub fn airdancer<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Float Like Air",
            is_magical: false,
            rank: 1,
            description: r"
                When you move with a Jump check, your maximum height is equal to your Jump check result, rather than half your Jump check result (see \pcref{Jump}).
                This does not affect the forward distance you can reach with your jumps.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Float Like Air+",
            is_magical: false,
            rank: 6,
            description: r"
                Your maximum height increases to twice your Jump check result.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Move Like Wind",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus10 foot bonus to your \glossterm{land speed}.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            name: "Move Like Wind+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus increases to +20 feet.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(MovementMode::Land, 10)]),
        },
        RankAbility {
            name: "Heart of Air+",
            is_magical: true,
            rank: 4,
            description: r"
                When you move with a Jump check, you can land in midair as if it was solid ground.
                Your landing location has a \glossterm{height limit} of 30 feet, like a fly speed (see \pcref{Flight}).
                You cannot walk in the air, but you can continue jumping or remain in place.
                The air holds you until the end of the current round, at which point you fall normally.
                After you land on air in this way, you \glossterm{briefly} cannot do so again.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
                You take no damage from \glossterm{glancing blows} caused by abilities that affect an area and attack your Armor or Reflex defense.
                This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                If you have the \textit{evasion} rogue ability with the same effect as this ability, you also gain a \plus2 bonus to your Armor and Reflex defenses against area attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Evasion+",
            is_magical: false,
            rank: 5,
            description: r"
                You also take half damage from abilities that affect an area and attack your Armor or Reflex defense.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Aerial Strike",
            is_magical: false,
            rank: 3,
            // Expected jump skill at rank 3: 6 plus attribute, so about 8
            // Expected jump height: 8 from skill + 5.5 from roll, so can reliably jump completely
            // over Medium creatures.
            description: r"
                As a standard action, you can use the \textit{aerial strike} ability.
                \begin{activeability}{Aerial Strike}
                    \rankline
                    Make a Jump check and move that far, up to a maximum distance equal to your \glossterm{base speed}.
                    In addition, you can make a \glossterm{strike} with +1d4 \glossterm{extra damage} at any point during that jump.
                    % TODO: is Jump clear enough about how to be directly above a creature?
                    This extra damage is doubled against each creature that you are directly above when you make the strike.

                    \rankline
                    % Weaker scaling than normal because the double damage is easy at high levels
                    \rank{4} The extra damage increases to 1d8.
                    \rank{5} The extra damage increases to 2d6.
                    \rank{6} The extra damage increases to 2d10.
                    \rank{7} The extra damage increases to 4d6.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Airdance",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \glossterm{fly speed} equal to your \glossterm{base speed} with a \glossterm{height limit} of 30 feet (see \pcref{Flight}).
                While flying, you can jump as if you were on solid ground, allowing you to rapidly gain height and change directions unexpectedly.
            ",
            modifiers: None,
        },
    ];
}

pub fn esoteric_warrior<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            name: "Esoteric Maneuvers",
            is_magical: false,
            rank: 1,
            description: r"
                You can perform a wide variety of unusual attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{dirty fighting}, \textit{flurry of blows}, or \textit{mobile assault}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.
                You can only learn esoteric \glossterm{maneuvers} from esoteric combat styles that you have access to.

                You learn two rank 1 esoteric \glossterm{maneuvers}.
                You may spend \glossterm{insight points} to learn one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of a higher rank.

                \advancement Some esoteric maneuvers also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 3,
            description: r"
                You learn an additional esoteric maneuver.
                In addition, you gain access to rank 3 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 5,
            description: r"
                You gain access to rank 5 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Maneuvers+",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional esoteric maneuver.
                In addition, you gain access to rank 7 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enhanced Maneuvers",
            is_magical: false,
            rank: 2,
            description: r"
                You gain the ability to customize your esoteric maneuvers.
                For each rank 1 esoteric maneuver you know, choose one enhancement from the list below and apply it to that maneuver.
                Enhancements scale in power with your enhancement level, which is equal to your rank in this archetype minus the rank of the maneuver.

                Whenever you increase your rank in this archetype, you can change your enhancements.
                However, you must still apply them to rank 1 esoteric maneuvers.
                {
                    \parhead{Counter Maneuver} You gain an accuracy bonus equal to twice your enhancement level against creatures who made a \glossterm{strike} against you during the previous round.
                    You can only apply this enhancement to manuevers which cause you to make a \glossterm{strike}.

                    \parhead{Debilitating Maneuver} You gain an accuracy bonus equal to twice your enhancement level.
                    However, you cannot get a \glossterm{critical hit}.
                    You can only apply this enhancement to manuevers which deal damage and can inflict a \glossterm{condition}.

                    \parhead{Mighty Maneuver} You take an accuracy penalty equal to 4 - your enhancement level, but the strike deals double \glossterm{weapon damage}.
                    If your enhancement level is at least 5, this becomes an accuracy bonus.
                    You can only apply this enhancement to manuevers which cause you to make a \glossterm{strike}.

                    \parhead{Mobile Maneuver} You can walk up to 5 feet per enhancement level before or after using your chosen maneuver, up to a maximum distance equal to your land speed.
                    You cannot apply this enhancement to maneuvers that already allow you to move using one of your movement modes.

                    \parhead{Precise Maneuver} You gain an accuracy bonus equal to your enhancement level.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enhanced Maneuvers+",
            is_magical: false,
            rank: 4,
            description: r"
                You can also choose an enhancement for each of your rank 3 esoteric maneuvers.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Enhanced Maneuvers+",
            is_magical: false,
            rank: 6,
            description: r"
                You can also choose an enhancement for each of your rank 5 esoteric maneuvers.
            ",
            modifiers: None,
        },
    ];
    add_standard_maneuver_modifiers(&mut abilities);
    return abilities;
}

pub fn ki<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(16)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(36)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(42)]),
        },
        RankAbility {
            name: "Ki Manifestations",
            is_magical: true,
            rank: 2,
            description: r"
                You can channel your ki to temporarily enhance your abilities.
                Choose two \textit{ki manifestations} from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{ki manifestation} per \glossterm{insight point}.
                You can use any \textit{ki manifestation} ability you know using the type of action indicated in the ability's description.

                After you use a \textit{ki manifestation}, you \glossterm{briefly} cannot use a \textit{ki manifestation} again.
                {
                    \begin{magicalactiveability}{Abandon the Fragile Self}[\abilitytag{Swift}]
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You can negate one \glossterm{condition} that would be applied to you this phase.
                        In exchange, you take a \minus2 penalty to \glossterm{defenses} this phase.

                        \rankline
                        \rank{4} The defense penalty is reduced to \minus1.
                        \rank{6} The defense penalty is removed.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Burst of Blinding Speed}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus10 foot bonus to your land speed this phase.

                        \rankline
                        \rank{4} You can also ignore \glossterm{difficult terrain} this phase.
                        \rank{6} The speed bonus increases to \plus20 feet.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Calm the Inner Tempest}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Endurance skill this round (see \pcref{Endurance}).

                        \rankline
                        \rank{4} The bonus increases to \plus8.
                        \rank{6} The bonus increases to \plus12.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Extend the Flow of Ki}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        Your melee \glossterm{strikes} gain the \weapontag{Long} weapon tag this round, allowing you to attack targets up to 10 feet away from you (see \pcref{Weapon Tags}).

                        \rankline
                        \rank{4} You can attack enemies up to 15 feet away from you.
                        \rank{6} You can attack enemies up to 20 feet away from you.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Flash Step}
                        \rankline
                        You can use this ability as part of movement with your land speed.
                        % TODO: is 'horizontally' the correct word?
                        You \glossterm{teleport} horizontally instead of moving normally.
                        If your \glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.

                        Teleporting a given distance costs movement equal to twice that distance.
                        For example, if you have a 30 foot movement speed, you can move 10 feet, teleport 5 feet, and move an additional 10 feet before your movement ends.

                        \rankline
                        \rank{4} The movement cost to teleport is reduced to be equal to the distance you teleport.
                        \rank{6} You can use this ability to move even if you are \immobilized or \grappled.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Flurry of a Thousand Cuts}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        When you make a \glossterm{strike} this round, you roll the attack roll twice and take the higher result.
                        However, you cannot get a \glossterm{critical hit} or \glossterm{glancing blow} with strikes.

                        \rankline
                        \rank{4} You also gain a +1 \glossterm{accuracy} bonus with strikes.
                        \rank{6} The accuracy bonus increases to +2.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Hear the Rustling Wings}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Awareness skill this round (see \pcref{Awareness}).

                        \rankline
                        \rank{4} The bonus increases to \plus8.
                        \rank{6} The bonus increases to \plus12.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Kindle the Living Flame}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        Your \glossterm{strikes} deal fire damage in addition to their other damage types this round.

                        \rankline
                        \rank{4} You also gain +1d4 extra damage with strikes.
                        \rank{6} The extra damage increases to +1d6.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Leap of the Heavens}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Jump skill this round (see \pcref{Jump}).

                        \rankline
                        \rank{4} The bonus increases to \plus8.
                        \rank{6} The bonus increases to \plus12.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Rest Atop the Precipice}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Balance skill this round (see \pcref{Balance}).

                        \rankline
                        \rank{4} The bonus increases to \plus8.
                        \rank{6} The bonus increases to \plus12.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Scale the Highest Tower}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Climb skill this round (see \pcref{Climb}).
                        % TODO: is this wording correct?

                        \rankline
                        \rank{4} The Climb bonus increases to \plus8.
                        \rank{6} The bonus increases to \plus12.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Shelter from Falling Rain}[\abilitytag{Swift}]
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a +2 bonus to your defenses against ranged \glossterm{strikes}.
                        However, you take a -2 penalty to your defenses against melee \glossterm{strikes}.

                        \rankline
                        \rank{4} The bonus increases to +3.
                        \rank{6} The bonus increases to +4.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Step Between the Mystic Worlds}[\abilitytag{Swift}]
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        All attacks against you have a 20\% \glossterm{failure chance} this round.
                        However, your attacks also have a 20\% failure chance this round.

                        \rankline
                        \rank{4} The failure chance for attacks against you increases to 25\%.
                        \rank{6} The failure chance for attacks against you increases to 30\%.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Thread the Eye of the Storm}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You reduce your \glossterm{longshot penalty} with thrown weapons by 1 this round (see \pcref{Weapon Range Limits}).

                        \rankline
                        \rank{4} The penalty reduction increases to 2.
                        \rank{6} The penalty reduction increases to 3.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Surpass the Mortal Limits}[\abilitytag{Swift}]
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You can add your Willpower to all \glossterm{checks} you make this phase that are based on Strength, Dexterity, or Constitution.
                        However, you take a \minus2 penalty to Strength, Dexterity, and Constitution checks during the next round.

                        \rankline
                        \rank{4} You also gain a \plus2 bonus to those checks while this effect lasts.
                        \rank{6} The penalty during the next round is removed.
                    \end{magicalactiveability}

                    % TODO: add more
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Ki Energy",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever you make a \glossterm{strike}, you can choose to treat it as a \magical ability.
                This allows you to use your \glossterm{magical power} to determine your damage instead of your \glossterm{mundane power} (see \pcref{Power}).
                In addition, that strike does not deal \glossterm{physical damage} or any physical damage subtypes.
                If the strike would normally deal one or more subtype of energy damage, the damage is of those types.
                Otherwise, all damage dealt by the strike is \glossterm{energy damage}.
                You can still use \glossterm{maneuvers} that require specific damage types, as long as you meet the requirements before this damage type conversion.
            ",
            // TODO: use higher of Str/Wil for strikes
            modifiers: None,
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 1,
            description: r"
                While you are not wearing other body armor, you gain a ki barrier around your body.
                This functions like body armor that provides a \plus3 bonus to your Armor defense and has no \glossterm{encumbrance}.
                It also provides a bonus to your \glossterm{damage resistance} equal to four times your rank in this archetype.

                You can also use a \glossterm{free hand} to wield the barrier as a shield.
                This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.
            ",
            // This only works if everyone with this archetype doesn't equip actual armor, since
            // the system won't know not to stack the effects
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 3),
                Modifier::DamageResistance(8),
            ]),
        },
        RankAbility {
            name: "Ki Barrier+",
            is_magical: true,
            rank: 5,
            description: r"
                The damage resistance bonus increases to six times your rank in this archetype, and the defense bonus from the body armor increases to \plus4.
            ",
            // Rank 4: 16. Rank 5: 30.
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Ki Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power}.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Ki Power+",
            is_magical: true,
            rank: 6,
            description: r"
                The power bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Hardened Ki",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Endless Ki",
            is_magical: true,
            rank: 7,
            description: r"
                After using a \textit{ki manifestation}, you can use a different \textit{ki manifestation} after the end of the current round.
                You still cannot use the same \textit{ki manifestation} in two consecutive rounds.
            ",
            modifiers: None,
        },
    ];
}

pub fn perfected_form<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Unarmed Warrior",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus2 accuracy bonus and a \plus1d damage bonus with the punch/kick \glossterm{natural weapon} (see \pcref{Natural Weapons}).
            ",
            // TODO: selective bonus with only unarmed? It's easy enough to just give people
            // from this archetype weapons
            modifiers: None,
        },
        RankAbility {
            name: "Unarmed Warrior+",
            is_magical: false,
            rank: 4,
            description: r"
                The damage bonus increases to \plus2d.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Unarmed Warrior+",
            is_magical: false,
            rank: 7,
            description: r"
                The damage bonus increases to \plus3d.
            ",
            // TODO: At this point, you're probably using unarmed? This is weird.
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Unhindered Agility",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a +1 bonus to your Armor and Reflex defenses while you have no \glossterm{encumbrance}.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Reflex, 1),
            ]),
        },
        RankAbility {
            name: "Unhindered Agility+",
            is_magical: false,
            rank: 4,
            description: r"
                The bonus increases to +2.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 1),
                Modifier::Defense(Defense::Reflex, 1),
            ]),
        },
        RankAbility {
            name: "Unhindered Agility+",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus increases to +3.
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 2),
                Modifier::Defense(Defense::Reflex, 2),
            ]),
        },
        RankAbility {
            name: "Perfect Precision",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} with attacks using weapons from the monk weapons \glossterm{weapon group}, natural weapons, and to any attack using one or more \glossterm{free hands}.
                This does not include abilities that simply use \glossterm{somatic components}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Perfect Precision+",
            is_magical: false,
            rank: 5,
            description: r"
                The accuracy bonus increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Perfect Body",
            is_magical: false,
            rank: 3,
            description: r"
                Choose a physical \glossterm{attribute}: Strength, Dexterity, or Constitution (see \pcref{Attributes}).
                You permanently gain a \plus1 bonus to that attribute.
            ",
            modifiers: Some(vec![Modifier::BaseAttribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            name: "Perfect Body+",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus applies to all physical attributes, not just the one you chose.
            ",
            modifiers: Some(vec![
                Modifier::BaseAttribute(Attribute::Strength, 1),
                Modifier::BaseAttribute(Attribute::Dexterity, 1),
            ]),
        },
    ];
}

pub fn transcendent_sage<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Feel the Flow of Life",
            is_magical: true,
            rank: 1,
            description: r"
                You become so attuned to the natural energy of life that you can sense it even when sight fails you.
                You gain \trait{lifesense} with a 120 foot range, allowing you to sense the location of living creatures without light (see \pcref{Lifesense}).
                In addition, you gain \trait{lifesight} with a 30 foot range, allowing you to see living creatures without light (see \pcref{Lifesight}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Feel the Flow of Life+",
            is_magical: true,
            rank: 4,
            description: r"
                The range of your lifesense increases by 120 feet, and the range of your lifesight increases by 30 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Feel the Flow of Life+",
            is_magical: true,
            rank: 7,
            description: r"
                The range of your lifesense increases by 240 feet, and the range of your lifesight increases by 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Transcend Uncertainty",
            is_magical: false,
            rank: 2,
            description: r"
                You are immune to being \dazed, \stunned, and \confused.
            ",
            // TODO: represent immunities?
            modifiers: None,
        },
        RankAbility {
            name: "Transcend Time",
            is_magical: false,
            rank: 3,
            description: r"
                You are immune to being \slowed and \immobilized.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Transcend Emotion",
            is_magical: false,
            rank: 5,
            description: r"
                You are immune to \abilitytag{Emotion} attacks.
                In addition, you are immune to being \shaken, \frightened, and \panicked.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Transcend Mortality",
            is_magical: true,
            rank: 6,
            description: r"
                You are no longer considered a living creature for the purpose of attacks against you.
                This means that attacks which only affect living creatures have no effect against you.
                In addition, you no longer take penalties to your attributes for aging, and cannot be magically aged.
                You still die of old age when your time is up.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Inner Transcendence",
            is_magical: false,
            rank: 7,
            description: r"
                You are immune to \glossterm{conditions}.
            ",
            modifiers: None,
        },
    ];
}
