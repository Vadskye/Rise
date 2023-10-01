from cgi_simple import (
    checkbox,
    div,
    equation,
    equation_misc,
    equation_misc_repeat,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_text_input,
    minus,
    number_input,
    plus,
    span,
    text_input,
    underlabel,
)
from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    ATTRIBUTES,
    ROLL20_CALC,
    SUBSKILLS,
)
from sheet_worker import standard_damage_at_power


def create_page(destination):
    return flex_col(
        {"class": "page second-page"},
        [
            div(
                {"class": "page-explanation"},
                """
                    This page is used to track your core character statistics.
                    There are open spaces in each equation so you can add custom modifiers for each statistic.
                    Each custom modifier has a small text box underneath it that you can use to remind yourself why that modifier exists.
                """,
            ),
            flex_row(
                [
                    flex_col(
                        {"class": "sidebar"},
                        [
                            div({"class": "section-header"}, "Core Statistics"),
                            calc_land_speed(),
                            calc_unknown_statistic(),
                            div({"class": "section-header"}, "Resources"),
                            calc_attunement_points(),
                        ],
                    ),
                    flex_col(
                        {"class": "main-body"},
                        [
                            flex_col(
                                {"class": "statistics"},
                                [
                                    div(
                                        {"class": "section-header"},
                                        "Defenses",
                                    ),
                                    calc_defenses(),
                                    div(
                                        {"class": "section-header"},
                                        "Survival Statistics",
                                    ),
                                    calc_survival(),
                                    div(
                                        {"class": "section-header"},
                                        "Offensive Statistics",
                                    ),
                                    calc_weapon_damage_dice(),
                                ],
                            ),
                        ],
                    ),
                ],
            ),
        ],
    )


def calc_attributes():
    return flex_col(
        {"class": "calc-attributes"},
        [
            div({"class": "section-header attributes-header"}, "Attributes"),
            "".join([calc_attribute(attribute) for attribute in ATTRIBUTES]),
        ],
    )


def abilities(name_prefix):
    return flex_col(
        {"class": "abilities"},
        [
            flex_wrapper(
                div({"class": "ability-header chart-header"}, "Feats and Abilities")
            ),
            "".join(
                [
                    text_input(
                        {
                            "class": "level" + str(level),
                            "name": "ability-name-" + name_prefix + "-" + str(level),
                        }
                    )
                    for level in range(1, 14)
                ]
            ),
        ],
    )


def calc_damage_resistance():
    return flex_row(
        [
            div({"class": "calc-header"}, "DR"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Base",
                        number_input(
                            {
                                "disabled": True,
                                "name": "damage_resistance_base",
                                "value": "(@{damage_resistance_from_level})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Armor",
                        number_input(
                            {
                                "name": "damage_resistance_armor",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("damage_resistance", 4),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "damage_resistance_display",
                    "value": "(@{damage_resistance_maximum})",
                },
            ),
        ],
    )


def calc_attunement_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Attune Points"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "attunement_points_from_class",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("attunement_points", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "attunement_points_display",
                    "value": "@{attunement_points_maximum}",
                },
            ),
        ]
    )


def calc_damage_resistance_level():
    return flex_row(
        [
            div({"class": "calc-header"}, "DR Level"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Level",
                        number_input(),
                    ),
                    plus(),
                    underlabel(
                        "Class",
                        number_input(),
                    ),
                    plus(),
                    equation_misc_repeat("damage_resistance_level", 4),
                ],
            ),
        ]
    )


def calc_power(power_type):
    return flex_row(
        [
            div({"class": "calc-header"}, f"{power_type} Power"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input({"name": "class_power"}),
                    ),
                    plus(),
                    equation_misc_repeat("power", 4),
                ],
            ),
        ]
    )


def calc_vital_rolls():
    return flex_row(
        [
            div({"class": "calc-header"}, "Vital Rolls"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "vital_roll_class",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("vital_rolls", 2),
                    minus(),
                    underlabel(
                        "Wounds",
                        number_input(
                            {
                                "disabled": True,
                                "name": "vital_wound_count_display",
                                "value": "@{vital_wound_count}*2",
                            }
                        ),
                    ),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "vital_rolls_display",
                    "value": "@{vital_rolls}",
                },
            ),
        ]
    )


def calc_weapon_damage_dice():
    return flex_row(
        [
            div({"class": "calc-header"}, "Strike Damage"),
            equation(
                [
                    equation_misc_repeat("weapon_damage_dice", 5),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "weapon_damage_dice_display",
                    "value": "@{weapon_damage_dice}",
                },
                result_label="Total +d",
            ),
        ]
    )


def calc_unknown_statistic():
    return flex_row(
        [
            div(
                {"class": "calc-header"}, text_input({"name": "unknown_statistic_name"})
            ),
            equation(
                [
                    equation_misc_repeat("unknown_statistic", 4),
                ],
                result_attributes={
                    "disabled": True,
                    "name": f"unknown_statistic_display",
                    "value": "(@{unknown_statistic})",
                },
            ),
        ]
    )


def calc_land_speed():
    return flex_row(
        [
            div({"class": "calc-header"}, "Land Speed"),
            equation(
                [
                    # These are never actually used in sheet_worker
                    underlabel("Size", number_input({"name": "speed_size"})),
                    minus(),
                    underlabel("Armor", number_input({"name": "speed_armor"})),
                    plus(),
                    equation_misc_repeat("speed", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "land_speed_display",
                    "value": "@{land_speed}",
                },
            ),
        ]
    )


# def calc_strike_damage():
#     return flex_row([
#         div({'class': 'calc-header'}, 'Strike Dmg'),
#         equation(
#             [
#                 underlabel('Lvl/Str', text_input({
#                     'name': 'strike_damage_scaling_display',
#                 })),
#                 plus(),
#                 text_input({
#                     'class': 'equation-misc',
#                     'name': 'strike_damage_misc',
#                 }),
#             ],
#             result_attributes={
#                 'name': 'strike_damage_display',
#             },
#             input_type=text_input,
#         ),
#     ])

# def calc_threat():
#     return flex_row([
#         div({'class': 'calc-header'}, 'Threat'),
#         equation(
#             [
#                 underlabel('Lvl/Str', number_input({
#                     'disabled': True,
#                     'name': 'threat_scaling_display',
#                     'value': '@{threat_scaling}',
#                 })),
#                 plus(),
#                 underlabel('1/2 Armor', number_input({
#                     'disabled': True,
#                     'name': 'threat_armor_display',
#                     'value': '@{threat_armor}',
#                 })),
#                 equation_misc('threat')
#             ],
#             result_attributes={
#                 'disabled': True,
#                 'name': 'threat_display',
#                 'value': '@{threat}',
#             },
#         ),
#     ])


def calc_defenses():
    return div(
        {"class": "defenses"},
        [
            calc_mental(),
        ],
    )

def calc_survival():
    return div(
        {"class": "survival"},
        [
            calc_damage_resistance_level(),
            calc_damage_resistance(),
            calc_vital_rolls(),
        ],
    )


def base_10():
    return number_input({"disabled": "true", "value": "10"})
