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
        scaling=None,
        extra_text=None,
        focus=True,
        ritual_time=None,
    ):
        if focus:
            tags += ["Focus"]

        self.level = level
        self.name = name
        self.targets = targets
        self.effect_text = effect_text
        self.tags = tags
        self.extra_text = extra_text
        self.scaling = scaling
        self.ritual_time = ritual_time

        is_ritual = bool(ritual_time)

        if "This ritual" in effect_text and not is_ritual:
            logger.log(WARNING, f"Ritual {self.name} is missing ritual_time")
        if (
            is_ritual
            and ritual_time != "special"
            and "This ritual takes" in effect_text
        ):
            logger.log(WARNING, f"Ritual {self.name} has redundant ritual time")
        if (
            is_ritual
            and ritual_time == "special"
            and "This ritual takes" not in effect_text
        ):
            logger.log(WARNING, f"Ritual {self.name} is missing special ritual time")

        if self.tags:
            for tag in self.tags:
                if not is_valid_tag(tag):
                    logger.log(WARNING, f"Spell {self.name} has invalid tag {tag}")

        if not is_ritual:
            # TODO: use regex to find '\brank\b'
            if self.level < 6 and scaling is None:
                logger.log(WARNING, f"Spell {self.name} is missing scaling rules")

            if (
                self.level >= 3
                and "attack vs." in effect_text
                and "\\glance" not in effect_text
                and "end of the next round" not in effect_text
            ):
                logger.log(
                    WARNING, f"Spell {self.name} is missing glancing blow effect"
                )

            if self.level <= 2 and "\\glance" in effect_text:
                logger.log(
                    WARNING, f"Spell {self.name} has glancing blow effect too early"
                )

            if scaling and scaling not in ["accuracy", "damage"]:
                if "for each rank" in scaling:
                    # Make sure that the scaling starts from the spell's actual rank
                    if f"for each rank beyond {self.level}" not in scaling:
                        logger.log(
                            WARNING,
                            f"Spell {self.name} starts scaling from the wrong rank",
                        )
                else:
                    # Make sure that the custom rank upgrades match the spell's rank
                    if self.level in [1, 3, 5] and "rank<7>" not in scaling:
                        logger.log(
                            WARNING, f"Spell {self.name} has wrong rank upgrade pattern"
                        )
                    if self.level in [2, 4] and "rank<6>" not in scaling:
                        logger.log(
                            WARNING, f"Spell {self.name} has wrong rank upgrade pattern"
                        )

            if scaling and "rank<8>" in scaling:
                logger.log(WARNING, f"Spell {self.name} has rank 8 upgrade")

        if "attack vs. " in effect_text and not (
            "\\crit" in effect_text or "damage" in effect_text
        ):
            logger.log(WARNING, f"Spell {self.name} is missing a critical effect")

    def ritual_time_text(self):
        if self.ritual_time == "special" or not self.ritual_time:
            return ""

        fatigue_points_text = (
            f"{(self.level ** 2) * 2} \\glossterm<fatigue points>"
            if self.ritual_time in ["24 hours", "one week"]
            else "one \\glossterm<fatigue point>"
        )
        return f"This ritual takes {self.ritual_time} to perform, and it requires {fatigue_points_text} from its participants."

    def scaling_text(self):
        if not self.scaling:
            return ""

        rank_upgrades = {
            "accuracy": f"You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond {self.level}.",
            "damage": f"The damage increases by +1d for each rank beyond {self.level}",
        }.get(self.scaling, self.scaling)

        return (
            f"""
            \\rankline
            {rank_upgrades.strip()}
        """
            if self.scaling
            else ""
        )

    def __str__(self):
        tag_text = to_latex_tags(self.tags)

        ability_type = "attuneability" if "Attune" in tag_text else "freeability"

        if isinstance(self.targets, str):
            target_tag = "targets" if targets_are_plural(self.targets) else "target"
            target_text = f"\\{target_tag}<{self.targets}>" if self.targets else ""
        elif self.targets is None:
            target_text = "\\targetrule"
        elif isinstance(self.targets, list) and len(self.targets) == 2:
            primary_suffix = (
                "targets" if targets_are_plural(self.targets[0]) else "target"
            )
            secondary_suffix = (
                "targets" if targets_are_plural(self.targets[1]) else "target"
            )
            target_text = f"""
                Primary {primary_suffix}: {self.targets[0]}
                \\par\\noindent
                Secondary {secondary_suffix}: {self.targets[1]}
            """
        else:
            raise Exception(f"Invalid targets: {self.targets}")

        return f"""
            \\lowercase<\\hypertarget<spell:{self.name}><>>\\label<spell:{self.name}>
            \\begin<{ability_type}>[Rank {self.level}]<\\hypertarget<spell:{self.name}><{self.name}>>{tag_text}
                {target_text}
                {self.effect_text.strip()}
                {self.ritual_time_text()}
                {self.scaling_text()}
            \\end<{ability_type}>
            \\vspace<0.25em>
            {self.extra_text.strip() if self.extra_text else ""}
        """
