app.service('dataService', ['$http', 
	function($http) {

		this.getCharacterData = function() {
			return $http.get('assets/characters.json');
		};

	}
])