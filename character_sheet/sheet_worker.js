// variable types: boolean, miscCount, miscName, numeric, numericWithoutListen, string
// options: { includeLevel?: Boolean, runOnSheetOpen?: Boolean }
// This can be called with only two arguments, omitting `options`.
function onGet(variables, options, callback = null) {
  if (!callback) {
    callback = options;
    options = {
      includeLevel: true,
      runOnSheetOpen: false,
    };
  }
  variables.boolean = variables.boolean || [];
  variables.numeric = variables.numeric || [];
  variables.numericWithoutListen = variables.numericWithoutListen || [];
  variables.string = variables.string || [];
  if (options.includeLevel && !variables.numeric.includes("level")) {
    variables.numeric.push("level");
  }

  const miscVariables = generateMiscVariables(
    variables.miscName,
    variables.miscCount
  );

  const changeVariables = [
    ...variables.boolean,
    ...variables.numeric,
    ...variables.string,
    ...miscVariables,
  ];

  const changeString = changeVariables.map(formatChangeString).join(" ");
  if (options.runOnSheetOpen) {
    changeString + " sheet:opened";
  }
  const getVariables =
    variables.listenVariables && variables.listenVariables.length > 0
      ? [...changeVariables, ...variables.listenVariables]
      : changeVariables;
  on(changeString, (eventInfo) => {
    getAttrs(getVariables, (attrs) => {
      const v = { eventInfo, misc: 0 };
      for (const b of variables.boolean) {
        v[b] = Boolean(attrs[b] === "on" || attrs[b] === "1");
      }
      for (const n of variables.numeric) {
        v[n] = Number(attrs[n] || 0);
      }
      for (const n of variables.numericWithoutListen) {
        v[n] = Number(attrs[n] || 0);
      }
      for (const s of variables.string) {
        v[s] = attrs[s];
      }
      for (const m of miscVariables) {
        v.misc += Number(attrs[m] || 0);
      }
      callback(v);
    });
  });
}

const SKILLS_BY_ATTRIBUTE = {
  strength: ["Climb", "Jump", "Swim"],
  dexterity: ["Balance", "Flexibility", "Ride", "Sleight of Hand", "Stealth"],
  constitution: ["Endurance"],
  intelligence: [
    "Craft1",
    "Craft2",
    "Deduction",
    "Devices",
    "Disguise",
    "Knowledge1",
    "Knowledge2",
    "Linguistics",
    "Medicine",
  ],
  perception: [
    "Awareness",
    "Creature Handling",
    "Social Insight",
    "Survival",
  ],
  willpower: [],
  other: [
    "Deception",
    "Intimidate",
    "Perform1",
    "Perform2",
    "Persuasion",
    "Profession",
  ],
};

const VARIABLES_WITH_CUSTOM_MODIFIERS = new Set([
  "accuracy",
  "all_defenses",
  "all_skills",
  "armor_defense",
  "encumbrance",
  "damage_resistance_bonus",
  "fatigue_tolerance",
  "fortitude",
  "hit_points",
  "mental",
  "power",
  "reflex",
  "vital_rolls",
]);

const VARIABLES_WITH_DEBUFF_MODIFIERS = new Set([
  "accuracy",
  "armor_defense",
  "fortitude_defense",
]);

// Multipliers to HP and resistances can't be incorporated into this simple handling
// because they are multipliers instead of modifiers.
const VARIABLES_WITH_VITAL_WOUND_MODIFIERS = new Set([
  "accuracy",
  "all_defenses",
  "vital_rolls",
]);

function generateMiscVariables(name, count) {
  if (!(name && count)) {
    return [];
  }
  const variables = [];
  for (let i = 0; i < count; i++) {
    variables.push(`${name}_misc_${i}`);
  }
  if (VARIABLES_WITH_CUSTOM_MODIFIERS.has(name)) {
    variables.push(`${name}_custom_modifier`);
  }
  if (VARIABLES_WITH_DEBUFF_MODIFIERS.has(name)) {
    variables.push(`${name}_debuff_modifier`);
  }
  if (VARIABLES_WITH_VITAL_WOUND_MODIFIERS.has(name)) {
    variables.push(`${name}_vital_wound_modifier`);
  }
  return variables;
}

function formatChangeString(varName) {
  if (varName.includes("repeating_")) {
    return varName.replace(/repeating_([^_]+)_(.*)/, "change:repeating_$1:$2");
  } else {
    return "change:" + varName;
  }
}

function handleEverything() {
  handleCoreStatistics();
  handleResources();
  handleAttributes();
  handleSkills();
}

function handleCoreStatistics() {
  handleAccuracy();
  handleDefenses();
  handleDamageResistance();
  handleEncumbrance();
  handleFatiguePenalty();
  handleHitPoints();
  handleInitiative();
  handleLandSpeed();
  handlePower();
  handleUnknownStatistic();
}

