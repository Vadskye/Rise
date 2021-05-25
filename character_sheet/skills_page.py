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
from sheet_data import ATTRIBUTE_SHORTHAND, ATTRIBUTE_SKILLS, ATTRIBUTES, ROLL20_CALC, SUBSKILLS
from second_page import equation_misc_repeat
import re


def create_page(destination):
    return flex_col(
        {"class": "page skills-page"},
        [
            calc_skills(destination),
        ],
    )

def calc_skills(destination):
    if destination == "roll20":
        return flex_col(
            [
                div({"class": "tab-explanation"}, """
                    This tab is used to track your skills.
                    On the left side, you can spend skill points and determine your level of training in each skill.
                    On the right side, you can add custom bonuses or penalties to each skill to determine your total skill modifier.
                """),
                *[
                    display_skills_for_attribute(attribute, calc_skill)
                    for attribute in filter(lambda a: a != "Willpower", ATTRIBUTES + ["Other"])
                ],
                flex_row(
                    {"class": "skill-points"},
                    [
                        div({"class": "skill-points-label"}, "Skill Points"),
                        underlabel(
                            "Spent",
                            number_input(
                                {
                                    "disabled": True,
                                    "name": "skill_points_spent_display",
                                    "value": "@{skill_points_spent}",
                                }
                            ),
                        ),
                        span({"class": "equation-glue"}, "/"),
                        underlabel(
                            "Total",
                            number_input(
                                {
                                    "disabled": True,
                                    "name": "skill_points_total_display",
                                    "value": "@{skill_points}",
                                }
                            ),
                        ),
                    ],
                ),
            ],
        )
    else:
        blank_skill_info = [calc_skill("") for i in range(16)]

        return flex_col(
            {"class": "calc-skills"},
            [
                div({"class": "section-header"}, "Skills"),
                skill_labels(),
                *blank_skill_info,
            ],
        )


def skill_labels():
    return flex_row(
        {"class": "skill-labels"},
        [
            div({"class": "skill-label skill-label-points"}, "Points"),
            div({"class": "skill-label skill-label-training"}, "T/M"),
            div({"class": "skill-label skill-label-class"}, "Class?"),
            div({"class": "skill-label skill-label-misc"}, "Misc"),
        ],
    )


def calc_skill(skill_name, attribute=None):
    visible_skill_name = re.sub('\\d', '', skill_name).title()
    skill_parsable = skill_name.lower().replace(" ", "_")
    attribute_shorthand = ATTRIBUTE_SHORTHAND[attribute] if attribute else None;
    return flex_row(
        {"class": "skill-row"},
        [
            flex_row({"class": "skill-points-row"}, [
                underlabel(
                    "Points",
                    number_input(
                        {
                            "name": skill_parsable + '_points',
                        }
                    ),
                ),
                underlabel(
                    "Class?",
                    checkbox(
                        {
                            "class": "is-class-skill",
                            "name": skill_parsable + "_class_skill",
                        }
                    ),
                ),
                underlabel(
                    "Training level",
                    text_input(
                        {
                            "class": "skill-training",
                            "disabled": True,
                            "name": f"${skill_parsable}_training_display",
                            "value": "@{" + skill_parsable + "_training}",
                        }
                    ),
                ),
            ]),
            div({"class": "calc-header"}, [
                visible_skill_name,
                text_input(
                    {
                        "class": "subskill-type",
                        "name": f"{skill_parsable}_type",
                    }
                )
                if skill_name in SUBSKILLS
                else "",
            ]),
            equation(
                [
                    underlabel(
                        "Train",
                        number_input(
                            {
                                "disabled": True,
                                "name": "skill_ranks_display",
                                "value": f"@{{{skill_parsable}_ranks}}",
                            }
                        ),
                    ),
                    *([] if attribute == "other" else [
                        plus(),
                        underlabel(
                            f"({attribute_shorthand})",
                            number_input(
                                {
                                    "disabled": True,
                                    "name": f"{skill_parsable}_attribute",
                                    "value": f"@{{{attribute}_starting}}",
                                }
                            ),
                        ),
                    ]),
                    plus(),
                    equation_misc_repeat(skill_parsable, 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": f"{skill_parsable}_display",
                    "value": f"@{{{skill_parsable}_total}}",
                },
            ),
        ],
    )

def display_skills_for_attribute(attribute, display_function):
    return "".join([
        div({"class": "section-header"}, f"{attribute} Skills"),
        *[
            display_function(skill_name, attribute.lower())
            for skill_name in ATTRIBUTE_SKILLS[attribute.lower()]
        ],
    ])
