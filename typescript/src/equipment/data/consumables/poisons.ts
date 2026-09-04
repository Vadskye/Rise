import { Tool, RawConsumable } from '../../types';
import { getPoisonDescription } from '../../poison';
import { parseDamageRank, parseAccuracyModifier } from '@src/abilities/spell_profile';

const DEBUFF_PATTERN =
  /\\(sickened|slowed|dazed|blinded|confused|dazzled|weakened|vulnerable|exposed|dread|frightened|panicked|immobilized|charmed|deafened|unsteady|frozen|helpless)|vital wound/i;

export function validatePoison(data: RawConsumable): string[] {
  const warnings: string[] = [];

  // Debuff parsing is out of scope for now
  if (DEBUFF_PATTERN.test(data.description)) {
    return warnings;
  }

  // Only validate damaging poisons with recurring damage
  const actualDr = parseDamageRank(data.description);
  if (actualDr === null || !data.description.includes('immediately and with each escalation')) {
    return warnings;
  }

  const deliveryMatch = data.description.match(
    /(contact|ingestion|injury)-based\s+(gas|liquid|pellet|powder)\s+poison/i,
  );
  if (!deliveryMatch) {
    warnings.push(`Poison "${data.name}": unable to parse delivery method (exposure and form).`);
    for (const warning of warnings) {
      console.warn(warning);
    }
    return warnings;
  }

  const exposure = deliveryMatch[1].toLowerCase();
  const form = deliveryMatch[2].toLowerCase();

  const accuracy = parseAccuracyModifier(data.description);
  let accuracyDrDelta = 0;
  if (accuracy === 0) {
    accuracyDrDelta = 0;
  } else if (accuracy === -3) {
    accuracyDrDelta = 1;
  } else if (accuracy === 4) {
    accuracyDrDelta = -1;
  } else {
    warnings.push(
      `Poison "${data.name}": invalid accuracy modifier (${accuracy > 0 ? '+' : ''}${accuracy}). Damaging poisons should only use -3 accuracy (for +1dr), +4 accuracy (for -1dr), or 0.`,
    );
  }

  let expectedBaseDr: number | null = null;
  if (form === 'powder') {
    if (exposure === 'contact' || exposure === 'ingestion') {
      expectedBaseDr = data.rank + 1;
    }
  } else if (form === 'liquid') {
    if (exposure === 'contact') {
      expectedBaseDr = data.rank - 1;
    } else if (exposure === 'injury' || exposure === 'ingestion') {
      expectedBaseDr = data.rank + 1;
    }
  } else if (form === 'gas') {
    if (exposure === 'contact' || exposure === 'ingestion') {
      expectedBaseDr = data.rank - 1;
    }
  }

  if (expectedBaseDr === null) {
    warnings.push(
      `Poison "${data.name}": unhandled exposure/form combination (${exposure} ${form}).`,
    );
  } else {
    const expectedDr = expectedBaseDr + accuracyDrDelta;
    if (actualDr !== expectedDr) {
      warnings.push(
        `Poison "${data.name}" (Rank ${data.rank}, ${exposure} ${form}) deals $dr${actualDr}l damage, but expected $dr${expectedDr}l.`,
      );
    }
  }

  for (const warning of warnings) {
    console.warn(warning);
  }
  return warnings;
}

function createPoison(data: RawConsumable): Tool {
  validatePoison(data);
  return {
    category: 'Poison',
    item: {
      magical: false,
      rarity: 'Common',
      tags: data.tags || ['Poison'],
      upgrades: data.upgrades || [],
      ...data,
    },
  };
}

// The baseline for a consumable item of rank X is a spell of rank X+2.
//
// Normally, a "this turn and next turn" spell at Medium range is drX-2.
// "Every poison stage" is worse than "this turn and next turn" because it isn't
// guaranteed to deal damage next turn, but it's better because it can deal damage more often
// total, so call it equivalent. This is a bit generous, but eh.
// That translates to drX+2-2 = drX by default.
//
// Injury-only damage is normally +2 ranks. That translates to drX+1 by default.
// Injury-only poisons are worse than normal poisons because most of the power of a poison is its potential to last for a long time.
// Equivalently, injury-only damage is typically written as an instant execution effect, which doesn't fit for poison.
// Therefore, injury-only poisons get an extra +2dr, or +1dr flat, so drX+2 by default (ignoring application method).
//
// Pure debuff "debuff while poisoned" poisons are equivalent to a condition.
// The successes to resist a poison are similar enough to the automatic elite condition removal.
// Poisons cost +1 rank if their second escalation has a stronger debuff, since that's more likely to work
// than stronger debuffs on crits, which is the default.

