from logging import getLogger
import rise.latex.rise_data as rise_data
from rise.latex.util import join
from rise.latex.subspell import Subspell
logger = getLogger(__name__)

class Spell(object):
    def __init__(
            self,
            targeting,
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
        self.targeting = targeting

        # This may need to be an argument later
        self.ability_type = 'ritual' if self.base_level is not None else 'spell'

        # Add default subspell
        if self.ability_type == 'spell':
            subspells.append(Subspell(
                level=6,
                name='Innate',
                description='You can cast the spell without spending an action point.',
            ))

        for arg in ['cantrip', 'effects', 'lists', 'name', 'schools', 'targeting']:
            if getattr(self, arg) is None:
                logger.warning(f"Warning: {self} is missing required property '{arg}'")

        for school in self.schools:
            if school not in rise_data.schools:
                logger.warning(f"{self} has unrecognized school '{school}'")

        if self.category is None:
            logger.warning(f"{self} has no category")
        elif self.category not in rise_data.categories:
            logger.warning(f"{self} has unrecognized category '{self.category}'")

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

        return join(
            f"""
                \\begin<spellsection><{self.name}>{base_level_text}
                    {str(self.header or "")}
                    \\begin<spellcontent>
                        {str(self.targeting)}
                        {str(self.effects)}
                    \\end<spellcontent>
                    \\begin<spellfooter>
                        \\spellinfo<{', '.join(self.schools)}><{', '.join(self.lists)}>
            """,
            f"""
                            \\spellnotes {self.notes}
            """ if self.notes else None,
            f"""
                    \\end<spellfooter>
                    \\begin<spellsubcontent>
            """,
            f"""
                        \\begin<spellcantrip>
                            {self.cantrip}
                        \\end<spellcantrip>
            """ if self.cantrip else None,
            f"""
                    \\end<spellsubcontent>
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
