from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

# Primary: buff
# Secondary: utility
# None: damage, debuff
umbramancy=MysticSphere(
    name="Umbramancy",
    short_description="Manipulate shadows and darkness to conceal allies and inhibit foes",
    cantrips=[
        Effects('Shadowcloak', 'Yourself', """
            This spell has no \\glossterm<verbal components>.

            You gain a +2 bonus to the Stealth skill until the end of the next round.
        """, scaling="""
            \\rank<2> The bonus increases to +4.
            \\rank<4> The bonus increases to +6.
            \\rank<6> The bonus increases to +8.
        """, tags=[]),
        Effects('Suppress Light', 'One \\glossterm<zone> within \\rngmed range', """
            This spell has no \\glossterm<verbal components>.

            You can choose this spell's radius, up to a maximum of a \\areasmall radius.
            Light within or passing through the area is dimmed to be no brighter than \\glossterm<shadowy illumination>.
            Any object or effect which blocks light also blocks this spell's effect.
        """, scaling="""
            \\rank<2> The maximum area increases to a \\areamed radius.
            \\rank<4> The range increases to \\rnglong.
            \\rank<6> The maximum area increases to a \\arealarge radius.
        """, tags=['Sustain (minor)']),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Banish Light', 3, 'One \\glossterm<zone> within \\rngmed range', """
            You can choose this spell's radius, up to a maximum of a \\areamed radius.
            All light within the area is suppressed.
            Light within or passing through the area is snuffed out.
            Any object or effect which blocks light also blocks this spell's effect.
            Darkvision and similar abilities which do not require light still function within the area.
        """, scaling="""
            \\rank<5> The maximum area increases to a \\arealarge radius.
            \\rank<7> The maximum area increases to a \\areahuge radius.
        """, tags=['Sensation', 'Sustain (minor)']),
        Spell('Darklantern', 1, 'One Small or smaller unattended object within \\rngshort range', """
            This spell suppresses light in an \\glossterm<emanation> from the target.
            You can choose the spell's radius, up to a maximum of a \\areasmall radius.
            Light within or passing through the area is dimmed to be no brighter than \\glossterm<shadowy illumination>.
            Any object or effect which blocks light also blocks this spell's effect.
        """, scaling="""
            \\rank<3> The maximum area increases to a \\areamed radius \\glossterm<emanation>.
            \\rank<5> The maximum area increases to a \\arealarge radius \\glossterm<emanation>.
            \\rank<7> The maximum area increases to a \\areahuge radius \\glossterm<emanation>.
        """, tags=['Attune (self)', 'Sensation']),
        Spell('Darkvision', 2, 'Yourself', """
            The target gains \\glossterm<darkvision> with a 60 foot radius.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The radius increases to 120 feet.
        """, tags=['Attune (target)']),
        # -1d to compensate for +2a
        Spell('Dark Miasma', 1, 'Creatures in a \\areasmall radius from you', """
            Make an attack vs. Fortitude against each target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack against each target that is not in \\glossterm<bright illumination>.
            \\hit Each target takes cold damage equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        # -1d to compensate for +2a
        Spell('Consuming Darkness', 4, '\\glossterm<Enemies> in a \\arealarge radius from you', """
            Make an attack vs. Fortitude against each target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack against each target that is not in \\glossterm<bright illumination>.
            \\hit Each target takes cold damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling='damage', tags=[]),
        Spell('Dark Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack if the target is not in \\glossterm<bright illumination>.
            % -1d to compensate for +2a
            \\hit The target takes cold damage equal to 1d8 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        Spell('Chill of Darkness', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack if the target is not in \\glossterm<bright illumination>.

            % -1d to compensate for +2a
            \\hit The target takes cold damage equal to 1d8 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Shadow Mantle', 1, 'Yourself', """
            The target's physical form becomes blurred and shifts in and out of existence.
            This is not a mere trick of the light, but an alteration of reality to make its existence more ambiguous.
            The target gains a +1 \\glossterm<magic bonus> to Armor defense and the Stealth skill.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Fade Into Darkness', 2, 'Yourself', """
            At the end of each round, if you took no actions that round and are not in \\glossterm<bright illumination>, you become \\glossterm<invisible>.
            This invisibility ends after you take any action.
        """, scaling="""
            \\rank<4> Moving during a round does not prevent you from becoming invisible at the end of the round.
            \\rank<6> Taking \\glossterm<minor actions> does not prevent you from becoming invisible at the end of the round.
        """, tags=['Attune (self)']),
        Spell('Shrouded Vision', 5, 'One creature within \\rngshort range', """
            Make an attack vs. Mental against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack if the target is not in \\glossterm<bright illumination>.
            \\hit As a \\glossterm<condition>, the target takes a -4 penalty to \\glossterm<accuracy> and visual Awareness checks.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Sensation', 'Visual']),
        # +1 level for +2a
        Spell('Dark Shroud', 2, 'Creatures in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            You gain a +2 bonus to \\glossterm<accuracy> with the attack against each target that is not in \\glossterm<bright illumination>.
            \\hit Each target takes a -2 penalty to \\glossterm<accuracy> and visual Awareness checks until the end of the next round.
            \\crit Each target takes a -2 penalty to \\glossterm<accuracy> and visual Awareness checks as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Hidden Blade', 3, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target's weapons become shrouded in darkness, making them virtually impossible to see.
            Its next melee \\glossterm<strike> is treated as if it came from an invisible creature.
            This effect ends at the end of the next round if the target has not made a strike by that time.

            The first attack from an invisible creature generally causes a creature to be \\glossterm<unaware> of the attack, imposing a -5 penalty to Armor and Reflex defenses.
            % TODO: wording
            After a creature has been hit by a strike from an invisible creature in this way, it is generally aware of the danger.
            As a result, it is usually \\glossterm<defenseless> instead of \\glossterm<unaware>, which only imposes a -2 penalty to Armor defense.

            This effect provides no offensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, scaling="""
            % TODO: this doesn't really sense narratively
            \\rank<5> The target also gains a +1 bonus to \\glossterm<accuracy> with the strike.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Sensation', 'Visual']),
        Spell('Conceal', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Stealth skill.
            In addition, you are treated as being \\glossterm<trained> in that skill if you would otherwise be untrained.
        """, scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)', 'Sensation']),
        Spell('Shadowstep', 1, 'Yourself', """
            This spell has no \\glossterm<verbal components>.

            You teleport into an unoccupied destination on a stable surface within \\rngshort range.
            Unlike most teleportation effects, both your departure and arrival with this spell are silent.
            If you are in \\glossterm<bright illumination> and are not touching your shadow, this spell is \\glossterm<miscast>.
        """, scaling="""
            \\rank<3> The teleporation range increases to \\rngmed.
            \\rank<5> The teleporation range increases to \\rnglong.
            \\rank<7> The teleporation range increases to \\rngdist.
        """, tags=[]),
        Spell('Shadowstrike', 4, 'Yourself', """
            This spell functions like the \\spell<shadowstep> spell, except that you can also make a \\glossterm<strike> at your destination.
            You take a -2 penalty to \\glossterm<accuracy> with the strike due to its rushed nature.
        """, scaling="""
            \\rank<6> The teleporation range increases to \\rngmed.
        """, tags=[]),
        Spell('Walk the Shadow Roads', 4, 'Yourself', """
            You can teleport horizontally between shadows instead of moving normally.
            Teleporting a given distance costs movement equal to half that distance.
            If your \\glossterm<line of effect> to your destination is blocked, or if this teleportation would somehow place you inside a solid object, your teleportation is cancelled and you remain where you are that phase.
            Areas with \\glossterm<bright illumination> blocks line of effect for this spell, so you are unable to teleport into or past areas of bright illumination.
            You must be able to move to teleport in this way, so effects like being \\glossterm<immobilized> prevent this movement.
        """, scaling="""
            \\rank<6> You can also teleport vertically or diagonally in addition to horizontally.
        """, tags=['Attune (self)']),
        Spell('Bind Shadow', 1, 'One creature within \\rngmed range standing on the ground', """
            You bind the target's shadow to the ground, slowing its movement.
            If the target is in \\glossterm<bright illumination> and is not touching its shadow, this spell is \\glossterm<miscast>.
            Make an attack vs. Mental against the target.
            \\hit The target takes cold damage equal to 1d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<slowed> as a \\glossterm<condition>.
        """, scaling="damage", tags=[]),
        # +1d damage to compensate for standing on ground limitation
        Spell('Pin Shadow', 4, 'One creature within \\rngmed range standing on the ground', """
            You pin the target's shadow to the ground, preventing it from moving.
            If the target is in \\glossterm<bright illumination> and is not touching its shadow, this spell is \\glossterm<miscast>.
            Make an attack vs. Mental against the target.
            \\hit The target takes 2d8 cold damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        # extra 'forced to move' text to compensate for standing on ground limitation
        Spell('Dancing Shadow', 7, 'One creature within \\rngmed range standing on the ground', """
            You compel the target's shadow to dance, controlling its movement.
            If the target is in \\glossterm<bright illumination> and is not touching its shadow, this spell is \\glossterm<miscast>.
            Make an attack vs. Mental against the target.
            \\hit The target takes cold damage equal to 4d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<disoriented> as a \\glossterm<condition>.
            In addition, it must move a distance equal to its maximum movement speed in a straight line during each \\glossterm<movement phase>.
            It must use its movement mode with the highest speed to move this way.
            It is not required to use the \\textit<sprint> ability, or use any other special movement ability, though it may choose to do so.
            If it is unable to move its full speed without making a skill check or encountering a solid obstacle, it may choose to stop its movement after moving the maximum possible distance without doing so.
            \\glance As above, except that that the target takes half damage.
        """, tags=[]),
        Spell('Shadowform', 4, 'Yourself', """
            You collapse to the ground, taking the appearance and shape of a shadow.
            This has a number of effects, as described below.
            \\begin<itemize>
                \\item You are nearly flat, allowing you to pass under doors and through other narrow passages.
                    Your horizontal dimensions are unchanged, and you cannot enter spaces that are more narrow than you can normally fit through.
                \\item You can freely move through space occupied by other creatures, and other creatures can freely move through your space.
                \\item You gain a \\glossterm<climb speed> equal to your \\glossterm<base speed>, and you can climb without using any hands.
                \\item You are always treated as being \\glossterm<prone>.
                \\item You gain a +4 \\glossterm<magic bonus> to the Stealth skill.
            \\end<itemize>

            While you are in \\glossterm<bright illumination>, this effect is \\glossterm<suppressed>, and you return to your normal size and shape.
            If doing so is impossible, such as if you are in a space too small to contain your body, you gain a \\glossterm<vital wound> and this effect persists for the rest of the round.
            This form offers you no special immunity to damage, as creatures can simply attack the shadow.
        """, scaling="""
            \\rank<6> You can maintain the form in bright illumination for a full round before it is suppressed.
        """, tags=['Attune (self)']),
        Spell('Wall of Darkness', 1, None, """
            You create a wall of darkness in a 15 ft.\\ high, \\areamed line within \\rngmed range.
            If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
            This can allow you to completely block off small tunnels.
            The wall is visible as a solid block of darkness that blocks sight.
            Creatures with the \\glossterm<darkvision> ability can see through the wall normally.
            It does not inhibit the passage of objects or creatures.
        """, scaling="""
            \\rank<3> The area increases to a \\arealarge line.
            \\rank<5> The area increases to a 30 ft.\\ high \\areahuge line.
            \\rank<7> The area increases to a 60 ft.\\ high, \\areagarg line.
        """, tags=['Sensation', 'Sustain (minor)']),
    ],
    rituals=[
        Spell('Sunlight Ward', 3, 'One ritual participant', """
            The target is never considered to be in natural sunlight.
            This does not impair its vision, but protects it if it would otherwise suffer negative consequences for being in natural sunlight.
        """, tags=['Attune (target)'], ritual_time='one hour'),
        Spell('Conceal Trail', 2, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            At the end of each round, the footprints, scent, and other tracks left by each target during that round are magically concealed.
            This increases the \\glossterm<difficulty rating> to follow the trail by 10, but does not prevent creatures from seeing or smelling each target normally in combat.
            At the end of each round, if any target is outside of \\rnglong range from you, the effect is broken for that target and its trail is revealed.
        """, tags=['Attune (ritual)'], ritual_time="one minute"),
        Spell('Greater Conceal Trail', 4, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            This ritual functions like the \\spell<conceal trail> ritual, except that the difficulty rating increase changes to 20.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Supreme Conceal Trail', 6, 'Up to five targets within \\rngmed range from among you and your \\glossterm<allies>', """
            This ritual functions like the \\spell<conceal trail> ritual, except that the difficulty rating increase changes to 30.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
    ],
    category='buff, defense',
)
