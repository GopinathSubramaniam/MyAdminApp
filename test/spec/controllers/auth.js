/**
 * Created by Gopi on 29-06-2015.
 */
'use strict';

describe('Controller: AuthCtrl', function () {

    beforeEach(module('AdminApp'));

    var AuthCtrl,
        scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AuthCtrl = $controller('AuthCtrl', {
            $scope: scope
        });
    }));

    it('should expect 3', function () {
        console.log('scope.awesomeThings.length = '+scope.awesomeThings.length);
        expect(scope.awesomeThings.length).toBe(3);
        console.log('scope.awesomeThings.length = true');
    });

});