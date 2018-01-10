(function () {
	var login = angular.module('login', ['ngRoute']);

	login.controller('loginController', ['$scope', '$routeParams', 
            function($scope, $routeParams) {
                $scope.name = 'loginController';
                $scope.$routeParams = $routeParams;
	}]);
})();
