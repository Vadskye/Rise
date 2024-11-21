use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::attacks::Maneuver;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

pub fn elementalist<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Elemental Spell",
            is_magical: true,
            rank: 1,
            description: r"
                If you have access to nature magic, you learn a spell from any of the mystic spheres associated with the four elements: \sphere{aeromancy}, \sphere{aquamancy}, \sphere{pyromancy}, or \sphere{terramancy}.
                You do not have to have access to that mystic sphere.
                As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Elemental Spell+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional spell with this ability.
            ",
            modifiers: None,
        },
        // Like Smite, but only adds half Str instead of full Str and has extra tags
        RankAbility {
            name: "Elemental Strike",
            is_magical: true,
            rank: 1,
            description: r"
                If you do not have access to nature magic, you gain the ability to make a strike imbued with elemental force.
                \begin{magicalactiveability}{Elemental Strike}
                    \abilityusagetime Standard action.
                    \rankline
                    Make a \glossterm{strike}.
                    When you use this ability, it has one of the following tags of your choice: \atAir, \atEarth, \atFire, or \atWater.

                    \rankline
                    \rank{2} You add half your Strength to your \glossterm{magical power} to determine your total power with this strike.
                    \rank{3} You deal \glossterm{extra damage} equal to half your power.
                    \rank{4} If you miss, the target still takes the extra damage.
                    \rank{5} Your \glossterm{weapon damage} is doubled.
                    \rank{6} The extra damage increases to be equal to your power.
                    \rank{7} The extra damage increases to twice your power.
                \end{magicalactiveability}
            ",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::ElementalStrike(1))]),
        },
        RankAbility {
            name: "Elemental Tranquility",
            is_magical: true,
            rank: 4,
            description: r"
                If you do not have access to nature magic, you become \impervious to \atAir, \atEarth, and \atWater attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Elemental Strike",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::ElementalStrike(3))]),
        },
        RankAbility {
            name: "Elemental Strike",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::ElementalStrike(5))]),
        },
        RankAbility {
            name: "Elemental Strike",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::ElementalStrike(7))]),
        },
        RankAbility {
            name: "Elemental Influence",
            is_magical: true,
            rank: 3,
            description: r"
                \begin{magicalsustainability}{Elemental Influence}{\abilitytag{Sustain} (standard)}
                    \abilityusagetime Standard action.
                    \rankline
                    You can speak with air, earth, fire, and water within a \areahuge \glossterm{zone} from your location.
                    You can ask the elements simple questions and understand their responses.
                    Each element has different limitations on its memory and awareness, as described below.

                    Air, earth, and water are only able to give information about what they touch.
                    This includes the general shapes, sizes, and locations of creatures and objects they interacted with, but not any details about color or subjective appearance.
                    Fire is also able to give information about anything illuminated by its light, allowing it to report more detailed information like color.
                    It is still unable to make meaningful subjective judgments like a creature would.

                    \begin{itemize}
                        \item Air: Air can remember events up to an hour ago on a very calm day or only a few minutes ago on a windy day.
                            Moving air is aware of events near where it blew through, not necessarily in your current location.
                        \item Earth: Earth can remember events up to a year ago, but its awareness is extremely limited.
                            It can only remember very large events, such as giant creatures tearing up the terrain, earthquakes, or major construction.
                            Earth can tell you whether there exist underground tunnels within the area, but any sort of detailed mapping is beyond its ability to communicate.
                        \item Fire: Fire can remember everything it touched and consumed since it started burning.
                            Individual pieces of a very large fire, such as a particular burning tree in a forest fire, are not aware of the behavior of the entirety of the fire.
                            However, the fire on burning tree could tell you how it got to the tree and everything it burned along the way, including the event that started the forest fire.
                        \item Water: Water can remember events up to a day ago in a very calm pool or only a few minutes ago in a turbulent river.
                            Moving water is aware of events near where it moved through, not necessarily in your current location.
                    \end{itemize}

                    % There must be text between an itemize block and the end of a mdframed env
                    \hypertarget{itemizespace}{}
                \end{magicalsustainability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Elemental Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{power} with all abilities.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Elemental Power+",
            is_magical: true,
            rank: 6,
            description: r"
                The power bonus increases to +2.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Elemental Balance",
            is_magical: true,
            rank: 2,
            description: r"
                You gain a benefit from each of the four elements.
                \begin{itemize}
                    \item Air: You gain a \glossterm{glide speed} 10 feet slower than the \glossterm{base speed} for your size.
                    \item Earth: You gain a \plus1 bonus to your Fortitude defense.
                    \item Fire: You are \trait{impervious} to \atFire attacks.
                    \item Water: You gain a \glossterm{swim speed} 10 feet slower than the \glossterm{base speed} for your size.
                \end{itemize}
            ",
            // TODO: represent movement speeds
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
        RankAbility {
            name: "Elemental Balance+",
            is_magical: true,
            rank: 7,
            description: r"
                Your benefits from each element improve.
                \begin{itemize}
                    \item Air: You gain a \glossterm{fly speed} 10 feet slower than the \glossterm{base speed} for your size with a maximum height of 15 feet (see \pcref{Flight}).
                    As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
                    \item Earth: The Fortitude bonus increases to \plus2.
                    \item Fire: You are immune to \atFire attacks.
                    \item Water: You gain a \plus10 foot bonus to your swim speed.
                \end{itemize}
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
        RankAbility {
            name: "Elemental Control",
            is_magical: true,
            rank: 5,
            description: r"
                When you use your \textit{elemental influence} ability, you can also command the elements to move as you desire.
                Each element has different limitations on its ability to move, as described below.
                \begin{itemize}
                    \item Air: You can change the wind speed of air by up to 50 miles per hour.
                        If you reduce the air's speed to 0 and then increase it again, you can change the direction the air blows.
                    \item Earth: You can reshape earth or unworked stone at a rate of up to one foot per round.
                    \item Fire: You can make fire leap up to 30 feet between combustable materials, suppress fire so it smolders without being extinguished, or snuff out fire entirely.
                    \item Water: You can change the speed of water by up to 30 feet per round.
                        If you reduce the water's speed to 0 and then increase it again, you can change the direction the water flows.
                \end{itemize}
            ",
            modifiers: None,
        },
    ]
}

pub fn nature_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Nature Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your connection to nature grants you the ability to use nature magic.
                You gain access to one nature \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Nature Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional nature \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn nature spells from nature mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 nature \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Nature spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of nature spells that you can learn is equal to your rank in this archetype.
                Nature spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional nature spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature Spells+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional nature spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature Spells+",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional nature spell.
            ",
            modifiers: None,
        },
    ]
}

