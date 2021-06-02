use crate::classes::archetype_rank_abilities::RankAbility;

pub fn battleforged_resilience<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Resilient Recovery",
            rank: 0,
            description: r"
                You regain a quarter of your maximum \\glossterm{damage resistance} when you use the \textit{recover} ability (see \pcref{Recover}).
            ",
        },
        RankAbility {
            name: "Battle-Scarred",
            rank: 1,
            description: r"
                You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance} (see \pcref{Damage Resistance}).
            ",
        },
        RankAbility {
            name: "Unbattered Resilience",
            rank: 2,
            description: r"
                At the end of each round, if another creature dealt you damage that round, you regain \glossterm{damage resistance} equal to twice your rank in this archetype.
                This cannot increase your damage resistance above half of your maximum damage resistance.
            ",
        },
        RankAbility {
            name: "Greater Resilient Recovery",
            rank: 3,
            description: r"
                The damage resistance you regain with your \textit{resilient recovery} ability increases to half your maximum damage resistance.
            ",
        },
        RankAbility {
            name: "Limitless Recovery",
            rank: 4,
            description: r"
                You can use the \textit{recover} action an additional time before you take a \glossterm{short rest}.
            ",
        },
        RankAbility {
            name: "Greater Battle-Scarred",
            rank: 5,
            description: r"
                The bonus from your \textit{battle-scarred} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Greater Unbattered Resilience",
            rank: 6,
            description: r"
                The amount of damage resistance you regain with your \textit{unbattered resilience} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Instant Recovery",
            rank: 7,
            description: r"
                Once per \glossterm{short rest}, you can use the \textit{recover} ability as a \glossterm{minor action} instead of as a standard action.
            ",
        },
    ];
}

pub fn battlerager<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Insensible Anger",
            rank: 0,
            description: r"
                You reduce your maximum hit points by an amount equal to your rank in this archetype.
                In exchange, you gain a bonus to your \glossterm{damage resistance} equal to twice your rank in this archetype (minimum 1).
            ",
        },
        RankAbility {
            name: "Rage",
            rank: 1,
            description: r"
                You can use the \textit{rage} ability as a \glossterm{free action}.
                For most barbarians, this represents entering a furious rage.
                Some barbarians instead enter a joyous battle trance or undergo a partial physical transformation into a more fearsome form.
                \begin{durationability}{Rage}
                    \spelltwocol{\abilitytag{Sustain} (free)}{\abilitytag{Emotion}, \abilitytag{Swift}}
                    \rankline
                    For the duration of this ability, you gain the following benefits and drawbacks:
                    \begin{itemize}
                        % This is an aggressive scaling that prevents any direct upgrades later in the archetype
                        \item You gain a \plus2 bonus to your \glossterm{mundane} \glossterm{power}.
                        \item You gain a \plus2 bonus to \glossterm{vital rolls}.
                        \item You take a \minus2 penalty to Armor and Reflex defenses.
                        \item You are unable to take \glossterm{standard actions} that do not cause you to make \glossterm{mundane} attacks.
                        \item You are unable to use \abilitytag{Focus} abilities of any kind.
                        \item At the end of each round, if you did not make a \glossterm{mundane} attack that round, this ability ends.
                        \item When this ability ends for any reason, you cannot use it again until after the end of the next round.
                    \end{itemize}

                    \rankline
                    \rank{3} The power bonus increases to \plus4.
                    \rank{5} The power bonus increases to \plus8.
                    \rank{7} The power bonus increases to \plus16.
                \end{durationability}
            ",
        },
        RankAbility {
            name: "Enraged Strike",
            rank: 2,
            description: r"
                As a standard action, you can use the \textit{enraged strike} ability.
                \begin{instantability}{Enraged Strike}[Instant]
                    \rankline
                    Make a melee \glossterm{strike}.
                    If the target of the strike dealt damage to you during the previous round, you gain a \plus2 bonus to \glossterm{accuracy} with the strike and a \plus2d damage bonus.

                    \rankline
                    \rank{4} The damage bonus increases to \plus3d.
                    \rank{6} The damage bonus increases to \plus4d.
                \end{instantability}
            ",
        },
        RankAbility {
            name: "Greater Insensible Anger",
            rank: 3,
            description: r"
                 The damage resistance bonus from your \textit{insensible anger} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Greater Rage",
            rank: 4,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} during your \textit{rage} ability.
            ",
        },
        RankAbility {
            name: "Immutable Anger",
            rank: 5,
            description: r"
                You become immune to hostile \abilitytag{Emotion} effects.
            ",
        },
        RankAbility {
            name: "Supreme Insensible Anger",
            rank: 6,
            description: r"
                 The damage resistance bonus from your \textit{insensible anger} ability increases to four times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Supreme Rage",
            rank: 7,
            description: r"
                When you use your \textit{rage} ability, you can grow by one \glossterm{size category}.
                In addition, the \glossterm{accuracy} bonus from your \textit{greater rage} ability increases to \plus2.
            ",
        },
    ];
}

