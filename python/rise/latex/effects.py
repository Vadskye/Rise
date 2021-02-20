from logging import getLogger, WARNING
from rise.latex.tags import glosstermify, is_valid_tag
from rise.latex.util import join

logger = getLogger(__name__)


def targets_are_plural(target_text):
    if target_text is None:
        return False
    target_text = target_text.lower()
    for keyword in ["all ", "any number", "allies", "enemies", "everything", "special"]:
        if keyword in target_text:
            return True
    return False


class Effects(object):
    def __init__(
        self,
        name,
        targets,
        effect_text,
        scaling=None,
        tags=None,
    ):
        self.effect_text = effect_text
        self.name = name
        self.scaling = scaling
        self.tags = tags
        self.targets = targets

        if self.tags:
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Effect has invalid tag {tag}")

    def __str__(self):

        tag_text = (
            ", ".join([glosstermify(tag) for tag in sorted(self.tags)])
            if self.tags
            else ""
        )

        ability_type = "attuneability" if "Attune" in tag_text else "freeability"

        target_tag = "targets" if targets_are_plural(self.targets) else "target"
        target_text = f"\\{target_tag}<{self.targets}>" if self.targets else ""
        scaling_text = (
            f"""
            \\rankline
            {self.scaling}
        """
            if self.scaling
            else ""
        )

        return join(
            f"""
                \\begin<{ability_type}><{self.name}>{f"[{tag_text}]" if tag_text else ""}
                    {target_text}
                    {self.effect_text.strip()}
                    {scaling_text}
                \\end<{ability_type}>
            """
        )
