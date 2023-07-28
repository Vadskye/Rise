use crate::latex_formatting;
use regex::Regex;

use super::{AbilityType, UsageTime};

pub fn latex_ability_block(
    ability_type: AbilityType,
    effect: String,
    formatted_tags: Vec<String>,
    is_magical: bool,
    name: String,
    usage_time: Option<UsageTime>,
) -> String {
    validate_effect(&effect, &name);
    format!(
        "
            {begin}
                {header}
                \\rankline
                {effect}
            {end}
        ",
        begin = ability_type.begin(&latex_formatting::uppercase_first_letter(&name), is_magical),
        header = latex_ability_header(formatted_tags, usage_time),
        effect = effect,
        end = ability_type.end(is_magical),
    )
}

fn latex_ability_header(tags: Vec<String>, usage_time: Option<UsageTime>) -> String {
    let tags_text = tags.join(", ");
    let usage_time_text = if let Some(u) = usage_time {
        u.latex_ability_header()
    } else {
        "".to_string()
    };
    vec![tags_text, usage_time_text].join("\n")
}

// Check for common typos
fn validate_effect(effect: &str, name: &str) {
    let warn = |message| {
        eprintln!("Ability {} {}", name, message);
    };

    let accuracy_vs_pattern = Regex::new(r"\d +vs\b").unwrap();
    if accuracy_vs_pattern.is_match(effect) {
        warn("is missing an explanation of its accuracy");
    }

    let vs_without_period_pattern = Regex::new(r"vs ").unwrap();
    if vs_without_period_pattern.is_match(effect) {
        warn("is missing a period after 'vs'");
    }

    let strike_pattern = Regex::new(r"makes.*strike").unwrap();
    let with_its_pattern = Regex::new(r"with (a|its)").unwrap();
    if strike_pattern.is_match(effect) && !with_its_pattern.is_match(effect) {
        warn("makes a strike without clarifying the weapon used");
    }

    let attack_without_accuracy_pattern =
        Regex::new(r"make[^0-9]*(attack|strike)[^0-9]*vs\.").unwrap();
    if attack_without_accuracy_pattern.is_match(effect) {
        warn("makes an attack without defining its accuracy");
    }
}
