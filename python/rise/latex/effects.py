from logging import getLogger, WARNING
import sys
import re
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
            tag
            for tag in self.tags
            if "Attune" not in tag and "Sustain" not in tag
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
                        'focus: false,',
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
            .replace("The target", "The subject")
            .replace("the target", "the subject")
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
