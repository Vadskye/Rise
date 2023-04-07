use super::latex::latex_ability_block;
use crate::core_mechanics::abilities::{AbilityTag, AbilityType, Cooldown, UsageTime, SustainAction};

#[derive(Clone, Debug)]
pub struct ActiveAbility {
    pub ability_type: AbilityType,
    pub cooldown: Option<Cooldown>,
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    // We only use ability tags instead of all tags here; active abilities shouldn't need
    // weapon tags
    pub tags: Option<Vec<AbilityTag>>,
    pub usage_time: Option<UsageTime>,
}

// LaTeX generation functions
impl ActiveAbility {
    pub fn latex_ability_block(self) -> String {
        // The ability cooldown, if any, has to be provided as part of the effect text.
        // `latex_ability_block` doesn't know how to add the cooldown itself.
        let mut effect_with_cooldown = self.effect;
        if let Some(cooldown) = self.cooldown {
            effect_with_cooldown = format!("{}\n\n{}", cooldown.description(false), effect_with_cooldown);
        }

        // We have to stringify the tags before sending them over
        let latex_tags = self.tags.unwrap_or(vec![]).iter().map(|t| t.latex()).collect();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        return latex_ability_block(
            self.ability_type,
            effect_with_cooldown,
            latex_tags,
            self.is_magical,
            self.name,
            self.usage_time,
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::testing::assert_multiline_eq;

    #[test]
    fn formats_complex_ability() {
        let ability = ActiveAbility {
            ability_type: AbilityType::Normal,
            cooldown: Some(Cooldown::Brief(None)),
            effect: "The $name glows like a torch for a minute.".to_string(),
            is_magical: true,
            name: "Torchlight".to_string(),
            tags: Some(vec![AbilityTag::Elite, AbilityTag::Sustain(SustainAction::Minor)]),
            usage_time: Some(UsageTime::Minor),
        };
        assert_multiline_eq(
            r"\begin<magicalactiveability>*<Torchlight>
                \abilitytag{Elite}, \abilitytag{Sustain} (minor)
\par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                After the $name uses this ability, it \glossterm{briefly} cannot use it again.

The $name glows like a torch for a minute.
            \end<magicalactiveability>",
            ability.latex_ability_block().trim().to_string(),
        );
    }
}
