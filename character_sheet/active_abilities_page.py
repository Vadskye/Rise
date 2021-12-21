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
from old_attacks import old_attacks

def create_page(destination):
    return flex_col(
        {"class": "page active-abilities-page"},
        [
            div({"class": "tab-explanation"}, """
                This tab is used to track the abilities that you can use.
                Each ability you add here will appear as a button on the Core page.
                If you add a line with the format "Header=Effect" in an ability description, that line will become a special header for that ability, just like the "Attack" and "Defense" headers that are normally part of attacks.
            """),
            # New attacks
            div({"class": "section-header"}, "Strike-Based Attacks"),
            fieldset(
                {"class": f"repeating_strikeattacks"},
                strike_based_attack(),
            ),
            div({"class": "section-header"}, "Other Damaging Attacks"),
            fieldset(
                {"class": f"repeating_otherdamagingattacks"},
                other_damaging_attack(),
            ),
            div({"class": "section-header"}, "Non-Damaging Attacks"),
            fieldset(
                {"class": f"repeating_nondamagingattacks"},
                nondamaging_attack(),
            ),
            # Old attacks for backwards compatibility
            # *old_attacks(),
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
            flex_col({"class": "attack-buttons"}, buttons),
        ],
    )

def strike_based_attack():
    return shared_attack_framework(
        [
            labeled_number_input(
                "+Dmg",
                {"class": "attack-damage-modifier"},
                {"name": "attack_damage_modifier"},
            ),
            underlabel(
                "Power",
                select(
                    {"class": "attack-power", "name": "attack_power"},
                    [
                        option({"value": "1", "selected": True}, "Full"),
                        option({"value": "0.5"}, "Half"),
                        option({"value": "0"}, "None"),
                    ],
                ),
            ),
            underlabeled_checkbox(
                "Magical?",
                {"class": "attack-is-magical"},
                {"name": "attack_is_magical"},
            ),
        ],
        [
            *weapon_buttons(0),
            *weapon_buttons(1),
            *weapon_buttons(2),
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
            text_input({"disabled": True, "name": "weapon_attack_name_" + i, "value": "@{weapon_" + i + "_name}"}),
        ),
        crit_damage_button(
            "@{weapon_" + i + "_damage_dice}",
            "crit_" + i,
            " - @{weapon_" + i + "_name}",
        ),
        glance_damage_button(
            "@{attack_damage_modifier}+" + calc_attack_power(),
            "glance_" + i,
            " - @{weapon_" + i + "_name}",
        ),
    ]


def other_damaging_attack():
    return shared_attack_framework(
        [
            labeled_text_input(
                "Dice",
                {"class": "attack-damage-dice"},
                {"name": "attack_damage_dice"},
            ),
            underlabel(
                "Power",
                select(
                    {"class": "attack-power", "name": "attack_power"},
                    [
                        option({"value": "1", "selected": True}, "Full"),
                        option({"value": "0.5"}, "Half"),
                        option({"value": "0"}, "None"),
                    ],
                ),
            ),
            underlabeled_checkbox(
                "Magical?",
                None,
                {"class": "attack-is-magical", "name": "attack_is_magical"},
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
                "Attack",
            ),
            crit_damage_button("@{attack_damage_dice}", "crit"),
            glance_damage_button(calc_attack_power(), "glance"),
        ],
    )

def other_damaging_attack_button_text():
    return attack_button_text(construct_damage_text(
        "@{attack_damage_dice}+" + calc_attack_power(),
        "repeating_otherdamagingattacks_crit",
        "repeating_otherdamagingattacks_glance",
    ))

def calc_attack_power():
    return (
        "[[floor(@{magical_power}*@{attack_power}*@{attack_is_magical})"
        + "+ floor(@{mundane_power}*@{attack_power}*abs(1 - @{attack_is_magical}))]]"
    )

def nondamaging_attack():
    return shared_attack_framework([], [
        button(
            {
                "class": "attack-roll",
                "name": f"use_ability",
                "type": "roll",
                "value": attack_button_text(),
            },
            "Attack",
        ),
    ])

def crit_damage_button(crit_damage_calculation, name, subtitle_suffix=""):
    return button(
        {
            "class": "hidden",
            "name": name,
            "type": "roll",
            "value": (
                "&{template:custom}"
                + " {{title=@{attack_name}}}"
                + " {{subtitle=@{character_name}" + subtitle_suffix + "}}"
                + " {{Crit Damage=[[" + crit_damage_calculation + "]]}}"
                + " {{color=@{chat_color}}}"
            ),
        },
        "",
    )

def glance_damage_button(glance_damage_calculation, name, subtitle_suffix=""):
    return button(
        {
            "class": "hidden",
            "name": name,
            "type": "roll",
            "value": (
                "&{template:custom}"
                + " {{title=@{attack_name}}}"
                + " {{subtitle=@{character_name}" + subtitle_suffix + "}}"
                + " {{Glance Damage=[[" + glance_damage_calculation + "]]}}"
                + " {{color=@{chat_color}}}"
            )
        },
        "",
    )

def construct_damage_text(normal_damage, crit_damage_button, glance_damage_button):
    return (
        " [[" + normal_damage + "]]"
        + " [C](~" + crit_damage_button + ")"
        + " [G](~" + glance_damage_button + ")"
    )

def weapon_attack_button(i):
    i = str(i)
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + " {{subtitle=@{character_name} - @{weapon_" + i + "_name}}}"
        + " {{Attack=[[d10!+@{accuracy}+@{weapon_" + i + "_accuracy}+@{attack_accuracy}]] vs @{attack_defense}}}"
        + " {{Damage=" + construct_damage_text(
            "@{weapon_" + i + "_damage_dice}+" + calc_attack_power() + "+@{attack_damage_modifier}",
            "repeating_strikeattacks_crit_" + i,
            "repeating_strikeattacks_glance_" + i,
        ) + "}}"
        + " {{Tags=@{weapon_" + i + "_tags}}}"
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
    )

