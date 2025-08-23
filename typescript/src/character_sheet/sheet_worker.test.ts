import t from 'tap';
import { getAttrs, setAttrs } from './roll20_shim';
import { resetDefaultCharacterSheet } from './current_character_sheet';
import { handleEverything } from './sheet_worker';

t.beforeEach(() => {
  resetDefaultCharacterSheet();
  handleEverything();
});

function setStandardFighter() {
  setAttrs({
    armor_usage_class: 'heavy',
    base_class: 'fighter',
    body_armor_defense: 5,
    body_armor_speed: -10,
    constitution_at_creation: 2,
    dexterity_at_creation: 2,
    intelligence_at_creation: 0,
    level: 10,
    perception_at_creation: 0,
    strength_at_creation: 3,
    willpower_at_creation: 1,
  });
}

function setStandardWizard() {
  setAttrs({
    armor_usage_class: 'light',
    base_class: 'wizard',
    body_armor_defense: 2,
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


t.test('can calculate hit points', (t) => {
  t.test('for fighter', (t) => {
    setStandardFighter();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 35,
        hit_points_explanation: '+29 (level)  +6 (Con)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['hit_points_max', 'hit_points_explanation'], (attrs) => {
      t.match(attrs, {
        hit_points_max: 20,
        hit_points_explanation: '+20 (level)',
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
        attunement_points_explanation: '+3 (base)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['attunement_points', 'attunement_points_explanation'], (attrs) => {
      t.match(attrs, {
        attunement_points: 5,
        attunement_points_explanation: '+3 (base)  +2 (wizard)',
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
        insight_points_explanation: '+1 (base)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['insight_points', 'insight_points_explanation'], (attrs) => {
      t.match(attrs, {
        insight_points: 6,
        insight_points_explanation: '+1 (base)  +3 (Int)  +2 (wizard)',
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
        fatigue_tolerance_explanation: '+3 (base)  +2 (Con)',
      });
      t.end();
    });
  });

  t.test('for wizard', (t) => {
    setStandardWizard();
    getAttrs(['fatigue_tolerance', 'fatigue_tolerance_explanation'], (attrs) => {
      t.match(attrs, {
        fatigue_tolerance: 3,
        fatigue_tolerance_explanation: '+3 (base)',
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
