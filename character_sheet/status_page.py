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
            div(
                {"class": "tab-explanation"},
                """
                This tab is used to track changes to your character's statistics.
                All standard debuffs and circumstances are listed here.
                In addition, you can define custom modifiers to represent your character's various abilities.
            """,
            ),
            flex_row(
                {"class": "standard-modifiers"},
                [
                    flex_col(
                        [
                            div({"class": "section-header"}, "Circumstances"),
                            circumstances(),
                        ]
                    ),
                    flex_col(
                        [
                            div({"class": "section-header"}, "Debuffs"),
                            debuffs(),
                        ]
                    ),
                    flex_col(
                        {"class": "vital-wounds"},
                        [
                            div({"class": "section-header"}, "Vital Wounds"),
                            flex_row(
                                {"class": "vital-roll-row"},
                                [
                                    button(
                                        {
                                            "type": "roll",
                                            "value": "@{character_name} makes a vital roll: [[d10+@{vital_rolls}]]",
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
                                ],
                            ),
                            fieldset(
                                {"class": f"repeating_vitalwounds"},
                                vital_wound(),
                            ),
                        ],
                    ),
                ],
            ),
            flex_wrapper(div({"class": "section-header"}, "Temporary Modifiers")),
            fieldset(
                {"class": "repeating_temporarymodifiers"},
                custom_modifier(show_toggle=True, show_text=False),
            ),
            flex_wrapper(div({"class": "section-header"}, "Permanent Modifiers")),
            fieldset(
                {"class": "repeating_permanentmodifiers"},
                custom_modifier(show_toggle=False, show_text=False),
            ),
            flex_wrapper(div({"class": "section-header"}, "DEPRECATED - Custom Modifiers")),
            fieldset(
                {"class": "repeating_custommodifiers"},
                custom_modifier(show_toggle=True, show_text=False),
            ),
            textarea(
                {
                    "class": "hidden",
                    "disabled": True,
                    "name": "debuff_headers",
                    "value": "",
                }
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
    return flex_row(
        {"class": "debuffs"},
        [
            flex_col(
                [
                    debuff("climbing"),
                    debuff("flying"),
                    debuff("flying poorly"),
                    debuff("grappled"),
                    debuff("helpless"),
                ]
            ),
            flex_col(
                [
                    debuff("partially unaware"),
                    debuff("prone"),
                    debuff("squeezing"),
                    debuff("swimming"),
                    debuff("unaware"),
                ]
            ),
        ],
    )


def debuffs():
    return flex_row(
        {"class": "debuffs"},
        [
            flex_col(
                [
                    debuff("blinded"),
                    debuff("confused"),
                    debuff("dazed"),
                    debuff("dazzled"),
                    debuff("frightened"),
                    debuff("goaded"),
                ]
            ),
            flex_col(
                [
                    debuff("immobilized"),
                    debuff("panicked"),
                    debuff("shaken"),
                    debuff("slowed"),
                    debuff("stunned"),
                ]
            ),
        ],
    )


def debuff(name, representable=True):
    debuff_class = "representable-debuff" if representable else "unrepresentable-debuff"
    return label(
        {"class": "debuff-active-label"},
        [
            checkbox({"name": name.replace(" ", "_")}),
            span(
                {
                    "class": debuff_class,
                    "title": debuff_explanation(name),
                },
                name.capitalize() + "?",
            ),
        ],
    )


def debuff_explanation(debuff):
    return {
        "blinded": "50% miss chance",
        "charmed": "friendly with charmer",
        "climbing": "-4 accuracy, defenses",
        "confused": "-4 defenses, acts randomly",
        "dazed": "-2 defenses",
        "dazzled": "25% miss chance, no special vision",
        "deafened": "25% verbal spell failure",
        "dominated": "must obey commands",
        "flying": "-2 Armor and Reflex",
        "flying poorly": "-4 Armor and Reflex",
        "frightened": "-4 accuracy and Mental within 60 ft.",
        "goaded": "-2 accuracy vs. non-goading creatures",
        "grappled": "limited mobility and actions",
        "helpless": "-10 Armor and Ref",
        "immobilized": "-4 Ref, cannot use movement speeds",
        "panicked": "-4 Mental and must flee within 60 ft.",
        "paralyzed": "cannot move",
        "partially unaware": "-2 Armor and Ref",
        "petrified": "turned to stone",
        "prone": "half speed, -2 accuracy, Armor, and Ref",
        "shaken": "-2 accuracy and Mental within 60 ft.",
        "slowed": "half speed, -2 Ref",
        "squeezing": "-2 accuracy, Armor, and Ref",
        "stunned": "-4 defenses",
        "swimming": "-4 accuracy, defenses",
        "unaware": "-6 Armor and Ref",
        "unconscious": "unable to act",
    }[debuff]


def custom_modifier(show_toggle, show_text):
    return (
        flex_row(
            {"class": "custom-modifier"},
            [
                flex_row({"class": "text-prefix"}, [
                    (
                        underlabeled_checkbox(
                            "Active?",
                            None,
                            {"class": "is-active", "name": "is_active"},
                        )
                        if show_toggle else ""
                    ),
                    labeled_text_input(
                        "Name",
                        {"class": "name"},
                        {"name": "name"},
                    ),
                    (
                        labeled_text_input(
                            "Effect",
                            {"class": "effect"},
                            {"name": "effect"},
                        )
                        if show_text else ""
                    ),
                ]),
                "".join([custom_statistic(str(i)) for i in range(0, 3)]),
            ],
        ),
    )


def custom_statistic(i):
    return flex_row(
        {"class": "custom-statistic"},
        [
            select(
                {"name": "statistic" + i},
                [
                    option({"value": "none"}, ""),
                    option({"value": "accuracy"}, "Accuracy"),
                    option({"value": "all_defenses"}, "All defenses"),
                    option({"value": "all_skills"}, "All skills"),
                    option({"value": "armor_defense"}, "Armor defense"),
                    option({"value": "attunement_points"}, "Attunement points"),
                    option({"value": "awareness"}, "Awareness"),
                    option({"value": "balance"}, "Balance"),
                    option({"value": "climb"}, "Climb"),
                    option({"value": "constitution"}, "Constitution"),
                    option({"value": "craft_all"}, "Craft (all)"),
                    option({"value": "craft_alchemy"}, "Craft (alchemy)"),
                    option({"value": "craft_bone"}, "Craft (bone)"),
                    option({"value": "craft_ceramics"}, "Craft (ceramics)"),
                    option({"value": "craft_jewelry"}, "Craft (jewelry)"),
                    option({"value": "craft_leather"}, "Craft (leather)"),
                    option({"value": "craft_manuscripts"}, "Craft (manuscripts)"),
                    option({"value": "craft_metal"}, "Craft (metal)"),
                    option({"value": "craft_poison"}, "Craft (poison)"),
                    option({"value": "craft_stone"}, "Craft (stone)"),
                    option({"value": "craft_textiles"}, "Craft (textiles)"),
                    option({"value": "craft_traps"}, "Craft (traps)"),
                    option({"value": "craft_wood"}, "Craft (wood)"),
                    option({"value": "craft_untrained"}, "Craft (untrained)"),
                    option({"value": "creature_handling"}, "Creature Handling"),
                    option({"value": "damage_resistance_bonus"}, "Damage resistance"),
                    option({"value": "deception"}, "Deception"),
                    option({"value": "deduction"}, "Deduction"),
                    option({"value": "devices"}, "Devices"),
                    option({"value": "dexterity"}, "Dexterity"),
                    option({"value": "disguise"}, "Disguise"),
                    option({"value": "encumbrance"}, "Encumbrance"),
                    option({"value": "endurance"}, "Endurance"),
                    option({"value": "fatigue_tolerance"}, "Fatigue tolerance"),
                    option({"value": "flexibility"}, "Flexibility"),
                    option({"value": "fortitude"}, "Fortitude defense"),
                    option({"value": "hit_points"}, "Hit points"),
                    option({"value": "initiative"}, "Initiative"),
                    option({"value": "insight_points"}, "Insight points"),
                    option({"value": "intelligence"}, "Intelligence"),
                    option({"value": "intimidate"}, "Intimidate"),
                    option({"value": "jump"}, "Jump"),
                    option({"value": "knowledge_all"}, "Knowledge (all)"),
                    option({"value": "knowledge_arcana"}, "Knowledge (arcana)"),
                    option({"value": "knowledge_dungeoneering"}, "Knowledge (dungeoneering)"),
                    option({"value": "knowledge_engineering"}, "Knowledge (engineering)"),
                    option({"value": "knowledge_items"}, "Knowledge (items)"),
                    option({"value": "knowledge_local"}, "Knowledge (local)"),
                    option({"value": "knowledge_nature"}, "Knowledge (nature)"),
                    option({"value": "knowledge_planes"}, "Knowledge (planes)"),
                    option({"value": "knowledge_religion"}, "Knowledge (religion)"),
                    option({"value": "knowledge_untrained"}, "Knowledge (untrained)"),
                    option({"value": "linguistics"}, "Linguistics"),
                    option({"value": "medicine"}, "Medicine"),
                    option({"value": "mental"}, "Mental defense"),
                    option({"value": "perception"}, "Perception"),
                    option({"value": "perform"}, "Perform"),
                    option({"value": "persuasion"}, "Persuasion"),
                    option({"value": "power"}, "Power"),
                    option({"value": "profession"}, "Profession"),
                    option({"value": "reflex"}, "Reflex defense"),
                    option({"value": "ride"}, "Ride"),
                    option({"value": "sleight_of_hand"}, "Sleight of Hand"),
                    option({"value": "social_insight"}, "Social Insight"),
                    option({"value": "speed"}, "Speed"),
                    option({"value": "stealth"}, "Stealth"),
                    option({"value": "strength"}, "Strength"),
                    option({"value": "weapon_damage_dice"}, "Strike +d damage"),
                    option({"value": "survival"}, "Survival"),
                    option({"value": "swim"}, "Swim"),
                    option({"value": "nonclass_skill_count"}, "Trained skills"),
                    option({"value": "vital_rolls"}, "Vital rolls"),
                    option({"value": "willpower"}, "Willpower"),
                ],
            ),
            underlabel(
                "Value",
                number_input({"name": "value" + i}),
                {"class": "custom-modifier-value"},
            ),
        ]
    )
