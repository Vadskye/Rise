use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::attacks::Maneuver;
use crate::core_mechanics::attacks::StandardAttack;
use crate::creatures::Modifier;

pub fn add_standard_spell_modifiers<'a>(rank_abilities: &mut Vec<RankAbility<'a>>) {
    rank_abilities.append(&mut vec![
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 1,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(1).attack()),
                Modifier::Attack(StandardAttack::InflictWound(1).attack()),
                Modifier::Attack(StandardAttack::Firebolt(1).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(2).attack()),
                Modifier::Attack(StandardAttack::InflictWound(2).attack()),
                Modifier::Attack(StandardAttack::Firebolt(2).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(3).attack()),
                Modifier::Attack(StandardAttack::InflictWound(3).attack()),
                Modifier::Attack(StandardAttack::Firebolt(3).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(4).attack()),
                Modifier::Attack(StandardAttack::InflictWound(4).attack()),
                Modifier::Attack(StandardAttack::Firebolt(4).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(5).attack()),
                Modifier::Attack(StandardAttack::InflictWound(5).attack()),
                Modifier::Attack(StandardAttack::Firebolt(5).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(6).attack()),
                Modifier::Attack(StandardAttack::InflictWound(6).attack()),
                Modifier::Attack(StandardAttack::Firebolt(6).attack()),
            ]),
        },
        RankAbility {
            name: "Spells",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::DarkGrasp(7).attack()),
                Modifier::Attack(StandardAttack::InflictWound(7).attack()),
                Modifier::Attack(StandardAttack::Firebolt(7).attack()),
            ]),
        },
    ]);
}

pub fn add_standard_maneuver_modifiers<'a>(rank_abilities: &mut Vec<RankAbility<'a>>) {
    rank_abilities.append(&mut vec![
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 1,
            description: "",
            modifiers: Some(vec![
                Modifier::Maneuver(Maneuver::CertainStrike),
                Modifier::Maneuver(Maneuver::GenericScalingStrike(1)),
                Modifier::Maneuver(Maneuver::PowerStrike),
            ]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::GenericScalingStrike(3))]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::GenericScalingStrike(5))]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 6,
            description: "",
            // TODO: use more useful / realistic upgrades
            modifiers: Some(vec![Modifier::Accuracy(2)]),
        },
        RankAbility {
            name: "Maneuvers",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::GenericScalingStrike(7))]),
        },
    ]);
}
