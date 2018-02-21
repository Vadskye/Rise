from logging import getLogger
import rise.latex.rise_data as rise_data
from rise.latex.util import join
logger = getLogger(__name__)

class Spell(object):
    def __init__(
            self,
            base_level=None,
            cantrip=None,
            category=None,
            effects=None,
            extra_table=None,
            header=None,
            lists=None,
            name=None,
            schools=None,
            subspells=None,
            notes=None,
            short_description=None,
    ):
        self.base_level = base_level
        self.cantrip = cantrip
        self.category = category
        self.effects = effects
        self.extra_table = extra_table
        self.header = header
        self.name = name
        self.lists = lists
        self.notes = notes
        self.schools = schools
        self.short_description = short_description or 'TODO'
        self.subspells = subspells or []

        # This may need to be an argument later
        self.ability_type = 'spell' if self.base_level is None else 'ritual'

        for arg in ['effects', 'lists', 'name', 'schools']:
            if getattr(self, arg) is None:
                logger.warning(f"Warning: {self} is missing required property '{arg}'")

        if self.ability_type == 'spell' and getattr(self, 'cantrip') is None:
            logger.warning(f"Warning: {self} is missing required property 'cantrip'")

        for school in self.schools:
            if school not in rise_data.schools:
                logger.warning(f"{self} has unrecognized school '{school}'")

    def to_latex(self):
        # Sort by level as primary, name as secondary
        sorted_subspells = sorted(
            sorted(
                self.subspells,
                key=lambda augment: augment.name
            ),
            key=lambda augment: augment.level
        )
        base_level_text = f"[{self.base_level}]" if self.base_level else ""

        cantrip_text = f"""
            \\parhead<Cantrip> {self.cantrip} If you cast this spell as a cantrip,
                you do not need to spend an \\glossterm<action point> to cast it,
                but you cannot apply any augments to it.
        """ if self.cantrip else ""

        return join(
            f"""
                \\begin<spellsection><{self.name}>{base_level_text}
                    {self.header or ""}
                    {self.effects}

                    {cantrip_text}

                    \\parhead<Schools> {', '.join(self.schools)}

                    \\parhead<Spell Lists> {', '.join(self.lists)}
                \\end<spellsection>
            """,
            f"""
                \\subsubsection<{"Subspells" if self.ability_type == 'spell' else "Subrituals"}>
            """ if self.subspells else None,
            '\n'.join([
                str(subspell)
                for subspell in sorted_subspells
            ]) if self.subspells else None,
            self.extra_table if self.extra_table else None,
        )

    def __repr__(self):
        return f"Spell({self.name})"
