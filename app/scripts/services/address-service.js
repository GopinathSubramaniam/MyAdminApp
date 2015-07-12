/**
 * Created by Gopi on 07-07-2015.
 */
AdminApp.service('AddressService', function(Properties, $http){
    'use strict';
    return {
        findDistinctCityAndState: function(){
           return $http.get(Properties.URL_ADDRESS+'findDistinctCityAndState');

        },
        findRecentOrders: function(shopId){
            return $http.get(Properties.URL_ORDER+'findRecentItems/'+shopId);
        },
        saveAndUpdate: function(data){
            return $http.post(Properties.URL_ADDRESS, data);
        }


    }
});