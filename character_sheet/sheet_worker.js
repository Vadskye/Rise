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

const variablesWithCustomModifiers = new Set([
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

// Multipliers to HP and resistances can't be incorporated into this simple handling
// because they are multipliers instead of modifiers.
const variablesWithVitalWoundModifiers = new Set([
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
  if (variablesWithCustomModifiers.has(name)) {
    variables.push(`${name}_custom_modifier`);
  }
  if (variablesWithVitalWoundModifiers.has(name)) {
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
