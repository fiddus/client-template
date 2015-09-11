(function () {
    'use strict';

    var dummyState = function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/homeTpl.html',
                controller: 'HomeCtrl as vm'
            });
    };

    dummyState.$inject = ['$stateProvider'];


    angular.module('fiddus')
        .config(dummyState);
})();
