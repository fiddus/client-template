(function () {
    'use strict';

    var dummyState = function ($stateProvider) {
        $stateProvider
            .state('fiddus', {
                url: '/fiddus',
                templateUrl: 'app/fiddus/fiddusTpl.html',
                controller: 'fiddusCtrl as vm'
            });
    };

    dummyState.$inject = ['$stateProvider'];


    angular.module('fiddus')
        .config(dummyState);
})();