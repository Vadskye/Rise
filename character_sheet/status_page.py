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
                                            "type": "action",
                                            "name": "act_gainvitalwound",
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
                    debuff("grappled"),
                    debuff("helpless"),
                    debuff("partially unaware"),
                    debuff("prone"),
                ]
            ),
            flex_col(
                [
                    debuff("squeezing"),
                    debuff("unaware"),
                    debuff("unsteady"),
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
                    debuff("dazzled"),
                    debuff("frightened"),
                ]
            ),
            flex_col(
                [
                    debuff("goaded"),
                    debuff("panicked"),
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
        "confused": "-2 defenses and randomly attack or defend",
        "dazzled": "20% miss chance, no special vision",
        "deafened": "20% verbal spell failure",
        "dominated": "must obey commands",
        "midair": "-4 Armor and Reflex",
        "frightened": "-2 Mental, -2 accuracy vs. source",
        "goaded": "-2 accuracy vs. other creatures",
        "grappled": "-2 Armor and Ref, can't move normally",
        "helpless": "-8 Armor, Brawn, Ref",
        "panicked": "-4 Mental, cannot attack source",
        "partially unaware": "-2 defenses",
        "prone": "half speed, -2 Armor and Ref",
        "slowed": "half speed, -2 Armor and Ref",
        "squeezing": "-2 Armor and Ref",
        "stunned": "-2 defenses",
        "unaware": "-5 defenses",
        "unsteady": "-2 accuracy, Armor, Brawn, Ref",
    }[debuff]


def custom_modifier(show_toggle, show_text):
    return (
        flex_row(
            {"class": "custom-modifier"},
            [
                flex_col(
                    {"class": "custom-modifier-toggles"},
                    [
                        underlabeled_checkbox(
                            "Active?",
                            None,
                            {"class": "is-active", "name": "is_active"},
                        ),
                        underlabeled_checkbox(
                            "Deep?",
                            None,
                            {"class": "is-deep", "name": "is_deep"},
                        )
                        if show_toggle == "deep"
                        else "",
                    ],
                )
                if show_toggle
                else "",
                flex_row(
                    {"class": "custom-modifier-details"},
                    [
                        flex_row(
                            {"class": "text-prefix"},
                            [
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
                                    if show_text
                                    else ""
                                ),
                            ],
                        ),
                        flex_row(
                            {"class": "custom-modifier-dropdowns"},
                            [custom_statistic(str(i)) for i in range(0, 3)],
                        ),
                    ],
                ),
                flex_row(
                    {"class": "custom-modifier-special-effects"},
                    [
                        labeled_text_input(
                            "Immune",
                            {"class": "immune"},
                            {"name": "immune"},
                        ),
                        labeled_text_input(
                            "Impervious",
                            {"class": "impervious"},
                            {"name": "impervious"},
                        ),
                        labeled_text_input(
                            "Vulnerable",
                            {"class": "vulnerable"},
                            {"name": "vulnerable"},
                        ),
                        labeled_text_input(
                            "Extra attack text",
                            {"class": "attack-header"},
                            {"name": "attack_header"},
                        ),
                    ],
                )
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
                    option({"value": "accuracy_with_strikes"}, "Accuracy with strikes"),
                    option({"value": "all_defenses"}, "All defenses"),
                    option({"value": "all_skills"}, "All skills"),
                    option({"value": "armor_defense"}, "Armor defense"),
                    option({"value": "attunement_points"}, "Attunement points"),
                    option({"value": "awareness"}, "Awareness"),
                    option({"value": "balance"}, "Balance"),
                    option(
                        {"value": "bardic_performances_known"}, "Bardic performances"
                    ),
                    option({"value": "battle_tactics_known"}, "Battle tactics"),
                    option({"value": "brawling_accuracy"}, "Brawling accuracy"),
                    option({"value": "brawn"}, "Brawn defense"),
                    option({"value": "climb"}, "Climb"),
                    option({"value": "combat_styles_known"}, "Combat styles"),
                    option({"value": "constitution"}, "Constitution"),
                    option({"value": "craft_all"}, "Craft (all)"),
                    option({"value": "craft_alchemy"}, "Craft (alchemy)"),
                    option({"value": "craft_bone"}, "Craft (bone)"),
                    option({"value": "craft_ceramics"}, "Craft (ceramics)"),
                    option({"value": "craft_leather"}, "Craft (leather)"),
                    option({"value": "craft_manuscripts"}, "Craft (manuscripts)"),
                    option({"value": "craft_metal"}, "Craft (metal)"),
                    option({"value": "craft_poison"}, "Craft (poison)"),
                    option({"value": "craft_stone"}, "Craft (stone)"),
                    option({"value": "craft_textiles"}, "Craft (textiles)"),
                    option({"value": "craft_wood"}, "Craft (wood)"),
                    option({"value": "craft_untrained"}, "Craft (untrained)"),
                    option({"value": "creature_handling"}, "Creature Handling"),
                    option({"value": "damage_resistance"}, "Damage resistance"),
                    option({"value": "deception"}, "Deception"),
                    option({"value": "deduction"}, "Deduction"),
                    option({"value": "devices"}, "Devices"),
                    option({"value": "dexterity"}, "Dexterity"),
                    option({"value": "disguise"}, "Disguise"),
                    option({"value": "durability"}, "Durability"),
                    option({"value": "encumbrance"}, "Encumbrance"),
                    option({"value": "endurance"}, "Endurance"),
                    option({"value": "fatigue_tolerance"}, "Fatigue tolerance"),
                    option({"value": "flexibility"}, "Flexibility"),
                    option({"value": "fortitude"}, "Fortitude defense"),
                    option({"value": "hit_points"}, "Hit points"),
                    option({"value": "hunting_styles_known"}, "Hunting styles"),
                    option({"value": "injury_point"}, "Injury Point"),
                    option({"value": "insight_points"}, "Insight points"),
                    option({"value": "intelligence"}, "Intelligence"),
                    option({"value": "intimidate"}, "Intimidate"),
                    option({"value": "horizontal_jump_distance"}, "Jump distance (horizontal)"),
                    option({"value": "ki_manifestations_known"}, "Ki manifestations"),
                    option({"value": "knowledge_all"}, "Knowledge (all)"),
                    option({"value": "knowledge_arcana"}, "Knowledge (arcana)"),
                    option(
                        {"value": "knowledge_dungeoneering"},
                        "Knowledge (dungeoneering)",
                    ),
                    option(
                        {"value": "knowledge_engineering"}, "Knowledge (engineering)"
                    ),
                    option({"value": "knowledge_items"}, "Knowledge (items)"),
                    option({"value": "knowledge_local"}, "Knowledge (local)"),
                    option({"value": "knowledge_nature"}, "Knowledge (nature)"),
                    option({"value": "knowledge_planes"}, "Knowledge (planes)"),
                    option({"value": "knowledge_religion"}, "Knowledge (religion)"),
                    option({"value": "knowledge_untrained"}, "Knowledge (untrained)"),
                    option({"value": "maneuvers_known"}, "Maneuvers"),
                    option({"value": "medicine"}, "Medicine"),
                    option({"value": "mental"}, "Mental defense"),
                    option({"value": "metamagic_known"}, "Metamagic"),
                    option({"value": "mystic_spheres_known"}, "Mystic spheres"),
                    option({"value": "perception"}, "Perception"),
                    option({"value": "perform"}, "Perform"),
                    option({"value": "persuasion"}, "Persuasion"),
                    option({"value": "mundane_power"}, "Mundane power"),
                    option({"value": "magical_power"}, "Magical power"),
                    option({"value": "profession"}, "Profession"),
                    option({"value": "reflex"}, "Reflex defense"),
                    option({"value": "ride"}, "Ride"),
                    option({"value": "nonclass_skill_count"}, "Skills trained"),
                    option({"value": "sleight_of_hand"}, "Sleight of Hand"),
                    option({"value": "social_insight"}, "Social Insight"),
                    option({"value": "speed"}, "Speed"),
                    option({"value": "spells_known"}, "Spells"),
                    option({"value": "stealth"}, "Stealth"),
                    option({"value": "strength"}, "Strength"),
                    option({"value": "weapon_damage_dice"}, "Strike +d damage"),
                    option({"value": "survival"}, "Survival"),
                    option({"value": "swim"}, "Swim"),
                    option({"value": "vital_rolls"}, "Vital rolls"),
                    option({"value": "weight_limits"}, "Weight limits"),
                    option({"value": "wild_aspects_known"}, "Wild aspects"),
                    option({"value": "willpower"}, "Willpower"),
                ],
            ),
            underlabel(
                "Value",
                number_input({"name": "value" + i}),
                {"class": "custom-modifier-value"},
            ),
        ],
    )
