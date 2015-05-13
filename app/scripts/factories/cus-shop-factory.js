/**
 * Created by Gopi on 07-05-2015.
 */

AdminApp.factory('CusShopFactory', function ($resource, Properties) {
    'use strict';

    return $resource(Properties.URL_CUS_SHOP + ':findShopByCus/:customerId', {
        'customerId': '@customerId'
    }, {

        findShopByCus: {
            method: 'GET',
            params: {findShopByCus: 'findShopByCus', 'customerId': '@customerId'},
            isArray: true
        }

    });

});