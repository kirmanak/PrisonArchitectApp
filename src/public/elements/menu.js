(function() {
    const menu = angular.module('menu', ['login', 'ngMaterial', 'ngRoute']);

    menu.directive('menu', function() {
        return {
            restrict: 'E',
    	    templateUrl: 'elements/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
        };
    });

    menu.controller('MenuController', function ($http, $rootScope, $scope, $location) {
        const store = this;
        $rootScope.isLoggedIn = false;
        $scope.currentPage = 'tables';
        store.logout = function() {
            $http.get('/logout').then(function() {},
                function () {
                store.check();
                $location.url('/');
                $scope.currentPage = 'tables';
            });
        };
        store.check = function() {
            $http.get('/loggedin').then(function () {
                $rootScope.isLoggedIn = true;
            }, function () {
                $rootScope.isLoggedIn = false;
            });
        };

        store.check();
        $rootScope.$on('login', store.check);
    });
}) ();
