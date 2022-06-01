from cgi_simple import (
    button,
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_number_input,
    labeled_text_input,
    li,
    minus,
    number_input,
    ol,
    p,
    plus,
    radio_input,
    span,
    textarea,
    text_input,
    ul,
    underlabel,
)
from sheet_worker import standard_damage_at_power
from sheet_data import KNOWABLE_CONCEPTS
from get_modifier_key import get_modifier_key

def create_page(_destination):
    return flex_col(
        {"class": "page calculation-page"},
        [
            abilities_known(),
            defensive_statistics(),
            offensive_statistics(),
        ],
    )

def stat_row(statistic_name, display_name = None):
    if display_name is None:
        display_name = statistic_name
    parseable = get_modifier_key(statistic_name)
    return flex_row(
        {"class": "statistic-row"},
        [
            div({"class": "statistic-name"}, statistic_name),
            number_input(
                {"class": "statistic-value", "name": parseable, "readonly": True}
            ),
            text_input(
                {
                    "class": "statistic-explanation",
                    "name": parseable + "_explanation",
                    "readonly": True,
                }
            ),
        ],
    )

def abilities_known():
    return div(
        [
            div({"class": "section-header"}, "Abilities Known"),
            *[stat_row(c) for c in KNOWABLE_CONCEPTS],
        ]
    )

def defensive_statistics():
    statistics = [
        "Hit points",
        "Damage resistance",
        "Armor defense",
        "Fortitude",
        "Reflex",
        "Mental",
    ]

    return div(
        [
            div({"class": "section-header"}, "Defensive Statistics"),
            *[stat_row(s) for s in statistics],
        ]
    )

def offensive_statistics():
    return div(
        [
            div({"class": "section-header"}, "Offensive Statistics"),
            stat_row("Accuracy"),
            stat_row("Power"),
            stat_row("weapon_damage_dice", "Strike +d"),
        ]
    )
