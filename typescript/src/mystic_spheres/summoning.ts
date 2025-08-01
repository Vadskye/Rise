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
          the summoned creature is destroyed if it takes any damage.
          In addition, this has the \\abilitytag{Sustain} (standard) tag instead of the \\abilitytag{Attune} (deep) tag.
        `,
        name: 'summon monster',
      },
      scaling: 'accuracy',
      roles: ['attune'],
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
          \\item Its maximum \\glossterm{hit points} are equal to the standard value for a cleric of your level.
          \\item Its maximum \\glossterm{damage resistance} is equal to half its maximum hit points, ignoring any \\glossterm{enhancement bonuses} to hit points.
          \\item Each of its \\glossterm{defenses} is equal to 4 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to your accuracy, but it makes its own attack rolls.
          \\item Its \\glossterm{movement speed} is 30 feet, regardless of the number of legs it appears to have.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm{free action}.
        There are only two actions it can take: movement and attacking.
        It moves as you direct, and can \\ability{sprint} during the \\glossterm{action phase}.
        As a standard action, it can make a melee \\glossterm{strike} against a creature adjacent to it.
        If it hits, it deals \\damagerankzero.

        If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
        Summoned creatures have no mind or independent agency, and will not act on their own even if attacked.
      `,
      rank: 1,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Familiar',

      functionsLike: {
        exceptThat: `
          the summoned creature cannot attack, and it is destroyed if it takes any damage.
          However, it is able to interact with loose objects.
          You can command it to can pick up and carry one Tiny or smaller item.
          It still lacks the capacity to interact with devices of any complexity, such as doorknobs.
          This spell has the \\atSustain (attuneable, standard) tag instead of the \\atAttune (deep) tag.
        `,
        name: 'summon monster',
      },
      rank: 1,
      roles: ['narrative'],
      tags: ['Manifestation'],
      type: 'Sustain (attuneable, standard)',
    },

    {
      name: 'Summon Offensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          Its strikes deal \\damageranktwo.
          However, its \\glossterm{hit points} are halved, which also halves its damage resistance.
        `,
        name: 'summon monster',
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Empowered Summon Offensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is more offensively inclined.
          Its strikes deal \\damageranksix.
          However, its \\glossterm{hit points} are halved, which also halves its damage resistance.
        `,
        name: 'summon monster',
      },
      rank: 6,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Defensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is more defensively inclined.
          It gains a +2 bonus to all defenses.
        `,
        name: 'summon monster',
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Empowered Summon Defensive Monster',

      functionsLike: {
        exceptThat: `
          the summoned creature is much more defensively inclined.
          It gains a +2 bonus to all defenses, and its maximum \\glossterm{hit points} are doubled, which also doubles its maximum damage resistance.
        `,
        name: 'summon monster',
      },
      rank: 6,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Ramming Summon',

      // Treat push on HP loss as ~0.4 EA instead of 0.9 EA without the HP requirement
      attack: {
        hit: `
          \\damagerankone.
        `,
        injury: `
          You \\glossterm{push} the target up to 15 feet horizontally away from you.
          If this push is blocked by an obstacle, the target takes 1d6 damage.
        `,
        targeting: `
          Make an attack vs. Brawn against something that is \\glossterm{grounded} within \\shortrange.
        `,
      },
      narrative: `
          You summon a creature with a large horn or horns, such as a moose, that rams into the target with great force before disappearing.
      `,
      rank: 1,
      roles: ['burst', 'combo'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Ramming Horde',

      // Push with damage is rank 4. Bump it to rank 5 to account for the damage on
      // obstacle, then down to 4 for limited scope. By staying to a r1 area, a normal
      // damaging area spell would be dr4, so we get dr3 with the debuff.
      attack: {
        hit: `
          \\damagerankthree, and you \\glossterm{push} the target up to 15 feet horizontally away from you.
        `,
        missGlance: true,
        targeting: `
          Make an attack vs. Brawn against everything that is \\glossterm{grounded} in a \\medarealong, 10 ft. wide line from you.
        `,
      },
      narrative: `
        You summon a large creature with a large horn or horns, such a rhinoceros, that rams into the target with great force before disappearing.
      `,
      rank: 4,
      roles: ['burst', 'combo'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Plague of Rats',

      // r1 area allows drX. We give this spell drX+1 because it both attacks Armor and
      // has difficult terrain issues.
      attack: {
        hit: `
          \\damagerankthree.
        `,
        missGlance: true,
        targeting: `
          You summon a swarm of rats that run through and bite everything in a \\medarealong, 10 ft. wide line from you before disappearing.
          Make an attack vs. Armor against everything in the area.
          The length of this spell's area is affected by \\glossterm{difficult terrain} and similar movement impediments.
        `,
      },
      rank: 2,
      roles: ['clear'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Rushing Horde',

      functionsLike: {
        name: "rushing horde",
        exceptThat: "the damage increases to \\damageranksix.",
      },
      rank: 5,
      roles: ['clear'],
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
          \\item Its \\glossterm{hit points} are equal to the standard value for a wizard of your level.
          \\item It has no \\glossterm{damage resistance}.
          \\item Each of its \\glossterm{defenses} is equal to 4 \\add half your level.
          \\item Its \\glossterm{accuracy} is equal to your accuracy, but it makes its own attack rolls.
          \\item It has an average \\glossterm{fly speed} with a maximum height of 5 feet and no \\glossterm{walk speed}.
          \\item Its \\glossterm{movement speed} is 30 feet normally, or 20 feet if the weapon is \\weapontag{Heavy}.
          \\item It has no \\glossterm{attunement points}.
        \\end{itemize}

        You cannot control the summoned weapon's actions.
        Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm{movement phase}, following that creature to the best of its abilities.
        During your action, it makes a melee \\glossterm{strike} against a creature adjacent to it.
        The weapon prefers to avoid accuracy and damage penalties that would be imposed by cover or special weapon grips.
        It choses randomly if all possible targets are equally easy to attack.

        When the weapon hits, it deals damage appropriate for your chosen weapon.
        This damage is improved by your \\glossterm{magical power} as normal for \\magical attacks.
        You decide whether the weapon functions as if it was being held in either one or two hands.
      `,
      rank: 3,
      roles: ['attune'],
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
      roles: ['attune'],
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
          Its attacks deal \\damageranktwo and have \\glossterm{range limits} of 90/270.
          The ballista chooses to attack the creature farthest from it instead of the creature closest to it, though it avoids taking \\glossterm{longshot penalty} unless there are no valid targets within close range.
        `,
        name: 'summon weapon',
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Sustain (minor)',
    },

    {
      name: 'Summon Earth Elemental',

      functionsLike: {
        exceptThat: `
          the summoned creature appears to be an earth elemental.
          Its attacks deal \\damagerankfour, and have the \\atEarth tag.
          Its \\glossterm{damage resistance} is equal to its maximum \\glossterm{hit points}, ignoring enhancement bonuses to hit points.
          In addition, it is immune to \\atEarth attacks.
        `,
        name: 'summon monster',
      },
      rank: 5,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Earth', 'Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Water Elemental',

      functionsLike: {
        exceptThat: `
          the summoned creature appears to be an water elemental.
          Its attacks deal \\damagerankone, and have the \\atWater tag.
          It has a 30 foot \\glossterm{swim speed}.
          In addition, it is immune to \\atWater attacks.
          However, it is \\vulnerable to \\atElectricity attacks.
        `,
        name: 'summon monster',
      },
      rank: 2,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Air Elemental',

      functionsLike: {
        exceptThat: `
          the summoned creature appears to be an air elemental.
          Its attacks deal \\damagerankthree, and have the \\atAir tag.
          It has a 30 foot \\glossterm{fly speed} with a 30 foot \\glossterm{height limit}.
          In addition, it is immune to \\atAir attacks.
        `,
        name: 'summon monster',
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Air', 'Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Fire Elemental',

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be a fire elemental.
        Its attacks deal \\damageranktwo, and have the \\atFire tag.
        In addition, it is immune to \\atFire attacks.
        `,
        name: 'summon monster',
      },
      rank: 3,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Fire', 'Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Summon Bear',

      functionsLike: {
        exceptThat: `
          the creature appears to be a Medium bear.
          Its attacks deal \\damageranktwo.
          As a standard action, it can use the \\ability{grapple} ability against a creature adjacent to it (see \\pcref{Grapple}).
          While grappling, the manifested creature will automatically use the \\ability{maintain grapple} ability (see \\pcref{Maintain Grapple}).
        `,
        name: 'summon monster',
      },
      rank: 3,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Colony of Bees',

      // r0 area deals drX, -1dr for debuff, +1dr for double defense.
      attack: {
        hit: `
          \\damagerankone.
        `,
        injury: `
          The target is \\stunned as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          A swarm of bees appears in a \\smallarea cone-shaped \\glossterm{zone} from you.
          The bees disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to sting.

          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor and Fortitude against all creatures in the area.
          You gain a stacking +1 accuracy bonus with this spell each time that you sustain it, to a maximum of +4.
        `,
      },
      rank: 1,
      roles: ['clear', 'hazard'],
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Pack of Wolves',

      attack: {
        hit: `
          \\damagerankone.
          If the target is Large or smaller, it is knocked \\prone.
        `,
        missGlance: true,
        targeting: `
          A horde of wolves appears in a \\medarea radius \\glossterm{zone} from your location.
          The wolves disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to bite and trip your enemies.

          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor and Brawn against all \\glossterm{grounded} \\glossterm{enemies} in the area.
          You gain a stacking +1 accuracy bonus with this spell each time that you sustain it, to a maximum of +4.
        `,
      },
      rank: 3,
      roles: ['clear', 'hazard'],
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Murder of Crows',

      attack: {
        hit: `
          \\damagerankthree, and the target is \\dazzled as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          A swarm of crows appears in a \\largearea radius \\glossterm{zone} from your location.
          The crows disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to peck your enemies.

          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor and Reflex against all \\glossterm{enemies} in the area.
          You gain a stacking +1 accuracy bonus with this spell each time that you sustain it, to a maximum of +4.
        `,
      },
      rank: 5,
      roles: ['clear', 'hazard'],
      scaling: 'accuracy',
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Quiver of Cobras',

      // drX-1 for half area, -1dr for debuff, +1dr for double defense
      attack: {
        hit: `
          \\damageranksix, and the target is \\glossterm{briefly} \\slowed.
        `,
        injury: `
          The target is also slowed as a \\glossterm{condition}.
        `,
        missGlance: true,
        targeting: `
          A swarm of cobras appears in a \\largearea long, 10 ft.\\ wide line-shaped \\glossterm{zone} from you.
          The cobras disappear shortly after they reappear, so they do not block movement and attacking them is pointless, but they last long enough to bite your enemies.

          When you cast this spell, and during each of your subsequent actions, make an attack vs. Armor and Fortitude against all \\glossterm{grounded} \\glossterm{enemies} in the area.
          You gain a stacking +1 accuracy bonus with this spell each time that you sustain it, to a maximum of +4.
        `,
      },
      rank: 7,
      roles: ['clear', 'hazard'],
      tags: ['Manifestation', 'Sustain (standard)'],
    },

    {
      name: 'Summon Pegasus',

      functionsLike: {
        exceptThat: `
        the summoned creature appears to be either a Large or Medium pegasus.
        % TODO: wording of "trained as a mount"?
        It has a 30 foot \\glossterm{fly speed} with a height limit of 30 feet, and is trained as a mount (see \\pcref{Flight}).
        `,
        name: 'summon mount',
      },
      rank: 5,
      roles: ['attune'],
      scaling: { 7: `The creature gains a +1 bonus to its defenses.` },
      tags: ['Manifestation'],
      type: 'Attune (target)',
    },

    {
      name: 'Summon Asp',

      functionsLike: {
        exceptThat: `
          the summoned creature appears to be a snake.
          Its attacks deal \\damagerankthree.
          Whenever its strike causes a living creature to lose \\glossterm{hit points}, the damaged creature becomes \\glossterm{poisoned} with asp venom.
          Its stage 1 effect makes the target \\stunned while the poison lasts.
          Its stage 3 effect makes the target \\blinded while the poison lasts.
        `,
        name: 'summon monster',
      },
      rank: 4,
      roles: ['attune'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
      type: 'Attune (deep)',
    },

    {
      name: 'Drop Bear',

      attack: {
        hit: `
          \\damagerankfour.
        `,
        targeting: `
          Make an attack vs. Armor with a -4 accuracy penalty against something in \\shortrange.
        `,
      },
      narrative: `
        You summon a bear in midair that crashes down on your foe.
      `,
      rank: 1,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },

    {
      name: 'Mighty Drop Bear',

      attack: {
        hit: `
          \\damagerankseven, and any \\glossterm{extra damage} is doubled.
        `,
        targeting: `
          Make an attack vs. Armor with a -4 accuracy penalty against something in \\shortrange.
        `,
      },
      rank: 4,
      roles: ['burst'],
      scaling: 'accuracy',
      tags: ['Manifestation'],
    },
  ],
};
