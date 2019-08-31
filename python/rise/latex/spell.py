from logging import getLogger, WARNING
from rise.latex.effects import targets_are_plural
from rise.latex.tags import is_valid_tag, to_latex_tags
logger = getLogger(__name__)

class Spell(object):

    def __init__(
            self,
            name,
            level,
            targets,
            effect_text,
            tags,
            extra_text=None,
            focus=True,
    ):
        if focus:
            tags += ['Focus']

        self.level = level
        self.name = name
        self.targets = targets
        self.effect_text = effect_text
        self.tags = tags
        self.extra_text = extra_text

        if (self.tags):
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Spell {self.name} has invalid tag {tag}")

    def __str__(self):
        tag_text = to_latex_tags(self.tags)

        ability_type = 'attuneability' if 'Attune' in tag_text else ('apability' if 'AP' in self.tags else 'freeability')

        if isinstance(self.targets, str):
            target_tag = 'targets' if targets_are_plural(self.targets) else 'target'
            target_text = f"\\{target_tag}<{self.targets}>" if self.targets else ""
        elif self.targets is None:
            target_text = "\\targetrule"
        elif isinstance(self.targets, list) and len(self.targets) == 2:
            primary_suffix = 'targets' if targets_are_plural(self.targets[0]) else 'target'
            secondary_suffix = 'targets' if targets_are_plural(self.targets[1]) else 'target'
            target_text = f"""
                Primary {primary_suffix}: {self.targets[0]}
                \\par\\noindent
                Secondary {secondary_suffix}: {self.targets[1]}
            """
        else:
            raise Exception(f"Invalid targets: {self.targets}")

        return f"""
            \\lowercase<\\hypertarget<spell:{self.name}><>>\\label<spell:{self.name}>
            \\begin<{ability_type}>[\\nth<{self.level}>]<\\hypertarget<spell:{self.name}><{self.name}>>{tag_text}
                {target_text}
                {self.effect_text.strip()}
            \\end<{ability_type}>
            \\vspace<0.25em>
            {self.extra_text.strip() if self.extra_text else ""}
        """
