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
    { rank: 3, short_description: 'Improved test item.', description: 'Now it is better.' }
  ],
  tags: [],
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
    { name: 'B', rank: 2, consumable: false, magical: false, rarity: 'Common', short_description: '' },
    { name: 'A', rank: 2, consumable: false, magical: false, rarity: 'Common', short_description: '' },
    { name: 'C', rank: 1, consumable: false, magical: false, rarity: 'Common', short_description: '' },
    { name: 'D', rank: 1, consumable: true, magical: false, rarity: 'Common', short_description: '' },
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
  };

  const latex = rowToLatex(row);
  
  t.match(latex, /\\itemref{Magic Shield}\\sparkle & Shield/);
  t.match(latex, /& Grants \+2 defense\./);
  t.match(latex, /& 2 \(20 gp\)/);
  t.match(latex, /& \\itempref{Magic Shield}/);
  t.end();
});

t.test('longtable', (t) => {
  const rows: TableRow[] = [
    { name: 'Item 1', rank: 1, consumable: false, magical: false, rarity: 'Common', short_description: 'Desc 1' },
  ];

  const latex = longtable('Test Caption', rows, false);

  t.match(latex, /\\begin{longtablewrapper}/);
  t.match(latex, /\\lcaption{Test Caption}/);
  t.match(latex, /\\tb{Name} & \\tb{Description} & \\tb{Rank \(Cost\)} & \\tb{Page}/);
  t.match(latex, /\\itemref{Item 1}/);
  t.end();
});
