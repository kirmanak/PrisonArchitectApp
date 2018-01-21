(function() {
    const queue = angular.module('queue', ['ui-notification']);

    queue.directive('queue', function() {
        return {
            restrict: 'E',
            templateUrl: 'elements/queue.html',
            controller: 'queueController',
            controllerAs: 'queue'
        };
    });

    queue.controller('queueController', function ($scope, Notification, $location) {
        // noinspection ES6ModulesDependencies
        const client = Stomp.client('ws://' + $location.host() + ':15674/stomp/websocket');
        client.connect('guest', 'guest', function() {
            client.subscribe('/exchange/staffEx', function (message) {
                Notification.warning({
                    message: message.body,
                    delay: 3000
                });
            });
        });
    });
}) ();
