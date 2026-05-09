"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const all_tools_1 = require("../src/equipment/data/all_tools");
const tools = (0, all_tools_1.allTools)();
for (const t of tools) {
    if (t.item.rarity !== 'Common') {
        console.log(`${t.item.name}: ${t.item.rarity}`);
    }
}
//# sourceMappingURL=check_tools.js.map