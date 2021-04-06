from logging import getLogger, WARNING
from rise.latex.util import join
from rise.statistics.rise_data import consumable_item_prices, item_prices
from rise.latex.tags import is_valid_tag

logger = getLogger(__name__)


class MagicItem(object):
    @classmethod
    def automatic_materials(cls, material_type):
        return {
            "Alchemy": ["alchemy"],
            "Amulet": ["jewelry"],
            "Belt": ["leather", "textiles"],
            "Body armor": ["bone", "leather", "metal"],
            "Boots": ["bone", "leather", "metal"],
            "Bracers": ["bone", "leather", "metal", "wood"],
            "Circlet": ["bone", "metal"],
            "Cloak": ["textiles"],
            "Crown": ["bone", "metal"],
            "Gauntlet": ["bone", "metal", "wood"],
            "Glove": ["leather"],
            "Gloves": ["leather"],
            "Fabric": ["textiles"],
            "Mask": ["textiles"],
            "Potion": ["alchemy"],
            "Ring": ["bone", "jewelry", "metal", "wood"],
            "Shield": ["bone", "metal", "wood"],
            "Staff": ["bone", "wood"],
            "Wand": ["bone", "wood"],
            "Weapon": ["as weapon"],
        }[material_type]

    def __init__(
        self,
        description,
        level,
        name,
        short_description,
        consumable=False,
        effects=None,
        material_type=None,
        materials=None,
        tags=None,
        targeting=None,
    ):
        self.consumable = consumable
        self.description = description
        self.level = level
        self.name = name
        self.tags = tags
        self.short_description = short_description
        self.material_type = material_type

        self.effects = effects
        try:
            self.materials = materials or MagicItem.automatic_materials(material_type)
        except KeyError:
            raise Exception(
                f"Item '{self.name}' has unknown material_type {material_type}"
            )
        self.targeting = targeting

        if self.tags:
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Magic item {self.name} has invalid tag {tag}")

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
        return (
            ", ".join([f"\\abilitytag<{tag}>" for tag in sorted(self.tags)])
            if self.tags
            else ""
        )

    def price(self):
        if self.consumable:
            return consumable_item_prices[self.level]
        else:
            return item_prices[self.level]

    def nth_text(self):
        if self.level == 0.5:
            return "1/2"
        else:
            return f"\\nth<{self.level}>"

    def latex_table_row(self):
        return f"{self.name} & {self.nth_text()} & {self.price()} gp & {self.short_description} & \\pageref<item:{self.name}> \\\\"

    def tag_text(self):
        return f"\\parhead*<Tags> {self.latex_tags()}" if self.tags else ""

    def latex(self):
        level_text = f"\\nth<{self.level}>" if self.level >= 1 else "1/2"
        return join(
            f"""
                \\lowercase<\\hypertarget<item:{self.name}><>>\\label<item:{self.name}>
                \\hypertarget<item:{self.name}><\\subsubsection<{self.name}\\hfill{level_text} ({self.price()} gp)>>
                {self.description}
            """,
            self.latex_ability(),
            f"""
                \\vspace<0.25em>
                \\spelltwocol<\\textbf<Type>: {self.material_type}><{self.tag_text()}>
                \\textbf<Materials>: {', '.join(sorted(self.materials)).capitalize()}
            """,
        )
