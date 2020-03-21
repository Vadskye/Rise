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
        Spell('Blessing of Protection', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target gains a +1 \\glossterm<magic bonus> to Armor defense and Mental defense.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus to Mental defense increases to +2.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Mental defense increases to +3.
        """, tags=['Attune (target)']),
        Spell('Battle Blessing', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power>.
            \\rank<7> The accuracy increases to +2.
        """, tags=['Attune (target)']),
        Spell('Blessing of Resilience', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            Whenever the target gains a \\glossterm<condition>, it can choose to negate that condition.
            After negating a condition in this way, this spell ends.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The spell can negate two conditions before ending.
            \\rank<8> The spell can negate three conditions before ending.
        """, tags=['Attune (target)']),
        Spell('Cleansing Blessing', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target can remove its most recent \\glossterm<condition>.
            This cannot remove a condition applied during the current round.

            \\rankline
            \\rank<5> The target can remove its two most recent conditions.
            \\rank<7> The target can remove its three most recent conditions.
        """, tags=[]),
        Spell('Cleansing Benediction', 6, 'You and each of your \\glossterm<allies> within a \\areamed radius from you', """
            Each target can remove its most recent \\glossterm<condition>.
            This cannot remove a condition applied during the current round.

            \\rankline
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=[]),
        Spell('Blessing of Might', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target gains a +4 \\glossterm<magic bonus> to Strength for the purpose of determining its \\glossterm<carrying capacity>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Endurance', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target increases its maximum \\glossterm<hit points> by one and regains one \\glossterm<hit point>.
            When this ability ends, the target loses \\glossterm<hit points> equal to the number of hit points it regained this way and its maximum \\glossterm<hit points> are restored to normal.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The number of additional hit points increases to two.
            \\rank<5> The number of additional hit points increases to three.
            \\rank<7> The number of additional hit points increases to four.
        """, tags=['Attune (target)']),
        Spell('Blessing of Persistence', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target cannot fall asleep or be knocked unconscious, even by \\glossterm<vital wounds>.
            If it is already unconscious for any reason, this spell wakes it up before it decides whether to attune to this spell.

            % This spell intentionally can't be cast as a minor action to avoid making waking creatures too easy

            \\rankline
            \\rank<6> The target is also immune to being \\glossterm<dazed> or \\glossterm<stunned>.
            \\rank<8> The target is also immune to being \\glossterm<paralyzed>.
        """, tags=['Attune (target)']),
    ],
    rituals=[
        Spell('Blessed Strike', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            If the target makes a \\glossterm<strike> during the current phase,
                it gains a +4 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
            If you cast this spell on yourself, it affects the first strike you make until the end of the next round.

            \\rankline
            \\rank<3> The bonus increases to +5.
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +7.
        """, tags=['Swift']),
        Spell('Blessing of Fortification', 1, 'One unattended, nonmagical object or part of an object of up to Large size', """
            Unlike most abilities, this ritual can affect individual parts of a whole object.

            % How should this affect Strength break difficulty ratings?
            The target gains a +5 \\glossterm<magic bonus> to \\glossterm<resistances>.
            If the target is moved, this effect ends.
            Otherwise, it lasts for one year.

            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)']),
        Spell('Enduring Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the effect lasts for one hundred years.
        """, tags=['AP']),
        Spell('Greater Enduring Fortification', 5,'Greater Fortification', """
            This ritual functions like the \\spell<greater fortification> ritual, except that the effect lasts for one hundred years.
        """, tags=['AP']),
        Spell('Greater Fortification', 4, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
        """, tags=['Attune (ritual)']),
        Spell('Supreme Fortification', 7, 'One unattended, nonmagical object or part of an object of up to Large size', """
            This ritual functions like the \\spell<blessing of fortification> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
        """, tags=['Attune (ritual)']),
        Spell('Bless Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
            The target becomes holy water.
            Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead creature or an evil outsider.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Permanent Bless Water', 3, 'One pint of unattended, nonmagical water within \\rngclose range', """
            This ritual functions like the \\spell<bless water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
            This ritual takes one hour to perform.
        """, tags=['AP']),
        Spell('Curse Water', 1, 'One pint of unattended, nonmagical water within \\rngclose range', """
            The target becomes unholy water.
            Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good outsider.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Permanent Curse Water', 3, 'One pint of unattended, nonmagical water within \\rngclose range', """
            This ritual functions like the \\spell<curse water> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
            This ritual takes one hour to perform.
        """, tags=['AP']),
        Spell('Blessing of Purification', 1, 'All food and water in a single square within \\rngclose range', """
            The targets are purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.

            This ritual takes one hour to perform.
        """, tags=['AP']),
    ],
    category='buff, offense',
)
