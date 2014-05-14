var app = angular.module('app', ['ngAnimate', 'ngRoute']);

app.constant('routes', [
    {
        path: '/step1', route: {
            templateUrl: 'step1.html',
            title: 'Step 1'
        }
    },
    {
        path: '/step2', route: {
            templateUrl: 'step2.html',
            title: 'Step 2'
        }
    },
    {
        path: '/step3', route: {
            templateUrl: 'step3.html',
            title: 'Step 3'
        }
    }
]);

app.config(['$routeProvider', 'routes', routeConfigurator]);

function routeConfigurator($routeProvider, routes) {
    routes.forEach(function (r) {
        $routeProvider.when(r.path, r.route);
    });
    $routeProvider.otherwise({ redirectTo: '/step1' });
}

app.controller('demoController', ['$location' ,'$rootScope', '$route', 'routes', demoController]);

function demoController($location, $rootScope, $route, routes) {
    var vm = this;
    var currentPath;
    vm.views = routes;
    vm.setRoute = function (view) {
        $location.path(view.path);
    };
    vm.setRouteExplicit = function (path) {
        $location.path(path);
    };
    vm.activeViewClass = function (view) {
        return view.path === currentPath ? 'active' : '';
    };
    $rootScope.$on('$routeChangeSuccess', function(scope, next, current) {
        currentPath = next.originalPath;
    });
};
