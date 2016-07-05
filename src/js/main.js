var app = angular.module('FE14Stuff', 
	['ngSanitize', 'ngAnimate', 'ui.bootstrap', 'LocalStorageModule'])
	.config(['$compileProvider', 
		function($compileProvider) {
			$compileProvider.debugInfoEnabled(false);
		}
	])
	.run(['$rootScope',
		function($rootScope) {

			try {
				var queryString = window.location.search.slice(1);
				if (queryString) {
					var params = queryString.split('&');
					$rootScope.paramMaps = {};
					params.forEach(function(param) {
						var parsed = param.split('=');
						$rootScope.paramMaps[parsed[0]] = parsed[1];
					});
				}	
			} catch(err) {
				console.log(err);
			}

		}
	]);