(function () {
	var prisoner = angular.module('prisoner', ['ngRoute']);

	prisoner.controller('prisonerController', ['$http', '$log', '$scope',
            '$routeParams', function($http, $log, $scope, $routeParams) {
            $scope.name = 'prisonerController';
            $scope.$routeParams = $routeParams;
            this.data = {};
            this.send = function () {
                $http.post('/prisoner', this.data);
            };
	}]);
})();
