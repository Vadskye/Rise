from sheet_data import ATTRIBUTES

def generate_script():
    return "\n".join([
        '<script type="text/worker">',
        *[attribute_change(a.lower()) for a in ATTRIBUTES],
        '</script>',
        ""
    ])


def attribute_change(a):
    return f"""
        on("sheet:opened change:{a}_starting change:{a}_misc change:level", function(eventInfo) {{
            getAttrs(["{a}_starting", "{a}_misc", "level"], function(v) {{
                var {a}Starting = Number(v.{a}_starting);
                var {a}Scaling = 0;
                if ({a}Starting === 1) {{
                    {a}Scaling = Math.floor(v.level / 2);
                }} else if ({a}Starting > 1) {{
                    {a}Scaling = Number(v.level) - 1;
                }}
                setAttrs({{
                    {a}: {a}Starting + {a}Scaling + Number(v.{a}_misc),
                    {a}_scaling: {a}Scaling,
                }});
            }});
        }});
    """
