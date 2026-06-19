import { Tool, StandardItem } from '../../types';

function createKit(data: Partial<StandardItem>, subskill: string): Tool {
  return {
    category: { kind: 'Kit', subskill },
    item: {
      magical: false,
      rarity: 'Common',
      tags: [],
      upgrades: [],
      description: '',
      short_description: '',
      name: '',
      rank: 0,
      ...data,
    },
  };
}

export function kits(): Tool[] {
  return [
    createKit(
      {
        name: "Artisan's Tools",
        rank: 0,
        short_description: 'Required for some Craft checks',
        description: `
          These are Small tools that are appropriate to a particular Craft skill other than Craft (alchemy) and Craft (metal).
          It is very difficult to create items using the Craft skill without this item (see \\pcref{Craft}).
        `,
        upgrades: [
          {
            rank: 2,
            short_description: 'Useful for many Craft checks',
            description: `
              The tools are incredibly versatile, making them suitable for any Craft skill other than Craft (alchemy) and Craft (metal).
            `,
          },
        ],
      },
      'metal',
    ),
    createKit(
      {
        name: "Alchemist's Lab",
        rank: 1,
        short_description: 'Can make items with Craft (alchemy)',
        description: `
          This is a Medium workstation that contains a wide variety of compounds and reagents.
          It is very difficult to create items using the Craft (alchemy) skill without an alchemist's lab (see \\pcref{Craft}).
        `,
        upgrades: [
          {
            rank: 4,
            short_description: 'Can portably make items with Craft (alchemy)',
            description: `
              The workstation has been condensed to a Small size using extremely potent reagents and finely crafted tools.
              The reagents are typically diluted as part of the crafting process with easily acquired materials, so items made with this kit function identically to items made with a larger workstation.
            `,
          },
        ],
      },
      'alchemy',
    ),
    createKit(
      {
        name: 'Forge',
        rank: 1,
        short_description: 'Can make items with Craft (metal)',
        description: `
          This is a Large workstation that contains a wide variety of tools for working with metal.
          It includes an anvil, a crucible, and so on.
          It is very difficult to create items using the Craft (metal) skill without a forge (see \\pcref{Craft}).
        `,
        upgrades: [
          {
            rank: 3,
            short_description: 'Can portably make items with Craft (metal)',
            description: `
              The workstation has been miniaturized to Medium size using high quality metals and alchemical or magical heating elements.
            `,
          },
        ],
      },
      'metal',
    ),
    createKit(
      {
        name: 'Mystic Forge',
        magical: true,
        rank: 5,
        short_description: 'Can very portably make items with Craft (metal)',
        description: `
          This is a Small workstation that contains magical multi-purpose tools for working with metal.
          It is very difficult to create items using the Craft (metal) skill without a forge (see \\pcref{Craft}).
        `,
      },
      'metal',
    ),
    createKit(
      {
        name: 'Disguise Kit',
        rank: 1,
        short_description: 'Required for some Disguise checks',
        description: `
          This is a Small kit that contains a wide variety of fabrics, makeup, and other useful tools for disguising your appearance.
          It is very difficult to create disguises using the Disguise skill without this item (see \\pcref{Disguise}).
        `,
      },
      'alchemy, textiles',
    ),
    createKit(
      {
        name: 'Medical Kit',
        rank: 1,
        short_description: 'Required for some Medicine checks',
        description: `
          This is a Small kit that contains a wide variety of bandages, salves, and other useful tools for treating wounds.
          It is very difficult to treat wounds using the Medicine skill without this item (see \\pcref{Medicine}).
        `,
      },
      'textiles',
    ),
    createKit(
      {
        name: "Thieves' Tools",
        rank: 1,
        short_description: 'Required for some Devices checks',
        description: `
          This is a Small kit that contains a wide variety of lockpicks and device-manipulation tools.
          It is very difficult to manipulate devices using the Devices skill without this item (see \\pcref{Devices}).
        `,
      },
      'metal, textiles',
    ),
  ];
}
