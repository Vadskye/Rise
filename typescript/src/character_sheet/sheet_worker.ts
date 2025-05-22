import roll20shim from './roll20_shim';
const { on, getAttrs, setAttrs, getSectionIDs, generateRowID, removeRepeatingRow } = roll20shim;

export type SimpleValue = boolean | number | string | null | undefined;
export interface EventInfo {
  newValue: SimpleValue | undefined;
  previousValue: SimpleValue | undefined;
  removedInfo: Record<string, string>;
  sourceAttribute: string;
  triggerName: string;
}
export type Attrs = Record<string, any>;

type CustomModifierType = 'attuned' | 'legacy' | 'temporary' | 'permanent';
const CUSTOM_MODIFIER_TYPES: CustomModifierType[] = ['attuned', 'legacy', 'temporary', 'permanent'];

type CreatureSize =
  | 'fine'
  | 'diminutive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal';
type ProgressionName = 'low' | 'medium' | 'high' | 'very high' | 'extreme';

interface BaseClassModifier {
  armor_defense: number;
  armor_usage_class?: 'light' | 'medium' | 'heavy';
  damage_resistance?: ProgressionName;
  hit_points: ProgressionName;
  brawn: number;
  fortitude: number;
  reflex: number;
  mental: number;
  attunement_points?: number;
  insight_points?: number;
  class_skill_count?: number;
  proficiencies?: string;
}

// Treat roles as classes too.
// Most role modifiers are handled automatically in `handleCreationModifiers`.
// However, armor_usage_class needs custom handling in `handleArmorDefense`.
const BASE_CLASS_MODIFIERS: Record<string, BaseClassModifier> = {
  // ROLES
  brute: {
    armor_defense: 4,
    armor_usage_class: 'medium',
    damage_resistance: 'medium',
    hit_points: 'extreme',
    brawn: 2,
    fortitude: 1,
    reflex: 1,
    mental: 0,
  },
  leader: {
    armor_defense: 4,
    armor_usage_class: 'medium',
    damage_resistance: 'high',
    hit_points: 'very high',
    brawn: 1,
    fortitude: 1,
    reflex: 1,
    mental: 1,
  },
  mystic: {
    armor_defense: 3,
    armor_usage_class: 'medium',
    damage_resistance: 'very high',
    hit_points: 'high',
    brawn: 0,
    fortitude: 1,
    reflex: 2,
    mental: 3,
  },
  skirmisher: {
    armor_defense: 4,
    armor_usage_class: 'medium',
    damage_resistance: 'medium',
    hit_points: 'very high',
    brawn: 1,
    fortitude: 0,
    reflex: 2,
    mental: 1,
  },
  sniper: {
    armor_defense: 3,
    armor_usage_class: 'medium',
    damage_resistance: 'medium',
    hit_points: 'high',
    brawn: 0,
    fortitude: 0,
    reflex: 2,
    mental: 2,
  },
  warrior: {
    armor_defense: 5,
    armor_usage_class: 'heavy',
    damage_resistance: 'very high',
    hit_points: 'high',
    brawn: 0,
    fortitude: 2,
    reflex: 0,
    mental: 0,
  },

  // CLASSES
  barbarian: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'very high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light and medium armor, and non-exotic weapons',
  },
  cleric: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 2,
    hit_points: 'medium',
    attunement_points: 1,
    insight_points: 1,
    class_skill_count: 3,
    proficiencies: 'Light and medium armor',
  },
  druid: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'medium',
    attunement_points: 1,
    insight_points: 1,
    class_skill_count: 4,
    proficiencies:
      "Light armor, leather lamellar armor, standard shields, shepherd's axe, scimitars, and sickles",
  },
  fighter: {
    armor_defense: 1,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 3,
    proficiencies: 'All armor and non-exotic weapons',
  },
  monk: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor and monk weapons',
  },
  paladin: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 3,
    proficiencies: 'All armor and non-exotic weapons',
  },
  ranger: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 6,
    proficiencies: 'Light and medium armor, leather lamellar armor, and non-exotic weapons',
  },
  rogue: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'medium',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 6,
    proficiencies: 'Light armor, Compact weapons, and Light weapons',
  },
  sorcerer: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'medium',
    attunement_points: 2,
    insight_points: 0,
    class_skill_count: 3,
    proficiencies: 'None',
  },
  votive: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 2,
    hit_points: 'medium',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 3,
    proficiencies: 'Light and medium armor, and non-exotic weapons',
  },
  wizard: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'low',
    attunement_points: 2,
    insight_points: 2,
    class_skill_count: 4,
    proficiencies: 'None',
  },

  // OPTIONAL CLASSES
  automaton: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'All armor and non-exotic weapons',
  },
  dragon: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 5,
    proficiencies: 'Light armor',
  },
  dryad: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 2,
    hit_points: 'low',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor',
  },
  harpy: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'medium',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor',
  },
  naiad: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 1,
    mental: 1,
    hit_points: 'low',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor',
  },
  oozeborn: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'very high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 3,
    proficiencies: 'Light armor',
  },
  treant: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 2,
    reflex: 0,
    mental: 0,
    hit_points: 'very high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'All armor and club-like weapons',
  },
  troll: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'very high',
    attunement_points: 0,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor, leather lamellar, standard shields, and club-like weapons',
  },
  vampire: {
    armor_defense: 0,
    brawn: 0,
    fortitude: 0,
    reflex: 0,
    mental: 0,
    hit_points: 'high',
    attunement_points: 1,
    insight_points: 0,
    class_skill_count: 4,
    proficiencies: 'Light armor and non-exotic weapons',
  },
};

const ATTRIBUTE_SHORTHAND: Record<string, string> = {
  strength: 'Str',
  dexterity: 'Dex',
  constitution: 'Con',
  intelligence: 'Int',
  perception: 'Per',
  willpower: 'Wil',
  other: 'Other',
};

const supportedWeaponCount = 4;

type ChallengeRating = 1 | 4;

type V = {
  // Mandatory fields we know exist
  eventInfo: EventInfo;
  misc: number;
  miscExplanation: string;
} & {
  // Optional fields with specific types
  challenge_rating?: ChallengeRating;
  size?: CreatureSize;
} & Record<string, any>;

function roundToFiveFootIncrements(val: number): number {
  return Math.floor(Math.floor(val) / 5) * 5;
}

function sumCustomModifiers(v: V, prefix: string): number {
  let sum = 0;
  for (const name of customModifierNames(prefix)) {
    sum += Number(v[name]);
  }
  return sum;
}

function customModifierNames(prefix: string): string[] {
  return CUSTOM_MODIFIER_TYPES.map((t) => `${prefix}_${t}_modifier`);
}

// Define specific types for variables and options
interface OnGetVariables {
  boolean: string[];
  miscName?: string;
  numeric: string[];
  string: string[];
}

interface OnGetOptions {
  includeLevel?: boolean;
  runOnSheetOpen?: boolean;
  variablesWithoutListen?: Partial<OnGetVariables>;
}

function onGet(args: {
  variables: Partial<OnGetVariables>;
  options?: OnGetOptions;
  callback: (v: V) => void;
}): void {
  const options = args.options ? args.options : { includeLevel: true, runOnSheetOpen: true };
  const callback = args.callback;
  const { variables, variablesWithoutListen } = initializeOnGetVariables({
    variables: args.variables,
    variablesWithoutListen: options.variablesWithoutListen || {},
  });
  if (options.includeLevel && !variables.numeric.includes('level')) {
    variables.numeric.push('level');
  }

  const miscVariables = generateMiscVariables(variables.miscName);

  const changeVariables = [
    ...variables.boolean,
    ...variables.numeric,
    ...variables.string,
    ...miscVariables.explanationVariables,
    ...miscVariables.numericVariables,
  ];

  const changeString = changeVariables.map(formatChangeString).join(' ');
  if (options.runOnSheetOpen) {
    changeString + ' sheet:opened';
  }
  const getVariables = [
    ...changeVariables,
    ...variablesWithoutListen.boolean,
    ...variablesWithoutListen.numeric,
    ...variablesWithoutListen.string,
  ];
  on(changeString, (eventInfo) => {
    getAttrs(getVariables, (attrs) => {
      const v: V = { eventInfo, misc: 0, miscExplanation: '' };
      for (const b of variables.boolean.concat(variablesWithoutListen.boolean)) {
        v[b] = boolifySheetValue(attrs[b]);
      }
      for (const n of variables.numeric.concat(variablesWithoutListen.numeric)) {
        v[n] = Number(attrs[n] || 0);
      }
      for (const s of variables.string.concat(variablesWithoutListen.string)) {
        v[s] = attrs[s];
      }
      for (const m of miscVariables.numericVariables) {
        v.misc += Number(attrs[m] || 0);
      }
      v.miscExplanation = miscVariables.explanationVariables
        .map((e) => attrs[e])
        .filter(Boolean)
        .join(',');
      callback(v);
    });
  });
}

function initializeOnGetVariables(args: {
  variables: Partial<OnGetVariables>;
  variablesWithoutListen: Partial<OnGetVariables>;
}): { variables: OnGetVariables; variablesWithoutListen: OnGetVariables } {
  const { variables, variablesWithoutListen } = args;
  for (const varType of ['boolean' as const, 'numeric' as const, 'string' as const]) {
    variables[varType] = variables[varType] || [];
    variablesWithoutListen[varType] = variablesWithoutListen[varType] || [];
  }

  return {
    variables: variables as OnGetVariables,
    variablesWithoutListen: variablesWithoutListen as OnGetVariables,
  };
}

function boolifySheetValue(val: string | number | boolean | undefined): boolean {
  return Boolean(val === 'on' || val === '1' || val === 1 || val === true);
}

const SKILLS_BY_ATTRIBUTE: Record<string, string[]> = {
  strength: ['climb', 'jump', 'swim'],
  dexterity: ['balance', 'flexibility', 'perform', 'ride', 'sleight_of_hand', 'stealth'],
  constitution: ['endurance'],
  intelligence: [
    'craft_alchemy',
    'craft_bone',
    'craft_ceramics',
    'craft_leather',
    'craft_manuscripts',
    'craft_metal',
    'craft_poison',
    'craft_stone',
    'craft_textiles',
    'craft_traps',
    'craft_wood',
    'craft_untrained',
    'deduction',
    'devices',
    'disguise',
    'knowledge_arcana',
    'knowledge_dungeoneering',
    'knowledge_engineering',
    'knowledge_items',
    'knowledge_local',
    'knowledge_nature',
    'knowledge_planes',
    'knowledge_religion',
    'knowledge_untrained',
    'medicine',
  ],
  perception: [
    'awareness',
    'creature_handling',
    'deception',
    'persuasion',
    'social_insight',
    'survival',
  ],
  willpower: [],
  other: ['intimidate', 'profession'],
};

const ALL_SKILLS = Object.values(SKILLS_BY_ATTRIBUTE).flat();

const SKILLS_WITH_SUBSKILLS = ['craft', 'knowledge'];

const KNOWABLE_CONCEPTS = [
  'bardic_performances',
  'battle_tactics',
  'combat_styles',
  'hunting_styles',
  'ki_manifestations',
  'maneuvers',
  'metamagic',
  'mystic_spheres',
  'spells',
  'wild_aspects',
];

const VARIABLES_WITH_CUSTOM_MODIFIERS = new Set(
  [
    'accuracy',
    'accuracy_with_strikes',
    'all_defenses',
    'all_skills',
    'armor_defense',
    'attunement_points',
    'brawling_accuracy',
    'brawn',
    'constitution',
    'damage_resistance',
    'dexterity',
    'encumbrance',
    'fatigue_tolerance',
    'fortitude',
    'hit_points',
    'horizontal_jump_distance',
    'insight_points',
    'intelligence',
    'mental',
    'nonclass_skill_count',
    'perception',
    'magical_power',
    'mundane_power',
    'reflex',
    'speed',
    'strength',
    'vital_rolls',
    'weight_limits',
    'willpower',
  ]
    .concat(ALL_SKILLS)
    .concat(KNOWABLE_CONCEPTS.map((c) => `${c}_known`)),
);

