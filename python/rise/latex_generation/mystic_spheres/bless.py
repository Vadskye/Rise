from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: buff
# None: debuff, utility, damage
bless=MysticSphere(
    name='Bless',
    short_description="Grant divine blessings to aid allies and improve combat prowess",
    cantrips=[
    ],
    lists=['Divine'],
    spells=[
        Spell('Blessing of Freedom', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target is immune to being \\glossterm<slowed>, \\glossterm<decelerated>, and \\glossterm<immobilized>.
        """, scaling="""
            \\rank<7> The target is also immune to being \\glossterm<paralyzed>.
        """, tags=['Attune (target)']),
        Spell('Blessing of Swiftness', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.
        """, scaling="""
            \\rank<5> The speed bonus increases to +20 feet.
            \\rank<7> The speed bonus increases to +30 feet.
        """, tags=['Attune (target)']),
        Spell('Blessing of Recovery', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a additional +5 bonus to a vital wound after a \\glossterm<long rest> (see \\pcref<Removing Vital Wounds>).
        """, scaling="""
            \\rank<5> The target gains two additional +5 bonuses.
            \\rank<7> The target gains three additional +5 bonuses.
        """, tags=['Attune (target)']),
        Spell('Blessing of Regeneration', 7, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            At the end of each round, if the target did not lose any \\glossterm<hit points> that round, it regains 2d10 \\glossterm<hit points>.
        """, tags=['Attune (target)']),
        Spell('Blessing of Proficiency', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            When you cast this spell, choose a weapon group or usage class of armor.
            If you choose armor, the target must be proficient with all lighter usage classes of armor.
            The target becomes proficient with the chosen weapon group or usage class of armor.
        """, scaling="""
            \\rank<3> If the target would already be proficient with a chosen weapon group, it also becomes proficient with exotic weapons from that weapon group.
            \\rank<5> You may grant the target proficiency with an additional weapon group or usage class of armor.
            \\rank<7> The target becomes proficient with exotic weapons from a chosen weapon group regardless of its prior proficiencies.
        """, tags=['Attune (target)']),
        Spell('Boon of Precision', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The first time the target makes a \\glossterm<strike> this round,
                it gains a +2 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
            Because this ability has the \\glossterm<Swift> tag, it can affect an attack the target makes during the current phase.
            If you cast this spell on yourself, it affects the first strike you make until the end of the next round.
        """, scaling="""
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Swift']),
        Spell('Boon of Invulnerability', 6, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target becomes takes half damage from all sources until the end of the current round.
            Because this ability has the \\glossterm<Swift> tag, it affects all damage the target takes during the current phase.
        """, tags=['Swift']),
        Spell('Boon of Avoidance', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +2 bonus to \\glossterm<defenses> until the end of the round.
            Because this ability has the \\glossterm<Swift> tag, this improves the target's defenses against attacks made against it during the current phase.
        """, scaling="""
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Swift']),
        Spell('Blessing of the Purified Body', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +4 bonus to \\glossterm<defenses> against \\glossterm<poisons> and \\glossterm<diseases>.
        """, scaling="""
            \\rank<4> The bonus increases to +6.
            \\rank<6> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Mental Clarity', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +4 bonus to \\glossterm<defenses> against \\glossterm<Compulsion> and \\glossterm<Emotion> effects.
        """, scaling="""
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Blessing of Protection', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +1 \\glossterm<magic bonus> to Armor defense and Mental defense.
        """, scaling="""
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Precision', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.
        """, scaling="""
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Power', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with all abilities.
        """, scaling="""
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Perserverance', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            Whenever the target gains a \\glossterm<condition>, it can choose to negate that condition.
            After negating a condition in this way, this spell ends.
        """, scaling="""
            \\rank<5> The spell can negate two conditions before ending.
            \\rank<7> The spell can negate three conditions before ending.
        """, tags=['Attune (target)']),
        Spell('Boon of Cleansing', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target can remove a \\glossterm<condition>.
            This cannot remove a condition applied during the current round.
        """, scaling="""
            \\rank<5> The target can remove two conditions.
            \\rank<7> The target can remove three conditions.
        """, tags=[]),
        Spell('Cleansing Benediction', 6, 'You and each of your \\glossterm<allies> within a \\areamed radius from you', """
            Each target can remove a \\glossterm<condition>.
            This cannot remove a condition applied during the current round.
        """, scaling="""
        """, tags=[]),
        Spell('Blessing of Might', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +2 \\glossterm<magic bonus> to Strength-based checks.
            In addition, it gains a +2 \\glossterm<magic bonus> to Strength for the purpose of determining its \\glossterm<carrying capacity>.
        """, scaling="""
            \\rank<6> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Endurance', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target increases its current \\glossterm<hit points> by 8.
            This can cause its current hit points to exceed its normal maximum hit points.
            When this ability ends, the target loses \\glossterm<hit points> equal to the number of hit points it gained this way.
        """, scaling="""
            \\rank<5> The number of additional hit points increases to 16.
            \\rank<7> The number of additional hit points increases to 32.
        """, tags=['Attune (target)']),
        Spell('Blessing of Wakefulness', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target cannot fall asleep or be knocked unconscious, even by \\glossterm<vital wounds>.
            If it is already unconscious for any reason, this spell wakes it up before it decides whether to attune to this spell.

            % This spell intentionally can't be cast as a minor action to avoid making waking creatures too easy
        """, scaling="""
            \\rank<6> The target is also immune to being \\glossterm<dazed> or \\glossterm<stunned>.
        """, tags=['Attune (target)']),
    ],
    rituals=[
        Spell('Blessing of Fortification', 1, 'One unattended, nonmagical object or part of an object of up to Large size', """
            Unlike most abilities, this ritual can affect individual parts of a whole object.

            % How should this affect Strength break difficulty ratings?
            The target gains a +5 \\glossterm<magic bonus> to its \\glossterm<resistances> to both \\glossterm<physical damage> and \\glossterm<energy damage>.
            If the target is moved, this effect ends.
            Otherwise, it lasts for one year.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Enduring Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the effect lasts for one hundred years.
        """, tags=[], ritual_time='24 hours'),
        Spell('Greater Enduring Fortification', 5,'Greater Fortification', """
            This ritual functions like the \\spell<greater fortification> ritual, except that the effect lasts for one hundred years.
        """, tags=[], ritual_time='24 hours'),
        Spell('Greater Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Supreme Fortification', 7, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Bless Water', 1, 'One pint of unattended, nonmagical water within \\rngshort range', """
            The target becomes holy water.
            Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck \\glossterm<undead> or an evil \\glossterm<planeforged>.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Permanent Bless Water', 3, 'One pint of unattended, nonmagical water within \\rngshort range', """
            This ritual functions like the \\spell<bless water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
        """, tags=[], ritual_time='one hour'),
        Spell('Curse Water', 1, 'One pint of unattended, nonmagical water within \\rngshort range', """
            The target becomes unholy water.
            Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good \\glossterm<planeforged>.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Permanent Curse Water', 3, 'One pint of unattended, nonmagical water within \\rngshort range', """
            This ritual functions like the \\spell<curse water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
        """, tags=[], ritual_time='one hour'),
        Spell('Blessing of Purification', 1, 'All food and water in a single square within \\rngshort range', """
            The targets are purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.
        """, tags=[], ritual_time='one hour'),
    ],
    category='buff, offense',
)
