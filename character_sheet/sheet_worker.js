const CUSTOM_MODIFIER_TYPES = ["attuned", "temporary", "permanent"];
const BASE_CLASS_MODIFIERS = {
  monster: {
    power: "monster",
    armor_defense: 5,
    fortitude: 5,
    reflex: 5,
    mental: 5,
    vital_rolls: 0,
    attunement_points: 0,
    fatigue_tolerance: 0,
    insight_points: 0,
    class_skill_count: 0,
    proficiencies: "",
  },
  barbarian: {
    power: "fast",
    armor_defense: 0,
    fortitude: 7,
    reflex: 5,
    mental: 3,
    vital_rolls: 1,
    attunement_points: 3,
    fatigue_tolerance: 5,
    insight_points: 0,
    class_skill_count: 5,
    proficiencies: "Light and medium armor, one weapon group",
  },
  cleric: {
    power: "normal",
    armor_defense: 0,
    fortitude: 5,
    reflex: 3,
    mental: 7,
    vital_rolls: 0,
    attunement_points: 4,
    fatigue_tolerance: 4,
    insight_points: 2,
    class_skill_count: 4,
    proficiencies: "Light and medium armor",
  },
  druid: {
    power: "normal",
    armor_defense: 0,
    fortitude: 5,
    reflex: 4,
    mental: 6,
    vital_rolls: 0,
    attunement_points: 4,
    fatigue_tolerance: 4,
    insight_points: 2,
    class_skill_count: 5,
    proficiencies: "Light armor, hide armor, scimitars, and sickles",
  },
  fighter: {
    power: "normal",
    armor_defense: 1,
    fortitude: 7,
    reflex: 3,
    mental: 4,
    vital_rolls: 1,
    attunement_points: 3,
    fatigue_tolerance: 5,
    insight_points: 1,
    class_skill_count: 3,
    proficiencies: "All armor, two weapon groups",
  },
  monk: {
    power: "normal",
    armor_defense: 1,
    fortitude: 3,
    reflex: 6,
    mental: 5,
    vital_rolls: 0,
    attunement_points: 4,
    fatigue_tolerance: 5,
    insight_points: 2,
    class_skill_count: 5,
    proficiencies: "Light armor, monk weapons",
  },
  paladin: {
    power: "normal",
    armor_defense: 1,
    fortitude: 6,
    reflex: 3,
    mental: 5,
    vital_rolls: 1,
    attunement_points: 3,
    fatigue_tolerance: 5,
    insight_points: 1,
    class_skill_count: 4,
    proficiencies: "All armor, one weapon group",
  },
  ranger: {
    power: "normal",
    armor_defense: 1,
    fortitude: 5,
    reflex: 5,
    mental: 4,
    vital_rolls: 1,
    attunement_points: 3,
    fatigue_tolerance: 5,
    insight_points: 2,
    class_skill_count: 5,
    proficiencies:
      "Light armor, hide armor, one weapon group, and one ranged weapon group",
  },
  rogue: {
    power: "normal",
    armor_defense: 0,
    fortitude: 3,
    reflex: 7,
    mental: 5,
    vital_rolls: 0,
    attunement_points: 4,
    fatigue_tolerance: 4,
    insight_points: 2,
    class_skill_count: 7,
    proficiencies: "Light armor, one weapon group, and saps",
  },
  sorcerer: {
    power: "normal",
    armor_defense: 0,
    fortitude: 3,
    reflex: 5,
    mental: 7,
    vital_rolls: 0,
    attunement_points: 5,
    fatigue_tolerance: 4,
    insight_points: 2,
    class_skill_count: 3,
    proficiencies: "None",
  },
  warlock: {
    power: "high",
    armor_defense: 0,
    fortitude: 5,
    reflex: 3,
    mental: 7,
    vital_rolls: 0,
    attunement_points: 4,
    fatigue_tolerance: 4,
    insight_points: 1,
    class_skill_count: 4,
    proficiencies: "Light armor",
  },
  wizard: {
    power: "normal",
    armor_defense: 0,
    fortitude: 3,
    reflex: 5,
    mental: 7,
    vital_rolls: 0,
    attunement_points: 5,
    fatigue_tolerance: 3,
    insight_points: 2,
    class_skill_count: 5,
    proficiencies: "None",
  },
  dragon: {
    power: "normal",
    armor_defense: 0,
    fortitude: 7,
    reflex: 3,
    mental: 5,
    vital_rolls: 1,
    attunement_points: 3,
    fatigue_tolerance: 5,
    insight_points: 2,
    class_skill_count: 4,
    proficiencies: "Light and medium armor",
  },
  oozeborn: {
    power: "normal",
    armor_defense: 0,
    fortitude: 7,
    reflex: 3,
    mental: 5,
    vital_rolls: 2,
    attunement_points: 3,
    fatigue_tolerance: 6,
    insight_points: 1,
    class_skill_count: 3,
    proficiencies: "Light armor",
  },
};
// const SPECIES_MODIFIERS = {
//   human: {
//     insight_points: 1,
//     nonclass_skill_count: 1,
//   },
//   dwarf: {
//     constitution: 1,
//     "craft (metal)": 2,
//     "craft (stone)": 2,
//     dexterity: -1,
//     speed: -5,
//   },
//   elf: {
//     constitution: -1,
//     mental: 1,
//     awareness: 2,
//     balance: 2,
//   },
//   gnome: {
//     strength: -1,
//     insight_points: 1,
//     speed: -5,
//     stealth: 2,
//   },
//   "half-elf": {
//     persuasion: 2,
//   },
//   "half-orc": {
//     strength: 1,
//   },
// };

function sumCustomModifiers(v, prefix) {
  let sum = 0;
  for (const name of customModifierNames(prefix)) {
    sum += v[name];
  }
  return sum;
}

function customModifierNames(prefix) {
  return CUSTOM_MODIFIER_TYPES.map((t) => `${prefix}_${t}_modifier`);
}

// variable types: boolean, miscName, numeric, string
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
  const variablesWithoutListen = options.variablesWithoutListen || {};
  for (const varType of ["boolean", "numeric", "string"]) {
    variables[varType] = variables[varType] || [];
    variablesWithoutListen[varType] = variablesWithoutListen[varType] || [];
  }
  if (options.includeLevel && !variables.numeric.includes("level")) {
    variables.numeric.push("level");
  }

  const miscVariables = generateMiscVariables(variables.miscName);

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
  const getVariables = [
    ...changeVariables,
    ...variablesWithoutListen.boolean,
    ...variablesWithoutListen.numeric,
    ...variablesWithoutListen.string,
  ];
  on(changeString, (eventInfo) => {
    getAttrs(getVariables, (attrs) => {
      const v = { eventInfo, misc: 0 };
      for (const b of variables.boolean.concat(
        variablesWithoutListen.boolean
      )) {
        v[b] = boolifySheetValue(attrs[b]);
      }
      for (const n of variables.numeric.concat(
        variablesWithoutListen.numeric
      )) {
        v[n] = Number(attrs[n] || 0);
      }
      for (const s of variables.string.concat(variablesWithoutListen.string)) {
        v[s] = attrs[s];
      }
      for (const m of miscVariables) {
        v.misc += Number(attrs[m] || 0);
      }
      callback(v);
    });
  });
}

