app.controller('battleSimCtrl',
	['$rootScope', '$scope', 'Characters', 'Classes', 'Skills', 'Weapons', 'BattleEngine', 'utils', 
		'$uibModal', '$timeout', '$interval', 'compressionService', 'localStorageService',
	function($rootScope, $scope, Characters, Classes, Skills, Weapons, BattleEngine, utils, 
		$uibModal, $timeout, $interval, compressionService, localStorageService) {
		var vm = this;
		var CHARS = vm.CHARS = Characters.getCharacters();
		var CLASSES = vm.CLASSES = Classes.getClasses();
		var SKILLS = vm.SKILLS = Skills.getAllSkills();
		var CLASS_SKILLS = vm.CLASS_SKILLS = Skills.getClassSkills();
		var WEAPONS = vm.WEAPONS = Weapons.getWeapons();

		vm.stats = ["Str", "Mag", "Skl", "Spd", "Lck", "Def", "Res"];
		var EMPTY_STATS = {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0};

		vm.battleState = 'prep';

		window.WEAPONS = WEAPONS;
		window.CHARS = CHARS;


		var leadUnit = vm.leadUnit = {A: {}, B: {}};
		var supportUnit = vm.supportUnit = {A: null, B: null};
		var combatForecastModal, saveUnitModal, loadSavedUnitModal;

		vm.modals = {};
		vm.errorMessages = {};
		vm.errorTimers = {};

		vm.displayWeaponRange = utils.displayWeaponRange;
		vm.getWeaponRankIndex = utils.getWeaponRankIndex;
		vm.AVATAR_MODS = Characters.AVATAR_MODS;

		vm.WEAPON_TRIANGLE = BattleEngine.WEAPON_TRIANGLE;
		vm.TERRAIN_EFFECT = BattleEngine.TERRAIN_EFFECT;


		var leadA, leadB, supportA, supportB;
		var battle;

		function init() {
			leadA = vm.leadUnit.A = new BattleEngine.Unit('A', 'lead');
			leadB = vm.leadUnit.B = new BattleEngine.Unit('B', 'lead');
			supportA = vm.supportUnit.A = new BattleEngine.Unit('A', 'support');
			supportB = vm.supportUnit.B = new BattleEngine.Unit('B', 'support');

			window.leadA = leadA;
			window.leadB = leadB;
			window.supportA = supportA;
			window.supportB = supportB;

			// leadA.setUnit("Niles");
			// leadA.setClass(leadA.getUnit().startingClass);
			// leadA.setClass("Bow_Knight");
			leadA.setSupportUnit(supportA);
			supportA.setSupportUnit(leadA);

			// // leadA.supportEnabled = true;
			// // vm.toggleSupport('A');


			// var niles = leadA;
			// var effie = supportA;

			// niles.setUnit("Camilla");
			// niles.setClass("Wyvern_Lord");

			// effie.setUnit("Effie");
			// effie.setClass("General");

			// supportA.supportLevel = 'A';
			// vm.setSupportLevel('A', 'A');

			// niles.skills[1] = CLASS_SKILLS['Strength+2'];
			// // niles.skills[2] = CLASS_SKILLS['Draconic_Hex'];
			// niles.skills[3] = CLASS_SKILLS['Better_Odds'];
			// // niles.skills[4] = CLASS_SKILLS['Quixotic'];
			// niles.skills[5] = CLASS_SKILLS['Sol'];
			// niles.inventory[0] = WEAPONS['Hand_Axe'];
			// niles.inventory[1] = WEAPONS['Steel_Axe'];
			// niles.inventory[2] = WEAPONS['Berserkers_Axe'];
			// niles.inventory[3] = WEAPONS['Dual_Club'];
			// niles.inventory[4] = WEAPONS['Raider_Axe'];

			// niles.baseHP = 42;
			// niles.baseStats = {Str:27,Mag:12,Skl:30,Spd:27,Lck:22,Def:27,Res:14};
			// niles.weaponRanks = {Lance:'E',Axe:'B', Dagger:'A'};

			// niles.meal = {Mag:2, Spd:2, Def:2};
			// niles.surge = {stat1: "Mag", stat2: "Res"};

			// effie.skills[1] = CLASS_SKILLS['Defense+2'];
			// effie.skills[2] = CLASS_SKILLS['Wary_Fighter'];
			// effie.skills[3] = CLASS_SKILLS['Luna'];
			// effie.skills[4] = CLASS_SKILLS['Armored_Blow'];
			// effie.skills[5] = CLASS_SKILLS['Pavise'];
			// effie.inventory[0] = WEAPONS['Venge_Naginata'];
			// effie.inventory[1] = WEAPONS['Javelin'];
			// effie.inventory[2] = WEAPONS['Brave_Lance'];
			// effie.baseHP = 46;
			// effie.baseStats = {Str:42,Mag:2,Skl:30,Spd:20,Lck:30,Def:36,Res:19};
			// effie.weaponRanks = {Lance:'A',Axe:'D'};










			// leadB.setUnit("Shigure");
			// // leadB.varParent = "Laslow";
			// // leadB.setVarParent("Laslow");
			// leadB.setClass(leadB.getUnit().startingClass);
			// leadB.setClass("Falcon_Knight");
			// leadB.setSupportUnit(supportB);
			// supportB.setSupportUnit(leadB);

			// leadB.skills[1] = CLASS_SKILLS['Darting_Blow'];
			// // leadB.skills[2] = CLASS_SKILLS['Grisly_Wound'];
			// // leadB.skills[3] = CLASS_SKILLS['Aegis'];
			// // leadB.skills[4] = CLASS_SKILLS['Countermagic'];
			// // leadB.skills[5] = CLASS_SKILLS['Pavise'];
			// leadB.inventory[0] = WEAPONS['Javelin'];
			// leadB.inventory[1] = WEAPONS['Ginnungagap'];
			// leadB.inventory[2] = WEAPONS['Camillas_Axe'];
			// leadB.baseHP = 36;
			// leadB.baseStats = {Str:22,Mag:8,Skl:25,Spd:28,Lck:22,Def:20,Res:25};
			// leadB.weaponRanks = {Lance:'B',Axe:'B', Dagger:'A'};

			loadUnitsFromParams();

		}

		vm.switchLeadAndSupport = function(id) {
			var newLead = vm.supportUnit[id];
			var newSupport = vm.leadUnit[id];

			newLead.role = 'lead';
			newLead.supportEnabled = true;

			newSupport.role = 'support';
			newSupport.supportEnabled = null;



			vm.leadUnit[id] = newLead;
			vm.supportUnit[id] = newSupport;

			if (id === "A") {
				leadA = vm.leadUnit[id];
				supportA = vm.supportUnit[id];
			} else if (id === "B") {
				leadB = vm.leadUnit[id];
				supportB = vm.supportUnit[id];
			}

			window.leadA = leadA;
			window.leadB = leadB;
			window.supportA = supportA;
			window.supportB = supportB;

		};


		vm.getValidWeaponRanks = function(unitObj, weaponType) {
			if (!unitObj || !unitObj.classObj) return;
			var ranks = ['E', 'D', 'C', 'B', 'A', 'S'];
			if (unitObj.classObj.weaponRanks && unitObj.classObj.weaponRanks[weaponType]) {
				var weaponRankIndex = ranks.indexOf(unitObj.classObj.weaponRanks[weaponType]);
				if (weaponRankIndex > -1) {
					return ranks.slice(0, weaponRankIndex+1);
				}
			}
		};

		vm.getVarParents = function(childKey) {
			var varParentsList = Characters.getVarParents(childKey);
			var varParentsMap = utils.createCharacterMap(varParentsList);

			return varParentsMap;
		};





		vm.toggleSupport = function(id) {
			var leadUnit = vm.leadUnit[id], supportUnit = vm.supportUnit[id];
			var isSupportEnabled = leadUnit.supportEnabled;

			if (isSupportEnabled) {
				if (!leadUnit.supportStance) {
					vm.setSupportStance(id, 'Attack');
				}
			}
			else {

			}

		};

		vm.setSkill = function(unitObj, index, oldSkillKey) {
			var newSkillObj = unitObj.skills[index];

			// if user tries to add a skill that this unit already has,
			// switch it back to whatever skill was previously in that slot (if any)
			for (var i=0; i<unitObj.skills.length; i++) {
				if (newSkillObj && i !== index && unitObj.skills[i] === newSkillObj) {
					unitObj.skills[index] = CLASS_SKILLS[oldSkillKey] || null;
				}
			}
		}



		vm.setSupportStance = function(id, stance) {
			var leadUnit = vm.leadUnit[id], supportUnit = vm.supportUnit[id];
			leadUnit.supportStance = stance;
			supportUnit.supportStance = stance;
		};

		vm.getSupportLevels = function(leadUnitObj, supportUnitObj) {
			if (leadUnitObj.charObj.ASupport && leadUnitObj.charObj.ASupport.indexOf(supportUnitObj.unitKey) > -1 ||
				leadUnitObj.charObj.APlusSupport && leadUnitObj.charObj.APlusSupport.indexOf(supportUnitObj.unitKey) > -1) {
				return ['C', 'B', 'A'];
			}
			else if (leadUnitObj.charObj.SSupport && leadUnitObj.charObj.SSupport.indexOf(supportUnitObj.unitKey) > -1) {
				return ['C', 'B', 'A', 'S'];
			}
		};

		vm.setSupportLevel = function(id, supportLevel) {
			var leadUnit = vm.leadUnit[id], supportUnit = vm.supportUnit[id];
			leadUnit.supportLevel = supportLevel;
		};


		/**
		 * Switches to the "fight" view and creates a new instance of a Battle.
		 */
		vm.startBattle = function() {

			// minor formatting stuff

			['A', 'B'].forEach(function(id) {
				var lead, support, enemy, enemySupport;
				if (id === 'A') {
					lead = leadA, support = supportA, enemy = leadB, enemySupport = supportB;
				}
				else if (id === 'B') {
					lead = leadB, support = supportB, enemy = leadA, enemySupport = supportA;
				}

				lead.skills.sort();
				lead.prepInventory.sort();
				lead.inventory.sort();

				lead.setCurrentStats();
				lead.calculateCombatStats();

				lead.shownHP = lead.maxHP;
				if (lead.currentHP < lead.maxHP)
					lead.animateDamage(lead.maxHP - lead.currentHP);

				if (!lead.equipped) {
					for (var i=0; i<lead.inventory.length; i++) {
						if (lead.canUseWeapon(lead.inventory[i])) {
							lead.equipWeapon(lead.inventory[i]);
							break;
						}
					}
					if (lead.equipped)
						lead.attackRange = lead.equipped.range[lead.equipped.range.length-1];
				}

				if (lead.supportEnabled) {
					support.setCurrentStats();
					support.calculateCombatStats();
					support.shownHP = support.currentHP;
					if (!support.equipped) {
						for (var i=0; i<support.inventory.length; i++) {
							if (support.canUseWeapon(support.inventory[i])) {
								support.equipWeapon(support.inventory[i]);
								break;
							}
						}
						if (support.equipped)
							support.attackRange = support.equipped.range[support.equipped.range.length-1];
					}
				}
			});


			vm.battle = new BattleEngine.Battle(leadA, leadB, supportA, supportB);
			battle = vm.battle;
			window.battle = vm.battle;

			vm.battleState = 'fight';

			battle.triggerBeginningOfTurnEffects();
		};



		vm.backToPrep = function() {

			vm.battleState = 'prep';
			
			[leadA, leadB, supportA, supportB].forEach(function(unitObj) {
				unitObj.equipped = null;
				unitObj.currentHP = unitObj.baseHP;
				unitObj.debuffs = angular.copy(EMPTY_STATS);
			});
		};




		/**
		 * Shows the combat forecast and calculates listed combat numbers.
		 * @param initiator: the BattleUnit object corresponding to the unit 
		 * who initiates the battle
		 */
		vm.openCombatForecast = function(initiator) {
			combatForecastModal = vm.modals.combatForecastModal = $uibModal.open({
				appendTo: angular.element(document.querySelector('#battle-sim')),
				templateUrl: 'views/partials/combat-forecast.html',
				scope: $scope,
			});

			var target;
			if (initiator == leadA) target = leadB;
			else if (initiator == leadB) target = leadA;

			battle.setInitiator(initiator);
			battle.setTarget(target);
			battle.setupCombatObj();

		};

		vm.attackMultipleTimes = function(unitObj) {
			if (battle.combatObj.target === unitObj && unitObj.cannotRetaliate(battle.combatObj.initiator.attackRange))
				return;
			var coefficient = 1;
			if (battle.canDouble(unitObj)) coefficient *= 2;
			if (unitObj.equipped && unitObj.equipped.brave && vm.battle.combatObj.initiator.id === unitObj.id)
				coefficient *= 2;
			return coefficient;
		};




		vm.initiateAttack = function() {
			combatForecastModal.close();
			combatForecastModal.closed.then(function() {
				// battle.initiateAttack();
				battle.initiateBattleRound();

				$timeout(function() {
					var $battleLog = document.querySelector('.battle-log');
					$battleLog.scrollTop = $battleLog.scrollHeight;
				});
			});
		};

		vm.scrollWeapons = function(unitObj) {
			if (!unitObj.equipped) return;
			var equippedWeapon = unitObj.equipped;
			var equippedWeaponIndex = unitObj.inventory.indexOf(unitObj.equipped);

			var nextWeapon;

			for (var i=0; i<=5; i++) {
				var nextIndex = (equippedWeaponIndex + 1+i) % unitObj.inventory.length;
				nextWeapon = unitObj.inventory[nextIndex];

				if (nextWeapon && unitObj.canUseWeapon(nextWeapon) && unitObj.canInitiateWithWeaponAtRange(nextWeapon)) {
					if (nextWeapon !== equippedWeapon) {
						unitObj.equipWeapon(nextWeapon);
						battle.setupCombatObj();
					}
					break;
				}

			}

		};


		vm.wtMatchup = function(userObj) {
			if (!userObj || !userObj.equipped) return;
			var enemyObj;
			if (userObj.id == 'A') enemyObj = vm.leadUnit.B;
			else if (userObj.id == 'B') enemyObj = vm.leadUnit.A;
			if (!enemyObj || !enemyObj.equipped) return;

			var userType = userObj.equipped.generalType;
			var enemyType = enemyObj.equipped.generalType;

			var reaverCoeff = 1;
			if (userObj.equipped.reaver) reaverCoeff *= -1;
			if (enemyObj.equipped.reaver) reaverCoeff *= -1;

			if ( (vm.WEAPON_TRIANGLE[userType].strongAgainst.indexOf(enemyType) > -1 && reaverCoeff > 0)
				|| (vm.WEAPON_TRIANGLE[userType].weakAgainst.indexOf(enemyType) > -1 && reaverCoeff < 0))
				return 'wta';
			else if ( (vm.WEAPON_TRIANGLE[userType].weakAgainst.indexOf(enemyType) > -1 && reaverCoeff > 0)
				|| (vm.WEAPON_TRIANGLE[userType].strongAgainst.indexOf(enemyType) > -1 && reaverCoeff < 0))
				return 'wtd';
		}



		vm.isPlayersTurn = function(id) {
			return battle.detailsObj.phase === id;
		};


		vm.nextPlayerPhase = function() {
			var detailsObj = battle.detailsObj;
			if (detailsObj.phase === "A") {
				detailsObj.phase = "B";
			}
			else if (detailsObj.phase === "B") {
				detailsObj.turn++;
				detailsObj.phase = "A";
			}

			battle.triggerBeginningOfTurnEffects();
		};


		vm.openSaveUnitModal = function(unitObj) {

			var valid = true;
			['unitKey', 'classKey', 'level', 'baseStats'].forEach(function(field) {
				if (!unitObj[field]) valid = false;
			});
			if (unitObj.baseStats) {
				['Str', 'Mag', 'Skl', 'Lck', 'Spd', 'Lck', 'Def'].forEach(function(stat) {
					if (!unitObj.baseStats[stat]) valid = false;
				});
			}
			if (!valid) {
				setErrorMessage('invalidSaveUnit'+unitObj.id, "Unit, class, level and stats must be filled out before saving.");
				return;
			}


			vm.unitToSave = { unit: unitObj, saveName: unitObj.savedUnitName || "", saved: false };

			saveUnitModal = vm.modals.saveUnitModal = $uibModal.open({
				appendTo: angular.element(document.querySelector('#battle-sim')),
				templateUrl: 'views/partials/save-battleunit.html',
				windowClass: 'save-battleunit-window',
				scope: $scope,
			});

		};

		vm.saveUnit = function() {
			if (!vm.unitToSave || !vm.unitToSave.unit) return;
			var unitObj = vm.unitToSave.unit;
			var saveName = vm.unitToSave.saveName;

			var compressedUnitData = compressionService.compressUnitData(unitObj);

			if (!saveName) {
				var savedUnits = localStorageService.keys();
				var savedUnitIndices = savedUnits.filter(function(savedUnitKey) {
					return savedUnitKey.replace("battleUnit", "").indexOf(unitObj.unitKey) === 0;
				}).map(function(savedUnitKey) {
					var index = savedUnitKey.replace("battleUnit" + unitObj.unitKey, "");
					return parseInt(index);
				}).sort();

				var nextIndex = (savedUnitIndices[savedUnitIndices.length-1] || 0) + 1;
				
				saveName = unitObj.unitKey + nextIndex;
			}


			localStorageService.set('battleUnit' + saveName, compressedUnitData);
			unitObj.savedUnitName = saveName;
			vm.unitToSave.saved = true;

			$timeout(saveUnitModal.close, 1000);
		};

		vm.loadSavedUnit = function(role, id) {
			vm.savedUnits = localStorageService.keys().map(function(savedUnitKey) {
				var encodedStr = localStorageService.get(savedUnitKey);
				var savedUnit = compressionService.decompressUnitData(encodedStr);
				savedUnit.savedUnitName = savedUnitKey.replace("battleUnit", "");
				return savedUnit;
			});

			loadSavedUnitModal = vm.modals.loadSavedUnitModal = $uibModal.open({
				appendTo: angular.element(document.querySelector('#battle-sim')),
				templateUrl: 'views/partials/load-savedunit.html',
				windowClass: 'load-savedunit-window',
				scope: $scope,
			});

			vm.selectedSavedUnit = { role: role, id: id, unit: null };
		};

		vm.selectSavedUnit = function(unit) {
			vm.selectedSavedUnit.unit = (vm.selectedSavedUnit.unit === unit) ? null : unit;
		};

		vm.useSelectedUnit = function() {
			if (!vm.selectedSavedUnit || !vm.selectedSavedUnit.unit) return;
			var selected = vm.selectedSavedUnit.unit;

			loadSavedUnitModal.close();
			loadSavedUnitModal.closed.then(function() {
				var unit = vm[vm.selectedSavedUnit.role + 'Unit'][vm.selectedSavedUnit.id];

				unit.setUnit(selected.unitKey);
				unit.setClass(selected.classKey);
				selected.skills.forEach(function(skill, idx) {
					if (idx < 1) return;
					if (!skill) unit.skills[idx] = null;
					else unit.skills[idx] = CLASS_SKILLS[skill.key];
				});
				// selected.inventory.forEach(function(item, idx) {
				// 	if (!item) unit.inventory[idx] = null;
				// 	else unit.inventory[idx] = WEAPONS[item.key];
				// });

				selected.prepInventory.forEach(function(item, idx) {
					if (!item) unit.prepInventory[idx] = null;
					else {
						unit.prepInventory[idx] = {
							item: WEAPONS[item.item.key],
							forgeLevel: item.forgeLevel
						};
						unit.setInventory(idx);
					}
				});

				unit.baseHP = selected.baseHP;
				unit.baseStats = angular.copy(selected.baseStats);
				unit.weaponRanks = angular.copy(selected.weaponRanks);
				unit.meal = angular.copy(selected.meal);
				unit.surge = angular.copy(selected.surge);

				unit.savedUnitName = selected.savedUnitName;

				vm.selectedSavedUnit = null;

			});
		};

		vm.deleteSelectedUnit = function() {
			if (!vm.selectedSavedUnit || !vm.selectedSavedUnit.unit) return;
			localStorageService.remove("battleUnit" + vm.selectedSavedUnit.unit.savedUnitName);

			var removedUnitIndex = vm.savedUnits.indexOf(vm.selectedSavedUnit.unit);
			vm.savedUnits.splice(removedUnitIndex, 1);

			vm.selectedSavedUnit.unit = null;
		};


		vm.closeModal = function(modalName) {
			vm.modals[modalName].close();
		};

		vm.getPrepInventoryList = function(unitObj) {
			return unitObj.prepInventory.map(function(item) {
				if (!item) return;
				return item.item;
			});
		};

		vm.displayCommaSeparatedNames = function(list) {
			return list.filter(function(entity) {
				return entity;
			}).map(function(entity) {
				return entity.name;
			}).join(", ");
		};




		vm.getHPBars = function(maxHP, position) {
			var bars = [];
			if (position === "top") {
				for (var i=1; i<=40; i++) {
					if (i <= maxHP) bars.push(i);
					else break;
				}
			}
			else if (position === "bottom") {
				for (var i=41; i<=80; i++) {
					if (i <= maxHP) bars.push(i);
					else break;
				}
			}
			return bars;
		};


		function setErrorMessage(type, message) {
			vm.errorMessages[type] = message;
			$timeout.cancel(vm.errorTimers[type]);
			vm.errorTimers[type] = $timeout(function() {
				vm.errorMessages[type] = "";
			}, 5000);
		};



		init();



		function loadUnitsFromParams() {
			if (!$rootScope.paramMaps) return;

			['A', 'B'].forEach(function(id) {
				['lead', 'support'].forEach(function(role) {
					var unitParam = role + id;
					var encodedStr = $rootScope.paramMaps[unitParam];
					if (!encodedStr) return;
					var selected = compressionService.decompressUnitData(encodedStr);

					var unit = vm[role + 'Unit'][id];

					unit.setUnit(selected.unitKey);
					unit.setClass(selected.classKey);
					selected.skills.forEach(function(skill, idx) {
						if (idx < 1) return;
						if (!skill) unit.skills[idx] = null;
						else unit.skills[idx] = CLASS_SKILLS[skill.key];
					});
					selected.prepInventory.forEach(function(item, idx) {
						if (!item) unit.prepInventory[idx] = null;
						else {
							unit.prepInventory[idx] = {
								item: WEAPONS[item.item.key],
								forgeLevel: item.forgeLevel
							};
							unit.setInventory(idx);
						}
					});
					unit.baseHP = selected.baseHP;
					unit.baseStats = angular.copy(selected.baseStats);
					unit.weaponRanks = angular.copy(selected.weaponRanks);
					unit.meal = angular.copy(selected.meal);
					unit.surge = angular.copy(selected.surge);

				});
			});



		}








	}
]);