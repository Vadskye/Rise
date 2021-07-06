use crate::classes::archetype_rank_abilities;
use crate::classes::Class;
use titlecase::titlecase;

pub enum ClassArchetype {
    // Barbarian
    BattleforgedResilience,
    Battlerager,
    OutlandSavage,
    PrimalWarrior,
    Totemist,
    // Cleric
    ClericDivineMagic,
    DivineSpellMastery,
    DomainInfluence,
    Healer,
    Preacher,
    // Druid
    Elementalist,
    NatureMagic,
    NatureSpellMastery,
    Shifter,
    Wildspeaker,
    // Fighter
    CombatDiscipline,
    EquipmentTraining,
    MartialMastery,
    Sentinel,
    Tactician,
    // Monk
    Airdancer,
    EsotericWarrior,
    Ki,
    PerfectedForm,
    TranscendentSage,
    // Paladin
    DevotedParagon,
    PaladinDivineMagic,
    DivineSpellExpertise,
    StalwartGuardian,
    ZealousWarrior,
    // Ranger
    Beastmaster,
    BoundaryWarden,
    Huntmaster,
    Scout,
    WildernessWarrior,
    // Rogue
    Assassin,
    BardicMusic,
    CombatTrickster,
    JackOfAllTrades,
    SuaveScoundrel,
    // Sorcerer
    SorcererArcaneMagic,
    SorcererArcaneSpellMastery,
    DraconicMagic,
    InnateArcanist,
    WildMagic,
    // Warlock
    BlessingsOfTheAbyss,
    KeeperOfForbiddenKnowledge,
    PactMagic,
    PactSpellMastery,
    SoulkeepersChosen,
    // Wizard
    WizardArcaneMagic,
    WizardArcaneSpellMastery,
    Alchemist,
    ArcaneScholar,
    SchoolSpecialist,
}

impl ClassArchetype {
    pub fn class(&self) -> Class {
        match self {
            // Barbarian
            Self::BattleforgedResilience => Class::Barbarian,
            Self::Battlerager => Class::Barbarian,
            Self::OutlandSavage => Class::Barbarian,
            Self::PrimalWarrior => Class::Barbarian,
            Self::Totemist => Class::Barbarian,
            // Cleric
            Self::ClericDivineMagic => Class::Cleric,
            Self::DivineSpellMastery => Class::Cleric,
            Self::DomainInfluence => Class::Cleric,
            Self::Healer => Class::Cleric,
            Self::Preacher => Class::Cleric,
            // Druid
            Self::Elementalist => Class::Druid,
            Self::NatureMagic => Class::Druid,
            Self::NatureSpellMastery => Class::Druid,
            Self::Shifter => Class::Druid,
            Self::Wildspeaker => Class::Druid,
            // Fighter
            Self::CombatDiscipline => Class::Fighter,
            Self::EquipmentTraining => Class::Fighter,
            Self::MartialMastery => Class::Fighter,
            Self::Sentinel => Class::Fighter,
            Self::Tactician => Class::Fighter,
            // Monk
            Self::Airdancer => Class::Monk,
            Self::EsotericWarrior => Class::Monk,
            Self::Ki => Class::Monk,
            Self::PerfectedForm => Class::Monk,
            Self::TranscendentSage => Class::Monk,
            // Paladin
            Self::DevotedParagon => Class::Paladin,
            Self::PaladinDivineMagic => Class::Paladin,
            Self::DivineSpellExpertise => Class::Paladin,
            Self::StalwartGuardian => Class::Paladin,
            Self::ZealousWarrior => Class::Paladin,
            // Ranger
            Self::Beastmaster => Class::Ranger,
            Self::BoundaryWarden => Class::Ranger,
            Self::Huntmaster => Class::Ranger,
            Self::Scout => Class::Ranger,
            Self::WildernessWarrior => Class::Ranger,
            // Rogue
            Self::Assassin => Class::Rogue,
            Self::BardicMusic => Class::Rogue,
            Self::CombatTrickster => Class::Rogue,
            Self::JackOfAllTrades => Class::Rogue,
            Self::SuaveScoundrel => Class::Rogue,
            // Sorcerer
            Self::SorcererArcaneMagic => Class::Sorcerer,
            Self::SorcererArcaneSpellMastery => Class::Sorcerer,
            Self::DraconicMagic => Class::Sorcerer,
            Self::InnateArcanist => Class::Sorcerer,
            Self::WildMagic => Class::Sorcerer,
            // Warlock
            Self::BlessingsOfTheAbyss => Class::Warlock,
            Self::KeeperOfForbiddenKnowledge => Class::Warlock,
            Self::PactMagic => Class::Warlock,
            Self::PactSpellMastery => Class::Warlock,
            Self::SoulkeepersChosen => Class::Warlock,
            // Wizard
            Self::Alchemist => Class::Wizard,
            Self::WizardArcaneMagic => Class::Wizard,
            Self::WizardArcaneSpellMastery => Class::Wizard,
            Self::ArcaneScholar => Class::Wizard,
            Self::SchoolSpecialist => Class::Wizard,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            // Barbarian
            Self::BattleforgedResilience => "Battleforged Resilience",
            Self::Battlerager => "Battlerager",
            Self::OutlandSavage => "Outland Savage",
            Self::PrimalWarrior => "Primal Warrior",
            Self::Totemist => "Totemist",
            // Cleric
            Self::ClericDivineMagic => "Divine Magic",
            Self::DivineSpellMastery => "Divine Spell Mastery",
            Self::DomainInfluence => "Domain Influence",
            Self::Healer => "Healer",
            Self::Preacher => "Preacher",
            // Druid
            Self::Elementalist => "Elementalist",
            Self::NatureMagic => "Nature Magic",
            Self::NatureSpellMastery => "Nature Spell Mastery",
            Self::Shifter => "Shifter",
            Self::Wildspeaker => "Wildspeaker",
            // Fighter
            Self::CombatDiscipline => "Combat Discipline",
            Self::EquipmentTraining => "Equipment Training",
            Self::MartialMastery => "Martial Mastery",
            Self::Sentinel => "Sentinel",
            Self::Tactician => "Tactician",
            // Monk
            Self::Airdancer => "Airdancer",
            Self::EsotericWarrior => "Esoteric Warrior",
            Self::Ki => "Ki",
            Self::PerfectedForm => "Perfected Form",
            Self::TranscendentSage => "Transcendent Sage",
            // Paladin
            Self::DevotedParagon => "Devoted Paragon",
            Self::PaladinDivineMagic => "Divine Magic",
            Self::DivineSpellExpertise => "Divine Spell Expertise",
            Self::StalwartGuardian => "Stalwart Guardian",
            Self::ZealousWarrior => "Zealous Warrior",
            // Ranger
            Self::Beastmaster => "Beastmaster",
            Self::BoundaryWarden => "Boundary Warden",
            Self::Huntmaster => "Huntmaster",
            Self::Scout => "Scout",
            Self::WildernessWarrior => "Wilderness Warrior",
            // Rogue
            Self::Assassin => "Assassin",
            Self::BardicMusic => "Bardic Music",
            Self::CombatTrickster => "Combat Trickster",
            Self::JackOfAllTrades => "Jack Of All Trades",
            Self::SuaveScoundrel => "Suave Scoundrel",
            // Sorcerer
            Self::SorcererArcaneMagic => "Arcane Magic",
            Self::SorcererArcaneSpellMastery => "Arcane Spell Mastery",
            Self::DraconicMagic => "Draconic Magic",
            Self::InnateArcanist => "Innate Arcanist",
            Self::WildMagic => "Wild Magic",
            // Warlock
            Self::BlessingsOfTheAbyss => "Blessings Of The Abyss",
            Self::KeeperOfForbiddenKnowledge => "Keeper Of Forbidden Knowledge",
            Self::PactMagic => "Pact Magic",
            Self::PactSpellMastery => "Pact Spell Mastery",
            Self::SoulkeepersChosen => "Soulkeepers Chosen",
            // Wizard
            Self::Alchemist => "Alchemist",
            Self::WizardArcaneMagic => "Arcane Magic",
            Self::WizardArcaneSpellMastery => "Arcane Spell Mastery",
            Self::ArcaneScholar => "Arcane Scholar",
            Self::SchoolSpecialist => "School Specialist",
        }
    }

