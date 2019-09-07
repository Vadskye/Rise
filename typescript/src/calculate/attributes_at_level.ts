interface AttributeAtLevelArgs {
  attributes: Creature.Attributes;
  level: number;
}

export function attributesAtLevel({
  attributes,
  level,
}: AttributeAtLevelArgs): Creature.Attributes {
  return {
    str: attributeAtLevel(attributes.str, level),
    dex: attributeAtLevel(attributes.dex, level),
    con: attributeAtLevel(attributes.con, level),
    int: attributeAtLevel(attributes.int, level),
    per: attributeAtLevel(attributes.per, level),
    wil: attributeAtLevel(attributes.wil, level),
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
