from cgi_simple import (
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_text_input,
    labeled_number_input,
    li,
    minus,
    number_input,
    ol,
    option,
    p,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    text_input,
    ul,
    underlabel,
)

from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    ATTRIBUTES,
    ROLL20_CALC,
    SUBSKILLS,
)
from second_page import equation_misc_repeat
import re


def create_page(destination):
    return flex_col(
        {"class": "page creation-page"},
        [
            """
                This tab is used to create your character.
                It's the first place you should start using the sheet.
            """,
            creation_guidance(),
        ],
    )


def creation_guidance():
    return flex_col(
        {"class": "creation-guidance"},
        [
            creation_step(
                "Concept",
                """
                    Choose a short phrase that describes the core concept of your character.
                """,
                text_input({"name": "concept"}),
            ),
            creation_step(
                "Goals",
                """
                    Choose your character's motivations and goals.
                """,
                textarea({"name": "motivation_and_goals"}),
            ),
            creation_step(
                "Alignment",
                """
                    Choose your character's alignment.
                """,
                text_input({"name": "alignment"}),
            ),
            creation_step(
                "Species",
                """
                    Choose your character's species.
                    Any numeric effects from your species are calculated automatically, unless you choose a custom species.
                    You should add any non-numeric special abilities from your species on the <b>Abilities</b> tab.
                """,
                select(
                    {"class": "species", "name": "species"},
                    [
                        option({"value": "human"}, "Human"),
                        option({"value": "dwarf"}, "Dwarf"),
                        option({"value": "elf"}, "Elf"),
                        option({"value": "gnome"}, "Gnome"),
                        option({"value": "half-elf"}, "Half-elf"),
                        option({"value": "half-orc"}, "Half-orc"),
                        option({"value": "halfling"}, "Halfling"),
                        option({"value": "custom"}, "Custom"),
                    ],
                ),
            ),
            creation_step(
                "Languages",
                """
                    Choose the languages your character can speak.
                """,
                text_input({"name": "languages"}),
            ),
            creation_step(
                "Attributes",
                """
                    Choose your character's attributes, not counting any species modifiers.
                    If you have special abilities that modify your attributes, you can add those on the <b>Modifiers</b> tab.
                """,
                flex_row(
                    {"class": "attributes"},
                    [
                        labeled_number_input(
                            "Str", input_attributes={"name": f"strength_points"}
                        ),
                        labeled_number_input(
                            "Dex", input_attributes={"name": f"dexterity_points"}
                        ),
                        labeled_number_input(
                            "Con", input_attributes={"name": f"constitution_points"}
                        ),
                        labeled_number_input(
                            "Int", input_attributes={"name": f"intelligence_points"}
                        ),
                        labeled_number_input(
                            "Per", input_attributes={"name": f"perception_points"}
                        ),
                        labeled_number_input(
                            "Wil", input_attributes={"name": f"willpower_points"}
                        ),
                    ],
                ),
            ),
            creation_step(
                "Base class",
                """
                    Choose your character's base class.
                    This automatically modifies all of the appropriate statistics, so you shouldn't need to add any custom modifiers to represent your base class.
                """,
                select(
                    {"class": "base-class", "name": "base_class"},
                    [
                        option({"value": "barbarian"}, "Barbarian"),
                        option({"value": "cleric"}, "Cleric"),
                        option({"value": "druid"}, "Druid"),
                        option({"value": "fighter"}, "Fighter"),
                        option({"value": "monk"}, "Monk"),
                        option({"value": "paladin"}, "Paladin"),
                        option({"value": "ranger"}, "Ranger"),
                        option({"value": "rogue"}, "Rogue"),
                        option({"value": "sorcerer"}, "Sorcerer"),
                        option({"value": "warlock"}, "Warlock"),
                        option({"value": "wizard"}, "Wizard"),
                        option({"value": "dragon"}, "(Dragon)"),
                        option({"value": "oozeborn"}, "(Oozeborn)"),
                    ],
                ),
            ),
            creation_step(
                "Archetypes",
                """
                    Choose your character's class archetypes.
                    You will need to add custom modifiers in the <b>Modifiers</b> tab to reflect any numeric effects of your class archetypes.
                    In addition, if your archetypes give you special abilities, you should add those in the <b>Abilities</b> tab.
                """,
                flex_col(
                    [
                        flex_row(
                            {"class": "archetype"},
                            [
                                labeled_text_input(
                                    "Name",
                                    {"class": "archetype-name"},
                                    {"name": f"archetype_name_{i}"},
                                ),
                                underlabel(
                                    "Rank",
                                    number_input({"name": f"archetype_rank_{i}"}),
                                ),
                            ],
                        )
                        for i in range(3)
                    ]
                ),
            ),
            creation_step(
                "Weapons",
                """
                    Choose or record the weapon groups your character can use.
                """,
                text_input({"name": "weapon_groups"}),
            ),
            insight_points_step(),
            skills_step(),
            creation_step(
                "Items",
                """
                    Choose your character's starting items.
                    Over time, you'll find many more items, so you should go to the <b>Items</b> tab to record your choices.
                """,
                "",
            ),
            creation_step(
                "Personality",
                """
                    Describe your character's core personality.
                    This can be vague, and it can change over time, but it can be useful to record something as a guide.
                """,
                textarea({"class": "personality"}),
            ),
            creation_step(
                "Background",
                """
                    Describe your character's background.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "background"}),
            ),
            creation_step(
                "Appearance",
                """
                    Describe your character's appearance.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "appearance"}),
            ),
            creation_step(
                "Name",
                """
                    Choose your character's name.
                """,
                text_input({"name": "character_name"}),
            ),
            creation_step(
                "Finishing up",
                """
                    Set your level to 1 at the top of the <b>Core</b> tab, since you're done now!
                    You can also choose a chat color for your abilities there, which will help you stand out from other characters in the game.
                """,
                "",
            ),
            feats_step(),
        ],
    )


