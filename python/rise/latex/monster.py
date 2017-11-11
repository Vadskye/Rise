from rise.latex.util import join

# from rise.statistics.creature
def get_latex_from_creature(
        creature,
        action_points=None,
        active_abilities=None,
        challenge_rating=1,
        immunities=None,
        resistances=None,
):
    return get_latex(
        armor_defense=creature.armor_defense,
        constitution=creature.constitution,
        dexterity=creature.dexterity,
        fortitude_defense=creature.fortitude_defense,
        hit_points=creature.hit_points,
        intelligence=creature.intelligence,
        level=creature.level,
        mental_defense=creature.mental_defense,
        name=creature.name,
        name_suffix=creature.name_suffix,
        perception=creature.perception,
        race=creature.race.name,
        reach=creature.reach,
        reflex_defense=creature.reflex_defense,
        size=creature.size.name,
        space=creature.space,
        speed=creature.speed,
        strength=creature.strength,
        strikes=creature.strikes,
        willpower=creature.willpower,
        # extra args
        action_points=action_points if action_points is not None else challenge_rating,
        active_abilities=active_abilities,
        challenge_rating=challenge_rating,
        immunities=immunities,
        resistances=resistances,
    )

def get_latex(
        armor_defense,
        constitution,
        dexterity,
        fortitude_defense,
        hit_points,
        intelligence,
        level,
        mental_defense,
        name,
        perception,
        race,
        strength,
        strikes,
        reflex_defense,
        willpower,
        action_points=None,
        actions=None,
        active_abilities=None,
        challenge_rating=1,
        immunities=None,
        name_suffix=None,
        resistances=None,
        size='medium',
        space=5,
        speed=30,
        reach=5,
):
    return join(
        f"""
            \\begin<monsection>{name_suffix_text(name_suffix)}<{name}><{level}>[{challenge_rating}]
                \\vspace<-1em>\\spelltwocol<><{size.title()} {race}>\\vspace<-1em>
                \\begin<spellcontent>
                    \\begin<spelltargetinginfo>
                        \\spelltwocol<\\textbf<HP> {hit_points}; \\textbf<Bloodied> {hit_points // 2}><\\textbf<AP> {action_points if action_points is not None else challenge_rating}>
                        \\pari \\textbf<Armor> {armor_defense}; \\textbf<Fort> {fortitude_defense}; \\textbf<Ref> {reflex_defense}; \\textbf<Ment> {mental_defense}
                        \\pari \\textbf<Strike> {strike_text(strikes)}
                        {immunity_text(immunities)}
                        {resistance_text(resistances)}
                        {actions or actions_text(challenge_rating)}
                    \\end<spelltargetinginfo>
                    {f'''
                    |begin<spelleffects>
                        {active_abilities_text(active_abilities)}
                    |end<spelleffects>
                    ''' if active_abilities else ""}
                \\end<spellcontent>
                \\begin<spellsubcontent>
                    \\begin<spellfooter>
                        \\pari \\textbf<Awareness> +6
                        \\pari \\textbf<Speed> {speed} ft.; \\textbf<Space> {space} ft.; \\textbf<Reach> {reach} ft.
                        \\pari \\textbf<Attributes> Str {strength}, Dex {dexterity}, Con {constitution}, Int {intelligence}, Per {perception}, Wil {willpower}
                    \\end<spellfooter>
                \\end<spellsubcontent>
            \\end<monsection>
        """
    )


def actions_text(challenge_rating):
    return {
        1: "",
        2: "\\pari One in action phase and delayed action phase",
        3: "\\pari Two in action phase, one in delayed action phase",
        4: "\\pari Two in action phase and delayed action phase",
    }[challenge_rating]

def active_abilities_text(active_abilities):
    return '\n'.join(active_abilities) if active_abilities else ""

def immunity_text(immunities):
    return f"\\pari \\textbf<Immune> {', '.join(immunities)}" if immunities else ""

def name_suffix_text(name_suffix):
    return f"[{name_suffix}]" if name_suffix else ""

def resistance_text(resistances):
    return f"\\pari \\textbf<Resist> {', '.join(resistances)}" if resistances else ""

def strike_text(strikes):
    strike_texts = []
    for strike_name in strikes:
        strike = strikes[strike_name]
        strike_texts.append(f"{strike.name} +{strike.accuracy} ({strike.damage})")
    text = " or ".join(strike_texts)
    return text[0].upper() + text[1:]
