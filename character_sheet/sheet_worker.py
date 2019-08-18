from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS

def generate_script():
    return "\n".join([
        '<script type="text/worker">',
        *[attribute_change(a.lower()) for a in ATTRIBUTES],
        *[attribute_skills(a.lower()) for a in ATTRIBUTE_SKILLS],
        *core_statistics(),
        *defenses(),
        *resistances(),
        *abilities_known(),
        action_points(),
        '</script>',
        ""
    ])

def js_wrapper(variables, function_body):
    # not everything actually depends on level, but it's convenient to make
    # everything recalculate when level changes
    variables_with_level = sorted(list(set(variables + ['level'])))
    change_string = ' '.join([f'change:{var}' for var in variables_with_level])
    get_attrs_string = ', '.join([f'"{var}"' for var in variables])
    set_variables_string = ';\n    '.join([f'var {var} = Number(v.{var} || 0)' for var in variables]) + ';'
    return f"""
        on("{change_string}", function(eventInfo) {{
            getAttrs([{get_attrs_string}], function(v) {{
                {set_variables_string}
                {function_body}
            }});
        }});
    """

def get_misc_variables(variable_name, count):
    return [f'{variable_name}_misc_{i}' for i in range(count)]

def sum_variables(variables):
    return '+'.join(variables)

def attribute_change(a):
    misc = get_misc_variables(a, 1)
    return js_wrapper(
        ['level', f'{a}_starting', *misc],
        f"""
            var scaling = 0;
            if ({a}_starting === 1) {{
                scaling = Math.floor(level / 2);
            }} else if ({a}_starting > 1) {{
                scaling = level - 1;
            }}
            setAttrs({{
                {a}: {a}_starting + scaling + {sum_variables(misc)},
                {a}_scaling: scaling,
            }});
        """
    )

def attribute_skills(attribute):
    return '\n'.join([
        set_skill(attribute, skill.lower().replace(' ', '_'))
        for skill in ATTRIBUTE_SKILLS[attribute]
    ])


def set_skill(a, s):
    misc = get_misc_variables(s, 2)
    if a == 'other':
        return js_wrapper(
            ['level', f'{s}_points', *misc],
            f"""
                var pointsModifier = 0;
                var ranks = 0;

                if ({s}_points === 1) {{
                    ranks = Math.floor(level / 2);
                    pointsModifier = 1;
                }} else if (v.{s}_points >= 2) {{
                    ranks = level
                    pointsModifier = 4;
                }}

                setAttrs({{
                    {s}_attribute: 0,
                    {s}_ranks: ranks + pointsModifier,
                    {s}_total: ranks + pointsModifier + {sum_variables(misc)}
                }});
            """
        )
    else:
        include_encumbrance = a in ['strength', 'dexterity']
        subtract_encumbrance = ' - encumbrance' if include_encumbrance else ""
        return js_wrapper(
            ['level', a, f'{a}_starting', f'{s}_points', *misc, *(['encumbrance'] if include_encumbrance else [])],
            f"""
                var attributeModifier = 0;
                var pointsModifier = 0;
                var ranks = 0;

                if (Number(v.{s}_points) === 0) {{
                    attributeModifier = Math.floor({a} / 2);
                }} else if ({s}_points === 1) {{
                    attributeModifier = {a};
                    ranks = Math.floor(level / 2) + 1;
                }} else if ({s}_points >= 2) {{
                    attributeModifier = {a};
                    ranks = level
                    pointsModifier = 4;
                }}

                var scaling = Math.max(ranks, attributeModifier);

                var negativeModifier = {a} < 0 ? {a} : 0;

                setAttrs({{
                    {s}_attribute: attributeModifier,
                    {s}_ranks: ranks,
                    {s}_total: scaling + pointsModifier + negativeModifier + {sum_variables(misc)} {subtract_encumbrance},
                }});
            """
        )

def core_statistics():
    return [
        accuracy(),
        base_speed(),
        encumbrance(),
        hit_points(),
        initiative(),
        insight_points(),
        magical_power(),
        mundane_power(),
        skill_points(),
    ]

def defenses():
    return [
        armor_defense(),
        fortitude(),
        mental(),
        reflex(),
    ]

def resistances():
    return [
        base_damage_resistance(),
        base_wound_resistance(),
        all_resistance(),
        energy_resistance(),
        physical_resistance(),
        damage_resistances(),
        wound_resistances(),
    ]

