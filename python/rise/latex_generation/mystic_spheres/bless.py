from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: buff
# None: debuff, utility, damage
bless=MysticSphere(
    name='Bless',
    short_description="Grant divine blessings to aid allies and improve combat prowess",
    cantrips=[
        Effects('Boon of Competence', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +1 bonus to \\glossterm<accuracy> and \\glossterm<checks> during the next round.
        """, scaling="""
            \\rank<2> The bonus increases to +2.
            \\rank<4> The bonus increases to +3.
            \\rank<6> The bonus increases to +4.
        """, tags=[]),
        Effects('Boon of Protection', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +1 bonus to \\glossterm<defenses> during the next round.
        """, scaling="""
            \\rank<2> The bonus increases to +2.
            \\rank<4> The bonus increases to +3.
            \\rank<6> The bonus increases to +4.
        """, tags=[]),
    ],
    lists=['Divine'],
    spells=[
        Spell('Blessing of Freedom', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target is immune to being \\glossterm<slowed>, \\glossterm<decelerated>, \\glossterm<immobilized>, and \\glossterm<paralyzed>.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The target also gains a +4 bonus to the \\textit<escape grapple> ability (see \\pcref<Grapple Actions>).
        """, tags=['Attune (target)']),
        Spell('Blessing of Swiftness', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<5> The speed bonus increases to +20 feet.
            \\rank<7> The speed bonus increases to +30 feet.
        """, tags=['Attune (target)']),
        Spell('Blessing of Recovery', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a additional +5 bonus to a vital wound after a \\glossterm<long rest> (see \\pcref<Removing Vital Wounds>).
        """, scaling="""
            \\rank<5> The target gains two additional +5 bonuses.
            \\rank<7> The target gains three additional +5 bonuses.
        """, tags=['Attune (target)']),
        Spell('Blessing of Regeneration', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            At the end of each round, if the target did not lose any \\glossterm<hit points> that round, it regains 2d10 \\glossterm<hit points>.
        """, scaling="""
            \\rankline
            \\rank<7> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
        """, tags=['Attune (target)']),
        Spell('Blessing of Proficiency', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target becomes proficient with all standard weapon groups and all types of armor.
            This does not grant proficiency with exotic weapons or improvised weapons.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<5> The target also gains proficiency with all exotic weapons from weapon groups that it would be proficient with without the effects of this spell.
            \\rank<7> The target becomes proficient with all exotic weapons regardless of its prior proficiencies.
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
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +4 bonus to \\glossterm<defenses> against \\glossterm<poisons> and \\glossterm<diseases>.
            In addition, at the end of each round, it automatically gains one success to resist an active poison or disease affecting it that was not applied during that round.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Mental Clarity', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +4 bonus to \\glossterm<defenses> against \\glossterm<Compulsion> and \\glossterm<Emotion> effects.
            In addition, at the end of each round, it automatically removes one \\glossterm<condition> from a Compulsion or Emotion effect that was not applied during that round.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Blessing of Protection', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +1 \\glossterm<magic bonus> to Armor defense and Mental defense.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Precision', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Power', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with all abilities.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Perserverance', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            Whenever the target would gain a \\glossterm<condition>, it can choose to negate that condition.
            After negating two conditions in this way, this spell ends.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The spell can negate three conditions before ending.
        """, tags=['Attune (target)']),
        Spell('Boon of Cleansing', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target can remove a \\glossterm<condition>.
            This cannot remove a condition applied during the current round.
        """, scaling="""
            \\rank<5> The target can remove two conditions.
            \\rank<7> The target can remove three conditions.
        """, tags=[]),
        Spell('Cleansing Benediction', 6, 'You and each of your \\glossterm<allies> within a \\areasmall radius from you', """
            Each target can remove a \\glossterm<condition>.
            This cannot remove a condition applied during the current round.
        """, tags=[]),
        Spell('Blessing of Physical Prowess', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
            The target gains a +2 \\glossterm<magic bonus> to checks using the chosen attribute.
            In addition, if you choose Strength, the target gains a +2 \\glossterm<magic bonus> to Strength for the purpose of determining its \\glossterm<carrying capacity>.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Blessing of Endurance', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target increases its current \\glossterm<hit points> by 4.
            This can cause its current hit points to exceed its normal maximum hit points.
            When this ability ends, the target loses \\glossterm<hit points> equal to the number of hit points it gained this way.
        """, scaling="""
            \\rank<3> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
                Finally, the number of additional hit points increases to 8.
            \\rank<5> The number of additional hit points increases to 16.
            \\rank<7> The number of additional hit points increases to 32.
        """, tags=['Attune (target)']),
        Spell('Blessing of Wakefulness', 2, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            % This spell intentionally can't be cast as a minor action to avoid making waking creatures too easy
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target cannot fall asleep or be knocked unconscious, even by \\glossterm<vital wounds>.
            If it is already unconscious for any reason, this spell wakes it up before it decides whether to attune to this spell.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<6> The target is also immune to being \\glossterm<dazed> or \\glossterm<stunned>.
        """, tags=['Attune (target)']),
        Spell('Blessing of Mastery', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy>, \\glossterm<checks>, and \\glossterm<defenses>.
        """, scaling="""
            \\rank<5> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
            \\rank<7> The bonus increases to +2.
        """, tags=['Attune (target)']),
        Spell('Blessing of Resilience', 2, 'Yourself or an \\glossterm<ally> in \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            The target gains a +2 \\glossterm<magic bonus> to its \\glossterm<resistances> against both \\glossterm<physical> damage and \\glossterm<energy> damage.
        """, scaling="""
            \\rank<4> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
                Finally, the bonus increases to +4.
            \\rank<6> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Blessing of Vitality', 4, 'Yourself or an \\glossterm<ally> in \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            Whenever the target would gain a \\glossterm<vital wound>, it can choose to negate that vital wound.
            After negating a vital wound in this way, this spell ends.
        """, scaling="""
            \\rank<6> Casting this spell does not remove previous attunements to this spell.
                In addition, you can choose to cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (target) tag.
        """, tags=['Attune (target)']),
        Spell('Blessing of Resurrection', 7, 'Yourself or an \\glossterm<ally> in \\rngmed range', """
            You can only have one casting of this spell active at once.
            When you cast this spell, each creature that is already attuned to this spell stops being attuned to it.

            When the target dies, it automatically returns to life at the end of the following round.
            It returns in the same state in which it died, except that all of its \\glossterm<vital rolls> for its vital rolls that were 0 or lower become 1, preventing it from dying again immediately.
            In addition, it gains four \\glossterm<fatigue points> from the trauma of the experience.
            After the target is returned to life this way, this spell ends.
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
