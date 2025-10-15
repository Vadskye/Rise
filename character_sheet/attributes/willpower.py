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


def calc_magical_power():
    return flex_row(
        {"class": "magical-power"},
        [
            div({"class": "calc-header"}, "Magical power"),
            equation(
                [
                    underlabel(
                        "Lvl/2",
                        number_input(
                            {
                                "disabled": True,
                                "name": "magical_power_scaling",
                                "value": "floor(@{level}/2)",
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Wil",
                        number_input(
                            {
                                "name": "willpower",
                                "readonly": True,
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("magical_power", 2),
                ],
                result_attributes={
                    "name": "magical_power",
                    "readonly": True,
                },
            ),
        ],
    )


def calc_mental():
    return flex_row(
        [
            div({"class": "calc-header"}, "Mental"),
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
                                "name": "willpower",
                                "readonly": True,
                            }
                        ),
                    ),
                    plus(),
                    underlabel(
                        "Class", number_input({"name": "mental_class", "value": "5"})
                    ),
                    plus(),
                    equation_misc_repeat("mental", 2),
                ],
                result_attributes={
                    "name": "mental",
                    "readonly": True,
                },
            ),
        ]
    )
