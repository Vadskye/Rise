from cgi_simple import (
    button,
    checkbox,
    div,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    freeform_number_input,
    invisiblebutton,
    label,
    sidelabeled_number_input,
    labeled_textarea,
    labeled_text_input,
    number_input,
    option,
    select,
    sidelabel,
    span,
    subtlebutton,
    text_input,
    textarea,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)
from active_abilities_page import (
    ability,
    attack_button_text,
    construct_damage_text,
    other_damaging_attack_button_text,
    crit_damage_button,
    strike_based_attack,
    other_damaging_attack,
    nondamaging_attack,
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
from get_modifier_key import get_modifier_key
import re


def create_page(destination):
    return flex_col(
        {"class": "page first-page"},
        [
            boring_stuff(destination),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            attributes_and_skills(destination),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            statistics_header(destination),
                            div({"class": "section-header"}, "Movement and Senses"),
                            movement(destination),
                            div({"class": "section-header useful-notes-header"}, "Useful Notes"),
                            textarea(
                                {"class": "special-defenses useful-notes", "name": f"special_defenses"}
                            ),
                            *(
                                roll20_abilities()
                                if destination == "roll20"
                                else paper_abilities()
                            ),
                        ],
                    ),
                ]
            ),
            div({"class": "page-number"}, "Page 1"),
        ],
    )


def paper_abilities():
    return [
        div({"class": "section-header"}, "Attacks and Active Abilities"),
        *[paper_ability() for i in range(8)],
    ]


def paper_ability():
    return flex_row(
        {"class": "paper-ability"},
        [
            labeled_text_input("Name", {"class": "ability-name"}),
            labeled_textarea("Effect", {"class": "ability-effect"}),
        ],
    )


def roll20_abilities():
    return div({"class": "all-abilities"}, [
        div({"class": "section-header"}, "Weapon-Based Strikes"),
        flex_row(
            {"class": "active-ability-group weapon-based-strikes"},
            fieldset(
                {"class": f"repeating_strikeattacks"},
                strike_based_attack(),
            ),
        ),
        div({"class": "section-header"}, "Other Damaging Attacks"),
        flex_row(
            {"class": "active-ability-group other-damaging-attacks"},
            fieldset(
                {"class": f"repeating_otherdamagingattacks"},
                other_damaging_attack(),
            ),
        ),
        div({"class": "section-header"}, "Debuffs"),
        flex_row(
            {"class": "active-ability-group debuffs"},
            fieldset(
                {"class": f"repeating_nondamagingattacks"},
                nondamaging_attack(),
            ),
        ),
        div({"class": "section-header"}, "Other Abilities"),
        flex_row(
            {"class": "active-ability-group other-abilities"},
            fieldset(
                {"class": f"repeating_abilities"},
                ability(),
            ),
        ),
        flex_wrapper(div({"class": "section-header"}, "Temporary Modifiers")),
        flex_row(
            {"class": "temporary-modifiers"},
            fieldset(
                {"class": "repeating_temporarymodifiers"},
                temporary_modifier_toggle(),
            ),
        ),
    ])


def attributes_and_skills(destination):
    return flex_col(
        {"class": "attributes-and-skills"},
        [
            flex_wrapper(div({"class": "section-header"}, "Attributes and Skills")),
            "".join([attribute_section(attribute.lower(), destination) for attribute in ATTRIBUTES]),
            flex_col(
                {"class": "other-skills attribute-section"},
                [
                    flex_row(
                        {"class": "attribute"},
                        [
                            div({"class": "other-skills"}, "Other Skills"),
                        ],
                    ),
                    "".join([skill_box(skill, destination) for skill in ATTRIBUTE_SKILLS["other"]]),
                ],
            ),
        ],
    )


def attribute_section(attribute, destination):
    attribute_modifier = (
        f"(@{{{attribute}}} - @{{encumbrance}})"
        if attribute in ["strength", "dexterity"]
        else f"@{{{attribute}}}"
    )
    return flex_col(
        {"class": f"{attribute} attribute-section"},
        [
            flex_row(
                {"class": "attribute"},
                [
                    span(
                        {"class": "number-label"},
                        subtlebutton(
                            {
                                "name": f"roll_{attribute}",
                                "type": "roll",
                                "value": f"@{{character_name}} rolls {attribute.capitalize()}: [[d10+{attribute_modifier}]]",
                            },
                            attribute.capitalize(),
                        ),
                    ),
                    number_input(
                        {
                            "disabled": True,
                            "name": f"{attribute}_display",
                            "value": "(@{" + attribute + "})",
                        }
                    ),
                ],
            ),
            "".join([skill_box(skill, destination) for skill in ATTRIBUTE_SKILLS[attribute]]),
        ],
    )


