/**
 * Created by Gopi on 07-07-2015.
 */
AdminApp.factory('AddressFactory', function($resource, Properties){
    return $resource(Properties.URL_ADDRESS+'findDistinctCityAndState', {}, {

        findDistinctCityAndState: {
            method: 'GET',
            params:{},
            isArray: true
        }

    });


});