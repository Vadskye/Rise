from logging import getLogger, WARNING
from rise.latex.util import join
from rise.statistics.rise_data import consumable_item_prices, item_prices
from rise.latex.tags import glosstermify, is_valid_tag

logger = getLogger(__name__)

class Upgrade(object):
    def __init__(
            self,
            description,
            rank,
            short_description=None,
    ):
        self.description = description
        self.rank = rank
        self.short_description = short_description


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
        upgrades=None,
    ):
        self.consumable = consumable
        self.description = description
        self.rank = rank
        self.name = name
        self.tags = tags
        self.short_description = short_description
        self.material_type = material_type
        self.upgrades = upgrades

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

    def upgrades_text(self):
        if self.upgrades is None:
            return None
        return "\n".join([
            f"\\rank<{u.rank}> {u.description}"
            for u in self.upgrades
        ])

    def latex_tags(self):
        return (
            ", ".join([glosstermify(tag) for tag in sorted(self.tags)])
            if self.tags
            else ""
        )

    def latex_table_rows(self, include_type=True):
        rows = [self.latex_table_row(self.rank, self.short_description, include_type)]
        if self.upgrades is not None:
            for i, u in enumerate(self.upgrades):
                rows.append(self.latex_table_row(u.rank, u.short_description or self.short_description, include_type, i+1))
        return rows

    def latex_table_row(self, rank, short_description, include_type, upgrade_tier=0):
        material_type = self.material_type or ''
        if material_type == "Body armor":
            material_type = 'Body'
        # \\tb<Name> & \\tb<Item Rank (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        type_text = f" & {material_type}" if include_type else ""
        return f"\\itemref<{plus_suffix(self.name, upgrade_tier)}> & {rank_price_text(self, rank)} {type_text} & {short_description} & \\itempref<{self.name}> \\\\"

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
        rank_text = f"Rank~{rank_price_text(self, self.rank)}"
        tag_argument = '[' + self.tag_text() + ']' if self.tag_text() else ''
        return join(
            f"""
                \\itemsection<{self.name}>{tag_argument}
                \\vspace<-0.5em>
                \\spelltwocol<{type_text}><{rank_text}>
                {self.description}
            """,
            self.latex_ability(),
            self.upgrades_text(),
        )


def price(item, rank):
    if item.consumable:
        return consumable_item_prices[rank]
    else:
        return item_prices[rank]

def plus_suffix(name, upgrade_tier):
    return name + '+' * upgrade_tier

def rank_price_text(item, rank):
    return f"{rank} ({price(item, rank)} gp)"
