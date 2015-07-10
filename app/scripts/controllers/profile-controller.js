/**
 * Created by Gopi on 10-07-2015.
 */
AdminApp.controller('ProfileCtrl', function($scope, $cookieStore, $timeout, $state, ngDialog, CusShopFactory, ShopAddFactory, CustService, AddressFactory, Properties){
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
        angular.element('#loading').removeClass('hidden');
        console.log('Update date =', data );
        CustService.update(data).success(function(res){
            $scope.msg = 'Detail updated successfully';
            angular.element('#msg').removeClass('hidden');
            angular.element('#loading').addClass('hidden');
            $timeout(function(){
                angular.element('#msg').addClass('hidden');
            }, 2000);
        });
    }

    $scope.updateShopDetail = function(data){
        console.log('updateShopDetail = ', data);

    }

    // Update shop address
    $scope.updateShopAdd = function(data){
        console.log('>>>> updateShopAdd >>>>'  );
    }

    $scope.openPopup = function(id){
        console.log('>>>>>>>> Address Id >>>>>>>>>', id);
        AddressFactory.findById({id: id}, function(res){
            console.log('REs >>> ' , res);
            $scope.address = res;
        });
       ngDialog.open({ template: 'views/dashboard/model-content.html', controller: 'ProfileCtrl', scope: $scope });
    }

});