function handleDefenses() {
  handleArmorDefense();
  handleNonArmorDefense("fortitude", "constitution");
  handleNonArmorDefense("reflex", "dexterity");
  handleNonArmorDefense("mental", "willpower");
}

function handleResources() {
  handleAttunementPoints();
  handleFatigueTolerance();
  handleInsightPoints();
  handleSkillPoints();
  handleSkillPointsSpent();
}

function calcDefenseLevelScaling(level, challengeRating) {
  let levelScaling = Math.floor(level / 2);
  if (challengeRating > 0) {
    levelScaling += Math.max(0, Math.floor((level + 6) / 9));
  }
  if (challengeRating === 4) {
    levelScaling += 1;
  } else if (challengeRating === 6) {
    levelScaling += 2;
  }
  return levelScaling;
}

function handleAccuracy() {
  onGet(
    {
      miscName: "accuracy",
      miscCount: 3,
      numeric: ["challenge_rating", "level", "perception", "fatigue_penalty"],
    },
    (v) => {
      const crLevelScaling = v.challenge_rating
        ? Math.max(0, Math.floor(v.level / 9))
        : 0;
      const accuracy =
        crLevelScaling +
        v.misc +
        Math.floor(v.level / 2) +
        Math.floor(v.perception / 2) -
        v.fatigue_penalty;
      setAttrs({ accuracy });
    }
  );
}

function handleArmorDefense() {
  onGet(
    {
      miscName: "armor_defense",
      miscCount: 2,
      numeric: [
        "level",
        "dexterity",
        "constitution",
        "armor_defense_class_bonus",
        "body_armor_defense_value",
        "shield_defense_value",
        "challenge_rating",
        "all_defenses_custom_modifier",
        "all_defenses_vital_wound_modifier",
      ],
      string: ["body_armor_usage_class"],
    },
    (v) => {
      // calculate attributeModifier
      let attributeModifier = 0;
      if (v.challenge_rating > 0) {
        attributeModifier += Math.floor(v.constitution / 2);
      }
      if (v.body_armor_usage_class === "medium" || v.challenge_rating > 0) {
        attributeModifier += Math.floor(v.dexterity / 2);
      } else if (
        v.body_armor_usage_class === "none" ||
        v.body_armor_usage_class === "light"
      ) {
        attributeModifier += v.dexterity;
      }

      const beforeEquipment =
        attributeModifier +
        calcDefenseLevelScaling(v.level, v.challenge_rating) +
        v.armor_defense_class_bonus;
      const totalValue =
        beforeEquipment +
        v.body_armor_defense_value +
        v.shield_defense_value +
        v.misc +
        v.all_defenses_custom_modifier +
        v.all_defenses_vital_wound_modifier;

      setAttrs({
        armor_defense: totalValue,
        body_armor_attribute: attributeModifier,
      });
    }
  );
}

function handleAttributes() {
  for (const attributeName of [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "perception",
    "willpower",
  ]) {
    onGet(
      {
        miscName: attributeName,
        miscCount: 2,
        numeric: ["level", `${attributeName}_point_buy`],
      },
      (v) => {
        const pointBuy = v[`${attributeName}_point_buy`];
        let totalValue =
          pointBuy > 0
            ? {
                1: 1,
                3: 2,
                5: 3,
                8: 4,
              }[pointBuy]
            : pointBuy;
        totalValue += v.misc;
        setAttrs({
          [attributeName]: totalValue || 0,
        });
      }
    );
  }
}

function handleAttunementPoints() {
  onGet(
    {
      miscName: "attunement_points",
      miscCount: 4,
      numeric: ["level", "attunement_points_from_class"],
    },
    (v) => {
      const ap = v.attunement_points_from_class + v.misc;
      setAttrs({
        attunement_points: ap,
        attunement_points_max: ap,
        attunement_points_maximum: ap,
      });
    }
  );
}

