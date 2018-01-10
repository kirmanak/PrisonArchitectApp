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
                    controller: 'loginController'
                })
                .when('/', {
                    templateUrl: 'tables/tables.html',
                    controller: 'tablesController'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        }]);
}) ();
