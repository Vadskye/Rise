use crate::classes::archetype_rank_abilities::RankAbility;

pub fn beastmaster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Beast Affinity",
            rank: 0,
            description: r"
         You gain a \plus3 bonus to the Creature Handling skill (see \pcref{Creature Handling}).
        In addition, you gain a \plus1 bonus to \glossterm{accuracy} and \glossterm{defenses} against animals and magical beasts.


                ",
        },
        RankAbility {
            name: "Animal Companion",
            rank: 1,
            description: r"
        
        You can use the \textit{animal companion} ability.
        This ability requires 8 hours of training and attunement which the target must actively participate in.
        You can compel a wild animal to undergo this training by sustaining the \textit{command} ability from the Creature Handling skill (see \pcref{Command}).
        \begin{attuneability}{Animal Companion}
            \spelltwocol{\abilitytag{Attune} (self)}{\abilitytag{Emotion}, \glossterm{Magical}}
            \rankline
            Choose a Medium or smaller animal \glossterm{ally} within your \glossterm{reach} with a level no higher than your level and a \glossterm{challenge rating} no higher than 1.
            The target serves as a loyal companion to you.
            It follows your directions to the best of its ability.

            Your magical connection to the animal improves its resilience and strength in combat.
            If any of its statistics are higher than the normal values below, the animal uses its own statistics instead.
            All other aspects of the animal, such as its speed and natural weapons, are unchanged.
            % Same as Natural Servant except that it gains more resistance since having the animal die is more problematic
            \begin{itemize}
                % TODO: figure out why this is a 2
                \item Its \glossterm{fatigue tolerance} is 2.
                \item Its \glossterm{hit points} are equal to your Constitution \add the base value for your level (see \tref{Character Advancement}).
                \item Its \glossterm{damage resistance} the base value for your level \add half your Constitution (see \tref{Character Advancement}).
                \item Each of its \glossterm{defenses} is normally equal to 5 \add your level.
                \item Its \glossterm{accuracy} is equal to your level \add half your base Perception \add your \glossterm{magic bonuses} to accuracy.
                \item Its \glossterm{power} with its attacks is 0.
                \item It has no \glossterm{attunement points}.
                \item The damage dealt by its natural weapons increases by \plus1d for each rank in this archetype beyond 1.
            \end{itemize}

            % Oddly placed? there must be text between an itemize block and the end of a mdframed env
            Animals are unable to understand complex concepts, so their ability to obey convoluted instructions is limited.
        \end{attuneability}

                ",
        },
        RankAbility {
            name: "Pack Tactics",
            rank: 2,
            description: r"
         Any \surrounded \glossterm{enemy} that is adjacent to you or your animal companion takes a \minus1 penalty to \glossterm{accuracy}.

                ",
        },
        RankAbility {
            name: "Power of Beasts",
            rank: 3,
            description: r"
         You and your \textit{animal companion} gain a \plus1d damage bonus with all weapons.

                ",
        },
        RankAbility {
            name: "Greater Animal Companion",
            rank: 4,
            description: r"
         Your \textit{animal companion} gains an \glossterm{attunement point}.
        In addition, it gains a \plus1 bonus to \glossterm{accuracy}, \glossterm{defenses}, and \glossterm{vital rolls}.

                ",
        },
        RankAbility {
            name: "Greater Pack Tactics",
            rank: 5,
            description: r"
         The penalty from your \textit{pack tactics} ability applies to any creature that is adjacent to you or your animal companion, regardless of whether it is surrounded.

                ",
        },
        RankAbility {
            name: "Greater Power of Beasts",
            rank: 6,
            description: r"
         The bonus from your \textit{power of beasts} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Greater Beast Affinity",
            rank: 6,
            description: r"
         The bonus to the Creature Handling skill from your \textit{beast affinity} ability increases to \plus6.
        In addition, the bonuses to accuracy and defenses from that ability increase to \plus2.

                ",
        },
        RankAbility {
            name: "Supreme Animal Companion",
            rank: 7,
            description: r"
         Your \textit{animal companion} gains an additional \glossterm{attunement point}.
        In addition, the bonuses from your \textit{greater animal companion} ability increase to \plus2.
                ",
        },
    ];
}

