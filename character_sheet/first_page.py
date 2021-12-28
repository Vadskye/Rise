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
    sidelabeled_number_input,
    labeled_textarea,
    labeled_text_input,
    number_input,
    option,
    select,
    sidelabel,
    span,
    subtlebutton,
    text_input,
    textarea,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)
from active_abilities_page import attack_button_text, calc_attack_power, construct_damage_text, other_damaging_attack_button_text, crit_damage_button, glance_damage_button
from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS, SUBSKILLS
import re


def create_page(destination):
    return flex_col( {"class": "page first-page"}, [
        boring_stuff(destination),
        flex_row([
            flex_col(
                {"class": "sidebar"},
                [
                    attributes_and_skills(),
                ],
            ),
            flex_col(
                {"class": "main-body"},
                [
                    statistics_header(destination),
                    *(roll20_abilities() if destination == "roll20" else paper_abilities()),
                ],
            ),
        ]),
    ])

def paper_abilities():
    return [
        div({"class": "section-header"}, "Attacks and Abilities"),
        *[paper_ability() for i in range(12)],
    ]

def paper_ability():
    return flex_row({"class": "paper-ability"}, [
        labeled_text_input("Name", {"class": "ability-name"}),
        labeled_textarea("Effect", {"class": "ability-effect"}),
    ])

def roll20_abilities():
    return [
        div({"class": "section-header"}, "Strike-Based Attacks"),
        flex_row(
            {"class": "active-ability-group"},
            fieldset(
                {"class": f"repeating_strikeattacks"},
                active_ability_button("strike-based attack"),
            ),
        ),
        div({"class": "section-header"}, "Other Damaging Attacks"),
        flex_row(
            {"class": "active-ability-group"},
            fieldset(
                {"class": f"repeating_otherdamagingattacks"},
                active_ability_button("other damaging attack"),
            ),
        ),
        div({"class": "section-header"}, "Non-Damaging Attacks"),
        flex_row(
            {"class": "active-ability-group"},
            fieldset(
                {"class": f"repeating_nondamagingattacks"},
                active_ability_button("nondamaging attack"),
            ),
        ),
        div({"class": "section-header"}, "Other Abilities"),
        flex_row(
            {"class": "active-ability-group"},
            fieldset(
                {"class": f"repeating_abilities"},
                active_ability_button("ability"),
            ),
        ),
        flex_wrapper(div({"class": "section-header"}, "Custom Modifiers")),
        flex_row(
            {"class": "active-ability-group"},
            fieldset(
                {'class': 'repeating_custommodifiers'},
                custom_modifier_toggle(),
            ),
        ),
    ]


def attributes_and_skills():
    return flex_col(
        {"class": "attributes-and-skills"},
        [
            flex_wrapper(div({"class": "section-header"}, "Attributes and Skills")),
            "".join([attribute_section(attribute.lower()) for attribute in ATTRIBUTES]),
            flex_col(
                {"class": "other-skills attribute-section"},
                [
                    flex_row(
                        {"class": "attribute"},
                        [
                            div({"class": "attribute-header"}, "Other Skills"),
                        ],
                    ),
                    "".join([skill_box(skill) for skill in ATTRIBUTE_SKILLS["other"]]),
                    freeform_number_input(
                        {"class": "skill-box"},
                        {"name": "other_skill_1_name"},
                        {"name": "other_skill_1"},
                    ),
                ],
            ),
        ],
    )


def attribute_section(attribute):
    attribute_modifier = (
        f"(@{{{attribute}}} - @{{encumbrance}})"
        if attribute in ["strength", "dexterity"]
        else f"@{{{attribute}}}"
    )
    return flex_col(
        {"class": f"{attribute} attribute-section"},
        [
            flex_row(
                {"class": "attribute"},
                [
                    span(
                        {"class": "attribute-header number-label"},
                        invisiblebutton(
                            {
                                "name": f"roll_{attribute}",
                                "type": "roll",
                                "value": f"@{{character_name}} rolls {attribute.capitalize()}: [[d10+{attribute_modifier}]]",
                            },
                            attribute.capitalize(),
                        ),
                    ),
                    number_input(
                        {
                            "disabled": True,
                            "name": f"{attribute}_display",
                            "value": "(@{" + attribute + "})",
                        }
                    ),
                ],
            ),
            "".join([skill_box(skill) for skill in ATTRIBUTE_SKILLS[attribute]]),
        ],
    )