// A powder poison typically requires a standard action to apply to an adjacent creature.
// Its effective spell rank is X+4 for contact/ingestion, never injury (including the +2 rank
// modifier for adjacent range).
// As a reminder, that means drX+1 is the standard damage value (+4 -> +2 from double hit -> +1
// from flat)
//
// A liquid contact poison typically requires a non-action to apply with a weapon.
// Apply a -2 effect rank penalty for the non-action combat application, and ignore range modifier.
// A liquid poison's effective spell rank is X for contact or injury, or X+2 for ingestion??
// Liquid ingestion is basically exclusive to non-combat, so give it +1dr.
// That means drX-1 is the standard damage value for contact, drX+1 for injury, and drX+1 for ingestion.
//
// A gas poison typically requires a standard action to apply to a Tiny radius zone within Short range.
// Its effective spell rank is X+1 for contact and ingestion (which can be blocked by holding
// breath, which is sometimes beneficial to make them asymmetric).
//
// Applying a debuff only on the second escalation is not quite as big of a penalty as injured-only,
// but it's significant. Injured is 0.4x, say that second escalation is x0.67 EA.
// It could possibly be lower, but this gives room to include damage so the poison does something
// before the second escalation debuff?
// So dazed is 2 EA or rank 4.
export function poisons(): Tool[] {
  return [
    createPoison({
      name: 'Poison, Snakeroot',
      rank: 0,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr1l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr1l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Nightshade',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'ingestion',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy-3.
          It inflicts $dr4l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Wolfsbane',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr1l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy+4.
          It inflicts $dr1l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Jellyfish Extract',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr0l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr0l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Baneberry',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr2l damage',
      description: getPoisonDescription(
        'ingestion',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Tree Frog Coating',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr2l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy-3.
          It inflicts $dr2l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Bloodroot',
      rank: 3,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr4l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Arsenic',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'ingestion',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Dragon Bile',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Mind Fog',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr2l damage and eventually stuns',
      description: getPoisonDescription(
        'ingestion',
        'gas',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
          The second escalation also makes the target \\dazed.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Black Lotus',
      rank: 6,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr5l damage',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr5l damage immediately and with each escalation.
        `,
      ),
    }),
    ...injuryPoisons(),
  ];
}

// These are stored in a separate function since they have different scaling.
// As noted above, the baseline damage over time for a liquid injury poison is
// drX+1 flat damage.
function injuryPoisons(): Tool[] {
  return [
    createPoison({
      name: 'Poison, Asp Venom',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Sickens',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          A poisoned creature is \\sickened while the poison lasts.
          The second escalation also inflicts $dr2l damage.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Formian Drone Venom',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr2l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
          The second escalation also ends the poison.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Giant Wasp Venom',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Slows',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+2.
          A poisoned creature is \\slowed while the poison lasts.
          The second escalation also inflicts $dr3l damage.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Black Adder Venom',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr3l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Wyvern Venom',
      rank: 3,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr4l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr4l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Blood Leech Venom',
      rank: 4,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr4l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+4.
          It inflicts $dr4l damage immediately and with each escalation.
        `,
      ),
    }),
    createPoison({
      name: 'Poison, Purple Worm Venom',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Repeatedly deals $dr6l damage',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr6l damage immediately and with each escalation.
        `,
      ),
    }),
    // Unclear rank for the special effect
    createPoison({
      name: 'Poison, Frostweb Spider Venom',
      rank: 5,
      attunement: 'Unrestricted',
      short_description: 'Slows and freezes',
      description: getPoisonDescription(
        'injury',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          A poisoned creature is \\slowed while the poison lasts.
          The second escalation also inflicts a \\glossterm{vital wound} with a unique vital wound effect.
          Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound}, the target becomes deathly cold.
          % TODO: is this measured from the target's turn or the spider's turn?
          Whenever it takes damage from a \\atCold ability, it becomes \\briefly \\helpless.
          This effect lasts until the vital wound is removed.
        `,
      ),
    }),
  ];
}
