from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: damage
# Secondary: buff (healing)
# Tertiary: debuff, utility
vivimancy=MysticSphere(
    name="Vivimancy",
    short_description="Manipulate life energy to aid allies or harm foes",
    cantrips=[
        Effects('Ablate Vital Wound', 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            If the target has a \\glossterm<vital wound> with a \\glossterm<vital roll> of -1, it treats that \\glossterm<vital roll> as a 0, preventing it from dying (see \\pcref<Vital Wounds>).

            \\rankline
            \\rank<3> The minimum \\glossterm<vital roll> you can mitigate decreases to -2.
            \\rank<5> The minimum \\glossterm<vital roll> you can mitigate decreases to -3.
            \\rank<7> The minimum \\glossterm<vital roll> you can mitigate decreases to -4.
        """, tags=[]),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Lifeseal', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target loses two \\glossterm<hit points>.
            In addition, as a \\glossterm<condition>, the target is unable to regain hit points.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Draining Grasp', 1, 'One living creature within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Drain Life', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Cure Wound', 1, 'Yourself or a living \\glossterm<ally> within \\rngclose range', """
            The target regains one lost \\glossterm<hit point>.

            \\rankline
            \\rank<3> If the target is \\glossterm<bloodied>, it regains two hit points instead of one.
            \\rank<5> The number of hit points regained increases to two.
            \\rank<7> If the target is \\glossterm<bloodied>, it regains three hit points instead of two.
        """, tags=[]),
        Spell('Triage', 4, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            If the target has a \\glossterm<vital wound> with a \\glossterm<vital roll> of -1, it treats that \\glossterm<vital roll> as a 0, preventing it from dying (see \\pcref<Vital Wounds>).

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The minimum \\glossterm<vital roll> you can mitigate decreases to -2.
            \\rank<8> The minimum \\glossterm<vital roll> you can mitigate decreases to -3.
        """, tags=[]),
        Spell('Fortify Life', 1, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target gains a +3 \\glossterm<magic bonus> to Fortitude defense.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Lifegift', 1, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target increases its maximum \\glossterm<hit points> by 2 and regains that many hit points.
            When this spell ends, the target loses hit points equal to the hit points it regained this way.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The number of additional hit points increases to 3.
            \\rank<5> The number of additional hit points increases to 4.
            \\rank<7> The number of additional hit points increases to 5.
        """, tags=['Attune (target)']),
        Spell('Cure Vital Wound', 5, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target removes one \\glossterm<vital wound>.

            \\rankline
            \\rank<7> The target can remove two \\glossterm<vital wounds>.
        """, tags=['AP']),
        Spell('Inflict Wound', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target loses two \\glossterm<hit points>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Inflict Vital Wound', 7, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target loses three \\glossterm<hit points>.
            \\crit As above, and the target gains a \\glossterm<vital wound>.
        """, tags=[]),
        Spell('Steal Vitality', 5, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy \\glossterm<standard damage> +3d.
            If this damage \\glossterm<vitally wounds> the target, you can spend an \\glossterm<action point>.
            When you do, you may remove one of your \\glossterm<vital wounds>.

            \\rankline
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        # TODO: make "Undead Bane" spell after figuring out undead / life
        # damage interaction
        Spell('Vital Persistence', 3, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target ignores the vital wound effect of one of its \\glossterm<vital wounds> (see \\pcref<Vital Wounds>).

            \\rankline
            \\rank<5> You can cast this spell as a \\glossterm<minor action>.
            \\rank<7> The target can ignore the vital wound effect of two of its \\glossterm<vital wounds> instead of only one.
        """, tags=['Attune (target)']),
        Spell('Death Knell', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            You gain a +4 bonus to \\glossterm<accuracy> against a \\glossterm<bloodied> creature.
            \\hit The target loses a \\glossterm<hit point>.
            In addition, as a \\glossterm<condition>, the target is marked for death.
            It takes a penalty to its \\glossterm<vital resistance> equal to your \\glossterm<power> against all types of damage.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Circle of Death', 3, 'Living \\glossterm<enemies> in a \\areamed radius', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target loses one \\glossterm<hit point>.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Circle of Life', 5, 'Yourself and each living \\glossterm<ally> in a \\areamed radius', """
            Each target regains one lost \\glossterm<hit point>.

            \\rankline
            \\rank<7> The area increases to a \\arealarge radius.
        """, tags=[]),
        Spell('Avasculate', 8, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target loses \\glossterm<hit points> equal to half its maximum hit points.
            Unlike normal, this hit point loss is rounded up instead of down.
        """, tags=[]),
        Spell('Draining Miasma', 1, 'Living \\glossterm<enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<sickened> until the end of the next round.
            \\crit Each target is \\glossterm<sickened> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Lifesteal', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target loses a \\glossterm<hit point> and you regain a lost hit point.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Lifesteal Blade', 4, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            Once per round, when the target \\glossterm<vitally wounds> a living creature with a \\glossterm<strike>, the target regains a lost \\glossterm<hit point>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> This healing only requires the target to \\glossterm<wound> a living creature with a strike.
            \\rank<8> This healing only requires the target to deal damage to a living creature with a strike.
        """, tags=['Attune (target)']),
    ],
    rituals=[
        Spell('Remove Disease', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All diseases affecting the target are removed.

            This ritual takes one minute to perform.
        """, tags=['AP']),
        Spell('Restore Senses', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            One of the target's physical senses, such as sight or hearing, is restored to full capacity.
            This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).

            This ritual takes one minute to perform.
        """, tags=['AP']),
        Spell('Reincarnation', 5, 'One Diminuitive or larger piece of a humanoid corpse', """
            The target must have been part of the original creature's body at the time of death.
            The creature the target corpse belongs to returns to life in a new body.
            It must not have died due to old age.

            This ritual creates an entirely new body for the creature's soul to inhabit from the natural elements at hand.
            During the ritual, the body ages to match the age of the original creature at the time it died.
            The creature has 0 hit points when it returns to life.

            A reincarnated creature is identical to the original creature in all respects, except for its species.
            The creature's species is replaced with a random species from \\tref<Humanoid Reincarnations>.
            Its appearance changes as necessary to match its new species, though it retains the general shape and distinguishing features of its original appearance.
            The creature loses all attribute modifiers and abilities from its old species, and gains those of its new species.
            However, its languages are unchanged.

            Coming back from the dead is an ordeal.
            All of the creature's action points and other daily abilities are expended when it returns to life.
            In addition, its maximum action points are reduced by 1.
            This penalty lasts for thirty days, or until the creature gains a level.
            If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.

            This ritual takes 24 hours to perform, and requires 32 action points from its participants.
            In addition, it can only be learned through the nature \\glossterm<magic source>.
        """, tags=['AP', 'Creation'], extra_text="""
            \\begin{dtable}
                \\lcaption{Humanoid Reincarnations}
                \\begin{dtabularx}{\\columnwidth}{l X}
                    \\tb{d\\%} & \\tb{Incarnation} \\tableheaderrule
                    01--13 & Dwarf \\\\
                    14--26 & Elf \\\\
                    27--40 & Gnome \\\\
                    41--52 & Half-elf \\\\
                    53--62 & Half-orc \\\\
                    63--74 & Halfling \\\\
                    75--100 & Human \\\\
                \\end{dtabularx}
            \\end{dtable}
        """),
        Spell('Fated Reincarnation', 6, 'One Diminuitive or larger piece of a humanoid corpse', f"""
            This ritual functions like the \\ritual<reincarnation> ritual, except that the target is reincarnated as its original species instead of as a random species.

            This ritual takes 24 hours to perform, and requires 50 action points from its participants.
            In addition, it can only be learned through the nature \\glossterm<magic source>.
        """, tags=['AP', 'Creation']),
        Spell('Purge Curse', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All curses affecting the target are removed.
            This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
            However, it can allow the target to remove any cursed items it has equipped.

            This ritual takes 24 hours to perform, and requires 8 action points from its participants.
        """, tags=['AP']),
        Spell('Restoration', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
            In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.

            This ritual takes 24 hours to perform, and requires 18 action points from its participants.
        """, tags=['AP']),
        Spell('Resurrection', 4, 'One intact humanoid corpse within \\rngclose range', """
            The target returns to life.
            It must not have died due to old age.

            The creature has 0 hit points when it returns to life.
            It is cured of all \\glossterm<vital damage> and other negative effects, but the body's shape is unchanged.
            Any missing or irreparably damaged limbs or organs remain missing or damaged.
            The creature may therefore die shortly after being resurrected if its body is excessively damaged.

            Coming back from the dead is an ordeal.
            All of the creature's action points and other daily abilities are expended when it returns to life.
            In addition, its maximum action points are reduced by 1.
            This penalty lasts for thirty days, or until the creature gains a level.
            If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.

            This ritual takes 24 hours to perform, and requires 18 action points from its participants.
            In addition, it can only be learned through the divine \\glossterm<magic source>.
        """, tags=['AP']),
        Spell('Complete Resurrection', 6, 'One Diminuitive or larger piece of a humanoid corpse within \\rngclose range', """
            This ritual functions like the \\ritual<resurrection> ritual, except that it does not have to target a fully intact corpse.
            The target must have been part of the original creature's body at the time of death.
            The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

            This ritual takes 24 hours to perform, and requires 50 action points from its participants.
            In addition, it can only be learned through the divine \\glossterm<magic source>.
        """, tags=['AP', 'Creation']),
        Spell('True Resurrection', 8, 'Special', """
            This ritual functions like the \\ritual<resurrection> ritual, except that it does not require any piece of the corpse.
            Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
            The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

            This ritual takes 24 hours to perform, and requires 98 action points from its participants.
            In addition, it can only be learned through the divine \\glossterm<magic source>.
        """, tags=['AP', 'Creation']),
        Spell('Soul Bind', 6, 'One intact corpse within \\rngclose range', """
            % Is this clear enough that you can't use the same gem for this ritual twice?
            Choose a nonmagical gem you hold that is worth at least 1,000 gp.
            A fragment of the soul of the creature that the target corpse belongs to is imprisoned in the chosen gem.
            This does not remove the creature from its intended afterlife.
            However, it prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
            A creature holding the gem may still resurrect or reanimate the creature.
            If the gem is shattered, the fragment of the creature's soul returns to its body.

            This ritual takes one hour to perform.
        """, tags=['AP']),
        Spell('Animate Dead', 3, 'Any number of corpses within \\rngclose range', """
            The combined levels of all targets cannot exceed your \\glossterm<power>.
            The target becomes an undead creature that obeys your spoken commands.
            You choose whether to create a skeleton or a zombie.
            Creating a zombie require a mostly intact corpse, including most of the flesh.
            Creating a skeleton only requires a mostly intact skeleton.
            If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='damage',
)
