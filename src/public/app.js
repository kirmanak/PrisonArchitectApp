(function() {
    var app = angular.module('myApp', ['ngRoute', 'tables', 
        'prisoner', 'login', 'staff', 'menu', 'object', 'prisonerSearch']);

    app.controller('AppController',
        function() {
    });

    app.config(function ($routeProvider, $locationProvider) {
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
                .when('/crud/prisoner/search', {
                    templateUrl: 'prisoner/search.html',
                    controller: 'prisonerSearchController',
                    controllerAs: 'search'
                })
                .when('/crud/staff', {
                    templateUrl: 'staff/staff.html',
                    controller: 'staffController',
                    controllerAs: 'staff'
                })
                .when('/crud/object', {
                    templateUrl: 'object/object.html',
                    controller: 'objectController',
                    controllerAs: 'object'
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
        });
}) ();
