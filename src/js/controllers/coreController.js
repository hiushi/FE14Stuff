app.controller('coreCtrl', ['$scope', 'utils', 'Characters', 'Classes', 'Skills',
	function($scope, utils, Characters, Classes, Skills) {

		var vm = this;


		var CHARS = vm.CHARS = Characters.getCharacters();
		var CLASSES = vm.CLASSES = Classes.getClasses();
		var SKILLS = vm.SKILLS = Skills.getAllSkills();

		vm.CHILD_MOD_BONUS = Characters.CHILD_MOD_BONUS;
		vm.AVATAR_MODS = Characters.AVATAR_MODS;
		vm.AVATAR_TALENTS = Classes.AVATAR_TALENTS;


		vm.model = {};

		var getCharacter = vm.getCharacter = function(charKey) {
			return angular.copy(CHARS[charKey]);
		};

		var isAvatar = vm.isAvatar = function(unit) {
			if (!unit) return;
			return unit.name.indexOf('Avatar') == 0;
		};

		var avatarRequired = vm.avatarRequired = function() {
			return isAvatar(vm.model.unit) || isAvatar(vm.model.fixedParent) || isAvatar(vm.model.varParent)
				// || isAvatar(vm.model.SSupport);
		};


		var getAllClasses = vm.getAllClasses = function(charKey) {
			var unit = getCharacter(charKey);

			// pull initial class set based on inherent base classes
			var classList = utils.getClassSet(charKey);
			if (!classList) return;

			// if avatar, add talent class
			if (isAvatar(unit)) {
				var talentKey = vm.model.avatarTalent;
				if (talentKey) addClasses(classList, talentKey, unit);
			}

			// everyone else besides avatar
			else {

				// determining child unit's inherited class set
				if (unit.gen == 2) {
					var fixedParent = vm.model.fixedParent, varParent = vm.model.varParent;
					var father, mother;
					if (fixedParent && varParent && fixedParent.gender == "F" && varParent.gender == "M") {
						mother = fixedParent; father = varParent;
					}
					else if (fixedParent) {
						father = fixedParent; mother = varParent;
					}



					var inheritedClasses = [unit.baseClass1];

					var fatherPrimaryKey, fatherPrimary, motherPrimaryKey, motherPrimary;
					if (father) {
						fatherPrimaryKey = father.baseClass1;
						fatherPrimary = Classes.getClassByGender(fatherPrimaryKey, unit.gender);
					}
					if (mother) {
						motherPrimaryKey = mother.baseClass1;
						motherPrimary = Classes.getClassByGender(motherPrimaryKey, unit.gender);
					}
					var fatherClassKey, motherClassKey;
					// NOTE: "fatherPrimary" and "motherPrimary" are versions of parents' primaries corresponding to unit's gender

					// pass down father's class first
					
					// father primary, if it is not the same as unit primary
					if (fatherPrimary && fatherPrimary.inheritAccess && inheritedClasses.indexOf(fatherPrimary.key) == -1)
						fatherClassKey = fatherPrimary.key;
					// if father and child have same primary, try father's secondary
					else if (father) {
						var fatherSecondaryKey = father.baseClass2;
						if (isAvatar(father)) fatherSecondaryKey = vm.model.avatarTalent;

						if (fatherSecondaryKey) {
							var fatherSecondary = Classes.getClassByGender(fatherSecondaryKey, unit.gender);

							if (fatherSecondary && fatherSecondary.sealAccess) {

								if (inheritedClasses.indexOf(fatherSecondary.key) == -1)
									fatherClassKey = fatherSecondary.key;
								else {
									var fatherPrimaryParallel = Classes.getParallelClassByGender(fatherPrimaryKey, unit.gender);

									if (inheritedClasses.indexOf(fatherPrimaryParallel.key) == -1)
										fatherClassKey = fatherPrimaryParallel.key;
								}

							}
						}
					}
					if (fatherClassKey) inheritedClasses.push(fatherClassKey);

					// pass down mother's class second
					
					// mother primary, if it is not the same as unit primary or father primary
					if (motherPrimary && motherPrimary.inheritAccess && inheritedClasses.indexOf(motherPrimary.key) == -1) {
						motherClassKey = motherPrimary.key;
					}
					// if there is overlap with mother's primary, try mother's secondary
					else if (father && mother) {
						var motherSecondaryKey = mother.baseClass2;
						if (isAvatar(mother)) motherSecondaryKey = vm.model.avatarTalent;

						if (motherSecondaryKey) {
							var motherSecondary = Classes.getClassByGender(motherSecondaryKey, unit.gender);

							if (motherSecondary && motherSecondary.sealAccess) {

								if (inheritedClasses.indexOf(motherSecondary.key) == -1)
									motherClassKey = motherSecondary.key;
								else {
									var motherPrimaryParallel = Classes.getParallelClassByGender(motherPrimaryKey, unit.gender);

									if (inheritedClasses.indexOf(motherPrimaryParallel.key) == -1)
										motherClassKey = motherPrimaryParallel.key;
									else {
										var motherSecondaryParallel = Classes.getParallelClassByGender(motherSecondaryKey, unit.gender);

										if (inheritedClasses.indexOf(motherSecondaryParallel.key) == -1)
											motherClassKey = motherSecondaryParallel.key;
									}

								}

							}
						}
					}
					if (motherClassKey) inheritedClasses.push(motherClassKey);

					if (fatherClassKey) addClasses(classList, fatherClassKey, unit);
					if (motherClassKey) addClasses(classList, motherClassKey, unit);
				}


				if (vm.model.SSupport) {
					var partner = vm.model.SSupport;
					var partnerClassKey;

					// get partner's primary class (if it can be passed via seal)
					var partnerPrimaryKey = partner.baseClass1;
					var partnerPrimary = Classes.getClassByGender(partnerPrimaryKey, unit.gender);

					if (partnerPrimary && partnerPrimary.sealAccess && unit.baseClass1 != partnerPrimary.key)
						partnerClassKey = partnerPrimary.key;
					// if partner and unit have the same primary class, get partner's secondary class (if passable)
					else {
						var partnerSecondaryKey = partner.baseClass2;
						if (isAvatar(partner)) partnerSecondaryKey = vm.model.avatarTalent;

						if (partnerSecondaryKey) {
							var partnerSecondary = Classes.getClassByGender(partnerSecondaryKey, unit.gender);

							if (partnerSecondary && partnerSecondary.sealAccess) {

								// if partner primary is inaccessible and partner secondary = unit primary,
								// get parallel version of partner's primary
								if (unit.baseClass1 == partnerSecondary.key && !partnerPrimary.sealAccess) {
									var partnerPrimaryParallel = Classes.getParallelClassByGender(partnerPrimaryKey, unit.gender);
									partnerClassKey = partnerPrimaryParallel.key;
								}
								else if (unit.baseClass1 != partnerSecondary.key)
									partnerClassKey = partnerSecondary.key;				
							}
						}
					}

					if (partnerClassKey) {
						addClasses(classList, partnerClassKey, unit);
					}
				}
				if (vm.model.APlusSupport) {
					var friend = vm.model.APlusSupport;
					var friendClassKey;

					// get friend's primary class (if it can be passed via seal)
					var friendPrimaryKey = friend.baseClass1;
					var friendPrimary = Classes.getClassByGender(friendPrimaryKey, unit.gender);
					var friendSecondaryKey, friendSecondary;

					if (friendPrimary && friendPrimary.sealAccess && unit.baseClass1 != friendPrimary.key)
						friendClassKey = friendPrimary.key;
					// if friend and unit have the same primary class, get friend's secondary class (if passable)
					else {
						friendSecondaryKey = friend.baseClass2;
						if (isAvatar(friend)) friendSecondaryKey = vm.model.avatarTalent;

						if (friendSecondaryKey) {
							friendSecondary = Classes.getClassByGender(friendSecondaryKey, unit.gender);

							if (friendSecondary && friendSecondary.sealAccess) {

								// if friend primary is inaccessible and friend secondary = unit primary,
								// get parallel version of friend's primary
								if (unit.baseClass1 == friendSecondary.key && !friendPrimary.sealAccess) {
									var friendPrimaryParallel = Classes.getParallelClassByGender(friendPrimaryKey, unit.gender);
									friendClassKey = friendPrimaryParallel.key;
								}
								else if (unit.baseClass1 != friendSecondary.key)
									friendClassKey = friendSecondary.key;		
							}
						}
					}

					if (friendClassKey) {
						addClasses(classList, friendClassKey, unit);
					}
				}

			}


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


			if (vm.model.unit.gen == 2) {
				vm.model.fixedParent = getCharacter(unit.parent);
			}

			if (avatarRequired()) {
				calcAvatarMods();
			}

			vm.model.availableClasses = getAllClasses(unit.key);

			// initialize form fields where applicable
			selectClass(vm.model.availableClasses[unit.startingClass]);

		};

		vm.selectAvatarBoon = function() {
			calcAvatarMods();
			calcChildMods();
			calcChildGrowths();
			calcFullGrowths();
			calcCaps();
		};
		vm.selectAvatarBane = function() {
			calcAvatarMods();
			calcChildMods();
			calcChildGrowths();
			calcFullGrowths();
			calcCaps();
		};

		vm.selectAvatarTalent = function() {
			vm.model.availableClasses = getAllClasses(vm.model.unit.key);
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

			vm.model.availableClasses = getAllClasses(vm.model.unit.key);

		};

		// only applies to 3rd gen Kana
		vm.selectVarGrandparent = function() {
			calcChildMods(vm.model.varParent);
			calcChildMods(vm.model.unit);

			calcChildGrowths(vm.model.varParent);
			calcChildGrowths(vm.model.unit);
			calcFullGrowths();
			calcCaps();

			vm.model.availableClasses = getAllClasses(vm.model.unit.key);
		};


		vm.selectSSupport = function() {
			vm.model.availableClasses = getAllClasses(vm.model.unit.key);
		};

		vm.selectAPlusSupport = function() {
			vm.model.availableClasses = getAllClasses(vm.model.unit.key);
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



		function addClasses(classKeyList, newClassKey, unit) {
			var promotionKeys = Classes.getPromotions(newClassKey);
			var newClassKeys = [newClassKey].concat(promotionKeys);

			newClassKeys.forEach(function(newClassKey) {
				var newClass = Classes.getClass(newClassKey);

				if (newClass.gender && newClass.gender != unit.gender) {
					newClass = newClass.genderEquivalent;
				}

				if (classKeyList.indexOf(newClassKey) == -1) {
					classKeyList.push(newClassKey);
				}

			});

		}

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
			else if (isAvatar(vm.model.SSupport)) avatar = vm.model.SSupport;

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






