from rise.latex.util import join

class Effects(object):
    def __init__(
            self,
            attack=None,
            effect=None,
            special=None,
            tags=None,
    ):
        self.attack = attack
        self.effect = effect
        self.special = special
        self.tags = tags

    def __str__(self):
        tag_text = ', '.join([
            f"\\glossterm<{tag}>"
            for tag in sorted(self.tags)
        ]) if self.tags else ""

        return join(
            f"""
                \\begin<spelleffects>
                    {f"|spellspecial {self.special}" if self.special else ""}
            """, f"""
                    \\spelleffect {self.effect}
            """ if self.effect else None, f"""
                    {self.attack if self.attack else ""}
            """,
            f"""
                \\spelltags<{tag_text}>
            """ if self.tags else None, f"""
                \\end<spelleffects>
            """
        )
