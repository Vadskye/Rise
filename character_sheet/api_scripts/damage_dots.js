function updateHitPoints(obj) {
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
            "status_green": false,
            "status_half-heart": false,
            "status_dead": false,
        })
    } else if (bar1_value > 0) {
        // The object has lost HP
        obj.set({
            "status_green": true,
            "status_half-heart": false,
            "status_dead": false,
        });
    } else if (bar1_value === 0) {
        // The object is at 0, so probably has vital wounds
        obj.set({
            "status_green": false,
            "status_half-heart": true,
            "status_dead": false,
        });
    } else {
        // The object is dead
        obj.set({
            "status_green": false,
            "status_half-heart": false,
            "status_dead": true,
        });
    }
}
on("change:graphic:bar1_value", updateHitPoints);
on("change:graphic:bar1_max", updateHitPoints);

function updateDamageResistance(obj) {
    const bar2_value = Number(obj.get("bar2_value"));
    const bar2_max = Number(obj.get("bar2_max"));
    
    if (!bar2_max) {
        // Set the given value to be the new max for convenience when setting
        // up tokens for the first time
        obj.set({ "bar2_max": bar2_value });
        return;
    }
    
    if (bar2_value >= bar2_max) {
        // At full DR, so remove all markers
        obj.set({
            "status_blue": false,
        })
    } else {
        // At less than full DR, so note DR loss
        obj.set({
            "status_blue": true,
        })
    }
}

on("change:graphic:bar2_value", updateDamageResistance);
on("change:graphic:bar2_max", updateDamageResistance);
