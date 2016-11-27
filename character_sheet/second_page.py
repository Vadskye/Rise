from cgi_simple import *

from sheet_data import ALL_SKILLS, ATTRIBUTES, ROLL20_CALC, roll20_max_text

def create_page():
    return flex_row({'class': 'second-page'}, [
        flex_col({'class': 'sidebar'}, [
            calc_skills(),
        ]),
        flex_col({'class': 'main-body'}, [
            flex_col({'class': 'statistics'}, [
                flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
                flex_row({'class': 'core-statistics'}, [
                    labeled_number_input('Combat Prowess'),
                    labeled_number_input('Strikes/Round'),
                    labeled_number_input('Legend Points'),
                ]),
                calc_hit_points(),
                calc_attacks(),
                flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
                calc_defenses(),
            ]),
            level_chart(),
        ]),
    ])

def calc_skills():
    return flex_col({'class': 'calc-skills'}, [
        div({'class': 'section-header'}, 'Skills'),
        skill_labels(),
        "".join([calc_skill(skill_name) for skill_name in ALL_SKILLS]),
        calc_anonymous_skill(),
        calc_anonymous_skill(),
        calc_anonymous_skill(),
        calc_anonymous_skill(),
        skill_labels(),
    ])

def skill_labels():
    return flex_row({'class': 'skill-labels'}, [
        div({'class': 'skill-name-spacer'}),
        div({'class': 'skill-label'}, 'Total'),
        div({'class': 'equation-glue'}),
        div({'class': 'skill-label'}, 'Attr'),
        div({'class': 'equation-glue'}),
        div({'class': 'skill-label'}, 'Ranks'),
        div({'class': 'equation-glue'}),
        div({'class': 'skill-label'}, 'Misc'),
    ])

def calc_skill(skill_name):
    return flex_row({'class': 'skill-row'}, [
        div({'class': 'skill-name'}, skill_name),
        number_input({'name': skill_name}),
        equals(),
        this_or_that([
            number_input({
                'class': 'eq-base',
                'name': skill_name+'-base',
            }),
            number_input({
                'name': skill_name+'-attr',
            }),
        ]),
        plus(),
        div({'class': 'eq-optional'}, [
            number_input({
                'class': 'eq-optional',
                'name': skill_name+'-misc',
            })
        ])
    ])

def calc_anonymous_skill():
    return flex_row({'class': 'skill-row'}, [
        flex_wrapper({'class': 'skill-anonymous'}, [
            text_input(),
        ]),
        number_input(),
        equals(),
        this_or_that([
            number_input({'class': 'eq-base'}),
            number_input(),
        ]),
        plus(),
        div({'class': 'eq-optional'}, [
            number_input({'class': 'eq-optional'}),
        ]),
    ])

