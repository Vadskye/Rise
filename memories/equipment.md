# Rise Game Knowledge: Equipment

This memory details key aspects of the Rise game system related to equipment, derived from editing `comprehensive_codex/Equipment.tex`. This information is crucial for understanding how items function within the game and for future tasks involving equipment rules.

## Core Concepts and Interconnections

### 1. Wealth and Item Ranks
- **Dual Measurement:** Item worth is measured by both monetary value (gold pieces, silver pieces, copper pieces) and an abstract "item rank."
- **Level Correlation:** Gold is more relevant at low levels, while item rank becomes more significant at higher levels, though both systems are functional at any level.
- **Coin Exchange:** Standard exchange rates are 1 GP = 100 SP = 10,000 CP.
- **Item Rank to Power:** A magic item's `power` is directly tied to its `rank` (Power = 2 * Rank). This is a fundamental scaling mechanism for magic items.
- **Value Equivalence:** Approximately five items of a given rank are equivalent in value to one item of the next higher rank. This provides a guideline for wealth progression and item distribution.
- **Rarity:** Items of rank 0-1 are common; rank 2+ are rare, typically owned by nobility or adventurers.
- **Buying/Selling:**
    - Rank 3 or less: Typically bought/sold with gold.
    - Rank 4 or higher: Too expensive for gold; usually exchanged for other rare magic items or gems.
    - Adventurer Selling: Adventurers typically receive 1/5th of an item's value when selling for gold, or an item of one rank lower when trading. These are negotiable.
- **Untracked Items:** Some items (e.g., arrows) have no listed price as their cost is usually insignificant to track. GM discretion applies, typically measured in silver pieces.
- **Wealth Acquisition Pace:** A guideline suggests one non-consumable item per character level (of a rank equal to their highest current rank) and several consumables per level. This is a simplification, and GMs have flexibility.

### 2. Item Manipulation

- **Action Economy:** Interacting with objects depends on their weight how they are contained.
- **Free Action Manipulation:** Light and accessible objects can be manipulated as a free action. Only one free action object manipulation per round is allowed, but minor or standard actions can be substituted for additional manipulations (up to three total per round). Trivial actions (e.g., dropping an item) do not count against this limit.
- **Moving Between Hands:** Handheld objects can generally be moved between hands without an action, provided the combined weight can be held in one hand. Shields are an exception due to their cumbersome nature.
- **Storing Items:** Humanoids can carry up to five ordinary weapons/shields in easily accessible locations. Each additional item increases `encumbrance` by 1. `Heavy` weapons count as two, `Light` weapons as half, and `Compact` weapons are ignored for this purpose. Ammunition storage is treated as a separate `Light` item.

### 3. Magic Items

- **Activation:** Some magic items require explicit activation (e.g., command word, mental command, physical motion), while others provide constant passive effects. The item description specifies the mechanical action, but not the exact physical nature.
- **Limitations:**
    1.  Cannot equip multiple apparel items occupying the same physical body location (e.g., two gauntlet sets).
    2.  All magic items require `attunement` unless specified otherwise.
    3.  Cannot attune to two items with the same name or an upgraded version of an already attuned item.
- **Attunement:** A `standard action` is required to attune to an item using the `Item Attunement` ability. Multiple creatures can attune to the same item, allowing for swapping without re-attuning.
- **Removing Magic Items:** Effects tied to wearing/holding an item end if the item is removed, unless it's a consumable or doesn't affect the user.

### 4. Weapons

- **Components:** Weapons have a `weapon group`, `weapon tags`, `accuracy` modifier, and `dice pool`.
- **Weapon Damage Bonus:** Characters gain a bonus to `weapon damage` equal to half their `power`.
- **Free Hand Requirement:** Most weapons require a single `free hand` unless specified otherwise. `Versatile Grip` allows two-handed use for specific benefits.
- **Weapon Groups:** Thematic categories (e.g., "axes," "blades"). Some weapons belong to multiple groups.
- **Exotic Weapons:** Rare weapons with unusual fighting styles; proficiency is uncommon.
- **Proficiency Penalty:** A -2 accuracy penalty applies when using a weapon you are not proficient with.
- **Improvised Weapons:** Treated as similar manufactured weapons, incurring a -2 accuracy penalty due to lack of proficiency.
- **Natural Weapons:** Part of a creature's body, typically not requiring a `free hand`.
- **Weapon Size:** Most weapons are one size category smaller than the wielder; `Heavy` weapons are the same size. All are `lightweight` unless noted.
- **Inappropriately Sized Weapons:** Using a weapon sized one category larger or smaller incurs a -2 accuracy penalty.
- **Range Limits:** Ranged weapons have `close range` and `long range` limits. Attacks at `long range` incur a -4 accuracy `longshot penalty`.
- **Weapon Tags:** Special properties (e.g., `Ammunition`, `Bow`, `Compact`, `Heavy`, `Light`, `Long`, `Maneuverable`, `Mounted`, `Parrying`, `Projectile`, `Sweeping`, `Thrown`, `Versatile Grip`). Each tag has specific rules and implications for weapon use.

