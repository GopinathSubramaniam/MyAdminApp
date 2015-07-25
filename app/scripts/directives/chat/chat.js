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
            controller: function($scope, $stompie, $window, $interval, $cookieStore, Properties, AuthFactory, ChatService){
                $scope.onlineStatus = $cookieStore.get('customer');
                $scope.createChatTemplete = function(userName, msg){
                    return '<span class="chat-img pull-left">'+
                                '<img src="../../../images/default-user.png" alt="User Avatar" class="img-circle">'+
                                '</span><div class="chat-body clearfix" ><div class="header">'+
                                '<strong class="primary-font">'+userName+'</strong>'+
                                '<small class="pull-right text-muted"><i class="fa fa-clock-o fa-fw"></i> 12 mins ago </small></div>'+
                                '<p >'+msg +' </p></div>';
                };
               
                $scope.onlineCustomersCount = function(){
                    ChatService.getOnlineCustomers().success(function(res){
                            $scope.onlineUserCount = res.length;
                    });
                };
                
                $scope.onlineCustomersCount();
                $interval(function(){
                    $scope.onlineCustomersCount();
                }, 10000);
                
                $stompie.using('http://localhost:8080/service', function (frame) {
                    $stompie.subscribe('/startChat/greetings', function (data, headers, res) {
                        $scope.onlineCustomersCount();
                        angular.element('#chat').append($scope.createChatTemplete(data.name, data.msg));
                    });
                });
                
                $scope.sendMsg = function(){
                    var userName = $cookieStore.get('customer').customer.name;
                    var msg = angular.element('.chatMsg').val();
                    angular.element('.chatMsg').val('');
                    $stompie.send('/courier/service', {msg: msg, name: userName});
                };

                $scope.disconnect = function(){
                     $stompie.disconnect(function (data) {});
                };
                
                $window.onbeforeunload = function(){
                     $stompie.disconnect(function (data) {});
                };
                
            }
    	}
	});



