;(function() {
  'use strict';

  angular.module('oxford.directives.dashboard', [

  ])
  .directive('oxDashboard', function($rootScope) {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="x-dashboard" ng-transclude>' +
      '</div>',
      controller: function($scope, $rootScope) {
        $rootScope.app = {
          settings: {
            foldLeft: true,
            foldRight: true,
            foldInnerLeft: true,
            foldInnerRight: true,
          }
        }
        $rootScope.$toggleLeft = function(){
          $rootScope.app.settings.foldLeft = !$rootScope.app.settings.foldLeft
          $scope.$digest()
        }
        $rootScope.$toggleInnerLeft = function(){
          $rootScope.app.settings.foldInnerLeft = !$rootScope.app.settings.foldInnerLeft
          $scope.$digest()
        }
        $rootScope.$toggleRight = function(){
          $rootScope.app.settings.foldRight = !$rootScope.app.settings.foldRight
          $scope.$digest()
        }
        $rootScope.$toggleInnerRight = function(){
          $rootScope.app.settings.foldInnerRight = !$rootScope.app.settings.foldInnerRight
          $scope.$digest()
        }
      },
      link: function(scope, element, attrs, ctrl, transclude) {

        // $rootScope.$watch('app.settings', function(){

        // })
      }
    };
  })
  .directive('oxDashboardHeader', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<header class="x-dashboard-header" ng-transclude>' +
      '</header>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })
  .directive('oxDashboardContainer', function() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-dashboard-container" ng-transclude>' +
      '</section>',
      controller: function($scope) {

      },
      link: function() {
      }
    };
  })

  .directive('oxDashboardView', function() {
    return {
      replace: true,
      require: '^oxDashboard',
      restrict: 'EA',
      template: '<div class="dashboard-view">' +
        '<div ui-view></div>' +
      '</div>',
      link: function($scope, $element, $attr, navController) {

      }
    };
  });
}());