pub fn boundary_warden<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Terrain Familiarity",
            rank: 0,
            description: r"
         You ignore \glossterm{difficult terrain} from all sources except for creature abilities.


                ",
        },
        RankAbility {
            name: "Know Your Enemy",
            rank: 1,
            description: r"
         Whenever you take a \glossterm{short rest}, you can choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
        You gain a \plus1 bonus to \glossterm{accuracy} against creatures of that type.
        This benefit lasts until you choose a different creature type with this ability.

                ",
        },
        RankAbility {
            name: "Experienced Guide",
            rank: 2,
            description: r"
         Your \glossterm{allies} who can see or hear you can ignore \glossterm{difficult terrain} from all sources except for creature abilities.
        In addition, any group you are part of can travel at full speed through difficult terrain during overland travel (see \pcref{Overland Movement}).

                ",
        },
        RankAbility {
            name: "Warden's Force",
            rank: 3,
            description: r"
         You gain a \plus1d bonus to damage with projectile weapons and light weapons.

                ",
        },
        RankAbility {
            name: "Greater Know Your Enemy",
            rank: 4,
            description: r"
         The bonus from your \textit{know your enemy} ability increases to \plus2.
        In addition, you can choose two creature types with that ability instead of one.

                ",
        },
        RankAbility {
            name: "Greater Experienced Guide",
            rank: 5,
            description: r"
         You and your \glossterm{allies} who can see or hear you gain a \plus2 bonus to \glossterm{initiative} checks.

                ",
        },
        RankAbility {
            name: "Greater Warden's Force",
            rank: 6,
            description: r"
         The bonus from your \textit{warden's force} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Supreme Know Your Enemy",
            rank: 7,
            description: r"
         The bonus from your \textit{know your enemy} ability increases to \plus3.
        In addition, you can choose three creature types with that ability instead of two.
                ",
        },
    ];
}