// Class and species, mostly
const VARIABLES_WITH_CREATION_MODIFIERS = new Set([
  'armor_defense',
  'attunement_points',
  'class_skill_count',
  'dexterity',
  'brawn',
  'fortitude',
  'insight_points',
  'intelligence',
  'mental',
  'perception',
  'reflex',
  'speed',
  'strength',
  'willpower',
]);

const VARIABLES_WITH_DEBUFF_MODIFIERS = new Set([
  'accuracy',
  'armor_defense',
  'brawling_accuracy',
  'brawn',
  'fortitude',
  'reflex',
  'mental',
]);

// Multipliers to resistances can't be incorporated into this simple handling
// because they are multipliers instead of modifiers.
const VARIABLES_WITH_VITAL_WOUND_MODIFIERS = new Set([
  'accuracy',
  'brawling_accuracy',
  'all_defenses',
  'fatigue_tolerance',
  'brawn',
  'fortitude',
  'reflex',
  'mental',
  'speed',
]);

function formatParseableSkillName(skillName: SimpleValue | undefined) {
  if (!skillName) {
    return null;
  }
  return skillName
    .toString()
    .toLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('(', '')
    .replaceAll(')', '');
}

interface MiscVariables {
  explanationVariables: string[];
  numericVariables: string[];
}

function generateMiscVariables(name: string | undefined): MiscVariables {
  const explanationVariables: string[] = [];
  const numericVariables: string[] = [];
  if (!name) {
    return { explanationVariables, numericVariables };
  }
  if (VARIABLES_WITH_CUSTOM_MODIFIERS.has(name)) {
    for (const modifierType of CUSTOM_MODIFIER_TYPES) {
      explanationVariables.push(`${name}_${modifierType}_explanation`);
      numericVariables.push(`${name}_${modifierType}_modifier`);
    }
  }
  if (VARIABLES_WITH_CREATION_MODIFIERS.has(name)) {
    explanationVariables.push(`${name}_creation_explanation`);
    numericVariables.push(`${name}_creation_modifier`);
  }
  if (VARIABLES_WITH_DEBUFF_MODIFIERS.has(name)) {
    explanationVariables.push(`${name}_debuff_explanation`);
    numericVariables.push(`${name}_debuff_modifier`);
  }
  if (VARIABLES_WITH_VITAL_WOUND_MODIFIERS.has(name)) {
    explanationVariables.push(`${name}_vital_wound_explanation`);
    numericVariables.push(`${name}_vital_wound_modifier`);
  }
  return { explanationVariables, numericVariables };
}

function formatChangeString(varName: string): string {
  if (varName.includes('repeating_')) {
    return varName.replace(/repeating_([^_]+)_(.*)/, 'change:repeating_$1:$2');
  } else {
    return 'change:' + varName;
  }
}

export function handleEverything() {
  handleAbilitiesKnown();
  handleAttackHeaders();
  handleAttackTargeting();
  handleAttunedEffects();
  handleAttributes();
  handleCoreStatistics();
  handleCreationModifiers();
  handleCustomModifiers();
  handleDebuffs();
  // handleModifierExplanations();
  handleMonsterAbilityGeneration();
  handleMonsterToggles();
  handleResources();
  // TODO: reenable once this actually has value. Disabled for now to avoid performance
  // penalties.
  // handleRust();
  handleSize();
  handleSkills();
  handleSpecialDefenses();
  handleVitalWounds();
}

function handleCoreStatistics() {
  handleAccuracy();
  handleAccuracyWithStrikes();
  handleBrawlingAccuracy();
  handleCharacterNameSanitization();
  handleDefenses();
  handleDamageDice();
  handleDamageResistance();
  handleEncumbrance();
  handleFatiguePenalty();
  handleHitPoints();
  handleJumpDistance();
  handleMagicalPower();
  handleMundanePower();
  handleSpeed();
  handleUniversalAbilities();
  handleUnknownStatistic();
  handleVitalRolls();
  handleWeaponDamageDice();
  handleWeightLimits();
}

function handleDefenses() {
  handleArmorDefense();
  handleNonArmorDefense('brawn', 'strength');
  handleNonArmorDefense('fortitude', 'constitution');
  handleNonArmorDefense('reflex', 'dexterity');
  handleNonArmorDefense('mental', 'willpower');
}

function handleResources() {
  handleAttunementPoints();
  handleFatigueTolerance();
  handleInsightPoints();
  handleSkillPoints();
  handleTrainedSkills();
}

function calcAccuracyCrScaling(level: number, challengeRating?: ChallengeRating) {
  if (!challengeRating) {
    return 0;
  }
  let levelScaling = 0;
  if (challengeRating > 0) {
    let levels_with_accuracy_bonuses = [7, 19];
    for (const bonus_level of levels_with_accuracy_bonuses) {
      if (level >= bonus_level) {
        levelScaling += 1;
      }
    }
  }

  return levelScaling;
}

function calcDefenseCrScaling(level: number, challengeRating?: ChallengeRating) {
  if (!challengeRating) {
    return 0;
  }
  let levelScaling = 0;
  if (challengeRating > 0) {
    let levels_with_defense_bonuses = [5, 11, 17];
    for (const bonus_level of levels_with_defense_bonuses) {
      if (level >= bonus_level) {
        levelScaling += 1;
      }
    }
  }
  if (challengeRating === 4) {
    levelScaling += 2;

    let levels_with_defense_bonuses = [8, 14];
    for (const bonus_level of levels_with_defense_bonuses) {
      if (level >= bonus_level) {
        levelScaling += 1;
      }
    }
  }
  return levelScaling;
}

function handleAbilitiesKnown() {
  for (const knowable of KNOWABLE_CONCEPTS) {
    handleAbilityKnown(knowable);
  }
}

function handleAbilityKnown(abilityName: string) {
  onGet({
    variables: {
      miscName: `${abilityName}_known`,
    },
    callback: (v) => {
      const totalValue = v.misc;
      setAttrs({
        [`has_${abilityName}_known`]: totalValue > 0 ? '1' : '0',
        [`${abilityName}_known_explanation`]: formatCombinedExplanation(v.miscExplanation),
        [`${abilityName}_known`]: totalValue,
      });
    },
  });
}

function handleAccuracy() {
  onGet({
    variables: {
      miscName: 'accuracy',
      numeric: ['challenge_rating', 'level', 'perception', 'fatigue_penalty'],
    },
    callback: (v) => {
      const levelModifier = v.level / 2;
      const perceptionModifier = v.perception / 2;
      const levelishModifier = Math.floor(levelModifier + perceptionModifier);
      const crModifier = calcAccuracyCrScaling(v.level, v.challenge_rating);
      const accuracy = v.misc + levelishModifier + crModifier - v.fatigue_penalty;
      setAttrs({
        accuracy,
        accuracy_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'level', value: levelModifier },
          { name: 'Per', value: perceptionModifier },
          { name: 'fatigue', value: -v.fatigue_penalty },
          { name: 'CR', value: crModifier },
        ]),
      });
    },
  });
}

function handleAccuracyWithStrikes() {
  onGet({
    variables: {
      miscName: 'accuracy_with_strikes',
    },
    callback: (v) => {
      setAttrs({
        accuracy_with_strikes: v.misc,
        accuracy_with_strikes_explanation: formatCombinedExplanation(v.miscExplanation),
      });
    },
  });
}

function handleAttackHeaders() {
  const stringVars = ['debuff_headers'];
  for (const customModifierType of CUSTOM_MODIFIER_TYPES) {
    stringVars.push(`attack_headers_${customModifierType}_modifier`);
  }
  onGet({
    variables: {
      string: stringVars,
    },
    callback: (v) => {
      const allHeaders = [v.debuff_headers];
      for (const varName of stringVars) {
        allHeaders.push(v[varName]);
      }
      const unsorted = allHeaders.filter(Boolean).join(';');
      const sorted = unsorted
        .split(';')
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .join(' ');
      setAttrs({ attack_headers: sorted });
    },
  });
}

function handleBrawlingAccuracy() {
  const accuracyMiscVariables = generateMiscVariables('accuracy').numericVariables;
  onGet({
    variables: {
      miscName: 'brawling_accuracy',
      numeric: [
        'challenge_rating',
        'level',
        'strength',
        'fatigue_penalty',
        ...accuracyMiscVariables,
      ],
    },
    callback: (v) => {
      const levelModifier = v.level / 2;
      const strengthModifier = v.strength / 2;
      const levelishModifier = levelModifier + strengthModifier;
      const crModifier = calcAccuracyCrScaling(v.level, v.challenge_rating);

      let accuracyMiscModifier = 0;
      for (const varName of accuracyMiscVariables) {
        accuracyMiscModifier += v[varName];
      }

      const brawling_accuracy = Math.floor(
        v.misc + levelishModifier + accuracyMiscModifier + crModifier - v.fatigue_penalty,
      );
      setAttrs({
        brawling_accuracy,
        brawling_accuracy_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'level', value: levelModifier },
          { name: 'Str', value: strengthModifier },
          { name: 'general accuracy', value: accuracyMiscModifier },
          { name: 'fatigue', value: -v.fatigue_penalty },
          { name: 'CR', value: crModifier },
        ]),
      });
    },
  });
}

function handleActiveAbilityDice() {
  function getAbilityDicePoolAttrs(keyPrefix: string, callback: (pool: DicePool) => void) {
    return getDicePoolAttrs(keyPrefix, 'dice_pool', callback);
  }

  // Local change
  on(
    'change:repeating_abilities:dice_pool' + ' change:repeating_abilities:is_magical',
    function () {
      const keyPrefix = 'repeating_abilities';
      getAbilityDicePoolAttrs(keyPrefix, (parsed) => {
        const diceText = parsed.dicePool ? '{{Value=[[@{calculated_dice_pool}]]}}' : '';
        setAttrs({
          [`${keyPrefix}_calculated_dice_pool`]: parsed.dicePool,
          [`${keyPrefix}_dice_text`]: diceText,
        });
      });
    },
  );
}

function handleArmorDefense() {
  onGet({
    variables: {
      miscName: 'armor_defense',
      numeric: [
        'level',
        'dexterity',
        'body_armor_defense',
        'shield_defense',
        'challenge_rating',
        'all_defenses_vital_wound_modifier',
      ],
      string: ['body_armor_usage_class', 'shield_usage_class', 'base_class'],
    },
    callback: (v) => {
      // calculate attributeModifier
      let attributeModifier = 0;
      let all_usage_classes = [v.body_armor_usage_class, v.shield_usage_class];
      if (v.base_class) {
        all_usage_classes.push(BASE_CLASS_MODIFIERS[v.base_class].armor_usage_class);
      }
      const worstUsageClass =
        all_usage_classes.find((u) => u === 'heavy') ||
        all_usage_classes.find((u) => u === 'medium') ||
        'light';
      if (worstUsageClass === 'medium' || worstUsageClass === 'heavy') {
        attributeModifier += Math.floor(v.dexterity / 2);
      } else if (worstUsageClass === 'light') {
        attributeModifier += v.dexterity;
      }

      const levelModifier = Math.floor(v.level / 2);
      const crModifier = calcDefenseCrScaling(v.level, v.challenge_rating);

      const beforeEquipment = attributeModifier + levelModifier + crModifier;
      const totalValue =
        beforeEquipment +
        v.body_armor_defense +
        v.shield_defense +
        v.misc +
        v.all_defenses_vital_wound_modifier;

      setAttrs({
        armor_defense: totalValue,
        armor_defense_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'level', value: levelModifier },
          // Technically inaccurate for monsters, but not really important.
          { name: 'Dex', value: attributeModifier },
          { name: 'body armor', value: v.body_armor_defense },
          { name: 'shield', value: v.shield_defense },
          { name: 'vital', value: v.all_defenses_vital_wound_modifier },
          { name: 'CR', value: crModifier },
        ]),
      });
    },
  });
}

