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


def create_page():
    return flex_col(
        {"class": "page status-page"},
        [
            flex_wrapper(div({"class": "section-header"}, "Debuffs")),
            debuffs(),
            flex_wrapper(div({"class": "section-header"}, "Custom Modifiers")),
            fieldset(
                {'class': 'repeating_custommodifiers'},
                custom_modifier(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Attuned Effects")),
            fieldset(
                {"class": f"repeating_attunements"},
                attunement(),
            ),
            flex_wrapper(div({"class": "section-header"}, "Vital Wounds")),
            fieldset(
                {"class": f"repeating_vitalwounds"},
                vital_wound(),
            ),
        ],
    )


def attunement():
    return flex_row(
        {"class": "attunement"},
        [
            labeled_text_input(
                "Name",
                {"class": "attunement-name"},
                {"name": "attunement_name"},
            ),
            labeled_text_input(
                "Effect",
                {"class": "attunement-effect"},
                {"name": "attunement_effect"},
            ),
            underlabeled_checkbox(
                "Active?",
                None,
                {"class": "attunement-active", "name": "attunement_active"},
            ),
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
            labeled_text_input(
                "Effect",
                {"class": "vital-wound-effect"},
                {"name": "vital_wound_effect"},
            ),
        ],
    )


def debuffs():
    return flex_col(
        {"class": "debuffs"},
        [
            flex_row(
                [
                    debuff("surrounded"),
                    debuff("flying"),
                    debuff("flying poorly"),
                    debuff("prone"),
                ]
            ),
            flex_row(
                [
                    debuff("dazed"),
                    debuff("dazzled"),
                    debuff("shaken"),
                    debuff("sickened"),
                    debuff("slowed"),
                ]
            ),
            flex_row(
                [
                    debuff("frightened"),
                    debuff("nauseated"),
                    debuff("stunned"),
                    debuff("underwater"),
                ]
            ),
            flex_row(
                [
                    debuff("blinded", False),
                    debuff("confused", False),
                    debuff("decelerated"),
                    debuff("disoriented", False),
                    debuff("immobilized", False),
                    debuff("panicked"),
                ]
            ),
            flex_row(
                [
                    debuff("helpless"),
                ]
            ),
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
            select(
                {'name': 'custom_modifier_statistic'},
                [
                    option({'value': 'accuracy'}, 'Accuracy'),
                    option({'value': 'magical_power'}, 'Magical Power'),
                    option({'value': 'mundane_power'}, 'Mundane Power'),
                ],
            ),
            underlabel_spaced(
                "Value",
                number_input({"name": "custom_modifier_value"}),
                {"class": "custom-modifier-value"},
            ),
        ],
    ),
