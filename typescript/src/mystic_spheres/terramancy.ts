import { MysticSphere } from ".";

export const terramancy: MysticSphere = {
  name: "Terramancy",
  shortDescription: "Manipulate earth to crush foes.",
  sources: ["arcane", "domain", "nature"],

  cantrips: [
    {
      name: "Shape Earth",

      effect: `
        Choose one unattended, nonmagical body of earth or unworked stone you touch.
        You make a Craft check to alter the target (see \\pcref{Craft}), except that you do not need any special tools to make the check, such as a shovel or hammer and chisel.
        The maximum \\glossterm{damage resistance} of a material you can affect with this ability is equal to your \\glossterm{power}.

        % should be longer than polymorph's alter object ability
        Each time you cast this spell, you can accomplish work that would take up to five rounds with a normal Craft check.
      `,
      scaling: {
        2: `The amount of work you accomplish with the spell increases to one minute.`,
        4: `The amount of work you accomplish with the spell increases to two minutes.`,
        6: `The amount of work you accomplish with the spell increases to five minutes.`,
      },
      type: "Instant",
    },
  ],
  spells: [
    {
      name: "Rock Throw",

      attack: {
        hit: `The target takes 2d6 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if you are on a Medium or larger body of stone.
        `,
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Rock Throw",

      attack: {
        hit: `The target takes 4d8 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything within \\medrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if you are on a Medium or larger body of stone.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Crushing Gravity",

      attack: {
        hit: `
          The target takes 1d10 + half \\glossterm{power} bludgeoning damage.
          In addition, it is \\glossterm{briefly} \\slowed.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if the target is on a Medium or larger body of stone.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: [],
      type: "Instant",
    },

    {
      name: "Greater Crushing Gravity",

      attack: {
        hit: `
          The target takes 4d6 + half \\glossterm{power} bludgeoning damage.
          In addition, it is \\slowed as a \\glossterm{condition}.
        `,
        targeting: `
          Make an attack vs. Fortitude against anything within \\medrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if the target is on a Medium or larger body of stone.
        `,
      },
      rank: 5,
      scaling: "damage",
      tags: [],
      type: "Instant",
    },

    {
      name: "Shrapnel Blast",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} bludgeoning and piercing damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea cone from you.
          This attack gains a +2 \\glossterm{accuracy} bonus if you are on a Medium or larger body of stone.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Shrapnel Blast",

      attack: {
        hit: `Each target takes 4d6 + \\glossterm{power} bludgeoning and piercing damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea cone from you.
          This attack gains a +2 \\glossterm{accuracy} bonus if you are on a Medium or larger body of stone.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Earthcraft",

      effect: `
        You create up to three weapons, suits of body armor, or shields from a body of earth or stone within 5 feet of you.
        You can create any weapon, shield, or body armor that you are proficient with, and which could normally be made entirely from metal, except for heavy armor.
        The body targeted must be at least as large as the largest item you create.

        An item created with this spell functions like a normal item of its type, except that any \\glossterm{strikes} that you make with a weapon created with this ability are \\glossterm{magical} abilities, so you use your Willpower to determine your damage instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
      `,
      rank: 1,
      scaling: {
        3: `
          If you create body armor or a weapon, it can be created from special materials other than cold iron.
          The item's rank still cannot exceed your spellcasting rank with this spell, including any modifiers from special materials.
        `,
        5: `
          You can also create heavy armor.
        `,
        7: `
          This spell loses the \\abilitytag{Attune} tag.
          Instead, it lasts until you use it again or until you \\glossterm{dismiss} it as a \\glossterm{free action}.
        `,
      },
      type: "Attune (self)",
    },

    {
      name: "Earthspike",

      attack: {
        hit: `
          The target takes 1d4 piercing damage.
          If it loses \\glossterm{hit points} from this damage, it is \\slowed as a \\glossterm{condition}.
          This condition must be removed twice before the effect ends.
        `,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange that is on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus if the target is on a Medium or larger body of stone.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Greater Earthspike",

      attack: {
        hit: `The target takes 2d6 piercing damage.
        If it loses \\glossterm{hit points} from this damage, it is \\immobilized as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Armor against anything within \\shortrange that is on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus if the target is on a Medium or larger body of stone.
        `,
      },
      rank: 5,
      scaling: "accuracy",
      tags: ["Manifestation"],
      type: "Duration",
    },

    {
      name: "Meld into Stone",

      effect: `
        You and up to 100 pounds of nonliving equipment meld into one stone object you touch that is at least as large as your body.
        If you try to bring excess equipment into the stone, the spell fails without effect.

        As long as the spell lasts, you can move within the stone as if it was thick water.
        However, at least part of you must remain within one foot of the place you originally melded with the stone.
        You gain no special ability to breathe or see while embedded the stone, and you cannot speak if your mouth is within the stone.
        The stone muffles sound, but very loud noises may reach your ears within it.
        If you fully exit the stone, this spell ends.

        If this spell ends before you exit the stone, or if the stone stops being a valid target for the spell (such as if it is broken into pieces), you are forcibly expelled from the stone.
        When you are forcibly expelled from the stone, you take 4d8 bludgeoning damage and become \\stunned as a \\glossterm{condition}.
      `,
      rank: 3,
      scaling: {
        5: `Exiting the stone does not cause this spell to end.
            You can repeatedly exit and re-enter the stone as long as you maintain attunement to the spell.`,
        7: `You can leave tiny tunnels carrying air through the stone as you move through it, allowing you to effectively breathe within the stone.
            These trails disappear when this spell ends.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Tremor",

      attack: {
        crit: `Each target is also unable to stand up as a \\glossterm{condition}.`,
        // No relevant glance effect
        hit: `Each target is knocked \\prone.`,
        targeting: `
          Make an attack vs. Reflex against all Large or smaller creatures in a \\smallarea within \\medrange that are on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus against each target that is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You create an highly localized tremor that rips through the ground.
      `,
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Fissure",

      attack: {
        hit: `Each target takes 2d6 + half \\glossterm{power} bludgeoning damage.
        Each Large or smaller target that loses \\glossterm{hit points} from this damage is also knocked \\prone.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\smallarea within \\medrange that is on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus against each target that is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You create an intense but highly localized tremor that rips through the ground.
      `,
      rank: 4,
      scaling: "damage",
      type: "Instant",
    },

    {
      name: "Greater Earthquake",

      attack: {
        hit: `Each target takes 2d10 + half \\glossterm{power} bludgeoning damage.
        Each Huge or smaller target that takes damage this way is also knocked \\prone.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius within \\longrange that is on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus against each target that is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You create an intense tremor that rips through the ground.
      `,
      rank: 6,
      type: "Instant",
    },

    {
      name: "Swallowed by Earth",

      // losing line of effect compensates for recurring extra damage
      attack: {
        hit: `The target takes 2d10 bludgeoning damage.
        If it is Large or smaller and it loses \\glossterm{hit points} from this damage, it is swallowed by the earth as a \\glossterm{condition}.
        While it is swallowed by the earth, it is \\paralyzed and does not have \\glossterm{line of sight} or \\glossterm{line of effect} to any creature other than itself.
        At the end of each subsequent round, it takes 2d10 bludgeoning damage as the earth grinds it into paste.
        If the earth or stone it is swallowed by is destroyed or otherwise rendered unable to contain the creature, this effect ends.
        Special movement abilities such as teleportation can also remove the target from the fissure.`,
        targeting: `
          Make an attack vs. Reflex against one creature within \\medrange that is on a stable surface.
          This attack gains a +2 \\glossterm{accuracy} bonus if the target is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You open up a rift in the ground that swallows and traps a foe.
      `,
      rank: 7,
      type: "Duration",
    },

    {
      name: "Earthbind",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `
          As a \\glossterm{condition}, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
          It is \\slowed and unable to use any fly speed or glide speed.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\shortrange that is no more than 120 feet above a stable surface that could support its weight.
          This attack gains a +2 \\glossterm{accuracy} bonus if that surface is a Medium or larger body of stone.
        `,
      },
      rank: 1,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Distant Earthbind",

      functionsLike: {
        name: "earthbind",
        exceptThat: "the range increases to \\longrange.",
      },
      rank: 3,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Greater Earthbind",

      attack: {
        crit: `The target is \\immobilized instead of slowed.`,
        hit: `
          As a \\glossterm{condition}, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
          It is \\slowed and unable to use any fly speed or glide speed.
          This condition must be removed twice before the effect ends.
        `,
        targeting: `
          Make an attack vs. Fortitude against one creature within \\medrange that is no more than 120 feet above a stable surface that could support its weight.
          This attack gains a +2 \\glossterm{accuracy} bonus if that surface is a Medium or larger body of stone.
        `,
      },
      rank: 6,
      scaling: "accuracy",
      type: "Duration",
    },

    {
      name: "Quagmire",

      effect: `
        % TODO: wording to allow it to affect smaller parts of larger objects
        % TODO: define maximum resistance
        Choose one \\smallarea radius \\glossterm{zone} within \\longrange.
        All earth and stone in the area is softened into a thick sludge, creating a quagmire that is difficult to move through.
        The movement cost required to move out of each affected square within the area is quadrupled.
        This does not affect objects under structural stress, such as walls and support columns.
      `,
      rank: 4,
      scaling: { 6: `The area increases to a \\medarea radius.` },
      type: "Sustain (minor)",
    },

    {
      name: "Earthen Fortification",

      effect: `
        You construct a fortification made of packed earth within \\medrange.
        This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
        The squares can be placed at any angle and used to form any structure as long as that structure is stable.
        Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
        % TODO: define hit points and resistances of earth

        The fortifications form slowly, rather than instantly.
        The structure becomes complete at the end of the action phase in the next round after this spell is cast.
        This makes it difficult to trap creatures within structures formed.
      `,
      rank: 4,
      // TODO: define hit points and resistances of stone
      scaling: {
        6: `You can also construct fortifications from stone.
            This makes them more resistant to attack and allows the construction of more complex structures.`,
      },
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Earthglide",

      effect: `
        You can move through earth and unworked stone at a rate of 5 feet per round.
        This does not allow you to breathe while inside the earth or stone, so your ability to traverse long distances may be limited.
      `,
      rank: 5,
      scaling: { 7: `Your speed increases to be equal to half the \\glossterm{base speed} for your size.` },
      type: "Attune (self)",
    },

    {
      name: "Rocky Shell",

      effect: `
        You cover your body with two layers of rock that crumple when they take damage.
        The rock does not cover your joints, allowing you to move, though the shell increases your \\glossterm{encumbrance} by 2.
        Whenever you would take damage, you reduce that damage by 5, and one layer of rock is destroyed.
        When the last layer is destroyed, this ability provides no further benefit.

        If you take simultaneous damage from more sources than you have remaining layers, the remaining layers apply to the largest damage sources, and you take full damage from any lower damage values.
      `,
      rank: 1,
      scaling: {
        3: `The damage reduction increases to 10.`,
        5: `The damage reduction increases to 20.`,
        7: `The damage reduction increases to 40.`,
      },
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Earthen Anchor",

      effect: `
        You are immune to \\glossterm{knockback} or \\glossterm{push} effects from attacks, unless the effects come from an attack that scores a \\glossterm{critical hit}.
        This does not make you immune to \\glossterm{teleportation}, and does not affect movement effects used by your \\glossterm{allies}.
      `,
      rank: 1,
      scaling: {
        3: `You are also immune to \\glossterm{teleport} effects from attacks that are not critical hits.`,
        5: `You are immune to knockback and push effects from all attacks, including critical hits.`,
        7: `You are immune to teleport effects from all attacks, including critical hits.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Mass Earthen Anchor",

      functionsLike: {
        mass: true,
        name: "Earthen Anchor",
      },
      // narrative: '',
      rank: 3,
      scaling: {
        5: "Each target is also immune to \\glossterm{teleport} effects from attacks that are not critical hits.",
        7: `Each target is immune to knockback and push effects from all attacks, including critical hits.`,
      },
      type: "Attune (target)",
    },

    {
      name: "Volcano",

      attack: {
        hit: `Each target takes 1d10 + half \\glossterm{power} bludgeoning and fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\areasmall radius from a point on a stable surface within \\shortrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if that point is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You create a small volcano that bursts forth, showering nearby creatures in burning shrapnel.
      `,
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Volcano",

      attack: {
        hit: `Each target takes 2d8 + half \\glossterm{power} bludgeoning and fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\medarea radius from a point on a stable surface within \\medrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if that point is on a Medium or larger body of stone.
        `,
      },
      narrative: `
        You create a large volcano that bursts forth, showering nearby creatures in burning shrapnel.
      `,
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Supreme Volcano",

      attack: {
        hit: `Each target takes 4d8 + half \\glossterm{power} bludgeoning and fire damage.`,
        targeting: `
          Make an attack vs. Reflex against everything in a \\largearea radius from a point on a stable surface within \\longrange.
          This attack gains a +2 \\glossterm{accuracy} bonus if that point is on a Large or larger body of stone.
        `,
      },
      narrative: `
        You create an immense volcano that bursts forth, showering nearby creatures in burning shrapnel.
      `,
      rank: 7,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Personal Gravitation",

      effect: `
        Once per phase, while you are within 5 feet of an \\glossterm{unattended} object at least one size category larger than you, you can take a \\glossterm{free action} to adjust your personal gravity.
        When you do, gravity pulls you towards that surface instead of in the normal direction.
        This allows you to walk normally on walls or even ceilings.

        Whenever you change the direction that gravity pulls you, you must make a \\glossterm{difficulty value} 10 Balance check to keep your feet.
        Failure means you fall \\prone and your movement for that phase ends.
      `,
      rank: 2,
      scaling: {
        4: `
          The maximum distance increases to 15 feet.
          This can allow you to pull yourself towards distant objects, though you may take falling damage if you fall too far.
        `,
        6: `The maximum distance increases to 30 feet.`,
      },
      type: "Attune (self)",
    },

    {
      name: "Stonefist",

      effect: `
        You gain a slam \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
        The natural weapon deals 1d10 damage, as normal for a slam natural weapon.
        In addition, it has the Forceful \\glossterm{weapon tag} (see \\pcref{Weapon Tags}).
        Strikes using it are considered \\glossterm{magical} abilities, which means you use your Willpower to determine your damage dice instead of your Strength (see \\pcref{Dice Bonuses From Attributes}).
      `,
      rank: 2,
      narrative: `
        You encase one of your arms in a mighty stone bulkward, empowering it to crush your foes with sheer brute force.
      `,
      scaling: {
        4: `The knockback distance from the Forceful effect increases by 10 feet.`,
        6: `You are considered one size category larger than normal for the purpose of determining the Forceful effect.`,
      },
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Wall of Stone",

      effect: `
        You create a \\smallarealong \\glossterm{wall} of stone within \\medrange.
        Every square of the wall must be supported by solid ground.
        Nothing can pass through the wall until it is destroyed.

        The wall has \\glossterm{hit points} equal to three times your \\glossterm{power}.
        If the entire wall is directly on stone, its hit points are doubled.
        After using this ability, you \\glossterm{briefly} cannot use it or any other \\abilitytag{Barrier} ability.
      `,
      rank: 2,
      scaling: {
        3: `The area increases to a \\medarealong wall.`,
        5: `The area increases to a \\largearealong wall.`,
        7: `The area increases to a \\hugearealong wall.`,
      },
      tags: ["Barrier", "Manifestation"],
      type: "Sustain (attuneable, minor)",
    },
  ],
  rituals: [],
};
