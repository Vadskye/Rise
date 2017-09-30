rng_mapping = {
    'close': r'\rngclose',
    'medium': r'\rngmed',
    'long': r'\rnglong',
    'extreme': r'\rngext',
}

class Targeting(object):
    area_prefix = {
        'burst': r'\spellburst',
        'emanation': r'\spellemanation',
        'zone': r'\spellzone',
    }

    def __init__(
            self,
            action_points=None,  # for rituals
            area=None,
            area_type='burst',
            target=None,
            targets=None,
            time=None,  # for rituals
            rng=None,
            special=None,
            unrestricted_range=False,
    ):
        self.action_points = action_points
        self.area = area
        self.area_type = area_type
        self.rng = rng
        self.special = special
        self.target = target
        self.targets = targets
        self.time = time
        self.unrestricted_range = unrestricted_range

    def area_text(self):
        """Return the text corresponding to this spell's area, if any."""
        if self.area is not None:
            prefix = Targeting.area_prefix[self.area_type]
            return f"{prefix}<{self.area}>"
        else:
            return ""

    def target_text(self):
        """Return the text corresponding to this spell's targets, if any."""
        if self.target:
            return f"\\spelltgt<{self.target}>"
        elif self.targets:
            return f"\\spelltgts<{self.targets}>"
        else:
            return ""

    def __str__(self):
        action_point_text = f'\\parhead*<Action Points> {self.action_points}' if self.action_points else ""
        time_text = f'\\spelltime<{self.time}>' if self.time else ""
        special_text = f'\\spellspecial {self.special}' if self.special else ""
        if self.rng:
            col2 = "\\spellrng<{rng}{unrestricted}>".format(
                rng=rng_mapping.get(self.rng, self.rng),
                unrestricted=" (Unrestricted)" if self.unrestricted_range else "",
            )
            col1 = self.area_text()
            included_target_text = False
            if not col1:
                col1 = self.target_text()
                included_target_text = True
            if col1:
                twocol_text = f"\\spelltwocol<{col1}><{col2}>"
            else:
                twocol_text = col2

            # if we included the target_text above, don't include it again
            return f"""
                \\begin<spelltargetinginfo>
                    {special_text}
                    {twocol_text}
                    {self.target_text() if not included_target_text else ""}
                    {time_text}
                    {action_point_text}
                \\end<spelltargetinginfo>
            """
        else:
            return f"""
                \\begin<spelltargetinginfo>
                    {special_text}
                    {self.area_text()}
                    {self.target_text()}
                \\end<spelltargetinginfo>
            """
