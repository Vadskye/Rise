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
    labeled_textarea,
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
from status_page import custom_modifier


def create_page(destination):
    return flex_col(
        {"class": "page items-page"},
        [
            div(
                {"class": "tab-explanation"},
                """
                This tab is used to track your equipment, inventory, and attunements to both items and spells.
            """,
            ),
            div({"class": "section-header"}, "Inventory"),
            textarea({"class": "inventory", "name": "inventory"}),
            # TODO: add weight limits here?
            div({"class": "section-header"}, "Proficiences"),
            proficiencies(),
            div({"class": "section-header"}, "Armor"),
            armor(destination, "Body armor"),
            armor(destination, "Shield"),
            div({"class": "section-header"}, "Weapons"),
            *weapons(destination),
            div({"class": "section-header"}, "Legacy Item"),
            legacy_item(destination),
            div({"class": "section-header"}, "Attunement Abilities and Equipment"),
            div(
                {"class": "attunement-abilities"},
                [
                    attuned_effects_tracker(),
                    fieldset(
                        {"class": "repeating_attunedmodifiers"},
                        custom_modifier(show_toggle="deep", show_text=True),
                    ),
                ]
                if destination == "roll20"
                else [attunement() for _ in range(8)],
            ),
        ],
    )


def attuned_effects_tracker():
    return sidelabel(
        "Attuned effects",
        flex_row(
            [
                underlabel(
                    "Current",
                    number_input(
                        {
                            "disabled": True,
                            "name": "active_attuned_effects_display",
                            "value": "@{active_attunement_count}",
                        }
                    ),
                ),
                span({"class": "equation-glue"}, "/"),
                underlabel(
                    "Max",
                    number_input(
                        {
                            "disabled": True,
                            "name": "attunement_points_maximum_display",
                            "value": "@{attunement_points_maximum}",
                        }
                    ),
                ),
                number_input({"class": "hidden", "name": "active_attunement_count", "readonly": True}),
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
                {"class": "name"},
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


def proficiencies():
    return flex_row(
        {"class": "proficiencies"},
        [
            labeled_text_input(
                "Base class",
                input_attributes={"readonly": True, "name": "base_class_proficiencies"},
            ),
            labeled_text_input(
                "Weapon groups", input_attributes={"name": "weapon_groups"}
            ),
            labeled_text_input(
                "Other proficiencies", input_attributes={"name": "other_proficiencies"}
            ),
        ],
    )


def legacy_item(destination):
    text_shape = labeled_textarea if destination == "paper" else labeled_text_input
    return flex_row(
        {"class": "attunement legacy-item"},
        [
            labeled_text_input(
                "Name",
                {"class": "name"},
                {"name": "legacy_item_name"},
            ),
            text_shape(
                "Effects",
                {"class": "attunement-effect"},
                {"class": "legacy-item-effect", "name": "legacy_item_effect"},
            ),
            fieldset(
                {"class": "repeating_legacymodifiers"},
                custom_modifier(show_toggle=False, show_text=False),
            ),
        ],
    )


def armor(destination, armor_type):
    parseable_type = armor_type.lower().replace(" ", "_")

    return flex_row(
        {"class": "armor-definition"},
        [
            labeled_text_input(
                armor_type + " name",
                {"class": "name"},
                {"name": parseable_type + "_name"},
            ),
            labeled_number_input(
                "+AD",
                {"class": "armor-defense"},
                input_attributes={"name": parseable_type + "_defense"},
            ),
            (
                labeled_number_input(
                    "+DR",
                    {
                        "class": "armor-damage-resistance",
                        "title": "Not including any attuned effects",
                    },
                    input_attributes={"name": parseable_type + "_damage_resistance"},
                )
                if armor_type == "Body armor"
                else div()
            ),
            labeled_number_input(
                "Encumbrance",
                {"class": "armor-encumbrance"},
                input_attributes={"name": parseable_type + "_encumbrance"},
            ),
            (
                labeled_number_input(
                    "Speed",
                    {"class": "armor-speed"},
                    input_attributes={"name": parseable_type + "_speed"},
                )
                if armor_type == "Body armor"
                else div()
            ),
            (
                underlabel(
                    "Usage Class",
                    select(
                        {"name": parseable_type + "_usage_class"},
                        [
                            option({"value": "none"}, ""),
                            option({"value": "light"}, "Light"),
                            option({"value": "medium"}, "Medium"),
                            option({"value": "heavy"}, "Heavy"),
                        ],
                    ),
                    {"class": "usage-class-dropdown"},
                )
                if destination == "roll20"
                else labeled_text_input("Usage Class", {"class": "usage-class"})
            ),
        ],
    )


def weapons(destination):
    return [weapon(i) for i in range(3)]


def weapon(i):
    i = str(i)
    return flex_row(
        {"class": "weapon"},
        [
            labeled_text_input(
                "Name", {"class": "weapon-name"}, {"name": f"weapon_{i}_name"}
            ),
            labeled_number_input(
                "Accuracy",
                {"class": "weapon-accuracy"},
                {"name": f"weapon_{i}_accuracy"},
            ),
            labeled_text_input(
                "Magical Damage",
                {"class": "weapon-damage-dice"},
                {"name": f"weapon_{i}_magical_damage_dice"},
            ),
            labeled_text_input(
                "Mundane Damage",
                {"class": "weapon-damage-dice"},
                {"name": f"weapon_{i}_mundane_damage_dice"},
            ),
            labeled_text_input(
                "Tags", {"class": "weapon-tags"}, {"name": f"weapon_{i}_tags"}
            ),
            labeled_text_input(
                "Effects", {"class": "weapon-effects"}, {"name": f"weapon_{i}_effects"}
            ),
        ],
    )
