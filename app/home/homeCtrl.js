(function () {
    'use strict';

    var homeCtrl = function () {
        var vm = this;

        vm.ctrlName = 'Home Controller';
        vm.logoImage = 'assets/images/logoSite.png';
    };

    homeCtrl.$inject = [];


    angular.module('fiddus')
        .controller('HomeCtrl', homeCtrl);
})();
