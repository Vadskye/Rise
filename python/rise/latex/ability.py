from rise.latex.tags import glosstermify


def active_ability(
    name,
    effect,
    tags=None,
    ap_cost=False,
):
    tag_text = (
        ("[" + ", ".join([glosstermify(tag) for tag in sorted(tags)]) + "]")
        if tags
        else ""
    )

    ability_type = "attuneability" if "Attune" in tag_text else "freeability"

    return f"""
        \\begin<{ability_type}><{name}>{tag_text}
            {effect.strip()}
        \\end<{ability_type}>
    """


def passive_ability(
    name,
    effect,
):
    return f"\\parhead<{name}> {effect}"
