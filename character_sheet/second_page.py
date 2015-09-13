from cgi_simple import *

from sheet_data import ATTRIBUTES, DEFENSES, ATTRIBUTE_SKILLS

def create_page():
    return flex_col([
        flex_row([
            flex_col([
                rise_title(),
                calc_attributes(),
            ]),
            flex_col({'id': 'calcs'}, [
                flex_wrapper(div({'class': 'section-header'}, 'Attacks')),
                calc_bab(),
                calc_attacks(),
                flex_wrapper(div({'class': 'section-header'}, 'Core Statistics')),
                calc_hit_points(),
                flex_wrapper(div({'class': 'section-header'}, 'Defenses')),
                calc_defenses(),
            ]),
        ]),
        flex_row({'id': 'level-chart'}, [
            level_numbers(),
            #bab(),
            #fort(),
            #ref(),
            #ment(),
            #attribute_bonuses(),
            abilities(),
            level_numbers(),
            abilities(),
        ]),
    ])

def calc_attributes():
    return flex_col({'id': 'calc-attributes'}, [
        flex_wrapper(div({'class': 'section-header'}, 'Attributes')),
        ''.join([calc_attribute(attribute) for attribute in ATTRIBUTES]),
    ])

def calc_attribute(attribute_name):
    return ''.join([
        div({'class': 'calc-attribute-header'}, attribute_name),
        #labeled_number_input(
        #    attribute_name,
        #    'calc-attribute-' + attribute_name.lower(),
        #    {'class': 'calc-attribute-header'}
        #),
        #flex_row({'class': 'equation'}, [
        equation([
            underlabeled_number_input('Base', 'attribute-base', {'class': 'eq-base'}),
            plus(),
            underlabeled_number_input('Level', 'attribute-level', {'class': 'eq-level'}),
            misc_spacer(),
            plus(),
            underlabeled_number_input('Misc', 'attribute-misc', {'class': 'eq-misc'}),
        ])
    ])

def level_numbers():
    return flex_col({'id': 'level-numbers'}, [
        flex_wrapper(div({'id': 'level-number-header', 'class': 'chart-header'}, 'Lvl')),
        ''.join([
            text_input()
            #flex_row({'class': 'level-number-wrapper level'+str(level)}, div({'class': 'level-number'}, str(level)))
            for level in range(1,14)
        ]),
    ])

def level_chart_column(title, html_name, contents):
    return flex_col({'id': html_name}, [
        flex_wrapper(div({'id': html_name+'-header', 'class': 'chart-header'}, title)),
        contents
    ])

def attribute_bonuses():
    return flex_col({'id': 'attribute-bonuses'}, [
        flex_wrapper(div({'id': 'attribute-bonus-header', 'class': 'chart-header'}, 'Attributes')),
        ''.join([text_input({'class': 'level'+str(level)}) for level in range(1,21)]),
    ])

def abilities():
    return flex_col({'id': 'abilities'}, [
        flex_wrapper(div({'id': 'ability-header', 'class': 'chart-header'}, 'Feats and Abilities')),
        ''.join([text_input({'class': 'level'+str(level)}) for level in range(1, 14)]),
    ])

def calc_bab():
    return flex_row([
        div({'class': 'calc-header'}, 'BAB'),
        equation([
            underlabeled_number_input('Good', 'bab-good'),
            plus(),
            underlabeled_number_input('Avg', 'bab-avg'),
            plus(),
            underlabeled_number_input('Poor', 'bab-poor'),
        ]),
    ])

def calc_hit_points():
    return flex_row([
        div({'class': 'calc-header'}, 'Hit Points'),
        equation([
            this_or_that([
                underlabeled_number_input('Fort', 'hp-fort'),
                underlabeled_number_input('Ment', 'hp-ment'),
            ]),
            plus(),
            underlabeled_number_input('Con', 'hp-con'),
            misc_spacer(),
            plus(),
            underlabeled_number_input('Misc', 'attacks-misc', {'class': 'eq-misc'}),
        ]),
    ])

def calc_attacks():
    return ''.join([
        calc_melee(),
        calc_ranged(),
    ])

def calc_defenses():
    return ''.join([
        calc_armor(),
        calc_maneuver(),
        calc_ref(),
        calc_fort(),
        calc_will(),
    ])

def calc_melee():
    return flex_row([
        div({'class': 'calc-header'}, 'Melee'),
        equation([
            this_or_that([
                underlabeled_number_input('BAB', 'attacks-bab'),
                underlabeled_number_input('Str', 'attacks-str'),
                underlabeled_number_input('Dex', 'attacks-dex'),
            ]),
            plus(),
            underlabeled_number_input('Prof', 'attacks-prof'),
            misc_spacer(),
            plus(),
            underlabeled_number_input('Misc', 'attacks-misc', {'class': 'eq-misc'}),
        ]),
    ])

