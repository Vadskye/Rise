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
            attunement_points(),
            skill_points_spent(),
            unknown_statistic(),
            vital_wounds(),
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


def js_wrapper(variables, function_body, boolean_variables=[], string_variables=[], include_level=True):
    # not everything actually depends on level, but it's convenient to make
    # everything recalculate when level changes
    if include_level:
        variables = variables + ["level"]
    all_unique_variables = sorted(list(set(variables + boolean_variables + string_variables)))
    change_string = " ".join([formatChangeString(var) for var in all_unique_variables])
    get_attrs_string = ", ".join([f'"{var}"' for var in all_unique_variables])
    set_variables_string = (
        ";\n    ".join(
            [
                f'var {stringify_variable_name(var)} = Number(v["{var}"] || 0);'
                for var in variables
            ] +
            [
                f'var {stringify_variable_name(var)} = v["{var}"] === "on" ? true : false;'
                for var in boolean_variables
            ] +
            [
                f'var {stringify_variable_name(var)} = v["{var}"];'
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
            if (starting === 1) {{
                scaling = Math.floor(level / 4);
            }} else if (starting >= 2) {{
                scaling = Math.floor((starting-1)*0.5*(level - 1));
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
    misc = get_misc_variables(s, 3)
    if a == "other":
        return js_wrapper(
            ["level", f"{s}_points", "fatigue_penalty", *misc],
            boolean_variables=[
                f"{s}_class_skill",
            ],
            function_body=f"""
                var pointsModifier = 0;
                var ranks = 0;
                var training = '';

                if ({s}_points === 1) {{
                    ranks = Math.floor(level / 2);
                    pointsModifier = 1;
                    training = 'Trained';
                }} else if (({s}_points >= 3) || (({s}_points === 2) && {s}_class_skill)) {{
                    ranks = level;
                    pointsModifier = 3;
                    training = 'Mastered';
                }}

                setAttrs({{
                    {s}_attribute: 0,
                    {s}_ranks: ranks + pointsModifier,
                    {s}_total: ranks + pointsModifier + {sum_variables(misc)} - fatigue_penalty,
                    {s}_training: training,
                }});
            """,
        )
    else:
        include_encumbrance = a in ["strength", "dexterity"]
        subtract_encumbrance = " - encumbrance" if include_encumbrance else ""
        return js_wrapper(
            [
                "level",
                f"{a}_starting",
                f"{s}_points",
                "fatigue_penalty",
                *misc,
                *(["encumbrance"] if include_encumbrance else []),
            ],
            boolean_variables=[
                f"{s}_class_skill",
            ],
            function_body=f"""
                var pointsModifier = 0;
                var ranks = 0;
                var training = '';

                if ({a}_starting >= 3 && {s}_class_skill) {{
                    {s}_points += 1;
                }}

                if ({s}_points === 1) {{
                    ranks = Math.floor(level / 2) + 1;
                    training = 'Trained';
                }} else if (({s}_points >= 3) || (({s}_points === 2) && {s}_class_skill)) {{
                    ranks = level;
                    pointsModifier = 3;
                    training = 'Mastered';
                }}

                setAttrs({{
                    {s}_ranks: ranks + pointsModifier,
                    {s}_total: ranks + pointsModifier + {a}_starting + {sum_variables(misc)} - fatigue_penalty {subtract_encumbrance},
                    {s}_training: training,
                }});
            """,
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
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 1) / 6)) : 0;
            setAttrs({{
                accuracy: (
                    level
                    + Math.floor(perception_starting / 2)
                    + {sum_variables(misc)}
                    + cr_mod
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
            var attunement_points_from_level = Math.max(0, Math.min(level, 5) - 1);
            if (level >= 11) {{
                attunement_points_from_level += 1;
            }}
            if (level >= 17) {{
                attunement_points_from_level += 1;
            }}
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
            "armor_defense_class_bonus",
            "body_armor_defense_value",
            "shield_defense_value",
            "armor_debuff_modifier",
            *misc,
            "challenge_rating",
            "all_defenses_custom_modifier",
        ],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 3) / 6)) : 0;
            var before_equipment = level + dexterity_starting + cr_mod + level_scaling + armor_defense_class_bonus;
            var total = (
                before_equipment
                + body_armor_defense_value
                + shield_defense_value
                + armor_debuff_modifier
                + {sum_variables(misc)}
                + all_defenses_custom_modifier
            );
            setAttrs({{
                armor_defense: total,
            }});
        """,
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
        ],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 3) / 6)) : 0;
            setAttrs({{
                fortitude: (
                    level
                    + constitution_starting
                    + fortitude_class
                    + cr_mod
                    + level_scaling
                    + fortitude_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
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
        ],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 3) / 6)) : 0;
            setAttrs({{
                reflex: (
                    level
                    + dexterity_starting
                    + reflex_class
                    + cr_mod
                    + level_scaling
                    + reflex_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
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
        ],
        f"""
            var cr_mod = challenge_rating === 0 ? 0 : Math.max(0, challenge_rating - 1);
            var level_scaling = challenge_rating ? Math.max(0, Math.floor((level + 3) / 6)) : 0;
            setAttrs({{
                mental: (
                    level
                    + willpower_starting
                    + mental_class
                    + cr_mod
                    + level_scaling
                    + mental_debuff_modifier
                    + {sum_variables(misc)}
                    + all_defenses_custom_modifier
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
            var scaling = Math.max(dexterity_starting, perception_starting);
            setAttrs({{
                initiative: scaling + {sum_variables(misc)} - fatigue_penalty,
                initiative_scaling: scaling,
            }});
        """,
    )


def base_speed():
    misc = get_misc_variables("speed", 2)
    return js_wrapper(
        ["level", "speed_size", "speed_armor", *misc],
        f"""
            setAttrs({{
                base_speed: speed_size - speed_armor + {sum_variables(misc)}
            }});
        """,
    )


def skill_points():
    misc = get_misc_variables("skill_points", 3)
    return js_wrapper(
        ["level", "skill_points_base", "intelligence_starting", *misc],
        f"""
            setAttrs({{
                skill_points: skill_points_base + intelligence_starting * 2 + {sum_variables(misc)}
            }});
        """,
    )


def fatigue_tolerance():
    misc = get_misc_variables("fatigue_tolerance", 2)
    return js_wrapper(
        ["level", "fatigue_tolerance_base", "constitution_starting", "willpower_starting", *misc],
        f"""
            setAttrs({{
                fatigue_tolerance_attributes: constitution_starting + willpower_starting,
                fatigue_tolerance: Math.max(0, fatigue_tolerance_base + constitution_starting + willpower_starting + {sum_variables(misc)}),
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
        ["level", "constitution", "challenge_rating", *misc],
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
            if (challenge_rating > 0) {{
                hit_points_from_level = Math.floor(hit_points_from_level * 1.5);
            }}

            var hit_points = hit_points_from_level + constitution + {sum_variables(misc)};
            var cr_multiplier = {{
                0: 1,
                0.5: 0.5,
                1: 1,
                2: 1,
                3: 2,
                4: 4,
            }}[challenge_rating || 0];
            hit_points = Math.floor(hit_points * cr_multiplier)
            setAttrs({{
                hit_points,
                hit_points_from_level,
                hit_points_max: hit_points,
                hit_points_maximum: hit_points,
            }});
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
    misc = get_misc_variables("magical_power", 3)
    return js_wrapper(
        ["willpower", "level", "challenge_rating", *misc],
        f"""
            var willpower_power_scaling = Math.floor(willpower / 2);
            var level_scaling = challenge_rating
                ? {{
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 6,
                    6: 8,
                    7: 12,
                    8: 16,
                }}[Math.floor(level / 3)]
                : 0;
            setAttrs({{
                magical_power: (
                    willpower_power_scaling
                    + level_scaling
                    + {sum_variables(misc)}
                ),
                willpower_power_scaling,
            }});
        """,
    )


def mundane_power():
    misc = get_misc_variables("mundane_power", 3)
    return js_wrapper(
        ["strength", "level", "challenge_rating", *misc],
        f"""
            var strength_power_scaling = Math.floor(strength / 2);
            var level_scaling = challenge_rating
                ? {{
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 6,
                    6: 8,
                    7: 12,
                    8: 16,
                }}[Math.floor(level / 3)]
                : 0;
            setAttrs({{
                mundane_power: (
                    strength_power_scaling
                    + level_scaling
                    + {sum_variables(misc)}
                ),
                strength_power_scaling,
            }});
        """,
    )


def damage_resistance():
    misc = get_misc_variables("damage_resistance_bonus", 3)
    return js_wrapper(
        [
            "constitution",
            "level",
            "challenge_rating",
            "damage_resistance_bonus_armor",
            *misc,
        ],
        f"""
            var resistance_from_level = {{
                0:    0 ,
                1:    2 ,
                2:    3 ,
                3:    3 ,
                4:    3 ,
                5:    4 ,
                6:    4 ,
                7:    5 ,
                8:    6 ,
                9:    7 ,
                10:   8 ,
                11:   9 ,
                12:   10,
                13:   11,
                14:   12,
                15:   14,
                16:   15,
                17:   17,
                18:   19,
                19:   22,
                20:   25,
                21:   28,
                22:   32,
                23:   36,
                24:   40,
                25:   44,
                26:   48,
                27:   52,
                28:   56,
                29:   60,
                30:   64,
            }}[level] || 0;
            if (challenge_rating > 0) {{
                resistance_from_level *= 2;
            }}
            var cr_multiplier = {{
                0: 1,
                0.5: 0,
                1: 0,
                2: 1,
                3: 2,
                4: 4,
            }}[challenge_rating || 0];
            const damage_resistance = (resistance_from_level + Math.floor(constitution / 2) + damage_resistance_bonus_armor + {sum_variables(misc)}) * cr_multiplier;
            setAttrs({{
                damage_resistance,
                damage_resistance_from_level: resistance_from_level,
                damage_resistance_max: damage_resistance,
                damage_resistance_maximum: damage_resistance,
            }});
        """,
    )


def skill_points_spent():
    skill_names = [
        skill_name for skills in ATTRIBUTE_SKILLS.values() for skill_name in skills
    ]
    skill_names = [skill_name.lower().replace(" ", "_") for skill_name in skill_names]
    skill_points_names = [f"{skill_name}_points" for skill_name in skill_names]

    return js_wrapper(
        skill_points_names,
        f"""
            var skill_points_spent = {' + '.join(skill_points_names)};

            setAttrs({{
                skill_points_spent,
            }});
        """,
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
        [],
        boolean_variables=[
            # conditional debuffs
            "surrounded",
            "flying",
            "flying_poorly",
            "prone",
            "squeezing",
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
            "underwater",
            # rank 3 debuffs
            "decelerated",
            "confused",
            "blinded",
            "disoriented",
            "immobilized",
            "panicked",
            # rank 4 debuffs
            "asleep",
            "helpless",
            "paralyzed",
            # other calculations
            "dexterity_starting",
        ],
        function_body=f"""
            let accuracy = 0;
            let armor = 0;
            let fortitude = 0;
            let mental = 0;
            let reflex = 0;

            // circumstantial effects
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
            if (dazzled) {{
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
                armor -= 2;
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
                armor -= 4;
                reflex -= 4;
            }}
            if (panicked) {{
                mental -= 4;
            }}
            if (asleep || helpless || paralyzed) {{
                armor -= (10 + dexterity_starting);
                reflex -= (10 + dexterity_starting);
            }}

            setAttrs({{
                accuracy_debuff_modifier: accuracy,
                armor_debuff_modifier: armor,
                fortitude_debuff_modifier: fortitude,
                mental_debuff_modifier: mental,
                reflex_debuff_modifier: reflex,
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
        ["level", "vital_wound_count", *misc],
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
        on("change:repeating_vitalwounds remove:repeating_vitalwounds", function(eventInfo) {
            getSectionIDs("repeating_vitalwounds", (repeatingSectionIds) => {
                setAttrs({
                    vital_wound_count: repeatingSectionIds.length,
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