### 5. Armor

- **Types:** `Body armor` (worn) and `shields` (wielded). Only one body armor provides benefits; multiple layers stack penalties but not benefits.
- **Usage Classes:** Define whether armor is light, medium, or heavy.
- **Proficiency:** Non-proficient use halves defense bonus and applies `encumbrance` as an `accuracy` penalty.
- **Donning/Removing:** Time varies by armor type; requires two hands.
- **Weight and Size:** Body armor matches creature size; bucklers/standard shields are one size smaller; tower shields are the same size. Most are `lightweight`. Heavy body armor has higher Strength requirements.
- **Barding:** Armor for non-humanoid shapes; reduces Armor defense bonus by 2. Must be custom-made.
- **Multiple Armors:** Cannot benefit from multiple body armor sets. Multiple shields stack encumbrance but use the highest Armor/Reflex bonus; all special properties apply.

### 6. Special Materials (Weapons & Armor)

- **Nonmagical Enhancement:** Special materials alter weapon/armor properties without being magical.
- **Magic Item Incompatibility:** Special material items cannot have magic item properties, but can be `legacy items`.
- **Single Benefit:** A weapon/armor only gains benefits from one special material, even if multiple are present.
- **Weapon Specifics:**
    - `Adamantine`: Extra damage, double damage to objects, not `lightweight`.
    - `Cold Iron`: Vulnerability to fey/demons.
    - `Diamondsteel`: Accuracy bonus for critical hits.
    - `Dragonfang`: Energy damage, associated dragon tag.
    - `Mithral`: Reduces weight/encumbrance, can change weapon tags (`Light`, `Versatile Grip`).
    - `Silvered`: Vulnerability to lycanthropes/undead.
    - `Starmetal`: Extra damage, accuracy penalty, not `lightweight`.
- **Armor Specifics:**
    - `Adamantine`: Heavier, increased `damage resistance` and `encumbrance`.
    - `Cold Iron`: Bonus to defenses vs. magic, reduced Armor defense.
    - `Diamondsteel`: Bonus to defenses vs. critical hits.
    - `Dragonhide/Dragonscale`: Impervious/immune to specific energy types.
    - `Elvenweave/Mithral`: Reduces `encumbrance`.
    - `Shadeweave`: Reduced `encumbrance`/DR, Stealth bonus.
    - `Starmetal`: Heavier, increased `damage resistance` and `encumbrance`.
    - `Vineweave`: Increased `damage resistance`, `vulnerable` to `Fire` attacks.

### 7. Tools, Goods, and Mounts

- **Minor Items:** Cost is generally insignificant to track.
- **Standard Adventuring Kit:** A predefined set of common starting gear.

### 8. Consumables

- **Potions:** Magical liquids in vials. Drinking/administering requires a `standard action`. Cannot be safely mixed or consumed two at a time.

### 9. Magic Implements

- **Purpose:** Wielded to grant or enhance magical abilities (unlike weapons, which deal damage).
- **Types:**
    - **Staffs:** Improve existing magical abilities.
    - **Rods:** Grant new magical abilities (even to non-spellcasters).
    - **Wands:** Grant spellcasters knowledge of specific spells.
- **Physicality:** Staffs are long (4ft+), rods are medium (3ft), wands are short (1ft).
- **Somatic Components:** Wielding an implement allows gesturing with it for `somatic components`, removing the need for a separate `free hand`.
- **Staff Types:** Long staffs (two-handed, like quarterstaves) and short staffs (one-handed, can't be used to attack).
