from logging import getLogger, WARNING
from rise.latex.util import join, longtablify
from rise.statistics.rise_data import consumable_item_prices, item_prices
from rise.latex.tags import glosstermify, is_valid_tag
from copy import deepcopy
import re

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
        is_magical,
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
        self.is_magical = is_magical
        self.material_type = material_type
        self.name = name
        self.rank = rank
        self.short_description = short_description
        self.tags = tags
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

    def upgrades_text(self):
        if self.upgrades is None:
            return None
        return "\n".join([
            f"\\upgraderank<{self.name + '+' * (upgrade_tier+1)}><{rank_price_text(self, u.rank)}> {u.description}"
            for upgrade_tier, u in enumerate(self.upgrades)
        ])

    def latex_tags(self):
        return (
            ", ".join([glosstermify(tag) for tag in sorted(self.tags)])
            if self.tags
            else ""
        )

    def unpack_upgrades(self):
        # We want repeatedly unpacking upgrades to be safe
        without_upgrades = deepcopy(self)
        without_upgrades.upgrades = None
        items = [without_upgrades]
        for upgrade_tier, upgrade in enumerate(self.upgrades or []):
            items.append(MagicItem(
                description="This description should never appear!",
                rank=upgrade.rank,
                name=self.name + '+' * (upgrade_tier+1),
                short_description=upgrade.short_description or self.short_description,
                is_magical=self.is_magical,
                consumable=self.consumable,
                material_type=self.material_type,
                materials=self.materials,
            ))
        return items


    def latex_table_rows(self, include_type=True):
        return [self.latex_table_row(self.rank, self.short_description, include_type)]

    def latex_table_row(self, rank, short_description, include_type):
        material_type = self.material_type or ''
        if material_type == "Body armor":
            material_type = 'Body'
        # \\tb<Name> & \\tb<Item Rank (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        type_text = f" & {material_type}" if include_type else ""
        magical_text = "\\sparkle" if self.is_magical else ""
        return f"""
            \\itemref<{self.name}>{magical_text}
            & {rank_price_text(self, rank)} {type_text}
            & {short_description}
            & \\itempref<{self.name}> \\\\
        """

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
        magical_text = "[\\sparkle]" if self.is_magical else ""
        return join(
            f"""
                \\itemsection{magical_text}<{self.name}>{tag_argument}
                \\vspace<-0.5em>
                \\spelltwocol<{type_text}><{rank_text}>
                {self.description}
            """,
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

first_cell_pattern = re.compile(r"&[^&]+&")
def sorted_table_rows(rows):
    # Outer sort: rank
    return sorted(
        # Inner sort: name
        sorted(rows),
        key=lambda r: (first_cell_pattern.search(r) or [])[0]
    )

def generate_table(items, caption, include_type, wrapper_text=None):
    including_upgrades = []
    for item in items:
        for possibly_upgrade in item.unpack_upgrades():
            including_upgrades.append(possibly_upgrade)
    sorted_items = sorted(
        sorted(including_upgrades, key=lambda item: item.name),
        key=lambda item: item.rank,
    )
    rows = []
    for item in sorted_items:
        rows += item.latex_table_rows(include_type)
    row_text = "\n".join(rows)
    type_text = r"& \tb<Type>" if include_type else ""
    return longtablify(
        f"""
            \\lcaption<{caption}> \\\\
            \\tb<Name> & \\tb<Rank (Cost)> {type_text} & \\tb<Description> & \\tb<Page> \\tableheaderrule
            {row_text}
        """,
        include_type=include_type,
        wrapper_text=wrapper_text,
    )
