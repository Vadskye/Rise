from __future__ import annotations
from cgi_simple import (
    checkbox,
    div,
    equation,
    equation_misc_repeat,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_text_input,
    minus,
    number_input,
    plus,
    underlabel,
)
from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    SUBSKILLS,
)
from attributes.strength import calc_brawling_accuracy, calc_brawn, calc_mundane_power, calc_jump_distance
from attributes.dexterity import calc_armor, calc_reflex
from attributes.constitution import calc_fatigue_tolerance, calc_fortitude, calc_hit_points
from attributes.intelligence import calc_insight_points, calc_trained_skills
from attributes.perception import calc_accuracy, calc_blank_accuracy
from attributes.willpower import calc_magical_power, calc_mental
import re
from typing import Callable

from items_page import inventory

def create_page(_destination: str = "paper") -> str:
    return flex_col(
        {"class": "page attribute-page"},
        [
            div({"class": "section-header"}, "Attributes and Skills"),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
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
            *inventory(),
        ],
    )

def calc_resources() -> str:
    return flex_col(
        {"class": "calc-resources"},
        [
            calc_attunement_points(),
            calc_fatigue_tolerance(),
            calc_insight_points(),
            calc_trained_skills(),
            calc_combat_styles(),
            calc_maneuvers(),
            calc_mystic_spheres(),
            calc_spells(),
            calc_blank_resource(),
            calc_blank_resource(),
        ],
    )

def calc_attribute(attribute_name: str) -> str:
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
                            "name": attribute_lower,
                            "readonly": True,
                        },
                        result_label="Total",
                    ),
                ],
            ),
        ]
    )

def calc_skill(skill_name: str, attribute: str | None = None) -> str:
    visible_skill_name = re.sub("\\d", "", skill_name).capitalize()
    skill_parsable = skill_name.lower().replace(" ", "_")
    attribute_shorthand = ATTRIBUTE_SHORTHAND.get(attribute or "")

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


def calc_skill_equation_components(skill_parsable: str, attribute: str | None) -> list[str]:
    if attribute == "other":
        return [
            underlabel("Attr", number_input()),
            plus(),
            underlabel(
                "Train",
                number_input(
                    {
                        "name": f"{skill_parsable}_level",
                        "readonly": True,
                    }
                ),
            ),
            plus(),
            equation_misc_repeat(skill_parsable, 2),
        ]
    else:
        standard_prefix = [
            underlabel(ATTRIBUTE_SHORTHAND.get(attribute or "") or "Attr", number_input()),
            plus(),
            underlabel(
                "Train",
                number_input(
                    {
                        "name": f"{skill_parsable}_level",
                        "readonly": True,
                    }
                ),
            ),
        ]

        if attribute == "dexterity":
            return [
                *standard_prefix,
                minus(),
                underlabel("Armor", number_input()),
                plus(),
                equation_misc_repeat(skill_parsable, 1),
            ]
        else:
            return [
                *standard_prefix,
                plus(),
                equation_misc_repeat(skill_parsable, 2)
            ]


def display_skills_for_attribute(attribute: str, display_function: Callable[[str, str | None], str]) -> str:
    return div({"class": "trained-skills"},
        [
            display_function(skill_name, attribute.lower())
            for skill_name in ATTRIBUTE_SKILLS[attribute.lower()]
        ],
    )

def calc_strength_based() -> str:
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

def calc_dexterity_based() -> str:
    return flex_col(
        {"class": "calc-dexterity-based"},
        [
            calc_attribute("Dexterity"),
            calc_armor(),
            calc_reflex(),
            display_skills_for_attribute("Dexterity", calc_skill),
        ],
    )

def calc_constitution_based() -> str:
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

def calc_intelligence_based() -> str:
    return flex_col(
        {"class": "calc-intelligence-based"},
        [
            calc_attribute("Intelligence"),
            calc_insight_points(),
            calc_trained_skills(),
            display_skills_for_attribute("Intelligence", calc_skill),
        ],
    )


def calc_perception_based() -> str:
    return flex_col(
        {"class": "calc-perception-based"},
        [
            calc_attribute("Perception"),
            calc_accuracy(),
            calc_blank_accuracy(),
            display_skills_for_attribute("Perception", calc_skill),
        ],
    )

def calc_willpower_based() -> str:
    return flex_col(
        {"class": "calc-willpower-based"},
        [
            calc_attribute("Willpower"),
            calc_magical_power(),
            calc_mental(),
            # display_skills_for_attribute("Willpower", calc_skill),
        ],
    )


def calc_attunement_points() -> str:
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
                    "name": "attunement_points_maximum",
                    "readonly": True,
                },
            ),
        ]
    )


def calc_combat_styles() -> str:
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

def calc_maneuvers() -> str:
    return flex_row(
        [
            div({"class": "calc-header"}, "Maneuvers"),
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
                    equation_misc_repeat("maneuvers", 2),
                ],
            ),
        ]
    )

def calc_mystic_spheres() -> str:
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

def calc_spells() -> str:
    return flex_row(
        [
            div({"class": "calc-header"}, "Spells"),
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
                    equation_misc_repeat("spells", 2),
                ],
            ),
        ]
    )


def calc_blank_resource() -> str:
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
