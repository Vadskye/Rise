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
    number_reminder,
    option,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    text_input,
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
            *(proficiencies() if destination == "roll20" else []),
            div({"class": "section-header"}, "Armor"),
            armor(destination, "Body armor"),
            armor(destination, "Shield"),
            div({"class": "section-header"}, "Weapons"),
            div({"class": "weapons-explanation"}, f"""
                As a reminder, your magical✨ power is {number_reminder("magical_power")}and your mundane power is {number_reminder("mundane_power")}.
            """),
            weapons(destination),
            div({"class": "section-header"}, "Legacy Item"),
            legacy_item(destination),
            div({"class": "section-header"}, "Attunement Abilities and Equipment"),
            # Maximum number of attunement points: 
            # 4 from sorcerer
            # 2 from level progression
            # 2 from two archetypes that each grant an attunement point
            # Anyone with eight attunement points would almost certainly have at
            # least two deep attunements, right? Hopefully?
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
                else [attunement() for _ in range(6)],
            ),
            div({"class": "section-header"}, "Inventory"),
            wealth_items(),
            textarea({"class": "inventory", "name": "inventory"}),
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
    return [
        div({"class": "section-header"}, "Proficiences"),
        flex_row(
            {"class": "proficiencies"},
            [
                flex_col({"class": "class-proficiencies"}, [
                labeled_text_input(
                    "Base class",
                    input_attributes={"readonly": True, "name": "base_class_proficiencies"},
                ),
                labeled_text_input(
                    "Weapons", input_attributes={"name": "weapon_groups"}
                ),
                ]),
                labeled_textarea(
                    "Other proficiencies", input_attributes={"name": "other_proficiencies"}
                ),
            ],
        )
    ]


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

    body_armor_dr = labeled_number_input(
        "DR",
        {
            "class": "armor-damage-resistance",
            "title": "Not including any attuned effects",
        },
        input_attributes={"name": parseable_type + "_damage_resistance"},
    )
    shield_reflex = labeled_number_input(
        "Ref",
        {
            "class": "shield-reflex",
        },
        input_attributes={"name": parseable_type + "_reflex"},
    )
    body_armor_vitals = labeled_number_input(
        "Vital rolls",
        {"class": "armor-vital-rolls"},
        input_attributes={"name": parseable_type + "_vital_rolls"},
    )

    return flex_row(
        {"class": "armor-definition"},
        [
            labeled_text_input(
                armor_type + " name",
                {"class": "name"},
                {"name": parseable_type + "_name"},
            ),
            labeled_number_input(
                "AD",
                {"class": "armor-defense"},
                input_attributes={"name": parseable_type + "_defense"},
            ),
            (
                body_armor_dr
                if armor_type == "Body armor"
                else shield_reflex
            ),
            (
                body_armor_vitals
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
                    "Speed mod",
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
                else labeled_text_input("Usage class", {"class": "usage-class"})
            ),
        ],
    )


def weapons(destination):
    return div({"class": "weapons"}, [weapon(str(i), destination) for i in range(4)])


def weapon(i, destination):
    if destination == "paper":
        return paper_weapon()
    else:
        return roll20_weapon(i)

def roll20_weapon(i):
    return flex_col(
        {"class": "weapon"},
        [
            flex_row(
                {"class": "weapon-input"},
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
                    "Base damage",
                    {"class": "weapon-damage-dice"},
                    {"name": f"weapon_{i}_damage_dice"},
                ),
                labeled_text_input(
                    "Extra damage",
                    {"class": "weapon-damage-dice"},
                    {"name": f"weapon_{i}_extra_damage"},
                ),
                underlabeled_checkbox(
                    "Two-handed?",
                    None,
                    {"class": "is-heavy", "name": f"weapon_{i}_heavy"},
                ),
                underlabeled_checkbox(
                    "Ignore power for damage?",
                    None,
                    {"class": "ignore-power", "name": f"weapon_{i}_ignore_power"},
                ),
            ]),
            flex_row(
                {"class": "weapon-calcs"},
                [
                labeled_text_input(
                    "Tags", {"class": "weapon-tags"}, {"name": f"weapon_{i}_tags"}
                ),
                flex_row({"class": "calculated-weapon-damage"}, [
                    labeled_text_input(
                        "Magical damage",
                        {"class": "weapon-damage-dice"},
                        input_attributes={"readonly": True, "name": f"weapon_{i}_magical_damage_total"},
                    ),
                    labeled_text_input(
                        "Mundane damage",
                        {"class": "weapon-damage-dice"},
                        input_attributes={"readonly": True, "name": f"weapon_{i}_mundane_damage_total"},
                    ),
                ]),
            ]),
        ]
    )

def paper_weapon():
    return flex_row(
        {"class": "weapon"},
        [
            labeled_text_input(
                "Name", {"class": "weapon-name"},
            ),
            labeled_number_input(
                "Accuracy",
                {"class": "weapon-accuracy"},
            ),
            labeled_text_input(
                "Magical damage",
                {"class": "weapon-damage-dice"},
            ),
            labeled_text_input(
                "Mundane damage",
                {"class": "weapon-damage-dice"},
            ),
            labeled_text_input(
                "Tags", {"class": "weapon-tags"},
            ),
        ],
    )

def wealth_items():
    return flex_row(
        {"class": "wealth-items"},
        [
            calc_weight_limits(),
            span({"class": "wealth-items-label"}, "Wealth items"),
            *[wealth_item_of_rank(i) for i in range(1, 8)],
            labeled_text_input(
                "Currency",
                {"class": "currency"},
                {"name": "currency"},
            ),
        ],
    )

def wealth_item_of_rank(rank):
        return labeled_number_input(
            f"Rank {rank}",
            {"class": "wealth-item"},
            {"name": f"wealth_item_rank_{rank}"},
        )

def calc_weight_limits():
    return flex_row(
        {"class": "weight-limits"},
        [
            labeled_text_input(
                "Carrying Weight Limit",
                input_attributes={
                    "readonly": True,
                    "name": "carrying_weight_limit_category",
                },
            ),
            labeled_text_input(
                "Push/Drag Weight Limit",
                input_attributes={
                    "readonly": True,
                    "name": "push_drag_weight_limit_category",
                },
            ),
        ],
    )
