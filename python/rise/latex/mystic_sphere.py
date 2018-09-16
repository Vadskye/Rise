from logging import getLogger
import rise.latex.rise_data as rise_data
from rise.latex.util import join
logger = getLogger(__name__)

class MysticSphere(object):
    def __init__(
            self,
            cantrip=None,
            category=None,
            effects=None,
            extra_table=None,
            header=None,
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
        self.effects = effects
        self.extra_table = extra_table
        self.header = header
        self.name = name
        self.lists = lists
        self.notes = notes
        self.rituals = rituals or []
        self.schools = schools
        self.short_description = short_description or 'TODO'
        self.spells = spells or []

        for arg in ['effects', 'lists', 'name', 'schools']:
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

        cantrip_text = f"""
            \\parhead<Cantrip> {self.cantrip} If you cast this spell as a cantrip,
                you do not need to spend an \\glossterm<action point> to cast it,
                but you cannot apply any augments to it.
        """ if self.cantrip else ""

        return join(
            f"""
                \\begin<spellsection><{self.name}>
                    {self.header or ""}
                    {self.effects}

                    {cantrip_text}

                    \\parhead<Schools> {', '.join(self.schools)}

                    \\parhead<Mystic Sphere Lists> {', '.join(self.lists)}
                \\end<spellsection>
            """,
            f"""
                \\subsubsection<{"Spells"}>
            """ if self.spells else None,
            '\n'.join([
                str(spell)
                for spell in sorted_spells
            ]) if self.spells else None,
            f"""
                \\subsubsection<{"Rituals"}>
            """ if self.rituals else None,
            '\n'.join([
                str(ritual)
                for ritual in sorted_rituals
            ]) if self.rituals else None,
            self.extra_table if self.extra_table else None,
        )

    def __repr__(self):
        return f"Spell({self.name})"
