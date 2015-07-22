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
        controller: function ($cookieStore, $scope, $location, $interval, AddressService) {
            $scope.doLogout = function () {
                console.log('user Id = ', $cookieStore.get('userId'));
                $cookieStore.remove('userId');
                window.location.href="/";
            }

            $scope.getRecentOrderCount = function(){
                AddressService.getRecentOrderCount($cookieStore.get('shopId')).success(function(res){
                    $scope.pendingOrderCount = res.pendingCount;
                });
            }

            $scope.getRecentOrderCount();
            $interval(function(){
                $scope.getRecentOrderCount();
            }, 10000);


        }
    }
});


