from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS

def generate_script():
    return "\n".join([
        '<script type="text/worker">',
        *[attribute_change(a.lower()) for a in ATTRIBUTES],
        *[attribute_skills(a.lower()) for a in ATTRIBUTE_SKILLS],
        accuracy(),
        action_points(),
        armor_defense(),
        damage_resistance(),
        fortitude(),
        reflex(),
        mental(),
        encumbrance(),
        initiative(),
        base_speed(),
        skill_points(),
        '</script>',
        ""
    ])

def js_wrapper(variables, function_body):
    change_string = ' '.join([f'change:{var}' for var in variables])
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

def get_misc_variables(variable_name):
    return [f'{variable_name}_misc_{i}' for i in range(3)]

def numberify(variable_name):
    return f'Number(variable_name || 0)'

def sum_misc_variables(variable_name):
    return '+'.join(get_misc_variables(variable_name))

def attribute_change(a):
    return js_wrapper(
        ['level', f'{a}_starting', *get_misc_variables(a)],
        f"""
            var scaling = 0;
            if ({a}_starting === 1) {{
                scaling = Math.floor(v.level / 2);
            }} else if ({a}_starting > 1) {{
                scaling = Number(v.level) - 1;
            }}
            setAttrs({{
                {a}: {a}_starting + scaling + {sum_misc_variables(a)},
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
    if a == 'other':
        return f"""
            on("change:level change:{s}_points change:{s}_misc", function(eventInfo) {{
                getAttrs(["level", "{s}_points", "{s}_misc"], function(v) {{
                    var level = Number(v.level);
                    var pointsModifier = 0;
                    var ranks = 0;

                    if (Number(v.{s}_points) === 1) {{
                        ranks = Math.floor(level / 2);
                        pointsModifier = 1;
                    }} else if (Number(v.{s}_points) >= 2) {{
                        ranks = level
                        pointsModifier = 4;
                    }}

                    setAttrs({{
                        {s}_attribute: 0,
                        {s}_ranks: ranks + pointsModifier,
                        {s}_total: ranks + pointsModifier + Number(v.{s}_misc),
                    }});
                }});
            }});
        """
    else:
        include_encumbrance = a in ['strength', 'dexterity']
        encumbrance_changed = ' change:encumbrance' if include_encumbrance else ""
        get_encumbrance = ', "encumbrance"' if include_encumbrance else ""
        subtract_encumbrance = ' - Number(v.encumbrance)' if include_encumbrance else ""
        return f"""
            on("sheet:opened change:level change:{a} change:{s}_points change:{s}_misc{encumbrance_changed}", function(eventInfo) {{
                getAttrs(["level", "{a}", "{a}_starting", "{s}_points", "{s}_misc"{get_encumbrance}], function(v) {{
                    var level = Number(v.level || 0);
                    var attributeModifier = 0;
                    var pointsModifier = 0;
                    var ranks = 0;

                    if (Number(v.{s}_points) === 0) {{
                        attributeModifier = Math.floor(Number(v.{a} || 0) / 2);
                    }} else if (Number(v.{s}_points) === 1) {{
                        attributeModifier = Number(v.{a} || 0);
                        ranks = Math.floor(level / 2) + 1;
                    }} else if (Number(v.{s}_points || 0) >= 2) {{
                        attributeModifier = Number(v.{a} || 0);
                        ranks = level
                        pointsModifier = 4;
                    }}

                    var scaling = Math.max(ranks, attributeModifier);

                    var negativeModifier = Number(v.{a} || 0) < 0 ? Number(v.{a} || 0) : 0;

                    setAttrs({{
                        {s}_attribute: attributeModifier,
                        {s}_ranks: ranks,
                        {s}_total: scaling + pointsModifier + negativeModifier + Number(v.{s}_misc || 0){subtract_encumbrance},
                    }});
                }});
            }});
        """


def accuracy():
    return js_wrapper(
        ['challenge_rating', 'level', 'perception', *get_misc_variables('accuracy')],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var accuracy_scaling = Math.max(level, perception);
            setAttrs({{
                accuracy: accuracy_scaling + {sum_misc_variables('accuracy')} + cr_mod,
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
                action_points_max: action_points,
                action_points_total: action_points,
            }});
        """,
    )


