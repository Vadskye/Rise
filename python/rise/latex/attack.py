import rise.latex.rise_data as rise_data
from rise.latex.util import join

class Attack(object):

    @classmethod
    def damage(cls, defense, damage_type):
        return cls(
            defense=defense,
            success=f"{damage_type.capitalize()} \\glossterm<standard damage> +1d.",
        )

    @classmethod
    def multi_damage(cls, defense, damage_type):
        return cls(
            defense=defense,
            success=f"{damage_type.capitalize()} \\glossterm<standard damage> -1d.",
        )

    def __init__(
            self,
            defense,
            accuracy='Spellpower',
            critical=None,
            failure=None,
            special=None,
            success=None,
    ):
        if not (special or success):
            raise Exception("Attack must have `success` or `special`")
        self.defense = defense
        self.accuracy = accuracy
        self.critical = critical
        self.failure = failure
        self.special = special
        self.success = success

        if defense not in rise_data.defenses:
            raise Exception(f"Attack has unrecognized defense '{defense}'")

    def __str__(self):
        return join(
            f"""
                \\begin<spellattack><{self.accuracy} vs. {self.defense.capitalize()}>
            """, f"""
                    \\spellspecial {self.special}
            """ if self.special else None, f"""
                    \\spellsuccess {self.success}
            """ if self.success else None, f"""
                    \\spellcritical {self.critical}
            """ if self.critical else None, f"""
                    \\spellfailure {self.failure}
            """ if self.failure else None, f"""
                \\end<spellattack>
            """,
        )
