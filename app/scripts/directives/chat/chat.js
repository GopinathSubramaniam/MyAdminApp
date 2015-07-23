'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
AdminApp.directive('chat',function(){
		return {
            templateUrl:'scripts/directives/chat/chat.html',
            restrict: 'E',
            replace: true,
            controller: function($scope, $stompie, $window, $interval, Properties){
                
                $stompie.using('http://localhost:8080/service', function (frame) {
                    
                    var onUsrCount = Properties.getFromLocalDB('onlineUserCount');
                    
                    if( onUsrCount < 1 ){
                        Properties.saveInLocalDB('onlineUserCount', 1);
                    }else{
                        onUsrCount = parseInt(onUsrCount)+1;
                        Properties.saveInLocalDB('onlineUserCount', onUsrCount);
                    }
                    
                    $scope.onlineUserCount = parseInt(Properties.getFromLocalDB('onlineUserCount'));
                    $interval(function(){
                         $scope.onlineUserCount = parseInt(Properties.getFromLocalDB('onlineUserCount'));
                    }, 10000);
                    var subscription = $stompie.subscribe('/startChat/greetings', function (data, headers, res) {
                        console.log('Message received = ', data, headers, res);
                        $scope.msgs.push(data);
                    });
                });
                
                $scope.send = function(){
                    var name = document.getElementById('name').value;
                    $stompie.send('/courier/service', {name: name});
                };
            
                $scope.disconnect = function(){
                    $stompie.disconnect(function (data) {
                        var onlineUserCount = parseInt(Properties.getFromLocalDB('onlineUserCount'))-1;
                        Properties.saveInLocalDB('onlineUserCount', onlineUserCount);
                    });
                };
                
                $window.onbeforeunload = function(event){
                    $scope.disconnect();
                    
                    return confirm("Confirm refresh");
                };

            }
    	}
	});



