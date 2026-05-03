import { allTools } from '../src/equipment/data/all_tools';

const tools = allTools();
for (const t of tools) {
  if (t.item.rarity !== 'Common') {
    console.log(`${t.item.name}: ${t.item.rarity}`);
  }
}
