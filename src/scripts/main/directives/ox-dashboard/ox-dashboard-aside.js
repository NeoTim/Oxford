;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxDashboardAside', oxDashboardAside);

  function oxDashboardAside() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<aside class="x-dashboard-aside x-aside-{{side}}" data-ng-transclude>' +
              '</aside>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);