pub fn outland_savage<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Savage Rush",
            rank: 0,
            description: r"
         When you use the \textit{sprint} ability, you can move through spaces occupied by enemies during that movement.
        You treat those spaces as \glossterm{difficult terrain}, which causes to you to move at half speed.

                ",
        },
        RankAbility {
            name: "Fast Movement",
            rank: 1,
            description: r"
         You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.

                ",
        },
        RankAbility {
            name: "Savage Precision",
            rank: 2,
            description: r"
         You can use your Strength in place of your Perception to determine your \glossterm{accuracy} with the \textit{dirty trick}, \textit{disarm}, \textit{grapple}, \textit{overrun}, and \textit{trip} abilities, as well as with grapple actions (see \pcref{Special Combat Abilities}, and \pcref{Grapple Actions}).
        In addition, you gain a \plus1 bonus to \glossterm{accuracy} with those abilities and with the \textit{shove} ability.

                ",
        },
        RankAbility {
            name: "Savage Force",
            rank: 3,
            description: r"
         You gain a \plus1d bonus to your damage with all weapons.

                ",
        },
        RankAbility {
            name: "Greater Fast Movement",
            rank: 4,
            description: r"
         The speed bonus from your \textit{fast movement} ability increases to \plus10 feet.

                ",
        },
        RankAbility {
            name: "Greater Savage Rush",
            rank: 4,
            description: r"
     Your \textit{savage rush} ability no longer causes you to treat spaces occupied by enemies as difficult terrain.

                ",
        },
        RankAbility {
            name: "Greater Savage Precision",
            rank: 5,
            description: r"
         The accuracy bonus from your \textit{savage precision} ability increases to \plus2.
        In addition, choose one of the following \glossterm{weapon tags} (see \pcref{Weapon Tags}): Disarming, Forceful, Grappling, or Tripping.
        You may treat all weapons you wield as if they had the chosen weapon tag.

                ",
        },
        RankAbility {
            name: "Greater Savage Force",
            rank: 6,
            description: r"
         The bonus from your \textit{savage force} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Supreme Fast Movement",
            rank: 7,
            description: r"
         The speed bonus from your \textit{fast movement} ability increases to \plus15 feet.

                ",
        },
    ];
}

pub fn primal_warrior<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Primal Might",
            rank: 0,
            description: r"
                 You gain a \plus1 bonus to Strength-based \glossterm{checks} and Constitution-based \glossterm{checks}.
            ",
        },
        RankAbility {
            name: "Combat Styles",
            rank: 1,
            description: r"
                You can channel your primal energy into ferocious attacks.
                You gain access to one of the following \glossterm{combat styles}: \textit{dirty fighting}, \textit{herald of war}, or \textit{unbreakable defense}.
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
            name: "Primal Force",
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
            name: "Primal Maneuver",
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
            name: "Greater Primal Force",
            rank: 5,
            description: r"
                The bonus from your \textit{primal force} ability increases to \plus2d.
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
            name: "Greater Primal Might",
            rank: 6,
            description: r"
                The bonuses from your \textit{primal might} ability increase to \plus2.
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
            name: "Primal Maneuver",
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
    ];
}

