var app = angular.module('FE14Stuff', [])
	.config(['$compileProvider', 
		function($compileProvider) {
			$compileProvider.debugInfoEnabled(false);
		}
	])
	.run(['$rootScope',
		function($rootScope) {

		}
	]);
app.controller('coreCtrl', ['$scope', 'dataService',
	function($scope, dataService) {

		dataService.getCharacterData()
			.then(function(res) {
				console.log(res);
			});

	}
]);
app.service('dataService', ['$http', 
	function($http) {

		this.getCharacterData = function() {
			return $http.get('assets/characters.json');
		};

	}
])