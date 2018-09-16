from logging import getLogger, WARNING
from rise.latex.tags import glosstermify, is_valid_tag
logger = getLogger(__name__)

class Spell(object):

    def __init__(
            self,
            name,
            level,
            effect_text,
            tags=None,
            extra_text=None,
    ):
        self.level = level
        self.name = name
        self.effect_text = effect_text
        self.tags = tags
        self.extra_text = extra_text

        if (self.tags):
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Spell {self.name} has invalid tag {tag}")

    def tag_text(self):
        """Get the text for this effect's tags and schools"""
        if self.tags:
            return "This is a {glossary_tags} effect{school_text}.".format(
                school_text=(
                    f" from the {self.school} school"
                    if self.school
                    else ""
                ),
            )
        elif self.school:
            return f"This effect is from the {self.school} school."
        else:
            return ""

    def __str__(self):
        tag_text = (
            '[' + ', '.join([
                glosstermify(tag) for tag in sorted(self.tags)
            ]) + ']'
        ) if self.tags else ""

        return f"""
            \\begin<ability>[\\nth<{self.level}>]<{self.name}>{tag_text}
                {self.effect_text.strip()}
            \\end<ability>
            \\vspace<0.25em>
            {self.extra_text.strip() if self.extra_text else ""}
        """
