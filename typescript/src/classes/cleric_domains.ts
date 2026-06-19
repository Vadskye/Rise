export function clericDomains(): string {
  return `
        \\newpage
        \\subsection{Cleric Domain Abilities}\\label{Cleric Domain Abilities}
        These domain abilities can be granted by the \\textit{domain influence} cleric archetype.

        \\subsubsection{Chaos Domain}
        \\domainability{Gift} You are \\resistant to \\atCompulsion attacks.
        \\magicaldomainability{Aspect} Your skill checks can explode, like attacks (see \\pcref{Exploding Attacks}).
        Unlike attacks, your skill checks can only explode once.
        This only applies the first time you attempt a task.
        If you retry the same task, your checks do not explode.
        \\magicaldomainability{Essence} You gain the \\ability{twist of fate} ability.
        \\begin{magicalactiveability}{Twist of Fate}{Standard action}
          \\abilitytags \\abilitytag{Subtle}
          \\abilitycost You cannot use this ability again until you finish a \\glossterm{long rest}.
          \\rankline
          An improbable event occurs within \\distrange.
          You can specify in general terms what you want to happen, such as \`\`Make the bartender leave the bar''.
          You cannot control the exact nature of the event, though it always beneficial for you in some way.
        \\end{magicalactiveability}
        \\magicaldomainability{Mastery} Your skill checks explode on a 9 or 10, not just a 10.

        \\subsubsection{Death Domain}
        \\magicaldomainability{Gift} When you get a critical hit with a damaging ability, it deals \\glossterm{extra damage} equal to your rank in the Domain Influence archetype.
        This extra damage is multiplied as normal by the critical hit.
        \\domainability{Aspect} You gain a \\plus1 accuracy bonus for the purpose of determining whether your attacks get a critical hit.
        \\magicaldomainability{Essence} Whenever you kill a Small or larger living creature, you are \\briefly \\honed.
        \\domainability{Mastery} The accuracy bonus with critical hits increases to \\plus3.

        \\subsubsection{Destiny Domain}
        \\domainability{Gift} You are immune to being \\partiallyunaware.
        \\domainability{Aspect} When you use the \\ability{desperate exertion} ability, if your attack result still does not hit, the ability \\glossterm{repeats} at the start of your next turn on each target that it did not hit.
        \\domainability{Essence} Your \\glossterm{allies} within a \\largearea radius \\glossterm{emanation} from you also gain the benefit of this domain's aspect.
        \\domainability{Mastery} You gain a \\plus1 bonus to your \\glossterm{accuracy}.

        \\subsubsection{Destruction Domain}
        \\magicaldomainability{Gift} Your damaging attacks deal double damage to objects.
        \\domainability{Aspect} You gain a \\plus1 bonus to your \\glossterm{magical power} and \\glossterm{mundane power}.
        \\magicaldomainability{Essence} You gain the \\ability{lay waste} ability.
        \\begin{magicalactiveability}{Lay Waste}{Standard action}
          \\rankline
          Make an attack vs. Fortitude against all \\glossterm{unattended} \\glossterm{mundane} objects in a \\areamed radius.
          You may freely exclude any number of 5-ft. cubes from the area, as long as the resulting area is still contiguous.
          \\hit If the target's \\glossterm{hardness} is lower than your \\glossterm{power}, it crumbles into a fine power and is irreparably \\glossterm{destroyed}.

          \\rankline
          \\rank{6} The area increases to a \\arealarge radius.
        \\end{magicalactiveability}
        \\domainability{Mastery} The power bonuses increase to \\plus2.
        In addition, your damaging attacks now deal triple damage to objects.

        \\subsubsection{Earth Domain}
        If you choose this domain, you add the \\sphere{terramancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).

        \\domainability{Gift} You are \\resistant to Earth attacks.
        \\domainability{Aspect} You gain a \\plus1 bonus to your Brawn and Fortitude defenses.
        \\domainability{Essence} While you are \\glossterm{grounded}, you are immune to \\glossterm{push}, \\glossterm{fling}, and \\glossterm{teleport} effects from attacks, and you are immune to being \\slowed.
        \\domainability{Mastery} While you are \\glossterm{grounded}, you gain a \\plus1 accuracy bonus.

        \\subsubsection{Evil Domain}
        \\domainability{Gift} You are immune to being \\charmed and \\goaded.
        \\domainability{Aspect} You gain a \\plus1 accuracy bonus with abilities that inflict \\glossterm{conditions}.
        \\magicaldomainability{Essence} You gain the \\ability{blood sacrifice} ability.
        \\begin{magicalactiveability}{Blood Sacrifice}{Standard action}
          \\abilitytags \\atBlood
          \\rankline
          Choose an \\glossterm{ally} you \\glossterm{touch}.
          Whenever you would lose \\glossterm{hit points} while you are adjacent to that ally, it loses half of those hit points in place of you.
          You are both considered to have lost hit points from the attack for the purpose of any special effects from the attack.
          This ability lasts until you \\glossterm{dismiss} it or until you use it again.
        \\end{magicalactiveability}
        \\magicaldomainability{Mastery} Whenever you inflict a \\glossterm{condition} on a creature, that condition must be removed an additional time before the effect ends.

        \\subsubsection{Forge Domain}
        \\domainability{Gift} You gain a \\plus2 bonus to all Craft skills.
        \\domainability{Aspect} You are proficient with all non-exotic weapons.
        In addition, you become proficient with an additional \\glossterm{usage class} of armor (light, medium, or heavy).
        You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
        \\magicaldomainability{Essence} Crafting items takes you half the normal amount of time, and you do not require appropriate tools to craft items.
        \\domainability{Mastery} The Craft skill bonus increases to \\plus4.
        In addition, you gain a \\plus1 bonus to your Armor defense.

        \\subsubsection{Good Domain}
        \\domainability{Gift} You are immune to \\atCurse attacks and being \\dominated.
        \\magicaldomainability{Aspect} You gain the \\ability{sacrificial bond} ability.
        \\begin{magicalactiveability}{Sacrificial Bond}{Standard action}
          \\rankline
          Choose an \\glossterm{ally} within \\medrange.
          Whenever that ally would gain a \\glossterm{vital wound} while they are within a \\largearea radius \\glossterm{emanation} from you, you gain that \\glossterm{vital wound} instead.
          You gain a \\plus2 bonus to the \\glossterm{vital roll} of each \\glossterm{vital wound} you gain this way.
          This ability lasts until you \\glossterm{dismiss} it.
          You can use it multiple times on different allies to redirect all of their vital wounds to you.
        \\end{magicalactiveability}
        \\magicaldomainability{Essence} You suffer no penalty for being \\glossterm{resurrected}, and any rituals to resurrect you do not require material components.
        \\magicaldomainability{Mastery} When you use your \\ability{sacrifical bond} ability, you can choose whether it also redirects all \\glossterm{hit point} loss from the target to you.

        \\subsubsection{Knowledge Domain}
        If you choose this domain, you add all Knowledge skills to your cleric \\glossterm{class skill} list.

        \\domainability{Gift} You gain an additional \\glossterm{trained skill} (see \\pcref{Trained Skills}).
        \\magicaldomainability{Aspect} You are proficient with any tool or weapon you are currently touching.
        This includes \\glossterm{exotic weapons} and improvised weapons.
        \\domainability{Essence} You gain an additional \\glossterm{insight point}.
        \\domainability{Mastery} You gain a \\plus1 bonus to your Brawn, Fortitude, Mental, and Reflex defenses.

        \\subsubsection{Law Domain}
        \\domainability{Gift} You are \\resistant to \\atEmotion attacks.
        \\magicaldomainability{Aspect} When you roll a 1 on an \\glossterm{attack roll}, it is treated as if you had rolled a 6.
        This does not affect bonus dice rolled for exploding attacks (see \\pcref{Exploding Attacks}).
        \\magicaldomainability{Essence} You gain the \\ability{compel law} ability.
        \\begin{magicalactiveability}{Compel Law}{Standard action}
          \\abilitytags \\abilitytag{Compulsion}
          \\abilitycost One \\glossterm{stamina}.
          \\rankline
          Make an attack vs. Mental against all creatures within a \\largearea radius from you.
          This attack also automatically succeeds against you, ignoring all forms of immunity.
          If the condition from this ability is removed from you, it is also removed from all other targets.
          \\hit The target is unable to break the laws that apply in the area, and any attempt to do so simply fails.
          The laws which are applied are those which are most appropriate for the area, regardless of whether you or any other target know those laws.
          In areas under ambiguous or nonexistent government, this ability may have unexpected effects, or it may have no effect at all.

          \\rankline
          You gain a \\plus1 \\glossterm{accuracy} bonus with the attack for each rank beyond 4.
        \\end{magicalactiveability}
        \\magicaldomainability{Mastery} When you roll a 1 or a 2 on an \\glossterm{attack roll} or \\glossterm{check}, it is treated as if you had rolled a 6.

        \\subsubsection{Life Domain}
        \\magicaldomainability{Gift} Whenever you cause a creature to regain hit points, they regain additional hit points equal to your rank in the Domain Influence archetype.
        This additional healing applies once per ability.
        \\domainability{Aspect} You gain a bonus to your maximum \\glossterm{hit points} equal to your \\glossterm{durability}.
        \\magicaldomainability{Essence} The additional healing increases to twice your rank in the Domain Influence archetype.
        \\domainability{Mastery} The hit point bonus increases to three times your durability.

        \\subsubsection{Magic Domain}
        If you choose this domain, you add the \\sphere{thaumaturgy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).

        \\domainability{Gift} You gain a \\plus2 bonus to the Knowledge (arcana) skill (see \\pcref{Knowledge}).
        \\magicaldomainability{Aspect} You learn an additional divine \\glossterm{spell} from a \\glossterm{mystic sphere} you have access to.
        \\magicaldomainability{Essence} You gain a \\plus1 bonus to your \\glossterm{magical power}.
        \\magicaldomainability{Mastery} The power bonus increases to \\plus2, and the skill bonus increases to \\plus4.

        \\subsubsection{Ocean Domain}
        If you choose this domain, you add the \\sphere{aquamancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).
        In addition, you add the Flexibility and Swim skills to your cleric \\glossterm{class skill} list.

        \\domainability{Gift} You gain a \\plus1 bonus to the Flexibility and Swim skills.
        \\magicaldomainability{Aspect} You increase the distance of your \\glossterm{push} and \\glossterm{fling} abilities by 10 feet.
        This does not allow you to push creatures out of your reach with abilities that would not normally allow that, such as the \\ability{shove} ability.
        \\magicaldomainability{Essence} You gain a slow \\glossterm{swim speed} (see \\pcref{Swimming}).
        If you already have a slow swim speed, your swim speed becomes average instead.
        \\magicaldomainability{Mastery} The skill bonuses increase to \\plus2.
        In addition, the push and fling distance bonus increases to 20 feet.

        \\subsubsection{Protection Domain}
        \\domainability{Gift} You become proficient with an additional \\glossterm{usage class} of armor (light, medium, or heavy).
        You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
        \\magicaldomainability{Aspect} You gain the \\ability{divine protection} ability.
        \\begin{magicalactiveability}{Divine Protection}{Standard action}
          \\rankline
          Choose an \\glossterm{ally} you \\glossterm{touch}.
          It gains a \\plus1 \\glossterm{enhancement bonus} to all defenses while it is adjacent to you.
          This ability lasts until you \\glossterm{dismiss} it or until you use it again.

          A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \\glossterm{difficulty value} 5 Awareness check.
          While this ability is active, you cannot be affected by other creatures using this ability on you.
        \\end{magicalactiveability}
        \\magicaldomainability{Essence} You gain a \\plus1 bonus to your Armor defense.
        \\domainability{Mastery} The defense bonus from your \\textit{divine protection} ability increases to \\plus2.

        \\subsubsection{Sky Domain}
        If you choose this domain, you add the \\sphere{aeromancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).
        In addition, you add the Jump skill to your list of class skills.

        \\magicaldomainability{Gift} You gain a \\plus10 foot bonus to your maximum horizontal jump distance (see \\pcref{Jump}).
        \\magicaldomainability{Aspect} You gain an average \\glossterm{glide speed} (see \\pcref{Gliding}).
        In addition, you take half damage from \\glossterm{falling damage}.
        \\magicaldomainability{Essence} You gain a slow \\glossterm{fly speed} with a maximum height of 15 feet (see \\pcref{Flight}).
        \\magicaldomainability{Mastery} Your fly speed improves to average speed, with a maximum height of 30 feet.

        \\subsubsection{Storm Domain}
        If you choose this domain, you add the \\sphere{electromancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).

        \\magicaldomainability{Gift} You are \\resistant to \\atElectricity attacks.
        \\magicaldomainability{Essence} Whenever you use a damaging \\atElectricity ability that affects an area, you \\glossterm{repeat} that ability at the start of your next turn.
        The repeat has the \\atAuditory tag instead of the \\atElectricity tag, deals half damage, and affects each \\glossterm{enemy} adjacent to you instead of its normal targets.
        \\magicaldomainability{Aspect} The repeat from this domain's essence also triggers when you \\glossterm{chain} to yourself with a damaging \\atElectricity ability.
        \\magicaldomainability{Mastery} The repeat from this domain's essence instead affects all \\glossterm{enemies} within a \\smallarea radius from you.

        \\subsubsection{Sun Domain}
        If you choose this domain, you add the \\sphere{pyromancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).

        \\domainability{Gift} You radiate \\glossterm{bright illumination} in a \\medarea radius.
        You can suppress or resume this illumination as a \\glossterm{free action} once per turn.
        \\magicaldomainability{Aspect} Whenever you use an ability that creates illumination, you can give it the \\atFire \\glossterm{ability tag}.
        In addition, your \\glossterm{allies} are immune to damage from your \\atFire abilities.
        \\magicaldomainability{Essence} You gain a \\plus1 bonus to your \\glossterm{magical power}.
        \\magicaldomainability{Mastery} The power bonus increases to \\plus2, and you radiate \\glossterm{brilliant illumination} instead of bright illumination.

        \\subsubsection{Travel Domain}
        If you choose this domain, you add the \\sphere{astromancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).
        In addition, you add the Knowledge (nature) and Survival skills to your cleric \\glossterm{class skill} list.

        \\domainability{Gift} You gain a \\plus1 bonus to the Knowledge (nature) and Survival skills.
        \\magicaldomainability{Aspect} You can ignore \\glossterm{difficult terrain} from inanimate natural sources, such as \\glossterm{heavy undergrowth}.
        \\magicaldomainability{Essence} Once during your turn, you can teleport horizontally instead of moving using your \\glossterm{walk speed}.
        Teleporting a given distance costs movement equal to twice that distance.
        If this teleportation fails for any reason, you still expend that movement.
        \\magicaldomainability{Mastery} Teleporting a given distance only costs movement equal to that distance.

        \\subsubsection{Trickery Domain}
        If you choose this domain, you add the Deception, Disguise, and Stealth skills to your cleric \\glossterm{class skill} list.

        \\domainability{Gift} You gain a \\plus1 bonus to the Deception, Disguise, and Stealth skills.
        \\magicaldomainability{Aspect} Whenever a \\atCompulsion or \\atEmotion attack misses you, you learn the effect it would have had if it had succeeded.
        Creatures that miss you in this way believe that their attack hit, though they may realize the truth if you do not act appropriately.
        \\magicaldomainability{Essence} You are \\resistant to \\atCompulsion and \\atEmotion attacks.
        If you would already be resistant to either tag, you become immune to attacks with that tag instead.
        \\magicaldomainability{Mastery} The skill bonuses increase to \\plus2.
        In addition, you are undetectable to all \\magical abilities.
        They cannot detect your presence, sounds you make, or any actions you take.
        For example, a scrying sensor created by a \\abilitytag{Scrying} effect would be unable to detect your presence, and a creature with magical \\sense{darkvision} would not be able to see you without light.

        \\subsubsection{War Domain}
        \\domainability{Gift} You gain proficiency with all non-exotic weapons.
        \\domainability{Aspect} You learn one \\glossterm{maneuver} from any \\glossterm{combat style} (see \\pcref{Maneuver Lists}).
        Its rank must not exceed your rank in the Domain Influence archetype.
        You gain an accuracy bonus with that maneuver equal to the amount by which your rank in the Domain Influence archetype exceeds the maneuver's rank.
        When you gain access to a new \\glossterm{rank} in the Domain Influence archetype,
        you can exchange that maneuver for another maneuver with a rank that does not exceed your rank in the Domain Influence archetype.
        \\domainability{Essence} You gain a \\plus1 bonus to your \\glossterm{magical power} and \\glossterm{mundane power}.
        \\domainability{Mastery} You gain a +1 \\glossterm{accuracy} bonus with \\glossterm{strikes}.

        \\subsubsection{Wild Domain}
        If you choose this domain, you add the \\sphere{verdamancy} \\glossterm{mystic sphere} to your list of divine mystic spheres (see \\pcref{Spell Lists}).
        In addition, you add the Creature Handling, Knowledge (nature), and Survival skills to your cleric \\glossterm{class skill} list.

        \\domainability{Gift} You gain a \\plus1 bonus to the Creature Handling, Knowledge (nature), and Survival skills.
        \\magicaldomainability{Aspect} You gain one \\textit{wild aspect}, as the druid ability from the Shifter archetype (see \\pcref{Shifter}).
        You cannot spend \\glossterm{insight points} to learn additional wild aspects.
        The aspect's effect improves based on your rank in the Domain Influence archetype.
        If you already have that ability, you simply learn an additional wild aspect, and the aspect's effect continues to scale with your Shifter archetype rank.
        \\magicaldomainability{Essence} The skill bonuses increase to \\plus2.
        \\magicaldomainability{Mastery} You learn an additional \\textit{wild aspect}.

        \\subsection{Ex-Clerics}
        If you grossly violate the code of conduct required by your deity, you lose all spells and magical cleric class abilities.
        You cannot regain those abilities until you atone for your transgressions to your deity.
  `;
}
