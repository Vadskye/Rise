from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Too narrow?
# Primary: debuff
# Secondary: utility
# None: buff, damage
photomancy=MysticSphere(
    name="Photomancy",
    short_description="Create and manipulate light to hinder foes and conceal allies",
    cantrips=[
        Effects('Beautify', 'Yourself', """
            You alter your appearance in minor ways.
            This functions like the \\textit<disguise creature>  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref<Disguise Creature>).
            This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

            This ability lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """, tags=['Sensation', 'Visual']),
        Effects('Illuminate', 'One location within \\rngmed range', """
            A glowing light appears in midair in the target location.
            It creates \\glossterm<bright illumination> in a radius of your choice, up to a maximum of 15 feet, and \\glossterm<shadowy illumination> in twice that radius.
            You can freely choose the color of the light, but it is unchanging once created.
            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The maximum radius of bright illumination increases to 30 feet.
            \\rank<4> The maximum radius of bright illumination increases to 60 feet.
            \\rank<6> The maximum radius of bright illumination increases to 120 feet.
        """, tags=['Sensation', 'Visual']),
    ],
    lists=['Arcane', 'Divine', 'Nature', 'Pact'],
    spells=[
        Spell('Color Spray', 1, 'Each creature within a \\areasmall cone from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target at its maximum hit points is \\glossterm<dazed> until the end of the next round.
            Each target that is at less than its maximum \\glossterm<hit points> is \\glossterm<stunned> instead of dazed.
            \\crit As above, except that the effect is a \\glossterm<condition> that lasts until it is removed.
        """, scaling='accuracy', tags=['Sensation', 'Visual']),
        Spell('Color Blast', 3, 'Each creature within a \\arealarge cone from you', """
            This spell functions like the \\spell<color spray> spell, except that the area is larger.
        """, scaling='accuracy', tags=['Sensation', 'Visual']),
        Spell('Prismatic Spray', 4, 'Each target within a \\areasmall cone from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target at its maximum hit points is \\glossterm<stunned> until the end of the next round.
            Each target that is at less than its maximum \\glossterm<hit points> is \\glossterm<confused> instead of stunned.
            \\crit As above, except that the effect is a \\glossterm<condition> that lasts until it is removed.
        """, scaling='accuracy', tags=['Sensation', 'Visual']),
        Spell('Prismatic Blast', 6, 'Each target within a \\arealarge cone from you', """
            This spell functions like the \\spell<prismatic spray> spell, except that the area is larger.
        """, scaling='accuracy', tags=['Sensation', 'Visual']),
        Spell('Army of Twins', 3, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            Choose one of the targets as the primary target.
            You make a Disguise check to alter each target's appearance to exactly match the primary target (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
            However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
        """, scaling="""
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Sustain (free)', 'Sensation', 'Visual']),
        Spell('Blurred Motion', 2, 'Yourself', """
            In any phase where you move at least 10 feet, you gain a +1 bonus to Armor and Reflex defenses.
        """, scaling="""
            \\rank<4> The bonus to Reflex defense increases to +2.
            \\rank<6> The bonus to Armor defense increases to +2.
        """, tags=['Attune (self)']),
        Spell('Wall of Light', 1, None, """
            You create a wall of light in a 15 ft.\\ high, \\areamed line within \\rngmed range.
            If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
            This can allow you to completely block off small tunnels.
            The wall is visible as a solid block of light that blocks sight.
            It does not inhibit the passage of objects or creatures.
        """, scaling="""
            \\rank<3> The area increases to a \\arealarge line.
            \\rank<5> The area increases to a 30 ft.\\ high \\areahuge line.
            \\rank<7> The area increases to a 60 ft.\\ high, \\areagarg line.
        """, tags=['Sensation', 'Sustain (minor)']),
        Spell('Flash', 2, 'One creature within \\rngmed range', """
            A burst of light flashes in front of a creature's eyes.
            \\glossterm<Brilliant illumination> fills a 60 foot radius around a location in the target's space until the end of the next round.
            In addition, make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<dazzled> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Sensation', 'Visual']),
        Spell('Blinding Flash', 7, 'One creature within \\rngshort range', """
            A burst of light flashes in front of a creature's eyes.
            \\glossterm<Brilliant illumination> fills a 60 foot radius around a location in the target's space until the end of the next round.
            In addition, make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, tags=['Sensation', 'Visual']),
        Spell('Searing Light', 1, 'One creature within \\rngmed range', """
            A ray of light flashes between you and the target.
            \\glossterm<Brilliant illumination> fills a 60 foot radius around the path the ray took until the end of the next round.
            % This gives accuracy with lower damage because photomancy isn't narratively a high-damage mystic sphere
            In addition, make an attack vs. Reflex with a +1 bonus to \\glossterm<accuracy> against the target.
            \\hit The target takes energy damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Sensation', 'Visual']),
        # +1 level for sunlight crit, +2 levels for +1a
        Spell('Solar Ray', 4, 'One creature within \\rngmed range', """
            A ray of light flashes between you and the target.
            \\glossterm<Brilliant illumination> fills a 120 foot radius around the path the ray took until the end of the next round.
            In addition, make an attack vs. Reflex with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target takes energy damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that that the target takes double damage.
            In addition, the target suffers consequences as if it had been struck by a beam of true sunlight.
        """, scaling="damage", tags=['Sensation', 'Visual']),
        Spell('Lightburst', 1, 'Creatures in the area (see text)', """
            A burst of brilliant light fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
            \\glossterm<Brilliant illumination> fills a 120 foot radius around the area until the end of the next round.
            In addition, make an attack vs. Fortitude against each target.
            \\hit Each target is \\dazzled until the end of the next round.
            \\crit Each target is \\glossterm<dazzled> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Sensation', 'Visual']),
        Spell('Sunburst', 7, 'Creatures in the area (see text)', """
            A burst of sunlight fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
            \\glossterm<Brilliant illumination> fills a 120 foot radius around the area until the end of the next round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\glossterm<blinded> until the end of the next round.
            \\crit Each target is \\glossterm<blinded> as a \\glossterm<condition>.
            In addition, each target is affected as if it had entered natural sunlight.
        """, tags=['Sensation', 'Visual']),
        # +1 level for five zones instead of one
        Spell('Pillars of Light', 2, 'Creatures in the area (see text)', """
            A burst of brilliant light fills up to five \\areatiny radius, 60 ft.\\ high cylinder-shaped \\glossterm<zones> within \\rnglong range of you.
            \\glossterm<Brilliant illumination> fills a 120 foot radius around each area until the end of the next round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled until the end of the next round.
            \\crit Each target is \\glossterm<dazzled> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Sensation', 'Visual']),
        Spell('Kaleidoscopic Pattern', 4, 'Creatures in the area (see text)', """
            This spell creates a brilliant, rapidly shifting rainbow of lights in a \\areasmall radius within \\rngmed range of you.
            They fill a 120 foot radius around the area with \\glossterm<brilliant illumination> until the end of the next round.
            In addition, make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<stunned> until the end of the next round.
            \\crit Each target is \\glossterm<stunned> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Compulsion', 'Sensation', 'Visual']),
        Spell('Blur', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target's physical outline is distorted so it appears blurred, shifting, and wavering.
            It gains a +1 \\glossterm<magic bonus> to Armor defense and the Stealth skill.
            This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Disguise Image', 2, 'Yourself', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
            However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Malleable Disguise', 4, 'Yourself', """
            This spell functions like the \\textit<disguise image> spell, except that you can change the nature of the disguise as a \\glossterm<standard action>.
        """, scaling="""
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Mirror Image', 1, 'Yourself', """
            Two illusory duplicates appear around you that mirror your every move.
            The duplicates shift chaotically in your space, making it difficult to identify your real location.

            All \\glossterm<targeted> against you have a 50\\% miss chance.
            Like other miss chances, this miss chance is rolled before determining whether the attack beats your defenses.
            When an attack misses in this way, it affects an image, destroying it.
            When the last image is destroyed, this ability provides no further benefit.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, scaling="""
            \\rank<3> The spell creates three duplicates.
            \\rank<5> The spell creates four duplicates.
            \\rank<7> The spell creates five duplicates.
        """, tags=['Attune (self)', 'Sensation', 'Visual']),
        Spell('Displacement', 6, 'Yourself', """
            Your image appears to be two to three feet from its real location.
            All \\glossterm<strikes> against you suffer a 20\\% miss chance.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, tags=['Attune (self)', 'Sensation', 'Visual']),
        Spell('Illusory Twin', 2, None, """
            You create an illusory duplicate of yourself overlayed on your body.
            Whenever you move, you may also move the illusory duplicate the same distance in any direction.
            If the duplicate was sharing a space with you before this movement, onlookers cannot tell which is the real you and which is the duplicate.
            When the duplicate is attacked by a \\glossterm<targeted> attack, it is destroyed.
            At the end of each round, if the duplicate is outside of \\rngmed range from you, it is destroyed.
            This effect ends when there are no duplicates remaining.
        """, scaling="""
            \\rank<4> The maximum range increases to \\rnglong.
            \\rank<6> You can create a second duplicate of yourself.
        """, tags=['Sustain (minor)']),
        Spell('False Wound', 1, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            You make a Disguise check to alter the target's appearance to make it appear wounded (see \\pcref<Disguise Creature>).
            You can choose whether the target appears to be at less than its maximum hit points, whether it appears to have a vital wound, or both.
            You gain a +10 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
            However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
        """, scaling="""
            \\rank<3> The bonus increases to +15.
            \\rank<5> The bonus increases to +20.
            \\rank<7> The bonus increases to +25.
        """, tags=['Sustain (minor)']),
        # +1 level for random condition, which makes it easy to stack debuffs on
        # the same target
        Spell('Chromatic Orb', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit The target takes 1d8 energy damage.
            If it loses \\glossterm<hit points> from this damage, it suffers one of the following effects as a \\glossterm<condition>, chosen randomly: \\glossterm<frightened> by you, \\glossterm<nauseated>, \\glossterm<stunned>, or knocked \\glossterm<prone>.
        """, scaling='damage', tags=[]),
        Spell('Lightbeam Dash', 3, 'Everything in the area (see text)', """
            You teleport into an unoccupied destination on a stable surface within \\rngshort range.
            \\glossterm<Brilliant illumination> fills a 60 foot radius around both your starting location and your ending location.
            In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            \\hit Each target takes electricity damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Greater Lightbeam Dash', 6, 'Everything in the area (see text)', """
            You teleport into an unoccupied destination on a stable surface within \\rngdist range.
            Both your departure and arrival with this spell sound like a clap of thunder.
            In addition, make an attack vs. Reflex against everything in a 5 ft.\\ wide line between your starting location and your ending location.
            \\hit Each target takes electricity damage equal to 4d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
    ],
    rituals=[
        Spell('Continuous Light', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
            The target glows like a torch, shedding \\glossterm<bright illumination> in a \\areasmall radius (and shadowy illumination for an additional 20 feet).
        """, tags=['Attune (ritual)', 'Sensation'], ritual_time='one minute'),
        Spell('False Decrepify', 1, 'One Medium or smaller unattended object within \\rngshort range', """
            The target appears old and worn down.
            It may be appear dusty, have cracks and wrinkles from age, or otherwise appear undesirable and low quality.
        """, tags=['Attune (ritual)', 'Sensation'], ritual_time='one hour'),
        Spell('Permanent Light', 3, 'One Medium or smaller unattended object within \\rngshort range', """
            This ritual functions like the \\spell<continuous light> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
            In addition, it can only target objects.
        """, tags=['Sensation'], ritual_time='24 hours'),
    ],
    category='debuff, combat',
)