def creation_step(header, explanation, mechanics):
    return flex_row(
        {"class": "creation-step"},
        [
            div({"class": "explanation"}, f"<b>{header}:</b> " + explanation),
            div({"class": "mechanics"}, mechanics),
        ],
    )


def insight_points_step():
    max_insight_points = text_input(
        {"class": "inline-number", "readonly": True, "name": "insight_points"}
    )

    return creation_step(
        "Insight points",
        f"""
            Spend your character's insight points.
            You can use this section to track what you spent insight points on.
            The full effects of abilities that you gain should be tracked elsewhere - usually, in the <b>Abilities</b> tab.
            <br>
            As a reminder, you have {max_insight_points} total insight points.
        """,
        textarea({"name": "insight_points_tracking"}),
    )


def skills_step():
    class_skills = text_input(
        {"class": "inline-number", "readonly": True, "name": "class_skill_count"}
    )
    other_trainable_skills = text_input(
        {"class": "inline-number", "readonly": True, "name": "nonclass_skill_count"}
    )

    return creation_step(
        "Skills",
        f"""
            Assign your character's trained skills.
            <br>
            As a reminder, you should train {class_skills} class skills and {other_trainable_skills} other skills.
        """,
        fieldset(
            {"class": "repeating_trainedskills"},
            trained_skill(),
        ),
    )


def trained_skill():
    return select(
        {"class": "trained-skill", "name": "trained_skill"},
        [
            option({"value": "Awareness"}, "Awareness"),
            option({"value": "Balance"}, "Balance"),
            option({"value": "Climb"}, "Climb"),
            option({"value": "Craft (alchemy)"}, "Craft (alchemy)"),
            option({"value": "Craft (bone)"}, "Craft (bone)"),
            option({"value": "Craft (ceramics)"}, "Craft (ceramics)"),
            option({"value": "Craft (jewelry)"}, "Craft (jewelry)"),
            option({"value": "Craft (leather)"}, "Craft (leather)"),
            option({"value": "Craft (manuscripts)"}, "Craft (manuscripts)"),
            option({"value": "Craft (metal)"}, "Craft (metal)"),
            option({"value": "Craft (poison)"}, "Craft (poison)"),
            option({"value": "Craft (stone)"}, "Craft (stone)"),
            option({"value": "Craft (textiles)"}, "Craft (textiles)"),
            option({"value": "Craft (traps)"}, "Craft (traps)"),
            option({"value": "Craft (wood)"}, "Craft (wood)"),
            option({"value": "Creature Handling"}, "Creature Handling"),
            option({"value": "Deception"}, "Deception"),
            option({"value": "Deduction"}, "Deduction"),
            option({"value": "Devices"}, "Devices"),
            option({"value": "Disguise"}, "Disguise"),
            option({"value": "Endurance"}, "Endurance"),
            option({"value": "Flexibility"}, "Flexibility"),
            option({"value": "Intimidate"}, "Intimidate"),
            option({"value": "Jump"}, "Jump"),
            option({"value": "Knowledge (arcana)"}, "Knowledge (arcana)"),
            option({"value": "Knowledge (dungeoneering)"}, "Knowledge (dungeoneering)"),
            option({"value": "Knowledge (engineering)"}, "Knowledge (engineering)"),
            option({"value": "Knowledge (items)"}, "Knowledge (items)"),
            option({"value": "Knowledge (local)"}, "Knowledge (local)"),
            option({"value": "Knowledge (nature)"}, "Knowledge (nature)"),
            option({"value": "Knowledge (planes)"}, "Knowledge (planes)"),
            option({"value": "Knowledge (religion)"}, "Knowledge (religion)"),
            option({"value": "Linguistics"}, "Linguistics"),
            option({"value": "Medicine"}, "Medicine"),
            option({"value": "Perform"}, "Perform"),
            option({"value": "Persuasion"}, "Persuasion"),
            option({"value": "Profession"}, "Profession"),
            option({"value": "Ride"}, "Ride"),
            option({"value": "Sleight of Hand"}, "Sleight of Hand"),
            option({"value": "Social Insight"}, "Social Insight"),
            option({"value": "Stealth"}, "Stealth"),
            option({"value": "Survival"}, "Survival"),
            option({"value": "Swim"}, "Swim"),
        ],
    )


def feats_step():
    return creation_step(
        "Feats",
        """
            If you're playing with feats, you can record your feats here.
            You'll need to record any effects of those feats manually as modifiers or abilities.
        """,
        fieldset(
            {"class": "repeating_feats"},
            labeled_text_input("Feat name", input_attributes={"name": "feat_name"}),
        ),
    )
