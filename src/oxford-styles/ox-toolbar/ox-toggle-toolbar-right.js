;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.right.toggle', [])
    .directive('oxToggleToolbarRight', oxToggleToolbarRight)
    .directive('oxToggleToolbarInnerRight', oxToggleToolbarInnerRight);
    function oxToggleToolbarRight($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-right');

          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleRight()
            console.log($rootScope.app);
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });

        }
      };
    }
    function oxToggleToolbarInnerRight($window, $rootScope) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-inner-right');

          var current_icon = $attr.icon;
          var next_icon = $attr.next;

          $element.on('click', function(){
            $rootScope.$toggleInnerRight()
            console.log($rootScope.app);
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
          });

        }
      };
    }
}).call(this);