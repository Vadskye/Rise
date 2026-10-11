import { Creature } from '@src/character_sheet/creature';
import { RankAbility } from '../types';
import { applyArchetypeActiveAbilities } from './apply_archetypes';

export function elementalist(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Elemental Spell',
      isMagical: true,
      rank: 1,
      description: `
        If you have access to nature magic, you learn a spell from any of the mystic spheres associated with the four elements: \\sphere{aeromancy}, \\sphere{aquamancy}, \\sphere{pyromancy}, or \\sphere{terramancy}.
        You do not have to have access to that mystic sphere.
        As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Infusion',
      isMagical: true,
      rank: 1,
      description: `
        If you do not have access to nature magic, you gain the ability to make a strike imbued with elemental force.
        \\begin{magicalactiveability}{Elemental Infusion}{Standard action}
          \\rankline
          Make a \\glossterm{strike}.
          When you use this ability, it has one of the following tags of your choice: \\atAir, \\atEarth, \\atFire, or \\atWater.

          \\rankline
          \\rank{2} You add half your Strength to your \\glossterm{magical power} to determine your total power with this strike.
          \\rank{3} You deal \\glossterm{extra damage} equal to half your power.
          \\rank{4} The strike deals double \\glossterm{weapon damage}.
          \\rank{5} The extra damage increases to be equal to your power.
          \\rank{6} The strike deals quadruple \\glossterm{weapon damage}.
          \\rank{7} The extra damage increases to 1d6 per 2 power.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 2,
      name: 'Elemental Balance',
      isMagical: true,
      rank: 2,
      description: `
        You gain a benefit from each of the four elements.
        \\begin{raggeditemize}
          \\item Air: You gain a slow \\glossterm{glide speed} (see \\pcref{Aerial Movement}).
          \\item Earth: You gain a \\plus1 bonus to your Fortitude defense.
          \\item Fire: You are \\resistant to \\atFire attacks.
          \\item Water: You gain a slow \\glossterm{swim speed}.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Power',
      isMagical: true,
      rank: 3,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{magical power} and \\glossterm{mundane power}.
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Infusion',
      isMagical: true,
      rank: 3,
      description: '',
    },
    {
      complexity: 1,
      name: 'Elemental Spell+',
      isMagical: true,
      rank: 4,
      description: `
        You learn an additional spell with this ability.
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Tranquility',
      isMagical: true,
      rank: 4,
      description: `
        If you do not have access to nature magic, you become \\resistant to \\atAir, \\atEarth, and \\atWater attacks.
      `,
    },
    {
      complexity: 2,
      name: 'Elemental Control',
      isMagical: true,
      rank: 5,
      description: `
        \\begin{magicalsustainability}{Elemental Control}{Standard action}
          \\abilitytags \\abilitytag{Sustain} (attunable, minor)
          You can control either air, earth, fire, or water within a \\hugearea \\glossterm{zone} from your location.
          Each element has different limitations on its ability to move, as described below.
          Once per turn as a \\glossterm{free action}, you can change how you direct your chosen element, but you must still control the same element.
          \\begin{raggeditemize}
            \\item Air: You can change the wind speed of air by up to 30 miles per hour, to a maximum total speed of 40 miles per hour.
            If you reduce the air's speed to 0 and then increase it again, you can change the direction the air blows.
            % TODO: clarify how this works
            \\item Earth: You can reshape earth or unworked stone at a rate of up to one foot per turn.
            \\item Fire: You can make fire leap up to 60 feet between combustible materials, suppress fire so it smolders without being extinguished, or snuff out fire entirely.
            \\item Water: You can change the speed of water by up to 30 feet per turn, to a maximum total speed of 40 feet per turn.
            If you reduce the water's speed to 0 and then increase it again, you can change the direction the water flows.
          \\end{raggeditemize}
        \\end{magicalsustainability}
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Infusion',
      isMagical: true,
      rank: 5,
      description: '',
    },
    {
      complexity: 0,
      name: 'Elemental Power+',
      isMagical: true,
      rank: 6,
      description: `
        The power bonuses increase to \\plus2.
      `,
    },
    {
      complexity: 2,
      name: 'Elemental Balance+',
      isMagical: true,
      rank: 7,
      description: `
        Your benefits from each element improve.
        \\begin{raggeditemize}
          \\item Air: You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
          \\item Earth: You gain a \\plus1 bonus to your Brawn defense.
          \\item Fire: You are immune to \\atFire attacks.
          \\item Water: Your swim speed increases to average.
        \\end{raggeditemize}
      `,
    },
    {
      complexity: 0,
      name: 'Elemental Infusion',
      isMagical: true,
      rank: 7,
      description: '',
    },
  ];
}

export function natureMagic(): RankAbility[] {
  return [
    {
      complexity: 4,
      name: 'Nature Spells',
      isMagical: true,
      rank: 1,
      description: `
        Your connection to nature grants you the ability to use nature magic.
        You gain access to one nature \\glossterm{mystic sphere}, plus the \\sphere{universal} mystic sphere (see \\pcref{Nature Mystic Spheres}).
        You may spend \\glossterm{insight points} to gain access to one additional nature \\glossterm{mystic sphere} per two \\glossterm{insight points}.
        You can only learn nature spells from nature mystic spheres that you have access to.

        You automatically learn all \\glossterm{cantrips} from each of your mystic spheres.
        In addition, you learn two nature \\glossterm{spells}.
        You can also spend \\glossterm{insight points} to learn one additional spell per insight point.

        Nature spells require \\glossterm{verbal components} to cast (see \\pcref{Ability Usage Components}).
        For details about mystic spheres and casting spells, see \\pcref{Spell and Ritual Mechanics}.

        When you gain access to a new \\glossterm{mystic sphere} or spell \\glossterm{rank},
        you can forget any number of spells you know to learn that many new spells in exchange.

        \\advancement The maximum rank of nature spells that you can learn is equal to your rank in this archetype.
        Nature spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
      `,
    },
    {
      complexity: 2,
      name: 'Spell Knowledge',
      isMagical: true,
      rank: 2,
      description: `
        You learn an additional nature spell.
      `,
    },
  ];
}

export function natureSpellMastery(): RankAbility[] {
  return [
    {
      complexity: 1,
      name: 'Plant Channeling',
      isMagical: true,
      rank: 1,
      description: `
        Whenever you cast a spell, you may use a Small or larger living plant within \\shortrange of you as a \\glossterm{targeting proxy}.
        This means the spell determines its targets as if you were in the plant's location, which can allow you to affect targets outside your normal range.
      `,
    },
    {
      complexity: 2,
      name: 'Metamagic',
      isMagical: true,
      rank: 2,
      description: `
        You learn how to further refine your spellcasting abilities.
        Choose two metamagic abilities from the list below.

        Some metamagic abilities affect specific spells.
        Each individual spell can only have one metamagic applied.
        Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
        {
        \\parhead{Airborne Spell} Choose a nature \\glossterm{spell} you know with a standard \\glossterm{range}: \\shortrangeless, \\medrangeless, \\longrangeless, \\distrangeless, or \\extrangeless.
        It gains the \\atAir tag.
        In addition, you increase that spell's range to the next standard range category, to a maximum of Extreme range.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Flooding Spell} Choose a nature \\glossterm{spell} you know with a standard \\glossterm{area}: \\tinyarea, \\smallarea, \\medarea, \\largearea, \\hugearea, or \\gargarea.
        It gains the \\atWater tag.
        In addition, you increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Grounded Spell} Choose a nature \\glossterm{spell} you know.
        It gains the \\atEarth tag.
        In addition, if you are \\glossterm{grounded} when you cast the spell, you gain a \\plus2 accuracy bonus with that spell this turn.
        You can choose this ability multiple times, choosing a different spell each time.
        % +50% damage assuming the targets stay in the same area, more like +25% assuming they try to escape
        \\parhead{Incendiary Spell} Choose a damaging nature \\glossterm{spell} you know.
        It gains the \\atFire tag.
        When you cast the spell, it \\glossterm{briefly} creates a \\glossterm{zone} of flames in its area.
        If the spell does not normally affect an area, the flames appear in the space of each target.
        At the end of your next turn, the spell's effect \\glossterm{repeats} in that area.
        The repeat deals half damage.
        You can choose this ability multiple times, choosing a different spell each time.
        \\parhead{Rituals} You gain the ability to perform nature rituals to create unique magical effects (see \\pcref{Spell and Ritual Mechanics}).
        The maximum \\glossterm{rank} of nature ritual you can learn or perform is equal to your rank in this archetype.
        In addition, you automatically learn two free nature rituals, plus one more whenever you increase your rank in this archetype.
        You cannot choose this ability multiple times.
        }
      `,
    },
    {
      complexity: 2,
      name: 'Spell Knowledge',
      isMagical: true,
      rank: 3,
      description: `
        You learn an additional nature spell.
      `,
    },
    {
      complexity: 0,
      name: 'Spell-Trained Senses',
      isMagical: true,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Perception.
      `,
    },
    {
      complexity: 1,
      name: 'Metamagic+',
      isMagical: true,
      rank: 5,
      description: `
        You gain two additional metamagic abilities.
      `,
    },
    {
      complexity: 1,
      name: 'Attunement Point',
      isMagical: true,
      rank: 6,
      description: `
        You gain an additional \\glossterm{attunement point}.
      `,
    },
    {
      complexity: 1,
      name: 'Experienced Spellcaster',
      isMagical: true,
      rank: 7,
      description: `
        You gain a \\plus1 bonus to your \\glossterm{accuracy} and Mental defense.
      `,
    },
  ];
}

