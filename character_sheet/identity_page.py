from __future__ import annotations
from cgi_simple import (
    checkbox,
    div,
    ensure_valid_attributes_and_contents,
    flex_col,
    flex_row,
    labeled_textarea,
    labeled_number_input,
    labeled_text_input,
    textarea,
    text_input,
)
from sheet_data import KNOWABLE_CONCEPTS
from get_modifier_key import get_modifier_key


def create_page(destination: str) -> str:
    return flex_col(
        {"class": "page identity-page"},
        [
            div(
                {"class": "tab-explanation"},
                """
                    This tab is used to track fundamental aspects of your character's identity.
                    It's a good place to record choices that you've made, such as the specific mystic spheres or combat styles that you have access to.
                """,
            ),
            roll20_abilities_summary()
            if destination == "roll20"
            else paper_abilities_summary(),
            div({"class": "section-header"}, "Abilities Known"),
            abilities_known(),
            div({"class": "section-header"}, "Insight Points"),
            flex_row(
                {"class": "insight-points-row"},
                [
                    labeled_text_input(
                        "Total",
                        input_attributes={"readonly": True, "name": "insight_points"},
                    ),
                    textarea({"name": "insight_points_tracking"}),
                ],
            ),
            div({"class": "section-header"}, "Abilities Chosen"),
            textarea(
                {
                    "class": "all-abilities-known",
                    "name": "abilities_chosen",
                }
            ),
        ],
    )


def basic_info() -> str:
    return "".join(
        [
            div({"class": "section-header"}, "Species Info"),
            labeled_text_input("Species", input_attributes={"name": "species"}),
            labeled_text_input("Size", input_attributes={"name": "size"}),
            labeled_text_input(
                "Languages known", input_attributes={"name": "language_proficiencies"}
            ),
            div({"class": "section-header"}, "Class Info"),
            labeled_text_input("Class", input_attributes={"name": "class"}),
            labeled_textarea(
                "Armor proficiencies", input_attributes={"name": "prof_armor"}
            ),
            labeled_textarea(
                "Weapon groups", input_attributes={"name": "weapon_proficiencies_1"}
            ),
        ]
    )


def feats_summary() -> str:
    return "".join(
        [
            div({"class": "section-header"}, "Feats"),
            "".join([feat_row(i) for i in range(4)]),
        ]
    )


def paper_abilities_summary() -> str:
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities"),
            *[passive_ability() for _ in range(10)],
        ],
    )


def roll20_abilities_summary() -> str:
    # Roll20 tracks passive abilities on the active abilities page.
    # TODO: clean up that naming...
    return div()


def passive_ability() -> str:
    return flex_row(
        {"class": "passive-ability-row"},
        [
            labeled_text_input(
                "Name",
                {"class": "ability-name"},
                input_attributes={
                    "name": "ability_name",
                },
            ),
            labeled_text_input(
                "Effects",
                {"class": "ability-effects"},
                input_attributes={
                    "name": "ability_effects",
                },
            ),
        ],
    )


def feat_row(i: int) -> str:
    return flex_row(
        {"class": "summary-row"},
        [
            div({"class": "summary-row-name"}, text_input({"name": f"feat_name_{i}"})),
        ],
    )


def subsection_header(
    attributes: dict[str, object] | None = None,
    contents: str | list[str] | None = None,
) -> str:
    final_attributes, final_contents = ensure_valid_attributes_and_contents(
        attributes, contents
    )
    final_attributes["class"] = "subsection-header " + str(
        final_attributes.get("class", "")
    )
    return flex_col(final_attributes, final_contents)


def abilities_known() -> str:
    return flex_row(
        {"class": "abilities-known"}, [ability_known(c) for c in KNOWABLE_CONCEPTS]
    )


def ability_known(concept: str) -> str:
    parseable_concept = get_modifier_key(concept)

    return flex_row(
        {"class": "ability-known"},
        [
            checkbox(
                {
                    "class": "has-ability-known hidden",
                    "name": f"has_{parseable_concept}",
                }
            ),
            labeled_number_input(
                concept,
                {"class": "ability-known-count"},
                input_attributes={
                    "readonly": True,
                    "name": parseable_concept,
                },
            ),
        ],
    )
