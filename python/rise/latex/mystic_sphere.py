from logging import getLogger
import rise.statistics.rise_data as rise_data
from rise.latex.header import Header
from rise.latex.util import join
logger = getLogger(__name__)

class MysticSphere(object):
    def __init__(
            self,
            cantrip=None,
            category=None,
            extra_table=None,
            lists=None,
            name=None,
            schools=None,
            rituals=None,
            spells=None,
            notes=None,
            short_description=None,
    ):
        self.cantrip = cantrip
        self.category = category
        self.extra_table = extra_table
        self.name = name
        self.lists = lists
        self.notes = notes
        self.rituals = rituals or []
        self.schools = schools
        self.short_description = short_description or 'TODO'
        self.spells = spells or []

        for arg in ['cantrip', 'lists', 'name', 'schools']:
            if getattr(self, arg) is None:
                logger.warning(f"Warning: {self} is missing required property '{arg}'")

        for school in self.schools:
            if school not in rise_data.schools:
                logger.warning(f"{self} has unrecognized school '{school}'")

    def to_latex(self):
        # Sort by level as primary, name as secondary
        sorted_spells = sorted(
            sorted(
                self.spells,
                key=lambda augment: augment.name
            ),
            key=lambda augment: augment.level
        )
        sorted_rituals = sorted(
            sorted(
                self.rituals,
                key=lambda augment: augment.name
            ),
            key=lambda augment: augment.level
        )

        return join(
            f"""
                \\begin<spellsection><{self.name}>
                    {Header(self.short_description + '.')}

                    \\parhead<Schools> {', '.join(self.schools)}

                    \\parhead<Mystic Sphere Lists> {', '.join(self.lists)}

                    \\subsubsection<Cantrip>

                    {self.cantrip}
                \\end<spellsection>
            """,
            f"""
                \\subsubsection<Spells>
            """ if self.spells else None,
            '\n'.join([
                str(spell)
                for spell in sorted_spells
            ]) if self.spells else None,
            f"""
                \\subsubsection<Rituals>
            """ if self.rituals else None,
            '\n'.join([
                str(ritual)
                for ritual in sorted_rituals
            ]) if self.rituals else None,
            self.extra_table if self.extra_table else None,
        )

    def __repr__(self):
        return f"Spell({self.name})"
