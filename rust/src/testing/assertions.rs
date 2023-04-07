use std::cmp::max;

pub fn assert_multiline_eq(left: &str, right: String) {
    let left_split = left.split("\n").collect::<Vec<&str>>();
    let right_split = right.split("\n").collect::<Vec<&str>>();
    for i in 0..max(left_split.len(), right_split.len()) {
        if i == left_split.len() {
            panic!(
                "Left is missing line {}; right has `{}`\n{}\n",
                i, right_split[i], right,
            );
        } else if i == right_split.len() {
            panic!(
                "Right is missing line {}; right has `{}`\n{}\n",
                i, left_split[i], right
            );
        } else {
            assert_eq!(left_split[i], right_split[i], "\n{}\n", right);
        }
    }
}
