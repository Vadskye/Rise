use crate::modules::Module;
use crate::monsters::monster_entry::latex_by_name;

pub fn generate_module() -> Module {
    return Module {
        introduction: r"
            This module is designed for level 1 characters, and it's a good module to start a campaign with.
            The characters start out trapped together in the middle of nowhere with no idea how they got there.
            This makes it easy to encourage teamwork and makes it easier to justify any weird combination of character concepts.
            Players often take a session or two to get used to new characters and figure out how to play them, and the characters are expected to be a bit disoriented in-universe, so it's an easy fit.

            Unlike most modules, the players don't make any conscious choice to enter this module.
            If this module is being run as part of an existing campaign, the party should spend some time at an inn.
            It doesn't matter too much whether it's an inn in a city or just a hostel along the side of a road, but the cheaper and more disreputable, the better.
            If you're starting a campaign with this module, the party might just be thrown together randomly instead of already travelling together as a group.
            In that case, the party might have originally stayed at a wide variety of different inns.
            Regardless, they'll all end up in a single holding cell together when the adventure properly starts.

            Each inn has a sketchy-looking human staying at it who is hanging out in the tavern area starting conversations with people to ask about their past.
            A \glossterm{difficulty value} 10 Social Insight check reveals that he is explicitly trying to learn whether people have magical abilities.
            While the party is asleep, he will knock them unconscious and kidnap them without their knowledge.
            It's possible to run this as a combat sequence where the expected outcome is defeat.
            However, that is often frustrating, especially as a first encounter with a module, so most groups will probably have more fun if that is skipped.
        ".to_string(),
        name: "The House of Liberation".to_string(),
        description: format!(
"
    \\newpage
    \\section<The Holding Cells>
    The module starts with the party inside of a cell in a dungeon with none of their belongings.
    Usually, they have no memory of how they got there.
    They can make their way out of the cell, retrieve their belongings, and explore the strange dungeon they find themselves in.
    This section ends when the party finally escapes the dungeon.

    \\begin<figure*>[htb!]
    \\includegraphics[width=\\textwidth]<the_holding_cells>
    \\end<figure*>

        \\subsection<The Large Cell>
            \\begin<description>
                The cell is surprisingly large, as if it was designed to hold a large group - or a monster.
                A pair of benches line one wall, and a drainage grate is on the other.
                The only exit seems to be through a large wooden double door to the north.
                Dim, flickering light filters into the room through a small barred window in each door.
                Somewhere around a corner to the right, you can hear sounds of humanoid voices enjoying a raucous meal.
            \\end<description>
            Under normal circumstances, the party simply wakes up in this room with no equipment or specific memory of how they got here.
            They still have the clothes they were wearing, but none of their bags or anything that looked obviously valuable or dangerous.
            The last thing they would remember is going to sleep at an inn.
            If someone looks out through the barred window, they can see Room 2.

            The door can be forced open with a \\glossterm<difficulty value> 15 Strength check.
            If a character has at least 1 Strength, they can use one of the benches as an improvised battering ram to gain a +4 bonus to this check.
            Attempting to break open the door is very loud, and is likely to attract attention from the guards in Room 2.

            Alternately, the door hinges can be disabled with a \\glossterm<difficulty value> 13 Devices check.
            If the party had their thieves' tools taken from them, they take a -5 penalty to this check, making it almost certainly impossible.
            A particularly well-prepared character may have a lockpick hidden in their boot or some other similar device, which would allow them to make the check without a penalty.
            However, they must make a \\glossterm<difficulty value> 10 Sleight of Hand check to have successfully hid it from the people who searched the party.

            The grate in the room can be opened with a \\glossterm<difficulty value> 10 Strength check.
            The pipe below the grate is two and a half feet in diameter, so it can be travelled through.
            However, it only opens into an enclosed ten-foot square room that holds waste, making it useless as an escape path.

            There is a secret door in the bottom left corner of the room that can be discovered with a \\glossterm<difficulty value> 15 Awareness check.
            The party is likely to find it if they search the room carefully with the \\ability<search> ability.
            The passage leads to Room 7, which has a matching secret door.
            Before opening the door into Room 7, the party will be able to hear a deep, gutteral snarling from a Large creature and occasional banging on walls, which may discourage them from venturing too far in that direction.

        \\subsection<The North Passage>
            \\begin<description>
                The area outside the cell is lit by flickering torches along the walls that fill the air with a thin, greasy smoke.
                A pair of skeleton guards mindlessly patrol the hallway.
                Each guard wields an old, battered scimitar and shield.
            \\end<description>

            {skeleton_guard}

            The skeleton guards respond to any noise or disruption by banging insistently on the door of the large cell with their scimitars before returning to their simple patrol pattern.
            If the party steps outside of their cell, the skeletons will attack.
            If the party moves back into the cell and closes the door to block line of sight, the skeletons lack the intelligence to remember that the party previously left, and will simply resume their patrol.

            If the party fights the skeletons in the hall, the human guards in Room 4 are likely to hear them.
            Hearing the combat through the door has a difficulty value of 5, and the guards have a +0 bonus to Awareness.
            Roll Awareness once for the guards during each round of combat.
            Success means that they hear something odd and will send two guards to investigate.
            If the party lures the skeletons into their cell to fight them, the difficulty value for the guards to hear the combat increases to 10.
",
skeleton_guard=latex_by_name("Skeleton Guard"),
        ),
    }
}
