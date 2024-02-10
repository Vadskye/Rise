use regex::Regex;

pub fn add_accuracy_to_effect(modifier: i32, effect: &str, name: &str) -> String {
    let mut replaced_effect = effect.to_string();
    let mut replaced_accuracy = false;

    let accuracy_pattern = Regex::new(r"\$(brawlingaccuracy|accuracy)([+-]?)(\d*)\b").unwrap();
    for (_, [accuracy_type, modifier_sign, existing_modifier]) in
        accuracy_pattern.captures_iter(effect).map(|c| c.extract())
    {
        let existing_modifier_abs = existing_modifier.parse::<i32>().unwrap_or(0);
        let existing_modifier_value = if modifier_sign == "-" {
            -existing_modifier_abs
        } else {
            existing_modifier_abs
        };

        let new_modifier_value = existing_modifier_value + modifier;
        let new_modifier_sign = if new_modifier_value > 0 { "+" } else { "" };
        let new_modifier_text = if new_modifier_value == 0 {
            "".to_string()
        } else {
            new_modifier_value.to_string()
        };

        replaced_effect = accuracy_pattern
            .replacen(
                &replaced_effect,
                1,
                format!(
                    "$${accuracy_type}{sign}{value}",
                    accuracy_type = accuracy_type,
                    sign = new_modifier_sign,
                    value = new_modifier_text,
                ),
            )
            .to_string();

        if replaced_accuracy {
            panic!(
                "Cannot add accuracy to ability {}: more than one $accuracy present",
                name
            );
        } else {
            replaced_accuracy = true;
        }
    }
    // If there was no accuracy to replace, something has gone wrong.
    if !replaced_accuracy {
        panic!(
            "Cannot add accuracy to ability {}: no $accuracy to replace",
            name
        );
    }
    replaced_effect
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn can_add_new_modifier() {
        assert_eq!(
            "Attack with $accuracy+1 accuracy",
            add_accuracy_to_effect(1, "Attack with $accuracy accuracy", "arbitrary name")
        );
    }

    #[test]
    fn can_increase_existing_modifier() {
        assert_eq!(
            "Attack with $accuracy+3 accuracy",
            add_accuracy_to_effect(2, "Attack with $accuracy+1 accuracy", "arbitrary name")
        );
    }

    #[test]
    fn can_decrease_existing_modifier() {
        assert_eq!(
            "Attack with $accuracy+1 accuracy",
            add_accuracy_to_effect(-2, "Attack with $accuracy+3 accuracy", "arbitrary name")
        );
    }

    #[test]
    fn can_flip_existing_modifier_sign() {
        assert_eq!(
            "Attack with $accuracy-2 accuracy",
            add_accuracy_to_effect(-4, "Attack with $accuracy+2 accuracy", "arbitrary name")
        );
    }

    #[test]
    fn can_add_new_modifier_to_brawling() {
        assert_eq!(
            "Attack with $brawlingaccuracy+1 accuracy",
            add_accuracy_to_effect(
                1,
                "Attack with $brawlingaccuracy accuracy",
                "arbitrary name"
            )
        );
    }
}
