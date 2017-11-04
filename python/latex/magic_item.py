from latex.util import join

class MagicItem(object):

    @classmethod
    def automatic_materials(cls, material_type):
        return {
            'amulet': ['jewelry'],
            'belt': ['leather', 'textiles'],
            'body armor': ['bone', 'metal'],
            'boot': ['bone', 'leather', 'metal'],
            'bracer': ['bone', 'leather', 'metal', 'wood'],
            'cloak': ['textiles'],
            'crown': ['bone', 'metal'],
            'gauntlet': ['bone', 'metal', 'wood'],
            'glove': ['leather'],
            'mask': ['textiles'],
            'ring': ['bone', 'jewelry', 'metal', 'wood'],
            'shield': ['bone', 'metal', 'wood'],
            'staff': ['bone', 'wood'],
            'wand': ['bone', 'wood'],
            'weapon': ['as weapon'],
        }[material_type]

    def __init__(
            self,
            description,
            level,
            name,
            short_description,
            tags,
            effects=None,
            material_type=None,
            materials=None,
            targeting=None,
    ):
        self.description = description
        self.level = level
        self.name = name
        self.tags = tags
        self.short_description = short_description

        self.effects = effects
        try:
            self.materials = materials or MagicItem.automatic_materials(material_type)
        except KeyError:
            raise Exception(f"Item '{self.name}' has unknown material_type {material_type}")
        self.targeting = targeting

    def latex_ability(self):
        if self.effects or self.targeting:
            return f"""
                \\begin<spellcontent>
                    {self.targeting or ""}
                    {self.effects or ""}
                \\end<spellcontent>
            """
        else:
            return None

    def latex_tags(self):
        return ', '.join([f"\\glossterm<{tag}>" for tag in sorted(self.tags)])

    def latex(self):
        return join(
            f"""
                \\lowercase<\\hypertarget<item:{self.name}><>>\\label<item:{self.name}>
                \\hypertarget<item:{self.name}><\\subsubsection<{self.name}\\hfill\\nth<{self.level}>>>
                {self.description}
            """,
            self.latex_ability(),
            f"""
                \\parhead*<Tags> {self.latex_tags()}
                \\parhead*<Materials> {', '.join(sorted(self.materials)).capitalize()}
            """,
        )
