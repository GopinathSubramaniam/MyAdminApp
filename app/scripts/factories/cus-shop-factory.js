/**
 * Created by Gopi on 07-05-2015.
 */

AdminApp.factory('CusShopFactory', function ($resource, Properties) {
    'use strict';

    return $resource(Properties.URL_CUS_SHOP + ':findShopByCus/:customerId/:newShop', {
        'customerId': '@customerId', shopDetail:'@shopDetail'
    }, {
        addNewShop: {
            method: 'POST',
            params: {'customerId': '@newShop.customerId', shopDetail:'@newShop.shopDetail'},
            isArray: false
        },
        findShopByCus: {
            method: 'GET',
            params: {findShopByCus: 'findShopByCus', 'customerId': '@customerId'},
            isArray: true
        }

    });

});