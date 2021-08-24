use crate::modules::Module;

pub fn generate_module() -> Module {
    return Module {
        introduction: r"
            This module is designed for level 1 characters.
            It starts with the characters waking up in a strange room that they've never seen before.
            This makes it a good module to start a campaign with, since it doesn't require any past context, and the party is expected to be a little disoriented.
            Players often take a session or two to get used to new characters and figure out how to play them, so it's an easy fit.

            If this module is being run as part of an existing campaign, the party should spend some time at an inn.
            It doesn't matter too much whether it's an inn in a city or just a hostel along the side of a road, but the cheaper and more disreputable, the better.
            The inn has a disreputable-looking human staying at it who is hanging out in the tavern area starting conversations with people to ask about their past.
            A \glossterm{difficulty rating} 10 Social Insight check reveals that he is explicitly trying to learn whether people have magical abilities.
        ".to_string(),
        name: "The House of Liberation".to_string(),
        description: r"
            \subsection{Setup}
            Unlike most modules, the players don't make any conscious choice to enter this module.
            The first major event that happens involves the players waking up in a dungeon cell.
        ".to_string(),
    }
}
