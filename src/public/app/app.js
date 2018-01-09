(function() {
    var app = angular.module('myApp', ['tables', 'prisoner', 'login', 'staff']);

    app.directive('app', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/app.html',
            controller: 'AppController',
            controllerAs: 'app'
        };
    });

    app.controller('AppController', [function() {
        this.page = 0;
        this.login = false;

        this.setPage = function(newPage) {
            this.page = newPage;
        };

        this.isSet = function(num) {
            return this.page === num;
        };

        this.isLogin = function() {
            return this.login;
        };

        this.toggleLogin = function () {
            this.login = !this.login;
        };
    }]);
}) ();
