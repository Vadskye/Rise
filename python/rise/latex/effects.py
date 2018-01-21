from logging import getLogger, WARNING
from rise.latex.tags import glosstermify, is_valid_tag
from rise.latex.util import join
logger = getLogger(__name__)

class Effects(object):
    def __init__(
            self,
            name,
            effect_text,
            tags=None,
    ):
        self.effect_text = effect_text
        self.name = name
        self.tags = tags

        if (self.tags):
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Effect has invalid tag {tag}")

    def __str__(self):

        tag_text = ', '.join([
            glosstermify(tag) for tag in sorted(self.tags)
        ]) if self.tags else ""

        return join(
            f"""
                \\begin<ability><{self.name}>{f"[{tag_text}]" if tag_text else ""}
                    {self.effect_text}
                \\end<ability>
            """
        )
