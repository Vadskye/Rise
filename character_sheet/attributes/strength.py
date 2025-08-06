from cgi_simple import (
    checkbox,
    div,
    equation,
    equation_fraction,
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


def calc_brawling_accuracy():
    return flex_row(
        [
            div({"class": "calc-header"}, "Brawl accuracy"),
            equation(
                [
                    equation_fraction(1, 2),
                    underlabel(
                        "Lvl+Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "brawling_accuracy_level_plus_strength",
                                "value": "(@{level}+@{strength})",
                            }
                        ),
                        {"class": "calc-fractional-value"},
                    ),
                    plus(),
                    equation_misc_repeat("accuracy", 3),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "brawling_accuracy_display",
                    "value": "@{brawling_accuracy}",
                },
            ),
        ]
    )

def calc_brawn():
    return flex_row(
        [
            div({"class": "calc-header"}, "Brawn"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "brawn_scaling_display",
                                "value": "(floor(@{level}/2))",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "brawn_strength_display",
                                "value": "(@{strength})",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class", number_input({"name": "brawn_class"})
                    ),
                    plus(),
                    equation_misc_repeat("brawn", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "brawn_display",
                    "value": "@{brawn}",
                },
            ),
        ]
    )


def calc_mundane_power():
    return flex_row(
        {"class": "mundane-power"},
        [
            div({"class": "calc-header"}, "Mundane power"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "mundane_power_scaling",
                                "value": "floor(@{level}/2)",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "mundane_power_attribute",
                                "value": "@{strength}",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("mundane_power", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "mundane_power_display",
                    "value": "@{mundane_power}",
                },
            ),
        ],
    )

def calc_jump_distance():
    return flex_row(
        {"class": "jump-distance"},
        [
            div({"class": "calc-header"}, "Jump distance"),
            equation(
                [
                    underlabel(
                        "Spd/4",
                        number_input(
                            {
                                "name": "horizontal_jump_distance_speed",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "5*Str",
                        number_input(
                            {
                                "disabled": True,
                                "name": "horizontal_jump_distance_strength",
                                "value": "(5*@{strength})",
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("horizontal_jump_distance", 2),
                ],
                result_attributes={
                    "disabled": True,
                    "name": "horizontal_jump_distance_display",
                    "value": "@{horizontal_jump_distance}",
                },
            ),
            flex_row(
                {"class": "class-skill-container"},
                [
                    underlabel(
                        "Trained?",
                        checkbox(
                            {
                                "class": "is-trained",
                                "name": "jump_trained",
                            }
                        ),
                    ),
                ],
            ),
        ],
    )
