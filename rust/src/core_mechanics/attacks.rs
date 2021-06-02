use crate::core_mechanics::{damage_dice, defenses, HasCreatureMechanics};
use crate::equipment::weapons;
use crate::latex_formatting;

#[derive(Clone)]
pub struct StrikeAttackDefinition {
    pub accuracy_modifier: i8,
    pub damage_dice_increments: i8,
    pub damage_modifier: i8,
    pub defense: &'static defenses::Defense,
    pub is_magical: bool,
    pub name: String,
    pub power_multiplier: f64,
    pub weapon: weapons::Weapon,
}

#[derive(Clone)]
pub struct StandaloneAttackDefinition {
    pub accuracy_modifier: i8,
    pub damage_dice: damage_dice::DamageDice,
    pub damage_modifier: i8,
    pub defense: &'static defenses::Defense,
    pub is_magical: bool,
    pub name: String,
    pub power_multiplier: f64,
}

#[derive(Clone)]
pub enum Attack {
    StrikeAttack(StrikeAttackDefinition),
    StandaloneAttack(StandaloneAttackDefinition),
}

pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn calc_accuracy(&self) -> i8;
    fn calc_damage_increments(&self, is_strike: bool) -> i8;
    fn calc_damage_per_round_multiplier(&self) -> f64;
    fn calc_power(&self, is_magical: bool) -> i8;
}

impl Attack {
    pub fn calc_strikes(weapons: Vec<&weapons::Weapon>) -> Vec<Attack> {
        // TODO: combine maneuvers with weapons and handle non-weapon attacks
        return weapons
            .iter()
            .map(|w| {
                Attack::StrikeAttack(StrikeAttackDefinition {
                    accuracy_modifier: 0,
                    damage_dice_increments: 0,
                    damage_modifier: 0,
                    defense: defenses::ARMOR,
                    is_magical: false,
                    power_multiplier: 1.0,
                    name: w.name().to_string(),
                    weapon: *w.clone(),
                })
            })
            .collect();
    }

    pub fn new_strike(def: StrikeAttackDefinition) -> Self {
        return Attack::StrikeAttack(def);
    }

    pub fn latex_shorthand<T: HasCreatureMechanics>(&self, creature: &T) -> String {
        return format!(
            "{name} {accuracy} ({damage_dice}{damage_modifier})",
            name = latex_formatting::uppercase_first_letter(self.name()),
            accuracy = latex_formatting::modifier(self.calc_accuracy(creature)),
            damage_dice = self.calc_damage_dice(creature).to_string(),
            damage_modifier = latex_formatting::modifier(self.calc_damage_modifier(creature))
        );
    }

    pub fn name(&self) -> &str {
        match self {
            Attack::StrikeAttack(d) => d.name.as_str(),
            Attack::StandaloneAttack(d) => d.name.as_str(),
        }
    }

    pub fn defense(&self) -> &'static defenses::Defense {
        match self {
            Attack::StrikeAttack(d) => d.defense,
            Attack::StandaloneAttack(d) => d.defense,
        }
    }
}

// Calculation functions
impl Attack {
    pub fn calc_accuracy<T: HasCreatureMechanics>(&self, creature: &T) -> i8 {
        match self {
            Attack::StrikeAttack(d) => {
                d.accuracy_modifier + d.weapon.accuracy() + creature.calc_accuracy()
            }
            Attack::StandaloneAttack(d) => d.accuracy_modifier + creature.calc_accuracy(),
        }
    }

    pub fn calc_damage_dice<T: HasCreatureMechanics>(
        &self,
        creature: &T,
    ) -> damage_dice::DamageDice {
        match self {
            Attack::StrikeAttack(d) => d
                .weapon
                .damage_dice()
                .add(d.damage_dice_increments + creature.calc_damage_increments(true)),
            Attack::StandaloneAttack(d) => {
                d.damage_dice.add(creature.calc_damage_increments(false))
            }
        }
    }

    pub fn calc_damage_modifier<T: HasCreatureMechanics>(&self, creature: &T) -> i8 {
        match self {
            Attack::StrikeAttack(d) => {
                d.damage_modifier + (creature.calc_power(d.is_magical) as f64 * d.power_multiplier) as i8
            }
            Attack::StandaloneAttack(d) => {
                d.damage_modifier + (creature.calc_power(d.is_magical) as f64 * d.power_multiplier) as i8
            }
        }
    }
}

// LaTeX generation functions
impl Attack {
    pub fn latex_ability_block<T: HasCreatureMechanics>(&self, creature: &T) -> String {
        let ability_components: Vec<Option<String>> = vec![
            Some(self.latex_tags()),
            Some(self.latex_effect(creature)),
        ];
        let ability_components = ability_components
            .iter()
            .filter(|c| c.is_some())
            .map(|c| c.as_deref().unwrap().trim())
            .collect::<Vec<&str>>();
        return format!(
            "
                \\begin<{ability_environment}><{name}>[{ability_type}]
                    {ability_components}
                \\end<{ability_environment}>
            ",
            ability_environment = "freeability", // TODO
            ability_components = ability_components.join("\n\\rankline "),
            ability_type = "Instant", // TODO
            name = latex_formatting::uppercase_first_letter(self.name()),
        );
    }

    // This should always return a string; even if there are no tags, we want a rankline after the
    // top section.
    fn latex_tags(&self) -> String {
        // TODO: take into account tags and usage time
        return String::from("");
    }

    fn latex_effect<T: HasCreatureMechanics>(&self, creature: &T) -> String {
        return format!(
            "
                The $name makes a strike with a {accuracy} accuracy bonus.
                \\hit {damage} damage.
            ",
            accuracy = latex_formatting::modifier(self.calc_accuracy(creature)),
            damage = format!(
                "{}{}",
                self.calc_damage_dice(creature).to_string(),
                latex_formatting::modifier(self.calc_damage_modifier(creature))
            ),
        );
    }
}
