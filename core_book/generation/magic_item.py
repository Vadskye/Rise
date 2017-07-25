from generation.util import join

class MagicItem(object):
    def __init__(
            self,
            effect,
            level,
            materials,
            name,
            tags,
            armor_type=None,
    ):
        self.effect = effect
        self.level = level
        self.materials = materials
        self.name = name
        self.tags = tags
        self.armor_type = armor_type

    def latex_tags(self):
        return ', '.join([f"\\glossterm<{tag}>" for tag in sorted(self.tags)])

    def latex(self):
        return join(
            f"""
                \\begin<multicols><2>
                    \\lowercase<\\hypertarget<item:{self.name}><>>\\label<item:{self.name}>
                    \\hypertarget<item:{self.name}><\\subsection<{self.name}>>
                    \\columnbreak%
                    \\begin<flushright>
                        \\large\\textbf<\\nth<{self.level}> Level>
                    \\end<flushright>
                \\end<multicols>
                \\vspace<-1.5em>  % Correct weird spacing from multicols
                {self.effect}
                \\parhead*<Tags> {self.latex_tags()}
                \\parhead*<Materials> {', '.join(sorted(self.materials))}
            """,
            """
                \\parhead*<Armor Type> {self.armor_type}
            """ if self.armor_type else None,
        )
