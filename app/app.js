(function () {
    'use strict';

    var runApp = function ($rootScope) {
        $rootScope.projectName = 'Case4You';
    };

    runApp.$injector = ['$rootScope'];

    angular.module('caseForYou', [])
        .run(runApp);
})();
