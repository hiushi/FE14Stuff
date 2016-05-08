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


		var getCharacter = vm.getCharacter = function(charKey) {
			return angular.copy(CHARS[charKey]);
		};

		var isAvatar = vm.isAvatar = function(unit) {
			if (!unit) return;
			return unit.name.indexOf('Avatar') == 0;
		};

		var avatarRequired = vm.avatarRequired = function() {
			return isAvatar(vm.unit) || isAvatar(vm.fixedParent) || isAvatar(vm.varParent);
		};


		vm.selectUnit = function() {
			vm.form = { 
				unit: vm.form.unit,
				avatarBoon: vm.form.avatarBoon,
				avatarBane: vm.form.avatarBane,
				avatarTalent: vm.form.avatarTalent
			};
			vm.fixedParent = null;
			vm.varParent = null;

			vm.unit = getCharacter(vm.form.unit);

			if (vm.unit.gen == 2) {
				vm.form.fixedParent = vm.unit.parent;
				vm.fixedParent = getCharacter(vm.form.fixedParent);
			}

			if (avatarRequired()) calcAvatarMods();

		};

		vm.selectAvatarBoon = function() {
			vm.avatarBoon = vm.form.avatarBoon;
			calcAvatarMods();
			calcChildMods();
		};
		vm.selectAvatarBane = function() {
			vm.avatarBane = vm.form.avatarBane;
			calcAvatarMods();
			calcChildMods();
		};

		vm.selectAvatarTalent = function() {
			vm.avatarTalent = vm.form.avatarTalent;
		};

		vm.selectVarParent = function() {
			vm.varParent = getCharacter(vm.form.varParent);
			if (avatarRequired()) calcAvatarMods();

			vm.form.varGrandparent = vm.varGrandparent = null;
			vm.form.fixedGrandparent = vm.fixedGrandparent = null;

			if (vm.varParent.gen == 1) {
				calcChildMods();
			}
			else if (vm.varParent.gen == 2) {

				vm.form.fixedGrandparent = vm.varParent.parent;
				vm.fixedGrandparent = getCharacter(vm.form.fixedGrandparent);
				// calcChildMods(vm.varParent);
			}

		};

		// only applies to 3rd gen Kana
		vm.selectVarGrandparent = function() {
			vm.varGrandparent = getCharacter(vm.form.varGrandparent);
			calcChildMods(vm.varParent);
			calcChildMods(vm.unit);
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
			if (!vm.avatarBoon || !vm.avatarBane) return;

			vm.avatarBases = angular.copy(vm.AVATAR_MODS.bases.Base);
			Object.keys(vm.avatarBases).forEach(function(stat) {
				vm.avatarBases[stat] += (vm.AVATAR_MODS.bases.Boon[stat] + vm.AVATAR_MODS.bases.Bane[stat]);
			});

			vm.avatarGrowths = angular.copy(vm.AVATAR_MODS.growths.Base);
			vm.avatarCaps = angular.copy(vm.AVATAR_MODS.caps.Base);
			Object.keys(vm.avatarGrowths).forEach(function(stat) {
				vm.avatarGrowths[stat] += (vm.AVATAR_MODS.growths.Boon[vm.avatarBoon][stat] + vm.AVATAR_MODS.growths.Bane[vm.avatarBane][stat]);

				if (stat != 'HP')
					vm.avatarCaps[stat] += (vm.AVATAR_MODS.caps.Boon[vm.avatarBoon][stat] + vm.AVATAR_MODS.caps.Bane[vm.avatarBane][stat]);
			});

			var avatar;
			if (isAvatar(vm.unit)) avatar = vm.unit;
			else if (isAvatar(vm.fixedParent)) avatar = vm.fixedParent;
			else if (isAvatar(vm.varParent)) avatar = vm.varParent;

			avatar.bases = vm.avatarBases;
			avatar.growths = vm.avatarGrowths;
			avatar.mods = vm.avatarCaps;


		};

		function calcChildMods(child) {
			if (!vm.fixedParent || !vm.varParent) return;
			if (!child) child = vm.unit;

			var childMods = {};
			Object.keys(vm.CHILD_MOD_BONUS).forEach(function(stat) {

				// parent of 3rd gen Kana
				if (child == vm.varParent) {
					childMods[stat] = vm.fixedGrandparent.mods[stat] + vm.varGrandparent.mods[stat];
				}

				// 3rd gen Kana or regular 2nd gen child
				else {
					childMods[stat] = vm.fixedParent.mods[stat] + vm.varParent.mods[stat];
				}

				// only get the child mod bonus if not 3rd gen Kana
				if (vm.varParent.gen == 1 || child == vm.varParent) childMods[stat] += vm.CHILD_MOD_BONUS[stat];
			});

			child.mods = childMods;

		};



	}



]);






