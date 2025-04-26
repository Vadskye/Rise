# Tactical Abilities

## Background

Currently, many existing abilities feel extremely similar to each other, and meaningful choice feels hard to find. Although abilities can have different numbers and areas, they don't necessarily *feel* different in practice. This is because abilities are all mostly just numbers that are roughly balanced against each other, and are all useful in essentially the same circumstances. In this context, we are only considering standard action abilities in combat, not pure narrative abilities or attuned abilities.

Currently, there are roughly two common ability categories:
* Immediate damage
* Debuff condition

In addition, there are several ability variants that are rarely used, and which are typically isolated to select mystic spheres or feats:
* Battlefield hazard
* Damage over time
* Brief buff to self or ally
* Brief debuff
* Forced movement
* Narrative utility

## Solution: Tactical Contexts

Abilities should be designed from the perspective of being useful in specific tactical contexts.

### Comparative Strength

There are four comparative strength contexts. Note that htese specifically refer to how you compare to each opponent individually, not the overall difficulty of the encounter.
* Superiority: You are stronger than your individual opponents. You expect to hit easily and effectively, and enemy attacks often miss or have little effect.
* Inferiority: You are weaker than your individual opponents. You may miss frequently or deal little damage, and enemy attacks hit often with great effect.
* Glass Cannon: Both you and your opponents hit easily and effectively.
* Tank: Both you and your opponents have difficulty hitting, or your attacks have little effect even if they hit.

### Enemy Group Size

* Swarm: There are 5+ individual enemies, each of similar power.
* Squad: There are 2-4 individual enemies, each of similar power.
* Boss: There is only one enemy.
* Leader: There is one powerful enemy accompanied by multiple weaker enemies. This can be the same as either Squad or Boss depending on the relative power of the leader and their minions, and generally doesn't require individual consideration.

### Encounter Difficulty
* Easy: Victory is expected, with few resources spent.
* Average: Victory is expected, but you may need to spend fatigue or gain a couple of vital wounds.
* Dangerous: Victory is only likely with significant resource expenditure.

### Comparative Range

* Archery Duel: You and your enemies both use primarily ranged attacks.
* Brawl: You and your enemies both use primarily melee attacks.
* Keepaway: You use ranged attacks and your enemies use melee attacks.
* Rushdown: You use melee attacks and your enemies use ranged attacks.

### Battlefield Structure

* Cliff: Part of the battlefield is open, and part of it is impassable, creating an effective wall.
* Field: Completely free movement with long sight lines.
* Room: Free movement within a constrained space. It's infeasible to create a front line that fully blocks access to backline creatures.
* Tunnel: The width of the space is less than the number of combatants, making it easy to block off. Unless creatures dive past the front line, not everyone can be in melee.

### Battlefield Features

* Damage: There are damaging zones on the map that do not block movement or attacks, but which deal damage to creatures that pass through them. These could be burning oil patches, acid puddles, or magical hazards.
* Difficult terrain: Movement is slow, either globally or in large specific areas.
* Elevation: Part of the battlefield is elevated with enough room for creatures to stand, allowing them to have superior sight lines. In some cases, the source of that elevation could be destructible.
* Holes: Creatures can fall into holes in the map. Creatures that enter those holes are at least temporarily removed from combat. These could be pits, bodies of water, or magical portals.
* Trees: These obstacles do not meaningfully inhibit movement, but they provide easy sources of cover or concealment. These do not have to be literal trees; large rock formations can have a similar effect.

## Tactical Contexts and Abilities

* Superiority + Swarm = Bug Swatting:
  * Preferred effects:
    * Charge: Rush into melee and deal damage
    * Cleanse: Remove conditions to avoid debuffs that can bring you down to the swarm's level; they will eventually roll a 10 to hit with a debuff
    * Clear: Short to mid range AOE immediate damage to quickly kill enemies
    * Dive: Move through enemies and make melee attacks to hit the most relevant targets in the swarm
    * Goad
    * Flash: AOE brief debuffs to incapacitate enemies in bulk
    * Hazard: Creating an aoe battlefield hazard can affect enemies in bulk and constrain their mobility
  * Preferred costs:
    * Low accuracy: Irrelevant because you should be able to hit anyway
    * One-shot: "Once per enemy" doesn't matter because enemies should die in one or two hits
* Superiority + Squad = Elite Soldier
* Superiority + Boss = Nemesis:
  * Preferred effects:
    * Burn: Single-target damage over time optimizes damage output on a boss, who will often reach the full duration
    * Burst: Single-target immediate damage, especially to get the boss into HP as quickly as possible
    * Execute: Single-target immediate damage that requires the target to be in hit points
    * Goad: Redirect attention away from more vulnerable allies, such a with goading as a condition
    * Retaliate: Single-target damage with a bonus if the target attacked you
    * Softener: Single-target debuff condition without prerequisites
    * Stasis: One-round single-target debuff to remove a boss's action
    * Trip: One-round single-target defense debuff to support party attacks
  * Preferred costs:
    * Defense penalty: Even with a defense penalty, you may still be a suboptimal target for a boss attack relative to an ally
    * Payoff: Unusual prerequisites that generally require coordination and/or multiple weaker actions to fulfill
    * Short range: Not a downside since you are a good target for the boss
* Inferiority + Swarm = Keepaway
  * Preferred effects:
    * Artillery: Long-range AOE damage to contribute while staying out of danger
    * Barrier: Non-damaging walls to limit the swarm's mobility and set up choke points
    * Boon: Since you aren't good at attacking enemies, buffing allies can be more effective
    * Flash
    * Hazard
    * Healing: Since you aren't good at attacking enemies, healing allies can be more effective
    * Kite: Move and make a ranged attack
    * Retreat: Attack or block and also move away at the same time or improve your next movement
    * Turtle: Full defense so you don't die while your allies deal with the danger
    * Wildfire: AOE damage over time maximizes damage output
  * Preferred costs:
    * Fatigue: Fighting from inferiority is dangerous, so expending daily resources can be helpful
    * One-shot
* Inferiority + Squad = Weak Link
* Inferiority + Boss = David vs Goliath
  * Boon
  * Burn
  * Focus: Non-attack that makes your next round better, typically with more lenient range requirements than Generator so you can use it while not in danger from the boss
  * Generator: Attack that makes your next round better
  * Healing
  * Kite
  * Retreat
  * Ramp: Long-term self-buff for the duration of the fight
  * Snipe: Long-range single target damage (DOT or immediate)
  * Softener
  * Turtle
* Glass Cannon + Swarm = ARPG
  * Preferred effects:
    * Artillery
    * Clear
    * Kite
  * Preferred costs:
    * Defense penalties: You'll get hit anyway if they attack you
* Glass Cannon + Boss = Rocket Tag
  * Preferred effects:
    * Burn
    * Focus
    * Kite
    * Snipe
    * Stasis
  * Preferred costs:
    * Execute: Only works on targets in HP
* Tank + Swarm = Fly Swatting
  * Preferred effects:
    * Barrier
    * Boon
    * Cleanse
    * Dive
    * Flash
    * Goad
    * Hazard
    * Healing
    * Ramp
    * Wildfire
* Tank + Boss = Irritation
  * Preferred effects:
    * Barrier
    * Boon
    * Focus
    * Generator
    * Goad
    * Hazard
    * Healing
    * Maim: Powerful debuff that requires the target to be out of DR / in HP
    * Ramp
    * Retaliate
    * Stasis
    * Turtle
    * Trip
  * Preferred costs:
    * Execute