def skill_box(name, destination):
    if name in SUBSKILLS:
        return subskill_section(name, destination)

    modifier_key = get_modifier_key(name)
    return flex_row(
        {"class": "skill-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_skill_{modifier_key}",
                    "type": "roll",
                    "value": f"@{{character_name}} uses {name}: [[d10 + @{{{modifier_key}_total}}]]",
                },
                name,
            ),
            number_input(
                {
                    "readonly": True,
                    "name": modifier_key,
                }
            ),
        ],
    )


def subskill_section(name, destination):
    modifier_key = get_modifier_key(name)

    if destination == "paper":
        return div({"class": "subskill-section"}, [
            flex_row(
                {"class": "skill-box"},
                [
                    subtlebutton(
                        {},
                        name + "________",
                    ),
                    number_input(
                        {
                            "readonly": True,
                            "name": modifier_key,
                        }
                    ),
                ],
            ),
            flex_row(
                {"class": "skill-box"},
                [
                    subtlebutton(
                        {},
                        "__________________",
                    ),
                    number_input(
                        {
                            "readonly": True,
                            "name": modifier_key,
                        }
                    ),
                ],
            )
        ])
    else:
        return div({"class": "subskill-section"},
            [
                div({"class": "subskill-header"}, name),
                untrained_subskill_box(name, modifier_key),
                fieldset(
                    {"class": f"repeating_{modifier_key}subskills"},
                    subskill_box(name, modifier_key),
                ),
            ]
        )


def subskill_box(display_name, parseable_name):
    return flex_row(
        {"class": f"skill-box {parseable_name}-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_subskill",
                    "type": "roll",
                    "value": "@{subskill_button}",
                },
                text_input(
                    {
                        "class": "subskill-name",
                        "readonly": "true",
                        "name": "subskill_name",
                    }
                ),
            ),
            textarea(
                {
                    "class": "hidden",
                    "readonly": True,
                    "name": "subskill_button",
                }
            ),
            number_input(
                {
                    "readonly": True,
                    "name": "subskill_modifier",
                }
            ),
        ],
    )


def untrained_subskill_box(display_name, parseable_name):
    return flex_row(
        {"class": f"skill-box {parseable_name}-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_subskill",
                    "type": "roll",
                    "value": "@{character_name} uses "
                    + display_name
                    + " (untrained): [[d10 + @{"
                    + parseable_name
                    + "_untrained}]]",
                },
                span({"class": "subskill-name"}, f"(untrained)"),
            ),
            number_input(
                {
                    "readonly": True,
                    "name": f"{parseable_name}_untrained",
                }
            ),
        ],
    )


def statistics_header(destination):
    return "".join(
        [
            flex_row(
                {"class": "all-statistics"},
                [
                    core_statistics(destination),
                    defenses(),
                ],
            )
        ]
    )


def defenses():
    return flex_col(
        {"class": "defenses"},
        [
            div({"class": "section-header"}, "Defenses"),
            flex_row(
                {"class": "defenses-row"},
                [
                    flex_col(
                        {"class": "standard-defenses"},
                        [
                            sidelabeled_number_input(
                                defense,
                                input_attributes={
                                    "disabled": "true",
                                    "name": defense.lower() + "_display",
                                    "value": "@{"
                                    + (
                                        "armor_defense"
                                        if defense == "Armor"
                                        else defense.lower()
                                    )
                                    + "}",
                                },
                            )
                            for defense in DEFENSES
                        ],
                    ),
                    flex_col(
                        {"class": "special-defenses"},
                        [
                            sidelabel(
                                "Immune",
                                textarea({
                                    "class": "immune",
                                    "name": "immune",
                                    "readonly": True,
                                }),
                            ),
                            sidelabel(
                                "Imperv",
                                textarea({
                                    "class": "impervious",
                                    "name": "impervious",
                                    "readonly": True,
                                }),
                            ),
                            sidelabel(
                                "Vuln",
                                textarea({
                                    "class": "vulnerable",
                                    "name": "vulnerable",
                                    "readonly": True,
                                }),
                            ),
                        ],
                    ),
                ],
            ),
        ],
    )



