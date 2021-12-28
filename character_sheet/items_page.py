from cgi_simple import (
    button,
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    label,
    labeled_number_input,
    labeled_text_input,
    number_input,
    option,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    this_or_that,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)


def create_page(destination):
    return flex_col(
        {"class": "page items-page"},
        [
            div({"class": "tab-explanation"}, """
                This tab is used to track your equipment, inventory, and attunements to both items and spells.
            """),
            div({"class": "section-header"}, "Legacy Item"),
            legacy_item(),
            div({"class": "section-header"}, "Body Armor"),
            body_armor(destination),
            div({"class": "section-header"}, "Weapons"),
            *weapons(destination),
            div({"class": "section-header"}, "Attunement Abilities and Equipment"),
            *(
                [
                    attuned_effects_tracker(),
                    fieldset(
                    {"class": "repeating_attunements"},
                    attunement(),
                )]
                if destination == "roll20" else
                [attunement() for i in range(8)]
            ),
            div({"class": "section-header"}, "Non-Attunement Equipment"),
            *(
                [fieldset(
                    {"class": "repeating_equipment"},
                    equipment(),
                )]
                if destination == "roll20" else
                [equipment() for i in range(3)]
            ),
            div({"class": "section-header"}, "Inventory"),
            textarea({"name": "inventory"}),
        ],
    )


def attuned_effects_tracker():
    return sidelabel(
        "Attuned effects",
        flex_row(
            [
                underlabel("Current", number_input(
                    {
                        "disabled": True,
                        "name": "active_attuned_effects_display",
                        "value": "@{active_attunement_count}",
                    }
                )),
                span({"class": "equation-glue"}, "/"),
                underlabel("Max", number_input(
                    {
                        "disabled": True,
                        "name": "attunement_points_maximum_display",
                        "value": "@{attunement_points_maximum}",
                    }
                )),
            ],
        ),
        {"class": "attune-points"},
    )


def attunement():
    return flex_row(
        {"class": "attunement"},
        [
            labeled_text_input(
                "Name",
                {"class": "attunement-name"},
                {"name": "attunement_name"},
            ),
            labeled_text_input(
                "Effect",
                {"class": "attunement-effect"},
                {"name": "attunement_effect"},
            ),
            underlabeled_checkbox(
                "Active?",
                None,
                {"class": "is-active", "name": "attunement_active"},
            ),
        ],
    )

def equipment():
    return flex_row(
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
    )

def legacy_item():
    return flex_row(
        {"class": "attunement"},
        [
            labeled_text_input(
                "Name",
                {"class": "attunement-name"},
                {"name": "legacy_item_name"},
            ),
            labeled_text_input(
                "Effect",
                {"class": "attunement-effect"},
                {"name": "legacy_item_effect"},
            )
        ],
    )

def body_armor(destination):
    return flex_row(
        {"class": "attunement"},
        [
            labeled_text_input(
                "Name",
                {"class": "attunement-name"},
                {"name": "body_armor_name"},
            ),
            (
                underlabel(
                    "Usage Class",
                    select(
                        {'name': 'body_armor_usage_class'},
                        [
                            option({'value': 'none'}, ''),
                            option({'value': 'light'}, 'Light'),
                            option({'value': 'medium'}, 'Medium'),
                            option({'value': 'heavy'}, 'Heavy'),
                        ],
                    ),
                    {"class": "usage-class-dropdown"},
                )
                if destination == "roll20" else
                labeled_text_input("Usage Class", {"class": "usage-class"})
            ),
            labeled_text_input(
                "Effect",
                {"class": "attunement-effect"},
                {"name": "body_armor_effect"},
            )
        ],
    )

def weapons(destination):
    return [weapon(i) for i in range(3)]

def weapon(i):
    i = str(i)
    return flex_row({"class": "weapon"}, [
        labeled_text_input("Name", {"class": "weapon-name"}, {"name": f"weapon_{i}_name"}),
        labeled_number_input("Accuracy", {"class": "weapon-accuracy"}, {"name": f"weapon_{i}_accuracy"}),
        labeled_text_input("Damage", {"class": "weapon-damage-dice"}, {"name": f"weapon_{i}_damage_dice"}),
        labeled_text_input("Magical", {"class": "calculated-weapon-damage-dice"}, {"class": "readonly-disabled", "name": f"weapon_{i}_magical_dice", "readonly": True}),
        labeled_text_input("Mundane", {"class": "calculated-weapon-damage-dice"}, {"class": "readonly-disabled", "name": f"weapon_{i}_mundane_dice", "readonly": True}),
        labeled_text_input("Tags", {"class": "weapon-tags"}, {"name": f"weapon_{i}_tags"}),
        labeled_text_input("Effects", {"class": "weapon-effects"}, {"name": f"weapon_{i}_effects"}),
    ])

