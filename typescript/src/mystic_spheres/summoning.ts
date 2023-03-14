import { MysticSphere } from '.';

export const summoning: MysticSphere = {
  name: 'Summoning',
  shortDescription: 'Summon creatures to fight with you.',
  sources: ['arcane', 'divine', 'nature', 'pact'],

  cantrips: [
    {
      name: 'Summon Distraction',

      functionsLike: {
        exceptThat: `
          it has the \\abilitytag{Sustain} (standard) tag instead of the \\abilitytag{Attune} (deep) tag.
          In addition, it only has a single \\glossterm{hit point}.
        `,
        name: 'summon monster',
      },
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (standard)',
    },
  ],
  spells: [
    {
      name: 'Summon Monster',

      effect: `
        You summon a creature in an unoccupied square on stable ground within \\medrange.
        It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
        If a summoned creature gains a \\glossterm{vital wound} or has no hit points remaining at the end of a phase, it disappears.
        Regardless of the appearance and size chosen, the creature's statistics use the values below.

        \\begin{itemize}
          \\item It has no \\glossterm{resources}, and it cannot use abilities that would cause it to increase its \\glossterm{fatigue level}.
          \\item Its \\glossterm{hit points} and \\glossterm{damage resistance} are equal to the standard value for your your level (see \\tref{Character Advancement}).
          \\item Each of its \\glossterm{defenses} is equal to 5 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to half your level \\add half your Perception.
          \\item Its \\glossterm{land speed} is 30 feet.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm{free action}.
        There are only two actions it can take.
        As a \\glossterm{movement}, it can move as you direct.
        As a standard action, it can make a melee \\glossterm{strike} against a creature adjacent to it.
        If it hits, it deals \\damagerankzero{physical}.
        The subtypes of damage dealt by this attack depend on the creature's appearance, but are limited to bludgeoning, piercing, and slashing damage.

        If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
        Summoned creatures have no mind or independent agency, and will not act on their own even if attacked.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Offensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          Its strikes deal \\damageranktwolow{physical}.
          However, its \\glossterm{hit points} and \\glossterm{damage resistance} are halved.
        `,
        name: 'summon monster',
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Empowered Summon Offensive Monster',

      // +2 levels for +2acc, +2 levels for +1d
      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          Its strikes deal \\damageranksixlow{physical}.
          However, its \\glossterm{hit points} and \\glossterm{damage resistance} are halved.
        `,
        name: 'summon monster',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Defensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is more defensively inclined.
          It gains a +1 bonus to all defenses.
        `,
        name: 'summon monster',
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Empowered Summon Defensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is much more defensively inclined.
          It gains a +2 bonus to all defenses, and its \\glossterm{hit points} are doubled.
        `,
        name: 'summon monster',
      },
      rank: 6,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Ramming Summon',

      attack: {
        hit: `
          The target takes \\damagerankone{bludgeoning}.
          If it loses \\glossterm{hit points}, you \\glossterm{knockback} it up to 15 feet horizontally away from you.
        `,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\shortrange.
        `,
      },
      narrative: `
          You summon a creature with a large horn or horns, such as a moose, that rams into the target with great force before disappearing.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Efficient Ramming Summon',

      attack: {
        hit: `
          The target takes \\damagerankfour{bludgeoning}.
          If it takes damage, you \\glossterm{knockback} it up to 15 feet horizontally away from you.
        `,
        targeting: `
          Make an attack vs. Armor against anything on solid ground within \\medrange.
        `,
      },
      narrative: `
          You summon a large creature with a large horn or horns, such a rhinoceros, that rams into the target with great force before disappearing.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Trampling Summon',

      attack: {
        hit: `
          Each target takes \\damagerankone{bludgeoning}.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything on solid ground in a \\medarealong, 5 ft. wide line from you.
          You summon a Medium creature that tramples through the area before disappearing.
          The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Massive Trampling Summon',

      attack: {
        hit: `Each target takes \\damageranktwo{bludgeoning}.`,
        missGlance: true,
        targeting: `
          Make an attack vs. Reflex against everything on solid ground in a \\hugearealong, 10 ft. wide line from you.
          You summon a Large creature that tramples through the area before disappearing.
          The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Summon Weapon',

      effect: `
        You summon a weapon in an unoccupied square on stable ground within \\medrange.
        It takes the form of a weapon of your choice that you are proficient with, though in reality it is a manifestation of magical energy.
        It is sized appropriately to be wielded by a creature of your size.
        If a summoned weapon gains a \\glossterm{vital wound} or has no hit points remaining at the end of a phase, it disappears.
        The summoned weapon's statistics use the values below.

        \\begin{itemize}
          \\item It has no \\glossterm{resources}, and it cannot use abilities that would cause it to increase its \\glossterm{fatigue level}.
          \\item Its \\glossterm{hit points} are equal to the standard value for your your level (see \\tref{Character Advancement}).
          \\item It has no \\glossterm{damage resistance}.
          \\item Each of its \\glossterm{defenses} is equal to 4 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to half your level \\add half your Perception, plus any accuracy modifier for the chosen weapon.
          \\item It has a 30 foot \\glossterm{fly speed} and no \\glossterm{land speed}, with good \\glossterm{maneuverability} and a maximum height of 5 feet.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        You cannot control the summoned weapon's actions.
        Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm{movement phase}, following that creature to the best of its abilities.
        During your action, it makes a melee \\glossterm{strike} against a creature adjacent to it.
        The weapon prefers to avoid accuracy and damage penalties that would be imposed by cover or special weapon grips.
        It choses randomly if all possible targets are equally easy to attack.

        When the weapon hits hits, it deals damage appropriate for your chosen weapon.
        This damage is improved by your \\glossterm{magical power} as normal for \\magical attacks.
      `,
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Aerial Weapon',

      functionsLike: {
        exceptThat: `
          the weapon's maximum height above the ground is increased to 120 feet, and you can initially summon it in midair.
          This allows the weapon to fly up to fight airborne foes.
        `,
        name: 'summon weapon',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Summon Ballista',

      functionsLike: {
        exceptThat: `
          it creates a fully functional Large ballista instead of a weapon.
          The ballista functions like any other weapon, with the following exceptions.

          The ballista cannot move, and it makes projectile \\glossterm{strikes} instead of melee strikes.
          Its attacks deal \\damageranktwo{piercing} and have \\glossterm{range limits} of 90/270.
          The ballista chooses to attack the creature farthest from it instead of the creature closest to it, though it avoids taking \\glossterm{longshot} penalties unless there are no valid targets within close range.
        `,
        name: 'summon weapon',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Summon Earth Elemental',

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an earth elemental.
        Its attacks deal \\damagerankfourlow{bludgeoning}.
        It has \\glossterm{damage resistance} equal to half its maximum \\glossterm{hit points}.
        `,
        name: 'summon monster',
      },
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Water Elemental',

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an water elemental.
        Its attacks deal \\damagerankonelow{bludgeoning}.
        It has a 30 foot \\glossterm{swim speed}.
        However, it is \\glossterm{vulnerable} to electricity damage.
        `,
        name: 'summon monster',
      },
      rank: 2,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Air Elemental',

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be an air elemental.
        Its attacks deal \\damagerankthreelow{bludgeoning}.
        It has a 30 foot \\glossterm{fly speed} with good \\glossterm{maneuverability} and a 30 foot \\glossterm{height limit}.
        `,
        name: 'summon monster',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Fire Elemental',

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a fire elemental.
        Its attacks deal \\damageranktwolow{fire}.
        In addition, it is immune to fire damage.
        `,
        name: 'summon monster',
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Bear',

      // original targets: One unoccupied square on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the creature appears to be a Medium bear.
        Its attacks deal \\damageranktwolow{bludgeoning and slashing}.
        In addition, it suffers no penalty for attacking in a grapple.
        As a standard action, it can make a \\textit{grapple} attack against a creature adjacent to it.
        While grappling, the manifested creature can either make a strike or attempt to escape the grapple.
        `,
        name: 'summon monster',
      },
      rank: 3,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Horde -- Bees',

      attack: {
        hit: `
          Each target takes \\damagerankone{piercing}.
        `,
        missGlance: true,
        targeting: `
          A horde of bees appears in a \\smallarea cone-shaped \\glossterm{zone} from your location.
          The bees disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to sting your enemies.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 1,
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Horde -- Dogs',

      attack: {
        hit: `
          Each target takes \\damagerankone{physical}.
        `,
        missGlance: true,
        targeting: `
          A horde of dogs appears in a \\medarea radius \\glossterm{zone} from your location.
          The dogs disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to bite your enemies.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 3,
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Horde -- Wolves',

      attack: {
        hit: `
          Each target takes \\damagerankthree{physical}.
          Each Large or smaller creature that loses \\glossterm{hit points} from this damage falls \\prone.
        `,
        missGlance: true,
        targeting: `
          A horde of wolves appears in a \\medarea radius \\glossterm{zone} from your location.
          The wolves disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to bite your enemies.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 5,
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Horde -- Ravens',

      attack: {
        hit: `
          Each target takes \\damagerankfour{piercing}
          Each damaged creature is \\dazzled as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          A swarm of bees appears in a \\smallarea radius \\glossterm{zone} from your location.
          The bees disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to sting your enemies in the eyes.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 6,
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Horde -- Bears',

      // +2r for large, +2r for +1d
      attack: {
        hit: `
          Each target takes \\damageranksix{physical}.
        `,
        missGlance: true,
        targeting: `
          A horde of bears appears in a \\largearea radius \\glossterm{zone} from your location.
          The bears disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to maul your enemies.
          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor against all \\glossterm{enemies} in the area.
        `,
      },
      rank: 7,
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Pegasus',

      // original targets: One unoccupied location on stable ground within \medrange

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be either a Large or Medium pegasus.
        % TODO: wording of "trained as a mount"?
        It has a 30 foot \\glossterm{fly speed} with a height limit of 60 feet, and is trained as a mount (see \\pcref{Flight}).
        `,
        name: 'summon mount',
      },
      rank: 5,
      scaling: { 7: `The creature gains a +1 bonus to its defenses.` },
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },

    {
      name: 'Summon Asp',

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a snake.
        Its attacks deal \\damagerankthreelow{physical}.
        Whenever its strike causes a living creature to lose \\glossterm{hit points}, the damaged creature becomes \\glossterm{poisoned} with asp venom (see \\tref{Typical Poisons}).
        It is immediately \\dazed while it is poisoned.
        The poison's third stage causes the target to become \\stunned as long as it is poisoned.
        `,
        name: 'summon monster',
      },
      rank: 4,
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },
    {
      name: 'Summon Annoying Insects',

      attack: {
        crit: `The target is \\stunned instead of dazed.`,
        hit: `The target is \\dazed as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        It's hard to concentrate on a fight when you keep being distracted by a swarm of mosquitoes that buzz right into your ears.
      `,
      rank: 1,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Intense Summon Annoying Insects',

      attack: {
        crit: `The target is \\confused instead of dazed.`,
        hit: `The target is \\stunned as a \\glossterm{condition}.`,
        targeting: `
          Make an attack vs. Mental against one creature within \\medrange.
        `,
      },
      narrative: `
        It's hard to concentrate on a fight when you keep being distracted by a swarm of sand flies that buzz right into your eyes.
      `,
      rank: 5,
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
  ],
  rituals: [
    {
      name: 'Summon Mount',

      castingTime: 'one minute',
      effect: `
        Choose a ritual participant.
        This ritual summons your choice of a Large light horse or a Medium pony to serve as a mount for the chosen creature.
        The creature appears in an unoccupied location on stable grond within \\medrange.
        It comes with a bit and bridle and a riding saddle, and will only accept the chosen creature as a rider.
        It has the same statistics as a creature from the \\spell{summon defensive monster} spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
      `,
      rank: 2,
      tags: ['Manifestation'],
      type: 'Attune',
    },
  ],
};
