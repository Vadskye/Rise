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


def calc_mundane_power():
    return flex_row(
        {"class": "mundane-power"},
        [
            div({"class": "calc-header"}, "Mundane Power"),
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