function handleAttackTargeting() {
  for (const repeatingSection of [
    'repeating_strikeattacks',
    'repeating_otherdamagingattacks',
    'repeating_nondamagingattacks',
    'repeating_abilities',
  ]) {
    onGet({
      variables: {
        boolean: [`${repeatingSection}_is_targeted`],
        string: [`${repeatingSection}_attack_defense`, `${repeatingSection}_tags`],
      },
      options: { includeLevel: false },
      callback: (v) => {
        setAttackTargeting(repeatingSection, v);
      },
    });
    on('change:level', () => {
      getSectionIDs(repeatingSection, (repeatingSectionIds) => {
        for (const sectionId of repeatingSectionIds) {
          const sectionPrefix = `${repeatingSection}_${sectionId}`;
          getAttrs(
            [
              `${sectionPrefix}_is_targeted`,
              `${sectionPrefix}_attack_defense`,
              `${sectionPrefix}_tags`,
            ],
            (v) => {
              v[`${sectionPrefix}_is_targeted`] = boolifySheetValue(
                v[`${sectionPrefix}_is_targeted`],
              );
              setAttackTargeting(sectionPrefix, v);
            },
          );
        }
      });
    });
  }
}

function setAttackTargeting(sectionPrefix: string, attrs: Attrs) {
  const { defenseText, tagsText, targetText } = calcAttackTargeting(
    attrs[`${sectionPrefix}_is_targeted`],
    attrs[`${sectionPrefix}_attack_defense`],
    attrs[`${sectionPrefix}_tags`],
  );
  setAttrs({
    [`${sectionPrefix}_targeting_text`]: targetText,
    [`${sectionPrefix}_attack_defense_text`]: defenseText,
    [`${sectionPrefix}_tags_text`]: tagsText,
  });
}

function calcAttackTargeting(isTargeted: boolean, rawDefense: string, tags: string) {
  rawDefense = (rawDefense || '').toLowerCase().trim();
  const targetText = isTargeted ? '{{Target=@{target|Defender|token_name}}}' : '';
  const tagsText = tags ? `{{Tags=${tags}}}` : '';

  let actualDefenseText = '';
  if (isTargeted && rawDefense) {
    let actualDefense = null;
    // Try to guess the actual defense based on whatever freeform text was typed
    // in
    if (['armor', 'a'].includes(rawDefense)) {
      actualDefense = 'armor_defense';
    } else if (['brawn', 'brn', 'bra', 'b'].includes(rawDefense)) {
      actualDefense = 'brawn';
    } else if (['fortitude', 'fort', 'f'].includes(rawDefense)) {
      actualDefense = 'fortitude';
    } else if (['reflex', 'ref', 'r'].includes(rawDefense)) {
      actualDefense = 'reflex';
    } else if (['mental', 'ment', 'm'].includes(rawDefense)) {
      actualDefense = 'mental';
    }
    if (actualDefense) {
      // TODO: find a way to hide defenses of high CR enemies
      actualDefenseText = ' (**@{target|Defender|' + actualDefense + '}**)';
    }
  }
  const defenseText = '@{attack_defense}' + actualDefenseText;
  return {
    defenseText,
    tagsText,
    targetText,
  };
}

function handleAttributes() {
  for (const attributeName of [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'perception',
    'willpower',
  ]) {
    onGet({
      variables: {
        miscName: attributeName,
        numeric: [`${attributeName}_at_creation`, `${attributeName}_level_scaling`],
      },
      callback: (v) => {
        const totalValue =
          v[`${attributeName}_at_creation`] + v[`${attributeName}_level_scaling`] + v.misc;
        setAttrs({
          [attributeName]: totalValue,
        });
      },
    });
  }
}

function handleAttunedEffects() {
  on('change:repeating_attunedmodifiers remove:repeating_attunedmodifiers', function () {
    getSectionIDs('repeating_attunedmodifiers', (repeatingSectionIds) => {
      const isActiveIds = repeatingSectionIds.map(
        (id) => `repeating_attunedmodifiers_${id}_is_active`,
      );
      const isDeepIds = repeatingSectionIds.map((id) => `repeating_attunedmodifiers_${id}_is_deep`);
      getAttrs(isActiveIds.concat(isDeepIds), (values) => {
        let attunedCount = 0;
        for (const id of repeatingSectionIds) {
          if (values[`repeating_attunedmodifiers_${id}_is_active`] === '1') {
            const attuneCost = values[`repeating_attunedmodifiers_${id}_is_deep`] === '1' ? 2 : 1;
            attunedCount += attuneCost;
          }
        }
        setAttrs({
          active_attunement_count: attunedCount,
        });
      });
    });
  });
}

function handleAttunementPoints() {
  onGet({
    variables: {
      miscName: 'attunement_points',
      numeric: ['level'],
    },
    callback: (v) => {
      const base = 2;
      let fromLevel = 0;
      if (v.level >= 8) {
        fromLevel = 2;
      } else if (v.level >= 5) {
        fromLevel = 1;
      }
      const ap = base + v.misc + fromLevel;
      setAttrs({
        attunement_points: ap,
        attunement_points_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base', value: base },
          { name: 'level', value: fromLevel },
        ]),
        attunement_points_max: ap,
        attunement_points_maximum: ap,
      });
    },
  });
}

function handleCreationModifiers() {
  onGet({
    variables: {
      numeric: ['archetype_rank_0', 'archetype_rank_1', 'archetype_rank_2'],
      string: ['base_class', 'species'],
    },
    callback: (v) => {
      const classModifiers = BASE_CLASS_MODIFIERS[v.base_class];

      // Class proficiencies and class skill count aren't modifiers. They are simply
      // directly set, since nothing else can modify them.
      const attrs: Attrs = {
        base_class_proficiencies: (classModifiers && classModifiers.proficiencies) || '',
        class_skill_count: (classModifiers && classModifiers.class_skill_count) || 0,
      };
      // The simple modifier keys can simply be directly translated
      for (const modifierKey of [
        'armor_defense' as const,
        'brawn' as const,
        'fortitude' as const,
        'reflex' as const,
        'mental' as const,
        'attunement_points' as const,
        'insight_points' as const,
      ]) {
        const modifierValue = (classModifiers && classModifiers[modifierKey]) || 0;
        attrs[`${modifierKey}_creation_explanation`] = formatNamedModifierExplanation({
          name: v.base_class,
          value: modifierValue,
        });
        attrs[`${modifierKey}_creation_modifier`] = modifierValue;
      }

      // const speciesModifiers = SPECIES_MODIFIERS[v.species];

      setAttrs(attrs);
    },
  });
}

function handleCustomModifiers() {
  for (const modifierType of CUSTOM_MODIFIER_TYPES) {
    on(
      `change:repeating_${modifierType}modifiers remove:repeating_${modifierType}modifiers`,
      function () {
        const nestedCustomStatisticCount = 3;
        const formatStatisticId = (id: string, i: number) =>
          `repeating_${modifierType}modifiers_${id}_statistic${i}`;
        const formatNameId = (id: string) => `repeating_${modifierType}modifiers_${id}_name`;

        const formatImmuneId = (id: string) => `repeating_${modifierType}modifiers_${id}_immune`;
        const formatImperviousId = (id: string) =>
          `repeating_${modifierType}modifiers_${id}_impervious`;
        const formatVulnerableId = (id: string) =>
          `repeating_${modifierType}modifiers_${id}_vulnerable`;

        const formatAttackHeaderId = (id: string) =>
          `repeating_${modifierType}modifiers_${id}_attack_header`;

        const formatValueId = (id: string, i: number) =>
          `repeating_${modifierType}modifiers_${id}_value${i}`;
        const formatIsActiveId = (id: string) =>
          `repeating_${modifierType}modifiers_${id}_is_active`;
        const formatModifierKey = (modifierName: string) =>
          `${modifierName}_${modifierType}_modifier`;
        const formatExplanationKey = (modifierName: string) =>
          `${modifierName}_${modifierType}_explanation`;

        getSectionIDs(`repeating_${modifierType}modifiers`, (repeatingSectionIds) => {
          const fullAttributeIds = [];
          for (const id of repeatingSectionIds) {
            fullAttributeIds.push(formatIsActiveId(id));
            fullAttributeIds.push(formatNameId(id));
            fullAttributeIds.push(formatImmuneId(id));
            fullAttributeIds.push(formatImperviousId(id));
            fullAttributeIds.push(formatVulnerableId(id));
            fullAttributeIds.push(formatAttackHeaderId(id));
            for (let i = 0; i < nestedCustomStatisticCount; i++) {
              fullAttributeIds.push(formatStatisticId(id, i));
              fullAttributeIds.push(formatValueId(id, i));
            }
          }
          getAttrs(fullAttributeIds, (values) => {
            // At this point, we have N modifier rows that can have up to 3 independent
            // modifiers each. We need to group modifiers that affect the same
            // statistic. This is made slightly more complicated by the fact that some
            // modifiers, such as "all_defenses", can affect multiple statistics.
            const namedModifierMap = new NamedModifierMap();
            const immuneTo: string[] = [];
            const imperviousTo: string[] = [];
            const vulnerableTo: string[] = [];
            const attackHeaders: string[] = [];

            for (const id of repeatingSectionIds) {
              // Permanent and legacy modifiers are always active; for temporary and attuned
              // modifiers, we have to check the value from the checkbox.
              const isActive = ['permanent', 'legacy'].includes(modifierType)
                ? '1'
                : values[formatIsActiveId(id)];
              if (boolifySheetValue(isActive)) {
                const modifierName = values[formatNameId(id)] || 'Unknown';
                // Handle numeric statistic modifiers
                for (let i = 0; i < nestedCustomStatisticCount; i++) {
                  const modifiedStatistic = values[formatStatisticId(id, i)];
                  const value = Number(values[formatValueId(id, i)]) || 0;
                  namedModifierMap.addNamedModifier(modifiedStatistic, modifierName, value);
                }

                // Handle special defenses
                if (values[formatImmuneId(id)]) {
                  immuneTo.push(values[formatImmuneId(id)]);
                }
                if (values[formatImperviousId(id)]) {
                  imperviousTo.push(values[formatImperviousId(id)]);
                }
                if (values[formatVulnerableId(id)]) {
                  vulnerableTo.push(values[formatVulnerableId(id)]);
                }

                // Handle attack header
                if (values[formatAttackHeaderId(id)]) {
                  const headerText = values[formatAttackHeaderId(id)].trim();
                  attackHeaders.push(`{{${modifierName}=${headerText}}}`);
                }
              }
            }
            const attrs: Attrs = {
              [formatModifierKey('immune')]: immuneTo.join(', '),
              [formatModifierKey('impervious')]: imperviousTo.join(', '),
              [formatModifierKey('vulnerable')]: vulnerableTo.join(', '),
              // This semicolon gets replaced in handleAttackHeaders()
              [formatModifierKey('attack_headers')]: attackHeaders.join(';'),
            };
            for (const statisticKey of VARIABLES_WITH_CUSTOM_MODIFIERS) {
              attrs[formatModifierKey(statisticKey)] =
                namedModifierMap.calculateModifierValue(statisticKey);
              attrs[formatExplanationKey(statisticKey)] =
                namedModifierMap.generateExplanation(statisticKey);
            }

            setAttrs(attrs);
          });
        });
      },
    );
  }
}

class NamedModifierMap {
  namedModifiersByStatistic: Record<string, NamedModifier[]>;

  constructor() {
    this.namedModifiersByStatistic = {};
  }

  addNamedModifier(statisticKey: string, name: string, value: number) {
    if (statisticKey === 'all_defenses') {
      for (const defenseKey of ['armor_defense', 'brawn', 'fortitude', 'reflex', 'mental']) {
        this.addNamedModifier(defenseKey, name, value);
      }
    } else if (statisticKey === 'knowledge_all') {
      for (const knowledgeKey of [
        'knowledge_arcana',
        'knowledge_dungeoneering',
        'knowledge_engineering',
        'knowledge_items',
        'knowledge_local',
        'knowledge_nature',
        'knowledge_planes',
        'knowledge_religion',
        'knowledge_untrained',
      ]) {
        this.addNamedModifier(knowledgeKey, name, value);
      }
    } else if (statisticKey === 'craft_all') {
      for (const craftKey of [
        'craft_alchemy',
        'craft_bone',
        'craft_ceramics',
        'craft_leather',
        'craft_manuscripts',
        'craft_metal',
        'craft_poison',
        'craft_stone',
        'craft_textiles',
        'craft_wood',
        'craft_untrained',
      ]) {
        this.addNamedModifier(craftKey, name, value);
      }
    }

    this.namedModifiersByStatistic[statisticKey] = (
      this.namedModifiersByStatistic[statisticKey] || []
    ).concat({ name, value });
  }

