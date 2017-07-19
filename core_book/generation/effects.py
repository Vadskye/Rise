from generation.util import join

duration_mapping = {
    'attune': 'Attunement',
    'attunement': 'Attunement',
    'Attunement': 'Attunement',
    'condition': 'Condition',
    'sustain (swift)': 'Sustain (swift)',
}

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
            """, f"""
                    \\spelldur {duration_mapping[self.duration]}
            """ if self.duration else None, f"""
                \\spelltags<{tag_text}>
            """ if self.tags else None, f"""
                \\end<spelleffects>
            """
        )
