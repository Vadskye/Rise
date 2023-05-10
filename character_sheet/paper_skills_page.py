from cgi_simple import (
    checkbox,
    div,
    equation,
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
from second_page import equation_misc_repeat
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


def calc_skill(skill_name, attribute=None):
    visible_skill_name = re.sub("\\d", "", skill_name).title()
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
                {"class": "skill-points-row"},
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
    return "".join(
        [
            div({"class": "section-header"}, f"{attribute} Skills"),
            *[
                display_function(skill_name, attribute.lower())
                for skill_name in ATTRIBUTE_SKILLS[attribute.lower()]
            ],
        ]
    )
