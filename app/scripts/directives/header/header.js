'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
AdminApp.directive('header', function () {
    return {
        templateUrl: 'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true
    }
});


