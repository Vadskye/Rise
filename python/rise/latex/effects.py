from logging import getLogger, WARNING
from rise.latex.tags import is_valid_tag
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
        def glosstermify(tag):
            if tag == '(see text)':
                return tag
            elif ' ' in tag:
                split_tag = tag.split()
                if len(split_tag) != 2:
                    raise Exception(f"Unable to parse tag {tag}")
                return f"\\glossterm<{split_tag[0]}> {split_tag[1]}"
            else:
                return f"\\glossterm<{tag}>"

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