def abilities_known():
    return [
        maneuvers_known(),
        spells_known(),
        *[blank_ability_known(i) for i in range(2)]
    ]

def accuracy():
    misc = get_misc_variables('accuracy', 3)
    return js_wrapper(
        ['challenge_rating', 'level', 'perception', *misc],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var accuracy_scaling = Math.max(level, perception);
            setAttrs({{
                accuracy: accuracy_scaling + {sum_variables(misc)} + cr_mod,
                accuracy_scaling,
            }});
        """
    )


def action_points():
    return js_wrapper(
        ['level'],
        f"""
            var action_points = 4 + Math.floor((level + 3) / 6);
            setAttrs({{
                action_points,
                action_points_max: action_points,
            }});
        """,
    )


def armor_defense():
    misc = get_misc_variables('armor_defense', 1)
    return js_wrapper(
        ['level', 'dexterity_starting', 'body_armor_defense_value', 'shield_defense_value', *misc, 'challenge_rating'],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var before_equipment = level + dexterity_starting + cr_mod;
            var total = before_equipment + body_armor_defense_value + shield_defense_value + {sum_variables(misc)};
            setAttrs({{
                armor_defense: total,
            }});
        """
    )

def fortitude():
    misc = get_misc_variables('fortitude', 2)
    return js_wrapper(
        ['level', 'constitution_starting', 'fortitude_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            setAttrs({{
                fortitude: level + constitution_starting + fortitude_class + cr_mod + {sum_variables(misc)},
            }});
        """
    )

def reflex():
    misc = get_misc_variables('reflex', 2)
    return js_wrapper(
        ['level', 'dexterity_starting', 'reflex_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            setAttrs({{
                reflex: level + dexterity_starting + reflex_class + cr_mod + {sum_variables(misc)},
            }});
        """
    )

