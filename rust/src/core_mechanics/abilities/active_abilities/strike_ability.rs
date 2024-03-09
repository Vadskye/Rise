use super::add_accuracy_to_effect::add_accuracy_to_effect;
use super::replace_attack_terms::replace_attack_terms;
use crate::core_mechanics::abilities::{latex_ability_block, AbilityTag, AbilityType, UsageTime};
use crate::core_mechanics::DamageType;
use crate::creatures::Creature;
use crate::equipment::Weapon;

#[derive(Clone, Debug, Default)]
pub struct StrikeAbility {
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    pub tags: Vec<AbilityTag>,
    pub usage_time: UsageTime,
    pub weapon: Weapon,
}

impl StrikeAbility {
    pub fn validate(&self) {
        let warn = |message| {
            eprintln!("StrikeAbility {} {}", self.name, message);
        };

        if !(self.effect.contains("$weapon")
            || self.effect.contains(&self.weapon.name.to_lowercase()))
        {
            warn("should contain the name of the weapon")
        }
    }

    // Some monsters take standard maneuvers and use them as elite actions.
    pub fn except_elite(mut self) -> Self {
        self.usage_time = UsageTime::Elite;

        self
    }

    pub fn except_name(mut self, name: &str) -> Self {
        self.name = name.to_string();

        self
    }

    // Note that this ignores any accuracy penalty from non-Light weapons or a low Dex.
    // TODO: accept an argument so it can calculate the accuracy penalty, if any.
    pub fn except_dual_strike(mut self) -> Self {
        if self.effect.contains("dual strike") {
            panic!(
                "Cannot convert StrikeAbility {} to a dual strike: it is already a dual strike",
                self.name
            );
        }

        if self.effect.contains("strike") {
            // We use a preceding space to make sure we don't match \glossterm{strike}, which would
            // create confusing nested glossterms.
            self.effect = self.effect.replace(" strike", r" \glossterm{dual strike}");
        } else {
            panic!(
                "Cannot convert StrikeAbility {} to a dual strike: no strike",
                self.name
            );
        }
        if self.effect.contains("$weapon") {
            self.effect = self.effect.replace("$weapon", "$weapons");
        } else {
            panic!(
                "Cannot convert StrikeAbility {} to a dual strike: no weapon",
                self.name
            );
        }

        self
    }

    pub fn latex_ability_block(mut self, creature: &Creature) -> String {
        // We have to stringify the tags before sending them over
        let mut latex_tags: Vec<String> = self.tags.iter().map(|t| t.latex()).collect();
        // Add the tags from the weapon
        for tag in self.weapon.tags.iter() {
            if tag.visible_in_monster_tags() {
                latex_tags.push(tag.latex());
            }
        }
        // If the creature is massive, add the appropriate tag and add a "glance on miss"
        // effect.
        if let Some(tag) = creature.size.massive_weapon_tag() {
            // TODO: remove Sweeping if it exists
            latex_tags.push(tag.latex());
            if !self.effect.contains(r"\miss") {
                self.effect.push_str(
                    r"
                    \miss Half damage.
                ",
                );
            }
        }

        // TODO: does this sort by the visible tag name, or does it put all \\abilitytag
        // entries before all \\weapontag entries?
        latex_tags.sort();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        latex_ability_block(
            AbilityType::Normal,
            replace_attack_terms(&self.effect, creature, self.is_magical, Some(&self.weapon)),
            latex_tags,
            self.is_magical,
            self.name,
            Some(self.usage_time),
        )
    }

    pub fn plus_accuracy(mut self, modifier: i32) -> Self {
        self.effect = add_accuracy_to_effect(modifier, &self.effect, &self.name);

        self
    }

