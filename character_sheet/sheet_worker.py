from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS
import re


def generate_script():
    return "\n".join(
        [
            '<script type="text/worker">',
            *[attribute_change(a.lower()) for a in ATTRIBUTES],
            *[attribute_skills(a.lower()) for a in ATTRIBUTE_SKILLS],
            *core_statistics(),
            *defenses(),
            damage_resistance(),
            *abilities_known(),
            attunement_points(),
            skill_points_spent(),
            unknown_statistic(),
            vital_wounds(),
            universal_abilities(),
            attuned_effects(),
            custom_modifiers(),
            monster_chat_color(),
            damage_dice(),
            debuffs(),
            "</script>",
            "",
        ]
    )

def formatChangeString(varName):
    if 'repeating_' in varName:
        return re.sub(r'repeating_([^_]+)_(.*)', r'change:repeating_\1:\2', varName)
    else:
        return 'change:' + varName


def js_wrapper(
        variables,
        function_body,
        boolean_variables=[],
        string_variables=[],
        no_listen_variables=[],
        include_level=True
):
    # not everything actually depends on level, but it's convenient to make
    # everything recalculate when level changes
    if include_level:
        variables = variables + ["level"]
    all_unique_variables = sorted(list(set(variables + boolean_variables + string_variables)))
    change_string = " ".join([formatChangeString(var) for var in all_unique_variables])
    get_attrs_string = ", ".join([f'"{var}"' for var in all_unique_variables + no_listen_variables])
    set_variables_string = (
        ";\n    ".join(
            [
                f'var {stringify_variable_name(var)} = Number(v["{var}"] || 0)'
                for var in variables + no_listen_variables
            ] +
            [
                f'var {stringify_variable_name(var)} = v["{var}"] === "on" || v["{var}"] == 1 ? true : false'
                for var in boolean_variables
            ] +
            [
                f'var {stringify_variable_name(var)} = v["{var}"]'
                for var in string_variables
            ]
        )
        + ";"
    )
    return f"""
        on("{change_string}", function(eventInfo) {{
            getAttrs([{get_attrs_string}], function(v) {{
                {set_variables_string}
                {function_body}
            }});
        }});
    """


def stringify_variable_name(varname):
    return varname.replace("$", "")


def get_misc_variables(variable_name, count):
    misc = [f"{variable_name}_misc_{i}" for i in range(count)]
    if variable_name in [
        "accuracy",
        "all_defenses",
        "all_skills",
        "armor_defense",
        "encumbrance",
        "damage_resistance_bonus",
        "fatigue_tolerance",
        "fortitude",
        "hit_points",
        "mental",
        "power",
        "reflex",
        "vital_rolls",
    ]:
        misc += [variable_name + "_custom_modifier"]
    # Multipliers to HP and resistances can't be incorporated into the "misc"
    # bucket
    if variable_name in [
            "accuracy",
            "all_defenses",
            "vital_rolls",
    ]:
        misc += [variable_name + "_vital_wound_modifier"]
    return misc


def sum_variables(variables):
    return "+".join(variables)


def attribute_change(a):
    misc = get_misc_variables(a, 2)
    return js_wrapper(
        ["level", f"{a}_point_buy", *misc],
        f"""
            var value = {a}_point_buy > 0
                ? {{
                    1: 1,
                    3: 2,
                    5: 3,
                    8: 4,
                }}[{a}_point_buy]
                : {a}_point_buy;
            value += {sum_variables(misc)};

            setAttrs({{
                {a}: value || 0,
            }});
        """,
    )


def attribute_skills(attribute):
    return "\n".join(
        [
            set_skill(attribute, skill.lower().replace(" ", "_"))
            for skill in ATTRIBUTE_SKILLS[attribute]
        ]
    )


def set_skill(a, s):
    misc = get_misc_variables(s, 4)
    if a == "other":
        return js_wrapper(
            ["level", "fatigue_penalty", "all_skills_custom_modifier", *misc],
            boolean_variables=[
                f"{s}_is_trained",
            ],
            function_body=f"""
                var ranks = 0;

                if ({s}_is_trained) {{
                    ranks = 3 + Math.floor(level / 2);
                }}

                setAttrs({{
                    {s}_level: ranks,
                    {s}_total: ranks + {sum_variables(misc)} + all_skills_custom_modifier - fatigue_penalty,
                }});
            """,
        )
    else:
        include_encumbrance = a in ["strength", "dexterity"]
        subtract_encumbrance = " - encumbrance" if include_encumbrance else ""
        return js_wrapper(
            [
                "level",
                a,
                "fatigue_penalty",
                "all_skills_custom_modifier",
                *misc,
                *(["encumbrance"] if include_encumbrance else []),
            ],
            boolean_variables=[
                f"{s}_is_trained",
            ],
            function_body=f"""
                var ranks = 0;

                if ({s}_is_trained) {{
                    ranks = 3 + Math.floor(level / 2);
                }}

                var {s}_total = ranks + {a} + {sum_variables(misc)} + all_skills_custom_modifier - fatigue_penalty {subtract_encumbrance};

                setAttrs({{
                    {s}_level: ranks,
                    {s}_attribute: {a},
                    {s}_total,
                    {s}: {s}_total,
                }});
            """,
        )


