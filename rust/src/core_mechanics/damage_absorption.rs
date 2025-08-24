use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::HasArmor;
use crate::monsters::{ChallengeRating, Role};

pub trait HasDamageAbsorption {
    fn calc_durability(&self) -> i32;
    fn calc_hit_points(&self) -> i32;
    fn calc_injury_point(&self) -> i32;
    fn calc_effective_combat_hit_points(&self) -> i32;
    fn explain_damage_absorption(&self) -> String;
}

impl HasDamageAbsorption for Creature
where
    Creature: HasAttributes + HasModifiers + HasArmor,
{
    fn calc_durability(&self) -> i32 {
        let rank = (self.level + 2) / 3;
        let durability_from_level = self.level - rank;
        let durability_from_armor: i32 = self.get_armor().iter().map(|a| a.durability()).sum();
        // TODO: include body armor durability and base class durability
        let durability = durability_from_level + durability_from_armor + self.get_base_attribute(&Attribute::Constitution);

        durability
    }

    fn calc_hit_points(&self) -> i32 {
        let hp = 10
            + calc_hp_rank_multiplier(self) * self.calc_durability()
            + self.calc_total_modifier(ModifierType::HitPoints);

        match self.category {
            CreatureCategory::Character => hp,
            CreatureCategory::Monster(cr, _) => (hp as f64 * cr.hp_multiplier()) as i32,
        }
    }

    fn calc_injury_point(&self) -> i32 {
        match self.category {
            CreatureCategory::Character => calc_character_injury_point(self),
            CreatureCategory::Monster(_, role) => calc_monster_injury_point(self, role),
        }
    }

    fn calc_effective_combat_hit_points(&self) -> i32 {
        if self.can_recover() {
            ((self.calc_hit_points() as f64) * 1.5).floor() as i32
        } else {
            self.calc_hit_points()
        }
    }

    fn explain_damage_absorption(&self) -> String {
        match self.category {
            CreatureCategory::Character => explain_character_damage_absorption(self),
            CreatureCategory::Monster(cr, role) => {
                explain_monster_damage_absorption(self, cr, role)
            }
        }
    }
}

fn calc_character_injury_point(creature: &Creature) -> i32 {
    let ip = calc_ip_rank_multiplier(creature)
        * (creature.level + creature.get_base_attribute(&Attribute::Constitution)) as f64;

    ip as i32
}

fn calc_monster_injury_point(creature: &Creature, role: Role) -> i32 {
    (creature.calc_hit_points() as f64 * role.injury_point_multiplier()) as i32
}

fn calc_hp_rank_multiplier(creature: &Creature) -> i32 {
    let rank = (creature.level + 2) / 3;
    match rank {
        0 => 0,
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 6,
        6 => 8,
        7 => 10,
        // Past this point, it's more or less arbitrarily extrapolated. It would be better
        // to eventually scale past +2 per rank, but it doesn't matter enough to
        // calculate, and odd multipliers make injury point calculation annoyingly
        // fractional.
        8 => 12,
        9 => 14,
        10 => 16,
        _ => panic!("Unable to calculate rank for level {}", creature.level)
    }
}

fn calc_ip_rank_multiplier(creature: &Creature) -> f64 {
    let rank = (creature.level + 2) / 3;
    match rank {
        0 => 0.0,
        1 => 0.5,
        2 => 1.0,
        3 => 1.5,
        4 => 2.0,
        5 => 3.0,
        6 => 4.0,
        7 => 5.0,
        // Past this point, it's more or less arbitrarily extrapolated. It would be better
        // to eventually scale past +2 per rank, but it doesn't matter enough to
        // calculate, and odd multipliers make injury point calculation annoyingly
        // fractional.
        8 => 6.0,
        9 => 7.0,
        10 => 8.0,
        _ => panic!("Unable to calculate rank for level {}", creature.level)
    }
}

fn explain_character_damage_absorption(creature: &Creature) -> String {
    let rank = (creature.level + 2) / 3;
    let durability_from_level = creature.level - rank;
    // TODO: add armor and base class scaling
    format!(
        "
Durability: {durability_total} = {durability_from_level} <level scaling> + {constitution} <Con> + {durability_modifier} <modifier>
HP: {hp_total} = {hp_rank_multiplier} <rank mult> * {durability_total} <durability> + {hp_modifier} <modifier>
IP: {ip_total} = {ip_rank_multiplier} <rank mult> * {level} <level + {ip_modifier} <modifier>
        ",
        durability_total = creature.calc_durability(),
        durability_from_level = durability_from_level,
        constitution = creature.get_base_attribute(&Attribute::Constitution),
        durability_modifier = creature.calc_total_modifier(ModifierType::Durability),
        hp_total = creature.calc_hit_points(),
        hp_rank_multiplier = calc_hp_rank_multiplier(creature),
        hp_modifier = creature.calc_total_modifier(ModifierType::HitPoints),
        ip_total = creature.calc_injury_point(),
        ip_rank_multiplier = calc_ip_rank_multiplier(creature),
        level = creature.level,
        ip_modifier = creature.calc_total_modifier(ModifierType::InjuryPoint),
    )
}

fn explain_monster_damage_absorption(
    creature: &Creature,
    cr: ChallengeRating,
    role: Role,
) -> String {
    let rank = (creature.level + 2) / 3;
    let durability_from_level = creature.level - rank;
    let elite_hp_multiplier = cr.hp_multiplier();
    let ip_multiplier = role.injury_point_multiplier();

    format!(
        "
Durability: {durability_total} = {durability_from_level} <level scaling> + {constitution} <Con> + {durability_modifier} <modifier>
HP: {hp_total} = (({hp_rank_multiplier} <rank mult> * {durability_total} <durability>) + {hp_modifier} <modifier>) * {elite_hp_multiplier} <elite multiplier>
IP: {ip_total} = {hp_total} <hit points> * {ip_multiplier} <role multiplier> + {ip_modifier} <modifier>
        ",
        durability_total = creature.calc_durability(),
        durability_from_level = durability_from_level,
        constitution = creature.get_base_attribute(&Attribute::Constitution),
        durability_modifier = creature.calc_total_modifier(ModifierType::Durability),
        hp_total = creature.calc_hit_points(),
        hp_rank_multiplier = calc_hp_rank_multiplier(creature),
        hp_modifier = creature.calc_total_modifier(ModifierType::HitPoints),
        elite_hp_multiplier = elite_hp_multiplier,
        ip_total = creature.calc_injury_point(),
        ip_multiplier = ip_multiplier,
        ip_modifier = creature.calc_total_modifier(ModifierType::InjuryPoint),
    )
}