def armor_defense():
    return js_wrapper(
        ['level', 'dexterity_starting', 'body_armor_defense_value', 'shield_defense_value', *get_misc_variables('armor_defense')],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var before_equipment = level + dexterity_starting + cr_mod;
            var total = before_equipment + body_armor_defense_value + shield_defense_value + {sum_misc_variables('armor_defense')};
            setAttrs({{
                armor_defense: total,
            }});
        """
    )


def damage_resistance():
    return js_wrapper(
        ['level'],
        f"""
            var damage_resistance = {{
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
            }}[level]
            setAttrs({{
                damage_resistance,
            }});
        """
    )

def wound_resistance():
    return js_wrapper(
        ['level'],
        f"""
            var wound_resistance = {{
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
            }}[level]
            setAttrs({{
                wound_resistance,
            }});
        """
    )


def fortitude():
    return js_wrapper(
        ['level', 'constitution_starting', 'fortitude_class', 'challenge_rating', *get_misc_variables('fortitude')],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var total = Number(v.level || 0) + Number(v.constitution_starting || 0) + Number(v.fortitude_class || 0) + Number(v.fortitude_misc || 0) + cr_mod;
            setAttrs({{
                fortitude: level + constitution_starting + fortitude_class + cr_mod + {sum_misc_variables('fortitude')},
            }});
        """
    )

def reflex():
    return js_wrapper(
        ['level', 'dexterity_starting', 'reflex_class', 'challenge_rating', *get_misc_variables('reflex')],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var total = Number(v.level || 0) + Number(v.dexterity_starting || 0) + Number(v.reflex_class || 0) + Number(v.reflex_misc || 0) + cr_mod;
            setAttrs({{
                reflex: level + dexterity_starting + reflex_class + cr_mod + {sum_misc_variables('reflex')},
            }});
        """
    )

def mental():
    return js_wrapper(
        ['level', 'willpower_starting', 'mental_class', 'challenge_rating', *get_misc_variables('mental')],
        f"""
            var cr_mod = Math.max(0, challenge_rating - 1);
            var total = Number(v.level || 0) + Number(v.willpower_starting || 0) + Number(v.mental_class || 0) + Number(v.mental_misc || 0) + cr_mod;
            setAttrs({{
                mental: level + willpower_starting + mental_class + cr_mod + {sum_misc_variables('mental')},
            }});
        """
    )

def encumbrance():
    return js_wrapper(
        ['level', 'body_armor_encumbrance', 'strength_starting', *get_misc_variables('encumbrance')],
        f"""
            setAttrs({{
                encumbrance: Math.max(
                    body_armor_encumbrance
                    - strength_starting
                    - {'-'.join(get_misc_variables('encumbrance'))}
                , 0),
            }});
        """,
    )

def initiative():
    return js_wrapper(
        ['dexterity', 'perception', *get_misc_variables('initiative')],
        f"""
            var scaling = Math.max(dexterity, perception);
            setAttrs({{
                initiative: scaling + {sum_misc_variables('initiative')},
                initiative_scaling: scaling,
            }});
        """
    )

def base_speed():
    return js_wrapper(
        ['level', 'speed_size', 'speed_armor', *get_misc_variables('speed')],
        f"""
            setAttrs({{
                base_speed: speed_size - speed_armor + {sum_misc_variables('speed')}
            }});
        """
    )

def skill_points():
    return js_wrapper(
        ['level', 'intelligence_starting', *get_misc_variables('skill_points')],
        f"""
            setAttrs({{
                skill_points: 8 + v.intelligence_starting * 2 + {sum_misc_variables('skill_points')}
            }});
        """
    )
