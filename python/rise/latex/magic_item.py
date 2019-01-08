from rise.latex.util import join
from rise.statistics.rise_data import item_prices

class MagicItem(object):

    @classmethod
    def automatic_materials(cls, material_type):
        return {
            'amulet': ['jewelry'],
            'belt': ['leather', 'textiles'],
            'body armor': ['bone', 'metal'],
            'boot': ['bone', 'leather', 'metal'],
            'bracer': ['bone', 'leather', 'metal', 'wood'],
            'circlet': ['bone', 'metal'],
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
            effects=None,
            material_type=None,
            materials=None,
            tags=None,
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
        return ', '.join([f"\\glossterm<{tag}>" for tag in sorted(self.tags)]) if self.tags else ""

    def price(self):
        return item_prices[self.level]

    def latex_table_row(self):
        return f"{self.name} & \\nth<{self.level}> & {self.price()} gp & {self.short_description} & \\pageref<item:{self.name}> \\\\"

    def latex(self):
        return join(
            f"""
                \\lowercase<\\hypertarget<item:{self.name}><>>\\label<item:{self.name}>
                \\hypertarget<item:{self.name}><\\subsubsection<{self.name}\\hfill\\nth<{self.level}> ({self.price()} gp)>>
                {self.description}
            """,
            self.latex_ability(),
            f"""
                \\parhead*<Tags> {self.latex_tags()}
            """ if self.tags else "",
            f"""
                \\parhead*<Materials> {', '.join(sorted(self.materials)).capitalize()}
            """,
        )
