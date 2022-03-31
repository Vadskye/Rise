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
        If a summoned creature gains a \\glossterm{vital wound} or has no hit points remaining at the end of a phase, it disappears.
        Regardless of the appearance and size chosen, the creature's statistics use the values below.

        \\begin{itemize}
          \\item Its \\glossterm{fatigue tolerance} is 0, and it cannot choose to take actions that would give it \\glossterm{fatigue levels}.
          \\item Its \\glossterm{hit points} are equal to the standard value for your your level (see \\tref{Hit Points and Damage Resistance}).
          \\item It has no \\glossterm{damage resistance}.
          \\item Each of its \\glossterm{defenses} is equal to 5 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to half your level \\add half your Perception \\sub 2.
          \\item Its \\glossterm{land speed} is 30 feet.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm{minor action}.
        There are only two actions it can take.
        As a \\glossterm{move action}, it can move as you direct.
        As a standard action, it can make a melee \\glossterm{strike} against a creature within its \\glossterm{reach}.
        If it hits, it deals 1d4 physical damage.
        This damage is improved by your Willpower as normal for magical attacks.
        The subtypes of damage dealt by this attack depend on the creature's appearance, but are limited to bludgeoning, piercing, and slashing damage.

        If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
        Summoned creatures have no mind or independent agency, and will not act on their own even if attacked.
      `,
      rank: 1,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
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
      type: "Attune (deep, self)",
    },

    {
      name: "Ramming Summon",

      attack: {
        hit: `The target takes 1d8 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\medrange.
          You summon a creature with a large horn or horns, such as a moose, that rams into the target with great force before disappearing.
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
        hit: `The target takes 2d10 + \\glossterm{power} bludgeoning damage.`,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\longrange.
          You summon a large creature with a large horn or horns, such a rhinoceros, that rams into the target with great force before disappearing.
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
        hit: `Each target takes 1d6 + half \\glossterm{power} bludgeoning damage.`,
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
        hit: `Each target takes 1d10 + half \\glossterm{power} bludgeoning damage.`,
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
        hit: `Each target takes 2d10 + half \\glossterm{power} bludgeoning damage.`,
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
      name: "Summon Weapon",

      effect: `
        You summon a weapon in an unoccupied square on stable ground within \\medrange.
        It takes the form of a weapon of your choice that you are proficient with, though in reality it is a manifestation of magical energy.
        It is sized appropriately to be wielded by a creature of your size.
        If a summoned weapon gains a \\glossterm{vital wound} or has no hit points remaining at the end of a phase, it disappears.
        The summoned weapon's statistics use the values below.

        \\begin{itemize}
          \\item Its \\glossterm{fatigue tolerance} is 0, and it cannot choose to take actions that would give it \\glossterm{fatigue levels}.
          \\item Its \\glossterm{hit points} are equal to half the standard value for your your level (see \\tref{Hit Points and Damage Resistance}).
          \\item It has no \\glossterm{damage resistance}.
          \\item Each of its \\glossterm{defenses} is equal to 4 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to half your level \\add half your Perception \\sub 2, plus any accuracy modifier for the chosen weapon.
          \\item It has a 30 foot \\glossterm{fly speed} instead of a \\glossterm{land speed}, with good \\glossterm{maneuverability} and a maximum height of 5 feet.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        You cannot control the summoned weapon's actions.
        Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm{movement phase}, following that creature to the best of its abilities.
        During the \\glossterm{action phase}, it makes a melee \\glossterm{strike} against a creature within its \\glossterm{reach}.
        The weapon prefers to avoid accuracy and damage penalties that would be imposed by cover or special weapon grips.
        It choses randomly if all possible targets are equally easy to attack.
        If it hits, it deals damage appropriate for your chosen weapon.
        This damage is improved by your Willpower as normal for magical attacks.
      `,
      rank: 3,
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
          In addition, the weapon gains a +1d damage bonus.
        `,
        name: "summon weapon",
      },
      rank: 5,
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

          The ballista deals 1d10 damage with its attacks.
          It cannot move, and makes projectile \\glossterm{strikes} instead of melee strikes.
          Its attacks deal piercing damage and have \\glossterm{range limits} of 90/360.
          The ballista chooses to attack the creature farthest from it instead of the creature closest to it, though it avoids taking \\glossterm{longshot} penalties unless there are no valid targets within close range.
        `,
        name: "summon weapon",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Sustain (minor)",
    },

    {
      name: "Summon Earth Elemental",

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an earth elemental.
        Its attacks deal 2d6 bludgeoning damage.
        It has \\glossterm{damage resistance} equal to half its maximum \\glossterm{hit points}.
        `,
        name: "summon monster",
      },
      rank: 5,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Summon Water Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an water elemental.
        Its attacks deal 1d6 bludgeoning damage.
        It has a 30 foot \\glossterm{swim speed}.
        However, it is \\glossterm{vulnerable} to electricity damage.
        `,
        name: "summon monster",
      },
      rank: 2,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Summon Air Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an air elemental.
        Its attacks deal 1d10 bludgeoning damage.
        It has a 30 foot \\glossterm{fly speed} with good \\glossterm{maneuverability}.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Summon Fire Elemental",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a fire elemental.
        Its attacks deal 1d6 fire damage.
        In addition, it is immune to fire damage.
        `,
        name: "summon monster",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Summon Bear",

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the creature appears to be a Medium bear.
        Its attacks deal 1d8 bludgeoning and slashing damage.
        In addition, it suffers no penalty for attacking in a grapple.
        As a standard action, it can make a \\textit{grapple} attack against a creature within its \\glossterm{reach}.
        While grappling, the manifested creature can either make a strike or attempt to escape the grapple.
        `,
        name: "summon monster",
      },
      rank: 3,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },

    {
      name: "Summon Mount",

      functionsLike: {
        exceptThat: `
        you must also choose yourself or an \\glossterm{ally} within \\medrange to ride the summoned creature.
        The summoned creature appears to be either a Large horse or a Medium pony.
        It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
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
      type: "Attune (deep, self)",
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
        Its attacks deal 1d10 bludgeoning and piercing damage.
        Whenever its strike causes a living creature to lose \\glossterm{hit points}, the damaged creature becomes \\glossterm{poisoned} with asp venom (see \\tref{Typical Poisons}).
        It is immediately \\dazed while it is poisoned.
        The poison's third stage causes the target to become \\stunned as long as it is poisoned.
        `,
        name: "summon monster",
      },
      rank: 4,
      scaling: "damage",
      tags: ["Manifestation"],
      type: "Attune (deep, self)",
    },
    {
      name: "Summon Annoying Insects",

      attack: {
        crit: `The condition must be removed twice before the effect ends.`,
        hit: `The target is \\dazed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        It's hard to concentrate on a fight when you keep being distracted by a swarm of mosquitoes that buzz right into your ears.
      `,
      rank: 1,
      scaling: "accuracy",
      tags: ["Emotion"],
      type: "Duration",
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
