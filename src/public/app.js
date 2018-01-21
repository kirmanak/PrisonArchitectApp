(function() {
    const app = angular.module('myApp', ['ngRoute', 'tables', 'prisoner', 'login', 'staff', 'contraband',
        'room', 'menu', 'object', 'queue', 'ngMaterial', 'ngMessages', 'md.data.table']);

    app.controller('AppController', function() {});

    app.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'loginController',
                    controllerAs: 'login'
                })
                .when('/crud/prisoner', {
                    templateUrl: 'prisoner/prisoner.html',
                    controller: 'prisonerCtrl',
                    controllerAs: 'pris'
                })
                .when('/crud/object', {
                    templateUrl: 'object/object.html',
                    controller: 'objectController',
                    controllerAs: 'obj'
                })
                .when('/crud/room', {
                    templateUrl: 'room/room.html',
                    controller: 'roomCtrl',
                    controllerAs: 'r'
                })
                .when('/crud/contraband', {
                    templateUrl: 'contraband/contraband.html',
                    controller: 'contrabandCtrl',
                    controllerAs: 'contr'
                })
                .when('/crud/staff', {
                    templateUrl: 'staff/staff.html',
                    controller: 'staffCtrl',
                    controllerAs: 'staff'
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
