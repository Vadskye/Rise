from sheet_data import ATTRIBUTES, ATTRIBUTE_SKILLS

def generate_script():
    return "\n".join([
        '<script type="text/worker">',
        *[attribute_change(a.lower()) for a in ATTRIBUTES],
        *[attribute_skills(a.lower()) for a in ATTRIBUTE_SKILLS],
        '</script>',
        ""
    ])


def attribute_change(a):
    return f"""
        on("sheet:opened change:{a}_starting change:{a}_misc change:level", function(eventInfo) {{
            getAttrs(["{a}_starting", "{a}_misc", "level"], function(v) {{
                var starting = Number(v.{a}_starting);
                var scaling = 0;
                if (starting === 1) {{
                    scaling = Math.floor(v.level / 2);
                }} else if ({a}Starting > 1) {{
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
            on("sheet:opened change:level change:{s}_points change:{s}_misc", function(eventInfo) {{
                getAttrs(["level", "{s}_points", "{s}_misc"], function(v) {{
                    var level = Number(v.level);
                    var pointsModifier = 0;
                    var ranks = 0;

                    if (Number(v.{s}_points) === 1) {{
                        ranks = Math.floor(level / 2);
                        pointsModifier = 2;
                    }} else if (Number(v.{s}_points) >= 2) {{
                        ranks = level
                        pointsModifier = 4;
                    }}

                    setAttrs({{
                        {s}: ranks + pointsModifier + Number(v.{s}_misc),
                        {s}_ranks: ranks,
                    }});
                }});
            }});
        """
    else:
        return f"""
            on("sheet:opened change:level change:{a} change:{s}_points change:{s}_misc", function(eventInfo) {{
                getAttrs(["level", "{a}", "{s}_points", "{s}_misc"], function(v) {{
                    var level = Number(v.level);
                    var pointsModifier = 0;
                    var ranks = 0;

                    if (Number(v.{s}_points) === 1) {{
                        ranks = Math.floor(level / 2);
                        pointsModifier = 2;
                    }} else if (Number(v.{s}_points) >= 2) {{
                        ranks = level
                        pointsModifier = 4;
                    }}

                    var scaling = Math.max(ranks, Number(v.{a}));

                    setAttrs({{
                        {s}: scaling + pointsModifier + Number(v.{s}_misc),
                        {s}_ranks: ranks,
                    }});
                }});
            }});
        """
