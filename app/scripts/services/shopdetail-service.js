AdminApp.service('ShopDetailService', function($http, Properties){
'use strict';

    return {
        update: function(data){
           return $http.post(Properties.URL_SHOP_DETAIL, data);
        },
        findById: function(id){
             return $http.get(Properties.URL_SHOP_DETAIL+id);
        }
    }


});
