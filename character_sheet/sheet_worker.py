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
        attunement_points(),
        level_scaling(),
        skill_points_spent(),
        unknown_statistic(),
        '</script>',
        ""
    ])

def js_wrapper(variables, function_body):
    # not everything actually depends on level, but it's convenient to make
    # everything recalculate when level changes
    variables_with_level = sorted(list(set(variables + ['level'])))
    change_string = ' '.join([f'change:{var}' for var in variables_with_level])
    get_attrs_string = ', '.join([f'"{var}"' for var in variables])
    set_variables_string = ';\n    '.join([f'var {stringify_variable_name(var)} = Number(v["{var}"] || 0)' for var in variables]) + ';'
    return f"""
        on("{change_string}", function(eventInfo) {{
            getAttrs([{get_attrs_string}], function(v) {{
                {set_variables_string}
                {function_body}
            }});
        }});
    """

def stringify_variable_name(varname):
    return varname.replace('$', '')

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
                scaling = Math.floor(level / 4);
            }} else if ({a}_starting >= 2) {{
                scaling = Math.floor(({a}_starting-1)*0.5*(level - 1));
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
    misc = get_misc_variables(s, 3)
    if a == 'other':
        return js_wrapper(
            ['level', f'{s}_points', 'fatigue_penalty', *misc],
            f"""
                var pointsModifier = 0;
                var ranks = 0;
                var training = '';

                if ({s}_points === 1) {{
                    ranks = Math.floor(level / 2);
                    pointsModifier = 1;
                    training = 'T';
                }} else if (v.{s}_points >= 2) {{
                    ranks = level
                    pointsModifier = 3;
                    training = 'M';
                }}

                setAttrs({{
                    {s}_attribute: 0,
                    {s}_ranks: ranks + pointsModifier,
                    {s}_total: ranks + pointsModifier + {sum_variables(misc)} - fatigue_penalty,
                    {s}_training: training,
                }});
            """
        )
    else:
        include_encumbrance = a in ['strength', 'dexterity']
        subtract_encumbrance = ' - encumbrance' if include_encumbrance else ""
        return js_wrapper(
            ['level', f'{a}_starting', f'{s}_points', f'{s}_class_skill', 'fatigue_penalty', *misc, *(['encumbrance'] if include_encumbrance else [])],
            f"""
                var pointsModifier = 0;
                var ranks = 0;
                var training = '';

                if ({a}_starting >= 3 && {s}_class_skill !== 0) {{
                    {s}_points += 1;
                }}

                if ({s}_points === 1) {{
                    ranks = Math.floor(level / 2) + 1;
                    training = 'T';
                }} else if ({s}_points >= 2) {{
                    ranks = level
                    pointsModifier = 3;
                    training = 'M';
                }}

                setAttrs({{
                    {s}_ranks: ranks,
                    {s}_total: ranks + pointsModifier + {a}_starting + {sum_variables(misc)} - fatigue_penalty {subtract_encumbrance},
                    {s}_training: training,
                }});
            """
        )

def core_statistics():
    return [
        accuracy(),
        base_speed(),
        encumbrance(),
        fatigue_penalty(),
        fatigue_tolerance(),
        focus_penalty(),
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
        energy_resistance(),
        physical_resistance(),
    ]

def abilities_known():
    return [
        maneuvers_known(),
        spells_known(),
        spheres_known(),
        *[blank_ability_known(i) for i in range(1)]
    ]

def accuracy():
    misc = get_misc_variables('accuracy', 2)
    return js_wrapper(
        ['challenge_rating', 'level', 'perception_starting', 'fatigue_penalty', *misc],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            setAttrs({{
                accuracy: level + Math.floor(perception_starting / 2)  + {sum_variables(misc)} + cr_mod - fatigue_penalty,
            }});
        """
    )


def attunement_points():
    misc = get_misc_variables('attunement_points', 2)
    return js_wrapper(
        ['level', *misc],
        f"""
            var attunement_points_from_level = Math.min(1 + Math.floor((level + 1) / 3), 5);
            var attunement_points = attunement_points_from_level + {sum_variables(misc)};
            setAttrs({{
                attunement_points,
                attunement_points_max: attunement_points,
                attunement_points_from_level,
            }});
        """,
    )

def unknown_statistic():
    misc = get_misc_variables('unknown_statistic', 4)
    return js_wrapper(
        [*misc],
        f"""
            setAttrs({{
                unknown_statistic: {sum_variables(misc)},
            }});
        """,
    )


# This only applies to monsters, which is defined as creatures with CR !== 0
def level_scaling():
    return js_wrapper(
        ['challenge_rating', 'level'],
        f"""
            var level_scaling = challenge_rating === 0 ? 0 : Math.floor((level + 1) / 6);
            setAttrs({{
                level_scaling,
            }});
        """,
    )


def armor_defense():
    misc = get_misc_variables('armor_defense', 3)
    return js_wrapper(
        ['level', 'dexterity_starting', 'armor_defense_class_bonus', 'body_armor_defense_value', 'shield_defense_value', *misc, 'challenge_rating'],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var before_equipment = level + dexterity_starting + cr_mod + armor_defense_class_bonus;
            var total = before_equipment + body_armor_defense_value + shield_defense_value + {sum_variables(misc)};
            setAttrs({{
                armor_defense: total,
            }});
        """
    )

def fortitude():
    misc = get_misc_variables('fortitude', 4)
    return js_wrapper(
        ['level', 'constitution_starting', 'fortitude_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            setAttrs({{
                fortitude: level + constitution_starting + fortitude_class + cr_mod + {sum_variables(misc)},
            }});
        """
    )

def reflex():
    misc = get_misc_variables('reflex', 4)
    return js_wrapper(
        ['level', 'dexterity_starting', 'reflex_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            setAttrs({{
                reflex: level + dexterity_starting + reflex_class + cr_mod + {sum_variables(misc)},
            }});
        """
    )

