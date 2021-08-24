use crate::modules::Module;

pub fn generate_module() -> Module {
    return Module {
        introduction: r"
            This module is designed for level 1 characters.
            It starts with the characters waking up in a strange room that they've never seen before.
            This makes it a good module to start a campaign with, since it doesn't require any past context, and the players are expected to be a little disoriented.
            Players often take a session or two to get used to new characters and figure out how to play them, so it's an easy fit.
        ".to_string(),
        name: "The House of Liberation".to_string(),
    }
}
