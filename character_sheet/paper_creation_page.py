from cgi_simple import (
    div,
    flex_col,
    flex_row,
    labeled_textarea,
    labeled_text_input,
)
from paper.calc_resources import calc_resources
from paper.calculation_blocks import calc_offense, calc_defense



def create_page(_destination: str) -> str:
    return flex_col(
        {"class": "page creation-page"},
        flex_row([
            creation_guidance(),
            calculations(),
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
            self_class_textarea("Proficiencies"),
            self_class_textarea("Archetypes"),
            self_class_textarea("Abilities chosen"),
            self_class_textarea("Character description"),
            labeled_text_input("Alignment"),
            self_class_textarea("Feats"),
        ],
    )

def self_class_textarea(name: str) -> str:
    parseable_name = name.lower().replace(" ", "-")
    return labeled_textarea(
        name,
        {"class": parseable_name + "-wrapper"},
        input_attributes={"class": parseable_name}
    )

def calculations():
    return div(
        {"class": "calculations"},
        [
            calc_offense(),
            calc_defense(),
            div({"class": "section-header"}, "Resources"),
            flex_row({"class": "resources"}, [
                calc_resources(),
            ]),
        ],
    )
