def active_ability(
        name,
        accuracy=None,
        defense=None,
        effect=None,
        hit=None,
        targeting=None,
):
    return f"""
        \\pari \\spelltwocol<\\textbf<{name}> {accuracy_text(accuracy, defense)}><{targeting if targeting else ""}>
        {f'''
        |par {effect}
        ''' if effect else ""}
        {f'''
        |par |textit<Hit>: {hit}
        ''' if hit else ""}
    """


def accuracy_text(accuracy, defense):
    return f"{'+' if accuracy > 0 else ''}{accuracy} vs {defense}" if accuracy else ""