def mental():
    misc = get_misc_variables('mental', 2)
    return js_wrapper(
        ['level', 'willpower_starting', 'mental_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            setAttrs({{
                mental: level + willpower_starting + mental_class + cr_mod + {sum_variables(misc)},
            }});
        """
    )

def encumbrance():
    misc = get_misc_variables('encumbrance', 2)
    return js_wrapper(
        ['level', 'body_armor_encumbrance', 'strength_starting', *misc],
        f"""
            setAttrs({{
                encumbrance: Math.max(
                    body_armor_encumbrance
                    - strength_starting
                    - {'-'.join(misc)}
                , 0),
            }});
        """,
    )

def initiative():
    misc = get_misc_variables('initiative', 3)
    return js_wrapper(
        ['dexterity', 'perception', *misc],
        f"""
            var scaling = Math.max(dexterity, perception);
            setAttrs({{
                initiative: scaling + {sum_variables(misc)},
                initiative_scaling: scaling,
            }});
        """
    )

def base_speed():
    misc = get_misc_variables('speed', 2)
    return js_wrapper(
        ['level', 'speed_size', 'speed_armor', *misc],
        f"""
            setAttrs({{
                base_speed: speed_size - speed_armor + {sum_variables(misc)}
            }});
        """
    )

def skill_points():
    misc = get_misc_variables('skill_points', 2)
    return js_wrapper(
        ['level', 'intelligence_starting', *misc],
        f"""
            setAttrs({{
                skill_points: 8 + intelligence_starting * 2 + {sum_variables(misc)}
            }});
        """
    )

def hit_points():
    misc = get_misc_variables('hit_points', 2)
    return js_wrapper(
        ['constitution_starting', *misc],
        f"""
            var hit_points = 6 + constitution_starting + {sum_variables(misc)};
            setAttrs({{
                hit_points,
                hit_points_max: hit_points,
            }});
        """
    )

def insight_points():
    misc = get_misc_variables('insight_points', 2)
    return js_wrapper(
        ['intelligence_starting', *misc],
        f"""
            setAttrs({{
                insight_points: 2 + intelligence_starting + {sum_variables(misc)}
            }});
        """
    )

def magical_power():
    misc = get_misc_variables('magical_power', 3)
    return js_wrapper(
        ['level', 'willpower', *misc],
        f"""
            var magical_power_scaling = Math.max(level, willpower);
            setAttrs({{
                magical_power: magical_power_scaling + {sum_variables(misc)},
                magical_power_scaling,
            }});
        """
    )

def mundane_power():
    misc = get_misc_variables('mundane_power', 3)
    return js_wrapper(
        ['level', 'strength', *misc],
        f"""
            var mundane_power_scaling = Math.max(level, strength)
            setAttrs({{
                mundane_power: mundane_power_scaling + {sum_variables(misc)},
                mundane_power_scaling,
            }});
        """
    )

def maneuvers_known():
    misc = get_misc_variables('maneuvers_known', 2)
    return js_wrapper(
        ['maneuvers_known_base', 'maneuvers_known_insight_points', *misc],
        f"""
            setAttrs({{
                maneuvers_known: maneuvers_known_base + maneuvers_known_insight_points + {sum_variables(misc)}
            }});
        """
    )

def spells_known():
    misc = get_misc_variables('spells_known', 2)
    return js_wrapper(
        ['spells_known_base', 'spells_known_insight_points', *misc],
        f"""
            setAttrs({{
                spells_known: spells_known_base + spells_known_insight_points + {sum_variables(misc)}
            }});
        """
    )

def blank_ability_known(i):
    name = f'blank_ability_known_{i}'
    misc = get_misc_variables(name, 2)
    return js_wrapper(
        [f'{name}_base', f'{name}_insight_points', *misc],
        f"""
            setAttrs({{
                {name}: {name}_base + {name}_insight_points + {sum_variables(misc)}
            }});
        """
    )

def base_damage_resistance():
    return js_wrapper(
        ['level'],
        f"""
            var base_damage_resistance = {{
                1: 0,
                2: 0,
                3: 1,
                4: 2,
                5: 3,
                6: 4,
                7: 5,
                8: 6,
                9: 8,
                10: 10,
                11: 12,
                12: 14,
                13: 16,
                14: 18,
                15: 21,
                16: 24,
                17: 27,
                18: 30,
                19: 33,
                20: 36,
            }}[level];
            setAttrs({{
                base_damage_resistance,
            }});
        """
    )

def base_wound_resistance():
    return js_wrapper(
        ['level'],
        f"""
            var base_wound_resistance = {{
                1: 13,
                2: 14,
                3: 16,
                4: 18,
                5: 21,
                6: 24,
                7: 27,
                8: 30,
                9: 34,
                10: 38,
                11: 43,
                12: 48,
                13: 54,
                14: 61,
                15: 69,
                16: 77,
                17: 86,
                18: 96,
                19: 108,
                20: 122,
            }}[level];
            setAttrs({{
                base_wound_resistance,
            }});
        """
    )

def all_resistance():
    misc = get_misc_variables('all_resistance_bonus', 4)
    return js_wrapper(
        misc,
        f"""
            setAttrs({{
                all_resistance_bonus: {sum_variables(misc)},
            }});
        """
    )

def energy_resistance():
    misc = get_misc_variables('energy_resistance_bonus', 4)
    return js_wrapper(
        misc,
        f"""
            setAttrs({{
                energy_resistance_bonus: {sum_variables(misc)},
            }});
        """
    )

def physical_resistance():
    misc = get_misc_variables('physical_resistance_bonus', 3)
    return js_wrapper(
        ['physical_resistance_armor', *misc],
        f"""
            setAttrs({{
                physical_resistance_bonus: physical_resistance_armor + {sum_variables(misc)},
            }});
        """
    )

def damage_resistances():
    return js_wrapper(
        ['base_damage_resistance', 'all_resistance_bonus', 'energy_resistance_bonus', 'physical_resistance_bonus'],
        f"""
            var global_damage_resistance = base_damage_resistance + all_resistance_bonus;
            setAttrs({{
                global_damage_resistance,
                energy_damage_resistance: global_damage_resistance + energy_resistance_bonus,
                physical_damage_resistance: global_damage_resistance + physical_resistance_bonus,
            }})
        """
    )

def wound_resistances():
    return js_wrapper(
        ['base_wound_resistance', 'all_resistance_bonus', 'energy_resistance_bonus', 'physical_resistance_bonus'],
        f"""
            var global_wound_resistance = base_wound_resistance + all_resistance_bonus;
            setAttrs({{
                global_wound_resistance,
                energy_wound_resistance: global_wound_resistance + energy_resistance_bonus,
                physical_wound_resistance: global_wound_resistance + physical_resistance_bonus,
            }})
        """
    )