    pub fn rank_abilities(&self) -> Vec<archetype_rank_abilities::RankAbility> {
        return archetype_rank_abilities::archetype_rank_abilities(self);
    }

    pub fn is_magical(&self) -> bool {
        return self.rank_abilities().iter().all(|a| a.is_magical);
    }

    pub fn short_description(&self) -> String {
        let description = match self {
            // Barbarian
            Self::BattleforgedResilience => "This archetype improves your durability in combat.",
            Self::Battlerager => "This archetype grants you a devastating rage, improving your combat prowess.",
            Self::OutlandSavage => "This archetype improves your mobility and combat prowess with direct, brutal abilities.",
            Self::PrimalWarrior => "This archetype grants you abilities to use in combat and improves your physical skills.",
            Self::Totemist => "This archetype allows you to embody the spirits of apex predators to improve your combat ability.",
            // Cleric
            Self::ClericDivineMagic => "
                This archetype grants you the ability to cast divine spells.
            ",
            Self::DivineSpellMastery => "
                This archetype improves the divine spells you cast.
                You must have the Divine Magic archetype from the cleric class to gain the abilities from this archetype.
            ",
            Self::DomainInfluence => "
                This archetype grants you divine influence over two domains of your choice.
            ",
            Self::Healer => "This archetype grants you healing abilities.",
            Self::Preacher => "This archetype grants you the ability to inspire your allies and denounce or even convert your foes.",
            // Druid
            Self::Elementalist => r"
                This archetype grants you influence over four elements that define the natural world: air, earth, fire, and water.
            ",
            Self::NatureMagic => r"
                This archetype grants you the ability to cast nature spells.
            ",
            Self::NatureSpellMastery => r"
                This archetype improves the nature spells you cast.
                You must have the Nature Magic archetype from the cleric class to gain the abilities from this archetype.
            ",
            Self::Shifter => r"
                This archetype grants you the ability to embody aspects of the natural world in your own form.
            ",
            Self::Wildspeaker => r"
                This archetypes deepens your connection to animals and plants, and allows you to call animals to aid you in combat.
            ",
            // Fighter
            Self::CombatDiscipline => r"
                This archetype allows you to improve your defenses and resist conditions.
            ",
            Self::EquipmentTraining => r"
                This archetype improves your combat prowess with weapons and armor.
            ",
            Self::MartialMastery => r"
                This archetype grants you special abilities to use in combat.
            ",
            Self::Sentinel => r"
                This archetype improves your ability to protect your allies in combat and control the battlefield.
            ",
            Self::Tactician => r"
                This archetype helps you lead your allies in combat with tactical abilities that allow you to adapt to different circumstances.
            ",
            // Monk
            Self::Airdancer => r"
                This archetype improves your acrobatic ability and mobility in combat.
            ",
            Self::EsotericWarrior => r"
                This archetype improves your combat prowess with unusual abilities you can use in combat.
            ",
            Self::Ki => r"
                This archtype grants you unusual abilities based on tapping into your inner ki.
                If you have any \glossterm{encumbrance}, you lose the benefit of all abilities from this archetype.
            ",
            Self::PerfectedForm => r"
                This archetype improves the perfection of your physical body, including your unarmed attacks, through rigorous training.
            ",
            Self::TranscendentSage => r"
                This archetype grants you abilities to resist or remove conditions.
            ",
            // Paladin
            Self::DevotedParagon => r"
                This archetype deepens your connection to your alignment, granting you an aura and improving your combat abilities.
            ",
            Self::PaladinDivineMagic => r"
                This archetype grants you the ability to cast divine spells.
            ",
            Self::DivineSpellExpertise => r"
                This archetype improves the divine spells you cast.
                You must have the Divine Magic archetype from the paladin class to gain the abilities from this archetype.
            ",
            Self::StalwartGuardian => r"
                This archetype grants you healing abilities and improves your defensive prowess.
            ",
            Self::ZealousWarrior => r"
                This archetype improves your combat prowess, especially against foes who do not share your devoted alignment.
            ",
            // Ranger
            Self::Beastmaster => r"
                This archetype improves your connection to animals, allowing you to control and command them in battle.
            ",
            Self::BoundaryWarden => r"
                This archetype improves your ability to guard the boundaries between civilization and nature.
            ",
            Self::Huntmaster => r"
                This archetype grants you and your allies abilities to hunt down specific foes.
            ",
            Self::Scout => r"
                This archetype improves your senses and overall scouting ability.
            ",
            Self::WildernessWarrior => r"
                This archetype grants you abilities to use in combat and improves your physical skills.
            ",
            // Rogue
            Self::Assassin => r"
                This archetype improves your agility, stealth, and combat prowess against unaware targets.
            ",
            Self::BardicMusic => r"
                This archetype grants you the ability to inspire your allies and impair your foes with musical performances.
            ",
            Self::CombatTrickster => r"
                This archetype grants you abilities to use in combat and improves your combat prowess.
            ",
            Self::JackOfAllTrades => r"
                This archetype improves your skills and versatility.
            ",
            Self::SuaveScoundrel => r"
                This archetype improves your deceptiveness and helps you make use of that talent in combat.
            ",
            // Sorcerer
            Self::SorcererArcaneMagic => r"
                This archetype grants you the ability to cast arcane spells.
            ",
            Self::SorcererArcaneSpellMastery => r"
                This archetype improves the arcane spells you cast.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::DraconicMagic => r"
                Not all sorcerers know the reason for their innate connection to magic.
                Some discover that they have draconic blood in their veins, and some of those sorcerers learn how to tap into their heritage.
                This archetype deepens your magical connection to your draconic ancestor and enhances your spellcasting.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::InnateArcanist => r"
                This archetype deepens your innate connection to arcane magic and improves your ability to defeat other spellcasters.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::WildMagic => r"
                This archetype makes the magic you cast more chaotic, generally increasing its power at the cost of your control over your magic.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            // Warlock
            Self::BlessingsOfTheAbyss => r"
                You can only choose this archetype if your soulkeeper is a demon or devil.
                This archetype enhances your connection to the Abyss and allows you to channel its sinister power more directly.
            ",
            Self::KeeperOfForbiddenKnowledge => r"
                This archetype grants you access to dangerous secrets revealed to you by your soulkeeper.
            ",
            Self::PactMagic => r"
                This archetype grants you the ability to cast pact spells.
            ",
            Self::PactSpellMastery => r"
                This archetype improves your ability to cast spells with the power of your dark pact.
                You must have the Pact Magic archetype to gain the abilities from this archetype.
            ",
            Self::SoulkeepersChosen => r"
                This archetype enhances your connection to your soulkeeper, granting you abilities relating to your pact.
            ",
            // Wizard
            Self::Alchemist => r"
                This archetype improves your ability to use alchemy to create unusual concoctions to aid your allies and harm your foes.
            ",
            Self::WizardArcaneMagic => r"
                This archetype grants you the ability to cast arcane spells.
            ",
            Self::ArcaneScholar => r"
                This archetype deepens your study of arcane magic.
                You have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
            Self::WizardArcaneSpellMastery => r"
                This archetype improves the arcane spells you cast.
                You must have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
            Self::SchoolSpecialist => r"
                This archetype improves your ability to cast spells from a particular school of magic while sacrificing some versatility.
                You have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
        };
        return format!(
            "{} {}",
            description,
            if self.is_magical() {
                "All abilities from this archetype are \\glossterm{magical}."
            } else {
                ""
            }
        );
    }

