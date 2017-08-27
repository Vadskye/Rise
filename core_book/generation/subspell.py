from generation.util import join

class Subspell(object):

    def __init__(
            self,
            level,
            name,
            description=None,
            effects=None,
            only_one=None,
            school=None,
            tags=None,
            targeting=None,
    ):
        self.level = level
        self.name = name
        self.description = description
        self.effects = effects
        self.only_one = only_one
        self.school = school
        self.tags = tags
        self.targeting = targeting

    def augmentify(self, text):
        """Replace \\spelleffects and \\spelltargetinginfo
        with their augment equivalents
        """
        return (text.replace('spelleffects', 'augmenteffects')
                .replace('spelltargetinginfo', 'augmenttargetinginfo'))

    def tag_text(self):
        """Get the text for this effect's tags and schools"""
        if self.tags:
            return "This is a {glossary_tags} effect{school_text}.".format(
                glossary_tags=', '.join([
                    f"\\glossterm<{tag}>"
                    for tag in sorted(self.tags)
                ]),
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
        text = [
            f"""
                \\augment<{self.level}><{self.name}>
                {self.description or ""}
            """,
        ]

        if self.targeting and self.effects:
            text.append(f"""
                Replace the spell's targets and effects with the following:
                \\begin<spellcontent>
                    {self.targeting}
                    {self.effects}
                \\end<spellcontent>
            """)
        elif self.targeting:
            text.append(f"""
                Replace the spell's targets with the following:
                \\begin<spellcontent>
                    {self.targeting}
                \\end<spellcontent>
            """)
        elif self.effects:
            text.append(f"""
                Replace the spell's effects with the following:
                \\begin<spellcontent>
                    {self.effects}
                \\end<spellcontent>
            """)

        text += [
            """
                \\par
            """ if self.tags or self.school or self.only_one else None,
            f"""
                {self.tag_text()}
            """,
            f"""
                This augment can only be applied to one casting of this spell at a time.
            """ if self.only_one else None,
        ]

        return self.augmentify(join(*text))
