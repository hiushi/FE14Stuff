app.controller('navCtrl', ['$rootScope', '$scope',
	function($rootScope, $scope) {

		var vm = this;

		$rootScope.activeState = 'buildPlanner';

		$rootScope.changeState = function(stateName) {
			$rootScope.activeState = stateName;
		};
	}
]);