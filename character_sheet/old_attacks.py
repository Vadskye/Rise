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

def old_attacks():
    return [
        div({"class": "section-header"}, "Magical Attacks"),
        fieldset(
            {"class": f"repeating_magicalattacks"},
            attack("magical"),
        ),
        div({"class": "section-header"}, "Mundane Attacks"),
        fieldset(
            {"class": f"repeating_mundaneattacks"},
            attack("mundane"),
        ),
        div({"class": "section-header"}, "Non-Damaging Attacks"),
        fieldset(
            {"class": f"repeating_attacks"},
            attack("nondamaging"),
        ),
    ]

# source: 'magical', 'mundane', 'nondamaging'
def attack(source):
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
                            {"name": "attack0_name"},
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
                                        "name": "attack0_accuracy",
                                        "value": "0",
                                    }
                                ),
                                {"class": "attack-bonus"},
                            ),
                            labeled_text_input(
                                "Defense",
                                {"class": "attack-defense"},
                                {"name": "attack0_defense"},
                            ),
                            labeled_text_input(
                                "Dmg",
                                {"class": "attack-dice"},
                                {"name": "attack0_dice"},
                            )
                            if source != "nondamaging"
                            else "",
                            underlabel(
                                "Power",
                                select(
                                    {"class": "attack-power", "name": "attack0_power"},
                                    [
                                        option({"value": "1", "selected": True}, "Full"),
                                        option({"value": "0.5"}, "Half"),
                                        option({"value": "0"}, "None"),
                                    ],
                                ),
                            )
                            if source != "nondamaging"
                            else "",
                        ],
                    ),
                ],
            ),
            labeled_textarea(
                "Effect",
                {"class": "attack-effect"},
                {"name": "attack0_effect"},
            ),
            button(
                {
                    "class": "attack-roll",
                    "name": f"use_ability",
                    "type": "roll",
                    "value": attack_button_text(source),
                },
                "Attack",
            ),
            button(
                {
                    "class": "hidden",
                    "name": f"damage_dice_only",
                    "type": "roll",
                    "value": crit_damage_text(),
                },
                "",
            ),
            button(
                {
                    "class": "hidden",
                    "name": f"power_only",
                    "type": "roll",
                    "value": glance_damage_text(source),
                },
                "",
            ),
        ],
    )

def attack_button_text(source):
    damage = {
        'nondamaging': '',
        'magical': '[[@{attack0_dice}+floor(@{magical_power}*@{attack0_power})]]',
        'mundane': '[[@{attack0_dice}+floor(@{mundane_power}*@{attack0_power})]]',
    }[source]
    repeating_section_name = {
        'nondamaging': 'repeating_attacks',
        'magical': 'repeating_magicalattacks',
        'mundane': 'repeating_mundaneattacks',
    }[source];
    damage_text = (
        " {{"
        + "Damage=" + damage
        + " [C](~" + repeating_section_name + "_damage_dice_only)"
        + " [G](~" + repeating_section_name + "_power_only)"
        + "}}"
    )if damage else ""
    return (
        "&{template:custom}"
        + " {{title=@{attack0_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " {{Attack=[[d10!+@{attack0_accuracy}+@{accuracy}]] vs @{attack0_defense}}}"
        + damage_text
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack0_effect}}}"
    )

def crit_damage_text():
    return (
        "&{template:custom}"
        + " {{title=@{attack0_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " {{Crit Damage=[[@{attack0_dice}]]}}"
        + " {{color=@{chat_color}}}"
    )

def glance_damage_text(source):
    return (
        "&{template:custom}"
        + " {{title=@{attack0_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " {{Glance Damage=[[floor(@{" + source + "_power}*@{attack0_power})]]}}"
        + " {{color=@{chat_color}}}"
    )