  calculateModifierValue(statisticKey: string) {
    if (!this.namedModifiersByStatistic[statisticKey]) {
      return 0;
    }
    let total = 0;
    for (const namedModifier of this.namedModifiersByStatistic[statisticKey]) {
      total += namedModifier.value;
    }
    return total;
  }

  generateExplanation(statisticKey: string, sorted = false) {
    if (!this.namedModifiersByStatistic[statisticKey]) {
      return '';
    }
    if (sorted) {
      const modifiers = [...this.namedModifiersByStatistic[statisticKey]];
      modifiers.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return collectNamedModifierExplanations(modifiers);
    } else {
      return collectNamedModifierExplanations(this.namedModifiersByStatistic[statisticKey]);
    }
  }
}

function handleDamageDice() {
  handleActiveAbilityDice();
  handleOtherDamagingAttacks();
  handleStrikeAttacks();
}

function handleDamageResistance() {
  onGet({
    variables: {
      miscName: 'damage_resistance',
      numeric: [
        'hit_points_maximum',
        'level',
        'challenge_rating',
        'body_armor_damage_resistance',
      ],
      string: ['base_class'],
    },
    options: {
      variablesWithoutListen: {
        numeric: ['damage_resistance', 'damage_resistance_maximum'],
      },
    },
    callback: (v) => {
      let drFromLevel = 0;
      const drProgression = v.base_class && BASE_CLASS_MODIFIERS[v.base_class].damage_resistance;
      if (drProgression) {
        drFromLevel = calcHpBonuses(drProgression, v.level, 0).hpFromLevel;
      }
      const playerTotalDr = v.body_armor_damage_resistance + drFromLevel + v.misc;

      var crMultiplier =
        {
          1: 1,
          4: 4,
        }[v.challenge_rating!] || 1;
      const monsterTotalDr = Math.floor(playerTotalDr * crMultiplier);

      const attrs: Attrs = {
        damage_resistance_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'body armor', value: v.body_armor_damage_resistance },
          { name: 'Progression', value: drFromLevel },
          { name: 'CR', value: monsterTotalDr - playerTotalDr },
        ]),
        damage_resistance: undefined,
        damage_resistance_max: monsterTotalDr,
        damage_resistance_maximum: monsterTotalDr,
      };
      let should_set_current_dr =
        monsterTotalDr < v.damage_resistance ||
        v.damage_resistance === v.damage_resistance_maximum ||
        !v.damage_resistance_maximum;
      if (should_set_current_dr) {
        attrs.damage_resistance = monsterTotalDr;
      }
      setAttrs(attrs);
    },
  });
}

function sanitizeText(text: string) {
  if (!text) {
    return text;
  }
  return text.replaceAll(',', '&#44;').replaceAll('/', '&#47;');
}

function handleCharacterNameSanitization() {
  onGet({
    variables: {
      string: ['character_name'],
    },
    callback: (v) => {
      setAttrs({ character_name_sanitized: sanitizeText(v.character_name) });
    },
  });
}

function handleDebuffs() {
  onGet({
    variables: {
      boolean: [
        // conditional debuffs
        'climbing',
        'goaded',
        'grappled',
        'helpless',
        'midair',
        'prone',
        'squeezing',
        'swimming',
        'partially_unaware',
        'unaware',
        // rank 1 debuffs
        'dazzled',
        // rank 2 debuffs
        'frightened',
        'slowed',
        'stunned',
        // rank 3 debuffs
        'confused',
        'blinded',
        'panicked',
        // rank 4 debuffs
        'asleep',
        'paralyzed',
      ],
    },
    callback: (v) => {
      const debuffHeaders = [];

      let namedModifierMap = new NamedModifierMap();

      const minus2 = (cause: string, statistic: string) =>
        namedModifierMap.addNamedModifier(statistic, cause, -2);
      const minus4 = (cause: string, statistic: string) =>
        namedModifierMap.addNamedModifier(statistic, cause, -4);

      // circumstantial effects
      if (v.grappled) {
        minus2('grappled', 'armor_defense');
        minus2('grappled', 'reflex');
      }
      if (
        v.partially_unaware &&
        !(v.unaware || v.asleep || v.helpless || v.paralyzed || v.blinded)
      ) {
        minus2('partially unaware', 'armor_defense');
        minus2('partially unaware', 'reflex');
      }
      if (v.unaware || v.asleep || v.helpless || v.paralyzed) {
        namedModifierMap.addNamedModifier('armor_defense', 'unaware', -6);
        namedModifierMap.addNamedModifier('reflex', 'unaware', -6);
      }
      if (v.squeezing) {
        minus2('squeezing', 'armor_defense');
        minus2('squeezing', 'reflex');
      }
      if (v.midair) {
        minus4('midair', 'armor_defense');
        minus4('midair', 'reflex');
      }
      if (v.climbing) {
        minus2('climbing', 'accuracy');
        minus2('climbing', 'armor_defense');
        minus2('climbing', 'reflex');
      }
      if (v.swimming) {
        minus2('swimming', 'accuracy');
        minus2('swimming', 'armor_defense');
        minus2('swimming', 'reflex');
      }
      // TODO: figure out how to add "half speed" modifier
      if (v.prone) {
        minus2('prone', 'armor_defense');
        minus2('prone', 'reflex');
      }

      // rank 1 debuffs
      if (v.dazzled && !v.blinded) {
        debuffHeaders.push('{{Miss chance=Miss on 1: [[d5]]}}');
      }
      if (v.blinded) {
        debuffHeaders.push('{{Miss chance=Miss on 1: [[d2]]}}');
      }
      if (
        v.blinded &&
        !(v.unaware || v.partially_unaware || v.asleep || v.helpless || v.paralyzed)
      ) {
        minus2('blinded', 'armor_defense');
        minus2('blinded', 'reflex');
      }
      if (v.goaded) {
        debuffHeaders.push('{{Goaded=+2 accuracy vs source}}');
        minus2('goaded', 'accuracy');
      }
      if (v.slowed) {
        namedModifierMap.addNamedModifier("speed", "slowed", -10);
        minus2('slowed', 'armor_defense');
        minus2('slowed', 'reflex');
      }

      // rank 2 debuffs
      if (v.frightened && !v.panicked) {
        debuffHeaders.push('{{Frightened=-2 accuracy vs source}}');
        minus2('frightened', 'mental');
      }
      if (v.stunned && !v.confused) {
        minus2('stunned', 'all_defenses');
      }
      if (v.confused) {
        minus2('confused', 'all_defenses');
      }

      // rank 3 debuffs
      if (v.immobilized) {
        minus4('immobilized', 'armor_defense');
        minus4('immobilized', 'reflex');
      }
      if (v.panicked) {
        debuffHeaders.push('{{Panicked=Cannot attack source}}');
        minus4('panicked', 'mental');
      }

      // The semicolon is replaced in handleAttackHeaders()
      const attrs: Attrs = { debuff_headers: debuffHeaders.join(';') };
      for (const statistic of ['accuracy', 'armor_defense', 'brawn', 'fortitude', 'mental', 'reflex']) {
        attrs[`${statistic}_debuff_explanation`] = namedModifierMap.generateExplanation(
          statistic,
          true,
        );
        attrs[`${statistic}_debuff_modifier`] = namedModifierMap.calculateModifierValue(statistic);
      }

      setAttrs(attrs);
    },
  });
}

function handleEncumbrance() {
  onGet({
    variables: {
      miscName: 'encumbrance',
      numeric: ['body_armor_encumbrance', 'shield_encumbrance'],
    },
    callback: (v) => {
      const totalValue = Math.max(
        0,
        v.body_armor_encumbrance + v.shield_encumbrance + v.misc,
      );
      setAttrs({
        encumbrance: totalValue,
        encumbrance_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'body armor', value: v.body_armor_encumbrance },
          { name: 'shield', value: v.shield_encumbrance },
        ]),
      });
    },
  });
}

function handleFatiguePenalty() {
  onGet({
    variables: {
      numeric: ['fatigue_points', 'fatigue_tolerance'],
    },
    callback: (v) => {
      const totalValue = Math.max(0, v.fatigue_points - v.fatigue_tolerance);
      setAttrs({
        fatigue_penalty: totalValue,
      });
    },
  });
}

function handleFatigueTolerance() {
  onGet({
    variables: {
      miscName: 'fatigue_tolerance',
      numeric: ['constitution'],
    },
    callback: (v) => {
      const base = 3;
      const totalValue = base + Math.max(0, v.constitution + v.misc);
      setAttrs({
        fatigue_tolerance_attributes: v.constitution,
        fatigue_tolerance: totalValue,
        fatigue_tolerance_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base', value: base },
          { name: 'Con', value: v.constitution },
        ]),
        // for red bars
        fatigue_points_max: totalValue,
      });
    },
  });
}

function handleHitPoints() {
  onGet({
    variables: {
      miscName: 'hit_points',
      numeric: ['level', 'constitution', 'challenge_rating'],
      string: ['base_class'],
    },
    options: {
      variablesWithoutListen: {
        numeric: ['hit_points', 'hit_points_maximum'],
      },
    },
    callback: (v) => {
      const progressionName: ProgressionName = v.base_class
        ? BASE_CLASS_MODIFIERS[v.base_class].hit_points
        : 'low';
      const { hpFromLevel, hpFromConstitution } = calcHpBonuses(
        progressionName,
        v.level,
        v.constitution,
      );

      let crMultiplier =
        {
          1: 1,
          4: 3,
        }[v.challenge_rating!] || 1;

      const playerTotalHp = hpFromLevel + hpFromConstitution + v.misc;
      const monsterTotalHp = Math.floor(playerTotalHp * crMultiplier);

      const attrs: Attrs = {
        hit_points: undefined,
        hit_points_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'level', value: hpFromLevel },
          { name: 'Con', value: hpFromConstitution },
          { name: 'CR', value: monsterTotalHp - playerTotalHp },
        ]),
        hit_points_max: monsterTotalHp,
        hit_points_maximum: monsterTotalHp,
      };
      let shouldSetCurrentHp =
        monsterTotalHp < v.hit_points ||
        v.hit_points === v.hit_points_maximum ||
        !v.hit_points_maximum;
      if (shouldSetCurrentHp) {
        attrs.hit_points = monsterTotalHp;
      }
      setAttrs(attrs);
    },
  });
}

function calcHpComponents(progressionName: ProgressionName, level: number) {
  const progressionIndex = Math.max(0, Math.floor((level - 1) / 6));
  const [baseHp, incrementalHp] = {
    low: [
      [6, 1],
      [14, 2],
      [30, 4],
      [60, 8],
    ],
    medium: [
      [8, 1],
      [18, 2],
      [35, 5],
      [70, 10],
    ],
    high: [
      [8, 2],
      [20, 3],
      [40, 6],
      [80, 12],
    ],
    ['very high']: [
      [10, 2],
      [24, 4],
      [50, 8],
      [100, 15],
    ],
    extreme: [
      [14, 2],
      [28, 5],
      [60, 10],
      [120, 20],
    ],
  }[progressionName][progressionIndex];

  return { baseHp, incrementalHp };
}

function calcHpBonuses(progressionName: ProgressionName, level: number, constitution: number) {
  const { baseHp, incrementalHp } = calcHpComponents(progressionName, level);
  // This is the number of levels since the last breakpoint jump. Each breakpoint jump
  // increases base HP and incremental level count ("X HP per level above 7th").
  const incrementalLevel = (level - 1) % 6;

  const hpFromLevel = baseHp + incrementalHp * incrementalLevel;
  const hpFromConstitution = incrementalHp * constitution;

  return { hpFromLevel, hpFromConstitution };
}

