var app = angular.module('FE14Stuff', [])
	.config(['$compileProvider', 
		function($compileProvider) {
			$compileProvider.debugInfoEnabled(false);
		}
	])
	.run(['$rootScope',
		function($rootScope) {

		}
	]);
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







app.filter('sign', function() {
	return function(input) {
		if (input > 0) return ('+' + input);
		else if (input < 0) return ('\u2212' + input*-1);
		else return input;
	}
})
// app.config(['$stateProvider', '$urlRouterProvider',
// 	function($stateProvider, $urlRouterProvider) {
// 		$stateProvider
// 			.state('app', {
// 				// abstract: true,
// 				// views: {
// 				// 	'master': {
// 				// 		templateUrl: '/dist/views/master-layout.html',
// 				// 		controller: 'coreCtrl'
// 				// 	}
// 				// }
// 				templateUrl: 'dist/views/master-layout.html',
// 				controller: 'coreCtrl'
// 			})
// 	}
// ]);
app.service('Characters', function() {

	var characters = {
		"Avatar_M": {
			"name": "Avatar (M)",
			"gender": "M",
			"gen": 1,
			"child": "Kana (F)",
			"availability": "BCR",
			"SSupport": ["Felicia", "Azura", "Mozu", "Rinkah", "Sakura", "Hana", "Orochi", "Hinoka", "Setsuna", "Oboro", "Kagero", "Reina", "Scarlet", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Elise", "Effie", "Nyx", "Camilla", "Selena", "Beruka", "Peri", "Charlotte", "Flora", "Velouria", "Ophelia", "Soleil", "Nina", "Anna", "Niles"],
			"APlusSupport": ["Gunter", "Jakob", "Kaze", "Silas", "Shura", "Izana", "Subaki", "Saizo", "Azama", "Hayato", "Hinata", "Takumi", "Kaden", "Ryoma", "Yukimura", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Arthur", "Odin", "Niles", "Laslow", "Benny", "Leo", "Keaton", "Xander", "Siegbert", "Forrest", "Ignatius", "Percy", "Fuga"],
			"startingClass": "Nohr_Prince",
			"startingLevel": 1,
			"bases": {},
			"growths": {},
			"mods": {},
			"personalSkill": "Supportive",
			"baseClass1": "Nohr_Prince",
		},

		"Avatar_F": {
			"name": "Avatar (F)",
			"gender": "F",
			"gen": 1,
			"child": "Kana (M)",
			"availability": "BCR",
			"SSupport": ["Gunter", "Jakob", "Kaze", "Silas", "Shura", "Izana", "Subaki", "Saizo", "Azama", "Hayato", "Hinata", "Takumi", "Kaden", "Ryoma", "Yukimura", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Arthur", "Odin", "Niles", "Laslow", "Benny", "Leo", "Keaton", "Xander", "Siegbert", "Forrest", "Ignatius", "Percy", "Fuga", "Rhajat"],
			"APlusSupport": ["Felicia", "Azura", "Mozu", "Rinkah", "Sakura", "Hana", "Orochi", "Hinoka", "Setsuna", "Oboro", "Kagero", "Reina", "Scarlet", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Elise", "Effie", "Niles", "Nyx", "Camilla", "Selena", "Beruka", "Peri", "Charlotte", "Flora", "Velouria", "Ophelia", "Soleil", "Nina", "Anna"],
			"startingClass": "Nohr_Prince",
			"startingLevel": 1,
			"bases": {},
			"growths": {},
			"mods": {},
			"personalSkill": "Supportive",
			"baseClass1": "Nohr_Prince",
		},

		"Azura": {
			"name": "Azura",
			"gender": "F",
			"gen": 1,
			"child": "Shigure",
			"availability": "BCR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles"],
			"APlusSupport": ["Hinoka", "Sakura", "Elise"],
			"startingClass": "Songstress",
			"startingLevel": 1,
			"bases": {"HP": 16, "Str": 5, "Mag": 2, "Skl": 8, "Spd": 8, "Lck": 6, "Def": 4, "Res": 7},
			"growths": {"HP": 25, "Str": 50, "Mag": 25, "Skl": 60, "Spd": 60, "Lck": 40, "Def": 15, "Res": 35},
			"mods": {"Str": 0, "Mag": 0, "Skl": 1, "Spd": 3, "Lck": 0, "Def": -3, "Res": 0},
			"personalSkill": "Healing_Descant",
			"baseClass1": "Songstress",
			"baseClass2": "Sky_Knight",
			"special": true
		},

		"Gunter": {
			"name": "Gunter",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F"],
			"APlusSupport": ["Jakob"],
			"startingClass": "Great_Knight",
			"startingLevel": 3,
			"bases": {"HP": 24, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 8, "Lck": 9, "Def": 10, "Res": 4},
			"growths": {"HP": 15, "Str": 5, "Mag": 0, "Skl": 5, "Spd": 0, "Lck": 15, "Def": 5, "Res": 5},
			"mods": {"Str": 2, "Mag": 0, "Skl": 1, "Spd": -2, "Lck": 0, "Def": 2, "Res": -2},
			"personalSkill": "Forceful_Partner",
			"baseClass1": "Cavalier",
			"baseClass2": "Mercenary",
			"baseClass3": "Wyvern_Rider"
		},

		"Felicia": {
			"name": "Felicia",
			"gender": "F",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles"],
			"APlusSupport": ["Hana", "Peri", "Flora"],
			"startingClass": "Maid",
			"startingLevel": 1,
			"bases": {"HP": 19, "Str": 5, "Mag": 9, "Skl": 10, "Spd": 10, "Lck": 12, "Def": 5, "Res": 9},
			"growths": {"HP": 40, "Str": 10, "Mag": 35, "Skl": 30, "Spd": 40, "Lck": 55, "Def": 15, "Res": 35},
			"mods": {"Str": -2, "Mag": 2, "Skl": 0, "Spd": 1, "Lck": 0, "Def": -1, "Res": 1},
			"personalSkill": "Devoted_Partner",
			"baseClass1": "Troubadour",
			"baseClass2": "Mercenary",
			"special": true
		},

		"Jakob": {
			"name": "Jakob",
			"gender": "M",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx"],
			"APlusSupport": ["Gunter", "Silas", "Takumi"],
			"child": "Dwyer",
			"startingClass": "Maid",
			"startingLevel": 1,
			"bases": {"HP": 21, "Str": 8, "Mag": 6, "Skl": 12, "Spd": 9, "Lck": 10, "Def": 7, "Res": 6},
			"growths": {"HP": 50, "Str": 35, "Mag": 15, "Skl": 40, "Spd": 35, "Lck": 45, "Def": 25, "Res": 25},
			"mods": {"Str": 2, "Mag": -2, "Skl": 2, "Spd": 0, "Lck": -1, "Def": 0, "Res": -1},
			"personalSkill": "Evasive_Partner",
			"baseClass1": "Troubadour",
			"baseClass2": "Cavalier",
			"special": true
		},	

		"Kaze": {
			"name": "Kaze",
			"gender": "M",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx"],
			"APlusSupport": ["Saizo", "Silas", "Xander"],
			"child": "Midori",
			"startingClass": "Ninja",
			"startingLevel": 3,
			"bases": {"HP": 19, "Str": 7, "Mag": 0, "Skl": 9, "Spd": 12, "Lck": 4, "Def": 5, "Res": 10},
			"growths": {"HP": 55, "Str": 40, "Mag": 0, "Skl": 45, "Spd": 65, "Lck": 20, "Def": 20, "Res": 35},
			"mods": {"Str": -2, "Mag": 0, "Skl": 2, "Spd": 3, "Lck": -2, "Def": -1, "Res": 0},
			"personalSkill": "Miraculous_Save",
			"baseClass1": "Ninja",
			"baseClass2": "Samurai"
		},

		"Silas": {
			"name": "Silas",
			"gender": "M",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx"],
			"APlusSupport": ["Ryoma", "Jakob", "Kaze"],
			"child": "Sophie",
			"startingClass": "Cavalier",
			"startingLevel": 6,
			"bases": {"HP": 22, "Str": 11, "Mag": 0, "Skl": 9, "Spd": 8, "Lck": 7, "Def": 10, "Res": 5},
			"growths": {"HP": 40, "Str": 45, "Mag": 5, "Skl": 50, "Spd": 40, "Lck": 40, "Def": 40, "Res": 25},
			"mods": {"Str": 1, "Mag": 0, "Skl": 2, "Spd": 0, "Lck": -1, "Def": 0, "Res": -1},
			"personalSkill": "Vow_of_Friendship",
			"baseClass1": "Cavalier",
			"baseClass2": "Mercenary"
		},	

		"Mozu": {
			"name": "Mozu",
			"gender": "F",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles"],
			"APlusSupport": ["Oboro", "Effie", "Nyx"],
			"startingClass": "Villager",
			"startingLevel": 1,
			"bases": {"HP": 16, "Str": 6, "Mag": 0, "Skl": 5, "Spd": 7, "Lck": 3, "Def": 4, "Res": 1},
			"growths": {"HP": 40, "Str": 50, "Mag": 15, "Skl": 60, "Spd": 65, "Lck": 55, "Def": 45, "Res": 40},
			"mods": {"Str": 0, "Mag": 0, "Skl": 1, "Spd": 1, "Lck": 1, "Def": 0, "Res": -2},
			"personalSkill": "Forager",
			"baseClass1": "Villager",
			"baseClass2": "Archer"
		},	

		"Rinkah": {
			"name": "Rinkah",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Benny", "Keaton"],
			"APlusSupport": ["Orochi", "Kagero", "Oboro", "Charlotte"],
			"startingClass": "Oni_Savage",
			"startingLevel": 4,
			"bases": {"HP": 20, "Str": 8, "Mag": 2, "Skl": 6, "Spd": 8, "Lck": 5, "Def": 10, "Res": 3},
			"growths": {"HP": 20, "Str": 25, "Mag": 15, "Skl": 50, "Spd": 45, "Lck": 35, "Def": 45, "Res": 20},
			"mods": {"Str": -1, "Mag": 0, "Skl": -2, "Spd": 1, "Lck": 0, "Def": 2, "Res": 0},
			"personalSkill": "Fiery_Blood",
			"baseClass1": "Oni_Savage",
			"baseClass2": "Ninja"
		},

		"Sakura": {
			"name": "Sakura",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Xander", "Leo"],
			"APlusSupport": ["Hinoka", "Hana", "Azura", "Elise"],
			"startingClass": "Shrine_Maiden",
			"startingLevel": 1,
			"bases": {"HP": 16, "Str": 3, "Mag": 6, "Skl": 5, "Spd": 7, "Lck": 9, "Def": 5, "Res": 7},
			"growths": {"HP": 45, "Str": 30, "Mag": 50, "Skl": 40, "Spd": 40, "Lck": 55, "Def": 30, "Res": 20},
			"mods": {"Str": 0, "Mag": 2, "Skl": -1, "Spd": 1, "Lck": 0, "Def": -1, "Res": 0},
			"personalSkill": "Quiet_Strength",
			"baseClass1": "Shrine_Maiden",
			"baseClass2": "Sky_Knight"
		},

		"Hana": {
			"name": "Hana",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Laslow", "Keaton"],
			"APlusSupport": ["Sakura", "Setsuna", "Effie"],
			"startingClass": "Samurai",
			"startingLevel": 5,
			"bases": {"HP": 20, "Str": 9, "Mag": 0, "Skl": 11, "Spd": 11, "Lck": 5, "Def": 6, "Res": 9},
			"growths": {"HP": 25, "Str": 55, "Mag": 10, "Skl": 45, "Spd": 55, "Lck": 25, "Def": 20, "Res": 30},
			"mods": {"Str": 1, "Mag": 0, "Skl": 1, "Spd": 2, "Lck": -1, "Def": -3, "Res": 1},
			"personalSkill": "Fearsome_Blow",
			"baseClass1": "Samurai",
			"baseClass2": "Shrine_Maiden"
		},

		"Subaki": {
			"name": "Subaki",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Selena", "Nyx"],
			"APlusSupport": ["Azama", "Saizo", "Hinata", "Niles"],
			"child": "Caeldori",
			"startingClass": "Sky_Knight",
			"startingLevel": 5,
			"bases": {"HP": 22, "Str": 8, "Mag": 0, "Skl": 13, "Spd": 10, "Lck": 7, "Def": 9, "Res": 10},
			"growths": {"HP": 55, "Str": 30, "Mag": 20, "Skl": 50, "Spd": 20, "Lck": 25, "Def": 45, "Res": 5},
			"mods": {"Str": -1, "Mag": 0, "Skl": 2, "Spd": -2, "Lck": -1, "Def": 3, "Res": -1},
			"personalSkill": "Perfectionist",
			"baseClass1": "Sky_Knight",
			"baseClass2": "Samurai"
		},

		"Saizo": {
			"name": "Saizo",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Charlotte", "Beruka"],
			"APlusSupport": ["Ryoma", "Subaki", "Kaze", "Laslow"],
			"child": "Asugi",
			"startingClass": "Ninja",
			"startingLevel": 7,
			"bases": {"HP": 23, "Str": 11, "Mag": 3, "Skl": 14, "Spd": 11, "Lck": 9, "Def": 9, "Res": 7},
			"growths": {"HP": 40, "Str": 50, "Mag": 45, "Skl": 60, "Spd": 30, "Lck": 55, "Def": 45, "Res": 10},
			"mods": {"Str": 1, "Mag": 0, "Skl": 3, "Spd": -2, "Lck": 0, "Def": 1, "Res": -2},
			"personalSkill": "Pyrotechnics",
			"baseClass1": "Ninja",
			"baseClass2": "Samurai"
		},

		"Orochi": {
			"name": "Orochi",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Laslow", "Odin"],
			"APlusSupport": ["Rinkah", "Kagero", "Oboro", "Nyx"],
			"startingClass": "Diviner",
			"startingLevel": 5,
			"bases": {"HP": 20, "Str": 0, "Mag": 9, "Skl": 11, "Spd": 7, "Lck": 6, "Def": 5, "Res": 10},
			"growths": {"HP": 35, "Str": 5, "Mag": 65, "Skl": 50, "Spd": 15, "Lck": 35, "Def": 25, "Res": 45},
			"mods": {"Str": 0, "Mag": 3, "Skl": 2, "Spd": -2, "Lck": -1, "Def": -2, "Res": 1},
			"personalSkill": "Capture",
			"baseClass1": "Diviner",
			"baseClass2": "Apothecary"
		},

		"Hinoka": {
			"name": "Hinoka",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Xander", "Leo"],
			"APlusSupport": ["Sakura", "Setsuna", "Azura", "Camilla"],
			"startingClass": "Sky_Knight",
			"startingLevel": 8,
			"bases": {"HP": 23, "Str": 9, "Mag": 4, "Skl": 13, "Spd": 16, "Lck": 12, "Def": 9, "Res": 15},
			"growths": {"HP": 45, "Str": 45, "Mag": 15, "Skl": 40, "Spd": 45, "Lck": 40, "Def": 35, "Res": 40},
			"mods": {"Str": 1, "Mag": -1, "Skl": -1, "Spd": 1, "Lck": 0, "Def": -1, "Res": 2},
			"personalSkill": "Rallying_Cry",
			"baseClass1": "Sky_Knight",
			"baseClass2": "Spear_Fighter"
		},

		"Azama": {
			"name": "Azama",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Effie", "Beruka"],
			"APlusSupport": ["Kaden", "Subaki", "Hayato", "Arthur"],
			"child": "Mitama",
			"startingClass": "Monk",
			"startingLevel": 7,
			"bases": {"HP": 24, "Str": 9, "Mag": 7, "Skl": 9, "Spd": 10, "Lck": 12, "Def": 10, "Res": 8},
			"growths": {"HP": 55, "Str": 50, "Mag": 20, "Skl": 40, "Spd": 45, "Lck": 40, "Def": 40, "Res": 20},
			"mods": {"Str": 2, "Mag": -3, "Skl": 0, "Spd": 1, "Lck": 0, "Def": 1, "Res": 0},
			"personalSkill": "Divine_Retribution",
			"baseClass1": "Monk",
			"baseClass2": "Apothecary"
		},

		"Setsuna": {
			"name": "Setsuna",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Niles", "Arthur"],
			"APlusSupport": ["Hinoka", "Kagero", "Hana", "Selena"],
			"startingClass": "Archer",
			"startingLevel": 3,
			"bases": {"HP": 19, "Str": 8, "Mag": 0, "Skl": 9, "Spd": 10, "Lck": 6, "Def": 5, "Res": 3},
			"growths": {"HP": 30, "Str": 20, "Mag": 0, "Skl": 30, "Spd": 60, "Lck": 30, "Def": 15, "Res": 40},
			"mods": {"Str": 0, "Mag": 0, "Skl": 1, "Spd": 3, "Lck": -1, "Def": -1, "Res": -1},
			"personalSkill": "Optimist",
			"baseClass1": "Archer",
			"baseClass2": "Ninja"
		},

		"Hayato": {
			"name": "Hayato",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Effie", "Nyx"],
			"APlusSupport": ["Kaden", "Azama", "Benny", "Fuga"],
			"child": "Rhajat",
			"startingClass": "Diviner",
			"startingLevel": 1,
			"bases": {"HP": 16, "Str": 1, "Mag": 4, "Skl": 5, "Spd": 7, "Lck": 8, "Def": 4, "Res": 5},
			"growths": {"HP": 50, "Str": 30, "Mag": 40, "Skl": 30, "Spd": 45, "Lck": 60, "Def": 40, "Res": 20},
			"mods": {"Str": 0, "Mag": 1, "Skl": -1, "Spd": 2, "Lck": 1, "Def": -1, "Res": -1},
			"personalSkill": "Pride",
			"baseClass1": "Diviner",
			"baseClass2": "Oni_Savage"
		},

		"Oboro": {
			"name": "Oboro",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Benny", "Niles"],
			"APlusSupport": ["Orochi", "Rinkah", "Mozu", "Beruka"],
			"startingClass": "Spear_Fighter",
			"startingLevel": 10,
			"bases": {"HP": 25, "Str": 13, "Mag": 0, "Skl": 11, "Spd": 12, "Lck": 11, "Def": 13, "Res": 8},
			"growths": {"HP": 30, "Str": 40, "Mag": 20, "Skl": 40, "Spd": 40, "Lck": 40, "Def": 40, "Res": 30},
			"mods": {"Str": 1, "Mag": -1, "Skl": 1, "Spd": 1, "Lck": -1, "Def": 1, "Res": -1},
			"personalSkill": "Nohr_Enmity",
			"baseClass1": "Spear_Fighter",
			"baseClass2": "Apothecary"
		},

		"Hinata": {
			"name": "Hinata",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Peri", "Selena"],
			"APlusSupport": ["Takumi", "Kaden", "Subaki", "Odin"],
			"child": "Hisame",
			"startingClass": "Samurai",
			"startingLevel": 10,
			"bases": {"HP": 26, "Str": 11, "Mag": 0, "Skl": 9, "Spd": 14, "Lck": 10, "Def": 12, "Res": 4},
			"growths": {"HP": 55, "Str": 35, "Mag": 0, "Skl": 25, "Spd": 15, "Lck": 45, "Def": 45, "Res": 15},
			"mods": {"Str": 1, "Mag": 0, "Skl": -1, "Spd": -2, "Lck": 0, "Def": 2, "Res": 0},
			"personalSkill": "Triple_Threat",
			"baseClass1": "Samurai",
			"baseClass2": "Oni_Savage"
		},

		"Takumi": {
			"name": "Takumi",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise"],
			"APlusSupport": ["Ryoma", "Hinata", "Jakob", "Leo"],
			"child": "Kiragi",
			"startingClass": "Archer",
			"startingLevel": 11,
			"bases": {"HP": 26, "Str": 13, "Mag": 0, "Skl": 17, "Spd": 11, "Lck": 13, "Def": 10, "Res": 4},
			"growths": {"HP": 50, "Str": 35, "Mag": 0, "Skl": 60, "Spd": 40, "Lck": 45, "Def": 35, "Res": 20},
			"mods": {"Str": 1, "Mag": 0, "Skl": 3, "Spd": -2, "Lck": 1, "Def": 0, "Res": -2},
			"personalSkill": "Competitive",
			"baseClass1": "Archer",
			"baseClass2": "Spear_Fighter"
		},

		"Kagero": {
			"name": "Kagero",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Ryoma", "Takumi", "Saizo", "Kaden", "Hinata", "Azama", "Subaki", "Hayato", "Odin", "Arthur"],
			"APlusSupport": ["Orochi", "Rinkah", "Setsuna", "Peri"],
			"startingClass": "Ninja",
			"startingLevel": 10,
			"bases": {"HP": 22, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 12, "Lck": 7, "Def": 9, "Res": 10},
			"growths": {"HP": 30, "Str": 65, "Mag": 0, "Skl": 20, "Spd": 50, "Lck": 30, "Def": 25, "Res": 40},
			"mods": {"Str": 3, "Mag": 0, "Skl": -1, "Spd": -1, "Lck": 0, "Def": -1, "Res": 1},
			"personalSkill": "Shuriken_Mastery",
			"baseClass1": "Ninja",
			"baseClass2": "Diviner"
		},

		"Kaden": {
			"name": "Kaden",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Charlotte", "Peri"],
			"APlusSupport": ["Hinata", "Azama", "Hayato", "Keaton"],
			"child": "Selkie",
			"startingClass": "Kitsune",
			"startingLevel": 14,
			"bases": {"HP": 30, "Str": 15, "Mag": 1, "Skl": 12, "Spd": 19, "Lck": 14, "Def": 9, "Res": 14},
			"growths": {"HP": 45, "Str": 40, "Mag": 10, "Skl": 25, "Spd": 45, "Lck": 50, "Def": 35, "Res": 40},
			"mods": {"Str": 1, "Mag": 0, "Skl": -3, "Spd": 2, "Lck": 1, "Def": -2, "Res": 2},
			"personalSkill": "Reciprocity",
			"baseClass1": "Kitsune",
			"baseClass2": "Diviner"
		},

		"Ryoma": {
			"name": "Ryoma",
			"gender": "M",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise"],
			"APlusSupport": ["Saizo", "Silas", "Takumi", "Xander"],
			"child": "Shiro",
			"startingClass": "Swordmaster",
			"startingLevel": 4,
			"bases": {"HP": 36, "Str": 20, "Mag": 2, "Skl": 18, "Spd": 24, "Lck": 20, "Def": 16, "Res": 13},
			"growths": {"HP": 50, "Str": 45, "Mag": 0, "Skl": 50, "Spd": 45, "Lck": 40, "Def": 35, "Res": 25},
			"mods": {"Str": 1, "Mag": 0, "Skl": 2, "Spd": 1, "Lck": 1, "Def": -2, "Res": -2},
			"personalSkill": "Bushido",
			"baseClass1": "Samurai",
			"baseClass2": "Sky_Knight"
		},

		"Elise": {
			"name": "Elise",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Ryoma", "Takumi"],
			"APlusSupport": ["Camilla", "Azura", "Effie", "Sakura"],
			"startingClass": "Troubadour",
			"startingLevel": 5,
			"bases": {"HP": 19, "Str": 2, "Mag": 11, "Skl": 5, "Spd": 10, "Lck": 14, "Def": 4, "Res": 11},
			"growths": {"HP": 30, "Str": 5, "Mag": 65, "Skl": 25, "Spd": 55, "Lck": 70, "Def": 15, "Res": 40},
			"mods": {"Str": -1, "Mag": 3, "Skl": -2, "Spd": 1, "Lck": 1, "Def": -3, "Res": 1},
			"personalSkill": "Lilys_Poise",
			"baseClass1": "Troubadour",
			"baseClass2": "Wyvern_Rider"
		},

		"Effie": {
			"name": "Effie",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Hayato", "Azama"],
			"APlusSupport": ["Elise", "Mozu", "Nyx", "Hana"],
			"startingClass": "Knight",
			"startingLevel": 6,
			"bases": {"HP": 23, "Str": 13, "Mag": 0, "Skl": 8, "Spd": 5, "Lck": 10, "Def": 12, "Res": 4},
			"growths": {"HP": 35, "Str": 60, "Mag": 0, "Skl": 35, "Spd": 50, "Lck": 50, "Def": 35, "Res": 30},
			"mods": {"Str": 3, "Mag": 0, "Skl": -1, "Spd": 1, "Lck": 0, "Def": -1, "Res": -1},
			"personalSkill": "Puissance",
			"baseClass1": "Knight",
			"baseClass2": "Troubadour"
		},	

		"Arthur": {
			"name": "Arthur",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Kagero", "Setsuna"],
			"APlusSupport": ["Benny", "Keaton", "Niles", "Azama"],
			"child": "Percy",
			"startingClass": "Fighter",
			"startingLevel": 7,
			"bases": {"HP": 24, "Str": 12, "Mag": 0, "Skl": 9, "Spd": 8, "Lck": 1, "Def": 9, "Res": 4},
			"growths": {"HP": 50, "Str": 45, "Mag": 0, "Skl": 55, "Spd": 35, "Lck": 5, "Def": 45, "Res": 20},
			"mods": {"Str": 1, "Mag": 0, "Skl": 3, "Spd": 0, "Lck": -3, "Def": 1, "Res": -1},
			"personalSkill": "Misfortunate",
			"baseClass1": "Fighter",
			"baseClass2": "Cavalier"
		},

		"Odin": {
			"name": "Odin",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Orochi", "Kagero"],
			"APlusSupport": ["Leo", "Laslow", "Niles", "Hinata"],
			"child": "Ophelia",
			"startingClass": "Dark_Mage",
			"startingLevel": 5,
			"bases": {"HP": 21, "Str": 5, "Mag": 8, "Skl": 10, "Spd": 7, "Lck": 9, "Def": 6, "Res": 7},
			"growths": {"HP": 55, "Str": 35, "Mag": 30, "Skl": 55, "Spd": 35, "Lck": 60, "Def": 40, "Res": 20},
			"mods": {"Str": 0, "Mag": 1, "Skl": 1, "Spd": -1, "Lck": 1, "Def": 0, "Res": -1},
			"personalSkill": "Aching_Blood",
			"baseClass1": "Dark_Mage",
			"baseClass2": "Samurai"
		},

		"Niles": {
			"name": "Niles",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Setsuna", "Oboro", "Avatar_M"],
			"APlusSupport": ["Leo", "Odin", "Arthur", "Subaki"],
			"child": "Nina",
			"startingClass": "Outlaw",
			"startingLevel": 8,
			"bases": {"HP": 22, "Str": 9, "Mag": 5, "Skl": 9, "Spd": 15, "Lck": 6, "Def": 7, "Res": 12},
			"growths": {"HP": 40, "Str": 35, "Mag": 20, "Skl": 40, "Spd": 50, "Lck": 30, "Def": 30, "Res": 40},
			"mods": {"Str": -2, "Mag": 0, "Skl": -1, "Spd": 3, "Lck": 0, "Def": 0, "Res": 1},
			"personalSkill": "Kidnap",
			"baseClass1": "Outlaw",
			"baseClass2": "Dark_Mage"
		},

		"Nyx": {
			"name": "Nyx",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Hayato", "Subaki"],
			"APlusSupport": ["Mozu", "Charlotte", "Effie", "Orochi"],
			"startingClass": "Dark_Mage",
			"startingLevel": 9,
			"bases": {"HP": 20, "Str": 1, "Mag": 12, "Skl": 5, "Spd": 11, "Lck": 3, "Def": 4, "Res": 8},
			"growths": {"HP": 30, "Str": 5, "Mag": 50, "Skl": 35, "Spd": 50, "Lck": 20, "Def": 15, "Res": 30},
			"mods": {"Str": 0, "Mag": 3, "Skl": -2, "Spd": 2, "Lck": -1, "Def": -2, "Res": 1},
			"personalSkill": "Countercurse",
			"baseClass1": "Dark_Mage",
			"baseClass2": "Outlaw"
		},

		"Camilla": {
			"name": "Camilla",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Ryoma", "Takumi"],
			"APlusSupport": ["Elise", "Beruka", "Selena", "Hinoka"],
			"startingClass": "Malig_Knight",
			"startingLevel": 1,
			"bases": {"HP": 30, "Str": 19, "Mag": 11, "Skl": 15, "Spd": 19, "Lck": 12, "Def": 18, "Res": 15},
			"growths": {"HP": 40, "Str": 50, "Mag": 25, "Skl": 50, "Spd": 55, "Lck": 25, "Def": 35, "Res": 45},
			"mods": {"Str": 1, "Mag": -1, "Skl": 1, "Spd": 1, "Lck": -2, "Def": 1, "Res": 0},
			"personalSkill": "Roses_Thorn",
			"baseClass1": "Malig_Knight",
			"baseClass2": "Dark_Mage",
		},

		"Selena": {
			"name": "Selena",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Subaki", "Hinata"],
			"APlusSupport": ["Camilla", "Beruka", "Peri", "Setsuna"],
			"startingClass": "Mercenary",
			"startingLevel": 10,
			"bases": {"HP": 24, "Str": 12, "Mag": 3, "Skl": 12, "Spd": 15, "Lck": 9, "Def": 11, "Res": 8},
			"growths": {"HP": 40, "Str": 30, "Mag": 5, "Skl": 25, "Spd": 45, "Lck": 30, "Def": 45, "Res": 30},
			"mods": {"Str": -1, "Mag": 0, "Skl": -1, "Spd": 2, "Lck": 0, "Def": 1, "Res": 0},
			"personalSkill": "Fierce_Rival",
			"baseClass1": "Mercenary",
			"baseClass2": "Sky_Knight"
		},

		"Beruka": {
			"name": "Beruka",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Azama", "Saizo"],
			"APlusSupport": ["Camilla", "Charlotte", "Selena", "Oboro"],
			"startingClass": "Wyvern_Rider",
			"startingLevel": 9,
			"bases": {"HP": 23, "Str": 13, "Mag": 0, "Skl": 14, "Spd": 9, "Lck": 10, "Def": 14, "Res": 7},
			"growths": {"HP": 45, "Str": 30, "Mag": 10, "Skl": 55, "Spd": 30, "Lck": 45, "Def": 40, "Res": 25},
			"mods": {"Str": -1, "Mag": 0, "Skl": 2, "Spd": -2, "Lck": 0, "Def": 2, "Res": -1},
			"personalSkill": "Opportunist",
			"baseClass1": "Wyvern_Rider",
			"baseClass2": "Fighter"
		},

		"Laslow": {
			"name": "Laslow",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Orochi", "Hana"],
			"APlusSupport": ["Xander", "Odin", "Keaton", "Saizo"],
			"child": "Soleil",
			"startingClass": "Mercenary",
			"startingLevel": 12,
			"bases": {"HP": 28, "Str": 15, "Mag": 0, "Skl": 16, "Spd": 13, "Lck": 14, "Def": 10, "Res": 7},
			"growths": {"HP": 50, "Str": 45, "Mag": 0, "Skl": 45, "Spd": 30, "Lck": 55, "Def": 35, "Res": 25},
			"mods": {"Str": 1, "Mag": 0, "Skl": 2, "Spd": -1, "Lck": 1, "Def": -1, "Res": -1},
			"personalSkill": "Fancy_Footwork",
			"baseClass1": "Mercenary",
			"baseClass2": "Ninja"
		},

		"Peri": {
			"name": "Peri",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Hinata", "Kaden"],
			"APlusSupport": ["Felicia", "Charlotte", "Selena", "Kagero"],
			"startingClass": "Cavalier",
			"startingLevel": 10,
			"bases": {"HP": 25, "Str": 13, "Mag": 0, "Skl": 9, "Spd": 13, "Lck": 9, "Def": 10, "Res": 10},
			"growths": {"HP": 30, "Str": 50, "Mag": 5, "Skl": 30, "Spd": 50, "Lck": 35, "Def": 25, "Res": 45},
			"mods": {"Str": 1, "Mag": 0, "Skl": -1, "Spd": 1, "Lck": 0, "Def": -2, "Res": 2},
			"personalSkill": "Bloodthirst",
			"baseClass1": "Cavalier",
			"baseClass2": "Dark_Mage"
		},

		"Charlotte": {
			"name": "Charlotte",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Xander", "Leo", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Saizo", "Kaden"],
			"APlusSupport": ["Peri", "Beruka", "Nyx", "Rinkah"],
			"startingClass": "Fighter",
			"startingLevel": 10,
			"bases": {"HP": 28, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 13, "Lck": 9, "Def": 8, "Res": 2},
			"growths": {"HP": 65, "Str": 55, "Mag": 0, "Skl": 35, "Spd": 50, "Lck": 45, "Def": 20, "Res": 5},
			"mods": {"Str": 3, "Mag": 0, "Skl": 0, "Spd": 2, "Lck": 0, "Def": -2, "Res": -2},
			"personalSkill": "Unmask",
			"baseClass1": "Fighter",
			"baseClass2": "Troubadour"
		},

		"Benny": {
			"name": "Benny",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Rinkah", "Oboro"],
			"APlusSupport": ["Keaton", "Arthur", "Hayato"],
			"child": "Ignatius",
			"startingClass": "Knight",
			"startingLevel": 15,
			"bases": {"HP": 31, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 6, "Lck": 12, "Def": 19, "Res": 10},
			"growths": {"HP": 50, "Str": 40, "Mag": 0, "Skl": 50, "Spd": 10, "Lck": 35, "Def": 55, "Res": 45},
			"mods": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": -3, "Lck": 0, "Def": 3, "Res": 1},
			"personalSkill": "Fierce_Mien",
			"baseClass1": "Knight",
			"baseClass2": "Fighter"
		},

		"Leo": {
			"name": "Leo",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Hinoka", "Sakura"],
			"APlusSupport": ["Xander", "Odin", "Niles", "Takumi"],
			"child": "Forrest",
			"startingClass": "Dark_Knight",
			"startingLevel": 2,
			"bases": {"HP": 34, "Str": 14, "Mag": 20, "Skl": 14, "Spd": 15, "Lck": 15, "Def": 16, "Res": 20},
			"growths": {"HP": 45, "Str": 25, "Mag": 55, "Skl": 35, "Spd": 45, "Lck": 45, "Def": 30, "Res": 45},
			"mods": {"Str": -2, "Mag": 2, "Skl": 0, "Spd": -2, "Lck": 0, "Def": 0, "Res": 2},
			"personalSkill": "Pragmatic",
			"baseClass1": "Dark_Mage",
			"baseClass2": "Troubadour"
		},

		"Keaton": {
			"name": "Keaton",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Rinkah", "Hana"],
			"APlusSupport": ["Benny", "Arthur", "Laslow", "Kaden"],
			"child": "Velouria",
			"startingClass": "Wolfskin",
			"startingLevel": 15,
			"bases": {"HP": 35, "Str": 19, "Mag": 0, "Skl": 10, "Spd": 13, "Lck": 9, "Def": 16, "Res": 7},
			"growths": {"HP": 60, "Str": 60, "Mag": 0, "Skl": 20, "Spd": 35, "Lck": 30, "Def": 50, "Res": 25},
			"mods": {"Str": 3, "Mag": 0, "Skl": -2, "Spd": -1, "Lck": 0, "Def": 2, "Res": -1},
			"personalSkill": "Collector",
			"baseClass1": "Wolfskin",
			"baseClass2": "Fighter"
		},

		"Xander": {
			"name": "Xander",
			"gender": "M",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx", "Hinoka", "Sakura"],
			"APlusSupport": ["Kaze", "Laslow", "Leo", "Ryoma"],
			"child": "Siegbert",
			"startingClass": "Paladin",
			"startingLevel": 4,
			"bases": {"HP": 38, "Str": 23, "Mag": 4, "Skl": 18, "Spd": 15, "Lck": 20, "Def": 23, "Res": 11},
			"growths": {"HP": 45, "Str": 50, "Mag": 5, "Skl": 40, "Spd": 35, "Lck": 60, "Def": 40, "Res": 15},
			"mods": {"Str": 2, "Mag": -1, "Skl": -1, "Spd": -1, "Lck": 2, "Def": 1, "Res": -2},
			"personalSkill": "Chivalry",
			"baseClass1": "Cavalier",
			"baseClass2": "Wyvern_Rider"
		},

		"Reina": {
			"name": "Reina",
			"gender": "F",
			"gen": 1,
			"availability": "BR",
			"SSupport": ["Avatar_M"],
			"startingClass": "Kinshi Knight",
			"startingLevel": 1,
			"bases": {"HP": 28, "Str": 17, "Mag": 5, "Skl": 14, "Spd": 20, "Lck": 14, "Def": 10, "Res": 13},
			"growths": {"HP": 40, "Str": 45, "Mag": 5, "Skl": 20, "Spd": 45, "Lck": 10, "Def": 20, "Res": 10},
			"mods": {"Str": 2, "Mag": 0, "Skl": 0, "Spd": 2, "Lck": -1, "Def": -2, "Res": -1},
			"personalSkill": "Morbid_Celebration",
			"baseClass1": "Sky_Knight",
			"baseClass2": "Diviner",
			"baseClass3": "Ninja"
		},

		"Scarlet": {
			"name": "Scarlet",
			"gender": "F",
			"gen": 1,
			"availability": "B",
			"SSupport": ["Avatar_M"],
			"startingClass": "Wyvern_Lord",
			"startingLevel": 1,
			"bases": {"HP": 30, "Str": 23, "Mag": 4, "Skl": 17, "Spd": 19, "Lck": 14, "Def": 22, "Res": 6},
			"growths": {"HP": 30, "Str": 45, "Mag": 20, "Skl": 40, "Spd": 50, "Lck": 40, "Def": 25, "Res": 20},
			"mods": {"Str": 2, "Mag": 0, "Skl": 0, "Spd": 1, "Lck": -1, "Def": 0, "Res": -2},
			"personalSkill": "In_Extremis",
			"baseClass1": "Wyvern_Rider",
			"baseClass2": "Outlaw",
			"baseClass3": "Knight"
		},

		"Flora": {
			"name": "Flora",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M"],
			"APlusSupport": ["Felicia"],
			"startingClass": "Maid",
			"startingLevel": 5,
			"bases": {"HP": 29, "Str": 18, "Mag": 16, "Skl": 25, "Spd": 15, "Lck": 11, "Def": 14, "Res": 23},
			"growths": {"HP": 35, "Str": 40, "Mag": 20, "Skl": 45, "Spd": 30, "Lck": 35, "Def": 30, "Res": 30},
			"mods": {"Str": 1, "Mag": -1, "Skl": 2, "Spd": 0, "Lck": -1, "Def": 1, "Res": -1},
			"personalSkill": "Icy_Blood",
			"baseClass1": "Troubadour",
			"baseClass2": "Dark_Mage",
			"baseClass3": "Mercenary"
		},

		"Shura": {
			"name": "Shura",
			"gender": "M",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_F"],
			"startingClass": "Adventurer",
			"startingLevel": 2,
			"bases": {"HP": 31, "Str": 18, "Mag": 10, "Skl": 21, "Spd": 24, "Lck": 13, "Def": 13, "Res": 21},
			"growths": {"HP": 30, "Str": 25, "Mag": 10, "Skl": 20, "Spd": 35, "Lck": 30, "Def": 15, "Res": 35},
			"mods": {"Str": -1, "Mag": 0, "Skl": -1, "Spd": 3, "Lck": -1, "Def": -2, "Res": 2},
			"personalSkill": "Highwayman",
			"baseClass1": "Outlaw",
			"baseClass2": "Ninja",
			"baseClass3": "Fighter"
		},

		"Izana": {
			"name": "Izana",
			"gender": "M",
			"gen": 1,
			"availability": "BC",
			"SSupport": ["Avatar_F"],
			"startingClass": "Onmyoji",
			"startingLevel": 5,
			"bases": {"HP": 31, "Str": 8, "Mag": 23, "Skl": 25, "Spd": 18, "Lck": 17, "Def": 14, "Res": 24},
			"growths": {"HP": 45, "Str": 15, "Mag": 35, "Skl": 55, "Spd": 30, "Lck": 45, "Def": 35, "Res": 35},
			"mods": {"Str": 0, "Mag": 1, "Skl": 1, "Spd": -2, "Lck": 0, "Def": 0, "Res": 1},
			"personalSkill": "Peacebringer",
			"baseClass1": "Monk",
			"baseClass2": "Samurai",
			"baseClass3": "Apothecary"
		},

		"Yukimura": {
			"name": "Yukimura",
			"gender": "M",
			"gen": 1,
			"availability": "B",
			"SSupport": ["Avatar_F"],
			"startingClass": "Mechanist",
			"startingLevel": 10,
			"bases": {"HP": 38, "Str": 25, "Mag": 3, "Skl": 29, "Spd": 23, "Lck": 18, "Def": 21, "Res": 22},
			"growths": {"HP": 25, "Str": 25, "Mag": 5, "Skl": 40, "Spd": 15, "Lck": 30, "Def": 25, "Res": 30},
			"mods": {"Str": -1, "Mag": 0, "Skl": 3, "Spd": -1, "Lck": 0, "Def": -1, "Res": 0},
			"personalSkill": "Perspicacious",
			"baseClass1": "Apothecary",
			"baseClass2": "Samurai",
			"baseClass3": "Monk"
		},

		"Fuga": {
			"name": "Fuga",
			"gender": "M",
			"gen": 1,
			"availability": "R",
			"SSupport": ["Avatar_F"],
			"APlusSupport": ["Hayato"],
			"startingClass": "Master_of_Arms",
			"startingLevel": 10,
			"bases": {"HP": 41, "Str": 29, "Mag": 0, "Skl": 27, "Spd": 25, "Lck": 18, "Def": 29, "Res": 15},
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 15, "Spd": 5, "Lck": 20, "Def": 10, "Res": 10},
			"mods": {"Str": 2, "Mag": -1, "Skl": 1, "Spd": 0, "Lck": -1, "Def": 2, "Res": -2},
			"personalSkill": "Wind_Disciple",
			"baseClass1": "Samurai",
			"baseClass2": "Oni_Savage",
			"baseClass3": "Monk"
		},

		"Anna": {
			"name": "Anna",
			"gender": "F",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_M"],
			"startingClass": "Outlaw",
			"startingLevel": 10,
			"bases": {"HP": 23, "Str": 9, "Mag": 11, "Skl": 10, "Spd": 14, "Lck": 15, "Def": 6, "Res": 15},
			"growths": {"HP": 35, "Str": 30, "Mag": 55, "Skl": 30, "Spd": 40, "Lck": 70, "Def": 20, "Res": 45},
			"mods": {"Str": -1, "Mag": 1, "Skl": 0, "Spd": -1, "Lck": 2, "Def": -2, "Res": 2},
			"personalSkill": "Make_a_Killing",
			"baseClass1": "Outlaw",
			"baseClass2": "Troubadour",
			"baseClass3": "Apothecary"
		},

		"Kana_M": {
			"name": "Kana (M)",
			"gender": "M",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Ophelia", "Soleil", "Nina"],
			"APlusSupport": ["Shiro", "Siegbert", "Percy"],
			"parent": "Avatar_F",
			"startingClass": "Nohr_Prince",
			"bases": {"HP": 7, "Str": 3, "Mag": 6, "Skl": 8, "Spd": 8, "Lck": 9, "Def": 5, "Res": 5},
			"growths": {"HP": 30, "Str": 35, "Mag": 30, "Skl": 40, "Spd": 45, "Lck": 45, "Def": 25, "Res": 25},
			"personalSkill": "Draconic_Heir",

		},

		"Kana_F": {
			"name": "Kana (F)",
			"gender": "F",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Siegbert", "Forrest", "Ignatius", "Percy"],
			"APlusSupport": ["Midori", "Mitama", "Selkie", "Velouria"],
			"parent": "Avatar_M",
			"startingClass": "Nohr_Prince",
			"bases": {"HP": 7, "Str": 3, "Mag": 6, "Skl": 8, "Spd": 8, "Lck": 9, "Def": 5, "Res": 5},
			"growths": {"HP": 30, "Str": 35, "Mag": 30, "Skl": 40, "Spd": 45, "Lck": 45, "Def": 25, "Res": 25},
			"personalSkill": "Draconic_Heir",

		},

		"Shigure": {
			"name": "Shigure",
			"gender": "M",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Ophelia", "Soleil", "Nina"],
			"APlusSupport": ["Hisame", "Forrest"],
			"parent": "Azura",
			"startingClass": "Sky_Knight",
			"bases": {"HP": 9, "Str": 6, "Mag": 1, "Skl": 7, "Spd": 7, "Lck": 5, "Def": 8, "Res": 7},
			"growths": {"HP": 35, "Str": 45, "Mag": 5, "Skl": 45, "Spd": 35, "Lck": 25, "Def": 35, "Res": 25},
			"personalSkill": "Perfect_Pitch",

		},

		"Dwyer": {
			"name": "Dwyer",
			"gender": "M",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Ophelia", "Soleil", "Nina"],
			"APlusSupport": ["Asugi", "Kiragi", "Percy"],
			"parent": "Jakob",
			"startingClass": "Troubadour",
			"bases": {"HP": 8, "Str": 7, "Mag": 7, "Skl": 2, "Spd": 6, "Lck": 4, "Def": 6, "Res": 7},
			"growths": {"HP": 45, "Str": 45, "Mag": 30, "Skl": 20, "Spd": 30, "Lck": 30, "Def": 30, "Res": 35},
			"personalSkill": "Born_Steward",

		},

		"Sophie": {
			"name": "Sophie",
			"gender": "F",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Siegbert", "Forrest", "Ignatius", "Percy"],
			"APlusSupport": ["Caeldori", "Velouria", "Soleil"],
			"parent": "Silas",
			"startingClass": "Cavalier",
			"bases": {"HP": 8, "Str": 6, "Mag": 2, "Skl": 7, "Spd": 6, "Lck": 7, "Def": 4, "Res": 6},
			"growths": {"HP": 35, "Str": 35, "Mag": 10, "Skl": 55, "Spd": 50, "Lck": 35, "Def": 25, "Res": 35},
			"personalSkill": "Mischievous",

		},

		"Midori": {
			"name": "Midori",
			"gender": "F",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Siegbert", "Forrest", "Ignatius", "Percy"],
			"APlusSupport": ["Selkie", "Kana_F", "Ophelia"],
			"parent": "Kaze",
			"startingClass": "Apothecary",
			"bases": {"HP": 8, "Str": 6, "Mag": 2, "Skl": 10, "Spd": 4, "Lck": 10, "Def": 4, "Res": 2},
			"growths": {"HP": 45, "Str": 35, "Mag": 5, "Skl": 55, "Spd": 35, "Lck": 50, "Def": 30, "Res": 20},
			"personalSkill": "Lucky_Charm",

		},

		"Shiro": {
			"name": "Shiro",
			"gender": "M",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Ophelia", "Nina"],
			"APlusSupport": ["Kiragi", "Asugi", "Kana_M", "Siegbert"],
			"parent": "Ryoma",
			"startingClass": "Spear_Fighter",
			"bases": {"HP": 8, "Str": 7, "Mag": 0, "Skl": 5, "Spd": 3, "Lck": 6, "Def": 8, "Res": 5},
			"growths": {"HP": 50, "Str": 50, "Mag": 0, "Skl": 40, "Spd": 35, "Lck": 35, "Def": 45, "Res": 30},
			"personalSkill": "Noble_Cause",

		},

		"Kiragi": {
			"name": "Kiragi",
			"gender": "M",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Soleil"],
			"APlusSupport": ["Shiro", "Hisame", "Dwyer", "Forrest"],
			"parent": "Takumi",
			"startingClass": "Archer",
			"bases": {"HP": 7, "Str": 6, "Mag": 0, "Skl": 5, "Spd": 6, "Lck": 8, "Def": 4, "Res": 1},
			"growths": {"HP": 45, "Str": 40, "Mag": 0, "Skl": 45, "Spd": 50, "Lck": 45, "Def": 40, "Res": 15},
			"personalSkill": "Optimistic",

		},

		"Asugi": {
			"name": "Asugi",
			"gender": "M",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Soleil", "Nina"],
			"APlusSupport": ["Shiro", "Hisame", "Dwyer", "Ignatius"],
			"parent": "Saizo",
			"startingClass": "Ninja",
			"bases": {"HP": 6, "Str": 7, "Mag": 4, "Skl": 7, "Spd": 6, "Lck": 9, "Def": 4, "Res": 9},
			"growths": {"HP": 40, "Str": 45, "Mag": 50, "Skl": 55, "Spd": 45, "Lck": 50, "Def": 30, "Res": 20},
			"personalSkill": "Sweet_Tooth",

		},

		"Selkie": {
			"name": "Selkie",
			"gender": "F",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Ignatius", "Forrest"],
			"APlusSupport": ["Rhajat", "Midori", "Kana_F", "Velouria"],
			"parent": "Kaden",
			"startingClass": "Kitsune",
			"bases": {"HP": 7, "Str": 4, "Mag": 3, "Skl": 6, "Spd": 7, "Lck": 10, "Def": 6, "Res": 11},
			"growths": {"HP": 35, "Str": 30, "Mag": 15, "Skl": 35, "Spd": 55, "Lck": 60, "Def": 30, "Res": 50},
			"personalSkill": "Playthings",

		},

		"Hisame": {
			"name": "Hisame",
			"gender": "M",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Ophelia"],
			"APlusSupport": ["Kiragi", "Asugi", "Shigure", "Percy"],
			"parent": "Hinata",
			"startingClass": "Samurai",
			"bases": {"HP": 6, "Str": 6, "Mag": 1, "Skl": 7, "Spd": 5, "Lck": 4, "Def": 5, "Res": 4},
			"growths": {"HP": 50, "Str": 40, "Mag": 0, "Skl": 40, "Spd": 40, "Lck": 25, "Def": 30, "Res": 20},
			"personalSkill": "Calm",

		},

		"Mitama": {
			"name": "Mitama",
			"gender": "F",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Percy", "Siegbert"],
			"APlusSupport": ["Caeldori", "Rhajat", "Kana_F", "Soleil"],
			"parent": "Azama",
			"startingClass": "Shrine_Maiden",
			"bases": {"HP": 6, "Str": 7, "Mag": 6, "Skl": 6, "Spd": 8, "Lck": 10, "Def": 3, "Res": 5},
			"growths": {"HP": 45, "Str": 40, "Mag": 35, "Skl": 45, "Spd": 50, "Lck": 50, "Def": 30, "Res": 20},
			"personalSkill": "Haiku",

		},

		"Caeldori": {
			"name": "Caeldori",
			"gender": "F",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Siegbert", "Ignatius"],
			"APlusSupport": ["Mitama", "Rhajat", "Sophie", "Nina"],
			"parent": "Subaki",
			"startingClass": "Sky_Knight",
			"bases": {"HP": 8, "Str": 8, "Mag": 3, "Skl": 5, "Spd": 6, "Lck": 9, "Def": 5, "Res": 6},
			"growths": {"HP": 55, "Str": 35, "Mag": 15, "Skl": 40, "Spd": 40, "Lck": 45, "Def": 35, "Res": 20},
			"personalSkill": "Prodigy",

		},

		"Rhajat": {
			"name": "Rhajat",
			"gender": "F",
			"gen": 2,
			"availability": "BR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Forrest", "Percy", "Avatar_F"],
			"APlusSupport": ["Caeldori", "Mitama", "Selkie", "Ophelia"],
			"parent": "Hayato",
			"startingClass": "Diviner",
			"bases": {"HP": 8, "Str": 1, "Mag": 10, "Skl": 0, "Spd": 7, "Lck": 6, "Def": 5, "Res": 12},
			"growths": {"HP": 40, "Str": 15, "Mag": 60, "Skl": 10, "Spd": 50, "Lck": 30, "Def": 25, "Res": 35},
			"personalSkill": "Vendetta",

		},

		"Siegbert": {
			"name": "Siegbert",
			"gender": "M",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Velouria", "Ophelia", "Soleil", "Nina", "Mitama", "Caeldori"],
			"APlusSupport": ["Kana_M", "Forrest", "Ignatius", "Shiro"],
			"parent": "Xander",
			"startingClass": "Cavalier",
			"bases": {"HP": 7, "Str": 5, "Mag": 2, "Skl": 7, "Spd": 6, "Lck": 7, "Def": 6, "Res": 3},
			"growths": {"HP": 40, "Str": 45, "Mag": 5, "Skl": 45, "Spd": 45, "Lck": 45, "Def": 35, "Res": 20},
			"personalSkill": "Gallant",

		},

		"Forrest": {
			"name": "Forrest",
			"gender": "M",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Velouria", "Ophelia", "Soleil", "Nina", "Selkie", "Rhajat"],
			"APlusSupport": ["Siegbert", "Shigure", "Ignatius", "Kiragi"],
			"parent": "Leo",
			"startingClass": "Troubadour",
			"bases": {"HP": 8, "Str": 5, "Mag": 9, "Skl": 1, "Spd": 4, "Lck": 5, "Def": 6, "Res": 13},
			"growths": {"HP": 55, "Str": 15, "Mag": 65, "Skl": 20, "Spd": 35, "Lck": 25, "Def": 25, "Res": 55},
			"personalSkill": "Fierce_Counter",

		},

		"Ignatius": {
			"name": "Ignatius",
			"gender": "M",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Velouria", "Ophelia", "Soleil", "Nina", "Selkie", "Caeldori"],
			"APlusSupport": ["Siegbert", "Forrest", "Percy", "Asugi"],
			"parent": "Benny",
			"startingClass": "Knight",
			"bases": {"HP": 8, "Str": 7, "Mag": 0, "Skl": 6, "Spd": 4, "Lck": 7, "Def": 6, "Res": 7},
			"growths": {"HP": 40, "Str": 50, "Mag": 0, "Skl": 40, "Spd": 30, "Lck": 55, "Def": 45, "Res": 35},
			"personalSkill": "Guarded_Bravery",

		},

		"Velouria": {
			"name": "Velouria",
			"gender": "F",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Siegbert", "Forrest", "Ignatius", "Percy", "Hisame", "Kiragi"],
			"APlusSupport": ["Sophie", "Kana_F", "Nina", "Selkie"],
			"parent": "Keaton",
			"startingClass": "Wolfskin",
			"bases": {"HP": 7, "Str": 6, "Mag": 0, "Skl": 6, "Spd": 6, "Lck": 11, "Def": 9, "Res": 8},
			"growths": {"HP": 50, "Str": 50, "Mag": 0, "Skl": 40, "Spd": 40, "Lck": 35, "Def": 45, "Res": 30},
			"personalSkill": "Goody_Basket",

		},

		"Percy": {
			"name": "Percy",
			"gender": "M",
			"gen": 2,
			"availability": "CR",
			"parent": "Arthur",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Velouria", "Ophelia", "Soleil", "Nina", "Mitama", "Rhajat"],
			"APlusSupport": ["Ignatius", "Dwyer", "Kana_M", "Hisame"],
			"startingClass": "Wyvern_Rider",
			"bases": {"HP": 6, "Str": 4, "Mag": 0, "Skl": 6, "Spd": 6, "Lck": 15, "Def": 8, "Res": 4},
			"growths": {"HP": 30, "Str": 30, "Mag": 5, "Skl": 45, "Spd": 40, "Lck": 75, "Def": 55, "Res": 15},
			"personalSkill": "Fortunate_Son",

		},

		"Ophelia": {
			"name": "Ophelia",
			"gender": "F",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Siegbert", "Forrest", "Ignatius", "Percy", "Shiro", "Hisame"],
			"APlusSupport": ["Midori", "Soleil", "Rhajat"],
			"parent": "Odin",
			"startingClass": "Dark_Mage",
			"bases": {"HP": 7, "Str": 3, "Mag": 6, "Skl": 6, "Spd": 7, "Lck": 12, "Def": 2, "Res": 5},
			"growths": {"HP": 45, "Str": 15, "Mag": 45, "Skl": 40, "Spd": 45, "Lck": 65, "Def": 20, "Res": 30},
			"personalSkill": "Bibliophile",

		},

		"Soleil": {
			"name": "Soleil",
			"gender": "F",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Siegbert", "Forrest", "Ignatius", "Percy", "Kiragi", "Asugi"],
			"APlusSupport": ["Ophelia", "Sophie", "Nina", "Mitama"],
			"parent": "Laslow",
			"startingClass": "Mercenary",
			"bases": {"HP": 6, "Str": 7, "Mag": 1, "Skl": 3, "Spd": 6, "Lck": 7, "Def": 5, "Res": 6},
			"growths": {"HP": 25, "Str": 60, "Mag": 0, "Skl": 35, "Spd": 35, "Lck": 45, "Def": 35, "Res": 40},
			"personalSkill": "Sisterhood",

		},

		"Nina": {
			"name": "Nina",
			"gender": "F",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Kana_M", "Shigure", "Dwyer", "Siegbert", "Forrest", "Ignatius", "Percy", "Asugi", "Shiro"],
			"APlusSupport": ["Soleil", "Velouria", "Caeldori"],
			"parent": "Niles",
			"startingClass": "Outlaw",
			"bases": {"HP": 5, "Str": 8, "Mag": 5, "Skl": 5, "Spd": 5, "Lck": 11, "Def": 3, "Res": 10},
			"growths": {"HP": 30, "Str": 45, "Mag": 30, "Skl": 35, "Spd": 40, "Lck": 50, "Def": 25, "Res": 45},
			"personalSkill": "Daydream",

		},

	};


	this.CHILD_MOD_BONUS = {"Str": 1, "Mag": 1, "Skl": 1, "Spd": 1, "Lck": 1, "Def": 1, "Res": 1};

	this.AVATAR_MODS = {
		"bases": {
			"Boon": {"HP": 3, "Str": 2, "Mag": 3, "Skl": 3, "Spd": 2, "Lck": 3, "Def": 1, "Res": 1},
			"Bane": {"HP": -2, "Str": -1, "Mag": -2, "Skl": -2, "Spd": -1, "Lck": -2, "Def": -1, "Res": -1},
			"Base": {"HP": 19, "Str": 7, "Mag": 4, "Skl": 7, "Spd": 6, "Lck": 5, "Def": 6, "Res": 2}
		},
		"growths": {
			"Boon": {
				"HP": {"HP": 15, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 5, "Res": 5},
				"Str": {"HP": 0, "Str": 15, "Mag": 0, "Skl": 5, "Spd": 0, "Lck": 0, "Def": 5, "Res": 0},
				"Mag": {"HP": 0, "Str": 0, "Mag": 20, "Skl": 0, "Spd": 5, "Lck": 0, "Def": 0, "Res": 5},
				"Skl": {"HP": 0, "Str": 5, "Mag": 0, "Skl": 25, "Spd": 0, "Lck": 0, "Def": 5, "Res": 0},
				"Spd": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 5, "Spd": 15, "Lck": 5, "Def": 0, "Res": 0},
				"Lck": {"HP": 0, "Str": 5, "Mag": 5, "Skl": 0, "Spd": 0, "Lck": 25, "Def": 0, "Res": 0},
				"Def": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 5, "Def": 10, "Res": 5},
				"Res": {"HP": 0, "Str": 0, "Mag": 5, "Skl": 0, "Spd": 5, "Lck": 0, "Def": 0, "Res": 10}
			},
			"Bane": {
				"HP": {"HP": -10, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": -5, "Res": -5},
				"Str": {"HP": 0, "Str": -10, "Mag": 0, "Skl": -5, "Spd": 0, "Lck": 0, "Def": -5, "Res": 0},
				"Mag": {"HP": 0, "Str": 0, "Mag": -15, "Skl": 0, "Spd": -5, "Lck": 0, "Def": 0, "Res": -5},
				"Skl": {"HP": 0, "Str": -5, "Mag": 0, "Skl": -20, "Spd": 0, "Lck": 0, "Def": -5, "Res": 0},
				"Spd": {"HP": 0, "Str": 0, "Mag": 0, "Skl": -5, "Spd": -10, "Lck": -5, "Def": 0, "Res": 0},
				"Lck": {"HP": 0, "Str": -5, "Mag": -5, "Skl": 0, "Spd": 0, "Lck": -20, "Def": 0, "Res": 0},
				"Def": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": -5, "Def": -10, "Res": -5},
				"Res": {"HP": 0, "Str": 0, "Mag": -5, "Skl": 0, "Spd": -5, "Lck": 0, "Def": 0, "Res": -10}
			},
			"Base": {"HP": 45, "Str": 45, "Mag": 30, "Skl": 40, "Spd": 45, "Lck": 45, "Def": 35, "Res": 25}
		},
		"caps": {
			"Boon": {
				"HP": {"Str": 1, "Mag": 1, "Skl": 0, "Spd": 0, "Lck": 2, "Def": 2, "Res": 2},
				"Str": {"Str": 4, "Mag": 0, "Skl": 2, "Spd": 0, "Lck": 0, "Def": 2, "Res": 0},
				"Mag": {"Str": 0, "Mag": 4, "Skl": 0, "Spd": 2, "Lck": 0, "Def": 0, "Res": 2},
				"Skl": {"Str": 2, "Mag": 0, "Skl": 4, "Spd": 0, "Lck": 0, "Def": 2, "Res": 0},
				"Spd": {"Str": 0, "Mag": 0, "Skl": 2, "Spd": 4, "Lck": 2, "Def": 0, "Res": 0},
				"Lck": {"Str": 2, "Mag": 2, "Skl": 0, "Spd": 0, "Lck": 4, "Def": 0, "Res": 0},
				"Def": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 2, "Def": 4, "Res": 2},
				"Res": {"Str": 0, "Mag": 2, "Skl": 0, "Spd": 2, "Lck": 0, "Def": 0, "Res": 4}
			},
			"Bane": {
				"HP": {"Str": -1, "Mag": -1, "Skl": 0, "Spd": 0, "Lck":-1, "Def": -1, "Res": -1},
				"Str": {"Str": -3, "Mag": 0, "Skl": -1, "Spd": 0, "Lck": 0, "Def": -1, "Res": 0},
				"Mag": {"Str": 0, "Mag": -3, "Skl": 0, "Spd": -1, "Lck": 0, "Def": 0, "Res": -1},
				"Skl": {"Str": -1, "Mag": 0, "Skl": -3, "Spd": 0, "Lck": 0, "Def": -1, "Res": 0},
				"Spd": {"Str": 0, "Mag": 0, "Skl": -1, "Spd": -3, "Lck": -1, "Def": 0, "Res": 0},
				"Lck": {"Str": -1, "Mag": -1, "Skl": 0, "Spd": 0, "Lck": -3, "Def": 0, "Res": 0},
				"Def": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": -1, "Def": -3, "Res": -1},
				"Res": {"Str": 0, "Mag": -1, "Skl": 0, "Spd": -1, "Lck": 0, "Def": 0, "Res": -3}
			},
			"Base": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0}
		},
		"descriptions": {
			"Boon": {
				"HP": "Robust (+HP)",
				"Str": "Strong (+Str)",
				"Mag": "Clever (+Mag)",
				"Skl": "Deft (+Skl)",
				"Spd": "Quick (+Spd)",
				"Lck": "Lucky (+Lck)",
				"Def": "Sturdy (+Def)",
				"Res": "Calm (+Res)"
			},
			"Bane": {
				"HP": "Sickly (-HP)",
				"Str": "Weak (-Str)",
				"Mag": "Dull (-Mag)",
				"Skl": "Clumsy (-Skl)",
				"Spd": "Slow (-Spd)",
				"Lck": "Unlucky (-Lck)",
				"Def": "Fragile (-Def)",
				"Res": "Excitable (-Res)"
			}
		}
	};


	this.getCharacters = function() {
		return characters;
	};

	this.getSSupports = function(charKey) {
		return characters[charKey].SSupport;
	};

	this.getAPlusSupports = function(charKey) {
		return characters[charKey].APlusSupport;
	};

});













