app.service('Weapons', function() {
	
	var weapons = {

		/** SWORDS */
		"Bronze_Sword": {
			"key": "Bronze_Sword",
			"name": "Bronze Sword",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "E",
			"Mt": 4,
			"Hit": 100,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Sword": {
			"key": "Iron_Sword",
			"name": "Iron Sword",
			"description": "A common sword of a common material.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
		},
		"Steel_Sword": {
			"key": "Steel_Sword",
			"name": "Steel Sword",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 9,
			"Hit": 85,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Sword": {
			"key": "Silver_Sword",
			"name": "Silver Sword",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "B",
			"Mt": 12,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Brave_Sword": {
			"key": "Brave_Sword",
			"name": "Brave Sword",
			"description": "Def/Res -4. Enables the wielder to strike twice when initiating combat.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "A",
			"Mt": 6,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -4, "Res": -4},
			"brave": true
		},
		"Iron_Kukri": {
			"key": "Iron_Kukri",
			"name": "Iron Kukri",
			"description": "A common sword of a common material.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
		},
		"Steel_Kukri": {
			"key": "Steel_Kukri",
			"name": "Steel Kukri",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 9,
			"Hit": 85,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Kukri": {
			"key": "Silver_Kukri",
			"name": "Silver Kukri",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "B",
			"Mt": 12,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Armorslayer": {
			"key": "Armorslayer",
			"name": "Armorslayer",
			"description": "Effective against armored units. Weak against other units.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 9,
			"Hit": 95,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Armor"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Wyrmslayer": {
			"key": "Wyrmslayer",
			"name": "Wyrmslayer",
			"description": "Effective against dragons. Weak against other units.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 9,
			"Hit": 95,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Dragon"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Killing_Edge": {
			"key": "Killing_Edge",
			"name": "Killing Edge",
			"description": "Deals extra damage on critical hits.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 6,
			"Hit": 85,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"critCoeff": 4,
		},
		"Levin_Sword": {
			"key": "Levin_Sword",
			"name": "Levin Sword",
			"description": "Magic weapon. Cannot make critical hits or trigger offensive skills.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 11,
			"Hit": 80,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Ganglari": {
			"key": "Ganglari",
			"name": "Ganglari",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "E",
			"Mt": 7,
			"Hit": 85,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 5,
			"range": [1],
			"damageType": "physical",
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Siegfried": {
			"key": "Siegfried",
			"name": "Siegfried",
			"description": "Xander only. Ddg +10. Def +4 when carried. A royal blade.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "E",
			"Mt": 11,
			"Hit": 80,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "physical",
			"possessionMods": {"Def": 4},
			"usableBy": function(userObj) {
				return userObj.unitKey === "Xander";
			},
		},
		"Bottle": {
			"key": "Bottle",
			"name": "Bottle",
			"description": "Ddg +10. Best suited for thirsty warriors.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "E",
			"Mt": 1,
			"Hit": 110,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
		},
		"Umbrella": {
			"key": "Umbrella",
			"name": "Umbrella",
			"description": "Cannot make follow-up attacks, but makes enemy follow-ups easier (-5 eff. Spd).",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 1,
			"Hit": 85,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			},
			"disableSelfFollowup": true
		},
		"Nohrian_Blade": {
			"key": "Nohrian_Blade",
			"name": "Nohrian Blade",
			"description": "Def +3. Tempered with Nohrian steel.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "D",
			"Mt": 5,
			"Hit": 85,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 3},
		},
		"Leos_Iceblade": {
			"key": "Leos_Iceblade",
			"name": "Leo's Iceblade",
			"description": "Magic weapon. After use in combat, user's stats are lowered until end of turn.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "B",
			"Mt": 14,
			"Hit": 85,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1],
			"damageType": "magical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			}
		},
		"Selenas_Blade": {
			"key": "Selenas_Blade",
			"name": "Selena's Blade",
			"description": "",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 7,
			"Hit": 90,
			"Crit": 10,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Laslows_Blade": {
			"key": "Laslows_Blade",
			"name": "Laslow's Blade",
			"description": "Spd +3, Def/Res -3. A nimble weapon.",
			"generalType": "Sword",
			"specificType": "Sword",
			"rank": "C",
			"Mt": 8,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 3, "Def": -3, "Res": -3},
		},


		/** KATANAS */
		"Brass_Katana": {
			"key": "Brass_Katana",
			"name": "Brass Katana",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 4,
			"Hit": 100,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Katana": {
			"key": "Iron_Katana",
			"name": "Iron Katana",
			"description": "Katana weapons grant Spd +1, Def/Res -1.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1}
		},
		"Steel_Katana": {
			"key": "Steel_Katana",
			"name": "Steel Katana",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 9,
			"Hit": 85,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Katana": {
			"key": "Silver_Katana",
			"name": "Silver Katana",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "B",
			"Mt": 12,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Venge_Katana": {
			"key": "Venge_Katana",
			"name": "Venge Katana",
			"description": "Doubles weapon Mt during counterattacks.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "A",
			"Mt": 9,
			"Hit": 90,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}		
		},
		"Iron_Katti": {
			"key": "Iron_Katti",
			"name": "Iron Katti",
			"description": "Katana weapons grant Spd +1, Def/Res -1.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1}
		},
		"Steel_Katti": {
			"key": "Steel_Katti",
			"name": "Steel Katti",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 9,
			"Hit": 85,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Katti": {
			"key": "Silver_Katti",
			"name": "Silver Katti",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "B",
			"Mt": 12,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Kodachi": {
			"key": "Kodachi",
			"name": "Kodachi",
			"description": "Weak to follow-ups (-5 eff. Spd). Cannot crit, trigger offensive skills, or follow up.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 5,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Wakizashi": {
			"key": "Wakizashi",
			"name": "Wakizashi",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "B",
			"Mt": 10,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"otherMods": {"enemyFollowup": 5},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Axe_Splitter": {
			"key": "Axe_Splitter",
			"name": "Axe Splitter",
			"description": "Effective against axes/clubs. Weak against other weapons.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 7,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"effectiveAgainst": ["Axe"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Dual_Katana": {
			"key": "Dual_Katana",
			"name": "Dual Katana",
			"description": "Inverts weapon advantage and doubles its effects.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 8,
			"Hit": 75,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"reaver": true,
		},
		"Practice_Katana": {
			"key": "Practice_Katana",
			"name": "Practice Katana",
			"description": "Spd +5. Light and easy to use.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 6,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 5, "Def": -1, "Res": -1},
		},
		"Spirit_Katana": {
			"key": "Spirit_Katana",
			"name": "Spirit Katana",
			"description": "Def/Res -4. Effective against monsters. Restores 10 HP every turn.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 5,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -4, "Res": -4},
			"effectiveAgainst": ["Monster"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10},
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
			}
		},
		"Hagakure_Blade": {
			"key": "Hagakure_Blade",
			"name": "Hagakure Blade",
			"description": "After use in combat, halves Str until wielder attacks again.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "S",
			"Mt": 18,
			"Hit": 95,
			"Crit": 0,
			"Avo": 20,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Str"))
					userObj.halved = { stat: "Str", status: "active" };
			}
		},
		"Yato": {
			"key": "Yato",
			"name": "Yato",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 8,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Noble_Yato": {
			"key": "Noble_Yato",
			"name": "Noble Yato",
			"description": "Str/Spd +2 when carried. Yato and wielder ennoble one another. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 11,
			"Hit": 85,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Str": 2, "Spd": 2},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Blazing_Yato": {
			"key": "Blazing_Yato",
			"name": "Blazing Yato",
			"description": "Ddg +10. Str/Spd +4 when carried. The blade of salvation. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 16,
			"Hit": 85,
			"Crit": 10,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Str": 4, "Spd": 4},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Grim_Yato": {
			"key": "Grim_Yato",
			"name": "Grim Yato",
			"description": "Def/Res +2 when carried. The Yato having embraced its champion. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 11,
			"Hit": 85,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Def": 2, "Res": 2},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Shadow_Yato": {
			"key": "Shadow_Yato",
			"name": "Shadow Yato",
			"description": "Ddg +10. Def/Res +4 when carried. Nohr's might made steel. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 16,
			"Hit": 85,
			"Crit": 10,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Def": 4, "Res": 4},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Alpha_Yato": {
			"key": "Alpha_Yato",
			"name": "Alpha Yato",
			"description": "+2 to Str/Spd/Def/Res when carried. The awakened Yato. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 11,
			"Hit": 85,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Str": 2, "Spd": 2, "Def": 2, "Res": 2},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Omega_Yato": {
			"key": "Omega_Yato",
			"name": "Omega Yato",
			"description": "Ddg +10. +4 to Str/Spd/Def/Res when carried. The fully realized Fire Emblem. The avatar only.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 16,
			"Hit": 85,
			"Crit": 10,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Str": 4, "Spd": 4, "Def": 4, "Res": 4},
			"usableBy": function(userObj) {
				return userObj.unitKey.indexOf("Avatar") === 0;
			},
		},
		"Raijinto": {
			"key": "Raijinto",
			"name": "Raijinto",
			"description": "Ryoma only. Str +4 when carried. A divine weapon.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 11,
			"Hit": 80,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"possessionMods": {"Str": 4},
			"usableBy": function(userObj) {
				return userObj.unitKey === "Ryoma";
			},
		},
		"Bottle": {
			"key": "Daikon_Radish",
			"name": "Daikon Radish",
			"description": "Ddg +10. Not the best weapon, but delicious when pickled.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 1,
			"Hit": 110,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
		},
		"Parasol": {
			"key": "Parasol",
			"name": "Parasol",
			"description": "Cannot make follow-up attacks, but makes enemy follow-ups easier (-5 eff. Spd).",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 1,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Raider_Katana": {
			"key": "Raider_Katana",
			"name": "Raider Katana",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "E",
			"Mt": 5,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Sunrise_Katana": {
			"key": "Sunrise_Katana",
			"name": "Sunrise Katana",
			"description": "A defensive blade.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "D",
			"Mt": 3,
			"Hit": 85,
			"Crit": 0,
			"Avo": 20,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
		},
		"Takumis_Shinai": {
			"key": "Takumis_Shinai",
			"name": "Takumi's Shinai",
			"description": "Def/Res -3. Cannot kill foes with >1 HP. Cannot make follow-up attacks.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 2,
			"Hit": 85,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -3, "Res": -3},
			"disableSelfFollowup": true,
			"leaveEnemyAlive": true
		},
		"Hanas_Katana": {
			"key": "Hanas_Katana",
			"name": "Hana's Katana",
			"description": "Doubles weapon Mt during counterattacks. Cannot make follow-up attacks.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "C",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -1, "Res": -1},
			"enemyInitiate": {"Mt": "2x"},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},
		"Hinatas_Katana": {
			"key": "Hinatas_Katana",
			"name": "Hinata's Katana",
			"description": "Def/Res -3. Doubles Mt on attack. User's Str/Skl -2 after combat. Can't follow up.",
			"generalType": "Sword",
			"specificType": "Katana",
			"rank": "B",
			"Mt": 9,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 1, "Def": -3, "Res": -3},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"selfInitiate": {"Mt": "2x"},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},


		/** LANCES */
		"Bronze_Lance": {
			"key": "Bronze_Lance",
			"name": "Bronze Lance",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "E",
			"Mt": 5,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Lance": {
			"key": "Iron_Lance",
			"name": "Iron Lance",
			"description": "A common lance.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 7,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
		},
		"Steel_Lance": {
			"key": "Steel_Lance",
			"name": "Steel Lance",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 10,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Lance": {
			"key": "Silver_Lance",
			"name": "Silver Lance",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "B",
			"Mt": 14,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Brave_Lance": {
			"key": "Brave_Lance",
			"name": "Brave Lance",
			"description": "Def/Res -4. Enables the wielder to strike twice when initiating combat.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "A",
			"Mt": 7,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -4, "Res": -4},
			"brave": true
		},
		"Iron_Javelin": {
			"key": "Iron_Javelin",
			"name": "Iron Javelin",
			"description": "A common lance.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 7,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
		},
		"Steel_Javelin": {
			"key": "Steel_Javelin",
			"name": "Steel Javelin",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 10,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Javelin": {
			"key": "Silver_Javelin",
			"name": "Silver Javelin",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "B",
			"Mt": 14,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Javelin": {
			"key": "Javelin",
			"name": "Javelin",
			"description": "Weak to follow-ups (-5 eff. Spd). Cannot crit, trigger offensive skills, or follow up.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 6,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			},
		},
		"Spear": {
			"key": "Spear",
			"name": "Spear",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "B",
			"Mt": 12,
			"Hit": 65,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"otherMods": {"enemyFollowup": 5},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Beast_Killer": {
			"key": "Beast_Killer",
			"name": "Beast Killer",
			"description": "Effective against beasts. Weak against nonbeast units.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 10,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Beast"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Killer_Lance": {
			"key": "Killer_Lance",
			"name": "Killer Lance",
			"description": "Deals extra damage on critical hits.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 7,
			"Hit": 75,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"critCoeff": 4,
		},
		"Blessed_Lance": {
			"key": "Blessed_Lance",
			"name": "Blessed Lance",
			"description": "Def/Res -3. Effective against monsters. Restores some HP every turn.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 6,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -3, "Res": -3},
			"effectiveAgainst": ["Monster"],
			"effectiveCoeff": 3,
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
			}
		},
		"Broom": {
			"key": "Broom",
			"name": "Broom",
			"description": "Ddg +10. Don't think of it as a broom. It is a spear with a thousand tiny points.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "E",
			"Mt": 2,
			"Hit": 100,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
		},
		"Stick": {
			"key": "Stick",
			"name": "Stick",
			"description": "Skill +3. Suitable for practice.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 5,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Skl": 3},
		},
		"Hexlock_Spear": {
			"key": "Hexlock_Spear",
			"name": "Hexlock Spear",
			"description": "Res +8. A spear destined to pierce a mage's heart.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 1,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Res": 8},
		},
		"Xanders_Lance": {
			"key": "Xanders_Lance",
			"name": "Xander's Lance",
			"description": "Skl/Res +2. Post-combat, Str/Skl -2 and gives nearby foes Str +4. Can't critical.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "B",
			"Mt": 12,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Skl": 2, "Res": 2},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"disableCrit": true,
			"disableProc": true
		},
		"Effies_Lance": {
			"key": "Effies_Lance",
			"name": "Effie's Lance",
			"description": "Weak to follow-up attacks and makes them more difficult to perform (-5 eff. Spd).",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "C",
			"Mt": 16,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 5;
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Peris_Lance": {
			"key": "Peris_Lance",
			"name": "Peri's Lance",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Lance",
			"specificType": "Lance",
			"rank": "D",
			"Mt": 2,
			"Hit": 75,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},

		/** NAGINATAS */
		"Brass_Naginata": {
			"key": "Brass_Naginata",
			"name": "Brass Naginata",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "E",
			"Mt": 4,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Naginata": {
			"key": "Iron_Naginata",
			"name": "Iron Naginata",
			"description": "Naginata weapons grant Def/Res +1.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "D",
			"Mt": 6,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
		},
		"Steel_Naginata": {
			"key": "Steel_Naginata",
			"name": "Steel Naginata",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 9,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Naginata": {
			"key": "Silver_Naginata",
			"name": "Silver Naginata",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "B",
			"Mt": 13,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Venge_Naginata": {
			"key": "Venge_Naginata",
			"name": "Venge Naginata",
			"description": "Doubles weapon Mt during counterattacks.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "A",
			"Mt": 9,
			"Hit": 90,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},
		"Iron_Nageyari": {
			"key": "Iron_Nageyari",
			"name": "Iron Nageyari",
			"description": "Naginata weapons grant Def/Res +1.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "D",
			"Mt": 6,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
		},
		"Steel_Nageyari": {
			"key": "Steel_Nageyari",
			"name": "Steel Nageyari",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 9,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Nageyari": {
			"key": "Silver_Nageyari",
			"name": "Silver Nageyari",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "B",
			"Mt": 13,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Swordcatcher": {
			"key": "Swordcatcher",
			"name": "Swordcatcher",
			"description": "Effective against swords/katana. Weak against other weapons.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "D",
			"Mt": 7,
			"Hit": 65,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"effectiveAgainst": ["Sword"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Dual_Naginata": {
			"key": "Dual_Naginata",
			"name": "Dual Naginata",
			"description": "Inverts weapon advantage and doubles its effects.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 8,
			"Hit": 65,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"reaver": true,
		},
		"Guard_Naginata": {
			"key": "Guard_Naginata",
			"name": "Guard Naginata",
			"description": "Def/Res +5. A guardian's spear.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 5,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 5, "Res": 5},
		},
		"Bolt_Naginata": {
			"key": "Bolt_Naginata",
			"name": "Bolt Naginata",
			"description": "Magic weapon. Cannot make critical hits or trigger offensive skills.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 11,
			"Hit": 70,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Def": 1, "Res": 1},
			"disableCrit": true,
			"disableProc": true,
		},
		"Waterwheel": {
			"key": "Waterwheel",
			"name": "Waterwheel",
			"description": "Def/Res +5, Ddg +20. After use in combat, halves Str until wielder attacks again.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "S",
			"Mt": 19,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 5, "Res": 5},
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Str"))
					userObj.halved = { stat: "Str", status: "active" };
			}
		},
		"Bamboo_Pole": {
			"key": "Bamboo_Pole",
			"name": "Bamboo Pole",
			"description": "Ddg +10. Nature's finest blacksmithing on display.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "E",
			"Mt": 1,
			"Hit": 100,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
		},
		"Pine_Branch": {
			"key": "Pine_Branch",
			"name": "Pine Branch",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "D",
			"Mt": 11,
			"Hit": 55,
			"Crit": 10,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Raider_Naginata": {
			"key": "Raider_Naginata",
			"name": "Raider Naginata",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "E",
			"Mt": 5,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Bold_Naginata": {
			"key": "Bold_Naginata",
			"name": "Bold Naginata",
			"description": "Def/Res -5. Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 15,
			"Hit": 100,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -5, "Res": -5},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Hinokas_Spear": {
			"key": "Hinokas_Spear",
			"name": "Hinoka's Spear",
			"description": "Def/Res -1. A nimble weapon.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "C",
			"Mt": 8,
			"Hit": 75,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -1, "Res": -1},
		},
		"Subakis_Pike": {
			"key": "Subakis_Pike",
			"name": "Subaki's Pike",
			"description": "Doubles Mt when wielder's Skill is higher than the enemy's.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "D",
			"Mt": 4,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentStats.Skl > enemyObj.currentStats.Skl && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},
		"Oboros_Spear": {
			"key": "Oboros_Spear",
			"name": "Oboro's Spear",
			"description": "Makes follow-up attacks more difficult (-3 eff. Spd). Str/Skl -2 after use in combat.",
			"generalType": "Lance",
			"specificType": "Naginata",
			"rank": "B",
			"Mt": 14,
			"Hit": 75,
			"Crit": 10,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 1, "Res": 1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},




		/** AXES */

		"Bronze_Axe": {
			"key": "Bronze_Axe",
			"name": "Bronze Axe",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "E",
			"Mt": 6,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Axe": {
			"key": "Iron_Axe",
			"name": "Iron Axe",
			"description": "A common axe.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 8,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
		},
		"Steel_Axe": {
			"key": "Steel_Axe",
			"name": "Steel Axe",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 12,
			"Hit": 65,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Axe": {
			"key": "Silver_Axe",
			"name": "Silver Axe",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "B",
			"Mt": 16,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Brave_Axe": {
			"key": "Brave_Axe",
			"name": "Brave Axe",
			"description": "Def/Res -4. Enables the wielder to strike twice when initiating combat.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "A",
			"Mt": 8,
			"Hit": 55,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": -4, "Res": -4},
			"brave": true
		},
		"Iron_Star_Axe": {
			"key": "Iron_Star_Axe",
			"name": "Iron Star Axe",
			"description": "A common axe.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 8,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
		},
		"Steel_Star_Axe": {
			"key": "Steel_Star_Axe",
			"name": "Steel Star Axe",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 12,
			"Hit": 65,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Star_Axe": {
			"key": "Silver_Star_Axe",
			"name": "Silver Star Axe",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "B",
			"Mt": 16,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Hand_Axe": {
			"key": "Hand_Axe",
			"name": "Hand Axe",
			"description": "Weak to follow-ups (-5 eff. Spd). Cannot crit, trigger offensive skills, or follow up.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 7,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Tomahawk": {
			"key": "Tomahawk",
			"name": "Tomahawk",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "B",
			"Mt": 14,
			"Hit": 55,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"otherMods": {"enemyFollowup": 5},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Hammer": {
			"key": "Hammer",
			"name": "Hammer",
			"description": "Effective against armored units. Weak against other units.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 12,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Armor"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Bolt_Axe": {
			"key": "Bolt_Axe",
			"name": "Bolt Axe",
			"description": "Magic weapon. Cannot make critical hits or trigger offensive skills.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 11,
			"Hit": 80,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Killer_Axe": {
			"key": "Killer_Axe",
			"name": "Killer Axe",
			"description": "Deals extra damage on critical hits.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 8,
			"Hit": 65,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"critCoeff": 4,
		},
		"Aurgelmir": {
			"key": "Aurgelmir",
			"name": "Aurgelmir",
			"description": "After use in combat, halves Str until wielder attacks again.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "S",
			"Mt": 22,
			"Hit": 75,
			"Crit": 15,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Str"))
					userObj.halved = { stat: "Str", status: "active" };
			}
		},
		"Bolverk": {
			"key": "Bolverk",
			"name": "Bölverk",
			"description": "Ddg +20. Garon only. An elegant but cruel weapon.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "S",
			"Mt": 21,
			"Hit": 90,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 20,
			"range": [1, 2, 3],
			"damageType": "physical",
			"usableBy": function(userObj) {
				return userObj.unitKey === "Garon";
			},
		},
		"Frying_Pan": {
			"key": "Frying_Pan",
			"name": "Frying Pan",
			"description": "Ddg +10. Heavy and hard to wield, but cast iron, so you don't really need to clean it.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "E",
			"Mt": 3,
			"Hit": 90,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
		},
		"Bone_Axe": {
			"key": "Bone_Axe",
			"name": "Bone Axe",
			"description": "Res +3. Sometimes the old ways are best.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 9,
			"Hit": 60,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Res": 3},
		},
		"Raider_Axe": {
			"key": "Raider_Axe",
			"name": "Raider Axe",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "E",
			"Mt": 7,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Berserkers_Axe": {
			"key": "Berserkers_Axe",
			"name": "Berserker's Axe",
			"description": "Lowers wielder's HP by 30% of max after use in combat.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 17,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].afterCombatSelfDamage 
					= (combatObj[userObj.role + userObj.id].afterCombatSelfDamage || 0)
					+ (userObj.maxHP * 0.30);
			}
		},
		"Camillas_Axe": {
			"key": "Camillas_Axe",
			"name": "Camilla's Axe",
			"description": "Female units only. Res +2. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "B",
			"Mt": 12,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"usableBy": function(userObj) {
				return userObj.charObj.gender === "F";
			},
		},
		"Arthurs_Axe": {
			"key": "Arthurs_Axe",
			"name": "Arthur's Axe",
			"description": "Male units only. Def +2. An axe for smiting evildoers.",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "D",
			"Mt": 10,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 2},
			"usableBy": function(userObj) {
				return userObj.charObj.gender === "M";
			},
		},
		"Berukas_Axe": {
			"key": "Berukas_Axe",
			"name": "Beruka's Axe",
			"description": "Ddg -20. Deals extra damage on critical. Weak to follow-up attacks (-5 eff. Spd).",
			"generalType": "Axe",
			"specificType": "Axe",
			"rank": "C",
			"Mt": 13,
			"Hit": 60,
			"Crit": 30,
			"Avo": 0,
			"Ddg": -20,
			"range": [1],
			"damageType": "physical",
			"critCoeff": 4,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},


		/** CLUBS */
		"Brass_Club": {
			"key": "Brass_Club",
			"name": "Brass Club",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "E",
			"Mt": 7,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Club": {
			"key": "Iron_Club",
			"name": "Iron Club",
			"description": "Club weapons have a greater chance to inflict a critical hit.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "E",
			"Mt": 6,
			"Hit": 75,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
		},
		"Steel_Club": {
			"key": "Steel_Club",
			"name": "Steel Club",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 19,
			"Hit": 70,
			"Crit": 5,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Club": {
			"key": "Silver_Club",
			"name": "Silver Club",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "B",
			"Mt": 14,
			"Hit": 75,
			"Crit": 5,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Venge_Club": {
			"key": "Venge_Club",
			"name": "Venge Club",
			"description": "Doubles weapon Mt during counterattacks.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "A",
			"Mt": 10,
			"Hit": 75,
			"Crit": 5,
			"Avo": -20,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}				
		},
		"Iron_Mace": {
			"key": "Iron_Mace",
			"name": "Iron Mace",
			"description": "Club weapons have a greater chance to inflict a critical hit.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "E",
			"Mt": 6,
			"Hit": 75,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
		},
		"Steel_Mace": {
			"key": "Steel_Mace",
			"name": "Steel Mace",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 19,
			"Hit": 70,
			"Crit": 5,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Mace": {
			"key": "Silver_Mace",
			"name": "Silver Mace",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "B",
			"Mt": 14,
			"Hit": 75,
			"Crit": 5,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Throwing_Club": {
			"key": "Throwing_Club",
			"name": "Throwing Club",
			"description": "Weak to follow-ups (-5 eff. Spd). Cannot crit, trigger offensive skills, or follow up.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "D",
			"Mt": 6,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Battering_Club": {
			"key": "Battering_Club",
			"name": "Battering Club",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "B",
			"Mt": 12,
			"Hit": 60,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Pike-Ruin_Club": {
			"key": "Pike-Ruin_Club",
			"name": "Pike-Ruin Club",
			"description": "Effective against lances/naginatas. Weak against other weapons.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "D",
			"Mt": 10,
			"Hit": 60,
			"Crit": 5,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Lance"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Dual_Club": {
			"key": "Dual_Club",
			"name": "Dual Club",
			"description": "Inverts weapon advantage and doubles its effects.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 9,
			"Hit": 60,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"reaver": true,
		},
		"Great_Club": {
			"key": "Great_Club",
			"name": "Great Club",
			"description": "Ddg -5. Deals extra damage on critical hits and scores a lot of them.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 6,
			"Hit": 45,
			"Crit": 55,
			"Avo": -5,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"critCoeff": 4,
		},
		"Carp_Streamer": {
			"key": "Carp_Streamer",
			"name": "Carp Streamer",
			"description": "Ddg +10. Not great in a fight, but very festive.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "E",
			"Mt": 1,
			"Hit": 95,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
		},
		"Hoe": {
			"key": "Hoe",
			"name": "Hoe",
			"description": "Ignores user and enemy's terrain effects.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "D",
			"Mt": 5,
			"Hit": 70,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"ignoreTerrain": true
		},
		"Adamant_Club": {
			"key": "Adamant_Club",
			"name": "Adamant Club",
			"description": "Def +4. An enduring weapon.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 3,
			"Hit": 80,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Def": 4},
		},
		"Rinkahs_Club": {
			"key": "Rinkahs_Club",
			"name": "Rinkah's Club",
			"description": "Ddg -5. Makes follow-up attacks more difficult to perform (-3 eff. Spd).",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "C",
			"Mt": 8,
			"Hit": 75,
			"Crit": 15,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Ryomas_Club": {
			"key": "Ryomas_Club",
			"name": "Ryoma's Club",
			"description": "Spd -5. An awkward but powerful weapon.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "D",
			"Mt": 16,
			"Hit": 55,
			"Crit": 15,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": -5},
		},
		"Fugas_Club": {
			"key": "Fugas_Club",
			"name": "Fuga's Club",
			"description": "Spd +3, Def/Res -3. Lowers Str/Skl -2 ater use in combat.",
			"generalType": "Axe",
			"specificType": "Club",
			"rank": "B",
			"Mt": 13,
			"Hit": 80,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Spd": 3, "Def": -3, "Res": -3},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},


		/** DAGGERS */
		"Bronze_Dagger": {
			"key": "Bronze_Dagger",
			"name": "Bronze Dagger",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills. <br/>Stat Drop (Skl -1, Spd -1, Def -2, Res -2)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "E",
			"Mt": 2,
			"Hit": 100,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -1, "Spd": -1, "Def": -2, "Res": -2};
				}
			},
		},
		"Iron_Dagger": {
			"key": "Iron_Dagger",
			"name": "Iron Dagger",
			"description": "Dagger weapons lower enemy stats on a hit (stats recover at a rate of 1/turn). <br/>Stat Drop (Mag -2, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "D",
			"Mt": 4,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Mag": -2, "Def": -3, "Res": -3};
				}
			},
		},
		"Steel_Dagger": {
			"key": "Steel_Dagger",
			"name": "Steel Dagger",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd). <br/>Stat Drop (Str -3, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "C",
			"Mt": 7,
			"Hit": 85,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -3, "Def": -4, "Res": -4};
				}
			},
		},
		"Silver_Dagger": {
			"key": "Silver_Dagger",
			"name": "Silver Dagger",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn). <br/>Stat Drop (Spd -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "B",
			"Mt": 10,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2};
				}
			},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Spd": -4, "Def": -4, "Res": -4};
				}
			}
		},
		"Soldiers_Knife": {
			"key": "Soldiers_Knife",
			"name": "Soldier's Knife",
			"description": "Strikes twice when attacking. After use in combat, halves Str until unit attacks again. <br/>Stat Drop (Str -2, Mag -2, Skl -2, Spd -2, Lck -2, Def -5, Res -5)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "A",
			"Mt": 4,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -2, "Mag": -2, "Skl": -2, "Spd": -2, "Lck": -2, "Def": -5, "Res": -5};
				}
			},
			"brave": true,
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Str"))
					userObj.halved = { stat: "Str", status: "active" };
			}
		},
		"Fruit_Knife": {
			"key": "Fruit_Knife",
			"name": "Fruit Knife",
			"description": "When equipped, use to restore 10 HP to the wielder. <br/>Stat Drop (Skl -2, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "D",
			"Mt": 4,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -2, "Def": -3, "Res": -3};
				}
			},

		},
		"Hunters_Knife": {
			"key": "Hunters_Knife",
			"name": "Hunter's Knife",
			"description": "Effective against beasts. Weak against nonbeast units. <br/>Stat Drop (Lck -2, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "D",
			"Mt": 7,
			"Hit": 95,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Lck": -2, "Def": -3, "Res": -3};
				}
			},
			"effectiveAgainst": ["Beast"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Kris_Knife": {
			"key": "Kris_Knife",
			"name": "Kris Knife",
			"description": "Def/Res -3. Effective against monsters. Restores some HP every turn. <br/>Stat Drop (Mag -3, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "C",
			"Mt": 3,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Def": -3, "Res": -3},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Mag": -3, "Def": -4, "Res": -4};
				}
			},
			"effectiveAgainst": ["Monster"],
			"effectiveCoeff": 3,
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
			}
		},
		"Quill_Pen": {
			"key": "Quill_Pen",
			"name": "Quill Pen",
			"description": "Ddg +10. <br/>Stat Drop (Def -1, Res -1)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "E",
			"Mt": 1,
			"Hit": 110,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Def": -1, "Res": -1};
				}
			},
		},
		"Stale_Bread": {
			"key": "Stale_Bread",
			"name": "Stale Bread",
			"description": "Restores 20% of wielder's max HP after combat he or she initiated. <br/>Stat Drop (Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "D",
			"Mt": 3,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Def": -3, "Res": -3};
				}
			},
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].afterCombatHeal 
						= (combatObj[userObj.role + userObj.id].afterCombatHeal || 0)
						+ (userObj.maxHP * 0.20);
				}
			}

		},
		"Raider_Knife": {
			"key": "Raider_Knife",
			"name": "Raider Knife",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor. <br/>Stat Drop (Lck -2, Def -2, Res -2)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "E",
			"Mt": 3,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Lck": -2, "Def": -2, "Res": -2};
				}
			},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Votive_Candle": {
			"key": "Votive_Candle",
			"name": "Votive Candle",
			"description": "When equipped, survive lethal attacks if HP > 1. Trigger % = (Lck stat) <br/>Stat Drop (Str -1, Mag -1, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "D",
			"Mt": 5,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -1, "Mag": -1, "Def": -3, "Res": -3};
				}
			},
			"grantsSkill": "Miracle"
		},
		"Sacrificial_Knife": {
			"key": "Sacrificial_Knife",
			"name": "Sacrificial Knife",
			"description": "Lowers wielder's HP by 30% of max after use in combat. <br/>Stat Drop (Lck -8, Def -5, Res -5)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "C",
			"Mt": 11,
			"Hit": 110,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Lck": -8, "Def": -5, "Res": -5};
				}
			},
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].afterCombatSelfDamage 
					= (combatObj[userObj.role + userObj.id].afterCombatSelfDamage || 0)
					+ (userObj.maxHP * 0.30);
			}
		},
		"Felicias_Plate": {
			"key": "Felicias_Plate",
			"name": "Felicia's Plate",
			"description": "Magic weapon. <br/>Stat Drop (Str -3, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "C",
			"Mt": 4,
			"Hit": 85,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -3, "Def": -4, "Res": -4};
				}
			},
		},
		"Jakobs_Tray": {
			"key": "Jakobs_Tray",
			"name": "Jakob's Tray",
			"description": "After use in combat, wielder suffers Str/Skl -2 (recover 1/turn). <br/>Stat Drop (Skl -4, Lck -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "C",
			"Mt": 8,
			"Hit": 100,
			"Crit": 5,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -4, "Lck": -4, "Def": -4, "Res": -4};
				}
			},
		},
		"Pebble": {
			"key": "Pebble",
			"name": "Pebble",
			"description": "Cannot inflict criticals or trigger offensive skills. Cannot make follow-up attacks.<br/>Stat Drop (Str -4, Spd -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Dagger",
			"rank": "E",
			"Mt": 1,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -4, "Spd": -4, "Def": -4, "Res": -4};
				}
			},
		},


		/** SHURIKENS */
		"Brass_Shuriken": {
			"key": "Brass_Shuriken",
			"name": "Brass Shuriken",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills. <br/>Stat Drop (Skl -1, Spd -1, Def -2, Res -2)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "E",
			"Mt": 2,
			"Hit": 95,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -1, "Spd": -1, "Def": -2, "Res": -2};
				}
			},
		},
		"Iron_Shuriken": {
			"key": "Iron_Shuriken",
			"name": "Iron Shuriken",
			"description": "Shuriken weapons grant Spd +2 and lower enemy stats on a hit (stats recover at a rate of 1/turn). <br/>Stat Drop (Mag -2, Def -3, Res -3)",
			"generalType": "Shuriken",
			"specificType": "Shuriken",
			"rank": "D",
			"Mt": 4,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Mag": -2, "Def": -3, "Res": -3};
				}
			},
		},
		"Steel_Shuriken": {
			"key": "Steel_Shuriken",
			"name": "Steel Shuriken",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd). <br/>Stat Drop (Str -3, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 7,
			"Hit": 80,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -3, "Def": -4, "Res": -4};
				}
			},
		},
		"Silver_Shuriken": {
			"key": "Silver_Shuriken",
			"name": "Silver Shuriken",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn). <br/>Stat Drop (Spd -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "B",
			"Mt": 10,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Spd": -4, "Def": -4, "Res": -4};
				}
			},
		},
		"Spys_Shuriken": {
			"key": "Spys_Shuriken",
			"name": "Spy's Shuriken",
			"description": "Cannot perform follow-up attacks. <br/>Stat Drop (Str -2, Mag -2, Skl -2, Spd -2, Lck -2, Def -5, Res -5)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "A",
			"Mt": 1,
			"Hit": 70,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [3],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -2, "Mag": -2, "Skl": -2, "Spd": -2, "Lck": -2, "Def": -5, "Res": -5};
				}
			},
		},
		"Dual_Shuriken": {
			"key": "Dual_Shuriken",
			"name": "Dual Shuriken",
			"description": "Inverts weapon advantage and doubles its effects. <br/>Stat Drop (Str -2, Mag -2, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 6,
			"Hit": 70,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -2, "Mag": -2, "Def": -4, "Res": -4};
				}
			},
			"reaver": true,
		},
		"Sting_Shuriken": {
			"key": "Sting_Shuriken",
			"name": "Sting Shuriken",
			"description": "Effective against armored units. Weak against other units. <br/>Stat Drop (Skl -3, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "D",
			"Mt": 7,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -3, "Def": -3, "Res": -3};
				}
			},
			"effectiveAgainst": ["Armor"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Barb_Shuriken": {
			"key": "Barb_Shuriken",
			"name": "Barb Shuriken",
			"description": "Deals extra damage on critical hits. <br/>Stat Drop (Lck -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 4,
			"Hit": 80,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Lck": -4, "Def": -4, "Res": -4};
				}
			},
			"critCoeff": 4,
		},
		"Flame_Shuriken": {
			"key": "Flame_Shuriken",
			"name": "Flame Shuriken",
			"description": "Magic weapon. Cannot make critical hits or trigger offensive skills. <br/>Stat Drop (Mag -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 9,
			"Hit": 75,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 2},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Mag": -4, "Def": -4, "Res": -4};
				}
			},
			"disableCrit": true,
			"disableProc": true,
		},
		"Chakram": {
			"key": "Chakram",
			"name": "Chakram",
			"description": "Def/Res -5. Good for follow-up attacks, but also weak to them (+5/-5 eff. Spd). <br/>Stat Drop (Str -6, Mag -6, Def -6, Res -6)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "S",
			"Mt": 11,
			"Hit": 95,
			"Crit": 10,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Spd": 2, "Def": -5, "Res": -5},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -6, "Mag": -6, "Def": -6, "Res": -6};
				}
			},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 5;
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Chopstick": {
			"key": "Chopstick",
			"name": "Chopstick",
			"description": "Ddg +10. Better on the table than the battlefield. <br/>Stat Drop (Def -1, Res -1)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "E",
			"Mt": 1,
			"Hit": 105,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1, 2],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Def": -1, "Res": -1};
				}
			},
		},
		"Hair_Pin": {
			"key": "Hair_Pin",
			"name": "Hair Pin",
			"description": "Female units only. <br/>Stat Drop (Str -2, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "D",
			"Mt": 5,
			"Hit": 80,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 0,
			"range": [1, 2],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -2, "Def": -3, "Res": -3};
				}
			},
			"usableBy": function(userObj) {
				return userObj.charObj.gender === "F";
			},
		},
		"Caltrop": {
			"key": "Caltrop",
			"name": "Caltrop",
			"description": "After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn). <br/>Stat Drop (Spd -8, Def -8, Res -8)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "B",
			"Mt": 5,
			"Hit": 95,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Spd": -8, "Def": -8, "Res": -8};
				}
			},
		},
		"Kazes_Needle": {
			"key": "Kazes_Needle",
			"name": "Kaze's Needle",
			"description": "After attacking, grants allies within two spaces Spd +4 for one turn. <br/>Stat Drop (Spd -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 3,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Spd": -4, "Def": -4, "Res": -4};
				}
			},
		},
		"Saizos_Star": {
			"key": "Saizos_Star",
			"name": "Saizo's Star",
			"description": "After attacking, grants allies within two spaces Str +4 for one turn. <br/>Stat Drop (Str -4, Def -4, Res -4)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "C",
			"Mt": 3,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -4, "Def": -4, "Res": -4};
				}
			},
		},
		"Kageros_Dart": {
			"key": "Kageros_Dart",
			"name": "Kagero's Dart",
			"description": "A blinding weapon. <br/>Stat Drop (Skl -5, Def -3, Res -3)",
			"generalType": "Dagger",
			"specificType": "Shuriken",
			"rank": "D",
			"Mt": 1,
			"Hit": 80,
			"Crit": 0,
			"Avo": 20,
			"Ddg": 0,
			"range": [1, 2],
			"statMods": {"Spd": 2},
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -5, "Def": -3, "Res": -3};
				}
			},
		},



		/** BOWS */
		"Bronze_Bow": {
			"key": "Bronze_Bow",
			"name": "Bronze Bow",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "E",
			"Mt": 6,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"disableCrit": true,
			"disableProc": true,
		},
		"Iron_Bow": {
			"key": "Iron_Bow",
			"name": "Iron Bow",
			"description": "A common bow.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "D",
			"Mt": 8,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Steel_Bow": {
			"key": "Steel_Bow",
			"name": "Steel Bow",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 11,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Bow": {
			"key": "Silver_Bow",
			"name": "Silver Bow",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "B",
			"Mt": 15,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Crescent_Bow": {
			"key": "Crescent_Bow",
			"name": "Crescent Bow",
			"description": "Strikes twice when attacking. After use in combat, halves Str until unit attacks again.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "A",
			"Mt": 8,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"brave": true,
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Str"))
					userObj.halved = { stat: "Str", status: "active" };
			}
		},
		"Iron_Shortbow": {
			"key": "Iron_Shortbow",
			"name": "Iron Shortbow",
			"description": "A common bow.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "D",
			"Mt": 8,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Steel_Shortbow": {
			"key": "Steel_Shortbow",
			"name": "Steel Shortbow",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 11,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Shortbow": {
			"key": "Silver_Shortbow",
			"name": "Silver Shortbow",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "B",
			"Mt": 15,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Mini_Bow": {
			"key": "Mini_Bow",
			"name": "Mini Bow",
			"description": "A powerful bow with a short range.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "D",
			"Mt": 7,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Killer_Bow": {
			"key": "Killer_Bow",
			"name": "Killer Bow",
			"description": "Deals extra damage on critical hits.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "E",
			"Mt": 7,
			"Hit": 75,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"critCoeff": 4,
		},
		"Blessed_Bow": {
			"key": "Blessed_Bow",
			"name": "Blessed Bow",
			"description": "Def/Res -3. Effective against monsters. Restores some HP every turn.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 7,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -3, "Res": -3},
			"effectiveAgainst": ["Flying", "Monster"],
			"effectiveCoeff": 3,
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
			}
		},
		"Shining_Bow": {
			"key": "Shining_Bow",
			"name": "Shining Bow",
			"description": "Magic weapon. Cannot make critical hits or trigger offensive skills.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 13,
			"Hit": 70,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"disableCrit": true,
			"disableProc": true,
		},
		"Rubber_Bow": {
			"key": "Rubber_Bow",
			"name": "Rubber Bow",
			"description": "Ddg +10. Someone's idea of a battlefield prank?",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "E",
			"Mt": 3,
			"Hit": 100,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Violin_Bow": {
			"key": "Violin_Bow",
			"name": "Violin Bow",
			"description": "After attacking, grants allies within two spaces Skl +4 for one turn.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "D",
			"Mt": 6,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Cupid_Bow": {
			"key": "Cupid_Bow",
			"name": "Cupid Bow",
			"description": "After use in combat, restores 20% of enemy's max HP.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "E",
			"Mt": 1,
			"Hit": 100,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon && combatObj[userObj.role + userObj.id].successfulHit) {
					combatObj[userObj.role + userObj.id].afterCombatHeal 
						= (combatObj[userObj.role + userObj.id].afterCombatHeal || 0)
						+ (enemyObj.maxHP * 0.20);
				}
			}
		},
		"Hunters_Bow": {
			"key": "Hunters_Bow",
			"name": "Hunter's Bow",
			"description": "Effective against beasts. Weak against nonbeast units.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 6,
			"Hit": 85,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"effectiveAgainst": ["Beast"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10}
		},
		"Annas_Bow": {
			"key": "Annas_Bow",
			"name": "Anna's Bow",
			"description": "Lck +5. Str/Skl -2 after use in combat. Fortune favors the bowed.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "B",
			"Mt": 8,
			"Hit": 120,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Lck": 5},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Niless_Bow": {
			"key": "Niless_Bow",
			"name": "Niles's Bow",
			"description": "Def/Res -2. Cannot kill foes with >1 HP. Cannot make follow-up attacks.",
			"generalType": "Bow",
			"specificType": "Bow",
			"rank": "C",
			"Mt": 4,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -2, "Res": -2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"disableSelfFollowup": true,
			"leaveEnemyAlive": true
		},


		/** YUMI */

		"Brass_Yumi": {
			"key": "Brass_Yumi",
			"name": "Brass Yumi",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "E",
			"Mt": 7,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"disableCrit": true,
			"disableProc": true,
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Iron_Yumi": {
			"key": "Iron_Yumi",
			"name": "Iron Yumi",
			"description": "Yumi weapons grant Res +2.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "D",
			"Mt": 9,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Steel_Yumi": {
			"key": "Steel_Yumi",
			"name": "Steel Yumi",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 12,
			"Hit": 65,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Yumi": {
			"key": "Silver_Yumi",
			"name": "Silver Yumi",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "B",
			"Mt": 16,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Spys_Yumi": {
			"key": "Spys_Yumi",
			"name": "Spy's Yumi",
			"description": "Cannot perform follow-up attacks.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "A",
			"Mt": 5,
			"Hit": 55,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [3],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"disableSelfFollowup": true,
		},
		"Iron_Hankyu": {
			"key": "Iron_Hankyu",
			"name": "Iron Hankyu",
			"description": "Yumi weapons grant Res +2.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "D",
			"Mt": 9,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Steel_Hankyu": {
			"key": "Steel_Hankyu",
			"name": "Steel Hankyu",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 12,
			"Hit": 65,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Silver_Hankyu": {
			"key": "Silver_Hankyu",
			"name": "Silver Hankyu",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "B",
			"Mt": 16,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			}
		},
		"Dual_Yumi": {
			"key": "Dual_Yumi",
			"name": "Dual Yumi",
			"description": "Inverts weapon advantage and doubles its effects.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 11,
			"Hit": 55,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"reaver": true,
		},
		"Illusory_Yumi": {
			"key": "Illusory_Yumi",
			"name": "Illusory Yumi",
			"description": "Res +10. A bow strung with magic.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 8,
			"Hit": 65,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 10},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Surefire_Yumi": {
			"key": "Surefire_Yumi",
			"name": "Surefire Yumi",
			"description": "Def -4, Res -2. An accurate bow that you have to hold still to use well.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "B",
			"Mt": 10,
			"Hit": 120,
			"Crit": 0,
			"Avo": -30,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -4, "Res": -2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Pursuer": {
			"key": "Pursuer",
			"name": "Pursuer",
			"description": "Def/Res -5. Good for follow-up attacks, but also weak to them (+5/-5 eff. Spd).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "S",
			"Mt": 22,
			"Hit": 80,
			"Crit": 10,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -5, "Res": -5},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 5;
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Fujin_Yumi": {
			"key": "Fujin_Yumi",
			"name": "Fujin Yumi",
			"description": "Takumi only. Wielder is not slowed by terrain effects.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "E",
			"Mt": 14,
			"Hit": 70,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"usableBy": function(userObj) {
				return userObj.unitKey === "Takumi";
			},
		},
		"Skadi": {
			"key": "Skadi",
			"name": "Skadi",
			"description": "",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "S",
			"Mt": 15,
			"Hit": 95,
			"Crit": -10,
			"Avo": 0,
			"Ddg": 20,
			"range": [1, 2, 3, 4],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Bamboo_Yumi": {
			"key": "Bamboo_Yumi",
			"name": "Bamboo Yumi",
			"description": "Ddg +10. Perhaps the final project in a bow-making class?",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "E",
			"Mt": 4,
			"Hit": 90,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Harp_Yumi": {
			"key": "Harp_Yumi",
			"name": "Harp Yumi",
			"description": "After attacking, grants allies within two spaces Res +4 for one turn.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "D",
			"Mt": 6,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
		},
		"Raider_Yumi": {
			"key": "Raider_Yumi",
			"name": "Raider Yumi",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "E",
			"Mt": 6,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Spellbane_Yumi": {
			"key": "Spellbane_Yumi",
			"name": "Spellbane Yumi",
			"description": "Def -4. Effective against tomes/scrolls. Weak against other weapons.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 5,
			"Hit": 60,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -4, "Res": 2},
			"effectiveAgainst": ["Flying", "Tome"],
			"effectiveCoeff": 3,
			"ineffectiveMods": {"Mt": -4,  "Hit": -10},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Sidelong_Yumi": {
			"key": "Sidelong_Yumi",
			"name": "Sidelong Yumi",
			"description": "Weak to follow-up attacks (-5 eff. Spd). Cannot make follow-up attacks.",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "C",
			"Mt": 3,
			"Hit": 65,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			},
		},
		"Mikotos_Yumi": {
			"key": "Mikotos_Yumi",
			"name": "Mikoto's Yumi",
			"description": "Def -2. Restores HP every turn. Str/Skl -2 after use in combat (recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "B",
			"Mt": 13,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Def": -2, "Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
			}
		},
		"Setsunas_Yumi": {
			"key": "Setsunas_Yumi",
			"name": "Setsuna's Yumi",
			"description": "On a hit, target suffers Skl/Def/Res -4 (each stat recovers 1/turn).",
			"generalType": "Bow",
			"specificType": "Yumi",
			"rank": "D",
			"Mt": 7,
			"Hit": 55,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [2],
			"damageType": "physical",
			"statMods": {"Res": 2},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Skl": -4, "Def": -4, "Res": -4};
				}
			},
		},


		/** TOMES */
		"Fire": {
			"key": "Fire",
			"name": "Fire",
			"description": "Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "E",
			"Mt": 3,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "magical",
			"disableCrit": true,
			"disableProc": true,
		},
		"Thunder": {
			"key": "Thunder",
			"name": "Thunder",
			"description": "A common combat spell.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "D",
			"Mt": 5,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
		},
		"Fimbulvetr": {
			"key": "Fimbulvetr",
			"name": "Fimbulvetr",
			"description": "Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "C",
			"Mt": 8,
			"Hit": 75,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Ragnarok": {
			"key": "Ragnarok",
			"name": "Ragnarok",
			"description": "Ddg -5. After use in combat, wielder suffers Str/Skl -2 (recovers 1/turn).",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "B",
			"Mt": 11,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "magical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			}
		},
		"Ginnungagap": {
			"key": "Ginnungagap",
			"name": "Ginnungagap",
			"description": "After use in combat, halves Mag until wielder attacks again.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "A",
			"Mt": 15,
			"Hit": 65,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Mag"))
					userObj.halved = { stat: "Mag", status: "active" };
			}
		},
		"Lightning": {
			"key": "Lightning",
			"name": "Lightning",
			"description": "Strikes twice when attacking. After use in combat, Mag/Skl -2 (recovers 1/turn).",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "C",
			"Mt": 1,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			},
			"brave": true
		},
		"Mjolnir": {
			"key": "Mjolnir",
			"name": "Mjölnir",
			"description": "Deals extra damage on critical hits.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "C",
			"Mt": 5,
			"Hit": 75,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"critCoeff": 4,
		},
		"Nosferatu": {
			"key": "Nosferatu",
			"name": "Nosferatu",
			"description": "Dark mages only. Absorbs target's HP. Can't crit, trigger off. skills, or follow up.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "D",
			"Mt": 7,
			"Hit": 70,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"usableBy": function(userObj) {
				if (['Dark_Mage', 'Sorcerer'].indexOf(userObj.classKey) > -1)
					return true;
				var hasShadowgift = userObj.skills.filter(function(skillObj) {
					return skillObj.key === "Shadowgift";
				}).length;
				if (hasShadowgift) return true;
				return false;
			},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!combatObj[userObj.role + userObj.id].healFns) combatObj[userObj.role + userObj.id].healFns = [];

				var healFn = function(damage) {
					var dealtDamage = Math.min(damage, enemyObj.currentHP);
					combatObj[userObj.role + userObj.id].heal += (dealtDamage / 2);
				};

				if (combatObj[userObj.role + userObj.id].healFns.indexOf(healFn) === -1) {
					combatObj[userObj.role + userObj.id].healFns.push(healFn);
				}
			}
		},
		"Excalibur": {
			"key": "Excalibur",
			"name": "Excalibur",
			"description": "Def/Res -5. Eff. vs. fliers. Good for but also weak to follow-ups (+5/-5 eff. Spd).",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "S",
			"Mt": 12,
			"Hit": 90,
			"Crit": 25,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Def": -5, "Res": -5},
			"effectiveAgainst": ["Flying"],
			"effectiveCoeff": 3,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 5;
				combatObj[userObj.role + userObj.id].defAtkSpd -= 5;
			}
		},
		"Brynhildr": {
			"key": "Brynhildr",
			"name": "Brynhildr",
			"description": "Leo only. May halve damage from magical attacks. Trigger % = (Skl stat)",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "E",
			"Mt": 10,
			"Hit": 80,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "magical",
			"usableBy": function(userObj) {
				return userObj.unitKey === "Leo";
			},
			"defensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped.damageType === "magical") {
					combatObj[enemyObj.role + enemyObj.id].damage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
					return true;
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 4
		},
		"Ember": {
			"key": "Ember",
			"name": "Ember",
			"description": "Ddg +10. A cantrip learned by beginning mages.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "E",
			"Mt": 1,
			"Hit": 100,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "magical",
		},
		"Missiletainn": {
			"key": "Missiletainn",
			"name": "Missiletainn",
			"description": "Ophelia only. Skl/Res +1. Not a sword.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "E",
			"Mt": 9,
			"Hit": 70,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1, "Res": 1},
			"usableBy": function(userObj) {
				return userObj.unitKey === "Ophelia";
			},
		},
		"Disrobing_Gale": {
			"key": "Disrobing_Gale",
			"name": "Disrobing Gale",
			"description": "Good for follow-up attacks (+3 eff. Spd). With weapon advantage, strips foe's armor.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "E",
			"Mt": 4,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd += 3;
			}
		},
		"Speed_Thunder": {
			"key": "Speed_Thunder",
			"name": "Speed Thunder",
			"description": "Enemies within two spaces receive Spd +4 after use in combat.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "C",
			"Mt": 9,
			"Hit": 70,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
		},
		"Moonlight": {
			"key": "Moonlight",
			"name": "Moonlight",
			"description": "Restores 20% of wielder's maximum HP after combat he or she initiated.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "D",
			"Mt": 4,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].afterCombatHeal 
						= (combatObj[userObj.role + userObj.id].afterCombatHeal || 0)
						+ (userObj.maxHP * 0.20);
				}
			}
		},
		"Iagos_Tome": {
			"key": "Iagos_Tome",
			"name": "Iago's Tome",
			"description": "Wielder suffers Mag/Skl -2 after use in combat. Target suffers Def/Res -4 on hit.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "B",
			"Mt": 7,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Def": -4, "Res": -4};
				}
			},

		},
		"Odins_Grimoire": {
			"key": "Odins_Grimoire",
			"name": "Odin's Grimoire",
			"description": "Ddg -20. Deals extra damage on critical hit. Cannot make follow-up attacks.",
			"generalType": "Tome",
			"specificType": "Tome",
			"rank": "B",
			"Mt": 9,
			"Hit": 65,
			"Crit": 20,
			"Avo": 0,
			"Ddg": -20,
			"range": [1, 2],
			"damageType": "magical",
			"critCoeff": 4,
			"disableSelfFollowup": true,
		},


		/** SCROLLS */
		"Rat_Spirit": {
			"key": "Rat_Spirit",
			"name": "Rat Spirit",
			"description": "Skl +1, Ddg +10. Can't inflict criticals or trigger offensive skills.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "E",
			"Mt": 3,
			"Hit": 85,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1},
			"disableCrit": true,
			"disableProc": true,
		},
		"Ox_Spirit": {
			"key": "Ox_Spirit",
			"name": "Ox Spirit",
			"description": "Def +1. Each scroll weapon boosts one or more of the wielder's stats.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "D",
			"Mt": 5,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Def": 1},
		},
		"Tiger_Spirit": {
			"key": "Tiger_Spirit",
			"name": "Tiger Spirit",
			"description": "Spd +1. Makes follow-up attacks more difficult to perform (-3 effective Spd).",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "C",
			"Mt": 8,
			"Hit": 70,
			"Crit": 0,
			"Avo": -5,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Rabbit_Spirit": {
			"key": "Rabbit_Spirit",
			"name": "Rabbit Spirit",
			"description": "Res +1. Ddg -5. After use in combat, wielder suffers Mag/Skl -2 (recovers 1/turn).",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "B",
			"Mt": 11,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Res": 1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			}
		},
		"Dragon_Spirit": {
			"key": "Dragon_Spirit",
			"name": "Dragon Spirit",
			"description": "Skl/Def +1. Eff. vs. dragons. After use in combat, halves Mag until wielder attacks again.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "A",
			"Mt": 11,
			"Hit": 85,
			"Crit": 10,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1, "Def": 1},
			"effectiveAgainst": ["Dragon"],
			"effectiveCoeff": 3,
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Mag"))
					userObj.halved = { stat: "Mag", status: "active" };
			}
		},
		"Calamity_Gate": {
			"key": "Calamity_Gate",
			"name": "Calamity Gate",
			"description": "Spd/Def +1. Inverts weapon advantage and doubles its effects.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "C",
			"Mt": 7,
			"Hit": 70,
			"Crit": 5,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 1, "Def": 1},
			"reaver": true,
		},
		"Snake_Spirit": {
			"key": "Snake_Spirit",
			"name": "Snake Spirit",
			"description": "Spd/Res +1. Strikes twice when attacking. Afterward, halves Mag until unit attacks again.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "A",
			"Mt": 5,
			"Hit": 60,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 1, "Res": 1},
			"brave": true,
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!(userObj.halved && userObj.halved.stat === "Mag"))
					userObj.halved = { stat: "Mag", status: "active" };
			}
		},
		"Horse_Spirit": {
			"key": "Horse_Spirit",
			"name": "Horse Spirit",
			"description": "+3 to Skl/Spd/Def/Res. An enduring spirit.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "D",
			"Mt": 4,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 3, "Spd": 3, "Def": 3, "Res": 3},
		},
		"Sheep_Spirit": {
			"key": "Sheep_Spirit",
			"name": "Sheep Spirit",
			"description": "Def/Res +1. Use while equipped to restore 10 HP to the wielder.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "D",
			"Mt": 5,
			"Hit": 70,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Def": 1, "Res": 1},
		},
		"Paper": {
			"key": "Paper",
			"name": "Paper",
			"description": "Spd +1, Ddg +10. Supposedly beats rock, but not much else.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "E",
			"Mt": 1,
			"Hit": 100,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 10,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 1},
		},
		"Malevolent_Text": {
			"key": "Malevolent_Text",
			"name": "Malevolent Text",
			"description": "Skl +1. Makes follow-up attacks more difficult to perform (-3 eff. Spd).",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "D",
			"Mt": 10,
			"Hit": 50,
			"Crit": 10,
			"Avo": -10,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1},
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].offAtkSpd -= 3;
			}
		},
		"Monkey_Spirit": {
			"key": "Monkey_Spirit",
			"name": "Monkey Spirit",
			"description": "Skl/Spd +1. Res +2, Lck -4. A star-crossed spirit.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "D",
			"Mt": 4,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1, "Spd": 1, "Lck": -4, "Res": 2},
		},
		"Bird_Spirit": {
			"key": "Bird_Spirit",
			"name": "Bird Spirit",
			"description": "Spd/Lck +1. Def -4. A lighthearted spirit.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "C",
			"Mt": 5,
			"Hit": 75,
			"Crit": 0,
			"Avo": 15,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Spd": 1, "Lck": 1, "Def": -4},
		},
		"Ink_Painting": {
			"key": "Ink_Painting",
			"name": "Ink Painting",
			"description": "Skl/Lck +1. Doubles Mt when counterattacking. Cannot make follow-up attacks. After use in combat, wielder suffers Mag/Skl -2 (recovers 1/turn).",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "B",
			"Mt": 9,
			"Hit": 90,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1, "Lck": 1},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Mag": -2, "Skl": -2}
				}
			},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},
		"Izanas_Scroll": {
			"key": "Izanas_Scroll",
			"name": "Izana's Scroll",
			"description": "Skl +1, Def -2, Res -1. Doubles Mt when attacking. Cannot make follow-up attacks.",
			"generalType": "Tome",
			"specificType": "Scroll",
			"rank": "B",
			"Mt": 9,
			"Hit": 90,
			"Crit": 0,
			"Avo": -20,
			"Ddg": 0,
			"range": [1, 2],
			"damageType": "magical",
			"statMods": {"Skl": 1, "Def": -2, "Res": -1},
			"disableSelfFollowup": true,
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && userObj.equipped) {
					combatObj[userObj.role + userObj.id].Atk += userObj.equipped.Mt;
				}
			}	
		},

		/** STONES */

		"Dragonstone": {
			"key": "Dragonstone",
			"name": "Dragonstone",
			"description": "Skl -3, Spd -2, Def +4, Res +3, Ddg +10. Magical. Cannot make follow-up attacks.",
			"generalType": "Stone",
			"specificType": "Dragonstone",
			"rank": "E",
			"Mt": 14,
			"Hit": 85,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 10,
			"range": [1],
			"damageType": "magical",
			"statMods": {"Skl": -3, "Spd": -2, "Def": 4, "Res": 3},
			"disableSelfFollowup": true,
			"usableBy": function(userObj) {
				return ["Nohr_Prince", "Nohr_Princess", "Hoshido_Noble", "Nohr_Noble"].indexOf(userObj.classKey) > -1;
			},
		},
		"Dragonstone+": {
			"key": "Dragonstone+",
			"name": "Dragonstone+",
			"description": "Skl -5, Spd -4, Def +9, Res +7, Ddg +10. Magical. Mag/Skl -2 after use in combat.",
			"generalType": "Stone",
			"specificType": "Dragonstone",
			"rank": "C",
			"Mt": 25,
			"Hit": 75,
			"Crit": 0,
			"Avo": -10,
			"Ddg": 10,
			"range": [1],
			"damageType": "magical",
			"statMods": {"Skl": -5, "Spd": -4, "Def": 9, "Res": 7},
			"disableSelfFollowup": true,
			"usableBy": function(userObj) {
				return ["Nohr_Prince", "Nohr_Princess", "Hoshido_Noble", "Nohr_Noble"].indexOf(userObj.classKey) > -1;
			},
		},	
		"Beaststone": {
			"key": "Beaststone",
			"name": "Beaststone",
			"description": "Skl +5, Spd +3, Def -2, Ddg +10. Enables a wolfskin or kitsune to fight as a beast.",
			"generalType": "Stone",
			"specificType": "Beaststone",
			"rank": "E",
			"Mt": 6,
			"Hit": 90,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Skl": 5, "Spd": 3, "Def": -2},
			"usableBy": function(userObj) {
				return ["Kitsune", "Nine-Tails", "Wolfskin", "Wolfssegner"].indexOf(userObj.classKey) > -1;
			},	
		},
		"Beastrune": {
			"key": "Beastrune",
			"name": "Beastrune",
			"description": "Skl -2, Spd -1, Def +4, Res +5, Ddg +10. Enables a tougher beast form.",
			"generalType": "Stone",
			"specificType": "Beaststone",
			"rank": "C",
			"Mt": 9,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Skl": -2, "Spd": -1, "Def": 4, "Res": 5},
			"usableBy": function(userObj) {
				return ["Kitsune", "Nine-Tails", "Wolfskin", "Wolfssegner"].indexOf(userObj.classKey) > -1;
			},			
		},
		"Beaststone+": {
			"key": "Beaststone+",
			"name": "Beaststone+",
			"description": "Skl +8, Spd +6, Def -5, Res -3, Ddg +10. Str/Skl -2 after use in combat.",
			"generalType": "Stone",
			"specificType": "Beaststone",
			"rank": "E",
			"Mt": 12,
			"Hit": 90,
			"Crit": 5,
			"Avo": 10,
			"Ddg": 10,
			"range": [1],
			"damageType": "physical",
			"statMods": {"Skl": 8, "Spd": 6, "Def": -5, "Res": -3},
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"usableBy": function(userObj) {
				return ["Kitsune", "Nine-Tails", "Wolfskin", "Wolfssegner"].indexOf(userObj.classKey) > -1;
			},	
		},

		/** OTHER WEAPONS */
		"Shackled_Fist": {
			"key": "Shackled_Fist",
			"name": "Shackled Fist",
			"description": "The only weapon the Faceless need.",
			"generalType": "Other",
			"specificType": "Fist",
			"rank": "E",
			"Mt": 8,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"usableBy": function(userObj) {
				return userObj.classKey === "Faceless";
			},	
		},
		"Gauntlet": {
			"key": "Gauntlet",
			"name": "Gauntlet",
			"description": "Ddg -5. Str/Skl -2 after use in combat. Dangerous on the wrong hands.",
			"generalType": "Other",
			"specificType": "Fist",
			"rank": "B",
			"Mt": 13,
			"Hit": 90,
			"Crit": 0,
			"Avo": 0,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"usableBy": function(userObj) {
				return userObj.classKey === "Faceless";
			},	
		},
		"Rock": {
			"key": "Rock",
			"name": "Rock",
			"description": "Stoneborn only. A weapon deadly in its simplicity.",
			"generalType": "Other",
			"specificType": "Rock",
			"rank": "E",
			"Mt": 9,
			"Hit": 80,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2, 3, 4, 5],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"usableBy": function(userObj) {
				return userObj.classKey === "Stoneborn";
			},	
		},
		"Massive_Rock": {
			"key": "Massive_Rock",
			"name": "Massive Rock",
			"description": "Stoneborn only. A weapon devastating in its simplicity.",
			"generalType": "Other",
			"specificType": "Rock",
			"rank": "B",
			"Mt": 15,
			"Hit": 75,
			"Crit": 0,
			"Avo": 0,
			"Ddg": 0,
			"range": [1, 2, 3, 4, 5],
			"damageType": "physical",
			"disableCrit": true,
			"disableProc": true,
			"disableSelfFollowup": true,
			"usableBy": function(userObj) {
				return userObj.classKey === "Stoneborn";
			},	
		},
		"Saw": {
			"key": "Saw",
			"name": "Saw",
			"description": "Automatons only. Saws lower enemy stats on a hit. <br/>Stat Drop (Str -4, Mag -4)",
			"generalType": "Other",
			"specificType": "Saw",
			"rank": "E",
			"Mt": 7,
			"Hit": 90,
			"Crit": 0,
			"Avo": 10,
			"Ddg": 0,
			"range": [1],
			"damageType": "physical",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -4, "Mag": -4};
				}
			},
			"usableBy": function(userObj) {
				return userObj.classKey === "Automaton";
			},	
		},
		"Big_Saw": {
			"key": "Big_Saw",
			"name": "Big Saw",
			"description": "Automatons only. Ddg -5. Lowers enemy stats on a hit, but Str/Skl -2 after use in combat. <br/>Stat Drop (Str -4, Mag -4)",
			"generalType": "Other",
			"specificType": "Saw",
			"rank": "B",
			"Mt": 12,
			"Hit": 85,
			"Crit": 0,
			"Avo": 10,
			"Ddg": -5,
			"range": [1],
			"damageType": "physical",
			"selfDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].usedWeapon) {
					return {"Str": -2, "Skl": -2}
				}
			},
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Str": -6, "Mag": -6};
				}
			},
			"usableBy": function(userObj) {
				return userObj.classKey === "Automaton";
			},	
		},


	};

	Object.keys(weapons).forEach(function(weapon, idx) {
		weapons[weapon].pk = idx;
	});



	var FORGE_BONUS = {
		"canCrit": {
			"1": {"Mt": 2}, "2": {"Mt": 4, "Hit": 2}, "3": {"Mt": 6, "Hit": 4, "Crit": 1}, "4": {"Mt": 8, "Hit": 6, "Crit": 3}, "5": {"Mt": 9, "Hit": 10, "Crit": 6}, "6": {"Mt": 10, "Hit": 15, "Crit": 10}, "7": {"Mt": 11, "Hit": 20, "Crit": 15}
		},
		"cannotCrit": {
			"1": {"Mt": 2}, "2": {"Mt": 4, "Hit": 2}, "3": {"Mt": 6, "Hit": 5}, "4": {"Mt": 8, "Hit": 9}, "5": {"Mt": 9, "Hit": 15}, "6": { "Mt": 10, "Hit": 22}, "7": {"Mt": 11, "Hit": 30}
		}
	};


	/** 
	 * Create an instance of a weapon by passing in its key.
	 * Necessary for creating copies of weapons with different
	 * forge levels, etc.
	 */
	function Weapon(weaponKey) {
		var self = this;
		var weaponObj = weapons[weaponKey];
		Object.keys(weaponObj).forEach(function(prop) {
			self[prop] = weaponObj[prop];
		});
	};
	this.Weapon = Weapon;

	Weapon.prototype.setForgeLevel = function(forgeLevel) {
		if (!forgeLevel) return;
		this.forgeLevel = forgeLevel;
		var self = this;

		var forgeBonuses = this.disableCrit ? FORGE_BONUS.cannotCrit[forgeLevel] : FORGE_BONUS.canCrit[forgeLevel];
		Object.keys(forgeBonuses).forEach(function(stat) {
			self[stat] = weapons[self.key][stat] + forgeBonuses[stat];
		});
	};


	this.getWeapons = function() {
		return angular.copy(weapons);
	};

	this.getWeapon = function(weaponKey) {
		return angular.copy(weapons[weaponKey]);
	};

	this.getWeaponByPK = function(pk) {
		var weaponKeys = Object.keys(weapons);
		for (var i=0; i<weaponKeys.length; i++) {
			if (weapons[weaponKeys[i]].pk == pk) {
				return angular.copy(weapons[weaponKeys[i]]);
				break;
			}
		}
	};




});