use crate::latex_formatting;

use super::{AbilityType, AbilityTag, UsageTime};

pub fn latex_ability_block(
    ability_type: AbilityType,
    effect: String,
    name: String,
    tags: Option<Vec<AbilityTag>>,
    usage_time: Option<UsageTime>,
) -> String {
    return format!(
        "
            \\begin<{ability_environment}>*<{name}>[{ability_type}]
                {header}
                \\rankline
                {effect}
            \\end<{ability_environment}>
        ",
        ability_environment = ability_type.environment(),
        effect = effect,
        header = latex_ability_header(tags, usage_time),
        ability_type = ability_type.name(),
        name = latex_formatting::uppercase_first_letter(&name),
    );
}

fn latex_ability_header(tags: Option<Vec<AbilityTag>>, usage_time: Option<UsageTime>) -> String {
    let tags_text = if let Some(t) = tags {
        t.iter().map(|tag| tag.description()).collect::<Vec<String>>().join(", ")
    } else {
        "".to_string()
    };
    let usage_time_text = if let Some(u) = usage_time {
        u.latex_ability_header().unwrap_or("".to_string())
    } else {
        "".to_string()
    };
    return vec![tags_text, usage_time_text].join("\n");
}
