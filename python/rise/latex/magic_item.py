from logging import getLogger, WARNING
from rise.latex.util import join
from rise.statistics.rise_data import consumable_item_prices, item_prices
from rise.latex.tags import glosstermify, is_valid_tag

logger = getLogger(__name__)


class MagicItem(object):
    @classmethod
    def automatic_materials(cls, material_type):
        return {
            "Alchemical": ["alchemy"],
            "Amulet": ["jewelry"],
            "Belt": ["leather", "textiles"],
            "Body armor": ["bone", "leather", "metal"],
            "Boots": ["bone", "leather", "metal"],
            "Bracers": ["bone", "leather", "metal", "wood"],
            "Circlet": ["bone", "metal"],
            "Cloak": ["textiles"],
            "Crown": ["bone", "metal"],
            "Gauntlet": ["bone", "metal", "wood"],
            "Glasses": ["ceramics"],
            "Glove": ["leather"],
            "Gloves": ["leather"],
            "Fabric": ["textiles"],
            "Mask": ["textiles"],
            "Potion": ["alchemy"],
            "Poison": ["poison"],
            "Ring": ["bone", "jewelry", "metal", "wood"],
            "Shield": ["bone", "metal", "wood"],
            "Staff": ["bone", "wood"],
            "Wand": ["bone", "wood"],
            "Weapon": ["as weapon"],
        }[material_type]

    def __init__(
        self,
        description,
        rank,
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
        self.rank = rank
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

        if self.short_description.endswith("."):
                logger.log(WARNING, f"Magic item {self.name} ends its short description with a period")

        if "glossterm" in self.short_description:
                logger.log(WARNING, f"Magic item {self.name} includes a glossterm in its short description")

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
            ", ".join([glosstermify(tag) for tag in sorted(self.tags)])
            if self.tags
            else ""
        )

    def price(self):
        if self.consumable:
            return consumable_item_prices[self.rank]
        else:
            return item_prices[self.rank]

    def latex_table_row(self, include_type=True):
        material_type = ("Body" if self.material_type == "Body armor" else self.material_type) or ''
        # \\tb<Name> & \\tb<Item Rank (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        type_text = f" & {material_type}" if include_type else ""
        return f"\\itemref<{self.name}> & {self.rank} ({self.price()} gp) {type_text} & {self.short_description} & \\itempref<{self.name}> \\\\"

    def tag_text(self):
        return f"{self.latex_tags()}" if self.tags else ""

    def latex(self):
        materials_text = (
            ""
            if self.materials == "none"
            else ', '.join(sorted(self.materials))
        )
        type_text = (
            f"({materials_text})".capitalize()
            if self.material_type is None
            else f"{self.material_type} ({materials_text})"
        )
        rank_text = f"Rank~{self.rank} ({self.price()} gp)"
        tag_header_middle = '[' + self.tag_text() + ']' if self.tag_text() else ''
        return join(
            f"""
                \\itemsection<{self.name}>
                \\vspace<-0.5em>
                \\itemheader<{type_text}>{tag_header_middle}<{rank_text}>
                {self.description}
            """,
            self.latex_ability(),
        )
