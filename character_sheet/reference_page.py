from cgi_simple import (
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    labeled_text_input,
    li,
    minus,
    number_input,
    ol,
    p,
    plus,
    span,
    text_input,
    ul,
    underlabel,
)
from sheet_worker import standard_damage_at_power


def create_page(_destination):
    return flex_col(
        {"class": "page reference-page"},
        [
            flex_row({'class': 'reference-row'}, [
                standard_damage(),
                flex_col([
                    skill_modifiers(),
                    vital_wound_chart(),
                ]),
                common_concepts(),
            ]),
            character_creation(),
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
        2: "Half max HP and resistances",
        3: "-2 accuracy",
        4: "-2 defenses",
        5: "-1 vital rolls",
        6: "Half speed below max HP",
        7: "Half max resistances",
        8: "-1 accuracy",
        9: "-1 defenses",
        "10+": "No effect",
    }[roll]

def skill_modifiers():
    return flex_col([
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
                        div("Mastered"),
                    ]
                ),
                flex_col(
                    [
                        div(
                            {"class": "skill-modifier-reminder-header"},
                            "Modifier",
                        ),
                        div("Base attribute"),
                        div("1 + half level + base attribute"),
                        div("3 + level + base attribute"),
                    ]
                ),
            ],
        ),
    ])

def character_creation():
    return ''.join([
        div(
            {"class": "section-header character-creation-header"},
            "Character Creation",
        ),
        ol({'class': 'character-creation'}, [
            li([
                "Increase your level to at least 1.",
                ul([
                    li("A lot of the sheet calculations don't work if your level is 0. In general, if your sheet isn't calculating something correctly, increasing your level and then reducing it will fix the problem - unless Roll20 itself is having trouble."),
                ]),
            ]),
            li([
                'Choose narrative aspects of your character.',
                ul([
                    li('Your fundamental character concept are written near the top of the Core tab.'),
                    li('Your personality, backstory, alignment, and deity are written in the Identity tab. You can fill out as many or as few of those fields as you want.'),
                ]),
            ]),
            li([
                'Choose your species.',
                ul([
                    li('Your chosen species is written in the top left of the Identity tab in the text box labeled "Species", under the "Species Info" header.'),
                    li('Your species determines your size and languages known. Those are written next to your species in the Identity tab.'),
                    li('Many species modify your base attributes. You can write those modifiers in the section of the Calcs tab with an "Attributes" header. They should be written in one of the boxes to the right of the "Points" boxes.'),
                    li("""All species grant special abilities of some sort. Passive numeric abilities, like a halfling's bonus to Armor defense, are generally recorded by finding the appropriate calculation in the Calcs tab and adding a new modifier. Other abilities, like a dwarf's darkvision, are generally recorded by adding a new Ability on the Active tab to remind yourself that the ability exists."""),
                ]),
            ]),
            li([
                'Choose your attributes.',
                ul([
                    li('Your attributes are written in the section on the top left of the Calcs tab with an "Attributes" header.'),
                    li('If you are using point buy, fill in the number of points you want to spend for each attribute in the box labeled "Points". If you are rolling your attributes, fill in your exact base attributes in a box to the right of the "Points" box.'),
                ]),
            ]),
            li([
                'Choose your class and archetypes.',
                ul([
                    li('Your chosen class is written in the top left of the Identity tab in the text box labeled "Class", under the "Class Info" header.'),
                    li('Your chosen archetypes are written in the bottom left of the Identity tab in the section with an "Archetypes" header. You can note your rank in each archetype with the numeric input labeled "Rank".'),
                    li('Your class gives you bonuses to various defenses. Those resources are tracked under the "Defenses" header in the Calcs tab.'),
                    li('Your class gives you bonuses to various resources. Those resources are tracked under the "Resources" header in the Calcs tab.'),
                    li('Your class determines your armor and weapon proficiencies. Those are written on the left side of the Identity tab in the text boxes labeled "Armor proficiencies" and "Weapon groups".'),
                    li('You have a set of class skills based on your class. For each class skill, check the "Class?" checkbox associated with that skill on the left side of the Skills tab.'),
                ]),
            ]),
            li([
                'Spend insight points.',
                ul([
                    li('You have a number of insight skills based on your class, Intelligence, and possibly other abilities. That number is written in the "Resources" section of the Calcs tab.'),
                    li('You can spend insight points on special abilities from your class, or on a variety of proficiencies and abilities. The general list of options for insight points is listed in the "Resources" section of the "Core Mechanics" chapter of the book.'),
                ]),
            ]),
            li([
                'Spend skill points.',
                ul([
                    li('You have a number of skill points based on your class, Intelligence, and possibly other abilities. That number is written in the "Resources" section of the Calcs tab.'),
                    li('To spend skill points, increase the value in the "Points" column next to the skill that you are interested in.'),
                ]),
            ]),
            li([
                'Fill in various complicated abilities from your species and archetypes.',
                ul([
                    li("""<b>Passive numeric abilities</b>, like a halfling's bonus to Armor defense, are best recorded by finding the appropriate calculation in the Calcs tab and adding a new modifier."""),
                    li("""<b>Situtational numeric abilities</b>, like a barbarian's rage, are best recorded as a new "Custom Modifier" in the Status page. That page offers a toggling checkbox to allow you to turn the ability's effects on and off, making it easy to start or stop using the ability without needing to track down all of the places that the ability affects."""),
                    li("""<b>Choices</b> that have no direct gameplay effect, like the set of combat styles or mystic spheres that your character knows, are best recorded in the "Abilities Chosen" text box in the Identity tab. You could put them on the Active tab with your other non-numeric abilities, but you don't really need to see them very often, so they are better recorded on a page you are less likely to be looking at during gameplay."""),
                    li("""<b>Non-numeric abilities</b>, like a dwarf's darkvision or a spell you can cast, are best recorded by adding the ability to the appropriate section on the Core tab. Each ability on the Core tab can be clicked as a button with a fancy output format, so you can safely record the entire text of the ability to remind yourself exactly what it does."""),
                ]),
            ]),
        ]),
    ])

def common_concepts():
    return flex_col({"class": "common-concepts"}, [
        div(
            {"class": "section-header"},
            "Common Concepts",
        ),
        p("""<b>Critical hit</b>: If you hit with an attack by 10 or more, you get a critical hit. Unless otherwise specified, all damaging attacks roll double damage dice on a critical hit. This does not multiply the damage from your power."""),
        p("""<b>Glancing blow</b>: If you miss with an attack by 1 or 2, you get a glancing blow. Unless otherwise specified, all damaging attacks roll no damage dice on a glancing blow. This does not reduce the damage from your power. If you would not normally add your power to damage with the attack, a glancing blow deals no damage."""),
        p("""
            <b>Short rest</b>: Resting for ten minutes is considered a short rest. When you take a short rest, you gain the following benefits.
            <ul>
                <li>You regain any missing hit points and damage resistance.</li>
                <li>You regain any attunement points you released from attuned items and abilities.</li>
                <li>You remove all conditions affecting you.</li>
            </ul>
        """),
        p("""
            <b>Long rest</b>: Resting for eight hours is considered a long rest. When you take a long rest, you gain the following benefits.
            <ul>
                <li>You remove one of your vital wounds.</li>
                <li>Your fatigue level becomes 0.</li>
            </ul>
        """),
    ])
