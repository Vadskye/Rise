from rise.latex.util import join

# from rise.statistics.creature
def get_latex_from_creature(
        creature,
        action_points=2,
        challenge_rating=1,
        immunities=None,
        resistances=None,
):
    return get_latex(
        armor_defense=creature.armor_defense,
        fortitude_defense=creature.fortitude_defense,
        hit_points=creature.hit_points,
        level=creature.level,
        mental_defense=creature.mental_defense,
        name=creature.name,
        name_suffix=creature.name_suffix,
        reflex_defense=creature.reflex_defense,
        strikes=creature.strikes,
        # optional args
        action_points=action_points,
        challenge_rating=challenge_rating,
        immunities=immunities,
        resistances=resistances,
    )

def get_latex(
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
        immunities=None,
        name_suffix=None,
        resistances=None,
):
    return join(
        f"""
            \\begin<monsection>{name_suffix_text(name_suffix)}<{name}><{level}>[{challenge_rating}]
                \\begin<spellcontent>
                    \\begin<spelltargetinginfo>
                        \\spelltwocol<\\textbf<HP> {hit_points}; \\textbf<Bloodied> {hit_points // 2}><\\textbf<AP> {action_points}>
                        \\pari \\textbf<Armor> {armor_defense}; \\textbf<Fort> {fortitude_defense}; \\textbf<Ref> {reflex_defense}; \\textbf<Ment> {mental_defense}
                        \\pari \\textbf<Strike> {strike_text(strikes)}
                        {immunity_text(immunities)}
                        {resistance_text(resistances)}
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

def immunity_text(immunities):
    return f"\\pari \\textbf<Immune> {', '.join(immunities)}" if immunities else ""

def name_suffix_text(name_suffix):
    return f"[{name_suffix}]" if name_suffix else ""

def resistance_text(resistances):
    return f"\\pari \\textbf<Resist> {', '.join(resistances)}" if resistances else ""

def strike_text(strikes):
    strikes = []
    for strike_name in strikes:
        strike = strikes[strike_name]
        strikes.append(f"{strike.name} +{strike.accuracy} ({strike.damage})")
    text = " or ".join(strikes)
    return text[0].upper() + text[1:]
