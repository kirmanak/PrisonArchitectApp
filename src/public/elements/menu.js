(function() {
    var menu = angular.module('menu', []);

    menu.directive('menu', function() {
        return {
            restrict: 'E',
    	    templateUrl: 'elements/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
        };
    });

    menu.controller('MenuController', [function () {

    }]);
}) ();
