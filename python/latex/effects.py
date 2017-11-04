from generation.util import join

valid_durations = set([
    'Attunement',
    'Attunement (multiple)',
    'Attunement (multiple); see text',
    'Attunement (shared)',
    'Condition',
    'Sustain (minor)',
    'Sustain (standard)',
    'Sustain (standard); maximum 5 rounds',
    'Permanent',
    'While item is attuned',
])

class Effects(object):
    def __init__(
            self,
            attack=None,
            duration=None,
            effect=None,
            special=None,
            tags=None,
    ):
        self.attack = attack
        self.effect = effect
        self.duration = duration
        self.special = special
        self.tags = tags

        if self.duration and self.duration not in valid_durations:
            raise Exception(f"Duration '{self.duration}' not recognized")

    def __str__(self):
        tag_text = ', '.join([
            f"\\glossterm<{tag}>"
            for tag in sorted(self.tags)
        ]) if self.tags else ""

        return join(
            f"""
                \\begin<spelleffects>
            """, f"""
                    \\spellspecial {self.special}
            """ if self.special else None, f"""
            """, f"""
                    \\spelleffect {self.effect}
            """ if self.effect else None, f"""
                    {self.attack if self.attack else ""}
            """,
            f"""
                    \\spelldur {self.duration}
            """ if self.duration else None,
            f"""
                \\spelltags<{tag_text}>
            """ if self.tags else None, f"""
                \\end<spelleffects>
            """
        )
