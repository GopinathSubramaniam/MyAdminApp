'use strict';

AdminApp.controller('AuthCtrl', ['$scope', '$position', '$location', '$cookieStore', 'AuthFactory', 'ShopAddFactory', 'AddressService',
                    function ($scope, $position, $location, $cookieStore, AuthFactory, ShopAddFactory, AddressService) {


    $scope.awesomeThings = ["Good", "Bad", "Ok"];
    AddressService.findDistinctCityAndState().success(function(res){
        $scope.cities = res;
        ShopAddFactory.findByCity({cityName: res[0]}, function (res) {
            $scope.shops = res;
            $scope.shop = res[0].id;
            ShopAddFactory.findByShopId({shopId: res[0].id}, function (resp) {
                $scope.shopBranches = resp;
                $scope.shopBranch = resp[0].address.id;
            });
        });
       $scope.city = res[0];
    });

    $scope.findByCity = function(val){
        console.log('Val >>> ', val);
        if (val !== undefined) {
            ShopAddFactory.findByCity({cityName: val}, function (res) {
                $scope.shops = res;
                $scope.shop = res[0].id;
                ShopAddFactory.findByShopId({shopId: res[0].id}, function (res) {
                    $scope.shopBranches = res;
                    $scope.shopBranch = res[0].address.id;
                });
            });
        }
    }

    $scope.findShopBranch = function (val) {
        ShopAddFactory.findByShopId({shopId: val}, function (res) {
            $scope.shopBranches = res;
            $scope.shopBranch = res[0].address.id;
        });
    };

    $scope.showShopDetail = function (shopAddId) {
        console.log('shopAddId = ', shopAddId);
    };

    $scope.doLogin = function (customer) {
        console.log('Credentials = ', customer, $scope.shopBranch, $scope.shop);
        doLogin(customer, $scope.shop, $scope.shopBranch);
    }

    $scope.doRegister = function (customer, shopDetail, address) {
        var customerVo = {};
        customerVo['customer'] = customer;
        customerVo['shopDetails'] = [shopDetail];
        customerVo['addresses'] = [address];

        console.log('customerVo >> ', customerVo);
        AuthFactory.doRegister(customerVo,
            function (res) {
                $scope.successMsg = 'Registration succeed!!. You can login now :) '
                alert('Registration succeed!!. You can login now :) ');
            }, function (error) {
                alert(' :) ');
            });
    }

    // ############################ FUNCTIONS ############################

    function doLogin(customer, shopId, shopAddId) {
        console.log('shopId = ', shopId, 'shopAddId = ', shopAddId);
        AuthFactory.doLogin({shopId: shopId, shopAddressId: shopAddId}, JSON.stringify(customer), function (res) {
            var resEmail = res.email;

            if (resEmail !== 'INVALID_CREDENTIALS' && resEmail !== 'INVALID_SHOP') {
                $cookieStore.put('customerId', res.id);
                $cookieStore.put('shopId', shopId);
                $cookieStore.put('shopAddId', shopAddId);

                window.location.href = "#/dashboard/home"
            } else {
                if (resEmail === 'INVALID_CREDENTIALS')
                    $scope.errorMsg = 'Invalid Username and Password';

                if (resEmail === 'INVALID_SHOP')
                    $scope.errorMsg = 'Select valid shop';

            }
        }, function () {
            $scope.errorMsg = 'SOMETHING WENT WRONG. TRY AGAIN LATER'
        });
    }

}]);
