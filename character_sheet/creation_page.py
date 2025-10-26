from cgi_simple import (
    button,
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
import re


def create_page(destination):
    return flex_col(
        {"class": "page creation-page"},
        [
            """
                This tab is used to create your character.
            """,
            creation_guidance(),
            monster_creation(),
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
                False,
            ),
            creation_step(
                "Goals",
                """
                    Choose your character's motivations and goals.
                """,
                textarea({"name": "motivation_and_goals"}),
                False,
            ),
            creation_step(
                "Species",
                """
                    Choose your character's species.
                    This does not automatically update any of your statistics.
                    <br>
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
                        option({"value": "halfling"}, "Halfling"),
                        option({"value": "kobold"}, "Kobold"),
                        option({"value": "mixed"}, "Mixed"),
                        option({"value": "orc"}, "Orc"),
                        option({"value": "custom"}, "Custom"),
                        option({"value": "animal hybrid"}, "(Animal Hybrid)"),
                        option({"value": "automaton"}, "(Automaton)"),
                        option({"value": "awakened animal"}, "(Awakened Animal)"),
                        option({"value": "changeling"}, "(Changeling)"),
                        option({"value": "dragon"}, "(Dragon)"),
                        option({"value": "drow"}, "(Drow)"),
                        option({"value": "dryaidi"}, "(Dryaidi)"),
                        option({"value": "eladrin"}, "(Eladrin)"),
                        option({"value": "harpy"}, "(Harpy)"),
                        option({"value": "incarnation"}, "(Incarnation)"),
                        option({"value": "kit"}, "(Kit)"),
                        option({"value": "naiadi"}, "(Naiadi)"),
                        option({"value": "oozeborn"}, "(Oozeborn)"),
                        option({"value": "sapling"}, "(Sapling)"),
                        option({"value": "tiefling"}, "(Tiefling)"),
                        option({"value": "vampire"}, "(Vampire)"),
                    ],
                ),
                False,
            ),
            creation_step(
                "Size",
                """
                    Set your character's size.
                    Normally, your size is Medium.
                    Some special abilities can increase your size.
                    <br>
                    Changing your size here automatically updates your base speed, Reflex defense, and Stealth skill.
                """,
                select(
                    {"class": "size", "name": "size"},
                    [
                        option({"value": ""}, ""),
                        option({"value": "fine"}, "Fine"),
                        option({"value": "diminutive"}, "Diminutive"),
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
                False,
            ),
            creation_step(
                "Attributes",
                """
                    Choose your character's attributes, not counting any species modifiers.
                    Changing your attributes here automatically updates most things that are affected by those attributes, including skills and defenses.

                    As you level up, your attributes increase.
                    You can add those improvements in the second row.
                    If you have special abilities that modify your attributes, such as from your base class or species, you can add those on the <b>Modifiers</b> tab.
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
                    The sheet automatically calculates all effects of your base class other than attribute changes.
                    You should add a custom modifier on the <b>Modifier</b> tab to represent the attribute changes from your base class.
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
                        option({"value": "votive"}, "Votive"),
                        option({"value": "wizard"}, "Wizard"),
                        option({"value": "hybrid"}, "(Animal Hybrid)"),
                        option({"value": "automaton"}, "(Automaton)"),
                        option({"value": "awakened"}, "(Awakened Animal)"),
                        option({"value": "changeling"}, "(Changeling)"),
                        option({"value": "dragon"}, "(Dragon)"),
                        option({"value": "drow"}, "(Drow)"),
                        option({"value": "dryad"}, "(Dryad)"),
                        option({"value": "eladrin"}, "(Eladrin)"),
                        option({"value": "harpy"}, "(Harpy)"),
                        option({"value": "kit"}, "(Kit)"),
                        option({"value": "naiad"}, "(Naiad)"),
                        option({"value": "oozeborn"}, "(Oozeborn)"),
                        option({"value": "orc"}, "(Orc)"),
                        option({"value": "tiefling"}, "(Tiefling)"),
                        option({"value": "treant"}, "(Treant)"),
                        option({"value": "troll"}, "(Troll)"),
                        option({"value": "vampire"}, "(Vampire)"),
                        option({"value": "brute"}, "(Monster - Brute)"),
                        option({"value": "leader"}, "(Monster - Leader)"),
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
                    <br>
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
                False,
            ),
            insight_points_step(),
            skills_step(),
            creation_step(
                "Equipment Proficiencies",
                """
                    Record the weapon and armor groups your character can use in the <b>Items</b> tab.
                    It automatically calculates proficiencies from your base class.
                """,
                "",
                False,
            ),
            creation_step(
                "Items",
                """
                    Choose your character's starting items.
                    Over time, you'll find many more items, so you should go to the <b>Items</b> tab to record your choices.
                """,
                "",
                False,
            ),
            creation_step(
                "Personality",
                """
                    Describe your character's core personality.
                    This can be vague, and it can change over time, but it can be useful to record something as a guide.
                """,
                textarea({"class": "personality", "name": "personality"}),
                False,
            ),
            creation_step(
                "Background",
                """
                    Describe your character's background.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "background", "name": "background"}),
                False,
            ),
            creation_step(
                "Appearance",
                """
                    Describe your character's appearance.
                    This can be as sparse or extensive as you want; there's no one right way to create a character.
                """,
                textarea({"class": "appearance", "name": "appearance"}),
                False,
            ),
            creation_step(
                "Alignment",
                """
                    Choose your character's alignment: good or evil, and lawful or chaotic.
                    You can decide to stay neutral along either or both alignment dimensions.
                """,
                textarea({"class": "alignment", "name": "alignment"}),
                False,
            ),
            creation_step(
                "Name",
                """
                    Choose your character's name.
                """,
                text_input({"name": "character_name"}),
                False,
            ),
            creation_step(
                "Finishing up",
                """
                    Set your level to 1 at the top of the <b>Core</b> tab, since you're done now!
                    You can also choose a chat color for your abilities there, which will help you stand out from other characters in the game.
                """,
                "",
                False,
            ),
            feats_step(),
        ],
    )


def creation_step(header, explanation, mechanics, enabled_for_monsters=True):
    row = flex_row(
        {"class": "creation-step"},
        [
            div({"class": "explanation"}, f"<b>{header}:</b> " + explanation),
            div({"class": "mechanics"}, mechanics),
        ]
    )
    if enabled_for_monsters:
        return div([row])
    else:
        return div([
            checkbox({
                "class": "hidden is-monster",
                "name": f"is_monster",
                "readonly": True,
                "value": "1",
            }),
            row,
        ])


def insight_points_step():
    max_insight_points = text_input(
        {"class": "inline-number", "readonly": True, "name": "insight_points"}
    )

    return creation_step(
        "Insight points",
        f"""
            Spend your character's insight points.
            You can use this section to track what you spent insight points on.
            You may not have the ability to spend insight points at level 1, depending on your archetype.
            <br>
            If you spend insight points to learn an additional standard special ability, such as a spell or maneuver, you can record that as a modifer in the <b>Modifiers</b> tab.
            That will keep the number listed in the "Abilities Known" section of the <b>Identity</b> tab accurate for you.
            <br>
            The specific effects of abilities you learn with insight points can be tracked in the <b>Abilities</b> tab if you want to have a button representing the ability, or in the <b>Identity</b> tab if you don't need that.
            <br>
            As a reminder, you have {max_insight_points} total insight points.
        """,
        textarea({"name": "insight_points_tracking"}),
        False,
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
                    option({"value": "Craft (leather)"}, "Craft (leather)"),
                    option({"value": "Craft (manuscripts)"}, "Craft (manuscripts)"),
                    option({"value": "Craft (metal)"}, "Craft (metal)"),
                    option({"value": "Craft (poison)"}, "Craft (poison)"),
                    option({"value": "Craft (stone)"}, "Craft (stone)"),
                    option({"value": "Craft (textiles)"}, "Craft (textiles)"),
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
                    option({"value": "Knowledge (souls)"}, "Knowledge (souls)"),
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

def monster_creation():
    return div([
        checkbox({
            "class": "hidden is-monster",
            "name": f"is_monster",
            "readonly": True,
            "value": "1",
        }),
        flex_col(
            {"class": "monster-creation"},
            [
                div({"class": "section-header"}, "Monster Ability Generation"),
                monster_attack(),
                div({"class": "explanation"}, "This will automatically generate a reasonable but boring ability. You will need to choose which defense it targets, give it any relevant ability tags, and potentially add flavor text."),
            ],
        ),
    ])


def monster_attack():
    return flex_row({"class": "monster-attack"}, [
        labeled_text_input(
            "Name",
            {"class": "monster-attack-name"},
            {"name": "monster_attack_name"},
        ),
        underlabel(
            "Accuracy",
            select(
                {
                    "class": "monster-attack-accuracy",
                    "name": "monster_attack_accuracy",
                },
                [
                    option({"value": "normal"}, "Normal"),
                    option({"value": "low_accuracy"}, "Low"),
                    option({"value": "high_accuracy"}, "High"),
                ]
            ),
        ),
        underlabel(
            "Targeting",
            select(
                {
                    "class": "monster-attack-targeting",
                    "name": "monster_attack_targeting",
                },
                [
                    option({"value": "targeted_medium"}, "Targeted (Medium range)"),
                    option({"value": "targeted_touch"}, "Targeted (Touch)"),
                    option({"value": "targeted_short"}, "Targeted (Short range)"),
                    option({"value": "targeted_long"}, "Targeted (Long range)"),
                    option({"value": "small_area"}, "Small area"),
                    option({"value": "large_area"}, "Large area"),
                ]
            ),
        ),
        underlabel(
            "Area Shape",
            select(
                {
                    "class": "monster-attack-area-shape",
                    "name": "monster_attack_area_shape",
                },
                [
                    option({"value": "default"}, "Default"),
                    option({"value": "cone"}, "Cone"),
                    option({"value": "line"}, "Line"),
                    option({"value": "radius_from_self"}, "Radius from self"),
                    option({"value": "radius_at_range"}, "Radius at range"),
                ]
            ),
        ),
        underlabel(
            "Effect",
            select(
                {
                    "class": "monster-attack-effect",
                    "name": "monster_attack_effect",
                },
                [
                    option({"value": "damage"}, "Damage"),
                    option({"value": "dazzled"}, "T1 Debuff (Dazzled)"),
                    option({"value": "frightened"}, "T2 Debuff (Frightened)"),
                    option({"value": "stunned"}, "T3 Debuff (Stunned)"),
                    option({"value": "confused"}, "T4 Debuff (Confused)"),
                ]
            ),
        ),
        underlabeled_checkbox(
            "Magical?",
            {"class": "monster-attack-is-magical"},
            {"name": "monster_attack_is_magical"},
        ),
        button(
            {
                "class": "create-monster-attack",
                "name": "act_createmonsterattack",
                "type": "action",
            },
            "Create ability",
        ),
        checkbox({
            "class": "hidden can-undo",
            "name": f"monster_attack_can_undo",
            "readonly": True,
            "value": "1",
        }),
        button(
            {
                "class": "undo-monster-attack",
                "name": "act_undomonsterattack",
                "type": "action",
            },
            "Undo",
        ),
    ])


def subskill_rowids():
    return span(
        {"class": "hidden"},
        [
            text_input({"name": "craft_alchemy_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_bone_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_ceramics_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_leather_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_manuscripts_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_metal_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_poison_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_stone_subskill_rowid", "readonly": True}),
            text_input({"name": "craft_textiles_subskill_rowid", "readonly": True}),
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
            text_input({"name": "knowledge_souls_subskill_rowid", "readonly": True}),
            text_input(
                {"name": "knowledge_untrained_subskill_rowid", "readonly": True}
            ),
        ],
    )