function handleInsightPoints() {
  onGet({
    variables: {
      miscName: 'insight_points',
      numeric: ['intelligence', 'level'],
    },
    callback: (v) => {
      const base = 1;
      let fromLevel = 0;
      if (v.level >= 7) {
        fromLevel = 2;
      } else if (v.level >= 4) {
        fromLevel = 1;
      }
      const totalValue = base + v.intelligence + v.misc + fromLevel;
      setAttrs({
        insight_points: totalValue,
        insight_points_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base', value: base },
          { name: 'Int', value: v.intelligence },
          { name: 'level', value: fromLevel },
        ]),
      });
    },
  });
}

function handleJumpDistance() {
  onGet({
    variables: {
      miscName: 'horizontal_jump_distance',
      numeric: ['base_speed', 'strength', 'jump_level'],
    },
    callback: (v) => {
      // In case people don't bother to set their size to Medium explicitly
      const base_speed = v.base_speed || 30;
      const base_speed_modifier = roundToFiveFootIncrements(base_speed / 4);
      const strength_modifier =
        v.jump_level > 0 ? Math.max(5, v.strength * 5) : Math.floor(v.strength / 2) * 5;
      const horizontalDistance = Math.max(0, base_speed_modifier + strength_modifier + v.misc);
      // TODO: add support for float like air
      const verticalDistance = roundToFiveFootIncrements(horizontalDistance / 2);
      setAttrs({
        combined_jump_distance: `${horizontalDistance}/${verticalDistance}`,
        horizontal_jump_distance: horizontalDistance,
        horizontal_jump_distance_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base speed / 4', value: base_speed_modifier },
          { name: 'strength', value: strength_modifier },
        ]),
        vertical_jump_distance: verticalDistance,
      });
    },
  });
}

function handleSpeed() {
  onGet({
    variables: {
      miscName: 'speed',
      numeric: ['base_speed', 'body_armor_speed'],
    },
    callback: (v) => {
      // In case people don't bother to set their size to Medium explicitly
      const base_speed = v.base_speed || 30;
      const totalValue = base_speed + v.body_armor_speed + v.misc;
      setAttrs({
        speed: totalValue,
        speed_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base speed', value: v.base_speed },
          { name: 'body armor', value: v.body_armor_speed },
        ]),
      });
    },
  });
}

// function handleModifierExplanations() {
//   let modifierNames = [
//     "hit_points",
//     "damage_resistance",
//     "armor_defense",
//     "fortitude",
//     "reflex",
//     "mental",
//   ];
//   let modifierKeys = [];
//   for (const m of modifierNames) {
//     for (const t of CUSTOM_MODIFIER_TYPES) {
//       modifierKeys.push(`${m}_${t}_explanation`);
//     }
//   }
//   onGet(
//     {
//       string: modifierKeys,
//     },
//     (v) => {
//       const attrs = {};
//       for (const modifierName of modifierNames) {
//         const explanations = CUSTOM_MODIFIER_TYPES.map(
//           (t) => v[`${modifierName}_${t}_explanation`]
//         ).filter(Boolean);
//         attrs[`${modifierName}_explanation`] = explanations.join(" ");
//       }
//       setAttrs(attrs);
//     }
//   );
// }

function handleMonsterAbilityGeneration() {
  on('clicked:createmonsterattack', () => {
    getAttrs(
      [
        'level',
        'monster_attack_accuracy',
        'monster_attack_effect',
        'monster_attack_name',
        'monster_attack_area_shape',
        'monster_attack_targeting',
        'monster_attack_is_magical',
        'monster_attack_usage_time',
        'magical_power',
        'mundane_power',
      ],
      (rawAttrs: Attrs) => {
        const isMagical = boolifySheetValue(rawAttrs.monster_attack_is_magical);

        generateMonsterAttack({
          accuracy: rawAttrs.monster_attack_accuracy,
          areaShape: rawAttrs.monster_attack_area_shape || 'default',
          effect: rawAttrs.monster_attack_effect,
          isMagical,
          name: rawAttrs.monster_attack_name || 'damage',
          power: Number(isMagical ? rawAttrs.magical_power : rawAttrs.mundane_power),
          rank: calculateStandardRank(Number(rawAttrs.level)),
          targeting: rawAttrs.monster_attack_targeting || 'targeted_medium',
          usageTime: rawAttrs.monster_attack_usage_time || 'standard',
        });
      },
    );
  });

  on('clicked:undomonsterattack', () => {
    getAttrs(['monster_attack_undo_name'], (rawAttrs: Attrs) => {
      const undoName = rawAttrs.monster_attack_undo_name;
      if (undoName) {
        removeRepeatingRow(undoName);
      }
      // If this was somehow pushed when we can't actually undo anything, such as if
      // someone double clicked the button, we want to disable clicking it again but not
      // break anything.
      setAttrs({
        monster_attack_can_undo: '0',
        monster_attack_undo_name: '',
      });
    });
  });
}

export type MonsterAttackAccuracy = 'low_accuracy' | 'high_accuracy' | 'normal' | '' | undefined;
export type MonsterAttackTargeting = MonsterAttackTargeted | MonsterAttackArea;
export type MonsterAttackDebuff =
  | 'dazzled'
  | 'frightened'
  | 'stunned'
  | 'confused'
  | 'immobilized'
  | 'goaded'
  | 'slowed'
  | 'blinded'
  | 'panicked'
  | 'vulnerable to all attacks'
  | 'paralyzed';
export type MonsterAttackAreaShape =
  | 'default'
  | 'cone'
  | 'line'
  | 'radius_from_self'
  | 'radius_at_range';
export type MonsterAttackTargeted =
  | 'targeted_medium'
  | 'targeted_touch'
  | 'targeted_short'
  | 'targeted_long';
export type MonsterAttackArea = 'small_area' | 'large_area';
export type MonsterAttackUsageTime = 'standard' | 'elite' | 'minor';

function generateMonsterAttack({
  accuracy,
  areaShape,
  effect,
  isMagical,
  name,
  power,
  rank,
  targeting,
  usageTime,
}: {
  accuracy: MonsterAttackAccuracy;
  areaShape: MonsterAttackAreaShape;
  effect: 'damage' | MonsterAttackDebuff;
  isMagical: boolean;
  name: string;
  power: number;
  rank: number;
  targeting: MonsterAttackTargeting;
  usageTime: MonsterAttackUsageTime;
}) {
  // Accuracy modifies base rank, unlike area size.
  let rankModifier = 0;
  let accuracyModifier = 0;
  if (accuracy === 'low_accuracy') {
    accuracyModifier -= 2;
    rankModifier += 1;
  } else if (accuracy === 'high_accuracy') {
    accuracyModifier += 2;
    rankModifier -= 1;
  }

  if (effect === 'damage') {
    createDamagingMonsterAttack({
      accuracyModifier,
      areaShape,
      name,
      isMagical,
      rank: rank + rankModifier,
      power,
      targeting,
      usageTime,
    });
  } else {
    createMonsterDebuff({
      accuracyModifier,
      areaShape,
      debuff: effect,
      isMagical,
      name,
      rank: rank + rankModifier,
      targeting,
      usageTime,
    });
  }
}

function calcTargetedText(targeting: MonsterAttackTargeting) {
  if (targetingIsTargeted(targeting)) {
    return {
      targeted_touch: 'adjacent',
      targeted_short: 'within 30 feet',
      targeted_medium: 'within 60 feet',
      targeted_long: 'within 90 feet',
    }[targeting];
  } else {
    throw new Error(`Can't get targeted text for targeting '${targeting}'.`);
  }
}

function createDamagingMonsterAttack({
  accuracyModifier,
  areaShape,
  isMagical,
  name,
  power,
  rank,
  targeting,
  usageTime,
}: {
  accuracyModifier: number;
  areaShape: MonsterAttackAreaShape;
  name: string;
  power: number;
  rank: number;
  isMagical: boolean;
  targeting: MonsterAttackTargeting;
  usageTime: MonsterAttackUsageTime;
}) {
  const damageRank = rank + calculateEffectRankModifier(targeting);
  const halfPower = Math.floor(power / 2);
  const damageDice =
    {
      '-1': `${halfPower}`,
      0: `1d4+${halfPower}`,
      1: `1d6+${halfPower}`,
      2: `1d6+${power}`,
      3: `1d8+${power}`,
      4: `${halfPower}d6`,
      5: `${halfPower + 1}d6`,
      6: `${halfPower + 1}d8`,
      7: `${halfPower + 1}d10`,
      8: `${power + 1}d6`,
      9: `${power + 2}d8`,
      10: `${power + 2}d10`, // Not tested; may be too low
    }[damageRank] || `Rank ${damageRank} is not supported`;

  const accuracyText = calcMonsterAccuracyText(accuracyModifier);
  const isTargeted = targetingIsTargeted(targeting);
  let effect = '';
  let monsterEffect = '';
  if (isTargeted) {
    const range = calcTargetedText(targeting);
    effect = `Make an attack against something ${range}.`;
    monsterEffect = `The $name makes a ${accuracyText} attack vs. $defense against something ${range}.
Hit: ${damageDice} damage.`;
  } else {
    const area = calcAttackArea({ areaShape, rank, targeting });
    effect = `Make an attack against everything in a ${area}.
Miss: Half damage.`;
    monsterEffect = `The $name makes a ${accuracyText} attack vs. $defense against everything in a ${area}.
Hit: ${damageDice} damage.
Miss: Half damage.`;
  }

  const rowId = generateRowID();
  const prefix = `repeating_otherdamagingattacks_${rowId}`;

  setAttrs({
    monster_attack_name: 'Success!',
    monster_attack_can_undo: '1',
    monster_attack_undo_name: prefix,
    [`${prefix}_attack_accuracy`]: accuracyModifier,
    [`${prefix}_attack_damage_dice`]: damageDice,
    [`${prefix}_attack_effect`]: effect,
    [`${prefix}_attack_name`]: name,
    [`${prefix}_is_magical`]: isMagical,
    [`${prefix}_is_targeted`]: isTargeted,
    // This is only used for generating LaTeX outside of Roll20.
    [`${prefix}_monster_effect`]: monsterEffect,
    [`${prefix}_usage_time`]: usageTime,
  });
}

function calcMonsterAccuracyText(accuracyModifier: number) {
  if (accuracyModifier < 0) {
    return `$accuracy${accuracyModifier}`;
  } else if (accuracyModifier > 0) {
    return `$accuracy+${accuracyModifier}`;
  } else {
    return '$accuracy';
  }
}

