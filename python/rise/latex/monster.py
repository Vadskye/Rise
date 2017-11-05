from rise.latex.util import join

class Monster(object):

    # from rise.statistics.creature
    @classmethod
    def from_creature(cls, creature):
        return cls(
            armor_defense=creature.armor_defense,
            fortitude_defense=creature.fortitude_defense,
            hit_points=creature.hit_points,
            level=creature.level,
            mental_defense=creature.mental_defense,
            name=creature.name,
            name_suffix=creature.name_suffix,
            reflex_defense=creature.reflex_defense,
            strikes=creature.strikes,
        )

    def __init__(
            self,
            armor_defense,
            fortitude_defense,
            hit_points,
            level,
            mental_defense,
            name,
            strikes,
            reflex_defense,
            action_points=2,
            challenge_rating=1,
            name_suffix=None,
    ):
        self.armor_defense = armor_defense
        self.fortitude_defense = fortitude_defense
        self.hit_points = hit_points
        self.level = level
        self.mental_defense = mental_defense
        self.name = name
        self.reflex_defense = reflex_defense
        self.strikes = strikes

        self.action_points = action_points
        self.challenge_rating = challenge_rating
        self.name_suffix = name_suffix

    def strike_text(self):
        strikes = []
        for strike_name in self.strikes:
            strike = self.strikes[strike_name]
            strikes.append(f"{strike.name} +{strike.accuracy} ({strike.damage})")
        text = " or ".join(strikes)
        return text[0].upper() + text[1:]

    def to_latex(self):
        name_suffix_text = f"[{self.name_suffix}]" if self.name_suffix else ""
        return join(
            f"""
                \\begin<monsection>{name_suffix_text}<{self.name}>{self.level}[{self.challenge_rating}]
                    \\begin<spellcontent>
                        \\begin<spelltargetinginfo>
                            \\spelltwocol<\\textbf<HP> {self.hit_points}; \\textbf<Bloodied> {self.hit_points // 2}><\\textbf<AP> {self.action_points}>
                            \\pari \\textbf<Armor> {self.armor_defense}; \\textbf<Fort> {self.fortitude_defense}; \\textbf<Ref> {self.reflex_defense}; \\textbf<Ment> {self.mental_defense}
                            \\pari \\textbf<Strike> {self.strike_text()}
                            \\pari \\textbf<Immune> staggered
                        \\end<spelltargetinginfo>
                        \\begin<spelleffects>
                            \\pari \\spelltwocol<\\textbf<Rend>: +6 vs Armor><Up to 3 melee targets>
                            \\par Hit: The target takes damage from a claw strike.
                        \\end<spelleffects>
                    \\end<spellcontent>
                    \\begin<spellfooter>
                        \\pari \\textbf<Awareness> +6
                        \\pari \\textbf<Speed> 30 ft.; \\textbf<Space> 5 ft.; \\textbf<Reach> 5 ft.
                    \\end<spellfooter>
                \\end<monsection>
            """
        )

    def __repr__(self):
        return f"Monster({self.name})"
