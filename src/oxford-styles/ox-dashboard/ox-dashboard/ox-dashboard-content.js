;(function(){

  'use strict';

  angular.module('oxford.directives.dashboard')

  .directive('oxDashboardContent', oxDashboardContent);

  function oxDashboardContent() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="x-dashboard-content" data-ng-transclude>' +
              '</section>',
      controller: function($scope) {

      },
      link: function(scope, element, attrs) {
        scope.side = attrs.side
      }
    };
  }

}).call(this);