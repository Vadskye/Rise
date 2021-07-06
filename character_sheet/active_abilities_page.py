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
                If you add a line with the format "Header=Effect" in an ability description, that line will become a special header for that ability, just like the "Attack" and "Defense" headers that are normally part of attacks.
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
            flex_wrapper(div({"class": "section-header"}, "Ability Text Modifiers")),
            flex_row({"class": "prefix-suffix"}, [
                *attack_text_modifier("Prefix", "prefix"),
                *attack_text_modifier("Suffix", "suffix"),
            ]),
            flex_wrapper(div({"class": "section-header"}, "Other Abilities")),
            fieldset(
                {"class": f"repeating_abilities"},
                ability(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Universal Abilities")),
            universal_abilities(),
            div("""
                These buttons cannot be customized.
                If you have special benefits with some of these abilities, create your own versions of them above.
            """),
        ],
    )

def attack_text_modifier(label, name):
    return [
        labeled_text_input(label, input_attributes={
            "name": f"custom_attack_{name}_raw",
            "value": "",
        }),
        textarea({
            "class": "hidden",
            "disabled": True,
            "name": f"custom_attack_{name}",
            "value": "",
        }),
    ]

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
                {"name": "active_ability0_effect_raw"},
            ),
            textarea({
                "class": "hidden",
                "name": "active_ability0_key_value_pairs",
                "value": "",
            }),
            textarea({
                "class": "hidden",
                "name": "active_ability0_effect",
                "value": "",
            }),
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
                        + " @{active_ability0_key_value_pairs}"
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
                {"name": "attack0_effect_raw"},
            ),
            textarea({
                "class": "hidden",
                "name": "attack0_key_value_pairs",
                "value": "",
            }),
            textarea({
                "class": "hidden",
                "name": "attack0_effect",
                "value": "",
            }),
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
        + " @{attack0_key_value_pairs}"
        + " {{desc=@{debuff_attack_prefix}@{custom_attack_prefix}@{attack0_effect}@{custom_attack_suffix}}}"
    )

def universal_ability_button(name, effect, attack=None):
    return div(button(
        {
            "type": "roll",
            "value": (
                "&{template:custom}"
                + f" {{{{title={name}}}}}"
                + " {{subtitle=@{character_name}}}"
                + (f" {{{{Attack=[[d10!+{attack['accuracy']}]] vs {attack['defense']}}}}}" if attack else "")
                + " {{color=@{chat_color}}}"
                + f" {{{{desc={effect.strip()}}}}}"
            ),
        },
        name,
    ))

def universal_abilities():
    return flex_row({"class": "universal_abilities"}, [
        universal_ability_button("Charge", """
            After you use this ability, you increase your fatigue level by one.
            Move up to your speed in a single straight line. At the end of your movement, you can make a melee strike from your new location.
        """),
        universal_ability_button("Desperate Exertion", """
            After you use this ability, you increase your fatigue level by two.
            You reroll any attack or check you just made and gain a +2 bonus.
        """),
        universal_ability_button("Dirty Trick", """
            Make a melee attack with a free hand against the Fortitude or Reflex defense of one creature within your reach. On a hit, the subject suffers a -2 penalty to one of the following statistics: accuracy with mundane abilities, Armor defense, Fortitude defense, Reflex defense, or Mental defense.
            If the subject is at its maximum hit points, this is a \\glossterm<brief> effect. Otherwise, this effect is a condition.
         """, attack={"accuracy":"@{accuracy}", "defense":"Fort or Ref"}),
        universal_ability_button("Disarm", """
            Make a melee strike against an object's Reflex defense.
            On a hit, it may take damage from your strike. If it is attended and not held in a hand or well secured, you can choose to knock it loose. On a crit, you can deal double damage and you can also knock loose objects that are held in a single hand.
         """, attack={"accuracy":"@{accuracy}", "defense":"Ref"}),
        universal_ability_button("Grapple", """
            Make a melee attack with a free hand against the Fortitude and Reflex defenses of one creature within your reach. For each size category by which the target is larger than you, you take a -4 penalty to accuracy.
            On a hit against both defenses, you and the target are grappled by each other.
         """, attack={"accuracy":"@{accuracy}", "defense":"Fort and Ref"}),
        universal_ability_button("Overrun", """
            After you use this ability, you increase your fatigue level by one.
            Move up to your movement speed in a straight line, even through creatures. Make an attack vs. Fortitude against each creature that you move through who does not choose to avoid you. For each size category by which you are larger or smaller than the target, you gain a +4 bonus or penalty to accuracy.
            On a hit, you move through each creature's space. On a critical hit, you also knock each creature prone. On a miss, you end your movement immediately.
        """),
        universal_ability_button("Recover", """
            After you use this ability, you increase your fatigue level by two, and you cannot use it again until you take a short rest.
            You regain hit points equal to your maximum hit points. In addition, you remove all \\glossterm<brief> effects and conditions affecting you. This cannot remove effects applied during the current round.
        """),
        universal_ability_button("Shove", """
            Choose either one creature within your reach or all creatures grappling you. Make a melee attack with a free hand against both the Fortitude defense and total Strength of each target. Your accuracy with this attack is equal to your Strength. If you are not able to use any of your movement speeds, such as if you are being carried by a flying creature, you automatically fail when you try to use this ability, and your defense is treated as 0 against this ability.
            On a hit, you can move up to half your movement speed in a straight line, pushing each subject as you move. On a critical hit, you can move up to your full movement speed instead.
         """, attack={"accuracy":"@{strength}", "defense":"Fort and Strength"}),
        universal_ability_button("Sprint", """
            After you use this ability, you increase your fatigue level by one.
            You move up to double your normal movement speed.
        """),
        universal_ability_button("Throw", """
            Make a Strength check to throw an object you hold in at least one hand. The base difficulty rating of this check is 0. For each size category larger or smaller than the target that you are, you gain a +10 bonus or penalty to the check. You cannot throw an object whose weight exceeds your maximum carrying capacity.
            If you succeed, you throw the object five feet. For every 5 points by which you succeed, you double the distance you throw the object: ten feet, twenty feet, and so on. If you throw the object at a creature or object, you can make an attack roll to hit it with the thrown object. That attack roll is rolled separately from the Strength check you make to use this ability.
        """),
        universal_ability_button("Total Defense", """
            You gain a +2 bonus to your defenses until the end of the round. Because this ability has the Swift tag, this improves your defenses against attacks made against you during the current phase.
        """),
        universal_ability_button("Trip", """
            Make a melee attack with a free hand against a creature's Reflex defenses. For each size category by which the target is larger than you, you take a -4 penalty to accuracy.
            On a hit, the subject becomes prone.
         """, attack={"accuracy":"@{accuracy}", "defense":"Ref"}),
    ])