function createMonsterDebuff({
  accuracyModifier,
  areaShape,
  debuff,
  isMagical,
  name,
  rank,
  targeting,
  usageTime,
}: {
  accuracyModifier: number;
  areaShape: MonsterAttackAreaShape;
  debuff: MonsterAttackDebuff;
  isMagical: boolean;
  name: string;
  rank: number;
  targeting: MonsterAttackTargeting;
  usageTime: MonsterAttackUsageTime;
}) {
  const isTargeted = targetingIsTargeted(targeting);
  let availableRank = rank + calculateEffectRankModifier(targeting);

  // We need to make sure that we can afford to apply the debuff
  const debuffRank = {
    dazzled: 1,
    frightened: 3,
    goaded: 5,
    slowed: 5,
    stunned: 5,
    blinded: 9,
    confused: 9,
    panicked: 9,
    'vulnerable to all attacks': 9,
    immobilized: 11,
    paralyzed: 13,
  }[debuff];
  let requiresNoDamageResistance = false;
  if (availableRank < debuffRank) {
    availableRank += 4;
    requiresNoDamageResistance = true;
  }
  if (availableRank >= debuffRank) {
    // Targeted effects get +2a per excess rank.
    // Area effects get +1a per excess rank, since they also scale area with rank.
    if (isTargeted) {
      accuracyModifier += (availableRank - debuffRank) * 2;
    } else {
      accuracyModifier += availableRank - debuffRank;
    }
  } else {
    // Both targeted and area effects get -2a per excess rank.
    accuracyModifier += (availableRank - debuffRank) * 2;
  }

  const accuracyText = calcMonsterAccuracyText(accuracyModifier);
  let effect = '';
  let monsterEffect = '';
  if (isTargeted) {
    const range = calcTargetedText(targeting);

    const hitEffect = requiresNoDamageResistance
      ? `If the target has no remaining damage resistance, it is ${debuff} as a condition.`
      : `The target is ${debuff} as a condition.`;
    effect = `Make an attack against something ${range}.
Hit: ${hitEffect}`;
    monsterEffect = `The $name makes a ${accuracyText} attack vs. $defense against something ${range}.
Hit: ${hitEffect}`;
  } else {
    const area = calcAttackArea({ areaShape, rank, targeting });
    if (!area) {
      throw new Error(
        `Unable to calculate area: ${JSON.stringify({ areaShape, rank, targeting })}.`,
      );
    }

    const hitEffect = requiresNoDamageResistance
      ? `Each target with no remaining damage resistance is ${debuff} as a condition.`
      : `Each target is ${debuff} as a condition.`;
    effect = `Make an attack against everything in a ${area}.
Hit: ${hitEffect}`;
    monsterEffect = `The $name makes a ${accuracyText} attack vs. $defense against everything in a ${area}.
Hit: ${hitEffect}`;
  }

  const rowId = generateRowID();
  const prefix = `repeating_nondamagingattacks_${rowId}`;

  setAttrs({
    [`${prefix}_attack_accuracy`]: accuracyModifier,
    [`${prefix}_attack_effect`]: effect,
    [`${prefix}_attack_name`]: name,
    [`${prefix}_is_magical`]: isMagical,
    [`${prefix}_is_targeted`]: isTargeted,
    [`${prefix}_monster_effect`]: monsterEffect,
    [`${prefix}_usage_time`]: usageTime,
  });
}

function targetingIsTargeted(targeting: MonsterAttackTargeting) {
  return targeting !== 'small_area' && targeting !== 'large_area';
}

function calculateEffectRankModifier(targeting: MonsterAttackTargeting) {
  return {
    targeted_medium: 0,
    targeted_touch: 2,
    targeted_short: 1,
    targeted_long: -1,
    small_area: -1,
    large_area: -2,
  }[targeting];
}

function calcAttackArea({
  areaShape,
  rank,
  targeting,
}: {
  areaShape: MonsterAttackAreaShape;
  rank: number;
  targeting: MonsterAttackTargeting;
}) {
  const areaRank = targeting === 'small_area' ? Math.floor(rank / 2) : rank;

  if (areaShape === 'cone' || areaShape === 'default') {
    return {
      1: '15 foot cone',
      2: '30 foot cone',
      3: '60 foot cone',
      4: '60 foot cone',
      5: '90 foot cone',
      6: '90 foot cone',
      7: '120 foot cone',
      8: '120 foot cone',
      9: '180 foot cone',
    }[areaRank];
  } else if (areaShape === 'line') {
    return {
      0: '15 foot long, 5 foot wide line',
      1: '30 foot long, 5 foot wide line',
      2: '60 foot long, 5 foot wide line',
      3: '60 foot long, 10 foot wide line',
      4: '60 foot long, 15 foot wide line',
      5: '90 foot long, 15 foot wide line',
      6: '120 foot long, 15 foot wide line',
      7: '180 foot long, 15 foot wide line',
      8: '180 foot long, 15 foot wide line',
    }[areaRank];
  } else if (areaShape === 'radius_from_self') {
    return {
      0: '5 foot radius',
      // This is cheating a bit; normally, radius scaling is stronger at low ranks.
      // However, monsters benefit more from "radius from self" effects than players do.
      1: '10 foot radius',
      2: '15 foot radius',
      3: '30 foot radius',
      4: '60 foot radius',
      5: '90 foot radius',
      6: '90 foot radius',
      7: '120 foot radius',
      8: '180 foot radius',
    }[areaRank];
  } else if (areaShape === 'radius_at_range') {
    return {
      1: '5 foot radius within 30 feet',
      2: '15 foot radius within 30 feet',
      3: '15 foot radius within 60 feet',
      4: '30 foot radius within 60 feet',
      5: '30 foot radius within 90 feet',
      6: '30 foot radius within 120 feet',
      7: '60 foot radius within 120 feet',
      8: '60 foot radius within 180 feet',
      9: '60 foot radius within 180 feet',
    }[areaRank];
  }
}

function handleMonsterToggles() {
  onGet({
    variables: {
      numeric: ['challenge_rating'],
    },
    options: {
      variablesWithoutListen: {
        string: ['chat_color'],
      },
    },
    callback: (v) => {
      if (v.challenge_rating! > 0) {
        setAttrs({
          chat_color: 'monster',
          is_monster: true,
          player_chat_color: v.chat_color,
        });
      } else {
        setAttrs({
          chat_color: v.chat_color || 'black',
          is_monster: false,
        });
      }
    },
  });
}

function handleNonArmorDefense(defense: string, attribute: string) {
  onGet({
    variables: {
      miscName: defense,
      numeric: [
        'level',
        attribute,
        'challenge_rating',
        'all_defenses_vital_wound_modifier',
        'size_reflex_modifier',
      ],
    },
    callback: (v) => {
      const base = 3;
      const levelModifier = Math.floor(v.level / 2);
      const crModifier = calcDefenseCrScaling(v.level, v.challenge_rating);
      let sizeModifier = 0;
      if (defense === 'reflex') {
        sizeModifier = v.size_reflex_modifier;
      } else if (defense === 'brawn') {
        sizeModifier = -v.size_reflex_modifier;
      }
      // Monsters only apply half attribute modifier
      const attributeModifier = v.challenge_rating ? Math.floor(v[attribute] / 2) : v[attribute];
      let totalValue =
        base +
        levelModifier +
        crModifier +
        sizeModifier +
        attributeModifier +
        v.misc +
        v.all_defenses_vital_wound_modifier;

      setAttrs({
        [defense]: totalValue,
        [`${defense}_explanation`]: formatCombinedExplanation(v.miscExplanation, [
          { name: 'base', value: base },
          { name: 'level', value: levelModifier },
          { name: ATTRIBUTE_SHORTHAND[attribute], value: v[attribute] },
          { name: 'size', value: sizeModifier },
          { name: 'vital', value: v.all_defenses_vital_wound_modifier },
          { name: 'CR', value: crModifier },
        ]),
      });
    },
  });
}

function handleMagicalPower() {
  onGet({
    variables: {
      miscName: 'magical_power',
      numeric: ['challenge_rating', 'level', 'willpower'],
    },
    callback: (v) => {
      const eliteModifier = v.challenge_rating == 4 ? 2 : 0;
      const totalValue = Math.floor(v.level / 2) + v.willpower + v.misc + eliteModifier;

      setAttrs({
        magical_power: totalValue,
        magical_power_explanation: formatCombinedExplanation(v.miscExplanation, [
          {
            name: `half level`,
            value: Math.floor(v.level / 2),
          },
          {
            name: `Wil`,
            value: v.willpower,
          },
          {
            name: `Elite`,
            value: eliteModifier,
          },
        ]),
      });
    },
  });
}

function handleMundanePower() {
  onGet({
    variables: {
      miscName: 'mundane_power',
      numeric: ['challenge_rating', 'level', 'strength'],
    },
    callback: (v) => {
      const eliteModifier = v.challenge_rating == 4 ? 2 : 0;
      const totalValue = Math.floor(v.level / 2) + v.strength + v.misc + eliteModifier;

      setAttrs({
        mundane_power: totalValue,
        mundane_power_explanation: formatCombinedExplanation(v.miscExplanation, [
          {
            name: `half level`,
            value: Math.floor(v.level / 2),
          },
          {
            name: `Str`,
            value: v.strength,
          },
          {
            name: `Elite`,
            value: eliteModifier,
          },
        ]),
      });
    },
  });
}

// function handleRust() {
//   onGet({
//     variables: {
//       numeric: [
//         "level",
//         "challenge_rating",
//         "strength",
//         "dexterity",
//         "constitution",
//         "intelligence",
//         "perception",
//         "willpower",
//       ],
//       string: [
//         "alignment",
//         "character_name",
//         "size",
//         "weapon_0_name",
//         "weapon_1_name",
//         "weapon_2_name",
//         "weapon_3_name",
//       ],
//     },
//     callback: (v) => {
//       const alignment = v.alignment ? `Usually ${v.alignment}` : "";
//       const attributes = [
//         v.strength,
//         v.dexterity,
//         v.constitution,
//         v.intelligence,
//         v.perception,
//         v.willpower,
//       ];
//       const cr = {
//         1: "One",
//         4: "Four",
//       }[v.challenge_rating!];
//       const weapons = [];
//       for (const weaponName of [
//         v.weapon_0_name,
//         v.weapon_1_name,
//         v.weapon_2_name,
//         v.weapon_3_name,
//       ]) {
//         if (weaponName) {
//           weapons.push(`StandardWeapon::${weaponName}.weapon()`);
//         }
//       }
//       const weaponText = `vec![${weapons.join(", ")}]`;
//       const rust = `
//                 FullMonsterDefinition {
//                     alignment: "${alignment}",
//                     attributes: vec![${attributes.join(", ")}],
//                     challenge_rating: ChallengeRating::${cr},
//                     description: None,
//                     knowledge: None,
//                     level: ${v.level},
//                     modifiers: None,
//                     movement_speeds: None,
//                     name: "${v.character_name}",
//                     senses: None,
//                     size: Size::${v.size || "Medium"},
//                     trained_skills: None,
//                     weapons: ${weaponText},
//                 }
//             `.trim();
//       setAttrs({
//         rust,
//         is_monster: v.challenge_rating! > 0 ? "1" : "0",
//       });
//     }
//   });
// }

function handleSize() {
  onGet({
    variables: {
      string: ['size'],
    },
    callback: (v) => {
      // Size modifiers are repetitive, so multiplying this value is easier.
      const stepsFromMedium =
        {
          fine: -4,
          diminutive: -3,
          tiny: -2,
          small: -1,
          medium: 0,
          large: 1,
          huge: 2,
          gargantuan: 3,
          colossal: 4,
        }[v.size!] || 0;

      let baseSpeed = 0;
      if (stepsFromMedium === 4) {
        // Colossal is a special case
        baseSpeed = 80;
      } else if (stepsFromMedium >= 0) {
        baseSpeed = 30 + stepsFromMedium * 10;
      } else if (stepsFromMedium >= -2) {
        baseSpeed = 20;
      } else {
        baseSpeed = 10;
      }

      const reflexDefense = -stepsFromMedium;
      const stealth = -stepsFromMedium * 5;

      setAttrs({
        base_speed: baseSpeed,
        size_reflex_modifier: reflexDefense,
        size_stealth_modifier: stealth,
        size_weight_modifier: stepsFromMedium,
      });
    },
  });
}

function handleSkillPoints() {
  onGet({
    variables: {
      miscName: 'nonclass_skill_count',
      numeric: ['class_skill_count', 'intelligence'],
      string: ['base_class'],
    },
    callback: (v) => {
      const fromInt = Math.max(0, v.intelligence);
      setAttrs({
        nonclass_skill_count: fromInt + v.misc,
        trained_skills: fromInt + v.misc + v.class_skill_count,
        trained_skills_explanation: formatCombinedExplanation(v.miscExplanation, [
          {
            name: v.base_class + ' class skills',
            value: v.class_skill_count,
          },
          { name: 'Int', value: v.intelligence },
        ]),
      });
    },
  });
}