def core_statistics(destination):
    return flex_col(
        {"class": "core-statistics"},
        [
            flex_wrapper(div({"class": "section-header"}, "Core Statistics")),
            sidelabel(
                "Hit points",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "class": "large-number-input",
                                "name": "hit_points",
                                "value": "@{hit_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "class": "large-number-input",
                                "disabled": True,
                                "name": "hit_points_maximum_display",
                                "value": "@{hit_points_maximum}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabeled_number_input(
                "Injury point",
                input_attributes={
                    "disabled": True,
                    "name": f"injury_point_display",
                    "value": "@{injury_point}",
                },
            ),
            sidelabel(
                "Fatigue level" if destination == "roll20" else "Fatigue tolerance",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "fatigue_points",
                                "value": "@{fatigue_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "fatigue_tolerance_display_first_page",
                                "value": "@{fatigue_tolerance}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabeled_number_input(
                "Accuracy",
                input_attributes={
                    "disabled": True,
                    "name": f"accuracy_display",
                    "value": "@{accuracy}",
                },
            ),
            sidelabeled_number_input(
                "Speed",
                input_attributes={
                    "disabled": True,
                    "name": f"speed_display",
                    "value": "@{speed}",
                },
            ),
        ],
    )


def movement(destination):
    return flex_row(
        {"class": "movement"},
        [
            flex_row({"class": "standard-movements"}, [
                sidelabel(
                    "Jump",
                    text_input({
                        "readonly": True,
                        "name": f"combined_jump_distance",
                    }),
                    attributes = {
                        "class": "jump-distance",
                    },
                ),
            ]),
            flex_row({"class": "blank-movements"}, [
                text_input({"class": "movement-speed-name", "name": f"movement_speed_{i}_name"})
                for i in range(5)
            ]),
        ],
    )


def temporary_modifier_toggle():
    return flex_row(
        {"class": "custom-modifier-toggle"},
        [
            checkbox({"class": "is-active", "name": "is_active"}),
            text_input({"name": "name", "readonly": True}),
        ],
    )


def boring_stuff(destination):
    return div(
        {"class": "boring-stuff"},
        [
            flex_row(
                {"class": "boring-row"},
                [
                    labeled_text_input(
                        "Character name",
                        attributes={"class": "character-name"},
                        input_attributes={"name": "character_name"}
                    ),
                    labeled_text_input(
                        "Player name",
                        attributes={"class": "player-name"},
                        input_attributes={"name": "player_name"}
                    ),
                    labeled_text_input(
                        "Experience",
                        attributes={"class": "experience"},
                        input_attributes={"name": "experience"}
                    ),
                    underlabel_spaced(
                        "Level",
                        number_input({"class": "fake-text", "name": "level"}),
                        attributes={"class": "level-input"},
                    ),
                    *(
                        [
                            underlabel(
                                "Monster?",
                                select(
                                    {
                                        "class": "challenge-rating",
                                        "name": "challenge_rating",
                                    },
                                    [
                                        option({"value": ""}, ""),
                                        option({"value": "1"}, "Normal"),
                                        option({"value": "4"}, "Elite"),
                                    ],
                                ),
                            ),
                            underlabel(
                                "Chat color",
                                select(
                                    {"class": "chat-color", "name": "chat_color"},
                                    [
                                        option({"value": "black"}, "Black"),
                                        option({"value": "blue"}, "Blue"),
                                        option({"value": "bluegreen"}, "Bluegreen"),
                                        option({"value": "brown"}, "Brown"),
                                        option({"value": "gold"}, "Gold"),
                                        option({"value": "gray"}, "Gray"),
                                        option({"value": "green"}, "Green"),
                                        option({"value": "orange"}, "Orange"),
                                        option({"value": "purple"}, "Purple"),
                                    ],
                                ),
                            ),
                        ]
                        if destination == "roll20"
                        else []
                    ),
                ],
            ),
        ],
    )