pub fn huntmaster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Tracker",
            rank: 0,
            description: r"
         You gain a \plus4 bonus to Survival checks to follow tracks.
        In addition, using the \textit{desperate exertion} ability on a Survival check to follow tracks only causes you to increase your \glossterm{fatigue level} by one instead of two.


                ",
        },
        RankAbility {
            name: "Quarry",
            rank: 1,
            description: r"
        \label{Quarry} You can use the \textit{quarry} ability as a \glossterm{minor action}.
        \begin{attuneability}{Quarry}
            \abilitytag{Attune} (self)
            \rankline
            Choose a creature within \rnglong range.
            The target becomes your quarry.
            You and your \glossterm{allies} within the same range are called your hunting party.
            Your hunting party gains a \plus1 bonus to \glossterm{accuracy} against your quarry.
            If the target is \glossterm{defeated}, you may end this ability and regain the \glossterm{attunement point} you spent to attune to this ability.
        \end{attuneability}

                ",
        },
        RankAbility {
            name: "Hunting Style",
            rank: 2,
            description: r"
        
        You learn specific hunting styles to defeat particular quarries.
        Choose one hunting style from the list below.
        You can also spend \glossterm{insight points} to learn one additional \textit{hunting style} per \glossterm{insight point}.
        When you use your \textit{quarry} ability, you may also use one of your \textit{hunting styles}.
        Each \textit{hunting style} ability lasts as long as the \textit{quarry} ability you used it with.
        {
            \begin{durationability}{Anchoring}
                \spelltwocol{Duration}{Magical}
                \rankline
                As long as your quarry is adjacent to any member of your hunting party, it cannot travel extradimensionally.
                This prevents all \abilitytag{Manifestation} and \glossterm{teleportation} effects.

                \rankline
                \rank{4} This effect instead applies if your quarry is within \medrange of any member of your hunting party.
                \rank{6} This effect instead applies if your quarry is within \distrange of any member of your hunting party.
            \end{durationability}

            \begin{durationability}{Coordinated Stealth}
                Duration
                \rankline
                Your quarry takes a \minus4 penalty to Awareness checks to notice members of your hunting party.

                \rankline
                \rank{4} The Awareness penalty increases to \minus8.
                \rank{6} The Awareness penalty increases to \minus12.
            \end{durationability}

            \begin{durationability}{Cover Weaknesses}
                Duration
                \rankline
                The accuracy bonus against your quarry is replaced with a \plus1 bonus to Armor and Reflex defenses against your quarry's attacks.

                \rankline
                \rank{4} The defense bonus applies to all defenses.
                \rank{6} The defense bonus increases to \plus2.
            \end{durationability}

            \begin{durationability}{Decoy}
                Duration
                \rankline
                If you are adjacent to your quarry, it takes a \minus2 accuracy penalty on attacks against members of your hunting party other than you.

                \rankline
                \rank{4} The penalty increases to \minus3.
                \rank{6} The penalty increases to \minus4.
            \end{durationability}

            \begin{durationability}{Lifeseal}
                \spelltwocol{Duration}{Magical}
                \rankline
                As long as your quarry is adjacent to any member of your hunting party, it cannot regain \glossterm{hit points}.

                \rankline
                \rank{4} This effect instead applies if the target is within \rngmed range of any member of your hunting party.
                \rank{6} This effect instead applies if your quarry is within \rngdist range of any member of your hunting party.
            \end{durationability}

            \begin{durationability}{Martial Suppression}
                Duration
                \rankline
                As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 accuracy penalty with \glossterm{mundane} attacks.

                \rankline
                \rank{4} The penalty increases to \minus2.
                \rank{6} The penalty increases to \minus3.
            \end{durationability}

            \begin{durationability}{Mystic Suppression}
                Duration
                \rankline
                As long as your quarry is adjacent to at least two members of your hunting party, it takes a \minus1 penalty to \glossterm{accuracy} with \glossterm{magical} attacks.

                \rankline
                \rank{4} The penalty increases to \minus2. 
                \rank{6} The penalty increases to \minus3.
            \end{durationability}

            \begin{durationability}{Solo Hunter}
                Duration
                \rankline
                Your hunting party other than you gains no benefit from your \textit{quarry} ability.
                In exchange, you gain a \plus1 bonus to defenses against your quarry.

                \rankline
                \rank{4} You gain an additional \plus1 accuracy bonus against your quarry.
                \rank{6} The defense bonus increases to \plus2.
            \end{durationability}

            \begin{durationability}{Swarm Hunter}
                Duration
                \rankline
                When you use your \textit{quarry} ability, you can target any number of creatures to be your quarry.

                \rankline
                \rank{4} Your hunting party reduces their penalties for being \surrounded by 1.
                \rank{6} The penalty reduction increases to 2.
            \end{durationability}

            \begin{durationability}{Wolfpack}
                Duration
                \rankline
                At the start of each \glossterm{phase}, if your quarry is adjacent to at least two members of your hunting party, it moves at half speed until the end of that phase.

                \rankline
                \rank{4} This effect instead applies if your quarry is adjacent to any member of your hunting party.
                \rank{6} Your quarry is \slowed instead of moving at half speed.
            \end{durationability}
        }

                ",
        },
        RankAbility {
            name: "Hunter's Prowess",
            rank: 3,
            description: r"
         You gain a \plus1d bonus to your damage with all weapons.

                ",
        },
        RankAbility {
            name: "Greater Quarry",
            rank: 4,
            description: r"
         You can use your \textit{quarry} ability with the \abilitytag{Sustain} (free) tag instead of the \abilitytag{Attune} (self) tag.
        If you originally use your \textit{quarry} ability as a sustained ability, you can attune to the same quarry as a free action, even if your quarry is no longer in sight.
        In addition, you gain a \plus10 bonus to follow tracks left by your quarry.

                ",
        },
        RankAbility {
            name: "Hunting Style",
            rank: 5,
            description: r"
        You learn an additional \textit{hunting style}.

                ",
        },
        RankAbility {
            name: "Greater Hunter's Prowess",
            rank: 6,
            description: r"
         The bonus from your \textit{hunter's prowess} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Supreme Quarry",
            rank: 7,
            description: r"
         The accuracy bonus from your \textit{quarry} ability increases to \plus2.
                ",
        },
    ];
}

