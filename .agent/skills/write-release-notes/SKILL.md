---
name: write-release-notes
description: >-
  Generates comprehensive release notes for new Rise RPG releases matching the
  historical style, hierarchy, tone, and formatting of GitHub releases.
---

# Write Release Notes

This skill guides the generation of GitHub release notes for the Rise tabletop role-playing game. It ensures output adheres to the style, structure, tone, and level of detail established across historical releases (such as v11.4.0 through v11.4.4).

---

## 1. Release Title Convention

The release title must follow this pattern:
- Format: `<Version>: <High-level theme or major highlights>`
- Example: `11.4.4: Weapon dice increments and uncommon species tweaks`
- Example: `11.4.3: Simplified vertical distance`
- Example: `11.4.2: Defensive attunement nerfs and spell polish`
- Example: `11.4.1: Reduced defenses and power scaling`
- Tag format: `v<Version>` (e.g. `v11.4.4`). The title in the GitHub release itself omits the `v` prefix in the header text: `11.4.4: <Theme>`.
*(Note: Major zero versions may occasionally use just the version number, e.g. `11.4.0`, but descriptive themes summarizing the 1–2 biggest systemic shifts are strongly preferred.)*

---

## 2. Document Hierarchy and Organization

Use Markdown `##` section headings corresponding to game subsystems in a consistent order. Only include sections that contain changes.
**Do not use horizontal rules (`---`) between sections.** Sections transition directly from the heading into bullet items.

### Typical Top-Level Section Order
1. `## General changes` (or `## General`)
2. `## Adventuring` (if applicable)
3. `## Characters`
4. `## Combat`
5. `## Classes`
6. `## Skills`
7. `## Feats`
8. `## Maneuvers`
9. `## Spells and Rituals`
10. `## Equipment`
11. `## Uncommon Species` (or `## Species`)
12. `## Monsters`

---

## 3. Formatting and Style Rules

Adhere strictly to the established minimalist GitHub release format:

* **No bold in list items**:
  * Do NOT bold ability names, condition names, feat names, spell names, class names, or category prefixes.
  * Use plain text everywhere in bullets (e.g. `* Weapon Focus:`, `* Cover no longer grants a bonus to Reflex defense`, `* Draconic Bulk now grants...`).
* **Quotes for new terminology**:
  * When introducing a newly named game concept or rule, wrap it in double quotes rather than bold or backticks:
    * `* Added a "weapon dice increment" concept which can increase the damage dice dealt by weapons`
* **No trailing periods on single phrases/sentences**:
  * Omit trailing periods on single-clause and short notes (e.g. `* Armor of Life now grants +1 durability (from +2)`).
  * Use periods only when a bullet contains multiple sentences.
* **Flat hierarchy and inline bullets**:
  * If an entity (such as a class, feat, or combat style) has only one change, keep it on a single line with an inline colon:
    * `* Barbarian: Now grants +1 Brawn and +1 Fortitude (from +2 Fortitude)`
    * `* Mobile Hunter: Carve the Air no longer specifically requires a jump`
  * Use sub-bullets only when an entity has multiple distinct adjustments.
* **Alphabetical ordering**:
  * List entities in alphabetical order within sections:
    * **Classes**: Sort alphabetically by class name (Cleric, Druid, Fighter, Monk...). Global or shared class notes appear at the very top.
    * **Feats**: Sort alphabetically by feat name (Boongiver, Draconic Ancestry, Duelist...).
    * **Maneuvers**: Sort alphabetically by combat style name.
    * **Spells and Rituals**: Sort alphabetically by mystic sphere name.
* **Feat naming**:
  * Every feat note MUST begin with the name of the feat being modified (e.g. `* Boongiver: Share Boon...` or `* Maneuverist has been removed`).
  * Never list a specific feat ability or augment alone without qualifying its parent feat name (e.g. write `* Boongiver: Share Boon can no longer be used...`, not `* Share Boon can no longer be used...`).
* **Equipment grouping**:
  * Group items under standard categories using sub-bullets: `* Weapons:`, `* Armor:`, `* Consumables and tools:` (or `* Consumables:`), `* Magic weapons:`, `* Magic implements:`, `* Wondrous items:`.
  * Always separate magic implements (such as staves, wands, focuses) from magic weapons into `* Magic implements:`.
* **Spells and Rituals grouping**:
  * Place global/systemic spell rules at the top.
  * Group by mystic sphere (`* Aeromancy:`, `* Fabrication:`), followed by single-line sub-bullets for each spell or ritual.

---

## 4. Sub-Grouping and Nesting Standards

Within each section, group changes logically:

* **Classes**:
  * Classes with multiple changes:
    ```markdown
    * Dragon:
      * Draconic Bulk now grants a weapon dice increment instead of an Armor defense bonus
      * Draconic Bulk+ now grants a weapon dice increment and an Armor defense bonus
    ```
  * Classes with single or overarching changes:
    ```markdown
    * Dryad: Generally redesigned and slightly buffed so fewer class abilities are strictly dependent on having trees around
    * Naiad: Lake naiads now gain a lower bonus to durability
    ```

