/**
 * Created by Gopi on 25-04-2015.
 */

AdminApp.factory('ShopAddFactory', ['$resource', 'Properties', function ($resource, Properties) {
    'use strict';

    return $resource(Properties.URL_SHOP_ADDRESS + ':findByCity/:cityName/:findByShopId/:shopId', {
        cityName: '@cityName',
        shopId: '@shopId'
    }, {
        findByCity: {
            method: 'GET',
            params: {findByCity: 'findByCity', cityName: '@cityName'},
            isArray: true
        },
        findByShopId: {
            method: 'GET',
            params: {findByShopId: 'findByShopId', shopId: '@shopId'},
            isArray: true
        }

    });

}]);