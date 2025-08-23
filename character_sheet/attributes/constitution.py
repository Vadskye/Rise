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
    times,
    underlabel,
)
from sheet_data import (
    ATTRIBUTE_SHORTHAND,
    ATTRIBUTE_SKILLS,
    ATTRIBUTES,
    ROLL20_CALC,
    SUBSKILLS,
)

def calc_fortitude():
    return flex_row(
        [
            div({"class": "calc-header"}, "Fortitude"),
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
                        "Class", number_input({"name": "fortitude_class"})
                    ),
                    plus(),
                    equation_misc_repeat("fortitude", 2),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "fortitude_display",
                    "value": "@{fortitude}",
                },
            ),
        ]
    )


def calc_fatigue_tolerance():
    return flex_row(
        [
            div({"class": "calc-header fatigue-tolerance"}, "Fatigue tolerance"),
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


def calc_durability():
    return flex_row(
        [
            div({"class": "calc-header"}, "Durability"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Level",
                        number_input(
                            {
                                "disabled": True,
                                "name": "durability_level",
                                "value": "(@{durability_level})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class",
                        number_input(
                            {
                                "disabled": True,
                                "name": "durability_base_class",
                                "value": "(@{durability_base_class})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Con",
                        number_input(
                            {
                                "disabled": True,
                                "name": "durability_constitution",
                                "value": "(@{constitution})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Armor",
                        number_input(
                            {
                                "disabled": True,
                                "name": "durability_armor",
                                "value": "(@{body_armor_durability})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("durability", 1),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "durability_display",
                    "value": "@{durability_maximum}",
                },
            ),
        ]
    )


def calc_hit_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Hit points"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Rank mult",
                        number_input(
                            {
                                "disabled": True,
                                "name": "hit_points_rank_multiplier",
                                "value": "(@{hit_points_rank_multiplier})",
                            }
                        ),
                    ),
                    times(),
                    underlabel(
                        "Durability",
                        number_input(
                            {
                                "disabled": True,
                                "name": "hit_points_durability",
                                "value": "(@{hit_points_durability})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("hit_points", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "hit_points_display",
                    "value": "@{hit_points_maximum}",
                },
            ),
        ]
    )


def calc_injury_point():
    return flex_row(
        [
            div({"class": "calc-header"}, "Injury point"),
            equation(
                {
                    "class": "large-number-equation",
                },
                [
                    underlabel(
                        "Rank mult",
                        number_input(
                            {
                                "disabled": True,
                                "name": "injury_point_rank_modifier",
                            }
                        ),
                    ),
                    times(),
                    underlabel(
                        "Lvl+Con",
                        number_input(
                            {
                                "disabled": True,
                                "name": "injury_point_level_plus_con",
                            }
                        ),
                        {"class": "calc-double-wide-value"},
                    ),
                    plus(),
                    equation_misc_repeat("injury_point", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "injury_point_display",
                    "value": "@{injury_point_maximum}",
                },
            ),
        ]
    )