function handleTrainedSkills() {
  on(`change:repeating_trainedskills`, function (eventInfo) {
    const trainedSkill = formatParseableSkillName(eventInfo.newValue);
    const untrainedSkill = formatParseableSkillName(eventInfo.previousValue);

    const attrs: Attrs = {};
    if (trainedSkill) {
      attrs[`${trainedSkill}_is_trained`] = '1';
    }
    if (untrainedSkill && untrainedSkill !== trainedSkill) {
      attrs[`${untrainedSkill}_is_trained`] = '0';
    }

    let untrainedFromRootSkill = null;
    for (const skillWithSubskill of SKILLS_WITH_SUBSKILLS) {
      if (trainedSkill && trainedSkill.startsWith(skillWithSubskill)) {
        const subskill = trainedSkill.replace(skillWithSubskill + '_', '');
        const rowId = generateRowID();
        const prefix = `repeating_${skillWithSubskill}subskills_${rowId}`;
        attrs[`${trainedSkill}_subskill_rowid`] = rowId;
        attrs[`${prefix}_subskill_modifier_name`] = `${skillWithSubskill}_${subskill}`;
        const fullSkillDescriptor = uppercaseFirstLetter(skillWithSubskill) + ` (${subskill})`;
        attrs[`${prefix}_subskill_button`] =
          `@{character_name} uses ${fullSkillDescriptor}:` + ` [[d10 + @{${trainedSkill}}]]`;
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
        removeRepeatingRow(`repeating_${untrainedFromRootSkill}subskills_${rowId}`);
        attrs[`${untrainedSkill}_subskill_rowid`] = '';
        setAttrs(attrs);
      });
    } else {
      setAttrs(attrs);
    }
  });

  on(`remove:repeating_trainedskills`, function (eventInfo) {
    const skillNameKey = Object.keys(eventInfo.removedInfo).find((k) =>
      k.endsWith('trained_skill'),
    );
    if (!skillNameKey) {
      throw new Error('Could not find skillNameKey for trained skill removal');
    }
    const untrainedSkill = formatParseableSkillName(eventInfo.removedInfo[skillNameKey]);
    if (!untrainedSkill) {
      return;
    }
    const attrs = {
      [`${untrainedSkill}_is_trained`]: '0',
    };
    for (const skillWithSubskill of SKILLS_WITH_SUBSKILLS) {
      if (untrainedSkill.startsWith(skillWithSubskill)) {
        const rowIdKey = Object.keys(eventInfo.removedInfo).find((k) => k.endsWith('front_rowid'));
        if (!rowIdKey) {
          throw new Error('Could not find rowIdKey for trained skill removal');
        }
        const rowId = eventInfo.removedInfo[rowIdKey];
        removeRepeatingRow(`repeating_${skillWithSubskill}subskills_${rowId}`);
        attrs[`${untrainedSkill}_subskill_rowid`] = '';
      }
    }
    setAttrs(attrs);
  });

  const skillsAreTrained = ALL_SKILLS.map(
    (s) => s.toLowerCase().replaceAll(' ', '_') + '_is_trained',
  );

  onGet({
    variables: {
      boolean: skillsAreTrained,
    },
    callback: (v) => {
      let skillPointsSpent = 0;
      for (const skillIsTrained of skillsAreTrained) {
        if (v[skillIsTrained]) {
          skillPointsSpent += 1;
        }
      }
      setAttrs({
        skill_points_spent: skillPointsSpent,
      });
    },
  });
}

function handleSkills() {
  for (const attribute of Object.keys(SKILLS_BY_ATTRIBUTE)) {
    for (let skill of SKILLS_BY_ATTRIBUTE[attribute]) {
      const numeric = [
        'fatigue_penalty',
        'level',
        'size_stealth_modifier',
        ...customModifierNames('all_skills'),
      ];
      const shouldAddAttribute = attribute !== 'other';
      const shouldSubtractEncumbrance = attribute === 'strength' || attribute === 'dexterity';
      if (shouldAddAttribute) {
        numeric.push(attribute);
      }
      if (shouldSubtractEncumbrance) {
        numeric.push('encumbrance');
      }
      onGet({
        variables: {
          boolean: [`${skill}_is_trained`],
          miscName: skill,
          numeric,
          string: [`${skill}_subskill_rowid`],
        },
        callback: (v) => {
          const isTrained = v[`${skill}_is_trained`];
          const fromTraining = isTrained ? 3 + Math.floor(v.level / 2) : 0;
          const encumbranceModifier = v.encumbrance || 0;
          const attributeModifier = v[attribute] || 0;
          let skillValue =
            fromTraining +
            attributeModifier +
            v.misc +
            sumCustomModifiers(v, 'all_skills') -
            v.fatigue_penalty -
            encumbranceModifier;

          if (skill === 'stealth') {
            skillValue += v.size_stealth_modifier;
          }

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
            const [baseSkill] = skill.split('_');
            attrs[`repeating_${baseSkill}subskills_${rowId}_subskill_modifier`] = skillValue;
          }

          setAttrs(attrs);
        },
      });
    }
  }
}

function handleSpecialDefenses() {
  const specialDefenses = ['immune', 'impervious', 'vulnerable'];
  const stringVars = [];
  for (const specialDefense of specialDefenses) {
    for (const customModifierType of CUSTOM_MODIFIER_TYPES) {
      stringVars.push(`${specialDefense}_${customModifierType}_modifier`);
    }
  }
  onGet({
    variables: {
      string: stringVars,
    },
    callback: (v) => {
      const attrs: Record<string, string> = {};
      for (const specialDefense of specialDefenses) {
        const unsorted = CUSTOM_MODIFIER_TYPES.map((m) => v[`${specialDefense}_${m}_modifier`])
          .filter(Boolean)
          .join(', ');
        const sorted = unsorted
          .split(', ')
          .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        attrs[specialDefense] = sorted.join(', ');
      }
      setAttrs(attrs);
    },
  });
}

function uppercaseFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getDicePoolAttrs(keyPrefix: string, dicePoolKey: string, callback: DicePoolCallback) {
  dicePoolKey = `${keyPrefix}_${dicePoolKey}`;
  const isMagicalKey = `${keyPrefix}_is_magical`;
  getAttrs(['mundane_power', 'magical_power', dicePoolKey, isMagicalKey], function (attrs) {
    callback(
      calculateDicePoolModifier({
        dicePool: attrs[dicePoolKey],
        power: attrs[isMagicalKey] ? attrs.magical_power : attrs.mundane_power,
      }),
    );
  });
}

function setCalculatedDicePool(keyPrefix: string, { dicePool }: DicePool) {
  setAttrs({
    [`${keyPrefix}_calculated_dice_pool`]: dicePool,
  });
}

type DicePoolCallback = (dicePool: DicePool) => void;
interface DicePool {
  dicePool: string;
}

// In the past, we used power to calculate the real dice pool.
// TODO: clean this up so we don't pretend to calculate anything here.
function calculateDicePoolModifier(arg: { dicePool: string; power: string }): DicePool {
  return {
    dicePool: arg.dicePool,
  };
}

function handleOtherDamagingAttacks() {
  // We need two functions here! One updates a specific attack when that
  // specific attack changes, and one updates *all* attacks when general
  // character changes happen.
  function getOdaDamageDiceAttrs(keyPrefix: string, callback: DicePoolCallback) {
    return getDicePoolAttrs(keyPrefix, 'attack_damage_dice', callback);
  }

  // Local other damaging attack change
  on(
    'change:repeating_otherdamagingattacks:attack_damage_dice' +
      ' change:repeating_otherdamagingattacks:is_magical',
    function () {
      getOdaDamageDiceAttrs('repeating_otherdamagingattacks', (parsed) => {
        setCalculatedDicePool('repeating_otherdamagingattacks', parsed);
      });
    },
  );

  // Global other damaging attack change
  on('change:magical_power change:mundane_power change:level', function () {
    getSectionIDs('repeating_otherdamagingattacks', (repeatingSectionIds) => {
      for (const sectionId of repeatingSectionIds) {
        getOdaDamageDiceAttrs(`repeating_otherdamagingattacks_${sectionId}`, (parsed) => {
          setCalculatedDicePool(`repeating_otherdamagingattacks_${sectionId}`, parsed);
        });
      }
    });
  });
}

interface StrikeAttackAttrs {
  extraDamage: string;
  weaponDamageMultiplier: number;
  weaponDice: string[];
  weaponExistence: Record<string, boolean>;
  weaponExtraDamage: string[];
}

function handleStrikeAttacks() {
  function getStrikeAttrs(sectionId: string, callback: (attrs: StrikeAttackAttrs) => void) {
    if (sectionId) {
      sectionId = sectionId + '_';
    }
    const extra_damage_key = `repeating_strikeattacks_${sectionId}attack_extra_damage`;
    const is_magical_key = `repeating_strikeattacks_${sectionId}is_magical`;
    const multiplier_key = `repeating_strikeattacks_${sectionId}weapon_damage_multiplier`;
    const weapon_keys = [];
    for (let i = 0; i < supportedWeaponCount; i++) {
      weapon_keys.push(`weapon_${i}_magical_damage_total`);
      weapon_keys.push(`weapon_${i}_mundane_damage_total`);
      weapon_keys.push(`weapon_${i}_extra_damage`);
      weapon_keys.push(`weapon_${i}_exists`);
    }
    getAttrs(
      [
        extra_damage_key,
        is_magical_key,
        multiplier_key,
        ...weapon_keys,
        // These aren't used as variables, but we need to listen to them
        'magical_power',
        'mundane_power',
      ],
      function (v) {
        const dice_type = v[is_magical_key] === '1' ? 'magical' : 'mundane';

        // We need to copy the weapon_exists keys into the local repeating section.
        const weaponExistence: Record<string, boolean> = {};
        const weaponDice: string[] = [];
        const weaponExtraDamage: string[] = [];
        for (let i = 0; i < supportedWeaponCount; i++) {
          weaponDice.push(v[`weapon_${i}_${dice_type}_damage_total`]);
          weaponExtraDamage.push(v[`weapon_${i}_extra_damage`]);
          weaponExistence[`repeating_strikeattacks_${sectionId}weapon_${i}_exists_local`] = Boolean(
            v[`weapon_${i}_exists`],
          );
        }

        callback({
          extraDamage: v[extra_damage_key],
          weaponDamageMultiplier: v[multiplier_key] ? Number(v[multiplier_key]) : 1,
          weaponDice,
          weaponExtraDamage,
          weaponExistence,
        });
      },
    );
  }

  function setStrikeTotalDamage(sectionId: string, parsed: StrikeAttackAttrs) {
    if (sectionId) {
      sectionId += '_';
    }
    const attrs: Attrs = parsed.weaponExistence;
    for (let i = 0; i < supportedWeaponCount; i++) {
      const weapon_prefix = `repeating_strikeattacks_${sectionId}weapon_${i}_`;
      const multipliedWeaponDamage =
        parsed.weaponDamageMultiplier === 1
          ? parsed.weaponDice[i]
          : `${parsed.weaponDamageMultiplier}*(${parsed.weaponDice[i]})`;
      const damageComponents = [
        multipliedWeaponDamage,
        parsed.weaponExtraDamage[i],
        parsed.extraDamage,
      ];
      attrs[weapon_prefix + 'total_damage'] = damageComponents.filter(Boolean).join('+');
    }
    setAttrs(attrs);
  }

  // Local strike attack change
  on(
    'change:repeating_strikeattacks:attack_name change:repeating_strikeattacks:is_magical change:repeating_strikeattacks:attack_extra_damage change:repeating_strikeattacks:weapon_damage_multiplier',
    function () {
      getStrikeAttrs('', (parsed: StrikeAttackAttrs) => {
        setStrikeTotalDamage('', parsed);
      });
    },
  );

  const weaponChangeKeys = [];
  for (let i = 0; i < supportedWeaponCount; i++) {
    weaponChangeKeys.push(`change:weapon_${i}_magical_damage_total`);
    weaponChangeKeys.push(`change:weapon_${i}_mundane_damage_total`);
    weaponChangeKeys.push(`change:weapon_${i}_extra_damage`);
  }

  // Global strike attack change
  on(
    weaponChangeKeys.join(' ') + ' change:level change:magical_power change:mundane_power',
    function () {
      getSectionIDs('repeating_strikeattacks', (repeatingSectionIds) => {
        for (const sectionId of repeatingSectionIds) {
          getStrikeAttrs(sectionId, (parsed: StrikeAttackAttrs) => {
            setStrikeTotalDamage(sectionId, parsed);
          });
        }
      });
    },
  );

  // Weapon change
  // for (let i = 0; i < 3; i++) {
  //   on(
  //     `change:weapon_${i}_damage_dice` +
  //       " change:feat_name_0 change:feat_name_1 change:feat_name_2 change:feat_name_3" +
  //       " change:level change:weapon_damage_dice" +
  //       " change:strength change:intelligence change:willpower",
  //     function () {
  //       getWeaponDamageDiceAttrs(i, (parsed) => {
  //         const { magical, mundane } = calcWeaponDamageStrings(parsed);
  //         setAttrs({
  //           [`weapon_${i}_magical_dice`]: magical,
  //           [`weapon_${i}_mundane_dice`]: mundane,
  //         });
  //       });
  //     }
  //   );
  // }

  // Changing whether a strike is targeted
}

