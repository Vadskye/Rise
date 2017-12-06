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

        if self.rng and not (self.area or self.target or self.targets):
            raise Exception('Range must be paired with something')

    def area_text(self):
        """Return the text corresponding to this spell's area, if any."""
        if self.area is not None:
            prefix = Targeting.area_prefix[self.area_type]
            return f"{prefix}<{self.area}{self.range_text()}>"
        else:
            return ""

    def range_text(self):
        unrestricted_text = f" (Unrestricted)" if self.unrestricted_range else ""
        return (
            f" within {rng_mapping.get(self.rng, self.rng)} range{unrestricted_text}"
            if self.rng else ""
        )

    def target_text(self):
        """Return the text corresponding to this spell's targets, if any."""

        if self.target:
            return f"\\spelltgt<{self.target}{self.range_text()}>"
        elif self.targets:
            return f"\\spelltgts<{self.targets}{self.range_text()}>"
        else:
            return ""

    def __str__(self):
        action_point_text = f'\\parhead*<Action Points> {self.action_points}' if self.action_points else ""
        time_text = f'\\spelltime<{self.time}>' if self.time else ""
        special_text = f'\\spellspecial {self.special}' if self.special else ""

        return f"""
            \\begin<spelltargetinginfo>
                {special_text}
                {self.target_text()}
                {self.area_text()}
                {time_text}
                {action_point_text}
            \\end<spelltargetinginfo>
        """
