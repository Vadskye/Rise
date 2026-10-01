---
trigger: model_decision
description: When interacting with character classes, such as fighter or wizard.
---

# Classes

This is a summary of the Rise class rules and how they are implemented.

* Classes are described in `comprehensive_codex/Classes.tex`, which imports the generated files from `comprehensive_codex/generated/classes.tex`.
* Source code for specific class and archetype abilities is written in TypeScript:
  * Archetype abilities: [`typescript/src/classes/archetypes/`](../../typescript/src/classes/archetypes/)
  * Archetype rank progression & ability application: [`typescript/src/classes/archetypes/apply_archetypes.ts`](../../typescript/src/classes/archetypes/apply_archetypes.ts)
  * Base class abilities: [`typescript/src/classes/base_class_abilities.ts`](../../typescript/src/classes/base_class_abilities.ts)
  * Cleric domain abilities: [`typescript/src/classes/cleric_domains.ts`](../../typescript/src/classes/cleric_domains.ts)
  * Stock character implementations per class & level: [`typescript/src/character_sheet/stock_characters/`](../../typescript/src/character_sheet/stock_characters/)
  * Inspect stock character stats and abilities: [`typescript/src/scripts/explain_stock_character.ts`](../../typescript/src/scripts/explain_stock_character.ts)
* LaTeX generator: The LaTeX files are compiled from the TypeScript definitions. Run `bin/rtgen.ps1` from the repository root (or `npm run generate_latex` inside `typescript/` folder) to regenerate the LaTeX chapters.
* Characters in Rise have a species and a class. Most characters have a single class. Each class contains five archetypes, but each individual character chooses only three of those five archetypes.
  * Less commonly, multiclass characters can have multiple classes. They still choose a single base class, and they have any three archetypes from among the archetypes offered by their classes.
* The cleric, druid, paladin, sorcerer, votive, and wizard classes have access to spellcasting. Spells and mystic spheres are defined in [`typescript/src/abilities/mystic_spheres/`](../../typescript/src/abilities/mystic_spheres/).
* The barbarian, fighter, monk, ranger, rogue, and votive classes have access to special martial abilities called maneuvers. Maneuvers are grouped into thematically related combat styles in [`typescript/src/abilities/combat_styles/`](../../typescript/src/abilities/combat_styles/). Most martial characters only have access to one or two combat styles, though they may know several maneuvers from those combat styles.
