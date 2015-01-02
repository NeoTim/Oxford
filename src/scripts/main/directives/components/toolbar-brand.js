;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('toolbarBrand', toolbarBrand);

  function toolbarBrand() {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<div class="toolbar-brand" data-ng-transclude>' +
              '</div>',

      link: function(scope, element, attrs) {

      }
    };
  }

}).call(this);