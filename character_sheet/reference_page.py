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
                    standard_damage(),
                    flex_col(
                        [
                            skill_modifiers(),
                            vital_wound_chart(),
                        ]
                    ),
                    common_concepts(),
                ],
            ),
            character_reference(),
        ],
    )


def standard_damage():
    return flex_col(
        {"class": "standard-damage"},
        [
            div({"class": "section-header"}, "Dice Pools"),
            flex_row(
                {"class": "damage-chart"},
                [
                    flex_col(
                        [
                            "".join(
                                [
                                    div(standard_damage_at_power(i))
                                    for i in range(-4, 25, 2)
                                ]
                            ),
                        ]
                    )
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
        1: "Unconscious below max HP",
        2: "-10 foot speed",
        3: "-5 foot speed",
        4: "-2 defenses",
        5: "-1 defenses",
        6: "Max DR is 0",
        7: "Half max DR",
        8: "-2 accuracy",
        9: "-1 accuracy",
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
                            div("1 + half level + attribute"),
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
                + " {{desc=@{character_name} takes a short rest}}"
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
                + " {{desc=@{character_name} takes a long rest}}"
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
                """<b>Critical hit</b>: If you hit with an attack by 10 or more, you get a critical hit. Unless otherwise specified, all damaging attacks roll double damage dice on a critical hit. This does not multiply the damage from your power."""
            ),
            p(
                """<b>Glancing blow</b>: If you miss with an attack by 1 or 2, you get a glancing blow. Unless otherwise specified, all damaging attacks roll no damage dice on a glancing blow. This does not reduce the damage from your power. If you would not normally add your power to damage with the attack, a glancing blow deals no damage."""
            ),
            p(
                f"""
            {short_rest}: Resting for ten minutes is considered a short rest. When you take a short rest, you gain the following benefits.
            <ul>
                <li>You regain any missing hit points and damage resistance.</li>
                <li>You regain any attunement points you released from attuned items and abilities.</li>
                <li>You remove all conditions affecting you.</li>
            </ul>
        """
            ),
            p(
                f"""
            {long_rest}: Resting for eight hours is considered a long rest. When you take a long rest, you gain the following benefits.
            <ul>
                <li>You remove one of your vital wounds.</li>
                <li>Your fatigue level becomes 0.</li>
            </ul>
        """
            ),
        ],
    )


def character_reference():
    return flex_col(
        [
            div({"class": "section-header"}, "Core Statistics"),
            flex_row(
                {"class": "reference-statistics"},
                [
                    labeled_number_input(
                        "Accuracy",
                        input_attributes={"readonly": True, "name": "accuracy"},
                    ),
                    labeled_number_input(
                        "Power", input_attributes={"readonly": True, "name": "power"}
                    ),
                    labeled_number_input(
                        "Encumbrance",
                        input_attributes={"readonly": True, "name": "encumbrance"},
                    ),
                    labeled_number_input(
                        "Vital rolls",
                        input_attributes={"readonly": True, "name": "vital_rolls"},
                    ),
                ],
            ),
        ]
    )
