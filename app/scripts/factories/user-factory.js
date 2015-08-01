AdminApp.factory('UserFactory', function($resource, Properties){
'use strict';
    
    return $resource(Properties.URL_BASE+'user/:findByEmailOrNameLike/:param', {
        param:'@param'
    }, 
    {
        getUsersByParam : {
            method: 'get',
            params:{ findByEmailOrNameLike: 'findByEmailOrNameLike', param:'@param' },
            isArray: true
        
        }
    
    
    });




});