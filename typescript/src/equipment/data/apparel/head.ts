import { Apparel } from '../../types';
import { attributeItem, skillItem, reliableSkillItem } from './utils';

export function head(): Apparel[] {
  return [
    ...blindfolds(),
    ...circlets(),
    ...crowns(),
    {
      kind: 'Veil',
      item: {
        name: "Whispering Veil",
        rank: 3,
        short_description: "Hear distant sounds on the wind",
        description: `
            This gossamer veil seems to whisper continuously.
            While you wear it over your head, you can hear faint, indistinct sounds carried on the wind.
            These might be fragments of conversations, animal calls, or music from many miles away.
        `,
        magical: true,
        upgrades: [],
        tags: ['Air', 'Auditory', 'Attune'],
        rarity: 'Relic',
      }
    },
  ];
}

function circlets(): Apparel[] {
  return [
    {
      kind: 'Circlet',
      item: {
        name: "Blind Seer's Circlet",
        rank: 2,
        short_description: "Increases range of blindsense and blindsight",
        description: `
            If you have \\trait{blindsense}, you increase its range by 30 feet.
            If you have \\trait{blindsight}, you increase its range by 15 feet.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: "Increases range of blindsense and blindsight",
            description: "Your blindsense increases by 60 feet, and your blindsight increases by 30 feet.",
          },
          {
            rank: 6,
            short_description: "Increases range of blindsense and blindsight",
            description: "Your blindsense increases by 120 feet, and your blindsight increases by 60 feet.",
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      }
    },
    { kind: 'Circlet', item: skillItem("Ruler's Circlet", "Persuasion") },
    { kind: 'Circlet', item: skillItem("Imperious Circlet", "Intimidate") },
    {
      kind: 'Circlet',
      item: {
        name: "Ocular Circlet",
        rank: 2,
        short_description: "Can allow you to see at distance",
        description: `
            You can activate this item as a standard action.
            When you do, a \\glossterm{scrying sensor} appears floating in the air in an unoccupied square within \\medrange.
            As long as you \\glossterm{sustain} the effect as a standard action, you see through the sensor instead of from your body.

            While viewing through the sensor, your visual acuity is the same as your normal body,
                except that it does not share the benefits of any \\magical effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: "Can allow you to quickly see at distance",
            description: "You can activate the item and sustain its effect as a \\glossterm{minor action}.",
          },
          {
            rank: 6,
            short_description: "Can allow you to quickly see at distance",
            description: "You can activate the item and sustain its effect as a \\glossterm{free action} once per turn.",
          },
        ],
        tags: ['Scrying', 'Attune'],
        rarity: 'Common',
      }
    },
    {
      kind: 'Circlet',
      item: {
        name: "Circlet of Desperate Visions",
        rank: 1,
        short_description: "Grants lingering benefits from \\ability{desperate exertion}",
        description: `
            Whenever you use the \\ability{desperate exertion} ability, you become \\glossterm{briefly} \\focused.
            This does not affect the initial ability that you used \\ability{desperate exertion} to change.
        `,
        magical: true,
        upgrades: [
          {
            rank: 4,
            short_description: "Grants lingering benefits from \\ability{desperate exertion}",
            description: "You are also \\glossterm{briefly} \\honed.",
          },
          {
            rank: 7,
            short_description: "Grants lingering benefits from \\ability{desperate exertion}",
            description: "You are also \\glossterm{briefly} \\empowered.",
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      }
    },
    { kind: 'Circlet', item: reliableSkillItem("Circlet of Reliable Observation", "Awareness, Social Insight, or Survival", "observation-based") },
    { kind: 'Circlet', item: reliableSkillItem("Circlet of Reliable Intuition", "Deduction, Knowledge, or Medicine", "intuition-based") },
    { kind: 'Circlet', item: attributeItem("Circlet of Perception", 'perception') },
    { kind: 'Circlet', item: attributeItem("Circlet of Willpower", 'willpower') },
    {
      kind: 'Circlet',
      item: {
        name: "Mask of Many Faces",
        rank: 2,
        short_description: "Copies the appearance of a familiar face",
        description: `
            This is a blank porcelain mask.
            As a standard action, you can don the mask while envisioning a face familiar to you.
            When you do, the mask molds to your face and takes on the appearance of the face you envisioned.
            This grants you a +3 \\glossterm{enhancement bonus} to Disguise checks to emulate that creature.
            You can remove the mask as a standard action, which returns it to its blank appearance.
        `,
        magical: true,
        upgrades: [],
        tags: ['Visual', 'Attune'],
        rarity: 'Relic',
      }
    },
    {
      kind: 'Circlet',
      item: {
        name: "Glasses of Novelty",
        rank: 3,
        short_description: "Notices small, seemingly insignificant details",
        description: `
            These appear to be a pair of simple spectacles.
            As a standard action, you can don the glasses and activate their effect.
            While active, the glasses force your eyes to look at only the most surprising or unexpected thing in your field of view.
            If that thing leaves your field of view, the glasses find a new thing to focus on at the start of your next turn.

            Each pair of glasses of novelty has its own perspective on what is surprising or unexpected, and the glasses have no memory of anything you learn or previous things they have seen.
            You can remove the glasses as a normal object interaction, which deactivates their effect.
        `,
        magical: true,
        upgrades: [],
        tags: ['Visual', 'Attune'],
        rarity: 'Relic',
      }
    },
    {
      kind: 'Circlet',
      item: {
        name: "Crown of Flowers",
        rank: 2,
        short_description: "Appear friendly to small animals",
        description: `
            While wearing this crown, wild animals that are Small or smaller perceive you to be friendly and nonthreatening.
            This does not grant you an ability to command them, though you can use Creature Handling as normal.
        `,
        magical: true,
        upgrades: [],
        tags: ['Emotion', 'Attune'],
        rarity: 'Relic',
      }
    },
  ];
}

