(function() {
    const menu = angular.module('menu', ['login', 'ngMaterial', 'ngRoute', 'ngMessages']);

    menu.directive('menu', function() {
        return {
            restrict: 'E',
    	    templateUrl: 'elements/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
        };
    });

    menu.controller('MenuController', function ($http, $rootScope) {
        const store = this;
        $rootScope.isLoggedIn = false;
        store.logout = function() {
            $http.get('/logout').then(function() {},
                function () {
                store.check();
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
