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