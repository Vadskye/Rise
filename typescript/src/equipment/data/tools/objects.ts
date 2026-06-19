import { Tool, StandardItem } from '../../types';

function createObject(data: Partial<StandardItem>, subskill: string): Tool {
  return {
    category: { kind: 'Permanent', subskill },
    item: {
      magical: false,
      rarity: 'Common',
      tags: [],
      attunement: 'Unrestricted',
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function objects(): Tool[] {
  return [
    ...transportation(),
    createObject(
      {
        name: 'Torch',
        rank: -1,
        short_description: 'Emits light',
        description: `
          \\label{Torch}
          As a standard action, you can light a torch if you have flint and steel or another source of flame handy.
          When you do, it sheds \\glossterm{bright illumination} in a \\smallarea radius.
          A torch burns for one hour before it is destroyed.
          You can extinguish the torch to preserve its remaining usable time.
        `,
        upgrades: [
          {
            rank: 1,
            short_description: 'Emits light for one week',
            description: `
              The torch burns for up to one week.
            `,
          },
        ],
      },
      'wood',
    ),
    createObject(
      {
        name: 'Lock',
        rank: 0,
        short_description: 'Devices 12 to unlock',
        description: `
          This is a lock.
          Opening the lock without the appropriate key requires a \\glossterm{difficulty value} 12 Devices check (see \\pcref{Devices}).
        `,
        upgrades: [
          {
            rank: 1,
            short_description: 'Devices 15 to unlock',
            description: `
              The Devices DV increases to 15.
            `,
          },
          {
            rank: 2,
            short_description: 'Devices 20 to unlock',
            description: `
              The Devices DV increases to 20.
            `,
          },
        ],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Lock, Mystic',
        rank: 4,
        magical: true,
        short_description: 'Devices 25 to unlock',
        description: `
          This is a magical lock.
          Opening the lock without the appropriate key requires a \\glossterm{difficulty value} 25 Devices check (see \\pcref{Devices}).
        `,
      },
      'metal',
    ),
    createObject(
      {
        name: 'Manacles',
        rank: 0,
        short_description: 'Flexibility 12 to escape',
        description: `
          This is a set of manacles designed for Medium humanoid creatures.
          Equivalent manacles might exist for creatures of different sizes or shapes.
          Escaping the manacles while they are being worn requires a \\glossterm{difficulty value} 12 Flexibility check or a difficulty value 15 Strength check (see \\pcref{Flexibility}).
        `,
        upgrades: [
          {
            rank: 1,
            short_description: 'Flexibility 15 to escape',
            description: `
              The Devices DV increases to 15.
            `,
          },
          {
            rank: 2,
            short_description: 'Flexibility 20 to escape',
            description: `
              The Flexibility DV increases to 20.
            `,
          },
        ],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Manacles, Mystic',
        rank: 4,
        magical: true,
        short_description: 'Flexibility 25 to escape',
        description: `
          This is a set of magical manacles designed for Medium humanoid creatures.
          Equivalent manacles might exist for creatures of different sizes or shapes.
          Escaping the manacles while they are being worn requires a \\glossterm{difficulty value} 25 Flexibility check or a difficulty value 20 Strength check (see \\pcref{Flexibility}).
          In addition, creatures held in the manacles cannot be \\glossterm{teleported} by any means.
        `,
      },
      'metal',
    ),
    createObject(
      {
        name: 'Battering Ram',
        rank: 0,
        short_description: 'Grants +3 bonus when breaking objects',
        description: `
          If you use this portable battering ram with two hands while trying to break down a door or similar object, you gain a \\plus3 bonus to your Strength check.
        `,
      },
      'wood',
    ),
    createObject(
      {
        name: "Outfit, Courtier's",
        rank: 1,
        short_description: 'Typical attire for courtiers in noble society',
        description: `
          This outfit includes fancy, tailored clothes in whatever fashion happens to be the current style in the courts of the nobles.
          It also includes appropriate jewelry.
        `,
      },
      'textiles',
    ),
    createObject(
      {
        name: "Outfit, Noble's",
        rank: 2,
        short_description: 'Typical attire for nobility',
        description: `
          This set of clothes is designed specifically to be expensive and to show it.
          Precious metals and gems are worked into the clothing.
        `,
      },
      'metal and textiles',
    ),
    createObject(
      {
        name: 'Outfit, Royal',
        rank: 4,
        short_description: 'Typical attire for royalty',
        description: `
          Royal clothes are ostentatious, with gems, gold, silk, and fur in abundance.
        `,
      },
      'leather, metal, and textiles',
    ),
    createObject(
      {
        name: 'Belt Lantern',
        rank: 1,
        short_description: 'Emits light without being held',
        description: `
          This is a belt with an attached lantern.
          As a standard action, you can light the lantern if you have flint and steel or another source of flame handy.
          When you do, it sheds \\glossterm{bright illumination} in a \\smallarea radius.

          The lantern burns for one hour before it must be refueled with oil.
          You can extinguish the lantern to preserve its remaining oil.

          The lantern is \\glossterm{loose equipment}, making it vulnerable to damage and being attacked directly.
          It has 10 hit points and 2 \\glossterm{hardness}.
          It takes double damage from \\atCold abilities.
          For details about repairing a damaged or broken belt lantern, see \\pcref{Common Craft Tasks}.
        `,
        upgrades: [
          {
            rank: 3,
            short_description: 'Emits light without being held',
            description: `
              The lantern's hit points increase to 15, and its hardness increases to 5.
            `,
          },
        ],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Bag of Shrinking',
        rank: 1,
        short_description: 'Shrinks items by one size category',
        description: `
          This bag appears to be a common Small cloth sack.
          However, it reduces the size of any \\glossterm{unattended}, nonmagical objects placed inside of it by one size category.
          This allows it to hold items of up to Medium size as long as they can fit inside the bag's opening, which is two feet in diameter.
          This reduction does not affect the weight of those objects.

          If this bag is destroyed, the items within it return to their original size.
        `,
        upgrades: [
          {
            rank: 3,
            short_description: 'Shrinks items by two size categories',
            description: `
              The bag reduces the size of contained objects by two size categories instead of one.
            `,
          },
        ],
      },
      'textiles',
    ),
    createObject(
      {
        name: 'Bag of Holding',
        rank: 4,
        short_description: 'Shrinks items by one size and weight category',
        description: `
          This bag appears to be a bulky Medium cloth sack.
          However, it reduces the size and weight of any \\glossterm{unattended}, nonmagical objects placed inside of it by one size category and weight category.
          This allows it to hold items of up to Large size as long as they can fit inside the bag's opening, which is five feet in diameter.

          If this bag is destroyed, the items within it return to their original size.
        `,
        upgrades: [
          {
            rank: 6,
            short_description: 'Shrinks items by two size and weight categories',
            description: `
              The bag reduces the size and weight of contained objects by two size and weight categories instead of one.
            `,
          },
        ],
      },
      'textiles',
    ),
    createObject(
      {
        name: 'Sending Stones',
        rank: 3,
        short_description: 'Allows distant communication',
        description: `
          This is a set of two paired stones.
          Each stone is about six inches in diameter and smooth to the touch.
          Whenever a creature touches one of the stones, they can magically channel their voice through it.
          If they do, their voice is also audible from the other stone, as long as both stones are on the same plane.
        `,
        rarity: 'Relic',
        tags: ['Scrying'],
      },
      'stone',
    ),
    createObject(
      {
        name: 'Endless Wineskin',
        rank: 2,
        short_description: 'Refills itself with wine',
        description: `
          This wineskin contains enough wine to fill two bottles.
          Whenever it is depleted and its opening is resealed, it refills itself over a period of 8 hours.
          Different endless wineskins contain different vintages of wine, and their flavor profile can differ greatly.
        `,
        rarity: 'Relic',
        tags: ['Creation'],
      },
      'leather',
    ),
    createObject(
      {
        name: 'Endless Tankard',
        rank: 2,
        short_description: 'Refills itself with beer',
        description: `
          Whenever this tankard rests upright on a stable surface, it fills itself with beer, ale, or a similar substance over a period of 10 minutes.
          Different endless tankards fill themselves with different drinks, and their flavor profile can differ greatly.
        `,
        rarity: 'Relic',
        tags: ['Creation'],
      },
      'wood',
    ),
    createObject(
      {
        name: 'Soul Barometer',
        rank: 4,
        short_description: 'Measures the emotional resonance of a place',
        description: `
          This intricate brass barometer does not react to air pressure.
          Instead, its needle indicates the general emotional mood of the current location, and the strength of that mood.
          The barometer's scope extends out several miles, and it can reach through buildings to read the mood of their occupants inside.
          It is not sensitive enough to detect the mood of individual creatures, or even small groups of creatures.
          In general, only towns or cities can generate enough emotional resonance to make the barometer respond, and villages or camps will generate no reaction.
        `,
        rarity: 'Relic',
        tags: ['Detection', 'Emotion'],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Stable Kite',
        rank: 2,
        short_description: 'Flies without wind',
        description: `
          This simple-looking kite can be flown in any weather short of a tornado or windstorm.
          As a standard action, you can tug on its string in a pattern to lock it in place.
          Once locked in place, it will remain stable in that position indefinitely unless damaged.
          You can release the lock as a standard action by tugging on the string in the right pattern.
          The kite's string can extend up to a thousand feet into the air.
        `,
        rarity: 'Relic',
        tags: ['Air'],
      },
      'textiles and wood',
    ),
    createObject(
      {
        name: 'Dowsing Rod',
        rank: 1,
        short_description: 'Finds underground water',
        description: `
          This forked wooden rod will gently tug downwards when you pass over a source of fresh, drinkable water within 50 feet of the surface.
          It can be used to find springs, wells, or underground rivers.
          It does not indicate the quantity or exact depth of the water.
        `,
        rarity: 'Relic',
        tags: ['Water', 'Detection'],
      },
      'wood',
    ),
    createObject(
      {
        name: 'Amphora of Endless Water',
        rank: 1,
        short_description: 'Creates a gallon of fresh water once per day',
        description: `
          This small clay amphora is decorated with images of waves.
          Once per day, you can speak a command word to cause it to fill with one gallon of clean, fresh drinking water.
        `,
        rarity: 'Relic',
        tags: ['Water', 'Creation'],
      },
      'clay',
    ),
    createObject(
      {
        name: 'Orb of Isolation',
        rank: 1,
        short_description: 'When thrown, avoids creatures',
        description: `
          You can throw this small iron orb up to 90 feet as a standard action.
          The orb treats any space occupied by a Tiny or larger creature as being an impassible barrier.
        `,
        rarity: 'Relic',
        tags: [],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Homebound Stone',
        rank: 2,
        short_description: 'Points the way to a bonded location',
        description: `
          This Diminutive stone bonds itself to its current location whenever it rests on the ground for an hour.
          When you drop the stone, it curves in the air to fall towards its most recently bonded location, regardless of distance or intervening obstacles.
        `,
        rarity: 'Relic',
        tags: [],
      },
      'stone',
    ),
    createObject(
      {
        name: 'Soul Compass',
        rank: 5,
        short_description: 'Points to souls',
        description: `
          This compass does not point to the magnetic north pole.
          Instead, its needle points to the largest concentration of souls on your current plane.
          This could be a large city, a powerful deity, or some other unusual entity depending on your current plane.
        `,
        rarity: 'Relic',
        tags: ['Detection'],
      },
      'metal',
    ),
    createObject(
      {
        name: 'Mirrored Window',
        rank: 4,
        short_description: 'See through a window elsewhere',
        description: `
          This is a window with an ornate frame.
          It is paired with another mirrored window that has identical but mirrored details in the frame.
          While both windows are properly installed in sturdy structures, looking through one window shows the view from the other window.
          Both windows must be on the same plane, but this functions at any distance and does not require line of sight or line of effect between the windows.
          When either of the windows is tapped firmly, both windows switch to showing their normal view, or back to showing the view from the other window.
          This connection only affects vision, so sound and other effects cannot pass through the windows.
        `,
        rarity: 'Relic',
        tags: ['Scrying'],
      },
      'ceramics, wood',
    ),
    createObject(
      {
        name: 'Journal of Days to Be',
        rank: 3,
        short_description: 'Predicts minor events for the next day',
        description: `
          This leather-bound journal always contains a journal entry for tomorrow, written by someone reflecting on that day.
          The author of the entries changes each day, but they are always real journal entries written by a local inhabitant of the journal's home plane.
          The quality of writing, and the detail of the events depicted, can vary widely between each entries.
          It is exceptionally rare for the journal to depict events of broad importance, and it never shows the journal entries from creatures that are rank 3 or higher.

          It is possible for the journal entries to become inaccurate if you react to their contents and interfere with the author.
          The entries are not signed, so determining the author can be difficult, but possible in some cases.
          However, doing so causes the journal to catch fire and burn to ashes, destroying it permanently.
        `,
        rarity: 'Relic',
        tags: [],
      },
      'textiles',
    ),
    createObject(
      {
        name: 'Radiant Sundial',
        rank: 1,
        short_description: 'Shows the approximate time during the day',
        description: `
          This is a stone sundial.
          Most radiant sundials are Small size and portable, though larger static structures can also exist.
          During the day, it constantly glows faintly and casts an accurate shadow as a sundial, regardless of surrounding lighting conditions.
          At night, it does not glow.
        `,
        rarity: 'Relic',
        tags: [],
      },
      'stone',
    ),
    createObject(
      {
        name: 'Stasis Box',
        rank: 4,
        short_description: 'Holds contained objects in stasis',
        description: `
          This Small wooden box holds any \\glossterm{mundane} object placed entirely within the box in stasis.
          Time does not pass for it, and it cannot be moved or affected by outside forces in any way.
          Poisons do not expire, ice does not melt, and so on.
          The stasis effect can be activated or deactivated by adjusting a clock face engraved on a box as a standard action.
          It must be deactivated to place objects within the box or remove them from the box.
        `,
        rarity: 'Relic',
        tags: [],
      },
      'wood',
    ),
    createObject(
      {
        name: 'Coldstone',
        rank: 1,
        short_description: 'Always stays cold',
        description: `
          This Diminutive stone is always just below freezing, regardless of the ambient temperature.
          Given enough time in a confined space, it can freeze surrounding water, but it is not harmful to touch normally.
        `,
        rarity: 'Relic',
        tags: ['Cold'],
      },
      'stone',
    ),
    createObject(
      {
        name: 'Charged Lodestone',
        rank: 2,
        short_description: 'Weakly attract or repel a small metal object',
        description: `
          This Small lodestone is naturally slightly magnetic.
          Whenever it takes damage from an \\atElectricity ability, even if that damage is reduced to 0 by the stone's \\glossterm{hardness}, it becomes much more strongly magnetized.
          It pulls strongly on any \\glossterm{metallic} object within 5 feet of it.
          Lighter objects fly to the lodestone if they can, and the lodestone will fly towards heavier objects.
        `,
        rarity: 'Relic',
        tags: ['Electricity'],
      },
      'stone',
    ),
    createObject(
      {
        name: 'Orb of Storms',
        rank: 2,
        short_description: 'Flashes with lightning before a storm',
        description: `
          This glass orb is filled with a swirling grey mist.
          If the area around the orb will experience a storm within the next 24 hours, the mist within the orb will begin to flash with tiny sparks of lightning.
          The flashes become more frequent as the storm gets closer, allowing you to know approximately how many hours it will be before the storm hits.
          Although the mist resembles a thunderstorm, the orb can detect any type of major storm, including snowstorms and rainstorms.
        `,
        rarity: 'Relic',
        tags: ['Electricity', 'Detection'],
      },
      'glass',
    ),
  ];
}

function transportation(): Tool[] {
  return [
    createObject(
      {
        name: 'Carriage',
        rank: 2,
        short_description: 'Fancy carriage that carries up to four people',
        description: `
          This four-wheeled vehicle can transport as many as four people within an enclosed cab, plus two drivers.
          In general, two horses (or other beasts of burden) draw it.
          A carriage comes with the harness needed to pull it.
        `,
      },
      'textiles and wood',
    ),
    createObject(
      {
        name: 'Rowboat',
        rank: 1,
        short_description: 'Simple boat for short journeys',
        description: `
          This 8- to 12 foot long boat holds two or three Medium passengers.
          It moves about one and a half miles per hour.
          A rowboat comes with oars to row it.
        `,
      },
      'wood',
    ),
    createObject(
      {
        name: 'Galley',
        rank: 5,
        short_description: 'Massive, fast-moving boat with 200 crew',
        description: `
          This three-masted ship has seventy oars on either side and requires a total crew of 200.
          A typical galley is 130 feet long and 20 feet wide, and it can carry 150 tons of cargo or 250 soldiers.
          Some rare galleys are fitted with a ram and castles with firing platforms fore, aft, and amidships.
          This ship cannot make sea voyages and sticks to the coast. It moves about 6 miles per hour when being rowed or under sail.
        `,
      },
      'metal, textiles, and wood',
    ),
    createObject(
      {
        name: 'Keelboat',
        rank: 3,
        short_description: 'Slow-moving, seaworthy ship with 15 crew',
        description: `
          This 50 to 75 foot long ship is 15 to 20 feet wide and has a few oars to supplement its single mast with a square sail. It requires a total crew of 15 and can carry 40 to 50 tons of cargo or 100 soldiers. It can make sea voyages, as well as sail down rivers (thanks to its flat bottom). It moves about 1 mile per hour.
        `,
      },
      'metal, textiles, and wood',
    ),
    createObject(
      {
        name: 'Longship',
        rank: 4,
        short_description: 'Long, seaworthy ship with 50 crew',
        description: `
          This 75 foot long ship with forty oars requires a total crew of 50. It has a single mast and a square sail, and it can carry 50 tons of cargo or 120 soldiers. A longship can make sea voyages. It moves about 5 miles per hour when being rowed or under sail.
        `,
      },
      'metal, textiles, and wood',
    ),
    createObject(
      {
        name: 'Wagon',
        rank: 1,
        short_description: 'Simple wagon for transporting heavy loads',
        description: `
          This is a four-wheeled, open vehicle for transporting heavy loads. In general, two horses (or other beasts of burden) draw it. A wagon comes with the harness needed to pull it.
        `,
      },
      'wood',
    ),
  ];
}
