;(function(){

  'use strict';

  angular
    .module('ui-flex')

    .directive('flexFull', flexFull)
    .directive('flexHalfs', flexHalfs)
    .directive('flexThirds', flexThirds)
    .directive('flexFourths', flexFourths);

  function flexFull() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-full {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexHalfs() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-halfs {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexThirds() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-thirds {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }
  function flexFourths() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="flex-fourths {{gutters}}" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {
        if(attrs.gutters) scope.gutters = 'gutters-'+attrs.gutters;
        if(attrs.gutters === 'none') scope.gutters = 'no-gutters';

      }
    };
  }

}).call(this);