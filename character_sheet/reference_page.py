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
        {"class": "page reference-page"},
        [
            textarea({"class": "rust", "readonly": True, "name": "rust"}),
            flex_row(
                {"class": "reference-row"},
                [
                    flex_col(
                        [
                            skill_modifiers(),
                            vital_wound_chart(),
                        ]
                    ),
                    common_concepts(),
                ],
            ),
        ],
    )


def vital_wound_chart():
    return flex_col(
        {"class": "vital-wound-effects"},
        [
            div({"class": "section-header"}, "Vital Wound Effects"),
            flex_row(
                {"class": "vital-wound-chart"},
                [
                    flex_col(
                        [
                            div({"class": "header"}, "Roll"),
                            "".join([div(f"{i}") for i in [*range(-1, 10), "10+"]]),
                        ]
                    ),
                    flex_col(
                        [
                            div({"class": "header"}, "Effect"),
                            "".join(
                                [
                                    div(vital_roll_effect(i))
                                    for i in [*range(-1, 10), "10+"]
                                ]
                            ),
                        ]
                    ),
                ],
            ),
        ],
    )


def vital_roll_effect(roll):
    return {
        -1: "Unconscious, die next round",
        0: "Unconscious, die after a minute",
        1: "Unconscious below half HP",
        2: "-1 accuracy",
        3: "-5 foot speed",
        4: "Half max DR",
        5: "-2 fatigue tolerance",
        6: "-1 all defenses",
        7: "-2 Fortitude",
        8: "-2 Reflex",
        9: "-2 Mental",
        "10+": "No extra effect",
    }[roll]


def skill_modifiers():
    return flex_col(
        [
            flex_wrapper(
                div(
                    {"class": "section-header skill-modifiers"},
                    "Skill Modifiers",
                )
            ),
            flex_row(
                {"class": "skill-modifier-reminder"},
                [
                    flex_col(
                        [
                            div(
                                {"class": "skill-modifier-reminder-header"},
                                "Training Level",
                            ),
                            div("Untrained"),
                            div("Trained"),
                        ]
                    ),
                    flex_col(
                        [
                            div(
                                {"class": "skill-modifier-reminder-header"},
                                "Modifier",
                            ),
                            div("Base attribute"),
                            div("3 + half level + attribute"),
                        ]
                    ),
                ],
            ),
        ]
    )


def common_concepts():
    short_rest = button(
        {
            "type": "roll",
            "value": (
                "&{template:custom}"
                + " !setattr --name @{character_name} --silent"
                + " --hit_points|@{hit_points_maximum}"
                + " --damage_resistance|@{damage_resistance_maximum}"
                + "!!!"
                + " {{desc=@{character_name} finishes a short rest}}"
            ),
        },
        "Short Rest",
    )
    long_rest = button(
        {
            "type": "roll",
            "value": (
                "&{template:custom}"
                + " !setattr --name @{character_name} --silent"
                + " --hit_points|@{hit_points_maximum}"
                + " --damage_resistance|@{damage_resistance_maximum}"
                + " --fatigue_points|0"
                + "!!!"
                + " {{desc=@{character_name} finishes a long rest}}"
            ),
        },
        "Long Rest",
    )
    return flex_col(
        {"class": "common-concepts"},
        [
            div(
                {"class": "section-header"},
                "Common Concepts",
            ),
            p(
                """<b>Critical hit</b>: If you hit with an attack by 10 or more, you get a critical hit. Unless otherwise specified, all damaging attacks roll double damage dice on a critical hit."""
            ),
            p(
                """<b>Glancing blow</b>: If you miss with an attack by 1 or 2, you get a glancing blow. Unless otherwise specified, all damaging attacks deal half damage on a glancing blow."""
            ),
            p(
                """<b>Rounding</b>: Always round down.""",
            ),
            p(
                f"""
            {short_rest}: Resting for ten minutes is considered a short rest. When you finish a short rest, you gain the following benefits.
            <ul>
                <li>You regain any missing hit points and damage resistance.</li>
                <li>You regain any attunement points you released from attuned items and abilities.</li>
                <li>You remove all conditions affecting you.</li>
            </ul>
        """
            ),
            p(
                f"""
            {long_rest}: Resting for eight hours is considered a long rest. When you finish a long rest, you gain the following benefits.
            <ul>
                <li>You remove one of your vital wounds.</li>
                <li>Your fatigue level becomes 0.</li>
            </ul>
        """
            ),
        ],
    )
