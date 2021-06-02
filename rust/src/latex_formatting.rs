use regex::Regex;

pub fn latexify(text: String) -> String {
    let text = text
        .replace("<", "{")
        .replace(">", "}")
        .replace(" + ", "\\add")
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

pub fn modifier(val: i8) -> String {
    if val >= 0 {
        return format!("+{}", val)
    } else {
        return format!("{}", val);
    }
}