def skill_box(name):
    if name in SUBSKILLS:
        return subskill_box(name)

    formatted_skill = name.lower().replace(" ", "_")
    return flex_row(
        {"class": "skill-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_skill_{formatted_skill}",
                    "type": "roll",
                    "value": f"@{{character_name}} uses {name}: [[d10 + @{{{formatted_skill}_total}}]]",
                },
                name,
            ),
            number_input(
                {
                    "disabled": True,
                    "name": formatted_skill + "_total_display",
                    "value": "@{" + formatted_skill + "_total}",
                }
            ),
        ],
    )


def subskill_box(name):
    formatted_skill = name.lower().replace(" ", "_")
    visible_skill_name = re.sub('\\d', '', name).title()
    return flex_row(
        {"class": "skill-box"},
        [
            subtlebutton(
                {
                    "class": "skill-button",
                    "name": f"roll_skill_{formatted_skill}",
                    "type": "roll",
                    "value": f"@{{character_name}} uses {visible_skill_name} (@{{{formatted_skill}_type}}): [[d10 + @{{{formatted_skill}_total}}]]",
                },
                visible_skill_name,
            ),
            text_input(
                {
                    "class": "subskill-type",
                    "disabled": True,
                    "name": f"{formatted_skill}_type_display",
                    "value": f"@{{{formatted_skill}_type}}",
                }
            ),
            number_input(
                {
                    "disabled": True,
                    "name": formatted_skill + "_total_display",
                    "value": "@{" + formatted_skill + "_total}",
                }
            ),
        ],
    )


def statistics_header(destination):
    return "".join(
        [
            flex_row(
                {"class": "all-statistics"},
                [
                    core_statistics(),
                    defenses(),
                    movement(destination),
                ],
            )
        ]
    )


def defenses():
    return flex_col(
        {"class": "defenses"},
        [
            div({"class": "section-header"}, "Defenses"),
            flex_row({"class": "defenses-row"}, [
                flex_col({"class": "standard-defenses"}, [
                    sidelabeled_number_input(
                        defense,
                        input_attributes={
                            "disabled": "true",
                            "name": defense.lower() + "_display",
                            "value": "@{"
                            + (
                                "armor_defense"
                                if defense == "Armor"
                                else defense.lower()
                            )
                            + "}",
                        },
                    )
                    for defense in DEFENSES
                ]),
                textarea({"class": "special-defenses", "name": f"special_defenses"}),
            ]),
        ],
    )


def resistances():
    return flex_col(
        {"class": "damage-resistances"},
        [
            flex_wrapper(div({"class": "section-header"}, "Resistances")),
            "".join(
                [
                    sidelabel(
                        "Physical",
                        flex_row(
                            {"class": "core-statistics-split"},
                            [
                                number_input(
                                    {
                                        "name": "physical_resistance",
                                        "value": "@{physical_resistance}",
                                    }
                                ),
                                span({"class": "core-statistics-separator"}, "/"),
                                number_input(
                                    {
                                        "disabled": True,
                                        "name": "physical_resistance_maximum_display",
                                        "value": "@{physical_resistance_maximum}",
                                    }
                                ),
                            ],
                        ),
                    ),
                    sidelabel(
                        "Energy",
                        flex_row(
                            {"class": "core-statistics-split"},
                            [
                                number_input(
                                    {
                                        "name": "energy_resistance",
                                        "value": "@{energy_resistance}",
                                    }
                                ),
                                span({"class": "core-statistics-separator"}, "/"),
                                number_input(
                                    {
                                        "disabled": True,
                                        "name": "energy_resistance_maximum_display",
                                        "value": "@{energy_resistance_maximum}",
                                    }
                                ),
                            ],
                        ),
                    ),
                    flex_row(
                        [
                            text_input({"class": "freeform-resistance-name", "name": "resistance_freeform_name"}),
                            number_input({"name": "resistance_freeform_current"}),
                            span({"class": "core-statistics-separator"}, "/"),
                            number_input({"name": "resistance_freeform_maximum"}),
                        ],
                    ),
                    flex_row(
                        [
                            text_input({"class": "freeform-resistance-name", "name": "resistance_freeform_name_2"}),
                            number_input({"name": "resistance_freeform_current_2"}),
                            span({"class": "core-statistics-separator"}, "/"),
                            number_input({"name": "resistance_freeform_maximum_2"}),
                        ],
                    ),
                ]
            ),
        ],
    )


