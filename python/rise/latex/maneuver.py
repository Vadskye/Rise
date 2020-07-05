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
            target,
            extra_text=None,
            rank=None,
    ):
        self.effect_text = effect_text
        self.name = name
        self.lists = lists
        self.rank = rank or 1
        self.rank_upgrades = rank_upgrades
        self.short_description = short_description
        self.tags = tags
        self.target = target

        self.extra_text = extra_text

        if self.rank < 7:
            lowest_rank_upgrade = int(sorted(self.rank_upgrades.keys())[0])
            if lowest_rank_upgrade != self.rank + 2:
                logger.log(WARNING, f"Maneuver {self.name} with rank {self.rank} has invalid rank upgrades {self.rank_upgrades}")

        for tag in self.tags:
            if not is_valid_tag(tag):
                logger.log(WARNING, f"Maneuver {self.name} has invalid tag {tag}")

    def to_latex(self):
        tag_text = to_latex_tags(self.tags)
        ability_type = 'attuneability' if 'Attune' in tag_text else 'apability' if 'AP' in self.tags else 'freeability'

        ranks = sorted(self.rank_upgrades.keys())
        rank_text = (
            '\\rankline\n' + '\n'.join([f"\\rank<{rank}> {self.rank_upgrades[rank].strip()}" for rank in ranks])
            if len(ranks) > 0
            else ''
        )

        target_tag = 'target' if self.target and self.target.startswith('One') else 'targets'
        target_text = f"\\{target_tag}<{self.target}>" if self.target else ''

        return f"""
            \\lowercase<\\hypertarget<maneuver:{self.name}><>>\\label<maneuver:{self.name}>
            \\hypertarget<maneuver:{self.name}><>
            \\begin<{ability_type}>[Rank {self.rank}]<{self.name}>{tag_text}
                {target_text}
                {self.effect_text.strip()}

                {rank_text}
                \\parhead<Lists> {', '.join(sorted(self.lists))}
            \\end<{ability_type}>
            \\vspace<0.25em>
            {self.extra_text.strip() if self.extra_text else ""}
        """
