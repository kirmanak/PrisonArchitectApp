(function() {
    var app = angular.module('myApp', ['ngRoute', 'tables', 
        'prisoner', 'login', 'staff', 'menu']);

    app.controller('AppController', ['$scope', '$route', 
        '$routeParams', '$location', 
        function($scope, $route, $routeParams, $location) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.routeParams = $routeParams;
    }]);

    app.config(['$routeProvider', '$locationProvider', 
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'loginController',
                    controllerAs: 'login'
                })
                .when('/crud/prisoner', {
                    templateUrl: 'prisoner/prisoner.html',
                    controller: 'prisonerController',
                    controllerAs: 'prisoner'
                })
                .when('/', {
                    templateUrl: 'tables/tables.html',
                    controller: 'tablesController',
                    controllerAs: 'tables'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        }]);
}) ();
