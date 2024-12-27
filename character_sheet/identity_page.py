from cgi_simple import (
    checkbox,
    div,
    equation,
    plus,
    ensure_valid_attributes_and_contents,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_number_input,
    labeled_text_input,
    number_input,
    textarea,
    text_input,
    underlabel,
)
from sheet_data import KNOWABLE_CONCEPTS
from get_modifier_key import get_modifier_key

def create_page(destination):
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
            # calc_combat_styles(),
            # calc_maneuvers(),
            # calc_spheres(),
            # calc_spells(),
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


def basic_info():
    return "".join(
        [
            div({"class": "section-header"}, "Species Info"),
            labeled_text_input("Species", input_attributes={"name": f"species"}),
            labeled_text_input("Size", input_attributes={"name": f"size"}),
            labeled_text_input(
                "Languages known", input_attributes={"name": "language_proficiencies"}
            ),
            div({"class": "section-header"}, "Class Info"),
            labeled_text_input("Class", input_attributes={"name": f"class"}),
            labeled_textarea(
                "Armor proficiencies", input_attributes={"name": "prof_armor"}
            ),
            labeled_textarea(
                "Weapon groups", input_attributes={"name": "weapon_proficiencies_1"}
            ),
        ]
    )


def feats_summary():
    return "".join(
        [
            div({"class": "section-header"}, "Feats"),
            "".join([feat_row(i) for i in range(4)]),
        ]
    )


def paper_abilities_summary():
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities"),
            *[passive_ability() for i in range(10)],
        ],
    )


def roll20_abilities_summary():
    # Roll20 tracks passive abilities on the active abilities page.
    # TODO: clean up that naming...
    return div()


def passive_ability():
    return flex_row(
        {"class": "passive-ability-row"},
        [
            labeled_text_input(
                "Name",
                {"class": "ability-name"},
                input_attributes={
                    "name": f"ability_name",
                },
            ),
            labeled_text_input(
                "Effects",
                {"class": "ability-effects"},
                input_attributes={
                    "name": f"ability_effects",
                },
            ),
        ],
    )


def feat_row(i):
    return flex_row(
        {"class": "summary-row"},
        [
            div({"class": "summary-row-name"}, text_input({"name": f"feat_name_{i}"})),
        ],
    )


def subsection_header(attributes=None, contents=None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes["class"] = "subsection-header " + attributes.get("class", "")
    return flex_col(attributes, contents)


def abilities_known():
    return flex_row(
        {"class": "abilities-known"}, [ability_known(c) for c in KNOWABLE_CONCEPTS]
    )


def ability_known(concept):
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
