use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::{Maneuver, Modifier};
use crate::skills::Skill;

pub fn elementalist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Elemental Balance",
            is_magical: true,
            rank: 0,
            description: r"
                You gain a small benefit from each of the four elements.
                \begin{itemize}
                    \item Air: You gain a \plus2 bonus to the Jump skill.
                    \item Earth: You gain a \plus1 bonus to your Fortitude defense.
                    \item Fire: You suffer no heat-related penalties for being in environments with temperatures up to 150 degrees Fahrenheit.
                    \item Water: You gain a \plus2 bonus to the Swim skill.
                \end{itemize}
            ",
            modifiers: Some(vec![
                Modifier::Defense(Defense::Fortitude, 1),
                Modifier::Skill(Skill::Jump, 2),
                Modifier::Skill(Skill::Swim, 2),
            ]),
        },
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
            name: "Elemental Strike",
            is_magical: true,
            rank: 1,
            description: r"
                If you do not have access to nature magic, you gain the ability to make a strike imbued with elemental force.
                You can use the \textit{elemental strike} ability as a standard action.
                \begin{instantability}{Elemental Strike}[Instant]
                    \abilitytag{Magical}
                    \rankline
                    Make a \glossterm{strike}.
                    Damage dealt by the strike is bludgeoning and fire damage in addition to its normal damage types.
                    You may use the higher of your \glossterm{magical} power and your \glossterm{mundane} power to determine your damage with this ability.

                    \rankline
                    \rank{3} You gain a \plus2 damage bonus with the strike.
                    \rank{5} The damage bonus increases to \plus4.
                    \rank{7} The damage bonus increases to \plus8.
                \end{instantability}
            ",
            modifiers: Some(vec![Modifier::Maneuver(Maneuver::ElementalStrike(1))]),
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
            rank: 2,
            description: r"
                You can use the \textit{elemental influence} ability as a standard action.
                \begin{durationability}{Elemental Influence}[\abilitytag{Sustain} (standard)]
                    \rankline
                    You can speak with air, earth, fire, and water within a \areahuge \glossterm{zone} from your location.
                    You can ask the elements simple questions and understand their responses.
                    Each element has different limitations on its memory and awareness, as described below.

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

                    % Oddly placed? there must be text between an itemize block and the end of a mdframed env
                    Air, earth, and water are only able to give information about what they touch.
                    This includes the general shapes, sizes, and locations of creatures and objects they interacted with, but not any details about color or subjective appearance.
                    Fire is also able to give information about anything illuminated by its light, allowing it to report more detailed information like color.
                    It is still unable to make meaningful subjective judgments like a creature would.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Elemental Balance",
            is_magical: true,
            rank: 3,
            description: r"
                The bonuses from your \textit{elemental balance} ability improve.
                \begin{itemize}
                    \item Air: You gain a \glossterm{glide speed} equal to half the \glossterm{base speed} for your size.
                    \item Earth: The bonus to your Fortitude defense increases to \plus2.
                    \item Fire: You are \trait{impervious} to fire damage.
                    \item Water: You gain a \glossterm{swim speed} equal to half the \glossterm{base speed} for your size.
                \end{itemize}
            ",
            // TODO: represent movement speeds
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
        RankAbility {
            name: "Elemental Spell",
            is_magical: true,
            rank: 4,
            description: r"
                If you have access to nature magic, you learn an additional spell with your \textit{elemental spell} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Elemental Strike",
            is_magical: true,
            rank: 4,
            description: r"
                If you do not have access to nature magic, you gain a +5 foot bonus to your \glossterm{reach} with your \textit{elemental strike} ability.
            ",
            modifiers: None,
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
        RankAbility {
            name: "Elemental Power",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus4 bonus to your \glossterm{power}.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(4), Modifier::MundanePower(4)]),
        },
        RankAbility {
            name: "Supreme Elemental Balance",
            is_magical: true,
            rank: 7,
            description: r"
                The bonuses from your \textit{elemental balance} ability improve.
                \begin{itemize}
                    \item Air: You gain a \glossterm{fly speed} equal to half the \glossterm{base speed} for your size with a maximum height of 15 feet (see \pcref{Flying}).
                    At the start of each phase, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
                    \item Earth: The bonus to your Fortitude defense increases to \plus3.
                    \item Fire: You treat all fire damage you take as being \glossterm{environmental damage}.
                    \item Water: Your swim speed increases to be equal to the base speed for your size.
                \end{itemize}
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
    ];
}

