/**
*
*Gopi
*/

AdminApp.controller('InboxCtrl',function(ngDialog, $rootScope, $scope, $cookieStore, $interval, InboxFactory, UserFactory){
    'use strict';
    
    $scope.activeTabs = [];
    var dialog = null;
    var shopId = parseInt($cookieStore.get('shopId'));
    var userId = 0;
    
    
    $scope.getMails = function(sId){
        InboxFactory.getMails({uId: 0, sId: sId}, function(data){
            $scope.mails = data;
        });
    }
    
    $scope.sendMail = function(data){
        data['userId'] = $scope.selectedUserId;
        data['shopId'] = shopId;
        InboxFactory.sendMail(data, function(res){
            $scope.mails = res;
        });
    
    }
    
    $scope.getMails(shopId);
    
    $scope.searchUser = function(searchParam){
        if(searchParam.length > 2 ){
            angular.element('#users_list').addClass('show');
            UserFactory.getUsersByParam({param:searchParam}, function(data){
                $scope.users = data;
                console.log('getUsersByParam = ', data);
            });
        }else{
            angular.element('#users_list').removeClass('show');
        }
        
    }

    $scope.selectUser = function(user){
        console.log('Selected User = ', user);
        $scope.selectedUserId = user.id;
        $scope.mail.to = user.name;
        angular.element('#users_list').removeClass('show');
    }
    
    $interval(function(){
        //$scope.sendMail();
    }, 10000);
    
    
    
    $scope.showComposeMail = function(){
        dialog = ngDialog.open({ template: 'views/dashboard/compose-mail-model.html', 
                                controller: 'InboxCtrl', scope: $scope});
    }
    
    $scope.closeComposeMail = function(){
        dialog.close();
    }
    
   

    //check if the tab is active
    $scope.isOpenTab = function (tab) {
        console.log('isOpenTab = ', tab);
        if ($scope.activeTabs.indexOf(tab) > -1) {
            return true;
        } else {
            return false;
        }
    }

    //function to 'open' a tab
    $scope.openTab = function (tab) {
        console.log('openTab = ', tab);
        if ($scope.isOpenTab(tab)) {
            $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
        } else {
            $scope.activeTabs.push(tab);
        }
    }
    
});