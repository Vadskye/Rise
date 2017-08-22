from logging import getLogger
import generation.rise_data as rise_data
from generation.util import join
logger = getLogger(__name__)

class Spell(object):
    def __init__(
            self,
            targeting,
            augments=None,
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
        self.augments = augments
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
        self.subspells = subspells
        self.targeting = targeting

        # This may need to be an argument later
        self.ability_type = 'ritual' if self.base_level is not None else 'spell'

        for arg in ['cantrip', 'effects', 'lists', 'name', 'schools', 'targeting']:
            if getattr(self, arg) is None:
                print(f"Warning: {self} is missing required property '{arg}'")

        if self.augments is None:
            self.augments = self.calculate_standard_augments()

        for school in self.schools:
            if school not in rise_data.schools:
                logger.warning(f"{self} has unrecognized school '{school}'")

        if self.category is None:
            logger.warning(f"{self} has no category")
        elif self.category not in rise_data.categories:
            logger.warning(f"{self} has unrecognized category '{self.category}'")

    def calculate_standard_augments(self):
        augments = []
        if self.ability_type == 'spell':
            augments += ['Quickened', 'Silent', 'Stilled']
        elif self.ability_type == 'ritual':
            augments += ['Accelerated']

        if self.targeting.rng is not None:
            augments.append('Extended')
        if self.targeting.area is not None:
            augments.append('Widened')
        if (
                self.ability_type == 'spell'
                and self.targeting.target is not None
                and self.targeting.area is None
                and (self.category and self.category[:4] != 'buff')
        ):
            augments.append('Mass')
        if (
                self.effects.attack
                and self.effects.attack.success
                and '\\spelldamage' in self.effects.attack.success
        ):
            augments.append('Intensified')
        return sorted(augments)

    def to_latex(self):
        # Sort by level as primary, name as secondary
        sorted_subspells = sorted(
            sorted(
                self.subspells,
                key=lambda augment: augment.name
            ),
            key=lambda augment: augment.level
        ) if self.subspells else None
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
                        \\fieldhead<Augments> {', '.join(sorted(self.augments))}
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