def calc_attributes():
    return flex_col({'class': 'calc-attributes'}, [
        flex_wrapper(div({'class': 'section-header attributes-header'}, 'Attributes')),
        ''.join([calc_attribute(attribute) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    calc_name = attribute_name.lower()
    return ''.join([
        div({'class': 'calc-attribute-header'}, attribute_name),
        #labeled_number_input(
        #    attribute_name,
        #    'calc-attribute-' + attribute_name.lower(),
        #    {'class': 'calc-attribute-header'}
        #),
        #flex_row({'class': 'equation'}, [
        equation(
            [
                underlabeled_number_input(
                    'Base',
                    calc_name+'-base',
                    attributes = {'class': 'eq-base'},
                    # input_attributes = {'value': '0'},
                ),
                plus(),
                underlabeled_number_input(
                    'Level',
                    calc_name+'-level',
                    attributes = {'class': 'eq-level'},
                    # input_attributes = {'value': '0'},
                ),
                misc_spacer(),
                plus(),
                underlabeled_number_input(
                    'Misc',
                    calc_name + '-misc',
                    {'class': 'eq-optional'},
                    # input_attributes = {'value': '0'}
                ),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': calc_name.lower(),
                'value': ROLL20_CALC['attribute'](calc_name),
            },
        )
    ])

def level_numbers(name_prefix):
    return flex_col({'class': 'level-numbers'}, [
        flex_wrapper(div({'class': 'level-number-header', 'class': 'chart-header'}, 'Lvl')),
        ''.join([
            text_input({'name': 'ability-level-' + name_prefix + '-' + str(level)})
            #flex_row({'class': 'level-number-wrapper level'+str(level)}, div({'class': 'level-number'}, str(level)))
            for level in range(1,14)
        ]),
    ])

def level_chart():
    return flex_row([
        calc_attributes(),
        flex_col({'class': 'level-chart'}, [
            div({'class': 'section-header'}, 'Alignment and Deity'),
            div(text_input()),
            div({'class': 'section-header'}, 'Goals and Flaws'),
            div(text_input()),
            div(text_input()),
            div({'class': 'section-header'}, 'Background'),
            "".join([div(text_input()) for i in range(1, 7)]),
            div({'class': 'section-header'}, 'Other Calculations'),
            "".join([div(text_input()) for i in range(1, 4)]),
        ])
    ])

def level_row(level):
    return flex_row({'class': 'level-chart-row'}, [
        flex_wrapper({'class': 'ability-level-row'}, [
            text_input({'name': 'ability-level' + str(level)})
        ]),
        flex_wrapper({'class': 'ability-name-row'}, [
            text_input({'name': 'ability-name' + str(level)})
        ]),
    ])

def level_chart_column(title, html_name, contents):
    return flex_col({'class': html_name}, [
        flex_wrapper(div({'class': html_name+'-header', 'class': 'chart-header'}, title)),
        contents
    ])

def attribute_bonuses():
    return flex_col({'class': 'attribute-bonuses'}, [
        flex_wrapper(div({'class': 'attribute-bonus-header', 'class': 'chart-header'}, 'Attributes')),
        ''.join([text_input({'class': 'level'+str(level)}) for level in range(1,21)]),
    ])

def abilities(name_prefix):
    return flex_col({'class': 'abilities'}, [
        flex_wrapper(div({'class': 'ability-header', 'class': 'chart-header'}, 'Feats and Abilities')),
        ''.join([text_input({'class': 'level'+str(level), 'name': 'ability-name-'+name_prefix+'-'+str(level)}) for level in range(1, 14)]),
    ])

def calc_hit_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Hit Points'),
        equation(
            [
                this_or_that([
                    underlabeled_number_input(
                        half('Fort'),
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'hp-fort',
                            'value': 'floor(('+ROLL20_CALC['fortitude']+')/2)',
                        },
                    ),
                    underlabeled_number_input(
                        half('Ment'),
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'hp-ment',
                            'value': 'floor(('+ROLL20_CALC['mental']+')/2)',
                        },
                    ),
                ]),
                times(),
                underlabeled_number_input('Level', 'hp-level', {'class': 'eq-level'}),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'hp-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'hit-points',
                'value': ROLL20_CALC['hit_points'],
            },
        ),
    ])

def calc_attacks():
    return ''.join([
        calc_melee(),
        calc_ranged(),
        calc_spellpower(),
        calc_special_attack(),
    ])

def calc_defenses():
    return ''.join([
        calc_armor(),
        calc_fort(),
        calc_ref(),
        calc_mental(),
    ])