def core_statistics():
    return [
        accuracy(),
        encumbrance(),
        fatigue_penalty(),
        fatigue_tolerance(),
        hit_points(),
        initiative(),
        insight_points(),
        land_speed(),
        power(),
        skill_points(),
        vital_rolls(),
        weapon_damage_dice(),
    ]


def defenses():
    return [
        armor_defense(),
        fortitude(),
        mental(),
        reflex(),
    ]


def accuracy():
    misc = get_misc_variables("accuracy", 3)
    return js_wrapper(
        [
            "challenge_rating",
            "level",
            "perception",
            "fatigue_penalty",
            "accuracy_debuff_modifier",
            *misc,
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor(level / 9)) : 0;
            setAttrs({{
                accuracy: (
                    Math.floor(level / 2)
                    + Math.floor(perception / 2)
                    + {sum_variables(misc)}
                    + level_scaling
                    - fatigue_penalty
                    + accuracy_debuff_modifier
                ),
            }});
        """,
    )


def attunement_points():
    misc = get_misc_variables("attunement_points", 4)
    return js_wrapper(
        ["level", "attunement_points_from_class", *misc],
        f"""
            var attunement_points = attunement_points_from_class + {sum_variables(misc)};
            setAttrs({{
                attunement_points,
                attunement_points_max: attunement_points,
                attunement_points_maximum: attunement_points,
            }});
        """,
    )


def unknown_statistic():
    misc = get_misc_variables("unknown_statistic", 4)
    return js_wrapper(
        [*misc],
        f"""
            setAttrs({{
                unknown_statistic: {sum_variables(misc)},
            }});
        """,
    )


def armor_defense():
    misc = get_misc_variables("armor_defense", 2)
    return js_wrapper(
        [
            "level",
            "dexterity",
            "constitution",
            "armor_defense_class_bonus",
            "body_armor_defense_value",
            "shield_defense_value",
            "armor_debuff_modifier",
            *misc,
            "challenge_rating",
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var attribute_modifier = 0;
            if (challenge_rating > 0) {{
                attribute_modifier += Math.floor(constitution / 2);
            }}
            if (body_armor_usage_class === "medium" || challenge_rating > 0) {{
                attribute_modifier += Math.floor(dexterity / 2);
            }} else if (body_armor_usage_class === "none" || body_armor_usage_class === "light") {{
                attribute_modifier += dexterity;
            }}
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            if (challenge_rating === 4) {{
                level_scaling += 1;
            }} else if (challenge_rating === 6) {{
                level_scaling += 2;
            }}
            var before_equipment = (
                Math.floor(level / 2)
                + attribute_modifier
                + level_scaling
                + armor_defense_class_bonus
            );
            var total = (
                before_equipment
                + body_armor_defense_value
                + shield_defense_value
                + armor_debuff_modifier
                + {sum_variables(misc)}
                + all_defenses_custom_modifier
                + all_defenses_vital_wound_modifier
            );
            setAttrs({{
                armor_defense: total,
                body_armor_attribute: attribute_modifier,
            }});
        """,
        string_variables=["body_armor_usage_class"],
    )


def fortitude():
    misc = get_misc_variables("fortitude", 3)
    return js_wrapper(
        [
            "level",
            "constitution",
            "fortitude_class",
            "challenge_rating",
            "fortitude_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            if (challenge_rating === 4) {{
                level_scaling += 1;
            }} else if (challenge_rating === 6) {{
                level_scaling += 2;
            }}
            setAttrs({{
                fortitude: (
                    Math.floor(level / 2)
                    + constitution
                    + fortitude_class
                    + level_scaling
                    + fortitude_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
                    + all_defenses_vital_wound_modifier
                ),
            }});
        """,
    )


def reflex():
    misc = get_misc_variables("reflex", 3)
    return js_wrapper(
        [
            "level",
            "dexterity",
            "reflex_class",
            "challenge_rating",
            "reflex_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            if (challenge_rating === 4) {{
                level_scaling += 1;
            }} else if (challenge_rating === 6) {{
                level_scaling += 2;
            }}
            setAttrs({{
                reflex: (
                    Math.floor(level / 2)
                    + dexterity
                    + reflex_class
                    + level_scaling
                    + reflex_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
                    + all_defenses_vital_wound_modifier
                ),
            }});
        """,
    )


