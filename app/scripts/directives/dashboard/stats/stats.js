'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
AdminApp.directive('stats', function () {
    return {
        templateUrl: 'scripts/directives/dashboard/stats/stats.html',
        restrict: 'E',
        replace: true,
        controller: function ($scope) {

        },
        scope: {
            'model': '=',
            'comments': '@',
            'number': '@',
            'name': '@',
            'colour': '@',
            'details': '@',
            'type': '@',
            'url':'@'
        }

    }
});
