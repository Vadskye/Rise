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
            div({"class": "calc-header"}, text_input({"class": "accuracy_type"}) + " accuracy"),
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
