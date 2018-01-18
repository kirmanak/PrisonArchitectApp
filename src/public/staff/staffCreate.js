(function () {
	var staff = angular.module('staff', ['menu']);

	staff.controller('staffController', function($http, $log) {
	    var store = this;
	    store.data = {};
	    store.appointments = [];
        store.offices = [];
	    store.status = '';
	    store.send = function() {
            store.data.fullName =
                store.data.surname + ' ' +
                store.data.name + ' ' +
                store.data.patronymic;
	        store.status = 'Общаемся с сервером...';
	        $http.post('/staff', store.data).then(function () {
	            store.status = 'Новый сотрудник успешно добавлен';
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
        $http.get('/staff/offices').then(function (res) {
            store.offices = res.data;
        }, function (error) {
            store.status = 'Что-то пошло не так...';
            $log.error(error);
        });

	    $http.get('/staff/appointments').then(function (res) {
	        store.appointments = res.data;
        }, function (error) {
            store.status = 'Что-то пошло не так...';
            $log.error(error);
        });
	});
})();
