app.service('Skills', function() {

	var classSkills = {
		"Dragon_Ward": {
			"key": "Dragon_Ward",
			"name": "Dragon Ward",

		},

		"Hoshidan_Unity": {
			"key": "Hoshidan_Unity",
			"name": "Hoshidan Unity"
		},

		"Duelists_Blow": {
			"key": "Duelists_Blow",
			"name": "Duelist's Blow"
		},

		"Vantage": {
			"key": "Vantage",
			"name": "Vantage"
		},

		"Astra": {
			"key": "Astra",
			"name": "Astra"
		},

		"Swordfaire": {
			"key": "Swordfaire",
			"name": "Swordfaire"
		},

		"Seal_Strength": {
			"key": "Seal_Strength",
			"name": "Seal Strength"
		},

		"Life_or_Death": {
			"key": "Life_or_Death",
			"name": "Life or Death"
		},

		"Seal_Resistance": {
			"key": "Seal_Resistance",
			"name": "Seal Resistance"
		},

		"Shove": {
			"key": "Shove",
			"name": "Shove"
		},

		"Death_Blow": {
			"key": "Death_Blow",
			"name": "Death Blow"
		},

		"Counter": {
			"key": "Counter",
			"name": "Counter"
		},

		"Salvage_Blow": {
			"key": "Salvage_Blow",
			"name": "Salvage Blow"
		},

		"Lancebreaker": {
			"key": "Lancebreaker",
			"name": "Lancebreaker"
		},

		"Seal_Defense": {
			"key": "Seal_Defense",
			"name": "Seal Defense"
		},

		"Swap": {
			"key": "Swap",
			"name": "Swap"
		},

		"Seal_Speed": {
			"key": "Seal_Speed",
			"name": "Seal Speed"
		},

		"Lancefaire": {
			"key": "Lancefaire",
			"name": "Lancefaire"
		},

		"Rend_Heaven": {
			"key": "Rend_Heaven",
			"name": "Rend Heaven"
		},

		"Quixotic": {
			"key": "Quixotic",
			"name": "Quixotic"
		},

		"Magic+2": {
			"key": "Magic+2",
			"name": "Magic +2"
		},

		"Future_Sight": {
			"key": "Future_Sight",
			"name": "Future Sight"
		},

		"Rally_Magic": {
			"key": "Rally_Magic",
			"name": "Rally Magic"
		},

		"Tomefaire": {
			"key": "Tomefaire",
			"name": "Tomefaire"
		},

		"Miracle": {
			"key": "Miracle",
			"name": "Miracle"
		},

		"Rally_Luck": {
			"key": "Rally_Luck",
			"name": "Rally Luck"
		},

		"Renewal": {
			"key": "Renewal",
			"name": "Renewal"
		},

		"Countermagic": {
			"key": "Countermagic",
			"name": "Countermagic"
		},

		"Darting_Blow": {
			"key": "Darting_Blow",
			"name": "Darting Blow"
		},

		"Camaraderie": {
			"key": "Camaraderie",
			"name": "Camaraderie"
		},

		"Rally_Speed": {
			"key": "Rally_Speed",
			"name": "Rally Speed"
		},

		"Warding_Blow": {
			"key": "Warding_Blow",
			"name": "Warding Blow"
		},

		"Air_Superiority": {
			"key": "Air_Superiority",
			"name": "Air Superiority"
		},

		"Amaterasu": {
			"key": "Amaterasu",
			"name": "Amaterasu"
		},

		"Skill+2": {
			"key": "Skill+2",
			"name": "Skill +2"
		},

		"Quick_Draw": {
			"key": "Quick_Draw",
			"name": "Quick Draw"
		},

		"Certain_Blow": {
			"key": "Certain_Blow",
			"name": "Certain Blow"
		},

		"Bowfaire": {
			"key": "Bowfaire",
			"name": "Bowfaire"
		},

		"Locktouch": {
			"key": "Locktouch",
			"name": "Locktouch"
		},

		"Poison_Strike": {
			"key": "Poison_Strike",
			"name": "Poison Strike"
		},

		"Lethality": {
			"key": "Lethality",
			"name": "Lethality"
		},

		"Shurikenfaire": {
			"key": "Shurikenfaire",
			"name": "Shurikenfaire"
		},

		"Golembane": {
			"key": "Golembane",
			"name": "Golembane"
		},

		"Replicate": {
			"key": "Replicate",
			"name": "Replicate"
		},

		"Potent_Potion": {
			"key": "Potent_Potion",
			"name": "Potent Potion"
		},

		"Quick_Salve": {
			"key": "Quick_Salve",
			"name": "Quick Salve"
		},

		"Profiteer": {
			"key": "Profiteer",
			"name": "Profiteer"
		},

		"Spendthrift": {
			"key": "Spendthrift",
			"name": "Spendthrift"
		},

		"Evenhanded": {
			"key": "Evenhanded",
			"name": "Evenhanded"
		},

		"Beastbane": {
			"key": "Beastbane",
			"name": "Beastbane"
		},

		"Even_Better": {
			"key": "Even_Better",
			"name": "Even Better"
		},

		"Grisly_Wound": {
			"key": "Grisly_Wound",
			"name": "Grisly Wound"
		},

		"Luck+4": {
			"key": "Luck+4",
			"name": "Luck +4"
		},

		"Inspiring_Song": {
			"key": "Inspiring_Song",
			"name": "Inspiring Song"
		},

		"Voice_of_Peace": {
			"key": "Voice_of_Peace",
			"name": "Voice of Peace"
		},

		"Foreign_Princess": {
			"key": "Foreign_Princess",
			"name": "Foreign Princess"
		},

		"Aptitude": {
			"key": "Aptitude",
			"name": "Aptitude"
		},

		"Underdog": {
			"key": "Underdog",
			"name": "Underdog"
		},

		"Nobility": {
			"key": "Nobility",
			"name": "Nobility"
		},

		"Dragon_Fang": {
			"key": "Dragon_Fang",
			"name": "Dragon Fang"
		},

		"Draconic_Hex": {
			"key": "Draconic_Hex",
			"name": "Draconic Hex"
		},

		"Nohrian_Trust": {
			"key": "Nohrian_Trust",
			"name": "Nohrian Trust"
		},

		"Elbow_Room": {
			"key": "Elbow_Room",
			"name": "Elbow Room"
		},

		"Shelter": {
			"key": "Shelter",
			"name": "Shelter"
		},

		"Defender": {
			"key": "Defender",
			"name": "Defender"
		},

		"Aegis": {
			"key": "Aegis",
			"name": "Aegis"
		},

		"Luna": {
			"key": "Luna",
			"name": "Luna"
		},

		"Armored_Blow": {
			"key": "Armored_Blow",
			"name": "Armored Blow"
		},

		"Defense+2": {
			"key": "Defense+2",
			"name": "Defense +2"
		},

		"Natural_Cover": {
			"key": "Natural_Cover",
			"name": "Natural Cover"
		},

		"Wary_Fighter": {
			"key": "Wary_Fighter",
			"name": "Wary Fighter"
		},

		"Pavise": {
			"key": "Pavise",
			"name": "Pavise"
		},

		"HP+5": {
			"key": "HP+5",
			"name": "HP +5"
		},

		"Gamble": {
			"key": "Gamble",
			"name": "Gamble"
		},

		"Rally_Strength": {
			"key": "Rally_Strength",
			"name": "Rally Strength"
		},

		"Axefaire": {
			"key": "Axefaire",
			"name": "Axefaire"
		},

		"Good_Fortune": {
			"key": "Good_Fortune",
			"name": "Good Fortune"
		},

		"Strong_Riposte": {
			"key": "Strong_Riposte",
			"name": "Strong Riposte"
		},

		"Sol": {
			"key": "Sol",
			"name": "Sol"
		},

		"Axebreaker": {
			"key": "Axebreaker",
			"name": "Axebreaker"
		},

		"Rally_Skill": {
			"key": "Rally_Skill",
			"name": "Rally Skill"
		},

		"Shurikenbreaker": {
			"key": "Shurikenbreaker",
			"name": "Shurikenbreaker"
		},

		"Movement+1": {
			"key": "Movement+1",
			"name": "Movement +1"
		},

		"Lucky_Seven": {
			"key": "Lucky_Seven",
			"name": "Lucky Seven"
		},

		"Pass": {
			"key": "Pass",
			"name": "Pass"
		},

		"Strength+2": {
			"key": "Strength+2",
			"name": "Strength +2"
		},

		"Lunge": {
			"key": "Lunge",
			"name": "Lunge"
		},

		"Rally_Defense": {
			"key": "Rally_Defense",
			"name": "Rally Defense"
		},

		"Swordbreaker": {
			"key": "Swordbreaker",
			"name": "Swordbreaker"
		},

		"Savage_Blow": {
			"key": "Savage_Blow",
			"name": "Savage Blow"
		},

		"Trample": {
			"key": "Trample",
			"name": "Trample"
		},

		"Heartseeker": {
			"key": "Heartseeker",
			"name": "Heartseeker"
		},

		"Malefic_Aura": {
			"key": "Malefic_Aura",
			"name": "Malefic Aura"
		},

		"Vengeance": {
			"key": "Vengeance",
			"name": "Vengeance"
		},

		"Bowbreaker": {
			"key": "Bowbreaker",
			"name": "Bowbreaker"
		},

		"Seal_Magic": {
			"key": "Seal_Magic",
			"name": "Seal Magic"
		},

		"Lifetaker": {
			"key": "Lifetaker",
			"name": "Lifetaker"
		},

		"Resistance+2": {
			"key": "Resistance+2",
			"name": "Resistance +2"
		},

		"Gentilhomme": {
			"key": "Gentilhomme",
			"name": "Gentilhomme"
		},

		"Demoiselle": {
			"key": "Demoiselle",
			"name": "Demoiselle"
		},

		"Rally_Resistance": {
			"key": "Rally_Resistance",
			"name": "Rally Resistance"
		},

		"Inspiration": {
			"key": "Inspiration",
			"name": "Inspiration"
		},

		"Live_to_Serve": {
			"key": "Live_to_Serve",
			"name": "Live to Serve"
		},

		"Tomebreaker": {
			"key": "Tomebreaker",
			"name": "Tomebreaker"
		},

		"Odd_Shaped": {
			"key": "Odd_Shaped",
			"name": "Odd Shaped"
		},

		"Better_Odds": {
			"key": "Better_Odds",
			"name": "Better Odds"
		},

		"Even_Keel": {
			"key": "Even_Keel",
			"name": "Even Keel"
		},

		"Iron_Will": {
			"key": "Iron_Will",
			"name": "Iron Will"
		},

		"Clarity": {
			"key": "Clarity",
			"name": "Clarity"
		},

		"Aggressor": {
			"key": "Aggressor",
			"name": "Aggressor"
		},

		"Speed+2": {
			"key": "Speed+2",
			"name": "Speed +2"
		},

		"Relief": {
			"key": "Relief",
			"name": "Relief"
		},

		"Rally_Movement": {
			"key": "Rally_Movement",
			"name": "Rally Movement"
		},

		"Galeforce": {
			"key": "Galeforce",
			"name": "Galeforce"
		},

		"Survey": {
			"key": "Survey",
			"name": "Survey"
		},

		"Opportunity_Shot": {
			"key": "Opportunity_Shot",
			"name": "Opportunity Shot"
		},

		"Rifled_Barrel": {
			"key": "Rifled_Barrel",
			"name": "Rifled Barrel"
		},

		"Surefooted": {
			"key": "Surefooted",
			"name": "Surefooted"
		},

		"Shadowgift": {
			"key": "Shadowgift",
			"name": "Shadowgift"
		},

		"Witchs_Brew": {
			"key": "Witchs_Brew",
			"name": "Witch's Brew"
		},

		"Warp": {
			"key": "Warp",
			"name": "Warp"
		},

		"Toxic_Brew": {
			"key": "Toxic_Brew",
			"name": "Toxic Brew"
		},

		"Dancing_Blade": {
			"key": "Dancing_Blade",
			"name": "Dancing Blade"
		},

		"Charm": {
			"key": "Charm",
			"name": "Charm"
		},

		"Dual_Guarder": {
			"key": "Dual_Guarder",
			"name": "Dual Guarder"
		},

		"Speedtaker": {
			"key": "Speedtaker",
			"name": "Speedtaker"
		},

		"Heavy_Blade": {
			"key": "Heavy_Blade",
			"name": "Heavy Blade"
		},

		"Veteran_Intuition": {
			"key": "Veteran_Intuition",
			"name": "Veteran Intuition"
		},

		"Aether": {
			"key": "Aether",
			"name": "Aether"
		},

		"Strengthtaker": {
			"key": "Strengthtaker",
			"name": "Strengthtaker"
		},

		"Dual_Striker": {
			"key": "Dual_Striker",
			"name": "Dual Striker"
		},

		"Awakening": {
			"key": "Awakening",
			"name": "Awakening"
		},

		"Tactical_Advice": {
			"key": "Tactical_Advice",
			"name": "Tactical Advice"
		},

		"Solidarity": {
			"key": "Solidarity",
			"name": "Solidarity"
		},

		"Ignis": {
			"key": "Ignis",
			"name": "Ignis"
		},

		"Rally_Spectrum": {
			"key": "Rally_Spectrum",
			"name": "Rally Spectrum"
		}

	};

	var personalSkills = {
		"Supportive": {
			"key": "Supportive",
			"name": "Supportive"
		},

		"Forceful_Partner": {
			"key": "Forceful_Partner",
			"name": "Forceful Partner"
		},

		"Devoted_Partner": {
			"key": "Devoted_Partner",
			"name": "Devoted Partner"
		},

		"Evasive_Partner": {
			"key": "Evasive_Partner",
			"name": "Evasive Partner"
		},

		"Miraculous_Save": {
			"key": "Miraculous_Save",
			"name": "Miraculous Save"
		},

		"Healing_Descant": {
			"key": "Healing_Descant",
			"name": "Healing Descant"
		},

		"Vow_of_Friendship": {
			"key": "Vow_of_Friendship",
			"name": "Vow of Friendship"
		},

		"Highwayman": {
			"key": "Highwayman",
			"name": "Highwayman"
		},

		"Peacebringer": {
			"key": "Peacebringer",
			"name": "Peacebringer"
		},

		"Forager": {
			"key": "Forager",
			"name": "Forager"
		},

		"Fiery_Blood": {
			"key": "Fiery_Blood",
			"name": "Fiery Blood"
		},

		"Quiet_Strength": {
			"key": "Quiet_Strength",
			"name": "Quiet Strength"
		},

		"Fearsome_Blow": {
			"key": "Fearsome_Blow",
			"name": "Fearsome Blow"
		},

		"Perfectionist": {
			"key": "Perfectionist",
			"name": "Perfectionist"
		},

		"Pyrotechnics": {
			"key": "Pyrotechnics",
			"name": "Pyrotechnics"
		},

		"Capture": {
			"key": "Capture",
			"name": "Capture"
		},

		"Rallying_Cry": {
			"key": "Rallying_Cry",
			"name": "Rallying Cry"
		},

		"Divine_Retribution": {
			"key": "Divine_Retribution",
			"name": "Divine Retribution"
		},

		"Optimist": {
			"key": "Optimist",
			"name": "Optimist"
		},

		"Pride": {
			"key": "Pride",
			"name": "Pride"
		},

		"Nohr_Enmity": {
			"key": "Nohr_Enmity",
			"name": "Nohr Enmity"
		},

		"Triple_Threat": {
			"key": "Triple_Threat",
			"name": "Triple Threat"
		},

		"Competitive": {
			"key": "Competitive",
			"name": "Competitive"
		},

		"Shuriken_Mastery": {
			"key": "Shuriken_Mastery",
			"name": "Shuriken Mastery"
		},

		"Morbid_Celebration": {
			"key": "Morbid_Celebration",
			"name": "Morbid Celebration"
		},

		"Reciprocity": {
			"key": "Reciprocity",
			"name": "Reciprocity"
		},

		"Bushido": {
			"key": "Bushido",
			"name": "Bushido"
		},

		"In_Extremis": {
			"key": "In_Extremis",
			"name": "In Extremis"
		},

		"Perspicacious": {
			"key": "Perspicacious",
			"name": "Perspicacious"
		},

		"Draconic_Heir": {
			"key": "Draconic_Heir",
			"name": "Draconic Heir"
		},

		"Born_Steward": {
			"key": "Born_Steward",
			"name": "Born Steward"
		},

		"Perfect_Pitch": {
			"key": "Perfect_Pitch",
			"name": "Perfect Pitch"
		},

		"Mischievous": {
			"key": "Mischievous",
			"name": "Mischievous"
		},

		"Lucky_Charm": {
			"key": "Lucky_Charm",
			"name": "Lucky Charm"
		},

		"Noble_Cause": {
			"key": "Noble_Cause",
			"name": "Noble Cause"
		},

		"Optimistic": {
			"key": "Optimistic",
			"name": "Optimistic"
		},

		"Sweet_Tooth": {
			"key": "Sweet_Tooth",
			"name": "Sweet Tooth"
		},

		"Playthings": {
			"key": "Playthings",
			"name": "Playthings"
		},

		"Calm": {
			"key": "Calm",
			"name": "Calm"
		},

		"Haiku": {
			"key": "Haiku",
			"name": "Haiku"
		},

		"Prodigy": {
			"key": "Prodigy",
			"name": "Prodigy"
		},

		"Vendetta": {
			"key": "Vendetta",
			"name": "Vendetta"
		},

		"Lilys_Poise": {
			"key": "Lilys_Poise",
			"name": "Lily's Poise"
		},

		"Misfortunate": {
			"key": "Misfortunate",
			"name": "Misfortunate"
		},

		"Puissance": {
			"key": "Puissance",
			"name": "Puissance"
		},

		"Aching_Blood": {
			"key": "Aching_Blood",
			"name": "Aching Blood"
		},

		"Kidnap": {
			"key": "Kidnap",
			"name": "Kidnap"
		},

		"Countercurse": {
			"key": "Countercurse",
			"name": "Countercurse"
		},

		"Roses_Thorn": {
			"key": "Roses_Thorn",
			"name": "Rose's Thorn"
		},

		"Fierce_Rival": {
			"key": "Fierce_Rival",
			"name": "Fierce Rival"
		},

		"Opportunist": {
			"key": "Opportunist",
			"name": "Opportunist"
		},

		"Fancy_Footwork": {
			"key": "Fancy_Footwork",
			"name": "Fancy Footwork"
		},

		"Bloodthirst": {
			"key": "Bloodthirst",
			"name": "Bloodthirst"
		},

		"Fierce_Mien": {
			"key": "Fierce_Mien",
			"name": "Fierce Mien"
		},

		"Unmask": {
			"key": "Unmask",
			"name": "Unmask"
		},

		"Pragmatic": {
			"key": "Pragmatic",
			"name": "Pragmatic"
		},

		"Collector": {
			"key": "Collector",
			"name": "Collector"
		},

		"Chivalry": {
			"key": "Chivalry",
			"name": "Chivalry"
		},

		"Icy_Blood": {
			"key": "Icy_Blood",
			"name": "Icy Blood"
		},

		"Gallant": {
			"key": "Gallant",
			"name": "Gallant"
		},

		"Fierce_Counter": {
			"key": "Fierce_Counter",
			"name": "Fierce Counter"
		},

		"Guarded_Bravery": {
			"key": "Guarded_Bravery",
			"name": "Guarded Bravery"
		},

		"Goody_Basket": {
			"key": "Goody_Basket",
			"name": "Goody Basket"
		},

		"Fortunate_Son": {
			"key": "Fortunate_Son",
			"name": "Fortunate Son"
		},

		"Bibliophile": {
			"key": "Bibliophile",
			"name": "Bibliophile"
		},

		"Sisterhood": {
			"key": "Sisterhood",
			"name": "Sisterhood"
		},

		"Daydream": {
			"key": "Daydream",
			"name": "Daydream"
		},

		"Wind_Disciple": {
			"key": "Wind_Disciple",
			"name": "Wind Disciple"
		},

		"Make_a_Killing": {
			"key": "Make_a_Killing",
			"name": "Make a Killing"
		}

	};




	this.getAllSkills = function() {
		return angular.extend({}, classSkills, personalSkills);
	};

	this.getClassSkills = function() {
		return angular.copy(classSkills);
	};

	this.getPersonalSkills = function() {
		return angular.copy(personalSkills);
	};

});