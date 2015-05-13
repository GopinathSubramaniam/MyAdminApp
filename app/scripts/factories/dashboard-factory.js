/**
 * Created by Gopi on 08-05-2015.
 */
AdminApp.factory('DashBoardFactory', function ($resource, Properties) {

    return $resource(Properties.URL_ORDER + ':findRecent/:sort/:contactStatus/:findByStatus/:status/:findItemsCount/:shopAddId/:updateOrders/:orderStatus', {
            sort: '@sort',
            contactStatus: '@contactStatus',
            status: '@status',
            shopAddId: '@shopAddId',
            orderStatus: '@orderStatus',
            checkedIds: '@checkedIds'
        },
        {
            findRecent: {
                method: 'GET',
                params: {
                    findRecent: 'findRecent',
                    sort: '@sort',
                    contactStatus: '@contactStatus'
                },
                isArray: false

            },
            findByStatus: {
                method: 'GET',
                params: {findByStatus: 'findByStatus', status: '@status'},
                isArray: true
            },
            findItemsCount: {
                method: 'GET',
                params: {findItemsCount: 'findItemsCount', 'shopAddId': '@shopAddId'},
                isArray: false
            },
            updateOrders: {
                method: 'POST',
                params: {updateOrders: 'updateOrders', orderStatus: '@orderStatus', checkedIds: '@checkedIds.val'},
                isArray: true
            }
        });
});