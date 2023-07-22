mod aberrations;
mod animals;
mod animates;
mod dragons;
mod humanoids;
mod magical_beasts;
mod monstrous_humanoids;
mod planeforged;
mod undead;

use super::monster_entry::MonsterEntry;
use aberrations::aberrations;
use animals::animals;
use animates::animates;
use dragons::dragons;
use humanoids::humanoids;
use magical_beasts::magical_beasts;
use monstrous_humanoids::monstrous_humanoids;
use planeforged::planeforgeds;
use undead::undeads;

pub fn all_specific_monster_functions() -> Vec<fn() -> Vec<MonsterEntry>> {
    return vec![
        aberrations,
        animals,
        animates,
        // dragons,
        humanoids,
        magical_beasts,
        monstrous_humanoids,
        planeforgeds,
        undeads,
    ];
}
