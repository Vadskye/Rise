use rise::monsters::{challenge_rating, Monster};

fn main() {
    let standard_monster =
        Monster::standard_monster(challenge_rating::ChallengeRating::Two, 3, None, None);
    println!("standard monster {}", standard_monster.to_section(None));
}