def mental():
    misc = get_misc_variables("mental", 3)
    return js_wrapper(
        [
            "level",
            "willpower",
            "mental_class",
            "challenge_rating",
            "mental_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            if (challenge_rating === 4) {{
                level_scaling += 1;
            }} else if (challenge_rating === 6) {{
                level_scaling += 2;
            }}
            setAttrs({{
                mental: (
                    Math.floor(level / 2)
                    + willpower
                    + mental_class
                    + level_scaling
                    + mental_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
                    + all_defenses_vital_wound_modifier
                ),
            }});
        """,
    )


def encumbrance():
    misc = get_misc_variables("encumbrance", 2)
    return js_wrapper(
        ["level", "body_armor_encumbrance", "strength", *misc],
        f"""
            setAttrs({{
                encumbrance: Math.max(
                    body_armor_encumbrance
                    - Math.max(0, strength)
                    - {'-'.join(misc)}
                , 0),
            }});
        """,
    )


def initiative():
    misc = get_misc_variables("initiative", 3)
    return js_wrapper(
        ["dexterity", "perception", "fatigue_penalty", *misc],
        f"""
            var scaling = dexterity + perception;
            setAttrs({{
                initiative: scaling + {sum_variables(misc)} - fatigue_penalty,
                initiative_scaling: scaling,
            }});
        """,
    )


def land_speed():
    misc = get_misc_variables("speed", 2)
    return js_wrapper(
        ["level", "speed_size", "speed_armor", *misc],
        f"""
            setAttrs({{
                land_speed: speed_size - speed_armor + {sum_variables(misc)}
            }});
        """,
    )


def skill_points():
    misc = get_misc_variables("skill_points", 3)
    return js_wrapper(
        ["level", "skill_points_base", "intelligence", *misc],
        f"""
            let from_int = Math.max(0, intelligence);
            setAttrs({{
                skill_points_intelligence: from_int,
                skill_points: skill_points_base + from_int + {sum_variables(misc)}
            }});
        """,
    )


def fatigue_tolerance():
    misc = get_misc_variables("fatigue_tolerance", 2)
    return js_wrapper(
        ["level", "fatigue_tolerance_base", "constitution", "willpower", *misc],
        f"""
            var fatigue_tolerance_attributes = constitution + Math.floor(willpower / 2);
            var fatigue_tolerance = Math.max(0, fatigue_tolerance_base + fatigue_tolerance_attributes + {sum_variables(misc)});
            setAttrs({{
                fatigue_tolerance_attributes,
                fatigue_tolerance,
                // for red bars
                fatigue_points_max: fatigue_tolerance,
            }});
        """,
    )



def hit_points():
    misc = get_misc_variables("hit_points", 4)
    return js_wrapper(
        [
            "level",
            "constitution",
            "challenge_rating",
            "hit_points_vital_wound_multiplier",
            *misc
        ],
        no_listen_variables=["hit_points", "hit_points_maximum"],
        function_body=f"""
            var levelish = level + constitution;
            var hit_points_from_level = 9 + levelish;
            if (levelish > 0) {{
                var multiplier = 1;
                while (levelish > 21) {{
                    levelish -= 6;
                    multiplier += 1;
                }}
                hit_points_from_level = multiplier * {{
                    1:    10,
                    2:    11,
                    3:    12,
                    4:    13,
                    5:    14,
                    6:    16,
                    7:    18,
                    8:    20,
                    9:    22,
                    10:    25,
                    11:    28,
                    12:    32,
                    13:    36,
                    14:    40,
                    15:    44,
                    16:    50,
                    17:    56,
                    18:    64,
                    19:    72,
                    20:    80,
                    21:    88,
                    22:    100,
                }}[levelish] || 1;
            }}

            var new_hit_points = hit_points_from_level + {sum_variables(misc)};
            var cr_multiplier = {{
                0: 1,
                0.5: 1,
                1: 1,
                2: 3,
                4: 4,
                6: 6,
            }}[challenge_rating || 0];
            new_hit_points = Math.floor(new_hit_points * cr_multiplier * (hit_points_vital_wound_multiplier || 1))

            let attrs = {{
                hit_points_from_level: hit_points_from_level * cr_multiplier,
                hit_points_max: new_hit_points,
                hit_points_maximum: new_hit_points,
            }};
            let should_set_current_hp = (new_hit_points < hit_points) || (hit_points === hit_points_maximum) || !hit_points_maximum;
            if (should_set_current_hp) {{
                attrs.hit_points = new_hit_points;
            }}
            setAttrs(attrs);
        """,
    )


def fatigue_penalty():
    return js_wrapper(
        ["fatigue_points", "fatigue_tolerance"],
        f"""
            setAttrs({{
                fatigue_penalty: Math.max(0, fatigue_points - fatigue_tolerance),
            }});
        """,
    )


def insight_points():
    misc = get_misc_variables("insight_points", 3)
    return js_wrapper(
        ["insight_points_base", "intelligence", *misc],
        f"""
            setAttrs({{
                insight_points: Math.max(0, insight_points_base + intelligence + {sum_variables(misc)}),
            }});
        """,
    )


def power():
    misc = get_misc_variables("power", 4)
    return js_wrapper(
        ["level", "class_power", "challenge_rating", *misc],
        f"""
            var level_scaling = challenge_rating
                ? {{
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 6,
                    5: 8,
                    6: 12,
                    7: 16,
                    8: 24,
                }}[Math.floor((level + 2) / 3)]
                : 0;
            level_scaling = level_scaling * (challenge_rating
                ? {{
                    0.5: 0.5,
                    1: 1,
                    2: 2,
                    4: 3,
                    6: 4,
                }}[challenge_rating]
                : 0);
            setAttrs({{
                power: (
                    level_scaling
                    + class_power
                    + {sum_variables(misc)}
                ),
            }});
        """,
    )


def damage_resistance():
    misc = get_misc_variables("damage_resistance_bonus", 4)
    return js_wrapper(
        [
            "constitution",
            "level",
            "challenge_rating",
            "damage_resistance_bonus_armor",
            "damage_resistance_bonus_vital_wound_multiplier",
            *misc,
        ],
        no_listen_variables=["damage_resistance", "damage_resistance_maximum"],
        function_body=f"""
            var resistance_from_level = 0;
            var levelish = level + constitution;
            if (levelish > 0) {{
                var multiplier = 1;
                while (levelish > 21) {{
                    levelish -= 6;
                    multiplier += 1;
                }}
                resistance_from_level = {{
                    1:  1,
                    2:  2,
                    3:  3,
                    4:  4,
                    5:  5,
                    6:  6,
                    7:  7,
                    8:  9,
                    9:  10,
                    10:  12,
                    11:  13,
                    12:  15,
                    13:  16,
                    14:  18,
                    15:  20,
                    16:  22,
                    17:  25,
                    18:  28,
                    19:  32,
                    20:  36,
                    21:  40,
                }}[levelish] * multiplier;
            }}
            var cr_multiplier = {{
                0: 1,
                0.5: 0,
                1: 2,
                2: 4,
                4: 8,
                6: 16,
            }}[challenge_rating || 0];
            const new_damage_resistance = Math.floor(
                (
                    resistance_from_level + damage_resistance_bonus_armor + {sum_variables(misc)}
                ) * cr_multiplier * (damage_resistance_bonus_vital_wound_multiplier || 1)
            );

            let attrs = {{
                damage_resistance_from_level: resistance_from_level * cr_multiplier,
                damage_resistance_max: new_damage_resistance,
                damage_resistance_maximum: new_damage_resistance,
            }};
            let should_set_current_dr = (new_damage_resistance < damage_resistance) || (damage_resistance === damage_resistance_maximum) || !damage_resistance_maximum;
            if (should_set_current_dr) {{
                attrs.damage_resistance = new_damage_resistance;
            }}
            setAttrs(attrs);
        """,
    )


def skill_points_spent():
    skill_names = [
        skill_name for skills in ATTRIBUTE_SKILLS.values() for skill_name in skills
    ]
    skill_names = [skill_name.lower().replace(" ", "_") for skill_name in skill_names]
    skill_points_names = [f"{skill_name}_is_trained" for skill_name in skill_names]

    return js_wrapper(
        [],
        f"""
            let skill_points_spent = 0;
            for (let trained of [{', '.join(skill_points_names)}]) {{
                if (trained) {{
                    skill_points_spent += 1;
                }}
            }}

            setAttrs({{
                skill_points_spent,
            }});
        """,
        boolean_variables=skill_points_names,
    )


def debuffs():
    return js_wrapper(
        [],
        boolean_variables=[
            # conditional debuffs
            "climbing",
            "flying",
            "flying_poorly",
            "goaded",
            "grappled",
            "helpless",
            "prone",
            "squeezing",
            "swimming",
            "partially_unaware",
            "unaware",
            # rank 1 debuffs
            "dazed",
            "dazzled",
            "shaken",
            "slowed",
            # rank 2 debuffs
            "frightened",
            "stunned",
            # rank 3 debuffs
            "confused",
            "blinded",
            "immobilized",
            "panicked",
            # rank 4 debuffs
            "asleep",
            "paralyzed",
        ],
        function_body=f"""
            let accuracy = 0;
            let armor = 0;
            let fortitude = 0;
            let mental = 0;
            let reflex = 0;
            let debuff_headers = "";

            // circumstantial effects
            if (grappled) {{
                armor -= 2;
                reflex -= 2;
            }}
            if (partially_unaware && !(unaware || asleep || helpless || paralyzed || blinded)) {{
                armor -= 2;
                reflex -= 2;
            }}
            if (unaware && !(asleep || helpless || paralyzed)) {{
                armor -= 4;
                reflex -= 4;
            }}
            if (squeezing) {{
                accuracy -= 2;
                armor -= 2;
                reflex -= 2;
            }}
            if (flying && !flying_poorly) {{
                armor -= 2;
                reflex -= 2;
            }}
            if (flying_poorly) {{
                armor -= 4;
                reflex -= 4;
            }}
            if (climbing || swimming) {{
                accuracy -= 4;
                armor -= 4;
                reflex -= 4;
            }}
            if (prone) {{
                armor -= 2;
                reflex -= 2;
            }}

            // rank 1 debuffs
            if (dazed && !(stunned || confused)) {{
                armor -= 2;
                fortitude -= 2;
                mental -= 2;
                reflex -= 2;
            }}
            if (dazzled && !blinded) {{
                debuff_headers += " {{{{Miss chance=Miss on 1: [[d4]]}}}}";
            }}
            if (blinded) {{
                debuff_headers += " {{{{Miss chance=Miss on 1: [[d2]]}}}}";
            }}
            if (blinded && !(unaware || partially_unaware || asleep || helpless || paralyzed)) {{
                armor -= 2;
                reflex -= 2;
            }}
            if (goaded) {{
                debuff_headers += " {{{{Goaded=+2 accuracy vs source}}}}";
                accuracy -= 2;
            }}
            if (shaken && !frightened && !panicked) {{
                accuracy -= 2;
                mental -= 2;
            }}
            if (slowed && !immobilized) {{
                reflex -= 2;
            }}

            // rank 2 debuffs
            if (frightened && !panicked) {{
                accuracy -= 4;
                mental -= 4;
            }}
            if (stunned || confused) {{
                armor -= 4;
                fortitude -= 4;
                reflex -= 4;
                mental -= 4;
            }}

            // rank 3 debuffs
            if (immobilized) {{
                reflex -= 4;
            }}
            if (panicked) {{
                mental -= 4;
            }}
            if (asleep || helpless || paralyzed) {{
                armor -= 10;
                reflex -= 10;
            }}

            setAttrs({{
                accuracy_debuff_modifier: accuracy,
                armor_debuff_modifier: armor,
                fortitude_debuff_modifier: fortitude,
                mental_debuff_modifier: mental,
                reflex_debuff_modifier: reflex,
                debuff_headers: debuff_headers.trim(),
            }});
        """,
    )


def vital_rolls():
    misc = get_misc_variables("vital_rolls", 3)
    return js_wrapper(
        ["level", "vital_wound_count", *misc],
        f"""
            setAttrs({{
                vital_rolls: {sum_variables(misc)} - vital_wound_count,
            }});
        """,
    )

def weapon_damage_dice():
    misc = get_misc_variables("weapon_damage_dice", 4)
    return js_wrapper(
        ["level", "challenge_rating", *misc],
        f"""
            const from_cr = challenge_rating > 0
                ? Math.floor((level - 1) / 3)
                : 0;
            setAttrs({{
                weapon_damage_dice: from_cr + {sum_variables(misc)}
            }});
        """,
    )

def monster_chat_color():
    return js_wrapper(
        ["challenge_rating"],
        string_variables=["chat_color"],
        function_body=f"""
            if (challenge_rating > 0) {{
                setAttrs({{
                    chat_color: "monster",
                }});
            }}
        """,
    )

def vital_wounds():
    return """
        function calc_vital_wound_effect(roll) {
            roll = Number(roll);
            if (roll <= -1) {
                return "Unconscious, die next round";
            } else if (roll >= 10) {
                return "No effect";
            }
            return {
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
            }[roll];
        }

        function count_rolls(rolls, value) {
            return rolls.filter((r) => r == value).length;
        }

        on("change:repeating_vitalwounds:vital_wound_roll remove:repeating_vitalwounds", function(eventInfo) {
            getSectionIDs("repeating_vitalwounds", (repeatingSectionIds) => {
                const vitalWoundRollIds = repeatingSectionIds.map((id) => `repeating_vitalwounds_${id}_vital_wound_roll`);
                getAttrs(vitalWoundRollIds, (values) => {
                    let rolls = Object.values(values);
                    let accuracy_penalty = -count_rolls(rolls, 3) * 2 - count_rolls(rolls, 8);
                    let defense_penalty = -count_rolls(rolls, 4) * 2 - count_rolls(rolls, 9);
                    let vital_roll_penalty = -count_rolls(rolls, 5);
                    let hp_multiplier = 0.5 ** count_rolls(rolls, 2);
                    let resistance_multiplier = 0.5 ** (count_rolls(rolls, 2) + count_rolls(rolls, 7));
                    let attrs = {
                        vital_wound_count: repeatingSectionIds.length,

                        accuracy_vital_wound_modifier: accuracy_penalty,
                        all_defenses_vital_wound_modifier: defense_penalty,
                        hit_points_vital_wound_multiplier: hp_multiplier,
                        damage_resistance_bonus_vital_wound_multiplier: resistance_multiplier,
                        vital_rolls_vital_wound_modifier: vital_roll_penalty,
                    };
                    if (eventInfo.triggerName != "remove:repeating_vitalwounds") {
                        let effect_id = eventInfo.sourceAttribute.replace("_roll", "_effect");
                        attrs[effect_id] = calc_vital_wound_effect(eventInfo.newValue);
                    }
                    setAttrs(attrs);
                });
            });
        });
    """

def attuned_effects():
    return """
        on("change:repeating_attunements remove:repeating_attunements", function(eventInfo) {
            getSectionIDs("repeating_attunements", (repeatingSectionIds) => {
                const isActiveIds = repeatingSectionIds.map((id) => `repeating_attunements_${id}_attunement_active`);
                getAttrs(isActiveIds, (values) => {
                    const activeAbilities = isActiveIds.filter((id) => values[id] == 1 || values[id] == "on");
                    setAttrs({
                        active_attunement_count: activeAbilities.length,
                    });
                });
            });
        });
    """

def custom_modifiers():
    return """
        on("change:repeating_custommodifiers remove:repeating_custommodifiers", function(eventInfo) {
            const nestedCustomStatisticCount = 4;
            const formatStatisticId = (id, i) => `repeating_custommodifiers_${id}_statistic${i}`;
            const formatValueId = (id, i) => `repeating_custommodifiers_${id}_value${i}`;
            const formatIsActiveId = (id) => `repeating_custommodifiers_${id}_is_active`;

            getSectionIDs("repeating_custommodifiers", (repeatingSectionIds) => {
                const fullAttributeIds = [];
                for (const id of repeatingSectionIds) {
                    fullAttributeIds.push(formatIsActiveId(id));
                    for (let i=0; i < nestedCustomStatisticCount; i++) {
                        fullAttributeIds.push(formatStatisticId(id, i));
                        fullAttributeIds.push(formatValueId(id, i));
                    }
                }
                getAttrs(fullAttributeIds, (values) => {
                    const totalCustomModifiers = {};
                    for (const id of repeatingSectionIds) {
                        const isActive = values[formatIsActiveId(id)];
                        if (isActive === 'on' || isActive == 1) {
                            for (let i=0; i < nestedCustomStatisticCount; i++) {
                                const modifiedStatistic = values[formatStatisticId(id, i)];
                                const value = Number(values[formatValueId(id, i)]) || 0;
                                totalCustomModifiers[modifiedStatistic] = (totalCustomModifiers[modifiedStatistic] || 0) + value;
                            }
                        }
                    };
                    setAttrs({
                        accuracy_custom_modifier: totalCustomModifiers.accuracy || 0,
                        all_defenses_custom_modifier: totalCustomModifiers.all_defenses || 0,
                        all_skills_custom_modifier: totalCustomModifiers.all_skills || 0,
                        armor_defense_custom_modifier: totalCustomModifiers.armor_defense || 0,
                        damage_resistance_bonus_custom_modifier: totalCustomModifiers.energy_resistance_bonus || 0,
                        encumbrance_custom_modifier: totalCustomModifiers.encumbrance || 0,
                        fatigue_tolerance_custom_modifier: totalCustomModifiers.fatigue_tolerance || 0,
                        fortitude_custom_modifier: totalCustomModifiers.fortitude || 0,
                        hit_points_custom_modifier: totalCustomModifiers.hit_points || 0,
                        mental_custom_modifier: totalCustomModifiers.mental || 0,
                        power_custom_modifier: totalCustomModifiers.power || 0,
                        reflex_custom_modifier: totalCustomModifiers.reflex || 0,
                        vital_rolls_custom_modifier: totalCustomModifiers.vital_rolls || 0,
                    });
                });
            });
        });
    """

def abilities_known():
    return [
        combat_styles_known(),
        maneuvers_known(),
        spells_known(),
        spheres_known(),
        *[blank_ability_known(i) for i in range(1)],
    ]

def combat_styles_known():
    misc = get_misc_variables("combat_styles_known", 4)
    return js_wrapper(
        ["combat_styles_known_insight_points", *misc],
        f"""
            setAttrs({{
                combat_styles_known: combat_styles_known_insight_points + {sum_variables(misc)}
            }});
        """,
    )


def maneuvers_known():
    misc = get_misc_variables("maneuvers_known", 4)
    return js_wrapper(
        ["maneuvers_known_insight_points", *misc],
        f"""
            setAttrs({{
                maneuvers_known: maneuvers_known_insight_points + {sum_variables(misc)}
            }});
        """,
    )


def spheres_known():
    misc = get_misc_variables("spheres_known", 4)
    return js_wrapper(
        ["spheres_known_insight_points", *misc],
        f"""
            setAttrs({{
                spheres_known: Math.floor(spheres_known_insight_points / 2) + {sum_variables(misc)}
            }});
        """,
    )


def spells_known():
    misc = get_misc_variables("spells_known", 4)
    return js_wrapper(
        ["spells_known_insight_points", *misc],
        f"""
            setAttrs({{
                spells_known: spells_known_insight_points + {sum_variables(misc)}
            }});
        """,
    )


def blank_ability_known(i):
    name = f"blank_ability_known_{i}"
    misc = get_misc_variables(name, 3)
    return js_wrapper(
        [f"{name}_insight_points", *misc],
        f"""
            setAttrs({{
                {name}: {name}_insight_points + {sum_variables(misc)}
            }});
        """,
    )

def universal_abilities():
    return js_wrapper(
        ["strength", "level", "accuracy", "flexibility_total"],
        f"""
            setAttrs({{
                escape_grapple_accuracy: Math.max(accuracy, Math.floor(level/2) + strength, flexibility_total),
                maintain_grapple_accuracy: Math.max(accuracy, Math.floor(level/2) + strength),
            }});
        """
    )

def damage_dice():
    # We need two functions here! One updates a specific attack when that
    # specific attack changes, and one updates *all* attacks when general
    # character changes happen.
    infrastructure = """
        function getOdaDamageDiceAttrs(sectionId, callback) {
            if (sectionId) {
                sectionId = sectionId + '_';
            }
            const damage_dice_key = `repeating_otherdamagingattacks_${sectionId}attack_damage_dice`;
            const attack_power_key = `repeating_otherdamagingattacks_${sectionId}attack_power`;
            const is_magical_key = `repeating_otherdamagingattacks_${sectionId}attack_is_magical`;
            getAttrs([
                "strength", "intelligence", "willpower",
                "feat_name_0", "feat_name_1", "feat_name_2", "feat_name_3",
                "power",
                damage_dice_key,
                attack_power_key,
                is_magical_key,
            ], function (v) {
                const feats = [v.feat_name_0, v.feat_name_1, v.feat_name_2, v.feat_name_3];
                let relevant_attribute = v[is_magical_key] === '1' ? Number(v.willpower) : Number(v.strength);
                if (feats.includes("Precognition")) {
                    relevant_attribute = Math.max(relevant_attribute, Number(v.intelligence));
                }
                const parsedAttrs = {
                    attack_damage_dice: v[damage_dice_key],
                    attack_power: Number(v[attack_power_key]),
                    power: Number(v.power),
                    relevant_attribute,
                };
                callback(parsedAttrs);
            });
        }

        function getStrikeAttrs(sectionId, callback) {
            if (sectionId) {
                sectionId = sectionId + '_';
            }
            const attack_power_key = `repeating_strikeattacks_${sectionId}attack_power`;
            const damage_modifier_key = `repeating_strikeattacks_${sectionId}attack_damage_modifier`;
            const is_magical_key = `repeating_strikeattacks_${sectionId}attack_is_magical`;
            const weapon_keys = [];
            for (let i = 0; i < 3; i++) {
                weapon_keys.push(`weapon_${i}_magical_dice`);
                weapon_keys.push(`weapon_${i}_mundane_dice`);
            }
            getAttrs([
                attack_power_key, damage_modifier_key, is_magical_key,
                ...weapon_keys,
                "power",
            ], function(v) {
                const dice_type = v[is_magical_key] === '1' ? 'magical' : 'mundane';

                const weapon_dice = [];
                for (let i = 0; i < 3; i++) {
                    weapon_dice.push(v[`weapon_${i}_${dice_type}_dice`]);
                }
                callback({
                    attack_power: Number(v[attack_power_key]),
                    damage_modifier: Number(v[damage_modifier_key]),
                    power: Number(v.power),
                    weapon_dice,
                });
            });

        }

        function getWeaponDamageDiceAttrs(weaponIndex, callback) {
            const weapon_damage_key = `weapon_${weaponIndex}_damage_dice`;
            getAttrs([
                "strength", "intelligence", "willpower",
                "feat_name_0", "feat_name_1", "feat_name_2", "feat_name_3",
                "weapon_damage_dice",
                weapon_damage_key,
            ], function (v) {
                let mundane_attribute = Number(v.strength);
                let magical_attribute = Number(v.willpower);
                const feats = [v.feat_name_0, v.feat_name_1, v.feat_name_2, v.feat_name_3];
                if (feats.includes("Precognition")) {
                    mundane_attribute = Math.max(mundane_attribute, Number(v.intelligence));
                    magical_attribute = Math.max(magical_attribute, Number(v.intelligence));
                }
                const parsedAttrs = {
                    all_weapons_damage_dice_bonus: Number(v.weapon_damage_dice) || 0,
                    magical_attribute,
                    mundane_attribute,
                    weapon_damage_dice: v[weapon_damage_key],
                };
                callback(parsedAttrs);
            });
        }

        function parseDamageDice(attack_damage_dice) {
            if (!attack_damage_dice) {
                return null;
            }
            let [count, size] = attack_damage_dice.split("d");
            if (count === '') {
                count = 1;
            }
            let modifier = 0;
            if (size.includes("+")) {
                [size, modifier] = size.split("+");
            } else if (size.includes("-")) {
                [size, modifier] = size.split("-");
            }
            return {
                count: Number(count),
                modifier: Number(modifier),
                size: Number(size),
            };
        }

        function addDiceIncrements(count, size, increments) {
            const all_dice_pools = [
                "1d1",
                "1d2",
                "1d3",
                "1d4",
                "1d6",
                "1d8",
                "1d10",
                "2d6",
                "2d8",
                "2d10",
                "4d6",
                "4d8",
                "4d10",
            ];
            const key = `${count}d${size}`;
            const initialIndex = count > 4
                ? (count - 5) + all_dice_pools.length
                : all_dice_pools.findIndex((pool) => pool === key);
            const modifiedIndex = initialIndex + Number(increments);
            if (modifiedIndex >= all_dice_pools.length) {
                return {
                    count: (modifiedIndex - all_dice_pools.length) + 5,
                    size: 10,
                };
            } else if (modifiedIndex < 0) {
                return {
                    count: 1,
                    size: 1,
                }
            } else {
                const [count, size] = all_dice_pools[modifiedIndex].split('d');
                return {count, size};
            }
        }

        function format_dice_pool(count, size, modifier) {
            let dice = `${count}d${size}`;
            if (modifier > 0) {
                return `${dice}+${modifier}`;
            } else if (modifier < 0) {
                return `${dice}${modifier}`;
            } else {
                return dice;
            }
        }

        function setOdaTotalDamage(sectionId, v) {
            if (sectionId) {
                sectionId += '_';
            }
            const damage_dice = parseDamageDice(v.attack_damage_dice);
            let total_damage = '';
            let total_damage_dice = '';
            let total_damage_modifier = '';
            if (damage_dice) {
                const modifier = damage_dice.modifier + Math.floor(v.power * v.attack_power);

                let {count, size} = addDiceIncrements(damage_dice.count, damage_dice.size, Math.floor(v.relevant_attribute / 2));
                total_damage = format_dice_pool(count, size, modifier);
                total_damage_dice = format_dice_pool(count, size, 0);
                total_damage_modifier = modifier;
            }

            const prefix = `repeating_otherdamagingattacks_${sectionId}`;
            setAttrs({
                [prefix + 'total_damage']: total_damage,
                [prefix + 'total_damage_dice']: total_damage_dice,
                [prefix + 'total_damage_modifier']: total_damage_modifier,
            });
        }

        function calc_weapon_damage_strings(v) {
            const damage_dice = parseDamageDice(v.weapon_damage_dice);
            if (!damage_dice) {
                return {
                    magical: "",
                    mundane: "",
                };
            }
            let with_global_bonus = addDiceIncrements(damage_dice.count, damage_dice.size, v.all_weapons_damage_dice_bonus);
            let magical = addDiceIncrements(with_global_bonus.count, with_global_bonus.size, Math.floor(v.magical_attribute / 2));
            let mundane = addDiceIncrements(with_global_bonus.count, with_global_bonus.size, Math.floor(v.mundane_attribute / 2));
            return {
                magical: format_dice_pool(magical.count, magical.size, damage_dice.modifier),
                mundane: format_dice_pool(mundane.count, mundane.size, damage_dice.modifier),
            };
        }

        function setStrikeTotalDamage(sectionId, v) {
            if (sectionId) {
                sectionId += '_';
            }
            const attrs = {};
            for (let i = 0; i < 3; i++) {
                const weapon_prefix = `repeating_strikeattacks_${sectionId}weapon_${i}_`;
                const weapon_dice = parseDamageDice(v.weapon_dice[i]);
                let total_damage = '';
                let total_damage_dice = '';
                let total_damage_modifier = '';
                if (weapon_dice) {
                    const modifier = weapon_dice.modifier + Math.floor(v.power * v.attack_power) + v.damage_modifier;
                    total_damage = format_dice_pool(weapon_dice.count, weapon_dice.size, modifier);
                    total_damage_dice = format_dice_pool(weapon_dice.count, weapon_dice.size, 0);
                    total_damage_modifier = modifier;
                }
                attrs[weapon_prefix + 'total_damage'] = total_damage;
                attrs[weapon_prefix + 'total_damage_dice'] = total_damage_dice;
                attrs[weapon_prefix + 'total_damage_modifier'] = total_damage_modifier;
            }
            setAttrs(attrs);
        }
    """

    local_oda_change = """
        on("change:repeating_otherdamagingattacks:attack_damage_dice change:repeating_otherdamagingattacks:attack_power change:repeating_otherdamagingattacks:attack_is_magical", function(eventInfo) {
            getOdaDamageDiceAttrs("", (v) => {
                setOdaTotalDamage("", v);
            });
        });
    """

    local_strike_change = """
        on("change:repeating_strikeattacks:attack_is_magical change:repeating_strikeattacks:attack_power change:repeating_strikeattacks:attack_damage_modifier", function(eventInfo) {
            getStrikeAttrs("", (v) => {
                setStrikeTotalDamage("", v);
            });
        });
    """

    global_strike_change = """
        on(
            'change:weapon_0_magical_dice change:weapon_1_magical_dice change:weapon_2_magical_dice'
            + ' change:power'
        , function (eventInfo) {
            getSectionIDs("repeating_strikeattacks", (repeatingSectionIds) => {
                for (const sectionId of repeatingSectionIds) {
                    getStrikeAttrs(sectionId, (v) => {
                        setOdaTotalDamage(sectionId, v);
                    });
                }
            });
        });
    """

    weapon_change = """
        for (let i = 0; i < 3; i++) {
            on(
                `change:weapon_${i}_damage_dice`
                + ' change:feat_name_0 change:feat_name_1 change:feat_name_2 change:feat_name_3'
                + ' change:weapon_damage_dice'
                + ' change:strength change:intelligence change:willpower'
            , function(eventInfo) {
                getWeaponDamageDiceAttrs(i, (v) => {
                    const {magical, mundane} = calc_weapon_damage_strings(v);
                    setAttrs({
                        [`weapon_${i}_magical_dice`]: magical,
                        [`weapon_${i}_mundane_dice`]: mundane,
                    });
                });
            });
        }
    """

    global_oda_change = """
        on("change:strength change:intelligence change:willpower change:feat_name_0 change:feat_name_1 change:feat_name_2 change:feat_name_3 change:power", function() {
            getSectionIDs("repeating_otherdamagingattacks", (repeatingSectionIds) => {
                for (const sectionId of repeatingSectionIds) {
                    getOdaDamageDiceAttrs(sectionId, (v) => {
                        const key = `repeating_otherdamagingattacks_${sectionId}_totaldamage`;
                        setAttrs({
                            [key]: calc_oda_string(v),
                        });
                    });
                }
            });
        });
    """

    return infrastructure + local_oda_change + local_strike_change + weapon_change + global_oda_change + global_strike_change


def standard_damage_at_power(power):
    return {
        "-4": "1d3",
        "-2": "1d4",
        "0": "1d6",
        "2": "1d8",
        "4": "1d10",
        "6": "2d6",
        "8": "2d8",
        "10": "2d10",
        "12": "4d6",
        "14": "4d8",
        "16": "4d10",
        "18": "5d10",
        "20": "6d10",
        "22": "7d10",
        "24": "8d10",
    }[str(power)]
