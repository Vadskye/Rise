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
            div({"class": "statistic-name"}, display_name),
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
            span({"class": "statistic-variable-name"}, "@{" + parseable + "}"),
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

    return div(
        [
            div({"class": "section-header"}, "Defensive Statistics"),
            stat_row("hit_points", "HP"),
            stat_row("damage_resistance", "DR"),
            stat_row("Armor defense"),
            stat_row("Fortitude"),
            stat_row("Reflex"),
            stat_row("Mental"),
        ]
    )

def offensive_statistics():
    return div(
        [
            div({"class": "section-header"}, "Offensive Statistics"),
            stat_row("Accuracy"),
            stat_row("magical_damage_dice", "Magical strike +d"),
            stat_row("mundane_damage_dice", "Mundane strike +d"),
            stat_row("Power"),
        ]
    )
