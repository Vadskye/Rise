import t from 'tap';
import { convertAutoAttackToLatex } from './monster_attacks';

t.test('convertAutoAttackToLatex', (t) => {
  t.test('should convert a damaging attack to latex', (t) => {
    const attack = {
      attack_accuracy: 5,
      attack_effect: 'Irrelevant text',
      attack_name: 'Fireball',
      is_targeted: false,
      is_magical: true,
      latex_effect: '\\hit $damageranktwo.',
      tags: 'Fire',
      usage_time: 'standard' as const,
      defense: 'Reflex',
    };
    const expected = `
    \\begin{magicalactiveability}*{Fireball}{Standard action}
      \\abilitytags \\abilitytag{Fire}
      \\rankline
      \\hit $damageranktwo.
    \\end{magicalactiveability}
  `;
    t.equal(convertAutoAttackToLatex(attack), expected);
    t.end();
  });

  t.test('should convert a debuff attack to latex', (t) => {
    const attack = {
      attack_accuracy: 10,
      attack_effect: 'Irrelevant text',
      attack_name: 'Stunning Debuff',
      is_targeted: true,
      is_magical: false,
      tags: '',
      usage_time: 'elite' as const,
      defense: 'Mental',
      latex_effect: '\\hit The target is \\glossterm{briefly} \\stunned.',
    };
    const expected = `
    \\begin{activeability}*{Stunning Debuff}{\\glossterm{Elite action}}
      
      \\rankline
      \\hit The target is \\glossterm{briefly} \\stunned.
    \\end{activeability}
  `;
    t.equal(convertAutoAttackToLatex(attack), expected);
    t.end();
  });

  t.end();
});
