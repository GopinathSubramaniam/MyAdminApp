/**
 * Created by Gopi on 10-07-2015.
 */
AdminApp.controller('ProfileCtrl', function($scope, $cookieStore, $timeout, $state, CusShopFactory, ShopAddFactory, CustService, Properties){
    'use strict';

    var profilBol = false;
    var profEditBol = false;

    if($state.params.id!==null && $state.params.id!== undefined)
        profEditBol = true;
    else
        profilBol = true;

    if(profilBol){
        CusShopFactory.findShopByCus({customerId: $cookieStore.get('customerId')}, function(res){
            $scope.custShops = res;
            $scope.customer = res[0].customer;
        });
    }

    if(profEditBol){
        ShopAddFactory.findByShopId({shopId: $state.params.id},function(res){
            $scope.shop = res[0].shopDetail;
            $scope.shopAndAdds = res;
        });
    }

    $scope.update = function(data){
        console.log('Update date =', data );
        CustService.update(data).success(function(res){
            $scope.msg = 'Detail updated successfully';
            angular.element('#msg').removeClass('hidden');
            $timeout(function(){
                angular.element('#msg').addClass('hidden');
            }, 2000);
        });
    }

});
