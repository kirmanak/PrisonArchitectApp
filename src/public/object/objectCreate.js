(function () {
    var object = angular.module('object', ['menu']);

    object.controller('objectController', function($http, $log) {
        var store = this;
        store.data = {};
        store.types = [];
        store.rooms = [];
        store.status = '';
        store.send = function() {
            store.status = 'Общаемся с сервером...';
            $http.post('/object', store.data).then(function () {
                store.status = 'Новый объект успешно добавлен';
            }, function (error) {
                if (error.status = 403) {
                    store.status = 'Вы не авторизованы';
                    $location.url = '/login';
                } else {
                    store.status = 'Что-то пошло не так...';
                    $log.error(error);
                }
            });
        };
        $http.get('/object/rooms').then(function (res) {
            store.rooms = res.data;
        }, function (error) {
            store.status = 'Что-то пошло не так...';
            $log.error(error);
        });

        $http.get('/object/types').then(function (res) {
            store.types = res.data;
        }, function (error) {
            store.status = 'Что-то пошло не так...';
            $log.error(error);
        });
    });
})();
