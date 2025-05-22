from cgi_simple import (
    checkbox,
    div,
    equation,
    equation_misc,
    equation_misc_repeat,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_text_input,
    minus,
    number_input,
    plus,
    span,
    text_input,
    underlabel,
)
from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    ATTRIBUTES,
    ROLL20_CALC,
    SUBSKILLS,
)
from sheet_worker import standard_damage_at_power
from attributes.strength import calc_brawling_accuracy, calc_brawn, calc_mundane_power, calc_jump_distance
from attributes.dexterity import calc_armor, calc_reflex
from attributes.constitution import calc_fatigue_tolerance, calc_fortitude, calc_hit_points
from attributes.intelligence import calc_insight_points, calc_trained_skills
from attributes.perception import calc_accuracy, calc_blank_accuracy
from attributes.willpower import calc_magical_power, calc_mental
import re

def create_page(destination):
    return flex_col(
        {"class": "page attribute-page"},
        [
            div(
                {"class": "page-explanation"},
                """
                    This page is used to track your core character statistics.
                    There are open spaces in each equation so you can add custom modifiers for each statistic.
                    Each custom modifier has a small text box underneath it that you can use to remind yourself why that modifier exists.
                """,
            ),
            flex_col(
                {"class": "header"},
                [
                    calc_non_attribute(),
                ],
            ),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            calc_strength_based(),
                            calc_dexterity_based(),
                            calc_constitution_based(),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            calc_intelligence_based(),
                            calc_perception_based(),
                            calc_willpower_based(),
                        ],
                    ),
                ],
            ),
        ],
    )

def calc_attribute(attribute_name):
    attribute_lower = attribute_name.lower()
    return "".join(
        [
            flex_row(
                {"class": "attribute-calc"},
                [
                    div({"class": "attribute-divider"}, ""),
                    div({"class": "attribute-header"}, attribute_name),
                    equation(
                        [
                            underlabel(
                                "Base",
                                number_input(
                                    {
                                        "name": attribute_lower + "_point_buy",
                                    }
                                ),
                            ),
                            plus(),
                            equation_misc_repeat(attribute_lower, 2),
                        ],
                        result_attributes={
                            "disabled": "true",
                            "name": attribute_lower + "_display",
                            "value": "(@{" + attribute_lower + "})",
                        },
                        result_label="Total",
                    ),
                ],
            ),
        ]
    )

def calc_skill(skill_name, attribute=None):
    visible_skill_name = re.sub("\\d", "", skill_name).capitalize()
    skill_parsable = skill_name.lower().replace(" ", "_")
    attribute_shorthand = ATTRIBUTE_SHORTHAND[attribute] if attribute else None

    skill_row = flex_row(
        {"class": "skill-row"},
        [
            div(
                {"class": "calc-header"},
                [
                    visible_skill_name,
                ],
            ),
            equation(
                calc_skill_equation_components(skill_parsable, attribute),
                result_attributes={
                    "disabled": True,
                    "name": f"{skill_parsable}_display",
                    "value": f"@{{{skill_parsable}_total}}",
                },
            ),
            flex_row(
                {"class": "class-skill-container"},
                [
                    underlabel(
                        "Class?",
                        checkbox(
                            {
                                "class": "is-class-skill",
                                "name": skill_parsable + "_class_skill",
                            }
                        ),
                    ),
                ],
            ),
        ],
    )

    if skill_name in SUBSKILLS:
        return flex_col({"class": "skill-with-subskill"}, [
            skill_row,
            labeled_text_input(f"{skill_name} subskills trained", {"class": "subskills-trained"}),
        ])
    else:
        return skill_row


def calc_skill_equation_components(skill_parsable, attribute):
    if attribute == "other":
        return [
            underlabel(
                "Train",
                number_input(
                    {
                        "disabled": True,
                        "name": "skill_level_display",
                        "value": f"@{{{skill_parsable}_level}}",
                    }
                ),
            ),
            plus(),
            equation_misc_repeat(skill_parsable, 2),
        ]
    else:
        return [
            underlabel(
                "Train",
                number_input(
                    {
                        "disabled": True,
                        "name": "skill_level_display",
                        "value": f"@{{{skill_parsable}_level}}",
                    }
                ),
            ),
            plus(),
            equation_misc_repeat(skill_parsable, 2),
        ]


