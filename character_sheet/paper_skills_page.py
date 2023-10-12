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
    li,
    minus,
    number_input,
    ol,
    p,
    plus,
    span,
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
import re


def create_page(destination):
    return flex_col(
        {"class": "page skills-page"},
        [
            *calc_skills(destination),
            div(
                """
                    If you are trained with a skill, you gain a bonus equal to 3 + half your level.
                """,
            ),
        ],
    )


def calc_skills(destination):
    if destination == "roll20":
        return [
            display_skills_for_attribute(attribute, calc_skill)
            for attribute in filter(lambda a: a != "Willpower", ATTRIBUTES + ["Other"])
        ]
    else:
        return [
            flex_row(
                {"class": "skill-megarow"},
                [
                    flex_col(
                        {"class": "skill-column -left"},
                        [
                            display_skills_for_attribute(attribute, calc_skill)
                            for attribute in [
                                "Strength",
                                "Dexterity",
                                "Constitution",
                                "Other",
                            ]
                        ],
                    ),
                    flex_col(
                        {"class": "skill-column -right"},
                        [
                            display_skills_for_attribute(attribute, calc_skill)
                            for attribute in ["Intelligence", "Perception"]
                        ]
                    ),
                ],
            )
        ]