def mental():
    misc = get_misc_variables('mental', 4)
    return js_wrapper(
        ['level', 'willpower_starting', 'mental_class', 'challenge_rating', *misc],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
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
                    - Math.max(0, strength_starting)
                    - {'-'.join(misc)}
                , 0),
            }});
        """,
    )

def initiative():
    misc = get_misc_variables('initiative', 3)
    return js_wrapper(
        ['dexterity', 'perception', 'fatigue_penalty', *misc],
        f"""
            var scaling = Math.max(dexterity, perception);
            setAttrs({{
                initiative: scaling + {sum_variables(misc)} - fatigue_penalty,
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
                skill_points: 6 + intelligence_starting * 2 + {sum_variables(misc)}
            }});
        """
    )

def fatigue_tolerance():
    misc = get_misc_variables('fatigue_tolerance', 2)
    return js_wrapper(
        ['level', 'constitution_starting', 'willpower_starting', *misc],
        f"""
            setAttrs({{
                fatigue_tolerance: 2 + constitution_starting + willpower_starting + {sum_variables(misc)},
            }});
        """
    )


def focus_penalty():
    misc = get_misc_variables('focus_penalty', 3)
    return js_wrapper(
        ['level', *misc],
        f"""
            setAttrs({{
                focus_penalty: 4 - ({sum_variables(misc)}),
            }});
        """
    )


def hit_points():
    misc = get_misc_variables('hit_points', 3)
    return js_wrapper(
        ['level', 'constitution_starting', 'challenge_rating', *misc],
        f"""
            var hit_points_from_level = {{
                '-1': 9  ,
                0:    10 ,
                1:    11 ,
                2:    12 ,
                3:    13 ,
                4:    15 ,
                5:    17 ,
                6:    19 ,
                7:    22 ,
                8:    25 ,
                9:    28 ,
                10:   31 ,
                11:   35 ,
                12:   39 ,
                13:   44 ,
                14:   50 ,
                15:   56 ,
                16:   63 ,
                17:   70 ,
                18:   78 ,
                19:   88 ,
                20:   100,
                21:   112,
                22:   125,
                23:   140,
                24:   155,
                25:   170,
                26:   185,
                27:   200,
                28:   215,
                29:   230,
                30:   245,
            }}[level + constitution_starting] || 1;

            var hit_points = hit_points_from_level + {sum_variables(misc)};
            var cr_mod = {{
                0.5: 0.25,
                1: 0.5,
                2: 1,
                3: 2,
                4: 4,
            }}[challenge_rating] || 1;
            hit_points = Math.floor(hit_points * cr_mod)
            setAttrs({{
                hit_points,
                hit_points_from_level,
                hit_points_max: hit_points,
            }});
        """
    )

def fatigue_penalty():
    return js_wrapper(
        ['fatigue_points', 'fatigue_tolerance'],
        f"""
            setAttrs({{
                fatigue_penalty: Math.max(0, fatigue_points - fatigue_tolerance),
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
        ['willpower', *misc],
        f"""
            var willpower_power_scaling = Math.floor(willpower / 2);
            setAttrs({{
                magical_power: willpower_power_scaling + {sum_variables(misc)},
                willpower_power_scaling,
            }});
        """
    )

def mundane_power():
    misc = get_misc_variables('mundane_power', 3)
    return js_wrapper(
        ['strength', *misc],
        f"""
            var strength_power_scaling = Math.floor(strength / 2);
            setAttrs({{
                mundane_power: strength_power_scaling + {sum_variables(misc)},
                strength_power_scaling,
            }});
        """
    )

def maneuvers_known():
    misc = get_misc_variables('maneuvers_known', 3)
    return js_wrapper(
        ['maneuvers_known_insight_points', *misc],
        f"""
            setAttrs({{
                maneuvers_known: maneuvers_known_insight_points + {sum_variables(misc)}
            }});
        """
    )

def spheres_known():
    misc = get_misc_variables('spheres_known', 3)
    return js_wrapper(
        ['spheres_known_insight_points', *misc],
        f"""
            setAttrs({{
                spheres_known: Math.floor(spheres_known_insight_points / 2) + {sum_variables(misc)}
            }});
        """
    )

def spells_known():
    misc = get_misc_variables('spells_known', 3)
    return js_wrapper(
        ['spells_known_insight_points', *misc],
        f"""
            setAttrs({{
                spells_known: spells_known_insight_points + {sum_variables(misc)}
            }});
        """
    )

def blank_ability_known(i):
    name = f'blank_ability_known_{i}'
    misc = get_misc_variables(name, 3)
    return js_wrapper(
        [f'{name}_insight_points', *misc],
        f"""
            setAttrs({{
                {name}: {name}_insight_points + {sum_variables(misc)}
            }});
        """
    )

def energy_resistance():
    misc = get_misc_variables('energy_resistance_bonus', 4)
    return js_wrapper(
        ['willpower', 'energy_resistance_bonus_armor', *misc],
        f"""
            setAttrs({{
                energy_resistance_bonus: willpower + energy_resistance_bonus_armor + {sum_variables(misc)},
            }});
        """
    )

def physical_resistance():
    misc = get_misc_variables('physical_resistance_bonus', 4)
    return js_wrapper(
        ['constitution', 'physical_resistance_bonus_armor', *misc],
        f"""
            setAttrs({{
                physical_resistance_bonus: constitution + physical_resistance_bonus_armor + {sum_variables(misc)},
            }});
        """
    )

def skill_points_spent():
    skill_names = [skill_name for skills in ATTRIBUTE_SKILLS.values() for skill_name in skills]
    skill_names = [skill_name.lower().replace(' ', '_') for skill_name in skill_names]
    skill_points_names = [f"{skill_name}_points" for skill_name in skill_names]

    return js_wrapper(
        skill_points_names,
        f"""
            var skill_points_spent = {' + '.join(skill_points_names)};

            setAttrs({{
                skill_points_spent,
            }});
        """
    )

def standard_damage_at_power(power):
    return {
        '-4': '1d3',
        '-2': '1d4',
        '0': '1d6',
        '2': '1d8',
        '4': '1d10',
        '6': '2d6',
        '8': '2d8',
        '10': '2d10',
        '12': '4d6',
        '14': '4d8',
        '16': '4d10',
        '18': '5d10',
        '20': '6d10',
        '22': '7d10',
        '24': '8d10',
    }[str(power)]
