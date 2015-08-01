AdminApp.factory('InboxFactory', function($resource, Properties){

    return $resource(Properties.URL_BASE+'inbox/:findByUserIdOrShopId/:uId/:sId', 
        {
            uId: '@uId', 
            sId: '@sId'
        }, {
        
        sendMail: {
            method: 'post',
            params: {inbox: '@inbox', mail:'@mail'},
            isArray: true
        },
        getMails: {
            method: 'get',
            params: {findByUserIdOrShopId: 'findByUserIdOrShopId', uId: '@uId', sId: '@sId'},
            isArray: true
        }
    });


});