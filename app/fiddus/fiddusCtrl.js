(function () {
    'use strict';

    var dummyCtrl = function () {
        var vm = this;

        vm.ctrlName = 'Fiddus Controller';
        vm.logoImage = 'assets/images/logoSite.png';
    };

    dummyCtrl.$inject = [];


    angular.module('fiddus')
        .controller('fiddusCtrl', dummyCtrl);
})();
