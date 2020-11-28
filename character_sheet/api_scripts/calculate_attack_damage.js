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

function assert(test, message) {
    if (!test) {
        log(message);
        sendChat('Error', message);
        // throw new Error(message);
    }
}

function setDamageForAttack({attackDice, attackName, attackPower, characterId, source}) {
    assert(attackDice !== undefined, 'attackDice should exist');
    assert(attackName, 'attackName should exist');
    assert(source, 'source should exist');

    const basePower = Number(getAttrByName(characterId, `${source}_power`));
    const powerMultiplier = {
      'full': 1,
      'half': 0.5,
      'none': 0,
    }[attackPower || 'full'];
    assert(powerMultiplier !== undefined, `Unable to parse attackPower: ${attackPower}`);
    const totalPower = Math.floor(basePower * powerMultiplier);

    const effectName = attackName.replace('_attack0_name', '_attack0_effect');
    const effectAttribute = getAttribute(characterId, effectName, true);
    assert(effectAttribute, 'effectAttribute should exist')
    const trimmed = (effectAttribute.get('current') || '').trim();
    effectAttribute.set('current', trimmed === '' ? ' ' : trimmed);

    const buttonName = attackName.replace('_attack0_name', '_roll_attack');
    const buttonAttribute = getAttribute(characterId, buttonName, true);
    assert(buttonAttribute, 'buttonAttribute should exist')
    buttonAttribute.set(
      'current', 
      "@{character_name} uses @{attack0_name}:"
      + " [[d10! + @{accuracy} + @{attack0_accuracy}]] vs @{attack0_defense}!"
      + ` ([[@{attack0_dice}+${totalPower}]]; @{attack0_effect})`
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
        const attackName = attr.get('name');
        const diceAttr = getAttribute(characterId, attackName.replace('_attack0_name', '_attack0_dice'), true);
        const powerAttr = getAttribute(characterId, attackName.replace('_attack0_name', '_attack0_power'), true);
        setDamageForAttack({
            attackDice: diceAttr.get('current'),
            attackName,
            attackPower: powerAttr.get('current'),
            characterId,
            source,
        });
    }
}

on('change:attribute', (obj, oldObj) => {
    const name = oldObj.name;
    const characterId = oldObj._characterid;
    try {
      if (name === 'level') {
         recalculateRepeatingDamageAttributes(characterId, 'mundane');
         recalculateRepeatingDamageAttributes(characterId, 'magical');
      } 
      else if (name === 'mundane_power') {
         recalculateRepeatingDamageAttributes(characterId, 'mundane');
      } else if (name === 'magical_power') {
         recalculateRepeatingDamageAttributes(characterId, 'magical');
      } else if (name.startsWith('repeating_') && name.endsWith('_attack0_dice')) {
          const source = name.includes('mundane') ? 'mundane' : 'magical';
          const powerAttr = getAttribute(characterId, oldObj.name.replace('_attack0_dice', '_attack0_power'), true);
          setDamageForAttack({
              attackDice: obj.get('current') || '1d2',
              attackName: oldObj.name.replace('_attack0_dice', '_attack0_name'),
              attackPower: powerAttr.get('current'),
              characterId,
              source,
          });
      } else if (name.startsWith('repeating_') && name.endsWith('_attack0_power')) {
          const source = name.includes('mundane') ? 'mundane' : 'magical';
          const diceAttr = getAttribute(characterId, oldObj.name.replace('_attack0_power', '_attack0_dice'), true);
          setDamageForAttack({
              attackDice: diceAttr.get('current') || '1d2',
              attackName: oldObj.name.replace('_attack0_power', '_attack0_name'),
              attackPower: obj.get('current'),
              characterId,
              source,
          });
      }
    } catch (err) {
      sendChat('Error', err.message);
      log('Error: ' + err.message);
    }
  });
