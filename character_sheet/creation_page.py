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
    underlabeled_checkbox,
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
            """,
            creation_guidance(),
            subskill_rowids(),
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
                "Species",
                """
                    Choose your character's species.
                    You should add any numerical changes, such as attribute modifiers, in the <b>Modifiers</b> tab.
                    Non-numeric abilities, such as darkvision, should go in the <b>Abilities</b> tab if you want to be able to push a button to reference them.
                    If you don't care about seeing the abilities that often, you can record them under "Passive Abilities" in the <b>Identity</b> tab.
                    Important defensive abilities that you'll want to reference when you're being attacked can go in the large free text area next to your Defenses in the <b>Core</b> tab.
                    <br>
                    You should use these same four locations whenever you gain new special abilities from any source, not just from your species.
                """,
                select(
                    {"class": "species", "name": "species"},
                    [
                        option({"value": ""}, ""),
                        option({"value": "human"}, "Human"),
                        option({"value": "dwarf"}, "Dwarf"),
                        option({"value": "elf"}, "Elf"),
                        option({"value": "gnome"}, "Gnome"),
                        option({"value": "half-elf"}, "Half-elf"),
                        option({"value": "half-orc"}, "Half-orc"),
                        option({"value": "halfling"}, "Halfling"),
                        option({"value": "custom"}, "Custom"),
                        option({"value": "animal hybrid"}, "(Animal Hybrid)"),
                        option({"value": "changeling"}, "(Changeling)"),
                        option({"value": "dragon"}, "(Dragon)"),
                        option({"value": "drow"}, "(Drow)"),
                        option({"value": "dryaidi"}, "(Dryaidi)"),
                        option({"value": "eladrin"}, "(Eladrin)"),
                        option({"value": "orc"}, "(Orc)"),
                        option({"value": "oozeborn"}, "(Oozeborn)"),
                        option({"value": "tiefling"}, "(Tiefling)"),
                    ],
                ),
            ),
            creation_step(
                "Size",
                """
                    Set your character's size.
                    Normally, your size is Medium.
                    Some special abilities can increase your size.
                    Changing your size here automatically updates your base speed, Reflex defense, and Stealth skill.
                """,
                select(
                    {"class": "size", "name": "size"},
                    [
                        option({"value": ""}, ""),
                        option({"value": "fine"}, "Fine"),
                        option({"value": "diminuitive"}, "Diminuitive"),
                        option({"value": "tiny"}, "Tiny"),
                        option({"value": "small"}, "Small"),
                        option({"value": "medium"}, "Medium"),
                        option({"value": "large"}, "Large"),
                        option({"value": "huge"}, "Huge"),
                        option({"value": "gargantuan"}, "Gargantuan"),
                        option({"value": "colossal"}, "Colossal"),
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
                    As you level up, your attributes increase.
                    You can add those improvements in the second row.
                    If you have special abilities that modify your attributes, you can add those on the <b>Modifiers</b> tab.
                """,
                [
                    flex_row(
                        {"class": "attributes"},
                        [
                            labeled_number_input(
                                "Str", input_attributes={"name": f"strength_at_creation"}
                            ),
                            labeled_number_input(
                                "Dex", input_attributes={"name": f"dexterity_at_creation"}
                            ),
                            labeled_number_input(
                                "Con",
                                input_attributes={"name": f"constitution_at_creation"},
                            ),
                            labeled_number_input(
                                "Int",
                                input_attributes={"name": f"intelligence_at_creation"},
                            ),
                            labeled_number_input(
                                "Per", input_attributes={"name": f"perception_at_creation"}
                            ),
                            labeled_number_input(
                                "Wil", input_attributes={"name": f"willpower_at_creation"}
                            ),
                        ],
                    ),
                    flex_row(
                        {"class": "attribute-scaling"},
                        [
                            labeled_number_input(
                                "+Str", input_attributes={"name": f"strength_level_scaling"}
                            ),
                            labeled_number_input(
                                "+Dex", input_attributes={"name": f"dexterity_level_scaling"}
                            ),
                            labeled_number_input(
                                "+Con",
                                input_attributes={"name": f"constitution_level_scaling"},
                            ),
                            labeled_number_input(
                                "+Int",
                                input_attributes={"name": f"intelligence_level_scaling"},
                            ),
                            labeled_number_input(
                                "+Per", input_attributes={"name": f"perception_level_scaling"}
                            ),
                            labeled_number_input(
                                "+Wil", input_attributes={"name": f"willpower_level_scaling"}
                            ),
                        ],
                    ),
                ],
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
                        option({"value": ""}, ""),
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
                        option({"value": "harpy"}, "(Harpy)"),
                        option({"value": "oozeborn"}, "(Oozeborn)"),
                        option({"value": "brute"}, "(Monster - Brute)"),
                        option({"value": "leader"}, "(Monster - Leader)"),
                        option({"value": "mystic"}, "(Monster - Mystic)"),
                        option({"value": "skirmisher"}, "(Monster - Skirmisher)"),
                        option({"value": "sniper"}, "(Monster - Sniper)"),
                        option({"value": "warrior"}, "(Monster - Warrior)"),
                    ],
                ),
            ),
            creation_step(
                "Archetypes",
                """
                    Choose your character's first class archetype.
                    As you gain new class archetypes, you should record them here.
                    You will need to add custom modifiers in the <b>Modifiers</b> tab to reflect any numeric effects of your class archetypes.
                    If your archetypes give you special abilities, you should add those in the <b>Abilities</b> tab.
                    <br>
                    If you have a specific number of abilities known, such as spells or maneuvers, you can record that number as a modifier in the <b>Modifiers</b> tab.
                    That will cause you to see that ability listed in "Abilities Known" section of the <b>Identity</b> tab so you can more easily remember how many you are supposed to know.
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
                textarea({"class": "personality", "name": "personality"}),
            ),
            creation_step(
                "Background",
                """
                    Describe your character's background.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "background", "name": "background"}),
            ),
            creation_step(
                "Appearance",
                """
                    Describe your character's appearance.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "appearance", "name": "appearance"}),
            ),
            creation_step(
                "Alignment",
                """
                    Choose your character's alignment: good or evil, and lawful or chaotic.
                    You can decide to stay neutral along either or both alignment dimensions.
                """,
                textarea({"class": "alignment", "name": "alignment"}),
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
            If you spend insight points to learn an additional standard special ability, such as a spell or maneuver, you can record that as a modifer in the <b>Modifiers</b> tab.
            That will keep the number listed in the "Abilities Known" section of the <b>Identity</b> tab accurate for you.
            <br>
            The specific effects of abilities you learn with insight points can be tracked in the <b>Abilities</b> tab if you want to have a button representing the ability, or in the <b>Identity</b> tab if you don't need that.
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
    return flex_row(
        {"class": "skill-row"},
        [
            select(
                {"class": "trained-skill", "name": "trained_skill"},
                [
                    option({"value": ""}, ""),
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
                    option(
                        {"value": "Knowledge (dungeoneering)"},
                        "Knowledge (dungeoneering)",
                    ),
                    option(
                        {"value": "Knowledge (engineering)"}, "Knowledge (engineering)"
                    ),
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
            ),
            text_input(
                {
                    "class": "hidden",
                    "name": "front_rowid",
                    "readonly": True,
                }
            ),
            underlabeled_checkbox(
                "Class?",
                input_attributes={
                    "name": "is_class_skill",
                },
            ),
        ]
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


def subskill_rowids():
    return span(
        {"class": "hidden"},
        [
            text_input({"name": "craft_alchemy_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_bone_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_ceramics_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_jewelry_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_leather_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_manuscripts_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_metal_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_poison_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_stone_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_textiles_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_traps_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_wood_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_untrained_subskill_rowid", "readonly": True}),
            text_input({"name": "knowledge_arcana_subskill_rowid", "readonly": True}),
            text_input(
                {"name": "knowledge_dungeoneering_subskill_rowid", "readonly": True}
            ),
            text_input(
                {"name": "knowledge_engineering_subskill_rowid", "readonly": True}
            ),
            text_input({"name": "knowledge_items_subskill_rowid", "readonly": True}),
            text_input({"name": "knowledge_local_subskill_rowid", "readonly": True}),
            text_input({"name": "knowledge_nature_subskill_rowid", "readonly": True}),
            text_input({"name": "knowledge_planes_subskill_rowid", "readonly": True}),
            text_input({"name": "knowledge_religion_subskill_rowid", "readonly": True}),
            text_input(
                {"name": "knowledge_untrained_subskill_rowid", "readonly": True}
            ),
        ],
    )