pub fn nature_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            is_magical: true,
            rank: 0,
            description: r"
                Your connection to nature grants you the ability to use nature magic.
                You gain access to one nature \glossterm{mystic sphere} (see \pcref{Nature Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional nature \glossterm{mystic sphere} per two \glossterm{insight points}.
                You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
                You do not yet gain access to any other spells from those mystic spheres.

                Nature spells require \glossterm{verbal components} to cast (see \pcref{Casting Components}).
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spellcasting",
            is_magical: true,
            rank: 1,
            description: r"
                You become a rank 1 nature spellcaster.
                You learn two rank 1 \glossterm{spells} from nature \glossterm{mystic spheres} you have access to.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
                Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.
                All of those spells must be from nature mystic spheres you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (2)",
            is_magical: true,
            rank: 2,
            description: r"
                You become a rank 2 nature spellcaster.
                This gives you access to spells that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional nature \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (3)",
            is_magical: true,
            rank: 3,
            description: r"
                You become a rank 3 nature spellcaster.
                This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (4)",
            is_magical: true,
            rank: 4,
            description: r"
                You become a rank 4 nature spellcaster.
                This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional nature \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (5)",
            is_magical: true,
            rank: 5,
            description: r"
                You become a rank 5 nature spellcaster.
                This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (6)",
            is_magical: true,
            rank: 6,
            description: r"
                You become a rank 6 nature spellcaster.
                This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Rank (7)",
            is_magical: true,
            rank: 7,
            description: r"
                You become a rank 7 nature spellcaster.
                This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional nature \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
            modifiers: None,
        },
    ];
}

pub fn nature_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Combat Caster",
            is_magical: true,
            rank: 0,
            description: r"
                You gain a \plus1 bonus to your Armor defense.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 1,
            description: r"
                You gain your choice of one of the following abilities.
                You can also spend \glossterm{insight points} to learn one additional \textit{mystic insight} per insight point.
                You cannot apply the benefits of more than two \textit{mystic insight} abilities to the same spell.
                {
                    \parhead{Distant Spell} Choose a nature \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Rituals} You gain the ability to perform nature rituals to create unique magical effects (see \pcref{Rituals}).
                        The maximum \glossterm{rank} of nature ritual you can learn or perform is equal to the maximum \glossterm{rank} of nature spell that you can cast.
                        In addition, you automatically learn one free nature ritual of each rank you have access to, including new ranks as you gain access to them.
                        You cannot choose this ability multiple times.
                    \parhead{Spell Knowledge} You learn an additional nature \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                        You can choose this ability multiple times, learning an additional spell each time.
                    \parhead{Precise Spell} Choose a nature \glossterm{spell} you know.
                        You gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Powerful Spell} Choose a nature \glossterm{spell} you know.
                        You gain a +2 bonus to your \glossterm{power} with that spell.
                        This bonus increases to +4 at rank 3, +8 at rank 5, and +16 at rank 7.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Widened Spell} Choose a nature \glossterm{spell} you know with a standard \glossterm{area}: Small, Medium, Large, Huge, or Gargantuan.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Plant Channeling",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you cast a spell, you may treat all effects of the spell as if you were located at any Tiny or larger living plant within \medrange instead of in your current location.
                This allows you to measure the spell's range from the plant's location, cone-shaped areas originate from the plant's location instead of your own, and so on.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(2)]),
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional \textit{mystic insight} ability.
            ",
            modifiers: None,
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
            name: "Greater Wellspring of Power",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{wellspring of power} ability increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::MagicalPower(4)]),
        },
        RankAbility {
            name: "Mystic Insights",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional \textit{mystic insight} abilities.
            ",
            modifiers: None,
        },
    ];
}

