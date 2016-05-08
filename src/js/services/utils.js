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

		this.createClassMap = function(classKeyList) {
			var map = {};
			classKeyList.forEach(function(classKey) {
				map[classKey] = classes[classKey];
			});
			return map;
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

	}
])