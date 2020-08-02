function updateBloodied(obj) {
    const bar1_value = Number(obj.get("bar1_value"));
    const bar1_max = Number(obj.get("bar1_max"));
    
    if (!bar1_max) {
        // Set the given value to be the new max for convenience when setting
        // up tokens for the first time
        obj.set({ "bar1_max": bar1_value });
        return;
    }
    
    if (bar1_value >= bar1_max) {
        // At full HP, so remove all wound markers
        obj.set({
            "status_red": false,
            "status_half-heart": false,
            "status_dead": false,
        })
    } else if (bar1_value > bar1_max / 2) {
        // The object has taken damage, but is not bloodied
        obj.set({
            "status_red": true,
            "status_half-heart": false,
            "status_dead": false,
        });
    } else if (bar1_value > 0) {
        // The object is bloodied
        obj.set({
            "status_red": false,
            "status_half-heart": true,
            "status_dead": false,
        });
    } else {
        // The object is dead
        obj.set({
            "status_red": false,
            "status_half-heart": false,
            "status_dead": true,
        });
    }
}

on("change:graphic:bar1_value", updateBloodied);
on("change:graphic:bar1_max", updateBloodied);
