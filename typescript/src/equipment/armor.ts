export type ArmorUsageClass = 'light' | 'medium' | 'heavy';

export type ArmorMaterial =
  | { kind: 'normal' }
  | { kind: 'magic', bonus: number }
  | { kind: 'adamantine' }
  | { kind: 'pure adamantine' }
  | { kind: 'cold iron' }
  | { kind: 'pure cold iron' }
  | { kind: 'diamondsteel' }
  | { kind: 'pure diamondsteel' }
  | { kind: 'dragonhide', color: string }
  | { kind: 'pure dragonhide', color: string }
  | { kind: 'dragonscale', color: string }
  | { kind: 'pure dragonscale', color: string }
  | { kind: 'elvenweave' }
  | { kind: 'pure elvenweave' }
  | { kind: 'mithral' }
  | { kind: 'pure mithral' }
  | { kind: 'starmetal' }
  | { kind: 'pure starmetal' }
  | { kind: 'vineweave' }
  | { kind: 'braided vineweave' };

export interface ArmorDefinition {
  accuracyModifier: number;
  durability: number;
  defense: number;
  dexMultiplier: number;
  itemRank: number;
  name: string;
  speedModifier: number;
  usageClass: ArmorUsageClass;
}

export function getArmorMaterialDefinition(material: ArmorMaterial) {
  switch (material.kind) {
    case 'normal':
      return { durabilityModifier: 0, name: 'normal', itemRank: 0 };
    case 'magic':
      return { durabilityModifier: 0, name: 'magic', itemRank: 0 };
    case 'adamantine':
      return { durabilityModifier: 2, name: 'adamantine', itemRank: 5 };
    case 'pure adamantine':
      return { durabilityModifier: 4, name: 'pure adamantine', itemRank: 7 };
    case 'cold iron':
      return { durabilityModifier: 0, name: 'cold iron', itemRank: 2 };
    case 'pure cold iron':
      return { durabilityModifier: 0, name: 'pure cold iron', itemRank: 4 };
    case 'diamondsteel':
      return { durabilityModifier: 0, name: 'diamondsteel', itemRank: 3 };
    case 'pure diamondsteel':
      return { durabilityModifier: 0, name: 'pure diamondsteel', itemRank: 5 };
    case 'dragonhide':
      return { durabilityModifier: 1, name: `${material.color} dragonhide`, itemRank: 4 };
    case 'pure dragonhide':
      return { durabilityModifier: 1, name: `pure ${material.color} dragonhide`, itemRank: 6 };
    case 'dragonscale':
      return { durabilityModifier: 1, name: `${material.color} dragonscale`, itemRank: 4 };
    case 'pure dragonscale':
      return { durabilityModifier: 1, name: `pure ${material.color} dragonscale`, itemRank: 6 };
    case 'elvenweave':
      return { durabilityModifier: 0, name: 'elvenweave', itemRank: 3 };
    case 'pure elvenweave':
      return { durabilityModifier: 0, name: 'pure elvenweave', itemRank: 5 };
    case 'mithral':
      return { durabilityModifier: 1, name: 'mithral', itemRank: 3 };
    case 'pure mithral':
      return { durabilityModifier: 2, name: 'pure mithral', itemRank: 5 };
    case 'starmetal':
      return { durabilityModifier: 1, name: 'starmetal', itemRank: 2 };
    case 'pure starmetal':
      return { durabilityModifier: 2, name: 'pure starmetal', itemRank: 4 };
    case 'vineweave':
      return { durabilityModifier: 1, name: 'vineweave', itemRank: 3 };
    case 'braided vineweave':
      return { durabilityModifier: 2, name: 'braided vineweave', itemRank: 5 };
  }
}

export type ArmorKind =
  | 'BuffLeather' | 'MailShirt' | 'Rawhide' | 'Buckler'
  | 'LeatherLamellar' | 'Scale' | 'Brigandine' | 'StandardShield'
  | 'Breastplate' | 'HalfPlate' | 'FullPlate' | 'TowerShield';

