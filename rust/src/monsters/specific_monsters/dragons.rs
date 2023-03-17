use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityTag, AreaSize, AreaTargets, Cooldown, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, DebuffEffect, SimpleDamageEffect,
};
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{
    DamageDice, DamageType, Debuff, Defense, FlightManeuverability, MovementMode, MovementSpeed,
    PassiveAbility, Size, SpecialDefenseType, SpeedCategory, Tag,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Dragon;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{FullMonsterDefinition, Role};

enum AgeCategory {
    Wyrmling,
    Juvenile,
    Adult,
    Ancient,
    Wyrm,
}

impl AgeCategory {
    fn all() -> Vec<Self> {
        return vec![
            Self::Wyrmling,
            Self::Juvenile,
            Self::Adult,
            Self::Ancient,
            Self::Wyrm,
        ];
    }

    fn attributes(&self) -> Vec<i32> {
        match self {
            Self::Wyrmling => vec![2, 4, 5, 1, 1, 1],
            Self::Juvenile => vec![6, 1, 6, 3, 3, 3],
            Self::Adult => vec![6, 0, 6, 4, 4, 4],
            Self::Ancient => vec![7, -1, 7, 5, 5, 5],
            Self::Wyrm => vec![8, -2, 8, 6, 6, 6],
        }
    }

    fn breath_weapon_line(&self) -> Targeting {
        let (width, size) = match self {
            Self::Wyrmling => (5, AreaSize::Medium),
            Self::Juvenile => (5, AreaSize::Large),
            Self::Adult => (10, AreaSize::Huge),
            Self::Ancient => (15, AreaSize::Gargantuan),
            Self::Wyrm => (20, AreaSize::Custom(480)),
        };
        return Targeting::Line(width, size, AreaTargets::Everything);
    }

    fn breath_weapon_cone(&self) -> Targeting {
        let size = match self {
            Self::Wyrmling => AreaSize::Small,
            Self::Juvenile => AreaSize::Medium,
            Self::Adult => AreaSize::Large,
            Self::Ancient => AreaSize::Huge,
            Self::Wyrm => AreaSize::Gargantuan,
        };
        return Targeting::Cone(size, AreaTargets::Everything);
    }

    fn challenge_rating(&self) -> ChallengeRating {
        match self {
            Self::Wyrmling => ChallengeRating::One,
            Self::Juvenile => ChallengeRating::Four,
            Self::Adult => ChallengeRating::Four,
            Self::Ancient => ChallengeRating::Four,
            Self::Wyrm => ChallengeRating::Four,
        }
    }

    // TODO: handle automatic trigger
    fn frightful_presence(&self) -> Option<Attack> {
        let size = match self {
            Self::Wyrmling => None,
            Self::Juvenile => Some(AreaSize::Large),
            Self::Adult => Some(AreaSize::Huge),
            Self::Ancient => Some(AreaSize::Gargantuan),
            Self::Wyrm => Some(AreaSize::Custom(480)),
        };
        if size.is_none() {
            return None;
        }
        let size = size.unwrap();
        return Some(Attack {
            accuracy: 0,
            crit: Some(AttackEffect::Debuff(DebuffEffect {
                debuffs: vec![Debuff::Frightened("the $name".to_string())],
                duration: AttackEffectDuration::Condition,
                immune_after_effect_ends: false,
            })),
            defense: Defense::Mental,
            extra_context: None,
            hit: AttackEffect::Debuff(DebuffEffect {
                debuffs: vec![Debuff::Shaken("the $name".to_string())],
                duration: AttackEffectDuration::Condition,
                immune_after_effect_ends: true,
            }),
            is_magical: false,
            is_strike: false,
            name: "Frightful Presence".to_string(),
            replaces_weapon: None,
            tags: Some(vec![Tag::Ability(AbilityTag::Emotion)]),
            targeting: Targeting::Radius(None, size, AreaTargets::Enemies),
        });
    }

    fn level(&self) -> i32 {
        match self {
            Self::Wyrmling => 4,
            Self::Juvenile => 8,
            Self::Adult => 12,
            Self::Ancient => 16,
            Self::Wyrm => 20,
        }
    }

    fn name(&self) -> &str {
        match self {
            Self::Wyrmling => "Wyrmling",
            Self::Juvenile => "Juvenile",
            Self::Adult => "Adult",
            Self::Ancient => "Ancient",
            Self::Wyrm => "Wyrm",
        }
    }

    fn size(&self) -> Size {
        match self {
            Self::Wyrmling => Size::Small,
            Self::Juvenile => Size::Large,
            Self::Adult => Size::Huge,
            Self::Ancient => Size::Gargantuan,
            Self::Wyrm => Size::Colossal,
        }
    }

    fn weapons(&self) -> Vec<Weapon> {
        let mut weapons = vec![
            StandardWeapon::MultipedalBite.weapon(),
            StandardWeapon::Claws.weapon(),
        ];
        match self {
            Self::Adult => weapons.push(StandardWeapon::Slam.weapon()),
            Self::Ancient => weapons.push(StandardWeapon::Slam.weapon()),
            Self::Wyrm => weapons.push(StandardWeapon::Slam.weapon()),
            _ => {}
        };
        return weapons;
    }
}

fn damage_rank(level: i32, cr: ChallengeRating) -> i32 {
    return ((level - 1) / 3) + cr.rank_modifier();
}

enum DragonType {
    Black,
    Blue,
    Brass,
    Bronze,
    Copper,
    Gold,
    Green,
    Red,
    Silver,
    White,
}

impl DragonType {
    fn all() -> Vec<Self> {
        return vec![
            Self::Black,
            Self::Blue,
            Self::Brass,
            Self::Bronze,
            Self::Copper,
            Self::Gold,
            Self::Green,
            Self::Red,
            Self::Silver,
            Self::White,
        ];
    }

    fn attribute_modifiers(&self) -> Vec<i32> {
        match self {
            Self::Black => vec![1, 1, -1, 0, -1, -1],
            Self::Blue => vec![0, 0, 1, 0, 0, -1],
            Self::Brass => vec![0, 0, -1, 0, 1, 1],
            Self::Bronze => vec![0, 0, 0, 0, -1, 1],
            Self::Copper => vec![-1, 1, -1, 1, 1, 0],
            Self::Gold => vec![1, 0, 0, 1, 1, 2],
            Self::Green => vec![-1, 0, -1, 2, 1, 0],
            Self::Red => vec![1, 0, 0, -1, -1, 1],
            Self::Silver => vec![0, 0, 0, 2, 0, 0],
            Self::White => vec![0, 0, 0, -3, -1, -1],
        }
    }

    fn alignment(&self) -> &str {
        match self {
            Self::Black => "Usually chaotic evil",
            Self::Blue => "Usually lawful evil",
            Self::Brass => "Usually chaotic good",
            Self::Bronze => "Usually lawful good",
            Self::Copper => "Usually chaotic good",
            Self::Gold => "Usually lawful good",
            Self::Green => "Usually lawful evil",
            Self::Red => "Usually chaotic evil",
            Self::Silver => "Usually lawful good",
            Self::White => "Usually chaotic evil",
        }
    }

    fn damage_type(&self) -> DamageType {
        match self {
            Self::Black => DamageType::Acid,
            Self::Blue => DamageType::Electricity,
            Self::Brass => DamageType::Fire,
            Self::Bronze => DamageType::Electricity,
            Self::Copper => DamageType::Acid,
            Self::Gold => DamageType::Fire,
            Self::Green => DamageType::Acid,
            Self::Red => DamageType::Fire,
            Self::Silver => DamageType::Cold,
            Self::White => DamageType::Cold,
        }
    }

    fn breath_weapon_is_line(&self) -> bool {
        match self {
            Self::Black => true,
            Self::Blue => true,
            Self::Brass => true,
            Self::Bronze => true,
            Self::Copper => true,
            Self::Gold => false,
            Self::Green => false,
            Self::Red => false,
            Self::Silver => false,
            Self::White => false,
        }
    }

    fn level_modifier(&self) -> i32 {
        match self {
            Self::Black => -1,
            Self::Blue => 0,
            Self::Brass => -2,
            Self::Bronze => 0,
            Self::Copper => -1,
            Self::Gold => 1,
            Self::Green => 0,
            Self::Red => 1,
            Self::Silver => 0,
            Self::White => -2,
        }
    }

    fn knowledge(&self) -> Knowledge {
        match self {
            Self::Black => Knowledge::new(vec![
                (0, "
                    Black dragons are associated with death and decay.
                    As black dragons age, the fleshy hide around their horns and face deteriorates, causing their heads to increasingly resemble a skull.
                    Young black dragons usually inhabit marshes and swamps, though older dragons tend to migrate to caves that are better equipped to support large dragon hoards.
                "),
                (5, "
                    Black dragons are the only type of dragon that commonly kills for no purpose other than sport.
                    They are sadistic beyond measure, and even their typical draconic greed may be set aside so they can torment and eventually kill hated foes.
                "),
                (10, "
                    Adult dragons naturally corrupt the areas around their lairs.
                    Good farmland becomes marshy and impassable, and trees become twisted and rotten.
                    Creatures in the area feel a mental pressure to be more cruel and sadistic.
                    This warps the behavior of the few ordinary animals that remain, as well as the reptilian creatures that thrive in such conditions.
                "),
            ]),
            Self::Blue => Knowledge::new(vec![
                (0, "
                    Blue dragons are unusually vain, even by the high standards of dragons.
                    They are almost always found in and around deserts.
                "),
                (5, "
                    All dragons desire gems, but blue dragons are obsessive in their search for the most beautiful gems to decorate their hoards.
                    They have a special fascination with sapphires and other blue gems, and may even give up greater wealth to gain them.
                "),
                (10, "
                    The lair of an adult blue dragon is usually surrounded by thunderstorms and dangerous weather.
                    Any desert sand nearby is marked with glassy shards wherever lightning has struck.
                    Creatures in the area feel more vain and prideful, and may be entranced by their reflections in the surrounding glass.
                "),
            ]),
            Self::Brass => Knowledge::new(vec![
                (0, "
                    Brass dragons are the most talkative and outgoing dragons.
                    They inhabit desert climates, and roam them widely searching for travellers or towns that can provide small talk and updates on current events.
                "),
                (5, "
                    Brass dragons are the only type of dragon who often have no consolidated hoard.
                    Instead, they tend to bury their treasures deep in the desert, and trust the isolation of the desert to keep them safe.
                    A brass dragon's favorite treasures are those that help it converse, such as intelligent items or magic items that allow communication at a distance.
                "),
                (10, "
                    The lair of an adult brass dragon is usually surrounded by sandstorms that make it impossible to identify any digging it has done.
                    Since the dragon has no desire to trap unwary travellers in its lair, creatures moving away from the lair find that the sandstorms clear up quickly.
                    Creatures in the area feel more talkative, and natural desert animals tend to be much more noisy and communicative than normal.
                "),
            ]),
            Self::Bronze => Knowledge::new(vec![
                (0, "
                    Bronze dragons are the most warlike and military dragons.
                    They are not easily roused to anger, but they love the practice of warfare and the use of majestic warships, and they eagerly look for opportunities to become involved on the right side of a brewing conflict.
                    They live on coasts, and spend most of their time flying over the sea instead of over land.
                "),
                (5, "
                    Pirates foolish enough to practice their trade within a bronze dragon's territory quickly learn the error of their ways.
                    Bronze dragons also enjoy searching sunken ships for valuables, especially novel weapons - including siege weapons - which it may carry all the way back to its lair for decoration.
                "),
                (10, "
                    The lair of an adult bronze dragon is usually set in a cliff surrounded by churning waves and strong currents.
                    The currents guide ships away from the lair, making it difficult to approach accidentally.
                    Ships that get too close despite those currents may find themselves trapped in dangerous whirlpools and dashed against the cliff face.
                    Creatures in the area feel a greater sense of military honor and may feel shamed into abandoning any pirating or pillaging intentions.
                "),
            ]),
            Self::Copper => Knowledge::new(vec![
                (0, "
                    Copper dragons are the most amusing and mischievous dragons.
                    They adore harmless tricks and illusions, and delight in surprising or deceiving both strangers and their closest friends.
                    They are social, though they prefer to host visitors in their lairs in the hills and lower parts of mountains instead of seeking out random travellers for conversation.
                "),
                (5, "
                    A copper dragon views any visitors to its lair as having implicitly agreed to engage in its games of deception.
                    Unlike most dragons, they generally make the location of their lair widely known among nearby civilized towns, and they are often found there awaiting guests.
                "),
                (10, "
                    The lair of an adult copper dragon is usually set in a large and well-crafted cave in a hill.
                    The surrounding area has a variety of illusory paths leading to other caves and distractions in the area.
                    These illusions are intended to test the observational skills of visitors and ensure that they are worth talking to, not to form a serious defense.
                    A copper dragon's publicly known lair is almost never the location of their true hoard, though it typically has a false hoard to trick would-be looters.
                    Creatures in the area find everything more humorous than they normally would, and may break into fits of laughter when surprised.
                "),
            ]),
            Self::Gold => Knowledge::new(vec![
                (0, "
                    Gold dragons are the wisest and most ostentatious dragons, and arguably the most powerful of all.
                    They are intensely serious in all of their pursuits, especially the vanquishing of evil.
                    They make their lairs in any terrain, but they prefer deeply secluded and mysterious areas with preexisting magical power.
                "),
                (5, "
                    Gold dragons hold themselves aloof from the world, and seldom bother to interact with other dragons, much less mortals.
                    They have a high - but well-founded - opinion of their own wisdom and power, and seldom deign to interact with lesser creatures except as necessary to compel agreement with the dragon's complex plans.
                    In rare circumstances, they may give advice or aid to especially worthy supplicants, but great deeds of valor and altruism are necessary to impress a gold dragon.
                    They can also be impressed by sheer gifts of wealth, since they freely consume gold and gems from their own hoards as necessary to sustain their battles against evil.
                "),
                (10, "
                    The lair of an adult gold dragon is surrounded by an eerie, magical light that emanates from all earth-based materials and metals, especially gems and jewels.
                    In addition, any natural magical effects in the area are amplified dramatically.
                    Creatures in the area suffer from a deep awareness of all of their imperfections and flaws, and are inspired to improve themselves - though they are aware that no mortal efforts can approach the majesty and perfection of a gold dragon.
                "),
            ]),
            Self::Green => Knowledge::new(vec![
                (0, "
                    Green dragons are the most jealous and greedy dragons.
                    Their lust for wealth, especially the wealth of others, is insatiable.
                    Villages and farmsteads near a green dragon's territory may never know peace until it leaves.
                    They tend to inhabit forests - the older, the better.
                "),
                (5, "
                    Younger green dragons sometimes get themselves into trouble by trying to steal from more powerful creatures, or by pillaging cities with the resources to pay for a hefty bounty.
                    Green dragons that have survived to old age are usually more reasonable than the average green dragon, and recognize the necessity for other creatures to temporarily have nice things.
                "),
                (10, "
                    The lair of an adult green dragon is surrounded by a poisonous mist that obscures sight and kills any lesser creatures that dare to approach too close.
                    The poison leaves trees and bushes mostly intact, but they still wither without the full heat of the sun and the care of forest animals.
                    Creatures in the area feel sickly and tired, even if they resist the lethal effects of the mist.
                "),
            ]),
            Self::Red => Knowledge::new(vec![
                (0, "
                    Red dragons are extremely confident in their own abilities.
                    They are easily enraged, and they lay claim to vast swaths of territory, regardless of its inhabitants or defenses.
                    They typically make their home in the lower slopes of great mountains, but their expansive view of their domain means they are commonly found in other environments as well.
                    Their aggression and boldness makes them the most feared type of dragon in most locations.
                "),
                (5, "
                    Red dragons are less intelligent and more impulsive than most dragons, though older red dragons are still far above average human intelligence.
                    Older red dragons know that their fire breath is hot enough to destroy valuable treasure, so they tend to avoid using it in fights that they expect to be both easy and profitable.
                "),
                (10, "
                    The lair of an adult red dragon is surrounded by stifling heat regardless of the area's natural climate, and the air is tinged with sulfurous fumes.
                    This heat makes the area an attractive location for creatures from the Plane of Fire, and they often find their way there.
                    If possible, red dragons prefer to claim a lair within an active volcano, but they must be able to defend such a valuable location against other red dragons.
                    Creatures in the area are short-tempered and easily provoked, even if they are unaffected by the heat.
                "),
            ]),
            Self::Silver => Knowledge::new(vec![
                (0, "
                    Silver dragons are the most scholarly dragons.
                    They study the history of magic and the mortal races from their lairs atop frozen mountain peaks.
                    They sometimes leave their lairs to do research on topics of interest to them, either with their own observations or by gathering tomes of knowledge.
                "),
                (5, "
                    On rare occasions, silver dragons will come to some grand conclusion based on their research.
                    When they do, they take their knowledge and travel the civilized world to avert some foreseen disaster or to spread their knowledge with mortals who need it.
                    They require no payment for these services, but they do take the opportunity to seek out new developments in the world and gather research to fuel their next obsession.
                "),
                (10, "
                    The lair of an adult silver dragon is typically covered in a blinding snowstorm that drives any interlopers safely to the edges of the storm.
                    The surrounding terrain is sculpted into a frozen labyrinth of ice and stone that makes it difficult for creatures to find the center, while also preventing the winds from driving unwary creatures off of cliffs.
                    Creatures in the area feel a deeper sense of curiosity, and are easily distracted by new phenomena or information they encounter.
                "),
            ]),
            Self::White => Knowledge::new(vec![
                (0, "
                    White dragons are the most bestial dragons.
                    They are isolationists, and prefer the simplicity of a solitary hunt over any interaction with civilization or conversation.
                    They pose little threat to towns, even within their territory, but are likely to prey on any small groups wandering the mountain peaks they call home.
                "),
                (5, "
                    White dragons lack the cultivated cruelty of black dragons, but they have an insatiable hunger that makes their attacks on trespassers no less relentless.
                    They dream of having vast caves full of frozen corpses to feed on at their whim.
                    However, few have the patience and bounty of prey to seal meat into statues instead of consuming it on the spot.
                "),
                (10, "
                    The lair of an adult white dragon is surrounded by perilous cold.
                    Even some creatures adapted to mountain peaks can be found frozen solid around the landscape.
                    Creatures in the area think and talk more slowly and struggle to grasp complex concepts.
                "),
            ]),
        }
    }

    fn name(&self) -> &str {
        match self {
            Self::Black => "Black",
            Self::Blue => "Blue",
            Self::Brass => "Brass",
            Self::Bronze => "Bronze",
            Self::Copper => "Copper",
            Self::Gold => "Gold",
            Self::Green => "Green",
            Self::Red => "Red",
            Self::Silver => "Silver",
            Self::White => "White",
        }
    }

    fn passive_abilities(&self) -> Option<Vec<PassiveAbility>> {
        match self {
            Self::Black => Some(vec![PassiveAbility {
                name: "Underwater Freedom".to_string(),
                is_magical: false,
                description: "
                        A black dragon can breathe underwater indefinitely.
                        In addition, its breath weapon functions at full strength underwater.
                    "
                .to_string(),
            }]),
            _ => None,
        }
    }
}

fn breath_weapon(dragon_type: &DragonType, age_category: &AgeCategory) -> Attack {
    let targeting = if dragon_type.breath_weapon_is_line() {
        age_category.breath_weapon_line()
    } else {
        age_category.breath_weapon_cone()
    };
    return Attack {
        accuracy: 0,
        crit: None,
        defense: Defense::Reflex,
        extra_context: Some(AbilityExtraContext {
            cooldown: Some(Cooldown::Brief(None)),
            movement: None,
            suffix: None,
        }),
        hit: AttackEffect::Damage(
            SimpleDamageEffect {
                damage_dice: DamageDice::aoe_damage(damage_rank(
                    age_category.level() + dragon_type.level_modifier(),
                    age_category.challenge_rating(),
                )),
                damage_types: vec![dragon_type.damage_type()],
                power_multiplier: 0.5,
            }
            .damage_effect(),
        ),
        is_magical: false,
        is_strike: false,
        name: "Breath Weapon".to_string(),
        replaces_weapon: None,
        tags: None,
        targeting,
    };
}

fn dragon(dragon_type: &DragonType, age_category: &AgeCategory) -> Monster {
    let mut attributes = age_category.attributes();
    for (i, modifier) in dragon_type.attribute_modifiers().iter().enumerate() {
        attributes[i] += modifier;
    }
    let mut special_attacks = vec![breath_weapon(dragon_type, age_category)];
    if let Some(f) = age_category.frightful_presence() {
        special_attacks.push(f);
    }

    let mut modifiers: Vec<Modifier> =
        ModifierBundle::Quadrupedal.plus_modifiers(vec![Modifier::Immune(
            SpecialDefenseType::Damage(dragon_type.damage_type()),
        )]);
    if let Some(passive_abilities) = dragon_type.passive_abilities() {
        for p in passive_abilities {
            modifiers.push(Modifier::PassiveAbility(p));
        }
    }
    for a in special_attacks {
        modifiers.push(Modifier::Attack(a));
    }
    let level = age_category.level() + dragon_type.level_modifier();

    return FullMonsterDefinition {
        alignment: dragon_type.alignment().to_string(),
        attributes,
        challenge_rating: age_category.challenge_rating(),
        creature_type: Dragon,
        description: None,
        knowledge: None,
        level,
        modifiers: Some(modifiers),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            MovementSpeed::new(
                MovementMode::Fly(FlightManeuverability::Poor),
                SpeedCategory::VeryFast,
            ),
        ]),
        name: format!("{} {} Dragon", age_category.name(), dragon_type.name()),
        senses: None,
        size: age_category.size(),
        trained_skills: None,
        weapons: age_category.weapons(),
    }
    .monster();
}

pub fn dragons() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
              Legends speak of reptilian flying creatures called dragons.
              Their love of gold and gems is as legendary as their awe-inspiring power.
              Dragons keep their wealth in massive hoards, and the search for these hoards has been the death of many a greedy adventurer.
            "),
            (5, "
              Dragons are inherently magical creatures, and they enjoy powerful magic items almost as much as they enjoy gold.
              As dragons age, they grow continually in power and size.
              All dragons have damaging breath weapons, and the size and shape of the breath depends on the type and age of the dragon.
              They also have extremely keen senses, and are very difficult to sneak up on.
            "),
            (10, "
              There are two types of dragons: metallic dragons and chromatic dragons.
              Metallic dragons have shiny, glistening scales, and all metallic dragons are named after metals.
              Chromatic dragons have intensely colored scales, and all chromatic dragons are named after colors.
              Metallic dragons tend to be good-aligned, and chromatic dragons tend to be evil-aligned.

              Dragon bones and scales retain some of the magical power of their original owner.
              They can be used to craft powerful weapons and armor, and can be quite valuable to the right buyer.
            "),
            (15, "
              In combat, dragons take full advantage of their myriad attack options.
              They fight at whatever range they consider optimal.
              In general, they are most dangerous in melee, but they may choose to remain at a distance to avoid powerful melee opponents.
              In that case, they use their their spells and breath weapon to pick off opponents that cannot fight effectively at range.

              Dragons can fly extremely quickly, and they can use this ability to escape a losing fight or to pick off isolated creatures trying to keep their distance.
              They generally avoid grappling foes, possibly because they find it demeaning, but large dragons may swallow smaller opponents whole.
            "),
            (20, "
              Newly hatched dragons are a few feet long, while the oldest dragons are among the most massive and dangerous creatures in existence.
              Although ancient dragons are immensely powerful, they are also rarely active, requiring weeks or months of sleep between days of activity.
              Eventually, it is said that the most ancient dragons simply go to sleep and may never wake up, though they live indefinitely in that state.
            "),
            (25, "
              There is a practical side to the famous greed of dragons.
              Dragons can metabolize gold and magical energy from items they eat to fuel their immense power and bulk.
              In desperate times, a dragon may be forced to eat part of its hoard to accelerate its recovery from injuries or increase its power.
              As dragons approach the inevitable torpor of their old age, they can stave it off or recover from a long rest by consuming part of their hoard.
              This is a difficult decision for a dragon to make, and most dragons never eat a single gold piece.
            "),
        ])),
        name: "Dragons".to_string(),
        monsters: vec![],
    }));

    for dragon_type in DragonType::all() {
        let dragons = AgeCategory::all()
            .iter()
            .map(|a| dragon(&dragon_type, a))
            .collect();

        monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
            knowledge: Some(dragon_type.knowledge()),
            name: format!("{} Dragons", dragon_type.name()),
            monsters: dragons,
        }));
    }

    return monsters;
}
