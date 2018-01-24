from rise.latex.tags import glosstermify

def active_ability(
        name,
        effect,
        tags=None,
):
    tag_text = (
        '[' + ', '.join([
            glosstermify(tag) for tag in sorted(tags)
        ]) + ']'
    ) if tags else ""

    return f"""
        \\begin<ability><{name}>{tag_text}
            {effect.strip()}
        \\end<ability>
    """

def passive_ability(
        name,
        effect,
):
    return f"\\parhead<{name}> {effect}"
