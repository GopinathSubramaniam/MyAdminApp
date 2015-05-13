'use strict';

AdminApp.controller('DashBoardCtrl', function ($scope, $position, $state, $cookieStore, DashBoardFactory) {

    console.log('$state = ', $state.params.status);
    $scope.urlParam = $state.params.status;
    if ($state.params.status !== undefined) {
        findRecentItems($state.params.status, $cookieStore.get('shopAddId'));
    } else {
        DashBoardFactory.findItemsCount({shopAddId: $cookieStore.get('shopAddId')},function (res) {
            $scope.recentItems = res;
            console.log('Res >> ', res);
        });
    }

    $scope.selectAction = function (status) {
        var checkedIds = [];
        console.log('accept called', $scope.recentItems);
        var inputElements = document.getElementsByClassName('checkbox');
        for (var i = 0; inputElements[i]; ++i) {
            console.log('checked >> ', inputElements[i].checked);
            if (inputElements[i].checked) {
                if (inputElements[i].id !== 'undefined')
                    checkedIds.push(inputElements[i].id);
            }
        }
        console.log(' checkedIds >> ', checkedIds);
        DashBoardFactory.updateOrders({orderStatus: status}, JSON.stringify(checkedIds), function (res) {
            findRecentItems($state.params.status, $cookieStore.get('shopAddId'));
        });
        console.log('angular selected >>> ', checkedIds, ' = ', $state.params.status);
    }

    $scope.activeTabs = [];

    //check if the tab is active
    $scope.isOpenTab = function (tab) {
        //check if this tab is already in the activeTabs array
        if ($scope.activeTabs.indexOf(tab) > -1) {
            //if so, return true
            return true;
        } else {
            //if not, return false
            return false;
        }
    }

    //function to 'open' a tab
    $scope.openTab = function (tab) {
        //check if tab is already open
        if ($scope.isOpenTab(tab)) {
            //if it is, remove it from the activeTabs array
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            //if it's not, add it!
            $scope.activeTabs.push(tab);
        }
    }

    function findRecentItems(status, shopAddId) {
        DashBoardFactory.findByStatus({status: status, shopAddId: shopAddId}, function (res) {
            $scope.recentItems = res;
        })
    }

});
