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

Use Markdown `##` section headings corresponding to game subsystems in a consistent order. Only include sections that contain changes (or empty sections only if standard).

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

## 3. Sub-Grouping and Nesting Standards

Within each section, group changes logically:

* **Classes**:
  * Base class name (bold or bullet): `* <Class>:`
  * Archetype name: `  * <Archetype>:`
  * Ability change: `    * <Ability> <change summary>`
  * *Example*:
    ```markdown
    * Wizard:
      * School Specialist:
        * Abjuration also grants immunity to teleportation effects
        * Necromancy has been redesigned
    ```

* **Spells and Rituals**:
  * Global rules first (if any): `* All spells that make strikes now scale damage instead of accuracy`
  * Group alphabetically by Mystic Sphere or category:
    ```markdown
    * Aeromancy:
      * Cushion of Air has been removed
      * Massive Hurricane is now rank 7 (from rank 6) and deals more damage
    * Fabrication:
      * All damaging spells now deal flat damage instead of scaling with power
      * Whirlwind of Blades has been redesigned as Bladestorm
    ```

* **Equipment**:
  * Group by category: `* Weapons:`, `* Armor:`, `* Apparel:` (or `* Magic Apparel:`), `* Consumables:`, `* Tools:`
  * Use sub-bullets:
    ```markdown
    * Armor:
      * Armor of Life now grants +1 durability (from +2)
      * Covering Shield has been removed
    * Weapons:
      * Shortbow now deals 1d6 damage (from 1d4)
    ```

* **Maneuvers**:
  * Group by combat style:
    ```markdown
    * Dirty Fighting: Gut Punch and Kidney Shot now make the target sickened instead of dazed
    * Rip and Tear: Strip the Flesh now makes the target sickened instead of dazed
    ```

* **Feats**:
  * Bullet by feat name or tree:
    ```markdown
    * Weapon Focus:
      * The accuracy bonus from Precise Focus is no longer an enhancement bonus
      * Weapon Supremacy now has a bonus effect when using an Impact weapon
    ```

---

## 4. Phrasing, Grammar, and Tone

Adopt the established concise, active, developer-facing changelog voice:

### Tone & Perspective
* **Concise and direct**: Third-person / passive-neutral changelog voice. Avoid fluff, marketing speak, greeting lines ("Welcome to version X!"), or sign-offs.
* **Present tense with 'now'**:
  * State what the rule currently does: `now grants...`, `now deals...`, `now affects...`, `now has...`.
* **Explicit 'from' comparisons for deltas**:
  * When ranks, dice, or numeric bonuses change, specify the previous value in parentheses:
    * `is now rank 3 (from rank 4)`
    * `now grants +1 durability (from +2)`
    * `now has a -3 accuracy penalty (from -2)`
    * `deals 1d6 damage (from 1d4)`
* **Standard verbs for structural changes**:
  * `has been redesigned` (or `has been slightly redesigned`)
  * `has been replaced with <New Ability>`
  * `has been added` / `New <category>: <Name>`
  * `has been removed`
  * `has been renamed to <New Name>`
* **Systemic design explanations**:
  * In `## General changes` or for major mechanics, provide brief 1–2 sub-bullet rationales explaining the design intent:
    * *Example*:
      ```markdown
      * Hit points and injury point now simply multiply your character rank, rather than multiplying a different value subtly different from rank at high levels
        * This generally reduces hit points at high levels, which may result in adjustments to high level math later, but the simplicity gain is more valuable
      ```

---

## 5. Workflow to Draft Release Notes

When preparing release notes for an upcoming release:

1. **Identify the Git range**:
   * Determine the previous release tag (e.g., `git describe --tags --abbrev=0` or `git tag -l "v*" --sort=-v:refname`).
   * Inspect commit history: `git log <previous_tag>..HEAD --oneline`.
   * Check changed files: `git diff --stat <previous_tag>..HEAD`.

2. **Categorize the changes**:
   * Sort each commit/diff into the appropriate top-level section (`Classes`, `Spells and Rituals`, `Equipment`, etc.).
   * Trace specific game math adjustments (ranks, dice, bonuses).

3. **Distill key themes for the title**:
   * Identify the 1–2 most impactful system changes or mechanical overhauls.
   * Craft the title: `<Version>: <Theme 1> and <Theme 2>`.

4. **Format & Refine**:
   * Apply consistent indentation (2 spaces per nesting level).
   * Verify terminology matches Rise rules (e.g. Armor defense, Reflex defense, Fortitude defense, Mental defense, attunement, injury, sickened, durability).
   * Ensure previous values are documented with `(from X)`.
