from rise.latex.tags import is_valid_tag, to_latex_tags
from logging import getLogger, WARNING
logger = getLogger(__name__)

class Maneuver(object):
    def __init__(
            self,
            effect_text,
            name,
            lists,
            rank_upgrades,
            short_description,
            tags,
            extra_text=None,
    ):
        self.effect_text = effect_text
        self.name = name
        self.lists = lists
        self.rank_upgrades = rank_upgrades
        self.short_description = short_description
        self.tags = tags

        self.extra_text = extra_text

        if list(sorted(self.rank_upgrades.keys())) != ['3', '5', '7']:
            logger.log(WARNING, f"Maneuver {self.name} has invalid rank upgrades {self.rank_upgrades}")

        for tag in self.tags:
            if not is_valid_tag(tag):
                logger.log(WARNING, f"Maneuver {self.name} has invalid tag {tag}")

    def to_latex(self):
        tag_text = to_latex_tags(self.tags)
        ability_type = 'attuneability' if 'Attune' in tag_text else 'freeability'

        return f"""
            \\lowercase<\\hypertarget<maneuver:{self.name}><>>\\label<maneuver:{self.name}>
            \\hypertarget<maneuver:{self.name}><>
            \\begin<{ability_type}><{self.name}>{tag_text}
                {self.effect_text.strip()}

                \\rankline
                \\rank<4> {self.rank_upgrades['3'].strip()}
                \\rank<6> {self.rank_upgrades['5'].strip()}
                \\rank<8> {self.rank_upgrades['7'].strip()}
                \\parhead<Lists> {', '.join(sorted(self.lists))}
            \\end<{ability_type}>
            \\vspace<0.25em>
            {self.extra_text.strip() if self.extra_text else ""}
        """