def display_skills_for_attribute(attribute, display_function):
    return div({"class": "trained-skills"},
        [
            display_function(skill_name, attribute.lower())
            for skill_name in ATTRIBUTE_SKILLS[attribute.lower()]
        ],
    )

def calc_strength_based():
    return flex_col(
        {"class": "calc-strength-based"},
        [
            calc_attribute("Strength"),
            calc_brawling_accuracy(),
            calc_brawn(),
            calc_mundane_power(),
            calc_jump_distance(),
            display_skills_for_attribute("Strength", calc_skill),
        ],
    )

def calc_dexterity_based():
    return flex_col(
        {"class": "calc-dexterity-based"},
        [
            calc_attribute("Dexterity"),
            calc_armor(),
            calc_reflex(),
            display_skills_for_attribute("Dexterity", calc_skill),
        ],
    )

def calc_constitution_based():
    return flex_col(
        {"class": "calc-constitution-based"},
        [
            calc_attribute("Constitution"),
            calc_fatigue_tolerance(),
            calc_fortitude(),
            calc_hit_points(),
            display_skills_for_attribute("Constitution", calc_skill),
        ],
    )

def calc_intelligence_based():
    return flex_col(
        {"class": "calc-intelligence-based"},
        [
            calc_attribute("Intelligence"),
            calc_insight_points(),
            calc_trained_skills(),
            display_skills_for_attribute("Intelligence", calc_skill),
        ],
    )


def calc_perception_based():
    return flex_col(
        {"class": "calc-perception-based"},
        [
            calc_attribute("Perception"),
            calc_accuracy(),
            calc_blank_accuracy(),
            display_skills_for_attribute("Perception", calc_skill),
        ],
    )

def calc_willpower_based():
    return flex_col(
        {"class": "calc-willpower-based"},
        [
            calc_attribute("Willpower"),
            calc_magical_power(),
            calc_mental(),
            # display_skills_for_attribute("Willpower", calc_skill),
        ],
    )

def calc_non_attribute():
    return flex_row(
        {"class": "calc-non-attribute"},
        [
            flex_col(
                {"class": "sidebar"},
                [
                    calc_attunement_points(),
                    calc_damage_resistance(),
                    calc_encumbrance(),
                ],
            ),
            flex_col(
                {"class": "main-body"},
                [
                    calc_vital_rolls(),
                    display_skills_for_attribute("Other", calc_skill),
                ],
            )
        ]
    )

def calc_damage_resistance():
    return flex_row(
        [
            div({"class": "calc-header"}, "Damage resist"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Armor",
                        number_input(
                            {
                                "name": "damage_resistance_armor",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("damage_resistance", 3),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "damage_resistance_display",
                    "value": "(@{damage_resistance_maximum})",
                },
            ),
        ],
    )


def calc_attunement_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Attune points"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "attunement_points_from_class",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("attunement_points", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "attunement_points_display",
                    "value": "@{attunement_points_maximum}",
                },
            ),
        ]
    )


def calc_encumbrance():
    return flex_row(
        [
            div({"class": "calc-header"}, "Encumbrance"),
            equation(
                [
                    underlabel(
                        "Armor", number_input({"name": "body_armor_encumbrance"})
                    ),
                    minus(),
                    underlabel(
                        "Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "encumbrance_strength",
                                "value": "(@{strength})",
                            }
                        ),
                    ),
                    minus(),
                    equation_misc("encumbrance", 0),
                    minus(),
                    equation_misc("encumbrance", 1),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "encumbrance_display",
                    "value": "@{encumbrance}",
                },
            ),
        ]
    )

def calc_vital_rolls():
    return flex_row(
        [
            div({"class": "calc-header"}, "Vital rolls"),
            equation(
                [
                    equation_misc_repeat("vital_rolls", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "vital_rolls_display",
                    "value": "@{vital_rolls}",
                },
            ),
        ]
    )
