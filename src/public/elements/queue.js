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

    queue.controller('queueController', function ($scope, Notification, $location, $log) {
        // noinspection ES6ModulesDependencies
        const client = Stomp.client('ws://' + $location.host() + ':15674/stomp/websocket');
        client.heartbeat.incoming = 0;
        client.connect('guest', 'guest', function() {
            client.subscribe('/exchange/staffEx', function (message) {
                Notification.warning({
                    message: message.body,
                    delay: 3000
                });
            }, function(error) {
                Notification.error({
                    message: 'RabbitMQ отвалился',
                    delay: 3000
                });
                $log.error(error);
            });
        });
    });
}) ();
