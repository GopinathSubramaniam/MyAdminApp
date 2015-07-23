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
            controller: function($scope, $stompie, $window, $interval, Properties, ChatService){
                
                $stompie.using('http://localhost:8080/service', function (frame) {
                   
                    $scope.getOnlineUsersCount('CHAT', 'CONNECTED', 'NEW');
                    $interval(function(){
                         $scope.getOnlineUsersCount('CHAT', 'CONNECTED', 'CHECK');
                    }, 10000);
                    $stompie.subscribe('/startChat/greetings', function (data, headers, res) {
                        console.log('Message received = ', data, headers, res);
                        angular.element('#chat').append(data.name +': '+data.msg+'<br/>');
                    });
                });
                
                $scope.sendMsg = function(){
                    var userName =  Properties.getFromLocalDB('userName');
                    var msg = angular.element('.chatMsg').val();
                    angular.element('.chatMsg').val('');
                    $stompie.send('/courier/service', {msg: msg, name: userName});
                };
            
                $scope.disconnect = function(){
                    $stompie.disconnect(function (data) {
                        $scope.getOnlineUsersCount('CHAT', 'DISCONNECTED', 'CLOSE');
                    });
                };
                
                $window.onbeforeunload = function(event){
                    $scope.disconnect();
                    
                    return confirm("Confirm refresh");
                };
                
                $scope.getOnlineUsersCount = function(type, connection, connType){
                    ChatService.getOnlineUsersCount(type, connection, connType).success(function(resp){
                            $scope.onlineUserCount = resp;
                        }).error(function(){
                            $scope.onlineUserCount = 0;
                        });
                };

            }
    	}
	});



