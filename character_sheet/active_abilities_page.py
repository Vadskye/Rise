from __future__ import annotations
from typing import cast
from cgi_simple import (
    button,
    checkbox,
    div,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_textarea,
    labeled_text_input,
    number_input,
    option,
    select,
    span,
    text_input,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
import re

# type: ignore[reportUnusedImport]
_ = (ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS, re)


def create_page(_destination: str) -> str:
    magical_power = text_input(
        {"class": "inline-number", "readonly": True, "name": "magical_power"}
    )
    mundane_power = text_input(
        {"class": "inline-number", "readonly": True, "name": "mundane_power"}
    )

    return flex_col(
        {"class": "page active-abilities-page"},
        [
            div(
                {"class": "tab-explanation"},
                [
                    """
                        This tab is used to track the abilities that you can use.
                        Each ability you add here will appear as a button on the Core page.
                        You can reference character statistics in abilities by embedding inline dice rolls, like: <code>[[d8+@{magical_power}]]</code>.
                        <br>
                        Weapon-based strikes will automatically use accuracy and damage values from the weapons you listed in the Items tab.
                    """,
                    div({"class": "power-reminder"}, f"""
                        As a reminder, your magical✨ power is {magical_power} and your mundane power is {mundane_power}.
                    """),
                ],
            ),
            # New attacks
            div({"class": "section-header"}, "Weapon-Based Strikes"),
            fieldset(
                {"class": f"repeating_strikeattacks"},
                strike_based_attack(),
            ),
            div({"class": "section-header"}, "Other Damaging Attacks"),
            fieldset(
                {"class": f"repeating_otherdamagingattacks"},
                other_damaging_attack(),
            ),
            div({"class": "section-header"}, "Debuffs"),
            fieldset(
                {"class": f"repeating_nondamagingattacks"},
                nondamaging_attack(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Other Active Abilities")),
            fieldset(
                {"class": f"repeating_abilities"},
                ability(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Passive Abilities")),
            fieldset(
                {"class": f"repeating_passiveabilities"},
                passive_ability(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Universal Abilities")),
            universal_abilities(),
            div(
                """
                These buttons cannot be customized.
                If you have special benefits with some of these abilities, create your own versions of them above.
            """
            ),
        ],
    )


def ability() -> str:
    # TODO: make this legacy less dumb
    return flex_row(
        {"class": "ability"},
        [
            flex_col(
                {"class": "attack-prefix"},
                [
                    flex_wrapper(
                        labeled_text_input(
                            "Name",
                            {"class": "active-ability-name"},
                            {"name": "active_ability0_name"},
                        ),
                    ),
                    flex_row(
                        {"class": "attack-calcs"},
                        [
                            labeled_textarea(
                                "Base dice",
                                {"class": "input-dice"},
                                {"name": "dice_pool"},
                            ),
                            underlabeled_checkbox(
                                "Magical?",
                                {"class": "attack-is-magical"},
                                {"name": "is_magical"},
                            ),
                            underlabeled_checkbox(
                                "Targeted?",
                                {"class": "attack-is-targeted"},
                                {"name": "is_targeted"},
                            ),
                            text_input(
                                {
                                    "class": "hidden",
                                    "name": "targeting_text",
                                    "readonly": True,
                                }
                            ),
                            text_input(
                                {
                                    "class": "hidden",
                                    "name": "tags_text",
                                    "readonly": True,
                                }
                            ),
                            text_input(
                                {
                                    "class": "hidden",
                                    "name": "dice_text",
                                    "readonly": True,
                                }
                            ),
                        ],
                    ),
                    labeled_text_input(
                        "Tags",
                        {"class": "input-tags"},
                        {"name": "tags"},
                    ),
                ],
            ),
            labeled_textarea(
                "Effect",
                {"class": "active-ability-effect"},
                {"name": "active_ability0_effect"},
            ),
            flex_col(
                {"class": "attack-buttons"},
                [
                    button(
                        {
                            "class": "attack-roll",
                            "name": "use_ability",
                            "type": "roll",
                            "value": (
                                "&{template:custom}"
                                + " {{title=@{active_ability0_name}}}"
                                + " {{subtitle=@{character_name}}}"
                                + " @{targeting_text}"
                                + " @{dice_text}"
                                + " {{color=@{chat_color}}}"
                                + " @{tags_text}"
                                + " {{desc=@{active_ability0_effect}}}"
                            ),
                        },
                        div({"class": "ability-name-options"}, [
                            span({"class": "ability-name-fixed"}, "Use"),
                            text_input(
                                {
                                    "class": "ability-name-dynamic",
                                    "readonly": True,
                                    "name": "active_ability0_name",
                                }
                            ),
                        ])
                    ),
                    labeled_text_input(
                        "Dice pool",
                        {"class": "total-damage"},
                        {
                            "class": "readonly-disabled",
                            "readonly": True,
                            "name": "calculated_dice_pool",
                        },
                    ),
                ],
            ),
        ],
    )


def passive_ability() -> str:
    return flex_row(
        {"class": "passive-ability"},
        [
            flex_col(
                {"class": "attack-prefix"},
                [
                    flex_wrapper(
                        labeled_text_input(
                            "Name",
                            {"class": "active-ability-name"},
                            {"name": "ability_name"},
                        ),
                    ),
                ]
            ),
            labeled_textarea(
                "Effect",
                {"class": "passive-ability-effect"},
                {"name": "ability_effects"},
            ),
            flex_col(
                {"class": "attack-buttons"},
                button(
                    {
                        "class": "attack-roll",
                        "name": "use_ability",
                        "type": "roll",
                        "value": (
                            "&{template:custom}"
                            + " {{title=@{ability_name}}}"
                            + " {{subtitle=@{character_name}}}"
                            + " {{color=@{chat_color}}}"
                            + " {{desc=@{ability_effects}}}"
                        ),
                    },
                    div({"class": "ability-name-options"}, [
                        span({"class": "ability-name-fixed"}, "Use"),
                        text_input(
                            {
                                "class": "ability-name-dynamic",
                                "readonly": True,
                                "name": "ability_name",
                            }
                        ),
                    ])
                ),
            ),
        ],
    )


def paper_attack() -> str:
    return flex_row(
        {"class": "attack"},
        [
            labeled_text_input(
                "Name",
                {"class": "attack-name"},
            ),
            underlabel_spaced(
                "Accuracy",
                number_input({"class": "fake-text"}),
                {"class": "attack-bonus"},
            ),
            labeled_text_input(
                "Damage/Effect",
                {"class": "attack-effect"},
            ),
        ],
    )


def shared_attack_framework(calcs: list[str] | None = None, buttons: list[str] | None = None) -> str:
    calcs = calcs or []
    buttons = buttons or []
    return flex_row(
        {"class": "attack"},
        [
            flex_col(
                {"class": "attack-prefix"},
                [
                    flex_wrapper(
                        labeled_text_input(
                            "Name",
                            {"class": "attack-name"},
                            {"name": "attack_name"},
                        ),
                    ),
                    flex_row(
                        {"class": "attack-calcs"},
                        [
                            underlabel_spaced(
                                "+Acc",
                                number_input(
                                    {
                                        "class": "fake-text",
                                        "name": "attack_accuracy",
                                        "value": "0",
                                    }
                                ),
                                {"class": "attack-bonus"},
                            ),
                            labeled_text_input(
                                "Defense",
                                {"class": "attack-defense"},
                                {"name": "attack_defense"},
                            ),
                            *calcs,
                        ],
                    ),
                ],
            ),
            labeled_textarea(
                "Effect",
                {"class": "attack-effect"},
                {"name": "attack_effect"},
            ),
            text_input({"class": "hidden", "readonly": True, "name": "targeting_text"}),
            text_input({"class": "hidden", "readonly": True, "name": "tags_text"}),
            text_input(
                {"class": "hidden", "readonly": True, "name": "attack_defense_text"}
            ),
            flex_col({"class": "attack-buttons"}, buttons),
        ],
    )


def strike_based_attack() -> str:
    return shared_attack_framework(
        [
            labeled_textarea(
                "+Damage",
                {"class": "input-dice"},
                {"name": "attack_extra_damage"},
            ),
            underlabel(
                "Weapon",
                select(
                    {
                        "class": "weapon-damage-multiplier",
                        "name": "weapon_damage_multiplier",
                    },
                    [
                        option({"value": ""}, ""),
                        option({"value": "2"}, "x2"),
                        option({"value": "3"}, "x3"),
                        option({"value": "4"}, "x4"),
                    ],
                )
            ),
            underlabel(
                "All Dmg",
                select(
                    {
                        "class": "damage-multiplier",
                        "name": "damage_multiplier",
                    },
                    [
                        option({"value": ""}, ""),
                        option({"value": "2"}, "x2"),
                        option({"value": "3"}, "x3"),
                        option({"value": "4"}, "x4"),
                    ],
                )
            ),
            underlabeled_checkbox(
                "Magical?",
                {"class": "attack-is-magical"},
                {"name": "is_magical"},
            ),
            underlabeled_checkbox(
                "Targeted?",
                {"class": "attack-is-targeted"},
                {"name": "is_targeted"},
            ),
        ],
        [
            weapon_exists_checkbox(0),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(0)),
            weapon_exists_checkbox(1),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(1)),
            weapon_exists_checkbox(2),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(2)),
            weapon_exists_checkbox(3),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(3)),
        ],
    )

def weapon_exists_checkbox(i: int) -> str:
    return checkbox({
        "class": f"hidden weapon-exists weapon-{i}",
        "name": f"weapon_{i}_exists_local",
        "readonly": True,
        "value": "1",
    })


def weapon_buttons(i: int) -> list[str]:
    idx = str(i)
    return [
        button(
            {
                "class": "attack-roll",
                "name": f"use_ability_{idx}",
                "type": "roll",
                "value": weapon_attack_button(idx),
            },
            # This has to use value instead of the more common `readonly`
            # approach because it's referencing a value outside of the current
            # repeating ability section.
            text_input(
                {
                    "disabled": True,
                    "name": f"weapon_attack_name_{idx}",
                    "value": f"@{{weapon_{idx}_name}}",
                }
            ),
        ),
        crit_damage_button(
            f"@{{weapon_{idx}_total_damage}}",
            f"crit_{idx}",
            f" - @{{weapon_{idx}_name}}",
        ),
        text_input(
            {
                "class": "readonly-disabled strike-total-accuracy",
                "name": f"weapon_{idx}_total_accuracy",
                "readonly": True,
            }
        ),
        text_input(
            {
                "class": "readonly-disabled strike-total-damage",
                "name": f"weapon_{idx}_total_damage",
                "readonly": True,
            }
        ),
    ]


def other_damaging_attack() -> str:
    return shared_attack_framework(
        [
            labeled_textarea(
                "Damage",
                {"class": "input-dice"},
                {"name": "attack_damage_dice"},
            ),
            labeled_text_input(
                "Tags",
                {"class": "input-tags"},
                {"name": "tags"},
            ),
            underlabeled_checkbox(
                "Targeted?",
                {"class": "attack-is-targeted"},
                {"name": "is_targeted"},
            ),
        ],
        [
            button(
                {
                    "class": "attack-roll",
                    "name": f"use_ability",
                    "type": "roll",
                    "value": other_damaging_attack_button_text(),
                },
                div({"class": "ability-name-options"}, [
                    span({"class": "ability-name-fixed"}, "Attack"),
                    text_input(
                        {
                            "class": "ability-name-dynamic",
                            "readonly": True,
                            "name": "attack_name",
                        }
                    ),
                ])
            ),
            labeled_text_input(
                "Total accuracy",
                {"class": "total-accuracy"},
                {
                    "class": "readonly-disabled",
                    "readonly": True,
                    "name": "calculated_accuracy",
                },
            ),
            labeled_text_input(
                "Total damage",
                {"class": "total-damage"},
                {
                    "class": "readonly-disabled",
                    "readonly": True,
                    "name": "calculated_dice_pool",
                },
            ),
            crit_damage_button("@{calculated_dice_pool}", "crit"),
        ],
    )


def other_damaging_attack_button_text() -> str:
    return attack_button_text(
        construct_damage_text(
            "@{calculated_dice_pool}",
            "repeating_otherdamagingattacks_crit",
        )
    )


def nondamaging_attack() -> str:
    return shared_attack_framework(
        [
            underlabeled_checkbox(
                "Targeted?",
                {"class": "attack-is-targeted"},
                {"name": "is_targeted"},
            ),
            labeled_text_input(
                "Tags",
                {"class": "input-tags"},
                {"name": "tags"},
            ),
        ],
        [
            button(
                {
                    "class": "attack-roll",
                    "name": f"use_ability",
                    "type": "roll",
                    "value": attack_button_text(),
                },
                div({"class": "ability-name-options"}, [
                    span({"class": "ability-name-fixed"}, "Attack"),
                    text_input(
                        {
                            "class": "ability-name-dynamic",
                            "readonly": True,
                            "name": "attack_name",
                        }
                    ),
                ]),
            ),
            labeled_text_input(
                "Total accuracy",
                {"class": "total-accuracy"},
                {
                    "class": "readonly-disabled",
                    "readonly": True,
                    "name": "calculated_accuracy",
                },
            ),
        ],
    )


def crit_damage_button(crit_damage_calculation: str, name: str, subtitle_suffix: str = "") -> str:
    return button(
        {
            "class": "hidden",
            "name": name,
            "type": "roll",
            "value": (
                "&{template:custom}"
                + " {{title=@{attack_name}}}"
                + " {{subtitle=@{character_name}"
                + subtitle_suffix
                + "}}"
                + " {{Crit Damage=[["
                + crit_damage_calculation
                + "]]}}"
                + " {{color=@{chat_color}}}"
            ),
        },
        "",
    )


def construct_damage_text(normal_damage: str, crit_damage_button: str) -> str:
    return (
        " [["
        + normal_damage
        + "]]"
        + " [Crit](~"
        + crit_damage_button
        + ")"
    )


def weapon_attack_button(i: str) -> str:
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + f" {{{{subtitle=@{{character_name}} - @{{weapon_{i}_name}}}}}}"
        + " @{targeting_text}"
        + f" {{{{Attack=[[@{{attack_die}}+@{{accuracy}}+@{{accuracy_with_strikes}}+@{{weapon_{i}_accuracy}}+@{{attack_accuracy}}]] vs @{{attack_defense_text}}}}}}"
        + " {{Damage="
        + construct_damage_text(
            f"@{{weapon_{i}_total_damage}}",
            f"repeating_strikeattacks_crit_{i}",
        )
        + "}}"
        + f" {{{{Tags=@{{weapon_{i}_tags}}}}}}"
        + " {{color=@{chat_color}}}"
        + " @{attack_headers}"
        + " {{desc=@{attack_effect}}}"
    )


def attack_button_text(damage_text: str | None = None) -> str:
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " @{targeting_text}"
        + " {{Attack=[[@{attack_die}+@{accuracy}+@{attack_accuracy}]] vs @{attack_defense_text}}}"
        + ((" {{Damage=" + damage_text + "}}") if damage_text else "")
        + " {{color=@{chat_color}}}"
        + " @{tags_text}"
        + " @{attack_headers}"
        + " {{desc=@{attack_effect}}}"
    )


def universal_ability_button(
    name: str,
    effect: str,
    attack: dict[str, object] | None = None,
    tags: list[str] | None = None,
) -> str:
    actual_tags: list[str] = []
    if attack:
        attack_tags = attack.get("tags")
        if isinstance(attack_tags, list):
            actual_tags.extend(str(t) for t in cast(list[object], attack_tags))
    if tags:
        actual_tags.extend(tags)

    tags_text = f" {{{{Tags={', '.join(actual_tags)}}}}}" if actual_tags else ""
    
    attack_text = ""
    if attack:
        acc = str(attack.get("accuracy", ""))
        dfn = str(attack.get("defense", ""))
        attack_text = f" {{{{Attack=[[@{{attack_die}}+{acc}]] vs {dfn}}}}}"

    return div(
        button(
            {
                "type": "roll",
                "value": (
                    "&{template:custom}"
                    + f" {{{{title={name}}}}}"
                    + " {{subtitle=@{character_name}}}"
                    + tags_text
                    + attack_text
                    + " {{color=@{chat_color}}}"
                    + f" {{{{desc={effect.strip()}}}}}"
                ),
            },
            name,
        )
    )


def universal_abilities() -> str:
    return flex_row(
        {"class": "universal_abilities"},
        [
            universal_ability_button(
                "Charge",
                """
                    After using this ability, you take a -2 penalty to all defenses until your next turn.
                    Move up to your speed in a single straight line without reducing your available movement. At the end of this movement, you can make a melee strike from your new location.
                """,
            ),
            universal_ability_button(
                "Desperate Exertion",
                """
                    You reroll any attack or check you just made and gain a +2 bonus.
                    After using this ability, you increase your fatigue level by two.
                """,
            ),
            universal_ability_button(
                "Escape Grapple",
                """
                    Make a brawling attack vs. Brawn against any number of creatures that you are grappled by.
                    For each target, if you hit that target with this attack, it stops being grappled by you and you stop being grappled by it.
                """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Special", "tags": ["Brawling"]},
            ),
            universal_ability_button(
                "Grapple",
                """
                    Make a brawling attack with a free hand against the Brawn and Reflex defenses of an adjacent creature.
                    On a hit against both defenses, you and the target are grappled by each other.
                """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Fort and Ref", "tags": ["Brawling", "Size-Based"]},
            ),
            universal_ability_button(
                "Jump",
                f"""
                    As part of movement, you can jump up to [[@{{jump_distance}}]] feet horizontally, and half that distance vertically.
                    You cannot jump farther than your speed.
                """,
            ),
            universal_ability_button(
                "Ready Reaction",
                """
                    When you use this ability, you declare another standard action that you intend to take as soon as it becomes possible.
                    If that action becomes possible before your next turn, it happens.
                    Otherwise, your action is wasted.
                """,
            ),
            universal_ability_button(
                "Recover",
                """
                    After using this ability, you increase your fatigue level by two, and you cannot use it again until you finish a short rest.
                    You regain half of your maximum hit points. Then, you remove all conditions affecting you.
                """,
            ),
            universal_ability_button(
                "Run",
                """
                    You add twice your speed to your available movement.
                """,
            ),
            universal_ability_button(
                "Shove",
                """
                    Choose either one adjacent creature or all creatures grappling you. Make a brawling attack with a free hand against each target.
                    On a hit, you can move up to half your speed in a straight line, pushing each target as you move.
                 """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Fort", "tags": ["Brawling", "Size-Based"]},
            ),
            universal_ability_button(
                "Sprint",
                """
                    You add your speed to your available movement.
                    This is a free action and increases your fatigue level by one.
                """,
            ),
            universal_ability_button(
                "Total Defense",
                """
                    You briefly gain a +2 bonus to your defenses.
                """,
            ),
            universal_ability_button(
                "Throw",
                """
                    You throw a creature or object 15 feet plus 5 feet per 2 Strength.
                    Some objects are much easier or harder to throw than others.
                    If the object's weight category matches your maximum carrying capacity, this distance is halved.
                    To throw an unwilling creature, it must already be grappled by you, and you must make a brawling attack vs. its Brawn defense.
                """,
            ),
            universal_ability_button(
                "Trip",
                """
                    Make a brawling attack vs. Brawn with a free hand against an adjacent creature.
                    On a hit, the target becomes prone.
                 """,
                attack={"accuracy": "@{accuracy}", "defense": "Fort", "tags": ["Brawling", "Size-Based"]},
            ),
        ],
    )
