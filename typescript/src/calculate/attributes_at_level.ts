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

function attributeAtLevel(startingAttribute: number, level: number) {
  if (startingAttribute <= 0) {
    return startingAttribute;
  } else if (startingAttribute === 1) {
    return startingAttribute + Math.floor(level / 2);
  } else {
    return startingAttribute + (level - 1);
  }
}
