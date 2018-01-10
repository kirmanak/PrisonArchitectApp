(function () {
	var login = angular.module('login', ['ngRoute', 'menu']);

	login.controller('loginController', ['$scope', '$routeParams', 
            function($scope, $routeParams) {
                $scope.name = 'loginController';
                $scope.$routeParams = $routeParams;
	}]);
})();