    pub fn consecrated_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} strike vs. Armor with its $weapon.
                    In addition, it \\glossterm<briefly> gains a +2 bonus to its Mental defense.
                    \\hit $fullweapondamage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: strike_prefix("Consecrated", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn enraging_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target loses hit points, it is \enraged as a \glossterm{condition}.
                Every round, it must spend a \glossterm{standard action} to make an attack.
            "
            .to_string(),
            name: strike_prefix("Enraging", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    // 2x at rank 5, 3x at rank 7
    pub fn generic_weapon_damage(rank: i32, weapon: Weapon) -> Self {
        let damage_multiplier;
        let accuracy;
        if rank >= 7 {
            damage_multiplier = "*3";
            accuracy = rank - 7;
        } else if rank >= 5 {
            damage_multiplier = "*2";
            accuracy = rank - 5;
        } else {
            damage_multiplier = "";
            accuracy = rank - 1;
        }
        Self {
            effect: format!(
                "
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \\hit $damage{damage_multiplier} $damagetypes damage.
            "
            ),
            name: weapon.name.clone(),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(accuracy)
    }

    pub fn grappling_strike(weapon: Weapon) -> Self {
        assert_melee("Grappling Strike", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If this attack beats the target's Fortitude defense, and the target is smaller than the $name, they are \grappled by each other.
            ".to_string(),
            name: strike_prefix("Grappling", &weapon),
            weapon,
            ..Default::default()
        }
    }

    fn ichor_infestation_details() -> String {
        r"
            If the target loses hit points, it is infested with ichor as a \glossterm{condition}.
            While infested with ichor, it cannot regain \glossterm{hit points} or \glossterm{damage resistance}.
        ".to_string()
    }

    pub fn ichor_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} strike vs. Armor with its $weapon.
                    \\hit $fullweapondamage.
                    {ichor_infestation_details}
                ",
                accuracy_modifier = rank - 1,
                ichor_infestation_details = Self::ichor_infestation_details(),
            ),
            name: strike_prefix("Ichor", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn normal_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: weapon.name.clone(),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn dual_strike(rank: i32, weapon: Weapon) -> Self {
        Self::normal_strike(rank, weapon).except_dual_strike()
    }

    // If you're treating trip as a strike ability, it's because you're using it with a weapon.
    // Non-weapon trips are under CustomAbility.
    pub fn trip(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy melee attack vs. Fortitude and Reflex with its $weapon.
                \hit The target becomes \prone.
                If the attack also beat the target's Armor defense, the $name deals it $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Trip --", &weapon),
            tags: vec![AbilityTag::SizeBased],
            weapon,
            ..Default::default()
        }
    }
}

// TODO: it may be better to strip the Thrown tag from melee-capable weapons instead of
// panicking. Right now you can't use a defensive strike with a spear, which is awkward.
fn assert_melee(strike_name: &str, weapon: &Weapon) {
    assert!(weapon.is_melee(), "{} requires a melee weapon", strike_name,);
}

// Blunt Force
impl StrikeAbility {
    // TODO: weak strikes are not correctly handled by $fullweapondamage
    pub fn armorcrusher(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Fortitude with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Armorcrushing", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn armorcrusher_plus(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Fortitude with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Armorcrushing", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }

    pub fn forceful_smash(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target takes damage, it is \glossterm{knocked back} 15 feet.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Forceful", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }

    pub fn forceful_smash_plus(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $damage*2 $damagetypes damage.
                If the target takes damage, it is \glossterm{knocked back} 15 feet.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Forceful", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 7)
    }

    pub fn knockdown(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target loses hit points, it falls \prone.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Knockdown --", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn knockdown_plus(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target takes damage, it falls \prone.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Knockdown --", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }
}

// Ebb and Flow
impl StrikeAbility {
    pub fn guardbreaker(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                In addition, it chooses one of its allies.
                \hit $fullweapondamage.
                If the target takes damage, it \glossterm{briefly} takes a -2 penalty to all defenses against that ally's attacks.
            ".to_string(),
            name: strike_prefix("Guardbreaking", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }

    pub fn power_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-4 strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Power", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn reckless_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy+1 strike vs. Armor with its $weapon.
                After making the attack, it briefly takes a -2 penalty to all defenses.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Reckless", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn redeeming_followup(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +2 accuracy bonus with this strike against each creature that it missed with a strike last round.
                \hit $fullweapondamage.
            ".to_string(),
            name: strike_prefix("Redeeming", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }
}

// Flurry of Blows
impl StrikeAbility {
    pub fn frenzied_multistrike(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Frenzied Multistrike", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                For each previous consecutive round in which it used this ability, it can make an additional strike, up to a maximum of two extra strikes.
                \hit $fullweapondamage.
            ".to_string(),
            name: strike_prefix("Frenzied", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 5)
    }

