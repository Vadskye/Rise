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
            attuned_effects(),
            custom_modifiers(),
            monster_chat_color(),
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
                f'var {stringify_variable_name(var)} = v["{var}"] === "on" ? true : false'
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
        "armor_defense",
        "encumbrance",
        "damage_resistance_bonus",
        "fatigue_tolerance",
        "fortitude",
        "hit_points",
        "magical_power",
        "mental",
        "mundane_power",
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
    misc = get_misc_variables(a + "_starting", 2)
    return js_wrapper(
        ["level", f"{a}_point_buy", *misc],
        f"""
            var starting = {a}_point_buy > 0
                ? {{
                    1: 1,
                    2: 2,
                    4: 3,
                    6: 4,
                }}[{a}_point_buy]
                : {a}_point_buy;
            starting += {sum_variables(misc)};
            var scaling = 0;
            if (starting >= 2) {{
                scaling = Math.floor((starting-1)*0.25*level);
            }}

            setAttrs({{
                {a}: starting + scaling,
                {a}_scaling: scaling,
                {a}_starting: starting,
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
            ["level", "fatigue_penalty", *misc],
            boolean_variables=[
                f"{s}_is_trained",
            ],
            function_body=f"""
                var ranks = 0;

                if ({s}_is_trained) {{
                    ranks = 4 + Math.floor(level / 2);
                }}

                setAttrs({{
                    {s}_ranks: ranks,
                    {s}_total: ranks + {sum_variables(misc)} - fatigue_penalty,
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
                *misc,
                *(["encumbrance"] if include_encumbrance else []),
            ],
            boolean_variables=[
                f"{s}_is_trained",
            ],
            function_body=f"""
                var ranks = 0;

                if ({s}_is_trained) {{
                    ranks = 4 + Math.max({a}, Math.floor(level / 2));
                }} else {{
                    ranks = Math.floor({a} / 2);
                }}

                setAttrs({{
                    {s}_ranks: ranks,
                    {s}_total: ranks + {sum_variables(misc)} - fatigue_penalty {subtract_encumbrance},
                }});
            """,
        )


def core_statistics():
    return [
        accuracy(),
        encumbrance(),
        fatigue_penalty(),
        fatigue_tolerance(),
        focus_penalty(),
        hit_points(),
        initiative(),
        insight_points(),
        land_speed(),
        magical_power(),
        mundane_power(),
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
            "perception_starting",
            "fatigue_penalty",
            "accuracy_debuff_modifier",
            *misc,
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor(level / 9)) : 0;
            setAttrs({{
                accuracy: (
                    Math.floor(level / 2)
                    + Math.floor(perception_starting / 2)
                    + {sum_variables(misc)}
                    + level_scaling
                    - fatigue_penalty
                    + accuracy_debuff_modifier
                ),
            }});
        """,
    )


def attunement_points():
    misc = get_misc_variables("attunement_points", 3)
    return js_wrapper(
        ["level", "attunement_points_from_class", *misc],
        f"""
            var attunement_points_from_level = Math.floor(Math.max(0, (level + 1) / 6));
            var attunement_points = attunement_points_from_class + attunement_points_from_level + {sum_variables(misc)};
            setAttrs({{
                attunement_points,
                attunement_points_max: attunement_points,
                attunement_points_maximum: attunement_points,
                attunement_points_from_level,
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
            "dexterity_starting",
            "constitution_starting",
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
            var attribute_modifier = Math.floor(constitution_starting / 2);
            if (body_armor_usage_class === "medium" || challenge_rating > 0) {{
                attribute_modifier += Math.floor(dexterity_starting / 2);
            }} else if (body_armor_usage_class === "none" || body_armor_usage_class === "light") {{
                attribute_modifier += dexterity_starting;
            }}
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
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
            "constitution_starting",
            "fortitude_class",
            "challenge_rating",
            "fortitude_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            setAttrs({{
                fortitude: (
                    Math.floor(level / 2)
                    + constitution_starting
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
            "dexterity_starting",
            "reflex_class",
            "challenge_rating",
            "reflex_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            setAttrs({{
                reflex: (
                    Math.floor(level / 2)
                    + dexterity_starting
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
            "willpower_starting",
            "mental_class",
            "challenge_rating",
            "mental_debuff_modifier",
            *misc,
            "all_defenses_custom_modifier",
            "all_defenses_vital_wound_modifier",
        ],
        f"""
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 6) / 9)) : 0;
            setAttrs({{
                mental: (
                    Math.floor(level / 2)
                    + willpower_starting
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
        ["level", "body_armor_encumbrance", "strength_starting", *misc],
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
    misc = get_misc_variables("initiative", 3)
    return js_wrapper(
        ["dexterity_starting", "perception_starting", "fatigue_penalty", *misc],
        f"""
            var scaling = dexterity_starting + perception_starting;
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
        ["level", "skill_points_base", "intelligence_starting", *misc],
        f"""
            let from_int = Math.max(0, intelligence_starting);
            setAttrs({{
                skill_points_intelligence: from_int,
                skill_points: skill_points_base + from_int + {sum_variables(misc)}
            }});
        """,
    )


def fatigue_tolerance():
    misc = get_misc_variables("fatigue_tolerance", 2)
    return js_wrapper(
        ["level", "fatigue_tolerance_base", "strength_starting", "willpower_starting", *misc],
        f"""
            var fatigue_tolerance = Math.max(0, fatigue_tolerance_base + strength_starting + willpower_starting + {sum_variables(misc)});
            setAttrs({{
                fatigue_tolerance_attributes: strength_starting + willpower_starting,
                fatigue_tolerance,
                // for red bars
                fatigue_points_max: fatigue_tolerance,
            }});
        """,
    )


def focus_penalty():
    misc = get_misc_variables("focus_penalty", 3)
    return js_wrapper(
        ["level", *misc],
        f"""
            setAttrs({{
                focus_penalty: 4 - ({sum_variables(misc)}),
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
                21:   115,
                22:   130,
                23:   145,
                24:   160,
                25:   175,
                26:   190,
                27:   205,
                28:   230,
                29:   245,
                30:   260,
            }}[level] || 1;

            var new_hit_points = hit_points_from_level + constitution + {sum_variables(misc)};
            var cr_multiplier = {{
                0: 1,
                0.5: 0.5,
                1: 1,
                2: 2,
                3: 3,
                4: 4,
            }}[challenge_rating || 0];
            new_hit_points = Math.floor(new_hit_points * cr_multiplier * (hit_points_vital_wound_multiplier || 1))

            let attrs = {{
                hit_points_from_level,
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
        ["insight_points_base", "intelligence_starting", *misc],
        f"""
            setAttrs({{
                insight_points: Math.max(0, insight_points_base + intelligence_starting + {sum_variables(misc)}),
            }});
        """,
    )


def magical_power():
    misc = get_misc_variables("magical_power", 4)
    return js_wrapper(
        ["willpower", "perception", "level", "challenge_rating", *misc],
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
                }}[Math.floor(level / 3)]
                : 0;
            var magical_power_attribute = Math.floor(willpower / 2);
            setAttrs({{
                magical_power_attribute,
                magical_power: (
                    magical_power_attribute
                    + level_scaling
                    + {sum_variables(misc)}
                ),
            }});
        """,
    )


def mundane_power():
    misc = get_misc_variables("mundane_power", 4)
    return js_wrapper(
        ["strength", "perception", "level", "challenge_rating", *misc],
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
                }}[Math.floor(level / 3)]
                : 0;
            var mundane_power_attribute = Math.floor(strength / 2)
            setAttrs({{
                mundane_power_attribute,
                mundane_power: (
                    mundane_power_attribute
                    + level_scaling
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
            if (challenge_rating > 0) {{
                resistance_from_level = {{
                    1:    3,
                    2:    3,
                    3:    4,
                    4:    4,
                    5:    5,
                    6:    6,
                    7:    7,
                    8:    9,
                    9:    10,
                    10:    12,
                    11:    13,
                    12:    15,
                    13:    16,
                    14:    18,
                    15:    20,
                    16:    22,
                    17:    25,
                    18:    28,
                    19:    32,
                    20:    37,
                    21:    42,
                }}[level];
            }}
            var cr_multiplier = {{
                0: 1,
                0.5: 0,
                1: 1,
                2: 2,
                3: 4,
                4: 6,
            }}[challenge_rating || 0];
            const new_damage_resistance = Math.floor(
                (
                    resistance_from_level + constitution + damage_resistance_bonus_armor + {sum_variables(misc)}
                ) * cr_multiplier * (damage_resistance_bonus_vital_wound_multiplier || 1)
            );

            let attrs = {{
                damage_resistance_from_level: resistance_from_level,
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


def debuffs():
    return js_wrapper(
        [
            "focus_penalty",
        ],
        boolean_variables=[
            # conditional debuffs
            "crouching",
            "flying",
            "flying_poorly",
            "focusing",
            "goaded",
            "grappled",
            "helpless",
            "prone",
            "squeezing",
            "surrounded",
            "underwater",
            "partially_unaware",
            "unaware",
            # rank 1 debuffs
            "dazed",
            "dazzled",
            "shaken",
            "sickened",
            "slowed",
            # rank 2 debuffs
            "frightened",
            "nauseated",
            "stunned",
            # rank 3 debuffs
            "decelerated",
            "confused",
            "blinded",
            "disoriented",
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
                armor -= 5;
                reflex -= 5;
            }}
            if (crouching) {{
                accuracy -= 2;
            }}
            if (focusing) {{
                armor -= Math.max(focus_penalty, 0);
                reflex -= Math.max(focus_penalty, 0);
            }}
            if (squeezing) {{
                accuracy -= 2;
                armor -= 2;
                reflex -= 2;
            }}
            if (surrounded) {{
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
            if (prone) {{
                armor -= 2;
                reflex -= 2;
            }}

            // rank 1 debuffs
            if (dazed && !stunned) {{
                armor -= 2;
                fortitude -= 2;
                mental -= 2;
                reflex -= 2;
            }}
            if (dazzled && !blinded) {{
                debuff_headers = "{{{{Miss chance=Miss on 1: [[d4]]}}}}";
            }}
            if (blinded) {{
                debuff_headers = "{{{{Miss chance=Miss on 1: [[d2]]}}}}";
            }}
            if (blinded && !unaware) {{
                armor -= 2;
                reflex -= 2;
            }}
            if (goaded) {{
                accuracy -= 2;
            }}
            if (shaken && !frightened && !panicked) {{
                accuracy -= 2;
                mental -= 2;
            }}
            if (sickened && !nauseated) {{
                armor -= 2;
                fortitude -= 2;
                mental -= 2;
                reflex -= 2;
            }}
            if (slowed && !(immobilized || decelerated)) {{
                reflex -= 2;
            }}

            // rank 2 debuffs
            if (frightened && !panicked) {{
                accuracy -= 4;
                mental -= 4;
            }}
            if (nauseated) {{
                armor -= 4;
                fortitude -= 4;
                reflex -= 4;
                mental -= 4;
            }}
            if (stunned) {{
                armor -= 4;
                fortitude -= 4;
                reflex -= 4;
                mental -= 4;
            }}
            if (underwater) {{
                accuracy -= 4;
                armor -= 4;
                reflex -= 4;
            }}

            // rank 3 debuffs
            if (decelerated || immobilized) {{
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
                debuff_headers,
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
        ["level", *misc],
        f"""
            setAttrs({{
                weapon_damage_dice: {sum_variables(misc)}
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
                    const activeAbilities = isActiveIds.filter((id) => values[id] === 'on');
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
                        if (isActive === 'on') {
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
                        armor_defense_custom_modifier: totalCustomModifiers.armor_defense || 0,
                        damage_resistance_bonus_custom_modifier: totalCustomModifiers.energy_resistance_bonus || 0,
                        encumbrance_custom_modifier: totalCustomModifiers.encumbrance || 0,
                        fatigue_tolerance_custom_modifier: totalCustomModifiers.fatigue_tolerance || 0,
                        fortitude_custom_modifier: totalCustomModifiers.fortitude || 0,
                        hit_points_custom_modifier: totalCustomModifiers.hit_points || 0,
                        magical_power_custom_modifier: totalCustomModifiers.magical_power || 0,
                        mental_custom_modifier: totalCustomModifiers.mental || 0,
                        mundane_power_custom_modifier: totalCustomModifiers.mundane_power || 0,
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
