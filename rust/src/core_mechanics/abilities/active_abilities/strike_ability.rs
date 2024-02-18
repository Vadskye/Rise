use super::add_accuracy_to_effect::add_accuracy_to_effect;
use super::replace_attack_terms::replace_attack_terms;
use crate::core_mechanics::abilities::{latex_ability_block, AbilityTag, AbilityType, UsageTime};
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

    // TODO: weak strikes are not correctly handled by $fullweapondamage
    pub fn armorcrusher(weapon: Weapon) -> Self {
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
    }

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

    pub fn bloodletting_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target takes damage and the attack result beats its Fortitude defense, it bleeds.
                A bleeding creature takes $dr0 slashing damage during the $name's next action.
            "
            .to_string(),
            name: strike_prefix("Bloodletting", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn consecrated_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} strike vs. Armor with its $weapon.
                    In addition, it \\glossterm<briefly> gains a +2 bonus to its Mental defense.
                    \\hit $damage $damagetypes damage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: strike_prefix("Consecrated", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn defensive_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Armor with its $weapon.
                In addition, it gains a +1 bonus to its Armor and Reflex defenses as a \abilitytag<Swift> effect.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Defensive", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn distant_shot(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It reduces its \glossterm{longshot penalty} with the strike by 4.
                \hit $damage $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Distant", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn enraging_strike(weapon: Weapon) -> Self {
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
    }

    // Must be melee-only
    pub fn frenzied_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                For each previous consecutive round in which it used this ability, it gains a +2 accuracy bonus with the strike, up to a maximum of +4.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Frenzied", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn grappling_strike(weapon: Weapon) -> Self {
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

    pub fn guardbreaker(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                In addition, it chooses one of its allies.
                Each creature damaged by the strike takes a -2 penalty to all defenses against that ally's attacks this round.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Guardbreaking", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn hamstring(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each creature that loses hit points from the strike is \slowed as a \glossterm{condition}.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Hamstring --", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn heartpiercer(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +3 accuracy bonus with the strike for the purpose of determining whether it gets a \glossterm<critical hit>.
                \hit $damage $damagetypes damage.
                \glance No effect.
            ".to_string(),
            name: strike_prefix("Heartpiercing", &weapon),
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

    pub fn pounce(weapon: Weapon) -> Self {
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
    }

    pub fn power_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-3 strike vs. Armor with its $weapon.
                \hit $damage*2 $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Power", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn reckless_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy+2 strike vs. Armor with its $weapon.
                After making the attack, it briefly takes a -4 penalty to all defenses.
                \hit $damage $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Reckless", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn redeeming_followup(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +2 accuracy bonus with this strike against each creature that it missed with a strike last round.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Redeeming", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn rushed_strike(weapon: Weapon) -> Self {
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
    }

    pub fn rushed_strike_plus(weapon: Weapon) -> Self {
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
    }

    pub fn normal_strike(weapon: Weapon) -> Self {
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
    }

    pub fn dual_strike(weapon: Weapon) -> Self {
        Self::normal_strike(weapon).except_dual_strike()
    }

    pub fn knockdown(weapon: Weapon) -> Self {
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
    }

    pub fn knockdown_plus(weapon: Weapon) -> Self {
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

fn strike_prefix(prefix: &str, weapon: &Weapon) -> String {
    format!("{} {}", prefix, weapon.name)
}
