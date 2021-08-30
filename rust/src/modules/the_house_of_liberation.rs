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
            A DV 10 Social Insight check reveals that he is explicitly trying to learn whether people have magical abilities.
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

    In general, if the party is defeated in battle in this area, they will be returned to their cell by any surviving guards.
    The guards have strict instructions to keep the prisoners alive, and will even attempt to save dying party members, though their +0 Medicine check may not let them save the party from especially dangerous vital wounds.
    They will attempt to fix any obvious explanation for the party's escape, but won't care enough to do a detailed sweep to address the general issues that make their cell escapable.

    \\begin<figure*>[htb!]
    \\includegraphics[width=\\textwidth]<the_holding_cells>
    \\end<figure*>

        \\subsection<The Large Cell>
            \\begin<description>
                The cell is surprisingly large, as if it was designed to hold a large group - or a monster.
                A pair of benches line one wall, and a drainage grate is on the other.
                The only exit seems to be through a large wooden double door to the north.
                Dim, flickering light filters into the room through a small barred window in each door.
                Somewhere around a corner to the right, you can hear sounds of humanoid voices loudly enjoying a raucous meal.
            \\end<description>
            Under normal circumstances, the party simply wakes up in this room with no equipment or specific memory of how they got here.
            They still have the clothes they were wearing, but none of their bags or anything that looked obviously valuable or dangerous.
            The last thing they would remember is going to sleep at an inn.
            If someone looks out through the barred window, they can see Room 2.

            The party can attempt to listen to the distant conversation with a DV 10 Awareness check.
            Most of what they would hear is meaningless mealtime banter from callous mercenaries.
            A DV 10 Social Insight check reveals that it all seems a bit exaggerated - the guards are nervous and trying not to show it.
            If the party listens for a few minutes, they would hear the following exchange.
            \\begin<description>
                \\parheadindent<Guard 1> Ey, what're we gonna do about all these people we've got? There's no more room!
                \\parhead<Guard 2> Eh, Libby'll get back and fix that soon enough. We'll have a clean house before you know it.
                \\parhead<Guard 3> Well, I wouldn't say \\textit<clean> exactly...
                \\parhead<Guard 2> Ahaha!
            \\end<description>
            No other specific conversations would be interesting before the meal ends in half an hour.

            The door can be forced open with a DV 15 Strength check.
            If a character has at least 1 Strength, they can use one of the benches as an improvised battering ram to gain a +2 bonus to this check.
            A DV 10 Awareness check reveals that the door was recently patched to cover structural damage, and hitting the door in the same point should make it easier to break down.
            Taking advantage of the weak point grants a +4 bonus to this check.

            Attempting to break open the door is loud, and may attract attention from the guards in Room 2.
            The guards have a +0 bonus to Awareness, and hearing the attempts at that distance has a DV of 5.
            The party can accept a -2 penalty to the Strength check to increase the DV of this Awareness check by 2, but the Stealth skill doesn't help.
            Roll Awareness once for the guards during each round that the party spends attempting to break down the door.
            Success means that they hear something odd and will send two guards to investigate.

            Alternately, the door hinges can be disabled with a DV 13 Devices check.
            If the party doesn't have any thieves' tools since their gear was taken, they take a -5 penalty to this check, making it almost certainly impossible.
            A particularly well-prepared character may have a lockpick hidden in their boot or some other similar device, which would allow them to make the check without a penalty.
            However, they must make a DV 10 Sleight of Hand check to have successfully hid it from the people who searched the party.

            The grate in the room can be opened with a DV 10 Strength check.
            The pipe below the grate is two and a half feet in diameter, so it can be travelled through.
            However, it only opens into an enclosed ten-foot square room that holds waste, making it useless as an escape path.

            There is a secret door in the bottom left corner of the room that can be discovered with a DV 15 Awareness check.
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
            If the party steps outside of their cell, the skeletons will attack the closest creature.
            They have no tactical skill, and will continue attacking their current target until it appears to be unconscious before moving on to the next target.
            If the party moves back into the cell and closes the door to block line of sight, the skeletons lack the intelligence to remember that the party previously left, and will simply resume their patrol.

            If the party fights the skeletons in the hall, the human guards in Room 4 are likely to hear them.
            The guards have a +0 bonus to Awareness, and hearing the combat has a DV of 5.
            Roll Awareness once for the guards during each round of combat.
            Success means that they hear something odd and will send two guards to investigate.
            If the party lures the skeletons into Room 1 for the fight, the DV for the guards to hear the combat increases to 10.

            In the unlikely event that the skeletons defeat the party, they leave their unconscious or dead bodies in the hall and return to patrolling.
            After the meal is over, a guard from Room 4 will discover that the prisoners partially escaped and put them back in their cell.

            There is a ladder in the northwest corner of the room.
            It leads to a closed trapdoor.
            The closed trapdoor has a keyhole and is tightly sealed.
            A DV 20 Strength check or a DV 25 Devices check can open it, which is almost certainly impossible for the party.
            A DV 8 Spellsense check reveals that it is magically sealed.
            Critical success (DV 18) reveals that it was sealed with the \\ritual<mystic lock> ritual, making it effectively impossible to open without the magic key.

        \\subsection<The Kitchen>
            \\begin<description>
                This room is filled with the smell of cooking meat and old vegetables.
                Storage chests and cooking implements line the walls, illuminated by a warm fire.
                There's a massive orc in the room cooking with a furious intensity.
                Her back is turned to the door.
            \\end<description>

            {orc_chef}

            The orc chef has a -2 Awareness modifier because she is distracted by cooking, making her easy to sneak up on.
            If she notices the party, she will immediately attack.
            During battle, she taunts the party by telling them that escaped prisoners make good meat.
            She prioritizes the weakest targets she can reach until they fall unconscious.
            If she drops below half her maximum hit points, she seems happy to have died in battle, and makes no attempt to call for backup.
            Instead, she asks the party to cook and eat her once she is dead.
            If she defeats the party, she wrestles with her desire to kill and eat them, but eventually goes to find the guards, grumbling about how the guards would figure out what happened if she did what she wanted.

            Most of the storage chests in this room contain food, pots, pans, and various other cooking implements.
            One of the chests near the north of the room contains all of the party's equipment, as well as the following additional items:
            \\begin<itemize>
                \\item Three sets of body armor with signs of battle damage: breastplate, hide, and a chain shirt
                \\item Five weapons: two smallswords, one longbow (with arrows), one warhammer, and a dagger
                \\item One standard shield
                \\item Three standard adventuring kits, with some of the rations eaten
                \\item One sapphire necklace (worth 10 gp)
                \\item One silver ring (worth 2 gp) with the Dwarven runes for ``Ironbeard'' engraved on the inside
            \\end<itemize>

            There is a secret door hidden on the east wall that leads to Room 5.
            The party can notice it with a DV 18 Awareness check.

",
skeleton_guard=latex_by_name("Skeleton Guard"),
orc_chef=latex_by_name("Orc Chef"),
        ),
    }
}