function handleDamageResistance() {
  onGet(
    {
      miscName: "damage_resistance_bonus",
      miscCount: 4,
      numeric: [
        "constitution",
        "level",
        "challenge_rating",
        "damage_resistance_bonus_armor",
        "damage_resistance_bonus_vital_wound_multiplier",
      ],
      numericWithoutListen: ["damage_resistance", "damage_resistance_maximum"],
    },
    (v) => {
      var fromLevel = 0;
      var levelish = v.level + v.constitution;
      if (levelish > 0) {
        var multiplier = 1;
        while (levelish > 21) {
          levelish -= 6;
          multiplier += 1;
        }
        fromLevel =
          {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 9,
            9: 10,
            10: 12,
            11: 13,
            12: 15,
            13: 16,
            14: 18,
            15: 20,
            16: 22,
            17: 25,
            18: 28,
            19: 32,
            20: 36,
            21: 40,
          }[levelish] * multiplier;
      }
      var crMultiplier = {
        0: 1,
        0.5: 0,
        1: 2,
        2: 4,
        4: 8,
        6: 16,
      }[v.challenge_rating || 0];
      const totalValue = Math.floor(
        (fromLevel + v.damage_resistance_bonus_armor + v.misc) *
          crMultiplier *
          (v.damage_resistance_bonus_vital_wound_multiplier || 1)
      );

      let attrs = {
        damage_resistance_from_level: fromLevel * crMultiplier,
        damage_resistance_max: totalValue,
        damage_resistance_maximum: totalValue,
      };
      let should_set_current_dr =
        totalValue < v.damage_resistance ||
        v.damage_resistance === v.damage_resistance_maximum ||
        !v.damage_resistance_maximum;
      if (should_set_current_dr) {
        attrs.damage_resistance = totalValue;
      }
      setAttrs(attrs);
    }
  );
}

function handleEncumbrance() {
  onGet(
    {
      miscName: "encumbrance",
      miscCount: 2,
      numeric: ["level", "body_armor_encumbrance", "strength"],
    },
    (v) => {
      const totalValue = Math.max(
        0,
        v.body_armor_encumbrance - Math.max(0, v.strength) - v.misc
      );
      setAttrs({ encumbrance: totalValue });
    }
  );
}

function handleFatiguePenalty() {
  onGet(
    {
      numeric: ["fatigue_points", "fatigue_tolerance"],
    },
    (v) => {
      const totalValue = Math.max(0, v.fatigue_points - v.fatigue_tolerance);
      setAttrs({
        fatigue_penalty: totalValue,
      });
    }
  );
}

function handleFatigueTolerance() {
  onGet(
    {
      miscName: "fatigue_tolerance",
      miscCount: 2,
      numeric: ["level", "fatigue_tolerance_base", "constitution", "willpower"],
    },
    (v) => {
      const fromAttributes = v.constitution + Math.floor(v.willpower / 2);
      const totalValue = Math.max(
        0,
        v.fatigue_tolerance_base + fromAttributes + v.misc
      );
      setAttrs({
        fatigue_tolerance_attributes: fromAttributes,
        fatigue_tolerance: totalValue,
        // for red bars
        fatigue_points_max: totalValue,
      });
    }
  );
}

function handleHitPoints() {
  onGet(
    {
      miscName: "hit_points",
      miscCount: 4,
      numeric: [
        "level",
        "constitution",
        "challenge_rating",
        "hit_points_vital_wound_multiplier",
      ],
      numericWithoutListen: ["hit_points", "hit_points_maximum"],
    },
    (v) => {
      let levelish = v.level + v.constitution;
      let hpFromLevel = 9 + levelish;
      if (levelish > 0) {
        var multiplier = 1;
        while (levelish > 21) {
          levelish -= 6;
          multiplier += 1;
        }
        hpFromLevel =
          multiplier *
            {
              1: 10,
              2: 11,
              3: 12,
              4: 13,
              5: 14,
              6: 16,
              7: 18,
              8: 20,
              9: 22,
              10: 25,
              11: 28,
              12: 32,
              13: 36,
              14: 40,
              15: 44,
              16: 50,
              17: 56,
              18: 64,
              19: 72,
              20: 80,
              21: 88,
              22: 100,
            }[levelish] || 1;
      }

      let crMultiplier = {
        0: 1,
        0.5: 1,
        1: 1,
        2: 3,
        4: 4,
        6: 6,
      }[v.challenge_rating || 0];

      const totalValue = Math.floor(
        (hpFromLevel + v.misc) *
          crMultiplier *
          (v.hit_points_vital_wound_multiplier || 1)
      );

      let attrs = {
        hit_points_from_level: hpFromLevel * crMultiplier,
        hit_points_max: totalValue,
        hit_points_maximum: totalValue,
      };
      let shouldSetCurrentHp =
        totalValue < v.hit_points ||
        totalValue === v.hit_points_maximum ||
        !v.hit_points_maximum;
      if (shouldSetCurrentHp) {
        attrs.hit_points = totalValue;
      }
      setAttrs(attrs);
    }
  );
}

function handleInitiative() {
  onGet(
    {
      miscName: "initiative",
      miscCount: 3,
      numeric: ["dexterity", "perception", "fatigue_penalty"],
    },
    (v) => {
      const attributeModifier = v.dexterity + v.perception;
      setAttrs({
        initiative: attributeModifier + v.misc - v.fatigue_penalty,
        initiative_scaling: attributeModifier,
      });
    }
  );
}

