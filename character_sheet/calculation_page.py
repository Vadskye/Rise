from cgi_simple import (
    checkbox,
    div,
    flex_col,
    flex_row,
    number_input,
    span,
    textarea,
)
from sheet_data import KNOWABLE_CONCEPTS
from get_modifier_key import get_modifier_key


def create_page(_destination: str) -> str:
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


def stat_row(statistic_name: str, display_name: str | None = None, is_hideable: bool = False, explanation_key: str | None = None) -> str:
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


def abilities_known() -> str:
    return div(
        [
            div({"class": "section-header"}, "Abilities Known"),
            *[stat_row(c, None, True) for c in KNOWABLE_CONCEPTS],
        ]
    )

def non_attribute() -> str:
    return div(
        [
            div({"class": "section-header"}, "Non-Attribute Statistics"),
            stat_row("Attunement points"),
            stat_row("Initiative"),
            stat_row("Speed"),
            stat_row("Vital rolls"),
        ]
    )

def strength_based() -> str:
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

def dexterity_based() -> str:
    return div(
        [
            div({"class": "section-header"}, "Dexterity-Based"),
            stat_row("Armor defense"),
            stat_row("Reflex"),
        ]
    )

def constitution_based() -> str:
    return div(
        [
            div({"class": "section-header"}, "Constitution-Based"),
            stat_row("Durability"),
            stat_row("Fatigue tolerance"),
            stat_row("Fortitude"),
            stat_row("Injury point"),
            stat_row("hit_points_max", display_name="Hit points", explanation_key="hit_points_explanation"),
        ]
    )

def intelligence_based() -> str:
    return div(
        [
            div({"class": "section-header"}, "Intelligence-Based"),
            stat_row("Insight points"),
            stat_row("Trained skills"),
        ]
    )

def perception_based() -> str:
    return div(
        [
            div({"class": "section-header"}, "Perception-Based"),
            stat_row("Accuracy"),
            stat_row("accuracy_with_strikes", "Bonus accuracy with strikes"),
        ]
    )


def willpower_based() -> str:
    return div(
        [
            div({"class": "section-header"}, "Willpower-Based"),
            stat_row("Mental"),
            stat_row("Magical power"),
        ]
    )