export function getArmorBaseDefinition(kind: ArmorKind, material?: ArmorMaterial): ArmorDefinition {
  const matDef = material ? getArmorMaterialDefinition(material) : { durabilityModifier: 0, name: 'normal', itemRank: 0 };
  const calcDurability = (base: number) => base + matDef.durabilityModifier;

  switch (kind) {
    case 'BuffLeather':
      return {
        accuracyModifier: 0,
        durability: calcDurability(1),
        defense: 2,
        dexMultiplier: 1.0,
        itemRank: 1,
        name: 'buff leather',
        speedModifier: 0,
        usageClass: 'light',
      };
    case 'MailShirt':
      return {
        accuracyModifier: 0,
        durability: calcDurability(2),
        defense: 2,
        dexMultiplier: 1.0,
        itemRank: 2,
        name: 'chain shirt',
        speedModifier: 0,
        usageClass: 'light',
      };
    case 'Rawhide':
      return {
        accuracyModifier: 0,
        durability: calcDurability(0),
        defense: 2,
        dexMultiplier: 1.0,
        itemRank: 1,
        name: 'Rawhide',
        speedModifier: 0,
        usageClass: 'light',
      };
    case 'Buckler':
      return {
        accuracyModifier: 0,
        durability: 0,
        defense: 1,
        dexMultiplier: 1.0,
        itemRank: 0,
        name: 'buckler',
        speedModifier: 0,
        usageClass: 'light',
      };
    case 'LeatherLamellar':
      return {
        accuracyModifier: 0,
        durability: calcDurability(2),
        defense: 4,
        dexMultiplier: 0.5,
        itemRank: 1,
        name: 'leather lamellar',
        speedModifier: 0,
        usageClass: 'medium',
      };
    case 'Scale':
      return {
        accuracyModifier: 0,
        durability: calcDurability(3),
        defense: 4,
        dexMultiplier: 0.5,
        itemRank: 1,
        name: 'scale',
        speedModifier: 0,
        usageClass: 'medium',
      };
    case 'Brigandine':
      return {
        accuracyModifier: 0,
        durability: calcDurability(4),
        defense: 4,
        dexMultiplier: 0.5,
        itemRank: 1,
        name: 'brigandine',
        speedModifier: 0,
        usageClass: 'medium',
      };
    case 'StandardShield':
      return {
        accuracyModifier: 0,
        durability: 0,
        defense: 2,
        dexMultiplier: 0.5,
        itemRank: 0,
        name: 'standard shield',
        speedModifier: 0,
        usageClass: 'medium',
      };
    case 'Breastplate':
      return {
        accuracyModifier: 0,
        durability: calcDurability(5),
        defense: 5,
        dexMultiplier: 0.5,
        itemRank: 1,
        name: 'breastplate',
        speedModifier: -10,
        usageClass: 'heavy',
      };
    case 'HalfPlate':
      return {
        accuracyModifier: 0,
        durability: calcDurability(7),
        defense: 5,
        dexMultiplier: 0.5,
        itemRank: 2,
        name: 'half plate',
        speedModifier: -10,
        usageClass: 'heavy',
      };
    case 'FullPlate':
      return {
        accuracyModifier: 0,
        durability: calcDurability(8),
        defense: 5,
        dexMultiplier: 0.5,
        itemRank: 3,
        name: 'full plate',
        speedModifier: -10,
        usageClass: 'heavy',
      };
    case 'TowerShield':
      return {
        accuracyModifier: -1,
        durability: 0,
        defense: 3,
        dexMultiplier: 0.5,
        itemRank: 1,
        name: 'tower shield',
        speedModifier: 0,
        usageClass: 'heavy',
      };
  }
}

export function getArmorName(kind: ArmorKind, material?: ArmorMaterial): string {
  const baseDef = getArmorBaseDefinition(kind, material);
  if (material && material.kind !== 'normal') {
    const matDef = getArmorMaterialDefinition(material);
    return `${matDef.name} ${baseDef.name}`;
  }
  return baseDef.name;
}

export function getArmorRank(kind: ArmorKind, material?: ArmorMaterial): number {
  const baseDef = getArmorBaseDefinition(kind, material);
  if (material) {
    const matDef = getArmorMaterialDefinition(material);
    return Math.max(baseDef.itemRank, matDef.itemRank);
  }
  return baseDef.itemRank;
}
