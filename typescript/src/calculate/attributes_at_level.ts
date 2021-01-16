interface AttributeAtLevelArgs {
  level: number;
  startingAttributes: Creature.Attributes;
}

export function attributesAtLevel({
  level,
  startingAttributes,
}: AttributeAtLevelArgs): Creature.Attributes {
  return {
    str: attributeAtLevel(startingAttributes.str, level),
    dex: attributeAtLevel(startingAttributes.dex, level),
    con: attributeAtLevel(startingAttributes.con, level),
    int: attributeAtLevel(startingAttributes.int, level),
    per: attributeAtLevel(startingAttributes.per, level),
    wil: attributeAtLevel(startingAttributes.wil, level),
  };
}

export function attributeAtLevel(startingAttribute: number | null, level: number): number | null {
  if (startingAttribute === null) {
    return null;
  } else if (startingAttribute <= 0) {
    return startingAttribute;
  } else if (startingAttribute === 1) {
    return startingAttribute + Math.floor(level / 4);
  } else {
    return startingAttribute + Math.ceil(((level - 1) * (startingAttribute - 1)) / 2);
  }
}