def calc_melee():
    return flex_row([
        div({'class': 'calc-header'}, 'Melee'),
        equation(
            [
                underlabeled_number_input(
                    'Prof',
                    attributes = {
                        'class': 'eq-optional',
                    },
                    input_attributes = {
                        'disabled': 'true',
                        'name': 'proficiency',
                        'value': '4' if DESTINATION == 'roll20' else "",
                    },
                ),
                plus(),
                this_or_that([
                    underlabeled_number_input(
                        'Prow',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'melee-calc-bab',
                            'value': ROLL20_CALC['base_attack_bonus'],
                        },
                    ),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('1/5 Per'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'melee-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'melee',
                'value': '+'.join([
                    roll20_max_text(
                        ROLL20_CALC['base_attack_bonus'],
                        roll20_max_text(
                            ROLL20_CALC['attribute']('strength'),
                            ROLL20_CALC['attribute']('dexterity'),
                        ),
                    ),
                    '@{proficiency}',
                ]),
            },
        ),
    ])

def calc_ranged():
    return flex_row([
        div({'class': 'calc-header'}, 'Ranged'),
        equation(
            [
                underlabeled_number_input(
                    'Prof',
                    attributes = {
                        'class': 'eq-optional',
                    },
                    input_attributes = {
                        'disabled': 'true',
                        'name': 'proficiency',
                        'value': '4' if DESTINATION == 'roll20' else "",
                    },
                ),
                plus(),
                this_or_that([
                    underlabeled_number_input(
                        'Prow',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'ranged-calc-bab',
                            'value': ROLL20_CALC['base_attack_bonus']
                        },
                    ),
                    underlabeled_number_input(
                        'Per',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'ranged-calc-perception',
                            'value': ROLL20_CALC['attribute']('perception')
                        },
                    ),
                ]),
                plus(),
                underlabeled_number_input('1/5 Per'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'ranged-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'ranged',
                'value': '+'.join([
                    roll20_max_text(
                        ROLL20_CALC['base_attack_bonus'],
                        ROLL20_CALC['attribute']('perception'),
                    ),
                    '@{proficiency}',
                ]),
            },
        ),
    ])

def calc_spellpower():
    return flex_row([
        div({'class': 'calc-header'}, 'Spellpower'),
        equation(
            [
                underlabeled_number_input(
                    'Class',
                    attributes = {
                        'class': 'eq-optional',
                    },
                    input_attributes = {
                        'disabled': 'true',
                        'name': 'spellpower-class',
                        'value': '2' if DESTINATION == 'roll20' else "",
                    },
                ),
                plus(),
                underlabeled_number_input(
                    'Level',
                    input_attributes = {
                        'disabled': 'true',
                        'name': 'spellpower-level',
                        'value': '2' if DESTINATION == 'roll20' else "",
                    },
                ),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'melee-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'melee',
                'value': '+'.join([
                    roll20_max_text(
                        ROLL20_CALC['base_attack_bonus'],
                        roll20_max_text(
                            ROLL20_CALC['attribute']('strength'),
                            ROLL20_CALC['attribute']('dexterity'),
                        ),
                    ),
                    '@{proficiency}',
                ]),
            },
        ),
    ])

def calc_special_attack():
    return flex_row([
        flex_wrapper({'class': 'calc-header'}, [
            text_input({'class': 'calc-header'}),
        ]),
        equation(
            [
                this_or_that([
                    underlabeled_number_input(
                        'Level',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'special-calc-level',
                            'value': ROLL20_CALC['base_attack_bonus']
                        },
                    ),
                    underlabeled_number_input(
                        'Attr',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'special-calc-attr',
                            'value': ROLL20_CALC['attribute']('perception')
                        },
                    ),
                ]),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'special-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'special-attack',
            },
        ),
    ])

def base_10():
    return number_input({
        'disabled': 'true',
        'value': '10'
    })

def calc_armor():
    return flex_row([
        div({'class': 'calc-header'}, 'Armor'),
        equation(
            [
                base_10(),
                plus(),
                this_or_that([
                    underlabeled_number_input(
                        'Prow',
                        input_attributes = {
                            'disabled': 'true',
                            'name': 'armor-calc-bab',
                            'value': ROLL20_CALC['base_attack_bonus']
                        },
                    ),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('Armor', 'armor-body'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                plus(),
                underlabeled_number_input('1/5 Dex'),
                plus(),
                underlabeled_number_input('Misc', 'armor-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'armor',
                'value': ROLL20_CALC['armor'],
            },
        ),
    ])

def misc_spacer():
    return div({'class': 'misc-spacer'}, '')

def calc_fort():
    return flex_row([
        div({'class': 'calc-header'}, 'Fort'),
        equation(
            [
                base_10(),
                plus(),
                this_or_that([
                    underlabeled_number_input('Level', 'fort-level'),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                underlabeled_number_input('1/2 Con'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'fort-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'fortitude',
                'value': ROLL20_CALC['fortitude'],
            },
        ),
    ])

def calc_ref():
    return flex_row([
        div({'class': 'calc-header'}, 'Ref'),
        equation(
            [
                base_10(),
                plus(),
                this_or_that([
                    underlabeled_number_input('Level', 'ref-level'),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                underlabeled_number_input('1/5 Dex'),
                plus(),
                underlabeled_number_input('Shield', 'shield'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'ref-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'reflex',
                'value': ROLL20_CALC['reflex'],
            },
        ),
    ])

def calc_mental():
    return flex_row([
        div({'class': 'calc-header'}, 'Ment'),
        equation(
            [
                base_10(),
                plus(),
                this_or_that([
                    underlabeled_number_input('Level', 'ment-level'),
                    underlabeled_number_input('Attr'),
                ]),
                plus(),
                underlabeled_number_input('Class'),
                plus(),
                underlabeled_number_input('1/2 Wil'),
                misc_spacer(),
                plus(),
                underlabeled_number_input('Misc', 'ment-misc', {'class': 'eq-optional'}),
            ],
            result_attributes = {
                'disabled': 'true',
                'name': 'mental',
                'value': ROLL20_CALC['mental'],
            },
        ),
    ])
