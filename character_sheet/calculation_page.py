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


def create_page(_destination):
    return flex_col(
        {"class": "page calculation-page"},
        [
            defensive_statistics(),
        ],
    )


def defensive_statistics():
    statistics = [
        "hit_points",
        "damage_resistance",
        "armor_defense",
        "fortitude_defense",
        "reflex_defense",
        "mental_defense",
    ]

    return div(
        [
            div({"class": "section-header"}, "Defensive Statistics"),
            *[stat_row(s) for s in statistics],
        ]
    )


def stat_row(statistic_name):
    return flex_row(
        {"class": "statistic-row"},
        [
            div({"class": "statistic-name"}, format_statistic_name(statistic_name)),
            number_input(
                {"class": "statistic-value", "name": statistic_name, "readonly": True}
            ),
            text_input(
                {
                    "class": "statistic-explanation",
                    "name": statistic_name + "_explanation",
                    "readonly": True,
                }
            ),
        ],
    )


def format_statistic_name(statistic_name):
    return statistic_name.replace("_", " ").title()
