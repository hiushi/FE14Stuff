app.service('compressionService', ['Characters', 'Classes', 'Skills', 'Weapons',
	function(Characters, Classes, Skills, Weapons) {

		var self = this;
		var CHARS = Characters.getCharacters();
		var CLASSES = Classes.getClasses();
		var SKILLS = Skills.getAllSkills();
		var WEAPONS = Weapons.getWeapons();


		this.decompressDict = {
			a: 'charObj',
			b: 'classObj',
			c: 'level',
			d: 'baseHP',
			e: 'baseStr',
			f: 'baseMag',
			g: 'baseSkl',
			h: 'baseSpd',
			i: 'baseLck',
			j: 'baseDef',
			k: 'baseRes',
			l: 'inventory0',
			m: 'inventory1',
			n: 'inventory2',
			o: 'inventory3',
			p: 'inventory4',
			q: 'skill1',
			r: 'skill2',
			s: 'skill3',
			t: 'skill4',
			u: 'skill5',
			v: 'meal0',
			w: 'meal1',
			x: 'meal2',
			y: 'surge1',
			z: 'surge2',
			A: 'weaponRank0',
			B: 'weaponRank1',
			C: 'weaponRank2'
		};

		this.compressDict = {};
		Object.keys(this.decompressDict).forEach(function(char) {
			self.compressDict[self.decompressDict[char]] = char;
		});

		this.decompressWeaponDict = {a: 'Sword', b: 'Lance', c: 'Axe', d: 'Dagger', e: 'Bow', f: 'Tome', g: 'Staff', h: 'Stone', i: 'Other'};
		this.compressWeaponDict = {};
		Object.keys(this.decompressWeaponDict).forEach(function(char) {
			self.compressWeaponDict[self.decompressWeaponDict[char]] = char;
		});

		this.decompressStatDict = {a: 'Str', b: 'Mag', c: 'Skl', d: 'Spd', e: 'Lck', f: 'Def', g: 'Res'};
		this.compressStatDict = {};
		Object.keys(this.decompressStatDict).forEach(function(char) {
			self.compressStatDict[self.decompressStatDict[char]] = char;
		});


		this.compressUnitData = function(unitObj) {
			var unitObj = angular.copy(unitObj);
			var translatedObj = {};

			Object.keys(unitObj).forEach(function(field) {

				if (self.compressDict[field]) {
					translatedObj[self.compressDict[field]] = unitObj[field].pk ? unitObj[field].pk : unitObj[field];
				}
				else if (field === "baseStats") {
					Object.keys(unitObj[field]).forEach(function(stat) {
						translatedObj[self.compressDict['base'+stat]] = unitObj[field][stat];
					});
				}

				else if (field === "prepInventory") {
					Object.keys(unitObj[field]).forEach(function(item, idx) {
						if (!unitObj[field][item] || !unitObj[field][item].item) return;
						translatedObj[self.compressDict['inventory'+idx]] = unitObj[field][item].item.pk + ((unitObj[field][item].forgeLevel || 0)/10);
					});
				}

				else if (field === "skills") {
					Object.keys(unitObj[field]).forEach(function(skill, idx) {
						if (idx === 0 || !unitObj[field][skill]) return;
						translatedObj[self.compressDict['skill'+idx]] = unitObj[field][skill].pk;
					});
				}
				else if (field === "weaponRanks") {
					Object.keys(unitObj[field]).forEach(function(weapon, idx) {
						if (!unitObj[field][weapon]) return;
						translatedObj[self.compressDict['weaponRank'+idx]] = self.compressWeaponDict[weapon] + unitObj[field][weapon];
					});
				}
				else if (field === "meal") {
					if (!unitObj[field]) return;
					Object.keys(unitObj[field]).forEach(function(stat, idx) {
						if (idx > 2 || !unitObj[field][stat]) return;
						translatedObj[self.compressDict['meal'+idx]] = self.compressStatDict[stat] + unitObj[field][stat];
					});
				}
				else if (field === "surge") {
					if (!unitObj[field]) return;
					[1, 2].forEach(function(num) {
						if (unitObj[field]['stat'+num]) {
							translatedObj[self.compressDict['surge'+num]] = self.compressStatDict[unitObj[field]['stat'+num]];
						}
					})
				}

			});

			var encoded = btoa(angular.toJson(translatedObj));
			return encoded;
		};





		this.decompressUnitData = function(encodedStr) {
			var decoded = {};
			var translatedObj = angular.fromJson(atob(encodedStr));

			Object.keys(translatedObj).forEach(function(char) {
				if (self.decompressDict[char]) {
					decoded[self.decompressDict[char]] = translatedObj[char];
				}
			});


			decoded.charObj = Characters.getCharacterByPK(decoded.charObj);
			decoded.name = decoded.charObj.name;
			decoded.unitKey = decoded.charObj.key;

			decoded.classObj = Classes.getClassByPK(decoded.classObj);
			decoded.className = decoded.classObj.name;
			decoded.classKey = decoded.classObj.key;

			decoded.baseStats = {};
			['Str', 'Mag', 'Skl', 'Spd', 'Lck', 'Def', 'Res'].forEach(function(stat) {
				if (decoded['base'+stat]) {
					decoded.baseStats[stat] = decoded['base'+stat];
					delete decoded['base'+stat];
				}
			});

			decoded.prepInventory = [];
			for (var i=0; i<5; i++) {
				if (decoded['inventory'+i]) {
					var pk = parseInt(decoded['inventory'+i]);
					var forgeLevel = Math.round((decoded['inventory'+i] - pk) * 10);
					decoded.prepInventory[i] = {
						item: Weapons.getWeaponByPK(pk),
						forgeLevel: forgeLevel
					};
					delete decoded['inventory'+i];
				}
				else decoded.prepInventory[i] = null;
			}


			decoded.skills = [];
			decoded.skills[0] = SKILLS[decoded.charObj.personalSkill];
			for (var i=1; i<6; i++) {
				if (decoded['skill'+i]) {
					decoded.skills[i] = Skills.getClassSkillByPK(decoded['skill'+i]);
					delete decoded['skill'+i];
				}
				else decoded.skills[i] = null;
			}

			decoded.weaponRanks = {};
			for (var i=0; i<3; i++) {
				if (decoded['weaponRank'+i]) {
					var parsed = decoded['weaponRank'+i].split(/([a-i])(E|D|C|B|A|S)/);
					var weapon = self.decompressWeaponDict[parsed[1]];
					var rank = parsed[2];
					decoded.weaponRanks[weapon] = rank;
					delete decoded['weaponRank'+i];
				}
			}

			decoded.meal = {};
			for (var i=0; i<3; i++) {
				if (decoded['meal'+i]) {
					var parsed = decoded['meal'+i].split(/([a-g])(-1|1|2|3)/);
					var stat = self.decompressStatDict[parsed[1]];
					var value = parseInt(parsed[2]);
					decoded.meal[stat] = value;
					delete decoded['meal'+i];
				}
			}
			if (!Object.keys(decoded.meal).length) delete decoded.meal;

			decoded.surge = {};
			for (var i=1; i<3; i++) {
				if (decoded['surge'+i]) {
					decoded.surge['stat'+i] = self.decompressStatDict[decoded['surge'+i]];
					delete decoded['surge'+i];
				}
			}
			if (!Object.keys(decoded.surge).length) delete decoded.surge;


			return decoded;
		};


	}
]);