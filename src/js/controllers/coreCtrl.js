app.controller('coreCtrl', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {

		var vm = this;





		$rootScope.formatSkillName = function(skillKey) {
			if (!skillKey) return;
			return skillKey.replace(/\+/g, '');
		};


	}
]);