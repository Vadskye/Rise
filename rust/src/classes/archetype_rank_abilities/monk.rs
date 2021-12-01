use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense};
use crate::creatures::Modifier;
use crate::skills::Skill;

pub fn airdancer<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Practiced Leaper",
            is_magical: false,
            rank: 0,
            description: r"
                You gain a \plus2 bonus to the Jump skill.
                In addition, using the \textit{desperate exertion} ability to affect a roll using the Jump skill only causes you to increase your \glossterm{fatigue level} by one instead of two.
            ",
            modifiers: Some(vec![Modifier::Skill(Skill::Jump, 2)]),
        },
        RankAbility {
            name: "Acrobatic Accuracy",
            is_magical: false,
            rank: 1,
            description: r"
                Whenever you make a Jump check that moves you over or adjacent to a creature, if your Jump check result beats that creature's Reflex defense, you gain a \plus1 bonus to \glossterm{accuracy} against that creature for the rest of the current round.
                This is a \glossterm{Swift} effect, so it helps you if you make a Jump check in the same phase that you make a strike, such as with the \ability{leaping strike} \glossterm{maneuver}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
                You take half damage from abilities that affect an area and attack your Armor or Reflex defense.
                This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
                If you have the \textit{evasion} rogue ability with the same effect as this ability, you reduce the total damage you take to one quarter of the normal value instead.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Airdance",
            is_magical: true,
            rank: 3,
            description: r"
                When you move with a Jump check, you can land in midair as if it was solid ground.
                Your landing location must be no more than 30 feet above above an object at least two size categories larger than you that is free-standing and capable of supporting your weight.
                You cannot walk in the air, but you can continue jumping or remain in place.
                The air holds you until the end of the current round, at which point you fall normally.
                After you land on air in this way, you \glossterm{briefly} cannot do so again.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Acrobatic Accuracy",
            is_magical: false,
            rank: 4,
            description: r"
                The bonus from your \textit{acrobatic accuracy} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Evasion",
            is_magical: false,
            rank: 5,
            description: r"
                Your \textit{evasion} ability also protects you from area attacks against your Fortitude and Mental defenses.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Airdance",
            is_magical: true,
            rank: 6,
            description: r"
                When you use your \textit{airdance} ability to land in the air, you can walk around freely in the air as if it was fully solid until the end of the round.
                In addition, the maxium height above the ground increases to 60 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Acrobatic Accuracy",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{acrobatic accuracy} ability increases to \plus3.
                In addition, the bonus lasts \glossterm{briefly}, instead of only for the current round.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ];
}

pub fn esoteric_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Esoteric Fluidity",
            is_magical: false,
            rank: 0,
            description: r"
                 You gain a \plus1 bonus to Dexterity-based \glossterm{checks}, except \glossterm{initiative} checks.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::Stealth, 1),
            ]),
        },
        RankAbility {
            name: "Combat Styles",
            is_magical: false,
            rank: 1,
            description: r"
                You can perform a wide variety of unusual attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{ebb and flow}, \textit{flurry of blows}, or \textit{mobile assault}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
                You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (2)",
            is_magical: false,
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(2)]),
        },
        RankAbility {
            name: "Combat Style Rank (3)",
            is_magical: false,
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Esoteric Fluidity",
            is_magical: false,
            rank: 3,
            description: r"
                The bonus from your \textit{esoteric fluidity} ability increases to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::Stealth, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (4)",
            is_magical: false,
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Maneuver",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            is_magical: false,
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Esoteric Force",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{esoteric force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            is_magical: false,
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Esoteric Fluidity",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{esoteric fluidity} ability increases to \plus3.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::Stealth, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            is_magical: false,
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Esoteric Maneuver",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
    ];
}

