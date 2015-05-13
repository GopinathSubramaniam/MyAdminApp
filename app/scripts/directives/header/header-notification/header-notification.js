'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
AdminApp.directive('headerNotification', function () {
    return {
        templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
        controller: function ($cookieStore, $scope, $location) {
            $scope.doLogout = function () {
                console.log('user Id = ', $cookieStore.get('userId'));
                $cookieStore.remove('userId');

                window.location.href="/";
            }
        }
    }
});


