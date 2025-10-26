import t from 'tap';
import { getAttrs, setAttrs } from './roll20_shim';
import { resetDefaultCharacterSheet } from './current_character_sheet';
import { handleEverything } from './sheet_worker';

t.beforeEach(() => {
  resetDefaultCharacterSheet();
  handleEverything();
});

// Full plate and tower shield
function setStandardFighter() {
  setAttrs({
    armor_usage_class: 'heavy',
    base_class: 'fighter',
    body_armor_defense: 5,
    body_armor_durability: 8,
    body_armor_speed: -10,
    body_armor_vital_rolls: 2,
    shield_armor_defense: 3,
    constitution_at_creation: 2,
    dexterity_at_creation: 2,
    intelligence_at_creation: 0,
    level: 10,
    perception_at_creation: 0,
    strength_at_creation: 3,
    willpower_at_creation: 1,
  });
}

// Mage armor
function setStandardWizard() {
  setAttrs({
    armor_usage_class: 'light',
    base_class: 'wizard',
    body_armor_defense: 2,
    body_armor_durability: 2,
    constitution_at_creation: 0,
    dexterity_at_creation: 1,
    intelligence_at_creation: 3,
    level: 10,
    perception_at_creation: 2,
    strength_at_creation: 0,
    willpower_at_creation: 2,
  });
}

