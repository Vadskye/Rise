use crate::equipment::{Implement, ItemUpgrade, StandardItem};
use crate::equipment::Implement::Staff;

pub fn staffs() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Staff(StandardItem {
        name: String::from("Interplanar Staff"),
        rank: 4,
        short_description: String::from(r"Aids travel with \ritual{plane shift}"),
        description: String::from(r"
            When you perform the \ritual{plane shift} ritual, this staff provides all \glossterm{fatigue levels} required.
            It does not grant you the ability to perform the \ritual{plane shift} ritual if you could not already.
        "),
        ..Implement::default()
    }));

    implements
}
