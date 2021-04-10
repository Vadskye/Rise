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
    labeled_number_input,
    labeled_textarea,
    labeled_text_input,
    number_input,
    option,
    select,
    sidelabel,
    span,
    subtlebutton,
    text_input,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
import re


def create_page(destination):
    return flex_row(
        {"class": "page first-page"},
        [
            flex_col(
                {"class": "sidebar"},
                [
                    attributes_and_skills(),
                ],
            ),
            flex_col(
                {"class": "main-body"},
                [
                    statistics_header(destination),
                ],
            ),
        ],
    )


def attributes_and_skills():
    return flex_col(
        {"class": "attributes-and-skills"},
        [
            flex_wrapper(div({"class": "section-header"}, "Attributes and Skills")),
            "".join([attribute_section(attribute.lower()) for attribute in ATTRIBUTES]),
            flex_col(
                {"class": "other-skills attribute-section"},
                [
                    flex_row(
                        {"class": "attribute"},
                        [
                            div({"class": "attribute-header"}, "Other Skills"),
                        ],
                    ),
                    "".join([skill_box(skill) for skill in ATTRIBUTE_SKILLS["other"]]),
                    freeform_number_input(
                        {"class": "skill-box"},
                        {"name": "other_skill_1_name"},
                        {"name": "other_skill_1"},
                    ),
                ],
            ),
        ],
    )


def attribute_section(attribute):
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
                        {"class": "attribute-header number-label"},
                        invisiblebutton(
                            {
                                "name": f"roll_{attribute}",
                                "type": "roll",
                                "value": f"@{{character_name}} rolls {attribute.capitalize()}: [[d10+{attribute_modifier}]]",
                            },
                            attribute.capitalize(),
                        ),
                    ),
                    underlabel(
                        "Base",
                        number_input(
                            {
                                "disabled": True,
                                "name": f"{attribute}_base_display",
                                "value": "(@{" + attribute + "_starting})",
                            }
                        ),
                    ),
                    underlabel(
                        "Total",
                        number_input(
                            {
                                "disabled": True,
                                "name": f"{attribute}_display",
                                "value": "(@{" + attribute + "})",
                            }
                        ),
                    ),
                ],
            ),
            "".join([skill_box(skill) for skill in ATTRIBUTE_SKILLS[attribute]]),
        ],
    )


def skill_box(name):
    if name in SUBSKILLS:
        return subskill_box(name)

    formatted_skill = name.lower().replace(" ", "_")
    return flex_row(
        {"class": "skill-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_skill_{formatted_skill}",
                    "type": "roll",
                    "value": f"@{{character_name}} uses {name}: [[d10 + @{{{formatted_skill}_total}}]]",
                },
                name,
            ),
            number_input(
                {
                    "disabled": True,
                    "name": formatted_skill + "_total_display",
                    "value": "@{" + formatted_skill + "_total}",
                }
            ),
        ],
    )


def subskill_box(name):
    formatted_skill = name.lower().replace(" ", "_")
    visible_skill_name = re.sub('\\d', '', name).title()
    return flex_row(
        {"class": "skill-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_skill_{formatted_skill}",
                    "type": "roll",
                    "value": f"@{{character_name}} uses {visible_skill_name} (@{{{formatted_skill}_type}}): [[d10 + @{{{formatted_skill}_total}}]]",
                },
                visible_skill_name,
            ),
            text_input(
                {
                    "class": "subskill-type",
                    "disabled": True,
                    "name": f"{formatted_skill}_type_display",
                    "value": f"@{{{formatted_skill}_type}}",
                }
            ),
            number_input(
                {
                    "disabled": True,
                    "name": formatted_skill + "_total_display",
                    "value": "@{" + formatted_skill + "_total}",
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
                    resistances(),
                    movement(),
                ],
            )
        ]
    )


