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

def calc_reflex():
    return flex_row(
        [
            div({"class": "calc-header"}, "Reflex"),
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
                    equation_misc_repeat("reflex", 2),
                ],
                result_attributes={
                    "disabled": "true",
                    "name": "reflex_display",
                    "value": "@{reflex}",
                },
            ),
        ]
    )
