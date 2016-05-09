app.service('utils', ['Characters', 'Classes', 'Skills',
	function(Characters, Classes, Skills) {

		var chars = Characters.getCharacters(),
			classes = Classes.getClasses(),
			skills = Skills.getAllSkills();

		var self = this;

		self.createCharacterMap = function(charKeyList) {
			var map = {};
			charKeyList.forEach(function(charKey) {
				map[charKey] = chars[charKey];
			});
			return map;
		};

		self.createClassMap = function(classKeyList) {
			var map = {};
			classKeyList.forEach(function(classKey) {
				map[classKey] = classes[classKey];
			});
			return map;
		};

		self.createSkillMap = function(skillKeyList) {
			var map = {};
			skillKeyList.forEach(function(skillKey) {
				map[skillKey] = skills[skillKey];
			});
			return map;
		};

		self.getClassSet = function(charKey) {
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

		self.getSkillsByClassTree = function(baseClassKey) {
			var baseClass = Classes.getClass(baseClassKey);
			var promotions = Classes.getPromotions(baseClassKey).map(Classes.getClass);
			var fullClassList = [baseClass].concat(promotions);

			var skillKeyList = [];
			fullClassList.forEach(function(unitClass) {
				skillKeyList = skillKeyList.concat(unitClass.skills);
			});
			return skillKeyList;
		};



	}
])