pub fn nature_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                You can only choose spells with a rank no higher than your rank in this archetype.
                In addition, you cannot choose the same spell with more than two metamagic abilities.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Airborne Spell} Choose a nature \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        It gains the \atAir tag.
                        In addition, you increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Flooding Spell} Choose a nature \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        It gains the \atWater tag.
                        In addition, you increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Grounded Spell} Choose a nature \glossterm{spell} you know.
                        It gains the \atEarth tag.
                        In addition, you gain a \plus2 accuracy bonus with that spell if you are \glossterm{grounded} while casting it.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Incendiary Spell} Choose a nature \glossterm{spell} you know.
                        It gains the \atFire tag.
                        In addition, if you hit a target with that spell, you repeat the spell's effects against that target during the next round.
                        You must make a new attack roll for the repeat with a \minus2 accuracy penalty.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Rituals} You gain the ability to perform nature rituals to create unique magical effects (see \pcref{Spells and Rituals}).
                        The maximum \glossterm{rank} of nature ritual you can learn or perform is equal to the maximum \glossterm{rank} of nature spell that you can cast.
                        In addition, you automatically learn one free nature ritual of each rank you have access to, including new ranks as you gain access to them.
                        You cannot choose this ability multiple times.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Plant Channeling",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you cast a spell, you may choose a Small or larger living plant within \medrange of you.
                If you do, the spell takes effect as if you were in the plant's location.
                This affects your \glossterm{line of effect} for the ability, but not your \glossterm{line of sight} (since you still see from your normal location).
                Since an ability's range is measured from your location, this can allow you to affect targets outside your normal range.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Perception.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Perception, 1)]),
        },
        RankAbility {
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 accuracy bonus with spells.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn shifter<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Wild Aspects",
            is_magical: true,
            rank: 1,
            description: r"
                You gain the ability to embody an aspect of an animal or of nature itself.
                Choose two wild aspects from the list below.
                You can also spend \glossterm{insight points} to learn one additional \textit{wild aspect} per \glossterm{insight point}.

                As a \glossterm{standard action}, you can gain the effects of one wild aspect that you know.
                You cannot change your wild aspect more than once per round.
                That effect lasts until you activate a different wild aspect you know or until you dismiss it.

                The abilities in the list below describe the effects of the aspect.
                Your appearance also changes to match the aspect's effects, but the nature of this change is not described.
                Different druids change in different ways.
                For example, one druid might grow brown fur when using the Form of the Bear, while another might instead change their face to become broader and more bear-shaped when embodying the same aspect.
                You choose how your appearance changes when you gain a wild aspect.
                This change cannot be used to gain an additional substantive benefit beyond the effects given in the description of the aspect.

                Many wild aspects grant natural weapons.
                See \pcref{Natural Weapons}, for details about natural weapons.

                {
                    \begin{magicalactiveability}{Form of the Bear}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \plus1 bonus to your Fortitude defense and vital rolls.
                        In addition, your mouth and hands transform, granting you a bite and two claw \glossterm{natural weapons} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} The Fortitude defense bonus increases to \plus2.
                        \rank{5} The vital roll bonus increases to \plus2.
                        \rank{7} The Fortitude defense bonus increases to \plus3.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Bull}
                        \abilityusagetime Standard action.
                        \rankline
                        You can move your full movement speed when you push a creature with the \ability{shove} ability even if you do not get a critical hit (see \pcref{Shove}).
                        In addition, your head transforms, granting you a gore \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You gain a \plus2 accuracy bonus with the \ability{shove} ability.
                        \rank{5} The accuracy bonus increases to \plus4.
                        \rank{7} When you push a creature with the \textit{shove} ability, the pushed creature also takes \glossterm{weapon damage} from your gore natural weapon.
                        This damage cannot be combined with other effects that deal damage with a shove.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Constrictor}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \plus2 accuracy bonus with the \textit{grapple} ability and all grapple actions (see \pcref{Grapple}).
                        In addition, you can contort your body, allowing it to act as a free hand for the purpose of using the \textit{grapple} ability and grapple actions even if you do not have a free hand.
                        Finally, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} When you grapple a creature with the \ability{grapple} ability, they also take \glossterm{weapon damage} from your bite natural weapon.
                        \rank{5} The accuracy bonus increases to \plus4.
                        \rank{7} When you grapple a creature with the \ability{grapple} ability, you automatically take control of the grapple (see \pcref{Controlling a Grapple}).
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Fish}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \glossterm{swim speed} 10 feet slower than the \glossterm{base speed} for your size.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You can breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
                        \rank{5} You gain a \plus10 foot bonus to your swim speed.
                        \rank{7} You are immune to \magical effects that restrict your mobility.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Hawk}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                        In addition, you gain a \plus3 bonus to the Awareness skill.

                        \rankline
                        \rank{3} You grow wings, granting your a glide speed equal to the \glossterm{base speed} for your size (see \pcref{Gliding}).
                        \rank{5} The skill bonuses increase to \plus5.
                        \rank{7} You gain a \glossterm{fly speed} equal to the \glossterm{base speed} for your size with a maximum height of 60 feet (see \pcref{Flight}).
                        As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Hound}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).
                        In addition, you have the ability to move on all four limbs.
                        When doing so, you become \trait{multipedal} and have no \glossterm{free hands} (see \pcref{Multipedal}).
                        This gives you a \plus10 foot bonus to your \glossterm{land speed} and a \plus5 bonus to the Balance skill.
                        In addition, your bite gains the \weapontag{Heavy} weapon tag.

                        When not using your hands to move, your ability to use your hands is unchanged.
                        You can descend to four legs and rise up to stand on two legs again as part of movement.

                        \rankline
                        \rank{3} You gain the \trait{scent} ability.
                        \rank{5} You gain an additional \plus10 bonus to scent-based Awareness checks (see \pcref{Awareness}).
                        \rank{7} You can run on three limbs instead of four, allowing you to retain one free hand while multipedal.
                    \end{magicalactiveability}

                    % Seems boring? What abilities would make sense?
                    \begin{magicalactiveability}{Form of the Monkey}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \glossterm{climb speed} 10 feet slower than the \glossterm{base speed} for your size.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You grow a tail that you can use as a free hand for the purpose of climbing.
                        \rank{5} You gain a \plus10 foot bonus to your climb speed.
                        \rank{7} You can use the \textit{creature climb} ability against creatures only one size category larger than you instead of two size categories larger than you.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Mouse}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \plus2 bonus to the Flexibility and Stealth skills.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).
                        
                        \rankline
                        \rank{3} When you use this wild aspect, you can choose to shrink by one \glossterm{size category}, to a minimum of Tiny.
                        In addition, if you shapeshift into this form with the \textit{animal shape} ability, you can shrink by two size categories instead of only one.
                        \rank{5} The skill bonuses increase to \plus5.
                        \rank{7} When you use this wild aspect, you can choose to shrink by up to two \glossterm{size categories} instead of only one.
                    \end{magicalactiveability}

                    % \begin{magicalactiveability}{Form of the Oak}
                    %     \rankline
                    %     As long as you have any remaining resistance to physical damage, you are both \immobilized and \trait{impervious} to \glossterm{physical damage}.
                    %     \rankline
                    %     \rank{3} You also gain a \plus1 bonus to your Armor defense.
                    %     \rank{5} The resistance bonus increases to be equal to three times your rank in this archetype.
                    %     \rank{7} The defense bonuse increases to \plus2.
                    % \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Viper}
                        \abilityusagetime Standard action.
                        \rankline
                        You do not need to use \glossterm{free hands} to climb (see \pcref{Climb}).
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).
                        When a creature takes damage from your bite \glossterm{natural weapon}, it is \glossterm{poisoned} (see \pcref{Poison}).
                        Its stage 1 effect makes the target \glossterm{briefly} \stunned.
                        Its stage 3 effect makes the target stunned while the poison lasts.

                        \rankline
                        \rank{3} You gain a \plus1 accuracy bonus with all poisons.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{7} The accuracy bonus increases to \plus3.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Form of the Wolf}
                        \abilityusagetime Standard action.
                        \rankline
                        You gain a \plus1 bonus to \glossterm{accuracy} against creatures that are adjacent to both you and one of your \glossterm{allies}.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You gain the \trait{scent} ability.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{7} The accuracy bonus applies even if you are not adjacent to a creature, as long as one of your allies is adjacent to the creature.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Myriad Form}
                        \abilityusagetime Standard action.
                        \rankline
                        If you have Disguise as a \glossterm{trained skill}, you gain a +3 bonus to it.
                        Otherwise, you are treated as being trained in that skill.

                        \rankline
                        % No maximum because the ability is magical
                        \rank{3} When you use this wild aspect, you can choose to grow or shrink by one \glossterm{size category} (see \pcref{Size Categories}).
                            If you increase your size, you are slightly clumsy in your new size, and you take a -10 foot penalty to your speed with all of your \glossterm{movement modes}.
                        \rank{5} You can disguise yourself as a \glossterm{standard action} (see \pcref{Disguise}).
                        \rank{7} When you use this wild aspect, you can choose to grow or shrink by up to two \glossterm{size categories} instead of only one.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Photosynthesis}
                        \abilityusagetime Standard action.
                        \rankline
                        % Weird to use non-rolled hp value, but the scaling is fine?
                        As long as you are in natural sunlight, you regain hit points equal to half your \glossterm{power} at the end of each round.
                        This cannot heal you above half your maximum \glossterm{hit points}.
                        \rankline
                        \rank{3} You do not gain hunger or thirst while in natural sunlight.
                        When you leave natural sunlight, you continue gaining hunger or thirst at your normal rate, ignoring any time you spent in natural sunlight.
                        \rank{5} The healing from this wild aspect increases to be equal to your \glossterm{power}.
                        \rank{7} When you finish a \glossterm{short rest} while you are in natural sunlight, you can remove a \glossterm{vital wound}.
                        When you do, you increase your \glossterm{fatigue level} by four.
                    \end{magicalactiveability}

                    \begin{magicalactiveability}{Plantspeaker}
                        \abilityusagetime Standard action.
                        \rankline
                        Your speed is not reduced when moving in \glossterm{heavy undergrowth}.
                        In addition, you can ignore \glossterm{cover} and \glossterm{concealment} from plants whenever doing so would be beneficial to you, as the plants move out of the way to help you.
                        This prevents you from suffering penalties on your attacks, and also prevents creatures from using cover or concealment from plants to hide from you.

                        \rankline
                        \rank{3} You gain a \plus1 bonus to your Armor and Reflex defenses while standing in \glossterm{undergrowth}.
                        \rank{5} All \glossterm{light undergrowth} within a \medarea radius from you is treated as \glossterm{difficult terrain} for your \glossterm{enemies}.
                        \rank{7} The radius of difficult terrain increases to \largearea.
                    \end{magicalactiveability}
                }
            ",
            // Arbitrarily choose Bear form, since it's easy to represent? Unclear.
            // TODO: no way to represent natural weapons.
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 2)]),
        },
        RankAbility {
            name: "Shift Body",
            is_magical: true,
            rank: 2,
            description: r"
                \begin{magicalattuneability}{Shift Body}{\abilitytag{Attune}}
                    \abilityusagetime Can be triggered when you finish a \glossterm{long rest}.
                    \rankline
                    When you use this ability, choose a physical \glossterm{attribute}: Strength, Dexterity, or Constitution (see \pcref{Attributes}).
                    You gain a \plus1 \glossterm{enhancement bonus} to that attribute.
                \end{magicalattuneability}
            ",
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Constitution, 1),
                Modifier::Resource(Resource::AttunementPoint, -1),
            ]),
        },
        RankAbility {
            name: "Shift Body+",
            is_magical: true,
            rank: 5,
            description: r"
                This ability loses the \abilitytag{Attune} tag.
                Instead, it lasts until you use it again.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Shifting Strike",
            is_magical: false,
            rank: 3,
            description: r"
                % Assume that choosing defense is worth about +3 accuracy, which is roughly 50% more damage
                \begin{magicalactiveability}{Shifting Strike}
                    \abilityusagetime Standard action.
                    \rankline
                    Choose Armor, Reflex, or Fortitude defense.
                    Make a \glossterm{strike} against that defense with a \glossterm{natural weapon}.

                    \rankline
                    \rank{4} You can choose to deal double \glossterm{weapon damage} with the strike.
                    If you do, you take a -4 accuracy penalty.
                    \rank{5} You gain a +1 accuracy bonus with the strike.
                    \rank{6} The accuracy bonus increases to +2.
                    \rank{7} The accuracy bonus increases to +3.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Shape",
            is_magical: true,
            rank: 4,
            description: r"
                Whenever you activate a \ability{wild aspect} that represents a specific animal, you can fully \glossterm{shapeshift} to match that animal's shape.
                This cannot increase your \glossterm{size category}, but you can shrink by one size category if it is appropriate for that animal.
                You may choose to reshape any body armor you wear as barding to fit the animal instead of melding it into your form.
                The armor regains its normal shape if you take it off.
                For details about shapeshifting, see \pcref{Shapeshifting}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Cleansing Shift",
            is_magical: true,
            rank: 6,
            description: r"
                Whenever you activate a new \ability{wild aspect}, you can also remove one \glossterm{condition}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Shape+",
            is_magical: true,
            rank: 7,
            description: r"
                You may either grow or shrink by one \glossterm{size category} when you shapeshift with this ability, regardless of whether it would normally be appropriate for that animal.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Hybrid Aspect",
            is_magical: true,
            rank: 7,
            description: r"
                When you use your \textit{wild aspect} ability, you can take on two aspects at once, gaining the full benefits of both.
                When you do, you increase your \glossterm{fatigue level} by two.
                This hybrid aspect only lasts for ten minutes, at which point you choose which single aspect remains active.
            ",
            modifiers: None,
        },
    ]
}

