/**
 * Created by Gopi on 10-07-2015.
 */
AdminApp.controller('ProfileCtrl', function($scope, $cookieStore, CusShopFactory){
    'use strict';
    $scope.custShops = [];
    CusShopFactory.findShopByCus({customerId: $cookieStore.get('customerId')}, function(res){
        $scope.custShops = res;
    });

});