function handleInsightPoints() {
  onGet(
    {
      miscName: "insight_points",
      miscCount: 3,
      numeric: ["insight_points_base", "intelligence"],
    },
    (v) => {
      const totalValue = Math.max(
        0,
        v.insight_points_base + v.intelligence + v.misc
      );
      setAttrs({
        insight_points: totalValue,
      });
    }
  );
}

function handleLandSpeed() {
  onGet(
    {
      miscName: "speed",
      miscCount: 2,
      numeric: ["level", "speed_size", "speed_armor"],
    },
    (v) => {
      const totalValue = v.speed_size - v.speed_armor + v.misc;
      setAttrs({
        land_speed: totalValue,
      });
    }
  );
}

function handleNonArmorDefense(defense, attribute) {
  onGet(
    {
      miscName: defense,
      miscCount: 3,
      numeric: [
        "level",
        attribute,
        `${defense}_class`,
        "challenge_rating",
        "all_defenses_custom_modifier",
        "all_defenses_vital_wound_modifier",
      ],
    },
    (v) => {
      const totalValue =
        calcDefenseLevelScaling(v.level, v.challenge_rating) +
        v[attribute] +
        v[`${defense}_class`] +
        v.misc +
        v.all_defenses_custom_modifier +
        v.all_defenses_vital_wound_modifier;
      setAttrs({
        [defense]: totalValue,
      });
    }
  );
}

function handlePower() {
  onGet(
    {
      miscName: "power",
      miscCount: 4,
      numeric: ["level", "class_power", "challenge_rating"],
    },
    (v) => {
      let levelScaling = v.challenge_rating
        ? {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 6,
            5: 8,
            6: 12,
            7: 16,
            8: 24,
          }[Math.floor((v.level + 2) / 3)]
        : 0;
      levelScaling =
        levelScaling *
        (v.challenge_rating
          ? {
              0.5: 0.5,
              1: 1,
              2: 2,
              4: 3,
              6: 4,
            }[v.challenge_rating]
          : 0);
      setAttrs({
        power: levelScaling + v.class_power + v.misc,
      });
    }
  );
}

function handleSkillPoints() {
  onGet(
    {
      miscName: "skill_points",
      miscCount: 3,
      numeric: ["level", "skill_points_base", "intelligence"],
    },
    (v) => {
      const fromInt = Math.max(0, v.intelligence);
      const totalValue = v.skill_points_base + fromInt + v.misc;
      setAttrs({
        skill_points: totalValue,
        skill_points_intelligence: fromInt,
      });
    }
  );
}

function handleSkillPointsSpent() {
  const skills = [];
  for (const attributeSkills of Object.values(SKILLS_BY_ATTRIBUTE)) {
    for (const skill of attributeSkills) {
      skills.push(skill);
    }
  }
  const skillsAreTrained = skills.map((s) => s.toLowerCase().replace(' ', '_') + '_is_trained');

  onGet(
    {
      boolean: skillsAreTrained,
    },
    (v) => {
      let skillPointsSpent = 0;
      for (const skillIsTrained of skillsAreTrained) {
        if (v[skillIsTrained]) {
          skillPointsSpent += 1;
        }
      }
      setAttrs({
        skill_points_spent: skillPointsSpent,
      });
    }
  );
}

function handleSkills() {
  for (const attribute of Object.keys(SKILLS_BY_ATTRIBUTE)) {
    for (let skill of SKILLS_BY_ATTRIBUTE[attribute]) {
      skill = skill.toLowerCase().replace(' ', '_');
      const numeric = [
        "all_skills_custom_modifier",
        "fatigue_penalty",
        "level",
      ];
      const shouldAddAttribute = attribute !== "other";
      const shouldSubtractEncumbrance =
        attribute === "strength" || attribute === "dexterity";
      if (shouldAddAttribute) {
        numeric.push(attribute);
      }
      if (shouldSubtractEncumbrance) {
        numeric.push("encumbrance");
      }
      onGet(
        {
          boolean: [`${skill}_is_trained`],
          miscName: skill,
          miscCount: 4,
          numeric,
        },
        (v) => {
          const isTrained = v[`${skill}_is_trained`];
          const fromTraining = isTrained ? 3 + Math.floor(v.level / 2) : 0;
          const encumbranceModifier = v.encumbrance || 0;
          const attributeModifier = v[attribute] || 0;
          const skillValue =
            fromTraining +
            attributeModifier +
            v.misc +
            v.all_skills_custom_modifier -
            v.fatigue_penalty -
            encumbranceModifier;
          setAttrs({
            [`${skill}_level`]: fromTraining,
            [`${skill}_total`]: skillValue,
            [skill]: skillValue,
          });
        }
      );
    }
  }
}

function handleUnknownStatistic() {
  onGet({ miscCount: 4, miscName: "unknown_statistic" }, (v) => {
    setAttrs({
      unknown_statistic: v.misc,
    });
  });
}

handleEverything();
