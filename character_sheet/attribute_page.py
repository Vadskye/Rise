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
            flex_row(
                {"class": "header"},
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            calc_combat(),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            calc_defenses(),
                        ],
                    ),
                ]
            ),
            div({"class": "section-header"}, "Attributes and Skills"),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            calc_encumbrance(),
                            display_skills_for_attribute("Other", calc_skill),
                            calc_attribute("Strength"),
                            calc_jump_distance(),
                            display_skills_for_attribute("Strength", calc_skill),
                            calc_attribute("Dexterity"),
                            display_skills_for_attribute("Dexterity", calc_skill),
                            calc_attribute("Constitution"),
                            display_skills_for_attribute("Constitution", calc_skill),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            calc_attribute("Intelligence"),
                            display_skills_for_attribute("Intelligence", calc_skill),
                            calc_attribute("Perception"),
                            display_skills_for_attribute("Perception", calc_skill),
                            calc_attribute("Willpower"),
                        ],
                    ),
                ],
            ),
        ],
    )

def calc_combat():
    return flex_col(
        {"class": "calc-combat"},
        [
            div({"class": "section-header"}, "Offensive Statistics"),
            calc_accuracy(),
            calc_brawling_accuracy(),
            calc_blank_accuracy(),
            calc_extra_damage(),
            calc_magical_power(),
            calc_mundane_power(),
            calc_speed(),
        ],
    )

def calc_defenses():
    return flex_col(
        {"class": "calc-defenses"},
        [
            div({"class": "section-header"}, "Defensive Statistics"),
            calc_hit_points(),
            calc_damage_resistance(),
            calc_armor(),
            calc_brawn(),
            calc_fortitude(),
            calc_mental(),
            calc_reflex(),
        ],
    )

def calc_resources():
    return flex_col(
        {"class": "calc-resources"},
        [
            div({"class": "section-header"}, "Resources"),
            calc_attunement_points(),
            calc_fatigue_tolerance(),
            calc_insight_points(),
            calc_trained_skills(),
            calc_combat_styles(),
            calc_mystic_spheres(),
            calc_blank_resource(),
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
                                number_input(),
                            ),
                            plus(),
                            underlabel("Species", number_input()),
                            plus(),
                            underlabel("Leveling", number_input()),
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
        {"class": f"skill-row {skill_parsable}-row"},
        [
            div(
                {"class": f"calc-header {skill_parsable}-header"},
                [
                    visible_skill_name,
                ],
            ),
            equation(
                calc_skill_equation_components(skill_parsable, attribute),
            ),
            flex_row(
                {"class": "class-skill-container"},
                [
                    underlabel(
                        "Trained?",
                        checkbox(
                            {
                                "class": "is-trained",
                                "name": skill_parsable + "_trained",
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
            underlabel("Attr", number_input()),
            plus(),
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
        standard_prefix = [
            underlabel(ATTRIBUTE_SHORTHAND[attribute], number_input()),
            plus(),
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
        ]

        if attribute == "strength" or attribute == "dexterity":
            return [
                *standard_prefix,
                minus(),
                underlabel("Encumb", number_input()),
                plus(),
                equation_misc_repeat(skill_parsable, 1),
            ]
        else:
            return [
                *standard_prefix,
                plus(),
                equation_misc_repeat(skill_parsable, 2)
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

def calc_speed():
    return flex_row(
        [
            div({"class": "calc-header"}, "Speed"),
            equation(
                [
                    underlabel(
                        "Base",
                        number_input({"name": "base_speed"}),
                    ),
                    minus(),
                    underlabel(
                        "Armor", number_input({"name": "body_armor_speed"})
                    ),
                    plus(),
                    equation_misc("speed", 0),
                    plus(),
                    equation_misc("speed", 1),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "speed_display",
                    "value": "@{speed}",
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

def calc_combat_styles():
    return flex_row(
        [
            div({"class": "calc-header"}, "Combat styles"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(),
                    ),
                    plus(),
                    underlabel(
                        "Insight",
                        number_input(),
                    ),
                    plus(),
                    equation_misc_repeat("combat_styles", 2),
                ],
            ),
        ]
    )

def calc_mystic_spheres():
    return flex_row(
        [
            div({"class": "calc-header"}, "Mystic spheres"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(),
                    ),
                    plus(),
                    underlabel(
                        "Insight",
                        number_input(),
                    ),
                    plus(),
                    equation_misc_repeat("mystic_spheres", 2),
                ],
            ),
        ]
    )

def calc_blank_resource():
    return flex_row(
        [
            div({"class": "calc-header"}, div({"class": "calc-blank-header"}, "")),
            equation(
                [
                    underlabel(
                        "Base",
                        number_input(),
                    ),
                    plus(),
                    underlabel(
                        "Insight",
                        number_input(),
                    ),
                    plus(),
                    equation_misc_repeat("blank_resource", 2),
                ],
            ),
        ]
    )

def calc_extra_damage():
    return flex_row(
        [
            div({"class": "calc-header"}, "Extra damage"),
            equation(
                [
                    equation_misc_repeat("extra_damage", 4),
                ],
            ),
        ]
    )