function crowns(): Apparel[] {
  return [
    {
      kind: 'Crown',
      item: {
        name: "Radiant Crown",
        rank: 1,
        short_description: "Emits light",
        description: `
            This crown sheds \\glossterm{bright illumination} in a \\medarea radius.
            You can touch the crown as a \\glossterm{minor action} to suppress or resume the light.
        `,
        magical: true,
        upgrades: [
          {
            rank: 3,
            short_description: "Emits great light",
            description: "The area increases to a \\largearea radius.",
          },
          {
            rank: 5,
            short_description: "Emits vast light",
            description: "The area increases to a \\hugearea radius.",
          },
          {
            rank: 7,
            short_description: "Emits massive light",
            description: "The area increases to a \\gargarea radius.",
          },
        ],
        tags: ['Visual', 'Attune'],
        rarity: 'Common',
      }
    },
    {
      kind: 'Crown',
      item: {
        name: "Solar Crown",
        rank: 4,
        short_description: "Sheds brilliant light",
        description: `
            This crown sheds \\glossterm{brilliant illumination} in a \\medarea radius.
            You can touch the crown as a \\glossterm{minor action} to suppress or resume the light.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: "Sheds brilliant light",
            description: "The area increases to a \\hugearea radius.",
          },
        ],
        tags: ['Visual', 'Attune'],
        rarity: 'Common',
      }
    },
    {
      kind: 'Crown',
      item: {
        name: "Crown of Flame",
        rank: 3,
        short_description: "Can deal $dr3l damage around you",
        description: `
            This crown constantly burns harmlessly, emitting \\glossterm{bright illumination} in a \\smallarea radius.
            You can touch the crown as a standard action to activate it.
            When you do, a burst of flame erupts around you.
            Make an attack vs. Reflex against everything in a \\smallarea radius from you.
            Your minimum accuracy is $accuracy.
            \\hit $dr3l damage.
            \\miss Half damage.
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: "Can deal $dr5l damage around you",
            description: "The minimum accuracy increases to $accuracy, and the damage increases to $dr5l.",
          },
          {
            rank: 7,
            short_description: "Can deal $dr7l damage around you",
            description: "The minimum accuracy increases to $accuracy, and the damage increases to $dr7l.",
          },
        ],
        tags: ['Fire', 'Attune'],
        rarity: 'Common',
      }
    },
    {
      kind: 'Crown',
      item: {
        name: "Crown of Thunder",
        rank: 5,
        short_description: "Continously deafens nearby enemies",
        description: `
            The crown constantly emits a low-pitched rumbling.
            To you and your \\glossterm{allies}, the sound is barely perceptible.
            However, all other creatures within a \\medarea radius \\glossterm{emanation} from you hear the sound as a deafening, continuous roll of thunder.
            The noise blocks out all other sounds quieter than thunder, causing them to be \\deafened while they remain in the area.
        `,
        magical: true,
        upgrades: [],
        tags: ['Visual', 'Attune'],
        rarity: 'Common',
      }
    },
    {
      kind: 'Crown',
      item: {
        name: "Challenger's Crown",
        rank: 3,
        short_description: "Increases accuracy penalty on goaded foes by 1",
        description: `
            Each creature suffering penalties for being \\goaded by you takes an additional -1 \\glossterm{accuracy} penalty against creatures other than you.
        `,
        magical: true,
        upgrades: [
          {
            rank: 6,
            short_description: "Increases accuracy penalty on goaded foes by 2",
            description: "The penalty increases to -2.",
          },
        ],
        tags: ['Compulsion', 'Attune'],
        rarity: 'Common',
      }
    },
  ];
}

function blindfolds(): Apparel[] {
  return [
    {
      kind: 'Blindfold',
      item: {
        name: "Blindfold of the Third Eye",
        rank: 3,
        short_description: "Grants blindsight, blindsense, and blindness",
        description: `
            While you wear this blindfold covering your eyes, you gain \\trait{blindsight} with a 15 foot range and \\trait{blindsense} with a 60 foot range.
            You are also blind, as normal for wearing a blindfold.
            Shifting this blindfold to cover or stop covering your eyes requires a \\glossterm{free hand} (see \\pcref{Manipulating Objects}).
        `,
        magical: true,
        upgrades: [
          {
            rank: 5,
            short_description: "Grants blindsight, blindsense, and blindness",
            description: "The blindsense increases to 120 feet, and the blindsight increases to 30 feet.",
          },
          {
            rank: 7,
            short_description: "Grants blindsight, blindsense, and blindness",
            description: "The blindsense increases to 240 feet, and the blindsight increases to 60 feet.",
          },
        ],
        tags: ['Attune'],
        rarity: 'Common',
      }
    },
  ];
}
