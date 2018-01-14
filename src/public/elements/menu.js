(function() {
    var menu = angular.module('menu', ['login']);

    menu.directive('menu', function() {
        return {
            restrict: 'E',
    	    templateUrl: 'elements/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
        };
    });

    menu.controller('MenuController', function ($http, $rootScope) {
        var store = this;
        $rootScope.isLoggedIn = false;
        store.logout = function() {
            $http.get('/logout').then(function(res) {
                console.log(res);
            }, function () {
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