def core_statistics():
    return flex_col(
        {"class": "core-statistics"},
        [
            flex_wrapper(div({"class": "section-header"}, "Core Statistics")),
            sidelabel(
                "Hit points",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "hit_points",
                                "value": "@{hit_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "hit_points_maximum_display",
                                "value": "@{hit_points_maximum}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabel(
                "DR",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "damage_resistance",
                                "value": "@{damage_resistance}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "damage_resistance_maximum_display",
                                "value": "@{damage_resistance_maximum}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabel(
                "Fatigue level",
                flex_row(
                    {"class": "core-statistics-split"},
                    [
                        number_input(
                            {
                                "name": "fatigue_points",
                                "value": "@{fatigue_points}",
                            }
                        ),
                        span({"class": "core-statistics-separator"}, "/"),
                        number_input(
                            {
                                "disabled": True,
                                "name": "fatigue_tolerance_display_first_page",
                                "value": "@{fatigue_tolerance}",
                            }
                        ),
                    ],
                ),
            ),
            sidelabeled_number_input(
                "Accuracy",
                input_attributes={
                    "disabled": True,
                    "name": f"accuracy_display",
                    "value": "@{accuracy}",
                },
            ),
        ],
    )


def movement(destination):
    return flex_col(
        {"class": "movement"},
        [
            flex_wrapper(div({"class": "section-header"}, "Movement")),
            sidelabeled_number_input(
                "Land",
                input_attributes={
                    "disabled": True,
                    "name": f"land_speed_display",
                    "value": "@{land_speed}",
                },
            ),
            *[
                freeform_number_input(
                    text_input_attributes={"name": f"movement_speed_{i}_name"}, number_input_attributes={"name": f"movement_speed_{i}_value"},
                )
                for i in range(2)
            ],
            (
                sidelabel(
                    "Initiative",
                    number_input(
                        {
                            "disabled": True,
                            "name": "initiative_display",
                            "value": "@{initiative}",
                        }
                    ),
                )
                if destination == "paper"
                else flex_row(
                    {"class": "sidelabeled-number-input"},
                    [
                        flex_wrapper(
                            {"class": "core-initiative"},
                            subtlebutton(
                                {
                                    "name": "roll_initiative",
                                    "type": "roll",
                                    "value": f"@{{character_name}} rolls initiative: [[d10+@{{initiative}}]]",
                                },
                                "Initiative",
                            ),
                        ),
                        number_input(
                            {
                                "disabled": True,
                                "name": "initiative_display",
                                "value": "@{initiative}",
                            }
                        ),
                    ],
                )
            ),
        ],
    )

def active_ability_button(ability_type):
    prefix = "active_ability0" if ability_type == "ability" else "attack"
    button_name = "use_ability"
    button_value = {
        "ability": (
            "&{template:custom}"
            + " {{title=@{active_ability0_name}}}"
            + " {{subtitle=@{character_name}}}"
            + " {{color=@{chat_color}}}"
            + " {{desc=@{active_ability0_effect}}}"
        ),
        "nondamaging attack": attack_button_text(),
        "other damaging attack": other_damaging_attack_button_text(),
        "strike-based attack": weapon_attack_button_text(),
    }[ability_type]
    extra_buttons = []
    if ability_type == "strike-based attack":
        for i in range(3):
            i = str(i)
            extra_buttons.append(text_input({"class": "hidden", "name": f"weapon_{i}_adjusted_dice"}))
            extra_buttons.append(crit_damage_button(
                "@{weapon_" + i + "_adjusted_dice}",
                "crit_" + i,
                " - @{weapon_" + i + "_name}",
            ))
            extra_buttons.append(glance_damage_button(
                "@{attack_damage_modifier}+" + calc_attack_power(),
                "glance_" + i,
                " - @{weapon_" + i + "_name}",
            ))

    return div({"class": "active-ability-button"}, [
        text_input({"class": "hidden", "name": prefix + "_accuracy", "value": "0"}),
        text_input({"class": "hidden", "name": prefix + "_defense"}),
        text_input({"class": "hidden", "name": prefix + "_damage_dice"}),
        text_input({"class": "hidden", "name": prefix + "_damage_modifier"}),
        checkbox({"class": "hidden", "name": prefix + "_is_magical", "value": "1"}),
        underlabel(
            "Power",
            select(
                {"class": "attack-power", "name": prefix + "_power"},
                [
                    option({"value": "1", "selected": True}, "Full"),
                    option({"value": "0.5"}, "Half"),
                    option({"value": "0"}, "None"),
                ],
            ),
            {"class": "hidden"},
        ),
        textarea({"class": "hidden", "name": prefix + "_effect"}),
        button(
            {
                "class": "attack-roll",
                "name": button_name,
                "type": "roll",
                "value": button_value,
            },
            text_input({"class": "attack-label", "readonly": True, "name": prefix + "_name"}),
        ),
        *extra_buttons,
    ])

