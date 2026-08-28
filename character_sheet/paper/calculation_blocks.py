from cgi_simple import (
    div,
    equation,
    equation_misc,
    equation_misc_repeat,
    fieldset,
    flex_col,
    flex_row,
    labeled_number_input,
    labeled_text_input,
    labeled_textarea,
    minus,
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
)
from attributes.strength import calc_brawling_accuracy, calc_brawn, calc_mundane_power
from attributes.dexterity import calc_armor, calc_reflex
from attributes.constitution import calc_fortitude, calc_hit_points, calc_durability, calc_injury_point
from attributes.perception import calc_accuracy, calc_blank_accuracy
from attributes.willpower import calc_magical_power, calc_mental

def calc_offense() -> str:
    return flex_col(
        {"class": "calc-offense"},
        [
            div({"class": "section-header"}, "Offensive Statistics"),
            calc_accuracy(),
            calc_brawling_accuracy(),
            calc_blank_accuracy(),
            calc_extra_damage(),
            calc_magical_power(),
            calc_mundane_power(),
            calc_speed(),
        ],
    )

def calc_defense() -> str:
    return flex_col(
        {"class": "calc-defense"},
        [
            div({"class": "section-header"}, "Defensive Statistics"),
            calc_armor(),
            calc_brawn(),
            calc_fortitude(),
            calc_mental(),
            calc_reflex(),
            calc_durability(),
            calc_hit_points(),
            calc_injury_point(),
            calc_vital_rolls(),
        ],
    )

def calc_survival() -> str:
    return flex_col(
        {"class": "calc-survival"},
        [
            div({"class": "section-header"}, "Survival"),
            calc_durability(),
            calc_hit_points(),
            calc_injury_point(),
            calc_vital_rolls(),
        ],
    )

def calc_extra_damage() -> str:
    return flex_row(
        [
            div({"class": "calc-header"}, "Extra damage"),
            equation(
                [
                    equation_misc_repeat("extra_damage", 4),
                ],
            ),
        ]
    )

def calc_speed() -> str:
    return flex_row(
        [
            div({"class": "calc-header"}, "Speed"),
            equation(
                [
                    underlabel(
                        "Base",
                        number_input({"name": "base_speed"}),
                    ),
                    minus(),
                    underlabel(
                        "Armor", number_input({"name": "body_armor_speed"})
                    ),
                    plus(),
                    equation_misc("speed", 0),
                    plus(),
                    equation_misc("speed", 1),
                ],
                result_attributes={
                    "name": "speed",
                    "readonly": True,
                },
            ),
        ]
    )


def calc_vital_rolls() -> str:
    return flex_row(
        [
            div({"class": "calc-header"}, "Vital rolls"),
            equation(
                [
                    equation_misc_repeat("vital_rolls", 3),
                ],
                result_attributes={
                    "name": "vital_rolls",
                    "readonly": True,
                },
            ),
        ]
    )
