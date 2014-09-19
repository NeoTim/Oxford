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
      templateUrl: 'content',
      controller: 'Controller'
      // '<div>' + '<div class="shadow-5"></div>' + '</div>'
    });
})
.controller('Controller', function($scope) {
  $scope.data = {
    rows: [
      ['data1','data2','data3'],
      [120,80,200],
      [140,50,210],
      [170, 100, 250],
      [150, 70, 300],
      [180, 120, 280]
    ],
    type: 'line'
  };

  // $scope.axis = {
  //   x: {
  //     type: 'timeseries',
  //     categories: ['Josh', 'Mase', 'Xianhui', 'James', 'Joe', 'That One Guy']
  //   }
  // };

});
