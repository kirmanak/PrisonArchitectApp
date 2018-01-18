(function () {
    const staff = angular.module('staff', []);

    staff.controller('staffController', function($http, $log, $location) {
        const store = this;
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
	        $http.post('/staff', {
	            fullname:
                    store.data.surname + ' ' +
                    store.data.name + ' ' +
                    store.data.patronymic,
                appointment_fk: store.data.appointment_fk,
                office_fk: store.data.office_fk
            }).then(function () {
	            store.status = 'Новый сотрудник успешно добавлен';
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
