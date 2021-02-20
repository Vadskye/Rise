from logging import getLogger
import rise.statistics.rise_data as rise_data
from rise.latex.header import Header
from rise.latex.util import join

logger = getLogger(__name__)


class MysticSphere(object):
    def __init__(
        self,
        cantrips=None,
        category=None,
        extra_table=None,
        lists=None,
        name=None,
        rituals=None,
        spells=None,
        notes=None,
        short_description=None,
    ):
        self.cantrips = cantrips
        self.category = category
        self.extra_table = extra_table
        self.name = name
        self.lists = lists
        self.notes = notes
        self.rituals = rituals or []
        self.short_description = short_description or "TODO"
        self.spells = spells or []

        for arg in ["cantrips", "lists", "name"]:
            if getattr(self, arg) is None:
                logger.warning(f"Warning: {self} is missing required property '{arg}'")

    def cantrip_latex(self):
        return "\n".join([str(c) for c in self.cantrips])

    def to_latex(self):
        # Sort by level as primary, name as secondary
        sorted_spells = sorted(
            sorted(self.spells, key=lambda augment: augment.name),
            key=lambda augment: augment.level,
        )
        sorted_rituals = sorted(
            sorted(self.rituals, key=lambda augment: augment.name),
            key=lambda augment: augment.level,
        )

        return join(
            f"""
                \\begin<spellsection><{self.name}>
                    {Header(self.short_description + '.')}

                    \\parhead<Mystic Sphere Lists> {', '.join(self.lists)}

                    \\subsubsection<Cantrips>

                    {self.cantrip_latex()}
                \\end<spellsection>
            """,
            f"""
                \\subsubsection<Spells>
            """
            if self.spells
            else None,
            "\n".join([str(spell) for spell in sorted_spells]) if self.spells else None,
            f"""
                \\subsubsection<Rituals>
            """
            if self.rituals
            else None,
            "\n".join([str(ritual) for ritual in sorted_rituals])
            if self.rituals
            else None,
            self.extra_table if self.extra_table else None,
        )

    def __repr__(self):
        return f"Spell({self.name})"
