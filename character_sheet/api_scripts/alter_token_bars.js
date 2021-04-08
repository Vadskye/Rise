// This script is an extension of the script provided at https://app.roll20.net/forum/post/1216260/script-alter-bar-on-token
// to support modifying multiple tokens at the same time.

// VERSION INFO
	var AlterBars_Version = 1.2;

// FUNCTION DECLARATION
	var AlterScript = AlterScript || {};

on("chat:message", function (msg) {
	// Exit if not an api command...
	if (msg.type != "api") return;
	
	// Get the api command...
	var command = msg.content.split(" ", 1)[0];
	if (command === "!alter") AlterScript.Process(msg);
});

AlterScript.Process = function(msg, who) {
	// USER CONFIG
		// BAR CONFIGURATION - These are used to identify which bar to adjust. You can
		// also use any lowercase letters as well such as 'h' for hit points/health.
		const Bar1Key = "1";
		const Bar2Key = "2";
		const Bar3Key = "3";
		
		// BAR NAMES - These names are used if ANNOUNCE_CHANGE is set to true. The
		// format of the annoucement is: Name gained/lost # BarName.
		const BarNames = ["hit points", "energy resistance", "physical resistance"];
		
		// PREVENT OVERMAX - Set this variable to true to prevent the current value of
		// the bar from being greater than its max value. If there is no max value set,
		// it will not stop the current bar value from increasing.
		const PREVENT_OVERMAX = false;
		
		// ANNOUNCE CHANGE IN CHAT - Set to true to send a message to the chat window
		// showing which token gained or lost points and how much.
		const ANNOUNCE_CHANGE = false;
		
		// SEND TO GM - Set to true to send the results to the GM. This will also trigger
		// if a hidden change is sent.
		const ALERT_GM = false;
		
		// STOP AT ZERO - Prevents the current value of the bar from dropping below zero.
		const STOP_AT_ZERO = false;
	// END USER CONFIG
	
	// Get and/or create variables...
	const selectedIds = (msg.selected || []).map((s) => s._id);
	for (const targetId of selectedIds) {
    	const n = msg.content.split(" ");
    	const who = msg.who;
    	const Target = getObj("graphic", targetId);
    	let Bar = 0;
    	Bar = (n[1].toLowerCase().toString() == Bar1Key) ? 1 : 0;
    	Bar = (n[1].toLowerCase().toString() == Bar2Key) ? 2 : Bar;
    	Bar = (n[1].toLowerCase().toString() == Bar3Key) ? 3 : Bar;
    	if (Bar === 0) {
    		sendChat("ERROR", "/w " + who.replace(" (GM)", "") + " That is not a valid bar.");
    		return;
    	}
    	let AlterValue = n[2];
    	const CurrentValue = parseInt(Target.get("bar" + Bar + "_value"));
    	const MaxValue = parseInt(Target.get("bar" + Bar + "_max"));
    	const NoAnnounce = n[3];
    	
    	// Check for a + or - sign...
    	const Operand1 = AlterValue.charAt(0);
    	const Operand2 = AlterValue.charAt(1);
    	if (Operand2 === "+" || Operand2 === "-") AlterValue = AlterValue.substring(2);
    	else if (Operand1 === "+" || Operand1 === "-") AlterValue = AlterValue.substring(1);
    	
    	// Save the value for the tooltip...
    	const Expression = AlterValue;
    	
    	// Define CSS...
    	const AddStyle = "display: inline-block; text-align: center; min-width: 1.75em; font-size: 1em; font-weight: bold; color:#040; background-color: #8C8; border: 1px solid #040; padding: -1px 2px; border-radius: 3px;";
    	const MinusStyle = "display: inline-block; text-align: center; min-width: 1.75em; font-size: 1em; font-weight: bold; color:#600; background-color: #FAA; border: 1px solid #600; padding: -1px 2px; border-radius: 3px;";
    	
    	// Main process...
    	sendChat("", "/r " + AlterValue, function(outs) {
    		AlterValue = parseInt(JSON.parse(outs[0].content).total);
    		const Tooltip = "Rolling " + Expression + " = " + AlterValue + "' class='a inlinerollresult showtip tipsy-n'";
    		if (Operand1 != "-") {
    			// Add to bar...
    			if (PREVENT_OVERMAX) AlterValue = (AlterValue + CurrentValue > MaxValue) ? MaxValue - CurrentValue : AlterValue;
    			if (ANNOUNCE_CHANGE && NoAnnounce == undefined) sendChat("DiceBot", Target.get("name") + " gained <span title='" + Tooltip + "' style='" + AddStyle + "'>" + AlterValue + "</span> " + BarNames[Bar-1] + ".");
    			if (ALERT_GM || NoAnnounce != undefined) sendChat(who, "/w GM " + Target.get("name") + " gained <span title='" + Tooltip + "' style='" + AddStyle + "'>" + AlterValue + "</span> " + BarNames[Bar-1] + ".");
    			Target.set("bar" + Bar + "_value", CurrentValue + AlterValue);
    		} else {
    			// Subtract from bar...
    			if (STOP_AT_ZERO && (CurrentValue - AlterValue < 0)) AlterValue = CurrentValue;
    			if (ANNOUNCE_CHANGE && NoAnnounce == undefined) sendChat("DiceBot", Target.get("name") + " lost <span title='" + Tooltip + "' style='" + MinusStyle + "'>" + AlterValue + "</span> " + BarNames[Bar-1] + ".");			
    			if (ALERT_GM || NoAnnounce != undefined) sendChat(who, "/w GM " + Target.get("name") + " lost <span title='" + Tooltip + "' style='" + MinusStyle + "'>" + AlterValue + "</span> " + BarNames[Bar-1] + ".");
    			Target.set("bar" + Bar + "_value", CurrentValue - AlterValue);
    		}			
    	});
	}
};
