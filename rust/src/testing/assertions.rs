use std::cmp::max;

pub fn assert_multiline_eq(actual: String, expected: &str) {
    let left_split = actual.trim().split('\n').collect::<Vec<&str>>();
    let right_split = expected.trim().split('\n').collect::<Vec<&str>>();
    for i in 0..max(left_split.len(), right_split.len()) {
        if i == left_split.len() {
            panic!(
                "actual is missing line {}; expected has `{}`\n{}\n",
                i, right_split[i], expected,
            );
        } else if i == right_split.len() {
            panic!(
                "expected is missing line {}; expected has `{}`\n{}\n",
                i, left_split[i], expected
            );
        } else {
            assert_eq!(left_split[i], right_split[i], "\n{}\n", expected);
        }
    }
}