def defenses():
    return flex_col(
        {"class": "defenses"},
        [
            flex_wrapper(div({"class": "section-header"}, "Defenses")),
            "".join(
                [
                    labeled_number_input(
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
                ]
            ),
        ],
    )


def resistances():
    return flex_col(
        {"class": "damage-resistances"},
        [
            flex_wrapper(div({"class": "section-header"}, "Resistances")),
            "".join(
                [
                    sidelabel(
                        "Physical",
                        flex_row(
                            {"class": "core-statistics-split"},
                            [
                                number_input(
                                    {
                                        "name": "physical_resistance",
                                        "value": "@{physical_resistance}",
                                    }
                                ),
                                span({"class": "core-statistics-separator"}, "/"),
                                number_input(
                                    {
                                        "disabled": True,
                                        "name": "physical_resistance_maximum_display",
                                        "value": "@{physical_resistance_maximum}",
                                    }
                                ),
                            ],
                        ),
                    ),
                    sidelabel(
                        "Energy",
                        flex_row(
                            {"class": "core-statistics-split"},
                            [
                                number_input(
                                    {
                                        "name": "energy_resistance",
                                        "value": "@{energy_resistance}",
                                    }
                                ),
                                span({"class": "core-statistics-separator"}, "/"),
                                number_input(
                                    {
                                        "disabled": True,
                                        "name": "energy_resistance_maximum_display",
                                        "value": "@{energy_resistance_maximum}",
                                    }
                                ),
                            ],
                        ),
                    ),
                    flex_row(
                        [
                            text_input({"class": "freeform-resistance-name", "name": "resistance_freeform_name"}),
                            number_input({"name": "resistance_freeform_current"}),
                            span({"class": "core-statistics-separator"}, "/"),
                            number_input({"name": "resistance_freeform_maximum"}),
                        ],
                    ),
                    flex_row(
                        [
                            text_input({"class": "freeform-resistance-name", "name": "resistance_freeform_name_2"}),
                            number_input({"name": "resistance_freeform_current_2"}),
                            span({"class": "core-statistics-separator"}, "/"),
                            number_input({"name": "resistance_freeform_maximum_2"}),
                        ],
                    ),
                ]
            ),
        ],
    )


def core_statistics(destination):
    return flex_col(
        {"class": "core-statistics"},
        [
            flex_wrapper(div({"class": "section-header"}, "Core Statistics")),
            sidelabel(
                "Attune points",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "attunement_points",
                                "value": "@{attunement_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "attunement_points_maximum_display",
                                "value": "@{attunement_points_maximum}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabel(
                "Fatigue points",
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
            sidelabel(
                "Hit points",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "hit_points",
                                "value": "@{hit_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "hit_points_maximum_display",
                                "value": "@{hit_points_maximum}",
                            }
                        ),
                    ],
                ),
            ),
            (
                sidelabel(
                    "Initiative",
                    number_input(
                        {
                            "disabled": True,
                            "name": "initiative_display",
                            "value": "@{initiative}",
                        }
                    ),
                )
                if destination == "paper"
                else flex_row(
                    {"class": "labeled-number-input"},
                    [
                        flex_wrapper(
                            {"class": "core-initiative"},
                            subtlebutton(
                                {
                                    "name": "roll_initiative",
                                    "type": "roll",
                                    "value": f"@{{character_name}} rolls initiative: [[d10+@{{initiative}}]]",
                                },
                                "Initiative",
                            ),
                        ),
                        number_input(
                            {
                                "disabled": True,
                                "name": "initiative_display",
                                "value": "@{initiative}",
                            }
                        ),
                    ],
                )
            ),
        ],
    )


def movement():
    return flex_col(
        {"class": "movement"},
        [
            flex_wrapper(div({"class": "section-header"}, "Movement")),
            "".join(
                [
                    labeled_number_input(
                        movement_type,
                        input_attributes={
                            "name": f"{movement_type.lower()}_display",
                        },
                    )
                    for movement_type in "Land Climb Fly Swim".split()
                ]
            ),
        ],
    )
