from cgi_simple import (
    button,
    checkbox,
    div,
    equation,
    fieldset,
    flex_col,
    flex_row,
    flex_wrapper,
    label,
    labeled_span,
    labeled_text_input,
    number_input,
    option,
    plus,
    select,
    sidelabel,
    span,
    textarea,
    this_or_that,
    underlabel,
    underlabeled_checkbox,
    underlabel_spaced,
)


def create_page(_destination):
    return flex_col(
        {"class": "page status-page"},
        [
            div({"class": "tab-explanation"}, """
                This tab is used to track temporary modifiers to your character's state.
                Circumstances and debuffs that are not in <i>italics</i> automatically modify your statistics appropriately.
                You can use custom modifiers for temporary effects, or to define complex abilities such as a barbarian's rage.
            """),
            flex_row({'class': 'standard-modifiers'}, [
                flex_col([
                    div({"class": "section-header"}, "Circumstances"),
                    circumstances(),
                ]),
                flex_col([
                    div({"class": "section-header"}, "Debuffs"),
                    debuffs(),
                ]),
                flex_col({'class': 'vital-wounds'}, [
                    div({"class": "section-header"}, "Vital Wounds"),
                    flex_row({"class": "vital-roll-row"}, [
                        button(
                            {
                                "type": "roll",
                                "value": "@{character_name} makes a vital roll: [[d10+@{vital_rolls}]]"
                            },
                            "Roll vital wound",
                        ),
                        underlabel(
                            "Roll mod",
                            number_input(
                                {
                                    "disabled": True,
                                    "name": "vital_rolls_display",
                                    "value": "@{vital_rolls}",
                                }
                            ),
                        ),
                    ]),
                    fieldset(
                        {"class": f"repeating_vitalwounds"},
                        vital_wound(),
                    ),
                ]),
            ]),
            flex_wrapper(div({"class": "section-header"}, "Custom Modifiers")),
            fieldset(
                {'class': 'repeating_custommodifiers'},
                custom_modifier(),
            ),
            textarea({
                "class": "hidden",
                "disabled": True,
                "name": "debuff_headers",
                "value": "",
            }),
        ],
    )


def vital_wound():
    return flex_row(
        {"class": "vital-wound"},
        [
            underlabel_spaced(
                "Vital Roll",
                number_input({"class": "fake-text", "name": "vital_wound_roll"}),
                {"class": "vital-wound-roll"},
            ),
            labeled_span(
                "Effect",
                {"class": "vital-wound-effect"},
                {
                    "name": "vital_wound_effect",
                },
            ),
        ],
    )

def circumstances():
    return flex_row({'class': 'debuffs'}, [
        flex_col([
            debuff("climbing"),
            debuff("flying"),
            debuff("flying poorly"),
            debuff("grappled"),
            debuff("helpless"),
            debuff("partially unaware"),
        ]),
        flex_col([
            debuff("prone"),
            debuff("squeezing"),
            debuff("surrounded"),
            debuff("swimming"),
            debuff("unaware"),
        ]),
    ])


def debuffs():
    return flex_row({'class': 'debuffs'},
        [
            flex_col([
                debuff("blinded"),
                debuff("confused"),
                debuff("dazed"),
                debuff("dazzled"),
                debuff("frightened"),
                debuff("goaded"),
            ]),
            flex_col([
                debuff("immobilized"),
                debuff("panicked"),
                debuff("shaken"),
                debuff("slowed"),
                debuff("stunned"),
            ]),
        ],
    )


def debuff(name, representable=True):
    return label(
        {"class": "debuff-active-label"},
        [
            checkbox({"name": name.replace(" ", "_")}),
            span(
                {
                    "class": "representable-debuff"
                    if representable
                    else "unrepresentable-debuff"
                },
                name.capitalize() + "?",
            ),
        ],
    )

def custom_modifier():
    return flex_row(
        {'class': 'custom-modifier'},
        [
            underlabeled_checkbox(
                "Active?",
                None,
                {"class": "is-active", "name": "is_active"},
            ),
            labeled_text_input(
                "Name",
                {"class": "name"},
                {"name": "name"},
            ),
            ''.join([custom_statistic(str(i)) for i in range(0, 4)]),
        ],
    ),

def custom_statistic(i):
    return flex_row([
        select(
            {'name': 'statistic' + i},
            [
                option({'value': 'none'}, ''),
                option({'value': 'accuracy'}, 'Accuracy'),
                option({'value': 'all_defenses'}, 'All defenses'),
                option({'value': 'all_skills'}, 'All skills'),
                option({'value': 'armor_defense'}, 'Armor'),
                option({'value': 'damage_resistance_bonus'}, 'Damage resist'),
                option({'value': 'encumbrance'}, 'Encumbrance'),
                option({'value': 'fatigue_tolerance'}, 'Fatigue tolerance'),
                option({'value': 'fortitude'}, 'Fortitude'),
                option({'value': 'hit_points'}, 'Hit points'),
                option({'value': 'magical_power'}, 'Magical power'),
                option({'value': 'mental'}, 'Mental'),
                option({'value': 'mundane_power'}, 'Mundane power'),
                option({'value': 'reflex'}, 'Reflex'),
                option({'value': 'vital_rolls'}, 'Vital rolls'),
            ],
        ),
        underlabel(
            "Value",
            number_input({"name": "value" + i}),
            {"class": "custom-modifier-value"},
        ),
    ])
