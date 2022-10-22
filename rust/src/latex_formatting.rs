use regex::Regex;
use std::fmt::Display;

pub fn latexify(text: String) -> String {
    let mut short_text = text.clone().trim().to_string();
    short_text.truncate(50);
    if text.contains("\t") {
        eprintln!("Problem latexifying text: contains a tab ({})", short_text)
    }
    if text.contains("\r") {
        eprintln!("Problem latexifying text: contains a carriage return ({})", short_text)
    }

    let midline_double_backslash = Regex::new(r"\\\\.").unwrap();
    if midline_double_backslash.is_match(&text) {
        eprintln!(r"Problem latexifying text: contains a midline \\ ({})", text.trim())
    }

    let text = text
        .replace("<", "{")
        .replace(">", "}")
        .replace(" + ", " \\add ")
        // TODO: this is an incredibly stupid hack
        .replace("}{\\lcol}", ">{\\lcol}");

    let plus = Regex::new(r"\+(\d)").unwrap();
    let text = plus.replace_all(text.as_str(), r"\plus$1");

    let sub = Regex::new(r" - (\d)").unwrap();
    let text = sub.replace_all(text.as_ref(), r"\sub $1");

    let minus = Regex::new(r"-(\d)").unwrap();
    let text = minus.replace_all(text.as_ref(), r"\minus$1");

    return text.to_string();
}

pub fn join_formattable_list<T: Display>(strings: &Vec<T>) -> Option<String> {
    let strings: Vec<String> = strings.iter().map(|c| format!("{}", c)).collect();
    return join_string_list(&strings);
}

pub fn join_string_list(strings: &Vec<String>) -> Option<String> {
    let strings: Vec<&str> = strings.iter().map(|c| c.as_str()).collect();
    return join_str_list(&strings);
}

pub fn join_str_list(strings: &Vec<&str>) -> Option<String> {
    if strings.len() == 0 {
        return None;
    } else if strings.len() == 1 {
        return Some(strings[0].to_string());
    } else if strings.len() == 2 {
        return Some(format!("{} and {}", strings[0], strings[1]));
    } else {
        return Some(format!(
            "{}, and {}",
            strings[..strings.len() - 1].join(", "),
            strings[strings.len() - 1]
        ));
    }
}

pub fn uppercase_first_letter(text: &str) -> String {
    if let Some(c) = text.get(0..1) {
        return c.to_ascii_uppercase() + if let Some(s) = text.get(1..) { s } else { "" };
    } else {
        return text.to_string();
    }
}

pub fn modifier(val: i32) -> String {
    if val >= 0 {
        return format!("+{}", val);
    } else {
        return format!("{}", val);
    }
}

pub fn text_number(val: i32) -> String {
    match val {
        0 => "zero",
        1 => "one",
        2 => "two",
        3 => "three",
        4 => "four",
        5 => "five",
        6 => "six",
        7 => "seven",
        8 => "eight",
        9 => "nine",
        10 => "ten",
        _ => panic!("Invalid number for text_number {}", val),
    }
    .to_string()
}

// This is mainly useful for writing tests for long strings in code more easily
pub fn standardize_indentation(text: &str) -> String {
    let indentation_pattern = Regex::new(r"(?m)^\s+").unwrap();
    let no_indentation = indentation_pattern.replace_all(text.trim(), "").to_string();
    // It's easier to write the strings in code if we have a preceding line break
    return format!("\n{}", no_indentation);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn standardize_indentation_works() {
        let expected = "
Start with a line break,
continue for any number of lines,
don't     remove extraneous mid-line spacing,
end with no line break";
        assert_eq!(
            expected,
            standardize_indentation(
                "
                    Start with a line break,
                continue for any number of lines,
            don't     remove extraneous mid-line spacing,
        end with no line break
        "
            ),
        );
    }
}
