;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexUseColumn', flexUseColumn)
  .directive('flexUseRow', flexUseRow)
  .directive('flexUse', flexUse);

  function flexUseColumn() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-column {{bg}}" data-ng-include="file">' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;
      }
    };
  }
  function flexUseRow() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template:'<section class="flex-row {{bg}}" data-ng-include="file">' +
              '</section>',

      link: function(scope, element, attrs) {
        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;

      }
    };
  }
  function flexUse() {
    return {
      // transclude: true,
      replace: true,
      restrict: 'EA',
      scope: true,
      template: '<div style="{{flex}}" class="{{type}} {{bg}}" data-ng-include="file"></div>',

      link: function(scope, element, attrs) {
        var flex = 'flex:'
        if(attrs.grow){
          flex+= attrs.grow + ' ';
        } else {
          flex+='';
        }
        if(attrs.shrink){
          if(!attrs.grow){
            flex +='0 '
          }
          flex+= attrs.shrink + ' ';
        }
        if(attrs.basis){
          flex+= attrs.basis + ' ';
        } else {
          flex+='';
        }
        if(flex !== 'flex:') scope.flex = flex;

        if(attrs.bg) scope.bg = 'bg-'+attrs.bg
        if(attrs.file) scope.file = attrs.file;
        if(attrs.type) scope.type = 'flex-' + attrs.type

      }
    };
  }

}).call(this);