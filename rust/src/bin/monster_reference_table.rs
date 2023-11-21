use rise::core_mechanics::{Defense, HasDamageAbsorption, HasDefenses};
use rise::creatures::Monster;
use rise::latex_formatting;
use rise::monsters::{CreatureType, Role};

fn main() {
    let role_headers = Role::all()
        .iter()
        .map(|r| format!("\\tb<{role_name}>", role_name = r.name()))
        .collect::<Vec<String>>()
        .join(" & ");
    let mut level_rows: Vec<String> = vec![];
    for level in 1..22 {
        level_rows.push(calc_row(level));
    }
    let table_text = format!(
        "
            \\begin<dtable*>
                \\lcaption<Quick Monster Creation>
                \\begin<dtabularx><\\textwidth><l l l l l l X>
                    \\tb<Level> & {role_headers} \\tableheaderrule
                    {level_rows}
                \\end<dtabularx>
            \\end<dtable*>
        ",
        role_headers = role_headers,
        level_rows = level_rows.join("\n"),
    );
    println!("{}", latex_formatting::latexify(table_text));
}

fn calc_cell(role: Role, level: i32) -> String {
    let monster = Monster::new(false, CreatureType::Planeforged, role, level);
    format!(
        "{hp}/{dr}; {armor}/{fort}/{ment}/{ref}",
        hp = monster.creature.calc_hit_points(),
        dr = monster.creature.calc_damage_resistance(),
        armor = monster.creature.calc_defense(&Defense::Armor),
        fort = monster.creature.calc_defense(&Defense::Fortitude),
        ref = monster.creature.calc_defense(&Defense::Reflex),
        ment = monster.creature.calc_defense(&Defense::Mental),
    )
}

fn calc_row(level: i32) -> String {
    let role_cells = Role::all()
        .into_iter()
        .map(|r| calc_cell(r, level))
        .collect::<Vec<String>>()
        .join(" & ");
    format!(
        "\\nth<{level}> & {role_cells} \\\\",
        level = level,
        role_cells = role_cells
    )
}
