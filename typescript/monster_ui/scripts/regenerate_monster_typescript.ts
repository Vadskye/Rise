import { getDb } from '../server/db';
import { saveTypeScriptFile } from '../server/codegen';

console.log('Loading database...');
const db = getDb();
console.log(
  `Loaded database containing ${db.monsters?.length || 0} monsters and ${db.monsterGroups?.length || 0} groups.`,
);

console.log('Regenerating monsters_from_ui.ts...');
saveTypeScriptFile(db);
console.log('Generated successfully.');
