from logging import getLogger, WARNING
import sys
import re
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
        ritual_time=None,
    ):

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
            f"{(self.level ** 2) * 2} \\glossterm<fatigue levels>"
            if self.ritual_time in ["24 hours", "one week"]
            else "one \\glossterm<fatigue level>"
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

    def generate_typescript(self):
        type_tag = next(
            (tag for tag in self.tags if "Attune" in tag or "Sustain" in tag), None
        )
        duration_text_exists = (
            "condition" in self.effect_text or "until" in self.effect_text
        )
        spell_type = (
            type_tag
            if type_tag
            else ("Duration" if duration_text_exists else "Instant")
        )

        if self.scaling is None:
            scaling_text = ""
        elif "\\rank" in self.scaling:
            scaling_text = (
                "{"
                + re.sub(
                    ".(\n +\\d:|$)",
                    ".`,\\1",
                    re.sub(r"\\rank<(\d+)> ", r"\1: `", self.scaling.strip()),
                )
                + "}"
            ).replace("\\", "\\\\")
        elif self.scaling == "damage":
            scaling_text = '"' + self.scaling + '"'
        elif self.scaling == "accuracy":
            scaling_text = '"' + self.scaling + '"'
        else:
            scaling_text = f'{{special: "{self.scaling.strip()}"}}'
        if scaling_text:
            scaling_text = f"scaling: {scaling_text},"

        nontype_tags = [
            tag for tag in self.tags if "Attune" not in tag and "Sustain" not in tag
        ]
        tags_text = f"tags: {nontype_tags}," if len(nontype_tags) > 0 else ""

        try:
            effect_or_functions_like_text = generate_effect_text(
                self.effect_text, self.targets
            )
            functions_like_text = effect_or_functions_like_text[0]
            effect_text = effect_or_functions_like_text[1]
        except:
            err = sys.exc_info()[0]
            raise Exception(f"Unable to parse spell {self.name}: {err}")

        casting_time_text = (
            f'castingTime: "minor action",'
            if "You can cast this spell as a \\\\glossterm<minor action" in effect_text
            else ""
        )
        casting_time_text = (
            f'castingTime: "{self.ritual_time}",'
            if self.ritual_time
            else casting_time_text
        )

        targets_text = f"// original targets: {self.targets}" if self.targets else ""

        elements_text = "\n".join(
            map(
                lambda x: x.strip(),
                filter(
                    lambda x: x,
                    [
                        targets_text,
                        casting_time_text,
                        effect_text,
                        functions_like_text,
                        f"rank: {self.level},",
                        scaling_text,
                        tags_text,
                        f'type: "{spell_type}",',
                    ],
                ),
            )
        )

        areas = ["tiny", "small", "med", "large", "huge", "garg"]
        ranges = ["short", "med", "long", "dist", "ext"]
        for area in areas:
            elements_text = elements_text.replace(f"\\\\area{area}", f"\\\\{area}area")
            elements_text = elements_text.replace(
                f"\\\\{area}area line", f"\\\\{area}area long line"
            )
        for r in ranges:
            elements_text = re.sub(
                f"\\\\rng{r}( range)?", f"\\\\{r}range", elements_text
            )
        elements_text = (
            elements_text.replace("<", "{")
            .replace(">", "}")
            .replace("Each target", "Each subject")
            .replace("each target", "each subject")
            .replace("The target", "The target")
            .replace("the target", "the target")
            .replace(
                "As above, except that that each subject takes half damage.",
                "Half damage.",
            )
        )

        return f"""
            {{
                name: "{self.name}",

                {elements_text}
            }},
        """

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


def generate_effect_text(original_effect_text, targets):
    functions_like_matches = re.search(
        "functions like the \\\\(spell|textit|ritual)<([^>]+)>", original_effect_text
    )
    if functions_like_matches:
        referenced_spell = functions_like_matches[2]
        if not referenced_spell:
            raise Exception(
                f"Spell has confusing 'functions like' text: '{original_effect_text}'"
            )
        except_that_text = re.sub(
            "This (spell|ritual) functions like the \\\\spell<[^>]+> spell, except that",
            "",
            original_effect_text.strip(),
        )
        functions_like_text = f"""
  functionsLike: {{
    exceptThat: `
      {except_that_text.strip()}
    `,
    spell: "{referenced_spell}",
  }},
        """
        effect_text = ""
    elif "\\hit" in original_effect_text:
        prefix_match = re.search(
            "(.*)\\\\hit",
            original_effect_text,
            re.DOTALL,
        )
        hit_match = re.search(
            "\\\\hit (.*?)(\\\\glance|\\\\crit|$)",
            original_effect_text.strip(),
            re.DOTALL,
        )
        glance_match = re.search(
            "\\\\glance (.*?)(\\\\crit|$)", original_effect_text.strip(), re.DOTALL
        )
        crit_match = re.search(
            "\\\\crit (.*)$", original_effect_text.strip(), re.DOTALL
        )
        hit_text = f"hit: `{hit_match[1].strip()}.`,"
        glance_text = f"glance: `{glance_match[1].strip()}`," if glance_match else ""
        crit_text = f"crit: `{crit_match[1].strip()}`," if crit_match else ""

        effect_text = f"""
            attack: {{
                {crit_text}
                {glance_text}
                {hit_text}
                targeting: `
                    {prefix_match[1].strip()}
                `,
            }},
        """
        damage_match = re.search("takes (.+) damage equal to ([^.]+)\.", effect_text)
        if damage_match:
            damage_calculation = (
                damage_match[2]
                .replace(
                    "plus half your \\glossterm<power>", "+ half \\\\glossterm{power}"
                )
                .replace("plus your \\glossterm<power>", "+ \\\\glossterm{power}")
            )
            effect_text = re.sub(
                "takes (.*) damage equal to ([^.]+)\.",
                f"takes {damage_calculation} {damage_match[1]} damage",
                effect_text,
            )

        functions_like_text = ""
    else:
        functions_like_text = ""
        effect_text = "effect: `\n" + original_effect_text.strip() + "\n`,"
    # Standardize indentation
    functions_like_text = re.sub(
        "^ *", "        ", functions_like_text, flags=re.MULTILINE
    ).replace("\\", "\\\\")
    effect_text = re.sub("^ *", "        ", effect_text, flags=re.MULTILINE).replace(
        "\\", "\\\\"
    )

    return [functions_like_text, effect_text]
