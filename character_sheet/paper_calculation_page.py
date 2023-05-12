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
                            calc_attributes(),
                            div({"class": "section-header"}, "Core Statistics"),
                            calc_encumbrance(),
                            calc_land_speed(),
                            calc_weight_limits(),
                            calc_unknown_statistic(),
                            div({"class": "section-header"}, "Resources"),
                            calc_attunement_points(),
                            calc_fatigue_tolerance(),
                            calc_insight_points(),
                            calc_skill_points(),
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
                                    calc_accuracy(),
                                    calc_blank_accuracy(),
                                    calc_blank_accuracy(),
                                    calc_power("Magical"),
                                    calc_power("Mundane"),
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


def calc_attribute(attribute_name):
    attribute_lower = attribute_name.lower()
    return "".join(
        [
            flex_row(
                {"class": "attribute-calc"},
                [
                    div({"class": "calc-header"}, attribute_name),
                    equation(
                        [
                            underlabel(
                                "Base",
                                number_input(
                                    {
                                        "name": attribute_lower + "_point_buy",
                                    }
                                ),
                            ),
                            plus(),
                            equation_misc_repeat(attribute_lower, 3),
                        ],
                        result_attributes={
                            "disabled": "true",
                            "name": attribute_lower + "_display",
                            "value": "(@{" + attribute_lower + "})",
                        },
                        result_label="Total",
                    ),
                ],
            ),
        ]
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


def calc_weight_limits():
    return flex_row(
        {"class": "weight-limits"},
        [
            div({"class": "calc-header"}, "Weight Limits"),
            labeled_text_input(
                "Carrying",
                input_attributes={
                    "name": "carrying_capacity_display",
                },
            ),
            labeled_text_input(
                "Push/Drag",
                input_attributes={
                    "name": "push_drag_display",
                },
            ),
        ],
    )


def calc_accuracy():
    return flex_row(
        [
            div({"class": "calc-header"}, "Accuracy"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "accuracy_scaling_display",
                                "value": "(floor(@{level}/2))",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Per/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "accuracy_perception_display",
                                "value": "(floor(@{perception} / 2))",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("accuracy", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "accuracy_display",
                    "value": "@{accuracy}",
                },
            ),
        ]
    )

def calc_blank_accuracy():
    return flex_row(
        [
            div({"class": "calc-header"}, text_input({"class": "accuracy_type"}) + " Accuracy"),
            equation(
                [
                    underlabel(
                        "Base",
                        number_input(),
                    ),
                    plus(),
                    equation_misc_repeat("strike_accuracy", 4),
                ],
            ),
        ]
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


def calc_fatigue_tolerance():
    return flex_row(
        [
            div({"class": "calc-header fatigue-tolerance"}, "Fatigue Tolerance"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "fatigue_tolerance_base",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Con",
                        number_input(
                            {
                                "disabled": True,
                                "name": "fatigue_tolerance_con_display",
                                "value": "(@{constitution})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("fatigue_tolerance", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "fatigue_tolerance_display",
                    "value": "@{fatigue_tolerance}",
                },
            ),
        ]
    )


def calc_hit_points_level():
    return flex_row(
        [
            div({"class": "calc-header"}, "HP Level"),
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
                    equation_misc_repeat("hit_points_level", 4),
                ],
            ),
        ]
    )


def calc_hit_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "HP"),
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
                                "name": "hit_points_base",
                                "value": "(@{hit_points_from_level})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("hit_points", 5),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "hit_points_display",
                    "value": "@{hit_points_maximum}",
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


def calc_encumbrance():
    return flex_row(
        [
            div({"class": "calc-header"}, "Encumbrance"),
            equation(
                [
                    underlabel(
                        "Armor", number_input({"name": "body_armor_encumbrance"})
                    ),
                    minus(),
                    underlabel(
                        "Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "encumbrance_strength",
                                "value": "(@{strength})",
                            }
                        ),
                    ),
                    minus(),
                    equation_misc("encumbrance", 0),
                    minus(),
                    equation_misc("encumbrance", 1),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "encumbrance_display",
                    "value": "@{encumbrance}",
                },
            ),
        ]
    )


def calc_defenses():
    return div(
        {"class": "defenses"},
        [
            calc_armor(),
            calc_fort(),
            calc_ref(),
            calc_mental(),
        ],
    )

def calc_survival():
    return div(
        {"class": "survival"},
        [
            calc_hit_points_level(),
            calc_hit_points(),
            calc_damage_resistance_level(),
            calc_damage_resistance(),
            calc_vital_rolls(),
        ],
    )


def calc_skill_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Trained Skills"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "skill_points_base",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Int",
                        number_input(
                            {
                                "disabled": True,
                                "name": "skill_points_intelligence_display",
                                "value": "(@{skill_points_intelligence})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("skill_points", 2),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "skill_points_display",
                    "value": "(@{skill_points})",
                },
            ),
        ]
    )


def calc_insight_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Insight Points"),
            equation(
                [
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "name": "insight_points_base",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Int",
                        number_input(
                            {
                                "disabled": True,
                                "name": "insight_points_intelligence_display",
                                "value": "(@{intelligence})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("insight_points", 2),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "insight_points_display",
                    "value": "(@{insight_points})",
                },
            ),
        ]
    )


def base_10():
    return number_input({"disabled": "true", "value": "10"})


def calc_armor():
    return flex_row(
        [
            div({"class": "calc-header"}, "Armor"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "armor_defense_scaling_display",
                                "value": "floor(@{level}/2)",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Dex?",
                        number_input(
                            {
                                "disabled": True,
                                "name": "body_armor_attribute_display",
                                "value": "@{body_armor_attribute}",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class",
                        number_input(
                            {"name": "armor_defense_class_bonus", "value": "5"}
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Armor", number_input({"name": "body_armor_defense_value"})
                    ),
                    plus(),
                    equation_misc_repeat("armor_defense", 2),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "armor_defense_display",
                    "value": "@{armor_defense}",
                },
            ),
        ]
    )


def calc_fort():
    return flex_row(
        [
            div({"class": "calc-header"}, "Fort"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "fortitude_scaling_display",
                                "value": "(floor(@{level}/2))",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Con",
                        number_input(
                            {
                                "disabled": True,
                                "name": "fortitude_attribute",
                                "value": "(@{constitution})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class", number_input({"name": "fortitude_class", "value": "5"})
                    ),
                    plus(),
                    equation_misc_repeat("fortitude", 3),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "fortitude_display",
                    "value": "@{fortitude}",
                },
            ),
        ]
    )


def calc_ref():
    return flex_row(
        [
            div({"class": "calc-header"}, "Ref"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "reflex_scaling_display",
                                "value": "(floor(@{level}/2))",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Dex",
                        number_input(
                            {
                                "disabled": True,
                                "name": "reflex_attribute",
                                "value": "(@{dexterity})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class", number_input({"name": "reflex_class", "value": "5"})
                    ),
                    plus(),
                    equation_misc_repeat("reflex", 3),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "reflex_display",
                    "value": "@{reflex}",
                },
            ),
        ]
    )


def calc_mental():
    return flex_row(
        [
            div({"class": "calc-header"}, "Ment"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "mental_scaling_display",
                                "value": "(floor(@{level}/2))",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Wil",
                        number_input(
                            {
                                "disabled": True,
                                "name": "mental_attribute",
                                "value": "(@{willpower})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class", number_input({"name": "mental_class", "value": "5"})
                    ),
                    plus(),
                    equation_misc_repeat("mental", 3),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "mental_display",
                    "value": "@{mental}",
                },
            ),
        ]
    )