export function shifter(): RankAbility[] {
  return [
    {
      complexity: 3,
      name: 'Wild Aspects',
      isMagical: true,
      rank: 1,
      description: `
        You gain the ability to embody an aspect of an animal or of nature itself.
        Choose two wild aspects from the list below.
        You can also spend \\glossterm{insight points} to learn one additional \\textit{wild aspect} per \\glossterm{insight point}.

        As a \\glossterm{standard action}, you can gain the effects of one wild aspect that you know.
        You cannot change your wild aspect more than once per turn.
        That effect lasts until you activate a different wild aspect you know or until you dismiss it.

        The abilities in the list below describe the effects of the aspect.
        Your appearance also changes to match the aspect's effects, but the nature of this change is not described.
        Different druids change in different ways.
        For example, one druid might grow brown fur when using the Form of the Bear, while another might instead change their face to become broader and more bear-shaped when embodying the same aspect.
        You choose how your appearance changes when you gain a wild aspect.
        This change cannot be used to gain an additional substantive benefit beyond the effects given in the description of the aspect.

        Many wild aspects grant natural weapons.
        See \\pcref{Natural Weapons}, for details about natural weapons.

        {
        \\begin{magicalactiveability}{Form of the Bear}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain a \\plus1 bonus to your Fortitude defense and vital rolls.
          In addition, your mouth and hands transform, granting you a bite and two claw \\glossterm{natural weapons} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} The Fortitude defense bonus increases to \\plus2.
          \\rank{7} The vital roll bonus increases to \\plus2.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Bull}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You can move your full \\glossterm{speed} when you push a creature with the \\ability{shove} ability.
          In addition, your head transforms, granting you a gore \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} You gain a \\plus2 accuracy bonus with the \\ability{shove} ability.
          \\rank{7} The accuracy bonus increases to \\plus4.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Constrictor}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain a \\plus1 accuracy bonus with the \\textit{grapple} ability and a \\plus1 bonus to your Brawn defense.
          In addition, you can contort your body, allowing it to act as a free hand for the purpose of using the \\textit{grapple} ability and grapple actions even if you do not have a free hand.
          Finally, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} The bonuses increase to \\plus2.
          \\rank{7} When you grapple a creature with the \\ability{grapple} ability, you automatically take control of the grapple (see \\pcref{Controlling a Grapple}).
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Fish}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain an average \\glossterm{swim speed}.
          In addition, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} You can breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
          \\rank{7} You are immune to \\magical effects that restrict your mobility.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Hawk}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain \\sense{low-light vision}, allowing you to see in \\glossterm{dim illumination} (see \\pcref{Low-light Vision}).
          In addition, you gain a \\plus3 \\glossterm{enhancement bonus} to the Awareness skill.

          \\rankline
          \\rank{4} You grow wings, granting you an average glide speed (see \\pcref{Gliding}).
          \\rank{7} You gain an average \\glossterm{fly speed} with a maximum height of 30 feet (see \\pcref{Flight}).
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Hound}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
          In addition, you have the ability to move on all four limbs.
          When doing so, you become \\trait{quadrupedal} and have no \\glossterm{free hands} (see \\pcref{Multipedal}).
          This gives you a \\plus10 foot bonus to your \\glossterm{speed}.
          Your bite also gains the \\weapontag{Heavy} weapon tag while you are quadrupedal in this way.

          When not using your hands to move, your ability to use your hands is unchanged.
          You can descend to four legs and rise up to stand on two legs again as part of movement.

          \\rankline
          \\rank{4} You gain the \\sense{scent} ability.
          \\rank{7} You gain an additional \\plus10 bonus to scent-based Awareness checks.
        \\end{magicalactiveability}

        % Seems boring? What abilities would make sense?
        \\begin{magicalactiveability}{Form of the Monkey}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain an average \\glossterm{climb speed}.
          In addition, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} You grow a tail that you can use as a free hand for the purpose of climbing.
          \\rank{7} You can use the \\textit{creature climb} ability against creatures only one size category larger than you instead of two size categories larger than you.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Rat}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain a \\plus2 \\glossterm{enhancement bonus} to the Flexibility and Stealth skills.
          In addition, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} When you use this wild aspect, you can choose to shrink by one \\glossterm{size category}, to a minimum of Small.
          \\rank{7} The enhancement bonuses increase to \\plus4.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Viper}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You do not need to use \\glossterm{free hands} to climb.
          In addition, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).
          Whenever a creature is \\glossterm{injured} by your bite, make a \\glossterm{reactive attack} vs. Fortitude against that creature.
          On a hit, the creature is \\glossterm{poisoned} by viper venom (see \\pcref{Poison}).
          The poisoned creature is \\sickened while the poison lasts.

          \\rankline
          \\rank{4} You gain a \\plus1 accuracy bonus with all poisons.
          \\rank{7} The accuracy bonus increases to \\plus2.
          In addition, your viper venom also deals \\damageranknine on the second escalation.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Form of the Wolf}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You gain a \\plus1 \\glossterm{enhancement bonus} to \\glossterm{accuracy} against creatures that are adjacent to both you and one of your \\glossterm{allies}.
          In addition, you gain a bite \\glossterm{natural weapon} (see \\tref{Natural Weapons}).

          \\rankline
          \\rank{4} You gain the \\sense{scent} ability.
          \\rank{7} The accuracy bonus increases to \\plus2.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Myriad Form}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          If you have Disguise as a \\glossterm{trained skill}, you gain a \\plus3 \\glossterm{enhancement bonus} to it.
          Otherwise, you are treated as being trained in that skill.

          \\rankline
          % No maximum because the ability is magical
          \\rank{4} When you use this wild aspect, you can choose to grow or shrink by one \\glossterm{size category} (see \\pcref{Size Categories}).
          If you increase your size, you are slightly clumsy in your new size, and you take a -10 foot penalty to your speed with all of your \\glossterm{movement modes}.
          \\rank{7} When you use this wild aspect, you can choose to grow or shrink by up to two \\glossterm{size categories} instead of only one.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Photosynthesis}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          You do not gain hunger or thirst while in natural sunlight.
          When you leave natural sunlight, you continue gaining hunger or thirst at your normal rate, ignoring any time you spent in natural sunlight.
          In addition, as long as you are in natural sunlight, you regain hit points equal to half your \\glossterm{power} at the end of your turn.
          \\rankline
          % This is about as strong as a r3 deep attunement - class feature plus natural sunlight requirement is probably enough?
          \\rank{4} The healing increases to be equal to your \\glossterm{power}.
          \\rank{7} When you finish a \\glossterm{short rest} while you are in natural sunlight, you can remove a \\glossterm{vital wound}.
          When you do, you reduce your \\glossterm{stamina} by four.
        \\end{magicalactiveability}

        \\begin{magicalactiveability}{Plantspeaker}{Standard action}
          \\abilitytags \\atPhysical
          \\rankline
          Your speed is not reduced when moving in \\glossterm{heavy undergrowth}.
          In addition, you can ignore \\glossterm{cover} and \\glossterm{concealment} from plants whenever doing so would be beneficial to you, as the plants move out of the way to help you.
          This prevents you from suffering penalties on your attacks, and also prevents creatures from using cover or concealment from plants to hide from you.

          \\rankline
          \\rank{4} You gain a \\plus2 bonus to your Armor and Reflex defenses while standing in \\glossterm{undergrowth}.
          \\rank{7} All \\glossterm{light undergrowth} within a \\medarea radius from you is treated as \\glossterm{difficult terrain} for your \\glossterm{enemies}.
        \\end{magicalactiveability}
        }
      `,
    },
    {
      complexity: 1,
      name: 'Shift Body',
      isMagical: true,
      rank: 2,
      description: `
        \\begin{magicalattuneability}{Shift Body}{Triggered}
          \\abilitytags \\abilitytag{Attune}
          \\rankline
          You can use this ability when you finish a \\glossterm{long rest}.
          Choose a physical \\glossterm{attribute}: Strength, Dexterity, or Constitution (see \\pcref{Attributes}).
          You gain a \\plus1 \\glossterm{enhancement bonus} to that attribute.
        \\end{magicalattuneability}
      `,
    },
    {
      complexity: 2,
      name: 'Shifting Claw',
      isMagical: true,
      rank: 3,
      description: `
        \\begin{magicalactiveability}{Shifting Claw}{Standard action}
          \\rankline
          Make a \\glossterm{strike} that deals double \\glossterm{weapon damage} using \\glossterm{natural weapons}.
          In addition, you choose one of the following benefits for the strike:
          \\begin{itemize}
            \\item Constricting: If the target is \\grappled or \\prone, you can use your \\glossterm{brawling accuracy} with the strike instead of your normal accuracy. 
            \\item Enlarged: You become one \\glossterm{size category} larger, and the strike gains the \\weapontag{Sweeping} (1) \\glossterm{weapon tag}. You return to your normal size at the end of your turn.
            \\item Flurry: You roll the attack roll twice and keep the higher result. In exchange, you are \\briefly \\distracted after making the strike.
            \\item Rending: Each target \\glossterm{injured} by the strike \\glossterm{briefly} \\bleeds for half the damage dealt by the strike.   
          \\end{itemize}

          \\rankline
          \\rank{4} The strike deals \\glossterm{extra damage} equal to half your \\glossterm{power}.
          \\rank{5} The strike deals triple \\glossterm{weapon damage}.
          \\rank{6} The extra damage increases to be equal to your power.
          \\rank{7} The strike deals double damage, but the extra damage is reduced to half your power.
        \\end{magicalactiveability}
      `,
    },
    {
      complexity: 1,
      name: 'Animal Shape',
      isMagical: true,
      rank: 4,
      description: `
        Whenever you activate a \\ability{wild aspect} that represents a specific animal, you can fully \\glossterm{shapeshift} to match that animal's shape.
        This cannot increase your \\glossterm{size category}, but you can shrink by one size category if it is appropriate for that animal.
        You may choose to reshape any body armor you wear as \\glossterm{barding} to fit the animal instead of melding it into your form.
        This means it continues to function, but its bonus to Armor defense is reduced by 1.
        The armor regains its normal shape if you take it off.
        For details about shapeshifting, see \\pcref{Shapeshifting}.
      `,
    },
    {
      complexity: 0,
      name: 'Shift Body+',
      isMagical: true,
      rank: 5,
      description: `
        This ability loses the \\abilitytag{Attune} tag.
        Instead, it lasts until you use it again.
      `,
    },
    {
      complexity: 0,
      name: 'Transformative Toughness',
      isMagical: true,
      rank: 6,
      description: `
        You gain a \\plus2 bonus to your Fortitude defense and a \\plus1 bonus to your \\glossterm{vital rolls}.
      `,
    },
    {
      complexity: 2,
      name: 'Hybrid Aspect',
      isMagical: true,
      rank: 7,
      description: `
        When you use your \\ability{wild aspect} ability, you can take on two aspects at once, gaining the full benefits of both.
        This costs two \\glossterm{stamina}.
        This hybrid aspect only lasts for ten minutes, at which point you choose which single aspect remains active.
      `,
    },
  ];
}

