import t from 'tap';
import { Creature } from '@src/character_sheet/creature';
import { Grimoire } from '@src/monsters/grimoire';
import { addAberrations } from '@src/monsters/individual_monsters/aberrations';
import { convertMonsterToLatex, genKnowledgeText } from './generate_monster_descriptions';
import { multilineEqual } from '@src/util/testing';

t.test('can convert an aboleth to latex', (t) => {
  const grimoire = new Grimoire();
  addAberrations(grimoire);
  const aboleth = grimoire.getMonster("aboleth");
  multilineEqual(t, convertMonsterToLatex(aboleth), `\\newpage
      \\par \\noindent
      \\begin<minipage><\\columnwidth>
          \\monsubsection<aboleth><12 Mystic>[Elite]
          \\monstersize<Huge undefined>

      \\end<minipage>




      \\par \\RaggedRight

      \\begin{monsterstatistics}

      \\pari \\textbf{HP} 159
        \\monsep \\textbf{DR} 176
      \\pari \\textbf{Defenses}
        Armor 14
        \\monsep Fort 18
        \\monsep Ref 15
        \\monsep Ment 20








      \\end{monsterstatistics}

      \\monsterabilitiesheader<$Name>`);
  t.end();
});

t.test('can generate empty knowledge text', (t) => {
  const creature = Creature.fromName("test");
  t.equal(genKnowledgeText(creature), "");
  t.end();
});

t.test('Can generate meaningful knowledge text', (t) => {
  const creature = Creature.fromName("test");
  creature.setProperties({
    creature_type: "undead",
    knowledge_result_easy: "Easy result",
    level: 20,
    knowledge_result_hard: "Hard result",
  });

  t.equal(genKnowledgeText(creature), `\\par Knowledge (religion) 10: Easy result
\\par Knowledge (religion) 20: Hard result`);
  t.end();
});
