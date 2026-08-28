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
from attributes.constitution import calc_maximum_stamina, calc_fortitude, calc_hit_points
from attributes.intelligence import calc_insight_points, calc_trained_skills
from attributes.perception import calc_accuracy, calc_blank_accuracy
from attributes.willpower import calc_magical_power, calc_mental
import re
from typing import Callable


def calc_resources() -> str:
    return flex_col(
        {"class": "calc-resources"},
        [
            calc_attunement_points(),
            calc_insight_points(),
            calc_maximum_stamina(),
            calc_trained_skills(),
            calc_combat_styles(),
            calc_maneuvers(),
            calc_mystic_spheres(),
            calc_spells(),
            calc_blank_resource(),
            calc_blank_resource(),
        ],
    )

def calc_attunement_points() -> str:
    return flex_row(
        [
            div({"class": "calc-header attunement-points-header"}, "Attunement points"),
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