    pub fn frenzied_strike(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Frenzied Strike", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                For each previous consecutive round in which it used this ability, it gains a +2 accuracy bonus with the strike, up to a maximum of +4.
                \hit $fullweapondamage.
            ".to_string(),
            name: strike_prefix("Frenzied", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }
}

// Mobile Assault
impl StrikeAbility {
    // Considered rank 2, which is unusual for a maneuver-ish effect.
    pub fn pounce(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Pounce", &weapon);
        Self {
            effect: r"
                The $name can move up to its speed in a single straight line.
                Then, it makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: "Pounce".to_string(),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 2)
    }

    pub fn reaping_harvest(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Reaping Harvest", &weapon);
        Self {
            effect: r"
                The $name moves up to half its movement speed in a straight line.
                It can also make a $accuracy strike vs. Armor with its $weapon.
                The strike targets all \glossterm{enemies} adjacent to it at any point during its movement.
                \hit $fullweapondamage.
                \miss Half damage.
            "
            .to_string(),
            name: strike_prefix("Reaping Harvest --", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }

    pub fn reaping_harvest_plus(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Reaping Harvest+", &weapon);
        Self {
            effect: r"
                The $name moves up to its movement speed in a straight line.
                It can also make a $accuracy strike vs. Armor with its $weapon.
                The strike targets all \glossterm{enemies} adjacent to it at any point during its movement.
                \hit $damage*2 $damagetypes damage.
                \miss Half damage.
            "
            .to_string(),
            name: strike_prefix("Reaping Harvest --", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }

    pub fn rushed_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-1 strike vs. Armor with its $weapon.
                It can also move up to half its speed either before or after making the strike.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Rushed", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn rushed_strike_plus(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-2 strike vs. Armor with its $weapon.
                It can also move up to its speed either before or after making the strike.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Rushed", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 2)
    }
}

// Penetrating Precision
impl StrikeAbility {
    // TODO: weak strikes are not correctly handled by $fullweapondamage
    pub fn armorpiercer(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Reflex with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Armorpiercing", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn distant_shot(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It reduces its \glossterm{longshot penalty} with the strike by 4.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Distant", &weapon),
            weapon,
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn heartpiercer(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +3 accuracy bonus with the strike for the purpose of determining whether it gets a \glossterm<critical hit>.
                \hit $fullweapondamage.
                \glance No effect.
            ".to_string(),
            name: strike_prefix("Heartpiercing", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }
}

// Rip and Tear
impl StrikeAbility {
    pub fn bloodletting_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target loses hit points, it takes damage from the strike again during the $name's next action.
            "
            .to_string(),
            name: strike_prefix("Bloodletting", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }

    pub fn flintspark_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target takes damage and the attack result beats its Reflex defense, it takes $mundanepower fire damage during the $name's next action.
            "
            .to_string(),
            name: weapon.name.clone(),
            weapon: weapon.except(|w| w.damage_types.push(DamageType::Fire)),
            ..Default::default()
        }
    }

    pub fn hamstring(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Hamstring", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each creature that loses hit points from the strike is \slowed as a \glossterm{condition}.
                \hit $fullweapondamage.
            ".to_string(),
            name: strike_prefix("Hamstring --", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }

    pub fn sweeping_strike(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Sweeping Strike", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Sweeping", &weapon),
            weapon: weapon.increase_sweeping(1),
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }
}

// Unbreakable Defense
impl StrikeAbility {
    pub fn defensive_strike(rank: i32, weapon: Weapon) -> Self {
        assert_melee("Defensive Strike", &weapon);
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Armor with its $weapon.
                In addition, it gains a +1 bonus to its Armor and Reflex defenses this round as a \abilitytag<Swift> effect.
                \hit $fullweapondamage.
            ".to_string(),
            name: strike_prefix("Defensive", &weapon),
            weapon,
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }
}

fn strike_prefix(prefix: &str, weapon: &Weapon) -> String {
    format!("{} {}", prefix, weapon.name)
}
