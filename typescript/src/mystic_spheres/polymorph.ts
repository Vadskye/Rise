import { MysticSphere } from '.';

export const polymorph: MysticSphere = {
  name: 'Polymorph',
  shortDescription: 'Change the physical shape or outward form of objects and creatures.',
  sources: ['arcane', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Alter Object',

      effect: `
        Choose one \\glossterm{unattended}, nonmagical object you touch.
        You make a Craft check to alter it (see \\pcref{Craft}), except that you do not need any special tools to make the check (such as an anvil and furnace).
        The maximum \\glossterm{damage resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

        % too short?
        Each time you cast this spell, you can accomplish work that would take up to two rounds with a normal Craft check.
      `,
      scaling: {
        2: `The amount of work you accomplish with the spell increases to five rounds.`,
        4: `The amount of work you accomplish with the spell increases to one minute.`,
        6: `The amount of work you accomplish with the spell increases to two minutes.`,
      },
    },

    {
      name: 'Alter Appearance',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          that you gain a +4 bonus and you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref{Disguise Creature}).
          This is a physical change to your body, so no amount of inspection will reveal your true form.
          A successful Awareness check that beats your Disguise check only reveals that your body's appearance has been magically altered.

          This ability lasts until you use it again.
        `,
        name: 'disguise creature',
      },
      scaling: {
        2: `The bonus increases to +6.`,
        4: `The bonus increases to +8.`,
        6: `The bonus increases to +10.`,
      },
    },

    {
      name: 'Natural Weapon',

      effect: `
        You gain your choice of one of the following \\glossterm{natural weapons}: bite, claw, gore, ram, slam, or talon.
        For details, see \\tref{Natural Weapons}.
      `,
      // no scaling; unclear what scaling could exist
      type: 'Attune',
    },
  ],
  spells: [
    {
      name: 'Alter Self',

      functionsLike: {
        abilityType: 'ability',
        exceptThat: `
          that you gain a +4 bonus and you cannot change the appearance of your equipment (see \\pcref{Disguise Creature}).
          This is a physical change to your body, so no amount of inspection will reveal your true form.
          A successful Awareness check that beats your Disguise check only reveals that your body's appearance has been magically altered.
        `,
        name: 'disguise creature',
      },
      rank: 2,
      tags: ['Attune'],
    },

    {
      name: 'Reforge Armor',

      effect: `
        Choose one nonmagical suit of body armor you touch.
        The armor becomes composed of a special material of your choice other than cold iron (see \\tref{Armor Special Materials}).
        The special material chosen must not cause the item's total rank to exceed your spellcasting rank with this spell.
        You can only change the target into a special material appropriate for its base composition of either leather or metal.
        For example, you cannot create mithral hide armor with this spell.
      `,
      rank: 4,
      // TODO: weird that this is one of the few ways you can attune on behalf of an ally
      type: 'Attune',
    },

    {
      name: 'Twisting Claw',
      effect: `
        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        Your \\glossterm{power} with the strike is halved.
        The attack is made against the target's Reflex defense instead of its Armor defense.
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Attribute Damage Increments}).
      `,
      rank: 1,
      scaling: {
        3: 'You gain a +1 \\glossterm{accuracy} bonus with the strike.',
        5: 'The accuracy bonus increases to +2.',
        7: 'The accuracy bonus increases to +3.',
      },
    },

    {
      name: 'Mighty Claw',
      effect: `
        Make a melee \\glossterm{strike} with a -1 accuracy penalty and a +2 damage bonus using a \\glossterm{natural weapon}.
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Attribute Damage Increments}).
      `,
      rank: 1,
      scaling: {
        3: 'The damage bonus increases to +4.',
        5: 'The damage bonus increases to +8.',
        7: 'The damage bonus increases to +16.',
      },
    },

    {
      name: 'Distant Claw',
      effect: `
        Make a melee \\glossterm{strike} using a \\glossterm{natural weapon}.
        The strike gains the \\weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \\pcref{Weapon Tags}).
        You may use the higher of your Strength and your Willpower to determine your damage with the strike (see \\pcref{Attribute Damage Increments}).
      `,
      rank: 2,
      scaling: {
        4: 'You gain a +1 \\glossterm{accuracy} bonus with the strike.',
        6: 'The accuracy bonus increases to +2.',
      },
    },

    {
      name: 'Baleful Polymorph',

      attack: {
        hit: `The target takes 2d8 physical damage.
        If it loses \\glossterm{hit points} from this damage, it is balefully polymorphed as a \\glossterm{condition}.
        It shrinks by two \\glossterm{size categories} and is \\confused.`,
        targeting: `
        Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'accuracy',
    },

    {
      name: 'Shrink',

      effect: `
        Your size decreases by one \\glossterm{size category}, to a minimum of Tiny.
        Reducing your size gives you a -1 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +1 bonus to your Reflex defense, and a +5 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 2,
      type: 'Attune',
    },

    {
      name: 'Greater Shrink',

      effect: `
        Your size decreases by two \\glossterm{size categories}, to a minimum of Tiny.
        This gives you a -2 penalty to Strength for the purpose of determining your \\glossterm{weight limits}, a +2 bonus to your Reflex defense, and a +10 bonus to Stealth.
        It also reduces your \\glossterm{base speed} (see \\pcref{Size Categories}).
      `,
      rank: 6,
      type: 'Attune',
    },

    {
      name: 'Mass Shrink',

      functionsLike: {
        exceptThat:
          'it affects up to five creatures of your choice from among yourself and your Small or larger \\glossterm{allies} within \\medrange.',
        name: 'Shrink',
      },
      // narrative: '',
      rank: 4,
      type: 'Attune (target)',
    },

    {
      name: 'Stoneskin',

      effect: `
        You gain a +4 \\glossterm{magic bonus} to your \\glossterm{damage resistance}.
      `,

      rank: 1,
      scaling: {
        3: `The bonus increases to +8.`,
        5: `The bonus increases to +16.`,
        7: `The bonus increases to +32.`,
      },
      type: 'Attune',
    },

    {
      name: 'Mass Stoneskin',

      functionsLike: {
        mass: true,
        name: 'Stoneskin',
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: `The bonus increases to +8.`,
        7: `The bonus increases to +16.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Enlarge',

      effect: `
        Your size increases by one \\glossterm{size category}, to a maximum of Huge.
        Increasing your size gives you a +1 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -1 penalty to your Reflex defense, and a -5 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: "Greater Enlarge",

      effect: `
        Your size increases by two \\glossterm{size categories}.
        This gives you a +2 bonus to Strength for the purpose of determining your \\glossterm{weight limits}, a -2 penalty to your Reflex defense, and a -10 penalty to Stealth.
        It also increases your \\glossterm{base speed} (see \\pcref{Size Categories}).

        This spell makes you slightly clumsy in your new size.
        You take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
      `,
      rank: 7,
      type: "Attune",
    },

    {
      name: 'Mass Enlarge',

      functionsLike: {
        exceptThat:
          'it affects up to five creatures of your choice from among yourself and your Large or smaller \\glossterm{allies} within \\medrange.',
        name: 'Enlarge',
      },
      // narrative: '',
      rank: 5,
      type: 'Attune (target)',
    },

    {
      name: 'Disintegrate',

      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} physical damage.
        In addition, if the target is unconscious from vital wounds at the end of the current \\glossterm{phase}, it dies.
        Its body is completely disintegrated, leaving behind only a pinch of fine dust.
        Its equipment is unaffected.`,
        targeting: `
        Make an attack vs. Fortitude against anything within \\medrange.
        `,
      },

      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Malleable Body',

      effect: `
        Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
        This has the following effects:
        \\begin{itemize}
          \\item You gain a \\glossterm{climb speed} 10 feet slower than the \\glossterm{base speed} for your size.
          \\item You gain a +8 \\glossterm{magic bonus} to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
          \\item You gain a +4 bonus to your defenses when determining whether a \\glossterm{strike} gets a \\glossterm{critical hit} against you instead of a normal hit.
        \\end{itemize}

        You can suppress or resume this effect as a \\glossterm{free action}.
      `,
      rank: 3,
      type: 'Attune (deep)',
    },

    {
      name: 'Greater Malleable Body',

      functionsLike: {
        name: "malleable body",
        exceptThat: "you become \\glossterm{immune} to critical hits from strikes."
      },
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Spikeform',

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 3,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Mighty Spikeform',

      attack: {
        hit: `Each target takes 4d10 + half \\glossterm{power} piercing damage.`,
        targeting: `
          Whenever a creature makes a \\glossterm{melee} attack against you using a free hand or non-Long weapon, make a \\glossterm{reactive attack} vs. Armor against them.
        `,
      },
      narrative: `
        Your body grows large spikes that impale creatures who attack you.
      `,
      rank: 7,
      type: 'Attune (deep)',
    },

    {
      name: 'Extruding Spikes',

      attack: {
        // TODO: is this damage correct?
        hit: `Each target takes 2d10 piercing damage.`,
        targeting: `
          As a \\glossterm{minor action}, you can extend spikes to make an attack vs. Armor against all \\glossterm{enemies} adjacent to you.
        `,
      },
      narrative: `
        Your body grows small spikes that you can consciously extrude to impale nearby foes.
      `,
      rank: 6,
      scaling: 'damage',
      type: 'Attune (deep)',
    },

    {
      name: 'Absorb Object',

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
    },

    {
      name: 'Camouflage',

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
      type: 'Attune',
    },

    {
      name: 'Sludgeform',

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The target takes 4d6 physical damage.
        If it loses \\glossterm{hit points} from this damage, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm{condition}.
        This has the following effects:
        \\begin{itemize}
          \\item Its exposed flesh makes it \\vulnerable to all damage.
          \\item It has no \\glossterm{free hands}, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
          \\item It is unable to speak normally or use verbal or somatic \\glossterm{casting components}.
        \\end{itemize}
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 7,
    },

    {
      name: 'Mending',

      effect: `
        Chose yourself, one \\glossterm{ally}, or one \\glossterm{unattended} object within \\shortrange.
        The target regains 1d6 + \\glossterm{power} \\glossterm{damage resistance} if it is a creature, or that many hit points if it is an object.
        If it is a creature, it increases its \\glossterm{fatigue level} by one.
      `,
      rank: 1,
      scaling: { special: "The recovery increases by +1d for each rank beyond 1." },
      tags: ['Swift'],
    },

    {
      name: 'Empowered Mending',

      functionsLike: {
        name: 'mending',
        exceptThat: "The recovery increases to 4d6 + \\glossterm{power}.",
      },
      rank: 5,
      scaling: { special: "The recovery increases by +1d for each rank beyond 5." },
      tags: ['Swift'],
    },

    {
      name: 'Brief Regeneration',

      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains 1d8 + half \\glossterm{power} \\glossterm{hit points} at the end of each round.
        When this effect ends, the target increases its \\glossterm{fatigue level} by one.
      `,
      rank: 2,
      scaling: { special: 'The healing increases by +1d for each rank beyond 2.' },
    },

    {
      name: 'Empowered Brief Regeneration',

      effect: `
        Choose yourself or one living \\glossterm{ally} within \\shortrange.
        The target \\glossterm{briefly} regains 4d8 + half \\glossterm{power} \\glossterm{hit points} at the end of each round.
        When this effect ends, the target increases its \\glossterm{fatigue level} by one.
      `,
      rank: 6,
      scaling: { special: 'The healing increases by +1d for each rank beyond 6.' },
    },

    {
      name: 'Vital Regeneration',

      effect: `
        At the end of each round, if the target is not \\glossterm{unconscious} due to \\glossterm{fatigue}, it automatically removes one of its \\glossterm{vital wounds}.
        It can choose to stop this regeneration if you are conscious, but the regeneration happens automatically if it is unconscious due to vital wounds.
        When it removes a vital wound in this way, it increases its \\glossterm{fatigue level} by three.
      `,
      rank: 5,
      scaling: {
        7: `The target can remove two \\glossterm{vital wounds} instead of one.`,
      },
      type: 'Attune (target)',
    },

    {
      name: 'Regeneration',

      effect: `
        At the end of each round, you regain 1d6 \\glossterm{hit points}.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      rank: 1,
      scaling: { special: 'The healing increases by +1d for each rank beyond 1.' },
      type: 'Attune',
    },

    {
      name: 'Empowered Regeneration',

      effect: `
        At the end of each round, you regain 2d6 \\glossterm{hit points}.
        If you gained a vital wound this round, you add your \\glossterm{power} to this healing.
        This healing cannot increase your hit points above half your maximum hit points.
      `,
      rank: 4,
      scaling: { special: 'The healing increases by +1d for each rank beyond 4.' },
      type: 'Attune',
    },

    {
      name: 'Physical Enhancement',

      effect: `
        When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
        You gain a +2 \\glossterm{magic bonus} to checks using the chosen attribute.
        In addition, if you choose Strength, you gain a +1 \\glossterm{magic bonus} to Strength for the purpose of determining your weight limits (see \\pcref{Weight Limits}).
      `,
      rank: 2,
      scaling: { 4: `The bonus increases to +3.`, 6: `The bonus increases to +4.` },
      type: 'Attune',
    },

    {
      name: 'Mass Physical Enhancement',

      functionsLike: {
        mass: true,
        name: 'Physical Enhancement',
      },
      // narrative: '',
      rank: 4,
      scaling: {
        6: 'The bonus increases to +4.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Scent',

      effect: `
        You gain the \\trait{scent} trait, which reduces the \\glossterm{difficulty value} of scent-based Awareness checks by 10 (see \\pcref{Awareness}).
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Bleed',

      // +1 level relative to Ignition because the check DV is always 10
      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The target begins bleeding as a \\glossterm{condition}.
          It takes 1d8 + half \\glossterm{power} physical damage immediately and during each of your subsequent actions.

          This effect can be removed with the \\textit{treat condition} ability from the Medicine skill (see \\pcref{Medicine}).
          The \\glossterm{difficulty value} of the check is equal to 10.
        `,
        targeting: `
          Make an attack vs. Fortitude against one living creature within \\medrange.
        `,
      },
      rank: 2,
      scaling: 'damage',
    },

    {
      name: 'Mighty Bleed',

      attack: {
        crit: `The damage from the condition is doubled.`,
        hit: `
          The target begins bleeding as a \\glossterm{condition}.
          It takes 2d8 + half \\glossterm{power} physical damage immediately and during each of your subsequent actions.
        `,
        targeting: `
          Make an attack vs. Fortitude against the one living creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Eyes of Darksight',

      effect: `
        You gain \\trait{darkvision} with a 60 foot radius, allowing you to see in complete darkness (see \\pcref{Darkvision}).
      `,
      rank: 2,
      scaling: {
        4: `The radius increases to 120 feet.`,
        6: `The radius increases to 240 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Draconic Senses',

      effect: `
        You gain \\trait{darkvision} with a 60 foot radius, \\trait{low-light vision}, and \\trait{blindsense} with a 30 foot radius.
        If you already have darkvision or blindsense, the range of that ability increases by the given amount instead.
      `,
      rank: 4,
      scaling: {
        6: `The radius of the darkvision increases by 60 feet, and the radius of the blindsense increases by 30 feet.`,
      },
      type: 'Attune',
    },

    {
      name: 'Swimmer',

      effect: `
        You gain a \\glossterm{swim speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a swim speed, you gain a +10 foot \\glossterm{magic bonus} to your swim speed.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Climber',

      effect: `
        You gain a \\glossterm{climb speed} 10 feet slower than the \\glossterm{base speed} for your size.
        If you already have a climb speed, you gain a +10 foot \\glossterm{magic bonus} to your climb speed.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Runner',

      effect: `
        You gain a +10 foot \\glossterm{magic bonus} to your \\glossterm{land speed}.
      `,
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Mass Sensory Enhancement',

      effect: `
        Choose up to five creatures from among yourself and your \\glossterm{allies} within \\medrange.
        For each creature, you choose one of the following effects.
        \\parhead{Awareness} The target gains a +3 \\glossterm{magic bonus} to the Awareness skill.
        \\parhead{Darkvision} The target gains \\trait{darkvision} with a range of 60 feet.
        \\parhead{Low-light Vision} The target gains \\trait{low-light vision}.
        \\parhead{Scent} The target gains the \\glossterm{scent} ability, giving it a +10 bonus to scent-based Awareness checks (see \\pcref{Senses}).
      `,
      rank: 5,
      scaling: {
        7: 'For each target, you can choose any two of the listed enhancements.',
      },
      type: 'Attune (target)',
    },

    {
      name: 'Dragon Breath',

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} damage of your chosen type.`,
        targeting: `
          Choose one of the following damage types: acid, cold, electricity, or fire.
          For the duration of this spell, you can breath that type of energy like a dragon as a standard action.
          When you do, make an attack vs. Reflex against everything within a \\largearea cone from you.
          After you use this ability, you \\glossterm{briefly} cannot use it again.
        `,
      },
      rank: 4,
      scaling: 'damage',
      type: 'Attune',
    },

    {
      name: 'Cleansing Bodymorph',

      effect: `
        You or one \\glossterm{ally} within \\medrange can remove a \\glossterm{condition}.
        This cannot remove conditions caused by \\abilitytag{Compulsion} or \\abilitytag{Emotion} abilities.
      `,
      rank: 4,
    },

    {
      name: 'Cripple',

      attack: {
        hit: `
          The target takes 1d6 physical damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 1,
      scaling: 'damage',
    },

    {
      name: 'Mighty Cripple',

      attack: {
        hit: `
          The target takes 2d10 + \\glossterm{power} physical damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange.
        `,
      },
      rank: 5,
      scaling: 'damage',
    },

    {
      name: 'Flense',

      attack: {
        hit: `
          The target takes 2d6 physical damage.
          If it loses \\glossterm{hit points} from this damage, it is \\vulnerable to all damage as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange.
        `,
      },
      rank: 4,
      scaling: 'damage',
    },
  ],
  rituals: [
    {
      name: 'Create Handholds',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{unattended}, \\glossterm{mundane} wall up to 50 feet high and 10 feet wide within \\medrange.
        You create handholds in the target, making it easier to climb.
        This reduces the \\glossterm{difficulty value} to climb the object by 10.
        When this effect ends, the handholds disappear.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Craft Object',

      castingTime: 'special',
      effect: `
        Choose any number of unattended, nonmagical objects within \\shortrange.
        You make a Craft check to transform the subjects into a new item (or items) made of the same materials.
        You require none of the tools that would normally be necessary, such as an anvil and furnace.
        The total size of all targets combined must be Medium size or smaller.

        This ritual takes time equal to one tenth of the time that would normally be required to craft the object, to a minimum of one hour.
      `,
      rank: 3,
    },

    {
      name: 'Craft Large Object',

      castingTime: 'special',
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Large.
        `,
        name: 'Craft Object',
      },
      rank: 5,
    },

    {
      name: 'Craft Huge Object',

      castingTime: 'special',
      functionsLike: {
        exceptThat: `
          the maximum combined size of all targets increases to Huge.
        `,
        name: 'craft object',
      },
      rank: 7,
    },

    {
      name: 'Morph Weapon',

      castingTime: 'one minute',
      effect: `
        Choose one \\glossterm{unattended} manufactured weapon within \\medrange.
        The target changes into another weapon from the same weapon group.
        At least one ritual participant must be proficient with that weapon group.
        You cannot change it into an exotic weapon in this way.
        When this effect ends, the target returns to its original shape.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Morph Exotic Weapon',

      castingTime: 'one minute',
      functionsLike: {
        exceptThat: `you can also change the target into an exotic weapon.`,
        name: 'morph weapon',
      },
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Fortify',

      castingTime: 'one hour',
      effect: `
        Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
        Unlike most abilities, this ritual can affect individual parts of a whole object.

        % How should this affect Strength break difficulty value?
        The target gains a +5 \\glossterm{magic bonus} to its \\glossterm{damage resistance}.
        If the target is moved, this effect ends.
        Otherwise, it lasts for one year.
      `,
      rank: 1,
      type: 'Attune',
    },

    {
      name: 'Enduring Fortify',

      // original targets: One \glossterm{unattended}, nonmagical object or part of an object of up to Large size.
      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'fortify',
      },
      rank: 4,
    },

    {
      name: 'Enduring Empowered Fortify',

      // original targets: Empowered Fortify
      castingTime: '24 hours',
      functionsLike: {
        exceptThat: `
          the effect lasts for one hundred years.
        `,
        name: 'Empowered fortify',
      },
      rank: 5,
    },

    {
      name: 'Empowered Fortify',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{damage resistance} increases to 10.
        `,
        name: 'fortify',
      },
      rank: 4,
      type: 'Attune',
    },

    {
      name: 'Supreme Fortify',

      castingTime: 'one hour',
      functionsLike: {
        exceptThat: `
          the bonus to \\glossterm{damage resistance} increases to 15.
        `,
        name: 'fortify',
      },
      rank: 7,
      type: 'Attune',
    },

    {
      name: 'Ironwood',

      castingTime: '24 hours',
      effect: `
        One Medium or smaller \\glossterm{unattended}, nonmagical wooden object within \\shortrange is transformed into ironwood.
        While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
        Metallic armor and weapons, such as full plate, can be crafted from ironwood.
      `,
      rank: 4,
    },

    {
      name: 'Purify Sustenance',

      castingTime: 'one hour',
      effect: `
        All food and water in a single square within \\shortrange is purified.
        Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
        This does not prevent subsequent natural decay or spoiling.
      `,
      rank: 1,
    },

    {
      name: 'Awaken',

      castingTime: '24 hours',
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
    },

    {
      name: 'Air Breathing',

      castingTime: 'one minute',
      effect: `
        Choose one Large or smaller ritual participant.
        The target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.
      `,
      rank: 3,
      type: 'Attune',
    },

    {
      name: 'Gills',

      castingTime: 'one minute',
      effect: `
        Choose one Large or smaller ritual participant.
        The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
      `,
      rank: 3,
      type: 'Attune',
    },
    {
      name: "Mystic Lock",

      castingTime: "one minute",
      effect: `
        Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
        In addition, choose a Fine object within \\shortrange.
        The primary target becomes magically locked.
        It can be unlocked with a Devices check with a \\glossterm{difficulty value} of 25.
        The \\glossterm{difficulty value} to break it open forcibly increases by 10.

        When the Fine object touches the sealed object, this ritual is \\glossterm{suppressed} for one minute, allowing the object to be opened normally.
      `,
      rank: 2,
      type: "Attune",
    },

    {
      name: "Greater Mystic Lock",

      castingTime: "one hour",
      functionsLike: {
        exceptThat: `
          the \\glossterm{difficulty value} to unlock the object with a Devices check is instead equal to 35.
            In addition, the \\glossterm{difficulty value} to break it open increases by 20 instead of by 10.
        `,
        name: "mystic lock",
      },
      rank: 4,
      type: "Attune",
    },
  ],
};
