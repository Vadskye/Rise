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
            div(
                {"class": "tab-explanation"},
                """
                This tab is used to track your skills.
                On the left side, you can indicate your level of training in each skill.
                On the right side, you can add custom bonuses or penalties to each skill to determine your total skill modifier.
            """,
            ),
            *calc_skills(destination),
        ],
    )


def calc_skills(destination):
    if destination == "roll20":
        return [
            display_skills_for_attribute(attribute, calc_skill)
            for attribute in filter(lambda a: a != "Willpower", ATTRIBUTES + ["Other"])
        ] + [trained_skills_tracker()]
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
                        + [trained_skills_tracker()],
                    ),
                ],
            )
        ]


def trained_skills_tracker():
    return flex_row(
        {"class": "trained-skills"},
        [
            div({"class": "trained-skills-label"}, "Trained Skills"),
            underlabel(
                "Current",
                number_input(
                    {
                        "disabled": True,
                        "name": "skill_points_spent_display",
                        "value": "@{skill_points_spent}",
                    }
                ),
            ),
            span({"class": "trained-skills-separator"}, "/"),
            underlabel(
                "Max",
                number_input(
                    {
                        "disabled": True,
                        "name": "skill_points_total_display",
                        "value": "@{skill_points}",
                    }
                ),
            ),
        ],
    )


def calc_skill(skill_name, attribute=None):
    visible_skill_name = re.sub("\\d", "", skill_name).title()
    skill_parsable = skill_name.lower().replace(" ", "_")
    attribute_shorthand = ATTRIBUTE_SHORTHAND[attribute] if attribute else None

    return flex_row(
        {"class": "skill-row"},
        [
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
            div(
                {"class": "calc-header"},
                [
                    visible_skill_name,
                    text_input(
                        {
                            "class": "subskill-type",
                            "name": f"{skill_parsable}_type",
                        }
                    )
                    if skill_name in SUBSKILLS
                    else "",
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
        ],
    )


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
