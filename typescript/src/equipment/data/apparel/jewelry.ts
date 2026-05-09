import { Apparel } from '../../types';
import { skillItem } from './utils';

export function jewelry(): Apparel[] {
  return [...amulets(), ...rings()];
}

function amulets(): Apparel[] {
  return [
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Undead Control',
        rank: 3,
        short_description: 'Can control undead',
        description: `
            Whenever you would kill an undead creature with a healing ability, you may activate this amulet.
            If the creature's \\glossterm{character rank} is less than or equal to your rank, and it is not \\glossterm{elite}, it becomes \\dominated by you instead of dying.

            This effect lasts for 24 hours.
            You can only control one undead at a time in this way.
            If you activate this amulet again, the effect ends on any previously dominated undead.
            Whenever this effect ends for any reason, the previously dominated creature immediately dies.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Can permanently control some undead',
            description: `
                If the creature is \\trait{simple-minded}, this effect is permanent.
                It is still removed if you dominate a different undead.
            `,
          },
          {
            rank: 7,
            short_description: 'Can permanently control undead',
            description:
              "The effect is also permanent if the creature's character rank is less than yours, even if it is not simple-minded.",
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of the Undead Horde',
        rank: 5,
        short_description: 'Can control several undead',
        description: `
            This item functions like a \\mitem{amulet of undead control}, except that you can control up to three different undead creatures.
            Each individual creature must be \\trait{simple-minded}, and its \\glossterm{rank} must be at least two lower than yours.
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description: 'Can control many undead',
            description: 'You can control up to five undead rather than up to three.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Controlled Rage',
        rank: 2,
        short_description: 'Reduces defense penalties from \\ability{rage}',
        description: `
            Your penalties to Armor and Reflex defense from using the \\ability{rage} barbarian ability are reduced by 1.
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description: 'Removes defense penalties from \\ability{rage}',
            description:
              'The penalty reduction increases to 2, which normally removes the defense penalty entirely.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Mystic Rage',
        rank: 2,
        short_description: '\\ability{Rage} also affects magical attacks',
        description: `
            Your accuracy bonus from the \\ability{rage} barbarian ability also applies to \\magical abilities.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: '+1 magical power, and \\ability{rage} also affects magical attacks',
            description:
              'You also gain a +1 \\glossterm{enhancement bonus} to your \\magical \\glossterm{power}.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Divine Healing',
        rank: 2,
        short_description:
          'Grants +1d8 healing with \\ability{divine aid} and \\ability{lay on hands}',
        description: `
            When you use the \\ability{divine aid} cleric ability or the \\ability{lay on hands} paladin ability, the target regains an additional 1d8 hit points.
            This is still limited by half the target's maximum hit points unless you increase your fatigue, as normal.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description:
              'Grants +2d8 healing with \\ability{divine aid} and \\ability{lay on hands}',
            description: 'The extra healing increases to 2d8.',
          },
          {
            rank: 6,
            short_description:
              'Grants +4d8 healing with \\ability{divine aid} and \\ability{lay on hands}',
            description: 'The extra healing increases to 4d8.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Revivification',
        rank: 7,
        short_description: 'Reduces fatigue from \\ability{revivify}',
        description: `
            When you use the \\ability{revivify} cleric ability, you only increase your \\glossterm{fatigue level} by three instead of by four.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Shared Discipline',
        rank: 4,
        short_description: 'Using \\ability{cleansing discipline} also helps an adjacent ally',
        description: `
            Whenever you use the \\ability{cleansing discipline} fighter ability, one \\glossterm{ally} adjacent to you can also remove a \\glossterm{condition}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Using \\ability{cleansing discipline} also helps a nearby ally',
            description: 'The ally can be within \\medrange.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: "Distant Protector's Amulet",
        rank: 3,
        short_description: 'Increases range of \\ability{protect}',
        description: `
            When you use the \\ability{protect} fighter ability or the \\ability{divine protection} cleric ability, the ally can be within \\shortrange instead of adjacent.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Greatly increases range of \\ability{protect}',
            description: 'The range increases to \\medrange.',
          },
          {
            rank: 7,
            short_description: 'Greatly increases range of \\ability{protect}',
            description: 'The range increases to \\distrange.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Sturdy Companionship',
        rank: 3,
        short_description: 'Grants +1 defenses to animal allies',
        description: `
            Each creature you command with the \\ability{natural servant} druid ability or the \\ability{animal companion} ranger ability gains a +1 \\glossterm{enhancement bonus} to all of its defenses.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Grants +1 defenses and injury resistance to animal allies',
            description: "Each creature's \\glossterm{injury point} is also halved.",
          },
          {
            rank: 7,
            short_description: 'Grants +2 defenses and injury resistance to animal allies',
            description: 'The defense bonus increases to +2.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Perfect Equality',
        rank: 5,
        short_description: 'Improves \\ability{perfect body} on your lowest attribute',
        description: `
            If you have the \\ability{perfect body} monk ability, you gain a +1 \\glossterm{enhancement bonus} to your lowest physical attribute: Strength, Dexterity, or Constitution.
            If your two lowest physical attributes are equal, this amulet has no effect.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: "Holy Avenger's Amulet",
        rank: 3,
        short_description: 'Grants +1 accuracy with \\ability{smite} when avenging allies',
        description: `
            When you use the \\ability{smite} paladin ability, you gain a +1 \\glossterm{accuracy} bonus against creatures that dealt damage to one of your \\glossterm{allies} since your last turn.
            This accuracy bonus is doubled if the target caused one of your allies to gain a vital wound since your last turn.
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description: 'Grants +2 accuracy with \\ability{smite} when avenging allies',
            description: 'The accuracy bonus increases to +2.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: "Zealous Titan's Amulet",
        rank: 5,
        short_description:
          'Deal extra damage with \\ability{smite} using \\weapontag{Heavy} weapons',
        description: `
            When you use the \\ability{smite} paladin ability using a \\weapontag{Heavy} weapon, you deal \\glossterm{extra damage} equal to half your \\glossterm{power}.
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description:
              'Deal extra damage with \\ability{smite} using \\weapontag{Heavy} weapons',
            description: 'The extra damage increases to be equal to your power.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Twinhunter Amulet',
        rank: 3,
        short_description: 'Adds an additional target with \\ability{quarry}',
        description: `
            When you use the \\ability{quarry} ranger ability, you may target an additional creature.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Swarmhunter Amulet',
        rank: 6,
        short_description: 'Allows unlimited targets with \\ability{quarry}',
        description: `
            When you use the \\ability{quarry} ranger ability, you may target any number of creatures.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Distant Stealth',
        rank: 2,
        short_description: 'Increases range with \\ability{sneak attack}',
        description: `
            When you use the \\ability{sneak attack} rogue ability, you may target a creature within \\medrange instead of \\shortrange.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Increases range with \\ability{sneak attack}',
            description: 'The range increases to \\distrange.',
          },
          {
            rank: 7,
            short_description: 'Increases range and distant precision with \\ability{sneak attack}',
            description:
              'You also reduce your \\glossterm{longshot penalty} with \\ability{sneak attack} by 2.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Mighty Stealth',
        rank: 3,
        short_description: 'Can \\ability{sneak attack} with any weapon',
        description: `
            You can use the \\ability{sneak attack} rogue ability with any weapon.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Can \\ability{sneak attack} with any weapon for extra damage',
            description: `
                When you \\ability{sneak attack} with a \\weapontag{Heavy} weapon, it deals 1d6 \\glossterm{extra damage}.
            `,
          },
          {
            rank: 7,
            short_description: 'Can \\ability{sneak attack} with any weapon for extra damage',
            description: 'The extra damage increases to 2d10.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: "Exemplar's Amulet",
        rank: 2,
        short_description: 'Increase \\ability{skill exemplar} bonus with untrained skills by 1',
        description: `
            If you have the \\ability{skill exemplar} rogue ability, you gain a +1 \\glossterm{enhancement bonus} to all untrained skills.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description:
              'Increase \\ability{skill exemplar} bonus with untrained skills by 3',
            description: 'The bonus increases to +3.',
          },
          {
            rank: 7,
            short_description:
              'Increase \\ability{skill exemplar} bonus with untrained skills by 5',
            description: 'The bonus increases to +5.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Wild Might',
        rank: 3,
        short_description: '+1d4 damage, but increased chaos with \\ability{wildspell}',
        description: `
            When you use your \\ability{wildspell} sorcerer ability, the spell deals 1d4 \\glossterm{extra damage}.
            However, you take a -1 penalty to your wild magic rolls.
            If your result is 0 or less, you are the only target of the spell.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: '+1d8 damage, but increased chaos with \\ability{wildspell}',
            description: 'The extra damage increases to 1d8.',
          },
          {
            rank: 7,
            short_description: '+2d6 damage, but increased chaos with \\ability{wildspell}',
            description: 'The extra damage increases to 2d6.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Amulet of Wild Control',
        rank: 3,
        short_description: 'Reduces chaos with \\ability{wildspell}',
        description: `
            When you use the \\ability{wildspell} ability, instead of rolling 1d10 for your wild magic effect, you roll 2d6\\minus1.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Reduces and improves chaos with \\ability{wildspell}',
            description: 'The wild magic roll improves to 2d6.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Amulet',
      item: {
        name: 'Haranguing Amulet',
        rank: 1,
        short_description: 'Goad with \\ability{denounce the heathens}',
        description: `
            You can use the Intimidate skill in place of the Persuasion skill for the \\ability{denounce the heathens} cleric ability.
            When you do, each target is \\goaded by you instead of stunned.
        `,
        magical: true,
        upgrades: [],
        tags: ['Emotion', 'Attune'],
        rarity: 'Common',
      },
    },
  ];
}

function rings(): Apparel[] {
  return [
    {
      kind: 'Ring',
      item: {
        name: 'Baneswallow Ring',
        rank: 3,
        short_description: 'Can exert and remove a condition to gain power',
        description: `
            You can activate this ring as a standard action.
            When you do, you may remove a \\glossterm{condition} affecting you.
            If you remove a condition in this way, you are \\glossterm{briefly} \\empowered.

            After you activate this item, you increase your \\glossterm{fatigue level} by one.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Can remove a condition to gain power',
            description: 'Activating this ring does not increase your fatigue level.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Desperate Breath',
        rank: 1,
        short_description: 'Can exert to breathe briefly',
        description: `
            You can activate this item as a \\glossterm{minor action}.
            When you do, you increase your \\glossterm{fatigue level} by one, and you can breathe in clean, fresh air regardless of your environment for one minute.
            This can be used in emergencies to save yourself from drowning or other perils.
        `,
        magical: true,
        upgrades: [],
        tags: ['Air', 'Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Water Breathing',
        rank: 3,
        short_description: 'Allows breathing water like air',
        description: `
            You can breathe water as easily as a human breathes air.
            This does not grant you the ability to breathe other liquids.
        `,
        magical: true,
        upgrades: [],
        tags: ['Water', 'Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of the True Form',
        rank: 2,
        short_description: 'Resistant to form-altering attacks',
        description: `
            You are \\resistant to attacks from the \\sphere{polymorph} sphere.
            This bonus also applies against other attacks that significantly alter your shape, such as an aboleth's slime.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: 'Immune to form-altering attacks',
            description: 'You become immune instead of resistant.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    { kind: 'Ring', item: skillItem("Liar's Ring", 'Deception') },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Nourishment',
        rank: 2,
        short_description: 'Provides food and water',
        description: `
            You continuously gain nourishment, and no longer need to eat or drink.
            This ring must be worn for 24 hours before it begins to work.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Provides food, water, and sleep',
            description:
              'You also need only a quarter of your normal amount of sleep (or similar activity, such as elven trance) each day.',
          },
        ],
        tags: ['Creation', 'Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Hexward Ring',
        rank: 5,
        short_description: 'Grants +1 defenses against targeted magic',
        description: `
            You gain a +1 bonus to your defenses against \\glossterm{targeted} \\magical abilities.
            This does not protect you from abilities that affect an area.
        `,
        magical: true,
        upgrades: [],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Ring of Spell Investment',
        rank: 3,
        short_description: 'Can invest a spell to gain its effect later',
        description: `
            When you or an adjacent \\glossterm{ally} casts a spell that does not have the \\abilitytag{Attune} or \\abilitytag{Sustain} tags,
                you can invest the magic of the spell in the ring.
            If you do, the spell does not have its normal effect.
            All decisions about the spell's effect, except for targeting, must be made at the time that the spell is invested in this way.
            The \\textit{desperate exertion} ability cannot be used to affect the spell, either at the time it is invested or when it is activated.
            Only one spell can be stored this way.

            You can activate this ring as a standard action.
            When you do, you cause the effect of the last spell invested in the ring.
            You choose the area and targets affected by the spell at this time.
            This does not require \\glossterm{verbal components} or \\glossterm{somatic components}, even if they would normally be required to cast the spell.
            The spell's effect is determined based on the \\glossterm{power} and other abilities of the original caster who invested the spell into the ring, not yours.
            You do not have to have the ability to cast the spell to activate a spell in this way.

            After you use a spell in this way, the energy in the ring is spent, and you must invest a new spell to activate the ring again.
            Any lingering effects of spells activated through this ring automatically end after ten minutes, and whenever you invest a new spell into the ring.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: 'Can invest spells to gain their effects later',
            description:
              'You can invest up to two spells in the ring. When you activate the ring, you choose which spell to use.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Cleansing Ring',
        rank: 2,
        short_description: 'Can exert to remove a condition',
        description: `
            You can activate this ring as a standard action.
            When you do, you remove one \\glossterm{condition} affecting you.

            After you activate this item, you increase your \\glossterm{fatigue level} by one.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can remove a condition',
            description: 'Activating this item does not increase your fatigue level.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
    {
      kind: 'Ring',
      item: {
        name: 'Quickcleanse Ring',
        rank: 5,
        short_description: 'Can exert to quickly remove a condition',
        description: `
            You can activate this ring as a \\glossterm{minor action}.
            When you do, you remove one \\glossterm{condition} affecting you.

            After you activate this item, you increase your \\glossterm{fatigue level} by two.
        `,
        magical: true,
        upgrades: [
          {
            rank: 7,
            short_description: 'Can exert to quickly remove a condition',
            description: 'Activating this item only increases your fatigue level by one.',
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      },
    },
  ];
}