app.service('Classes', function() {

	var classes = {
		"Nohr_Prince": {
			"name": "Nohr Prince",
			"promotesTo": ["Nohr_Noble", "Hoshido_Noble"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Nobility", "Dragon_Fang"],
			"bases": {"HP": 17, "Str": 7, "Mag": 3, "Skl": 4, "Spd": 5, "Lck": 2, "Def": 5, "Res": 2},
			"growths": {"HP": 15, "Str": 15, "Mag": 10, "Skl": 10, "Spd": 10, "Lck": 10, "Def": 10, "Res": 5},
			"maxStats": {"HP": 40, "Str": 23, "Mag": 17, "Skl": 19, "Spd": 21, "Lck": 22, "Def": 21, "Res": 19},
			"gender": "M",
			"genderEquivalent": "Nohr_Princess",
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Nohr_Princess": {
			"name": "Nohr Princess",
			"promotesTo": ["Nohr_Noble", "Hoshido_Noble"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Nobility", "Dragon_Fang"],
			"bases": {"HP": 17, "Str": 7, "Mag": 3, "Skl": 4, "Spd": 5, "Lck": 2, "Def": 5, "Res": 2},
			"growths": {"HP": 15, "Str": 15, "Mag": 10, "Skl": 10, "Spd": 10, "Lck": 10, "Def": 10, "Res": 5},
			"maxStats": {"HP": 40, "Str": 23, "Mag": 17, "Skl": 19, "Spd": 21, "Lck": 22, "Def": 21, "Res": 19},
			"gender": "F",
			"genderEquivalent": "Nohr_Prince",
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Hoshido_Noble": {
			"name": "Hoshido Noble",
			"promotesTo": null,
			"promotesFrom": ["Nohr_Prince", "Nohr_Princess"],
			"classTier": "tier2",
			"skills": ["Dragon_Ward", "Hoshidan_Unity"],
			"bases": {"HP": 19, "Str": 10, "Mag": 4, "Skl": 5, "Spd": 6, "Lck": 4, "Def": 7, "Res": 3},
			"growths": {"HP": 15, "Str": 15, "Mag": 10, "Skl": 10, "Spd": 10, "Lck": 10, "Def": 15, "Res": 0},
			"maxStats": {"HP": 60, "Str": 34, "Mag": 28, "Skl": 29, "Spd": 30, "Lck": 33, "Def": 31, "Res": 28},
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Nohr_Noble": {
			"name": "Nohr Noble",
			"promotesTo": null,
			"promotesFrom": ["Nohr_Prince", "Nohr_Princess"],
			"classTier": "tier2",
			"skills": ["Draconic_Hex", "Nohrian_Trust"],
			"bases": {"HP": 18, "Str": 8, "Mag": 6, "Skl": 4, "Spd": 7, "Lck": 2, "Def": 6, "Res": 6},
			"growths": {"HP": 15, "Str": 10, "Mag": 15, "Skl": 5, "Spd": 15, "Lck": 5, "Def": 5, "Res": 15},
			"maxStats": {"HP": 60, "Str": 32, "Mag": 31, "Skl": 28, "Spd": 32, "Lck": 27, "Def": 29, "Res": 32},
			"sealAccess": false,
			"inheritAccess": true,
		},	

		"Samurai": {
			"name": "Samurai",
			"promotesTo": ["Swordmaster", "Master_of_Arms"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Duelists_Blow", "Vantage"],
			"bases": {"HP": 17, "Str": 4, "Mag": 0, "Skl": 5, "Spd": 8, "Lck": 3, "Def": 3, "Res": 3},
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 20, "Lck": 15, "Def": 0, "Res": 10},
			"maxStats": {"HP": 40, "Str": 20, "Mag": 16, "Skl": 23, "Spd": 25, "Lck": 24, "Def": 18, "Res": 20},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Swordmaster": {
			"name": "Swordmaster",
			"promotesTo": null,
			"promotesFrom": ["Samurai"],
			"classTier": "tier2",
			"skills": ["Astra", "Swordfaire"],
			"bases": {"HP": 18, "Str": 6, "Mag": 2, "Skl": 7, "Spd": 11, "Lck": 4, "Def": 5, "Res": 5},
			"growths": {"HP": 10, "Str": 10, "Mag": 5, "Skl": 15, "Spd": 20, "Lck": 15, "Def": 0, "Res": 10},
			"maxStats": {"HP": 55, "Str": 30, "Mag": 28, "Skl": 32, "Spd": 35, "Lck": 33, "Def": 27, "Res": 31},
			"bonus": {"Crit": 10, "Avo": 10},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Master_of_Arms": {
			"name": "Master of Arms",
			"promotesTo": null,
			"promotesFrom": ["Samurai", "Villager"],
			"classTier": "tier2",
			"skills": ["Seal_Strength", "Life_or_Death"],
			"bases": {"HP": 20, "Str": 8, "Mag": 0, "Skl": 6, "Spd": 9, "Lck": 3, "Def": 7, "Res": 3},
			"growths": {"HP": 20, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 10, "Def": 10, "Res": 0},
			"maxStats": {"HP": 65, "Str": 33, "Mag": 25, "Skl": 30, "Spd": 30, "Lck": 31, "Def": 31, "Res": 28},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Villager": {
			"name": "Villager",
			"promotesTo": ["Master_of_Arms", "Merchant"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Aptitude", "Underdog"],
			"bases": {"HP": 17, "Str": 5, "Mag": 0, "Skl": 4, "Spd": 5, "Lck": 3, "Def": 4, "Res": 0},
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 20, "Def": 10, "Res": 0},
			"maxStats": {"HP": 35, "Str": 19, "Mag": 15, "Skl": 19, "Spd": 19, "Lck": 22, "Def": 18, "Res": 15},
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Merchant": {
			"name": "Merchant",
			"promotesTo": null,
			"promotesFrom": ["Apothecary", "Villager"],
			"classTier": "tier2",
			"skills": ["Profiteer", "Spendthrift"],
			"bases": {"HP": 20, "Str": 8, "Mag": 0, "Skl": 6, "Spd": 5, "Lck": 4, "Def": 8, "Res": 5},
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 10, "Spd": 5, "Lck": 15, "Def": 10, "Res": 5},
			"maxStats": {"HP": 65, "Str": 33, "Mag": 25, "Skl": 29, "Spd": 28, "Lck": 32, "Def": 33, "Res": 30},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Apothecary": {
			"name": "Apothecary",
			"promotesTo": ["Merchant", "Mechanist"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Potent_Potion", "Quick_Salve"],
			"bases": {"HP": 18, "Str": 6, "Mag": 0, "Skl": 4, "Spd": 4, "Lck": 2, "Def": 6, "Res": 2},
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 5, "Def": 10, "Res": 5},
			"maxStats": {"HP": 45, "Str": 24, "Mag": 15, "Skl": 19, "Spd": 19, "Lck": 21, "Def": 23, "Res": 20},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Oni_Savage": {
			"name": "Oni Savage",
			"promotesTo": ["Oni_Chieftain", "Blacksmith"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Seal_Resistance", "Shove"],
			"bases": {"HP": 18, "Str": 6, "Mag": 1, "Skl": 2, "Spd": 5, "Lck": 0, "Def": 7, "Res": 1},
			"growths": {"HP": 20, "Str": 20, "Mag": 10, "Skl": 0, "Spd": 10, "Lck": 0, "Def": 20, "Res": 0},
			"maxStats": {"HP": 45, "Str": 24, "Mag": 19, "Skl": 16, "Spd": 20, "Lck": 17, "Def": 23, "Res": 18},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Oni_Chieftain": {
			"name": "Oni Chieftain",
			"promotesTo": null,
			"promotesFrom": ["Oni_Savage"],
			"classTier": "tier2",
			"skills": ["Death_Blow", "Counter"],
			"bases": {"HP": 19, "Str": 9, "Mag": 5, "Skl": 2, "Spd": 7, "Lck": 0, "Def": 10, "Res": 5},
			"growths": {"HP": 10, "Str": 20, "Mag": 15, "Skl": 0, "Spd": 10, "Lck": 0, "Def": 20, "Res": 5},
			"maxStats": {"HP": 60, "Str": 34, "Mag": 28, "Skl": 25, "Spd": 30, "Lck": 25, "Def": 36, "Res": 31},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Blacksmith": {
			"name": "Blacksmith",
			"promotesTo": null,
			"promotesFrom": ["Oni_Savage"],
			"classTier": "tier2",
			"skills": ["Salvage_Blow", "Lancebreaker"],
			"bases": {"HP": 21, "Str": 8, "Mag": 0, "Skl": 9, "Spd": 8, "Lck": 3, "Def": 8, "Res": 2},
			"growths": {"HP": 20, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 10, "Lck": 5, "Def": 15, "Res": 0},
			"maxStats": {"HP": 65, "Str": 33, "Mag": 25, "Skl": 32, "Spd": 31, "Lck": 30, "Def": 32, "Res": 27},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Spear_Fighter": {
			"name": "Spear Fighter",
			"promotesTo": ["Spear_Master", "Basara"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Seal_Defense", "Swap"],
			"bases": {"HP": 17, "Str": 6, "Mag": 0, "Skl": 6, "Spd": 6, "Lck": 2, "Def": 5, "Res": 2},
			"growths": {"HP": 15, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 5, "Def": 10, "Res": 5},
			"maxStats": {"HP": 40, "Str": 22, "Mag": 15, "Skl": 23, "Spd": 22, "Lck": 21, "Def": 22, "Res": 21},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Spear_Master": {
			"name": "Spear Master",
			"promotesTo": null,
			"promotesFrom": ["Spear_Fighter"],
			"classTier": "tier2",
			"skills": ["Seal_Speed", "Lancefaire"],
			"bases": {"HP": 18, "Str": 9, "Mag": 0, "Skl": 8, "Spd": 8, "Lck": 3, "Def": 7, "Res": 3},		
			"growths": {"HP": 15, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 5, "Def": 10, "Res": 5},
			"maxStats": {"HP": 60, "Str": 34, "Mag": 25, "Skl": 33, "Spd": 32, "Lck": 29, "Def": 30, "Res": 29},
			"bonus": {"Crit": 10, "Ddg": 10},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Basara": {
			"name": "Basara",
			"promotesTo": null,
			"promotesFrom": ["Spear_Fighter", "Diviner"],
			"classTier": "tier2",
			"skills": ["Rend_Heaven", "Quixotic"],
			"bases": {"HP": 20, "Str": 7, "Mag": 5, "Skl": 7, "Spd": 7, "Lck": 5, "Def": 7, "Res": 6},		
			"growths": {"HP": 20, "Str": 10, "Mag": 10, "Skl": 10, "Spd": 10, "Lck": 15, "Def": 5, "Res": 10},
			"maxStats": {"HP": 65, "Str": 31, "Mag": 30, "Skl": 30, "Spd": 31, "Lck": 35, "Def": 30, "Res": 32},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Diviner": {
			"name": "Diviner",
			"promotesTo": ["Onmyoji", "Basara"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Magic+2", "Future_Sight"],
			"bases": {"HP": 15, "Str": 0, "Mag": 4, "Skl": 5, "Spd": 6, "Lck": 1, "Def": 1, "Res": 3},
			"growths": {"HP": 0, "Str": 5, "Mag": 15, "Skl": 10, "Spd": 10, "Lck": 5, "Def": 0, "Res": 10},
			"maxStats": {"HP": 35, "Str": 17, "Mag": 22, "Skl": 20, "Spd": 23, "Lck": 19, "Def": 16, "Res": 20},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Onmyoji": {
			"name": "Exorcist",
			"promotesTo": null,
			"promotesFrom": ["Diviner", "Monk", "Shrine_Maiden"],
			"classTier": "tier2",
			"skills": ["Rally_Magic", "Tomefaire"],
			"bases": {"HP": 16, "Str": 0, "Mag": 7, "Skl": 6, "Spd": 7, "Lck": 2, "Def": 3, "Res": 6},		
			"growths": {"HP": 0, "Str": 0, "Mag": 20, "Skl": 10, "Spd": 15, "Lck": 0, "Def": 0, "Res": 15},
			"maxStats": {"HP": 45, "Str": 25, "Mag": 33, "Skl": 31, "Spd": 32, "Lck": 27, "Def": 25, "Res": 31},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Monk": {
			"name": "Monk",
			"promotesTo": ["Great_Master", "Onmyoji"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Miracle", "Rally_Luck"],
			"bases": {"HP": 16, "Str": 0, "Mag": 3, "Skl": 5, "Spd": 5, "Lck": 4, "Def": 2, "Res": 5},
			"growths": {"HP": 0, "Str": 5, "Mag": 10, "Skl": 10, "Spd": 15, "Lck": 15, "Def": 0, "Res": 20},
			"maxStats": {"HP": 35, "Str": 18, "Mag": 21, "Skl": 20, "Spd": 22, "Lck": 23, "Def": 17, "Res": 24},
			"bonus": {"Ddg": 10},
			"gender": "M",
			"genderEquivalent": "Shrine_Maiden",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Shrine_Maiden": {
			"name": "Shrine Maiden",
			"promotesTo": ["Priestess", "Onmyoji"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Miracle", "Rally_Luck"],
			"bases": {"HP": 16, "Str": 0, "Mag": 3, "Skl": 5, "Spd": 5, "Lck": 4, "Def": 2, "Res": 5},
			"growths": {"HP": 0, "Str": 5, "Mag": 10, "Skl": 10, "Spd": 15, "Lck": 15, "Def": 0, "Res": 20},
			"maxStats": {"HP": 35, "Str": 18, "Mag": 21, "Skl": 20, "Spd": 22, "Lck": 23, "Def": 17, "Res": 24},
			"bonus": {"Ddg": 10},
			"gender": "F",
			"genderEquivalent": "Monk",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Great_Master": {
			"name": "Great Master",
			"promotesTo": null,
			"promotesFrom": ["Monk"],
			"classTier": "tier2",
			"skills": ["Renewal", "Countermagic"],
			"bases": {"HP": 19, "Str": 8, "Mag": 6, "Skl": 6, "Spd": 8, "Lck": 5, "Def": 6, "Res": 7},		
			"growths": {"HP": 10, "Str": 15, "Mag": 5, "Skl": 5, "Spd": 15, "Lck": 15, "Def": 10, "Res": 10},
			"maxStats": {"HP": 55, "Str": 32, "Mag": 30, "Skl": 31, "Spd": 33, "Lck": 32, "Def": 28, "Res": 32},
			"gender": "M",
			"genderEquivalent": "Priestess",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Priestess": {
			"name": "Priestess",
			"promotesTo": null,
			"promotesFrom": ["Shrine_Maiden"],
			"classTier": "tier2",
			"skills": ["Renewal", "Countermagic"],
			"bases": {"HP": 19, "Str": 6, "Mag": 7, "Skl": 6, "Spd": 9, "Lck": 5, "Def": 5, "Res": 8},		
			"growths": {"HP": 10, "Str": 10, "Mag": 10, "Skl": 5, "Spd": 15, "Lck": 15, "Def": 0, "Res": 20},
			"maxStats": {"HP": 50, "Str": 29, "Mag": 32, "Skl": 30, "Spd": 33, "Lck": 34, "Def": 26, "Res": 34},
			"gender": "F",
			"genderEquivalent": "Great_Master",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Sky_Knight": {
			"name": "Sky Knight",
			"promotesTo": ["Falcon_Knight", "Kinshi_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Darting_Blow", "Camaraderie"],
			"bases": {"HP": 16, "Str": 3, "Mag": 0, "Skl": 5, "Spd": 7, "Lck": 4, "Def": 2, "Res": 6},
			"growths": {"HP": 0, "Str": 10, "Mag": 0, "Skl": 10, "Spd": 15, "Lck": 20, "Def": 0, "Res": 20},
			"maxStats": {"HP": 35, "Str": 19, "Mag": 16, "Skl": 21, "Spd": 23, "Lck": 25, "Def": 18, "Res": 25},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Falcon_Knight": {
			"name": "Falcon Knight",
			"promotesTo": null,
			"promotesFrom": ["Sky_Knight"],
			"classTier": "tier2",
			"skills": ["Rally_Speed", "Warding_Blow"],
			"bases": {"HP": 18, "Str": 5, "Mag": 4, "Skl": 6, "Spd": 10, "Lck": 5, "Def": 5, "Res": 9},		
			"growths": {"HP": 0, "Str": 10, "Mag": 10, "Skl": 10, "Spd": 15, "Lck": 20, "Def": 0, "Res": 20},
			"maxStats": {"HP": 55, "Str": 28, "Mag": 27, "Skl": 30, "Spd": 34, "Lck": 35, "Def": 27, "Res": 35},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Kinshi_Knight": {
			"name": "Kinshi Knight",
			"promotesTo": null,
			"promotesFrom": ["Sky_Knight", "Archer"],
			"classTier": "tier2",
			"skills": ["Air_Superiority", "Amaterasu"],
			"bases": {"HP": 17, "Str": 4, "Mag": 1, "Skl": 9, "Spd": 8, "Lck": 5, "Def": 4, "Res": 7},		
			"growths": {"HP": 0, "Str": 5, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 15, "Def": 0, "Res": 15},
			"maxStats": {"HP": 50, "Str": 27, "Mag": 26, "Skl": 33, "Spd": 31, "Lck": 34, "Def": 25, "Res": 31},
			"sealAccess": true,
			"inheritAccess": true,
		},
		
		"Archer": {
			"name": "Archer",
			"promotesTo": ["Sniper", "Kinshi_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Skill+2", "Quick_Draw"],
			"bases": {"HP": 17, "Str": 5, "Mag": 0, "Skl": 7, "Spd": 5, "Lck": 2, "Def": 4, "Res": 1},
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 5, "Def": 10, "Res": 0},
			"maxStats": {"HP": 40, "Str": 21, "Mag": 15, "Skl": 23, "Spd": 21, "Lck": 20, "Def": 20, "Res": 17},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Sniper": {
			"name": "Sniper",
			"promotesTo": null,
			"promotesFrom": ["Archer"],
			"classTier": "tier2",
			"skills": ["Certain_Blow", "Bowfaire"],
			"bases": {"HP": 19, "Str": 7, "Mag": 0, "Skl": 10, "Spd": 9, "Lck": 3, "Def": 6, "Res": 2},		
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 20, "Spd": 15, "Lck": 5, "Def": 10, "Res": 0},
			"maxStats": {"HP": 55, "Str": 31, "Mag": 25, "Skl": 35, "Spd": 33, "Lck": 30, "Def": 31, "Res": 28},
			"bonus": {"Hit": 10, "Crit": 10},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Ninja": {
			"name": "Ninja",
			"promotesTo": ["Master_Ninja", "Mechanist"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Locktouch", "Poison_Strike"],
			"bases": {"HP": 16, "Str": 3, "Mag": 0, "Skl": 8, "Spd": 8, "Lck": 1, "Def": 3, "Res": 3},
			"growths": {"HP": 5, "Str": 5, "Mag": 0, "Skl": 20, "Spd": 20, "Lck": 0, "Def": 5, "Res": 15},
			"maxStats": {"HP": 35, "Str": 17, "Mag": 15, "Skl": 25, "Spd": 25, "Lck": 18, "Def": 19, "Res": 20},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Master_Ninja": {
			"name": "Master Ninja",
			"promotesTo": null,
			"promotesFrom": ["Ninja"],
			"classTier": "tier2",
			"skills": ["Lethality", "Shurikenfaire"],
			"bases": {"HP": 17, "Str": 5, "Mag": 0, "Skl": 10, "Spd": 11, "Lck": 2, "Def": 4, "Res": 8},
			"growths": {"HP": 5, "Str": 5, "Mag": 0, "Skl": 20, "Spd": 20, "Lck": 0, "Def": 5, "Res": 20},
			"maxStats": {"HP": 55, "Str": 27, "Mag": 25, "Skl": 35, "Spd": 35, "Lck": 28, "Def": 26, "Res": 34},
			"bonus": {"Hit": 5, "Crit": 5, "Avo": 5, "Ddg": 5},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Mechanist": {
			"name": "Mechanist",
			"promotesTo": null,
			"promotesFrom": ["Ninja", "Apothecary"],
			"classTier": "tier2",
			"skills": ["Golembane", "Replicate"],
			"bases": {"HP": 18, "Str": 7, "Mag": 0, "Skl": 9, "Spd": 7, "Lck": 2, "Def": 6, "Res": 6},
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 10, "Lck": 5, "Def": 5, "Res": 15},
			"maxStats": {"HP": 60, "Str": 30, "Mag": 25, "Skl": 33, "Spd": 30, "Lck": 30, "Def": 31, "Res": 31},
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Kitsune": {
			"name": "Kitsune",
			"promotesTo": ["Nine-Tails"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Evenhanded", "Beastbane"],
			"bases": {"HP": 16, "Str": 5, "Mag": 1, "Skl": 6, "Spd": 8, "Lck": 4, "Def": 1, "Res": 4},	
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 20, "Lck": 10, "Def": 0, "Res": 20},
			"maxStats": {"HP": 40, "Str": 20, "Mag": 18, "Skl": 23, "Spd": 24, "Lck": 24, "Def": 18, "Res": 23},
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Nine-Tails": {
			"name": "Nine-Tails",
			"promotesTo": null,
			"promotesFrom": ["Kitsune"],
			"classTier": "tier2",
			"skills": ["Even_Better", "Grisly_Wound"],
			"bases": {"HP": 19, "Str": 6, "Mag": 2, "Skl": 9, "Spd": 10, "Lck": 5, "Def": 2, "Res": 8},		
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 20, "Lck": 10, "Def": 0, "Res": 20},
			"maxStats": {"HP": 55, "Str": 29, "Mag": 29, "Skl": 33, "Spd": 34, "Lck": 33, "Def": 27, "Res": 34},
			"bonus": {"Crit": 5, "Avo": 10, "Ddg": 10},
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Cavalier": {
			"name": "Cavalier",
			"promotesTo": ["Paladin", "Great_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Elbow_Room", "Shelter"],
			"bases": {"HP": 17, "Str": 6, "Mag": 0, "Skl": 5, "Spd": 5, "Lck": 3, "Def": 5, "Res": 3},		
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 15, "Def": 10, "Res": 5},
			"maxStats": {"HP": 40, "Str": 22, "Mag": 15, "Skl": 21, "Spd": 20, "Lck": 24, "Def": 22, "Res": 21},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Paladin": {
			"name": "Paladin",
			"promotesTo": null,
			"promotesFrom": ["Cavalier"],
			"classTier": "tier2",
			"skills": ["Defender", "Aegis"],
			"bases": {"HP": 19, "Str": 8, "Mag": 1, "Skl": 7, "Spd": 7, "Lck": 4, "Def": 7, "Res": 6},		
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 15, "Def": 10, "Res": 10},
			"maxStats": {"HP": 60, "Str": 31, "Mag": 26, "Skl": 30, "Spd": 30, "Lck": 32, "Def": 32, "Res": 32},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Great_Knight": {
			"name": "Great Knight",
			"promotesTo": null,
			"promotesFrom": ["Cavalier", "Knight"],
			"classTier": "tier2",
			"skills": ["Luna", "Armored_Blow"],
			"bases": {"HP": 21, "Str": 10, "Mag": 0, "Skl": 6, "Spd": 6, "Lck": 3, "Def": 10, "Res": 2},		
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 10, "Spd": 5, "Lck": 5, "Def": 20, "Res": 0},
			"maxStats": {"HP": 65, "Str": 35, "Mag": 25, "Skl": 29, "Spd": 27, "Lck": 28, "Def": 37, "Res": 28},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Knight": {
			"name": "Knight",
			"promotesTo": ["General", "Great_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Defense+2", "Natural_Cover"],
			"bases": {"HP": 19, "Str": 8, "Mag": 0, "Skl": 5, "Spd": 3, "Lck": 3, "Def": 8, "Res": 1},		
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 15, "Spd": 5, "Lck": 10, "Def": 20, "Res": 0},
			"maxStats": {"HP": 45, "Str": 24, "Mag": 15, "Skl": 22, "Spd": 17, "Lck": 22, "Def": 26, "Res": 18},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"General": {
			"name": "General",
			"promotesTo": null,
			"promotesFrom": ["Knight"],
			"classTier": "tier2",
			"skills": ["Wary_Fighter", "Pavise"],
			"bases": {"HP": 22, "Str": 11, "Mag": 0, "Skl": 7, "Spd": 3, "Lck": 4, "Def": 12, "Res": 3},		
			"growths": {"HP": 25, "Str": 20, "Mag": 0, "Skl": 15, "Spd": 0, "Lck": 10, "Def": 20, "Res": 5},
			"maxStats": {"HP": 70, "Str": 38, "Mag": 25, "Skl": 32, "Spd": 25, "Lck": 32, "Def": 40, "Res": 30},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Fighter": {
			"name": "Fighter",
			"promotesTo": ["Berserker", "Hero"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["HP+5", "Gamble"],
			"bases": {"HP": 19, "Str": 7, "Mag": 0, "Skl": 6, "Spd": 6, "Lck": 2, "Def": 4, "Res": 1},		
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 5, "Def": 5, "Res": 0},
			"maxStats": {"HP": 45, "Str": 25, "Mag": 15, "Skl": 23, "Spd": 22, "Lck": 21, "Def": 19, "Res": 18},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Berserker": {
			"name": "Berserker",
			"promotesTo": null,
			"promotesFrom": ["Fighter"],
			"classTier": "tier2",
			"skills": ["Rally_Strength", "Axefaire"],
			"bases": {"HP": 24, "Str": 12, "Mag": 0, "Skl": 8, "Spd": 9, "Lck": 0, "Def": 5, "Res": 0},		
			"growths": {"HP": 30, "Str": 25, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 0, "Def": 0, "Res": 0},
			"maxStats": {"HP": 70, "Str": 40, "Mag": 25, "Skl": 32, "Spd": 33, "Lck": 25, "Def": 27, "Res": 25},
			"bonus": {"Crit": 20, "Ddg": -5},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Mercenary": {
			"name": "Mercenary",
			"promotesTo": ["Hero", "Bow_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Good_Fortune", "Strong_Riposte"],
			"bases": {"HP": 17, "Str": 5, "Mag": 0, "Skl": 7, "Spd": 6, "Lck": 2, "Def": 5, "Res": 2},		
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 20, "Spd": 15, "Lck": 5, "Def": 10, "Res": 5},
			"maxStats": {"HP": 40, "Str": 22, "Mag": 15, "Skl": 24, "Spd": 22, "Lck": 20, "Def": 21, "Res": 19},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Hero": {
			"name": "Hero",
			"promotesTo": null,
			"promotesFrom": ["Mercenary", "Fighter"],
			"classTier": "tier2",
			"skills": ["Sol", "Axebreaker"],
			"bases": {"HP": 20, "Str": 8, "Mag": 0, "Skl": 10, "Spd": 8, "Lck": 3, "Def": 7, "Res": 2},		
			"growths": {"HP": 20, "Str": 15, "Mag": 0, "Skl": 20, "Spd": 15, "Lck": 5, "Def": 10, "Res": 0},
			"maxStats": {"HP": 60, "Str": 32, "Mag": 25, "Skl": 35, "Spd": 32, "Lck": 31, "Def": 30, "Res": 27},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Bow_Knight": {
			"name": "Bow Knight",
			"promotesTo": null,
			"promotesFrom": ["Outlaw", "Mercenary"],
			"classTier": "tier2",
			"skills": ["Rally_Skill", "Shurikenbreaker"],
			"bases": {"HP": 18, "Str": 6, "Mag": 0, "Skl": 8, "Spd": 9, "Lck": 3, "Def": 5, "Res": 6},		
			"growths": {"HP": 10, "Str": 10, "Mag": 0, "Skl": 15, "Spd": 15, "Lck": 10, "Def": 0, "Res": 10},
			"maxStats": {"HP": 55, "Str": 29, "Mag": 25, "Skl": 32, "Spd": 33, "Lck": 30, "Def": 27, "Res": 32},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Outlaw": {
			"name": "Outlaw",
			"promotesTo": ["Adventurer", "Bow_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Locktouch", "Movement+1"],
			"bases": {"HP": 16, "Str": 3, "Mag": 1, "Skl": 4, "Spd": 8, "Lck": 1, "Def": 2, "Res": 4},		
			"growths": {"HP": 0, "Str": 10, "Mag": 5, "Skl": 10, "Spd": 20, "Lck": 0, "Def": 0, "Res": 20},
			"maxStats": {"HP": 35, "Str": 19, "Mag": 18, "Skl": 20, "Spd": 24, "Lck": 18, "Def": 17, "Res": 22},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Adventurer": {
			"name": "Adventurer",
			"promotesTo": null,
			"promotesFrom": ["Outlaw"],
			"classTier": "tier2",
			"skills": ["Lucky_Seven", "Pass"],
			"bases": {"HP": 17, "Str": 4, "Mag": 6, "Skl": 6, "Spd": 10, "Lck": 2, "Def": 3, "Res": 8},		
			"growths": {"HP": 0, "Str": 5, "Mag": 15, "Skl": 5, "Spd": 20, "Lck": 0, "Def": 0, "Res": 20},
			"maxStats": {"HP": 50, "Str": 27, "Mag": 31, "Skl": 27, "Spd": 34, "Lck": 27, "Def": 25, "Res": 34},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Wyvern_Rider": {
			"name": "Wyvern Rider",
			"promotesTo": ["Wyvern_Lord", "Malig_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Strength+2", "Lunge"],
			"bases": {"HP": 17, "Str": 6, "Mag": 0, "Skl": 5, "Spd": 4, "Lck": 2, "Def": 7, "Res": 0},		
			"growths": {"HP": 10, "Str": 15, "Mag": 5, "Skl": 10, "Spd": 10, "Lck": 5, "Def": 20, "Res": 0},
			"maxStats": {"HP": 40, "Str": 22, "Mag": 17, "Skl": 21, "Spd": 20, "Lck": 19, "Def": 24, "Res": 15},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Wyvern_Lord": {
			"name": "Wyvern Lord",
			"promotesTo": null,
			"promotesFrom": ["Wyvern_Rider"],
			"classTier": "tier2",
			"skills": ["Rally_Defense", "Swordbreaker"],
			"bases": {"HP": 19, "Str": 8, "Mag": 0, "Skl": 9, "Spd": 6, "Lck": 3, "Def": 10, "Res": 1},		
			"growths": {"HP": 10, "Str": 15, "Mag": 0, "Skl": 15, "Spd": 10, "Lck": 5, "Def": 20, "Res": 0},
			"maxStats": {"HP": 60, "Str": 33, "Mag": 25, "Skl": 33, "Spd": 29, "Lck": 28, "Def": 35, "Res": 26},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Malig_Knight": {
			"name": "Malig Knight",
			"promotesTo": null,
			"promotesFrom": ["Wyvern_Rider"],
			"classTier": "tier2",
			"skills": ["Savage_Blow", "Trample"],
			"bases": {"HP": 18, "Str": 7, "Mag": 6, "Skl": 6, "Spd": 5, "Lck": 0, "Def": 8, "Res": 6},		
			"growths": {"HP": 0, "Str": 15, "Mag": 15, "Skl": 10, "Spd": 5, "Lck": 0, "Def": 10, "Res": 15},
			"maxStats": {"HP": 55, "Str": 31, "Mag": 30, "Skl": 28, "Spd": 27, "Lck": 25, "Def": 31, "Res": 31},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Dark_Mage": {
			"name": "Dark Mage",
			"promotesTo": ["Sorcerer", "Dark_Knight"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Heartseeker", "Malefic_Aura"],
			"bases": {"HP": 16, "Str": 0, "Mag": 6, "Skl": 3, "Spd": 3, "Lck": 1, "Def": 3, "Res": 5},		
			"growths": {"HP": 0, "Str": 10, "Mag": 20, "Skl": 0, "Spd": 10, "Lck": 0, "Def": 5, "Res": 10},
			"maxStats": {"HP": 35, "Str": 19, "Mag": 24, "Skl": 16, "Spd": 19, "Lck": 18, "Def": 19, "Res": 22},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Sorcerer": {
			"name": "Sorcerer",
			"promotesTo": null,
			"promotesFrom": ["Dark_Mage"],
			"classTier": "tier2",
			"skills": ["Vengeance", "Bowbreaker"],
			"bases": {"HP": 17, "Str": 0, "Mag": 9, "Skl": 4, "Spd": 6, "Lck": 1, "Def": 5, "Res": 8},		
			"growths": {"HP": 0, "Str": 0, "Mag": 25, "Skl": 0, "Spd": 10, "Lck": 0, "Def": 5, "Res": 15},
			"maxStats": {"HP": 50, "Str": 25, "Mag": 35, "Skl": 26, "Spd": 29, "Lck": 26, "Def": 29, "Res": 33},
			"bonus": {"Hit": 5, "Crit": 10, "Ddg": 5},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Dark_Knight": {
			"name": "Dark Knight",
			"promotesTo": null,
			"promotesFrom": ["Dark_Mage"],
			"classTier": "tier2",
			"skills": ["Seal_Magic", "Lifetaker"],
			"bases": {"HP": 19, "Str": 8, "Mag": 6, "Skl": 6, "Spd": 5, "Lck": 3, "Def": 8, "Res": 6},		
			"growths": {"HP": 15, "Str": 20, "Mag": 10, "Skl": 5, "Spd": 5, "Lck": 5, "Def": 15, "Res": 5},
			"maxStats": {"HP": 55, "Str": 32, "Mag": 31, "Skl": 28, "Spd": 27, "Lck": 31, "Def": 34, "Res": 30},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Troubadour_F": {
			"name": "Troubadour",
			"promotesTo": ["Strategist", "Maid"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Gentilhomme", "Resistance+2"],
			"bases": {"HP": 15, "Str": 0, "Mag": 3, "Skl": 7, "Spd": 5, "Lck": 4, "Def": 1, "Res": 4},		
			"growths": {"HP": 0, "Str": 0, "Mag": 10, "Skl": 20, "Spd": 10, "Lck": 15, "Def": 0, "Res": 15},
			"maxStats": {"HP": 35, "Str": 16, "Mag": 19, "Skl": 24, "Spd": 20, "Lck": 23, "Def": 16, "Res": 21},
			"bonus": {"Ddg": 10},
			"gender": "F",
			"genderEquivalent": "Troubadour_M",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Troubadour_M": {
			"name": "Troubadour",
			"promotesTo": ["Strategist", "Butler"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Gentilhomme", "Resistance+2"],
			"bases": {"HP": 15, "Str": 0, "Mag": 3, "Skl": 7, "Spd": 5, "Lck": 4, "Def": 1, "Res": 4},		
			"growths": {"HP": 0, "Str": 0, "Mag": 10, "Skl": 20, "Spd": 10, "Lck": 15, "Def": 0, "Res": 15},
			"maxStats": {"HP": 35, "Str": 16, "Mag": 19, "Skl": 24, "Spd": 20, "Lck": 23, "Def": 16, "Res": 21},
			"bonus": {"Ddg": 10},
			"gender": "M",
			"genderEquivalent": "Troubadour_F",
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Strategist": {
			"name": "Strategist",
			"promotesTo": null,
			"promotesFrom": ["Troubadour_F", "Troubadour_M"],
			"classTier": "tier2",
			"skills": ["Rally_Resistance", "Dragon_Fang"],
			"bases": {"HP": 16, "Str": 0, "Mag": 7, "Skl": 6, "Spd": 7, "Lck": 5, "Def": 2, "Res": 7},		
			"growths": {"HP": 0, "Str": 0, "Mag": 15, "Skl": 5, "Spd": 10, "Lck": 20, "Def": 0, "Res": 15},
			"maxStats": {"HP": 45, "Str": 25, "Mag": 33, "Skl": 28, "Spd": 31, "Lck": 33, "Def": 25, "Res": 32},
			"sealAccess": true,
			"inheritAccess": true,
		},

		"Maid": {
			"name": "Maid",
			"promotesTo": null,
			"promotesFrom": ["Troubadour_F"],
			"classTier": "tier2",
			"skills": ["Live_to_Serve", "Tomebreaker"],
			"bases": {"HP": 18, "Str": 4, "Mag": 5, "Skl": 9, "Spd": 8, "Lck": 4, "Def": 5, "Res": 4},		
			"growths": {"HP": 0, "Str": 10, "Mag": 10, "Skl": 15, "Spd": 15, "Lck": 10, "Def": 5, "Res": 10},
			"maxStats": {"HP": 50, "Str": 28, "Mag": 31, "Skl": 33, "Spd": 33, "Lck": 32, "Def": 29, "Res": 29},
			"gender": "F",
			"genderEquivalent": "Butler",
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Butler": {
			"name": "Maid",
			"promotesTo": null,
			"promotesFrom": ["Troubadour_M"],
			"classTier": "tier2",
			"skills": ["Live_to_Serve", "Tomebreaker"],
			"bases": {"HP": 18, "Str": 4, "Mag": 5, "Skl": 9, "Spd": 8, "Lck": 4, "Def": 5, "Res": 4},		
			"growths": {"HP": 0, "Str": 10, "Mag": 10, "Skl": 15, "Spd": 15, "Lck": 10, "Def": 5, "Res": 10},
			"maxStats": {"HP": 50, "Str": 28, "Mag": 31, "Skl": 33, "Spd": 33, "Lck": 32, "Def": 29, "Res": 29},
			"gender": "M",
			"genderEquivalent": "Maid",
			"sealAccess": true,
			"inheritAccess": true,
		},	

		"Wolfskin": {
			"name": "Wolfskin",
			"promotesTo": ["Wolfssegner"],
			"promotesFrom": null,
			"classTier": "tier1",
			"skills": ["Odd_Shaped", "Beastbane"],
			"bases": {"HP": 19, "Str": 8, "Mag": 0, "Skl": 4, "Spd": 6, "Lck": 0, "Def": 4, "Res": 0},		
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 5, "Spd": 15, "Lck": 5, "Def": 10, "Res": 0},
			"maxStats": {"HP": 45, "Str": 24, "Mag": 15, "Skl": 18, "Spd": 22, "Lck": 17, "Def": 21, "Res": 15},
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Wolfssegner": {
			"name": "Wolfssegner",
			"promotesTo": null,
			"promotesFrom": ["Wolfskin"],
			"classTier": "tier2",
			"skills": ["Better_Odds", "Grisly_Wound"],
			"bases": {"HP": 22, "Str": 11, "Mag": 0, "Skl": 6, "Spd": 7, "Lck": 1, "Def": 7, "Res": 1},		
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 5, "Spd": 15, "Lck": 5, "Def": 10, "Res": 0},
			"maxStats": {"HP": 65, "Str": 36, "Mag": 25, "Skl": 29, "Spd": 31, "Lck": 26, "Def": 32, "Res": 26},
			"bonus": {"Hit": 10, "Crit": 5, "Ddg": 10},
			"sealAccess": false,
			"inheritAccess": true,
		},

		"Songstress": {
			"name": "Songstress",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Luck+4", "Inspiring_Song", "Voice_of_Peace", "Foreign_Princess"],
			"bases": {"HP": 16, "Str": 3, "Mag": 0, "Skl": 6, "Spd": 5, "Lck": 3, "Def": 2, "Res": 3},
			"growths": {"HP": 0, "Str": 10, "Mag": 0, "Skl": 20, "Spd": 20, "Lck": 20, "Def": 0, "Res": 0},
			"maxStats": {"HP": 45, "Str": 28, "Mag": 27, "Skl": 31, "Spd": 31, "Lck": 35, "Def": 27, "Res": 28},
			"gender": "F",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Dread_Fighter": {
			"name": "Dread Fighter",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Even_Keel", "Iron_Will", "Clarity", "Aggressor"],
			"bases": {"HP": 19, "Str": 8, "Mag": 3, "Skl": 6, "Spd": 8, "Lck": 1, "Def": 6, "Res": 9},
			"growths": {"HP": 15, "Str": 15, "Mag": 5, "Skl": 5, "Spd": 15, "Lck": 0, "Def": 5, "Res": 20},
			"maxStats": {"HP": 55, "Str": 32, "Mag": 28, "Skl": 29, "Spd": 31, "Lck": 26, "Def": 29, "Res": 34},
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Dark_Falcon": {
			"name": "Dark Falcon",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Speed+2", "Relief", "Rally_Movement", "Galeforce"],
			"bases": {"HP": 17, "Str": 4, "Mag": 7, "Skl": 5, "Spd": 9, "Lck": 4, "Def": 3, "Res": 9},
			"growths": {"HP": 0, "Str": 10, "Mag": 15, "Skl": 5, "Spd": 15, "Lck": 15, "Def": 0, "Res": 20},
			"maxStats": {"HP": 45, "Str": 27, "Mag": 32, "Skl": 28, "Spd": 33, "Lck": 32, "Def": 26, "Res": 34},
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Ballistician": {
			"name": "Ballistician",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Survey", "Opportunity_Shot", "Rifled_Barrel", "Surefooted"],
			"bases": {"HP": 18, "Str": 10, "Mag": 0, "Skl": 7, "Spd": 2, "Lck": 4, "Def": 3, "Res": 1},
			"growths": {"HP": 5, "Str": 25, "Mag": 0, "Skl": 15, "Spd": 0, "Lck": 10, "Def": 5, "Res": 5},
			"maxStats": {"HP": 50, "Str": 39, "Mag": 25, "Skl": 31, "Spd": 25, "Lck": 32, "Def": 27, "Res": 26},
			"gender": "M",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Witch": {
			"name": "Witch",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Shadowgift", "Witchs_Brew", "Warp", "Toxic_Brew"],
			"bases": {"HP": 17, "Str": 0, "Mag": 10, "Skl": 5, "Spd": 9, "Lck": 3, "Def": 4, "Res": 5},
			"growths": {"HP": 5, "Str": 0, "Mag": 25, "Skl": 5, "Spd": 20, "Lck": 5, "Def": 0, "Res": 10},
			"maxStats": {"HP": 50, "Str": 25, "Mag": 36, "Skl": 27, "Spd": 34, "Lck": 28, "Def": 26, "Res": 29},
			"bonus": {"Crit": 10, "Avo": 10},
			"gender": "F",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Lodestar": {
			"name": "Lodestar",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Dancing_Blade", "Charm", "Dual_Guarder", "Speedtaker"],
			"bases": {"HP": 19, "Str": 7, "Mag": 0, "Skl": 10, "Spd": 9, "Lck": 7, "Def": 7, "Res": 2},
			"growths": {"HP": 15, "Str": 10, "Mag": 0, "Skl": 20, "Spd": 10, "Lck": 25, "Def": 5, "Res": 5},
			"maxStats": {"HP": 60, "Str": 29, "Mag": 26, "Skl": 35, "Spd": 33, "Lck": 40, "Def": 30, "Res": 29},
			"bonus": {"Hit": 10, "Crit": 5, "Avo": 10},
			"gender": "M",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Vanguard": {
			"name": "Vanguard",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Heavy_Blade", "Veteran_Intuition", "Aether", "Strengthtaker"],
			"bases": {"HP": 21, "Str": 10, "Mag": 0, "Skl": 6, "Spd": 7, "Lck": 3, "Def": 9, "Res": 1},
			"growths": {"HP": 20, "Str": 20, "Mag": 0, "Skl": 5, "Spd": 5, "Lck": 10, "Def": 15, "Res": 0},
			"maxStats": {"HP": 65, "Str": 36, "Mag": 25, "Skl": 29, "Spd": 30, "Lck": 30, "Def": 32, "Res": 27},
			"gender": "M",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Great_Lord": {
			"name": "Great Lord",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Dual_Striker", "Charm", "Aether", "Awakening"],
			"bases": {"HP": 18, "Str": 8, "Mag": 1, "Skl": 8, "Spd": 9, "Lck": 5, "Def": 7, "Res": 3},
			"growths": {"HP": 15, "Str": 15, "Mag": 0, "Skl": 10, "Spd": 10, "Lck": 15, "Def": 10, "Res": 5},
			"maxStats": {"HP": 60, "Str": 30, "Mag": 25, "Skl": 32, "Spd": 34, "Lck": 35, "Def": 29, "Res": 31},
			"gender": "F",
			"sealAccess": false,
			"inheritAccess": false,
		},

		"Grandmaster": {
			"name": "Grandmaster",
			"promotesTo": null,
			"promotesFrom": null,
			"classTier": "special",
			"skills": ["Tactical_Advice", "Solidarity", "Ignis", "Rally_Spectrum"],
			"bases": {"HP": 18, "Str": 7, "Mag": 6, "Skl": 8, "Spd": 7, "Lck": 2, "Def": 6, "Res": 8},
			"growths": {"HP": 10, "Str": 15, "Mag": 15, "Skl": 15, "Spd": 5, "Lck": 0, "Def": 5, "Res": 15},
			"maxStats": {"HP": 55, "Str": 31, "Mag": 33, "Skl": 33, "Spd": 29, "Lck": 26, "Def": 28, "Res": 33},
			"sealAccess": false,
			"inheritAccess": false,
		}
	};


	this.AVATAR_TALENTS = {
		"M": {
			"Cavalier": "Cavalier",
			"Knight": "Knight",
			"Fighter": "Fighter",
			"Mercenary": "Mercenary",
			"Outlaw": "Outlaw",
			"Samurai": "Samurai",
			"Oni_Savage": "Oni Savage",
			"Spear_Fighter": "Lancer (Spear Fighter)",
			"Diviner": "Diviner",
			"Monk": "Monk",
			"Sky_Knight": "Sky Knight",
			"Archer": "Archer",
			"Wyvern_Rider": "Dragon (Wyvern Rider)",
			"Ninja": "Ninja",
			"Dark_Mage": "Mage (Dark Mage)",
			"Troubadour_M": "Troubadour",
			"Apothecary": "Apothecary"
		},
		"F": {
			"Cavalier": "Cavalier",
			"Knight": "Knight",
			"Fighter": "Fighter",
			"Mercenary": "Mercenary",
			"Outlaw": "Outlaw",
			"Samurai": "Samurai",
			"Oni_Savage": "Oni Savage",
			"Spear_Fighter": "Lancer (Spear Fighter)",
			"Diviner": "Diviner",
			"Shrine_Maiden": "Priestess (Shrine Maiden)",
			"Sky_Knight": "Sky Knight",
			"Archer": "Archer",
			"Wyvern_Rider": "Dragon (Wyvern Rider)",
			"Ninja": "Ninja",
			"Dark_Mage": "Mage (Dark Mage)",
			"Troubadour_F": "Troubadour",
			"Apothecary": "Apothecary"
		},
	};


	this.getClasses = function() {
		return classes;
	};



});
app.service('Skills', function() {

	var classSkills = {
		"Dragon_Ward": {
			"name": "Dragon Ward",

		},

		"Hoshidan_Unity": {
			"name": "Hoshidan Unity"
		},

		"Duelists_Blow": {
			"name": "Duelist's Blow"
		},

		"Vantage": {
			"name": "Vantage"
		},

		"Astra": {
			"name": "Astra"
		},

		"Swordfaire": {
			"name": "Swordfaire"
		},

		"Seal_Strength": {
			"name": "Seal Strength"
		},

		"Life_or_Death": {
			"name": "Life or Death"
		},

		"Seal_Resistance": {
			"name": "Seal Resistance"
		},

		"Shove": {
			"name": "Shove"
		},

		"Death_Blow": {
			"name": "Death Blow"
		},

		"Counter": {
			"name": "Counter"
		},

		"Salvage_Blow": {
			"name": "Salvage Blow"
		},

		"Lancebreaker": {
			"name": "Lancebreaker"
		},

		"Seal_Defense": {
			"name": "Seal Defense"
		},

		"Swap": {
			"name": "Swap"
		},

		"Seal_Speed": {
			"name": "Seal Speed"
		},

		"Lancefaire": {
			"name": "Lancefaire"
		},

		"Rend_Heaven": {
			"name": "Rend Heaven"
		},

		"Quixotic": {
			"name": "Quixotic"
		},

		"Magic+2": {
			"name": "Magic +2"
		},

		"Future_Sight": {
			"name": "Future Sight"
		},

		"Rally_Magic": {
			"name": "Rally Magic"
		},

		"Tomefaire": {
			"name": "Tomefaire"
		},

		"Miracle": {
			"name": "Miracle"
		},

		"Rally_Luck": {
			"name": "Rally Luck"
		},

		"Renewal": {
			"name": "Renewal"
		},

		"Countermagic": {
			"name": "Countermagic"
		},

		"Darting_Blow": {
			"name": "Darting Blow"
		},

		"Camaraderie": {
			"name": "Camaraderie"
		},

		"Rally_Speed": {
			"name": "Rally Speed"
		},

		"Warding_Blow": {
			"name": "Warding Blow"
		},

		"Air_Superiority": {
			"name": "Air Superiority"
		},

		"Amaterasu": {
			"name": "Amaterasu"
		},

		"Skill+2": {
			"name": "Skill +2"
		},

		"Quick_Draw": {
			"name": "Quick Draw"
		},

		"Certain_Blow": {
			"name": "Certain Blow"
		},

		"Bowfaire": {
			"name": "Bowfaire"
		},

		"Locktouch": {
			"name": "Locktouch"
		},

		"Poison_Strike": {
			"name": "Poison Strike"
		},

		"Lethality": {
			"name": "Lethality"
		},

		"Shurikenfaire": {
			"name": "Shurikenfaire"
		},

		"Golembane": {
			"name": "Golembane"
		},

		"Replicate": {
			"name": "Replicate"
		},

		"Potent_Potion": {
			"name": "Potent Potion"
		},

		"Quick_Salve": {
			"name": "Quick Salve"
		},

		"Profiteer": {
			"name": "Profiteer"
		},

		"Spendthrift": {
			"name": "Spendthrift"
		},

		"Evenhanded": {
			"name": "Evenhanded"
		},

		"Beastbane": {
			"name": "Beastbane"
		},

		"Even_Better": {
			"name": "Even Better"
		},

		"Grisly_Wound": {
			"name": "Grisly Wound"
		},

		"Luck+4": {
			"name": "Luck +4"
		},

		"Inspiring_Song": {
			"name": "Inspiring Song"
		},

		"Voice_of_Peace": {
			"name": "Voice of Peace"
		},

		"Foreign_Princess": {
			"name": "Foreign Princess"
		},

		"Aptitude": {
			"name": "Aptitude"
		},

		"Underdog": {
			"name": "Underdog"
		},

		"Nobility": {
			"name": "Nobility"
		},

		"Dragon_Fang": {
			"name": "Dragon Fang"
		},

		"Draconic_Hex": {
			"name": "Draconic Hex"
		},

		"Nohrian_Trust": {
			"name": "Nohrian Trust"
		},

		"Elbow_Room": {
			"name": "Elbow Room"
		},

		"Shelter": {
			"name": "Shelter"
		},

		"Defender": {
			"name": "Defender"
		},

		"Aegis": {
			"name": "Aegis"
		},

		"Luna": {
			"name": "Luna"
		},

		"Armored_Blow": {
			"name": "Armored Blow"
		},

		"Defense+2": {
			"name": "Defense +2"
		},

		"Natural_Cover": {
			"name": "Natural Cover"
		},

		"Wary_Fighter": {
			"name": "Wary Fighter"
		},

		"Pavise": {
			"name": "Pavise"
		},

		"HP+5": {
			"name": "HP +5"
		},

		"Gamble": {
			"name": "Gamble"
		},

		"Rally_Strength": {
			"name": "Rally Strength"
		},

		"Axefaire": {
			"name": "Axefaire"
		},

		"Good_Fortune": {
			"name": "Good Fortune"
		},

		"Strong_Riposte": {
			"name": "Strong Riposte"
		},

		"Sol": {
			"name": "Sol"
		},

		"Axebreaker": {
			"name": "Axebreaker"
		},

		"Rally_Skill": {
			"name": "Rally Skill"
		},

		"Shurikenbreaker": {
			"name": "Shurikenbreaker"
		},

		"Movement+1": {
			"name": "Movement +1"
		},

		"Lucky_Seven": {
			"name": "Lucky Seven"
		},

		"Pass": {
			"name": "Pass"
		},

		"Strength+2": {
			"name": "Strength +2"
		},

		"Lunge": {
			"name": "Lunge"
		},

		"Rally_Defense": {
			"name": "Rally Defense"
		},

		"Swordbreaker": {
			"name": "Swordbreaker"
		},

		"Savage_Blow": {
			"name": "Savage Blow"
		},

		"Trample": {
			"name": "Trample"
		},

		"Heartseeker": {
			"name": "Heartseeker"
		},

		"Malefic_Aura": {
			"name": "Malefic Aura"
		},

		"Vengeance": {
			"name": "Vengeance"
		},

		"Bowbreaker": {
			"name": "Bowbreaker"
		},

		"Seal_Magic": {
			"name": "Seal Magic"
		},

		"Lifetaker": {
			"name": "Lifetaker"
		},

		"Resistance+2": {
			"name": "Resistance +2"
		},

		"Gentilhomme": {
			"name": "Gentilhomme"
		},

		"Demoiselle": {
			"name": "Demoiselle"
		},

		"Rally_Resistance": {
			"name": "Rally Resistance"
		},

		"Inspiration": {
			"name": "Inspiration"
		},

		"Live_to_Serve": {
			"name": "Live to Serve"
		},

		"Tomebreaker": {
			"name": "Tomebreaker"
		},

		"Odd_Shaped": {
			"name": "Odd Shaped"
		},

		"Better_Odds": {
			"name": "Better Odds"
		},

		"Even_Keel": {
			"name": "Even Keel"
		},

		"Iron_Will": {
			"name": "Iron Will"
		},

		"Clarity": {
			"name": "Clarity"
		},

		"Aggressor": {
			"name": "Aggressor"
		},

		"Speed+2": {
			"name": "Speed +2"
		},

		"Relief": {
			"name": "Relief"
		},

		"Rally_Movement": {
			"name": "Rally Movement"
		},

		"Galeforce": {
			"name": "Galeforce"
		},

		"Survey": {
			"name": "Survey"
		},

		"Opportunity_Shot": {
			"name": "Opportunity Shot"
		},

		"Rifled_Barrel": {
			"name": "Rifled Barrel"
		},

		"Surefooted": {
			"name": "Surefooted"
		},

		"Shadowgift": {
			"name": "Shadowgift"
		},

		"Witchs_Brew": {
			"name": "Witch's Brew"
		},

		"Warp": {
			"name": "Warp"
		},

		"Toxic_Brew": {
			"name": "Toxic Brew"
		},

		"Dancing_Blade": {
			"name": "Dancing Blade"
		},

		"Charm": {
			"name": "Charm"
		},

		"Dual_Guarder": {
			"name": "Dual Guarder"
		},

		"Speedtaker": {
			"name": "Speedtaker"
		},

		"Heavy_Blade": {
			"name": "Heavy Blade"
		},

		"Veteran_Intuition": {
			"name": "Veteran Intuition"
		},

		"Aether": {
			"name": "Aether"
		},

		"Strengthtaker": {
			"name": "Strengthtaker"
		},

		"Dual_Striker": {
			"name": "Dual Striker"
		},

		"Awakening": {
			"name": "Awakening"
		},

		"Tactical_Advice": {
			"name": "Tactical Advice"
		},

		"Solidarity": {
			"name": "Solidarity"
		},

		"Ignis": {
			"name": "Ignis"
		},

		"Rally_Spectrum": {
			"name": "Rally Spectrum"
		}

	};

	var personalSkills = {
		"Supportive": {
			"name": "Supportive"
		},

		"Forceful_Partner": {
			"name": "Forceful Partner"
		},

		"Devoted_Partner": {
			"name": "Devoted Partner"
		},

		"Evasive_Partner": {
			"name": "Evasive Partner"
		},

		"Miraculous_Save": {
			"name": "Miraculous Save"
		},

		"Healing_Descant": {
			"name": "Healing Descant"
		},

		"Vow_of_Friendship": {
			"name": "Vow of Friendship"
		},

		"Highwayman": {
			"name": "Highwayman"
		},

		"Peacebringer": {
			"name": "Peacebringer"
		},

		"Forager": {
			"name": "Forager"
		},

		"Fiery_Blood": {
			"name": "Fiery Blood"
		},

		"Quiet_Strength": {
			"name": "Quiet Strength"
		},

		"Fearsome_Blow": {
			"name": "Fearsome Blow"
		},

		"Perfectionist": {
			"name": "Perfectionist"
		},

		"Pyrotechnics": {
			"name": "Pyrotechnics"
		},

		"Capture": {
			"name": "Capture"
		},

		"Rallying_Cry": {
			"name": "Rallying Cry"
		},

		"Divine_Retribution": {
			"name": "Divine Retribution"
		},

		"Optimist": {
			"name": "Optimist"
		},

		"Pride": {
			"name": "Pride"
		},

		"Nohr_Enmity": {
			"name": "Nohr Enmity"
		},

		"Triple_Threat": {
			"name": "Triple Threat"
		},

		"Competitive": {
			"name": "Competitive"
		},

		"Shuriken_Mastery": {
			"name": "Shuriken Mastery"
		},

		"Morbid_Celebration": {
			"name": "Morbid Celebration"
		},

		"Reciprocity": {
			"name": "Reciprocity"
		},

		"Bushido": {
			"name": "Bushido"
		},

		"In_Extremis": {
			"name": "In Extremis"
		},

		"Perspicacious": {
			"name": "Perspicacious"
		},

		"Draconic_Heir": {
			"name": "Draconic Heir"
		},

		"Born_Steward": {
			"name": "Born Steward"
		},

		"Perfect_Pitch": {
			"name": "Perfect Pitch"
		},

		"Mischievous": {
			"name": "Mischievous"
		},

		"Lucky_Charm": {
			"name": "Lucky Charm"
		},

		"Noble_Cause": {
			"name": "Noble Cause"
		},

		"Optimistic": {
			"name": "Optimistic"
		},

		"Sweet_Tooth": {
			"name": "Sweet Tooth"
		},

		"Playthings": {
			"name": "Playthings"
		},

		"Calm": {
			"name": "Calm"
		},

		"Haiku": {
			"name": "Haiku"
		},

		"Prodigy": {
			"name": "Prodigy"
		},

		"Vendetta": {
			"name": "Vendetta"
		},

		"Lilys_Poise": {
			"name": "Lily's Poise"
		},

		"Misfortunate": {
			"name": "Misfortunate"
		},

		"Puissance": {
			"name": "Puissance"
		},

		"Aching_Blood": {
			"name": "Aching Blood"
		},

		"Kidnap": {
			"name": "Kidnap"
		},

		"Countercurse": {
			"name": "Countercurse"
		},

		"Roses_Thorn": {
			"name": "Rose's Thorn"
		},

		"Fierce_Rival": {
			"name": "Fierce Rival"
		},

		"Opportunist": {
			"name": "Opportunist"
		},

		"Fancy_Footwork": {
			"name": "Fancy Footwork"
		},

		"Bloodthirst": {
			"name": "Bloodthirst"
		},

		"Fierce_Mien": {
			"name": "Fierce Mien"
		},

		"Unmask": {
			"name": "Unmask"
		},

		"Pragmatic": {
			"name": "Pragmatic"
		},

		"Collector": {
			"name": "Collector"
		},

		"Chivalry": {
			"name": "Chivalry"
		},

		"Icy_Blood": {
			"name": "Icy Blood"
		},

		"Gallant": {
			"name": "Gallant"
		},

		"Fierce_Counter": {
			"name": "Fierce Counter"
		},

		"Guarded_Bravery": {
			"name": "Guarded Bravery"
		},

		"Goody_Basket": {
			"name": "Goody Basket"
		},

		"Fortunate_Son": {
			"name": "Fortunate Son"
		},

		"Bibliophile": {
			"name": "Bibliophile"
		},

		"Sisterhood": {
			"name": "Sisterhood"
		},

		"Daydream": {
			"name": "Daydream"
		},

		"Wind_Disciple": {
			"name": "Wind Disciple"
		},

		"Make_a_Killing": {
			"name": "Make a Killing"
		}

	};




	this.getAllSkills = function() {
		return angular.extend({}, classSkills, personalSkills);
	};

	this.getClassSkills = function() {
		return classSkills;
	};

	this.getPersonalSkills = function() {
		return personalSkills;
	};

});
app.service('utils', ['Characters', 'Classes', 'Skills',
	function(Characters, Classes, Skills) {

		var chars = Characters.getCharacters(),
			classes = Classes.getClasses(),
			skills = Skills.getAllSkills();

		this.createCharacterMap = function(charKeyList) {
			var map = {};
			charKeyList.forEach(function(charKey) {
				map[charKey] = chars[charKey];
			});
			return map;
		};

	}
])