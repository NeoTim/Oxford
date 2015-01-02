'use strict';

angular.module('demo', [
  'ngAnimate',
  'gridster',
  'ui.router',
  'ui-flex',
  // 'ui-flex.progressbar'
])
.config(function($stateProvider, $urlRouterProvider) {
  // $urlRouterProvider.otherwise({redirect: '/home'});

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'content',
      // controller: 'Controller'
    })
    .state('buttons', {
      url: '/buttons',
      templateUrl: 'views/buttons.html'
    })
    .state('forms', {
      url: '/forms',
      templateUrl: 'views/forms.html'
    })
    .state('panels', {
      url: '/panels',
      templateUrl: 'views/panels.html',
      controller: 'PanelsController'
    })
    .state('toolbars', {
      url: '/toolbars',
      templateUrl: 'views/toolbars.html',
      controller: 'PanelsController'
    })
    .state('ui', {
      url: '/ui',
      templateUrl: 'views/ui.html'
    })
    .state('animations', {
      url: '/animations',
      templateUrl: 'views/animations.html'
    })
})