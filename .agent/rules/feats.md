---
trigger: model_decision
description: When reviewing, querying, or designing feats.
---

# Feats

This is a summary of the Rise feat rules and how they are structured and organized.

* **File Location**: All feats are written directly in LaTeX and can be found in [Feats.tex](file:///c:/Users/vadsk/github/Rise/comprehensive_codex/Feats.tex). They are not generated from the TypeScript codebase.
* **Layout**: 
  * The chapter starts with rules for gaining feats and general feat mechanics (prerequisites, skill feats, tags).
  * A master index table listing all feats, their prerequisites, brief benefits, tags, and page references is defined in a `longtable` environment.
  * Individual feat definitions follow the table, structured within `\begin{feat}{FeatName}{FeatTag}` or `\begin{magicalfeat}{FeatName}{FeatTag}` environments.
* **Sub-abilities**:
  * Feats often contain multiple scaling sub-abilities (features) denoted by level-gated macros.
  * `\ff[level]{AbilityName}` and `\magicalff[level]{AbilityName}` are used to define these features.
  * The optional parameter `[level]` specifies the character level at which the ability becomes accessible (typically levels 1, 6, 12, 18).
* **Level to Rank Mapping**:
  * Level 1-3: Rank 1
  * Level 4-6: Rank 2
  * Level 7-9: Rank 3
  * Level 10-12: Rank 4
  * Level 13-15: Rank 5
  * Level 16-18: Rank 6
  * Level 19-21: Rank 7
* **Prerequisites**: Feat prerequisites are specified under the `\featpre` command immediately inside the feat environment. They may include attribute requirements, skill training levels, or other feats.