pub fn shifter<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Shifting Defense",
            is_magical: true,
            rank: 0,
            description: r"
                You gain a \plus2 bonus to your Fortitude, Reflex, or Mental defense.
                You can change the defense this bonus applies to as a \glossterm{standard action}.
            ",
            // Arbitrarily choose Ref defense? Unclear whether this should be a single defense or
            // all defenses for the purpose of calculations, since there is no way to choose lowest
            // defense easily
            modifiers: Some(vec![Modifier::Defense(Defense::Reflex, 2)]),
        },
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
                That effect lasts until you activate a different wild aspect you know or until you dismiss it as a \glossterm{free action}.

                The abilities in the list below describe the effects of the aspect.
                Your appearance also changes to match the aspect's effects, but the nature of this change is not described.
                Different druids change in different ways.
                For example, one druid might grow brown fur when using the Form of the Bear, while another might instead change their face to become broader and more bear-shaped when embodying the same aspect.
                You choose how your appearance changes when you gain a wild aspect.
                This change cannot be used to gain an additional substantive benefit beyond the effects given in the description of the aspect.

                Many wild aspects grant natural weapons.
                See \pcref{Natural Weapons}, for details about natural weapons.

                {
                    \begin{durationability}{Form of the Bear}[Duration]
                        \rankline
                        You gain a \plus1 bonus to your Fortitude defense.
                        In addition, your mouth and hands transform, granting you a bite and two claw \glossterm{natural weapons} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} The Fortitude bonus increases to \plus2.
                        \rank{5} The Fortitude bonus increases to \plus3.
                        \rank{7} The Fortitude bonus increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Form of the Bull}[Duration]
                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the \textit{shove} ability (see \pcref{Shove}).
                        In addition, your head transforms, granting you a gore \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} The accuracy bonus increases to \plus3.
                        \rank{5} You can move your full movement speed when you push a creature with the \textit{shove} ability even if you do not get a critical hit.
                        \rank{7} When you push a creature with the the \textit{shove} ability, the pushed creature also takes damage as if you had hit it with your gore natural weapon.
                        This damage cannot be combined with other effects that deal damage with a shove, such as the \textit{wall slam} ability.
                    \end{durationability}

                    \begin{durationability}{Form of the Constrictor}[Duration]
                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the \textit{grapple} ability and all grapple actions (see \pcref{Grapple}).
                        In addition, you gain a tentacle \glossterm{natural weapon} (see \tref{Natural Weapons}).
                        This weapon deals 1d10 damage, and it has the Grappling weapon tag (see \pcref{Weapon Tags}).
                        It can only be used against a foe you are grappling with.

                        \rankline
                        \rank{3} The accuracy bonus increases to \plus3.
                        \rank{5} You can contort your body, allowing it to act as a free hand for the purpose of using the \textit{grapple} ability and grapple actions even if you do not have a free hand.
                        \rank{7} When you grapple a creature with the \textit{grapple} ability, you are not considered to be \grappled (see \pcref{Asymmetric Grappling}).
                    \end{durationability}

                    \begin{durationability}{Form of the Fish}[Duration]
                        \rankline
                        You gain a \glossterm{swim speed} equal to the \glossterm{base speed} for your size.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You can breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
                        \rank{5} You gain a \plus10 foot bonus to your swim speed.
                        \rank{7} You are immune to \glossterm{magical} effects that restrict your mobility.
                        In addition, you gain a \plus4 bonus to your defenses against the \textit{grapple} ability and grapple actions (see \pcref{Grapple}).
                    \end{durationability}

                    \begin{durationability}{Form of the Hawk}[Duration]
                        \rankline
                        You gain \trait{low-light vision}, allowing you to see in \glossterm{shadowy illumination} (see \pcref{Low-light Vision}).
                        In addition, you gain a \plus3 bonus to Awareness.

                        \rankline
                        \rank{3} You grow wings, granting your a glide speed equal to the \glossterm{base speed} for your size (see \pcref{Gliding}).
                        \rank{5} The Awareness bonus increases to \plus6.
                        \rank{7} You gain a \glossterm{fly speed} equal to the \glossterm{base speed} for your size with a maximum height of 60 feet (see \pcref{Flying}).
                        At the start of each phase, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
                    \end{durationability}

                    \begin{durationability}{Form of the Hound}[Duration]
                        \rankline
                        You gain the ability to move on all four limbs.
                        When doing so, you gain a \plus10 foot bonus to your land speed.
                        When not using your hands to move, your ability to use your hands is unchanged.
                        You can descend to four legs and rise up to stand on two legs again as part of movement.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You gain the \trait{scent} ability.
                        \rank{5} You gain a \plus5 foot bonus to your land speed.
                        \rank{7} You gain an additional \plus10 bonus to scent-based Awareness checks (see \pcref{Awareness}).
                    \end{durationability}

                    % Seems boring? What abilities would make sense?
                    \begin{durationability}{Form of the Monkey}[Duration]
                        \rankline
                        You gain a \glossterm{climb speed} equal to the \glossterm{base speed} for your size.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} You grow a tail that you can use as a free hand for the purpose of climbing.
                        \rank{5} You gain a \plus5 foot bonus to your climb speed.
                        \rank{7} You can use the \textit{creature climb} ability against creatures only one size category larger than you instead of two size categories.
                    \end{durationability}

                    \begin{durationability}{Form of the Mouse}[Duration]
                        \rankline
                        You gain a \plus2 bonus to the Flexibility and Stealth skills.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).
                        
                        \rankline
                        \rank{3} When you use this wild aspect, you can choose to shrink by one \glossterm{size category}, to a minimum of Tiny.
                        \rank{5} The skill bonuses increases to \plus4.
                        \rank{7} When you use this wild aspect, you can choose to shrink by up to two \glossterm{size categories} instead of only one.
                    \end{durationability}

                    % \begin{durationability}{Form of the Oak}[Duration]
                    %     \rankline
                    %     As long as you have any remaining resistance to physical damage, you are both \glossterm{immobilized} and \trait{impervious} to \glossterm{physical damage}.
                    %     \rankline
                    %     \rank{3} You also gain a \plus1 bonus to your Armor defense.
                    %     \rank{5} The resistance bonus increases to be equal to three times your rank in this archetype.
                    %     \rank{7} The defense bonuse increases to \plus2.
                    % \end{durationability}

                    \begin{durationability}{Form of the Viper}[Duration]
                        \rankline
                        You gain a \glossterm{climb speed} equal to half the \glossterm{base speed} for your size.
                        You do not need to use your hands to climb in this way.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} When a creature takes damage from your bite \glossterm{natural weapon}, it is \glossterm{poisoned} (see \pcref{Poison}).
                        The first poison stage makes the target \dazed as long as it is poisoned.
                        The third poison stage makes the target \stunned instead of dazed.
                        \rank{5} You gain a \plus1 accuracy bonus with all poisons.
                        \rank{7} The accuracy bonus increases to \plus2.
                    \end{durationability}

                    \begin{durationability}{Form of the Wolf}[Duration]
                        \rankline
                        You gain a \plus1 bonus to \glossterm{accuracy} with \glossterm{strikes} against creatures that are adjacent to you and one of your \glossterm{allies}.
                        In addition, you gain a bite \glossterm{natural weapon} (see \tref{Natural Weapons}).

                        \rankline
                        \rank{3} The accuracy bonus applies to all attacks, not just strikes.
                        \rank{5} You gain a \plus5 foot bonus to your land speed.
                        \rank{7} The accuracy bonus applies even if you are not adjacent to a creature, as long as one of your allies is adjacent to the creature.
                    \end{durationability}

                    \begin{durationability}{Myriad Form}[Duration]
                        \rankline
                        You can use your \glossterm{power} in place of your Disguise skill when making Disguise checks to alter your own appearance.

                        \rankline
                        \rank{3} When you use this wild aspect, you can choose to grow or shrink by one \glossterm{size category}.
                            Your physical form is not altered fully to match your new size, and your Strength and Dexterity are unchanged.
                        \rank{5} You can use the \textit{disguise creature} ability to disguise yourself as a \glossterm{standard action} (see \pcref{Disguise Creature}).
                        \rank{7} When you use this wild aspect, you can choose to grow or shrink by up to two \glossterm{size categories} instead of only one.
                    \end{durationability}

                    \begin{durationability}{Photosynthesis}[Duration]
                        \rankline
                        As long as you are in natural sunlight, you gain a \plus5 foot bonus to your speed with all \glossterm{movement modes}.
                        \rankline
                        \rank{3} As long as you are in natural sunlight, you do not gain hunger or thirst.
                        When you leave natural sunlight, you continue gaining hunger or thirst at your normal rate, ignoring any time you spent in natural sunlight.
                        \rank{5} The speed bonus increases to \plus10 feet.
                        \rank{7} When you take a \glossterm{short rest} while you are in natural sunlight, you remove a \glossterm{vital wound}.
                    \end{durationability}

                    \begin{durationability}{Plantspeaker}[Duration]
                        \rankline
                        Your speed is not reduced when moving in light or heavy \glossterm{undergrowth}.
                        In addition, you can ignore \glossterm{cover} and \glossterm{concealment} (but not \glossterm{total cover}) from plants whenever doing so would be beneficial to you, as the plants move out of the way to help you.
                        This prevents you from suffering penalties on your attacks, and also prevents creatures from using cover or concealment from plants to hide from you.

                        \rankline
                        \rank{3} You gain a \plus1 bonus to your Armor and Reflex defenses while standing in \glossterm{undergrowth}.
                        \rank{5} The movement penalties from \glossterm{undergrowth} are doubled for enemies within a \areahuge radius emanation from you.
                        \rank{7} The bonus to your Armor and Reflex defenses increases to \plus2.
                    \end{durationability}
                }
            ",
            // Arbitrarily choose Bear form, since it's easy to represent? Unclear.
            // TODO: no way to represent natural weapons.
            modifiers: Some(vec![Modifier::Defense(Defense::Fortitude, 1)]),
        },
        RankAbility {
            name: "Shift Body",
            is_magical: true,
            rank: 2,
            description: r"
                You can use the \textit{shift body} ability whenever you finish a \glossterm{long rest}.
                \begin{attuneability}{Shift Body}[\abilitytag{Attune} (self)]
                    \rankline
                    When you use this ability, choose a physical \glossterm{attribute}: Strength, Dexterity, or Constitution (see \pcref{Attributes}).
                    You gain a \plus1 bonus to the base value of that attribute.
                \end{attuneability}
            ",
            modifiers: Some(vec![
                Modifier::BaseAttribute(Attribute::Constitution, 1),
                Modifier::Resource(Resource::AttunementPoint, -1),
            ]),
        },
        RankAbility {
            name: "Greater Shifting Defense",
            is_magical: true,
            rank: 3,
            description: r"
                The bonus from your \textit{shifting defense} ability increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Reflex, 1)]),
        },
        RankAbility {
            name: "Natural Force",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with natural weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Greater Wild Aspect",
            is_magical: true,
            rank: 4,
            description: r"
                You can change your \textit{wild aspect} as a \glossterm{minor action} instead of as a standard action.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Shift Body",
            is_magical: true,
            rank: 5,
            description: r"
                Your \textit<shift body> ability loses the \glossterm{Attune} (self) tag.
                Instead, it lasts until you use it again.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Greater Natural Force",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{natural force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Supreme Shifting Defense",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{shifting defense} ability increases to \plus4.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Reflex, 1)]),
        },
        RankAbility {
            name: "Supreme Wild Aspect",
            is_magical: true,
            rank: 7,
            description: r"
                You can change your \textit{wild aspect} as a \glossterm{free action} instead of as a minor action, and changing your wild aspect gains the \glossterm{Swift} tag.
                In addition, you learn an additional \textit{wild aspect}.
            ",
            modifiers: None,
        },
    ];
}

