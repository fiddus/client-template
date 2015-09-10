(function () {
    'use strict';

    var dummyCtrl = function () {
        var vm = this;

        vm.ctrlName = 'Fiddus Controller';
        vm.logoImage = 'app/assets/images/logo-site.png';
    };

    dummyCtrl.$inject = [];


    angular.module('fiddus')
        .controller('fiddusCtrl', dummyCtrl);
})();
