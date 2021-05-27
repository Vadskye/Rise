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


def create_page(_destination):
    return flex_col(
        {"class": "page items-page"},
        [
            div({"class": "tab-explanation"}, """
                This tab is used to track your equipped items, inventory, and attunements to both items and spells.
            """),
            div({"class": "section-header"}, "Legacy Item"),
            legacy_item(),
            div({"class": "section-header"}, "Attunement Abilities and Equipment"),
            attuned_effects_tracker(),
            fieldset(
                {"class": "repeating_attunements"},
                attunement(),
            ),
            div({"class": "section-header"}, "Non-Attunement Equipment"),
            fieldset(
                {"class": "repeating_equipment"},
                equipment(),
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
    ),

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
