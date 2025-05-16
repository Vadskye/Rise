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
            div({"class": "explanation"},
                """
                This page explains the calculations used for all of your important statistics.
                You can use it to make sure that the sheet is calculating everything correctly.
                <br>
                On the right side, you can see the attribute name for each statistic.
                You can use those when writing abilities and macros to automatically use the right numbers.
                """
            ),
            abilities_known(),
            non_attribute(),
            strength_based(),
            dexterity_based(),
            constitution_based(),
            intelligence_based(),
            perception_based(),
            willpower_based(),
        ],
    )


def stat_row(statistic_name, display_name=None, is_hideable=False, explanation_key=None):
    if display_name is None:
        display_name = statistic_name
    parseable = get_modifier_key(statistic_name)
    if explanation_key is None:
        explanation_key = parseable + "_explanation"
    statistic_row = flex_row(
        {"class": "statistic-row"},
        [
            div({"class": "statistic-name"}, display_name),
            number_input(
                {
                    "class": "statistic-value",
                    "name": parseable,
                    "readonly": True,
                }
            ),
            textarea(
                {
                    "class": "statistic-explanation",
                    "name": explanation_key,
                    "readonly": True,
                }
            ),
            span({"class": "statistic-variable-name"}, "@{" + parseable + "}"),
        ],
    )
    if is_hideable:
        return div(
            {"class": "statistic-row-wrapper"},
            [
                checkbox(
                    {
                        "class": "has-statistic-value",
                        "name": f"has_{parseable}",
                    }
                ),
                statistic_row,
            ],
        )
    else:
        return statistic_row


def abilities_known():
    return div(
        [
            div({"class": "section-header"}, "Abilities Known"),
            *[stat_row(c, None, True) for c in KNOWABLE_CONCEPTS],
        ]
    )

def non_attribute():
    return div(
        [
            div({"class": "section-header"}, "Non-Attribute Statistics"),
            stat_row("Attunement points"),
            stat_row("damage_resistance_max", display_name="Damage resistance", explanation_key="damage_resistance_explanation"),
            stat_row("Encumbrance"),
            stat_row("Land speed"),
            stat_row("Vital rolls"),
        ]
    )

def strength_based():
    return div(
        [
            div({"class": "section-header"}, "Strength-Based"),
            stat_row("Brawling accuracy"),
            stat_row("Brawn"),
            stat_row("Mundane power"),
            stat_row("Horizontal jump distance"),
            stat_row("Carrying strength"),
            stat_row("push_drag_strength", display_name = "Push/drag strength"),
        ]
    )

def dexterity_based():
    return div(
        [
            div({"class": "section-header"}, "Dexterity-Based"),
            stat_row("Armor defense"),
            stat_row("Reflex"),
        ]
    )

def constitution_based():
    return div(
        [
            div({"class": "section-header"}, "Constitution-Based"),
            stat_row("Fatigue tolerance"),
            stat_row("Fortitude"),
            stat_row("hit_points_max", display_name="Hit points", explanation_key="hit_points_explanation"),
        ]
    )

def intelligence_based():
    return div(
        [
            div({"class": "section-header"}, "Intelligence-Based"),
            stat_row("Insight points"),
            stat_row("Trained skills"),
        ]
    )

def perception_based():
    return div(
        [
            div({"class": "section-header"}, "Perception-Based"),
            stat_row("Accuracy"),
            stat_row("accuracy_with_strikes", "Bonus accuracy with strikes"),
        ]
    )


def willpower_based():
    return div(
        [
            div({"class": "section-header"}, "Willpower-Based"),
            stat_row("Mental"),
            stat_row("Magical power"),
        ]
    )
