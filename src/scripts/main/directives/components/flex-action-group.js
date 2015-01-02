;(function(){

  'use strict';

  angular.module('ui-flex')
  .directive('flexActionGroup', flexActionGroup)
  .animation('.display-group', function(){
    return {
      addClass:addClass,
      removeClass:removeClass
    }
    function addClass (element, className) {
      var $btn = jQuery(element).find('.action-btn > button');
      var $actions = jQuery(element).find('.actions > button');
      var $icon = $btn.find('i');
      // var $iconBefore = $btn.find('i:before');

      TweenMax.to($icon, 0.05, {rotation:'0',  ease:Bounce.easeOut})
      TweenMax.to($icon, 0.05, {className:'gcon-pencil', delay:0.18,  ease:Bounce.easeOut})
      // TweenMax.staggerTo($actions, 0.2, {minHeight: '50px', minWidth:'50px',padding: '5px 12px',opacity: 1}, 0.05)
    }
    function removeClass (element, className) {
      var $btn = jQuery(element).find('.action-btn > button');
      var $actions = jQuery(element).find('.actions > button');
      var $icon = $btn.find('i');

      TweenMax.to($icon, 0.08, {rotation:'-180', ease:Bounce.easeOut})
      TweenMax.to($icon, 0.08, {className:'gcon-plus', ease:Bounce.easeOut}, 0.18)
      // TweenMax.staggerTo($actions, 0.2, {minHeight: '0', minWidth:'0',padding: '0',opacity: 0}, 0.05)
    }
  });

  function flexActionGroup($animate) {
    return {
      transclude: true,
      replace: true,
      restrict: 'EA',
      scope: {
        switch:'&onSwitch',
        next:'@',
        icon:'@',
        round:'@',
        raised:'@',
        rotate:'@'
      },
      template:  '<div class="action-group" '+
                    'ng-mouseenter="showActions()"'+
                    'ng-mouseleave="showActions()"'+
                    '>'+
                    '<div class="actions" data-ng-transclude>' +
                    '</div>' +
                    '<div class="action-btn">'+
                      '<button id="main-btn" class="flex-btn text-white {{bg}}" '+
                        'data-ng-class="elementClasses">'+
                      '<i data-ng-if="icon" next="{{next}}" class="{{icon}}"></i>' +
                      '</button>'+
                    '</div>'+
                 '</div>',
      controller: function($scope, $timeout){
        $scope.displayActions = false;
        $scope.showActions = function () {
          $scope.displayActions = !$scope.displayActions;
        };
      },
      link: function(scope, element, attrs) {
        var activeClass = 'display-group';

        scope.$watch('displayActions', function (bool) {
          bool ?
            ( $animate.addClass(element, activeClass) ) :
            ( $animate.removeClass(element, activeClass) )
        })

        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;
        // element.addClass('btn-rotate-'+scope.rotate);
        // scope.rotateIcon = 'btn-rotate-' + scope.rotate;
        // scope.showNext = false;
        scope.elementClasses = {
          'btn-round':true,
          'btn-raised':true,
          'has-next':scope.next
        };
      }
    };
  }

}).call(this);