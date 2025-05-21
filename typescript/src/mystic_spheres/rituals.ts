import { Ritual } from '.';

const resurrectionSphereEffects = {
  Chronomancy: 'The target must have died no more than 48 hours before this ritual is completed.',
};
const teleportSphereEffects = {
  ['Aeromancy']: 'Both your destination and current location must be outdoors.',
  ['Channel Divinity']:
    'Either your destination or current location must be a temple or equivalent holy site to your source of divine power.',
  ['Electromancy']: 'Both your destination and current location must be outdoors.',
  Verdamancy:
    'As part of the ritual, each target must touch a living plant at least one size category larger than themselves. The destination must have a plant at least one size category larger than the largest target. Each target emerges that plant after teleporting.',
};

// TODO: add a ritual that can remove domination, or rewrite existing rituals to work on
// domination. The trick is that it's an attunement by another creature who is not
// present, and we generally don't want to remove attunements.
// TODO: should the "soul" spells move outside of vivimancy? They don't fit neatly into druid
// narrative tropes, and they undercut the idea that this is the "life" sphere.
export const rituals: Ritual[] = [
  {
    name: 'Fortification',

    castingTime: 'one hour',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
      Unlike most abilities, this ritual can affect individual parts of a whole object.

      % How should this affect Strength break difficulty value?
      The target gains a +10 \\glossterm{enhancement bonus} to its maximum \\glossterm{damage resistance}.
      If the target is moved, this effect ends.
      Otherwise, it lasts for one year.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
    type: 'Attune',
  },

  {
    name: 'Enduring Fortification',

    castingTime: '24 hours',
    functionsLike: {
      exceptThat: `
        the effect lasts for one hundred years.
      `,
      name: 'blessing of fortification',
    },
    rank: 3,
    roles: ['narrative'],
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
  },

  {
    name: 'Enduring Immutability',

    castingTime: '24 hours',
    functionsLike: {
      exceptThat: `
        the effect lasts for one hundred years.
      `,
      name: 'immutability',
    },
    rank: 6,
    roles: ['narrative'],
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
  },

  {
    name: 'Immutability',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the bonus to \\glossterm{damage resistance} increases to +20.
      `,
      name: 'fortification',
    },
    rank: 4,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
  },

  {
    name: 'Bless Water',

    castingTime: 'one minute',
    effect: `
      One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes holy water.
      Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead or an evil planeforged.
      `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer'],
    type: 'Attune',
  },

  {
    name: 'Persistent Bless Water',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the effect lasts for one year.
      `,
      name: 'bless water',
    },
    rank: 3,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer'],
  },

  {
    name: 'Curse Water',

    castingTime: 'one minute',
    effect: `
      One pint of \\glossterm{unattended}, nonmagical water within \\shortrange becomes unholy water.
      Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good planeforged.
      `,
    rank: 1,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Channel Divinity', 'Prayer'],
  },

  {
    name: 'Permanent Curse Water',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        it loses the \\abilitytag{Attune} tag and the effect lasts permanently.
      `,
      name: 'curse water',
    },
    rank: 3,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer'],
  },

  {
    name: 'Consecrated Ground',

    castingTime: 'one hour',
    effect: `
      The area within an \\largearea radius \\glossterm{zone} from your location becomes sacred to your deity.
      % TODO: what cares about consecration?
      This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer'],
    type: 'Attune',
  },
  {
    name: 'Permanent Consecrated Ground',

    castingTime: '24 hours',
    functionsLike: {
      exceptThat: `
        the effect is permanent.
      `,
      name: 'consecrated ground',
    },
    rank: 4,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer'],
  },
  {
    name: 'Commune with Divinity',

    castingTime: '24 hours',
    effect: `
      You ask your source of divine power a single yes or no question.
      You receive a correct answer to that question to the limit of that source's knowledge, which is usually quite extensive.
      The answer is typically given as "yes" or "no", but it may answer "unclear" if the source does not know the answer.
      In cases where a one-word answer would be misleading or contrary to the source's interests, a short phrase may be given as an answer instead.

      This ritual only yields accurate results once for any given situation.
      If you perform the ritual again in a situation that has not meaningfully changed, you receive no answer regardless of your question.
      For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
    `,
    rank: 4,
    roles: ['narrative'],
    spheres: ['Channel Divinity', 'Prayer', 'Revelation'],
  },
  {
    name: 'Extended Commune with Divinity',

    functionsLike: {
      exceptThat: `
        you can ask any question, not just a yes or no question.
        The entity can respond for up to five minutes to fully explain itself if necessary, though most answers will be shorter.
      `,
      name: 'commune',
    },
    rank: 7,
    roles: ['narrative'],
    tags: [],
    castingTime: '24 hours',
    spheres: ['Channel Divinity', 'Prayer', 'Revelation'],
  },
  {
    name: 'Commune with the Dead',

    castingTime: '24 hours',
    effect: `
      You ask the soul of a dead creature a single yes or no question.
      To contact a creature in this way, you must know its name and have something that belonged to it in life.
      The object must have some importance to the creature, not just a gold piece that it owned for a time.
      This could be one of its possesions or a body part from its corpse.

      You receive a correct answer to that question to the limit of that creature's knowledge.
      The answer is typically given as "yes" or "no", but it may answer "unclear" if the source does not know the answer.
      In cases where a one-word answer would be misleading or contrary to the creature's interests, a short phrase may be given as an answer instead.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Astromancy', 'Prayer', 'Revelation', 'Vivimancy'],
  },
  {
    name: 'Extended Commune with the Dead',

    functionsLike: {
      exceptThat: `
        you can ask any question, not just a yes or no question.
        The creature can respond for up to five minutes to fully explain itself if necessary, though most answers will be shorter.
      `,
      name: 'commune',
    },
    rank: 6,
    roles: ['narrative'],
    tags: [],
    castingTime: '24 hours',
    spheres: ['Astromancy', 'Prayer', 'Revelation', 'Vivimancy'],
  },
  {
    name: 'Limited Air Supply',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains a temporary supply of air that it can use to breathe.
      It can activate the air supply as a \\glossterm{free action}.
      When it does, it gains the ability to breathe clear, clean air regardless of its surroundings for one minute.
      This can allow it to breathe underwater and avoid inhalation-based poisons.
    `,
    sphereEffects: {
      Aquamancy: 'The target can only gain air in this way while it is underwater.',
    },
    // narrative: '',
    rank: 1,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aeromancy', 'Aquamancy', 'Polymorph'],
  },
  {
    name: 'Air Supply',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains the ability to breathe clear, clean air regardless of its surroundings.
      This can allow it to breathe underwater and avoid inhalation-based poisons.
    `,
    sphereEffects: {
      Aquamancy: 'The target can only gain air in this way while it is underwater.',
    },
    // narrative: '',
    rank: 3,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aeromancy', 'Aquamancy', 'Polymorph'],
  },
  {
    name: 'Gentle Descent',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains an average \\glossterm{glide speed}.
    `,
    // narrative: '',
    rank: 3,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aeromancy', 'Polymorph', 'Telekinesis'],
  },
  {
    name: 'Overland Flight',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains an average \\glossterm{fly speed} with a 15 foot \\glossterm{height limit} (see \\pcref{Flight}).
      If it attacks or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this effect ends.
    `,
    // narrative: '',
    rank: 4,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aeromancy', 'Polymorph', 'Telekinesis'],
  },
  {
    name: 'Rapid Overland Flight',

    castingTime: 'one hour',
    effect: `
      Choose up to six ritual participants.
      Each target gains a fast \\glossterm{fly speed} with a 15 foot \\glossterm{height limit} (see \\pcref{Flight}).
      If it attacks or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this effect ends.
    `,
    // narrative: '',
    rank: 6,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aeromancy', 'Polymorph', 'Telekinesis'],
  },
  {
    name: 'Manipulate Water',

    castingTime: 'one minute',
    effect: `
      You change the speed of water within a \\largearea radius \\glossterm{emanation} from you by up to 5 miles per hour.
      If you decrease the water's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
      You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.

      In addition to allowing you to change the direction of currents within large bodies of water, you can also use this to propel water across surfaces.
      Generally, moving water uphill costs at least 5 miles per hour of speed for every foot of elevation that you are trying to climb, which can limit your ability to move water up large distances.
    `,
    rank: 2,
    roles: ['narrative'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Aquamancy'],
  },
  {
    name: 'Greater Manipulate Water',

    castingTime: 'one minute',
    functionsLike: {
      name: 'manipulate water',
      exceptThat: 'the maximum speed change increases to 20 miles per hour.',
    },
    rank: 6,
    roles: ['narrative'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Aquamancy'],
  },
  {
    name: 'Rainstorm',

    castingTime: 'one minute',
    effect: `
      Torrential rain begins falling out of thin air within a \\glossterm{zone} within \\longrange.
      You choose the radius of the zone, up to a maximum of a \\largearea radius.
      The rain extinguishes minor fires such as campfires and torches on contact.
      Everything in the area is \\trait{impervious} to \\atFire attacks.
    `,
    rank: 1,
    roles: ['narrative'],
    tags: ['Manifestation'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Aquamancy'],
  },
  {
    name: 'Purify Water',

    castingTime: 'one minute',
    effect: `
      You can separate out dirt, sand, salt, poison, and similar minor pollutants from up to one thousand gallons of water within \\shortrange.
      That roughly corresponds to a single 5-ft\. square of water.
      The waste material moves to the edge of the water so it falls out or can be easily removed.
      It remains separated until this ritual's effect ends.
      This does not remove magical effects or contaminants heavier than half a pound.
      Using this to gradually purify a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single use of this ritual.
    `,
    // narrative: '',
    type: 'Sustain (attuneable, minor)',
    rank: 2,
    roles: ['narrative'],
    spheres: ['Aquamancy', 'Prayer', 'Toxicology'],
  },
  {
    name: 'Massive Purify Water',

    functionsLike: {
      exceptThat: 'the affected volume increases to a 5-foot cube, or a little over 900 gallons.',
      name: 'purify water',
    },
    rank: 4,
    roles: ['narrative'],
    tags: [],
    castingTime: 'one minute',
    spheres: ['Aquamancy', 'Prayer', 'Toxicology'],
  },
  {
    name: 'Sense Water',

    castingTime: 'one minute',
    effect: `
        You learn the general pattern of where water exists within a one mile radius from your location.
        The detail of your mental picture is limited to roughly knowing whether water does or does not exist in each hundred-foot square in the area.
        Since this is a \\abilitytag{Detection} ability, it can penetrate some solid objects (see \\pcref{Detection}).
        This ritual can sense water as small as a gallon, but no smaller.
    `,
    rank: 2,
    roles: ['narrative'],
    tags: ['Detection'],
    spheres: ['Aquamancy', 'Revelation'],
  },
  {
    name: 'Distant Sense Water',

    functionsLike: {
      exceptThat: `
        the range increases to a ten mile radius from your location.
      `,
      name: 'sense water',
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Detection'],
    castingTime: 'one hour',
    spheres: ['Aquamancy', 'Revelation'],
  },
  {
    name: 'Swimmers',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains a slow \\glossterm{swim speed}.
      If it already has a slow swim speed, it gains an average swim speed instead.
    `,
    // narrative: '',
    rank: 2,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aquamancy', 'Polymorph'],
  },
  {
    name: 'Interplanar Gate',
    rank: 7,
    roles: ['narrative'],
    effect: `
      Choose a plane that connects to your current plane, and a location within that plane.
      This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
      The gate takes the form of a 15-foot radius circular disk, oriented in a direction you choose (typically vertical).
      It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through it is shunted instantly to the other location.
      The gate cannot be \\glossterm{sustained} for more than 5 rounds, and is automatically dismissed at the end of that time.

      You must specify the gate's destination with a precise mental image of its appearance.
      The image does not have to be perfect, but it must unambiguously identify the location.
      Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

      % TODO: Is this planar cosmology correct?
      The Astral Plane connects to every plane, but transit from other planes is usually more limited.
      From the Material Plane, you can only reach the Astral Plane.
    `,
    type: 'Sustain (standard)',
    castingTime: 'one week',
    spheres: ['Astromancy', 'Channel Divinity', 'Summoning'],
  },
  {
    name: 'Plane Shift',
    rank: 4,
    roles: ['narrative'],
    effect: `
      Choose a \\glossterm{planar rift} within \\medrange and up to six Medium or smaller ritual participants.
      Each creature \\glossterm{teleports} to the unoccupied spaces closest to the other side of the planar rift.
      This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.
      For details about planar rifts, see \\pcref{Planar Rifts}.

      % TODO: Is this planar cosmology correct?
      The Astral Plane connects to every plane, but transit from other planes is usually more limited.
      From the Material Plane, you can only reach the Astral Plane.
    `,
    tags: [],
    castingTime: 'one hour',
    spheres: ['Astromancy', 'Channel Divinity', 'Summoning'],
  },
  {
    name: 'Astral Projection',

    effect: `
      Choose up to six Medium or smaller ritual participants.
      The group of creatures \\glossterm{teleports} to a random location within the Inner Astral Plane (see \\pcref{The Astral Plane}).
      This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.

      In addition, a localized \\glossterm{planar rift} appears at the destination area on the Astral Plane.
      The rift leads back to the location where this ritual was performed.
      The targets of this ritual can traverse the rift simply by walking through it, while other creatures can only navigate it with the help of effects like the \\ritual{plane shift} ritual.
      It lasts for one week before disappearing permanently, potentially stranding the targets in the Astral Plane if they have not yet returned.
    `,
    rank: 5,
    roles: ['narrative'],
    tags: [],
    castingTime: '24 hours',
    spheres: ['Astromancy', 'Channel Divinity', 'Summoning'],
  },
  {
    name: 'Homeward Shift',

    effect: `
      This ritual can only be performed on the Astral Plane.

      Choose up to six Medium or smaller ritual participants.
      Each target \\glossterm{teleports} to the last spaces they occupied on their home planes.
      This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.
    `,
    rank: 4,
    roles: ['narrative'],
    tags: [],
    castingTime: 'one hour',
    spheres: ['Astromancy', 'Channel Divinity', 'Summoning'],
  },
  // {
  //   name: 'Overland Teleportation',
  //   rank: 3,
  //   effect: `
  //     Choose any number of Medium or smaller ritual participants.
  //     Each target can \\glossterm{teleport} up to 60 feet as a \\glossterm{movement}.
  //     If it attacks or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this effect ends.
  //   `,
  //   tags: [],
  //   castingTime: 'one hour',
  //   type: 'Attune (target)',
  //   spheres: ['astromancy'],
  // },
  // {
  //   name: 'Distant Overland Teleportation',

  //   functionsLike: {
  //     exceptThat: `
  //       the range increases to 120 feet.
  //     `,
  //     name: 'overland teleportation',
  //   },
  //   rank: 5,
  //   tags: [],
  //   castingTime: 'one minute',
  //   spheres: ['astromancy'],
  // },
  {
    name: 'Forge Astral Beacon',
    rank: 3,
    roles: ['narrative'],
    effect: `
      You draw a magic circle in a \\smallarea radius during this ritual.
      The circle creates an \\glossterm{astral beacon}, making it easier for creatures to teleport into the circle.
      When you create the beacon, you must give it a unique name that matches its construction and the patterns you chose for the circle.
      A creature who knows the name of an beacon can use rituals like \\ritual{guided teleportation} to teleport to it.

      The beacon persists for one year.
      You can use this ritual to renew the duration of an existing beacon instead of creating a new beacon.
    `,
    tags: [],
    materialCost: true,
    castingTime: '24 hours',
    spheres: [
      'Astromancy',
      'Channel Divinity',
      'Fabrication',
      'Prayer',
      'Summoning',
      'Thaumaturgy',
    ],
  },
  {
    name: 'Guided Translocation',
    rank: 3,
    roles: ['narrative'],
    effect: `
      Choose an \\glossterm{astral beacon} up to 200 miles away from you on your current plane, and up to six Medium or smaller ritual participants.
      Each target is teleported to the area defined by the beacon.
      This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.

      If the astral beacon does not have enough open space to contain your group, the ritual has no immediate effect.
      You can continue the ritual for any length of time.
      At the end of each round during this continuation, if the anchor has room for your group, the teleportation succeeds and the ritual ends.
    `,
    sphereEffects: teleportSphereEffects,
    tags: [],
    castingTime: 'one hour',
    spheres: [
      'Aeromancy',
      'Astromancy',
      'Channel Divinity',
      'Electromancy',
      'Summoning',
      'Verdamancy',
    ],
  },
  {
    name: 'Distant Translocation',
    rank: 4,
    roles: ['narrative'],
    effect: `
      Choose a destination up to 200 miles away from you on your current plane, and up to six Medium or smaller ritual participants.
      Each target is teleported to the chosen destination.
      This does not require \\glossterm{line of sight} or \\glossterm{line of effect} to the destination.

      You can specify the destination by naming an \\glossterm{astral beacon}.
      If you do, this ritual's fatigue cost is reduced to one fatigue per target.
      Alternately, you can specify the destination with a precise mental image of its appearance.
      The image does not have to be perfect, but it must unambiguously identify the destination.
      If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
      The new destination will be one that more closely resembles your mental image.
      If no such area exists, the ritual simply fails.
    `,
    sphereEffects: teleportSphereEffects,
    tags: [],
    castingTime: '24 hours',
    spheres: [
      'Aeromancy',
      'Astromancy',
      'Channel Divinity',
      'Electromancy',
      'Summoning',
      'Verdamancy',
    ],
  },

  {
    name: 'Efficient Distant Translocation',

    functionsLike: {
      exceptThat: `
        the casting time is shorter, and the ritual is much less exhausting.
        If the destination is an \\glossterm{astral beacon}, this ritual has no fatigue cost.
      `,
      name: 'intraplanar teleportation',
    },
    sphereEffects: teleportSphereEffects,
    rank: 7,
    roles: ['narrative'],
    tags: [],
    castingTime: 'one hour',
    spheres: [
      'Aeromancy',
      'Astromancy',
      'Channel Divinity',
      'Electromancy',
      'Summoning',
      'Verdamancy',
    ],
  },
  {
    name: 'Retrieve Legacy',

    castingTime: '24 hours',
    effect: `
      Choose one ritual participant.
      If its \\glossterm{legacy item} is on the same plane and \\glossterm{unattended}, the item is teleported into the creature's hand.
    `,
    // narrative: '',
    rank: 2,
    roles: ['narrative'],
    spheres: ['Astromancy', 'Summoning'],
  },
  {
    name: 'Astral Chest',

    castingTime: 'one hour',
    effect: `
      When you cast this spell, you choose whether to send an object to the Astral Plane or retrieve the object you stored there.
      If you send an object to the Astral Plane, choose a a Medium or smaller \\glossterm{unattended} object within \\medrange of you.
      That object \\glossterm{teleports} to a random location in the Astral Plane.

      If you retrieve an object, choose an unoccupied space on stable ground within \\medrange of you.
      The object you previously stored in the Astral Plane with this ritual appears at that location.
      The object normally returns exactly as it was sent away, since the Astral Plane is vast and mostly uninhabited.
      There is a 1\\% chance per year that the object spends in the Astral Plane that it has been lost irretrievably.
    `,
    // narrative: '',
    rank: 3,
    roles: ['narrative'],
    spheres: ['Astromancy', 'Summoning'],
  },
  {
    name: 'Accelerated Reading',

    castingTime: 'one minute',
    effect: `
      You can read at twice your normal speed.
      However, the mental effort imposes a -2 penalty to your Mental defense.
    `,
    rank: 1,
    roles: ['narrative'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Chronomancy', 'Revelation'],
  },
  {
    name: 'Greater Accelerated Reading',

    castingTime: 'one minute',
    effect: `
      You can read at ten times your normal speed.
      However, the mental effort imposes a -4 penalty to your Mental defense.
    `,
    rank: 5,
    roles: ['narrative'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Chronomancy', 'Revelation'],
  },
  {
    name: 'Gentle Repose',

    castingTime: 'one minute',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical object within \\shortrange.
      It does not decay or spoil with the passage of time.
      This can extend the time a poison or similar item lasts before becoming inert.
      The target can still be attacked and damaged normally.

      % What effects have an explicit time limit?
      If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
      Additionally, this can make transporting a fallen comrade more pleasant.

      % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?
    `,
    rank: 1,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Chronomancy', 'Cryomancy', 'Toxicology', 'Vivimancy'],
  },
  {
    name: 'Persistent Gentle Repose',

    castingTime: 'one minute',
    functionsLike: {
      name: 'gentle repose',
      exceptThat: 'the effect lasts for one year.',
    },
    rank: 3,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Cryomancy', 'Toxicology', 'Vivimancy'],
  },
  {
    name: 'Observe the Future',

    castingTime: 'one hour',
    effect: `
      You receive a limited insight into your immediate future.
      When you perform this ritual, you specify a course of action that you could hypothetically take during the next hour.
      At the end of the ritual, a version of yourself from an hour into the future appears.
      That person is a version of yourself who took your described course of action.
      You can visibly observe any changes in their appearance, and they can briefly gesture to indicate whether they recommend following that action, but no words can be exchanged.

      If no version of yourself appears, it is likely that you would not survive taking your proposed course of action.
      The future is variable and chaotic, so making the same decisions does not guarantee the same results as your future self, but it should be likely to have a similar outcome.
    `,
    rank: 2,
    roles: ['narrative'],
    materialCost: true,
    spheres: ['Chronomancy'],
  },
  {
    name: 'Interrogate the Future',

    castingTime: 'one hour',
    functionsLike: {
      name: 'observe the future',
      exceptThat: 'the duplicate can answer up to three yes or no questions before disappearing.',
    },
    rank: 5,
    roles: ['narrative'],
    materialCost: true,
    spheres: ['Chronomancy'],
  },
  {
    name: 'Stasis Chamber',

    castingTime: 'one hour',
    effect: `
      Choose one Medium or smaller container.
      Any inanimate, \\glossterm{unattended} object placed into the container enters a state of temporal stasis at the end of the round.
      While in stasis, an object cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
      If the container is destroyed, this effect ends.
    `,
    rank: 3,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Chronomancy'],
  },
  {
    name: 'Persistent Stasis Chamber',

    castingTime: '24 hours',
    functionsLike: {
      name: 'stasis chamber',
      exceptThat: 'the effect lasts for one year.',
    },
    rank: 5,
    roles: ['narrative'],
    spheres: ['Chronomancy'],
  },
  {
    name: 'Overland Haste',
    rank: 3,
    roles: ['attune'],
    // Worse than Overland Teleportation in rough terrain, but can be comparable on
    // smooth ground depending on party composition and size.
    effect: `
      Choose up to six ritual participants.
      Each target gains a +30 foot \\glossterm{enhancement bonus} to its \\glossterm{movement speed}.
      If it attacks or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this effect ends.
    `,
    tags: [],
    castingTime: 'one minute',
    type: 'Attune (target)',
    spheres: ['Chronomancy', 'Electromancy', 'Polymorph'],
  },
  {
    name: 'Rapid Overland Haste',
    rank: 5,
    roles: ['attune'],
    functionsLike: {
      exceptThat: `
        the bonus increases to +60 feet.
      `,
      name: 'overland haste',
    },
    tags: [],
    castingTime: 'one hour',
    type: 'Attune (target)',
    spheres: ['Chronomancy', 'Electromancy', 'Polymorph'],
  },
  {
    name: 'Repair',

    castingTime: '24 hours',
    effect: `
      Choose one Large or smaller \\glossterm{broken} object within \\shortrange.
      The object is repaired as if it had never been broken.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Fabrication', 'Polymorph'],
  },
  {
    name: 'Repair Destruction',

    castingTime: '24 hours',
    effect: `
      Choose one Large or smaller \\glossterm{destroyed} object within \\shortrange.
      The object is repaired as if it had never been destroyed.
    `,
    rank: 4,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Fabrication', 'Polymorph'],
  },
  {
    name: 'Greater Rewind Death',

    castingTime: '24 hours',
    effect: `
      Choose one Diminutive or larger piece of a corpse.
      It must have been part of the original creature's body at the time of death.
      The creature the corpse belongs to is \\glossterm{resurrected}.
      The corpse is completely restored to a healthy state, so it does not need to be fully intact.
      It must have died no more than 48 hours before this ritual is completed.
    `,
    materialCost: true,
    rank: 6,
    roles: ['narrative'],
    spheres: ['Chronomancy'],
  },
  {
    name: 'Cold Tolerance',

    castingTime: 'one minute',
    effect: `
      Choose either yourself or an \\glossterm{ally} or unattended object within \\medrange.
      The target suffers no harm from being in a cold environment.
      It can exist comfortably in conditions as low as -50 degrees Fahrenheit.
      Its equipment, if any, is also protected.
      This does not protect the target from \\atCold attacks.
    `,
    rank: 1,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Polymorph', 'Pyromancy'],
  },
  {
    name: 'Cold Snap',

    castingTime: 'one hour',
    effect: `
      The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location decreases rapidly.
      Over the next minute after you finish this ritual, the temperature decreases by 40 degrees Fahrenheit, to a minimum of \\minus30 degrees.
      Unlike normal, this effect does not require \\glossterm{line of effect} to you.
      Instead, it affects all outdoor locations within the area.
      Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
    `,
    rank: 4,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Cryomancy'],
  },

  {
    name: 'Intense Cold Snap',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the temperature in the area decreases by 60 degrees, to a minimum of \\minus70 degrees.
      `,
      name: 'cold snap',
    },
    rank: 7,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Cryomancy'],
  },
  {
    name: 'Cleansing Meditation',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      You can designate unconscious creatures as ritual participants for this ritual.
      Once the ritual finishes, each target enters a deep meditative state for ten minutes.
      At the end of that time, it removes all \\atEmotion and \\atCompulsion effects affecting it, including curses.
      It also gains the normal benefits of a \\glossterm{short rest}.
    `,
    rank: 2,
    roles: ['healing'],
    tags: ['Compulsion'],
    spheres: ['Enchantment', 'Prayer', 'Thaumaturgy'],
  },

  {
    name: 'Animal Messenger',

    castingTime: 'one minute',
    attack: {
      hit: `
        The target is compelled to deliver a message for you.
      You can give the animal a small piece of parchment or similarly sized item containing up to 25 words.
      In addition, choose a destination that you can clearly visualize.
      You must have a general idea of the direction and distance to that location from your current location.
      You must also visualize what a valid recipient for the message looks like.
      You can leave this description vague, such as "any humanoid creature", or be more specific, like "a hawk-nosed human wearing a red cloak".

      The animal will attempt to travel to that destination to the best of its ability, following the directions you have given it.
      It will not willingly part with its message until it reaches its destination.
      Once it reaches its destination, it will wait until it observes a valid recipient, leaving the destination only briefly as necessary to sustain itself.
      When the animal has delivered its message, this effect ends, allowing you to know that the message has been delivered.
      `,
      targeting: `
        Make an attack vs. Mental against one Small or Tiny animal within \\medrange.
        You take a -10 penalty to \\glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
      `,
    },
    rank: 2,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Enchantment'],
  },

  {
    name: 'Antipathy',

    // original targets: ['One Large or smaller object within \\medrange', 'Creatures near the target (see text)']
    castingTime: '24 hours',
    attack: {
      crit: `The creature is \\panicked instead of frightened.`,
      hit: `The creature is \\frightened by the chosen object until it finishes a \\glossterm{short rest}.`,
      targeting: `
      Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
      In addition, choose one Large or smaller object within \\medrange.
      If the target is moved, this effect ends.

      Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the chosen object, make a \\glossterm{reactive attack} vs. Mental against it.
      Your accuracy with this attack is equal to half the sum of your level and Perception.
      This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
      After you make this attack against a particular creature, you do not make this attack against it again until it finishes a \\glossterm{short rest}.
      `,
    },

    rank: 4,
    roles: ['hazard'],
    tags: ['Emotion'],
    type: 'Attune',
    spheres: ['Enchantment'],
  },

  {
    name: 'Sympathy',

    castingTime: '24 hours',
    attack: {
      crit: `The creature is also compelled to get as close as possible to the chosen object to admire it in greater detail.`,
      hit: `The creature is fascinated by the chosen object until it finishes a \\glossterm{short rest}.
      It can take no actions other than staring at the object.
      It is \\unaware of any attacks against it, and anything else going on its environment.
      Any act by you or by creatures that appear to be your allies that threatens or harms the creature breaks the effect.
      Harming the creature is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
      `,
      targeting: `
      Choose a creature type: aberration, animal, animate, dragon, humanoid, magical beast, monstrous humanoid, planeforged, or undead.
      In addition, choose one Large or smaller object within \\medrange.
      If the target is moved, this effect ends.

      Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the target, make a \\glossterm{reactive attack} vs. Mental against it.
      Your accuracy with this attack is equal to half the sum of your level and Perception.
      This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
      After you make this attack against a particular creature, you do not make this attack against it again until it finishes a \\glossterm{short rest}.
      `,
    },
    rank: 4,
    roles: ['hazard'],
    tags: ['Emotion'],
    type: 'Attune',
    spheres: ['Enchantment'],
  },
  {
    name: 'Manifest Equipment',

    castingTime: 'one hour',
    effect: `
      Choose one \\glossterm{ritual participant}.
      You can create any one weapon, shield, or body armor that you are proficient with.
      It is sized appropriately for the target, up to a maximum of a Medium size item.
      You can choose whether the item appears in the target's hand, on their body fully donned, or on the ground at their feet.
      It disappears when this ritual's effect ends.
    `,
    sphereEffects: {
      Cryomancy: 'The ritual requires a body of water at least as large as the created item.',
      Terramancy:
        'The ritual requires a body of earth or stone at least as large as the created item.',
    },
    scaling: {
      special: `
        You can perform this ritual at a higher rank to craft with special materials.
        If you create body armor or a weapon, it can be created from any special material other than cold iron, dragonscale, and dragonfang (see \\pcref{Armor Special Materials}, and \\pcref{Weapon Special Materials}).
        The item's rank cannot exceed this ritual's rank.
      `,
    },
    rank: 1,
    roles: ['attune'],
    tags: ['Manifestation'],
    type: 'Attune (target)',
    spheres: ['Cryomancy', 'Fabrication', 'Terramancy'],
  },
  {
    name: 'Manifest Object',

    castingTime: 'one hour',
    effect: `
      Make a Craft check to create an object of Small size or smaller.
      The object appears out of thin air in your hand or in one unoccupied square on solid ground within \\shortrange.
      % TODO: add ability to create objects of other sizes/materials
      It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
    `,
    rank: 3,
    roles: ['attune'],
    tags: ['Manifestation'],
    type: 'Attune',
    spheres: ['Fabrication'],
  },

  {
    name: 'Fabricate Water',

    castingTime: 'one minute',
    effect: `
      You create up to two gallons of wholesome, drinkable water at any number of locations within \\shortrange, allowing you to fill multiple small water containers.
      You must create a minimum of one ounce of water in each location.
    `,
    rank: 1,
    roles: ['narrative'],
    tags: ['Creation', 'Water'],
    spheres: ['Aquamancy', 'Fabrication'],
  },

  {
    name: 'Fabricate Sustenance',

    castingTime: 'one hour',
    effect: `
      This ritual creates food in one unoccupied square within \\shortrange that is sufficient to sustain five Medium creatures for 24 hours.
      It also creates basic receptacles to hold the food.
      The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
    `,
    rank: 2,
    roles: ['narrative'],
    tags: ['Creation'],
    spheres: ['Fabrication', 'Verdamancy'],
  },

  {
    name: 'Fabricate Feast',

    castingTime: 'one hour',
    effect: `
      This ritual creates food in any number of unoccupied squares within \\shortrange that is sufficient to sustain one hundred Medium creatures for 24 hours.
      It also creates basic receptacles to hold the food.
      The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
    `,
    rank: 4,
    roles: ['narrative'],
    tags: ['Creation'],
    spheres: ['Fabrication', 'Verdamancy'],
  },

  {
    name: 'Copy Writing',

    castingTime: 'special',
    effect: `
      You copy the writing from one Small or smaller written work within \\shortrange to a Small or smaller set of blank pages within \\shortrange.
      The blank pages must have enough room for the original writing.
      This ritual takes half the time required to copy the writing by hand, to a minimum of one minute, and does not require writing materials.
      It requires one \\glossterm{fatigue level} from its participants.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Aquamancy', 'Fabrication', 'Polymorph'],
  },

  {
    name: 'Greater Copy Writing',

    castingTime: 'special',
    functionsLike: {
      exceptThat: `
        it can target objects of Medium or smaller size.
        In addition, the time required to perform this ritual decreases to one tenth of the time required to copy the writing by hand, to a minimum of one minute.
        It requires one \\glossterm{fatigue level} from its participants.
      `,
      name: 'copy writing',
    },
    rank: 4,
    roles: ['narrative'],
    spheres: ['Aquamancy', 'Fabrication', 'Polymorph'],
  },

  {
    name: 'Ammunition Stockpile',

    castingTime: 'one hour',
    effect: `
      You create a Large pile of either nonmagical arrows or crossbow bolts in any unoccupied location on solid ground adjacent to you.
      You can choose to create blunted ammunition, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
      Any creature may take ammunition from the pile to use.
    `,
    rank: 2,
    roles: ['attune'],
    tags: ['Manifestation'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Fabrication', 'Verdamancy'],
  },
  {
    name: 'Tiny Hut',

    castingTime: 'one minute',
    effect: `
      You create a permeable barrier around a \\smallarea radius \\glossterm{zone} from your location.
      The barrier is visible as a shimmering magical membrane that does not block sight.
      As a standard action, a creature can move five feet from outside the hut to inside the hut, or vice versa.
      However, the hut blocks \\glossterm{line of effect} for all other purposes.
      The barrier has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.

      If you leave the zone, this effect ends.
    `,
    // narrative: '',
    rank: 2,
    roles: ['narrative'],
    tags: ['Manifestation'],
    type: 'Attune',
    spheres: ['Telekinesis', 'Thaumaturgy'],
  },

  {
    name: 'Mystic Cage',

    castingTime: 'one hour',
    effect: `
      You create a cube of magical energy within \\medrange.
      Each wall of the cube is 20 feet wide and tall.
      Nothing can pass through the wall until it is destroyed.
      The corners of the cube have tiny gaps that allow air to pass through, but not even a Fine creature can fit through the gaps.

      Each wall has both \\glossterm{hit points} and \\glossterm{damage resistance} equal to three times your \\glossterm{power}.
      The walls track their hit points individually.
      They treat all damage as \\glossterm{environmental damage}, so attacks that deal less damage than the wall's damage resistance have no effect (see \\pcref{Environmental Damage}).
      Any damage to a wall causes visible cracks or scars, making it easy to recognize the health of the walls.
    `,
    // narrative: '',
    rank: 3,
    roles: ['narrative'],
    sphereEffects: {
      Cryomancy: 'The walls are made of clear ice that does not block sight. They take double damage from \\atFire abilities.',
      Fabrication: 'The walls are made of a solid substance like metal or stone, and are completely opaque.',
      Telekinesis: 'The walls are visible as a shimmering magical field that does not block sight.',
      Terramancy: 'The walls are made of stone, and are completely opaque.',
    },
    tags: ['Manifestation'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Fabrication', 'Telekinesis', 'Terramancy'],
  },

  {
    name: 'Continuous Light',

    castingTime: 'one minute',
    effect: `
      Choose yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
      The target glows like a torch, emitting \\glossterm{bright illumination} in a \\smallarea radius.
    `,
    rank: 1,
    roles: ['narrative'],
    tags: ['Visual'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Massive Continuous Light',

    castingTime: 'one minute',
    functionsLike: {
      name: 'continuous light',
      exceptThat: 'the area increases to a \\largearea radius.',
    },
    rank: 3,
    roles: ['narrative'],
    tags: ['Visual'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Brilliant Light',

    castingTime: 'one minute',
    effect: `
      Choose yourself or one Medium or smaller \\glossterm{ally} or unattended object within \\medrange.
      The target glows like a torch, emitting \\glossterm{brilliant illumination} in a \\smallarea radius.
    `,
    rank: 5,
    roles: ['narrative'],
    tags: ['Visual'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Massive Brilliant Light',

    castingTime: 'one minute',
    functionsLike: {
      name: 'brilliant light',
      exceptThat: 'the area increases to a \\largearea radius.',
    },
    rank: 7,
    roles: ['narrative'],
    tags: ['Visual'],
    type: 'Sustain (attuneable, minor)',
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Permanent Light',

    castingTime: 'one hour',
    functionsLike: {
      name: 'continuous light',
      exceptThat: 'the effect lasts for one year.',
    },
    rank: 2,
    roles: ['narrative'],
    tags: ['Visual'],
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Massive Permanent Light',

    castingTime: 'one hour',
    functionsLike: {
      name: 'continuous light',
      exceptThat: 'the area increases to a \\largearea radius, and the effect lasts for one year.',
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Visual'],
    spheres: ['Electromancy', 'Photomancy', 'Pyromancy'],
  },

  {
    name: 'Bestow Darkvision',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains \\trait{darkvision} with a range of 60 feet.
      If it already has darkvision, the range of its darkvision increases by 60 feet instead.
    `,
    rank: 2,
    roles: ['attune'],
    tags: ['Visual'],
    type: 'Attune (target)',
    spheres: ['Polymorph', 'Umbramancy'],
  },

  {
    name: 'Bestow Low-Light Vision',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains \\trait{low-light vision}.
    `,
    rank: 1,
    roles: ['attune'],
    tags: ['Visual'],
    type: 'Attune (target)',
    spheres: ['Photomancy', 'Polymorph', 'Umbramancy'],
  },

  {
    name: 'Bestow Scent',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains \\trait{scent}.
    `,
    rank: 3,
    roles: ['attune'],
    tags: ['Visual'],
    type: 'Attune (target)',
    // Toxicology?
    spheres: ['Polymorph'],
  },

  {
    name: 'Create Handholds',

    castingTime: 'one minute',
    effect: `
      Choose one \\glossterm{unattended}, \\glossterm{mundane} wall up to 50 feet high and 10 feet wide within \\medrange.
      You create handholds in the target, making it easier to climb.
      This reduces the \\glossterm{difficulty value} to climb the object by 10.
      When this effect ends, the handholds disappear.
    `,
    rank: 1,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Polymorph', 'Telekinesis', 'Terramancy'],
  },

  {
    name: 'Craft Object',

    castingTime: 'special',
    effect: `
      Choose any number of unattended, nonmagical objects within \\shortrange.
      You make a Craft check to transform the subjects into a new item (or items) made of the same materials.
      You require none of the tools that would normally be necessary, such as an anvil and furnace.
      The total size of all targets combined must be Medium size or smaller.

      This ritual takes time equal to one tenth of the time that would normally be required to craft the object, to a minimum of one hour.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Polymorph', 'Telekinesis'],
  },

  {
    name: 'Craft Large Object',

    castingTime: 'special',
    functionsLike: {
      exceptThat: `
        the maximum combined size of all targets increases to Large.
      `,
      name: 'Craft Object',
    },
    rank: 5,
    roles: ['narrative'],
    spheres: ['Polymorph', 'Telekinesis'],
  },

  {
    name: 'Craft Huge Object',

    castingTime: 'special',
    functionsLike: {
      exceptThat: `
        the maximum combined size of all targets increases to Huge.
      `,
      name: 'craft object',
    },
    rank: 7,
    roles: ['narrative'],
    spheres: ['Polymorph', 'Telekinesis'],
  },

  {
    name: 'Purify Sustenance',

    castingTime: 'one hour',
    effect: `
      All food in one cubic foot within \\shortrange is purified.
      Spoiled, rotten, poisonous, or otherwise contaminated food becomes pure and suitable for eating and drinking.
      This does not prevent subsequent natural decay or spoiling.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Prayer', 'Toxicology'],
  },

  // {
  //   name: 'Awaken',

  //   castingTime: '24 hours',
  //   effect: `
  //     One Large or smaller \\glossterm{ally} within \\medrange becomes fully intelligent.
  //     Its Intelligence becomes 1d6 - 5.
  //     Its type changes from animal to magical beast.
  //     It gains the ability to speak and understand one language that you know of your choice.
  //     Its maximum age increases to that of a human (rolled secretly).
  //     This effect is permanent.

  //     You can only learn this ritual if you have access to this mystic sphere through the nature \\glossterm{magic source}.
  //   `,
  //   rank: 6,
  // },

  {
    name: 'Meld Shut',

    castingTime: 'one hour',
    effect: `
      Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
      The target changes its form so it cannot be opened.
      A box becomes fully sealed instead of hinged, a door expands slightly to merge with its frame, and so on.
      To a casual observer, it may not be obvious that there was ever an opening, though a \\glossterm{difficulty value} 15 Awareness check would reveal the alteration.
      Opening the object without breaking it requires a \\glossterm{difficulty value} 20 Devices check.

      When you perform this ritual, you may choose a Fine object within \\shortrange to function as a key.
      When the chosen key touches the sealed object, this ritual is \\glossterm{suppressed} for one minute, allowing the object to be opened normally.
    `,
    rank: 2,
    roles: ['narrative'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The \\glossterm{difficulty value} increases by 2 per rank above 2.
      `,
    },

    type: 'Attune',
    spheres: ['Polymorph'],
  },

  {
    name: 'Enlarged Meld Shut',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the maximum size increases to Huge, and the Devices DV to open the object increases to 26.
      `,
      name: 'meld shut',
    },
    rank: 5,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Polymorph'],
  },

  {
    name: 'Gills',

    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target gains the ability to breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
    `,
    // narrative: '',
    rank: 2,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Aquamancy', 'Polymorph'],
  },
  {
    name: 'Heat Tolerance',

    castingTime: 'one minute',
    effect: `
      Choose yourself or an \\glossterm{ally} or unattended object within \\medrange.
      The target suffers no harm from being in a hot environment.
      It can exist comfortably in conditions as high as 140 degrees Fahrenheit.
      Its equipment, if any, is also protected.
      This does not protect the target from \\atFire attacks.
    `,
    rank: 1,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Polymorph', 'Pyromancy'],
  },

  {
    name: 'Heat Wave',

    castingTime: 'one hour',
    effect: `
      The temperature in a two mile radius cylinder-shaped \\glossterm{zone} from your location increases rapidly.
      Over the next minute after you finish this ritual, the temperature increases by 40 degrees Fahrenheit, to a maximum of 120 degrees.
      Unlike normal, this effect does not require \\glossterm{line of effect} to you.
      % TODO: wording
      Instead, it affects all outdoor locations within the area.
      Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
    `,
    rank: 4,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Pyromancy'],
  },

  {
    name: 'Intense Heat Wave',

    castingTime: 'one hour',

    functionsLike: {
      exceptThat: `
        the temperature in the area increases by 60 degrees, to a maximum of 160 degrees.
      `,
      name: 'heat wave',
    },
    rank: 7,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Pyromancy'],
  },

  {
    name: 'Sense Flame',

    castingTime: 'one minute',
    effect: `
        You learn the general pattern of where active fires exist within a one mile radius from your location.
        The detail of your mental picture is limited to roughly knowing whether fire does or does not exist in each hundred-foot square in the area.
        Since this is a \\abilitytag{Detection} ability, it can penetrate some solid objects (see \\pcref{Detection}).
        This ritual can sense fires as small as a candle flame, but no smaller.
    `,
    rank: 2,
    roles: ['narrative'],
    tags: ['Detection'],
    spheres: ['Revelation', 'Pyromancy'],
  },

  {
    name: 'Distant Sense Flame',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the range increases to a ten mile radius from your location.
      `,
      name: 'sense flame',
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Detection'],
    spheres: ['Revelation', 'Pyromancy'],
  },

  {
    name: 'Explosive Runes',

    castingTime: 'one hour',
    effect: `
      % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
      Choose one Medium or smaller \\glossterm{unattended} object with writing on it within \\shortrange.
      The writing on the object is altered by the runes in subtle ways, making it more difficult to read.
      It becomes a \\glossterm{trap}.
      To read the writing, a creature must concentrate on reading it, which requires a standard action.
      If a creature reads the object, the object explodes.
      After the object explodes in this way, the ritual is \\glossterm{dismissed}.
      If the object is destroyed or rendered illegible, the ritual is dismissed without exploding.

      When the object explodes, make an attack vs. Reflex against everything within a \\medarea radius from the object.
      Your accuracy with this attack is equal to half the sum of your level and Perception.
      This accuracy is calculated at the time that you perform this ritual and does not change afterwards.
      \\hit \\damagerankthree.
      \\miss Half damage.
    `,
    rank: 3,
    roles: ['attune'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        \\rank{4} The damage increases to \\damagerankfour.
        \\rank{5} The damage increases to \\damagerankfive.
        \\rank{6} The damage increases to \\damageranksix.
        \\rank{7} The damage increases to \\damagerankseven.
      `,
    },
    tags: ['Trap'],
    type: 'Attune',
    spheres: ['Fabrication', 'Thaumaturgy'],
  },
  {
    name: 'Reveal True Form',

    castingTime: 'one hour',
    effect: `
      Choose one creature within \\longrange.
      You can see the target's true form, regardless of any shapechanging or illusion effects.
    `,
    rank: 3,
    roles: ['narrative'],
    type: 'Sustain (attuneable, free)',
    spheres: ['Photomancy', 'Revelation'],
  },

  {
    name: 'Augury',

    castingTime: 'one hour',
    effect: `
      You receive a limited glimpse into your immediate future.
      When you perform this ritual, you specify a course of action that you could hypothetically take during the next hour.
      You can be as broad or as detailed as you want in your description of your plan, though more specific and plausible plans generally yield more accurate results.
      The GM specifies one of four possible outcomes for the augury based on what is most likely to occur if you follow your plan.
      This is not a guarantee of success or failure, especially for plans that have some intrinsic randomness or chance of failure (such as planning to defeat a monster in combat).
      \\begin{itemize}
      \\itemhead{Weal} The plan is likely to yield good outcomes for you.
      \\itemhead{Woe} The plan is likely to yield bad outcomes for you.
      \\itemhead{Weal and Woe} The plan is likely to yield a mixture of good and bad outcomes for you.
      \\itemhead{None} Either plan is unlikely to to have any significant outcomes, or the outcomes of the plan are too vague to accurately predict.
      \\end{itemize}

      This ritual only yields accurate results once for any given situation.
      If you perform the ritual again in a situation that has not meaningfully changed, the augury always has no outcome regardless of the plan you specify.
      For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Greater Augury',

    castingTime: 'one hour',

    functionsLike: {
      exceptThat: `
      the augury considers events up to 4 hours into your future when evaluating the outcomes of your plan.
      `,
      name: 'augury',
    },
    rank: 4,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Supreme Augury',

    castingTime: 'one hour',

    functionsLike: {
      exceptThat: `
      the augury considers events up to 12 hours into your future when evaluating the outcomes of your plan.
      `,
      name: 'augury',
    },
    rank: 6,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Alarm',

    castingTime: 'one minute',
    effect: `
      A \\glossterm{scrying sensor} appears floating in the air in the target location.
      The sensor passively observes its surroundings.
      As with other \\abilitytag{Scrying} effects, its visual acuity is the same as yours.
      You can choose the minimum size category that the alarm will notify you for when you cast this spell.
      If it sees a creature or object of that size or larger moving within 50 feet of it, it will trigger a mental "ping" that only you can notice.
      You must be within 1 mile of the sensor to receive this mental alarm.
      The alarm is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
    `,
    rank: 1,
    roles: ['narrative'],
    tags: ['Scrying'],
    type: 'Attune',
    spheres: ['Photomancy', 'Revelation'],
  },

  {
    name: 'Locate Creature',

    castingTime: 'one hour',
    effect: `
      When you perform this ritual, choose a creature.
      You must have seen the chosen creature in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
      A creature without a proper name cannot be identified by name in this way.
      If you specify the chosen creature's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

      If the creature is within 200 miles of your location, you unerringly learn the relative direction from your location to the location it was in when you started performing this ritual.
    `,

    rank: 3,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Locate Object',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        it locates \\glossterm{unattended} objects instead of creatures.
      `,
      name: 'locate creature',
    },
    rank: 3,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Discern Location',

    castingTime: '24 hours',
    effect: `
      When you perform this ritual, choose a creature or object.
      You must have seen the chosen creature or object in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
      A creature or object without a proper name cannot be identified by name in this way.
      If you specify the chosen creature or object's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

      If the chosen creature or object is within 200 miles of you, you learn the location (place, name, business name, or the like), community, country, and continent where the target was at when you started performing this ritual.
      % Wording?
      If there is no corresponding information about an aspect of the target's location, such as if the target is in a location which is not part of a recognized country,
      you learn only that that aspect of the information is missing.
    `,

    rank: 2,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Distant Discern Location',

    castingTime: '24 hours',

    functionsLike: {
      exceptThat: `
      there is no distance limitation.
      The creature or object must simply be on the same plane as you.
      `,
      name: 'discern location',
    },
    rank: 4,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Interplanar Discern Location',

    // original targets: any creature or object on the same plane as you
    castingTime: '24 hours',

    functionsLike: {
      exceptThat: `
      the target does not have to be on the same plane as you.
      `,
      name: 'discern location',
    },
    rank: 6,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },

  {
    name: 'Sending',

    castingTime: 'one hour',
    effect: `
      Choose a creature within 200 miles of you.
      You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the target.
      However, you must specify your target with a precise mental image of its appearance.
      The image does not have to be perfect, but it must unambiguously identify the target.
      If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

      You send the target a short verbal message.
      The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

      After the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
      Once it speaks twenty-five words, or you stop sustaining the effect, the effect ends.
      `,

    rank: 2,
    roles: ['narrative'],
    type: 'Sustain (standard)',
    spheres: ['Aeromancy', 'Prayer', 'Revelation'],
  },

  {
    name: 'Rapid Sending',

    castingTime: 'one minute',
    functionsLike: {
      exceptThat: `
        the casting time is much shorter.
      `,
      name: 'sending',
    },
    rank: 4,
    roles: ['narrative'],
    type: 'Sustain (standard)',
    spheres: ['Aeromancy', 'Prayer', 'Revelation'],
  },

  {
    name: 'Distant Sending',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
      there is no distance limitation.
      The target must simply be on the same plane as you.
      `,
      name: 'sending',
    },
    rank: 4,
    roles: ['narrative'],
    type: 'Sustain (standard)',
    spheres: ['Aeromancy', 'Prayer', 'Revelation'],
  },

  {
    name: 'Interplanar Sending',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        there is no distance limitation, and the target does not have to be on the same plane as you.
      `,
      name: 'sending',
    },
    rank: 6,
    roles: ['narrative'],
    type: 'Sustain (standard)',
    spheres: ['Aeromancy', 'Prayer', 'Revelation'],
  },

  {
    name: 'Telepathic Bond',

    castingTime: 'one minute',
    effect: `
      Each target can communicate mentally through telepathy with each other target.
      This communication is instantaneous, though it cannot reach more than 200 miles or across planes.

      % Is this grammatically correct?
      Each target must attune to this ritual independently.
      If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
      However, the effect continues as long as at least one target attunes to it.
      If you \\glossterm{dismiss} the ritual, the effect ends for all targets.
    `,
    rank: 3,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Enchantment', 'Revelation'],
  },

  {
    name: 'Distant Telepathic Bond',

    castingTime: 'one minute',

    functionsLike: {
      exceptThat: `
        the effect works at any distance.
        The communication still does not function across planes.
      `,
      name: 'telepathic bond',
    },
    rank: 5,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Enchantment', 'Revelation'],
  },

  {
    name: 'Interplanar Telepathic Bond',

    castingTime: 'one minute',

    functionsLike: {
      exceptThat: `
        the effect works at any distance and across planes.
      `,
      name: 'telepathic bond',
    },
    rank: 7,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Enchantment', 'Revelation'],
  },

  {
    name: 'Seek Legacy',

    castingTime: 'one minute',
    effect: `
      Choose one \\glossterm{ritual participant}.
      They learn the precise distance and direction to their \\glossterm{legacy item}, if it is on the same plane.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Prayer', 'Revelation', 'Thaumaturgy'],
  },

  {
    name: 'Scry Creature',

    castingTime: 'one hour',
    attack: {
      hit: `A scrying sensor appears in the target's space.
      This sensor functions like the sensor created by the \\spell{mystic eye} spell, except that you cannot move the sensor manually.
      Instead, it automatically tries to follow the target to stay in its space.
      At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm{dismissed}.`,
      targeting: `
      Make an attack vs. Mental against one creature within 200 miles of you.
      You do not need \\glossterm{line of sight} or \\glossterm{line of effect} to the target.
      However,  must specify your target with a precise mental image of its appearance.
      The image does not have to be perfect, but it must unambiguously identify the target.
      If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply fail without effect.
      This attack roll cannot \\glossterm{explode}.
      `,
    },
    rank: 3,
    roles: ['narrative'],
    tags: ['Scrying'],
    spheres: ['Photomancy', 'Revelation'],
  },

  {
    name: 'Distant Scry Creature',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        there is no distance limit.
      `,
      name: 'scry creature',
    },
    rank: 5,
    roles: ['narrative'],
    tags: ['Scrying'],
    spheres: ['Photomancy', 'Revelation'],
  },

  {
    name: 'Interplanar Scry Creature',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        there is no distance limit, and the target does not have to be on the same plane as you.
      `,
      name: 'scry creature',
    },
    rank: 7,
    roles: ['narrative'],
    tags: ['Scrying'],
    spheres: ['Photomancy', 'Revelation'],
  },
  {
    name: 'Prophetic Dream',

    castingTime: 'one hour',
    effect: `
      The next time you fall asleep, you have a dream that foreshadows some important event or decision in your future.
      The dream may be vague or even self-contradictory, since the future is never certain, but its contents always provide some hint about what may lie ahead of you.
      Generally, a prophetic dream concerns events no more than a month before they occur, though staggeringly important events can be prophesied years in advance.

      Once you have performed this ritual, performing it again always yields the same dream until the prophesied event has happened or is no longer a relevant or likely future.
      This can happen as if your actions prevent the event from coming to pass.
    `,
    rank: 4,
    roles: ['narrative'],
    tags: ['Scrying'],
    spheres: ['Revelation', 'Umbramancy'],
  },
  {
    name: 'Private Sanctum',

    castingTime: '24 hours',
    effect: `
      This ritual creates a ward against any external perception in a \\medarea radius \\glossterm{zone} centered on your location.
      This effect lasts for one year.
      Everything in the area is completely imperceptible from outside the area.
      Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
      In addition, all \\abilitytag{Scrying} effects fail to function in the area.
      Creatures inside the area can see within the area and outside of it without any difficulty.
    `,
    rank: 5,
    roles: ['narrative'],
    spheres: ['Umbramancy'],
  },
  {
    name: 'Scryward',

    castingTime: '24 hours',
    effect: `
      This ritual creates a ward against scrying in a \\medarea radius \\glossterm{zone} centered on your location.
      All \\abilitytag{Scrying} effects fail to function in the area.
      This effect lasts for one year.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Revelation', 'Thaumaturgy', 'Umbramancy'],
  },
  {
    name: 'Find the Path',

    castingTime: '24 hours',
    effect: `
      When you perform this ritual, you must unambiguously specify a location on the same plane as you, and you choose up to six ritual participants to guide.
      You know exactly what direction you must travel to reach your chosen destination by the most direct physical route.
      You are not always led in the exact direction of the destination -- if there is an impassable obstacle between the target and the destination, this ability will direct you around the obstacle, rather than through it.

      The guidance provided by this ability adjusts to match your current physical capabilities, including flight and other unusual movement modes.
      It does not consider teleportation spells or any other active abilities which could allow the creatures to bypass physical obstacles.
      It does not see into the future, and changing circumstances may cause the most direct path to change over time.
      It also does not consider movement impediments or dangers, including hostile creatures or treacherous terrain, which may endanger or slow progress without rendering it impossible.
    `,
    rank: 3,
    roles: ['narrative'],
    type: 'Attune',
    sphereEffects: {
      Terramancy:
        'The guidance does not consider non-grounded forms of movement, such as jumping or flying.',
      Verdamancy:
        'You only receive guidance while both your destination and current location have a Huge or larger living plant.',
    },
    spheres: ['Aeromancy', 'Prayer', 'Revelation', 'Terramancy', 'Verdamancy'],
  },
  {
    name: 'Efficient Find the Path',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the casting time is shorter, and the ritual is much less exhausting.
      `,
      name: 'find the path',
    },
    rank: 6,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Aeromancy', 'Prayer', 'Revelation'],
  },
  {
    name: 'Summon Mount',

    castingTime: 'one minute',
    effect: `
      Choose a ritual participant.
      This ritual summons your choice of a Large light horse or a Medium pony to serve as a mount for the chosen creature.
      The creature appears in an unoccupied location on stable grond within \\medrange.
      It comes with a bit and bridle and a riding saddle, and will only accept the chosen creature as a rider.
      It has the same statistics as a creature from the \\spell{summon defensive monster} spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
    `,
    rank: 2,
    roles: ['attune'],
    tags: ['Manifestation'],
    type: 'Attune',
    spheres: ['Summoning'],
  },
  {
    name: 'Seal Shut',

    castingTime: 'one minute',
    effect: `
      Choose one Large or smaller closable, nonmagical object within \\shortrange, such as a door or box.
      The target becomes impossible to open and more difficult to break.
      It gains a +10 bonus to its maximum \\glossterm{damage resistance}.
      Opening the object without breaking it requires a DV 20 Devices check.

      When you perform this ritual, you may choose a Fine object within \\shortrange to function as a key.
      When the chosen key touches the protected object, this ritual is \\glossterm{suppressed} for one minute, allowing the object to be opened normally.
    `,
    rank: 2,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Polymorph', 'Telekinesis', 'Terramancy'],
  },

  {
    name: 'Empowered Seal Shut',

    castingTime: 'one minute',
    functionsLike: {
      exceptThat: `
        the maximum size increases to Huge, and the Devices DV to unlock it increases to 30.
        In addition, the damage resistance bonus increases to +20.
      `,
      name: 'seal shut',
    },
    rank: 5,
    roles: ['narrative'],
    type: 'Attune',
    spheres: ['Cryomancy', 'Polymorph', 'Telekinesis', 'Terramancy'],
  },
  {
    name: 'Dispel Curse',

    castingTime: '24 hours',
    effect: `
      Choose yourself or one \\glossterm{ally} within \\shortrange.
      All curses affecting the target are removed.
      This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
      However, it can allow the target to remove any cursed items it has equipped.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Prayer', 'Thaumaturgy'],
  },
  // {
  //   name: 'Suppress Magic Aura',

  //   castingTime: 'one minute',
  //   effect: `
  //     Choose one \\glossterm{ally} or \\glossterm{unattended} object within \\shortrange.
  //     All magical effects on the target, including any magic items a target creature wears or carries, are undetectable with abilities that detect magic.
  //   `,
  //   rank: 2,
  //   type: 'Attune',
  //   spheres: ['thaumaturgy'],
  // },
  // {
  //   name: 'Persistent Suppress Magic Aura',

  //   castingTime: '24 hours',
  //   effect: `
  //     Choose one Large or smaller \\glossterm{unattended} object within \\shortrange.
  //     All magical effects on the target are undetectable with abilities that detect magic.
  //     This effect lasts for one year.
  //   `,
  //   rank: 4,
  // },
  // {
  //   name: 'Analyze Magic',

  //   castingTime: 'one hour',
  //   effect: `
  //     Make a Knowledge check to identify a magical effect with a +5 bonus (see \\pcref{Identify Magical Effect}).
  //   `,
  //   rank: 2,
  // },
  // {
  //   name: 'Greater Analyze Magic',

  //   castingTime: 'one hour',
  //   effect: `
  //     Make a Knowledge check to identify a magical effect with a +10 bonus (see \\pcref{Identify Magical Effect}).
  //   `,
  //   rank: 4,
  // },
  // {
  //   name: 'Supreme Analyze Magic',

  //   castingTime: 'one hour',
  //   effect: `
  //     Make a Knowledge check to identify a magical effect with a +15 bonus (see \\pcref{Identify Magical Effect}).
  //   `,
  //   rank: 6,
  // },
  {
    name: 'Restful Sleep',

    castingTime: 'one minute',
    effect: `
      Choose one ritual participant.
      The target immediately falls asleep, and cannot be awoken unless it loses hit points or gains a vital wound.
      If it finishes a long rest while asleep in this way, it removes an additional vital wound.
    `,
    // narrative: '',
    rank: 2,
    roles: ['narrative'],
    tags: [],
    spheres: ['Enchantment', 'Toxicology'],
  },
  {
    name: 'Poisoncraft',

    castingTime: 'one hour',
    effect: `
      You can create a rank 1 poison.
      This functions like crafting a poison normally with the Craft (poison) skill, except that you do not need the appropriate materials to craft the poison (see \\pcref{Crafting Items}).
      Instead, you must supply ritual components equal to a rank 1 item (4 gp).
    `,
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        This increases the cost of the ritual components to be equal to a consumable item of the ritual's rank (see \\pcref{Wealth and Item Ranks}).
        The maximum rank of a poison you can craft with this ritual is equal to this ritual's rank.
      `,
    },
    // narrative: '',
    rank: 1,
    roles: ['narrative'],
    tags: ['Poison'],
    spheres: ['Fabrication', 'Toxicology'],
  },
  {
    name: 'Sunlight Ward',

    castingTime: 'one hour',
    effect: `
      One ritual participant is never considered to be in \\glossterm{mundane} natural sunlight.
      This does not impair its vision, but protects it if it would otherwise suffer negative consequences from sunlight.
      Powerful \\magical effects that mimic sunlight, such as \\spell{solar flare}, still affect the target normally.
    `,
    rank: 3,
    roles: ['attune'],
    sphereEffects: {
      Terramancy: 'The target is also \\blinded by the earth covering their body.',
    },
    type: 'Attune (target)',
    spheres: ['Photomancy', 'Terramancy', 'Umbramancy'],
  },
  {
    name: 'Sunlight Ward+',

    castingTime: 'one hour',
    functionsLike: {
      name: 'sunlight ward',
      exceptThat: 'the target is also protected from \\magical effects that mimic sunlight.',
    },
    rank: 6,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Photomancy', 'Umbramancy'],
  },

  {
    name: 'Conceal Trail',

    castingTime: 'one minute',
    effect: `
      Choose up to five creatures within \\medrange from among you and your \\glossterm{allies}.
      At the end of each round, the footprints, scent, and other tracks left by each target during that round are magically concealed.
      This increases the \\glossterm{difficulty value} to follow the trail by 10, but does not prevent creatures from seeing or smelling each target normally in combat.
      At the end of each round, if any target is outside of \\longrange from you, the effect is broken for that target and its trail is revealed.
    `,
    rank: 2,
    roles: ['attune'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The \\glossterm{difficulty value} increases by 2 per rank above 2.
      `,
    },
    type: 'Attune',
    spheres: ['Chronomancy', 'Photomancy', 'Verdamancy'],
  },

  {
    name: 'Fertile Patch',

    castingTime: 'one hour',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical 5-ft.\\ square of earth.
      The soil in the target becomes suffused with plant-sustaining nutrients, making it fertile ground for plants.
      This effect lasts for one year.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Terramancy', 'Toxicology', 'Verdamancy'],
  },
  {
    name: 'Fertile Field',

    castingTime: '24 hours',
    effect: `
      This ritual creates an area of bountiful growth in a \\glossterm{zone} from your location.
      You can choose an arbitrarily shaped contiguous area that fits within a one mile radius from you.
      Normal plants within the area become twice as productive as normal for the next year.
      This ritual does not stack with itself.
      If the \\ritual{infertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Terramancy', 'Toxicology', 'Verdamancy'],
  },

  {
    name: 'Blighted Field',

    castingTime: '24 hours',
    effect: `
      This ritual creates an area of death and decay in a \\glossterm{zone} from your location.
      You can choose an arbitrarily shaped contiguous area that fits within a one mile radius from you.
      Normal plants within the area become half as productive as normal for the next year.
      This ritual does not stack with itself.
      If the \\ritual{fertility} ritual is also applied to the same area, the most recently performed ritual takes precedence.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Terramancy', 'Toxicology', 'Verdamancy'],
  },

  {
    name: 'Sense Plants',

    castingTime: 'one minute',
    effect: `
      You learn the general pattern of where natural, nonmagical plants exist within a one mile radius from your location.
      The detail of your mental picture is limited to roughly knowing whether plants do or do not exist in each hundred-foot square in the area.
      Since this is a \\abilitytag{Detection} ability, it can penetrate some solid objects (see \\pcref{Detection}).
      This ritual can only sense plants that are Small or larger, or closely packed clusters of smaller plants that reach a similar  combined size (such as dense grass).
    `,
    rank: 2,
    roles: ['narrative'],
    tags: ['Detection'],
    spheres: ['Revelation', 'Verdamancy'],
  },
  {
    name: 'Distant Sense Plants',

    functionsLike: {
      exceptThat: 'the range increases to ten miles.',
      name: 'sense plants',
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Detection'],
    castingTime: 'one hour',
    spheres: ['Revelation', 'Verdamancy'],
  },

  {
    name: 'Remove Disease',

    castingTime: 'one hour',
    effect: `
        All diseases affecting yourself or one \\glossterm{ally} within \\medrange are removed.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Toxicology', 'Vivimancy'],
  },

  {
    name: 'Restore Senses',

    castingTime: 'one hour',
    effect: `
      Choose yourself or one \\glossterm{ally} within \\medrange.
      One of the target's physical senses, such as sight or hearing, is restored to full capacity.
      This can heal both magical and mundane effects, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Polymorph', 'Toxicology', 'Vivimancy'],
  },

  {
    name: 'Corpse Communion',

    castingTime: 'one hour',
    effect: `
      You ask a corpse a single yes or no question.
      In its afterlife, the soul that inhabited the corpse becomes aware of your question and can answer yes or no as it chooses.
      It receives no magical insight into your identity, but it hears your question in your words.
      The corpse answers yes or no if the soul wishes to, but no other communication is possible.
      This requires a corpse with an intact mouth or other speaking apparatus.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Astromancy', 'Prayer', 'Revelation', 'Vivimancy'],
  },

  {
    name: 'Greater Corpse Communion',

    castingTime: 'one hour',
    functionsLike: {
      name: 'corpse communion',
      exceptThat: `
        the corpse can answer with a single full sentence, rather than only with "yes" or "no".
        In addition, the ritual only requires a piece of the corpse, not an intact mouth.
        If no mouth is present, the soul's answer is heard regardless.
      `,
    },
    rank: 6,
    roles: ['narrative'],
    spheres: ['Astromancy', 'Prayer', 'Revelation', 'Vivimancy'],
  },

  {
    name: 'True Regeneration',

    castingTime: '24 hours',
    effect: `
      Choose yourself or one \\glossterm{ally} within \\medrange.
      All of the target's \\glossterm{vital wounds} are healed.
      In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Polymorph', 'Toxicology', 'Vivimancy'],
  },

  {
    name: 'Resurrection',

    castingTime: '24 hours',
    effect: `
      Choose one intact corpse within \\shortrange.
      The creature the corpse belongs to is \\glossterm{resurrected} (see \\pcref{Resurrection}).
    `,
    sphereEffects: resurrectionSphereEffects,
    materialCost: true,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Electromancy', 'Prayer', 'Toxicology', 'Vivimancy'],
  },

  {
    name: 'Greater Resurrection',

    castingTime: '24 hours',
    effect: `
      Choose one Diminutive or larger piece of a corpse.
      It must have been part of the original creature's body at the time of death.
      The creature the corpse belongs to is \\glossterm{resurrected} in a new healthy body (see \\pcref{Resurrection}).
    `,
    sphereEffects: resurrectionSphereEffects,
    materialCost: true,
    rank: 5,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Prayer', 'Toxicology', 'Vivimancy'],
  },

  {
    name: 'Unbound Resurrection',

    castingTime: '24 hours',
    effect: `
      Choose a dead creature.
      You must explicitly and unambiguously specify the identity of the creature being resurrected.
      The creature is \\glossterm{resurrected} in a new healthy body (see \\pcref{Resurrection}).
    `,
    sphereEffects: resurrectionSphereEffects,
    materialCost: true,
    rank: 7,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Prayer', 'Vivimancy'],
  },

  {
    name: 'Reincarnation',

    castingTime: '24 hours',
    effect: `
      Choose one Diminutive or larger piece of a humanoid corpse.
      It must have been part of the original creature's body at the time of death.
      The creature the corpse belongs to is \\glossterm{resurrected} in a new healthy body (see \\pcref{Resurrection}).

      A reincarnated creature is identical to the original creature in all respects, except for its species.
      The creature's species is replaced with a random species from \\tref{Humanoid Reincarnations}.
      Its appearance changes as necessary to match its new species, though it retains the general shape and distinguishing features of its original appearance.
      The creature loses all attribute modifiers and abilities from its old species, and gains those of its new species.
      However, its languages are unchanged.

      This ritual can only be learned through the nature \\glossterm{magic source}.
    `,
    sphereEffects: resurrectionSphereEffects,
    materialCost: true,
    rank: 4,
    roles: ['narrative'],
    tableText: `
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
    `,
    tags: ['Creation'],
    spheres: ['Chronomancy', 'Prayer', 'Vivimancy'],
  },

  {
    name: 'Soul Bind',

    castingTime: 'one hour',
    effect: `
      % Is this clear enough that you can't use the same gem for this ritual twice?
      Choose a nonmagical gem you hold that is at least rank 3 (100 gp).
      In addition, choose one intact corpse within \\shortrange.
      A fragment of the soul of the creature that the target corpse belongs to is magically imprisoned in the chosen gem.
      This does not remove the creature from its intended afterlife.
      However, it prevents the creature from being \\glossterm{resurrected}, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
      A creature holding the gem may still resurrect or reanimate the creature.
      If the gem is shattered, the creature's soul becomes whole.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Prayer', 'Thaumaturgy', 'Vivimancy'],
  },

  {
    name: 'Greater Soul Bind',

    castingTime: '24 hours',
    functionsLike: {
      name: 'soul bind',
      exceptThat:
        "the creature's soul is removed from its intended afterlife and fully trapped within the gem. In addition, the gem must be at least rank 5 (2,500 gp).",
    },
    rank: 5,
    roles: ['narrative'],
    spheres: ['Prayer', 'Thaumaturgy', 'Vivimancy'],
  },

  // TODO: prohibit druid necromancers???
  {
    name: 'Animate Dead',

    castingTime: 'one hour',
    effect: `
      Choose up to four corpses within \\shortrange.
      The combined levels of all targets cannot exceed your level.
      Each target becomes an undead creature that obeys your mental commands.

      You choose whether to create a skeleton or a zombie from each corpse.
      Creating a zombie require a mostly intact corpse, including most of the flesh.
      Creating a skeleton only requires a mostly intact skeleton.
      If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

      As a \\glossterm{minor action}, you can mentally command your undead.
      The command must be no more than 10 words, and overly complex commands may cause strange and unintended behavior.
      It affects any undead you created with this ability that are within \\distrange of you.
      Undead will obey their most recent command indefinitely.
    `,
    materialCost: true,
    rank: 3,
    roles: ['attune'],
    type: 'Attune (deep)',
    spheres: ['Vivimancy'],
  },
  {
    name: 'Mystic Trap',

    castingTime: 'one hour',
    attack: {
      hit: `\\damagerankone.`,
      missGlance: true,
      targeting: `
          When you perform this ritual, choose a point in space within \\shortrange.
          You can choose a point within an \\glossterm{unattended} container as long as the container is currently open.
          One minute after the ritual is completed, that point becomes a trap.

          When a creature moves within a \\smallarea radius from the chosen point, the trap activates.
          The trap's Awareness bonus to notice creatures moving is +10.
          You can choose the minimum size category of creature required to activate the trap.
          When the trap activates, make an attack vs. Reflex against everything within a \\smallarea radius from the trap.
          The valid targets for this spell depend on the mystic sphere you learn this spell with (see \\tref{Universal Mystic Spheres}).
          After the trap activates, this effect is \\glossterm{dismissed}.
        `,
    },
    rank: 1,
    roles: ['attune'],
    tags: ['Trap'],
    type: 'Attune',
    spheres: ['Universal'],
  },
  {
    name: 'Enduring Mystic Trap',

    castingTime: '24 hours',
    functionsLike: {
      name: 'mystic trap',
      exceptThat: `
          the trap persists for one year.
          Whenever it is activated, it is temporarily \\glossterm{suppressed} for 10 minutes.
        `,
    },
    rank: 1,
    roles: ['narrative'],
    tags: ['Trap'],
    spheres: ['Universal'],
  },
  {
    name: 'Massive Mystic Trap',

    castingTime: '24 hours',
    functionsLike: {
      name: 'mystic trap',
      exceptThat: `
          the damage increases to \\damageranktwo.
          In addition, the area of both the activation and the attack increases to a \\medarea radius.
        `,
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Trap'],
    spheres: ['Universal'],
  },
  {
    name: 'Massive Enduring Mystic Trap',

    castingTime: '24 hours',
    functionsLike: {
      name: 'massive mystic trap',
      exceptThat: `
          the trap persists for one year.
          Whenever it is activated, it is temporarily \\glossterm{suppressed} for 10 minutes.
        `,
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Trap'],
    spheres: ['Universal'],
  },
];