pub fn scout<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Keen Vision",
            rank: 0,
            description: r"
        
        You gain \glossterm{low-light vision}, allowing you to treat sources of light as if they had double their normal illumination range.
        If you already have low-light vision, you double its benefit, allowing you to treat sources of light as if they had four times their normal illumination range.
        In addition, you gain \glossterm{darkvision} with a 60 foot range, allowing you to see in complete darkness clearly.
        If you already have that ability, you increase its range by 60 feet.


                ",
        },
        RankAbility {
            name: "Skirmisher",
            rank: 1,
            description: r"
         At the start of each phase, if there is no more than one creature adjacent to you, you gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes} during that phase.
        In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).

                ",
        },
        RankAbility {
            name: "Perceive Weakness",
            rank: 2,
            description: r"
         You gain a \plus1 bonus to \glossterm{accuracy}.

                ",
        },
        RankAbility {
            name: "Blindsight",
            rank: 3,
            description: r"
         Your perceptions are so finely honed that you can sense your enemies without seeing them.
        You gain the \glossterm{blindsense} ability out to 120 feet.
        This ability allows you to sense the presence and location of objects and foes within its range without seeing them.
        If you already have the blindsense ability, you increase its range by 120 feet.
        In addition, you gain the \glossterm{blindsight} ability out to 30 feet.
        With this ability, you can fight just as well with your eyes closed as with them open.
        If you already have the blindsight ability, you increase its range by 30 feet.

                ",
        },
        RankAbility {
            name: "Greater Skirmisher",
            rank: 4,
            description: r"
         The speed bonus from your \textit{skirmisher} ability increases to \plus10 feet.

                ",
        },
        RankAbility {
            name: "Greater Perceive Weakness",
            rank: 5,
            description: r"
         The bonus from your \textit{perceive weakness} ability increases to \plus2.

                ",
        },
        RankAbility {
            name: "Greater Blindsight",
            rank: 6,
            description: r"
         The range of your \glossterm{blindsense} ability increases by 360 feet.
        In addition, the range of your \glossterm{blindsight} ability increases by 90 feet.

                ",
        },
        RankAbility {
            name: "Supreme Skirmisher",
            rank: 7,
            description: r"
         The speed bonus from your \textit{skirmisher} ability increases to \plus15 feet.
        In addition, the penalty reduction from that ability increases to 2.
                ",
        },
    ];
}

pub fn wilderness_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Wild Senses",
            rank: 0,
            description: r"
                 You gain a \plus1 bonus to Perception-based checks, except \glossterm{initiative} checks.
            ",
        },
        RankAbility {
            name: "Combat Styles",
            rank: 1,
            description: r"
                You can channel your wild energy into ferocious attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{flurry of blows}, \textit{mobile assault}, or \textit{penetrating precision}.
                In addition, you gain access to any two combat styles of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
                You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (2)",
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
        },
        RankAbility {
            name: "Wild Force",
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (3)",
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3.
            ",
        },
        RankAbility {
            name: "Glancing Strikes",
            rank: 3,
            description: r"
                Whenever you miss by 2 or less with a \glossterm{strike}, the target takes half damage from the strike.
                This is called a \glossterm{glancing blow}.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (4)",
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4.
            ",
        },
        RankAbility {
            name: "Wild Maneuver",
            rank: 4,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
        },
        RankAbility {
            name: "Greater Wild Force",
            rank: 5,
            description: r"
                The bonus from your \textit{wild force} ability increases to \plus2d.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
        },
        RankAbility {
            name: "Greater Wild Senses",
            rank: 6,
            description: r"
                The bonuses from your \textit{wild senses} ability increase to \plus2.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
        },
        RankAbility {
            name: "Wild Maneuver",
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
    ];
}
