(function () {
	var prisoner = angular.module('prisoner', []);

	prisoner.directive('prisoner', function () {
		return {
    		restrict: 'E',
    		templateUrl: 'prisoner/prisoner.html',
    		controller: 'prisonerController',
    		controllerAs: 'prisoner'
		};
	});

	prisoner.controller('prisonerController', ['$http', '$log', function($http, $log) {
            this.data = {};

            this.send = function () {
                $log.log(this.data);
                $http.post('/prisoner', this.data);
            };
	}]);
})();