export function oakheart(): RankAbility[] {
  return [
    {
      complexity: 2,
      name: 'Draw Upon the Healing Land',
      isMagical: false,
      rank: 1,
      description: `
        At the end of your turn, if you are \\ability{grounded}, you regain hit points equal to your rank in this archetype.
        If you did not change location or attack during that turn, this healing is doubled.
      `,
    },
    {
      complexity: 0,
      name: 'Protective Bark',
      isMagical: false,
      rank: 2,
      description: `
        You gain a \\plus1 bonus to your Armor defense and \\glossterm{durability}.
      `,
    },
    {
      complexity: 2,
      name: 'Ensnaring Earth',
      isMagical: false,
      rank: 3,
      description: `
        While you are \\glossterm{grounded}, the ground in a \\tinyarea radius \\glossterm{emanation} from you is \\glossterm{difficult terrain} for your \\glossterm{enemies}.
        If you are in \\glossterm{undergrowth}, this increases to a \\smallarea radius.
      `,
    },
    {
      complexity: 1,
      name: "Oak's Endurance",
      isMagical: false,
      rank: 4,
      description: `
        You gain a \\plus1 bonus to your Constitution.
      `,
    },
    {
      complexity: 0,
      name: 'Draw Upon the Healing Land+',
      isMagical: false,
      rank: 5,
      description: `
        The healing increases to twice your rank in this archetype.
      `,
    },
    {
      complexity: 1,
      name: "Natural Health",
      isMagical: false,
      rank: 5,
      description: `
        You are \\resistant to \\atPoison attacks and immune to being \\sickened.
      `,
    },
    {
      complexity: 0,
      name: 'Protective Bark+',
      isMagical: false,
      rank: 6,
      description: `
        The bonuses to Armor defense and durability increase to \\plus2.
      `,
    },
    {
      complexity: 0,
      name: 'Draw Upon the Healing Land++',
      isMagical: false,
      rank: 7,
      description: `
        The healing increases to three times your rank in this archetype.
      `,
    },
    {
      complexity: 0,
      name: 'Ancient of the Grove',
      isMagical: false,
      rank: 7,
      description: `
        Each of your \\glossterm{vital wounds} only gives you a \\minus1 penalty to your \\glossterm{vital rolls}, rather than the normal \\minus2.
        When you heal with your \\ability{draw upon the healing land} ability, if you did not change location or attack that turn, you can spend three stamina to remove a vital wound of your choice.
        In addition, your natural lifespan is doubled.
      `,
    },
  ];
}