    pub fn typical_character (&self) -> Option<String> {
        let typical = match self {
            // Barbarian
            Self::BattleforgedResilience => r"
                If you want to quickly create a character based on the eagle totem from this archetype, make the following choices:
                \parhead{Species} Dwarf.
                \parhead{Attributes} 2 Str, 0 Dex, 4 Con, 0 Int, 2 Per, 1 Wil (after species modifiers).
                \parhead{Class} Barbarian.
                \parhead{Archetypes} Battleforged Resilience first, Primal Warrior second, Totemist (bear totem) third.
                \parhead{Insight Points} 1 point for heavy armor.
                \parhead{Skills} Awareness (M), Endurance (M), Medicine (M), Climb (T), Jump (T), Survival (T), Swim (T).
                \parhead{Weapon Groups} Axes, thrown weapons.
                \parhead{Languages} Common, Dwarven, Giant.
                \parhead{Equipment} Battleaxe, standard shield, scale mail. As you gain levels, use the best heavy armor you can afford.
                \parhead{Legacy Item} Shield.
                    At level 3, choose \mitem{protective shield}.
                    At level 9, choose \mitem{greater protective shield} and \mitem{covering shield}.
                    At level 15, choose \mitem{supreme protective shield}, \mitem{greater shield of arrow catching}, and \mitem{shield of arrow deflection}.
                \parhead{Combat Styles} Ebb and Flow, Herald of War, Unbreakable Defense.
                \parhead{Suggested Maneuvers}
                \begin{itemize}
                    \item Rank 1: \maneuver{fearsome roar}, \maneuver{reckless strike}
                    \item Rank 2: \maneuver{defensive strike}, \maneuver{directed shout}
                    \item Rank 3: \maneuver{challenging strike}, \maneuver{punish inattention}
                    \item Rank 4: \maneuver{cleansing strike}, \maneuver{frightening roar}
                    \item Rank 5: \maneuver{bracing strike}, \maneuver{cleansing strike}
                    \item Rank 6: \maneuver{greater directed shout}, \maneuver{greater reckless assault}
                    \item Rank 7: \maneuver{fear-inspiring strike}, \maneuver{revitalizing battlecry}
                \end{itemize}
                \parhead{Suggested Feats} Shieldbearer, Regenerator, Toughness.
                \parhead{Combat Tactics} You are extremely difficult to kill.
                Take advantage of that by wading into the front lines of combat and drawing attention away from your more vulnerable allies.
                If you find yourself in danger, use defensive maneuvers like \maneuver{bracing strike} and \maneuver{defensive strike} to keep yourself safe.
                On the other hand, if your foes try to ignore you after realizing how durable you are, use aggressive maneuvers like \maneuver{reckless strike} to make the most of their inattention, or force them to engage with you using maneuvers like \maneuver{challenging strike}.
            ",
            Self::Battlerager => r"
                If you want to quickly create a character based on the eagle totem from this archetype, make the following choices:
                \parhead{Species} Half-orc.
                \parhead{Attributes} 4 Str, 2 Dex, 2 Con, -1 Int, 2 Per, 0 Wil (after species modifiers).
                \parhead{Class} Barbarian.
                \parhead{Archetypes} Battlerager first, Primal Warrior second, Totemist (lion totem) third.
                \parhead{Insight Points} 1 point for extra maneuver.
                \parhead{Skills} Awareness (M), Climb (M), Endurance (M), Jump (M), Swim (M).
                \parhead{Weapon Groups} Club-like weapons, crossbows.
                \parhead{Equipment} Greatmace, scale mail. As you gain levels, buy a heavy crossbow and use the best medium armor you can afford.
                \parhead{Legacy Item} Weapon.
                    At level 3, choose \mitem{surestrike}.
                    At level 9, choose \mitem{greater surestrike} and \mitem{blessed}.
                    At level 15, choose \mitem{supreme surestrike}, \mitem{greater shocking}, and \mitem{blessed}.
                \parhead{Combat Styles} Ebb and Flow, Flurry of Blows, Unbreakable Defense.
                \parhead{Suggested Maneuvers}
                \begin{itemize}
                    \item Rank 1: \maneuver{power strike}, \maneuver{reckless strike}, \maneuver{twinstrike}
                    \item Rank 2: \maneuver{followup strike}, \maneuver{whirlwind}
                    \item Rank 3: \maneuver{deathseeking flurry}, \maneuver{reckless assault}
                    \item Rank 4: \maneuver{counter sweep}, \maneuver{tenderizing smash}
                    \item Rank 5: \maneuver{bracing strike}, \maneuver{greater hunting strike}
                    \item Rank 6: \maneuver{followup flurry}, \maneuver{greater reckless assault}
                    \item Rank 7: \maneuver{greater desperate flurry}, \maneuver{whirlwind flurry}
                \end{itemize}
                \parhead{Suggested Feats} Greatweapon Warrior, Rapid Reaction, Swift.
                \parhead{Combat Tactics} You are a furious frenzy of devastating damage and lethal critical hits.
                When you roll a 10 on an attack roll, whatever you attacked will probably die.
                Staying close to your allies is generally a good plan, since you don't have the durability to run into the middle of a horde of enemies safely.
                Your maneuvers help you deal with high-Armor enemies and enemy swarms, and give you the ability to sacrifice most of your statistics other than damage in exchange for more damage.
            ",
            Self::OutlandSavage => r"
                If you want to quickly create a character based on the eagle totem from this archetype, make the following choices:
                \parhead{Species} Half-orc.
                \parhead{Attributes} 5 Str, 2 Dex, 1 Con, -1 Int, 0 Per, 1 Wil (after species modifiers).
                \parhead{Class} Barbarian.
                \parhead{Archetypes} Outland Savage first, Primal Warrior second, Totemist (wolf totem) third.
                \parhead{Insight Points} 1 point for proficiency with exotic armor weapons.
                \parhead{Skills} Awareness (M), Climb (M), Endurance (M), Jump (M), Swim (M).
                \parhead{Weapon Groups} Armor weapons, flexible weapons.
                \parhead{Languages} Common, Orc.
                \parhead{Equipment} Flail, scale mail. As you gain levels, use the best medium armor you can afford, and get spikes and a spiked knee crafted onto it.
                \parhead{Legacy Item} Weapon.
                    At level 3, choose \mitem{potency}.
                    At level 9, choose \mitem{greater potency} and \mitem{blessed}.
                    At level 15, choose \mitem{supreme potency}, \mitem{greater freezing}, and \mitem{blessed}.
                \parhead{Combat Styles} Dirty Fighting, Mobile Assault, Unbreakable Defense.
                \parhead{Suggested Maneuvers}
                \begin{itemize}
                    \item Rank 1: \maneuver{anklesprainer}, \maneuver{wanderer's strike}
                    \item Rank 2: \maneuver{knockback shove}, \maneuver{strangle}
                    \item Rank 3: \maneuver{battering ram}, \maneuver{revitalizing strike}
                    \item Rank 4: \maneuver{greater anklesprainer}, \maneuver{steal weapon}
                    \item Rank 5: \maneuver{eye-averting strike}, \maneuver{spellbreaker strike}
                    \item Rank 6: \maneuver{greater reaping harvest}, \maneuver{greater revitalizing strike}
                    \item Rank 7: \maneuver{greater steal weapon}, \maneuver{instant pin}
                \end{itemize}
                \parhead{Suggested Feats} Savage, Brawler, Swift.
                \parhead{Combat Tactics} You can move around the battlefield very quickly, and you are incredibly accurate with special combat actions like shoving and grappling enemies.
                Make the most of that by repositioning enemies, tripping them, or holding them in grapples so your allies can hit them.
                While you aren't in a grapple, use your flail in two hands to maximize your damage.
                When you enter a grapple, use your spiked knee to attack, since your flail is much less effective while grappling.
                If you don't have any allies who like being on the front lines, you won't be as effective at helping them deal damage to enemies, but you're still very skilled at preventing enemies from reaching your allies.
                In that case, consider choosing bear totem or shark totem instead of wolf totem.
            ",
            Self::PrimalWarrior => r"
                If you want to quickly create a character based on the eagle totem from this archetype, make the following choices:
                \parhead{Species} Human.
                \parhead{Attributes} 2 Str, 2 Dex, 2 Con, 2 Int, 2 Per, 0 Wil.
                \parhead{Class} Barbarian.
                \parhead{Archetypes} Primal Warrior first, Battleforged Resilience second, Outland Savage third.
                \parhead{Insight Points} 4 points for additional maneuvers.
                \parhead{Skills} Awareness (M), Balance (M), Climb (M), Endurance (M), Medicine (T), Jump (M), Swim (M), Survival (M).
                \parhead{Weapon Groups} Axes, crossbows.
                \parhead{Languages} Common, Dwarven, Orc.
                \parhead{Equipment} Greataxe, scale mail. As you gain levels, buy a heavy crossbow and use the best medium armor you can afford.
                \parhead{Legacy Item} Weapon.
                    At level 3, choose \mitem{surestrike}.
                    At level 9, choose \mitem{greater surestrike} and \mitem{blessed}.
                    At level 15, choose \mitem{supreme surestrike}, \mitem{greater shocking}, and \mitem{blessed}.
                \parhead{Combat Styles} Dirty Fighting, Herald of War, Unbreakable Defense.
                \parhead{Suggested Maneuvers} You can learn most of the maneuvers available at each rank from your combat styles, so it's not meaningful to list specific maneuvers here.
                Choose whatever is most interesting to you.
                \parhead{Suggested Feats} Greatweapon Warrior, Weapon Focus, Swift.
                \parhead{Combat Tactics} You have a great breadth of options available to you thanks to the number of maneuvers you know.
                You have the survivability to stand in close combat, especially if you use maneuvers from Unreakable Defense, but you can also shout at mobile enemies from range with maneuvers from Herald of War.
                Both Dirty Fighting and Herald of War give you maneuvers that work well against enemies with a high Armor defense, so you can adapt to whatever battle you find yourself in.
                You can make the most of your versatility by learning maneuvers like \maneuver{disarm weapon} that are sometimes useless, but which can be devastatingly effective in the right context.
            ",
            Self::Totemist => r"
                Characters from this archetype can be very different based on their chosen totem.
                A bear totem character might resemble the typical character for the Battleforged Resilience archetype.
                A lion totem or shark totem character might resemble the typical character for the Battlerager archetype.
                A wolf totem character might resemble the typical character for the Outland Savage archetype.

                If you want to quickly create a character based on the eagle totem from this archetype, make the following choices:
                \parhead{Species} Human.
                \parhead{Attributes} 2 Str, 1 Dex, 0 Con, 0 Int, 4 Per, 1 Wil.
                \parhead{Class} Barbarian.
                \parhead{Archetypes} Totemist (eagle totem) first, Primal Warrior second, Battlerager third.
                \parhead{Insight Points} 1 point for proficiency with exotic bows, 1 point for additional maneuvers.
                \parhead{Skills} Awareness (M), Balance (M), Climb (T), Creature Handling (M), Endurance (M), Jump (T), Swim (T), Survival (M).
                \parhead{Weapon Groups} Bows, thrown weapons.
                \parhead{Languages} Common, Elven, Giant.
                \parhead{Equipment} Longbow, leather body armor. As you gain levels, buy a flatbow and use the best light armor you can afford.
                \parhead{Legacy Item} Weapon.
                    At level 3, choose \mitem{surestrike}.
                    At level 9, choose \mitem{greater surestrike} and \mitem{longshot}.
                    At level 15, choose \mitem{supreme surestrike}, \mitem{greater freezing}, and \mitem{longshot}.
                \parhead{Combat Styles} Flurry of Blows, Mobile Assault, Penetrating Precision.
                \parhead{Suggested Maneuvers}
                \begin{itemize}
                    \item Rank 1: \maneuver{deathblow}, \maneuver{penetrating strike}, \maneuver{wanderer's strike}
                    \item Rank 2: \maneuver{arrowguide}, \maneuver{quickshot}
                    \item Rank 3: \maneuver{heartpiercing strike}, \maneuver{penetrating shot}
                    \item Rank 4: \maneuver{barrage}, \maneuver{groundspike}
                    \item Rank 5: \maneuver{greater deathblow}, \maneuver{volley fire}
                    \item Rank 6: \maneuver{greater eye gouge}, \maneuver{greater retreating strike}
                    \item Rank 7: \maneuver{greater desperate flurry}, \maneuver{greater groundspike}
                \end{itemize}
                \parhead{Suggested Feats} Sniper, Weapon Focus, Swift.
                \parhead{Combat Tactics} You have incredible accuracy from very long range.
                Your defenses are low, but as long as you stay far enough away from your foes, they can't take advantage of that weakness.
                You have the ability to prioritize any target on the battlefield, so make the most of your maneuvers that impose conditions or deal additional damage on weakened foes.
            ",
            // Cleric
            Self::ClericDivineMagic => r#"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Gnome.
                \parhead{Attributes} 0 Str, 0 Dex, 3 Con, 1 Int, 2 Per, 3 Wil (after species modifiers).
                \parhead{Class} Cleric.
                \parhead{Archetypes} Divine Magic first, Divine Spell Mastery second, Domain Influence third.
                \parhead{Insight Points} 2 points for an additional mystic sphere, 1 point for an additional spell known.
                \parhead{Skills} Knowledge (religion) (M), Medicine (M), Persuasion (T), Spellsense (M), Social Insight (T)
                \parhead{Weapon Group} Club-like weapons.
                \parhead{Languages} Common, Dwarven, Halfling.
                \parhead{Equipment} Mace, scale mail. As you gain levels, use the best medium armor you can afford.
                \parhead{Legacy Item} 1-handed implement.
                    At level 3, choose \mitem{staff of precision}.
                    At level 9, choose \mitem{greater staff of precision} and \mitem{staff of focus}.
                    At level 15, choose \mitem{supreme staff of precision}, \mitem{fearsome staff}, and \mitem{staff of focus}.
                \parhead{Domains} Good, Magic
                \parhead{Mystic Spheres} Bless, Channel Divinity, and Vivimancy
                \parhead{Suggested Spells}
                \begin{itemize}
                    \item Rank 1: \spell{blessing of endurance}, \spell{boon of precision}, \spell{divine judgment}, \spell{inflict wound}
                    \item Rank 2: \spell{cure wound}, \spell{divine conduit}, \spell{word of faith}
                    \item Rank 3: \spell{boon of cleansing}, \spell{lifesteal}, \spell{mantle of faith}
                    \item Rank 4: \spell{greater divine judgment}, \spell{greater inflict wound}, \spell{greater word of faith}
                    \item Rank 5: \spell{circle of life}, \spell{cure vital wound}, \spell{fear of the divine}
                    \item Rank 6: \spell{boon of invulnerability}, \spell{cleansing benediction}, \spell{greater divine presence}
                    \item Rank 7: \spell{avasculate}, \spell{supreme divine judgment}
                \end{itemize}
                \parhead{Suggested Feats} Leadership, Celestial Heritage, Sphere Focus: Channel Divinity
                \parhead{Combat Tactics} You can protect and heal your allies and invoke divine wrath on your foes.
                You have a mixture of attacks against both Fortitude and Mental defense, so use the best spells for the situation.
                If you are facing a foe that not particularly vulnerable to either, you can focus on keeping your allies healed and using "boon" spells to make their actions more effective.
            "#,
            Self::DivineSpellMastery => "
                Use the typical character for the Divine Magic cleric archetype.
                Even if you focus on spells through this archetype, you should generally still rank up your spells before improving your rank in this archetype.
            ",
            Self::DomainInfluence => r"
                Characters from this archetype can be very different based on their chosen domains.
                A character with spellcasting-focused domains might resemble the typical character for the Divine Magic cleric archetype.
                If you want to quickly create a more martial character based on the Strength and War domains from this archetype, make the following choices:

                \parhead{Species} Dwarf.
                \parhead{Attributes} 3 Str, 0 Dex, 3 Con, 0 Int, 2 Per, 1 Wil (after species modifiers).
                \parhead{Class} Cleric.
                \parhead{Archetypes} Domain Influence first, Divine Magic second, Preacher third.
                \parhead{Insight Points} 3 points for additional spells known.
                \parhead{Skills} Awareness (T), Climb (T), Knowledge (religion) (M), Jump (T), Medicine (M), Persuasion (M), Spellsense (T), Swim (T)
                \parhead{Weapon Group} Club-like weapons.
                \parhead{Languages} Common, Draconic, Dwarven.
                \parhead{Equipment} Morning star, standard shield, scale mail. As you gain levels, use the best heavy armor you can afford.
                \parhead{Legacy Item} Shield.
                    At level 3, choose \mitem{protective shield}.
                    At level 9, choose \mitem{greater protective shield} and \mitem{shield of arrow catching}.
                    At level 15, choose \mitem{supreme protective shield}, \mitem{greater shield of arrow deflection}, and \mitem{shield of arrow catching}.
                \parhead{Domains} Strength, War
                \parhead{Mystic Spheres} Channel Divinity
                \parhead{Suggested Spells}
                \begin{itemize}
                    \item Rank 1: \spell{divine power}, \spell{divine favor}, \spell{divine authority}, \spell{stunning judgment}
                    \item Rank 2: \spell{astral refuge}
                    \item Rank 3: \spell{banish anathema}, \spell{divine might}, \spell{divine presence}, \spell{mantle of faith}
                    \item Rank 4: \spell{greater word of faith}
                    \item Rank 5: \spell{agent of the divine}, \spell{fear of the divine}
                    \item Rank 6: \spell{divine offering}, \spell{greater divine presence}
                    % \item Rank 7: TODO
                \end{itemize}
                \parhead{Suggested Feats} Weapon Focus, Sphere Focus: Channel Divinity, Shieldbearer
                \parhead{Combat Tactics} You are a frontline fighter first and foremost.
                Your high defenses and magically enhanced resistances make you durable in combat, though you lack mobility. 
                When you need to distract foes or face down hordes, you can use your abilities from the Preacher archetype, which do not have the \abilitytag{Focus} tag.
                If you can't take the Weapon Focus feat, consider taking the Destruction domain instead of the Strength domain, since that gives you a standard action ability to help you deal damage with your weapon.
            ",
            Self::Healer => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Gnome.
                \parhead{Attributes} -1 Str, 2 Dex, 3 Con, 0 Int, 0 Per, 4 Wil (after species modifiers).
                \parhead{Class} Cleric.
                \parhead{Archetypes} Healer first, Divine Magic second, Domain Influence third.
                \parhead{Insight Points} 3 points for additional spells known.
                \parhead{Skills} Awareness (T), Climb (T), Knowledge (religion) (M), Jump (T), Medicine (M), Persuasion (M), Spellsense (T), Swim (T)
                \parhead{Weapon Group} Club-like weapons.
                \parhead{Languages} Common, Draconic, Halfling.
                \parhead{Equipment} Morning star, standard shield, scale mail. As you gain levels, use the best medium armor you can afford.
                \parhead{Legacy Item} 1-handed implement.
                    At level 3, choose \mitem{staff of potency}.
                    At level 9, choose \mitem{reaching staff} and \mitem{staff of potency}.
                    At level 15, choose \mitem{greater staff of the archmagi}, \mitem{reaching staff}, and \mitem{staff of focus}.
                \parhead{Domains} Life, Protection
                \parhead{Mystic Spheres} Vivimancy
                \parhead{Suggested Spells}
                \begin{itemize}
                    \item Rank 1: \spell{drain life}, \spell{draining grasp}, \spell{lifegift}, \spell{retributive lifebond}
                    \item Rank 2: \spell{cure wound}, \spell{sickening miasma}, \spell{wellspring of life}
                    \item Rank 3: \spell{circle of death}, \spell{lifesteal}, \spell{vital persistance}
                    \item Rank 4: \spell{greater inflict wound}, \spell{greater retributive lifebond}
                    \item Rank 5: \spell{circle of death}, \spell{nauseating miasma}, \spell{steal vitality}
                    % \item Rank 6: TODO
                    \item Rank 7: \spell{avasculate}, \spell{supreme retributive lifebond}
                \end{itemize}
                \parhead{Suggested Feats} Sphere Focus: Vivimancy, Boongiver, Iron Will
                \parhead{Combat Tactics} You have an unmatched mastery of healing and protection.
                You have high defenses, so you can take to the front lines as necessary to make the most of \ability{restoration} and \ability{divine protection}, but it's generally better to let your allies take hits instead of you.
                Since \ability{restoration} is much less effective at healing yourself, you can use spells like \spell{cure wounds} or \spell{lifesteal} to heal yourself if you lose hit points.
                Although your \ability{healer's grace} ability is powerful, you shouldn't feel bad about attacking enemies.
                That's especially important early in a fight when your allies don't need healing yet and your enemies haven't realized that it's pointless to attack your allies while you are still standing.
            ",
            Self::Preacher => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Half-elf.
                \parhead{Attributes} 1 Str, 0 Dex, 2 Con, 3 Int, 2 Per, 1 Wil.
                \parhead{Class} Cleric.
                \parhead{Archetypes} Preacher first, Divine Magic second, Domain Mastery third.
                \parhead{Insight Points} 1 point for heavy armor, 2 points for additional skill points, 3 points for additional spells known.
                \parhead{Skills} Awareness (M), Deduction (T), Intimidate (M), Knowledge (arcana, local, religion, planes) (M), Linguistics (M), Medicine (M), Persuasion (M), Social Insight (M), Spellsense (M)
                \parhead{Weapon Group} Headed weapons
                \parhead{Languages} Common, Draconic, Elven, Gnome.
                \parhead{Equipment} Warhammer, standard shield, scale mail. As you gain levels, use the best heavy armor you can afford.
                \parhead{Legacy Item} Apparel.
                    At level 3, choose \mitem{amulet of honeyed words}.
                    At level 9, choose \mitem{greater amulet of honeyed words} and \mitem{ring of blessed protection}.
                    At level 15, choose \mitem{supreme amulet of honeyed words}, \mitem{phasestep boots}, and \mitem{ring of blessed protection}.
                \parhead{Domains} Good, Travel
                \parhead{Mystic Sphere} Revelation
                \parhead{Suggested Spells}
                \begin{itemize}
                    \item Rank 1: \spell{precognitive defense}, \spell{precognitive offense}, \spell{reveal weakness}, \spell{true strike}
                    \item Rank 2: \spell{blindsight}, \spell{myriad visions}
                    \item Rank 3: \spell{discern lies}, \spell{true cast}
                    \item Rank 4: \spell{boon of knowledge}, \spell{greater reveal weakness}
                    \item Rank 5: \spell{clairvoyance}
                    \item Rank 6: \spell{mass true strike}, \spell{stunning truth}
                    \item Rank 7: \spell{blinding visions}
                \end{itemize}
                \parhead{Suggested Feats} Persuasion Specialization, Sphere Focus: Revelation, Social Insight Specialization
                \parhead{Combat Tactics} You can distract and demoralize your enemies with unmatched accuracy.
                Your social skills should be incredibly high, which you can use to your advantage both in and out of combat.
                For a more cynical take on this character, consider mastering the Deception skill instead of Knowledge (religion).
                Your domains and spells help you stay mobile in combat and protect your allies.
                Your Preacher abilities work best if you are near the middle of the fight, but your spells are dangerous to use if you are being attacked because of your high \glossterm{Focus penalty}, so your positioning can be tricky.
            ",
            // Druid
            Self::Elementalist => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Human.
                \parhead{Attributes} 0 Str, 0 Dex, 0 Con, 2 Int, 4 Per, 2 Wil.
                \parhead{Class} Druid.
                \parhead{Archetypes} Nature Magic first, Elementalist second, Nature Spell Mastery third.
                \parhead{Insight Points} 2 points for mystic spheres, 4 points for spells
                % 18 total skill points, counting the 3 from auto-training
                \parhead{Skills} Awareness (M), Creature Handling (M), Endurance (T), Jump (M), Knowledge (geography, nature) (M), Spellsense (M), Survival (M), Swim (M)
                \parhead{Weapon Group} Headed weapons
                \parhead{Languages} Common, Sylvan
                \parhead{Equipment} Sickle, standard shield, scale mail. As you gain levels, use the best medium armor you can afford.
                You may want to keep leather armor around in case you need to do a lot of jumping or swimming.
                \parhead{Legacy Item} 1-handed implement.
                    At level 3, choose \mitem{staff of potency}.
                    At level 9, choose \mitem{greater staff of potency} and \mitem{staff of focus}.
                    At level 15, choose \mitem{supreme staff of potency}, \mitem{reaching staff}, and \mitem{staff of focus}.
                \parhead{Mystic Spheres} Any three of the four elemental mystic spheres.
                Your \textit{elemental versatility} ability gives you access to spells from the fourth mystic sphere.
                That means that the specific three mystic spheres you choose mostly just affect which wands you can use and which feats you can take.
                \parhead{Suggested Spells}
                You have access to spells from all four elemental mystic spheres, so you have a massive pool of spells available to you.
                The list below is just one of the possible paths you could take.
                \begin{itemize}
                    \RaggedRight
                    % at every level: one single-target damage, one AOE damage, one debuff, one self-buff, each from a different sphere
                    \item Rank 1: \spell{desiccation}, \spell{firebolt}, \spell{shrapnel blast}, \spell{wind screen}
                    \item Rank 2: \spell{combustion}, \spell{downdraft}, \spell{rocky shell}, \spell{wave of dehydration}
                    \item Rank 3: \spell{earthbind}, \spell{fireball}, \spell{geyser}, \spell{retributive winds}
                    \item Rank 4: \spell{constraining bubble}, \spell{flight}, \spell{fissure}, \spell{immolate}
                    \item Rank 5: \spell{earthglide}, \spell{greater firebolt}, \spell{greater gust of wind}, \spell{greater wave of dehydration}
                    \item Rank 6: \spell{agile flight}, \spell{earthcage}, \spell{greater flame dash}, \spell{supreme fountain}
                    \item Rank 7: \spell{blinding dust cloud}, \spell{earthquake}, \spell{soul of the phoenix}, \spell{supreme forceful aquajet}
                \end{itemize}
                \parhead{Suggested Feats} Sphere Focus: Aeromancy, Aquamancy, Pyromancy, or Terramancy
                \parhead{Combat Tactics} You are a master of all four elements, so you have an immense variety of options available to you - if you choose the right spells.
                You have a very high accuracy thanks to your Perception and a reasonably high magical power, so your primary role in combat will usually be to deploy the perfect damaging spell or debuff for the situation.
                Your skills and Elementalist abilities give you a lot of narrative power, so stay alert for opportunities to overcome challenges without needing to fight at all.
            ",
            Self::NatureMagic => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Elf.
                \parhead{Attributes} 1 Str, 3 Dex, 0 Con, 0 Int, 2 Per, 3 Wil.
                \parhead{Class} Druid.
                \parhead{Archetypes} Nature Magic first, Nature Spell Mastery second, Elementalist third.
                \parhead{Insight Points} 2 points for a mystic sphere, 1 point for a spell
                % 12 total skill points, counting the 3 from auto-training
                \parhead{Skills} Awareness (M), Balance (T), Creature Handling (M), Knowledge (nature) (M), Ride (T), Stealth (M), Survival (M)
                \parhead{Weapon Group} Headed weapons
                \parhead{Languages} Common, Sylvan
                \parhead{Equipment} Sickle, standard shield, leather armor. As you gain levels, use the best light armor you can afford.
                \parhead{Legacy Item} 1-handed implement.
                    At level 3, choose \mitem{staff of precision}.
                    At level 9, choose \mitem{greater staff of precision} and \mitem{staff of focus}.
                    At level 15, choose \mitem{supreme staff of precision}, \mitem{extending staff}, and \mitem{staff of focus}.
                \parhead{Mystic Spheres} Aquamancy, Verdamancy
                \parhead{Suggested Spells} 
                \begin{itemize}
                    \item Rank 1: \spell{aquajet blast}, \spell{barkskin}, \spell{crushing wave}, \spell{poison -- sassone leaf}
                    \item Rank 2: \spell{entangle}, \spell{forceful aquajet}, \spell{obscuring mist}, \spell{poison -- nitharit}, \spell{wave of dehydration}
                    \item Rank 3: \spell{desiccating curse}, \spell{fire seeds}, \spell{greater aquajet blast}, \spell{poison -- arsenic}, \spell{wall of thorns}
                    \item Rank 4: \spell{aqueous form}, \spell{constraining bubble}, \spell{greater vine whip}, \spell{raging river}
                    \item Rank 5: \spell{fluid motion}, \spell{greater entangle}, \spell{greater wave of dehydration}, \spell{poison -- black lotus}
                    \item Rank 6: \spell{greater fire seeds}, \spell{greater geyser}, \spell{ring of mist}
                    \item Rank 7: \spell{strangling vines}, \spell{supreme desiccation}, \spell{supreme vine whip}
                \end{itemize}
                \parhead{Suggested Feats} Sphere Focus: Aquamancy, Sphere Focus: Verdamancy, Herbalist
                \parhead{Combat Tactics} You are a master of plants and nature.
                Your spells excel at moving foes around the battlefield and constraining their movement while dealing reasonable damage.
                You also have access to dangerous poisons to weaken your foes while they remain safely kept at bay.
            ",
            Self::NatureSpellMastery => r"
                Use the typical character for the Nature Magic druid archetype.
                Even if you focus on spells through this archetype, you should generally still rank up your spells before improving your rank in this archetype.
            ",
            Self::Shifter => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Half-orc.
                \parhead{Attributes} 3 Str, 3 Dex, 2 Con, 0 Int, 0 Per, 1 Wil.
                \parhead{Class} Druid.
                \parhead{Archetypes} Shifter first, Nature Magic second, Nature Spell Mastery third.
                \parhead{Insight Points} 2 points for wild aspects, 2 points for spells
                % 15 total skill points, counting the 6 from auto-training
                \parhead{Skills} Awareness (M), Balance (M), Climb (M), Jump (M), Ride (T), Stealth (M), Survival (M), Swim (M)
                \parhead{Weapon Group} Bows
                \parhead{Languages} Common, Sylvan
                \parhead{Equipment} Natural weapon, standard shield, chain shirt. As you gain levels, use the best light armor you can afford.
                Use your natural weapons instead of manufactured weapons unless you need to fight at long range.
                \parhead{Legacy Item} Apparel.
                    At level 3, choose \mitem{amulet of mighty fists}.
                    At level 9, choose \mitem{greater amulet of mighty fists} and \mitem{ring of blessed protection}.
                    At level 15, choose \mitem{supreme amulet of mighty fists}, \mitem{enlarging belt}, and \mitem{ring of blessed protection}.
                \parhead{Mystic Sphere} Polymorph
                \parhead{Suggested Wild Aspects} Your choice of wild aspect has a significant effect on your capabilities, and they are less complicated to evaluate than spell, so choose wild aspects that match your goals.
                The Bear, Viper, and Wolf forms excel at dealing damage in combat.
                The Bull and Constrictor forms improve your ability to take unusual combat actions.
                Other forms can be useful in specific circumstances and out of combat.
                \parhead{Suggested Spells} 
                \begin{itemize}
                    \item Rank 1: \spell{camouflage}, \spell{mighty claw}, \spell{organ failure}, \spell{stoneskin}, \spell{twisting claw}
                    \item Rank 2: \spell{brief regeneration}, \spell{bleed}, \spell{distant claw}, \spell{shrink}
                    \item Rank 3: \spell{enlarge}, \spell{scent}, \spell{spikeform}
                    \item Rank 4: \spell{draconic senses}, \spell{eyebite}, \spell{malleable body}
                    \item Rank 5: \spell{baleful polymorph}, \spell{greater bleed}, \spell{vital regeneration}
                    \item Rank 6: \spell{extruding spikes}
                    \item Rank 7: \spell{cripple}, \spell{sludgeform}
                \end{itemize}
                \parhead{Suggested Feats} Sphere Focus: Polymorph, Regenerator, Brawler, Savage
                \parhead{Combat Tactics} You are a lethal blend of claws and teeth.
                You can shift your form to gain the perfect abilities for your current circumstances, and your high physical attributes make you hard to kill and hard to ignore.
                Your flexibility between natural weapons, spells, and high physical skills give you a lot of options in and out of combat.
            ",
            Self::Wildspeaker => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Gnome.
                \parhead{Attributes} -1 Str, 0 Dex, 3 Con, 0 Int, 4 Per, 2 Wil.
                \parhead{Class} Druid.
                \parhead{Archetypes} Wildspeaker first, Nature Magic second, Nature Spell Mastery third.
                \parhead{Insight Points} 3 points for spells.
                % 12 total skill points, counting the 3 from auto-training
                \parhead{Skills} Awareness (M), Creature Handling (M), Knowledge (nature) (M), Ride (M), Stealth (M), Survival (M)
                \parhead{Weapon Group} Headed weapons
                \parhead{Languages} Common, Gnome, Sylvan
                \parhead{Equipment} Sickle, standard shield, scale mail. As you gain levels, use the best medium armor you can afford.
                \parhead{Legacy Item} Apparel.
                    At level 3, choose \mitem{belt of healing}.
                    At level 9, choose \mitem{shrinking belt} and \mitem{ring of blessed protection}.
                    At level 15, choose \mitem{supreme belt of healing}, \mitem{shrinking belt}, and \mitem{ring of blessed protection}.
                \parhead{Mystic Sphere} Electromancy
                \parhead{Suggested Spells} 
                \begin{itemize}
                    \item Rank 1: \spell{electric jolt}, \spell{electroshock}, \spell{energize}, \spell{shocking grasp}
                    \item Rank 2: \spell{lightning storm}, \spell{stunning discharge}
                    \item Rank 3: \spell{call lightning}, \spell{lightning bolt}, \spell{thunderdash}
                    \item Rank 4: \spell{greater electric jolt}, \spell{greater electroshock}, \spell{shock and awe}
                    \item Rank 5: \spell{chain lightning}, \spell{electrocute}, \spell{electromagnetic bolt}
                    \item Rank 6: \spell{greater call lightning}, \spell{greater thunderdash}, \spell{supreme lightning storm}
                    \item Rank 7: \spell{greater lightning breath}, \spell{greater shock and awe}, \spell{supreme electric jolt}
                \end{itemize}
                \parhead{Suggested Feats} Leadership, Sphere Focus: Electromancy, Skill Specialization: Creature Handling, Toughness
                \parhead{Combat Tactics} You lead your faithful natural servant in battle.
                It distracts your enemies while you blast them with lightning from afar.
                You can also use your leadership skills to inspire and command your allies in battle.
                Once you get a \textit{shrinking belt} or some other way to shrink yourself, you can ride your \textit{natural servant} into battle, which compensates for your short gnomish legs.
                If you are both lucky and persuasive, you be able to use your \textit{speak with animals} ability to convince an animal to aid you on your journey, at least for a short time, in addition to your \textit{natural servant}.
            ",
            // Fighter
            Self::CombatDiscipline => r"
                If you want to quickly create a character based on this archetype, make the following choices:
                \parhead{Species} Dwarf.
                \parhead{Attributes} 3 Str, 0 Dex, 4 Con, 0 Int, 0 Per, 1 Wil.
                \parhead{Class} Fighter.
                \parhead{Archetypes} Combat Discipline first, Martial Mastery second, Equipment Training third.
                \parhead{Insight Points} 2 points for maneuvers.
                % 7 total skill points, counting the 1 from auto-training
                \parhead{Skills} Climb (T), Endurance (M), Jump (T), Perception (M), Swim (T)
                \parhead{Weapon Group} Axes, blades
                \parhead{Languages} Common, Dwarven, Orc
                \parhead{Equipment} Battleaxe, standard shield, scale mail. As you gain levels, use the best heavy armor you can afford.
                You can switch between a shepherd's axe for hard to hit enemies, a battleaxe for multi-enemy fights or fights where you need the extra damage from holding it in two hands, and throwing axes when you need a ranged weapon.
                \parhead{Legacy Item} Shield.
                    At level 3, choose \mitem{protective shield}.
                    At level 9, choose \mitem{greater protective shield} and \mitem{shield of arrow catching}.
                    At level 15, choose \mitem{supreme protective shield}, \mitem{hardblock shield}, and \mitem{shield of arrow catching}.
                \parhead{Combat Styles} Flurry of Blows, Mobile Assaut, Rip and Tear
                \parhead{Suggested Maneuvers} 
                \begin{itemize}
                    % each level: damage, HP debuff, maybe non-HP debuff, maybe AOE
                    \item Rank 1: \maneuver{hamstring}, \maneuver{rend the hide}, \maneuver{quickdraw}, \maneuver{wanderer's strike}
                    \item Rank 2: \maneuver{followup strike}, \maneuver{reckless charge}, \maneuver{strip the armor}, \maneuver{sweeping strike}
                    \item Rank 3: \maneuver{desperate flurry}, \maneuver{spring attack}, \maneuver{strip the flesh}
                    \item Rank 4: \maneuver{brow gash}, \maneuver{greater wanderer's strike}, \maneuver{spinning slash}
                    \item Rank 5: \maneuver{bloodletting strike}, \maneuver{greater retreating strike}
                    \item Rank 6: \maneuver{greater strip the flesh}, \maneuver{greater reaping harvest}
                    \item Rank 7: \maneuver{greater brow gash}, \maneuver{greater desperate flurry}
                \end{itemize}
                \parhead{Suggested Feats} Shieldbearer, Toughness, Iron Will, Regenerator
                \parhead{Combat Tactics} You are extremely difficult to kill, and your ability to ignore and remove conditions makes it hard for your foes to whittle you down over time.
                You can charge confidently into the middle of battle, cutting down enemy ranged attackers regardless of their surrounding allies.
                Alternately, you can hold the line to protect your own allies.
            ",
            Self::EquipmentTraining => r"
            ",
            Self::MartialMastery => r"
            ",
            Self::Sentinel => r"
            ",
            Self::Tactician => r"
            ",
            // Monk
            Self::Airdancer => r"
            ",
            Self::EsotericWarrior => r"
            ",
            Self::Ki => r"
            ",
            Self::PerfectedForm => r"
            ",
            Self::TranscendentSage => r"
            ",
            // Paladin
            Self::DevotedParagon => r"
            ",
            Self::PaladinDivineMagic => r"
            ",
            Self::DivineSpellExpertise => r"
            ",
            Self::StalwartGuardian => r"
            ",
            Self::ZealousWarrior => r"
            ",
            // Ranger
            Self::Beastmaster => r"
            ",
            Self::BoundaryWarden => r"
            ",
            Self::Huntmaster => r"
            ",
            Self::Scout => r"
            ",
            Self::WildernessWarrior => r"
            ",
            // Rogue
            Self::Assassin => r"
            ",
            Self::BardicMusic => r"
            ",
            Self::CombatTrickster => r"
            ",
            Self::JackOfAllTrades => r"
            ",
            Self::SuaveScoundrel => r"
            ",
            // Sorcerer
            Self::SorcererArcaneMagic => r"
            ",
            Self::SorcererArcaneSpellMastery => r"
            ",
            Self::DraconicMagic => r"
            ",
            Self::InnateArcanist => r"
            ",
            Self::WildMagic => r"
            ",
            // Warlock
            Self::BlessingsOfTheAbyss => r"
            ",
            Self::KeeperOfForbiddenKnowledge => r"
            ",
            Self::PactMagic => r"
            ",
            Self::PactSpellMastery => r"
            ",
            Self::SoulkeepersChosen => r"
            ",
            // Wizard
            Self::Alchemist => r"
            ",
            Self::WizardArcaneMagic => r"
            ",
            Self::ArcaneScholar => r"
            ",
            Self::WizardArcaneSpellMastery => r"
            ",
            Self::SchoolSpecialist => r"
            ",
        };
        if typical.trim() == "" {
            return None;
        } else {
            return Some(format!(
                "
                    \\subsubsection<Typical Character>
                    {}
                ",
                typical,
            ));
        }
    }
}

// LaTeX generation
impl ClassArchetype {
    pub fn latex_description(&self, class_shorthand: &str) -> String {
        let all_magical = self.is_magical();
        return format!(
            "
                \\newpage
                \\subsection<{archetype_name}>
                {short_description}

                {rank_abilities}
                {typical}
            ",
            archetype_name = titlecase(self.name()),
            rank_abilities = self
                .rank_abilities()
                .iter()
                .map(|a| a
                    .latex_class_feature(class_shorthand, !all_magical)
                    .trim()
                    .to_string())
                .collect::<Vec<String>>()
                .join("\n\n"),
            short_description = self.short_description(),
            typical = if let Some(t) = self.typical_character() { t } else { "".to_string() },
        );
    }
}

pub fn all_archetypes() -> Vec<ClassArchetype> {
    return vec![
        // Barbarian
        ClassArchetype::BattleforgedResilience,
        ClassArchetype::Battlerager,
        ClassArchetype::OutlandSavage,
        ClassArchetype::PrimalWarrior,
        ClassArchetype::Totemist,
        // Cleric
        ClassArchetype::ClericDivineMagic,
        ClassArchetype::DivineSpellMastery,
        ClassArchetype::DomainInfluence,
        ClassArchetype::Healer,
        ClassArchetype::Preacher,
        // Druid
        ClassArchetype::Elementalist,
        ClassArchetype::NatureMagic,
        ClassArchetype::NatureSpellMastery,
        ClassArchetype::Shifter,
        ClassArchetype::Wildspeaker,
        // Fighter
        ClassArchetype::CombatDiscipline,
        ClassArchetype::EquipmentTraining,
        ClassArchetype::MartialMastery,
        ClassArchetype::Sentinel,
        ClassArchetype::Tactician,
        // Monk
        ClassArchetype::Airdancer,
        ClassArchetype::EsotericWarrior,
        ClassArchetype::Ki,
        ClassArchetype::PerfectedForm,
        ClassArchetype::TranscendentSage,
        // Paladin
        ClassArchetype::DevotedParagon,
        ClassArchetype::PaladinDivineMagic,
        ClassArchetype::DivineSpellExpertise,
        ClassArchetype::StalwartGuardian,
        ClassArchetype::ZealousWarrior,
        // Ranger
        ClassArchetype::Beastmaster,
        ClassArchetype::BoundaryWarden,
        ClassArchetype::Huntmaster,
        ClassArchetype::Scout,
        ClassArchetype::WildernessWarrior,
        // Rogue
        ClassArchetype::Assassin,
        ClassArchetype::BardicMusic,
        ClassArchetype::CombatTrickster,
        ClassArchetype::JackOfAllTrades,
        ClassArchetype::SuaveScoundrel,
        // Sorcerer
        ClassArchetype::SorcererArcaneMagic,
        ClassArchetype::SorcererArcaneSpellMastery,
        ClassArchetype::DraconicMagic,
        ClassArchetype::InnateArcanist,
        ClassArchetype::WildMagic,
        // Warlock
        ClassArchetype::BlessingsOfTheAbyss,
        ClassArchetype::KeeperOfForbiddenKnowledge,
        ClassArchetype::PactMagic,
        ClassArchetype::PactSpellMastery,
        ClassArchetype::SoulkeepersChosen,
        // Wizard
        ClassArchetype::WizardArcaneMagic,
        ClassArchetype::WizardArcaneSpellMastery,
        ClassArchetype::Alchemist,
        ClassArchetype::ArcaneScholar,
        ClassArchetype::SchoolSpecialist,
    ];
}
