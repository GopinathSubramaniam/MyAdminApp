'use strict';

AdminApp.controller('AuthCtrl', function ($scope, $position, $location, $cookieStore, AuthFactory, ShopAddFactory) {


    $scope.$watch('location', function (val) {
        console.log('Location >> ', val);
        if (val !== undefined) {
            ShopAddFactory.findByCity({cityName: val}, function (res) {
                console.log('Res >>> ', res);
                $scope.shops = res;
            });
        }
    });

    $scope.findShopBranch = function () {
        console.log('shopName = ', angular.element('#shop').val());
        ShopAddFactory.findByShopId({shopId: angular.element('#shop').val()}, function (res) {
            console.log('Res = ', res);
            $scope.shopBranches = res;

        });
    };

    $scope.showShopDetail = function (shopAddId) {
        console.log('shopAddId = ', shopAddId);

    };

    $scope.doLogin = function (customer) {
        console.log('Credentials = ', customer);
        doLogin(customer, angular.element('#shop').val(), angular.element('#shopBranch').val());
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

});