export function elementalistModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, elementalist(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Elemental Balance (Earth)',
      statistic: 'fortitude',
      value: 1,
    });
  }

  if (rank >= 3) {
    const bonus = rank >= 6 ? 2 : 1;
    creature.addCustomModifier({
      name: 'Elemental Power',
      numericEffects: [
        { statistic: 'magical_power', modifier: bonus },
        { statistic: 'mundane_power', modifier: bonus },
      ],
    });
  }

  if (rank >= 7) {
    creature.addSimpleModifier({
      name: 'Elemental Balance+ (Earth)',
      statistic: 'brawn',
      value: 1,
    });
  }
}

export function natureMagicModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, natureMagic(), rank);
  if (rank >= 1) {
    const spellRank = Math.min(rank, 7);
    creature.addSpell(`Armor Bolt Rank ${spellRank}`);
    creature.addSpell(`Fortitude Bolt Rank ${spellRank}`);
    creature.addSpell(`Reflex Cone Rank ${spellRank}`);
  }
}

export function natureSpellMasteryModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, natureSpellMastery(), rank);
  if (rank >= 4) {
    creature.addSimpleModifier({
      name: 'Spell-Trained Senses',
      statistic: 'perception',
      value: 1,
    });
  }

  if (rank >= 7) {
    creature.addCustomModifier({
      name: 'Experienced Spellcaster',
      numericEffects: [
        { statistic: 'accuracy', modifier: 1 },
        { statistic: 'mental', modifier: 1 },
      ],
    });
  }
}

export function shifterModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, shifter(), rank);
  if (rank >= 2) {
    creature.addSimpleModifier({
      name: 'Shift Body (Strength)',
      statistic: 'strength',
      value: 1,
    });
  }

  if (rank >= 6) {
    creature.addCustomModifier({
      name: 'Transformative Toughness',
      numericEffects: [
        { statistic: 'fortitude', modifier: 2 },
        { statistic: 'vital_rolls', modifier: 1 },
      ],
    });
  }
}

export function oakheartModifiers(creature: Creature, rank: number) {
  applyArchetypeActiveAbilities(creature, oakheart(), rank);
}
