app.controller('coreCtrl', ['$scope', 'dataService',
	function($scope, dataService) {

		dataService.getCharacterData()
			.then(function(res) {
				console.log(res);
			});

	}
]);