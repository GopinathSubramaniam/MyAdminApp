AdminApp.service('ChatService', function($http, Properties){
    'use strict';
    
    return {
        getOnlineUsersCount: function(type, connection, connType){
            return $http.get(Properties.CHAT_GET_ONLINE_USERS_COUNT+type+'/'+connection+'/'+connType);
        
        }
    
    
    }


});