(function () {
    const object = angular.module('object', []);

    object.controller('objectController', function($http, $log, $location) {
        const store = this;
        store.data = {};
        store.types = [];
        store.rooms = [];
        store.status = '';
        store.send = function() {
            store.status = 'Общаемся с сервером...';
            $http.post('/object', {
                thing_type_fk: store.data.thing_type_fk,
                room_fk: store.data.room_fk
            }).then(function () {
                store.status = 'Новый объект успешно добавлен';
                store.data = {};
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
