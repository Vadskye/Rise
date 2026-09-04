import tap from 'tap';
import { validatePoison, poisons } from './poisons';
import { getPoisonDescription } from '../../poison';

tap.test('validatePoison', (t) => {
  t.test('should validate balanced damaging poisons without warnings', (t) => {
    const warnings = validatePoison({
      name: 'Test Balanced Powder Contact',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
        `,
      ),
    });
    t.equal(warnings.length, 0, 'should have 0 warnings for drX+1 powder contact');
    t.end();
  });

  t.test('should handle -3 accuracy (+1 dr) and +4 accuracy (-1 dr)', (t) => {
    const nightshadeWarnings = validatePoison({
      name: 'Test Nightshade Style (-3 acc -> +1 dr)',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'ingestion',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy-3.
          It inflicts $dr4l damage immediately and with each escalation.
        `,
      ),
    });
    t.equal(nightshadeWarnings.length, 0, 'should have 0 warnings when -3 acc gives +1 dr');

    const wolfsbaneWarnings = validatePoison({
      name: 'Test Wolfsbane Style (+4 acc -> -1 dr)',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy+4.
          It inflicts $dr1l damage immediately and with each escalation.
        `,
      ),
    });
    t.equal(wolfsbaneWarnings.length, 0, 'should have 0 warnings when +4 acc gives -1 dr');
    t.end();
  });

  t.test('should flag invalid accuracy modifiers on damaging poisons', (t) => {
    const warnings = validatePoison({
      name: 'Test Invalid Acc',
      rank: 2,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'contact',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy+2.
          It inflicts $dr1l damage immediately and with each escalation.
        `,
      ),
    });
    t.ok(
      warnings.some((w) => w.includes('invalid accuracy modifier (+2)')),
      'should flag accuracy +2 as invalid',
    );
    t.end();
  });

  t.test('should warn on underbudget or overbudget damage', (t) => {
    const underbudgetWarnings = validatePoison({
      name: 'Test Underbudget',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'ingestion',
        'liquid',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr1l damage immediately and with each escalation.
        `,
      ),
    });
    t.equal(underbudgetWarnings.length, 1);
    t.ok(underbudgetWarnings[0].includes('deals $dr1l damage, but expected $dr2l'));

    const overbudgetWarnings = validatePoison({
      name: 'Test Overbudget',
      rank: 1,
      attunement: 'Unrestricted',
      short_description: 'Test',
      description: getPoisonDescription(
        'contact',
        'powder',
        `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr3l damage immediately and with each escalation.
        `,
      ),
    });
    t.equal(overbudgetWarnings.length, 1);
    t.ok(overbudgetWarnings[0].includes('deals $dr3l damage, but expected $dr2l'));
    t.end();
  });

  t.test('should skip debuff poisons without throwing or warning', (t) => {
    const debuffPoisons = [
      {
        name: 'Asp Venom Test',
        rank: 1,
        desc: `
          The poison's accuracy is $consumableaccuracy.
          A poisoned creature is \\sickened while the poison lasts.
          The second escalation also inflicts $dr2l damage.
        `,
      },
      {
        name: 'Giant Wasp Test',
        rank: 2,
        desc: `
          The poison's accuracy is $consumableaccuracy+2.
          A poisoned creature is \\slowed while the poison lasts.
          The second escalation also inflicts $dr3l damage.
        `,
      },
      {
        name: 'Mind Fog Test',
        rank: 4,
        desc: `
          The poison's accuracy is $consumableaccuracy.
          It inflicts $dr2l damage immediately and with each escalation.
          The second escalation also makes the target \\dazed.
        `,
      },
      {
        name: 'Frostweb Spider Test',
        rank: 5,
        desc: `
          The poison's accuracy is $consumableaccuracy.
          A poisoned creature is \\slowed while the poison lasts.
          The second escalation also inflicts a \\glossterm{vital wound} with a unique vital wound effect.
        `,
      },
    ];

    for (const p of debuffPoisons) {
      const warnings = validatePoison({
        name: p.name,
        rank: p.rank,
        attunement: 'Unrestricted',
        short_description: 'Debuff test',
        description: getPoisonDescription('injury', 'liquid', p.desc),
      });
      t.equal(warnings.length, 0, `${p.name} should be skipped without warnings`);
    }
    t.end();
  });

  t.end();
});
