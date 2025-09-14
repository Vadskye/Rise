import { SpellLike } from '@src/mystic_spheres';

const damageRankPattern = /damagerank(\w+)\b/;
const damageRankLowPattern = /damagerank(\w+)low\b/;
const healingRankPattern = /hprank(\w+)\b/;
const healingRankLowPattern = /hprank(\w+)low\b/;
const strikePattern = /\b[mM]ake.*\bstrike/

export function spellScaling(spell: Pick<SpellLike, 'attack' | 'effect' | 'functionsLike' | 'name' | 'scaling' | 'rank'>): string | null {
  if (!spell.scaling) {
    return null;
  }

  if (spell.rank === 7) {
    return null;
  }

  const makesAttack = spell.attack || (spell.effect && strikePattern.test(spell.effect));

  // Cantrips have no rank listed. They start their scaling from rank 1.
  const rank = spell.rank || 1;

  if (spell.scaling === 'accuracy') {
    if (containsDamageValue(spell)) {
      console.warn(`Spell ${spell.name} has accuracy scaling, but should probably have damage scaling`);
    }
    // We currently can't easily check whether a functionsLike spell also makes an attack.
    if (!(makesAttack || spell.functionsLike)) {
      console.warn(`Spell ${spell.name} has accuracy scaling, but does not make an attack.`);
    }
    return `The attack's \\glossterm{accuracy} increases by +1 for each rank beyond ${rank}.`;
  } else if (spell.scaling === 'double_accuracy') {
    if (containsDamageValue(spell)) {
      console.warn(`Spell ${spell.name} has double accuracy scaling, but should probably have damage scaling`);
    }
    if (!(makesAttack || spell.functionsLike)) {
      console.warn(`Spell ${spell.name} has double accuracy scaling, but does not make an attack.`);
    }
    return `The attack's \\glossterm{accuracy} increases by +2 for each rank beyond ${rank}.`;
  } else if (spell.scaling === 'damage') {
    const scaling = calculateDieScaling(spell.attack?.hit || spell.functionsLike?.exceptThat || spell.effect, 'damage');
    if (!scaling) {
      console.warn(`Unable to calculate damage scaling for ${spell.name}`);
    }
    return `The damage increases by ${scaling} for each rank beyond ${rank}.`;
  } else if (spell.scaling === 'healing') {
    const scaling = calculateDieScaling(spell.effect || spell.functionsLike?.exceptThat, 'healing');
    if (!scaling) {
      console.warn(`Unable to calculate healing scaling for ${spell.name}`);
    }
    return `The healing increases by ${scaling} for each rank beyond ${rank}.`;
  } else if (spell.scaling.special) {
    return spell.scaling.special;
  } else if (spell.scaling && typeof spell.scaling === 'object') {
    const scaling: Record<string, string> = spell.scaling;
    const ranks = Object.keys(scaling).sort((a, b) => Number(a) - Number(b));
    return ranks.map((rank) => `\\rank{${rank}} ${scaling?.[rank]}`).join('\n');
  } else {
    throw new Error(`Spell ${spell.name} has unrecognized scaling: '${spell.scaling}'`);
  }
}

function containsDamageValue(spell: Pick<SpellLike, 'attack' | 'effect' | 'functionsLike'>): boolean {
  return damageRankPattern.test(spell.effect || '') || damageRankPattern.test(spell.attack?.hit || '') || damageRankPattern.test(spell.functionsLike?.exceptThat || '');
}

function calculateDieScaling(effect: string | undefined, damageOrHealing: 'damage' | 'healing'): string | undefined {
  const lowPattern = damageOrHealing === 'damage' ? damageRankLowPattern : healingRankLowPattern;
  // First, check for damageranklow, which uses different scaling.
  const drLowMatches = effect?.match(lowPattern);
  if (drLowMatches && drLowMatches[1]) {
    const damageBonusByRank = {
      'zero': '1',
      'one': '2',
      'two': '1d6',
      'three': '1d10',
      'four': '1d10',
      'five': '2d8',
      'six': '3d8',
      'seven': '3d10',
      'eight': '5d10',
      'nine': '8d10',
    }[drLowMatches[1]];

    return damageBonusByRank;
  }

  const normalPattern = damageOrHealing === 'damage' ? damageRankPattern : healingRankPattern;
  const drMatches = effect?.match(normalPattern);
  if (drMatches && drMatches[1]) {
    const damageBonusByRank = {
      'zero': '1',
      'one': '1',
      'two': '2',
      'three': '3',
      'four': '1d6',
      'five': '2d6',
      'six': '2d8',
      'seven': '2d10',
      'eight': '4d6',
      'nine': '4d8',
    }[drMatches[1]];

    return damageBonusByRank;
  }
}