pub fn wildspeaker<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Animal Speech",
            is_magical: true,
            rank: 0,
            description: r"
                You can use the \textit{animal speech} ability as a standard action.
                \begin{durationability}{Animal Speech}[\abilitytag{Sustain} (minor)]
                    \rankline
                    Choose an animal within \rnglong range.
                    You can speak to and understand the speech of the target animal, and any other animals of the same species.

                    This ability does not make the target any more friendly or cooperative than normal.
                    Wary and cunning animals are likely to be terse and evasive, while stupid ones tend to make inane comments and are unlikely to say or understand anything of use.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Natural Servant",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{natural servant} ability.
                This ability requires spending 1 hour performing rituals in a natural area.
                \begin{attuneability}{Natural Servant}[\abilitytag{Attune} (self)]
                    \rankline
                    An animal native to the local environment appears to help you.
                    It follows your directions to the best of its ability as long as you remain in its natural environment.
                    If you leave the animal's natural habitat, it remains behind and this effect ends.

                    Your magical connection to the animal improves its resilience and strength in combat.
                    The animal's statistics use the values below, except that each animal also gains a special ability based on the environment you are in.
                    \begin{itemize}
                        \item Its size category is Medium, and its \glossterm{base speed} is the normal base speed for its size (see \tref{Size in Combat}).
                        \item Its \glossterm{fatigue tolerance} is 0, and it cannot use abilities that would cause it to increase its \glossterm{fatigue level}.
                        \item Its \glossterm{hit points} are equal to the base value for your level (see \tref{Character Advancement}).
                        \item Its \glossterm{damage resistance} is equal to the base value for your level (see \pcref{Character Advancement}).
                        \item Each of its \glossterm{defenses} is equal to 5 \add your level.
                        \item Its \glossterm{accuracy} is equal to your level \add half your base Perception.
                        \item Its \glossterm{power} with its attacks is 0.
                        \item It has no \glossterm{attunement points}.
                        \item The damage dealt by its natural weapons increases by \plus1d for each rank in this archetype beyond 1.
                        \item It does not make \glossterm{vital rolls}, but it automatically drops unconscious if it gains a \glossterm{vital wound}. If it gains three vital wounds, it dies.
                        \item It automatically shares the benefits of all of your \glossterm{magic bonuses} to hit points, damage resistance, and power.
                    \end{itemize}

                    % Oddly placed? there must be text between an itemize block and the end of a mdframed env
                    Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
                \end{attuneability}

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
                    \item Swamp: A crocodile appears that has a 15 foot \glossterm{land speed} and a 25 foot \glossterm{swim speed}.
                        It has a bite \glossterm{natural weapon}.
                    \item Underground: A dire rat appears that has \trait{low-light vision}.
                        It has a bite \glossterm{natural weapon}.
                \end{itemize}
            ",
            // TODO: represent a whole extra creature???
            modifiers: None,
        },
        RankAbility {
            name: "Nature's Ally",
            is_magical: true,
            rank: 2,
            description: r"
                Animals will not willingly attack you or your \glossterm{allies} within a \largearea radius \glossterm{emanation} from you.
                They can be compelled to attack despite this protection with a Creature Handling check against a \glossterm{difficulty value} equal to 10 \add your level.
                If any target attacks a creature that this ability protects you from, this ability is \glossterm{suppressed} until you take a \glossterm{short rest}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Nature's Might",
            is_magical: true,
            rank: 3,
            description: r"
                You and your \textit{natural servant} gain a \plus1d damage bonus with \glossterm{natural weapons}.
            ",
            // TODO: make this only work with natural weapons
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Plant Speech",
            is_magical: true,
            rank: 3,
            description: r"
                When you use your \textit{animal speech} ability, you can choose a plant instead of an animal.
                If you do, you can speak to and understand the speech of the target plant, and any other plants of the same species.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Natural Servant",
            is_magical: true,
            rank: 4,
            description: r"
                Your \textit{natural servant} gains an \glossterm{attunement point}.
                This attunement point is shared among any creatures you summon with your \textit{natural servant} ability, and is only recovered when you take a \glossterm{long rest}.
                In addition, you can cast \glossterm{Attune} (self) spells on your \textit{natural servant} if it is within \shortrange of you.
                When you do, the natural servant attunes to the spell intead of you, as if the spell was an \glossterm{Attune} (target) spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Nature's Ally",
            is_magical: true,
            rank: 5,
            description: r"
                Your \textit{nature's ally} ability also protects you and your allies from plant-based animates and elemental-based animates.
                In addition, all creatures that you are protected from with this ability automatically attempt to aid you and your allies if they observe you fighting.
                Finally, the effect can no longer be bypassed with a Creature Handling check or any other form of control that does not first suppress this effect.
                Even creatures summoned by enemies to fight you will immediately turn on their summoners or otherwise avoid attacking you.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Universal Speech",
            is_magical: true,
            rank: 6,
            description: r"
                When you use your \textit{animal speech} ability, you can choose any living creature that knows at least one language.
                When you do, you can speak in and understand that creature's native language.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Nature's Might",
            is_magical: true,
            rank: 6,
            description: r"
                The damage bonus from your \textit{nature's might} ability increases to \plus2d.
            ",
            // TODO: make this only work with natural weapons
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Supreme Natural Servant",
            is_magical: true,
            rank: 7,
            description: r"
                Your \textit{natural servant} gains two additional \glossterm{attunement points}.
                In addition, you may choose to have a Large natural servant appear instead of a Medium natural servant.
            ",
            modifiers: None,
        },
    ];
}