pub fn ki<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 0,
            description: r"
                While you are not wearing other body armor, you gain a ki barrier around your body.
                This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                It also provides a \plus3 bonus to your \glossterm{damage resistance}.

                You can also use a \glossterm{free hand} to wield the barrier as a shield.
                This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.
            ",
            // This only works if everyone with this archetype doesn't equip actual armor, since
            // the system won't know not to stack the effects
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 3),
                Modifier::DamageResistance(3),
            ]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(8)]),
        },
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
            modifiers: Some(vec![Modifier::DamageResistance(25)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            name: "Ki Barrier",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(35)]),
        },
        RankAbility {
            name: "Ki Energy",
            is_magical: true,
            rank: 0,
            description: r"
                Whenever you make a \glossterm{strike}, you can choose to treat it as a \glossterm{magical} ability.
                This allows you to use your \glossterm{power} with magical abilities to determine your damage.
                In addition, that strike does not deal \glossterm{physical damage} or any physical damage subtypes.
                If the strike would normally deal one or more subtype of energy damage, the damage is of those types.
                Otherwise, all damage dealt by the strike is \glossterm{energy damage}.
            ",
            // TODO: use higher of magical and mundane power for strikes
            modifiers: None,
        },
        RankAbility {
            name: "Ki Manifestations",
            is_magical: true,
            rank: 1,
            description: r"
                You can channel your ki to temporarily enhance your abilities.
                Choose two \textit{ki manifestations} from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{ki manifestation} per \glossterm{insight point}.
                You can use any \textit{ki manifestation} ability you know using the type of action indicated in the ability's description.

                After you use a \textit{ki manifestation}, you \glossterm{briefly} cannot use a \textit{ki manifestation} again.
                {
                    \begin{durationability}{Abandon the Fragile Self}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You can negate one \glossterm{condition} that would be applied to you this phase.
                        In exchange, you take a \minus2 penalty to \glossterm{defenses} this phase.

                        \rankline
                        \rank{3} You can negate any number of conditions instead of only one condition.
                        \rank{5} The defense penalty is reduced to \minus1.
                        \rank{7} The defense penalty is removed.
                    \end{durationability}

                    \begin{durationability}{Burst of Blinding Speed}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus10 foot bonus to your land speed this phase.

                        \rankline
                        \rank{3} You can also ignore \glossterm{difficult terrain} this phase.
                        \rank{5} The speed bonus increases to \plus15 feet.
                        \rank{7} You can also move or stand on liquids as if they were solid this phase.
                    \end{durationability}

                    \begin{durationability}{Calm the Inner Tempest}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Endurance skill this round (see \pcref{Endurance}).

                        \rankline
                        \rank{3} The bonus increases to \plus8.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus12.
                    \end{durationability}

                    \begin{durationability}{Extend the Flow of Ki}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus5 foot bonus to your \glossterm{reach} this round.

                        \rankline
                        \rank{3} The bonus increases to \plus10 feet.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus15 feet.
                    \end{durationability}

                    \begin{instantability}{Flash Step}[Instant]
                        \rankline
                        You can use this ability as part of movement with your land speed.
                        % TODO: is 'horizontally' the correct word?
                        You \glossterm{teleport} horizontally instead of moving normally.
                        If your \glossterm{line of effect} to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are.

                        Teleporting a given distance costs movement equal to twice that distance.
                        For example, if you have a 30 foot movement speed, you can move 10 feet, teleport 5 feet, and move an additional 10 feet before your movement ends.

                        \rankline
                        \rank{3} The movement cost to teleport is reduced to be equal to the distance you teleport.
                        \rank{5} You can use this ability to move even if you are \immobilized or \grappled.
                        \rank{7} You can attempt to teleport to locations outside of \glossterm{line of sight} and \glossterm{line of effect}.
                        If your intended destination is invalid, the distance you spent teleporting is wasted, but you suffer no other ill effects.
                    \end{instantability}

                    \begin{durationability}{Flurry of a Thousand Cuts}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        When you use the \ability{offhand strike} ability this round, you roll the attack roll twice and take the higher result.

                        \rankline
                        \rank{3} You also gain a +1 \glossterm{accuracy} bonus with the \ability{offhand strike} ability.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The accuracy bonus increases to +2.
                    \end{durationability}

                    \begin{durationability}{Hear the Rustling Wings}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Awareness skill this round (see \pcref{Awareness}).

                        \rankline
                        \rank{3} The bonus increases to \plus8.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus12.
                    \end{durationability}

                    \begin{durationability}{Kindle the Living Flame}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        Your \glossterm{strikes} deal fire damage in addition to their other damage types this round.

                        \rankline
                        \rank{3} You also gain a +2 \glossterm{power} bonus with strikes.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The power bonus increases to +4.
                    \end{durationability}

                    \begin{durationability}{Leap of the Heavens}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Jump skill this round (see \pcref{Jump}).

                        \rankline
                        \rank{3} The bonus increases to \plus8.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus12.
                    \end{durationability}

                    \begin{durationability}{Rest Atop the Precipice}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Balance skill this round (see \pcref{Balance}).

                        \rankline
                        \rank{3} The bonus increases to \plus8.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus12.
                    \end{durationability}

                    \begin{durationability}{Scale the Highest Tower}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a \plus4 bonus to the Climb skill this round (see \pcref{Climb}).
                        % TODO: is this wording correct?

                        \rankline
                        \rank{3} The Climb bonus increases to \plus8.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to \plus12.
                    \end{durationability}

                    \begin{durationability}{Shelter from Falling Rain}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You gain a +2 bonus to your defenses against ranged \\glossterm{strikes} from weapons or projectiles that are Small or smaller this round.

                        \rankline
                        \rank{3} The bonus increases to +3.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The bonus increases to +4.
                    \end{durationability}

                    \begin{durationability}{Step Between the Mystic Worlds}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        All attacks against you have a 20\\% \glossterm{failure chance} this round.
                        However, your attacks also have a 20\\% failure chance this round.

                        \rankline
                        \rank{3} The failure chance for attacks against you increases to 25\\%.
                        \rank{5} When you use this ability, you can choose whether it becomes a \glossterm{brief} effect.
                        \rank{7} The failure chance for attacks against you increases to 30\\%.
                    \end{durationability}

                    \begin{durationability}{Thread the Eye of the Storm}[Duration]
                        \abilitytag{Swift}
                        \rankline
                        You can use this ability as a \glossterm{free action}.
                        You reduce your \glossterm{longshot penalty} with thrown weapons by 1 this round (see \pcref{Weapon Range Limits}).

                        \rankline
                        \rank{3} The penalty reduction increases to 2.
                        \rank{5} This becomes a \glossterm{brief} effect.
                        \rank{7} The penalty reduction increases to 3.
                    \end{durationability}

                    % TODO: this is confusing since skills no longer directly reference attributes
                    % \begin{durationability}{Surpass the Mortal Limits}
                    %     \spelltwocol{Duration}{\abilitytag{Swift}}
                    %     \rankline
                    %     You can use this ability as a \glossterm{free action}.
                    %     You can use your \glossterm{power} in place of your Strength, Dexterity, and Constitution when making checks this phase.

                    %     \rankline
                    %     \rank{3} You also gain a \plus2 bonus to checks based on Strength, Dexterity, and Constitution.
                    %     \rank{5} The effect lasts until the end of the current round.
                    %     \rank{7} The bonus increases to \plus4.
                    % \end{durationability}

                    % TODO: add more
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Ki Barrier",
            is_magical: true,
            rank: 2,
            description: r"
                The damage resistance bonus from your \textit{ki barrier} ability increases to four times your rank in this archetype.
                In addition, the defense bonus from the body armor increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Ki Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{power} with all abilities.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(2), Modifier::MundanePower(2)]),
        },
        RankAbility {
            name: "Greater Ki Manifestation",
            is_magical: true,
            rank: 4,
            description: r"
                After using a \textit{ki manifestation}, you can use a different \textit{ki manifestation} after the end of the current round.
                You still cannot use the same \textit{ki manifestation} in two consecutive rounds.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Ki Barrier",
            is_magical: true,
            rank: 5,
            description: r"
                The damage resistance bonus from your \textit{ki barrier} ability increases to five times your rank in this archetype.
                In addition, the defense bonus from the body armor increases to \plus4.
            ",
            // Rank 4: 16. Rank 5: 25.
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Greater Ki Power",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{ki power} ability increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(4), Modifier::MundanePower(4)]),
        },
        RankAbility {
            name: "Supreme Ki Manifestation",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional \textit{ki manifestation}.
                In addition, your \textit{greater ki manifestation} ability also allows you to use the same \textit{ki manifestation} ability in consecutive rounds.
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
            rank: 0,
            description: r"
                You become \glossterm{proficient} with the unarmed weapons \glossterm{weapon group} (see \pcref{Weapon Groups}).
                In addition, you gain a \plus2d damage bonus with weapons that have the Unarmed weapon tag (see \pcref{Weapon Tags}).
                For details about how to fight while unarmed, see \pcref{Unarmed Combat}.
            ",
            // TODO: selective bonus with only unarmed? It's easy enough to just give people
            // from this archetype weapons
            modifiers: None,
        },
        RankAbility {
            name: "Fast Movement",
            is_magical: false,
            rank: 1,
            description: r"
                You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Perfect Precision",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} with attacks using weapons from the monk weapons and unarmed weapons \glossterm{weapon groups}, natural weapons, and to any attack using one or more \glossterm{free hands}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Perfect Body",
            is_magical: false,
            rank: 3,
            description: r"
                Choose a physical \glossterm{attribute}: Strength, Dexterity, or Constitution (see \pcref{Attributes}).
                You permanently gain a \plus1 bonus to the base value of that attribute.
            ",
            modifiers: Some(vec![Modifier::BaseAttribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            name: "Greater Fast Movement",
            is_magical: false,
            rank: 4,
            description: r"
                The speed bonus from your \textit{fast movement} ability increases to \plus10 feet.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Greater Unarmed Warrior",
            is_magical: false,
            rank: 4,
            description: r"
                The damage bonus from your \textit{unarmed warrior} ability increases to \plus3d.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Perfect Precision",
            is_magical: false,
            rank: 5,
            description: r"
                The bonuses from your \textit{perfect precision} ability increase to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Perfect Body",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{perfect body} ability applies to the base value of all physical attributes, not just the one you chose.
            ",
            modifiers: Some(vec![
                Modifier::BaseAttribute(Attribute::Strength, 1),
                Modifier::BaseAttribute(Attribute::Dexterity, 1),
            ]),
        },
        RankAbility {
            name: "Supreme Fast Movement",
            is_magical: false,
            rank: 7,
            description: r"
                The speed bonus from your \textit{fast movement} ability increases to \plus20 feet.
            ",
            modifiers: Some(vec![Modifier::MovementSpeed(5)]),
        },
        RankAbility {
            name: "Supreme Unarmed Warrior",
            is_magical: false,
            rank: 7,
            description: r"
                The damage bonus from your \textit{unarmed warrior} ability increases to \plus4d.
            ",
            // TODO: At this point, you're probably using unarmed? This is weird.
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
    ];
}

pub fn transcendent_sage<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Transcend Frailty",
            is_magical: false,
            rank: 0,
            description: r"
                You are immune to being \dazed and \stunned.
            ",
            // TODO: represent immunities?
            modifiers: None,
        },
        RankAbility {
            name: "Clear the Mind",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{clear the mind} ability as a standard action.
                \begin{instantability}{Clear the Mind}[Instant]
                    \rankline
                    Remove up to two \glossterm{brief} effects or \glossterm{conditions} affecting you.
                    This cannot remove effects applied during the current round.

                    \rankline
                    \rank{3} This ability gains the \abilitytag{Swift} tag.
                    When you use it, the removed effects do not affect you during the current phase.
                    In addition, you \glossterm{briefly} cannot gain any \glossterm{conditions}.
                    \rank{5} You can use this ability as a \glossterm{minor action}.
                    When you do, you increase your \glossterm{fatigue level} by one.
                    \rank{7} You can remove any number of effects.
                \end{instantability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Feel the Flow of Life",
            is_magical: true,
            rank: 2,
            description: r"
                You become so attuned to the natural energy of life that you can sense it even when sight fails you.
                You gain the \glossterm{lifesense} ability with a 120 foot range.
                In addition, you gain the \glossterm{lifesight} ability with a 30 foot range.
            ",
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
            name: "Transcendent Might",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Inner Peace",
            is_magical: false,
            rank: 4,
            description: r"
                You are immune to being \shaken, \frightened, and \panicked.
                In addition, you are immune to \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Feel the Flow of Life",
            is_magical: true,
            rank: 5,
            description: r"
                The range of your \glossterm{lifesense} ability increases by 360 feet.
                In addition, the range of your \glossterm{lifesight} ability increases by 90 feet.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Transcendent Might",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{transcendent might} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
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