* **Spells and Rituals**:
  * Global rules first (if any):
    ```markdown
    * All spells that make strikes now scale damage instead of accuracy
    ```
  * Group by Mystic Sphere:
    ```markdown
    * Aeromancy:
      * Cushion of Air has been removed
      * Massive Hurricane is now rank 7 (from rank 6) and deals more damage
    * Fabrication:
      * All damaging spells now deal flat damage instead of scaling with power
      * Whirlwind of Blades has been redesigned as Bladestorm
    ```

* **Equipment**:
  ```markdown
  * Weapons:
    * Titanbow has been redesigned, and is no longer Heavy
  * Armor:
    * Armor of Life now grants +1 durability (from +2)
    * Covering Shield has been removed
  * Consumables and tools:
    * Potion of Pure Power is now rank 2 (from rank 5)
    * Caltrops now deal more damage and are harder to notice
  * Magic weapons:
    * Lucky is now rank 3 (from rank 2), and its upgrade is rank 6 (from rank 5)
  * Magic implements:
    * Arcing Staff is now rank 3 (from rank 4) and requires stamina to chain, with the stamina cost removed at rank 7
  ```

* **Maneuvers**:
  ```markdown
  * Dirty Fighting: Gut Punch and Kidney Shot now make the target sickened instead of dazed
  * Unbreakable Defense: Parry now inflicts the distracted condition on a miss instead of dazzled
  ```

* **Feats**:
  * List feats in alphabetical order. Every bullet must start with the feat name:
  ```markdown
  * Boongiver: Share Boon can no longer be used on deep attunement spells
  * Maneuverist has been removed
  * Weapon Focus:
    * The accuracy bonus from Precise Focus is no longer an enhancement bonus
    * Weapon Supremacy now has a bonus effect when using an Impact weapon
  ```

---

## 5. Phrasing, Grammar, and Tone

Adopt the concise, developer-facing changelog voice:

### Tone & Perspective
* **Concise and direct**: Third-person changelog voice without marketing fluff, conversational greetings, or sign-offs.
* **High-level summaries over exhaustive detail**: Avoid exhaustively listing every rank of a progression table or full lists of removed tags. Summarize the mechanical shift.
* **Present tense with 'now'**:
  * State what the rule currently does: `now grants...`, `now deals...`, `now affects...`, `now has...`.
* **Explicit 'from' comparisons for deltas**:
  * When ranks, dice, or numeric bonuses change, specify the previous value in parentheses:
    * `is now rank 3 (from rank 4)`
    * `now grants +1 durability (from +2)`
    * `now has a -3 accuracy penalty (from -2)`
    * `deals 1d6 damage (from 1d4)`
    * `now reduces speed by half (instead of -10 feet)`
* **Standard verbs for structural changes**:
  * `has been redesigned` (or `has been slightly redesigned`)
  * `has been replaced with <New Ability>`
  * `has been added` / `...have been added`
  * `has been removed`
  * `has been renamed to <New Name>`
* **Systemic design explanations**:
  * In `## General changes` or for major mechanics, brief 1–2 sub-bullet rationales explaining the design intent are acceptable when clarifying complex shifts:
    ```markdown
    * Added a "weapon dice increment" concept which can increase the damage dice dealt by weapons
      * For example, 1d8 upgrades to 1d10, which upgrades to 2d6
      * Abilities which previously manually spelled out this concept now reference the standard "weapon dice increment" term
    ```

---

## 6. Workflow to Draft Release Notes

When preparing release notes for an upcoming release:

1. **Identify the Git range**:
   * Determine the previous release tag: `git describe --tags --abbrev=0`.
   * Inspect commit history: `git log <previous_tag>..HEAD --oneline`.
   * Check changed files: `git diff --stat <previous_tag>..HEAD`.

2. **Categorize the changes**:
   * Sort changes into the appropriate top-level sections (`Classes`, `Spells and Rituals`, `Equipment`, etc.).
   * Trace specific game math adjustments (ranks, dice, bonuses).

3. **Distill key themes for the title**:
   * Identify the 1–2 most impactful system changes or mechanical overhauls.
   * Craft the title: `<Version>: <Theme 1> and <Theme 2>`.

4. **Format & Refine against Style Rules**:
   * **Strip all bolding** from list items.
   * **Remove any horizontal rules (`---`)** between sections.
   * **Alphabetical ordering**: Ensure classes, feats, maneuvers, and spells are sorted in alphabetical order within their sections (with global/shared notes placed at the top).
   * **Feat names first**: Confirm every bullet under `Feats` starts with the feat name (resolving child abilities to their parent feat).
   * **Separate magic implements**: Ensure magic implements are categorized under `* Magic implements:` rather than `* Magic weapons:`.
   * Check single-change entities to ensure they use inline formatting (`* Class: ...`) rather than nested lists.
   * Omit trailing periods on single phrases/sentences.
   * Ensure previous values are documented with `(from X)`.
