from cgi_simple import (
    div,
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


def create_page(_destination):
    return flex_col({"class": "page third-page"}, [
        div({"class": "tab-explanation"}, """
            This tab is used to track fundamental aspects of your character's identity, as well as the things they carry with them.
            It is a good place to record choices that you've made, such as the specific mystic spheres and combat styles that you have access to.
        """),
        flex_row([
            flex_col(
                {"class": "sidebar"},
                [
                    basic_info(),
                    archetypes(),
                    feats_summary(),
                    div({"class": "section-header"}, "Personal Info"),
                    labeled_text_input("Alignment", input_attributes={"name": f"alignment"}),
                    labeled_text_input("Deity", input_attributes={"name": f"deity"}),
                    labeled_text_input(
                        "Experience points", input_attributes={"name": "experience"}
                    ),
                    div({"class": "section-header goals-and-flaws"}, "Goals and Flaws"),
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
                    abilities_summary(),
                    equipment(),
                    div({"class": "section-header"}, "List of Abilities Known"),
                    textarea({"class": "all-abilities-known", "name": "all_abilities_known"}),
                    inventory(),
                    personality(),
                ],
            ),
        ]),
    ])


def basic_info():
    return "".join([
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
    ])


def feats_summary():
    return "".join([
        div({"class": "section-header"}, "Feats"),
        "".join([feat_row(i) for i in range(4)]),
    ])


def abilities_summary():
    return div(
        {"class": "abilities"},
        [
            div({"class": "section-header"}, "Passive Abilities and Ability Choices"),
            fieldset(
                {"class": "repeating_passiveabilities"},
                flex_row(
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
                ),
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


def equipment():
    return div(
        {"class": "equipment"},
        [
            div({"class": "section-header"}, "Non-Attuned Equipment"),
            fieldset(
                {"class": "repeating_equipment"},
                flex_row(
                    [
                        labeled_text_input(
                            "Name",
                            {"class": "equipment-name"},
                            {"name": f"equipment_name"},
                        ),
                        labeled_text_input(
                            "Effects",
                            {"class": "equipment-effects"},
                            {"name": f"equipment_effects"},
                        ),
                    ]
                ),
            ),
        ],
    )


def archetypes():
    return "".join([
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
    ])

def misc_equipment(body_slot, body_slot_html=None):
    if body_slot_html is None:
        body_slot_html = body_slot.lower()
    return flex_row(
        {"class": body_slot_html},
        [
            subsection_header(body_slot),
            labeled_text_input(
                "Name", {"class": "equipment-name"}, {"name": body_slot_html + "-name"}
            ),
            labeled_text_input(
                "Special",
                {"class": "equipment-special"},
                {"name": body_slot_html + "-special"},
            ),
        ],
    )


def personality():
    return div(
        [
            div({"class": "section-header"}, "Personality and Background"),
            textarea({"class": "personality", "name": "personality_and_background"}),
        ]
    )

def inventory():
    return div(
        {"class": "inventory"},
        [
            div({"class": "section-header"}, "Inventory"),
            textarea({"name": "inventory"}),
        ],
    )
