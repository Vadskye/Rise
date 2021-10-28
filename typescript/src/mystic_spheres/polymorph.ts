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
        The maximum \\glossterm{damage resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

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
        abilityType: "ability",
        exceptThat: `
          that you gain a +4 bonus and you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Disguise Creature}).
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

    {
      name: "Natural Weapon",

      effect: `
        You gain your choice of one of the following \\glossterm{natural weapons}: bite, claw, gore, ram, slam, or talon.
        For details, see \\tref{Natural Weapons}.
      `,
      focus: false,
      scaling: {
        2: `You also gain a +2 \\glossterm{magic bonus} to \\glossterm{power} with \\glossterm{strikes} using natural weapons.`,
        4: `The power bonus increases to +4.`,
        6: `The power bonus increases to +8.`,
      },
      type: "Attune (self)",
    },
  ],
  spells: [
    {
      name: "Reforge Armor",

      effect: `
        Choose one nonmagical suit of body armor you touch.
        In addition, choose one of the following special materials: adamantine, deepforged, diamondsteel, elvenweave, ironwood, mithral, or starmetal.
        The special material chosen must not cause the item's total rank to exceed your spellcasting rank with this spell.
        The armor changes to be composed of that material, and gains all properties and benefits of that material instead of its original properties.
        For details about armor special materials, see \\tref{Armor Special Materials}.

        You can only change the subject into a special material appropriate for its base composition of either leather or metal.
        For example, you cannot create mithral hide armor with this spell.
      `,
      rank: 4,
      scaling: {
        6: `You can also choose one of the following special materials: pure adamantine, pure deepforged, pure diamondsteel, pure elvenweave, pure mithral, or pure starmetal.`,
      },
      // TODO: weird that this is one of the few ways you can attune on behalf of an ally
      type: "Attune (self)",
    },

    {
      name: "Twisting Claw",
      effect: `
        This spell does not have the \\abilitytag{Focus} tag.

        Make a melee \\glossterm{strike} with a -1d damage penalty using a \\glossterm{natural weapon}.
        The attack is made against the target's Reflex defense instead of its Armor defense.
        You may use the higher of your \\glossterm{magical} power and your \\glossterm{mundane} power to determine your damage with this ability.
      `,
      focus: false,
      rank: 1,
      scaling: {
        3: 'You gain a +1 \\glossterm{accuracy} bonus with the strike.',
        5: 'The accuracy bonus increases to +2.',
        7: 'The accuracy bonus increases to +3.',
      },
      type: 'Instant',
    },

    // Better than power attack, but also requires natural weapons, so this should be fine
    {
      name: "Mighty Claw",
      effect: `
        This spell does not have the \\abilitytag{Focus} tag.

        Make a melee \\glossterm{strike} with a -1 accuracy penalty and a +2d damage bonus using a \\glossterm{natural weapon}.
        You may use the higher of your \\glossterm{magical} power and your \\glossterm{mundane} power to determine your damage with this ability.
      `,
      focus: false,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +3d.',
        5: 'The damage bonus increases to +4d.',
        7: 'The damage bonus increases to +5d.',
      },
      type: 'Instant',
    },

    {
      name: "Distant Claw",
      effect: `
        This spell does not have the \\abilitytag{Focus} tag.

        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        You gain a +5 foot bonus to your \\glossterm{reach} with this strike.
        You may use the higher of your \\glossterm{magical} power and your \\glossterm{mundane} power to determine your damage with this ability.
      `,
      focus: false,
      rank: 2,
      scaling: {
        4: 'The reach bonus increases to +10 feet.',
        6: 'The reach bonus increases to +15 feet.',
      },
      type: 'Instant',
    },

    {
      name: "Piercing Grasp",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} piercing damage.`,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
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
        hit: `
          The subject takes 2d8 + \\glossterm{power} piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is \\glossterm{briefly} \\dazed.
        `,
        targeting: `
          This spell does not have the \\abilitytag{Focus} tag.
          You must have a \\glossterm{free hand} to cast this spell.

          Make a melee attack vs. Reflex against anything within your \\glossterm{reach}.
        `,
      },
      focus: false,
      narrative: `
        You twist your hand into a spike that bends past armor to impale your foe.
      `,
      rank: 3,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Supreme Piercing Grasp",

      functionsLike: {
        name: 'greater piercing grasp',
        exceptThat: 'the damage increases to 4d10 + \\glossterm{power} damage, and the subject is \\stunned instead of dazed.',
      },
      focus: false,
      rank: 7,
      scaling: "damage",
      type: "Duration",
    },

    {
      name: "Baleful Polymorph",

      attack: {
        hit: `The subject takes 2d8 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is balefully polymorphed as a \\glossterm{condition}.
        It shrinks by two \\glossterm{size categories} and is \\confused.`,
        targeting: `
        Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
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
        This decreases the \\glossterm{base speed} for its size and improves its Stealth skill.
        It may also decrease the subject's \\glossterm{reach} (see \\pcref{Size in Combat}).
        However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.
      `,
      rank: 2,
      scaling: {
        4: `You also gain a +2 \\glossterm{magic bonus} to Dexterity-based checks.`,
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
        6: "Each subject also gains a +2 \\glossterm{magic bonus} to Dexterity-based checks.",
      },
      type: "Attune (target)",
    },

    {
      name: "Stoneskin",

      castingTime: "minor action",
      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
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
        Your size increases by one \\glossterm{size category}, to a maximum of Huge.
        This increases the \\glossterm{base speed} for your size and reduces your Stealth skill.
        It may also increase your \\glossterm{reach} (see \\pcref{Size in Combat}).

        However, your physical form is not altered fully to match your new size.
        Your Strength and Dexterity are unchanged from your original size, and you take a -5 foot penalty to your speed with all of your \\glossterm{movement modes.}
      `,
      rank: 3,
      scaling: {
        5: `
          You also gain a +2 \\glossterm{magic bonus} to Strength-based checks, and you gain a +2 \\glossterm{magic bonus} to Strength for the purpose of determining your weight limits (see \\pcref{Weight Limits}).
        `,
        7: `
          You can increase your size category by up to two size categories.
          However, if you do, the movement speed penalty increases to -10 feet.
        `,
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
        7: `
          Each subject also gains a +2 \\glossterm{magic bonus} to Strength-based checks, and a +2 \\glossterm{magic bonus} to Strength for the purpose of determining its weight limits (see \\pcref{Weight Limits}).
        `,
      },
      type: "Attune (target)",
    },

    {
      name: "Reshape Appearance",

      effect: `
        You make a Disguise check to alter your appearance (see \\pcref{Disguise Creature}).
        This physically changes your body to match the results of your disguise.
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
        hit: `The subject takes 4d10 + \\glossterm{power} physical damage.
        In addition, if the subject is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
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
          \\item You gain a \\glossterm{climb speed} equal to the \\glossterm{base speed} for your size.
          \\item You gain a +8 \\glossterm{magic bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You are immune to \\glossterm{critical hits} from \\glossterm{strikes}.
          \\item Your maximum \\glossterm{damage resistance} is halved.
        \\end{itemize}

        As a \\glossterm{minor action}, you can voluntarily disable this ability and return to your normal form.
        If you do, you can resume the effect of this ability as a minor action.
      `,
      rank: 4,
      scaling: { 6: `Your damage resistance is not reduced.` },
      type: "Attune (self)",
    },

    {
      name: "Spikeform",

      // original targets: ['Yourself', 'See text']
      castingTime: "minor action",
      attack: {
        // AOE dice, no power
        hit: `Each subject takes 2d6 piercing damage.`,
        targeting: `
          At the end of each phase, make an attack vs. Armor against each creature that attacked you using a free hand or non-\\glossterm{Long} melee weapon during that phase.
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
      name: "Extruding Spikes",

      castingTime: "minor action",
      attack: {
        // TODO: is this damage correct?
        hit: `Each subject takes 4d6 piercing damage.`,
        targeting: `
          As a \\glossterm{minor action}, you can extend spikes to make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
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

      // This intentionally uses a fixed size category instead of referencing your original size
      // category to allow interaction with items like a Staff of Giants.
      effect: `
        You absorb Medium or smaller \\glossterm{unattended} object into your body.
        Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
        You must bear the weight of the object as if you were carrying it, not as if it was part of your body.
        A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
        You cannot absorb only part of a larger object.

        This effect lasts until you use it again, \\glossterm{dismiss} it as a \\glossterm{free action}, or fall unconscious.
        When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
      `,
      rank: 3,
      scaling: {
        5: `The maximum size of the object increases to Large.`,
        7: `The maximum size of the object increases to Huge.`,
      },
      type: "Duration",
    },

    {
      name: "Camouflage",

      effect: `
        If you are \\glossterm{trained} with the Stealth skill, you gain a +3 \\glossterm{magic bonus} to it.
        Otherwise, you are treated as being \\glossterm{trained} in that skill.
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
        hit: `The subject takes 4d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm{condition}.
        It is \\decelerated, and it and has no \\glossterm{free hands}, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
        It is also unable to speak normally or use verbal or somatic \\glossterm{casting components}.`,
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
        The subject regains 2d6 + \\glossterm{power} \\glossterm{hit points}.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Healing} ability.
      `,
      rank: 2,
      scaling: { special: "The healing increases by +1d for each rank beyond 2." },
      tags: ['Healing'],
      type: "Instant",
    },

    {
      name: "Vital Regeneration",

      castingTime: "minor action",
      effect: `
        At the end of each round, if the subject is not \\glossterm{unconscious} due to \\glossterm{fatigue}, it automatically removes one of its \\glossterm{vital wounds}.
        It can choose to stop this regeneration if you are conscious, but the regeneration happens automatically if it is unconscious due to vital wounds.
        This cannot remove a vital wound the subject gained during the current round.
        When it removes a vital wound in this way, it increases its \\glossterm{fatigue level} by three.
      `,
      rank: 5,
      scaling: {
        7: `The subject can remove two \\glossterm{vital wounds} instead of one.
            It increases its \\glossterm{fatigue level} by three per vital wound removed this way.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Regeneration",

      castingTime: "minor action",
      effect: `
        At the end of each round, you regain 2d6 \\glossterm{hit points}.
      `,
      rank: 4,
      scaling: { special: "The healing increases by +1d for each rank beyond 4." },
      tags: ['Healing'],
      type: "Attune (self)",
    },

    {
      name: "Physical Enhancement",

      castingTime: "minor action",
      effect: `
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        You gain a +2 \\glossterm{magic bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, you gain a +2 \\glossterm{magic bonus} to Strength for the purpose of determining your weight limits (see \\pcref{Weight Limits}).
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
      name: "Eyebite",

      attack: {
        hit: `The subject takes 2d8 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is \\blinded as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Organ Failure",

      attack: {
        hit: `The subject takes 1d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is \\stunned as a \\glossterm{condition}.`,
        targeting: `
        Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Cripple",

      attack: {
        crit: `The subject is \\paralyzed instead of immobilized.`,
        hit: `
          The subject is \\decelerated as a \\glossterm{condition}.
          While it has no remaining \\glossterm{damage resistance}, it is \\immobilized instead of decelerated.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 7,
      type: "Duration",
    },

    {
      name: "Bleed",

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The subject begins bleeding as a \\glossterm{condition}.
          At the end of each round, it takes 1d8 physical damage.

          This effect can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
          The \\glossterm{difficulty value} of the check is equal to 10.
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
          "The effect lasts \\glossterm{briefly}. The subject still takes damage during the next round.",
        hit: `
          The subject begins bleeding as a \\glossterm{condition}.
          At the end of each round, it takes 2d10 + half \\glossterm{power} physical damage.
        `,
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
      name: "Swimmer",

      castingTime: "minor action",
      effect: `
        You gain a \\glossterm{swim speed} equal to the \\glossterm{base speed} for your size.
        If you already have a swim speed, you gain a +5 foot \\glossterm{magic bonus} to your swim speed.
      `,
      rank: 2,
      scaling: {
        4: `You gain a +5 foot \\glossterm{magic bonus} to your climb speed, or a +10 foot bonus if you already have a climb speed.`,
        6: `You gain a +10 foot \\glossterm{magic bonus} to your climb speed, or a +15 foot bonus if you already have a climb speed.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Climber",

      castingTime: "minor action",
      effect: `
        You gain a \\glossterm{climb speed} equal to the \\glossterm{base speed} for your size.
        If you already have a climb speed, you gain a +5 foot \\glossterm{magic bonus} to your climb speed.
      `,
      rank: 2,
      scaling: {
        4: `You gain a +5 foot \\glossterm{magic bonus} to your climb speed, or a +10 foot bonus if you already have a climb speed.`,
        6: `You gain a +10 foot \\glossterm{magic bonus} to your climb speed, or a +15 foot bonus if you already have a climb speed.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Runner",

      castingTime: "minor action",
      effect: `
        You gain a +5 foot \\glossterm{magic bonus} to your \\glossterm{land speed}.
      `,
      rank: 1,
      scaling: {
        3: `The bonus increases to +10 feet.`,
        5: `The bonus increases to +15 feet.`,
        7: `The bonus increases to +20 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Mobility Enhancement",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        For each creature, you choose one of the following effects.
        \\parhead{Climber} The subject gains a \\glossterm{climb speed} equal to its \\glossterm{base speed}.
        \\parhead{Runner} The subject gains a +5 foot \\glossterm{magic bonus} to its \\glossterm{land speed}.
        \\parhead{Swimmer} The subject gains a \\glossterm{swim speed} equal to its \\glossterm{base speed}.
      `,
      rank: 4,
      scaling: {
        6: 'The subject also gains a +5 foot \\glossterm{magic bonus} to its speed with all movement modes, and a +10 foot \\glossterm{magic bonus} to its land speed.',
      },
      type: "Attune (target)",
    },

    {
      name: "Mass Sensory Enhancement",

      castingTime: "minor action",
      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        For each creature, you choose one of the following effects.
        \\parhead{Awareness} The subject gains a +3 \\glossterm{magic bonus} to the Awareness skill.
        \\parhead{Darkvision} The subject gains \\glossterm{darkvision} with a range of 60 feet.
        \\parhead{Low-Light Vision} The subject gains \\glossterm{low-light vision}.
        \\parhead{Scent} The subject gains the \\glossterm{scent} ability, giving it a +10 bonus to scent-based Awareness checks (see \\pcref{Senses}).
      `,
      rank: 5,
      scaling: {
        7: "For each subject, you can choose any two of the listed enhancements.",
      },
      type: "Attune (target)",
    },

    {
      name: "Dragon Breath",

      castingTime: "minor action",
      attack: {
        hit: `Each subject takes 2d10 + half \\glossterm{power} damage of your chosen type.`,
        targeting: `
          Choose one of the following damage types: acid, cold, electricity, or fire.
          For the duration of this spell, you can breath that type of energy like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 4,
      scaling: "damage",
      type: "Attune (self)",
    },

    {
      name: "Cleansing Bodymorph",

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{brief} effect or \\glossterm{condition}.
        This cannot remove an effect applied during the current round.
        For each effect removed this way, you deal the subject 4 physical damage.
      `,
      rank: 4,
      scaling: {
        6: `The subject can remove two effects.`,
      },
      type: "Instant",
    },
    {
      name: "Natural Might",

      effect: `
        You gain a +3 \\glossterm{magic bonus} to \\glossterm{power} with \\glossterm{strikes} using \\glossterm{unarmed attacks} and \\glossterm{natural weapons}.
      `,
      rank: 1,
      scaling: {
        3: `The power bonus increases to +6.`,
        5: `The power bonus increases to +12.`,
        7: `The power bonus increases to +24.`,
      },
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
        This reduces the \\glossterm{difficulty value} to climb the object by 10.
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
        The subject regains 1d8 + \\glossterm{power} hit points.
        After you use this ability, you \\glossterm{briefly} cannot use it or any other \abilitytag{Healing} ability.
      `,
      rank: 1,
      tags: ['Healing'],
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

        % How should this affect Strength break difficulty value?
        The subject gains a +5 \\glossterm{magic bonus} to its \\glossterm{damage resistance}.
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
          the bonus to \\glossterm{damage resistance} increases to 10.
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
          the bonus to \\glossterm{damage resistance} increases to 15.
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
        One Medium or smaller \\glossterm{unattended}, nonmagical wooden object within \\shortrange is transformed into ironwood.
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
      name: "Gills",

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