function handleUniversalAbilities() {
  onGet({
    variables: { numeric: ['strength', 'level', 'accuracy', 'flexibility'] },
    callback: (v) => {
      setAttrs({
        escape_grapple_accuracy: Math.max(
          v.accuracy,
          Math.floor(v.level / 2) + v.strength,
          v.flexibility_total,
        ),
        maintain_grapple_accuracy: Math.max(v.accuracy, Math.floor(v.level / 2) + v.strength),
      });
    },
  });
}

function handleUnknownStatistic() {
  onGet({
    variables: { miscName: 'unknown_statistic' },
    callback: (v) => {
      setAttrs({
        unknown_statistic: v.misc,
      });
    },
  });
}

function handleVitalRolls() {
  onGet({
    variables: {
      miscName: 'vital_rolls',
      numeric: ['vital_wound_count', 'body_armor_vital_rolls'],
    },
    callback: (v) => {
      const totalValue = v.misc + v.body_armor_vital_rolls - v.vital_wound_count * 2;
      setAttrs({
        vital_rolls: totalValue,
        vital_rolls_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'body armor', value: v.body_armor_vital_rolls },
          { name: '2x vital wound count', value: -v.vital_wound_count * 2 },
        ]),
      });
    },
  });
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns an integer between 1 and dieSize, inclusive.
function rollDie(dieSize: number) {
  return Math.floor(Math.random() * dieSize) + 1;
}

function handleVitalWounds() {
  function calcVitalWoundEffect(roll: number) {
    if (roll <= -6) {
      return 'Immediately die';
    } else if (roll <= 0) {
      return 'Unconscious, die after a minute';
    } else if (roll >= 10) {
      return 'No effect';
    }
    return {
      1: 'Unconscious below half HP',
      2: '-1 accuracy',
      3: '-5 foot speed',
      4: '-2 fatigue tolerance',
      5: '-1 all defenses',
      6: '-2 Brawn',
      7: '-2 Fortitude',
      8: '-2 Reflex',
      9: '-2 Mental',
    }[roll];
  }

  function countRolls(rolls: number[], value: number) {
    return rolls.filter((r) => r == value).length;
  }

  on('clicked:gainvitalwound', () => {
    getAttrs(['vital_rolls'], (rawAttrs: Attrs) => {
      const rowId = generateRowID();
      const vitalRollResult = rollDie(10) + Number(rawAttrs.vital_rolls || 0);
      setAttrs({
        [`repeating_vitalwounds_${rowId}_vital_wound_roll`]: vitalRollResult,
      });
    });
  });

  on(
    'change:repeating_vitalwounds:vital_wound_roll remove:repeating_vitalwounds',
    function (eventInfo) {
      getSectionIDs('repeating_vitalwounds', (repeatingSectionIds) => {
        // Not sure if this is necessary
        repeatingSectionIds = repeatingSectionIds || [];

        const vitalWoundRollIds = repeatingSectionIds.map(
          (id) => `repeating_vitalwounds_${id}_vital_wound_roll`,
        );
        getAttrs(vitalWoundRollIds, (values) => {
          let rolls = Object.values(values);
          let accuracy_penalty = -countRolls(rolls, 2);
          let speed_penalty = countRolls(rolls, 3) * -5;
          let fatigue_tolerance_penalty = -countRolls(rolls, 4) * 2;
          let all_defenses_penalty = -countRolls(rolls, 5);
          let brawn_penalty = -countRolls(rolls, 6) * 2;
          let fortitude_penalty = -countRolls(rolls, 7) * 2;
          let reflex_penalty = -countRolls(rolls, 8) * 2;
          let mental_penalty = -countRolls(rolls, 9) * 2;

          const attrs: Attrs = {
            vital_wound_count: repeatingSectionIds.length,

            // accuracy - applies to both regular and brawling accuracy
            accuracy_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: accuracy_penalty,
            }),
            accuracy_vital_wound_modifier: accuracy_penalty,
            brawling_accuracy_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: accuracy_penalty,
            }),
            brawling_accuracy_vital_wound_modifier: accuracy_penalty,

            // all defenses - no vital explanation here because all_defenses requires special handling
            all_defenses_vital_wound_modifier: all_defenses_penalty,

            // fatigue_tolerance
            fatigue_tolerance_vital_wound_modifier: fatigue_tolerance_penalty,
            fatigue_tolerance_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: fatigue_tolerance_penalty,
            }),

            brawn_vital_wound_modifier: brawn_penalty,
            brawn_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: brawn_penalty,
            }),

            // fortitude
            fortitude_vital_wound_modifier: fortitude_penalty,
            fortitude_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: fortitude_penalty,
            }),

            // mental
            mental_vital_wound_modifier: mental_penalty,
            mental_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: mental_penalty,
            }),

            // reflex
            reflex_vital_wound_modifier: reflex_penalty,
            reflex_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: reflex_penalty,
            }),

            // speed
            speed_vital_wound_modifier: speed_penalty,
            speed_vital_wound_explanation: formatNamedModifierExplanation({
              name: 'vital',
              value: speed_penalty,
            }),
          };
          if (eventInfo.triggerName != 'remove:repeating_vitalwounds') {
            let effect_id = eventInfo.sourceAttribute.replaceAll('_roll', '_effect');
            attrs[effect_id] = calcVitalWoundEffect(Number(eventInfo.newValue));
          }
          setAttrs(attrs);
        });
      });
    },
  );
}

function handleWeaponDamageDice() {
  for (const weaponIndex of Array(supportedWeaponCount).keys()) {
    const heavyKey = `weapon_${weaponIndex}_heavy`;
    const ignorePowerKey = `weapon_${weaponIndex}_ignore_power`;
    const damageDiceKey = `weapon_${weaponIndex}_damage_dice`;
    const nameKey = `weapon_${weaponIndex}_name`;
    const magicalTotalKey = `weapon_${weaponIndex}_magical_damage_total`;
    const mundaneTotalKey = `weapon_${weaponIndex}_mundane_damage_total`;
    const weaponExistsKey = `weapon_${weaponIndex}_exists`;

    onGet({
      variables: {
        boolean: [heavyKey, ignorePowerKey],
        numeric: ['strength', 'willpower', 'mundane_power', 'magical_power'],
        string: [damageDiceKey, nameKey],
      },
      callback: (v) => {
        if (!v[nameKey]) {
          setAttrs({
            [magicalTotalKey]: '',
            [mundaneTotalKey]: '',
            [weaponExistsKey]: 0,
          });

          return;
        }

        let magicalPowerBonus = Math.floor(v.magical_power / 2);
        let mundanePowerBonus = Math.floor(v.mundane_power / 2);
        if (v[heavyKey]) {
          magicalPowerBonus += Math.max(0, Math.floor(v.magical_power / 3));
          mundanePowerBonus += Math.max(0, Math.floor(v.mundane_power / 3));
        }

        let magicalTotal = v[damageDiceKey];
        let mundaneTotal = v[damageDiceKey];
        if (!v[ignorePowerKey]) {
          if (magicalPowerBonus > 0) {
            magicalTotal += `+${magicalPowerBonus}`;
          } else if (magicalPowerBonus < 0) {
            magicalTotal += `${magicalPowerBonus}`;
          }
          if (mundanePowerBonus > 0) {
            mundaneTotal += `+${mundanePowerBonus}`;
          } else if (mundanePowerBonus < 0) {
            mundaneTotal += `${mundanePowerBonus}`;
          }
        }

        setAttrs({
          [magicalTotalKey]: magicalTotal,
          [mundaneTotalKey]: mundaneTotal,
          [weaponExistsKey]: magicalTotal !== '' || mundaneTotal !== '',
        });
      },
    });
  }
}

function handleWeightLimits() {
  onGet({
    variables: {
      miscName: 'weight_limits',
      numeric: ['strength', 'size_weight_modifier'],
    },
    callback: (v) => {
      const effectiveStrength = v.strength + v.size_weight_modifier + v.misc;
      const carrying = calcWeightLimitCategory(effectiveStrength);
      const pushDrag = calcWeightLimitCategory(effectiveStrength + 3);

      setAttrs({
        carrying_weight_limit_category: carrying,
        push_drag_weight_limit_category: pushDrag,
        // This is a numeric value shown on the Calcs page
        carrying_strength: effectiveStrength,
        carrying_strength_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'strength', value: v.strength },
          { name: 'size', value: v.size_weight_modifier },
        ]),
        push_drag_strength: effectiveStrength + 3,
        push_drag_strength_explanation: formatCombinedExplanation(v.miscExplanation, [
          { name: 'push/drag', value: 3 },
          { name: 'strength', value: v.strength },
          { name: 'size', value: v.size_weight_modifier },
        ]),
      });
    },
  });
}

function calcWeightLimitCategory(effectiveStrength: number) {
  if (effectiveStrength > 15) {
    return 'Colossal (any)';
  }

  const weightCategory = {
    '-9': 'Fine x4',
    '-8': 'Fine x8',
    '-7': 'Diminutive x2',
    '-6': 'Diminutive x4',
    '-5': 'Diminutive x8',
    '-4': 'Tiny x2',
    '-3': 'Tiny x4',
    '-2': 'Tiny x8',
    '-1': 'Small x2',
    '0': 'Small x4',
    '1': 'Small x8',
    '2': 'Medium x2',
    '3': 'Medium x4',
    '4': 'Medium x8',
    '5': 'Large x2',
    '6': 'Large x4',
    '7': 'Large x8',
    '8': 'Huge x2',
    '9': 'Huge x4',
    '10': 'Huge x8',
    '11': 'Gargantuan x2',
    '12': 'Gargantuan x4',
    '13': 'Gargantuan x8',
    '14': 'Colossal x2',
    '15': 'Colossal x4',
    '16': 'Colossal x8',
  }[effectiveStrength];
  if (weightCategory) {
    return weightCategory;
  }
  throw new Error(`No match for effective strength '${effectiveStrength}'.`);
}

function collectNamedModifierExplanations(namedModifiers: NamedModifier[]) {
  return namedModifiers.map(formatNamedModifierExplanation).filter(Boolean).join(',');
}

function formatNamedModifierExplanation({ name, value }: NamedModifier) {
  if (value === 0) {
    return '';
  }
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value} (${name})`;
}

interface NamedModifier {
  name: string;
  value: number;
}

function formatCombinedExplanation(miscExplanation: string, localNamedModifiers?: NamedModifier[]) {
  // miscExplanation is comma-separated because we can't save lists as attributes, so we
  // need to split it and reformat the whole thing together. First, put the local
  // explanation in an identical format.
  const localExplanation = collectNamedModifierExplanations(localNamedModifiers || []);
  // Smash them all together into a single explanation, putting the local modifiers
  // first. We used comma separation so we can do fancier formatting if necessary, but a
  // simple space-separated list might work fine.
  return [localExplanation, miscExplanation].filter(Boolean).join(',').replaceAll(',', '  ');
}

function calculateStandardRank(level: number) {
  return Math.floor((level + 2) / 3);
}