def weapon_attack_button_text():
    return (
        "&{template:custom}"
        + " {{title=@{attack_name}}}"
        + "?{Weapon"
            + "| " + weapon_template(0)
            + "| " + weapon_template(1)
            + "| " + weapon_template(2)
        + "}"
        + " {{color=@{chat_color}}}"
        + " @{debuff_headers}"
        + " {{desc=@{attack_effect}}}"
    )

def weapon_template(i):
    i = str(i)

    return (
        " @{weapon_" + i + "_name},"
        + " {{subtitle=@{character_name} - @{weapon_" + i + "_name}&amp;#125;&amp;#125;"
        + " {{Attack=[[d10!+@{accuracy}+@{weapon_" + i + "_accuracy}+@{attack_accuracy}]] vs @{attack_defense}&amp;#125;&amp;#125;"
        + " {{Damage=[[[[@{weapon_" + i + "_adjusted_dice}]] + [[" + calc_attack_power() + "+@{attack_damage_modifier}]]]] = $[[1]] + $[[3]]&amp;#125;&amp;#125;"
        + " {{Tags=@{weapon_" + i + "_tags}&amp;#125;&amp;#125;"
    ).replace('~', '&amp;#126;')

def custom_modifier_toggle():
    return flex_row({"class": "custom-modifier-toggle"}, [
        checkbox({"class": "is-active", "name": "is_active"}),
        text_input({"name": "name", "readonly": True}),
    ])

def boring_stuff(destination):
    return div(
        {"class": "boring-stuff"},
        [
            flex_row(
                {"class": "boring-row"},
                [
                    labeled_text_input(
                        "Character name", input_attributes={"name": "character_name"}
                    ),
                    labeled_text_input(
                        "Player name", input_attributes={"name": "player_name"}
                    ),
                    labeled_text_input("Concept", input_attributes={"name": "concept"}),
                    underlabel_spaced(
                        "Level",
                        number_input({"class": "fake-text", "name": "level"}),
                        attributes={"class": "level-input"},
                    ),
                    *(
                        [
                            underlabel("CR", select(
                                {"class": "challenge-rating", "name": "challenge_rating"},
                                [
                                    option({"value": ""}, ""),
                                    option({"value": "0.5"}, "Half"),
                                    option({"value": "1"}, "One"),
                                    option({"value": "2"}, "Two"),
                                    option({"value": "4"}, "Four"),
                                    option({"value": "6"}, "Six"),
                                ],
                            )),
                            underlabel("Chat color", select(
                                {"class": "chat-color", "name": "chat_color"},
                                [
                                    option({"value": "black"}, "Black"),
                                    option({"value": "blue"}, "Blue"),
                                    option({"value": "bluegreen"}, "Bluegreen"),
                                    option({"value": "brown"}, "Brown"),
                                    option({"value": "gold"}, "Gold"),
                                    option({"value": "gray"}, "Gray"),
                                    option({"value": "green"}, "Green"),
                                    option({"value": "orange"}, "Orange"),
                                    option({"value": "purple"}, "Purple"),
                                ],
                            ))
                        ]
                        if destination == "roll20"
                        else []
                    ),
                ],
            ),
        ],
    )
