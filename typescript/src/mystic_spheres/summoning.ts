import { MysticSphere } from ".";

export const summoning: MysticSphere = {
  name: "Summoning",
  shortDescription: "Summon creatures to fight with you.",
  sources: ["arcane", "divine", "nature", "pact"],

  cantrips: [
    {
      name: "Minor Summoning",

      functionsLike: {
        exceptThat: `
          it has the \\abilitytag{Sustain} (standard) tag instead of the \\abilitytag{Attune} (self) tag.
        `,
        name: "summon monster",
      },
      focus: false,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (standard)",
    },
  ],
  spells: [
    {
      name: "Summon Monster",

      effect: `
        You summon a creature in an unoccupied square on stable ground within \\medrange.
        It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
        Regardless of the appearance and size chosen, the creature's statistics use the values below.
        If a summoned creature gains a \\glossterm{vital wound} or has no hit points remaining at the end of a phase, it disappears.

        \\begin{itemize}
          \\item Its \\glossterm{fatigue tolerance} is 0, and it cannot choose to take actions that would give it \\glossterm{fatigue levels}.
          \\item Its \\glossterm{hit points} are equal to the base value for your level (see \\tref{Character Advancement}).
          \\item It has no \\glossterm{damage resistance}.
          \\item Each of its \\glossterm{defenses} is equal to 4 \\add your level.
          \\item Its \\glossterm{accuracy} is equal to your level \\add half your base Perception \\sub 2.
          \\item Its \\glossterm{land speed} is 30 feet.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm{minor action}.
        There are only two actions it can take.
        As a \\glossterm{move action}, it can move as you direct.
        As a standard action, it can make a melee \\glossterm{strike} against a creature within its \\glossterm{reach}.
        If it hits, it deals 1d6 physical damage.
        The subtypes of damage dealt by this attack depend on the creature's appearance, but are limited to bludgeoning, piercing, and slashing damage.
        Most animals bite or claw their foes, which deals bludgeoning and slashing damage.

        If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
        Summoned creatures have no mind or independent agency, and will not act on their own even if attacked.
      `,
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Offensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          It gains a +1 \\glossterm{accuracy} bonus and a +2d damage bonus with its attacks, but its \\glossterm{hit points} are halved and it takes a -1 penalty to all \\glossterm{defenses}.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Greater Summon Offensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          It gains a +2 \\glossterm{accuracy} bonus and a +4d damage bonus with its attacks, but its \\glossterm{hit points} are halved and it takes a -1 penalty to all \\glossterm{defenses}.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Supreme Summon Offensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          It gains a +3 \\glossterm{accuracy} bonus and a +6d damage bonus with its attacks, but its \\glossterm{hit points} are halved and it takes a -1 penalty to all \\glossterm{defenses}.
        `,
        name: "summon monster",
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Defensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more defensively inclined.
          It gains a +1 bonus to all defenses.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Greater Summon Defensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more defensively inclined.
          It gains a +2 bonus to all defenses, and it gains a +2d damage bonus with its attacks.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Supreme Summon Defensive Monster",

      functionsLike: {
        exceptThat: `
          the summoned creature is more defensively inclined.
          It gains a +3 bonus to all defenses, and it gains a +4d damage bonus with its attacks.
        `,
        name: "summon monster",
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Ramming Summon",

      attack: {
        hit: `The subject takes 1d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\medrange.
          You summon a creature with a large horn or horns, such a moose, that rams into the subject with great force before disappearing.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Ramming Summon",

      attack: {
        hit: `The subject takes 4d6 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\longrange.
          You summon a large creature with a large horn or horns, such a rhinoceros, that rams into the subject with great force before disappearing.
        `,
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Trampling Summon",

      attack: {
        hit: `Each subject takes 1d8 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
        Make an attack vs. Reflex against everything on solid ground in a \\medarealong, 5 ft. wide line from you.
        You summon a Medium creature that tramples through the area before disappearing.
        The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Greater Trampling Summon",

      attack: {
        hit: `Each subject takes 2d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Reflex against everythong on solid ground in a \\largearealong, 10 ft. wide line from you.
          You summon a Large creature that tramples through the area before disappearing.
          The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Supreme Trampling Summon",

      attack: {
        hit: `Each subject takes 4d6 + half \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Reflex against everything on solid ground in a \\hugearealong, 20 ft. wide line from you.
          You summon a horde of creatures that trample through the area before disappearing.
          The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 6,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Instant",
    },

    {
      name: "Summon Unicorn",

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a unicorn.
        Its attacks deal 2d6 piercing damage, and you can command it to heal instead of attack.
        If you do, during each \\glossterm{action phase} it causes one of your \\glossterm{allies} within \\shortrange of it to regain 2d8 \\glossterm{hit points}.
        You can tell it which creature to heal.
        If you do not instruct it to heal a specific creature, it will automatically heal the ally closest to it that has lost at least one hit point.
        `,
        name: "summon defensive monster",
      },
      rank: 6,
      scaling: { special: "The damage and healing both increase by +1d for each rank beyond 6." },
      tags: ['Healing', "Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Weapon",

      functionsLike: {
        exceptThat: `
        it has the following differences.
        It has the \\abilitytag{Sustain} (minor) tag instead of the \\abilitytag{Attune} (self) tag.
        The summoned creature takes the form of a melee weapon of your choice that you are proficient with.
        It is sized appropriately to be wielded by a creature of your size.
        It floats three feet off the ground, and has a 30 foot \\glossterm{fly speed} instead of a \\glossterm{land speed}, with good \\glossterm{maneuverability} and a maximum height of 15 feet (see \\pcref{Flying}).
        The creature's accuracy and damage are based on your chosen weapon, and it gains the effect of the weapon's normal tags (see \\pcref{Weapon Tags}).
        Its \\glossterm{power} is 0.
        The weapon is considered to be held in two hands if possible, which can increase the damage dealt by Versatile Grip weapons (see \\pcref{Weapon Tags}).

        You cannot control the summoned weapon's actions.
        Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm{movement phase}, following that creature to the best of its abilities.
        During the \\glossterm{action phase}, it makes a melee \\glossterm{strike} against a creature within its \\glossterm{reach}.
        The weapon prefers to avoid accuracy and damage penalties that would be imposed by cover or special weapon grips.
        It choses randomly if all possible targets are equally easy to attack.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Aerial Weapon",

      functionsLike: {
        exceptThat: `
          the weapon's maximum height above the ground is increased to 240 feet.
          This allows the weapon to fly up to fight airborne foes.
          In addition, the weapon's damage bonus is increased to +3d.
        `,
        name: "summon weapon",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Summon Ballista",

      functionsLike: {
        exceptThat: `
          it creates a fully functional Large ballista instead of a weapon.
          The ballista functions like any other weapon, with the following exceptions.

          It cannot move, and makes ranged \\glossterm{strikes} instead of melee strikes.
          Its attacks have a maximum range of 120 feet and deal piercing damage.
          In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.
        `,
        name: "summon weapon",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Summon Earth Elemental",

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an earth elemental.
        Its attacks deal 2d8 bludgeoning damage.
        It has \\glossterm{damage resistance} equal to half its maximum \\glossterm{hit points}.
        `,
        name: "summon monster",
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Water Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an water elemental.
        Its attacks deal 1d8 bludgeoning damage.
        It has a 30 foot \\glossterm{swim speed}, and it suffers no penalties for fighting underwater (see \\pcref{Underwater Combat}).
        However, it is \\glossterm{vulnerable} to electricity damage.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Air Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an air elemental.
        Its attacks deal 2d6 bludgeoning damage.
        It has a 30 foot \\glossterm{fly speed} with good \\glossterm{maneuverability}.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Fire Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a fire elemental.
        Its attacks deal 1d8 fire damage.
        In addition, it is immune to fire damage.
        `,
        name: "summon monster",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Bear",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the creature appears to be a Medium bear.
        Its attacks deal 1d10 bludgeoning and slashing damage.
        In addition, it suffers no penalty for attacking in a grapple.
        As a standard action, it can make a \\textit{grapple} attack against a creature within its \\glossterm{reach}.
        While grappling, the manifested creature can either make a strike or attempt to escape the grapple.
        `,
        name: "summon monster",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Mount",

      functionsLike: {
        exceptThat: `
        you must also choose yourself or an \\glossterm{ally} within \\medrange to ride the summoned creature.
        The summoned creature appears to be either a Large horse or a Medium pony.
        It comes with a bit and bridle and a riding saddle, and will only accept the subject as a rider.
        The creature follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: {
        4: `The creature gains a +1 bonus to its defenses.`,
        6: `The defense bonus increases to +2.`,
      },
      tags: ["Manifestation"],
      type: "Attune (target)",
    },

    {
      name: "Summon Wolfpack",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        it summons a pack of four Medium wolf-shaped creatures instead of a single creature.
        Their attacks deal 2d10 bludgeoning and piercing damage.
        Each creature has a -2 penalty to \\glossterm{accuracy} and \\glossterm{defenses} compared to a normal summoned creature.
        In addition, each creature has half the hit points of a normal summoned creature.
        % TODO: wording?
        You must command the creatures as a group, rather than as individuals.
        Each creature obeys your command to the extent it can.
        `,
        name: "summon monster",
      },
      rank: 7,
      tags: ["Manifestation"],
      type: "Attune (self)",
    },

    {
      name: "Summon Pegasus",

      // original targets: One unoccupied location on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be either a Large or Medium pegasus.
        % TODO: wording of "trained as a mount"?
        It has a 30 foot \\glossterm{fly speed}, a maximum height of 120 feet, and is trained as a mount (see \\pcref{Flying}).
        `,
        name: "summon mount",
      },
      rank: 5,
      scaling: { 7: `The creature gains a +1 bonus to its defenses.` },
      tags: ["Manifestation"],
      type: "Attune (target)",
    },

    {
      name: "Summon Asp",

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a snake.
        Its attacks deal 2d6 bludgeoning and piercing damage.
        Whenever its strike causes a living creature to lose \\glossterm{hit points}, the damaged creature becomes \\glossterm{poisoned} with asp venom (see \\tref{Typical Poisons}).
        It is immediately \\dazed while it is poisoned.
        The poison's third stage causes the subject to become \\stunned as long as it is poisoned.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (self)",
    },
  ],
  rituals: [
    {
      name: "Ritual Mount",

      castingTime: "one minute",
      effect: `
        Choose yourself or one \\glossterm{ally} within \\medrange.
        This ritual summons your choice of a Large light horse or a Medium pony to serve as a mount.
        The creature appears in an unoccupied location on stable grond within \\medrange.
        It comes with a bit and bridle and a riding saddle, and will only accept the chosen creature as a rider.
        It has the same statistics as a creature from the \\spell{summon monster} spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
      `,
      rank: 2,
      tags: ["Manifestation"],
      type: "Attune (ritual)",
    },
  ],
};
