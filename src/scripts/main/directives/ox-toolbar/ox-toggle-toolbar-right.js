;(function(){
  'use strict';
  angular
    .module('oxford.directives.toolbar.right.toggle', [])
    .directive('oxToggleToolbarRight', oxToggleToolbarRight);
    function oxToggleToolbarRight($window) {
      return {
        replace: true,
        restrict: 'EA',
        link: function($scope, $element, $attr, navController) {
          $element.addClass('toggle-toolbar-right');
          $element.on('click', toggleNav);
          var current_icon = $attr.icon;
          var next_icon = $attr.next;
          function toggleNav(){
            angular.element($element).find('i').toggleClass('fa-'+current_icon)
            angular.element($element).find('i').toggleClass('fa-'+next_icon)
            document.querySelector('body').classList.toggle('show-toolbar-right')
            document.querySelector('body').classList.toggle('has-ox-toolbar-right')
          }

        }
      };
    }
}).call(this);