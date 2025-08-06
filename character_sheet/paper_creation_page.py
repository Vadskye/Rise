from cgi_simple import (
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_text_input,
    labeled_number_input,
    li,
    minus,
    number_input,
    ol,
    option,
    p,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    text_input,
    ul,
    underlabel,
    underlabeled_checkbox,
)

from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    ATTRIBUTES,
    SUBSKILLS,
)
from attribute_page import (
    calc_resources
)
import re


def create_page(destination):
    return flex_col(
        {"class": "page creation-page"},
        flex_row([
            creation_guidance(),
            abilities(),
            div({"class": "page-number"}, "Page 2"),
        ]),
    )


def creation_guidance():
    return flex_col(
        {"class": "creation-guidance"},
        [
            div({"class": "section-header"}, "Character Creation"),
            labeled_text_input("Concept"),
            self_class_textarea("Motivation and goals"),
            flex_row({"class": "species-and-size"}, [
                labeled_text_input("Species", {"class": "species"}),
                labeled_text_input("Size", {"class": "size"}),
            ]),
            labeled_text_input("Base class"),
            self_class_textarea("Equipment proficiencies"),
            self_class_textarea("Archetypes"),
            self_class_textarea("Combat styles and mystic spheres"),
            self_class_textarea("Background"),
            self_class_textarea("Description"),
            labeled_text_input("Alignment"),
            self_class_textarea("Feats"),
        ],
    )

def self_class_textarea(name):
    parseable_name = name.lower().replace(" ", "-")
    return labeled_textarea(
        name,
        {"class": parseable_name + "-wrapper"},
        input_attributes={"class": parseable_name}
    )

def abilities():
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities and Traits"),
            *[passive_ability() for i in range(14)],
            div({"class": "section-header"}, "Resources"),
            flex_row({"class": "resources"}, [
                calc_resources(),
                self_class_textarea("Abilities chosen"),
            ]),
        ],
    )

def passive_ability():
    return flex_row(
        [
            labeled_text_input(
                "Name",
                {"class": "ability-name"},
            ),
            labeled_text_input(
                "Effect",
                {"class": "ability-effects"},
            ),
        ]
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
