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
        legend_points(),
        wound_threshold(),
        skill_points(),
        '</script>',
        ""
    ])


def attribute_change(a):
    return f"""
        on("change:level change:{a}_starting change:{a}_misc", function(eventInfo) {{
            getAttrs(["{a}_starting", "{a}_misc", "level"], function(v) {{
                var starting = Number(v.{a}_starting);
                var scaling = 0;
                if (starting === 1) {{
                    scaling = Math.floor(v.level / 2);
                }} else if (starting > 1) {{
                    scaling = Number(v.level) - 1;
                }}
                setAttrs({{
                    {a}: starting + scaling + Number(v.{a}_misc),
                    {a}_scaling: scaling,
                }});
            }});
        }});
    """


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
    return f"""
        on("change:level change:perception", function(eventInfo) {{
            getAttrs(["level", "perception"], function(v) {{
                var cr_mod = Math.max(0, Number(v.challenge_rating || 1) - 1);
                setAttrs({{
                    base_accuracy: Math.max(Number(v.level), Number(v.perception)) + cr_mod,
                }});
            }});
        }});
    """


def action_points():
    return f"""
        on("change:level", function(eventInfo) {{
            getAttrs(["level"], function(v) {{
                var level = Number(v.level || 0);
                var action_points = 4 + Math.floor((level + 3) / 6);
                setAttrs({{
                    action_points_max: action_points,
                    action_points_total: action_points,
                }});
            }});
        }});
    """


def armor_defense():
    return f"""
        on("change:level change:dexterity_starting change:body_armor_defense_value change:shield_defense_value change:armor_defense_misc change:challenge_rating", function(eventInfo) {{
            getAttrs(["level", "dexterity_starting", "body_armor_defense_value", "shield_defense_value", "armor_defense_misc", "challenge_rating"], function(v) {{
                var cr_mod = Math.max(0, Number(v.challenge_rating || 1) - 1);
                var before_equipment = Number(v.level || 0) + Number(v.dexterity_starting || 0) + cr_mod;
                var total = before_equipment + Number(v.body_armor_defense_value || 0) + Number(v.shield_defense_value || 0) + Number(v.armor_defense_misc || 0);
                setAttrs({{
                    armor_defense: total,
                }});
            }});
        }});
    """

def damage_resistance():
    return f"""
        on("change:level change:damage_resistance_misc", function(eventInfo) {{
            getAttrs(["level", "damage_resistance_misc"], function(v) {{
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
                }}[Number(v.level || 0)]
                setAttrs({{
                    damage_resistance: damage_resistance + Number(v.damage_resistance_misc || 0),
                }});
            }});
        }});
    """

def wound_resistance():
    return f"""
        on("change:level change:wound_resistance_misc", function(eventInfo) {{
            getAttrs(["level", "wound_resistance_misc"], function(v) {{
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
                }}[Number(v.level || 0)]
                setAttrs({{
                    wound_resistance: wound_resistance + Number(v.wound_resistance_misc || 0),
                }});
            }});
        }});
    """


def fortitude():
    return f"""
        on("change:level change:strength change:constitution change:fortitude_class change:fortitude_misc change:challenge_rating", function(eventInfo) {{
            getAttrs(["level", "strength", "constitution", "constitution_starting", "fortitude_class", "fortitude_misc", "challenge_rating"], function(v) {{
                var cr_mod = Math.max(0, Number(v.challenge_rating || 1) - 1);
                var total = Number(v.level || 0) + Number(v.constitution_starting || 0) + Number(v.fortitude_class || 0) + Number(v.fortitude_misc || 0) + cr_mod;
                setAttrs({{
                    fortitude: total,
                }});
            }});
        }});
    """

def reflex():
    return f"""
        on("change:level change:dexterity change:perception change:shield_defense_value change:reflex_class change:reflex_misc change:challenge_rating", function(eventInfo) {{
            getAttrs(["level", "dexterity", "perception", "dexterity_starting", "reflex_class", "reflex_misc", "challenge_rating"], function(v) {{
                var cr_mod = Math.max(0, Number(v.challenge_rating || 1) - 1);
                var total = Number(v.level || 0) + Number(v.dexterity_starting || 0) + Number(v.reflex_class || 0) + Number(v.reflex_misc || 0) + cr_mod;
                setAttrs({{
                    reflex: total,
                }});
            }});
        }});
    """

def mental():
    return f"""
        on("change:level change:intelligence change:willpower change:mental_class change:mental_misc change:challenge_rating", function(eventInfo) {{
            getAttrs(["level", "intelligence", "willpower", "willpower_starting", "mental_class", "mental_misc", "challenge_rating"], function(v) {{
                var cr_mod = Math.max(0, Number(v.challenge_rating || 1) - 1);
                var total = Number(v.level || 0) + Number(v.willpower_starting || 0) + Number(v.mental_class || 0) + Number(v.mental_misc || 0) + cr_mod;
                setAttrs({{
                    mental: total,
                }});
            }});
        }});
    """

def encumbrance():
    return f"""
        on("change:level change:body_armor_encumbrance change:encumbrance_misc change:strength_starting", function(eventInfo) {{
            getAttrs(["body_armor_encumbrance", "encumbrance_misc", "strength_starting"], function(v) {{
                setAttrs({{
                    encumbrance: Math.max(
                        Number(v.body_armor_encumbrance || 0)
                        - Number(v.encumbrance_misc || 0)
                        - Number(v.strength_starting || 0)
                    , 0),
                }});
            }});
        }});
    """

def initiative():
    return f"""
        on("change:dexterity change:perception change:initiative_misc", function(eventInfo) {{
            getAttrs(["dexterity", "perception", "initiative_misc"], function(v) {{
                var scaling = Math.max(Number(v.dexterity || 0), Number(v.perception || 0));
                setAttrs({{
                    initiative: scaling + Number(v.initiative_misc || 0),
                    initiative_scaling: scaling,
                }});
            }});
        }});
    """

def base_speed():
    return f"""
        on("change:level change:speed_size change:speed_armor change:speed_misc", function(eventInfo) {{
            getAttrs(["speed_size", "speed_armor", "speed_misc"], function(v) {{
                setAttrs({{
                    base_speed: Number(v.speed_size || 0) - Number(v.speed_armor || 0) + Number(v.speed_misc || 0),
                }});
            }});
        }});
    """

def legend_points():
    return f"""
        on("change:level", function(eventInfo) {{
            getAttrs(["level"], function(v) {{
                setAttrs({{
                    legend_points: Number(v.level || 0) >= 5 ? 1 : 0,
                }});
            }});
        }});
    """

def wound_threshold():
    return f"""
        on("change:wound_threshold_misc change:level change:constitution_starting change:challenge_rating", function(eventInfo) {{
            getAttrs(["wound_threshold_misc", "level", "constitution_starting", "challenge_rating"], function(v) {{
                var from_level = (1 + Number(v.level || 0)) * (5 + Number(v.constitution_starting || 0))
                var wound_threshold = Number(v.wound_threshold_misc || 0) + from_level;
                setAttrs({{
                    wound_threshold_max: wound_threshold,
                    wound_threshold_total: wound_threshold,
                }});
            }});
        }});
    """

def skill_points():
    return f"""
        on("change:level change:intelligence_starting change:skill_points_misc", function(eventInfo) {{
            getAttrs(["intelligence_starting", "skill_points_misc"], function(v) {{
                setAttrs({{
                    skill_points: 8 + Number(v.intelligence_starting || 0) * 2 + Number(v.skill_points_misc || 0),
                }});
            }});
        }});
    """
