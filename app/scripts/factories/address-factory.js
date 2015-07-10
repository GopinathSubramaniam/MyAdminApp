/**
 * Created by Gopi on 07-07-2015.
 */
AdminApp.factory('AddressFactory', function($resource, Properties){
    return $resource(Properties.URL_ADDRESS+':findDistinctCityAndState/:id', {id: '@id'}, {

        findDistinctCityAndState: {
            method: 'GET',
            params:{findDistinctCityAndState:'findDistinctCityAndState'},
            isArray: true
        },
        findById: {
            method: 'GET',
            params:{id: '@id'},
            isArray: false
        }

    });


});