def attack_button_text(damage_text=None):
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + " {{subtitle=@{character_name}}}"
        + " {{Attack=[[d10!+@{accuracy}+@{attack_accuracy}]] vs @{attack_defense}}}"
        + ((" {{Damage=" + damage_text + "}}") if damage_text else "")
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
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
            After you use this ability, you briefly take a -2 penalty to all defenses.
            Move up to your speed in a single straight line. At the end of your movement, you can make a melee strike from your new location.
        """),
        universal_ability_button("Escape Grapple", """
            Make an attack against any number of creatures that you are grappled by. Add the highest of your accuracy ([[@{accuracy}]]), your Strength ([[@{strength}]]), or your Flexibility ([[@{flexibility_total}]]) to your accuracy.
            The defense of each creature is equal to the result of its maintain grapple ability. If a creature did not use that ability during the current round, its defense against this ability is 0.
            For each target, if you hit that target with this attack, it stops being grappled by you and you stop being grappled by it.
        """, attack={"accuracy":"", "defense":"Special"}),
        universal_ability_button("Desperate Exertion", """
            After you use this ability, you increase your fatigue level by two.
            You reroll any attack or check you just made and gain a +2 bonus.
        """),
        universal_ability_button("Dirty Trick", """
            Make a melee attack with a free hand against the Fortitude or Reflex defense of one creature within your reach. On a hit, the target suffers a -2 penalty to one defense of your choice: Armor, Fortitude, Reflex, or Mental.
            If the target is at its maximum hit points, this is a brief effect. Otherwise, this effect is a condition.
         """, attack={"accuracy":"@{accuracy}", "defense":"Fort or Ref"}),
        universal_ability_button("Disarm", """
            Make a melee strike against an object's Reflex defense.
            On a hit, it may take damage from your strike. If it is attended and not held in a hand or well secured, you can choose to knock it loose. On a crit, you can deal double damage and you can also knock loose objects that are held in a single hand.
         """, attack={"accuracy":"@{accuracy}", "defense":"Ref"}),
        universal_ability_button("Grapple", """
            Make a melee attack with a free hand against the Fortitude and Reflex defenses of one creature within your reach. For each size category by which the target is larger than you, you take a -4 penalty to accuracy.
            On a hit against both defenses, you and the target are grappled by each other.
        """, attack={"accuracy":"@{accuracy}", "defense":"Fort and Ref"}),
        universal_ability_button("Maintain Grapple", """
            Make an attack using a free hand. Add the higher of your accuracy ([[@{accuracy}]]) or your Strength ([[@{strength}]]) to your accuracy.
            This attack has no immediate effect. The attack result determines how difficult it is for a creature to escape the grapple during the current round using the escape grapple ability.
        """, attack={"accuracy":"", "defense":"None"}),
        universal_ability_button("Overrun", """
            After you use this ability, you increase your fatigue level by one.
            Move up to your movement speed in a straight line, even through creatures. Make an attack vs. Fortitude against each creature that you move through who does not choose to avoid you. For each size category by which you are larger or smaller than the target, you gain a +4 bonus or penalty to accuracy.
            On a hit, you move through each creature's space. On a critical hit, you also knock each creature prone. On a miss, you end your movement immediately.
         """, attack={"accuracy": "", "defense": "Fort"}),
        universal_ability_button("Recover", """
            After you use this ability, you increase your fatigue level by two, and you cannot use it again until you take a short rest.
            You regain hit points equal to your maximum hit points. In addition, you remove all brief effects and conditions affecting you. This cannot remove effects applied during the current round.
        """),
        universal_ability_button("Shove", """
            Choose either one creature within your reach or all creatures grappling you. Make a melee attack with a free hand against both the Fortitude defense and total Strength of each target. Your accuracy with this attack is equal to your Strength. If you are not able to use any of your movement speeds, such as if you are being carried by a flying creature, you automatically fail when you try to use this ability, and your defense is treated as 0 against this ability.
            On a hit, you can move up to half your movement speed in a straight line, pushing each target as you move. On a critical hit, you can move up to your full movement speed instead.
         """, attack={"accuracy":"@{strength}", "defense":"Fort and Strength"}),
        universal_ability_button("Sprint", """
            After you use this ability, you increase your fatigue level by one.
            You move up to double your normal movement speed.
        """),
        universal_ability_button("Throw", """
            Make a Strength check to throw an object you hold in at least one hand. The base difficulty value of this check is 0. For each size category larger or smaller than the target that you are, you gain a +10 bonus or penalty to the check. You cannot throw an object whose weight exceeds your maximum carrying capacity.
            If you succeed, you throw the object five feet. For every 5 points by which you succeed, you double the distance you throw the object: ten feet, twenty feet, and so on. If you throw the object at a creature or object, you can make an attack roll to hit it with the thrown object. That attack roll is rolled separately from the Strength check you make to use this ability.
        """),
        universal_ability_button("Trip", """
            Make a melee attack with a free hand against a creature's Reflex defenses. For each size category by which the target is larger than you, you take a -4 penalty to accuracy.
            On a hit, the target becomes prone.
         """, attack={"accuracy":"@{accuracy}", "defense":"Ref"}),
        universal_ability_button("Total Defense", """
            You gain a +2 bonus to your defenses until the end of the round. Because this ability has the Swift tag, this improves your defenses against attacks made against you during the current phase.
        """),
    ])
