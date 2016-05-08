app.controller('coreCtrl', ['$scope', 'utils', 'Characters', 'Classes', 'Skills',
	function($scope, utils, Characters, Classes, Skills) {

		var vm = this;


		var CHARS = vm.CHARS = Characters.getCharacters();
		var CLASSES = vm.CLASSES = Classes.getClasses();
		var SKILLS = vm.SKILLS = Skills.getAllSkills();

		vm.CHILD_MOD_BONUS = Characters.CHILD_MOD_BONUS;
		vm.AVATAR_MODS = Characters.AVATAR_MODS;
		vm.AVATAR_TALENTS = Classes.AVATAR_TALENTS;




		vm.form = {};
		vm.model = {};

		var getCharacter = vm.getCharacter = function(charKey) {
			return angular.copy(CHARS[charKey]);
		};

		var isAvatar = vm.isAvatar = function(unit) {
			if (!unit) return;
			return unit.name.indexOf('Avatar') == 0;
		};

		var avatarRequired = vm.avatarRequired = function() {
			return isAvatar(vm.model.unit) || isAvatar(vm.model.fixedParent) || isAvatar(vm.model.varParent);
		};

		var getAllClasses = vm.getAllClasses = function(charKey) {
			var unit = getCharacter(charKey);
			var classList = utils.getClassSet(charKey);
			if (!classList) return;

			var classMap = utils.createClassMap(classList);
			return classMap;
		};

		var selectClass = vm.selectClass = function(unitClass) {
			if (unitClass) vm.model.unitClass = unitClass;

			calcFullGrowths(vm.model.unit);
			calcCaps(vm.model.unit);
		};


		vm.selectUnit = function() {

			var unit = vm.model.unit;

			vm.model.fixedParent = null;
			vm.model.varParent = null;


			// initialize form fields where applicable
			selectClass(getAllClasses(unit.key)[unit.startingClass]);

			if (vm.model.unit.gen == 2) {
				vm.model.fixedParent = getCharacter(unit.parent);
			}

			if (avatarRequired()) {
				calcAvatarMods();
			}

		};

		vm.selectAvatarBoon = function() {
			// vm.model.avatarBoon = vm.form.avatarBoon;
			calcAvatarMods();
			calcChildMods();
			calcChildGrowths();
			calcFullGrowths();
			calcCaps();
		};
		vm.selectAvatarBane = function() {
			// vm.model.avatarBane = vm.form.avatarBane;
			calcAvatarMods();
			calcChildMods();
			calcChildGrowths();
			calcFullGrowths();
			calcCaps();
		};

		vm.selectAvatarTalent = function() {
			// vm.model.avatarTalent = vm.form.avatarTalent;
		};

		vm.selectVarParent = function() {
			if (avatarRequired()) calcAvatarMods();

			vm.model.varGrandparent = null;
			vm.model.fixedGrandparent = null;

			if (vm.model.varParent.gen == 1) {
				calcChildMods();
				calcChildGrowths();
				calcFullGrowths();
				calcCaps();
			}
			else if (vm.model.varParent.gen == 2) {

				// vm.form.fixedGrandparent = vm.model.varParent.parent;
				vm.model.fixedGrandparent = getCharacter(vm.model.varParent.parent);
				// calcChildMods(vm.model.varParent);
			}

		};

		// only applies to 3rd gen Kana
		vm.selectVarGrandparent = function() {
			calcChildMods(vm.model.varParent);
			calcChildMods(vm.model.unit);

			calcChildGrowths(vm.model.varParent);
			calcChildGrowths(vm.model.unit);
			calcFullGrowths();
			calcCaps();
		};



		vm.getSSupports = function(charKey) {
			var supportsList = Characters.getSSupports(charKey);
			if (!supportsList) return;

			var supportsMap = utils.createCharacterMap(supportsList);
			return supportsMap;
		};

		vm.getAPlusSupports = function(charKey) {
			var supportsList = Characters.getAPlusSupports(charKey)
				.filter(function(supportKey) {
					return supportKey != vm.form.varParent;
				});
			if (!supportsList) return;

			var supportsMap = utils.createCharacterMap(supportsList);
			return supportsMap;
		};

		vm.getVarParents = function(charKey) {
			var fixedParentKey = vm.CHARS[charKey].parent;
			var fixedParent = getCharacter(fixedParentKey);
			
			var varParentsList = Characters.getSSupports(fixedParentKey)
				.filter(function(varParentKey) {
					return vm.CHARS[varParentKey].gender != fixedParent.gender;
				});
			if (!varParentsList) return;

			var varParentsMap = utils.createCharacterMap(varParentsList);
			return varParentsMap;


		};





		function calcAvatarMods() {
			if (!vm.model.avatarBoon || !vm.model.avatarBane) return;

			vm.model.avatarBases = angular.copy(vm.AVATAR_MODS.bases.Base);
			Object.keys(vm.model.avatarBases).forEach(function(stat) {
				vm.model.avatarBases[stat] += (vm.AVATAR_MODS.bases.Boon[stat] + vm.AVATAR_MODS.bases.Bane[stat]);
			});

			vm.model.avatarGrowths = angular.copy(vm.AVATAR_MODS.growths.Base);
			vm.model.avatarCaps = angular.copy(vm.AVATAR_MODS.caps.Base);
			Object.keys(vm.model.avatarGrowths).forEach(function(stat) {
				vm.model.avatarGrowths[stat] += (vm.AVATAR_MODS.growths.Boon[vm.model.avatarBoon][stat] + vm.AVATAR_MODS.growths.Bane[vm.model.avatarBane][stat]);

				if (stat != 'HP')
					vm.model.avatarCaps[stat] += (vm.AVATAR_MODS.caps.Boon[vm.model.avatarBoon][stat] + vm.AVATAR_MODS.caps.Bane[vm.model.avatarBane][stat]);
			});

			var avatar;
			if (isAvatar(vm.model.unit)) avatar = vm.model.unit;
			else if (isAvatar(vm.model.fixedParent)) avatar = vm.model.fixedParent;
			else if (isAvatar(vm.model.varParent)) avatar = vm.model.varParent;

			avatar.bases = vm.model.avatarBases;
			avatar.growths = vm.model.avatarGrowths;
			avatar.mods = vm.model.avatarCaps;


		};

		function calcChildMods(child) {
			if (!vm.model.fixedParent || !vm.model.varParent) return;
			if (!child) child = vm.model.unit;

			var childMods = {};
			Object.keys(vm.CHILD_MOD_BONUS).forEach(function(stat) {

				// parent of 3rd gen Kana
				if (child == vm.model.varParent) {
					childMods[stat] = vm.model.fixedGrandparent.mods[stat] + vm.model.varGrandparent.mods[stat];
				}

				// 3rd gen Kana
				else if (vm.model.varParent.gen == 2) {
					childMods[stat] = vm.model.fixedParent.mods[stat] + vm.model.varParent.calculatedMods[stat];
				}

				// regular 2nd gen child
				else {
					if (!vm.model.varParent.mods || typeof vm.model.varParent.mods[stat] != 'number') return;
					childMods[stat] = vm.model.fixedParent.mods[stat] + vm.model.varParent.mods[stat];
				}

				// only get the child mod bonus if not 3rd gen Kana
				if (vm.model.varParent.gen == 1 || child == vm.model.varParent) childMods[stat] += vm.CHILD_MOD_BONUS[stat];
			});

			if (!Object.keys(childMods).length) return;
			child.calculatedMods = childMods;

		};

		function calcChildGrowths(child) {
			if (!vm.model.varParent) return;
			if (!child) child = vm.model.unit;

			var childGrowths = {};
			Object.keys(child.growths).forEach(function(stat) {

				// parent of 3rd gen kana
				if (child == vm.model.varParent) {
					childGrowths[stat] = (vm.model.varGrandparent.growths[stat] + child.growths[stat]) / 2;
				}

				// 3rd gen Kana
				else if (vm.model.varParent.gen == 2) {
					childGrowths[stat] = (vm.model.varParent.calculatedGrowths[stat] + child.growths[stat]) / 2;
				}
				
				// regular 2nd gen child
				else {
					if (!vm.model.varParent.growths || typeof vm.model.varParent.growths[stat] != 'number') return;
					childGrowths[stat] = (vm.model.varParent.growths[stat] + child.growths[stat]) / 2;
				}

			});

			if (!Object.keys(childGrowths).length) return;
			child.calculatedGrowths = childGrowths;
		};

		function calcFullGrowths(unit) {
			if (!vm.model.unitClass) return;
			if (!unit) unit = vm.model.unit;

			var fullGrowths = {};
			Object.keys(unit.growths).forEach(function(stat) {

				if (unit.gen == 1) {
					fullGrowths[stat] = unit.growths[stat] + vm.model.unitClass.growths[stat];
				}
				else if (unit.gen == 2) {
					if (!unit.calculatedGrowths || typeof unit.calculatedGrowths[stat] != 'number') return;
					fullGrowths[stat] = unit.calculatedGrowths[stat] + vm.model.unitClass.growths[stat];
				}

			});

			if (!Object.keys(fullGrowths).length) return;
			unit.calculatedFullGrowths = fullGrowths;
		};

		function calcCaps(unit) {
			if (!vm.model.unitClass) return;
			if (!unit) unit = vm.model.unit;

			var caps = {};
			Object.keys(vm.model.unitClass.maxStats).forEach(function(stat) {

				if (unit.gen == 1) {
					caps[stat] = (unit.mods[stat] || 0) + vm.model.unitClass.maxStats[stat];
				}
				else if (unit.gen == 2) {
					if (stat == "HP") caps[stat] = vm.model.unitClass.maxStats["HP"];
					else {
						if (!unit.calculatedMods || typeof unit.calculatedMods[stat] != 'number') return;
						caps[stat] = (unit.calculatedMods[stat] || 0) + vm.model.unitClass.maxStats[stat];				
					}
				}

			});

			if (Object.keys(caps).length <= 1) return;
			unit.calculatedCaps = caps;
		};


	}



]);






