/**
 * Created by Gopi on 07-05-2015.
 */

AdminApp.factory('AuthFactory', function ($resource, Properties) {
    'use strict';

    return $resource(Properties.URL_CUSTOMER + ':auth/:shopId/:shopAddressId/:logout/:customerId', {
        customerVo: '@customerVo',
        shopId: '@shopId',
        shopAddressId: '@shopAddressId',
        customerId: '@customerId'
    }, {
        doRegister: {
            method: 'POST',
            params: {customerVo: '@customerVo'},
            isArray: false
        },
        doLogin: {
            method: 'POST',
            params: {'auth': 'auth', user: '@user', shopId: '@shopId', shopAddressId: '@shopAddressId'},
            isArray: false
        },
        doLogout: {
            method: 'GET',
            params: {logout: 'logout', customerId: '@customerId'},
            isArray: false
        
        }

    });

});