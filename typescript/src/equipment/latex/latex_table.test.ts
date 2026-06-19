import t from 'tap';
import { TableRow, fromItem, standardSort, rowToLatex, longtable } from './latex_table';
import { StandardItem } from '../types';

const mockItem: StandardItem = {
  name: 'Test Item',
  rank: 1,
  rarity: 'Common',
  magical: false,
  short_description: 'A test item.',
  description: 'This is a test item.',
  upgrades: [
    { rank: 3, short_description: 'Improved test item.', description: 'Now it is better.' },
  ],
  tags: [],
  attunement: 'Unrestricted',
};

t.test('fromItem', (t) => {
  const rows = fromItem(mockItem, false, 'Category');
  t.equal(rows.length, 2);
  t.equal(rows[0].name, 'Test Item');
  t.equal(rows[0].rank, 1);
  t.equal(rows[0].category, 'Category');
  t.equal(rows[1].name, 'Test Item+');
  t.equal(rows[1].rank, 3);
  t.end();
});

t.test('standardSort', (t) => {
  const rows: TableRow[] = [
    {
      name: 'B',
      rank: 2,
      consumable: false,
      magical: false,
      rarity: 'Common',
      short_description: '',
      attunement: 'Unrestricted',
    },
    {
      name: 'A',
      rank: 2,
      consumable: false,
      magical: false,
      rarity: 'Common',
      short_description: '',
      attunement: 'Unrestricted',
    },
    {
      name: 'C',
      rank: 1,
      consumable: false,
      magical: false,
      rarity: 'Common',
      short_description: '',
      attunement: 'Unrestricted',
    },
    {
      name: 'D',
      rank: 1,
      consumable: true,
      magical: false,
      rarity: 'Common',
      short_description: '',
      attunement: 'Unrestricted',
    },
  ];

  standardSort(rows);

  t.equal(rows[0].name, 'D', 'Consumables come first at same rank');
  t.equal(rows[1].name, 'C', 'Permanent items come second at same rank');
  t.equal(rows[2].name, 'A', 'Lower rank comes first, then alphabet');
  t.equal(rows[3].name, 'B');
  t.end();
});

t.test('rowToLatex', (t) => {
  const row: TableRow = {
    name: 'Magic Shield',
    rank: 2,
    consumable: false,
    magical: true,
    rarity: 'Common',
    short_description: 'Grants +2 defense.',
    category: 'Shield',
    tags: ['Attune'],
    attunement: 'Attune',
  };

  const latexNormal = rowToLatex(row);
  t.match(latexNormal, /\\itemref{Magic Shield}\\sparkle & Shield/);
  t.notMatch(latexNormal, /Regular/);

  const latexAttuned = rowToLatex(row, undefined, true);
  t.match(latexAttuned, /\\itemref{Magic Shield}\\sparkle\s*&\s*Shield/);
  t.match(latexAttuned, /&\s*Yes/);
  t.match(latexAttuned, /& Grants \+2 defense\./);
  t.match(latexAttuned, /& 2 \(20 gp\)/);
  t.match(latexAttuned, /& \\itempref{Magic Shield}/);

  const deepRow = { ...row, attunement: 'Attune (deep)' as const };
  t.match(rowToLatex(deepRow, undefined, true), /&\s*Deep/);

  const noneRow = { ...row, attunement: 'Unrestricted' as const };
  t.match(rowToLatex(noneRow, undefined, true), /&\s*\\tdash/);

  t.end();
});

t.test('longtable', (t) => {
  const rows: TableRow[] = [
    {
      name: 'Item 1',
      rank: 1,
      consumable: false,
      magical: false,
      rarity: 'Common',
      short_description: 'Desc 1',
      tags: ['Attune'],
      attunement: 'Attune',
    },
  ];

  const latexNoAttune = longtable({
    caption: 'Test Caption',
    rows,
    withCategory: false,
  });
  t.match(latexNoAttune, /\\begin{longtablewrapper}/);
  t.match(latexNoAttune, /\\lcaption{Test Caption}/);
  t.match(latexNoAttune, /\\tb{Name}\s*&\s*\\tb{Description}\s*&\s*\\tb{Rank \(Cost\)}\s*&\s*\\tb{Page}/);
  t.match(latexNoAttune, /\\itemref{Item 1}/);
  t.notMatch(latexNoAttune, /\\tb{Attune}/);

  const latexWithAttune = longtable({
    caption: 'Test Caption',
    rows,
    withCategory: false,
    withAttunement: true,
  });
  t.match(latexWithAttune, /\\tb{Name}\s*&\s*\\tb{Description}\s*&\s*\\tb{Attune}\s*&\s*\\tb{Rank \(Cost\)}\s*&\s*\\tb{Page}/);
  t.match(latexWithAttune, /\\itemref{Item 1}/);
  t.match(latexWithAttune, /&\s*Yes/);
  t.match(latexWithAttune, /&\s*Desc 1/);

  t.end();
});
