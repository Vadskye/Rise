from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# This spell is problematic
# Primary: damage
# None: buff, debuff, utility
channel_divinity = MysticSphere(
    name="Channel Divinity",
    short_description="Invoke divine power to smite foes and gain power",
    cantrips=[
        Effects(
            "Testament",
            "Yourself",
            """
            The magical essence of your deity or alignment is overlayed on your body as an aura.
            This represents your deity if you are a cleric, or your alignment if you are a paladin.
            In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngshort range.
            If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
            This can allow you to identify other followers of your deity or alignment with certainty.

            This spell lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """,
            scaling="""
            \\rank<2> The range increases to \\rngmed.
            \\rank<4> If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
                If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
            \\rank<6> The range increases to \\rnglong.
        """,
            tags=[],
        ),
        Effects(
            "Divine Radiance",
            "Yourself",
            """
            You call on the majesty of your deity or alignment to radiate into the world.
            You create \\glossterm<bright illumination> in a radius of your choice, up to a maximum of 15 feet, and \\glossterm<shadowy illumination> in twice that radius.
            The color of the light depends on the nature of your deity or alignment.
            Each deity has their own color or color combination.
            Typically, good is yellow, evil is purple, law is white, and chaos is a myriad of ever-changing colors.
        """,
            scaling="""
            \\rank<2> The maximum radius of bright illumination increases to 30 feet.
            \\rank<4> The maximum radius of bright illumination increases to 60 feet.
            \\rank<6> The maximum radius of bright illumination increases to 120 feet.
        """,
            tags=["Sustain (minor)"],
        ),
    ],
    lists=["Divine"],
    spells=[
        Spell(
            "Faith Rewarded",
            3,
            "Yourself",
            """
            At the end of the next round, you become infused with divine power.
            You remove one \\glossterm<condition> affecting you and heal one \\glossterm<hit point>.
            This cannot remove a condition applied during that round.
            In addition, you gain a +4 bonus to \\glossterm<accuracy> during the round after you become infused with divine power.
        """,
            scaling="""
            \\rank<5> The accuracy bonus increases to +5.
            \\rank<7> The accuracy bonus increases to +6.
        """,
            tags=[],
        ),
        Spell(
            "Divine Authority",
            1,
            "Yourself",
            """
            You gain a +3 \\glossterm<magic bonus> to the Persuasion skill.
            In addition, you are treated as being \\glossterm<trained> in that skill if you would otherwise be untrained.
        """,
            scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Agent of the Divine",
            5,
            "Yourself",
            """
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> and all \\glossterm<defenses>.
            In addition, you gain a +4 \\glossterm<magic bonus> to \\glossterm<power>.
        """,
            scaling="""
            \\rank<7> The power bonus increases to +8.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Endurance of the Faithful",
            2,
            "Yourself",
            """
            This spell does not have the \\glossterm<Focus> tag.
            You take half damage from \\glossterm<physical damage> this round.
            This halving is applied before \\glossterm<resistances> and similar abilities.
            Because this ability has the \\glossterm<Swift> tag, this improves your resistances against damage you take during the current phase.
        """,
            scaling="""
            \\rank<4> You also take half damage from \\glossterm<energy> damage this round.
            \\rank<6> You also negate any \\glossterm<conditions> that you would gain this round.
        """,
            tags=["Swift"],
            focus=False,
        ),
        Spell(
            "Divine Judgment",
            1,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target takes energy damage equal to 1d10 plus your \\glossterm<power>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Stunning Judgment",
            1,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is takes 1d6 energy damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<stunned> as a \\glossterm<condition>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Glimpse of Divinity",
            2,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<dazzled> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<dazzled> and \\glossterm<dazed> as a single \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Fear of the Divine",
            5,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\frightened by you as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Judge Unworthy",
            2,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental with a +3 bonus against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Mental defense.
            \\crit As above, except that the penalty increases to -5.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Word of Faith",
            1,
            "\\glossterm<Enemies> in a \\areatiny radius from you",
            """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy damage equal to 1d8 plus half your \\glossterm<power>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Proclamation of Faith",
            3,
            "\\glossterm<Enemies> in a \\areamed radius from you",
            """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Mantle of Faith",
            2,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +2 \\glossterm<magic bonus> to your \\glossterm<resistances> to both \\glossterm<physical damage> and \\glossterm<energy damage>.
        """,
            scaling="""
            \\rank<4> The bonus increases to +4.
            \\rank<6> The bonus increases to +8.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Might",
            4,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You increase your size by one \\glossterm<size category>.
            This increases your \\glossterm<base speed> and reduces your \\glossterm<Stealth> skill.
            It may also increase your \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, your physical form is not altered fully to match its new size, and your Strength and Dexterity are unchanged.
        """,
            scaling="""
            \\rank<6> You can increase your size by two size categories instead of one.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Presence",
            3,
            "\\glossterm<Enemies> in the area (see text)",
            """
            You radiate an aura in a \\areasmall radius \\glossterm<emanation> from you that invokes a fear of your divine connection.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            After you attack a creature this way, it becomes immune to this ability from you until it takes a \\glossterm<short rest>.
            \\hit Each target is \\glossterm<shaken> by you until the end of the next round.
            \\crit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=["Attune (self)", "Emotion"],
        ),
        Spell(
            "Divine Eminence",
            6,
            "\\glossterm<Enemies> in the area (see text)",
            """
            This spell functions like the \\textit<divine presence> spell, except that the area increases to a \\arealarge radius \\glossterm<emanation> from you.
        """,
            tags=["Attune (self)", "Emotion"],
        ),
        Spell(
            "Faithful Endurance",
            3,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls> (see \\pcref<Vital Rolls>).
        """,
            scaling="""
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Conduit",
            2,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You reduce your \\glossterm<focus penalty> with divine spells by 2.
        """,
            scaling="""
            \\rank<4> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with divine spells.
            \\rank<6> You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with divine spells.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Favor",
            1,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.
        """,
            scaling="""
            \\rank<3> You also gain a +2 \\glossterm<magic bonus> to Mental defense.
            \\rank<5> The bonus to \\glossterm<accuracy> increases to +2.
            \\rank<7> The bonus to \\glossterm<accuracy> increases to +3.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Power",
            2,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power>.
        """,
            scaling="""
            \\rank<4> The bonus increases to +4.
            \\rank<6> The bonus increases to +8.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Divine Offering",
            6,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            When you cast this spell, you gain a \\glossterm<vital wound> that has no vital wound effect.
            In exchange, you gain a +4 \\glossterm<magic bonus> to \\glossterm<vital rolls> and become immune to \\glossterm<conditions>.
        """,
            tags=["Sustain (free)"],
        ),
        Spell(
            "Divine Seal",
            3,
            "Creatures in a \\areasmall radius \\glossterm<zone> within \\rngmed range",
            """
            You seal an area with divine power, limiting its connection to divine powers.
            Whenever a creature casts a divine spell in the area, if that creature does not share your deity (for clerics) or devoted alignment (for paladins), it has a 50\\% chance to \\glossterm<miscast> the spell.
        """,
            scaling="""
            \\rank<5> The area increases to a \\areamed radius.
            \\rank<7> The area increases to a \\arealarge radius.
        """,
            tags=["Sustain (minor)"],
        ),
        Spell(
            "Banish Anathema",
            3,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target takes energy damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that that the target takes double damage.
            In addition, if it is a \\glossterm<planeforged> not on its home plane, it is teleported to a random location on its home plane.
            If it is a creature created by a \\glossterm<Manifestation> ability, it immediately disappears.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Astral Refuge",
            2,
            "Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You send the target into a random safe location in the Astral Plane, causing it to temporarily disappear.
            When you cast this spell, you choose how many rounds the target spends in the Astral Plane, up to a maximum of five rounds.
            At the end of the last round, it reappears in the same location where it disappeared, or in the closest unoccupied space if that location is occupied.
        """,
            scaling="""
            \\rank<4> The maximum size of the target increases to Large.
            \\rank<6> The maximum size of the target increases to Huge.
        """,
            tags=[],
        ),
    ],
    rituals=[
        Spell(
            "Consecrate",
            3,
            None,
            """
            The area within an \\areamed radius \\glossterm<zone> from your location becomes sacred to your deity.
            % TODO: what cares about consecration?
            This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.
        """,
            tags=["Attune (self)"],
            ritual_time="24 hours",
        ),
        Spell(
            "Divine Transit",
            5,
            "Up to five Medium or smaller ritual participants",
            """
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?
        """,
            tags=[],
            ritual_time="24 hours",
        ),
        Spell(
            "Commune",
            5,
            None,
            """
            You ask your source of divine power a single yes or no question.
            You receive a correct answer to that question to the limit of that source's knowledge, which is usually quite extensive.
            The answer is typically given as "yes" or "no", but it may answer "unclear" if the source does not know the answer.
            In cases where a one-word answer would be misleading or contrary to the source's interests, a short phrase may be given as an answer instead.

            This ritual only yields accurate results once for any given situation.
            If you perform the ritual again in a situation that has not meaningfully changed, you receive no answer regardless of your question.
            For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
        """,
            tags=[],
            ritual_time="24 hours",
        ),
    ],
    category="damage",
)
