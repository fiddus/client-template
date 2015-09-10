(function () {
    'use strict';

    // Default run function
    var runApp = function ($rootScope) {
        $rootScope.projectName = 'Fiddus';
    };

    runApp.$injector = ['$rootScope'];


    // Default route
    var routesApp = function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/fiddus');
    };

    routesApp.$injector = ['$urlRouterProvider'];


    // Main module
    angular.module('fiddus', [
        'ui.router',
        'templates-fiddus'
    ])
        .config(routesApp)
        .run(runApp);
})();
