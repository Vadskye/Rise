from cgi_simple import (
    div,
    equation,
    plus,
    ensure_valid_attributes_and_contents,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_text_input,
    number_input,
    textarea,
    text_input,
    underlabel,
)
from second_page import equation_misc_repeat


def create_page(destination):
    return flex_col(
        {"class": "page third-page"},
        [
            div(
                {"class": "tab-explanation"},
                """
            This tab is used to track fundamental aspects of your character's identity, as well as the things they carry with them.
            It's a good place to record choices that you've made, such as the specific mystic spheres or combat styles that you have access to.
        """,
            ),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            basic_info(),
                            archetypes(),
                            feats_summary(),
                            div(
                                {"class": "section-header goals-and-flaws"},
                                "Goals and Flaws",
                            ),
                            "".join(
                                [
                                    div(text_input({"name": f"goals_and_flaws_{i}"}))
                                    for i in range(3)
                                ]
                            ),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            roll20_abilities_summary()
                            if destination == "roll20"
                            else paper_abilities_summary(),
                            div({"class": "section-header"}, "Abilities Known"),
                            calc_maneuvers(),
                            calc_spells(),
                            calc_spheres(),
                            div({"class": "section-header"}, "Abilities Chosen"),
                            textarea(
                                {
                                    "class": "all-abilities-known",
                                    "name": "abilities_chosen",
                                }
                            ),
                            personality(),
                        ],
                    ),
                ]
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
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities"),
            fieldset(
                {"class": "repeating_passiveabilities"},
                passive_ability(),
            ),
        ],
    )


def passive_ability():
    return flex_row(
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
        ]
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


def archetypes():
    return "".join(
        [
            div({"class": "section-header"}, "Archetypes"),
            *[
                flex_row(
                    {"class": "archetype"},
                    [
                        labeled_text_input(
                            "Name",
                            {"class": "archetype-name"},
                            {"name": f"archetype_name_{i}"},
                        ),
                        underlabel(
                            "Rank",
                            number_input({"name": f"archetype_rank_{i}"}),
                        ),
                    ],
                )
                for i in range(3)
            ],
        ]
    )


def personality():
    return div(
        [
            div({"class": "section-header"}, "Personal Info"),
            flex_row(
                {"class": "personal-info-row"},
                [
                    labeled_text_input(
                        "Alignment", input_attributes={"name": f"alignment"}
                    ),
                    labeled_text_input(
                        "Patron Deity", input_attributes={"name": f"deity"}
                    ),
                    labeled_text_input(
                        "Experience points", input_attributes={"name": "experience"}
                    ),
                ],
            ),
            div({"class": "section-header"}, "Personality and Background"),
            textarea({"class": "personality", "name": "personality_and_background"}),
        ]
    )


def calc_maneuvers():
    return flex_row(
        [
            div({"class": "calc-header"}, "Maneuvers"),
            equation(
                [
                    underlabel(
                        "Insight",
                        number_input(
                            {
                                "name": "maneuvers_known_insight_points",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("maneuvers_known", 4),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "maneuvers_known_display",
                    "value": "@{maneuvers_known}",
                },
            ),
        ]
    )


def calc_spells():
    return flex_row(
        [
            div({"class": "calc-header"}, "Spells"),
            equation(
                [
                    underlabel(
                        "Insight",
                        number_input(
                            {
                                "name": "spells_known_insight_points",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("spells_known", 4),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "spells_known_display",
                    "value": "@{spells_known}",
                },
            ),
        ]
    )


def calc_spheres():
    return flex_row(
        [
            div({"class": "calc-header"}, "Spheres"),
            equation(
                [
                    underlabel(
                        "1/2 Insight",
                        number_input(
                            {
                                "name": "spheres_known_insight_points",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("spheres_known", 4),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "spheres_known_display",
                    "value": "@{spheres_known}",
                },
            ),
        ]
    )
