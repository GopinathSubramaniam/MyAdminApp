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
        controller: function ($cookieStore, $scope, $location, $interval, AddressService, AuthFactory) {
            $scope.doLogout = function () {
                var customerId = $cookieStore.get('customerId');
                AuthFactory.doLogout({customerId: customerId}, function(res){
                    $cookieStore.remove('customerId');
                    $cookieStore.remove('shopId');
                    $cookieStore.remove('shopAddId');
                    if(res.onlineStatus === 'OFFLINE') window.location.href="/";
                });
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


