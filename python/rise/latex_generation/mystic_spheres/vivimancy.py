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
        Effects('Ablate Vital Wound', 'Yourself or a living \\glossterm<ally> within your \\glossterm<reach>', """
            If the target has a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, it treats that \\glossterm<vital roll> as a 1, preventing it from dying (see \\pcref<Vital Wounds>).
        """, scaling="""
            \\rank<2> The range increases to \\rngshort range.
            \\rank<4> The minimum \\glossterm<vital roll> you can mitigate decreases to -1.
            \\rank<6> The minimum \\glossterm<vital roll> you can mitigate decreases to -2.
        """, tags=[]),
        Effects('Minor Life Infusion', 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target regains one \\glossterm<hit point>.
        """, scaling="""
            \\rank<3> The healing increases to two \\glossterm<hit points>.
            \\rank<5> The healing increases to four \\glossterm<hit points>.
            \\rank<7> The healing increases to eight \\glossterm<hit points>.
        """, tags=[]),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Lifeseal', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 2d10 plus your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it becomes unable to regain any hit points as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Draining Grasp', 1, 'One living creature within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes energy damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        Spell('Drain Life', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Cure Wound', 2, 'Yourself or a living \\glossterm<ally> within \\rngshort range', """
            The target regains \\glossterm<hit points> equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 2.
        """, tags=[]),
        Spell('Triage', 2, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            If the target has a \\glossterm<vital wound> with a \\glossterm<vital roll> of 0, it treats that \\glossterm<vital roll> as a 1, preventing it from dying (see \\pcref<Vital Wounds>).
        """, scaling="""
            \\rank<4> The minimum \\glossterm<vital roll> you can mitigate decreases to -1.
            \\rank<6> The minimum \\glossterm<vital roll> you can mitigate decreases to -2.
        """, tags=[]),
        Spell('Fortify Life', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +2 \\glossterm<magic bonus> to Fortitude defense.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (target)']),
        Spell('Cure Vital Wound', 5, 'Yourself or a living \\glossterm<ally> within \\rngmed range', """
            The target removes one \\glossterm<vital wound>.
            It gains two \\glossterm<fatigue points> for each vital wound removed this way.
        """, scaling="""
            \\rank<7> The target can remove two \\glossterm<vital wounds>.
        """, tags=[]),
        Spell('Inflict Wound', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 1d8 plus half your \\glossterm<power>.
            If the target would lose \\glossterm<hit points> from this damage, it loses twice that many hit points instead.
        """, scaling="damage", tags=[]),
        # +2 levels for +1d, +1 level for fancy crit
        Spell('Inflict Vital Wound', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 2d10 plus half your \\glossterm<power>.
            If the target would lose \\glossterm<hit points> from this damage, it loses twice that many hit points instead.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that the damage is doubled.
            In addition, if the target did not already gain a \\glossterm<vital wound> from that loss of hit points, it gains a \\glossterm<vital wound>.
        """, scaling="damage", tags=[]),
        # +4 levels for +2d, +1 level for vital wound effect, -1 for short
        Spell('Steal Vitality', 5, 'One living creature within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 4d10 plus your \\glossterm<power>.
            If this damage \\glossterm<vitally wounds> the target, you can remove one of your \\glossterm<vital wounds>.
            When you do, you gain two \\glossterm<fatigue points>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        # TODO: make "Undead Bane" spell after figuring out undead / life
        # damage interaction
        Spell('Vital Persistence', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target ignores the vital wound effect of one of its \\glossterm<vital wounds> (see \\pcref<Vital Wounds>).
        """, scaling="""
            \\rank<5> This spell can target a living \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The target can ignore the vital wound effect of two of its \\glossterm<vital wounds> instead of only one.
        """, tags=['Attune (target)']),
        Spell('Death Knell', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            You gain a +2 bonus to \\glossterm<accuracy> against a creature at less than its maximum \\glossterm<hit points>.
            \\hit The target takes 1d8 energy damage.
            If it loses \\glossterm<hit points> from this damage, it is marked for death as a \\glossterm<condition>.
            If it reaches 0 hit points during this effect, it immediately dies.
        """, scaling="damage", tags=[]),
        Spell('Circle of Death', 3, 'Living \\glossterm<enemies> in a \\areamed radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes energy damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Circle of Life', 5, 'Yourself and each living \\glossterm<ally> in a \\areamed radius from you', """
            Each target regains 2d8 \\glossterm<hit points>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 5.
        """, tags=[]),
        Spell('Lifegift', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target increases its current \\glossterm<hit points> by 4.
            This can cause its current hit points to exceed its normal maximum hit points.
            When this ability ends, the target loses \\glossterm<hit points> equal to the number of hit points it gained this way.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            In addition, the number of additional hit points increases to 8.
            \\rank<5> The number of additional hit points increases to 16.
            \\rank<7> The number of additional hit points increases to 32.
        """, tags=['Attune (target)']),
        Spell('Wellspring of Life', 2, 'Yourself', """
            Once per round, when the target would regain hit points, it regains additional hit points equal to your \\glossterm<power>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The additional healing increases to twice your \\glossterm<power>.
        """, tags=['Attune (target)']),
        Spell('Avasculate', 7, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 4d6 energy damage.
            If it loses \\glossterm<hit points> from this damage, it also loses additional \\glossterm<hit points> equal to half its maximum hit points.
            Unlike normal, this hit point loss is rounded up instead of down.
            \\glance As above, except that that the target takes half damage.
        """, tags=[]),
        Spell('Sickening Miasma', 1, 'Living creatures in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<sickened> until the end of the next round.
            \\crit Each target is \\glossterm<sickened> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Nauseating Miasma', 4, 'Living creatures in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<nauseated> until the end of the next round.
            \\crit Each target is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Lifesteal', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes energy damage equal to 2d8 plus your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, you regain \\glossterm<hit points> equal to half the hit points it lost this way.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Lifesteal Blade', 5, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            Once per round, when the target causes a living creature to lose \\glossterm<hit points> with a \\glossterm<strike>, the target regains \\glossterm<hit points> equal to half the hit points the struck creature lost this way.
        """, scaling="""
            \\rank<7> This spell can target a living \\glossterm<ally> within \\rngmed range instead of you.
        """, tags=['Attune (target)']),
        Spell('Corpse Explosion', 2, 'One Small or larger corpse within \\rngmed range (see text)', """
            You violently discharge the latent magical potential within the target corpse, causing it to explode.
            Make an attack vs. Reflex against each creature within a \\areasmall radius from it.
            \\hit Each target takes bludgeoning damage equal to 1d10 plus half your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Withering', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target's body withers.
            It takes a -2 penalty to Fortitude defense.
            Whenever it loses one or more \\glossterm<hit points> from a single attack, this penalty increases by 1.
            This penalty increase stacks, and persists even if the target regains the lost hit points.
            \\crit As above, except that the penalty starts at -5.
        """, scaling="accuracy", tags=[]),
        Spell('Withering Curse', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target becomes more vulnerable to injury until it takes a short rest.
            It takes a -2 penalty to Fortitude defense.
            Whenever it loses one or more \\glossterm<hit points> from a single attack, this penalty increases by 1.
            This penalty increase stacks, and persists even if the target regains the lost hit points.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, scaling="accuracy", tags=['Curse']),
        Spell('Retributive Lifebond', 1, ['Yourself', 'see text'], """
            At the end of each round, make an attack vs. Fortitude against each creature adjacent to you that caused you to lose \\glossterm<hit points> that round.
            \\hit Each secondary target takes energy damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling='damage', tags=['Attune (self)']),
        Spell('Greater Retributive Lifebond', 4, ['Yourself', 'see text'], """
            At the end of each round, make an attack vs. Fortitude against each creature within a \\areamed radius from you that caused you to lose \\glossterm<hit points> that round.
            \\hit Each secondary target takes energy damage equal to 4d10 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling='damage', tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Remove Disease', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All diseases affecting the target are removed.
        """, tags=[], ritual_time='one hour'),
        Spell('Restore Senses', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            One of the target's physical senses, such as sight or hearing, is restored to full capacity.
            This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
        """, tags=[], ritual_time='one hour'),
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
            All of the creature's \\glossterm<attunement points> and daily abilities are expended when it returns to life.
            In addition, its maximum attunement points are reduced by 1.
            This penalty lasts for thirty days, or until the creature gains a level.
            If this would reduce a creature's maximum attunement points below 0, the creature cannot be resurrected.

            This ritual can only be learned through the nature \\glossterm<magic source>.
        """, tags=['Creation'], ritual_time='24 hours', extra_text="""
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

            This ritual can only be learned through the nature \\glossterm<magic source>.
        """, tags=['Creation'], ritual_time='24 hours'),
        Spell('Purge Curse', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All curses affecting the target are removed.
            This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
            However, it can allow the target to remove any cursed items it has equipped.
        """, tags=[], ritual_time='24 hours'),
        Spell('Restoration', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
            In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.
        """, tags=[], ritual_time='24 hours'),
        Spell('Resurrection', 4, 'One intact humanoid corpse within \\rngshort range', """
            The target returns to life.
            It must not have died due to old age.

            The creature has 0 hit points when it returns to life.
            It is cured of all \\glossterm<vital damage> and other negative effects, but the body's shape is unchanged.
            Any missing or irreparably damaged limbs or organs remain missing or damaged.
            The creature may therefore die shortly after being resurrected if its body is excessively damaged.

            Coming back from the dead is an ordeal.
            All of the creature's \\glossterm<attunement points> and daily abilities are expended when it returns to life.
            In addition, its maximum attunement points are reduced by 1.
            This penalty lasts for thirty days, or until the creature gains a level.
            If this would reduce a creature's maximum attunement points below 0, the creature cannot be resurrected.

            This ritual can only be learned through the divine \\glossterm<magic source>.
        """, tags=[], ritual_time='24 hours'),
        Spell('Complete Resurrection', 6, 'One Diminuitive or larger piece of a humanoid corpse within \\rngshort range', """
            This ritual functions like the \\ritual<resurrection> ritual, except that it does not have to target a fully intact corpse.
            The target must have been part of the original creature's body at the time of death.
            The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

            This ritual can only be learned through the divine \\glossterm<magic source>.
        """, tags=['Creation'], ritual_time='24 hours'),
        Spell('True Resurrection', 8, 'Special', """
            This ritual functions like the \\ritual<resurrection> ritual, except that it does not require any piece of the corpse.
            Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
            The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

            This ritual can only be learned through the divine \\glossterm<magic source>.
        """, tags=['Creation'], ritual_time='24 hours'),
        Spell('Soul Bind', 6, 'One intact corpse within \\rngshort range', """
            % Is this clear enough that you can't use the same gem for this ritual twice?
            Choose a nonmagical gem you hold that is worth at least 1,000 gp.
            A fragment of the soul of the creature that the target corpse belongs to is imprisoned in the chosen gem.
            This does not remove the creature from its intended afterlife.
            However, it prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
            A creature holding the gem may still resurrect or reanimate the creature.
            If the gem is shattered, the fragment of the creature's soul returns to its body.
        """, tags=[], ritual_time='one hour'),
        Spell('Animate Dead', 3, 'Any number of corpses within \\rngshort range', """
            The combined levels of all targets cannot exceed your \\glossterm<power>.
            The target becomes an undead creature that obeys your spoken commands.
            You choose whether to create a skeleton or a zombie.
            Creating a zombie require a mostly intact corpse, including most of the flesh.
            Creating a skeleton only requires a mostly intact skeleton.
            If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
    ],
    category='damage',
)
