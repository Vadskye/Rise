import t from 'tap';
import { Grimoire } from '@src/monsters/grimoire';
import { explainMonster, explainMonsterAttacks } from '@src/scripts/explain_monster';
import { clearAllCharacterSheets } from '@src/character_sheet/current_character_sheet';

t.beforeEach(async () => {
  clearAllCharacterSheets();
});

t.test('explainMonster output includes defenses, accuracy, power, and damage', async (t) => {
  const grimoire = new Grimoire();
  grimoire.addAllMonsters();

  const minotaur = grimoire.getMonster('Minotaur')!;
  t.ok(minotaur, 'Minotaur exists');

  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    logs.push(args.join(' '));
  };

  try {
    explainMonster(minotaur);
  } finally {
    console.log = originalLog;
  }

  const output = logs.join('\n');

  // Verify headers and core properties
  t.match(output, /--- Defenses & Speed ---/);
  t.match(output, /--- Core Accuracy & Power ---/);
  t.match(output, /Base Accuracy\s+:\s+3/);
  t.match(output, /Brawling Accuracy\s+:\s+6/);
  t.match(output, /Mundane Power\s+:\s+12/);
  t.match(output, /Magical Power\s+:\s+7/);
  t.match(output, /Dice Increment\s+:\s+1/);
  t.match(output, /Monster Rank\s+:\s+3/);
  t.match(output, /--- Attack Accuracy & Damage ---/);

  // Verify strike attacks explain damage
  t.match(output, /Charging Gore/);
  t.match(output, /Damage\s+:\s+2d8\+12 damage/);
  t.match(output, /Strike with horn/);
  t.match(output, /base 1d6 \+ 1 increment -> 1d8, 2x weapon damage -> 2d8/);
  t.match(output, /Power Added\s+:\s+\+12/);

  // Verify DR attacks explain damage
  t.match(output, /Ground Stomp/);
  t.match(output, /Damage\s+:\s+2d6\+1d10\+6 damage/);
  t.match(output, /Damage Rank 2/);
  t.match(output, /Base Dice\s+:\s+1d10/);
  t.match(output, /Excess Rank\s+:\s+\+2d6/);
  t.match(output, /Power Added\s+:\s+\+6/);
});

t.test(
  'explainMonsterAttacks on spellcaster explains magical DR and non-damaging attacks',
  async (t) => {
    const grimoire = new Grimoire();
    grimoire.addAllMonsters();

    const aboleth = grimoire.getMonster('Aboleth')!;
    t.ok(aboleth, 'Aboleth exists');

    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(args.join(' '));
    };

    try {
      explainMonsterAttacks(aboleth);
    } finally {
      console.log = originalLog;
    }

    const output = logs.join('\n');

    // Psionic Blast: DR 2, magical power 16 -> +8
    t.match(output, /Psionic Blast/);
    t.match(output, /Damage\s+:\s+1d10\+8 damage/);
    t.match(output, /Damage Rank 2/);
    t.match(output, /Base Dice\s+:\s+1d10/);
    t.match(output, /Power Added\s+:\s+\+8 \(magical power 16, \+1 per 2 power\)/);

    // Mind Crush: DR 5, magical power 16 -> +8d6
    t.match(output, /Mind Crush/);
    t.match(output, /Damage\s+:\s+9d6 damage/);
    t.match(output, /Damage Rank 5/);
    t.match(output, /Base Dice\s+:\s+1d6/);
    t.match(output, /Power Added\s+:\s+\+8d6 \(magical power 16, 1d6 per 2 power\)/);

    // Cause Fear: Non-damaging attack, should have Rendered but no Damage line
    const causeFearSection = output.slice(output.indexOf('Cause Fear'));
    const nextSection = causeFearSection.slice(0, causeFearSection.indexOf('* Tentacle Slam'));
    t.match(nextSection, /Rendered\s+:/);
    t.notMatch(nextSection, /Damage\s+:/);
  },
);
