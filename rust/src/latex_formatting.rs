use regex::Regex;
use std::fmt::Display;

pub fn remove_indentation(text: &str) -> String {
    text.lines()
        .map(|line| line.trim_start())
        .collect::<Vec<_>>()
        .join("\n")
}

pub fn latexify(text: String) -> String {
    let mut short_text = text.clone().trim().to_string();
    short_text.truncate(50);
    if text.contains('\t') {
        eprintln!("Problem latexifying text: contains a tab ({})", short_text)
    }
    if text.contains('\r') {
        eprintln!(
            "Problem latexifying text: contains a carriage return ({})",
            short_text
        )
    }

    // TODO: verify that this actually works
    let pcref = Regex::new(r"[^\\]pcref").unwrap();
    if pcref.is_match(&text) {
        eprintln!(
            "Problem latexifying text: contains a pcref ({})",
            short_text
        )
    }

    let midline_double_backslash = Regex::new(r"\\\\.").unwrap();
    if midline_double_backslash.is_match(&text) {
        eprintln!(
            r"Problem latexifying text: contains a midline \\ ({})",
            text.trim()
        )
    }

    let text = text
        .replace('<', "{")
        .replace('>', "}")
        .replace(" + ", " \\add ")
        // TODO: this is an incredibly stupid hack
        .replace("}{\\lcol}", ">{\\lcol}");

    let plus = Regex::new(r"\+(\d)").unwrap();
    let text = plus.replace_all(text.as_str(), r"\plus$1");

    let sub = Regex::new(r" - (\d)").unwrap();
    let text = sub.replace_all(text.as_ref(), r" \sub $1");

    let minus = Regex::new(r" -(\d)").unwrap();
    let text = minus.replace_all(text.as_ref(), r" \minus$1");

    text.to_string()
}

pub fn join_formattable_list<T: Display>(strings: &Vec<T>) -> Option<String> {
    let strings: Vec<String> = strings.iter().map(|c| format!("{}", c)).collect();
    join_string_list(&strings)
}

pub fn join_string_list(strings: &Vec<String>) -> Option<String> {
    join_string_list_custom(strings, "and")
}

pub fn join_string_list_custom(strings: &Vec<String>, conjunction: &str) -> Option<String> {
    let strings: Vec<&str> = strings.iter().map(|c| c.as_str()).collect();
    join_str_list_custom(&strings, conjunction)
}

pub fn join_str_list_custom(strings: &Vec<&str>, conjunction: &str) -> Option<String> {
    if strings.is_empty() {
        None
    } else if strings.len() == 1 {
        return Some(strings[0].to_string());
    } else if strings.len() == 2 {
        return Some(format!("{} {} {}", strings[0], conjunction, strings[1]));
    } else {
        return Some(format!(
            "{}, {} {}",
            strings[..strings.len() - 1].join(", "),
            conjunction,
            strings[strings.len() - 1]
        ));
    }
}

pub fn join_str_list(strings: &Vec<&str>) -> Option<String> {
    join_str_list_custom(strings, "and")
}

pub fn uppercase_first_letter(text: &str) -> String {
    if let Some(c) = text.get(0..1) {
        return c.to_ascii_uppercase() + if let Some(s) = text.get(1..) { s } else { "" };
    } else {
        text.to_string()
    }
}

pub fn modifier(val: i32) -> String {
    if val >= 0 {
        format!("+{}", val)
    } else {
        format!("{}", val)
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

// This is mainly useful for writing tests for long strings in code more easily.
// It doesn't faithfully keep original surrounding whitespace - instead, it always starts the
// final string with a line break and ends with no line break.
pub fn non_indented_block(text: &str) -> String {
    let indentation_pattern = Regex::new(r"(?m)^\s+").unwrap();
    let no_indentation = indentation_pattern.replace_all(text.trim(), "").to_string();
    // It's easier to write the strings in code if we have a preceding line break
    format!("\n{}", no_indentation)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn non_indented_block_works() {
        let expected = "
Start with a line break,
continue for any number of lines,
don't     remove extraneous mid-line spacing,
end with no line break";
        assert_eq!(
            non_indented_block(
                "
                    Start with a line break,
                continue for any number of lines,
            don't     remove extraneous mid-line spacing,
        end with no line break"
            ),
            expected,
        );
    }

    #[test]
    fn remove_indentation_works() {
        let expected = "
Start with a line break,
continue for any number of lines,
don't     remove extraneous mid-line spacing,
end with a line break
";
        assert_eq!(
            remove_indentation(
                "
                    Start with a line break,
                continue for any number of lines,
            don't     remove extraneous mid-line spacing,
        end with a line break
        "
            ),
            expected,
        );
    }
}
