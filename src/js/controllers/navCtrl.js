app.controller('navCtrl', ['$rootScope', '$scope',
	function($rootScope, $scope) {

		var vm = this;


		if ($rootScope.paramMaps && $rootScope.paramMaps.state) {
			$rootScope.activeState = $rootScope.paramMaps.state;
		}
		else $rootScope.activeState = 'buildPlanner';

		$rootScope.changeState = function(stateName) {
			$rootScope.activeState = stateName;
		};
	}
]);