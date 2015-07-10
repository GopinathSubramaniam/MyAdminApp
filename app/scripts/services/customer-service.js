AdminApp.service('CustService', function($http, Properties){
'use strict';

    return {
        update: function(data){
           return $http.put(Properties.URL_CUSTOMER, data);

        }
    }


});
