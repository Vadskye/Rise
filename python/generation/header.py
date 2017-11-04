class Header(object):
    def __init__(self, description=None):
        self.description = description

    def __str__(self):
        if self.description is not None:
            return f"""
                \\begin<spellheader>
                    \\spelldesc<{self.description}>
                \\end<spellheader>
            """