t.test('can calculate armor defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['armor_defense', 'armor_defense_explanation'], (attrs) => {
      t.match(attrs, {
        armor_defense: 13,
        armor_defense_explanation: '+5 (level)  +2 (Dex)  +5 (body armor)  +1 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['armor_defense', 'armor_defense_explanation'], (attrs) => {
      t.match(attrs, {
        armor_defense: 8,
        armor_defense_explanation: '+5 (level)  +1 (Dex)  +2 (body armor)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate durability', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['durability', 'durability_explanation'], (attrs) => {
      t.match(attrs, {
        durability: 16,
        durability_explanation: '+6 (level scaling)  +2 (Con)  +8 (body armor)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['durability', 'durability_explanation'], (attrs) => {
      t.match(attrs, {
        durability: 8,
        durability_explanation: '+6 (level scaling)  +2 (body armor)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate hit points', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 74,
        hit_points_explanation: '+10 (base)  +64 (4 * durability)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 42,
        hit_points_explanation: '+10 (base)  +32 (4 * durability)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate injury point', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['injury_point', 'injury_point_explanation'], (attrs) => {
      t.match(attrs, {
        injury_point: 34,
        injury_point_explanation: '+10 (base)  +20 (2 * level)  +4 (2 * Con)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['injury_point', 'injury_point_explanation'], (attrs) => {
      t.match(attrs, {
        injury_point: 30,
        injury_point_explanation: '+10 (base)  +20 (2 * level)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate fortitude defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['fortitude', 'fortitude_explanation'], (attrs) => {
      t.match(attrs, {
        fortitude: 10,
        fortitude_explanation: '+5 (level)  +2 (Con)  +3 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['fortitude', 'fortitude_explanation'], (attrs) => {
      t.match(attrs, {
        fortitude: 8,
        fortitude_explanation: '+5 (level)  +3 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate attunement points', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['attunement_points', 'attunement_points_explanation'], (attrs) => {
      t.match(attrs, {
        attunement_points: 3,
        attunement_points_explanation: '+3 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['attunement_points', 'attunement_points_explanation'], (attrs) => {
      t.match(attrs, {
        attunement_points: 4,
        attunement_points_explanation: '+4 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate insight points', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['insight_points', 'insight_points_explanation'], (attrs) => {
      t.match(attrs, {
        insight_points: 1,
        insight_points_explanation: '+1 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['insight_points', 'insight_points_explanation'], (attrs) => {
      t.match(attrs, {
        insight_points: 5,
        insight_points_explanation: '+3 (Int)  +2 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate fatigue tolerance', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['fatigue_tolerance', 'fatigue_tolerance_explanation'], (attrs) => {
      t.match(attrs, {
        fatigue_tolerance: 5,
        fatigue_tolerance_explanation: '+3 (fighter)  +2 (Con)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['fatigue_tolerance', 'fatigue_tolerance_explanation'], (attrs) => {
      t.match(attrs, {
        fatigue_tolerance: 2,
        fatigue_tolerance_explanation: '+2 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate speed', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['speed', 'speed_explanation'], (attrs) => {
      t.match(attrs, {
        speed: 20,
        speed_explanation: '+30 (base speed)  -10 (body armor)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['speed', 'speed_explanation'], (attrs) => {
      t.match(attrs, {
        speed: 30,
        speed_explanation: '+30 (base speed)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate brawn defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['brawn', 'brawn_explanation'], (attrs) => {
      t.match(attrs, {
        brawn: 11,
        brawn_explanation: '+5 (level)  +3 (Str)  +3 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['brawn', 'brawn_explanation'], (attrs) => {
      t.match(attrs, {
        brawn: 8,
        brawn_explanation: '+5 (level)  +3 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate reflex defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['reflex', 'reflex_explanation'], (attrs) => {
      t.match(attrs, {
        reflex: 10,
        reflex_explanation: '+5 (level)  +2 (Dex)  +3 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['reflex', 'reflex_explanation'], (attrs) => {
      t.match(attrs, {
        reflex: 9,
        reflex_explanation: '+5 (level)  +1 (Dex)  +3 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate mental defense', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['mental', 'mental_explanation'], (attrs) => {
      t.match(attrs, {
        mental: 9,
        mental_explanation: '+5 (level)  +1 (Wil)  +3 (fighter)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['mental', 'mental_explanation'], (attrs) => {
      t.match(attrs, {
        mental: 10,
        mental_explanation: '+5 (level)  +2 (Wil)  +3 (wizard)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate jump distance', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(
      [
        'horizontal_jump_distance',
        'horizontal_jump_distance_explanation',
        'vertical_jump_distance',
      ],
      (attrs) => {
        t.match(attrs, {
          horizontal_jump_distance: 10,
          horizontal_jump_distance_explanation: '+5 (base speed / 4)  +5 (strength)',
          vertical_jump_distance: 5,
        });
        t.end();
      },
    );
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(
      [
        'horizontal_jump_distance',
        'horizontal_jump_distance_explanation',
        'vertical_jump_distance',
      ],
      (attrs) => {
        t.match(attrs, {
          horizontal_jump_distance: 5,
          horizontal_jump_distance_explanation: '+5 (base speed / 4)',
          vertical_jump_distance: 0,
        });
        t.end();
      },
    );
  });

  t.end();
});

t.test('can calculate magical power', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['magical_power', 'magical_power_explanation'], (attrs) => {
      t.match(attrs, {
        magical_power: 6,
        magical_power_explanation: '+5 (half level)  +1 (Wil)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['magical_power', 'magical_power_explanation'], (attrs) => {
      t.match(attrs, {
        magical_power: 7,
        magical_power_explanation: '+5 (half level)  +2 (Wil)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate mundane power', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['mundane_power', 'mundane_power_explanation'], (attrs) => {
      t.match(attrs, {
        mundane_power: 8,
        mundane_power_explanation: '+5 (half level)  +3 (Str)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['mundane_power', 'mundane_power_explanation'], (attrs) => {
      t.match(attrs, {
        mundane_power: 5,
        mundane_power_explanation: '+5 (half level)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate fatigue penalty', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['fatigue_penalty'], (attrs) => {
      t.match(attrs, {
        fatigue_penalty: 0,
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['fatigue_penalty'], (attrs) => {
      t.match(attrs, {
        fatigue_penalty: 0,
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate accuracy', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['accuracy', 'accuracy_explanation'], (attrs) => {
      t.match(attrs, {
        accuracy: 5,
        accuracy_explanation: '+5 (level)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['accuracy', 'accuracy_explanation'], (attrs) => {
      t.match(attrs, {
        accuracy: 6,
        accuracy_explanation: '+5 (level)  +1 (Per)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate brawling accuracy', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['brawling_accuracy', 'brawling_accuracy_explanation'], (attrs) => {
      t.match(attrs, {
        brawling_accuracy: 6,
        brawling_accuracy_explanation: '+5 (level)  +1.5 (Str)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['brawling_accuracy', 'brawling_accuracy_explanation'], (attrs) => {
      t.match(attrs, {
        brawling_accuracy: 5,
        brawling_accuracy_explanation: '+5 (level)',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate weight limits', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['carrying_strength', 'carrying_strength_explanation'], (attrs) => {
      t.match(attrs, {
        carrying_strength: 3,
        carrying_strength_explanation: '+3 (strength)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['carrying_strength', 'carrying_strength_explanation'], (attrs) => {
      t.match(attrs, {
        carrying_strength: 0,
        carrying_strength_explanation: '',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can handle abilities known', (t) => {
  t.test('can set a known ability with a custom modifier', (t) => {
    setAttrs({
      combat_styles_known_permanent_modifier: 1,
      combat_styles_known_permanent_explanation: 'from class',
    });
    getAttrs(['has_combat_styles_known', 'combat_styles_known_explanation'], (attrs) => {
      t.match(attrs, {
        has_combat_styles_known: '1',
        combat_styles_known_explanation: 'from class',
      });
      t.end();
    });
  });

  t.test('can set a known ability without a custom modifier', (t) => {
    setAttrs({
      combat_styles_known_permanent_modifier: 0,
      combat_styles_known_permanent_explanation: '',
    });
    getAttrs(['has_combat_styles_known', 'combat_styles_known_explanation'], (attrs) => {
      t.match(attrs, {
        has_combat_styles_known: '0',
        combat_styles_known_explanation: '',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can calculate vital rolls', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['vital_rolls', 'vital_rolls_explanation'], (attrs) => {
      t.match(attrs, {
        vital_rolls: 2,
        vital_rolls_explanation: '+2 (body armor)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['vital_rolls', 'vital_rolls_explanation'], (attrs) => {
      t.match(attrs, {
        vital_rolls: 0,
        vital_rolls_explanation: '',
      });
      t.end();
    });
  });

  t.end();
});

t.test('can handle strike attacks', (t) => {
  const supportedWeaponCount = 4;

  t.test('calculates total damage for a single weapon strike attack', (t) => {
    // Set initial character and weapon attributes
    setAttrs({
      // Differentiate mundane power from magical power
      strength_at_creation: 3,
      weapon_0_name: 'Psionic Broadsword',
      weapon_0_extra_damage: '1',
      weapon_0_damage_dice: '1d6',
      // This will create a row ID, which is needed for the global change listener.
      // The `generateRowID` function is mocked by `roll20_shim` to return sequential IDs.
      repeating_strikeattacks_0_attack_name: 'Double Weapon Damage',
      repeating_strikeattacks_0_is_magical: false,
      repeating_strikeattacks_0_attack_extra_damage: '0',
      repeating_strikeattacks_0_weapon_damage_multiplier: '2',
      repeating_strikeattacks_0_damage_multiplier: '1',
    });

    // Trigger a global update; Roll20 does some internal magic to update repeating
    // sections appropriately from a local update, but we can only use the global one.
    setAttrs({
      level: 10,
    });

    getAttrs(['repeating_strikeattacks_0_weapon_0_total_damage'], (attrs) => {
      t.match(attrs, {
        repeating_strikeattacks_0_weapon_0_total_damage: '2*(1d6)+4+1+0',
      });
      t.end();
    });
  });

  t.end();
});
