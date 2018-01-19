(function() {
    const app = angular.module('myApp', ['ngRoute', 'tables',
        'prisoner', 'prisonerSearch', 'login', 'staff', 'staffSearch',
        'objectSearch', 'room', 'roomSearch', 'menu', 'object', 'queue']);

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
                .when('/crud/prisoner/create', {
                    templateUrl: 'prisoner/prisonerCreate.html',
                    controller: 'prisonerController',
                    controllerAs: 'prisoner'
                })
                .when('/crud/prisoner/search', {
                    templateUrl: 'prisoner/prisonerSearch.html',
                    controller: 'prisonerSearchController',
                    controllerAs: 'search'
                })
                .when('/crud/staff/create', {
                    templateUrl: 'staff/staffCreate.html',
                    controller: 'staffController',
                    controllerAs: 'staff'
                })
                .when('/crud/staff/search', {
                    templateUrl: 'staff/staffSearch.html',
                    controller: 'staffSearchCtrl',
                    controllerAs: 'staff'
                })
                .when('/crud/object/create', {
                    templateUrl: 'object/objectCreate.html',
                    controller: 'objectController',
                    controllerAs: 'object'
                })
                .when('/crud/object/search', {
                    templateUrl: 'object/objectSearch.html',
                    controller: 'objectSearchCtrl',
                    controllerAs: 'object'
                })
                .when('/crud/room/create', {
                    templateUrl: 'room/roomCreate.html',
                    controller: 'roomCreate',
                    controllerAs: 'room'
                })
                .when('/crud/room/search', {
                    templateUrl: 'room/roomSearch.html',
                    controller: 'roomSearchCtrl',
                    controllerAs: 'room'
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
