---
trigger: model_decision
description: When working with creature types
---

# Rise Creature Taxonomy

This document summarizes the rules for creature classification in Rise, including Origins, Types, and Traits.

## 1. Taxonomic Hierarchy

Each creature is defined by its **Origin** and **Type**. Together, these determine the creature's fundamental nature, its default knowledge skill, and its inherent traits.

### 1.1. Creature Origins

Origins represent the source of a creature's existence.

| Origin         | Fundamental Nature                   | Default Knowledge Skill |
| :------------- | :----------------------------------- | :---------------------- |
| **Natural**    | Born of the natural world.           | Nature                  |
| **Undead**     | Reanimated from corpses or spirits.  | Souls                   |
| **Artificial** | Created through magic or technology. | Arcana                  |

### 1.2. Creature Types

Types represent specific biological or magical categories. If a creature has a Type, its associated knowledge skill takes precedence over the Origin's default.

| Type           | Description                                       | Associated Knowledge Skill |
| :------------- | :------------------------------------------------ | :------------------------- |
| **Aberration** | Souls from the Eternal Void.                      | Planes                     |
| **Animal**     | Mundane, simple-minded creatures.                 | Nature                     |
| **Beast**      | Magical or moderately intelligent animals.        | Nature                     |
| **Construct**  | Non-sapient animated matter.                      | Arcana                     |
| **Dragon**     | Powerful magical reptiles.                        | Arcana                     |
| **Fey**        | Highly magical chaotic creatures.                 | Nature                     |
| **Ghost**      | Incorporeal souls of the deceased.                | Souls                      |
| **Humanoid**   | Two-armed, two-legged, one-headed sapient beings. | Local                      |
| **Indwelt**    | Sapient matter awakened by external souls.        | Souls                      |
| **Plant**      | Living flora, often lacking flesh/blood.          | Nature                     |

## 2. Inherent Traits (Taxonomic Inheritance)

Certain Origins and Types automatically grant standard traits to a creature. These should not be added manually in monster definitions.

### 2.1. Trait Grants by Type

| Type           | Automatically Granted Traits                  | Special Notes                                                  |
| :------------- | :-------------------------------------------- | :------------------------------------------------------------- |
| **Aberration** | `ensouled`                                    |                                                                |
| **Animal**     | `ensouled`                                    | Max Int -8.                                                    |
| **Beast**      | `ensouled`                                    | Max Int -5.                                                    |
| **Construct**  | `mindless`, `nonliving`, `soulless`, `static` |                                                                |
| **Dragon**     | `ensouled`, `immortal`                        |                                                                |
| **Fey**        | `ensouled`, `immortal`                        |                                                                |
| **Ghost**      | `ensouled`, `incorporeal`                     | Also grants "Ghostly Nature" (Resist: Cold/Earth, Vuln: Fire). |
| **Humanoid**   | `ensouled`                                    |                                                                |
| **Insect**     | `ensouled`                                    |                                                                |
| **Indwelt**    | `ensouled`                                    |                                                                |
| **Plant**      | `bloodless`, `living`, `soulless`             |                                                                |

### 2.2. Common Origin Traits

- **Artificial:** Typically `bloodless`, `corporeal`, `dynamic`, `immortal`, `nonliving`.
- **Natural:** Typically `blooded`, `corporeal`, `dynamic`, `living`, `mortal`.
- **Undead:** Typically `bloodless`, `corporeal`, `dynamic`, `immortal`, `nonliving`.

## 3. Implementation Details

- **Knowledge Skill Lookup:** When determining the knowledge skill for a creature, the system checks `KNOWLEDGE_BY_TYPE` first. If the creature's type is not found (or is empty), it falls back to `KNOWLEDGE_BY_ORIGIN`.
- **`applyStandardTraits()`:** This method in `Creature.ts` is responsible for applying the traits listed above based on the creature's `creature_type`. It is called automatically during initialization.
- **Required Properties:** Every monster must specify `creature_origin` and `creature_type` via `setRequiredProperties()`.

## 4. Update Instructions

Rise's creature types and traits are still under development. Whenever a creature type's definition changes or a new creature type is added, you must update this rule, `Reference.tex`, and any Typescript code related to creature types so they stay in sync.
