'use strict';

angular.module('demo', [
  'oxford',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      template: '<h1>Home</h1>'
    });
})
.controller('Controller', function($scope) {
  $scope.data = {
    columns: [
      ['Profile Completion', 100, 90, 75, 88, 12, 40],
      ['Interests Declared', 75, 99, 65, 12, 24, 63]
    ],
    type: 'area'
  };
   $scope.axis = {
    x: {
      type: 'category',
      categories: ['Josh', 'Mase', 'Xianhui', 'James', 'Joe', 'That One Guy']
    }
  };
});
