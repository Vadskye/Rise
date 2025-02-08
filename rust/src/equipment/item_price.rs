use num_format::{Locale, ToFormattedString};

pub fn item_price(rank: i32) -> String {
    let value = match rank {
        -1 => 5,
        0 => 1,
        1 => 4,
        2 => 20,
        3 => 100,
        4 => 500,
        5 => 2500,
        6 => 12500,
        7 => 62500,
        8 => 312500,
        _ => panic!("Unrecognized item rank {}", rank),
    };
    value.to_formatted_string(&Locale::en)
}

pub fn rank_and_price_text(rank: i32) -> String {
    if rank < 0 {
        return format!("\\tdash ({price} sp)", price = item_price(rank));
    }
    format!(
        "{rank} ({price} gp)",
        rank = rank,
        price = item_price(rank)
    )
}
