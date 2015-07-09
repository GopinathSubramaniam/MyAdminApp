/**
 * Created by Gopi on 07-07-2015.
 */
AdminApp.service('AddressService', function(Properties, $http){
    'use strict';
    return {
        findDistinctCityAndState: function(){
           return $http.get(Properties.URL_ADDRESS+'findDistinctCityAndState');

        },
        findRecentOrders: function(){
            return $http.get(Properties.URL_ORDER+'findRecentItems');
        }


    }
});