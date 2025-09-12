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
    name: 'Reinforcement',

    castingTime: 'one hour',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical object or part of an object of up to Large size.
      Unlike most abilities, this ritual can affect individual parts of a whole object.

      The target gains a +4 \\glossterm{enhancement bonus} to its \\glossterm{hardness}.
      If the target is moved, this ability is \\glossterm{dismissed}.
      Otherwise, it lasts for one year.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The hardness bonus increases by 4 per rank above 1.
      `,
    },
  },

  {
    name: 'Temporary Reinforcement',

    castingTime: 'one minute',
    effect: `
      You create an area of reinforcement within a \\glossterm{shapeable} \\medarea radius \\glossterm{zone} from you.
      All \\glossterm{unattended}, nonmagical objects or parts of objects within the area gain a \\plus5 \\glossterm{enhancement bonus} to their \\glossterm{hardness}.
    `,
    rank: 2,
    roles: ['narrative'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The hardness bonus increases by 1 per rank above 1.
      `,
    },
    spheres: ['Fabrication', 'Polymorph', 'Prayer', 'Terramancy'],
    type: 'Sustain (attuneable, standard)',
  },

  {
    name: 'Enduring Reinforcement',

    castingTime: '24 hours',
    functionsLike: {
      exceptThat: `
        the effect lasts for one hundred years.
      `,
      name: 'reinforcement',
    },
    rank: 3,
    roles: ['narrative'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The hardness bonus increases by 4 per rank above 3.
      `,
    },
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
      The area within an \\largearea radius \\glossterm{shapeable} \\glossterm{zone} from your location becomes sacred to your deity.
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
      If it uses a \\glossterm{standard action} or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this ability is \\glossterm{dismissed}.
      It can still use a \\glossterm{move action} in place of a standard action during the action phase without ending this effect.
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
      If it uses a \\glossterm{standard action} or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this ability is \\glossterm{dismissed}.
      It can still use a \\glossterm{move action} in place of a standard action during the action phase without ending this effect.
    `,
    // narrative: '',
    rank: 7,
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
      Torrential rain begins falling out of thin air within a \\glossterm{shapeable} \\largearea radius \\glossterm{zone} within \\longrange.
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
      That roughly corresponds to a single 5-ft\. cube of water.
      The waste material moves to the edge of the water so it falls out or can be easily removed.
      It remains separated until this ritual's effect ends.
      This does not remove magical effects or contaminants heavier than half a pound.
      Using this to gradually purify a very large body of water is difficult, since the waste material can easily mix with the water unaffected by a single use of this ritual.
    `,
    // narrative: '',
    type: 'Sustain (attuneable, minor)',
    rank: 2,
    roles: ['narrative'],
    scaling: {
      4: "The volume increases to two thousand gallons of water, or two 5-ft. cubes.",
      6: "The volume increases to four thousand gallons of water, or four 5-ft. cubes.",
    },
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
    scaling: {
      4: 'The area increases to a five mile radius from your location.',
      6: 'The area increases to a ten mile radius from your location.',
    },
    tags: ['Detection'],
    spheres: ['Aquamancy', 'Revelation'],
  },
  {
    name: 'Learn to Swim',

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
    name: 'Astral Rift',

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
  //     If it attacks or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this ability is \\glossterm{dismissed}.
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
      At the end of each round during this continuation, if the astral beacon has room for your group, the teleportation succeeds and the ritual ends.
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
    name: 'Preservation',

    castingTime: 'one minute',
    effect: `
      Choose one Large or smaller \\glossterm{unattended}, nonmagical object within \\shortrange.
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
    name: 'Persistent Preservation',

    castingTime: 'one minute',
    functionsLike: {
      name: 'gentle repose',
      exceptThat: 'the effect lasts for one year.',
    },
    materialCost: true,
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
      If the container is destroyed, this ability is \\glossterm{dismissed}.
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
      If it uses a \\glossterm{standard action} or is dealt damage, it is \\glossterm{briefly} unable to take any actions and this ability is \\glossterm{dismissed}.
      It can still use a \\glossterm{move action} in place of a standard action during the action phase without ending this effect.
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
      When the animal has delivered its message, this ability is \\glossterm{dismissed}, allowing you to know that the message has been delivered.
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
      If the target is moved, this ability is \\glossterm{dismissed}.

      Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the chosen object, make a \\glossterm{reactive attack} vs. Mental against it.
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
      If the target is moved, this ability is \\glossterm{dismissed}.

      Whenever a creature of the chosen type enters a \\largearea radius \\glossterm{emanation} from the target, make a \\glossterm{reactive attack} vs. Mental against it.
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
    name: 'Create Water',

    castingTime: 'one minute',
    effect: `
      You create up to ten gallons of wholesome, drinkable water divided among any number of locations within \\shortrange, allowing you to fill multiple small water containers.
      You must create a minimum of one ounce of water in each location.
      % Tiny body of water is 1 cubic foot = 7.5 gallons
      This generally means that you can create a single Tiny body of water.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      3: 'The volume created increases to twenty gallons.',
      // Small body of water is 2.5^3 = ~15.5 cubic feet = ~120 gallons
      4: 'The volume created increases to fifty gallons. This generally means that you can create a Small body of water by performing the ritual twice.',
      6: 'The volume created increases to one hundred gallons.',
    },
    sphereEffects: {
      Terramancy: 'The locations must be \\glossterm{grounded}, and the ritual takes one hour to perform instead of one minute.',
    },
    spheres: ['Aquamancy', 'Fabrication', 'Terramancy'],
    tags: ['Creation', 'Water'],
  },

  {
    name: 'Create Food',

    castingTime: 'one hour',
    effect: `
      This ritual creates food and water in one unoccupied square within \\shortrange that is sufficient to sustain five Medium creatures for 24 hours.
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
      This ritual creates food and water in any number of unoccupied squares within \\shortrange that is sufficient to sustain one hundred Medium creatures for 24 hours.
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
      You create a permeable barrier around a \\glossterm{shapeable} \\smallarea radius \\glossterm{zone} from your location.
      The barrier is visible as a shimmering magical membrane that does not block sight.
      As a standard action, a creature can move five feet from outside the hut to inside the hut, or vice versa.
      However, the hut blocks \\glossterm{line of effect} for all other purposes.
      The barrier has \\glossterm{hit points} equal to three times your \\glossterm{power}, and is destroyed when its hit points become negative.

      If you leave the zone, this ability is \\glossterm{dismissed}.
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

      Each wall has \\glossterm{hit points} equal to three times your \\glossterm{power} and \\glossterm{hardness} equal to your \\glossterm{power}.
      The walls track their hit points individually.
      Any damage to a wall causes visible cracks or scars, making it easy to recognize the health of the walls.
    `,
    // narrative: '',
    rank: 3,
    roles: ['narrative'],
    sphereEffects: {
      Cryomancy:
        'The walls are made of clear ice that does not block sight. They take double damage from \\atFire abilities.',
      Fabrication:
        'The walls are made of a solid substance like metal or stone, and are completely opaque.',
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
    scaling: {
      3: 'The area increases to a \\largearea radius.',
      5: 'The area increases to a \\hugearea radius.',
      7: 'The area increases to a \\gargarea radius.',
    },
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
    scaling: {
      7: 'The area increases to a \\medarea radius.',
    },
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
    materialCost: true,
    rank: 2,
    roles: ['narrative'],
    scaling: {
      4: 'The area increases to a \\largearea radius.',
      6: 'The area increases to a \\hugearea radius.',
    },
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
    scaling: {
      5: 'the maximum combined size of all targets increases to Large.',
      7: 'the maximum combined size of all targets increases to Huge.',
    },
    spheres: ['Polymorph', 'Telekinesis'],
  },

  {
    name: 'Purify Sustenance',

    castingTime: 'one hour',
    effect: `
      All food in a \\smallarea radius within within \\shortrange is purified.
      Spoiled, rotten, poisonous, or otherwise contaminated food becomes pure and suitable for eating.
      This does not prevent subsequent natural decay or spoiling.
    `,
    rank: 2,
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
    scaling: {
      4: 'The area increases to a five mile radius from your location.',
      6: 'The area increases to a ten mile radius from your location.',
    },
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
    type: 'Sustain (attuneable, minor)',
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
      \\begin{raggeditemize}
      \\itemhead{Weal} The plan is likely to yield good outcomes for you.
      \\itemhead{Woe} The plan is likely to yield bad outcomes for you.
      \\itemhead{Weal and Woe} The plan is likely to yield a mixture of good and bad outcomes for you.
      \\itemhead{None} Either plan is unlikely to to have any significant outcomes, or the outcomes of the plan are too vague to accurately predict.
      \\end{raggeditemize}

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
    name: 'Track Item',

    castingTime: 'one hour',
    effect: `
      When you perform this ritual, choose a Tiny or larger object you \\glossterm{touch}.
      You constantly know the exact distance and direction to the object, even if it is \\glossterm{attended}, as long as it is within 200 miles of you.
      This connection ignores \\glossterm{line of sight} and \\glossterm{line of effect}.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Revelation'],
    type: 'Attune',
  },

  {
    name: 'Track Fine Item',

    castingTime: 'one hour',
    functionsLike: {
      name: 'track item',
      exceptThat: 'the item can be of any size category.',
    },
    rank: 4,
    roles: ['narrative'],
    spheres: ['Revelation'],
    type: 'Attune',
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
    scaling: {
      4: `
        There is no distance limitation. 
        The target must simply be on the same plane as you.
      `,
      6: `
        The target does not have to be on the same plane as you.
      `,
    },
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
    scaling: {
      4: `
        There is no distance limitation. 
        The target must simply be on the same plane as you.
      `,
      6: `
        The target does not have to be on the same plane as you.
      `,
    },
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
    scaling: {
      6: `
        There is no distance limitation. 
        The target must simply be on the same plane as you.
      `,
    },
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
    scaling: {
      5: `
        There is no distance limitation. 
        The communication still does not function across planes.
      `,
      7: `
        The communication also functions across planes.
      `,
    },
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
    scaling: {
      5: `
        There is no distance limitation. 
        The target must simply be on the same plane as you.
      `,
      7: `
        The target does not have to be on the same plane as you.
      `,
    },
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
      This ritual creates a ward against any external perception in a \\medarea radius \\glossterm{shapeable} \\glossterm{zone} centered on your location.
      This effect lasts for one year.
      Everything in the area is completely imperceptible from outside the area.
      Anyone observing the area from outside sees only a dark, silent void, regardless of \\trait{darkvision} and similar abilities.
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
      This ritual creates a ward against scrying in a \\medarea radius \\glossterm{shapeable} \\glossterm{zone} centered on your location.
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
    name: 'Find the Lost',

    castingTime: 'one hour',
    functionsLike: {
      exceptThat: `
        the casting time is shorter, and the ritual is much less exhausting.
        However, instead of choosing a location, you must choose an \\glossterm{ally} that you have seen before.
        This effect guides you to their location at the time that the ritual was completed.
        It does not update its guidance as the ally moves.
      `,
      name: 'find the path',
    },
    rank: 4,
    roles: ['narrative'],
    type: 'Attune',
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
      It gains a +10 bonus to its \\glossterm{hardness}.
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
    name: 'Greater Seal Shut',

    castingTime: 'one minute',
    functionsLike: {
      exceptThat: `
        the maximum size increases to Huge, and the Devices DV to unlock it increases to 30.
        In addition, the hardness bonus increases to +20.
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
      This ritual creates an area of bountiful growth in a \\glossterm{shapeable} one mile radius \\glossterm{zone} from your location.
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
      This ritual creates an area of death and decay in a \\glossterm{shapeable} one mile radius \\glossterm{zone} from your location.
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
    scaling: {
      4: 'The area increases to a five mile radius from your location.',
      6: 'The area increases to a ten mile radius from your location.',
    },
    tags: ['Detection'],
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
              01--10 & Dwarf \\\\
              11--20 & Elf \\\\
              21--30 & Halfling \\\\
              31--40 & Kobold \\\\
              41--60 & Human \\\\
              61--70 & Orc \\\\
              71--100 & Mixed \\\\
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
      Choose up to five corpses within \\shortrange.
      The combined levels of all targets cannot exceed your level, and none of the targets can be \\glossterm{elite}.
      Each target becomes an undead creature that obeys your mental commands.

      You choose whether to create a skeleton or a zombie from each corpse.
      Creating a zombie require a mostly intact corpse, including most of the flesh.
      Creating a skeleton only requires a mostly intact skeleton.
      If a skeleton is made from an intact corpse, the flesh falls off the animated bones over the next few minutes as it moves around.

      This ritual does not give you any specific control over the newly awakened undead.
      They may attack you once they become fully active, which typically happens one minute after the ritual is complete.
      If you also know how to perform the \ritual{command undead} ritual, you can combine that ritual with this one.
      Doing so doubles the time required to complete the ritual, but it applies the effects of \ritual{command undead} to each creature you created.
    `,
    materialCost: true,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Vivimancy'],
  },
  {
    name: 'Animate Dreadhorde',

    castingTime: 'one hour',
    functionsLike: {
      name: 'animate dead',
      exceptThat:
        'the combined levels of all targets cannot exceed twice your level. The level of each individual target must also not exceed your level.',
    },
    materialCost: true,
    rank: 6,
    roles: ['narrative'],
    spheres: ['Vivimancy'],
  },
  {
    name: 'Command Undead',

    castingTime: 'one hour',
    effect: `
      Choose up to five \\trait{mindless} \\creaturetag{undead} creatures within \\medrange.
      The combined levels of all targets cannot exceed your level, and none of the targets can be \\glossterm{elite}.
      Each target become your servant, and will obey your commands.

      As a \\glossterm{minor action}, you can mentally command any number of undead you control using this ritual.
      The command must be no more than 10 words, and overly complex commands may cause strange and unintended behavior.
      Each target of the command must be within \\distrange of you.
      Undead commanded in this way will obey their most recent command indefinitely, even if it causes them great danger.
    `,
    rank: 2,
    roles: ['attune'],
    type: 'Attune (deep)',
    spheres: ['Vivimancy'],
  },

  {
    name: 'One Who Lives in Death',

    castingTime: 'one minute',
    effect: `
      All \\trait{mindless} \\creaturetag{undead} perceive you to be another undead similar to themselves.
      This generally means that they will not attack you or interfere with you, though they may still retaliate if provoked.
    `,
    rank: 3,
    roles: ['attune'],
    type: 'Attune',
    spheres: ['Vivimancy'],
  },

  {
    name: 'Those Who Live in Death',

    castingTime: 'one hour',
    functionsLike: {
      name: 'one who lives in death',
      mass: true,
    },
    rank: 6,
    roles: ['attune'],
    type: 'Attune (target)',
    spheres: ['Vivimancy'],
  },

  // TODO: math, consider whether Willpower or power should be involved
  {
    name: 'Command Undead Horde',

    castingTime: 'one hour',
    functionsLike: {
      name: 'command undead',
      exceptThat:
        'the combined levels of all targets cannot exceed twice your level. The level of each individual target must also not exceed your level.',
    },
    rank: 5,
    roles: ['attune'],
    type: 'Attune (deep)',
    spheres: ['Vivimancy'],
  },
  {
    name: 'Arboreal Communion',

    castingTime: 'one hour',
    effect: `
      You ask the trees within a \gargarea radius from you for information.
      Trees are not highly aware of their surroundings, and generally ignore complex questions.
      However, they have long memories of any injuries they suffered or obvious danger that they faced, such as nearby fires.
      They can only track time to the day until about a month into the past, at which point they simply refer to events by their season.
      You could use this spell to determine if any campfires were in the area recently, if any rot or infestation is present in the area, or other similar issues that are of concern to trees.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Revelation', 'Verdamancy'],
  },
  {
    name: 'Manipulate Air',

    castingTime: 'one minute',
    effect: `
      You change the wind speed within a \\largearea radius \\glossterm{emanation} from you by up to 10 miles per hour.
      If you decrease the wind's speed to 0, you can increase it again with the remainder of your speed change and choose any direction for it to travel.
      You choose the speed change and direction when you cast this spell, and that choice persists for the duration of this effect.
    `,
    narrative: `
      The wind around you waxes and wanes at your command, softening the force of a tempest or creating one to harass your foes.
    `,
    scaling: {
      3: 'The maximum speed change increases to 15 miles per hour.',
      5: 'The maximum speed change increases to 20 miles per hour.',
      7: 'The maximum speed change increases to 30 miles per hour.',
    },
    rank: 1,
    roles: ['narrative'],
    spheres: ['Aeromancy'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Chill Air',

    castingTime: 'one minute',
    effect: `
      The temperatuture of the air within a \\largearea radius \\glossterm{emanation} from you is reduced by an amount of your choice, to a maximum reduction of 20 degrees Fahrenheit.
      You cannot reduce the temperature below 0 degrees in this way.
      This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.
    `,
    roles: ['narrative'],
    scaling: {
      3: 'The maximum temperature change increases to 25 degrees.',
      5: 'The area increases to a \\hugearea radius.',
      7: 'The maximum temperature change increases to 30 degrees.',
    },
    rank: 1,
    spheres: ['Cryomancy'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Magnetize',

    castingTime: 'one minute',
    effect: `
      Choose one Small or smaller \\glossterm{unattended} \\glossterm{metallic} object within \\medrange.
      It pulls itself toward metal objects within 1 foot of it.
      Smaller objects are typically pulled towards the target, while it moves itself towards larger objects.
      Once it becomes affixed to another metal object, it takes a \\glossterm{difficulty value} 10 Strength check to separate the two objects.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      3: `The maximum size increases to Medium.`,
      5: `The maximum size increases to Large.`,
      7: `The maximum size increases to Huge.`,
    },
    spheres: ['Electromancy'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Sculpt Appearance',

    castingTime: 'one minute',
    functionsLike: {
      abilityType: 'ability',
      exceptThat: `
        you gain a +4 bonus to the Disguise check (see \\pcref{Disguise}).
      `,
      name: 'change appearance',
    },
    rank: 1,
    roles: ['narrative'],
    sphereEffects: {
      Photomancy: `
        You can only accomplish changes that would be possible with makeup, paint, and dye.
        You cannot make structural changes to your face, equipment, and so on.
        The ritual gains the \\atVisual tag.
      `,
      Polymorph: `
        You cannot change the appearance of your equipment.
        This is a physical change to your body, so no amount of inspection will reveal your true form.
        A successful Awareness check that beats your Disguise check only reveals that your body's appearance has been magically altered.
      `,
    },
    tags: ['Sustain (attuneable, minor)'],
    spheres: ['Photomancy', 'Polymorph'],
  },
  {
    name: 'Malleable Sculpt Appearance',

    castingTime: 'one minute',
    functionsLike: {
      exceptThat: `
        you can change the nature of the disguise as a \\glossterm{minor action}.
      `,
      name: 'sculpt appearance',
    },
    rank: 4,
    roles: ['narrative'],
    tags: ['Sustain (attuneable, minor)'],
    spheres: ['Photomancy', 'Polymorph'],
  },
  {
    name: 'Alter Object',

    castingTime: 'one minute',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical object you \\glossterm{touch}.
      You make a Craft check to alter it (see \\pcref{Craft}), except that you do not need any special tools to make the check (such as an anvil and furnace).
      The maximum \\glossterm{hardness} of a material you can affect with this ability is equal to your \\glossterm{power}.

      Each time you perform this ritual, you can accomplish work that would take up to one minute with a normal Craft check.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      3: `The amount of work you accomplish with the spell increases to two minutes.`,
      5: `The amount of work you accomplish with the spell increases to three minutes.`,
      7: `The amount of work you accomplish with the spell increases to five minutes.`,
    },
    sphereEffects: {
      Cryomancy: `
        The target must be ice or water.
        If you choose water, it becomes ice during the ritual.
      `,
      Terramancy: 'The target must be a body of earth or unworked stone.',
      Verdamancy: `
        The target must be a living plant rather than an object.
        As long as the plant's new shape is structurally sound and conducive to life, this reshaping does not harm the plant.
        It will continue growing as if it had always had its new shape.
      `,
    },
    spheres: ['Cryomancy', 'Polymorph', 'Terramancy'],
  },
  {
    name: 'Heat Air',

    castingTime: 'one minute',
    effect: `
      The temperatuture of the air within a \\largearea radius \\glossterm{emanation} from you is increased by an amount of your choice, to a maximum increase of 20 degrees Fahrenheit.
      You cannot increase the temperature above 100 degrees in this way.
      This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      3: 'The maximum temperature change increases to 25 degrees.',
      5: 'The area increases to a \\hugearea radius.',
      7: 'The maximum temperature change increases to 30 degrees.',
    },
    type: 'Attune',
    spheres: ['Pyromancy'],
  },
  {
    name: 'Reveal Truth',

    castingTime: 'one minute',
    effect: `
      You may reroll one Knowledge check you made within the past ten minutes.
      You can only reroll any individual Knowledge check once with this ritual.
    `,
    rank: 1,
    roles: ['narrative'],
    spheres: ['Revelation'],
  },
  {
    name: 'Darklantern',

    castingTime: 'one minute',
    effect: `
      Choose one \\glossterm{unattended}, nonmagical object that is Small or smaller within \\shortrange.
      The object emits \\glossterm{shadowy illumination} in a \\smallarea radius.
      It illuminates dark areas, but does not suppress brighter light.
      Unlike normal light, this light is completely invisible outside of the radius that it illuminates.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      3: `You can increase the radius to a \\medarea radius.`,
      5: `You can increase the radius to a \\largearea radius.`,
      7: `You can increase the radius to a \\hugearea radius.`,
    },
    tags: ['Sustain (attuneable, minor)'],
    spheres: ['Umbramancy'],
  },

  {
    name: 'Beacon of Darkness',

    castingTime: 'one minute',
    effect: `
      You constantly emit \\glossterm{shadowy illumination} in a \\medarea radius.
      This illuminates dark areas, but does not suppress brighter light.
      Unlike normal light, this light is completely invisible outside of the radius that it illuminates.

      Once per round, you can adjust the illumination you provide as a \\glossterm{free action} with the \\atSwift tag.
      You can choose one of the following effects:
      \\begin{raggeditemize}
        \\item Suppress the light
        \\item Resume the light
        \\item Change the area to a \\smallarea radius
        \\item Change the area to a \\medarea radius
      \\end{raggeditemize}
    `,
    rank: 2,
    roles: ['narrative'],
    scaling: {
      4: `You can also change the area to a \\largearea radius.`,
      6: `You can also change the area to a \\hugearea radius.`,
    },
    tags: ['Sustain (attuneable, minor)'],
    spheres: ['Umbramancy'],
  },
  {
    name: 'Commune with Elements',

    castingTime: 'one minute',
    effect: `
      You can speak with air, earth, fire, or water within a \areahuge \glossterm{zone} from your location.
      You can ask it simple questions and understand its responses.
      In general, elements are only able to give information about what they touch.
      This includes the general shapes, sizes, and locations of creatures and objects they interacted with, but not any details about color or subjective appearance.

      The element you can speak with, and the scope of its memory and awareness, depends on the mystic sphere you use to perform this ritual.
    `,
    rank: 2,
    roles: ['narrative'],
    sphereEffects: {
      Aeromancy: `
        You speak with air.
        Air can remember events up to an hour ago on a very calm day or only a few minutes ago on a windy day.
        Moving air is aware of events near where it blew through, not necessarily in your current location.
      `,
      Aquamancy: `
        You speak with water.
        Water can remember events up to a day ago in a very calm pool or only a few minutes ago in a turbulent river.
        Moving water is aware of events near where it moved through, not necessarily in your current location.
      `,
      Pyromancy: `
        You speak with fire.
        Fire can remember everything it touched and consumed since it started burning.
        Individual pieces of a very large fire, such as a particular burning tree in a forest fire, are not aware of the current status of the entirety of the fire.
        However, the fire on that tree could tell you how it got to the tree and everything it burned along the way, including the source of the forest fire.
      `,
      Terramancy: `
        You speak with earth.
        Earth can remember events up to a year ago, but its awareness is extremely limited.
        It can only remember very large events, such as giant creatures tearing up the terrain, earthquakes, or major construction.
        Earth can tell you whether there exist underground tunnels within the area, but any sort of detailed mapping is beyond its ability to communicate.
      `,
    },
    tags: ['Sustain (attuneable, minor)'],
    spheres: ['Aeromancy', 'Aquamancy', 'Pyromancy', 'Terramancy'],
  },

  {
    name: 'Disenchant',

    castingTime: 'one hour',
    effect: `
      Choose one \\glossterm{unattended} \\magical item you \\glossterm{touch}.
      If the item is \\glossterm{item rank} 1 (4 gp), it disintegrates into magical dust, which permanently \\glossterm{destroys} the item.
      The dust has a value of \\glossterm{item rank} 0 (1 gp), and is suitable for use in powerful rituals.
    `,
    rank: 1,
    roles: ['narrative'],
    scaling: {
      2: 'The item must be rank 2 (20 gp), and it leaves behind magical dust with a value of rank 1 (4 gp).',
      3: 'The item must be rank 3 (100 gp), and it leaves behind magical dust with a value of rank 2 (20 gp).',
      4: 'The item must be rank 4 (500 gp), and it leaves behind magical dust with a value of rank 3 (100 gp).',
      5: 'The item must be rank 5 (2,500 gp), and it leaves behind magical dust with a value of rank 4 (500 gp).',
      6: 'The item must be rank 6 (12,500 gp), and it leaves behind magical dust with a value of rank 5 (2,500 gp).',
      7: 'The item must be rank 7 (62,500 gp), and it leaves behind magical dust with a value of rank 6 (12,500 gp).',
    },
    sphereEffects: {
      Thaumaturgy: 'The amount of dust left behind is doubled.',
    },
    spheres: ['Thaumaturgy', 'Universal'],
  },
  {
    name: 'Comprehend Languages',
    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target can understand all \\glossterm{common languages} (see \\pcref{Communication and Languages}).
      This does not grant it the ability to speak or write in those languages.
    `,
    rank: 3,
    roles: ['narrative'],
    type: 'Attune (target)',
    spheres: ['Enchantment', 'Revelation'],
  },
  {
    name: 'Comprehend Rare Languages',
    castingTime: 'one minute',
    effect: `
      Choose up to six ritual participants.
      Each target can understand all \\glossterm{common languages} and \\glossterm{rare languages} (see \\pcref{Communication and Languages}).
      This does not grant it the ability to speak or write in those languages.
      Exceptionally rare languages, such as dead languages, are beyond this spell's ability to translate.
    `,
    rank: 6,
    roles: ['narrative'],
    type: 'Attune (target)',
    spheres: ['Enchantment', 'Revelation'],
  },
  {
    name: 'Memory Echo',
    castingTime: 'one hour',
    effect: `
      You see a vision of the single most significant event that occurred in your location within the last 24 hours.
      The vision lasts for one minute, and shows events as they appeared from wherever you currently stand.
      This allows you to walk around to view the vision from different angles.
      The vision is blurry and indistinct, so the maximum check result you can get on Awareness or similar checks to understand details of the vision is limited to 5.
      It is only visual, so you cannot hear anything said, and it is generally not clear enough to lip-read exact words.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Revelation'],
  },
  {
    name: 'Greater Memory Echo',
    castingTime: 'one hour',
    functionsLike: {
      name: 'memory echo',
      exceptThat: `
        the vision is more clear, so the maximum check result you can get on Awareness or similar checks increases to 10.
        In addition, it includes sound.
      `,
    },
    rank: 6,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Revelation'],
  },
  {
    name: 'Prophetic Dream',
    castingTime: 'one hour',
    effect: `
      When you next fall asleep, you have a vivid dream.
      The dream is relevant to your future within the next week.
      It may show you a nightmare of what will happen if you make a poor choice, a warning of unavoidable danger, or a grand vision of tantalizing success if you make the right choices.
      If any powerful entities such as deities have a particular interest in you, they may also influence the dream to communicate with you.
      Your dream generally does not literally come true, especially if you change your actions based on the dream, but its general guidance is true.

      After you perform this ritual, it has no effect until the circumstances foretold by your dream come to pass.
    `,
    rank: 4,
    roles: ['narrative'],
    spheres: ['Chronomancy', 'Revelation'],
  },
  {
    name: 'Nightmare',
    castingTime: 'one minute',
    effect: `
      This ritual has no \\glossterm{verbal components}.

      Choose one sleeping creature within \\medrange.
      The target has a nightmare within the next hour of its sleep.
      You can choose the general structure or theme of the nightmare, but not its exact details.
      For example, you could specify that the nightmare is related to drowning or spiders.
      This nightmare prevents the target from getting a restful night's sleep.
      Some people will change their behavior based on their nightmare, especially superstitious people.
    `,
    rank: 2,
    roles: ['narrative'],
    spheres: ['Enchantment', 'Revelation'],
  },
  // TODO: add higher rank versions that can hold more or take more varied actions?
  {
    name: 'Animated Attendant',
    castingTime: 'one minute',
    effect: `
      You create a Small creature that follows your instructions.
      Its \\glossterm{movement speed} is 20 feet, and it can carry one object that is neither larger nor heavier than Tiny.
      It cannot take any actions other picking up objects, putting them down, and moving.
      % TODO: wording, standard summoned creature combat stats? 
      Its combat statistics are the same as \\spell{summon monster}, except that it is destroyed if it takes any damage rather than if it gains a vital wound.
    `,
    rank: 2,
    roles: ['narrative'],
    sphereEffects: {
      Fabrication: 'The ritual gains the \\atManifestation tag.',
      Polymorph: `
        The ritual requires a Small object or collection of objects, which are animated by the ritual, bending as necessary to support the creature's motion.
        When the effect ends, the objects are unharmed unless the creature was damaged during the effect.
      `,
      Telekinesis: `
        The creature is \\trait{invisible} and shapeless.
        It gains an average \\glossterm{fly speed} with a \\glossterm{height limit} of 5 feet.
      `,
    },
    spheres: ['Fabrication', 'Polymorph', 'Telekinesis'],
    type: 'Attune',
  },

  {
    name: 'Tidy',
    castingTime: 'one minute',
    effect: `
      You create a tidy area in a \\glossterm{shapeable} \\medarea radius \\glossterm{zone} from your location.
      At the end of each round, all dirt, grime, and other blemishes on \\glossterm{unattended} objects within the area are cleansed.
    `,
    rank: 2,
    roles: ['narrative'],
    sphereEffects: {
      Polymorph: `
        All unattended objects in the area also regain one hit point at the end of each round.
        This can remove nicks, scratches, and similar damage.
        It does not restore \\glossterm{broken} or \\glossterm{destroyed} objects.
      `,
    },
    spheres: ['Aeromancy', 'Aquamancy', 'Polymorph', 'Telekinesis'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Enduring Time Lock -- Location',

    castingTime: "one minute",
    effect: `
      Choose yourself or an \\glossterm{ally} within \\medrange.
      You create a \\sphereterm{time lock} for the target's current location.
      You can unseal the time lock as a standard action.

      Unsealing the time lock causes the creature to disappear from its current location and reappear in the locked location.
      This looks and behaves similarly to \\glossterm{teleportation}, but it is not a teleportation effect and does not require \\glossterm{line of sight} or \\glossterm{line of effect}.
      If the locked location is occupied, the creature reappears in the closest open space.
      When the time lock is unsealed, this effect ends.

      This effect lasts for 24 hours, or until you unseal the time lock.
    `,
    rank: 3,
    roles: ['boon'],
    spheres: ['Astromancy', 'Chronomancy'],
  },
  {
    name: 'Memory Palace',

    castingTime: "one minute",
    effect: `
      You can perfectly recall anything you learned or experienced since 24 hours before this ritual finished, including anything you learn during this effect.
      When this effect ends, your memory returns to normal, though you can write things down to remind you of what you knew.
    `,
    rank: 4,
    roles: ['narrative'],
    spheres: ['Enchantment', 'Revelation'],
    type: 'Sustain (attuneable, standard)',
  },
  {
    name: 'Soothing Presence',

    castingTime: "one minute",
    effect: `
      All creatures within a \\largearea radius \\glossterm{emanation} from you are soothed.
      They feel pain and discomfort less intensely, and perceive themselves to be less tired.
      This does not actually remove injuries or restore fatigue.
    `,
    rank: 1,
    roles: ['narrative'],
    sphereEffects: {
      Enchantment: "This effect gains the \\atEmotion tag.",
    },
    spheres: ['Enchantment', 'Prayer'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Sanctuary',

    castingTime: "one hour",
    attack: {
      hit: `
        While the target is in the area, it is unable to attack any creatures or objects.
        This effect lasts until the target finishes a \\glossterm{short rest}.
      `,
      targeting: `
        The area within an \\largearea radius \\glossterm{shapeable} \\glossterm{zone} from your location becomes a sanctuary.
        Whenever a creature enters the area, make a \\glossterm{reactive attack} vs. Mental with a \\plus10 accuracy bonus against that creature.
        At the end of each round, this attack is repeated against each unaffected creature in the area.
      `,
    },
    rank: 3,
    roles: ['narrative'],
    sphereEffects: {
      Enchantment: "This effect gains the \\atEmotion tag.",
    },
    spheres: ['Enchantment', 'Prayer'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Persistent Sanctuary',

    castingTime: '24 hours',
    functionsLike: {
      exceptThat: `
        the effect lasts for one hundred years.
      `,
      name: 'sanctuary',
    },
    rank: 5,
    roles: ['narrative'],
    spheres: ['Enchantment', 'Prayer'],
  },
  {
    name: 'Reveal Deception',

    castingTime: "one minute",
    effect: `
      Whenever a creature within a \\largearea radius \\glossterm{emanation} from you deliberately and knowingly speaks a lie, you know that the target was lying.
      This does not reveal the truth, and unintentional inaccuracies do not trigger this effect.
    `,
    rank: 3,
    roles: ['narrative'],
    spheres: ['Enchantment', 'Revelation'],
    tags: ['Subtle'],
    type: 'Sustain (attuneable, minor)',
  },
  {
    name: 'Bind Object',
    castingTime: 'one hour',
    effect: `
      Choose a Small or smaller \\glossterm{unattended} object that must be placed at the center of the ritual.
      You bind that object to its current location or to a \\glossterm{ritual participant}.
      If you choose a location, you must attune to the spell.
      Otherwise, the target creature must attune to the spell.

      The object cannot be moved from the location or separated from the creature by more than 5 feet without breaking the bond.
      Breaking the bond requires a standard action and a \\glossterm{difficulty value} 15 Strength check.
    `,
    rank: 2,
    roles: ['narrative'],
    scaling: {
      special: `
        You can perform this ritual at a higher rank.
        The difficulty value of the Strength check increases by 2 per rank above 2.
      `,
    },
    sphereEffects: {
      Electromancy: 'The object must be \\glossterm{metallic}.',
      Terramancy: 'You can only choose a location, not a ritual participant.',
    },
    spheres: ['Electromancy', 'Polymorph', 'Telekinesis', 'Terramancy'],
    type: 'Attune (target)',
  },
  {
    name: 'Control Weather',

    castingTime: 'one minute',
    effect: `
      Choose a new weather pattern.
      You can only choose weather which would be reasonably probable in the climate and season of the area you are in.
      For example, you can normally create a thunderstorm, but not if you are in a desert.
      % TODO: define weather intensities??
      The change in the weather's intensity also cannot exceed what would be possible in an hour without magic in the current location and season.
      For example, you can change a clear sky into a light thunderstorm, but you cannot create a hurricane or tornado from untroubled air.

      When you complete the ritual, the weather begins to take effect in a cylinder-shaped \\glossterm{zone} from your location with a two mile radius.
      After ten minutes, your chosen weather pattern fully takes effect.

      At any time during this effect, any creature attuned to it can choose a new weather pattern as a \\glossterm{standard action}.
      When they do, the weather transitions from the original pattern to the new pattern over a ten minute period.

      This effect can control the general tendencies of the weather, such as the direction and intensity of the wind.
      It cannot control specific applications of the weather, such as the location of lightning strikes.
      Contradictory weather conditions are not possible simultaneously, such as rain and lightning without clouds.

      After the effect ends, the weather continues on its natural course, which typically causes your chosen weather pattern to end.
      % TODO: This should be redundant with generic spell mechanics
      If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
    `,
    // narrative: '',
    rank: 4,
    roles: ['attune'],
    spheres: ['Aeromancy', 'Aquamancy'],

    type: 'Attune (deep)',
  },
  {
    name: 'Aura of Weather Control',

    castingTime: 'one hour',
    functionsLike: {
      name: 'control weather',
      // 30 feet/round = 5 feet / second = 300 feet/min = 3,000 feet / 10 min,
      // which is less than the 10,000 foot radius.
      exceptThat: `
        the area becomes a cylinder-shaped \\glossterm{emanation} from you with a two mile radius.
        As new terrain enters the area, it takes ten minutes for it to be fully affected by the new weather.
        If you move at a normal walking pace, this means you will always experience the full effect of your chosen weather condition.
      `,
    },
    // narrative: '',
    rank: 6,
    roles: ['attune'],
    spheres: ['Aeromancy', 'Aquamancy'],

    type: 'Attune (deep)',
  },
  {
    name: 'Massive Control Weather',

    castingTime: 'one minute',
    functionsLike: {
      name: 'control weather',
      exceptThat: 'the area increases to a ten mile radius, and the weather changes take effect after only one minute rather than ten minutes.'
    },
    // narrative: '',
    rank: 7,
    roles: ['attune'],
    spheres: ['Aeromancy', 'Aquamancy'],

    type: 'Attune (deep)',
  },
];
