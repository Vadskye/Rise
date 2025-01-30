use num_format::{Locale, ToFormattedString};

pub fn item_price(rank: i32) -> String {
    let mut value = match rank {
        -1 => 5,
        0 => 10,
        1 => 40,
        2 => 200,
        3 => 1000,
        4 => 5000,
        5 => 25000,
        6 => 125000,
        7 => 625000,
        8 => 3125000,
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
