app.service('Skills', function() {

	var EMPTY_STATS = {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0};

	var classSkills = {
		"Dragon_Ward": {
			"key": "Dragon_Ward",
			"name": "Dragon Ward",
			"description": "Halve damage when adjacent ally is attacked. Trigger % = (target's Lck * 0.5)",
			"defensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {

			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 3

		},

		"Hoshidan_Unity": {
			"key": "Hoshidan_Unity",
			"name": "Hoshidan Unity",
			"description": "Increases the trigger rate of this unit's skills by 10%.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].procRateBonus = (combatObj[userObj.role + userObj.id].procRateBonus || 0) + 10;	
			}

		},

		"Duelists_Blow": {
			"key": "Duelists_Blow",
			"name": "Duelist's Blow",
			"description": "Grants Avo +30 when the unit initiates combat.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].Avo += 30;			
				}
			}
		},

		"Vantage": {
			"key": "Vantage",
			"name": "Vantage",
			"description": "At start of combat, if HP = 50% or less, always strike first, even when attacked.",
		},

		"Astra": {
			"key": "Astra",
			"name": "Astra",
			"description": "Strike five times at half damage. Trigger % = (Skl stat * 0.5)",
			"procPriority": 3
		},

		"Swordfaire": {
			"key": "Swordfaire",
			"name": "Swordfaire",
			"description": "+5 damage dealt if using a sword/katana.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType === "Sword") {
					combatObj[userObj.role + userObj.id].Atk += 5;			
				}
			}
		},

		"Seal_Strength": {
			"key": "Seal_Strength",
			"name": "Seal Strength",
			"description": "After combat, reduces enemy Str by 6 (recovers 1/turn).",
			"enemyDebuffs": {"Str": -6},
		},

		"Life_and_Death": {
			"key": "Life_and_Death",
			"name": "Life and Death",
			"description": "During combat, +10 to damage dealt and taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].Atk += 10;
				combatObj[userObj.role + userObj.id].Def -= 10;			
			}
		},

		"Seal_Resistance": {
			"key": "Seal_Resistance",
			"name": "Seal Resistance",
			"description": "After combat, reduces enemy Res by 6 (recovers 1/turn).",
			"enemyDebuffs": {"Res": -6},
		},

		"Shove": {
			"key": "Shove",
			"name": "Shove",
			"description": "Grants use of the Shove command. Use to push an adjacent ally away one space.",
		},

		"Death_Blow": {
			"key": "Death_Blow",
			"name": "Death Blow",
			"description": "Grants Crit +20 when the unit initiates an attack.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].Crit += 20;			
				}
			}
		},

		"Counter": {
			"key": "Counter",
			"name": "Counter",
			"description": "When an adjacent enemy initiates an attack and inflicts damage, the enemy receives the same damage.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var enemyInflictedDamage = combatObj[enemyObj.role + enemyObj.id].damage;
				if (enemyObj.attackRange == 1 && enemyInflictedDamage > 0) {
					combatObj[userObj.role + userObj.id].counterDamage = 
						(combatObj[userObj.role + userObj.id].counterDamage || 0) + enemyInflictedDamage;
					return true;
				}
			}
		},

		"Salvage_Blow": {
			"key": "Salvage_Blow",
			"name": "Salvage Blow",
			"description": "Receive a basic weapon when initiating an attack and defeating foe. Trigger % = (Lck stat)"
		},

		"Lancebreaker": {
			"key": "Lancebreaker",
			"name": "Lancebreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using a lance/naginata.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Lance") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Seal_Defense": {
			"key": "Seal_Defense",
			"name": "Seal Defense",
			"description": "After combat, reduces enemy Def by 6 (recovers 1/turn).",
			"enemyDebuffs": {"Def": -6},
		},

		"Swap": {
			"key": "Swap",
			"name": "Swap",
			"description": "Grants use of Swap command. Use to switch spaces with an adjacent ally.",
		},

		"Seal_Speed": {
			"key": "Seal_Speed",
			"name": "Seal Speed",
			"description": "After combat, reduces enemy Spd by 6 (recovers 1/turn).",
			"enemyDebuffs": {"Spd": -6},
		},

		"Lancefaire": {
			"key": "Lancefaire",
			"name": "Lancefaire",
			"description": "+5 damage dealt if using a lance/naginata.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType == "Lance") {
					combatObj[userObj.role + userObj.id].Atk += 5;			
				}
			}
		},

		"Rend_Heaven": {
			"key": "Rend_Heaven",
			"name": "Rend Heaven",
			"description": "Deal half foe's Str (if user has a physical weapon) or Mag (if user has a magical weapon) as bonus damage. Trigger % = (Skl stat * 1.5)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped.damageType === "physical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(enemyObj.currentStats.Str / 2);
				}
				else if (userObj.equipped.damageType === "magical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(enemyObj.currentStats.Mag / 2);
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl * 1.5 + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 8

		},

		"Quixotic": {
			"key": "Quixotic",
			"name": "Quixotic",
			"description": "Grants Hit +30 and +15% to skill trigger rates to this unit and enemy in combat.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].Hit += 30;
				combatObj[enemyObj.role + enemyObj.id].Hit += 30;
				combatObj[userObj.role + userObj.id].procRateBonus = (combatObj[userObj.role + userObj.id].procRateBonus || 0) + 15;	
				combatObj[enemyObj.role + enemyObj.id].procRateBonus = (combatObj[enemyObj.role + enemyObj.id].procRateBonus || 0) + 15;											
			}
		},

		"Magic+2": {
			"key": "Magic+2",
			"name": "Magic +2",
			"description": "Grants Mag +2.",
			"statMods": function(userObj) {
				return {"Mag": 2};
			},
		},

		"Future_Sight": {
			"key": "Future_Sight",
			"name": "Future Sight",
			"description": "Double EXP if the unit attacks and defeats an enemy. Trigger % = (Lck stat)",
		},

		"Rally_Magic": {
			"key": "Rally_Magic",
			"name": "Rally Magic",
			"description": "Use \"Rally\" to grant Mag +4 to units within two spaces for one turn.",
		},

		"Tomefaire": {
			"key": "Tomefaire",
			"name": "Tomefaire",
			"description": "+5 damage dealt if using a tome/scroll.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType == "Tome") {
					combatObj[userObj.role + userObj.id].Atk += 5;			
				}
			}
		},

		"Miracle": {
			"key": "Miracle",
			"name": "Miracle",
			"description": "If HP > 1, survive a lethal attack with 1 HP remaining. Trigger % = (Lck stat)",
			"defensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP > 1 && combatObj[enemyObj.role + enemyObj.id].damage >= userObj.currentHP) {
					combatObj[enemyObj.role + enemyObj.id].damage = userObj.currentHP - 1;
					return true;
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Lck + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 2
		},

		"Rally_Luck": {
			"key": "Rally_Luck",
			"name": "Rally Luck",
			"description": "Use \"Rally\" to grant Lck +8 to units within two spaces for one turn.",
		},

		"Renewal": {
			"key": "Renewal",
			"name": "Renewal",
			"description": "Restores up to 30% HP at the start of each turn.",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + (userObj.maxHP * 0.3);
			}
		},

		"Countermagic": {
			"key": "Countermagic",
			"name": "Countermagic",
			"description": "When enemy initiates an attack and inflicts magical damage, the enemy receives the same damage.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var enemyInflictedDamage = combatObj[enemyObj.role + enemyObj.id].damage;
				if (enemyObj.equipped && enemyObj.equipped.damageType === "magical" && enemyInflictedDamage > 0) {
					combatObj[userObj.role + userObj.id].counterDamage = 
						(combatObj[userObj.role + userObj.id].counterDamage || 0) + enemyInflictedDamage;
					return true;
				}
			}
		},

		"Darting_Blow": {
			"key": "Darting_Blow",
			"name": "Darting Blow",
			"description": "Increases chance of follow-up attack when this unit initiates an attack (+5 eff. Spd).",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {

				}
			}
		},

		"Camaraderie": {
			"key": "Camaraderie",
			"name": "Camaraderie",
			"description": "Restores up to 10% HP each turn if an ally is within two spaces.",
		},

		"Rally_Speed": {
			"key": "Rally_Speed",
			"name": "Rally Speed",
			"description": "Use \"Rally\" to grant Spd +4 to units within two spaces for one turn.",
		},

		"Warding_Blow": {
			"key": "Warding_Blow",
			"name": "Warding Blow",
			"description": "Unit receives -20 magical damage when the unit initiates an attack.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && enemyObj.equipped && enemyObj.equipped.damageType == "magical") {
					combatObj[userObj.role + userObj.id].Def += 20;			
				}
			}
		},

		"Air_Superiority": {
			"key": "Air_Superiority",
			"name": "Air Superiority",
			"description": "Grants Hit/Avo +30 when battling flying enemies.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.isWeakTo("Flying")) {
					combatObj[userObj.role + userObj.id].Hit += 30;
					combatObj[userObj.role + userObj.id].Avo += 30;	
				}
			}
		},

		"Amaterasu": {
			"key": "Amaterasu",
			"name": "Amaterasu",
			"description": "Restores up to 20% HP of allies within two spaces at the start of each turn.",
		},

		"Skill+2": {
			"key": "Skill+2",
			"name": "Skill +2",
			"description": "Grants Skl +2.",
			"statMods": function(userObj) {
				return {"Skl": 2};
			},
		},

		"Quick_Draw": {
			"key": "Quick_Draw",
			"name": "Quick Draw",
			"description": "This unit deals +4 damage when initiating combat.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].Atk += 4;			
				}
			}
		},

		"Certain_Blow": {
			"key": "Certain_Blow",
			"name": "Certain Blow",
			"description": "Grants Hit +40 when the unit initiates an attack.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].Hit += 40;
				}
			}
		},

		"Bowfaire": {
			"key": "Bowfaire",
			"name": "Bowfaire",
			"description": "+5 damage dealt if using a bow/yumi.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType === "Bow") {
					combatObj[userObj.role + userObj.id].Atk += 5;
				}
			}
		},

		"Locktouch": {
			"key": "Locktouch",
			"name": "Locktouch",
			"description": "Allows the unit to open doors and chests without keys.",
		},

		"Poison_Strike": {
			"key": "Poison_Strike",
			"name": "Poison Strike",
			"description": "Enemies lose up to 20% HP after any combat this unit initiates.",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].afterCombatDamage 
						= (combatObj[userObj.role + userObj.id].afterCombatDamage || 0)
						+ (enemyObj.maxHP * 0.20);
				}
			}
		},

		"Lethality": {
			"key": "Lethality",
			"name": "Lethality",
			"description": "Fell an enemy in one hit (the hit must do damage). Trigger % = (Skl stat * 0.25)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj[userObj.role + userObj.id].Atk > 0) {
					combatObj[userObj.role + userObj.id].damage = enemyObj.currentHP;
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl / 4 + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 1
		},

		"Shurikenfaire": {
			"key": "Shurikenfaire",
			"name": "Shurikenfaire",
			"description": "+5 damage dealt if using a dagger/shuriken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType === "Dagger") {
					combatObj[userObj.role + userObj.id].Atk += 5;
				}
			}
		},

		"Golembane": {
			"key": "Golembane",
			"name": "Golembane",
			"description": "Enables unit to deal bonus damage to mechanists, automatons, and stoneborn.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.isWeakTo("Golem")) {
					combatObj[userObj.role + userObj.id].effectiveCoeff = Math.max(2, combatObj[userObj.role + userObj.id].effectiveCoeff || 1);
				}
			}
		},

		"Replicate": {
			"key": "Replicate",
			"name": "Replicate",
			"description": "Grants use of Replicate command. Use once per battle to create a replica.",
		},

		"Potent_Potion": {
			"key": "Potent_Potion",
			"name": "Potent Potion",
			"description": "Makes most HP-recovery and stat-boosting items 150% as potent.",
		},

		"Quick_Salve": {
			"key": "Quick_Salve",
			"name": "Quick Salve",
			"description": "Can take another action after using a recovery item or tonic.",
		},

		"Profiteer": {
			"key": "Profiteer",
			"name": "Profiteer",
			"description": "Get a gold bar on each of unit's first 7 turns. Trigger % = (Lck stat)",
		},

		"Spendthrift": {
			"key": "Spendthrift",
			"name": "Spendthrift",
			"description": "When attacking, unit expends a held gold bar for +10/-10 to damage dealt/taken.",
		},

		"Evenhanded": {
			"key": "Evenhanded",
			"name": "Evenhanded",
			"description": "This unit deals +4 damage on even-numbered turns.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn % 2 === 0) {
					combatObj[userObj.role + userObj.id].Atk += 4;
				}
			}
		},

		"Beastbane": {
			"key": "Beastbane",
			"name": "Beastbane",
			"description": "Enables unit in animal form to deal bonus damage to beasts.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (['Kitsune', 'Nine-Tails', 'Wolfskin', 'Wolfssegner'].indexOf(userObj.classKey) > -1 && enemyObj.isWeakTo("Beast")) {
					combatObj[userObj.role + userObj.id].effectiveCoeff = Math.max(2, combatObj[userObj.role + userObj.id].effectiveCoeff || 1);
				}
			}
		},

		"Even_Better": {
			"key": "Even_Better",
			"name": "Even Better",
			"description": "Restores up to 40% HP at the start of even-numbered turns.",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn % 2 == 0) {
					userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + (userObj.maxHP * 0.4);
				}
			}
		},

		"Grisly_Wound": {
			"key": "Grisly_Wound",
			"name": "Grisly Wound",
			"description": "Enemies lose up to 20% HP after any combat with this unit.",
			"afterCombat": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].afterCombatDamage 
					= (combatObj[userObj.role + userObj.id].afterCombatDamage || 0)
					+ (enemyObj.maxHP * 0.20);
			}
		},

		"Luck+4": {
			"key": "Luck+4",
			"name": "Luck +4",
			"description": "Grants Lck +4.",
			"statMods": function(userObj) {
				return {"Lck": 4};
			}
		},

		"Inspiring_Song": {
			"key": "Inspiring_Song",
			"name": "Inspiring Song",
			"description": "Use \"Sing\" to grant an ally Skl/Spd/Lck +3 for one turn.",
		},

		"Voice_of_Peace": {
			"key": "Voice_of_Peace",
			"name": "Voice of Peace",
			"description": "Enemies within two spaces inflict -2 damage with their physical attacks.",
		},

		"Foreign_Princess": {
			"key": "Foreign_Princess",
			"name": "Foreign Princess",
			"description": "Foreign Army units within two spaces take -2/+2 to damage dealt/taken.",
		},

		"Aptitude": {
			"key": "Aptitude",
			"name": "Aptitude",
			"description": "Adds 10% to each stat's odds of increasing at level up.",
		},

		"Underdog": {
			"key": "Underdog",
			"name": "Underdog",
			"description": "Hit/Avo +15 if a foe's level is higher. (For adv. classes, add +20 to level.)",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				var userLevel = userObj.level, enemyLevel = enemyObj.level;
				if (userObj.classObj.classTier === "tier2") userLevel += 20;
				if (enemyObj.classObj.classTier === "tier2") enemyLevel += 20;
				if (userLevel < enemyLevel) {
					combatObj[userObj.role + userObj.id].Hit += 15;
					combatObj[userObj.role + userObj.id].Avo += 15;
				}
			}
		},

		"Nobility": {
			"key": "Nobility",
			"name": "Nobility",
			"description": "Grants this unit a 20% bonus to EXP.",
		},

		"Dragon_Fang": {
			"key": "Dragon_Fang",
			"name": "Dragon Fang",
			"description": "Inflicts half of attack power as extra damage. Trigger % = (Skl stat * 0.75)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].damage += Math.floor(combatObj[userObj.role + userObj.id].Atk / 2);
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl * 0.75 + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 4
		},

		"Draconic_Hex": {
			"key": "Draconic_Hex",
			"name": "Draconic Hex",
			"description": "After combat, reduces all of enemy's stats by 4 (recovers 1/turn).",
			"enemyDebuffs": {"Str": -4, "Mag": -4, "Skl": -4, "Spd": -4, "Lck": -4, "Def": -4, "Res": -4},
		},

		"Nohrian_Trust": {
			"key": "Nohrian_Trust",
			"name": "Nohrian Trust",
			"description": "This unit can use a supporting unit's triggered skills in combat.",
		},

		"Elbow_Room": {
			"key": "Elbow_Room",
			"name": "Elbow Room",
			"description": "This unit deals +3 damage when fighting in a space with no terrain effects.",
		},

		"Shelter": {
			"key": "Shelter",
			"name": "Shelter",
			"description": "Grants use of the Shelter command. Use to pull another player unit into cover.",
		},

		"Defender": {
			"key": "Defender",
			"name": "Defender",
			"description": "Grants +1 to all stats when paired up as the lead unit.",
			"statMods": function(userObj) {
				if (userObj.supportEnabled && userObj.supportStance === "Guard" && userObj.role === "lead") {
					return {"Str": 1, "Mag": 1, "Skl": 1, "Spd": 1, "Lck": 1, "Def": 1, "Res": 1};
				}
			}

		},

		"Aegis": {
			"key": "Aegis",
			"name": "Aegis",
			"description": "Halve bow / tome / dragonstone / breath / rock / shuriken damage. Trigger % = (Skl stat)",
			"defensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (['Bow', 'Tome', 'Dagger'].indexOf(enemyObj.equipped.generalType) > -1
					|| ['Dragonstone', 'Breath', 'Rock'].indexOf(enemyObj.equipped.specificType) > -1) {
					combatObj[enemyObj.role + enemyObj.id].damage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
					return true;
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 4
		},

		"Luna": {
			"key": "Luna",
			"name": "Luna",
			"description": "Ignore half of enemy Def/Res when attacking. Trigger % = (Skl stat)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped.damageType === "physical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(enemyObj.currentStats.Def / 2);
				}
				else if (userObj.equipped.damageType === "magical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(enemyObj.currentStats.Res / 2);
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 6
		},

		"Armored_Blow": {
			"key": "Armored_Blow",
			"name": "Armored Blow",
			"description": "Unit receives -10 physical damage when the unit initiates an attack.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && enemyObj.equipped && enemyObj.equipped.damageType == "physical") {
					combatObj[userObj.role + userObj.id].Def += 10;			
				}
			}
		},

		"Defense+2": {
			"key": "Defense+2",
			"name": "Defense +2",
			"description": "Grants Def +2.",
			"statMods": function(userObj) {
				return {"Def": 2};
			}
		},

		"Natural_Cover": {
			"key": "Natural_Cover",
			"name": "Natural Cover",
			"description": "This unit takes -3 damage when fighting in a space with a terrain effect.",
		},

		"Wary_Fighter": {
			"key": "Wary_Fighter",
			"name": "Wary Fighter",
			"description": "Neither this unit nor enemies in combat with him/her can use follow-up attacks.",
		},

		"Pavise": {
			"key": "Pavise",
			"name": "Pavise",
			"description": "Halve sword / lance / axe / beaststone / fist / saw damage. Trigger % = (Skl stat)",
			"defensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (['Sword', 'Lance', 'Axe'].indexOf(enemyObj.equipped.generalType) > -1
					|| ['Beaststone', 'Fist', 'Saw'].indexOf(enemyObj.equipped.specificType) > -1) {
					combatObj[enemyObj.role + enemyObj.id].damage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
					return true;
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 4

		},

		"HP+5": {
			"key": "HP+5",
			"name": "HP +5",
			"description": "Grants +5 to max HP.",
			"statMods": function(userObj) {
				return {"HP": 5};
			}
		},

		"Gamble": {
			"key": "Gamble",
			"name": "Gamble",
			"description": "Causes Hit -10, but grants Crit +10.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].Hit -= 10;
				combatObj[userObj.role + userObj.id].Crit += 10;
			}
		},

		"Rally_Strength": {
			"key": "Rally_Strength",
			"name": "Rally Strength",
			"description": "Use \"Rally\" to grant Str +4 to units within two spaces for one turn.",
		},

		"Axefaire": {
			"key": "Axefaire",
			"name": "Axefaire",
			"description": "+5 damage dealt if using an axe/club.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped && userObj.equipped.generalType === "Axe") {
					combatObj[userObj.role + userObj.id].Atk += 5;			
				}
			}
		},

		"Good_Fortune": {
			"key": "Good_Fortune",
			"name": "Good Fortune",
			"description": "Restores up to 20% HP at the start of each turn. Trigger % = (Lck stat)",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				var procRate = userObj.currentStats.Lck + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
				if (Math.floor(Math.random()*100) < procRate) {
					userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + (userObj.maxHP * 0.2);
				}
			}
		},

		"Strong_Riposte": {
			"key": "Strong_Riposte",
			"name": "Strong Riposte",
			"description": "This unit deals +3 damage when counterattacking.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj) {
					combatObj[userObj.role + userObj.id].Atk += 3;			
				}
			}
		},

		"Sol": {
			"key": "Sol",
			"name": "Sol",
			"description": "Absorb HP equal to half of damage dealt. Trigger % = (Skl stat)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!combatObj[userObj.role + userObj.id].healFns) combatObj[userObj.role + userObj.id].healFns = [];

				var healFn = function(damage) {
					var dealtDamage = Math.min(damage, enemyObj.currentHP);
					combatObj[userObj.role + userObj.id].heal += Math.floor(dealtDamage / 2);
				};

				if (combatObj[userObj.role + userObj.id].healFns.indexOf(healFn) === -1) {
					combatObj[userObj.role + userObj.id].healFns.push(healFn);
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 5
		},

		"Axebreaker": {
			"key": "Axebreaker",
			"name": "Axebreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using an axe/club.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Axe") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Rally_Skill": {
			"key": "Rally_Skill",
			"name": "Rally Skill",
			"description": "Use \"Rally\" to grant Skl +4 to units within two spaces for one turn.",
		},

		"Shurikenbreaker": {
			"key": "Shurikenbreaker",
			"name": "Shurikenbreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using a dagger/shuriken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Dagger") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Movement+1": {
			"key": "Movement+1",
			"name": "Movement +1",
			"description": "Grants Mov +1.",
		},

		"Lucky_Seven": {
			"key": "Lucky_Seven",
			"name": "Lucky Seven",
			"description": "Grants Hit/Avo +20 for the first seven turns.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn <= 7) {
					combatObj[userObj.role + userObj.id].Hit += 20;
					combatObj[userObj.role + userObj.id].Avo += 20;
				}
			}
		},

		"Pass": {
			"key": "Pass",
			"name": "Pass",
			"description": "Allows the unit to pass through spaces occupied by enemies.",
		},

		"Strength+2": {
			"key": "Strength+2",
			"name": "Strength +2",
			"description": "Grants Str +2.",
			"statMods": function(userObj) {
				return {"Str": 2};
			}
		},

		"Lunge": {
			"key": "Lunge",
			"name": "Lunge",
			"description": "Grants use of Lunge command. After attacking, switches position with target.",
		},

		"Rally_Defense": {
			"key": "Rally_Defense",
			"name": "Rally Defense",
			"description": "Use \"Rally\" to grant Def +4 to units within two spaces for one turn.",
		},

		"Swordbreaker": {
			"key": "Swordbreaker",
			"name": "Swordbreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using a sword/katana.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Sword") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Savage_Blow": {
			"key": "Savage_Blow",
			"name": "Savage Blow",
			"description": "Foes within two spaces lose up to 20% HP after any combat this unit initiates.",
		},

		"Trample": {
			"key": "Trample",
			"name": "Trample",
			"description": "+5 damage dealt to nonmounted enemies.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (!enemyObj.classObj.mounted) {
					combatObj[userObj.role + userObj.id].Atk += 5;			
				}
			}
		},

		"Heartseeker": {
			"key": "Heartseeker",
			"name": "Heartseeker",
			"description": "Adjacent enemies suffer -20 Avo.",
		},

		"Malefic_Aura": {
			"key": "Malefic_Aura",
			"name": "Malefic Aura",
			"description": "Enemies within two spaces take +2 damage when hit by a magic attack.",
		},

		"Vengeance": {
			"key": "Vengeance",
			"name": "Vengeance",
			"description": "Add half accrued damage to attacks. Trigger % = (Skl stat * 1.5)",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].damage += Math.floor((userObj.maxHP - userObj.currentHP) / 2);
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl * 1.5 + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 9
		},

		"Bowbreaker": {
			"key": "Bowbreaker",
			"name": "Bowbreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using a bow/yumi.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Bow") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Seal_Magic": {
			"key": "Seal_Magic",
			"name": "Seal Magic",
			"description": "After combat, reduces enemy Mag by 6 (recovers 1/turn).",
			"enemyDebuffs": {"Mag": -6},
		},

		"Lifetaker": {
			"key": "Lifetaker",
			"name": "Lifetaker",
			"description": "Restores up to 50% HP if this unit initiates an attack and defeats the enemy.",
		},

		"Resistance+2": {
			"key": "Resistance+2",
			"name": "Resistance +2",
			"description": "Grants Res +2.",
			"statMods": function(userObj) {
				return {"Res": 2};
			}
		},

		"Gentilhomme": {
			"key": "Gentilhomme",
			"name": "Gentilhomme",
			"description": "Female allies within two spaces receive -2 damage in combat.",
		},

		"Demoiselle": {
			"key": "Demoiselle",
			"name": "Demoiselle",
			"description": "Male allies within two spaces receive -2 damage in combat.",
		},

		"Rally_Resistance": {
			"key": "Rally_Resistance",
			"name": "Rally Resistance",
			"description": "Use \"Rally\" to grant Res +4 to units within two spaces for one turn.",
		},

		"Inspiration": {
			"key": "Inspiration",
			"name": "Inspiration",
			"description": "Allies within two spaces get +2 to damage dealt and -2 to damage received.",
		},

		"Live_to_Serve": {
			"key": "Live_to_Serve",
			"name": "Live to Serve",
			"description": "When healing an ally with a staff, this unit recovers the same amount of HP.",
		},

		"Tomebreaker": {
			"key": "Tomebreaker",
			"name": "Tomebreaker",
			"description": "Grants Hit/Avo +50 if the enemy is using a tome/scroll.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.equipped && enemyObj.equipped.generalType === "Tome") {
					combatObj[userObj.role + userObj.id].Hit += 50;	
					combatObj[userObj.role + userObj.id].Avo += 50;					
				}
			}
		},

		"Odd_Shaped": {
			"key": "Odd_Shaped",
			"name": "Odd Shaped",
			"description": "This unit deals +4 damage on odd-numbered turns.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn % 2 === 1) {
					combatObj[userObj.role + userObj.id].Atk += 4;
				}
			}
		},

		"Better_Odds": {
			"key": "Better_Odds",
			"name": "Better Odds",
			"description": "Restores up to 40% HP at the start of odd-numbered turns.",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn % 2 == 1) {
					userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + (userObj.maxHP * 0.4);
				}
			}

		},

		"Even_Keel": {
			"key": "Even_Keel",
			"name": "Even Keel",
			"description": "This unit receives -4 magic damage on even-numbered turns.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (detailsObj.turn % 2 === 0 && enemyObj.equipped && enemyObj.equipped.damageType === "magical") {
					combatObj[userObj.role + userObj.id].Def += 4;
				}
			}
		},

		"Iron_Will": {
			"key": "Iron_Will",
			"name": "Iron Will",
			"description": "This unit receives -4 magic damage when an enemy initiates the attack.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && enemyObj.equipped && enemyObj.equipped.damageType === "magical") {
					combatObj[userObj.role + userObj.id].Def += 4;			
				}
			}
		},

		"Clarity": {
			"key": "Clarity",
			"name": "Clarity"
		},

		"Aggressor": {
			"key": "Aggressor",
			"name": "Aggressor",
			"description": "This unit deals +7 damage when initiating combat.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj) {
					combatObj[userObj.role + userObj.id].Atk += 7;			
				}
			}


		},

		"Speed+2": {
			"key": "Speed+2",
			"name": "Speed +2",
			"description": "Grants Spd +2.",
			"statMods": function(userObj) {
				return {"Spd": 2};
			}
		},

		"Relief": {
			"key": "Relief",
			"name": "Relief",
			"description": "Restores up to 20% HP each turn if no units are within two spaces.",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Rally_Movement": {
			"key": "Rally_Movement",
			"name": "Rally Movement",
			"description": "Use \"Rally\" to grant Mov +1 to units within two spaces for one turn.",
		},

		"Galeforce": {
			"key": "Galeforce",
			"name": "Galeforce",
			"description": "If this unit initiates an unsupported attack and defeats the foe, take another turn.",

		},

		"Survey": {
			"key": "Survey",
			"name": "Survey"
		},

		"Opportunity_Shot": {
			"key": "Opportunity_Shot",
			"name": "Opportunity Shot"
		},

		"Rifled_Barrel": {
			"key": "Rifled_Barrel",
			"name": "Rifled Barrel"
		},

		"Surefooted": {
			"key": "Surefooted",
			"name": "Surefooted"
		},

		"Shadowgift": {
			"key": "Shadowgift",
			"name": "Shadowgift",
			"description": "Enables non-dark mages to use dark magic.",
		},

		"Witchs_Brew": {
			"key": "Witchs_Brew",
			"name": "Witch's Brew",
			"description": "Obtain medicine at the end of your action for the first 7 turns. Trigger % = (Lck stat)",
		},

		"Warp": {
			"key": "Warp",
			"name": "Warp",
			"description": "Use \"Warp\" to move next to an ally and then take another action.",
		},

		"Toxic_Brew": {
			"key": "Toxic_Brew",
			"name": "Toxic Brew",
			"description": "Foes this unit attacks get Move 0, Avo -20 for 1 turn. Trigger % = (Skl stat * 1.5)"
		},

		"Dancing_Blade": {
			"key": "Dancing_Blade",
			"name": "Dancing Blade",
			"statMods": function(userObj) {
				return {"Spd": 3, "Def": -1};
			}
		},

		"Charm": {
			"key": "Charm",
			"name": "Charm",
			"description": "Allies within two spaces inflict +2 damage in combat.",
		},

		"Dual_Guarder": {
			"key": "Dual_Guarder",
			"name": "Dual Guarder"
		},

		"Speedtaker": {
			"key": "Speedtaker",
			"name": "Speedtaker"
		},

		"Heavy_Blade": {
			"key": "Heavy_Blade",
			"name": "Heavy Blade",
			"statMods": function(userObj) {
				return {"Str": 3, "Spd": -1};
			}
		},

		"Veteran_Intuition": {
			"key": "Veteran_Intuition",
			"name": "Veteran Intuition",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				combatObj[userObj.role + userObj.id].Ddg += 15;
			}
		},

		"Aether": {
			"key": "Aether",
			"name": "Aether",
			"procPriority": 2
		},

		"Strengthtaker": {
			"key": "Strengthtaker",
			"name": "Strengthtaker"
		},

		"Dual_Striker": {
			"key": "Dual_Striker",
			"name": "Dual Striker",
			"description": "When this unit is the supporting unit in an Attack Stance, this unit inflicts +3 damage to enemy.",
		},

		"Awakening": {
			"key": "Awakening",
			"name": "Awakening",
			"description": "Grants +30 to Hit/Avo/Crit/Ddg when HP is half or less.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP <= userObj.maxHP/2) {
					combatObj[userObj.role + userObj.id].Hit += 30;		
					combatObj[userObj.role + userObj.id].Avo += 30;			
					combatObj[userObj.role + userObj.id].Crit += 30;			
					combatObj[userObj.role + userObj.id].Ddg += 30;				
				}
			}
		},

		"Tactical_Advice": {
			"key": "Tactical_Advice",
			"name": "Tactical Advice",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportStance === "Guard" && userObj.role === "support") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					combatObj[leadObj.role + leadObj.id].Hit += 10;		
				}
			}

		},

		"Solidarity": {
			"key": "Solidarity",
			"name": "Solidarity"
		},

		"Ignis": {
			"key": "Ignis",
			"name": "Ignis",
			"offensiveProc": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.equipped.damageType === "physical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(userObj.currentStats.Mag / 2);
				}
				else if (userObj.equipped.damageType === "magical") {
					combatObj[userObj.role + userObj.id].damage += Math.floor(userObj.currentStats.Str / 2);
				}
			},
			"procRate": function(userObj) {
				return userObj.currentStats.Skl + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
			},
			"procPriority": 7
		},

		"Rally_Spectrum": {
			"key": "Rally_Spectrum",
			"name": "Rally Spectrum"
		}

	};

	var personalSkills = {
		"Supportive": {
			"key": "Supportive",
			"name": "Supportive",
			"description": "When user is supporting a lead unit with C support or higher, grants the lead unit Hit +10, +2 dmg dealt, and -2 dmg taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.role === "support") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					if (userObj.supportLevel == "C" || userObj.supportLevel == "B" || userObj.supportLevel == "A" || userObj.supportLevel == "S") {
						combatObj[leadObj.role + leadObj.id].Hit += 10;		
						combatObj[leadObj.role + leadObj.id].Atk += 2;
						combatObj[leadObj.role + leadObj.id].Def += 2;	
					}
				}
			}
		},

		"Forceful_Partner": {
			"key": "Forceful_Partner",
			"name": "Forceful Partner",
			"description": "If supporting the avatar, grants the avatar Hit +15 and +3 damage dealt.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.role === "support") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					if (leadObj.unitKey.indexOf("Avatar") === 0) {
						combatObj[leadObj.role + leadObj.id].Hit += 15;		
						combatObj[leadObj.role + leadObj.id].Atk += 3;	
					}
				}
			}
		},

		"Devoted_Partner": {
			"key": "Devoted_Partner",
			"name": "Devoted Partner",
			"description": "If supporting the avatar, grants the avatar +2 dmg dealt and -2 dmg taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.role === "support") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					if (leadObj.unitKey.indexOf("Avatar") === 0) {
						combatObj[leadObj.role + leadObj.id].Atk += 2;		
						combatObj[leadObj.role + leadObj.id].Def += 2;	
					}
				}
			}
		},

		"Evasive_Partner": {
			"key": "Evasive_Partner",
			"name": "Evasive Partner",
			"description": "If supporting the avatar, grants the avatar Avo +15 and -3 damage taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.role === "support") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					if (leadObj.unitKey.indexOf("Avatar") === 0) {
						combatObj[leadObj.role + leadObj.id].Avo += 15;		
						combatObj[leadObj.role + leadObj.id].Def += 3;	
					}
				}
			}
		},

		"Miraculous_Save": {
			"key": "Miraculous_Save",
			"name": "Miraculous Save",
			"description": "When user is the support unit, if lead unit has >1 HP, lead unit survives lethal attack with 1 HP remaining. Trigger % = (lead unit's Lck stat)",
		},

		"Healing_Descant": {
			"key": "Healing_Descant",
			"name": "Healing Descant",
			"description": "Allies within two spaces heal up to 10% HP at the start of their turn.",
		},

		"Vow_of_Friendship": {
			"key": "Vow_of_Friendship",
			"name": "Vow of Friendship",
			"description": "Grants user +3 damage dealt and -3 damage taken if allied main character has HP = 50% or less.",
		},

		"Highwayman": {
			"key": "Highwayman",
			"name": "Highwayman",
			"description": "After attacking a foe who can't fight back, target gets Str/Spd -3 (recovers 1/turn).",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && enemyObj.cannotRetaliate(userObj.attackRange)) {
					return {"Str": -3, "Spd": -3};
				}
			}
		},

		"Peacebringer": {
			"key": "Peacebringer",
			"name": "Peacebringer",
			"description": "All enemies and allies within two spaces deal -2 damage.",
		},

		"Forager": {
			"key": "Forager",
			"name": "Forager",
			"description": "Heal 20% of max HP if unit starts turn in mountain, woods, waste, or field space.",
		},

		"Fiery_Blood": {
			"key": "Fiery_Blood",
			"name": "Fiery Blood",
			"description": "This unit deals +4 damage when he or she has less than full HP.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP < userObj.maxHP) {
					combatObj[userObj.role + userObj.id].Atk += 4;		
				}
			}
		},

		"Quiet_Strength": {
			"key": "Quiet_Strength",
			"name": "Quiet Strength",
			"description": "Allies within two spaces take -2 damage.",
		},

		"Fearsome_Blow": {
			"key": "Fearsome_Blow",
			"name": "Fearsome Blow",
			"description": "When this unit initiates an attack that KOs a foe, adjacent enemies lose 20% HP.",
		},

		"Perfectionist": {
			"key": "Perfectionist",
			"name": "Perfectionist",
			"description": "Grants Hit/Avo +15 when this unit is at full HP.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP >= userObj.maxHP) {
					combatObj[userObj.role + userObj.id].Hit += 15;
					combatObj[userObj.role + userObj.id].Avo += 15;		
				}
			}
		},

		"Pyrotechnics": {
			"key": "Pyrotechnics",
			"name": "Pyrotechnics",
			"description": "If unit's HP = 50% or less and attacks, he and foes within two spaces lose 20% HP.",
		},

		"Capture": {
			"key": "Capture",
			"name": "Capture",
			"description": "Grants Capture command if the castle has a prison. Imprisons defeated foes.",
		},

		"Rallying_Cry": {
			"key": "Rallying_Cry",
			"name": "Rallying Cry",
			"description": "Allies within two spaces deal +2 damage.",
		},

		"Divine_Retribution": {
			"key": "Divine_Retribution",
			"name": "Divine Retribution",
			"description": "If unit has no weapon equipped, adjacent foes suffer half their inflicted damage.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var halfDamage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
				if (!userObj.equipped && enemyObj.attackRange == 1 && halfDamage > 0) {
					combatObj[userObj.role + userObj.id].counterDamage = 
						(combatObj[userObj.role + userObj.id].counterDamage || 0) + halfDamage;
					return true;
				}
			}
		},

		"Optimistic": {
			"key": "Optimistic",
			"name": "Optimistic",
			"description": "This unit recovers 150% the usual HP when healed by a staff.",
		},

		"Pride": {
			"key": "Pride",
			"name": "Pride",
			"description": "Unit deals +4 damage to foes of equal or higher level. (Adv. classes add +20.)",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				var userLevel = userObj.level, enemyLevel = enemyObj.level;
				if (userObj.classObj.classTier === "tier2") userLevel += 20;
				if (enemyObj.classObj.classTier === "tier2") enemyLevel += 20;
				if (userLevel < enemyLevel) {
					combatObj[userObj.role + userObj.id].Atk += 4;
				}
			}
		},

		"Nohr_Enmity": {
			"key": "Nohr_Enmity",
			"name": "Nohr Enmity",
			"description": "This unit deals +3 damage to Nohrian enemies.",
		},

		"Triple_Threat": {
			"key": "Triple_Threat",
			"name": "Triple Threat",
			"description": "If a sword, lance, or axe hit drops user's HP to 50% or less, foe suffers half the damage.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var damage = combatObj[enemyObj.role + enemyObj.id].damage;
				if (userObj.currentHP > (userObj.maxHP/2) && (userObj.currentHP - damage <= (userObj.maxHP/2) && enemyObj.equipped)
						&& ['Sword', 'Lance', 'Axe'].indexOf(enemyObj.equipped.generalType) > -1
						&& Math.floor(damage / 2) > 0) {
					combatObj[userObj.role + userObj.id].counterDamage = 
						(combatObj[userObj.role + userObj.id].counterDamage || 0) + Math.floor(damage / 2);
					return true;
				}
			}
		},

		"Competitive": {
			"key": "Competitive",
			"name": "Competitive",
			"description": "If supported by a same or higher-level unit, grants Crit +10 and +3/-1 dmg dealt/taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportEnabled && userObj.role === "lead" && userObj.level <= userObj.supportUnit.level) {
					combatObj[userObj.role + userObj.id].Atk += 3;
					combatObj[userObj.role + userObj.id].Def += 1;
					combatObj[userObj.role + userObj.id].Crit += 10;
				}
			}
		},

		"Shuriken_Mastery": {
			"key": "Shuriken_Mastery",
			"name": "Shuriken Mastery",
			"description": "If unit is hit by a shuriken, attacker also takes status effects and half the damage.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var halfDamage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
				if (enemyObj.equipped && ['Dagger'].indexOf(enemyObj.equipped.generalType) > -1) {
					if (halfDamage > 0) {
						combatObj[userObj.role + userObj.id].counterDamage = (combatObj[userObj.role + userObj.id].counterDamage || 0) + halfDamage;				
					}
					if (!combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs) {
						combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs = angular.copy(EMPTY_STATS);
					}
					if (enemyObj.equipped.enemyDebuffs) {
						Object.keys(enemyObj.equipped.enemyDebuffs).forEach(function(stat) {
							combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs[stat] = 
								Math.min(combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs[stat], enemyObj.equipped.enemyDebuffs[stat]);
						});
					}
					return true;
				}
			}
		},

		"Morbid_Celebration": {
			"key": "Morbid_Celebration",
			"name": "Morbid Celebration",
			"description": "This unit recovers up to 20% HP when he or she attacks and defeats an enemy.",
		},

		"Reciprocity": {
			"key": "Reciprocity",
			"name": "Reciprocity",
			"description": "When this unit is healed by a staff, the staff user also recovers half the same amount.",
		},

		"Bushido": {
			"key": "Bushido",
			"name": "Bushido",
			"description": "If supported by a same or lower-level unit, grants Crit +10 and +2/-2 dmg dealt/taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportEnabled && userObj.role === "lead" && userObj.level >= userObj.supportUnit.level) {
					combatObj[userObj.role + userObj.id].Atk += 2;
					combatObj[userObj.role + userObj.id].Def += 2;
					combatObj[userObj.role + userObj.id].Crit += 10;
				}
			}
		},

		"In_Extremis": {
			"key": "In_Extremis",
			"name": "In Extremis",
			"description": "Grants Crit +30 when this unit has 25% HP or less.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP <= userObj.maxHP/4) {
					combatObj[userObj.role + userObj.id].Crit += 30;
				}
			}
		},

		"Perspicacious": {
			"key": "Perspicacious",
			"name": "Perspicacious",
			"description": "Grants Hit +5 to all allies.",
		},

		"Draconic_Heir": {
			"key": "Draconic_Heir",
			"name": "Draconic Heir",
			"description": "Recover up to 15% of max HP at the start of each turn if a Dragonstone is equipped.",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Born_Steward": {
			"key": "Born_Steward",
			"name": "Born Steward",
			"description": "Grants Hit/Avo +20, +2 damage dealt, and -2 damage received in battle at My Castle.",
		},

		"Perfect_Pitch": {
			"key": "Perfect_Pitch",
			"name": "Perfect Pitch",
			"description": "Use \"Rally\" to heal lower-HP allies within two spaces each for 10% of their HP total.",
		},

		"Mischievous": {
			"key": "Mischievous",
			"name": "Mischievous",
			"description": "After combat this unit initiates, foe suffers Def -3 and may lose his or her clothing.",
			"enemyDebuffs": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && combatObj[userObj.role + userObj.id].successfulHit) {
					return {"Def": -3};
				}
			}
		},

		"Lucky_Charm": {
			"key": "Lucky_Charm",
			"name": "Lucky Charm",
			"description": "Grants +20% to the trigger rate for all this unit's Lck-based skills.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Noble_Cause": {
			"key": "Noble_Cause",
			"name": "Noble Cause",
			"description": "When supported by a damaged unit, grants user +3 damage dealt but +1 damage taken.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportEnabled && userObj.role === "lead") {
					var supportObj = userObj.supportUnit;
					if (supportObj.currentHP < supportObj.maxHP) {
						combatObj[userObj.role + userObj.id].Atk += 3;
						combatObj[userObj.role + userObj.id].Def -= 1;
					}
				}
			}
		},

		"Optimist": {
			"key": "Optimist",
			"name": "Optimist",
			"description": "Use \"Wait\" to gain Spd +4 and Lck +8 for one turn.",
		},

		"Sweet_Tooth": {
			"key": "Sweet_Tooth",
			"name": "Sweet Tooth",
			"description": "Use \"Wait\" to recover 4 HP as this unit raids a hidden sweets pouch.",

		},

		"Playthings": {
			"key": "Playthings",
			"name": "Playthings",
			"description": "Adjacent enemies lose 5 HP at start of each of this unit's turns.",
		},

		"Calm": {
			"key": "Calm",
			"name": "Calm",
			"description": "Use \"Wait\" to gain Skill/Res +4 for one turn.",
		},

		"Haiku": {
			"key": "Haiku",
			"name": "Haiku",
			"description": "If unit starts a turn between two allies in a vertical line, they recover 5, 7, and 5 HP.",
		},

		"Prodigy": {
			"key": "Prodigy",
			"name": "Prodigy",
			"description": "Deals +4 dmg to foes with Str/Mag > this unit's Str or Mag (whichever is higher).",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Vendetta": {
			"key": "Vendetta",
			"name": "Vendetta",
			"description": "If attacking an enemy this unit previously fought in this battle, +4 to damage dealt.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Lilys_Poise": {
			"key": "Lilys_Poise",
			"name": "Lily's Poise",
			"description": "Grants adjacent allies +1 to damage dealt and -3 to damage taken.",
		},

		"Misfortunate": {
			"key": "Misfortunate",
			"name": "Misfortunate",
			"description": "Enemies within two spaces get Ddg -15. This unit gets Ddg -5, however.",
		},

		"Puissance": {
			"key": "Puissance",
			"name": "Puissance",
			"description": "This unit inflicts +3 damage if her Str is at least 5 higher than the target's.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentStats.Str >= enemyObj.currentStats.Str + 5) {
					combatObj[userObj.role + userObj.id].Atk += 3;
				}
			}
		},

		"Aching_Blood": {
			"key": "Aching_Blood",
			"name": "Aching Blood",
			"description": "Crit +10 when using a forged weapon with a name at least 12 characters long.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {

			}
		},

		"Kidnap": {
			"key": "Kidnap",
			"name": "Kidnap",
			"description": "Grants Capture command if the castle has a prison. Imprisons defeated foes.",
		},

		"Countercurse": {
			"key": "Countercurse",
			"name": "Countercurse",
			"description": "If enemy initiates attack on this unit and deals magic damage, enemy suffers half the amount as well.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var halfDamage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
				if (enemyObj.equipped && enemyObj.equipped.damageType === "magical" && halfDamage > 0) {
					combatObj[userObj.role + userObj.id].counterDamage = 
						(combatObj[userObj.role + userObj.id].counterDamage || 0) + halfDamage;
					return true;
				}
			}	
		},

		"Roses_Thorn": {
			"key": "Roses_Thorn",
			"name": "Rose's Thorn",
			"description": "Grants adjacent allies +3 to damage dealt and -1 to damage taken.",
		},

		"Fierce_Rival": {
			"key": "Fierce_Rival",
			"name": "Fierce Rival",
			"description": "If this unit is the support unit in an Attack Stance and the lead unit lands a critical, this unit criticals as well (normal miss chance).",
		},

		"Opportunist": {
			"key": "Opportunist",
			"name": "Opportunist",
			"description": "When attacking a foe who can't fight back, this unit inflicts +4 damage.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === userObj && enemyObj.cannotRetaliate(userObj.attackRange)) {
					combatObj[userObj.role + userObj.id].Atk += 4;
				}
			}
		},

		"Fancy_Footwork": {
			"key": "Fancy_Footwork",
			"name": "Fancy Footwork",
			"description": "Use \"Rally\" to grant Str/Spd +1 to units within two spaces for one turn.",
		},

		"Bloodthirst": {
			"key": "Bloodthirst",
			"name": "Bloodthirst",
			"description": "If unit attacks and defeats a foe, grants +4 to Str/Mag/Skl/Spd for one turn.",
		},

		"Fierce_Mien": {
			"key": "Fierce_Mien",
			"name": "Fierce Mien",
			"description": "Enemies within two spaces have Avo -10.",
		},

		"Unmask": {
			"key": "Unmask",
			"name": "Unmask",
			"description": "Grants +4 to damage dealt and Crit +20 if enemy is female.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.charObj.gender === "F") {
					combatObj[userObj.role + userObj.id].Atk += 4;
					combatObj[userObj.role + userObj.id].Crit += 20;
				}
			}
		},

		"Pragmatic": {
			"key": "Pragmatic",
			"name": "Pragmatic",
			"description": "Grants +3 to damage dealt and -1 to damage taken against foes with less than full HP.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.currentHP < enemyObj.maxHP) {
					combatObj[userObj.role + userObj.id].Atk += 3;
					combatObj[userObj.role + userObj.id].Def += 1;
				}
			}
		},

		"Collector": {
			"key": "Collector",
			"name": "Collector",
			"description": "May obtain 3 gems or ingredients for first seven turns. Trigger % = (Lck stat).",
		},

		"Chivalry": {
			"key": "Chivalry",
			"name": "Chivalry",
			"description": "Grants +2 to damage dealt and -2 to damage taken against foes with full HP.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (enemyObj.currentHP >= enemyObj.maxHP) {
					combatObj[userObj.role + userObj.id].Atk += 2;
					combatObj[userObj.role + userObj.id].Def += 2;
				}
			}
		},

		"Icy_Blood": {
			"key": "Icy_Blood",
			"name": "Icy Blood",
			"description": "If this unit has less than full HP and is attacked by a nonadjacent foe, attacker takes half the inflicted damage and suffers Skl/Spd -3.",
			"counter": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.target !== userObj) return;
				var halfDamage = Math.floor(combatObj[enemyObj.role + enemyObj.id].damage / 2);
				if (userObj.currentHP < userObj.maxHP && enemyObj.equipped && enemyObj.attackRange > 1) {
					if (halfDamage > 0) {
						combatObj[userObj.role + userObj.id].counterDamage = (combatObj[userObj.role + userObj.id].counterDamage || 0) + halfDamage;
					}

					if (!combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs) {
						combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs = angular.copy(EMPTY_STATS);
					}
					var enemyDebuffs = {"Skl": -3, "Spd": -3};
					Object.keys(enemyDebuffs).forEach(function(stat) {
						combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs[stat] = 
							Math.min(combatObj[userObj.role + userObj.id].enemyUnstackableDebuffs[stat], enemyDebuffs[stat]);
					});

					return true;
				}
			},
		},

		"Gallant": {
			"key": "Gallant",
			"name": "Gallant",
			"description": "When supporting a female lead unit, she deals +2 damage.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.role == "support" && userObj.supportUnit.charObj.gender === "F") {
					var leadObj = userObj.supportUnit;
					if (!leadObj.supportEnabled) return;
					combatObj[leadObj.role + leadObj.id].Atk += 2;
				}
			}
		},

		"Fierce_Counter": {
			"key": "Fierce_Counter",
			"name": "Fierce Counter",
			"description": "When attacked by male enemy, this unit deals +2 damage.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (combatObj.initiator === enemyObj && enemyObj.charObj.gender === "M") {
					combatObj[userObj.role + userObj.id].Atk += 2;
				}
			}
		},

		"Guarded_Bravery": {
			"key": "Guarded_Bravery",
			"name": "Guarded Bravery",
			"description": "When supported, this unit takes -2 damage. If unsupported, this unit takes +2 damage.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportEnabled) {
					combatObj[userObj.role + userObj.id].Atk += 2;
				} else {
					combatObj[userObj.role + userObj.id].Def -= 2;
				}
			}
		},

		"Goody_Basket": {
			"key": "Goody_Basket",
			"name": "Goody Basket",
			"description": "Recover 10 HP at the start of each turn. Trigger % = (Lck stat)",
			"beginningOfTurn": function(userObj, enemyObj, combatObj, detailsObj) {
				var procRate = userObj.currentStats.Lck + (combatObj[userObj.role + userObj.id].procRateBonus || 0);
				if (Math.floor(Math.random()*100) < procRate) {
					userObj.beginningOfTurnHeal = (userObj.beginningOfTurnHeal || 0) + 10;
				}

			}
		},

		"Fortunate_Son": {
			"key": "Fortunate_Son",
			"name": "Fortunate Son",
			"description": "Allies within two spaces get Ddg +15. This unit gets Ddg +5.",
		},

		"Bibliophile": {
			"key": "Bibliophile",
			"name": "Bibliophile",
			"description": "Grants Crit +10 when this unit is carrying three or more tomes/scrolls.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				var numTomes = 0;
				userObj.inventory.forEach(function(item) {
					if (item && item.generalType === "Tome") numTomes++;
				});
				if (numTomes >= 3) {
					combatObj[userObj.role + userObj.id].Crit += 10;
				}
			}

		},

		"Sisterhood": {
			"key": "Sisterhood",
			"name": "Sisterhood",
			"description": "Deals +2 damage and takes -2 damage when supported by a female ally.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.supportEnabled && userObj.role === "lead" 
					&& userObj.supportUnit.charObj && userObj.supportUnit.charObj.gender === "F") {
					combatObj[userObj.role + userObj.id].Atk += 2;
					combatObj[userObj.role + userObj.id].Def += 2;
				}
			}
		},

		"Daydream": {
			"key": "Daydream",
			"name": "Daydream",
			"description": "If adjacent to paired male allies, grants +2 damage dealt and -2 damage taken.",
		},

		"Wind_Disciple": {
			"key": "Wind_Disciple",
			"name": "Wind Disciple",
			"description": "Grants Hit/Avo +10 when unit has less than full HP.",
			"combatEffect": function(userObj, enemyObj, combatObj, detailsObj) {
				if (userObj.currentHP < userObj.maxHP) {
					combatObj[userObj.role + userObj.id].Hit += 10;
					combatObj[userObj.role + userObj.id].Avo += 10;
				}
			}

		},

		"Make_a_Killing": {
			"key": "Make_a_Killing",
			"name": "Make a Killing",
			"description": "Obtain gold when this unit attacks and defeats a foe. Trigger % = (Lck stat)",
		}

	};

	Object.keys(classSkills).forEach(function(skill, idx) {
		classSkills[skill].pk = idx;
	});
	Object.keys(personalSkills).forEach(function(skill, idx) {
		personalSkills[skill].pk = idx;
	});




	this.getAllSkills = function() {
		return angular.extend({}, classSkills, personalSkills);
	};

	this.getClassSkills = function() {
		return angular.copy(classSkills);
	};

	this.getPersonalSkills = function() {
		return angular.copy(personalSkills);
	};

	this.getClassSkillByPK = function(pk) {
		var classSkillKeys = Object.keys(classSkills);
		for (var i=0; i<classSkillKeys.length; i++) {
			if (classSkills[classSkillKeys[i]].pk == pk) {
				return angular.copy(classSkills[classSkillKeys[i]]);
				break;
			}
		}
	};




});