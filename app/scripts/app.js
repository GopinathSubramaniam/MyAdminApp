'use strict';
/**
 * @ngdoc overview
 * @name AdminApp
 * @description
 * # AdminApp
 *
 * Main module of the application.
 */

var AdminApp = angular.module('AdminApp', ['oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'ngResource', 'ngCookies', 'ngTable', 'ngDialog', 'stompie']);

AdminApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'AdminApp',
                            files: [
                                'scripts/directives/header/header.js',
                                'scripts/directives/header/header-notification/header-notification.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                            ]
                        }),
                        $ocLazyLoad.load(
                            {
                                name: 'toggle-switch',
                                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngAnimate',
                                files: ['bower_components/angular-animate/angular-animate.js']
                            })
                    $ocLazyLoad.load(
                        {
                            name: 'ngSanitize',
                            files: ['bower_components/angular-sanitize/angular-sanitize.js']
                        })
                    $ocLazyLoad.load(
                        {
                            name: 'ngTouch',
                            files: ['bower_components/angular-touch/angular-touch.js']
                        })
                }
            }
        })
        .state('rootLogin', {
            templateUrl: 'views/pages/login.html',
            url: '/',
            controller: 'AuthCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'bower_components/angular-cookies/angular-cookies.js',
                            'scripts/factories/shop-address-factory.js',
                            'scripts/factories/cus-shop-factory.js',
                            'scripts/factories/auth-factory.js',
                            'scripts/services/address-service.js',
                            'scripts/controllers/auth-controller.js'
                        ]
                    })
                }
            }
        })
        .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login',
            controller: 'AuthCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'bower_components/angular-cookies/angular-cookies.js',
                            'scripts/factories/shop-address-factory.js',
                            'scripts/factories/cus-shop-factory.js',
                            'scripts/factories/auth-factory.js',
                            'scripts/services/address-service.js',
                            'scripts/controllers/auth-controller.js'
                        ]
                    })
                }
            }
        })
        .state('register', {
            templateUrl: 'views/pages/register.html',
            url: '/register',
            controller: 'AuthCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'bower_components/angular-cookies/angular-cookies.js',
                            'scripts/factories/shop-address-factory.js',
                            'scripts/factories/cus-shop-factory.js',
                            'scripts/factories/auth-factory.js',
                            'scripts/services/address-service.js',
                            'scripts/controllers/auth-controller.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.home', {
            url: '/home',
            controller: 'DashBoardCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'bower_components/angular-cookies/angular-cookies.js',
                            'scripts/factories/dashboard-factory.js',
                            'scripts/services/address-service.js',
                            'scripts/services/chat-service.js',
                            'scripts/controllers/dashboard-controller.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/chat/chat.js',
                            'scripts/directives/dashboard/stats/stats.js'

                        ]
                    })
                }
            }
        })
        .state('dashboard.status', {
            templateUrl: 'views/dashboard/orders.html',
            url: '/orders/:status',
            controller: 'DashBoardCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'scripts/directives/collapse/collapse.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.notifications', {
            templateUrl: 'views/ui-elements/notifications.html',
            url: '/notifications'
        })
        .state('dashboard.profile', {
            templateUrl: 'views/dashboard/profile.html',
            url: '/profile',
            controller: 'ProfileCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        files: [
                            'scripts/services/address-service.js',
                            'scripts/services/customer-service.js',
                             'scripts/services/shopdetail-service.js',
                            'scripts/factories/cus-shop-factory.js',
                            'scripts/factories/shop-address-factory.js',
                            'scripts/controllers/profile-controller.js',
                            'scripts/factories/address-factory.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.editProfile', {
                templateUrl: 'views/dashboard/edit-profile.html',
                url: '/edit/:id',
                controller: 'ProfileCtrl',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'AdminApp',
                            files: [
                                'scripts/services/address-service.js',
                                'scripts/services/customer-service.js',
                                'scripts/services/shopdetail-service.js',
                                'scripts/factories/cus-shop-factory.js',
                                'scripts/controllers/profile-controller.js',
                                'scripts/factories/shop-address-factory.js',
                                'scripts/factories/address-factory.js'
                            ]
                        })
                    }
                }
            })
}]).constant('Properties', {
    'URL_BASE': 'http://localhost:8080/',
    'URL_USER': 'http://localhost:8080/user/',
    'URL_CUSTOMER': 'http://localhost:8080/customer/',
    'URL_SHOP_ADDRESS': 'http://localhost:8080/shopDetailAddress/',
    'URL_CUS_SHOP': 'http://localhost:8080/customerShopDetails/',
    'URL_ORDER': 'http://localhost:8080/order/',
    'URL_ADDRESS': 'http://localhost:8080/address/',
    'URL_SHOP_DETAIL': 'http://localhost:8080/shopDetail/',
    'SOCKET_CHAT_URL': 'http://localhost:8080/service',
    'CHAT_GET_ONLINE_USERS_COUNT': 'http://localhost:8080/getOnlineUsersCount/',
    
    getCurrentTime: function(){
        var date = new Date();
        return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'           '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.'+date.getMilliseconds();
    },
    saveInLocalDB : function(key, val){
        window.localStorage.setItem(key, val);
    },
    getFromLocalDB: function(key){
        return window.localStorage.getItem(key);
    },
    removeFromLocalDB : function(key){
        window.localStorage.remove(key);
    }
});

    
