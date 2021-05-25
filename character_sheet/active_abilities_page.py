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
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
import re

def create_page(destination):
    return flex_col(
        {"class": "page active-abilities-page"},
        [
            div({"class": "tab-explanation"}, """
                This tab is used to track the abilities that you can use.
                Each ability you add here will appear as a button on the Core page.
            """),
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
            flex_wrapper(div({"class": "section-header"}, "Other Abilities")),
            fieldset(
                {"class": f"repeating_abilities"},
                ability(),
            ),
        ],
    )

def ability():
    # TODO: make this legacy less dumb
    ability_number = 0
    return flex_row(
        {"class": "ability"},
        [
            labeled_text_input(
                "Name",
                {"class": "active-ability-name"},
                {"name": "active_ability0_name"},
            ),
            labeled_textarea(
                "Effect",
                {"class": "active-ability-effect"},
                {"name": "active_ability0_effect"},
            ),
            button(
                {
                    "class": "attack-roll",
                    "name": "use_ability",
                    "type": "roll",
                    "value": (
                        "&{template:custom}"
                        + " {{title=@{active_ability0_name}}}"
                        + " {{subtitle=@{character_name}}}"
                        + " {{color=@{chat_color}}}"
                        + " {{desc=@{active_ability0_effect}}}"
                    ),
                },
                "Use",
            ),
        ],
    )


def passive_abilities():
    return flex_col(
        {"class": "passive-abilities"},
        [
            flex_wrapper(div({"class": "section-header"}, "Passive Abilities")),
            "".join(
                [
                    flex_row(
                        {"class": "passive-ability-row"},
                        [
                            passive_ability(prefix="l", ability_number=i),
                            passive_ability(prefix="r", ability_number=i),
                        ],
                    )
                    for i in range(5)
                ]
            ),
        ],
    )


def passive_ability(prefix, ability_number):
    return div(
        text_input({"name": "passive{0}-{1}-name".format(ability_number, prefix)})
    )

    return flex_row(
        {"class": "passive-ability"},
        [
            labeled_text_input(
                "Name",
                {"class": "passive-name"},
                input_attributes={
                    "name": "passive{0}-{1}-name".format(ability_number, prefix),
                },
            ),
            labeled_textarea(
                "Effect",
                {"class": "passive-effect"},
                input_attributes={
                    "name": "passive{0}-{1}-effect".format(ability_number, prefix),
                },
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
        ],
    )

def attack_button_text(source):
    damage = {
        'nondamaging': '',
        'magical': '[[@{attack0_dice}+floor(@{magical_power}*@{attack0_power})]]',
        'mundane': '[[@{attack0_dice}+floor(@{mundane_power}*@{attack0_power})]]',
    }[source]
    damage_text = " {{Damage=" + damage + "}}" if damage else ""
    return (
        "&{template:custom}"
        + " {{title=@{attack0_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " {{Attack=[[d10!+@{accuracy}+@{attack0_accuracy}]] vs @{attack0_defense}}}"
        + damage_text
        + " {{color=@{chat_color}}}"
        + " {{desc=@{attack0_effect}}}"
    )
