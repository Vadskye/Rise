# Overview

## Modifying PC attributes

These macros depend on the code at https://github.com/Roll20/roll20-api-scripts/tree/master/ChatSetAttr.

### Mod HP
!setattr --sel --hit_points|?{+/- HP|0} --silent --nocreate --mod

### Mod ER
!setattr --sel --energy_resistance|?{+/- ER|0} --silent --nocreate --mod

### Mod PR
!setattr --sel --physical_resistance|?{+/- PR|0} --silent --nocreate --mod

## Modifying token attributes

These macros depend on the alter_token_bars.js API script in this repository.

### Mod Bar1

!alter 1 ?{+/- HP|0}

### Mod Bar2

!alter 2 ?{+/- ER|0}

### Mod Bar3

!alter 3 ?{+/- PR|0}
