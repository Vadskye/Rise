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
            {"class": "calc-skills"},
            [
                div({"class": "section-header"}, "Skills"),
                skill_labels(),
                *[
                    calc_skill(skill_name, "strength")
                    for skill_name in ATTRIBUTE_SKILLS["strength"]
                ],
                skill_labels(),
                *[
                    calc_skill(skill_name, "dexterity")
                    for skill_name in ATTRIBUTE_SKILLS["dexterity"]
                ],
                *[
                    calc_skill(skill_name, "constitution")
                    for skill_name in ATTRIBUTE_SKILLS["constitution"]
                ],
                skill_labels(),
                *[
                    calc_skill(skill_name, "intelligence")
                    for skill_name in ATTRIBUTE_SKILLS["intelligence"]
                ],
                skill_labels(),
                *[
                    calc_skill(skill_name, "perception")
                    for skill_name in ATTRIBUTE_SKILLS["perception"]
                ],
                *[
                    calc_skill(skill_name, "constitution")
                    for skill_name in ATTRIBUTE_SKILLS["willpower"]
                ],
                skill_labels(),
                *[
                    calc_skill(skill_name)
                    for skill_name in ATTRIBUTE_SKILLS["other"]
                ],
                flex_row(
                    {"class": "skill-row"},
                    [
                        div({"class": "skill-name"}, "Points spent"),
                        number_input(
                            {
                                "class": "skill-points-spent",
                                "disabled": True,
                                "name": "skill_points_spent_display",
                                "value": "@{skill_points_spent}",
                            }
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


def calc_skill(skill_name, attribute=None, blank_input=False):
    visible_skill_name = re.sub('\\d', '', skill_name).title()
    skill_parsable = skill_name.lower().replace(" ", "_")
    return flex_row(
        {"class": "skill-row"},
        [
            div(
                {"class": f'skill-name{" blank-input" if blank_input else ""}'},
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
            number_input({"class": "skill-points", "name": skill_parsable + "_points"}),
            flex_wrapper(
                text_input(
                    {
                        "class": "skill-training",
                        "disabled": True,
                        "name": f"${skill_parsable}_training_display",
                        "value": "@{" + skill_parsable + "_training}",
                    }
                ),
            ),
            flex_wrapper(
                checkbox(
                    {
                        "class": "is-class-skill",
                        "name": skill_parsable + "_class_skill",
                    }
                ),
            ),
            equation_misc_repeat(skill_parsable, 2, lambda: ""),
        ],
    )