function boolifySheetValue(val) {
  return Boolean(val === "on" || val === "1");
}

const SKILLS_BY_ATTRIBUTE = {
  strength: ["climb", "jump", "swim"],
  dexterity: ["balance", "flexibility", "ride", "sleight_of_hand", "stealth"],
  constitution: ["Endurance"],
  intelligence: [
    "craft_alchemy",
    "craft_bone",
    "craft_ceramics",
    "craft_jewelry",
    "craft_leather",
    "craft_manuscripts",
    "craft_metal",
    "craft_poison",
    "craft_stone",
    "craft_textiles",
    "craft_traps",
    "craft_wood",
    "craft_untrained",
    "deduction",
    "devices",
    "disguise",
    "knowledge_arcana",
    "knowledge_dungeoneering",
    "knowledge_engineering",
    "knowledge_items",
    "knowledge_local",
    "knowledge_nature",
    "knowledge_planes",
    "knowledge_religion",
    "knowledge_untrained",
    "linguistics",
    "medicine",
  ],
  perception: ["awareness", "creature_handling", "social_insight", "survival"],
  willpower: [],
  other: ["deception", "intimidate", "perform", "persuasion", "profession"],
};

const ALL_SKILLS = Object.values(SKILLS_BY_ATTRIBUTE).flat();

const SKILLS_WITH_SUBSKILLS = ["craft", "knowledge"];

function formatParseableSkillName(skillName) {
  if (!skillName) {
    return null;
  }
  return skillName
    .toLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("(", "")
    .replaceAll(")", "");
}

const VARIABLES_WITH_CUSTOM_MODIFIERS = new Set(
  [
    "accuracy",
    "all_defenses",
    "all_skills",
    "armor_defense",
    "attunement_points",
    "constitution",
    "damage_resistance_bonus",
    "dexterity",
    "encumbrance",
    "fatigue_tolerance",
    "fortitude",
    "hit_points",
    "initiative",
    "insight_points",
    "intelligence",
    "mental",
    "perception",
    "power",
    "reflex",
    "speed",
    "strength",
    "weapon_damage_dice",
    "nonclass_skill_count",
    "vital_rolls",
    "willpower",
  ].concat(ALL_SKILLS)
);

// Class and species, mostly
// Note: although class influences power, that is explicitly skipped here to resolve
// timing issues
const VARIABLES_WITH_CREATION_MODIFIERS = new Set([
  "armor_defense",
  "attunement_points",
  "class_skill_count",
  "dexterity",
  "fatigue_tolerance",
  "fortitude",
  "insight_points",
  "intelligence",
  "mental",
  "perception",
  "reflex",
  "speed",
  "strength",
  "vital_rolls",
  "willpower",
]);

const VARIABLES_WITH_DEBUFF_MODIFIERS = new Set([
  "accuracy",
  "armor_defense",
  "fortitude",
  "reflex",
  "mental",
]);

// Multipliers to resistances can't be incorporated into this simple handling
// because they are multipliers instead of modifiers.
const VARIABLES_WITH_VITAL_WOUND_MODIFIERS = new Set([
  "accuracy",
  "all_defenses",
  "speed",
]);

