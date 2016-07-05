app.service('utils', ['Characters', 'Classes', 'Skills', 'Weapons',
	function(Characters, Classes, Skills, Weapons) {

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

		this.createClassMap = function(classKeyList) {
			var map = {};
			classKeyList.forEach(function(classKey) {
				map[classKey] = classes[classKey];
			});
			return map;
		};

		this.createSkillMap = function(skillKeyList) {
			var map = {};
			skillKeyList.forEach(function(skillKey) {
				map[skillKey] = skills[skillKey];
			});
			return map;
		};

		this.formatSkillName = function(skillKey) {
			if (!skillKey) return;
			return skillKey.replace(/\+/g, '');
		};

		this.displayWeaponRange = function(rangeArr) {
			if (rangeArr.length == 1) return rangeArr[0];
			else return rangeArr[0] + '-' + rangeArr[rangeArr.length-1];
		};

		this.getClassSet = function(charKey) {
			var unit = Characters.getCharacter(charKey);
			var baseClassKeyList = Characters.getBaseClasses(charKey);

			var fullClassKeyList = angular.copy(baseClassKeyList);
			baseClassKeyList.forEach(function(baseClassKey) {
				var promotions = Classes.getPromotions(baseClassKey);
				if (promotions) {
					fullClassKeyList = fullClassKeyList.concat(promotions);
				}
			});
			return fullClassKeyList;
		};

		this.getSkillsByClassTree = function(baseClassKey) {
			var baseClass = Classes.getClass(baseClassKey);
			var promotions = Classes.getPromotions(baseClassKey).map(Classes.getClass);
			var fullClassList = [baseClass].concat(promotions);

			var skillKeyList = [];
			fullClassList.forEach(function(unitClass) {
				skillKeyList = skillKeyList.concat(unitClass.skills);
			});
			return skillKeyList;
		};

		// can take either several objects or a single array of objects as params.
		// returns a single object that only contains the keys (and the corresponding values)
		// that are included in ALL of the objects.
		// all objects are assumed to contain the same value for any given key.
		// Useful for applying multiple filters simultaneously
		this.getObjectIntersection = function() {

		};

		// can take either several arrays or a single array of arrays as params.
		// returns a single array that only contains the values that all of the arrays have in common
		this.getArrayIntersection = function() {
			var args = arguments, arrays;
			if (args.length == 1 && Array.isArray(args[0]) && args[0][0] && Array.isArray(args[0][0]))
				arrays = args[0];
			else 
				arrays = [].slice.call(args);

			var intersection = [];
			if (Array.isArray(arrays[0])) intersection = angular.copy(arrays[0]);
			for (var i=1; i<arrays.length; i++) {
				var arr = arrays[i];
				if (!Array.isArray(arr)) {
					console.warn('Error in method utils.getArrayIntersection: One or more of the arguments is not an array.');
					return;
				}
				for (j=intersection.length-1; j>=0; j--) {
					if (arr.indexOf(intersection[j]) == -1)
						intersection.splice(j, 1);
				}
			}

			return intersection;
		};

		// returns a numerical value representing the level of a weapon rank.
		// Lower number corresponds to lower weapon rank
		this.getWeaponRankIndex = function(weaponRank) {
			return ['E', 'D', 'C', 'B', 'A', 'S'].indexOf(weaponRank);
		};


		window.getArrayIntersection = this.getArrayIntersection;


	}
])