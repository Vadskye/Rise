use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::HasArmor;

pub trait HasDamageAbsorption {
    fn calc_damage_resistance(&self) -> i32;
    fn calc_hit_points(&self) -> i32;
    fn calc_effective_combat_hit_points(&self) -> i32;
    fn explain_damage_absorption(&self) -> String;
}

impl HasDamageAbsorption for Creature
where
    Creature: HasAttributes + HasModifiers + HasArmor,
{
    fn calc_damage_resistance(&self) -> i32 {
        let dr_from_armor: i32 = self.get_armor().iter().map(|a| a.damage_resistance()).sum();

        let mut dr = dr_from_armor + self.calc_total_modifier(ModifierType::DamageResistance);

        match self.category {
            CreatureCategory::Character => dr,
            CreatureCategory::Monster(cr, role) => {
                dr += (self.calc_hit_points() as f64 * role.hp_dr_multiplier()) as i32;
                (dr as f64 * cr.dr_multiplier()) as i32
            }
        }
    }

    fn calc_hit_points(&self) -> i32 {
        let hp_from_level = self.hit_point_progression.calc_hit_points(
            self.level,
            self.get_base_attribute(&Attribute::Constitution),
        );

        let hp = hp_from_level + self.calc_total_modifier(ModifierType::HitPoints);

        match self.category {
            CreatureCategory::Character => hp,
            CreatureCategory::Monster(cr, _) => (hp as f64 * cr.hp_multiplier()) as i32,
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
        let hp_multiplier = match self.category {
            CreatureCategory::Character => 0.0,
            CreatureCategory::Monster(cr, _) => cr.hp_multiplier(),
        };
        let dr_from_hp = match self.category {
            CreatureCategory::Character => 0,
            CreatureCategory::Monster(_, role) => {
                (self.calc_hit_points() as f64 * role.hp_dr_multiplier()) as i32
            }
        };
        let dr_multiplier = match self.category {
            CreatureCategory::Character => 0.0,
            CreatureCategory::Monster(cr, _) => cr.dr_multiplier(),
        };

        format!(
            "
HP: {hp_total} = ({hp_progression} progression: {hp_from_level} <level> + {hp_from_con} <con> + {hp_modifier} <modifier>) * {hp_multiplier} <elite multiplier>
DR: {dr_total} = ({dr_armor} <armor> + {dr_modifier} <modifier> + {dr_from_hp} <monster hp>) * {dr_multiplier} <elite multiplier>
            ",
            hp_total = self.calc_hit_points(),
            hp_progression = self.hit_point_progression.name(),
            hp_from_level = self.hit_point_progression.hp_from_level(self.level),
            hp_from_con = self.hit_point_progression.hp_from_con(self.level, self.get_base_attribute(&Attribute::Constitution)),
            hp_modifier = self.calc_total_modifier(ModifierType::HitPoints),
            hp_multiplier = hp_multiplier,
            dr_total = self.calc_damage_resistance(),
            dr_armor = self.get_armor().iter().map(|a| a.damage_resistance()).sum::<i32>(),
            dr_modifier = self.calc_total_modifier(ModifierType::DamageResistance),
            dr_from_hp = dr_from_hp,
            dr_multiplier = dr_multiplier,
        )
    }
}

#[derive(Clone, Debug)]
pub enum HitPointProgression {
    Extreme,  // Brute
    VeryHigh, // Barbarian
    High,     // Fighter
    Medium,   // Cleric
    Low,      // Sorcerer
}

impl HitPointProgression {
    // 0 points for baseline
    // 2 points for 25% more HP
    // 4 points for 42% more HP
    // 7 points for 75% more HP
    pub fn creation_point_cost(&self) -> i32 {
        match self {
            Self::Low => 0,
            Self::Medium => 2,
            Self::High => 4,
            Self::VeryHigh => 7,
            Self::Extreme => panic!("Extreme progression is not valid for characters")
        }
    }

    fn calc_hit_points(&self, level: i32, con: i32) -> i32 {
        self.hp_from_level(level) + self.hp_from_con(level, con)
    }

    fn hp_from_level(&self, level: i32) -> i32 {
        let [base_hp, incremental_hp] = self.progression_at_level(level);

        // This is the number of levels since the last breakpoint jump. Each breakpoint jump
        // increases base HP and incremental level count ("X HP per level above 7th").
        let incremental_level = (level - 1) % 6;

        base_hp + incremental_hp * incremental_level
    }

    fn hp_from_con(&self, level: i32, con: i32) -> i32 {
        let [_, incremental_hp] = self.progression_at_level(level);

        incremental_hp * con
    }

    fn complete_progression(&self) -> [[i32; 2]; 4] {
        match self {
            Self::Low => [[6, 1], [14, 2], [30, 4], [60, 8]],
            Self::Medium => [[8, 1], [18, 2], [35, 5], [70, 10]],
            Self::High => [[8, 2], [20, 3], [40, 6], [80, 12]],
            Self::VeryHigh => [[10, 2], [24, 4], [50, 8], [100, 15]],
            Self::Extreme => [[14, 2], [28, 5], [60, 10], [120, 20]],
        }
    }

    fn name(&self) -> &str {
        match self {
            Self::Extreme => "Extreme",
            Self::VeryHigh => "Very High",
            Self::High => "High",
            Self::Medium => "Medium",
            Self::Low => "Low",
        }
    }

    // Return [base_hp, incremental_hp]
    fn progression_at_level(&self, level: i32) -> [i32; 2] {
        // We have to use this awkward `if` structure instead of `%` so Rust recognizes
        // that we are within the bounds of the array.
        let i = if level <= 6 {
            0
        } else if level <= 12 {
            1
        } else if level <= 18 {
            2
        } else {
            3
        };
        self.complete_progression()[i]
    }

    pub fn to_class_text(&self) -> String {
        format!(
            "
                You have {level_one}
                This increases as your level increases, as indicated below.
                \\begin<itemize>
                    \\itemhead<Level 7> {level_seven}
                    \\itemhead<Level 13> {level_thirteen}
                    \\itemhead<Level 19> {level_nineteen}
                \\end<itemize>
            ",
            level_one = self.hit_points_at_level_text(1),
            level_seven = self.hit_points_at_level_text(7),
            level_thirteen = self.hit_points_at_level_text(13),
            level_nineteen = self.hit_points_at_level_text(19),
        )
    }

    fn hit_points_at_level_text(&self, level: i32) -> String {
        let [base_hp, incremental_hp] = self.progression_at_level(level);
        let constitution_multiplier_text = match incremental_hp {
            1 => "",
            2 => "twice",
            3 => "three times",
            4 => "four times",
            5 => "five times",
            6 => "six times",
            8 => "eight times",
            10 => "ten times",
            12 => "twelve times",
            15 => "fifteen times",
            _ => panic!("Unsupported constitution multiplier {}", incremental_hp),
        };
        return format!(
            "{} hit points \\add {} your Constitution, plus {} hit points per level beyond {}.",
            base_hp, constitution_multiplier_text, incremental_hp, level,
        );
    }
}
