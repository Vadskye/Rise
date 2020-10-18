function getAttribute(characterId, attributeName, createIfNotExist=false) {
    const attribute = findObjs(
        {
            characterid: characterId,
            name: attributeName,
            type: 'attribute',
        },
        { caseInsensitive: true }
    )[0];
    if (attribute) {
        return attribute
    } else if (createIfNotExist) {
        return createObj('attribute', {
            characterid: characterId,
            name: attributeName,
            current: '',
            max: ''
        });
    }
}

const diceByPower = {
    '-4': '1d3',
    '-2': '1d4',
    0: '1d6',
    2: '1d8',
    4: '1d10',
    6: '2d6',
    8: '2d8',
    10: '2d10',
    12: '4d6',
    14: '4d8',
    16: '4d10',
    18: '5d10',
    20: '6d10',
    22: '7d10',
    24: '8d10',
    26: '8d10+10',
    28: '8d10+20',
    30: '8d10+30',
    32: '8d10+40',
    34: '8d10+50',
    36: '8d10+60',
    38: '8d10+70',
    40: '8d10+80',
};

function assert(test, message) {
    if (!test) {
        log(message);
        sendChat('Error', message);
        // throw new Error(message);
    }
}

function setDamageDiceForAttack({attackName, attackDieBonus, characterId, source}) {
    assert(attackDieBonus !== undefined, 'attackDieBonus should exist');
    assert(attackName, 'attackName should exist');
    assert(source, 'source should exist');
    
    const basePower = getAttrByName(characterId, `${source}_power`);
    const totalPower = Math.floor((Number(basePower) + Number(attackDieBonus) * 2) / 2) * 2;
    
    const diceName = attackName.replace('_attack0_damage', '_attack0_dice');
    const diceAttribute = getAttribute(characterId, diceName, true);
    diceAttribute.set('current', diceByPower[totalPower]);

    const effectName = attackName.replace('_attack0_damage', '_attack0_effect');
    const effectAttribute = getAttribute(characterId, effectName, true);
    assert(effectAttribute, 'effectAttribute should exist')
    const trimmed = (effectAttribute.get('current') || '').trim();
    effectAttribute.set('current', trimmed === '' ? ' ' : trimmed);
    
    const buttonName = attackName.replace('_attack0_damage', '_roll_attack');
    const buttonAttribute = getAttribute(characterId, buttonName, true);
    assert(buttonAttribute, 'buttonAttribute should exist')
    buttonAttribute.set(
      'current', 
      "@{character_name} uses @{attack0_name}:"
      + " [[d10! + @{accuracy} + @{attack0_accuracy}]] vs @{attack0_defense}!"
      + " ([[@{attack0_dice}]]; @{attack0_effect})"
    );
    // sendChat('debug', `set ${diceName} based on base ${basePower} + ${attackDieBonus} (${getAttrByName(characterId, attackName)}): ${diceAttribute.get('current')}`);
}

function recalculateRepeatingDamageAttributes(characterId, source) {
    const repeatingDamageAttributes = findObjs({
        characterid: characterId,
        type: 'attribute',
    }).filter((obj) => {
        const name = obj.get('name') || '';
        return name.startsWith(`repeating_${source}attacks`) && name.endsWith('_attack0_name');
    });
    for (const attr of repeatingDamageAttributes) {
        const damageAttr = getAttribute(characterId, attr.get('name').replace('_attack0_name', '_attack0_damage'), true);
        setDamageDiceForAttack({
            attackDieBonus: damageAttr.get('current'),
            attackName: damageAttr.get('name'),
            characterId,
            source,
        });
    }
}

on('change:attribute', (obj, oldObj) => {
    const name = oldObj.name;
    const characterId = oldObj._characterid;
    try {
      if (name === 'mundane_power') {
         recalculateRepeatingDamageAttributes(characterId, 'mundane');
      } else if (name === 'magical_power') {
         recalculateRepeatingDamageAttributes(characterId, 'magical');
      } else if (name.startsWith('repeating_') && name.endsWith('_attack0_damage')) {
          const source = name.includes('mundane') ? 'mundane' : 'magical';
          setDamageDiceForAttack({
              attackDieBonus: obj.get('current') || '0',
              attackName: oldObj.name,
              characterId,
              source,
          });
      }
    } catch (err) {
      sendChat('Error', err.message);
      log('Error: ' + err.message);
    }
  });
