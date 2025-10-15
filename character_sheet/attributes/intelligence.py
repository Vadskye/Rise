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

def calc_trained_skills():
    return flex_row(
        [
            div({"class": "calc-header"}, "Trained skills"),
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
                                "name": "skill_points_intelligence",
                                "readonly": True,
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("skill_points", 2),
                ],
                result_attributes={
                    "name": "skill_points",
                    "readonly": True,
                },
            ),
        ]
    )


def calc_insight_points():
    return flex_row(
        [
            div({"class": "calc-header"}, "Insight points"),
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
                                "name": "intelligence",
                                "readonly": True,
                            }
                        ),
                    ),
                    plus(),
                    equation_misc_repeat("insight_points", 2),
                ],
                result_attributes={
                    "name": "insight_points",
                    "readonly": True,
                },
            ),
        ]
    )