def calc_ranged():
    return flex_row([
        div({'class': 'calc-header'}, 'Ranged'),
        equation([
            this_or_that([
                underlabeled_number_input('BAB', 'attacks-bab'),
                underlabeled_number_input('Per', 'attacks-str'),
            ]),
            plus(),
            underlabeled_number_input('Prof', 'attacks-prof'),
            misc_spacer(),
            plus(),
            underlabeled_number_input('Misc', 'attacks-misc', {'class': 'eq-misc'}),
        ]),
    ])

def base_10():
    return number_input({'value': '10'})

def calc_armor():
    return flex_row([
        div({'class': 'calc-header'}, 'Armor'),
        equation([
            base_10(),
            plus(),
            this_or_that([
                underlabeled_number_input('BAB', 'armor-bab'),
                underlabeled_number_input('Dex', 'armor-dex'),
                underlabeled_number_input('Con', 'armor-con'),
            ]),
            plus(),
            underlabeled_number_input('Armor', 'armor-armor'),
            plus(),
            underlabeled_number_input('Shield', 'armor-shield'),
            misc_spacer(),
            plus(),
            #misc_spacer(),
            underlabeled_number_input('Misc', 'attacks-misc', {'class': 'eq-misc'}),
        ]),
    ])

def misc_spacer():
    return div({'class': 'misc-spacer'}, '')

def calc_maneuver():
    return flex_row([
        div({'class': 'calc-header'}, 'Maneuver'),
        equation([
            base_10(),
            plus(),
            this_or_that([
                underlabeled_number_input('BAB', 'maneuver-bab'),
                underlabeled_number_input('Str', 'maneuver-str'),
                underlabeled_number_input('Dex', 'maneuver-dex'),
            ]),
            plus(),
            underlabeled_number_input('Shield', 'armor-shield'),
            misc_spacer(),
            plus(),
            #misc_spacer(),
            underlabeled_number_input('Misc', 'maneuver-misc', {'class': 'eq-misc'}),
        ]),
    ])

def calc_fort():
    return flex_row([
        div({'class': 'calc-header'}, 'Fort'),
        equation([
            base_10(),
            plus(),
            this_or_that([
                flex_row([
                    underlabeled_number_input('Con', 'fort-con'),
                    plus(),
                    underlabeled_number_input(half('Str'), 'fort-str'),
                ]),
                underlabeled_number_input('Base', 'fort-base'),
            ]),
            misc_spacer(),
            plus(),
            #misc_spacer(),
            underlabeled_number_input('Misc', 'fort-misc', {'class': 'eq-misc'}),
        ]),
    ])

def calc_ref():
    return flex_row([
        div({'class': 'calc-header'}, 'Ref'),
        equation([
            base_10(),
            plus(),
            this_or_that([
                flex_row([
                    underlabeled_number_input('Dex', 'ref-dex'),
                    plus(),
                    underlabeled_number_input(half('Per'), 'ref-per'),
                ]),
                underlabeled_number_input('Base', 'ref-base'),
            ]),
            plus(),
            underlabeled_number_input('Shield', 'ref-shield'),
            misc_spacer(),
            plus(),
            #misc_spacer(),
            underlabeled_number_input('Misc', 'ref-misc', {'class': 'eq-misc'}),
        ]),
    ])

def calc_will():
    return flex_row([
        div({'class': 'calc-header'}, 'Ment'),
        equation([
            base_10(),
            plus(),
            this_or_that([
                flex_row([
                    underlabeled_number_input('Wil', 'ment-wil'),
                    plus(),
                    underlabeled_number_input(half('Int'), 'ment-int'),
                ]),
                underlabeled_number_input('Base', 'ment-base'),
            ]),
            misc_spacer(),
            plus(),
            #misc_spacer(),
            underlabeled_number_input('Misc', 'ment-misc', {'class': 'eq-misc'}),
        ]),
    ])

def equation(attributes = None, contents = None):
    attributes, contents = ensure_valid_attributes_and_contents(attributes, contents)
    attributes['class'] = 'equation ' + attributes.get('class', '')

    return flex_row(attributes, [
        underlabeled_number_input('Total', 'hp-total'),
        equals(),
        ''.join(contents),
    ])

def this_or_that(options):
    return flex_row(
        {'class': 'this-or-that'},
        flex_col({'class': 'equation-glue'}, 'or').join(options)
    )

def equals():
    return flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, '='))

def plus():
    return flex_col({'class': 'equation-glue'}, div({'class': 'equation-math'}, '+'))

def half(text):
    return span({'class': 'half'}, '1/2 ') + text

def rise_title():
    return div(
        {'id': 'rise-title'},
        'Rise'
    )
