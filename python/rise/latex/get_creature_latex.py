from rise.latex.util import join

# from rise.statistics.creature
def get_creature_latex(
    creature,
    actions=None,
    active_abilities=None,
    behavior=None,
    immunities=None,
    passive_abilities=None,
    resistances=None,
    speed=None,
):
    return get_latex(
        # use a different calculation for monster AP
        armor_defense=creature.armor_defense,
        challenge_rating=creature.challenge_rating,
        constitution=creature.constitution,
        dexterity=creature.dexterity,
        fatigue_threshold=creature.fatigue_threshold,
        fortitude_defense=creature.fortitude_defense,
        intelligence=creature.intelligence,
        level=creature.level,
        mental_defense=creature.mental_defense,
        name=creature.name,
        name_suffix=creature.name_suffix,
        perception=creature.perception,
        species=creature.species.name,
        reach=creature.reach,
        reflex_defense=creature.reflex_defense,
        size=creature.size.name,
        space=creature.space,
        speed=speed if speed is not None else creature.speed,
        strength=creature.strength,
        strikes=creature.strikes,
        willpower=creature.willpower,
        wound_threshold=creature.wound_threshold,
        # extra args
        actions=actions,
        active_abilities=active_abilities,
        behavior=behavior,
        immunities=immunities,
        passive_abilities=passive_abilities,
        resistances=resistances,
    )


def get_latex(
    armor_defense,
    constitution,
    dexterity,
    fatigue_threshold,
    fortitude_defense,
    intelligence,
    level,
    mental_defense,
    name,
    perception,
    species,
    strength,
    strikes,
    reflex_defense,
    willpower,
    wound_threshold,
    actions=None,
    active_abilities=None,
    behavior=None,
    challenge_rating=1,
    immunities=None,
    name_suffix=None,
    passive_abilities=None,
    resistances=None,
    size="medium",
    space=5,
    speed=30,
    reach=5,
):
    behavior = behavior or "Attack highest Strength"
    return join(
        f"""
            \\begin<monsection><{name}>{name_suffix_text(name_suffix)}<{level}>[{challenge_rating}]
                \\vspace<-1em>\\spelltwocol<><{size.title()} {species}>\\vspace<-1em>
                \\begin<spellcontent>
                    \\begin<spelltargetinginfo>
                        \\spelltwocol<
                            \\textbf<FT> {fatigue_threshold}, \\textbf<WT> {wound_threshold};
                        >
                            <\\textbf<AP> TODO/TODO>

                        \\pari \\textbf<Armor> {armor_defense};
                            \\textbf<Fort> {fortitude_defense};
                            \\textbf<Ref> {reflex_defense};
                            \\textbf<Ment> {mental_defense}
                        \\pari \\textbf<Strike> {strike_text(strikes)}
                        {immunity_text(immunities)}
                        {resistance_text(resistances)}
                        {
                            f"|pari |textbf<Actions> {actions or actions_text(challenge_rating)}"
                            if actions or actions_text(challenge_rating)
                            else ""
                        }
                        \\pari \\textbf<Behavior> {behavior}
                    \\end<spelltargetinginfo>
                \\end<spellcontent>

                \\begin<monsterfooter>
                    \\pari \\textbf<Awareness> +6
                    \\pari \\textbf<Speed> {speed} ft.;
                        \\textbf<Space> {space} ft.
                    \\pari \\textbf<Attributes>:
                        Str {strength},
                        Dex {dexterity},
                        Con {constitution},
                        Int {intelligence},
                        Per {perception},
                        Wil {willpower}
                \\end<monsterfooter>
            \\end<monsection>

            {f'''
                |subsubsection<{name} Abilities>
                {active_abilities_text(active_abilities)}
                {passive_abilities_text(passive_abilities)}
            ''' if active_abilities or passive_abilities else ""}
        """
    ).strip()


def actions_text(challenge_rating):
    return {
        1: "",
        2: "",
        3: "One in action phase, one in delayed action phase",
        4: "One in action phase, one in delayed action phase",
    }[challenge_rating]


def active_abilities_text(active_abilities):
    return "\n\\vspace<0.5em>".join(active_abilities) if active_abilities else ""


def passive_abilities_text(passive_abilities):
    return "\n\\vspace<0.5em>".join(passive_abilities) if passive_abilities else ""


def immunity_text(immunities):
    return f"\\pari \\textbf<Immune> {', '.join(immunities)}" if immunities else ""


def name_suffix_text(name_suffix):
    return f"[{name_suffix}]" if name_suffix else ""


def resistance_text(resistances):
    return f"\\pari \\textbf<Resist> {', '.join(resistances)}" if resistances else ""


def strike_text(strikes):
    strike_texts = []
    for strike in strikes:
        defense_text = (
            f" vs. {strike.defense.title()}" if strike.defense != "Armor" else ""
        )
        strike_texts.append(
            f"{strike.name} +{strike.accuracy}{defense_text} ({strike.damage})"
        )
    text = " or ".join(strike_texts)
    return text[0].upper() + text[1:]