pub fn wildspeaker<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Natural Servant",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{natural servant} ability.
                This ability requires spending one hour performing rituals in a natural area.
                \begin{magicalattuneability}{Natural Servant}{\abilitytag{Attune} (deep)}
                    \abilityusagetime One hour of rituals in a natural area.
                    \rankline
                    An animal native to the local environment appears to help you.
                    It follows your directions to the best of its ability as long as you remain in its natural environment.
                    If you leave the animal's natural habitat, it remains behind and this effect ends.

                    Your magical connection to the animal improves its resilience and strength in combat.
                    The animal's statistics use the values below, except that each animal also gains a special ability based on the environment you are in.
                    Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.

                    \begin{itemize}
                        \item Its size category is Medium, and its \glossterm{base speed} is 30 feet.
                        \item It has no \glossterm{resources}, and it cannot use abilities that increase its fatigue level.
                        \item Its \glossterm{hit points} are equal to the standard value for your level and base class (see Base Class Abilities, above).
                        \item Its \glossterm{damage resistance} is equal to half its hit points, ignoring any \glossterm{enhancement bonuses} to hit points.
                        \item Each of its \glossterm{defenses} is equal to 5 \add half your level.
                        \item Its \glossterm{accuracy} is equal to half the sum of your level and Perception.
                        \item Its \glossterm{power} is 0.
                        \item It does not make \glossterm{vital rolls}, but it automatically drops unconscious if it gains a \glossterm{vital wound}. If it gains three vital wounds, it dies.
                        \item It automatically shares the benefits of all of your \glossterm{enhancement bonuses} to hit points and damage resistance.
                    \end{itemize}
                    % There must be text between an itemize block and the end of a mdframed env

                    \rankline
                    \rank{3} The animal's \glossterm{power} becomes equal to your \glossterm{magical power}, which increases its \glossterm{weapon damage} as normal (see \pcref{Weapon Damage}).
                    \rank{4} The animal gains a +1 \glossterm{accuracy} bonus with \glossterm{strikes}.
                    \rank{5} The accuracy bonus increases to +2.
                    \rank{6} The accuracy bonus increases to +4.
                    \rank{7} The animal's \glossterm{weapon damage} is doubled.
                    However, the accuracy bonus is reduced to +2.
                \end{magicalattuneability}

                The special ability of the animal that appears depends on your environment, as described below.
                You may choose a different animal native to that environment that is similar in size and type, but that does not change the animal's statistics.
                For example, your \textit{natural servant} in an aquatic environment may be a fish or seal instead of a shark.
                Unusual environments may have different animals than the standard animals listed below.
                \begin{itemize}
                    \item Aquatic: A shark appears that has a 30 foot \glossterm{swim speed} and no land speed.
                        It has a bite \glossterm{natural weapon}.
                    \item Arctic: An arctic fox appears that has no penalties for being in cold environments.
                        It has a bite \glossterm{natural weapon}.
                    \item Desert: A hyena appears that has no penalties for being in hot environments.
                        It has a bite \glossterm{natural weapon}.
                    \item Mountain: A goat appears that can move up or down steep slopes without slowing its movement.
                        It has a ram \glossterm{natural weapon}.
                    \item Forest: A wolverine appears that has two additional \glossterm{hit points}.
                        It has a bite \glossterm{natural weapon}.
                    \item Plains: A wolf appears that has the \trait{scent} ability.
                        It has a bite \glossterm{natural weapon}.
                    \item Swamp: A crocodile appears that has a 20 foot \glossterm{land speed} and a 30 foot \glossterm{swim speed}.
                        It has a bite \glossterm{natural weapon}.
                    \item Underground: A dire rat appears that has \trait{low-light vision}.
                        It has a bite \glossterm{natural weapon}.
                \end{itemize}
            ",
            // TODO: represent a whole extra creature???
            modifiers: None,
        },
        RankAbility {
            name: "Natural Servant+",
            is_magical: true,
            rank: 7,
            description: r"
                You may choose to have a Large natural servant appear instead of a Medium natural servant.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Speech",
            is_magical: true,
            rank: 2,
            description: r"
                \begin{magicalsustainability}{Animal Speech}{\abilitytag{Sustain} (minor)}
                    \abilityusagetime Standard action.
                    \rankline
                    Choose an animal within \rnglong range.
                    You can speak to and understand the speech of the target animal, and any other animals of the same species.

                    This ability does not make the target any more friendly or cooperative than normal.
                    Wary and cunning animals are likely to be terse and evasive, while stupid ones tend to make inane comments and are unlikely to say or understand anything of use.
                \end{magicalsustainability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Animal Speech+",
            is_magical: true,
            rank: 5,
            description: r"
                When you use this ability, you may target any living creature that knows at least one language.
                If you target a non-animal in this way, you do not gain the ability to speak with and understand the speech of other creatures of the target's species.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature's Ally",
            is_magical: true,
            rank: 3,
            description: r"
                You and your \glossterm{allies} within a \hugearea radius \glossterm{emanation} from you are under nature's protection.
                Animals will not willingly attack protected creatures, and will automatically attempt to help if the protected creatures are in mortal danger.
                For example, if you are attacked while in a forest, nearby birds might start harassing your foes, at the GM's discretion.
                If any protected target attacks a creature that this ability protects you from, this ability is \glossterm{suppressed} until you finish a \glossterm{long rest}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature's Ally+",
            is_magical: true,
            rank: 6,
            description: r"
                % TODO: does this need a glossterm? These are only defined fully in the Tome of Guidance.
                This ability also protects you and your allies from plant animates, elemental planeforged, and all summoned creatures.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Natural Attunement",
            is_magical: true,
            rank: 4,
            description: r"
                Your \textit{natural servant} gains an \glossterm{attunement point}.
                This attunement point is shared among any creatures you summon with your \textit{natural servant} ability.
                In addition, you can cast \abilitytag{Attune} spells on your \textit{natural servant} if it is within \shortrange of you.
                When you do, the natural servant attunes to the spell intead of you, as if the spell was an \abilitytag{Attune} (target) spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Natural Attunement+",
            is_magical: true,
            rank: 7,
            description: r"
                Your natural servant gains an additional attunement point.
            ",
            modifiers: None,
        },
    ]
}
