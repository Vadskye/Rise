from cgi_simple import (
    button,
    checkbox,
    div,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    freeform_number_input,
    invisiblebutton,
    label,
    labeled_number_input,
    labeled_textarea,
    labeled_text_input,
    number_input,
    number_reminder,
    option,
    select,
    sidelabel,
    span,
    subtlebutton,
    textarea,
    text_input,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
import re
from old_attacks import old_attacks


def create_page(destination):
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
            # Old attacks for backwards compatibility
            # *old_attacks(),
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


def ability():
    # TODO: make this legacy less dumb
    ability_number = 0
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
                                None,
                                {"name": "is_magical"},
                            ),
                            underlabeled_checkbox(
                                "Targeted?",
                                None,
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
                                    "name": "dice_text",
                                    "readonly": True,
                                }
                            ),
                        ],
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


def passive_ability():
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


def paper_attack():
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


def shared_attack_framework(calcs=[], buttons=[]):
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
            text_input(
                {"class": "hidden", "readonly": True, "name": "attack_defense_text"}
            ),
            flex_col({"class": "attack-buttons"}, buttons),
        ],
    )


def strike_based_attack():
    return shared_attack_framework(
        [
            labeled_textarea(
                "+Damage",
                {"class": "input-dice"},
                {"name": "attack_extra_damage"},
            ),
            underlabeled_checkbox(
                "Magical?",
                {"class": "attack-is-magical"},
                {"name": "is_magical"},
            ),
            underlabeled_checkbox(
                "Targeted?",
                None,
                {"name": "is_targeted"},
            ),
            text_input(
                {
                    "class": "hidden",
                    "readonly": True,
                    "name": "targeting_text_first_page",
                }
            ),
        ],
        [
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(0)),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(1)),
            flex_row({"class": "specific-weapon-button"}, weapon_buttons(2)),
            button(
                {
                    "class": "attack-roll strike-dropdown",
                    "name": "use_ability",
                    "type": "roll",
                    "value": weapon_dropdown_button_text(),
                },
                text_input(
                    {
                        "class": "attack-label",
                        "readonly": True,
                        "name": "attack_name",
                    }
                ),
            ),
        ],
    )


def weapon_buttons(i):
    i = str(i)
    return [
        button(
            {
                "class": "attack-roll",
                "name": f"use_ability_" + i,
                "type": "roll",
                "value": weapon_attack_button(i),
            },
            text_input(
                {
                    "disabled": True,
                    "name": "weapon_attack_name_" + i,
                    "value": "@{weapon_" + i + "_name}",
                }
            ),
        ),
        crit_damage_button(
            "@{weapon_" + i + "_total_damage}",
            "crit_" + i,
            " - @{weapon_" + i + "_name}",
        ),
        text_input(
            {
                "class": "readonly-disabled strike-total-damage",
                "name": f"weapon_{i}_total_damage",
                "readonly": True,
            }
        ),
    ]


def weapon_dropdown_button_text():
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + "?{Weapon"
        + "| "
        + weapon_template(0)
        + "| "
        + weapon_template(1)
        + "| "
        + weapon_template(2)
        + "}"
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
    )


def weapon_template(i):
    i = str(i)

    return (
        " @{weapon_"
        + i
        + "_name_sanitized},"
        + " {{subtitle=@{character_name} - @{weapon_"
        + i
        + "_name_sanitized}&amp;#125;&amp;#125;"
        + " @{targeting_text_first_page}"
        + " {{Attack=[[d10!+@{accuracy}+@{accuracy_with_strikes}+@{weapon_"
        + i
        + "_accuracy}+@{attack_accuracy}]] vs @{attack_defense_text}&amp;#125;&amp;#125;"
        + " {{Damage=[[@{weapon_"
        + i
        + "_total_damage}]]&amp;#125;&amp;#125;"
        + " {{Tags=@{weapon_"
        + i
        + "_tags_sanitized} &amp;#125;&amp;#125;"
    ).replace("~", "&amp;#126;")


def other_damaging_attack():
    return shared_attack_framework(
        [
            labeled_textarea(
                "Damage",
                {"class": "input-dice"},
                {"name": "attack_damage_dice"},
            ),
            underlabeled_checkbox(
                "Magical?",
                None,
                {"name": "is_magical"},
            ),
            underlabeled_checkbox(
                "Targeted?",
                None,
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


def other_damaging_attack_button_text():
    return attack_button_text(
        construct_damage_text(
            "@{calculated_dice_pool}",
            "repeating_otherdamagingattacks_crit",
        )
    )


def nondamaging_attack():
    return shared_attack_framework(
        [
            underlabeled_checkbox(
                "Targeted?",
                None,
                {"name": "is_targeted"},
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
                ])
            ),
        ],
    )


def crit_damage_button(crit_damage_calculation, name, subtitle_suffix=""):
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


def construct_damage_text(normal_damage, crit_damage_button):
    return (
        " [["
        + normal_damage
        + "]]"
        + " [Crit](~"
        + crit_damage_button
        + ")"
    )


def weapon_attack_button(i):
    i = str(i)
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + " {{subtitle=@{character_name} - @{weapon_"
        + i
        + "_name}}}"
        + " @{targeting_text}"
        + " {{Attack=[[d10!+@{accuracy}+@{accuracy_with_strikes}+@{weapon_"
        + i
        + "_accuracy}+@{attack_accuracy}]] vs @{attack_defense_text}}}"
        + " {{Damage="
        + construct_damage_text(
            "@{weapon_" + i + "_total_damage}",
            "repeating_strikeattacks_crit_" + i,
        )
        + "}}"
        + " {{Tags=@{weapon_"
        + i
        + "_tags}}}"
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
    )


