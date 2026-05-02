import t from 'tap';
import { convertRitualToLatex } from './convert_ritual_to_latex';
import { RitualDefinition } from '@src/abilities';

t.test('convertRitualToLatex', (t) => {
  t.test('should include fatigue cost when fatigueCost is true', (t) => {
    const ritual: RitualDefinition = {
      name: 'Test Ritual',
      usageTime: 'one hour',
      rank: 1,
      roles: ['narrative'],
      spheres: ['Astromancy'],
      effect: 'This is a test effect.',
      fatigueCost: true,
    };
    const latex = convertRitualToLatex(ritual);
    t.match(latex, /\\abilitycost one \\glossterm\{fatigue level\} from the ritual's participants\./);
    t.end();
  });

  t.test('should not include fatigue cost when fatigueCost is false', (t) => {
    const ritual: RitualDefinition = {
      name: 'Test Ritual No Fatigue',
      usageTime: 'one hour',
      rank: 1,
      roles: ['narrative'],
      spheres: ['Astromancy'],
      effect: 'This is a test effect.',
      fatigueCost: false,
    };
    const latex = convertRitualToLatex(ritual);
    t.notMatch(latex, /This ritual requires/);
    t.end();
  });

  t.test('should include increased fatigue cost for 24 hour rituals', (t) => {
    const ritual: RitualDefinition = {
      name: 'Long Ritual',
      usageTime: '24 hours',
      rank: 2,
      roles: ['narrative'],
      spheres: ['Astromancy'],
      effect: 'This is a test effect.',
      fatigueCost: true,
    };
    const latex = convertRitualToLatex(ritual);
    // 2^2 * 2 = 8
    t.match(latex, /\\abilitycost 8 \\glossterm\{fatigue levels\} from the ritual's participants\./);
    t.end();
  });

  t.test('should include material cost when materialCost is true', (t) => {
    const ritual: RitualDefinition = {
      name: 'Expensive Ritual',
      usageTime: 'one hour',
      rank: 1,
      roles: ['narrative'],
      spheres: ['Astromancy'],
      effect: 'This is a test effect.',
      fatigueCost: true,
      materialCost: true,
    };
    const latex = convertRitualToLatex(ritual);
    t.match(latex, /and the consumption of diamond dust/);
    t.match(latex, /rank 1 item \(40 gp\)/);
    t.end();
  });

  t.end();
});
