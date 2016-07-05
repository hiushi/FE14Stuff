app.service('BattleEngine', 
	['Characters', 'Classes', 'Skills', 'Weapons', 'utils', '$timeout', '$interval',
	function(Characters, Classes, Skills, Weapons, utils, $timeout, $interval) {

		var CHARS = Characters.getCharacters();
		var CLASSES = Classes.getClasses();
		var SKILLS = Skills.getAllSkills();
		var CLASS_SKILLS = Skills.getClassSkills();
		var WEAPONS = Weapons.getWeapons();


		/** 
		 * Miscellaneous rules, coefficients, templates, etc.
		 */
		var EMPTY_STATS = {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0};

		var WEAPON_RANK_BONUS = {
			"Sword": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 2}, "A": {"Atk": 3}, "S": {"Atk": 4, "Hit": 5}
			},
			"Lance": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 1, "Hit": 5}, "A": {"Atk": 2, "Hit": 5}, "S": {"Atk": 3, "Hit": 10}
			},
			"Axe": {
				"E": {}, "D": {}, "C": {"Hit": 5}, "B": {"Hit": 10}, "A": {"Atk": 1, "Hit": 10}, "S": {"Atk": 2, "Hit": 15}
			},
			"Dagger": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 2}, "A": {"Atk": 3}, "S": {"Atk": 4, "Hit": 5}
			},
			"Bow": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 1, "Hit": 5}, "A": {"Atk": 2, "Hit": 5}, "S": {"Atk": 3, "Hit": 10}
			},
			"Tome": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 1, "Hit": 5}, "A": {"Atk": 2, "Hit": 5}, "S": {"Atk": 3, "Hit": 10}
			},
			"Staff": {
				"E": {}, "D": {}, "C": {"Heal": 1}, "B": {"Heal": 1, "Hit": 5}, "A": {"Heal": 2, "Hit": 5}, "S": {"Heal": 3, "Hit": 10}
			},
			"Stone": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 1, "Hit": 5}, "A": {"Atk": 2, "Hit": 5}, "S": {"Atk": 3, "Hit": 10}
			},
			"Other": {
				"E": {}, "D": {}, "C": {"Atk": 1}, "B": {"Atk": 1, "Hit": 5}, "A": {"Atk": 2, "Hit": 5}, "S": {"Atk": 3, "Hit": 10}
			},
		};

		var WEAPON_TRIANGLE = {
			"Sword": {
				"strongAgainst": ["Axe", "Bow"], "weakAgainst": ["Lance", "Dagger"] 
			},
			"Lance": {
				"strongAgainst": ["Sword", "Tome"], "weakAgainst": ["Axe", "Bow"]
			},
			"Axe": {
				"strongAgainst": ["Lance", "Dagger"], "weakAgainst": ["Sword", "Tome"]
			},
			"Tome": {
				"strongAgainst": ["Axe", "Bow"], "weakAgainst": ["Lance", "Dagger"] 
			},
			"Dagger": {
				"strongAgainst": ["Sword", "Tome"], "weakAgainst": ["Axe", "Bow"]
			},
			"Bow": {
				"strongAgainst": ["Lance", "Dagger"], "weakAgainst": ["Sword", "Tome"]
			},
			"Stone": {
				"strongAgainst": [], "weakAgainst": []
			},
			"Other": {
				"strongAgainst": [], "weakAgainst": []
			}
		};
		this.WEAPON_TRIANGLE = WEAPON_TRIANGLE;

		var WEAPON_TRIANGLE_EFFECT = {
			"Advantage": {
				"E": {"Hit": 5}, "D": {"Hit": 5}, "C": {"Hit": 10}, "B": {"Atk": 1, "Hit": 10}, "A": {"Atk": 1, "Hit": 15}, "S": {"Atk": 2, "Hit": 20}
			},
			"Disadvantage": {
				"E": {"Hit": -5}, "D": {"Hit": -5}, "C": {"Hit": -10}, "B": {"Atk": -1, "Hit": -10}, "A": {"Atk": -1, "Hit": -15}, "S": {"Atk": -2, "Hit": -20}
			}
		};


		var TERRAIN_EFFECT = {
			"Acid Bog": {"Def": 0, "Avo": 0, "HP": -10},
			"Desert": {"Def": 0, "Avo": -10, "HP": 0},
			"Field": {"Def": 1, "Avo": 10, "HP": 0},
			"Fort": {"Def": 2, "Avo": 20, "HP": 20},
			"Healtile": {"Def": 0, "Avo": 0, "HP": 20},
			"Hole": {"Def": 2, "Avo": 20, "HP": 20},
			"Lava": {"Def": 0, "Avo": 0, "HP": -10},
			"Marsh": {"Def": 0, "Avo": 0, "HP": -10},
			"Moat": {"Def": 0, "Avo": -10, "HP": 0},
			"Mountain": {"Def": 2, "Avo": 20, "HP": 0},
			"Spikes": {"Def": 0, "Avo": 0, "HP": -10},
			"Stairs": {"Def": 0, "Avo": 10, "HP": 0},
			"Throne": {"Def": 3, "Avo": 30, "HP": 20},
			"Village": {"Def": 1, "Avo": 5, "HP": 0},
			"Waste": {"Def": 0, "Avo": -10, "HP": 0},
			"Water": {"Def": 0, "Avo": -10, "HP": 0},
			"Woods": {"Def": 1, "Avo": 10, "HP": 0},		
		};
		this.TERRAIN_EFFECT = TERRAIN_EFFECT;


		var logQueue = [];
		var logInterval;
		var hpChangeQueue = [];
		var hpChangeInterval;

		/**
		 * Constructor function for unit
		 * @param id: `A` or `B`
		 * @param role: `lead` or `support`
		 */
		var BattleUnit = function(id, role) {
			this.id = id;
			this.role = role;

			this.debuffs = {};



			// Default specs
			this.level = 99;
			this.skills = [null, null, null, null, null, null];
			this.inventory = [null, null, null, null, null];
			this.prepInventory = [null, null, null, null, null];
			
		};
		this.Unit = BattleUnit;



		BattleUnit.prototype.getUnit = function() {
			return this.charObj;
		};

		BattleUnit.prototype.setUnit = function(charKey) {
			var charObj = this.charObj = CHARS[charKey];
			this.name = charObj.name;
			this.unitKey = charObj.key;

			if (charObj.gen == 2) {

			}

			this.setPersonalSkill();
			this.setValidClasses();
			this.initializeStats();

		};

		BattleUnit.prototype.getClass = function() {
			return this.classObj;
		};

		BattleUnit.prototype.setClass = function(classKey) {
			var classObj = this.classObj = CLASSES[classKey];
			this.className = classObj.name;
			this.classKey = classObj.key;

			var self = this;

			this.initializeStats();

			this.weaponRanks = {};
			Object.keys(classObj.weaponRanks).forEach(function(weaponType) {
				self.setWeaponRank(weaponType, classObj.weaponRanks[weaponType]);
			});
		};




		BattleUnit.prototype.setInventory = function(index) {
			var prepSlot = this.prepInventory[index];
			var item = prepSlot.item;
			this.inventory[index] = new Weapons.Weapon(item.key);
			if (prepSlot.forgeLevel)
				this.inventory[index].setForgeLevel(prepSlot.forgeLevel);

		};




		BattleUnit.prototype.setSupportUnit = function(supportUnitObj) {
			this.supportUnit = supportUnitObj;
		};

		BattleUnit.prototype.setValidClasses = function() {
			if (!this.charObj) return;
			this.validClasses = Classes.getClassesByGender(this.charObj.gender);
		};


		BattleUnit.prototype.setVarParent = function() {
			this.initializeStats();
		};


		// fills in default values for stats at prep screen. can be turned off
		BattleUnit.prototype.initializeStats = function() {
			if (!this.charObj || !this.classObj) return;
			var classCaps = this.classObj.maxStats;
			var mods = this.charObj.mods;
			this.baseStats = {};
			if (this.charObj.gen == 2 && !this.varParent) return;

			var self = this;
			Object.keys(classCaps).forEach(function(stat) {
				if (stat === "HP") {
					self.maxHP = classCaps["HP"];
					self.baseHP = classCaps["HP"];
				}
				else {
					if (self.unitKey.indexOf('Avatar') == 0) {
						self.setAvatarInfo();
					}
					else if (self.charObj.gen == 2 && self.varParent) {
						self.setChildInfo();
					} 
					else
						self.baseStats[stat] = classCaps[stat] + mods[stat];
				}
			});
		};


		BattleUnit.prototype.setAvatarInfo = function() {
			if (!this.charObj || !this.avatarBoon || !this.avatarBane) return;
			var self = this;

			// autofilled max stats
			if (this.classObj) {
				var mods = angular.copy(Characters.AVATAR_MODS.caps.Base);
				this.baseStats = {};
				Object.keys(mods).forEach(function(stat) {
					if (stat != 'HP')
						self.baseStats[stat] = self.classObj.maxStats[stat] + Characters.AVATAR_MODS.caps.Boon[self.avatarBoon][stat] + Characters.AVATAR_MODS.caps.Bane[self.avatarBane][stat];
				});
			}

			// pairup stats
			this.charObj.pairUpStats = {"B": {"Def": 1}, "A": {"Spd": 1}};
			if (this.avatarBoon == "HP")
				angular.extend(this.charObj.pairUpStats, {"C": {"Res": 1}, "S": {"Res": 1, "Def": 1}});
			else if (this.avatarBoon == "Str")
				angular.extend(this.charObj.pairUpStats, {"C": {"Skl": 1}, "S": {"Res": 1, "Str": 1}});
			else if (this.avatarBoon == "Mag")
				angular.extend(this.charObj.pairUpStats, {"C": {"Spd": 1}, "S": {"Res": 1, "Mag": 1}});
			else if (this.avatarBoon == "Skl")
				angular.extend(this.charObj.pairUpStats, {"C": {"Def": 1}, "S": {"Res": 1, "Skl": 1}});
			else if (this.avatarBoon == "Spd")
				angular.extend(this.charObj.pairUpStats, {"C": {"Lck": 1}, "S": {"Res": 1, "Spd": 1}});
			else if (this.avatarBoon == "Lck")
				angular.extend(this.charObj.pairUpStats, {"C": {"Str": 1}, "S": {"Res": 1, "Lck": 1}});
			else if (this.avatarBoon == "Def")
				angular.extend(this.charObj.pairUpStats, {"C": {"Res": 1}, "S": {"Res": 1, "Def": 1}});
			else if (this.avatarBoon == "Res")
				angular.extend(this.charObj.pairUpStats, {"C": {"Mag": 1}, "S": {"Res": 2}});

		};

		BattleUnit.prototype.setChildInfo = function() {
			if (!this.charObj || !this.varParent) return;
			var self = this;

			var CHILD_MOD_BONUS = Characters.CHILD_MOD_BONUS;
			var fixedParent = Characters.getCharacter(this.charObj.parent);
			var varParent = this.varParent;

			// regular 2nd gen child (not 3rd gen Kana)
			if (this.varParent.gen == 1) {
				self.baseStats = {};
				Object.keys(CHILD_MOD_BONUS).forEach(function(stat) {
					self.baseStats[stat] = self.classObj.maxStats[stat] + fixedParent.mods[stat] + varParent.mods[stat] + CHILD_MOD_BONUS[stat];
				});
			}

			// check if a weakness is inherited from parents
			if (this.varParent.weakness) {
				if (!self.weakness) self.weakness = [];
				this.varParent.weakness.forEach(function(weakness) {
					if (self.weakness.indexOf(weakness) == -1) self.weakness.push(weakness);
				});
			}
		}


		BattleUnit.prototype.setPersonalSkill = function() {
			if (!this.charObj) return;
			this.skills[0] = SKILLS[this.charObj.personalSkill];
		};

		BattleUnit.prototype.setWeaponRank = function(weaponType, weaponRank) {
			if (!this.weaponRanks) this.weaponRanks = {};
			this.weaponRanks[weaponType] = weaponRank;
		};


		BattleUnit.prototype.setCurrentStats = function() {
			this.currentStats = {};
			this.maxHP = this.baseHP;
			if (!this.currentHP)
				this.currentHP = this.maxHP;
			var self = this;
			["Str","Mag","Skl","Spd","Lck","Def","Res"].forEach(function(stat) {
				self.currentStats[stat] = self.baseStats[stat];
			});
			this.calculateCurrentStats();
		};


		BattleUnit.prototype.equipWeapon = function(weaponObj, isPlayersTurn) {
			if (weaponObj === undefined) return;
			if (isPlayersTurn && !this.canInitiateWithWeaponAtRange(weaponObj)) return;
			if (weaponObj === null) this.equipped = null;
			else {
				// if currently equipped weapon is selected, unequip it
				if (this.equipped == weaponObj) this.equipped = null;
				else if (this.canUseWeapon(weaponObj)) this.equipped = weaponObj;		
			}


			this.calculateCurrentStats();
			this.calculateCombatStats();
		};

		BattleUnit.prototype.canUseWeapon = function(weaponObj) {
			if (!weaponObj) return;

			// don't allow equipping of a weapon that:

			// - the unit's class can't use
			if (Object.keys(this.weaponRanks).indexOf(weaponObj.generalType) == -1)
				return false;

			// - is a Prf weapon that don't belong to the unit
			if (weaponObj.usableBy && !weaponObj.usableBy(this))
				return false;

			// - is limited only to certain classes
			if (weaponObj.limitedToClasses && weaponObj.limitedToClasses.indexOf(this.classKey) == -1)
				return false;

			// - exceeds the unit's weapon rank
			if (utils.getWeaponRankIndex(this.weaponRanks[weaponObj.generalType]) < utils.getWeaponRankIndex(weaponObj.rank))
				return false;

			// otherwise, allow equipping weapon
			return true;
		};

		BattleUnit.prototype.canInitiateWithWeaponAtRange = function(weaponObj) {
			if (!weaponObj || !this.attackRange) return;
			return weaponObj.range.indexOf(this.attackRange) > -1;
		};
		BattleUnit.prototype.changeAttackRange = function() {
			var self = this;
			var attackRange = this.attackRange;
			// if unit switches to a range where currently equipped weapon can no longer be used
			if (!this.canInitiateWithWeaponAtRange(this.equipped)) {
				// unequip current weapon
				this.equipWeapon(this.equipped);

				// equip first weapon in inventory that can be used at the new range
				this.inventory.forEach(function(item) {
					if (!item || !item.range || self.equipped) return;
					if (item.range.indexOf(self.attackRange) > -1) {
						self.equipWeapon(item);
					}
				});
			}
		};
		BattleUnit.prototype.cannotRetaliate = function(attackRange) {
			if (!this.equipped) return true;
			if (this.equipped.range.indexOf(attackRange) == -1) return true;
			return false;
		};

		BattleUnit.prototype.isWeakTo = function(weakness) {
			// handle case where weakness is a type of weapon instead of a standard weakness
			if (['Sword', 'Lance', 'Axe', 'Dagger', 'Bow', 'Tome', 'Stone'].indexOf(weakness) > -1) {
				return this.equipped && this.equipped.generalType === weakness;
			}

			return (this.weakness && this.weakness.indexOf(weakness) > -1) 
				|| (this.charObj.weakness && this.charObj.weakness.indexOf(weakness) > -1)
				|| (this.classObj.weakness && this.classObj.weakness.indexOf(weakness) > -1);
		};

		BattleUnit.prototype.getPairUpStatMods = function() {
			if (this.role == "lead" && this.supportEnabled && this.supportStance == "Guard") {
				var supportLevel = this.supportLevel;
				var supportUnit = this.supportUnit;

				var charPairUpStats = supportUnit.charObj.pairUpStats;	// by individual support level
				var classPairUpStats = supportUnit.classObj.pairUpStats;

				var totalCharPairUpStats = angular.copy(EMPTY_STATS);
				var allSupportLevels = ['C', 'B', 'A', 'S'];
				var indexOfSupportLevel = allSupportLevels.indexOf(supportLevel);
				allSupportLevels = (indexOfSupportLevel > -1) ? allSupportLevels.slice(0, indexOfSupportLevel+1) : [];
				allSupportLevels.forEach(function(level) {
					Object.keys(charPairUpStats[level]).forEach(function(stat) {
						totalCharPairUpStats[stat] += charPairUpStats[level][stat];
					});
				});
				return totalCharPairUpStats;			
			}
		};

		BattleUnit.prototype.getSupportBonuses = function() {
			if (this.role == "lead" && this.supportEnabled) {
				var supportLevel = this.supportLevel;
				var supportUnit = this.supportUnit;

				var charSupportBonuses = supportUnit.charObj.supportBonus;

				var totalCharSupportBonuses = {"Hit": 0, "Avo": 0, "Crit": 0, "Ddg": 0};
				var allSupportLevels = ['C', 'B', 'A', 'S'];
				var indexOfSupportLevel = allSupportLevels.indexOf(supportLevel);
				allSupportLevels = (indexOfSupportLevel > -1) ? allSupportLevels.slice(0, indexOfSupportLevel+1) : [];

				if (this.supportStance == "Attack") {
					if (angular.equals(allSupportLevels, [])) {
						totalCharSupportBonuses.Hit += 10;
					} else {
						allSupportLevels.forEach(function(level) {
							Object.keys(charSupportBonuses[level]).forEach(function(stat) {
								totalCharSupportBonuses[stat] += charSupportBonuses[level][stat];
							})
						});
					}
				}
				else if (this.supportStance == "Guard") {
					totalCharSupportBonuses.Ddg += 5;
				}
				return totalCharSupportBonuses;
			}
		};

		BattleUnit.prototype.getValidAttackRanges = function() {
			var self = this;
			var rangeArrays = this.inventory.map(function(item) {
				return (item && item.range && self.canUseWeapon(item)) ? item.range : [];
			});

			var ranges = [];
			rangeArrays.forEach(function(rangeArray) {
				rangeArray.forEach(function(range) {
					if (ranges.indexOf(range) == -1)
						ranges.push(range);
				});
			});
			ranges.sort();
			return ranges;
		};


		BattleUnit.prototype.calculateCurrentStats = function() {
			var self = this;

			// reset current stats
			this.currentStats = angular.copy(this.baseStats);
			this.statMods = {"HP": [], "Str": [], "Mag": [], "Skl": [], "Spd": [], "Lck": [], "Def": [], "Res": []};


			// halved
			if (this.halved && this.halved.status === "active") {
				var stat = this.halved.stat;
				var statDrop = Math.floor(this.currentStats[stat] / 2) * -1;
				this.currentStats[stat] += statDrop;
				this.statMods[stat].push({reason: 'Halved', value: statDrop});
			}

			// weakened (i.e. debuffed)
			var debuffedStats = angular.copy(EMPTY_STATS);

			if (this.debuffs) {
				Object.keys(this.debuffs).forEach(function(stat) {
					if (self.currentStats[stat] + self.debuffs[stat] < 0)
						self.debuffs[stat] = self.currentStats[stat] * -1;
					debuffedStats[stat] += self.debuffs[stat];
				});
			}


			Object.keys(debuffedStats).forEach(function(stat) {
				if (debuffedStats[stat]) {
					self.currentStats[stat] += debuffedStats[stat];
					self.statMods[stat].push({reason: 'Weakened', value: debuffedStats[stat]});					
				}
			});

			// pair up
			if (this.role == "lead" && this.supportEnabled && this.supportStance == "Guard") {
				var pairUpStatMods = this.getPairUpStatMods();
				Object.keys(pairUpStatMods).forEach(function(stat) {
					pairUpStatMods[stat] += (self.supportUnit.classObj.pairUpStats[stat] || 0);

					if (pairUpStatMods[stat]) {					
						self.currentStats[stat] += pairUpStatMods[stat];
						self.statMods[stat].push({reason: "Pair Up", value: pairUpStatMods[stat]});
					}

				});

			}

			// equipped weapon
			if (this.equipped) {
				var weapon = this.equipped;
				var weaponMods = weapon.statMods;
				if (weaponMods) {
					Object.keys(weaponMods).forEach(function(stat) {
						if (weaponMods[stat]) {
							self.currentStats[stat] += weaponMods[stat];
							self.statMods[stat].push({reason: weapon.name, value: weaponMods[stat]});						
						}
					});			
				}
			}

			// skills
			self.skills.forEach(function(skill) {
				if (!skill) return;
				if (skill.statMods) {
					var skillMods = skill.statMods(self);
					Object.keys(skillMods).forEach(function(stat) {
						if (skillMods[stat]) {
							if (stat === "HP") self.maxHP += skillMods[stat];
							else self.currentStats[stat] += skillMods[stat];
							self.statMods[stat].push({reason: skill.name, value: skillMods[stat]});						
						}
					});						
				}
			});

			// boosts from possession in inventory
			Object.keys(self.inventory).forEach(function(item) {
				var weapon = self.inventory[item];
				if (!weapon) return;
				var possessionMods = weapon.possessionMods;
				if (possessionMods) {
					if (weapon.usableBy && !weapon.usableBy(this)) return;
					Object.keys(possessionMods).forEach(function(stat) {
						if (possessionMods[stat]) {
							self.currentStats[stat] += possessionMods[stat];
							self.statMods[stat].push({reason: weapon.name+" (Inventory)", value: possessionMods[stat]});
						}
					});
				}
			});

			// surge
			if (this.surge) {
				['stat1', 'stat2'].forEach(function(statNum) {
					var stat = self.surge[statNum];
					if (!stat) return;
					self.currentStats[stat] += 4;
					self.statMods[stat].push({reason: "Status", value: 4});
				});
			}

			// meal
			if (this.meal) {
				Object.keys(this.meal).forEach(function(stat) {
					var value = self.meal[stat];
					if (value) {
						self.currentStats[stat] += value;
						self.statMods[stat].push({reason: "Meal", value: value});
					}
				})
			}

		};

		// combat stats for unit preview, not combat forecast
		BattleUnit.prototype.calculateCombatStats = function() {
			var self = this;
			if (!this.combatStats) this.combatStats = {};

			this.calculateAtk();
			this.calculateHit();
			this.calculateCrit();
			this.calculateAvo();
		};



		BattleUnit.prototype.calculateAtk = function() {
			if (!this.equipped) this.combatStats.Atk = null;
			else {
				var atk = 0;

				atk += (this.equipped.damageType == "magical") ? this.currentStats.Mag : this.currentStats.Str;
				atk += this.equipped.Mt;

				var weaponType = this.equipped.generalType;
				if (WEAPON_RANK_BONUS[weaponType][this.weaponRanks[weaponType]]) {
					atk += WEAPON_RANK_BONUS[weaponType][this.weaponRanks[weaponType]].Atk || 0;
				}

				this.combatStats.Atk = Math.floor(atk);
			}
		};
		BattleUnit.prototype.calculateHit = function() {
			if (!this.equipped) this.combatStats.Hit = null;
			else {
				var hit = 0;
				hit += (this.currentStats.Skl * 1.5) + (this.currentStats.Lck * 0.5);
				hit += this.equipped.Hit;

				var weaponType = this.equipped.generalType;
				if (WEAPON_RANK_BONUS[weaponType][this.weaponRanks[weaponType]]) {
					hit += WEAPON_RANK_BONUS[weaponType][this.weaponRanks[weaponType]].Hit || 0;
				}



				this.combatStats.Hit = Math.floor(hit);
			}
		};
		BattleUnit.prototype.calculateCrit = function() {
			if (!this.equipped) this.combatStats.Crit = null;
			else if (this.equipped.disableCrit) this.combatStats.Crit = 0;
			else {
				var crit = 0;
				crit += ((this.currentStats.Skl - 4) * 0.5);
				crit += this.equipped.Crit;		

				this.combatStats.Crit = Math.floor(crit);
			}
			
		};
		BattleUnit.prototype.calculateAvo = function() {
			var avo = 0;
			avo += (this.currentStats.Spd * 1.5) + (this.currentStats.Lck * 0.5);
			if (this.equipped) {
				avo += this.equipped.Avo;
			}

			this.combatStats.Avo = Math.floor(avo);
		};

		BattleUnit.prototype.setTerrain = function() {
			var terrainEffect = this.terrainEffect;
			var terrainType = terrainEffect.type;
			if (terrainType) {
				terrainEffect.stats = TERRAIN_EFFECT[terrainType];
			} else {
				terrainEffect.stats = null;
			}
		};



		BattleUnit.prototype.animateDamage = function(damage) {
			var self = this;
			var startHP = null;
			var endHP = null;

			var damageInterval = function() {
				if (startHP === null) {
					startHP = self.shownHP;
					endHP = Math.max(startHP - damage, 0);
				}

				if (self.shownHP <= endHP) {
					$interval.cancel(hpChangeInterval);
					hpChangeQueue.shift();
					if (hpChangeQueue.length)
						hpChangeInterval = $interval(hpChangeQueue[0], 40);
				}
				else {
					if (self.shownHP <= 80) {
						var hpBar = document.querySelector('#hp-bar'+self.id+'-'+self.shownHP);
						hpBar.className = hpBar.className.replace('hp-bar-full', 'hp-bar-empty');					
					}
					self.shownHP--;
				}
			};

			hpChangeQueue.push(damageInterval);
			if (hpChangeQueue[0] === damageInterval) {
				hpChangeInterval = $interval(hpChangeQueue[0], 40);  
			}
		};
		BattleUnit.prototype.animateHeal = function(hp) {
			var self = this;
			var startHP = null;
			var endHP = null;

			var healInterval = function() {
				if (startHP === null) {
					startHP = self.shownHP;
					endHP = Math.min(startHP + hp, self.maxHP);
				}

				if (self.shownHP >= endHP) {
					$interval.cancel(hpChangeInterval);
					hpChangeQueue.shift();
					if (hpChangeQueue.length)
						hpChangeInterval = $interval(hpChangeQueue[0], 40);
				}
				else {
					self.shownHP++;
					if (self.shownHP <= 80) {
						var hpBar = document.querySelector('#hp-bar'+self.id+'-'+self.shownHP);
						hpBar.className = hpBar.className.replace('hp-bar-empty', 'hp-bar-full');					
					}
				}
			};
			hpChangeQueue.push(healInterval);
			if (hpChangeQueue[0] === healInterval) {
				hpChangeInterval = $interval(hpChangeQueue[0], 40);  
			}
		};





		/**
		 * Constructor function for battle instance
		 * @params leadA, leadB, supportA, supportB: objects corresponding to the
		 *         already created BattleUnit instances
		 */
		var Battle = function(leadA, leadB, supportA, supportB) {
			this.leadA = leadA;
			this.leadB = leadB;
			this.supportA = supportA;
			this.supportB = supportB;

			this.combatObj = {};
			this.detailsObj = {turn: 1, phase: 'A'};

			this.battleLog = [];


		};
		this.Battle = Battle;

		Battle.prototype.setInitiator = function(unitObj) {
			// this.initiatorObj = unitObj;
			this.combatObj.initiator = unitObj;
		};
		Battle.prototype.setTarget = function(unitObj) {
			// this.targetObj = unitObj;
			this.combatObj.target = unitObj;
		};

		// for combat forecast and actual battle
		Battle.prototype.setupDefaultCombatStatsForUnit = function(unitObj) {
			var combatUnitObj = this.combatObj[unitObj.role + unitObj.id] = {};

			angular.extend(combatUnitObj, {
				Atk: 0, Def: 0, Hit: 0, Avo: 0, Crit: 0, Ddg: 0,
				offAtkSpd: unitObj.currentStats.Spd, defAtkSpd: unitObj.currentStats.Spd
			});


		};

		Battle.prototype.setupCombatObj = function() {
			var self = this;

			window.combatObj = this.combatObj;
			var leadA = this.leadA, leadB = this.leadB;
			var supportA = this.supportA, supportB = this.supportB;

			this.setupDefaultCombatStatsForUnit(leadA);
			this.setupDefaultCombatStatsForUnit(leadB);
			if (leadA.supportEnabled) this.setupDefaultCombatStatsForUnit(supportA);
			if (leadB.supportEnabled) this.setupDefaultCombatStatsForUnit(supportB);


			['A', 'B'].forEach(function(id) {
				var lead, support, enemy, enemySupport;
				if (id === 'A') {
					lead = leadA, support = supportA, enemy = leadB, enemySupport = supportB;
				}
				else if (id === 'B') {
					lead = leadB, support = supportB, enemy = leadA, enemySupport = supportA;
				}


				self.combatObj[lead.role + lead.id].healFns = [];
				self.combatObj[lead.role + lead.id].counterDamage = 0;

				// go through skills for combat Effects
				lead.skills.forEach(function(skill) {
					if (!skill) return;
					if (skill.combatEffect) {
						skill.combatEffect(lead, enemy, self.combatObj, self.detailsObj);
					}
				});


				// check equipped weapon for combat effects
				if (lead.equipped && lead.equipped.combatEffect) {
					lead.equipped.combatEffect(lead, enemy, self.combatObj, self.detailsObj);
				}

				if (lead.supportEnabled) {
					support.skills.forEach(function(skill) {
						if (!skill) return;
						if (skill.combatEffect) {
							skill.combatEffect(support, enemy, self.combatObj, self.detailsObj);
						}
					});
					if (support.equipped && support.equipped.combatEffect) {
						support.equipped.combatEffect(support, enemy, self.combatObj, self.detailsObj);
					}
				}

				self.calculateCombatAtk(lead);
				self.calculateCombatHit(lead);
				self.calculateCombatCrit(lead);
				if (lead.supportEnabled && lead.supportStance === "Attack") {
					self.calculateCombatAtk(support);
					self.calculateCombatHit(support);
					self.calculateCombatCrit(support);
				}

			});

		};



		Battle.prototype.calculateCombatAtk = function(attackerObj) {
			if (!attackerObj) return;
			var self = this;
			var attackerKey = attackerObj.role + attackerObj.id;
			var defenderObj = (attackerObj === this.leadB) ? this.leadA : this.leadB;
			var defenderKey = defenderObj.role + defenderObj.id;


			var attackerWeapon = attackerObj.equipped, defenderWeapon = defenderObj.equipped;
			if (!attackerWeapon) {
				this.combatObj[attackerKey].Atk = null;
				return;
			}
			// if user is the target, and user cannot attack at initiator's attack range, then user can't retaliate
			else if (this.combatObj.target === attackerObj && attackerObj.cannotRetaliate(defenderObj.attackRange)) {
				this.combatObj[attackerKey].Atk = null;
				return;
			}


			var attackerWeaponType = attackerWeapon.generalType;
			var defenderWeaponType;
			if (defenderWeapon) defenderWeaponType = defenderWeapon.generalType;

			var atk = this.combatObj[attackerKey].Atk || 0;
			// Unit's strength or magic
			atk += (attackerWeapon.damageType == 'magical') ? attackerObj.currentStats.Mag : attackerObj.currentStats.Str;
			
			// Weapon mt (includes effective bonuses/penalties)
			var mt = attackerWeapon.Mt;

			// effective damage coefficient
			if (attackerWeapon.effectiveAgainst) {
				var defenderIsWeak = false;
				attackerWeapon.effectiveAgainst.forEach(function(weakness) {
					if (defenderObj.isWeakTo(weakness)) {
						defenderIsWeak = true;
						var effectiveCoeff = attackerWeapon.effectiveCoeff || 3;
						if (!this.combatObj[attackerKey].effectiveCoeff ||
								effectiveCoeff > this.combatObj[attackerKey].effectiveCoeff) {
							this.combatObj[attackerKey].effectiveCoeff = effectiveCoeff;
						}
					}
				});
				// penalty for using Armorslayers against non-armored units, etc.
				if (!defenderIsWeak && attackerWeapon.ineffectiveMods) {
					mt += attackerWeapon.ineffectiveMods.Mt;
				}

			}

			mt *= (this.combatObj[attackerKey].effectiveCoeff || 1);
			
			atk += mt;

			var reaverCoeff = 1;
			if (attackerWeapon.reaver) reaverCoeff *= -2;
			if (defenderWeapon && defenderWeapon.reaver) reaverCoeff *= -2;


			// weapon rank bonus (only applied if attacker does not have WTD)
			if (defenderWeapon &&
				((WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) == -1 && reaverCoeff > 0)
				|| (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0)) ) {
				atk += (WEAPON_RANK_BONUS[attackerWeaponType][attackerObj.weaponRanks[attackerWeaponType]].Atk || 0);
			}

			// Subtract target's Def or Res
			atk -= (attackerWeapon.damageType == 'magical') ? defenderObj.currentStats.Res : defenderObj.currentStats.Def;
			// Subtract target's combat Def (i.e. decreases to his/her damage taken)
			atk -= this.combatObj[defenderKey].Def;
			// Factor in target's terrain effects
			if (defenderObj.terrainEffect && defenderObj.terrainEffect.stats && !defenderObj.isWeakTo("Flying")
				&& !attackerWeapon.ignoreTerrain && !(defenderWeapon && defenderWeapon.ignoreTerrain))
				atk -= (defenderObj.terrainEffect.stats.Def || 0);

			// take weapon triangle effects into account (separate from weapon rank bonus)
			if (defenderWeapon) {
				if ( (WEAPON_TRIANGLE[attackerWeaponType].strongAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff > 0)
					|| (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0) ) {
					atk += (WEAPON_TRIANGLE_EFFECT.Advantage[attackerObj.weaponRanks[attackerWeaponType]].Atk * Math.abs(reaverCoeff) || 0);
				}
				else if ( (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff > 0)
					|| (WEAPON_TRIANGLE[attackerWeaponType].strongAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0) ) {
					atk += (WEAPON_TRIANGLE_EFFECT.Disadvantage[defenderObj.weaponRanks[defenderWeaponType]].Atk * Math.abs(reaverCoeff) || 0);					
				}
			}

			if (attackerObj.role === "support") atk = Math.floor(atk/2);


			this.combatObj[attackerKey].Atk = Math.max(Math.floor(atk), 0);


		};

		Battle.prototype.calculateCombatHit = function(attackerObj) {
			if (!attackerObj) return;
			var attackerKey = attackerObj.role + attackerObj.id;
			var defenderObj = (attackerObj === this.leadB) ? this.leadA : this.leadB;
			var defenderKey = defenderObj.role + defenderObj.id;

			var attackerWeapon = attackerObj.equipped, defenderWeapon = defenderObj.equipped;
			if (!attackerWeapon) {
				this.combatObj[attackerKey].Hit = null;
				return;
			}
			else if (this.combatObj.target === attackerObj && attackerObj.cannotRetaliate(defenderObj.attackRange)) {
				this.combatObj[attackerKey].Hit = null;
				return;
			}

			var attackerWeaponType = attackerWeapon.generalType;
			var defenderWeaponType;
			if (defenderWeapon) defenderWeaponType = defenderWeapon.generalType;

			var hit = this.combatObj[attackerKey].Hit || 0;
			// Unit's stat-determined base hit rate
			hit += Math.floor((attackerObj.currentStats.Skl * 1.5) + (attackerObj.currentStats.Lck * 0.5));
			// Equipped weapon's Hit
			hit += attackerWeapon.Hit;


			var reaverCoeff = 1;
			if (attackerWeapon.reaver) reaverCoeff *= -2;
			if (defenderWeapon && defenderWeapon.reaver) reaverCoeff *= -2;

			// weapon rank bonus (only applied if attacker does not have WTD)
			if (defenderWeapon &&
				((WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) == -1 && reaverCoeff > 0)
				|| (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0)) ) {
				hit += (WEAPON_RANK_BONUS[attackerWeaponType][attackerObj.weaponRanks[attackerWeaponType]].Hit || 0);
			}
			// class Hit bonus
			if (attackerObj.classObj.bonus)
				hit += (attackerObj.classObj.bonus.Hit || 0);
			// Support bonus
			if (attackerObj.role == "lead" && attackerObj.supportEnabled) {
				hit += attackerObj.getSupportBonuses().Hit;
			}

			// Subtract target's stat-determined base avoid rate
			hit -= Math.floor((defenderObj.currentStats.Spd * 1.5) + (defenderObj.currentStats.Lck * 0.5));
			// Subtract target equipped weapon's Avo
			if (defenderWeapon) hit -= defenderWeapon.Avo;
			// Subtract target class Avo bonus
			if (defenderObj.classObj.bonus)
				hit -= (defenderObj.classObj.bonus.Avo || 0);
			// Subtract target's combat Avo (from skills, etc.)
			hit -= this.combatObj[defenderKey].Avo;
			// Factor in target's terrain effects
			if (defenderObj.terrainEffect && defenderObj.terrainEffect.stats && !defenderObj.isWeakTo("Flying")
				&& !attackerWeapon.ignoreTerrain && !(defenderWeapon && defenderWeapon.ignoreTerrain))
				hit -= (defenderObj.terrainEffect.stats.Avo || 0);
			// Subtract target support bonus
			if (defenderObj.role == "lead" && defenderObj.supportEnabled) {
				hit -= defenderObj.getSupportBonuses().Avo;
			}
			

			// weapon triangle effects
			if (defenderWeapon) {
				if ( (WEAPON_TRIANGLE[attackerWeaponType].strongAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff > 0)
					|| (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0) ) {
					hit += (WEAPON_TRIANGLE_EFFECT.Advantage[attackerObj.weaponRanks[attackerWeaponType]].Hit * Math.abs(reaverCoeff) || 0);
				}
				else if ( (WEAPON_TRIANGLE[attackerWeaponType].weakAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff > 0)
					|| (WEAPON_TRIANGLE[attackerWeaponType].strongAgainst.indexOf(defenderWeaponType) > -1 && reaverCoeff < 0) ) {
					hit += (WEAPON_TRIANGLE_EFFECT.Disadvantage[defenderObj.weaponRanks[defenderWeaponType]].Hit * Math.abs(reaverCoeff) || 0);					
				}
			}


			this.combatObj[attackerKey].Hit = Math.max(Math.min(Math.floor(hit), 100), 0);
		};

		Battle.prototype.calculateCombatCrit = function(attackerObj) {
			if (!attackerObj) return;
			var attackerKey = attackerObj.role + attackerObj.id;
			var defenderObj = (attackerObj === this.leadB) ? this.leadA : this.leadB;
			var defenderKey = defenderObj.role + defenderObj.id;

			var attackerWeapon = attackerObj.equipped, defenderWeapon = defenderObj.equipped;
			if (!attackerWeapon) {
				this.combatObj[attackerKey].Crit = null;
				return;
			}
			else if (this.combatObj.target === attackerObj && attackerObj.cannotRetaliate(defenderObj.attackRange)) {
				this.combatObj[attackerKey].Crit = null;
				return;
			}

			if (attackerWeapon.disableCrit) {
				this.combatObj[attackerKey].Crit = 0;
				return;
			}

			var attackerWeaponType = attackerWeapon.generalType;
			var defenderWeaponType;
			if (defenderWeapon) defenderWeaponType = defenderWeapon.generalType;

			var crit = this.combatObj[attackerKey].Crit || 0;

			// Unit's stat-determined crit rate
			crit += Math.floor((attackerObj.currentStats.Skl - 4) * 0.5);
			// Equipped weapon's Crit
			crit += attackerWeapon.Crit;
			// class Crit bonus
			if (attackerObj.classObj.bonus) crit += (attackerObj.classObj.bonus.Crit || 0);
			// Support bonus
			if (attackerObj.role == "lead" && attackerObj.supportEnabled) {
				crit += attackerObj.getSupportBonuses().Crit;
			}

			// Subtract target's stat-determined base crit avoid rate
			crit -= Math.floor(defenderObj.currentStats.Lck * 0.5);
			// Subtract target equipped weapon's Ddg
			if (defenderWeapon) crit -= defenderWeapon.Ddg;
			// Subtract target class Ddg bonus
			if (defenderObj.classObj.bonus) crit -= (defenderObj.classObj.bonus.Ddg || 0);
			// Subtract target's combat Ddg (from skills, etc.)
			crit -= this.combatObj[defenderKey].Ddg;
			// Subtract target support bonus
			if (defenderObj.role == "lead" && defenderObj.supportEnabled) {
				crit -= defenderObj.getSupportBonuses().Ddg;
			}			

			this.combatObj[attackerKey].Crit = Math.max(Math.min(crit, 100), 0);

		};

		/**
		 * Takes BattleUnit as a parameter; returns whether or not it can double attack
		 * the enemy in the current combat scenario (disregard brave effects)
		 */
		Battle.prototype.canDouble = function(unitObj) {
			if (!unitObj || !unitObj.equipped) return;

			var attackerId = unitObj.id;
			var enemyId = (attackerId === "B") ? "A" : "B";

			var attackerObj = unitObj;
			var defenderObj = this['lead'+enemyId];
			var attackerKey = attackerObj.role + attackerObj.id;
			var defenderKey = defenderObj.role + defenderObj.id;

			var canDouble = false;

			if (unitObj.equipped.disableSelfFollowup) return false;

			// if lead unit, double attack if lead attacker's offensive attack speed is at least 5 greater
			// than defender's defensive attack speed
			if (unitObj.role == "lead" && this.combatObj[attackerKey].offAtkSpd >= this.combatObj[defenderKey].defAtkSpd + 5)
				canDouble = true;
			// unless either unit has Wary Fighter
			var combinedSkills = attackerObj.skills.concat(defenderObj.skills);
			for (var i=0; i<combinedSkills.length; i++) {
				if (combinedSkills[i] && combinedSkills[i].key === "Wary_Fighter") {
					return false;
				}
			}

			return canDouble;
		};


		Battle.prototype.log = function(messageObj) {
			var battleLog = this.battleLog;
			var $battleLog = document.querySelector('.battle-log');
			logQueue.push(messageObj);

			if (!logInterval) {
				$interval.cancel(logInterval);
				logInterval = $interval(function() {
					var nextMessageObj = logQueue.shift();
					if (nextMessageObj) {
						battleLog.push(nextMessageObj);
						if (nextMessageObj.damage && nextMessageObj.target) {
							nextMessageObj.target.animateDamage(nextMessageObj.damage);
						}
						else if (nextMessageObj.heal && nextMessageObj.target) {
							nextMessageObj.target.animateHeal(nextMessageObj.heal);
						}
						$timeout(function() {
							if ($battleLog) $battleLog.scrollTop = $battleLog.scrollHeight;
						});
					}
					else {
						$interval.cancel(logInterval);
						logInterval = null;
					}
				}, 1400);
			}

		};






		Battle.prototype.rollHitRNG = function(rate) {
			if (rate < 50) return this.rollSingleRNG(rate);
			var A = Math.floor(Math.random()*100);
			var B = Math.floor(Math.random()*100);
			var hitRNG = (3*A + B)/4;
			return hitRNG < rate;

		};
		Battle.prototype.rollSingleRNG = function(rate) {
			var hitRNG = Math.floor(Math.random()*100);
			return hitRNG < rate;
		};

		/**
		 * Method that triggers the round of initiator's attack(s) and target's counterattack(s).
		 * 
		 */
		Battle.prototype.initiateBattleRound = function() {
			var combatObj = this.combatObj;
			var initiator = combatObj.initiator, target = combatObj.target;
			var initiatorLeadCombat = combatObj['lead' + initiator.id];
			var targetLeadCombat = combatObj['lead' + target.id];

			// initiatorLeadCombat.successfulHit = false;
			// initiatorLeadCombat.usedWeapon = false;
			// targetLeadCombat.successfulHit = false;
			// targetLeadCombat.usedWeapon = false;

			// // Reset stuff that could happen multiple times, independently of each other
			// attackerCombat.healFns = [];
			// attackerCombat.counterDamage = 0;


			[initiatorLeadCombat, targetLeadCombat].forEach(function(combat) {
				combat.successfulHit = false;
				combat.usedWeapon = false;
			});


			var initiatorSupport, targetSupport, initiatorSupportCombat, targetSupportCombat;
			if (initiator.supportEnabled) {
				initiatorSupport = initiator.supportUnit;
				initiatorSupportCombat = combatObj['support' + initiatorSupport.id];
			}
			if (target.supportEnabled) {
				targetSupport = target.supportUnit;
				targetSupportCombat = combatObj['support' + targetSupport.id];
			}



			// add extra skill granted by equipped weapon effect, if applicable
			combatObj[initiator.role + initiator.id].skills = angular.copy(initiator.skills);
			if (initiator.equipped.grantsSkill) {
				combatObj[initiator.role + initiator.id].skills.push(SKILLS[initiator.equipped.grantsSkill]);
			}
			combatObj[target.role + target.id].skills = angular.copy(target.skills);
			if (target.equipped && target.equipped.grantsSkill) {
				combatObj[target.role + target.id].skills.push(SKILLS[target.equipped.grantsSkill]);
			}


			this.attack(initiator, target);
			if (initiator.equipped.brave) this.attack(initiator, target);

			if (initiatorSupport && initiator.supportStance === "Attack" && initiatorSupport.equipped) {
				this.attack(initiatorSupport, target);
				if (initiatorSupport.equipped.brave) this.attack(initiatorSupport, target);
			}


			if (target.equipped && target.equipped.range.indexOf(initiator.attackRange) > -1) {
				this.attack(target, initiator);
				if (target.equipped.brave) this.attack(target, initiator);

				if (targetSupport && target.supportStance === "Attack" && targetSupport.equipped) {
					this.attack(targetSupport, initiator);
					if (targetSupport.equipped.brave) this.attack(targetSupport, initiator);
				}
			}


			if (this.canDouble(initiator)) {
				this.attack(initiator, target);
				if (initiator.equipped.brave) this.attack(initiator, target);
			}

			if (this.canDouble(target) && target.equipped && target.equipped.range.indexOf(initiator.attackRange) > -1) {
				this.attack(target, initiator);
				if (target.equipped.brave) this.attack(target, initiator);
			}


			// After combat
			this.triggerAfterCombatEffects(initiator, target);

			this.log({
				id: 'sys',
				message: ''
			});
		};



		/**
		 * Method that triggers a single attack, from an attacker unit directed at a defender unit.
		 * 
		 */
		Battle.prototype.attack = function(attacker, defender) {
			if (attacker.currentHP <= 0 || defender.currentHP <= 0) return;
			if (!attacker.equipped) return;
			var self = this;
			this.log({
				id: attacker.id,
				message: attacker.name + " attacked " + defender.name + " with " + attacker.equipped.name + "!"
			});

			var attackerCombat = this.combatObj[attacker.role + attacker.id];
			var defenderCombat = this.combatObj[defender.role + defender.id];
			var attackerWeapon = attacker.equipped;
			var defenderWeapon = defender.equipped;

			var listedHit = attackerCombat.Hit;
			var listedCrit = attackerCombat.Crit;

			// Flag that user has attempted an attack
			attackerCombat.usedWeapon = true;

			// Initialize damage based on attacker's listed combat Atk value
			attackerCombat.damage = attackerCombat.Atk;

			// Roll for attacker offensive proc
			if (!attackerWeapon.disableProc) {
				var offensiveProcActivated = false;

				var offensiveProcSkills = attackerCombat.skills;
				if (attackerWeapon.offensiveProc) {
					offensiveProcSkills = offensiveProcSkills.concat([attackerWeapon]);
				}

				var prioritizedOffensiveProcSkills = offensiveProcSkills.filter(function(skill) {
					return skill && skill.offensiveProc;
				}).sort(function(a, b) {
					return a.procPriority > b.procPriority ? 1 : -1;
				});
				prioritizedOffensiveProcSkills.forEach(function(skill) {
					if (!skill || !skill.offensiveProc || offensiveProcActivated) return;
					var procRate = skill.procRate(attacker);
					var procSuccess = self.rollSingleRNG(procRate);
					if (procSuccess) {
						skill.offensiveProc(attacker, defender, self.combatObj, self.detailsObj);
						offensiveProcActivated = true;
						self.log({
							id: attacker.id,
							message: attacker.name + "'s " + skill.name + " activated!"
						});
					}
				});		
			}

			// Roll for successful hit
			var hitSuccess = this.rollHitRNG(listedHit);
			if (!hitSuccess) {
				this.log({
					id: attacker.id,
					message: attacker.name + "'s attack missed!"
				});
			}
			else {
				// Flag that user successfully made contact with enemy
				attackerCombat.successfulHit = true;

				// Roll for crit
				var critSuccess = this.rollSingleRNG(listedCrit);
				if (critSuccess) {
					attackerCombat.damage *= attackerWeapon.critCoeff || 3;
					this.log({
						id: attacker.id,
						message: "Critical hit!"
					});
				}


				// Roll for defender defensive proc
				
				var defensiveProcActivated = false;
				var defensiveProcSkills = defenderCombat.skills;
				if (defenderWeapon && defenderWeapon.defensiveProc) {
					defensiveProcSkills = defensiveProcSkills.concat([defenderWeapon]);
				}

				var prioritizedDefensiveProcSkills = defensiveProcSkills.filter(function(skill) {
					return skill && skill.defensiveProc;
				}).sort(function(a, b) {
					return a.procPriority > b.procPriority ? 1 : -1;
				});
				prioritizedDefensiveProcSkills.forEach(function(skill) {
					if (!skill || !skill.defensiveProc || defensiveProcActivated) return;
					var procRate = skill.procRate(defender);
					var procSuccess = self.rollSingleRNG(procRate);
					if (procSuccess) {
						defensiveProcActivated = skill.defensiveProc(defender, attacker, self.combatObj, self.detailsObj);

						if (defensiveProcActivated) {
							self.log({
								id: defender.id,
								message: defender.name + "'s " + skill.name + " activated!"
							});							
						}
					}
				});				

				// Activate counter skills based on combat situation before defender takes damage
				// Don't actually apply counter effects until after defender has taken damage
				var counterSkills = defenderCombat.skills.filter(function(skill) {
					return skill && skill.counter;
				});
				if (defenderWeapon && defenderWeapon.counter) {
					counterSkills = counterSkills.concat([defenderWeapon]);
				}
				var counterSkillsActivated = [];
				counterSkills.forEach(function(skill) {
					var counterActivated = skill.counter(defender, attacker, self.combatObj, self.detailsObj);
					if (counterActivated) {
						counterSkillsActivated.push(skill);		
					}
				});

				if (attackerWeapon.leaveEnemyAlive && defender.currentHP > 1) {
					attackerCombat.damage = Math.min(attackerCombat.damage, defender.currentHP - 1);
				}


				// Heal
				if (attacker.currentHP < attacker.maxHP) {
					attackerCombat.heal = 0;
					attackerCombat.healFns.forEach(function(healFn) { healFn(attackerCombat.damage) });

					attackerCombat.heal = Math.min(Math.floor(attackerCombat.heal), attacker.maxHP - attacker.currentHP);
				}


				// Inflict damage on defender
				defender.currentHP = Math.max(defender.currentHP - attackerCombat.damage, 0);

				this.log({
					id: defender.id,
					message: defender.name + " took " + attackerCombat.damage + " damage!",
					damage: attackerCombat.damage,
					target: defender
				});


				// Check for attacker healing (e.g. from Sol or Nosferatu)
				// if (attacker.currentHP < attacker.maxHP) {
				// 	attackerCombat.heal = 0;
				// 	attackerCombat.healFns.forEach(function(healFn) { healFn() });

				// 	attackerCombat.heal = Math.min(attackerCombat.heal, attacker.maxHP - attacker.currentHP);
					if (attackerCombat.heal) {
						attacker.currentHP += attackerCombat.heal;
						this.log({
							id: attacker.id,
							message: attacker.name + " recovered " + attackerCombat.heal + " HP!",
							heal: attackerCombat.heal,
							target: attacker
						});						
					}
				// }


				if (defender.currentHP <= 0) {
					this.log({
						id: defender.id,
						message: defender.name + " was defeated!"
					});
				}
				else {
					// Apply defender's counter-type damage/effects (only if defender is still alive)
					counterSkillsActivated.forEach(function(skill) {
						self.log({
							id: defender.id,
							message: defender.name + "'s " + skill.name + " activated!"
						});		
					})
					var counterDamage = defenderCombat.counterDamage;
					if (counterDamage > 0) {
						attacker.currentHP = Math.max(attacker.currentHP - counterDamage, 0);
						self.log({
							id: attacker.id,
							message: attacker.name + " took " + counterDamage + " damage from counter effects!",
							damage: counterDamage,
							target: attacker
						});
					}

					if (attacker.currentHP <= 0) {
						this.log({
							id: attacker.id,
							message: attacker.name + " was defeated!"
						});
					}
					
				}







			}

			this.log({
				id: 'sys',
				message: ''
			});
		};


		Battle.prototype.triggerBeginningOfTurnEffects = function() {
			var self = this;
			var detailsObj = this.detailsObj;
			var turn = detailsObj.turn, phaseId = detailsObj.phase;

			this.log({
				id: 'sys',
				message: '<strong>Turn ' + turn + ' Player ' + phaseId + ' Phase</strong>'
			});

			var leadUnit = this['lead'+phaseId];
			var supportUnit = this['support'+phaseId];

			leadUnit.beginningOfTurnHeal = 0;
			leadUnit.beginningOfTurnDamage = 0;

			leadUnit.skills.forEach(function(skill) {
				if (!skill || !skill.beginningOfTurn) return;
				skill.beginningOfTurn(leadUnit, null, self.combatObj, self.detailsObj);

			});
			if (leadUnit.equipped && leadUnit.equipped.beginningOfTurn) {
				leadUnit.equipped.beginningOfTurn(leadUnit, null, self.combatObj, self.detailsObj);
			}

			if (leadUnit.terrainEffect && leadUnit.terrainEffect.stats) {
				var hpEffect = Math.floor(leadUnit.maxHP * (leadUnit.terrainEffect.stats.HP / 100));
				if (hpEffect > 0)
					leadUnit.beginningOfTurnHeal += hpEffect;
				else if (hpEffect < 0)
					leadUnit.beginningOfTurnDamage -= hpEffect;
			}

			// Beginning-of-turn damage
			if (leadUnit.beginningOfTurnDamage) {
				var beginningOfTurnDamage = Math.min(Math.floor(leadUnit.beginningOfTurnDamage), leadUnit.currentHP - 1);
				leadUnit.currentHP -= beginningOfTurnDamage;

				if (beginningOfTurnDamage > 0) {
					this.log({
						id: leadUnit.id,
						message: leadUnit.name + " took " + beginningOfTurnDamage + " damage at the start of the turn!",
						damage: beginningOfTurnDamage,
						target: leadUnit
					})
				}
			}

			// Beginning-of-turn healing
			if (leadUnit.beginningOfTurnHeal) {
				var beginningOfTurnHeal = Math.min(Math.floor(leadUnit.beginningOfTurnHeal), leadUnit.maxHP - leadUnit.currentHP);
				leadUnit.currentHP += beginningOfTurnHeal;

				if (beginningOfTurnHeal > 0) {
					this.log({
						id: leadUnit.id,
						message: leadUnit.name + " recovered " + beginningOfTurnHeal + " HP at the start of the turn!",
						heal: beginningOfTurnHeal,
						target: leadUnit
					});
				}
			}




			// recover debuffed stats
			[leadUnit, supportUnit].forEach(function(unit) {
				if (unit === supportUnit && !leadUnit.supportEnabled) return;

				if (unit.debuffs) {
					Object.keys(unit.debuffs).forEach(function(stat) {
						if (unit.debuffs[stat] < 0)
							unit.debuffs[stat]++;
					});
				}

				unit.calculateCurrentStats();

			});



		};

		Battle.prototype.triggerAfterCombatEffects = function(initiator, target) {
			var self = this;
			var initiatorCombat = this.combatObj[initiator.role + initiator.id];
			var targetCombat = this.combatObj[target.role + target.id];
			var initiatorWeapon = initiator.equipped;
			var targetWeapon = target.equipped;


			if (initiator.halved && initiator.halved.status === "active")
				initiator.halved.status = "inactive";
			if (target.halved && target.halved.status === "active")
				target.halved.status = "inactive";


			initiatorCombat.skills.forEach(function(skill) {
				if (!skill || !skill.afterCombat) return;
				skill.afterCombat(initiator, target, self.combatObj, self.detailsObj);

			});
			if (initiatorWeapon.afterCombat) {
				initiatorWeapon.afterCombat(initiator, target, self.combatObj, self.detailsObj);
			}
			targetCombat.skills.forEach(function(skill) {
				if (!skill || !skill.afterCombat) return;
				skill.afterCombat(target, initiator, self.combatObj, self.detailsObj);

			});
			if (targetWeapon && targetWeapon.afterCombat) {
				targetWeapon.afterCombat(target, initiator, self.combatObj, self.detailsObj);
			}


			// After-combat healing
			if (initiator.currentHP > 0 && initiatorCombat.afterCombatHeal) {
				var afterCombatHeal = Math.min(Math.floor(initiatorCombat.afterCombatHeal), initiator.maxHP - initiator.currentHP);
				
				if (afterCombatHeal) {
					initiator.currentHP += afterCombatHeal;

					this.log({
						id: initiator.id,
						message: initiator.name + " recovered " + afterCombatHeal + " HP after combat!",
						heal: afterCombatHeal,
						target: initiator
					});				
				}
			}
			if (target.currentHP > 0 && targetCombat.afterCombatHeal) {
				var afterCombatHeal = Math.min(Math.floor(target.afterCombatHeal), target.maxHP - target.currentHP);
				if (afterCombatHeal) {
					target.currentHP += afterCombatHeal;
					this.log({
						id: target.id,
						message: target.name + " recovered " + afterCombatHeal + " damage after combat!",
						heal: afterCombatHeal,
						target: target
					});
				}
			}

			// Inflict after-combat damage
			if (initiatorCombat.afterCombatDamage) {
				var afterCombatDamage = Math.min(Math.floor(initiatorCombat.afterCombatDamage), target.currentHP - 1);
				target.currentHP = target.currentHP - afterCombatDamage;


				this.log({
					id: target.id,
					message: target.name + " took " + afterCombatDamage + " damage after combat!",
					damage: afterCombatDamage,
					target: target
				});

			}
			if (targetCombat.afterCombatDamage || initiatorCombat.afterCombatSelfDamage) {
				var afterCombatDamage = (targetCombat.afterCombatDamage || 0) + (initiatorCombat.afterCombatSelfDamage || 0);
				afterCombatDamage = Math.min(Math.floor(afterCombatDamage), initiator.currentHP - 1);
				initiator.currentHP = initiator.currentHP - afterCombatDamage;


				this.log({
					id: initiator.id,
					message: initiator.name + " took " + afterCombatDamage + " damage after combat!",
					damage: afterCombatDamage,
					target: initiator
				});

			}

			[initiator, target].forEach(function(userObj) {
				if (!userObj.debuffs || !Object.keys(userObj.debuffs).length)
					userObj.debuffs = angular.copy(EMPTY_STATS);
			});

			[initiator, target].forEach(function(userObj) {
				var enemyObj;
				if (userObj === initiator) enemyObj = target;
				else if (userObj === target) enemyObj = initiator;
				var userCombat = self.combatObj[userObj.role + userObj.id];
				var enemyCombat = self.combatObj[enemyObj.role + enemyObj.id];

				if (!userCombat.userStackableDebuffs)
					userCombat.userStackableDebuffs = angular.copy(EMPTY_STATS);
				if (!userCombat.enemyUnstackableDebuffs)
					userCombat.enemyUnstackableDebuffs = angular.copy(EMPTY_STATS);
				var userStackableDebuffs = userCombat.userStackableDebuffs;
				var enemyUnstackableDebuffs = userCombat.enemyUnstackableDebuffs;

				// self (stackable) debuffs from equipped weapon (e.g. Silver)
				if (userObj.equipped && userObj.equipped.selfDebuffs && userCombat.usedWeapon) {
					var selfDebuffs = userObj.equipped.selfDebuffs;
					if (typeof userObj.equipped.selfDebuffs === "function") {
						selfDebuffs = userObj.equipped.selfDebuffs(userObj, enemyObj, self.combatObj, self.detailsObj);
						if (!selfDebuffs) return;
					}
					Object.keys(selfDebuffs).forEach(function(stat) {
						userStackableDebuffs[stat] += selfDebuffs[stat];
					});
				}

				// enemy (unstackable) debuffs from equipped weapon (e.g. Shuriken)
				if (userObj.equipped && userObj.equipped.enemyDebuffs && userCombat.usedWeapon && userCombat.successfulHit) {
					var enemyDebuffs = userObj.equipped.enemyDebuffs;
					if (typeof userObj.equipped.enemyDebuffs === "function") {
						enemyDebuffs = userObj.equipped.enemyDebuffs(userObj, enemyObj, self.combatObj, self.detailsObj);
						if (!enemyDebuffs) return;
					}
					Object.keys(enemyDebuffs).forEach(function(stat) {
						enemyUnstackableDebuffs[stat] = Math.min(enemyUnstackableDebuffs[stat], enemyDebuffs[stat]);
					});
				}

				// enemy (unstackable) debuffs from user's skills (e.g. Seal)
				userObj.skills.forEach(function(skill) {
					if (!skill || !skill.enemyDebuffs) return;
					var enemyDebuffs = skill.enemyDebuffs;
					if (typeof skill.enemyDebuffs === "function") {
						enemyDebuffs = skill.enemyDebuffs(userObj, enemyObj, self.combatObj, self.detailsObj);
						if (!enemyDebuffs) return;
					}
					Object.keys(enemyDebuffs).forEach(function(stat) {
						enemyUnstackableDebuffs[stat] = Math.min(enemyUnstackableDebuffs[stat], enemyDebuffs[stat]);
					});
				});


				// Add new self debuffs to existing self debuffs
				var userDebuffsTotal = 0;
				Object.keys(userStackableDebuffs).forEach(function(stat) {
					userObj.debuffs[stat] += userStackableDebuffs[stat];
					userDebuffsTotal += userStackableDebuffs[stat];
				});
				if (userDebuffsTotal) {
					self.log({
						id: userObj.id,
						message: userObj.name + "'s stats were reduced!"
					});
				}

				// Replace existing enemy debuffs with new enemy debuffs if new debuffs are greater
				var enemyDebuffsTotal = 0;
				Object.keys(enemyUnstackableDebuffs).forEach(function(stat) {
					enemyObj.debuffs[stat] = Math.min((enemyObj.debuffs[stat] || 0), enemyUnstackableDebuffs[stat]);
					enemyDebuffsTotal += enemyUnstackableDebuffs[stat];
				});
				if (enemyDebuffsTotal) {
					self.log({
						id: enemyObj.id,
						message: enemyObj.name + "'s stats were reduced!"
					});
				}

			});





			if (initiator.halved && initiator.halved.status === "inactive")
				initiator.halved = null;
			if (target.halved && target.halved.status === "inactive")
				target.halved = null;


			initiator.calculateCurrentStats();
			target.calculateCurrentStats();



		};




	}
]);