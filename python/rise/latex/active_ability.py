def active_ability(
        name,
        accuracy=None,
        critical=None,
        defense=None,
        effect=None,
        hit=None,
        targeting=None,
):
    return f"""
        \\pari
        {
            f'''
            |spelltwocol<|textbf<{name}>: {accuracy_text(accuracy, defense)}><{targeting if targeting else ""}>
                |par
            '''
            if accuracy or targeting
            else f"|textbf<{name}>:"
        }
        {effect if effect else ""}
        {f"|par |textit<Hit>: {hit}" if hit else ""}
        {f"|par |textit<Critical>: {critical}" if critical else ""}
    """


def accuracy_text(accuracy, defense):
    return f"{'+' if accuracy > 0 else ''}{accuracy} vs {defense}" if accuracy else ""
