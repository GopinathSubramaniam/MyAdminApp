/**
 * Created by Gopi on 10-07-2015.
 */
AdminApp.controller('ProfileCtrl', function($rootScope, $scope, $cookieStore, $timeout, $state, ngDialog, CusShopFactory, ShopAddFactory, CustService, AddressFactory, ShopDetailService, AddressService, Properties){
    'use strict';

    var profilBol = false;
    var profEditBol = false;
    var dialog = null;

    if($state.params.id!==null && $state.params.id!== undefined)
        profEditBol = true;
    else
        profilBol = true;

    $scope.loading = function(msgId, loadId){
        angular.element('#'+msgId).removeClass('hidden');
            angular.element('#'+loadId).addClass('hidden');
            $timeout(function(){
                angular.element('#'+msgId).addClass('hidden');
            }, 2000);
    }
    
    if(profilBol){
        CusShopFactory.findShopByCus({customerId: $cookieStore.get('customerId')}, function(res){
            $rootScope.custShops = res;
            $scope.customer = res[0].customer;
        });
    }

    if(profEditBol){
        ShopAddFactory.findByShopId({shopId: $state.params.id},function(res){
            if(res.length !== 0){
                $scope.shop = res[0].shopDetail;
                $rootScope.shopAndAdds = res;
            }else{
                ShopDetailService.findById($state.params.id).success(function(res){
                    $scope.shop = res;
                });
            }
        });
    }

    $scope.update = function(data){
        angular.element('#loading').removeClass('hidden');
        console.log('Update date =', data );
        CustService.update(data).success(function(res){
            $scope.msg = 'Detail updated successfully';
            $scope.loading('msg', 'loading');
        });
    }

    $scope.updateShopDetail = function(data){
        console.log('updateShopDetail = ', data);
         angular.element('#loading-edit').removeClass('hidden');
        ShopDetailService.update(data).success(function(res){
            $scope.shop = res;
            $scope.msgEdit = 'Updated successfully';
            $scope.loading('msg-edit', 'loading-edit');
        });
    }

    // Update shop address
    $scope.updateShopAdd = function(data){
        console.log('>>>> updateShopAdd >>>>'  );
        angular.element('#loading-add-edit').removeClass('hidden');
        AddressService.saveAndUpdate(data).success(function(res){
            ShopAddFactory.findByShopId({shopId: $state.params.id},function(res){
                $rootScope.shopAndAdds = res;
             });
            $scope.msgAdd = 'Updated successfully';
            $scope.loading('msg-add-edit', 'loading-add-edit');
        });
    }
    
    $scope.addNewShopPopup = function(){
        console.log('Add New Shop popup');
        dialog = ngDialog.open({ template: 'views/dashboard/new-shop-model.html', controller: 'ProfileCtrl', scope: $scope});
    }
    
    $scope.addNewShop = function(data){
        console.log('data = ', data);
        angular.element('#loading-add-shop').removeClass('hidden');
        var newShop = {customer: {email: $cookieStore.get('customerId')}, shopDetail: data};
        CusShopFactory.addNewShop(newShop, function(res){
            console.log('res = ', res);
            $rootScope.custShops.push(res);
            $scope.loading('msg-add-shop', 'loading-add-shop');
        
        });
    }

    $scope.openPopup = function(id){
        console.log('>>>>>>>> Address Id >>>>>>>>>', id);
        AddressFactory.findById({id: id}, function(res){
            console.log('REs >>> ' , res);
            $scope.address = res;
        });
       dialog = ngDialog.open({ template: 'views/dashboard/edit-address-model.html', controller: 'ProfileCtrl', scope: $scope });
    }
    
    $scope.closeThisDialog = function(){
        dialog.close();
    }

});