pub fn totemist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Animal Instincts",
            rank: 0,
            description: r"
                You gain a \plus2 bonus to Reflex defense and \glossterm{initiative} checks.
            ",
        },
        RankAbility {
            name: "Totem Animal",
            rank: 1,
            description: r"
                You choose a totem animal that represents you.
                Each totem animal grants you abilities that are associated with that animal.

                \subcf{Bear} You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
                In addition, you gain a \plus1 bonus to Fortitude defense.

                \subcf{Crocodile} Once per round, when you damage a creature with a melee \glossterm{strike}, you can use this ability to \glossterm{push} it into any space adjacent to you.

                \subcf{Eagle} You gain \glossterm{low-light vision}, allowing you to treat sources of light as if they had double their normal illumination range.
                If you already have low-light vision, you double its benefit, allowing you to treat sources of light as if they had four times their normal illumination range.
                In addition, you reduce your \glossterm{longshot penalty} by 1 (see \pcref{Weapon Range Limits}).

                \subcf{Lion} You gain a \plus1 bonus to \glossterm{accuracy} as long as you have an \glossterm{ally} adjacent to you.

                \subcf{Shark} You gain a \plus2 bonus to \glossterm{accuracy} against creatures that are below their maximum hit points.

                \subcf{Wolf} At the start of each round, you may choose one of your \glossterm{allies}.
                That creature gains a \plus1 bonus to \glossterm{accuracy} during that round as long as it is adjacent to you.
            ",
        },
        RankAbility {
            name: "Feral Explosion",
            rank: 2,
            description: r"
                Whenever you \glossterm{explode} with an attack roll, you gain a \plus2 \glossterm{accuracy} bonus with the attack.
                This bonus stacks with itself if you explode multiple times with the same attack roll.
            ",
        },
        RankAbility {
            name: "Totemic Force",
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
        },
        RankAbility {
            name: "Greater Totem Animal",
            rank: 4,
            description: r"
                The benefit from your \textit{totem animal} ability improves.

                \subcf{Bear} The hit point bonus increases to five times your rank in this archetype.
                In addition, the Fortitude bonus increases to \plus2.

                \subcf{Crocodile} Once per round, when you make a creature lose \glossterm{hit points} with a melee \glossterm{strike}, you can choose to either \glossterm{grapple} it or knock it \glossterm{prone}.

                % TODO: The narrative connection here is loose
                \subcf{Eagle} You gain a \plus3 bonus to the Awareness skill.
                In addition, you are immune to being \glossterm{dazzled} and \glossterm{blinded}.

                \subcf{Lion} You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.

                \subcf{Shark} The accuracy bonus increases to \plus4.

                \subcf{Wolf} You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.
            ",
        },
        RankAbility {
            name: "Greater Feral Explosion",
            rank: 5,
            description: r"
                Your first die you roll for each attack roll \glossterm{explodes} on a 9 in addition to the normal explosion on a 10.
                This does not affect additional rolls with exploding dice.
            ",
        },
        RankAbility {
            name: "Greater Totemic Force",
            rank: 6,
            description: r"
                The bonus from your \textit{totemic force} ability increases to \plus2d.
            ",
        },
        RankAbility {
            name: "Supreme Totem Animal",
            rank: 7,
            description: r"
                The benefit from your \textit{totem animal} ability improves further.

                \subcf{Bear} The hit point bonus increases to seven times your rank in this archetype.
                In addition, the Fortitude bonus increases to \plus3.

                \subcf{Crocodile} The benefit of your \textit{greater totem animal} ability applies whenever you deal damage with a melee strike instead of whenever you make a creature lose hit points with a melee strike.

                \subcf{Eagle} The longshot penalty reduction increases to 2.
                In addition, the Awareness bonus increases to \plus6.

                \subcf{Lion} The accuracy bonus increases to \plus2.

                \subcf{Shark} The accuracy bonus increases to \plus6.

                \subcf{Wolf} The accuracy bonus increases to \plus2.
            ",
        },
    ];
}
