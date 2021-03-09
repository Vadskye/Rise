import { MysticSphere } from ".";

export const polymorph: MysticSphere = {
  name: "Polymorph",
  shortDescription: "Change the physical shape or outward form of objects and creatures.",
  sources: ["arcane", "nature", "pact"],

  cantrips: [
    {
      name: "Alter Object",

      effect: `
        Choose one \\glossterm{unattended}, nonmagical object you touch.
        You make a Craft check to alter it (see \\pcref{Craft}), except that you do not need any special tools to make the check (such as an anvil and furnace).
        The maximum \\glossterm{resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

        % too short?
        Each time you cast this spell, you can accomplish work that would take up to two rounds with a normal Craft check.
      `,
      focus: false,
      scaling: {
        2: `The amount of work you accomplish with the spell increases to five rounds.`,
        4: `The amount of work you accomplish with the spell increases to one minute.`,
        6: `The amount of work you accomplish with the spell increases to two minutes.`,
      },
      type: "Instant",
    },

    {
      name: "Alter Appearance",

      functionsLike: {
        exceptThat: `
        You alter your appearance in minor ways.
        This functions like the \\textit{disguise creature}  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Disguise Creature}).
        This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

        This ability lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
        `,
        name: "disguise creature",
      },
      focus: false,
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
      },
      type: "Duration",
    },
  ],
  spells: [
    {
      name: "Reforge Armor",

      effect: `
        Choose one suit of body armor you touch.
        In addition, choose one of the following special materials: dragonhide, dragonscale, ironwood, mithral, or starmetal.
        The armor changes to be composed of that material, and gains all properties and benefits of that material instead of its original properties.
        For details about armor special materials, see \\tref{Armor Special Materials}.

        You can only change the subject into a special material appropriate for its base composition of either leather or metal.
        For example, you cannot create mithral hide armor with this spell.
      `,
      rank: 3,
      scaling: {
        5: `You can also choose one of the following special materials: adamantine, deepforged, diamondsteel, or elvenweave.`,
        7: `You can also choose one of the following special materials: ancient dragonhide, ancient dragonscale, pure mithral, or pure starmetal.`,
      },
      // TODO: weird that this is one of the few ways you can attune on behalf of an ally
      type: "Attune (self)",
    },

    {
      name: "Natural Weapon",

      effect: `
        You gain your choice of one of the following \\glossterm{natural weapons}: bite, claw, constrict, gore, ram, slam, or talon.
        For details, see \\tref{Natural Weapons}.
      `,
      rank: 1,
      scaling: {
        3: `You also gain a +2 \\glossterm{magic bonus} to \\glossterm{power} with natural weapons.`,
        5: `The power bonus increases to +4.`,
        7: `The power bonus increases to +8.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Natural Weapon",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Natural Weapon",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        3: `Each subject also gains a +2 \\glossterm{magic bonus} to \\glossterm{power} with natural weapons.`,
        5: `The power bonus increases to +4.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Piercing Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} piercing damage.`,
        targeting: `
          This spell does not have the \\glossterm{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      narrative: `
        You twist your hand into a spike that bends past armor to injure your foe.
      `,
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Piercing Grasp",

      attack: {
        glance: "Half damage.",
        hit: `
          The subject takes 2d10 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{slowed} as a \\glossterm{condition}.
        `,
        targeting: `
          This spell does not have the \\glossterm{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      narrative: `
        You twist your hand into a spike that bends past armor to impale your foe.
      `,
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Baleful Polymorph",

      attack: {
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject takes 2d8 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is balefully polymorphed as a \\glossterm{condition}.
        It shrinks by two \\glossterm{size categories} and is \\glossterm{confused}.`,
        targeting: `
        Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Twist Flesh",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} physical damage.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Shrink",

      castingTime: "minor action",
      effect: `
        The subject's size decreases by one \\glossterm{size category}, to a minimum of Tiny.
        This decreases its \\glossterm{base speed} and improves its \\glossterm{Stealth} skill.
        It may also decrease the subject's \\glossterm{reach} (see \\pcref{Size in Combat}).
        However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.
      `,
      rank: 2,
      scaling: {
        4: `You also gain a +2 bonus to Dexterity-based checks.`,
        6: `You can decrease your size category by up to two size categories.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Shrink",

      functionsLike: {
        exceptThat:
          "it affects up to five creatures of your choice from among yourself and your Small or larger \\glossterm{allies} within \\medrange.",
        name: "Shrink",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "Each subject also gains a +2 bonus to Dexterity-based checks.",
      },
      type: "Attune (target)",
    },

    {
      name: "Stoneskin",

      castingTime: "minor action",
      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{resistance} against \\glossterm{physical} damage.
      `,

      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Stoneskin",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Stoneskin",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Enlarge",

      castingTime: "minor action",
      effect: `
        Your size increases by one \\glossterm{size category}.
        This increases your \\glossterm{base speed} and reduces your \\glossterm{Stealth} skill.
        It may also increase your \\glossterm{reach} (see \\pcref{Size in Combat}).
        However, your physical form is not altered fully to match your new size, and your Strength and Dexterity are unchanged.
      `,
      rank: 3,
      scaling: {
        5: `You also gain a +2 bonus to Strength-based checks, and you gain a +2 bonus to strength for the purpose of determining your carrying capacity.`,
        7: "You can increase your size category by up to two size categories",
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Enlarge",

      functionsLike: {
        exceptThat:
          "it affects up to five creatures of your choice from among yourself and your Large or smaller \\glossterm{allies} within \\medrange.",
        name: "Enlarge",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: `Each subject also gains a +2 bonus to Strength-based checks, and it gains a +2 bonus to Strength for the purpose of determining its carrying capacity.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Reshape Appearance",

      effect: `
        You make a Disguise check to alter your appearance (see \\pcref{Disguise Creature}).
        You gain a +4 bonus on the check, and you ignore penalties for changing your gender, species, subtype, or age.
        However, this effect is unable to alter your equipment in any way.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +6.`,
        6: `The bonus increases to +8.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Reshape Appearance",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Reshape Appearance",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        4: `The bonus increases to +6.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Disintegrate",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 4d10 + \\glossterm{power} physical damage.
        In addition, if the subject has no hit points remaining at the end of the current \\glossterm{phase}, it dies.
        Its body is completely disintegrated, leaving behind only a pinch of fine dust.
        Its equipment is unaffected.`,
        targeting: `
        Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Malleable Body",

      effect: `
        Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:
        \\begin{itemize}
          \\item You gain a \\glossterm{climb speed} equal to your \\glossterm{base speed}.
          \\item You gain a +8 \\glossterm{magic bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You are immune to \\glossterm{critical hits} from \\glossterm{strikes}.
          \\item Your \\glossterm{resistance} to \\glossterm{physical damage} is reduced to 0.
        \\end{itemize}
      `,
      rank: 4,
      scaling: { 6: `The bonus to Flexibility increases to +12.` },
      type: "Attune (self)",
    },

    {
      name: "Spikeform",

      // original targets: ['Yourself', 'See text']
      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        // AOE dice, no power
        hit: `Each subject takes 2d6 piercing damage.`,
        targeting: `
          At the end of each round, make an attack vs. Armor against each creature adjacent to you that either is \\glossterm{grappling} with you or that attacked you with a melee weapon that round.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 3,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Extruding Spikeform",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        // TODO: is this damage correct?
        hit: `Each subject takes 4d6 piercing damage.`,
        targeting: `
          As a \\glossterm{minor action}, you can extend the spikes to make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      narrative: `
        Your body grows small spikes that you can consciously extrude to impale nearby foes.
      `,
      rank: 6,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Absorb Object",

      effect: `
        You absorb one Small or smaller \\glossterm{unattended} object into your body.
        Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
        A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
        You cannot absorb only part of a larger object.

        This effect lasts until you use it again, \\glossterm{dismiss} it as a \\glossterm{free action}, or fall unconscious.
        When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
      `,
      rank: 3,
      scaling: {
        5: `The maximum size of the object increases to Medium.`,
        7: `The maximum size of the object increases to Large.`,
      },
      type: "Duration",
    },

    {
      name: "Camouflage",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to the Stealth skill.
        In addition, you are treated as being \\glossterm{trained} in that skill if you would otherwise be untrained.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +4.`,
        5: `The bonus increases to +5.`,
        7: `The bonus increases to +6.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Sludgeform",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        glance: `Half damage.`,
        hit: `The subject takes 4d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm{condition}.
        It has no \\glossterm{free hands}, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
        Its speed with all of its \\glossterm{mundane} movement modes are reduced to one quarter normal.
        It is also unable to speak normally or use verbal or somatic \\glossterm{components}.`,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Brief Regeneration",

      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The subject regains \\glossterm{hit points} equal to 1d6 plus half your \\glossterm{power}.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      type: "Instant",
    },

    {
      name: "Vital Regeneration",

      castingTime: "minor action",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        A the end of each round, the subject can remove one of its \\glossterm{vital wounds}.
        If it does, it gains two \\glossterm{fatigue points}.
      `,
      rank: 5,
      scaling: {
        7: `The subject can remove two \\glossterm{vital wounds} instead of one.
            It gains two \\glossterm{fatigue points} per vital wound removed this way.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Regeneration",

      castingTime: "minor action",
      effect: `
        At the end of each round, if you did not lose any \\glossterm{hit points} that round, you regain 1d10 \\glossterm{hit points}.
      `,
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      type: "Attune (self)",
    },

    {
      name: "Physical Enhancement",

      castingTime: "minor action",
      effect: `
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        You gain a +2 \\glossterm{magic bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, you gain a +2 \\glossterm{magic bonus} to Strength for the purpose of determining your \\glossterm{carrying capacity}.
      `,

      rank: 2,
      scaling: { 4: `The bonus increases to +3.`, 6: `The bonus increases to +4.` },
      type: "Attune (self)",
    },

    {
      name: "Mass Physical Enhancement",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Physical Enhancement",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "The bonus increases to +4.",
      },
      type: "Attune (target)",
    },

    {
      name: "Scent",

      castingTime: "minor action",
      effect: `
        You gain the \\glossterm{scent} ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref{Senses}).
      `,
      rank: 3,
      scaling: { 5: `The bonus increases to +15.`, 7: `The bonus increases to +20.` },
      type: "Attune (self)",
    },

    {
      name: "Mass Scent",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Scent",
      },
      // narrative: '',
      rank: 5,
      scaling: {
        7: "The bonus increases to +15.",
      },
      type: "Attune (target)",
    },

    {
      name: "Eyebite",

      attack: {
        glance: `Half damage.`,
        hit: `The subject takes 2d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is \\glossterm{blinded} as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Organ Failure",

      attack: {
        hit: `The subject takes 1d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is \\glossterm{nauseated} as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Cripple",

      attack: {
        crit: `The subject is \\glossterm{paralyzed} instead of immobilized.`,
        glance: "The effect lasts until the end of the next round.",
        hit: `The subject is \\glossterm{immobilized} as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\shortrange.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Bleed",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `The subject begins bleeding as a \\glossterm{condition}.
        At the end of each round, it takes 1d8 physical damage.
        If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.

        This condition can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
        The \\glossterm{difficulty rating} of the check is equal to 10.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Greater Bleed",

      attack: {
        crit: `The damage from the condition is doubled.`,
        glance:
          "The effect lasts until the end of the next round. The subject still takes damage during that round.",
        hit: `The subject begins bleeding as a \\glossterm{condition}.
        At the end of each round, it takes 2d8 physical damage.
        If the the subject gains a \\glossterm{vital wound} from this damage, the condition ends.

        This condition can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
        The \\glossterm{difficulty rating} of the check is equal to 20.`,
        targeting: `
          Make an attack vs. Fortitude against the one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Eyes of Darksight",

      effect: `
        You gain \\glossterm{darkvision} with a 60 foot radius.
      `,
      rank: 2,
      scaling: {
        4: `The radius increases to 120 feet.`,
        6: `The radius increases to 240 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Eyes of Darksight",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Eyes of Darksight",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "The radius increases to 120 feet.",
      },
      type: "Attune (target)",
    },

    {
      name: "Draconic Senses",

      effect: `
        You gain \\glossterm{darkvision} with a 60 foot radius, \\glossterm{low-light vision}, and \\glossterm{blindsense} with a 30 foot radius.
        If you already have darkvision or blindsense, the range of that ability increases by the given amount instead.
        If you already have low-light vision, you double its effectiveness, allowing you to treat sources of light as if they had four times their normal illumination range.
      `,
      rank: 4,
      scaling: {
        6: `The radius of the darkvision increases by 60 feet, and the radius of the blindsense increases by 30 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Draconic Senses",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Draconic Senses",
      },
      // narrative: '',
      rank: 6,
      type: "Attune (target)",
    },

    {
      name: "Swimmer",

      castingTime: "minor action",
      effect: `
        You gain a \\glossterm{swim speed} equal to your \\glossterm{base speed}.
      `,
      rank: 2,
      scaling: {
        4: `You also gain a +2 \\glossterm{magic bonus} to Swim checks.`,
        6: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Swimmer",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Swimmer",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "Each subject also gains a +2 \\glossterm{magic bonus} to Swim checks.",
      },
      type: "Attune (target)",
    },

    {
      name: "Climber",

      castingTime: "minor action",
      effect: `
        You gain a \\glossterm{climb speed} equal to your \\glossterm{base speed}.
      `,
      rank: 2,
      scaling: {
        4: `You also gain a +2 \\glossterm{magic bonus} to Climb checks.`,
        6: `The bonus increases to +4.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Climber",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Climber",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "Each subject also gains a +2 \\glossterm{magic bonus} to Swim checks.",
      },
      type: "Attune (target)",
    },

    {
      name: "Runner",

      castingTime: "minor action",
      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to your \\glossterm{land speed}.
      `,
      rank: 2,
      scaling: {
        4: `The bonus increases to +20 feet.`,
        6: `The bonus increases to +30 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Runner",

      castingTime: "minor action",
      functionsLike: {
        mass: true,
        name: "Runner",
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: "The bonus increases to +20 feet.",
      },
      type: "Attune (target)",
    },

    {
      name: "Dragon Breath",

      castingTime: "minor action",
      attack: {
        glance: `Half damage.`,
        hit: `Each subject takes 2d10 + half \\glossterm{power} damage of your chosen type.`,
        targeting: `
          Choose one of the following damage types: acid, cold, electricity, or fire.
          For the duration of this spell, you can breath that type of energy like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you cannot use it again until after the end of the next round.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },
  ],
  rituals: [
    {
      name: "Create Handholds",

      castingTime: "one minute",
      effect: `
        Choose one \\glossterm{unattended}, nonmagical wall up to 50 feet high and 10 feet wide within \\medrange.
        You create handholds in the subject, making it easier to climb.
        This reduces the \\glossterm{difficulty rating} to climb the object by 10.
        When this effect ends, the handholds disappear.
      `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Craft Object",

      castingTime: "special",
      effect: `
        Choose any number of unattended, nonmagical objects within \\shortrange.
        You make a Craft check to transform the subjects into a new item (or items) made of the same materials.
        You require none of the tools that would normally be necessary, such as an anvil and furnace.
        The total size of all targets combined must be Medium size or smaller.

        This ritual takes time equal to one tenth of the time that would normally be required to craft the object, to a minimum of one hour.
      `,
      rank: 3,
      type: "Instant",
    },

    {
      name: "Craft Large Object",

      castingTime: "special",
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Large.
        `,
        name: "Craft Object",
      },
      rank: 5,
      type: "Instant",
    },

    {
      name: "Craft Huge Object",

      castingTime: "special",
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Huge.
        `,
        name: "craft object",
      },
      rank: 7,
      type: "Instant",
    },

    {
      name: "Mending",

      castingTime: "one minute",
      effect: `
        Chose one \\glossterm{unattended} object within \\shortrange.
        The subject regains hit points equal to 1d6 plus half your \\glossterm{power}.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Morph Weapon",

      castingTime: "one minute",
      effect: `
        Choose one \\glossterm{unattended} manufactured weapon within \\medrange.
        The subject changes into another weapon from the same weapon group.
        At least one ritual participant must be proficient with that weapon group.
        You cannot change it into an exotic weapon in this way.
        When this effect ends, the subject returns to its original shape.
      `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Morph Exotic Weapon",

      castingTime: "one minute",
      functionsLike: {
        exceptThat: `you can also change the subject into an exotic weapon.`,
        name: "morph weapon",
      },
      rank: 3,
      type: "Attune (ritual)",
    },

    {
      name: "Fortify",

      castingTime: "one hour",
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
        Unlike most abilities, this ritual can affect individual parts of a whole object.

        % How should this affect Strength break difficulty ratings?
        The subject gains a +5 \\glossterm{magic bonus} to its \\glossterm{resistances} against \\glossterm{physical damage} and \\glossterm{energy damage}.
        If the subject is moved, this effect ends.
        Otherwise, it lasts for one year.
      `,
      rank: 1,
      type: "Attune (ritual)",
    },

    {
      name: "Enduring Fortify",

      // original targets: One \glossterm{unattended}, nonmagical object or part of an object of up to Large size.
      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: "fortify",
      },
      rank: 4,
      type: "Instant",
    },

    {
      name: "Enduring Greater Fortify",

      // original targets: Greater Fortify
      castingTime: "24 hours",
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: "greater fortify",
      },
      rank: 5,
      type: "Instant",
    },

    {
      name: "Greater Fortify",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{resistances} increases to 10.
        `,
        name: "fortify",
      },
      rank: 4,
      type: "Attune (ritual)",
    },

    {
      name: "Supreme Fortify",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{resistances} increases to 15.
        `,
        name: "fortify",
      },
      rank: 7,
      type: "Attune (ritual)",
    },

    {
      name: "Ironwood",

      castingTime: "24 hours",
      effect: `
        One Small or smaller \\glossterm{unattended}, nonmagical wooden object within \\shortrange is transformed into ironwood.
        While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
        Metallic armor and weapons, such as full plate, can be crafted from ironwood.
      `,
      rank: 4,
      type: "Instant",
    },

    {
      name: "Purify Sustenance",

      castingTime: "one hour",
      effect: `
        All food and water in a single square within \\shortrange is purified.
        Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
        This does not prevent subsequent natural decay or spoiling.
      `,
      rank: 1,
      type: "Instant",
    },

    {
      name: "Awaken",

      castingTime: "24 hours",
      effect: `
        One Large or smaller \\glossterm{ally} within \\medrange becomes sentient.
        Its Intelligence becomes 1d6 - 5.
        Its type changes from animal to magical beast.
        It gains the ability to speak and understand one language that you know of your choice.
        Its maximum age increases to that of a human (rolled secretly).
        This effect is permanent.

        You can only learn this ritual if you have access to this mystic sphere through the nature \\glossterm{magic source}.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Air Breathing",

      castingTime: "one minute",
      effect: `
        Choose one Large or smaller ritual participant.
        The subject can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.
      `,
      rank: 3,
      type: "Attune (ritual)",
    },

    {
      name: "Water Breathing",

      castingTime: "one minute",
      effect: `
        Choose one Large or smaller ritual participant.
        The subject can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
      `,
      rank: 3,
      type: "Attune (ritual)",
    },
  ],
};