def attack_button_text(damage_text=None):
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " @{targeting_text}"
        + " {{Attack=[[d10!+@{accuracy}+@{attack_accuracy}]] vs @{attack_defense_text}}}"
        + ((" {{Damage=" + damage_text + "}}") if damage_text else "")
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
    )


def universal_ability_button(name, effect, attack=None, tags=None):
    tags = attack.get("tags", []) if attack else (tags or [])
    tags_text = f" {{{{Tags={', '.join(tags)}}}}}" if len(tags) > 0 else ""
    return div(
        button(
            {
                "type": "roll",
                "value": (
                    "&{template:custom}"
                    + f" {{{{title={name}}}}}"
                    + " {{subtitle=@{character_name}}}"
                    + tags_text
                    + (
                        f" {{{{Attack=[[d10!+{attack['accuracy']}]] vs {attack['defense']}}}}}"
                        if attack
                        else ""
                    )
                    + " {{color=@{chat_color}}}"
                    + f" {{{{desc={effect.strip()}}}}}"
                ),
            },
            name,
        )
    )


def universal_abilities():
    return flex_row(
        {"class": "universal_abilities"},
        [
            universal_ability_button(
                "Charge",
                """
                    After you use this ability, you briefly take a -2 penalty to all defenses.
                    Move up to your speed in a single straight line. At the end of your movement, you can make a melee strike from your new location.
                """,
            ),
            universal_ability_button(
                "Desperate Exertion",
                """
                    You reroll any attack or check you just made and gain a +2 bonus.
                    After you use this ability, you increase your fatigue level by two.
                """,
            ),
            universal_ability_button(
                "Escape Grapple",
                """
                    Make a brawling attack against any number of creatures that you are grappled by. The defense of each creature is equal to the result of its maintain grapple ability. If a creature did not use that ability during the current round, its defense against this ability is 0.
                    For each target, if you hit that target with this attack, it stops being grappled by you and you stop being grappled by it.
                """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Special", "tags": ["Brawling"]},
            ),
            universal_ability_button(
                "Grapple",
                """
                    Make a brawling attack with a free hand against the Fortitude and Reflex defenses of an adjacent creature.
                    On a hit against both defenses, you and the target are grappled by each other.
                """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Fort and Ref", "tags": ["Brawling", "Size-Based"]},
            ),
            universal_ability_button(
                "Jump",
                f"""
                    As part of movement, you can jump up to [[@{{jump_distance}}]] feet horizontally, and half that distance vertically.
                    You cannot jump farther than your land speed.
                """,
            ),
            universal_ability_button(
                "Maintain Grapple",
                """
                    Make a brawling attack using a free hand. This attack has no immediate effect. The attack result determines how difficult it is for a creature to escape the grapple during the current round using the escape grapple ability.
                """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "None", "tags": ["Brawling", "Swift"]},
            ),
            universal_ability_button(
                "Overrun",
                """
                    After you use this ability, you increase your fatigue level by one.
                    Move up to your movement speed in a straight line, even through creatures. Make a brawling attack vs. Fortitude against each creature that you move through who does not choose to avoid you.
                    On a hit, you move through each creature's space. On a miss, you end your movement immediately.
                 """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Fort", "tags": ["Brawling", "Size-Based"]},
            ),
            universal_ability_button(
                "Ready Reaction",
                """
                    When you use this ability, you declare another standard action that you intend to take during this phase as soon as it becomes possible.
                    If that action becomes possible during this phase, it happens.
                    Otherwise, your action is wasted.
                """,
            ),
            universal_ability_button(
                "Recover",
                """
                    After you use this ability, you increase your fatigue level by two, and you cannot use it again until you finish a short rest.
                    You regain half your maximum hit points and all of your damage resistance. In addition, you remove all conditions affecting you.
                """,
                tags=["Swift"],
            ),
            universal_ability_button(
                "Shove",
                """
                    Choose either one adjacent creature or all creatures grappling you. Make a brawling attack with a free hand against each target.
                    On a hit, you can move up to half your movement speed in a straight line, pushing each target as you move.
                 """,
                attack={"accuracy": "@{brawling_accuracy}", "defense": "Fort", "tags": ["Brawling", "Size-Based"]},
            ),
            universal_ability_button(
                "Sprint",
                """
                    You move up to double your normal land speed.
                    After you use this ability during the movement phase, you increase your fatigue level by one.
                    Using this ability during the action phase does not cost fatigue.
                """,
            ),
            universal_ability_button(
                "Total Defense",
                """
                    You gain a +2 bonus to your defenses this round. Because this ability has the Swift tag, this improves your defenses against attacks made against you during the current phase.
                """,
                tags=["Swift"],
            ),
            universal_ability_button(
                "Throw",
                """
                    You throw a creature or object 15 feet plus 5 feet per 2 Strength.
                    Some objects are much easier or harder to throw than others.
                    If the object's weight category matches your maximum carrying capacity, this distance is halved.
                    To throw an unwilling creature, it must already be grappled by you, and you must make a brawling attack vs. its Fortitude defense.
                """,
            ),
            universal_ability_button(
                "Trip",
                """
                    Make a melee attack with a free hand or a Tripping weapon against a creature's Fortitude and Reflex defenses.
                    On a hit, the target becomes prone.
                    If you used a Tripping weapon and beat the target's Armor defense, it also takes damage from the weapon.
                 """,
                attack={"accuracy": "@{accuracy}", "defense": "Ref", "tags": ["Brawling", "Size-Based"]},
            ),
        ],
    )
