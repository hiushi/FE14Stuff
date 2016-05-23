var app = angular.module('FE14Stuff', ['ngSanitize'])
	.config(['$compileProvider', 
		function($compileProvider) {
			$compileProvider.debugInfoEnabled(false);
		}
	])
	.run(['$rootScope',
		function($rootScope) {

		}
	]);