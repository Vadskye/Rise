import tap from 'tap';
import { getArchetypeRankAbilities } from '../metadata';

tap.test('Barbarian Archetypes', (t) => {
  t.equal(getArchetypeRankAbilities('BattleforgedResilience').length, 7);
  t.equal(getArchetypeRankAbilities('Battlerager').length, 7);
  t.equal(getArchetypeRankAbilities('OutlandSavage').length, 8);
  t.equal(getArchetypeRankAbilities('PrimalWarrior').length, 11);
  t.equal(getArchetypeRankAbilities('Totemist').length, 7);
  t.end();
});

tap.test('Fighter Archetypes', (t) => {
  t.equal(getArchetypeRankAbilities('CombatDiscipline').length, 7);
  t.equal(getArchetypeRankAbilities('EquipmentTraining').length, 8);
  t.equal(getArchetypeRankAbilities('MartialMastery').length, 11);
  t.equal(getArchetypeRankAbilities('Sentinel').length, 7);
  t.equal(getArchetypeRankAbilities('Tactician').length, 7);
  t.end();
});

tap.test('Monk Archetypes', (t) => {
  t.equal(getArchetypeRankAbilities('Airdancer').length, 8);
  t.equal(getArchetypeRankAbilities('EsotericWarrior').length, 12);
  t.equal(getArchetypeRankAbilities('Ki').length, 7);
  t.equal(getArchetypeRankAbilities('PerfectedForm').length, 10);
  t.equal(getArchetypeRankAbilities('TranscendentSage').length, 7);
  t.end();
});

tap.test('Ranger Archetypes', (t) => {
  t.equal(getArchetypeRankAbilities('Beastmaster').length, 7);
  t.equal(getArchetypeRankAbilities('BoundaryWarden').length, 8);
  t.equal(getArchetypeRankAbilities('Huntmaster').length, 7);
  t.equal(getArchetypeRankAbilities('Scout').length, 8);
  t.equal(getArchetypeRankAbilities('WildernessWarrior').length, 11);
  t.end();
});

tap.test('Rogue Archetypes', (t) => {
  // Rogue Assassin in Rust had 8 + 7 = 15 abilities (Sneak Attack Scaling)
  t.equal(getArchetypeRankAbilities('Assassin').length, 15);
  t.equal(getArchetypeRankAbilities('BardicMusic').length, 7);
  t.equal(getArchetypeRankAbilities('CombatTrickster').length, 11);
  t.equal(getArchetypeRankAbilities('JackOfAllTrades').length, 7);
  t.equal(getArchetypeRankAbilities('SuaveScoundrel').length, 7);
  t.end();
});
