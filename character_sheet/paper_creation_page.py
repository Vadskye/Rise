from cgi_simple import (
    div,
    flex_col,
    flex_row,
    labeled_textarea,
    labeled_text_input,
)
from paper.calc_resources import calc_resources



def create_page(_destination: str) -> str:
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
            self_class_textarea("Proficiencies"),
            self_class_textarea("Archetypes"),
            self_class_textarea("Combat styles and mystic spheres"),
            self_class_textarea("Background"),
            self_class_textarea("Description"),
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

def abilities():
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities and Traits"),
            *[passive_ability() for _ in range(14)],
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
