from generation.util import join

class Monster(object):
    def __init__(
            self,
            name,
            level,
            cr=1,
            name_suffix=None,
    ):
        self.cr = cr
        self.level = level
        self.name = name
        self.name_suffix = name_suffix

    def to_latex(self):
        name_suffix_text = f"[{self.name_suffix}]" if self.name_suffix else ""
        return join(
            f"""
                \\begin<monsection>{name_suffix_text}<{self.name}>{self.level}[{self.cr}]
                    \\begin<spellcontent>
                        \\begin<spelltargetinginfo>
                            \\spelltwocol<\\textbf<HP> 50; \\textbf<Bloodied> 25><\\textbf<AP> 2>
                            \\pari \\textbf<Armor> 12; \\textbf<Fort> 15; \\textbf<Ref> 12; \\textbf<Ment> 8
                            \\pari \\textbf<Strike> Bite +7 (2d8) or claw +7 (2d6)
                            \\pari \\textbf<Immune> staggered
                        \\end<spelltargetinginfo>
                        \\begin<spelleffects>
                            \\pari \\spelltwocol<\\textbf<Rend>: +6 vs Armor><Up to 3 melee targets>
                            \\par Hit: The target takes damage from a claw strike.
                        \\end<spelleffects>
                    \\end<spellcontent>
                    \\begin<spellfooter>
                        \\pari \\textbf<Awareness> +6
                        \\pari \\textbf<Speed> 30 ft.; \\textbf<Space> 5 ft.; \\textbf<Reach> 5 ft.
                    \\end<spellfooter>
                \\end<monsection>
            """
        )

    def __repr__(self):
        return f"Monster({self.name})"
