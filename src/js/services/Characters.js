app.service('Characters', function() {

	var characters = {
		"Avatar_M": {
			"key": "Avatar_M",
			"name": "Avatar (M)",
			"gender": "M",
			"gen": 1,
			"child": "Kana_F",
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
			"key": "Avatar_F",
			"name": "Avatar (F)",
			"gender": "F",
			"gen": 1,
			"child": "Kana_M",
			"availability": "BCR",
			"SSupport": ["Gunter", "Jakob", "Kaze", "Silas", "Shura", "Izana", "Subaki", "Saizo", "Azama", "Hayato", "Hinata", "Takumi", "Kaden", "Ryoma", "Yukimura", "Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Arthur", "Odin", "Niles", "Laslow", "Benny", "Leo", "Keaton", "Xander", "Siegbert", "Forrest", "Ignatius", "Percy", "Fuga", "Rhajat"],
			"APlusSupport": ["Felicia", "Azura", "Mozu", "Rinkah", "Sakura", "Hana", "Orochi", "Hinoka", "Setsuna", "Oboro", "Kagero", "Reina", "Scarlet", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Elise", "Effie", "Niles", "Nyx", "Camilla", "Selena", "Beruka", "Peri", "Charlotte", "Flora", "Velouria", "Ophelia", "Soleil", "Nina", "Anna"],
			"startingClass": "Nohr_Princess",
			"startingLevel": 1,
			"bases": {},
			"growths": {},
			"mods": {},
			"personalSkill": "Supportive",
			"baseClass1": "Nohr_Princess",
		},

		"Azura": {
			"key": "Azura",
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
			"key": "Gunter",
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
			"key": "Felicia",
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
			"baseClass1": "Troubadour_F",
			"baseClass2": "Mercenary",
			"special": true
		},

		"Jakob": {
			"key": "Jakob",
			"name": "Jakob",
			"gender": "M",
			"gen": 1,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Felicia", "Azura", "Mozu", "Hinoka", "Sakura", "Rinkah", "Orochi", "Kagero", "Hana", "Setsuna", "Oboro", "Camilla", "Elise", "Charlotte", "Effie", "Peri", "Beruka", "Selena", "Nyx"],
			"APlusSupport": ["Gunter", "Silas", "Takumi"],
			"child": "Dwyer",
			"startingClass": "Butler",
			"startingLevel": 1,
			"bases": {"HP": 21, "Str": 8, "Mag": 6, "Skl": 12, "Spd": 9, "Lck": 10, "Def": 7, "Res": 6},
			"growths": {"HP": 50, "Str": 35, "Mag": 15, "Skl": 40, "Spd": 35, "Lck": 45, "Def": 25, "Res": 25},
			"mods": {"Str": 2, "Mag": -2, "Skl": 2, "Spd": 0, "Lck": -1, "Def": 0, "Res": -1},
			"personalSkill": "Evasive_Partner",
			"baseClass1": "Troubadour_M",
			"baseClass2": "Cavalier",
			"special": true
		},	

		"Kaze": {
			"key": "Kaze",
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
			"key": "Silas",
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
			"key": "Mozu",
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
			"key": "Rinkah",
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
			"key": "Sakura",
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
			"key": "Hana",
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
			"key": "Subaki",
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
			"key": "Saizo",
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
			"key": "Orochi",
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
			"key": "Hinoka",
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
			"key": "Azama",
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
			"key": "Setsuna",
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
			"key": "Hayato",
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
			"key": "Oboro",
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
			"key": "Hinata",
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
			"key": "Takumi",
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
			"key": "Kagero",
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
			"key": "Kaden",
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
			"key": "Ryoma",
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
			"key": "Elise",
			"name": "Elise",
			"gender": "F",
			"gen": 1,
			"availability": "CR",
			"SSupport": ["Avatar_M", "Jakob", "Silas", "Kaze", "Benny", "Keaton", "Arthur", "Odin", "Laslow", "Niles", "Ryoma", "Takumi"],
			"APlusSupport": ["Camilla", "Azura", "Effie", "Sakura"],
			"startingClass": "Troubadour_F",
			"startingLevel": 5,
			"bases": {"HP": 19, "Str": 2, "Mag": 11, "Skl": 5, "Spd": 10, "Lck": 14, "Def": 4, "Res": 11},
			"growths": {"HP": 30, "Str": 5, "Mag": 65, "Skl": 25, "Spd": 55, "Lck": 70, "Def": 15, "Res": 40},
			"mods": {"Str": -1, "Mag": 3, "Skl": -2, "Spd": 1, "Lck": 1, "Def": -3, "Res": 1},
			"personalSkill": "Lilys_Poise",
			"baseClass1": "Troubadour_F",
			"baseClass2": "Wyvern_Rider"
		},

		"Effie": {
			"key": "Effie",
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
			"baseClass2": "Troubadour_F"
		},	

		"Arthur": {
			"key": "Arthur",
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
			"key": "Odin",
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
			"key": "Niles",
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
			"key": "Nyx",
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
			"key": "Camilla",
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
			"key": "Selena",
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
			"key": "Beruka",
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
			"key": "Laslow",
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
			"key": "Peri",
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
			"key": "Charlotte",
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
			"baseClass2": "Troubadour_F"
		},

		"Benny": {
			"key": "Benny",
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
			"key": "Leo",
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
			"baseClass2": "Troubadour_M"
		},

		"Keaton": {
			"key": "Keaton",
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
			"key": "Xander",
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
			"key": "Reina",
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
			"key": "Scarlet",
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
			"key": "Flora",
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
			"baseClass1": "Troubadour_F",
			"baseClass2": "Dark_Mage",
			"baseClass3": "Mercenary"
		},

		"Shura": {
			"key": "Shura",
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
			"key": "Izana",
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
			"key": "Yukimura",
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
			"key": "Fuga",
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
			"key": "Anna",
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
			"baseClass2": "Troubadour_F",
			"baseClass3": "Apothecary"
		},

		"Kana_M": {
			"key": "Kana_M",
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
			"baseClass1": "Nohr_Prince",

		},

		"Kana_F": {
			"key": "Kana_F",
			"name": "Kana (F)",
			"gender": "F",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Shigure", "Dwyer", "Shiro", "Kiragi", "Asugi", "Hisame", "Siegbert", "Forrest", "Ignatius", "Percy"],
			"APlusSupport": ["Midori", "Mitama", "Selkie", "Velouria"],
			"parent": "Avatar_M",
			"startingClass": "Nohr_Princess",
			"bases": {"HP": 7, "Str": 3, "Mag": 6, "Skl": 8, "Spd": 8, "Lck": 9, "Def": 5, "Res": 5},
			"growths": {"HP": 30, "Str": 35, "Mag": 30, "Skl": 40, "Spd": 45, "Lck": 45, "Def": 25, "Res": 25},
			"personalSkill": "Draconic_Heir",
			"baseClass1": "Nohr_Princess",

		},

		"Shigure": {
			"key": "Shigure",
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
			"baseClass1": "Sky_Knight",

		},

		"Dwyer": {
			"key": "Dwyer",
			"name": "Dwyer",
			"gender": "M",
			"gen": 2,
			"availability": "BCR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Selkie", "Mitama", "Caeldori", "Rhajat", "Velouria", "Ophelia", "Soleil", "Nina"],
			"APlusSupport": ["Asugi", "Kiragi", "Percy"],
			"parent": "Jakob",
			"startingClass": "Troubadour_M",
			"bases": {"HP": 8, "Str": 7, "Mag": 7, "Skl": 2, "Spd": 6, "Lck": 4, "Def": 6, "Res": 7},
			"growths": {"HP": 45, "Str": 45, "Mag": 30, "Skl": 20, "Spd": 30, "Lck": 30, "Def": 30, "Res": 35},
			"personalSkill": "Born_Steward",
			"baseClass1": "Troubadour_M",

		},

		"Sophie": {
			"key": "Sophie",
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
			"baseClass1": "Cavalier",

		},

		"Midori": {
			"key": "Midori",
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
			"baseClass1": "Apothecary",

		},

		"Shiro": {
			"key": "Shiro",
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
			"baseClass1": "Spear_Fighter",

		},

		"Kiragi": {
			"key": "Kiragi",
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
			"baseClass1": "Archer",

		},

		"Asugi": {
			"key": "Asugi",
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
			"baseClass1": "Ninja",

		},

		"Selkie": {
			"key": "Selkie",
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
			"baseClass1": "Kitsune",

		},

		"Hisame": {
			"key": "Hisame",
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
			"baseClass1": "Samurai",

		},

		"Mitama": {
			"key": "Mitama",
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
			"baseClass1": "Shrine_Maiden",

		},

		"Caeldori": {
			"key": "Caeldori",
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
			"baseClass1": "Sky_Knight",

		},

		"Rhajat": {
			"key": "Rhajat",
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
			"baseClass1": "Diviner",

		},

		"Siegbert": {
			"key": "Siegbert",
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
			"baseClass1": "Cavalier",

		},

		"Forrest": {
			"key": "Forrest",
			"name": "Forrest",
			"gender": "M",
			"gen": 2,
			"availability": "CR",
			"SSupport": ["Avatar_F", "Kana_F", "Sophie", "Midori", "Velouria", "Ophelia", "Soleil", "Nina", "Selkie", "Rhajat"],
			"APlusSupport": ["Siegbert", "Shigure", "Ignatius", "Kiragi"],
			"parent": "Leo",
			"startingClass": "Troubadour_M",
			"bases": {"HP": 8, "Str": 5, "Mag": 9, "Skl": 1, "Spd": 4, "Lck": 5, "Def": 6, "Res": 13},
			"growths": {"HP": 55, "Str": 15, "Mag": 65, "Skl": 20, "Spd": 35, "Lck": 25, "Def": 25, "Res": 55},
			"personalSkill": "Fierce_Counter",
			"baseClass1": "Troubadour_M",

		},

		"Ignatius": {
			"key": "Ignatius",
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
			"baseClass1": "Knight",

		},

		"Velouria": {
			"key": "Velouria",
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
			"baseClass1": "Wolfskin",

		},

		"Percy": {
			"key": "Percy",
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
			"baseClass1": "Wyvern_Rider",

		},

		"Ophelia": {
			"key": "Ophelia",
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
			"baseClass1": "Dark_Mage",

		},

		"Soleil": {
			"key": "Soleil",
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
			"baseClass1": "Mercenary",

		},

		"Nina": {
			"key": "Nina",
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
			"baseClass1": "Outlaw",

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
		return angular.copy(characters);
	};

	this.getCharacter = function(charKey) {
		return angular.copy(characters[charKey]);
	};

	this.getSSupports = function(charKey) {
		return characters[charKey].SSupport;
	};

	this.getAPlusSupports = function(charKey) {
		return characters[charKey].APlusSupport;
	};

	this.getBaseClasses = function(charKey) {
		var baseClasses = [];
		var unit = characters[charKey];
		if (unit.baseClass1) baseClasses.push(unit.baseClass1);
		if (unit.baseClass2) baseClasses.push(unit.baseClass2);
		if (unit.baseClass3) baseClasses.push(unit.baseClass3);
		return baseClasses;
	};

});