function generateMiscVariables(name) {
  if (!name) {
    return [];
  }
  const variables = [];
  if (VARIABLES_WITH_CUSTOM_MODIFIERS.has(name)) {
    for (const modifierType of CUSTOM_MODIFIER_TYPES) {
      variables.push(`${name}_${modifierType}_modifier`);
    }
  }
  if (VARIABLES_WITH_CREATION_MODIFIERS.has(name)) {
    variables.push(`${name}_creation_modifier`);
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
  handleAbilitiesKnown();
  handleAttackTargeting();
  handleAttunedEffects();
  handleAttributes();
  handleCoreStatistics();
  handleCreationModifiers();
  handleCustomModifiers();
  handleDebuffs();
  handleMonsterBaseClass();
  handleMonsterChatColor();
  handleResources();
  handleRust();
  handleSkills();
  handleVitalWounds();
}

function handleCoreStatistics() {
  handleAccuracy();
  handleDefenses();
  handleDamageDice();
  handleDamageResistance();
  handleEncumbrance();
  handleFatiguePenalty();
  handleHitPoints();
  handleInitiative();
  handleLandSpeed();
  handlePower();
  handleVitalRolls();
  handleUniversalAbilities();
  handleUnknownStatistic();
  handleWeaponDamageDice();
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
  handleTrainedSkills();
}

function addDiceIncrements(count, size, increments) {
  const all_dice_pools = [
    "1d1",
    "1d2",
    "1d3",
    "1d4",
    "1d6",
    "1d8",
    "1d10",
    "2d6",
    "2d8",
    "2d10",
    "4d6",
    "4d8",
    "4d10",
  ];
  const key = `${count}d${size}`;
  const initialIndex =
    count > 4
      ? count - 5 + all_dice_pools.length
      : all_dice_pools.findIndex((pool) => pool === key);
  const modifiedIndex = initialIndex + Number(increments);
  if (modifiedIndex >= all_dice_pools.length) {
    return {
      count: modifiedIndex - all_dice_pools.length + 5,
      size: 10,
    };
  } else if (modifiedIndex < 0) {
    return {
      count: 1,
      size: 1,
    };
  } else {
    const [count, size] = all_dice_pools[modifiedIndex].split("d");
    return { count, size };
  }
}

function formatDicePool(count, size, modifier) {
  let dice = `${count}d${size}`;
  if (modifier > 0) {
    return `${dice}+${modifier}`;
  } else if (modifier < 0) {
    return `${dice}${modifier}`;
  } else {
    return dice;
  }
}

function calcDefenseLevelScaling(level, challengeRating) {
  let levelScaling = Math.floor(level / 2);
  if (challengeRating > 0) {
    levelScaling += Math.max(0, Math.floor((level + 6) / 9));
  }
  if (challengeRating === 0.5) {
    levelScaling -= 1;
  } else if (challengeRating === 4) {
    levelScaling += 1;
  } else if (challengeRating === 6) {
    levelScaling += 2;
  }
  return levelScaling;
}

function parseDicePool(attack_damage_dice) {
  if (!attack_damage_dice) {
    return null;
  }
  let [count, size] = attack_damage_dice.split("d");
  let modifier = 0;
  if (!size) {
    return {
      count: null,
      modifier: Number(count) || null,
      size: null,
    };
  }

  // for example, "d4"
  if (!count) {
    count = 1;
  }
  if (size.includes("+")) {
    [size, modifier] = size.split("+");
  } else if (size.includes("-")) {
    [size, modifier] = size.split("-");
  }
  return {
    count: Number(count) || null,
    modifier: Number(modifier),
    size: Number(size),
  };
}

function handleAbilitiesKnown() {
  handleAbilityKnown("combat_styles");
  handleAbilityKnown("maneuvers");
  handleAbilityKnown("spells");
  handleAbilityKnown("spheres");
}

function handleAbilityKnown(abilityName) {
  onGet(
    {
      miscName: `${abilityName}_known`,
      numeric: [`${abilityName}_known_insight_points`],
    },
    (v) => {
      const totalValue = v[`${abilityName}_known_insight_points`] + v.misc;
      setAttrs({ [`${abilityName}_known`]: totalValue });
    }
  );
}

function handleAccuracy() {
  onGet(
    {
      miscName: "accuracy",
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

function handleActiveAbilityDice() {
  function getAbilityDicePoolAttrs(keyPrefix, callback) {
    return getDicePoolAttrs(
      keyPrefix,
      "dice_pool",
      "power_multiplier",
      callback
    );
  }

  // Local change
  on(
    "change:repeating_abilities:dice_pool" +
      " change:repeating_abilities:power_multiplier" +
      " change:repeating_abilities:is_magical",
    function () {
      const keyPrefix = "repeating_abilities";
      getAbilityDicePoolAttrs(keyPrefix, (parsed) => {
        const diceText = parsed.dicePoolWithModifier
          ? "{{Value=[[@{calculated_dice_and_modifier}]]}}"
          : "";
        setAttrs({
          [`${keyPrefix}_calculated_dice_and_modifier`]:
            parsed.dicePoolWithModifier,
          [`${keyPrefix}_calculated_dice_pool`]: parsed.dicePool,
          [`${keyPrefix}_calculated_modifier`]: parsed.modifier,
          [`${keyPrefix}_calculated_dice_and_modifier`]:
            parsed.dicePoolWithModifier,
          [`${keyPrefix}_dice_text`]: diceText,
        });
      });
    }
  );
}

function handleArmorDefense() {
  onGet(
    {
      miscName: "armor_defense",
      numeric: [
        "level",
        "dexterity",
        "constitution",
        "body_armor_defense",
        "shield_defense",
        "challenge_rating",
        "all_defenses_vital_wound_modifier",
      ],
      string: ["body_armor_usage_class", "shield_usage_class"],
    },
    (v) => {
      // calculate attributeModifier
      let attributeModifier = 0;
      if (v.challenge_rating > 0) {
        attributeModifier += Math.floor(v.constitution / 2);
      }
      const worstUsageClass =
        v.body_armor_usage_class === "heavy" || v.shield_usage_class === "heavy"
          ? "heavy"
          : v.body_armor_usage_class === "medium" ||
            v.shield_usage_class === "medium"
          ? "medium"
          : "light";
      if (worstUsageClass === "medium" || v.challenge_rating > 0) {
        attributeModifier += Math.floor(v.dexterity / 2);
      } else if (worstUsageClass === "light") {
        attributeModifier += v.dexterity;
      }

      const beforeEquipment =
        attributeModifier +
        calcDefenseLevelScaling(v.level, v.challenge_rating);
      const totalValue =
        beforeEquipment +
        v.body_armor_defense +
        v.shield_defense +
        v.misc +
        v.all_defenses_vital_wound_modifier;

      setAttrs({
        armor_defense: totalValue,
      });
    }
  );
}

function handleAttackTargeting() {
  for (const repeatingSection of [
    "repeating_strikeattacks",
    "repeating_otherdamagingattacks",
    "repeating_nondamagingattacks",
    "repeating_abilities",
  ]) {
    onGet(
      {
        boolean: [`${repeatingSection}_is_targeted`],
        string: [`${repeatingSection}_attack_defense`],
      },
      { includeLevel: false },
      (v) => {
        setAttackTargeting(repeatingSection, v);
      }
    );
    on("change:level", () => {
      getSectionIDs(repeatingSection, (repeatingSectionIds) => {
        for (const sectionId of repeatingSectionIds) {
          const sectionPrefix = `${repeatingSection}_${sectionId}`;
          getAttrs(
            [`${sectionPrefix}_is_targeted`, `${sectionPrefix}_attack_defense`],
            (v) => {
              v[`${sectionPrefix}_is_targeted`] = boolifySheetValue(
                v[`${sectionPrefix}_is_targeted`]
              );
              setAttackTargeting(sectionPrefix, v);
            }
          );
        }
      });
    });
  }
}

function setAttackTargeting(sectionPrefix, v) {
  const { defenseText, targetText } = calcAttackTargeting(
    v[`${sectionPrefix}_is_targeted`],
    v[`${sectionPrefix}_attack_defense`]
  );
  setAttrs({
    [`${sectionPrefix}_targeting_text`]: targetText,
    [`${sectionPrefix}_targeting_text_first_page`]: targetText.replace(
      "}}}",
      "}&#125;&#125;"
    ),
    [`${sectionPrefix}_attack_defense_text`]: defenseText,
  });
}

function calcAttackTargeting(isTargeted, rawDefense) {
  rawDefense = (rawDefense || "").toLowerCase();
  const targetText = isTargeted
    ? "{{Target=@{target|Defender|token_name}}}"
    : "";
  let actualDefenseText = "";
  if (isTargeted && rawDefense) {
    let actualDefense = null;
    // Try to guess the actual defense based on whatever freeform text was typed
    // in
    if (["armor", "a"].includes(rawDefense)) {
      actualDefense = "armor_defense";
    } else if (["fortitude", "fort", "f"].includes(rawDefense)) {
      actualDefense = "fortitude";
    } else if (["reflex", "ref", "r"].includes(rawDefense)) {
      actualDefense = "reflex";
    } else if (["mental", "ment", "m"].includes(rawDefense)) {
      actualDefense = "mental";
    }
    if (actualDefense) {
      // TODO: find a way to hide defenses of high CR enemies
      actualDefenseText = " (**@{target|Defender|" + actualDefense + "}**)";
    }
  }
  const defenseText = "@{attack_defense}" + actualDefenseText;
  return {
    defenseText,
    targetText,
  };
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
        numeric: [`${attributeName}_at_creation`],
      },
      (v) => {
        setAttrs({
          [attributeName]: v[`${attributeName}_at_creation`] + v.misc,
        });
      }
    );
  }
}

function handleAttunedEffects() {
  on(
    "change:repeating_attunedmodifiers remove:repeating_attunedmodifiers",
    function () {
      getSectionIDs("repeating_attunedmodifiers", (repeatingSectionIds) => {
        const isActiveIds = repeatingSectionIds.map(
          (id) => `repeating_attunedmodifiers_${id}_is_active`
        );
        getAttrs(isActiveIds, (values) => {
          const activeAbilities = isActiveIds.filter(
            (id) => values[id] == 1 || values[id] == "on"
          );
          setAttrs({
            active_attunement_count: activeAbilities.length,
          });
        });
      });
    }
  );
}

function handleAttunementPoints() {
  onGet(
    {
      miscName: "attunement_points",
      numeric: ["level"],
    },
    (v) => {
      const ap = v.misc;
      setAttrs({
        attunement_points: ap,
        attunement_points_max: ap,
        attunement_points_maximum: ap,
      });
    }
  );
}

// Note: although class influences power, that is explicitly skipped here to resolve
// timing issues
function handleCreationModifiers() {
  onGet(
    {
      numeric: ["archetype_rank_0", "archetype_rank_1", "archetype_rank_2"],
      string: ["base_class", "species"],
    },
    (v) => {
      const classModifiers = BASE_CLASS_MODIFIERS[v.base_class];

      // Class proficiencies and class skill count aren't modifiers. They are simply
      // directly set, since nothing else can modify them.
      const attrs = {
        base_class_proficiencies: classModifiers.proficiencies,
        class_skill_count: classModifiers.class_skill_count,
      };
      // The simple modifier keys can simply be directly translated
      for (const modifierKey of [
        "armor_defense",
        "fortitude",
        "reflex",
        "mental",
        "vital_rolls",
        "attunement_points",
        "fatigue_tolerance",
        "insight_points",
      ]) {
        attrs[`${modifierKey}_creation_modifier`] = classModifiers[modifierKey];
      }

      // const speciesModifiers = SPECIES_MODIFIERS[v.species];

      setAttrs(attrs);
    }
  );
}

function handleCustomModifiers() {
  for (const modifierType of CUSTOM_MODIFIER_TYPES) {
    on(
      `change:repeating_${modifierType}modifiers remove:repeating_${modifierType}modifiers`,
      function () {
        const nestedCustomStatisticCount = 3;
        const formatStatisticId = (id, i) =>
          `repeating_${modifierType}modifiers_${id}_statistic${i}`;
        const formatValueId = (id, i) =>
          `repeating_${modifierType}modifiers_${id}_value${i}`;
        const formatIsActiveId = (id) =>
          `repeating_${modifierType}modifiers_${id}_is_active`;

        getSectionIDs(
          `repeating_${modifierType}modifiers`,
          (repeatingSectionIds) => {
            const fullAttributeIds = [];
            for (const id of repeatingSectionIds) {
              fullAttributeIds.push(formatIsActiveId(id));
              for (let i = 0; i < nestedCustomStatisticCount; i++) {
                fullAttributeIds.push(formatStatisticId(id, i));
                fullAttributeIds.push(formatValueId(id, i));
              }
            }
            getAttrs(fullAttributeIds, (values) => {
              const totalCustomModifiers = {};
              for (const id of repeatingSectionIds) {
                // Permanent modifiers are always active; for temporary and attuned
                // modifiers, we have to check the value from the checkbox.
                const isActive =
                  modifierType === "permanent"
                    ? 1
                    : values[formatIsActiveId(id)];
                if (isActive === "on" || isActive == 1) {
                  for (let i = 0; i < nestedCustomStatisticCount; i++) {
                    const modifiedStatistic = values[formatStatisticId(id, i)];
                    const value = Number(values[formatValueId(id, i)]) || 0;
                    totalCustomModifiers[modifiedStatistic] =
                      (totalCustomModifiers[modifiedStatistic] || 0) + value;
                  }
                }
              }
              const attrs = {};
              for (const key of VARIABLES_WITH_CUSTOM_MODIFIERS) {
                attrs[`${key}_${modifierType}_modifier`] =
                  totalCustomModifiers[key] || 0;
              }
              setAttrs(attrs);
            });
          }
        );
      }
    );
  }
}

function handleDamageDice() {
  handleDicePoolAttributes();
  handleActiveAbilityDice();
  handleOtherDamagingAttacks();
  handleStrikeAttacks();
}

function handleDamageResistance() {
  onGet(
    {
      miscName: "damage_resistance_bonus",
      numeric: [
        "constitution",
        "level",
        "challenge_rating",
        "body_armor_damage_resistance",
        "damage_resistance_bonus_vital_wound_multiplier",
      ],
    },
    {
      variablesWithoutListen: {
        numeric: ["damage_resistance", "damage_resistance_maximum"],
      },
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
        (fromLevel + v.body_armor_damage_resistance + v.misc) *
          crMultiplier *
          // use math.max as a dumb hack so we can use negative values to mean "really zero,
          // don't || into 1"
          Math.max(0, v.damage_resistance_bonus_vital_wound_multiplier || 1)
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

function handleDebuffs() {
  onGet(
    {
      boolean: [
        // conditional debuffs
        "climbing",
        "flying",
        "flying_poorly",
        "goaded",
        "grappled",
        "helpless",
        "prone",
        "squeezing",
        "swimming",
        "partially_unaware",
        "unaware",
        // rank 1 debuffs
        "dazed",
        "dazzled",
        "shaken",
        "slowed",
        // rank 2 debuffs
        "frightened",
        "stunned",
        // rank 3 debuffs
        "confused",
        "blinded",
        "immobilized",
        "panicked",
        // rank 4 debuffs
        "asleep",
        "paralyzed",
      ],
    },
    (v) => {
      let accuracy = 0;
      let armor = 0;
      let fortitude = 0;
      let mental = 0;
      let reflex = 0;
      let debuffHeaders = "";

      // circumstantial effects
      if (v.grappled) {
        armor -= 2;
        reflex -= 2;
      }
      if (
        v.partially_unaware &&
        !(v.unaware || v.asleep || v.helpless || v.paralyzed || v.blinded)
      ) {
        armor -= 2;
        reflex -= 2;
      }
      if (v.unaware && !(v.asleep || v.helpless || v.paralyzed)) {
        armor -= 4;
        reflex -= 4;
      }
      if (v.squeezing) {
        accuracy -= 2;
        armor -= 2;
        reflex -= 2;
      }
      if (v.flying && !v.flying_poorly) {
        armor -= 2;
        reflex -= 2;
      }
      if (v.flying_poorly) {
        armor -= 4;
        reflex -= 4;
      }
      if (v.climbing || v.swimming) {
        accuracy -= 4;
        armor -= 4;
        reflex -= 4;
      }
      if (v.prone) {
        armor -= 2;
        reflex -= 2;
      }

      // rank 1 debuffs
      if (v.dazed && !(v.stunned || v.confused)) {
        armor -= 2;
        fortitude -= 2;
        mental -= 2;
        reflex -= 2;
      }
      if (v.dazzled && !v.blinded) {
        debuffHeaders += " {{Miss chance=Miss on 1: [[d4]]}}";
      }
      if (v.blinded) {
        debuffHeaders += " {{Miss chance=Miss on 1: [[d2]]}}";
      }
      if (
        v.blinded &&
        !(
          v.unaware ||
          v.partially_unaware ||
          v.asleep ||
          v.helpless ||
          v.paralyzed
        )
      ) {
        armor -= 2;
        reflex -= 2;
      }
      if (v.goaded) {
        debuffHeaders += " {{Goaded=+2 accuracy vs source}}";
        accuracy -= 2;
      }
      if (v.shaken && !v.frightened && !v.panicked) {
        accuracy -= 2;
        mental -= 2;
      }
      if (v.slowed && !v.immobilized) {
        reflex -= 2;
      }

      // rank 2 debuffs
      if (v.frightened && !v.panicked) {
        accuracy -= 4;
        mental -= 4;
      }
      if (v.stunned || v.confused) {
        armor -= 4;
        fortitude -= 4;
        reflex -= 4;
        mental -= 4;
      }

      // rank 3 debuffs
      if (v.immobilized) {
        reflex -= 4;
      }
      if (v.panicked) {
        mental -= 4;
      }
      if (v.asleep || v.helpless || v.paralyzed) {
        armor -= 10;
        reflex -= 10;
      }

      setAttrs({
        accuracy_debuff_modifier: accuracy,
        armor_defense_debuff_modifier: armor,
        fortitude_debuff_modifier: fortitude,
        mental_debuff_modifier: mental,
        reflex_debuff_modifier: reflex,
        debuff_headers: debuffHeaders.trim(),
      });
    }
  );
}

function handleEncumbrance() {
  onGet(
    {
      miscName: "encumbrance",
      numeric: [
        "level",
        "body_armor_encumbrance",
        "shield_encumbrance",
        "strength",
      ],
    },
    (v) => {
      const totalValue = Math.max(
        0,
        v.body_armor_encumbrance +
          v.shield_encumbrance -
          Math.max(0, v.strength) -
          v.misc
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
      numeric: ["level", "constitution", "willpower"],
    },
    (v) => {
      const fromAttributes = v.constitution + Math.floor(v.willpower / 2);
      const totalValue = Math.max(0, fromAttributes + v.misc);
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
      numeric: ["level", "constitution", "challenge_rating"],
    },
    {
      variablesWithoutListen: {
        numeric: ["hit_points", "hit_points_maximum"],
      },
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

      const totalValue = Math.floor((hpFromLevel + v.misc) * crMultiplier);

      let attrs = {
        hit_points_from_level: hpFromLevel * crMultiplier,
        hit_points_max: totalValue,
        hit_points_maximum: totalValue,
      };
      let shouldSetCurrentHp =
        totalValue < v.hit_points ||
        v.hit_points === v.hit_points_maximum ||
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
      numeric: ["intelligence"],
    },
    (v) => {
      const totalValue = Math.max(0, v.intelligence + v.misc);
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
      numeric: ["speed_size", "body_armor_speed"],
    },
    (v) => {
      // TODO: handle size more correctly
      const totalValue = 30 + v.body_armor_speed + v.misc;
      setAttrs({
        land_speed: totalValue,
      });
    }
  );
}

function handleMonsterChatColor() {
  onGet(
    {
      numeric: ["challenge_rating"],
    },
    (v) => {
      if (v.challenge_rating > 0) {
        setAttrs({
          chat_color: "monster",
        });
      }
    }
  );
}

function handleNonArmorDefense(defense, attribute) {
  onGet(
    {
      miscName: defense,
      numeric: [
        "level",
        attribute,
        "challenge_rating",
        "all_defenses_vital_wound_modifier",
      ],
    },
    (v) => {
      const totalValue =
        calcDefenseLevelScaling(v.level, v.challenge_rating) +
        v[attribute] +
        v.misc +
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
      numeric: [
        "challenge_rating",
        "archetype_rank_0",
        "archetype_rank_1",
        "archetype_rank_2",
      ],
      string: ["base_class"],
    },
    (v) => {
      // TODO: confirm that the rank is actually from the character's base class
      const maxRank = Math.max(
        v.archetype_rank_0,
        v.archetype_rank_1,
        v.archetype_rank_2
      );
      const classPowerProgression = BASE_CLASS_MODIFIERS[v.base_class].power;
      let classPowerModifier = 0;
      if (classPowerProgression === "fast") {
        classPowerModifier = {
          1: 3,
          2: 4,
          3: 5,
          4: 7,
          5: 10,
          6: 14,
          7: 20,
        }[maxRank];
      } else if (classPowerProgression === "normal") {
        classPowerModifier = {
          1: 2,
          2: 3,
          3: 4,
          4: 6,
          5: 8,
          6: 12,
          7: 16,
        }[maxRank];
      } else if (classPowerProgression === "monster") {
        classPowerModifier = {
          0: 1,
          1: 2,
          2: 3,
          3: 4,
          4: 6,
          5: 8,
          6: 12,
          7: 16,
          8: 24,
        }[Math.floor((v.level + 2) / 3)];
        classPowerModifier =
          classPowerModifier *
          (v.challenge_rating
            ? {
                0.5: 0.5,
                1: 1,
                2: 2,
                4: 2,
                6: 3,
              }[v.challenge_rating]
            : 0);
      }

      setAttrs({
        power: classPowerModifier + v.misc,
      });
    }
  );
}

function handleRust() {
  onGet(
    {
      numeric: [
        "level",
        "challenge_rating",
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "perception",
        "willpower",
      ],
      string: [
        "alignment",
        "character_name",
        "size",
        "weapon_0_name",
        "weapon_1_name",
        "weapon_2_name",
      ],
    },
    (v) => {
      const alignment = v.alignment ? `Usually ${v.alignment}` : "";
      const attributes = [
        v.strength,
        v.dexterity,
        v.constitution,
        v.intelligence,
        v.perception,
        v.willpower,
      ];
      const cr = {
        0.5: "Half",
        1: "One",
        2: "Two",
        4: "Four",
        6: "Six",
      }[v.challenge_rating];
      const weapons = [];
      for (const weaponName of [
        v.weapon_0_name,
        v.weapon_1_name,
        v.weapon_2_name,
      ]) {
        if (weaponName) {
          weapons.push(`StandardWeapon::${weaponName}.weapon()`);
        }
      }
      const weaponText = `vec![${weapons.join(", ")}]`;
      const rust = `
                FullMonsterDefinition {
                    alignment: "${alignment}",
                    attributes: vec![${attributes.join(", ")}],
                    challenge_rating: ChallengeRating::${cr},
                    description: None,
                    knowledge: None,
                    level: ${v.level},
                    modifiers: None,
                    movement_modes: None,
                    name: "${v.character_name}",
                    senses: None,
                    size: Size::${v.size || "Medium"},
                    trained_skills: None,
                    weapons: ${weaponText},
                }
            `.trim();
      setAttrs({
        rust,
        is_monster: v.challenge_rating > 0 ? "1" : "0",
      });
    }
  );
}

function handleSkillPoints() {
  onGet(
    {
      miscName: "nonclass_skill_count",
      numeric: ["intelligence"],
    },
    (v) => {
      const fromInt = Math.max(0, v.intelligence);
      setAttrs({
        nonclass_skill_count: fromInt + v.misc,
      });
    }
  );
}

function handleTrainedSkills() {
  on(`change:repeating_trainedskills`, function (eventInfo) {
    const trainedSkill = formatParseableSkillName(eventInfo.newValue);
    const untrainedSkill = formatParseableSkillName(eventInfo.previousValue);

    const attrs = {};
    if (trainedSkill) {
      attrs[`${trainedSkill}_is_trained`] = "1";
    }
    if (untrainedSkill && untrainedSkill !== trainedSkill) {
      attrs[`${untrainedSkill}_is_trained`] = "0";
    }

    let untrainedFromRootSkill = null;
    for (const skillWithSubskill of SKILLS_WITH_SUBSKILLS) {
      if (trainedSkill && trainedSkill.startsWith(skillWithSubskill)) {
        const subskill = trainedSkill.replace(skillWithSubskill + "_", "");
        const rowId = generateRowID();
        const prefix = `repeating_${skillWithSubskill}subskills_${rowId}`;
        attrs[`${trainedSkill}_subskill_rowid`] = rowId;
        attrs[
          `${prefix}_subskill_modifier_name`
        ] = `${skillWithSubskill}_${subskill}`;
        const fullSkillDescriptor =
          uppercaseFirstLetter(skillWithSubskill) + ` (${subskill})`;
        attrs[`${prefix}_subskill_button`] =
          `@{character_name} uses ${fullSkillDescriptor}:` +
          ` [[d10 + @{${trainedSkill}}]]`;
        attrs[`${prefix}_subskill_name`] = `(${subskill})`;
        attrs[`${eventInfo.triggerName}_front_rowid`] = rowId;
      }

      if (
        untrainedSkill &&
        untrainedSkill !== trainedSkill &&
        untrainedSkill.startsWith(skillWithSubskill)
      ) {
        untrainedFromRootSkill = skillWithSubskill;
      }
    }

    // Need to resolve the whole getAttrs flow before calling setAttrs
    if (untrainedFromRootSkill) {
      const rowIdKey = `${eventInfo.triggerName}_front_rowid`;
      getAttrs([rowIdKey], (v) => {
        const rowId = v[rowIdKey];
        removeRepeatingRow(
          `repeating_${untrainedFromRootSkill}subskills_${rowId}`
        );
        attrs[`${untrainedSkill}_subskill_rowid`] = "";
        setAttrs(attrs);
      });
    } else {
      setAttrs(attrs);
    }
  });

  on(`remove:repeating_trainedskills`, function (eventInfo) {
    const skillNameKey = Object.keys(eventInfo.removedInfo).find((k) =>
      k.endsWith("trained_skill")
    );
    const untrainedSkill = formatParseableSkillName(
      eventInfo.removedInfo[skillNameKey]
    );
    if (!untrainedSkill) {
      return;
    }
    const attrs = {
      [`${untrainedSkill}_is_trained`]: "0",
    };
    for (const skillWithSubskill of SKILLS_WITH_SUBSKILLS) {
      if (untrainedSkill.startsWith(skillWithSubskill)) {
        const rowIdKey = Object.keys(eventInfo.removedInfo).find((k) =>
          k.endsWith("front_rowid")
        );
        const rowId = eventInfo.removedInfo[rowIdKey];
        removeRepeatingRow(`repeating_${skillWithSubskill}subskills_${rowId}`);
        attrs[`${untrainedSkill}_subskill_rowid`] = "";
      }
    }
    setAttrs(attrs);
  });

  const skillsAreTrained = ALL_SKILLS.map(
    (s) => s.toLowerCase().replaceAll(" ", "_") + "_is_trained"
  );

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
      const numeric = [
        "fatigue_penalty",
        "level",
        ...customModifierNames("all_skills"),
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
          numeric,
          string: [`${skill}_subskill_rowid`],
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
            sumCustomModifiers(v, "all_skills") -
            v.fatigue_penalty -
            encumbranceModifier;

          const attrs = {
            [`${skill}_attribute`]: attributeModifier,
            [`${skill}_level`]: fromTraining,
            [`${skill}_total`]: skillValue,
            [skill]: skillValue,
          };

          const rowId = v[`${skill}_subskill_rowid`];
          if (rowId) {
            // This is fragile - if either the base skill could contain
            // multiple words, we'd need more clever handling
            const [baseSkill] = skill.split("_");
            attrs[
              `repeating_${baseSkill}subskills_${rowId}_subskill_modifier`
            ] = skillValue;
          }

          setAttrs(attrs);
        }
      );
    }
  }
}

function uppercaseFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function handleDicePoolAttributes() {
  onGet(
    {
      numeric: ["strength", "intelligence", "willpower"],
      string: ["feat_name_0", "feat_name_1", "feat_name_2", "feat_name_3"],
    },
    (v) => {
      const feats = [
        v.feat_name_0,
        v.feat_name_1,
        v.feat_name_2,
        v.feat_name_3,
      ];
      const magicalAttribute = feats.includes("Precognition")
        ? Math.max(v.willpower, v.intelligence)
        : v.willpower;
      const mundaneAttribute = feats.includes("Precognition")
        ? Math.max(v.strength, v.intelligence)
        : v.strength;
      setAttrs({
        magical_dice_pool_modifier: Math.floor(magicalAttribute / 2),
        mundane_dice_pool_modifier: Math.floor(mundaneAttribute / 2),
      });
    }
  );
}

function getDicePoolAttrs(
  keyPrefix,
  dicePoolKey,
  powerMultiplierKey,
  callback
) {
  dicePoolKey = `${keyPrefix}_${dicePoolKey}`;
  powerMultiplierKey = `${keyPrefix}_${powerMultiplierKey}`;
  const isMagicalKey = `${keyPrefix}_is_magical`;
  getAttrs(
    [
      "magical_dice_pool_modifier",
      "mundane_dice_pool_modifier",
      "power",
      dicePoolKey,
      powerMultiplierKey,
      isMagicalKey,
    ],
    function (v) {
      let dicePoolModifier =
        v[isMagicalKey] === "1"
          ? Number(v.magical_dice_pool_modifier)
          : Number(v.mundane_dice_pool_modifier);
      callback(
        calculateDicePoolModifier({
          dicePool: v[dicePoolKey],
          dicePoolModifier,
          power: Number(v.power),
          powerMultiplier: Number(v[powerMultiplierKey]),
        })
      );
    }
  );
}

function setCalculatedDicePool(
  keyPrefix,
  { dicePoolWithModifier, dicePool, modifier }
) {
  setAttrs({
    [`${keyPrefix}_calculated_dice_and_modifier`]: dicePoolWithModifier,
    [`${keyPrefix}_calculated_dice_pool`]: dicePool,
    [`${keyPrefix}_calculated_modifier`]: modifier,
  });
}

function calculateDicePoolModifier({
  dicePool,
  dicePoolModifier,
  power,
  powerMultiplier,
}) {
  dicePool = parseDicePool(dicePool);
  let totalDamage = "";
  let totalDamageDice = "";
  let totalDamageModifier = "";
  if (dicePool) {
    const modifier = dicePool.modifier + Math.floor(power * powerMultiplier);

    if (dicePool.count) {
      let { count, size } = addDiceIncrements(
        dicePool.count,
        dicePool.size,
        dicePoolModifier
      );
      totalDamage = formatDicePool(count, size, modifier);
      totalDamageDice = formatDicePool(count, size, 0);
    } else {
      totalDamage = modifier;
    }
    totalDamageModifier = modifier;
  }
  return {
    dicePoolWithModifier: totalDamage,
    dicePool: totalDamageDice,
    modifier: totalDamageModifier,
  };
}

function handleOtherDamagingAttacks() {
  // We need two functions here! One updates a specific attack when that
  // specific attack changes, and one updates *all* attacks when general
  // character changes happen.
  function getOdaDamageDiceAttrs(keyPrefix, callback) {
    return getDicePoolAttrs(
      keyPrefix,
      "attack_damage_dice",
      "attack_power",
      callback
    );
  }

  // Local other damaging attack change
  on(
    "change:repeating_otherdamagingattacks:attack_damage_dice" +
      " change:repeating_otherdamagingattacks:attack_power" +
      " change:repeating_otherdamagingattacks:is_magical",
    function () {
      getOdaDamageDiceAttrs("repeating_otherdamagingattacks", (parsed) => {
        setCalculatedDicePool("repeating_otherdamagingattacks", parsed);
      });
    }
  );

  // Global other damaging attack change
  on(
    "change:mundane_dice_pool_modifier change:magical_dice_pool_modifier" +
      " change:power change:level",
    function () {
      getSectionIDs("repeating_otherdamagingattacks", (repeatingSectionIds) => {
        for (const sectionId of repeatingSectionIds) {
          getOdaDamageDiceAttrs(
            `repeating_otherdamagingattacks_${sectionId}`,
            (parsed) => {
              setCalculatedDicePool(
                `repeating_otherdamagingattacks_${sectionId}`,
                parsed
              );
            }
          );
        }
      });
    }
  );
}

function handleStrikeAttacks() {
  function getStrikeAttrs(sectionId, callback) {
    if (sectionId) {
      sectionId = sectionId + "_";
    }
    const attack_power_key = `repeating_strikeattacks_${sectionId}attack_power`;
    const damage_modifier_key = `repeating_strikeattacks_${sectionId}attack_damage_modifier`;
    const is_magical_key = `repeating_strikeattacks_${sectionId}is_magical`;
    const weapon_keys = [];
    for (let i = 0; i < 3; i++) {
      weapon_keys.push(`weapon_${i}_magical_dice`);
      weapon_keys.push(`weapon_${i}_mundane_dice`);
    }
    getAttrs(
      [
        attack_power_key,
        damage_modifier_key,
        is_magical_key,
        ...weapon_keys,
        "power",
      ],
      function (v) {
        const dice_type = v[is_magical_key] === "1" ? "magical" : "mundane";

        const weaponDice = [];
        for (let i = 0; i < 3; i++) {
          weaponDice.push(v[`weapon_${i}_${dice_type}_dice`]);
        }
        callback({
          attackPower: Number(v[attack_power_key]),
          damageModifier: Number(v[damage_modifier_key]),
          power: Number(v.power),
          weaponDice,
        });
      }
    );
  }

  function getWeaponDamageDiceAttrs(weaponIndex, callback) {
    const weapon_damage_key = `weapon_${weaponIndex}_damage_dice`;
    getAttrs(
      [
        "mundane_dice_pool_modifier",
        "magical_dice_pool_modifier",
        "weapon_damage_dice",
        weapon_damage_key,
      ],
      function (v) {
        const parsedAttrs = {
          allWeaponsDamageDiceBonus: Number(v.weapon_damage_dice) || 0,
          magicalDicePoolModifier: Number(v.magical_dice_pool_modifier) || 0,
          mundaneDicePoolModifier: Number(v.mundane_dice_pool_modifier) || 0,
          weaponDamageDice: v[weapon_damage_key],
        };
        callback(parsedAttrs);
      }
    );
  }

  function calcWeaponDamageStrings(v) {
    const dicePool = parseDicePool(v.weaponDamageDice);
    if (!dicePool) {
      return {
        magical: "",
        mundane: "",
      };
    }
    let with_global_bonus = addDiceIncrements(
      dicePool.count,
      dicePool.size,
      v.allWeaponsDamageDiceBonus
    );
    let magical = addDiceIncrements(
      with_global_bonus.count,
      with_global_bonus.size,
      v.magicalDicePoolModifier
    );
    let mundane = addDiceIncrements(
      with_global_bonus.count,
      with_global_bonus.size,
      v.mundaneDicePoolModifier
    );
    return {
      magical: formatDicePool(magical.count, magical.size, dicePool.modifier),
      mundane: formatDicePool(mundane.count, mundane.size, dicePool.modifier),
    };
  }

  function setStrikeTotalDamage(sectionId, parsed) {
    if (sectionId) {
      sectionId += "_";
    }
    const attrs = {};
    for (let i = 0; i < 3; i++) {
      const weapon_prefix = `repeating_strikeattacks_${sectionId}weapon_${i}_`;
      const weaponDice = parseDicePool(parsed.weaponDice[i]);
      let total_damage = "";
      let total_damage_dice = "";
      let total_damage_modifier = "";
      if (weaponDice) {
        const modifier =
          weaponDice.modifier +
          Math.floor(parsed.power * parsed.attackPower) +
          parsed.damageModifier;
        total_damage = formatDicePool(
          weaponDice.count,
          weaponDice.size,
          modifier
        );
        total_damage_dice = formatDicePool(
          weaponDice.count,
          weaponDice.size,
          0
        );
        total_damage_modifier = modifier;
      }
      attrs[weapon_prefix + "total_damage"] = total_damage;
      attrs[weapon_prefix + "total_damage_dice"] = total_damage_dice;
      attrs[weapon_prefix + "total_damage_modifier"] = total_damage_modifier;
    }
    setAttrs(attrs);
  }

  // Local strike attack change
  on(
    "change:repeating_strikeattacks:is_magical change:repeating_strikeattacks:attack_power change:repeating_strikeattacks:attack_damage_modifier",
    function () {
      getStrikeAttrs("", (parsed) => {
        setStrikeTotalDamage("", parsed);
      });
    }
  );

  // Global strike attack change
  on(
    "change:weapon_0_magical_dice change:weapon_1_magical_dice change:weapon_2_magical_dice" +
      " change:level change:power",
    function () {
      getSectionIDs("repeating_strikeattacks", (repeatingSectionIds) => {
        for (const sectionId of repeatingSectionIds) {
          getStrikeAttrs(sectionId, (parsed) => {
            setStrikeTotalDamage(sectionId, parsed);
          });
        }
      });
    }
  );

  // Weapon change
  for (let i = 0; i < 3; i++) {
    on(
      `change:weapon_${i}_damage_dice` +
        " change:feat_name_0 change:feat_name_1 change:feat_name_2 change:feat_name_3" +
        " change:level change:weapon_damage_dice" +
        " change:strength change:intelligence change:willpower",
      function () {
        getWeaponDamageDiceAttrs(i, (parsed) => {
          const { magical, mundane } = calcWeaponDamageStrings(parsed);
          setAttrs({
            [`weapon_${i}_magical_dice`]: magical,
            [`weapon_${i}_mundane_dice`]: mundane,
          });
        });
      }
    );
  }

  // Changing whether a strike is targeted
}

function handleUniversalAbilities() {
  onGet({ numeric: ["strength", "level", "accuracy", "flexibility"] }, (v) => {
    setAttrs({
      escape_grapple_accuracy: Math.max(
        v.accuracy,
        Math.floor(v.level / 2) + v.strength,
        v.flexibility_total
      ),
      maintain_grapple_accuracy: Math.max(
        v.accuracy,
        Math.floor(v.level / 2) + v.strength
      ),
    });
  });
}

function handleUnknownStatistic() {
  onGet({ miscName: "unknown_statistic" }, (v) => {
    setAttrs({
      unknown_statistic: v.misc,
    });
  });
}

function handleVitalRolls() {
  onGet(
    {
      miscName: "vital_rolls",
      numeric: ["vital_wound_count"],
    },
    (v) => {
      const totalValue = v.misc - v.vital_wound_count * 2;
      setAttrs({ vital_rolls: totalValue });
    }
  );
}

function handleVitalWounds() {
  function calcVitalWoundEffect(roll) {
    roll = Number(roll);
    if (roll <= -1) {
      return "Unconscious, die next round";
    } else if (roll >= 10) {
      return "No effect";
    }
    return {
      0: "Unconscious, die after a minute",
      1: "Unconscious below max HP",
      2: "-10 foot speed",
      3: "-5 foot speed",
      4: "Max DR is 0",
      5: "Half max DR",
      6: "-2 accuracy",
      7: "-1 accuracy",
      8: "-2 defenses",
      9: "-1 defenses",
    }[roll];
  }

  function countRolls(rolls, value) {
    return rolls.filter((r) => r == value).length;
  }

  on(
    "change:repeating_vitalwounds:vital_wound_roll remove:repeating_vitalwounds",
    function (eventInfo) {
      getSectionIDs("repeating_vitalwounds", (repeatingSectionIds) => {
        const vitalWoundRollIds = repeatingSectionIds.map(
          (id) => `repeating_vitalwounds_${id}_vital_wound_roll`
        );
        getAttrs(vitalWoundRollIds, (values) => {
          let rolls = Object.values(values);
          let accuracy_penalty =
            -countRolls(rolls, 6) * 2 - countRolls(rolls, 7);
          let defense_penalty =
            -countRolls(rolls, 8) * 2 - countRolls(rolls, 9);
          let speed_penalty =
            countRolls(rolls, 2) * -10 + countRolls(rolls, 3) * -5;
          let resistance_multiplier =
            countRolls(rolls, 4) > 0
              ? // dumb hack since we use || and I'm too lazy to fix it
                -1
              : 0.5 ** countRolls(rolls, 5);
          let attrs = {
            vital_wound_count: repeatingSectionIds.length,

            accuracy_vital_wound_modifier: accuracy_penalty,
            all_defenses_vital_wound_modifier: defense_penalty,
            speed_vital_wound_modifier: speed_penalty,
            damage_resistance_bonus_vital_wound_multiplier:
              resistance_multiplier,
          };
          if (eventInfo.triggerName != "remove:repeating_vitalwounds") {
            let effect_id = eventInfo.sourceAttribute.replaceAll(
              "_roll",
              "_effect"
            );
            attrs[effect_id] = calcVitalWoundEffect(eventInfo.newValue);
          }
          setAttrs(attrs);
        });
      });
    }
  );
}

function handleWeaponDamageDice() {
  onGet(
    {
      miscName: "weapon_damage_dice",
      numeric: ["level", "challenge_rating", "strength"],
    },
    (v) => {
      const fromCr = v.challenge_rating > 0 ? Math.floor((v.level - 1) / 3) : 0;
      const totalValue = fromCr + v.misc;
      setAttrs({
        weapon_damage_dice: totalValue,
        weapon_damage_dice_including_strength:
          totalValue + Math.floor(v.strength / 2),
      });
    }
  );
}

function handleMonsterBaseClass() {
  onGet(
    {
      numeric: ["challenge_rating"],
    },
    (v) => {
      if (v.challenge_rating > 0) {
        setAttrs({ base_class: "monster" });
      }
    }
  );
}

handleEverything();
