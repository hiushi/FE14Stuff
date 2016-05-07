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