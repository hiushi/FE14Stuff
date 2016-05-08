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