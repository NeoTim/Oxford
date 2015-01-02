;(function(tmax){

  'use strict';

  angular.module('ui-flex')

  .directive('flexBtn', flexBtn)
  .directive('nextIcon', nextIcon)
  .controller('nextIconController', nextIconController)
  .animation('.next-icon-active', function(){
    return {
      addClass:addClass,
      removeClass:removeClass
    }

    function addClass(element, className){
      tmax.to(element, 0.1, {transform:'rotate(90deg)'});

    }
    function removeClass(element, className){
      tmax.to(element, 0.1, {transform:'rotate(0)', content: "\e6fb"});
    }
  });

  function nextIconController(){
    this.isRotated = false;
    this.startRotation = function(){
      this.isRotated = !this.isRotated
      console.log('isRotated = ', this.isRotated);
    }
  }
  function nextIcon($animate,$timeout){
    return function (scope, element, attrs){
      // element.addClass('has-next')
      scope.$watch(attrs.nextIcon, function (bool){
        if(bool){
          $animate.addClass(element, 'next-icon-active');
          $timeout(function(){
            element.addClass(scope.next)
          }, 100)
        } else {
          $animate.removeClass(element, 'next-icon-active');
          $timeout(function(){
            element.removeClass(scope.next)
          }, 100)
        }
      });

    }
  }

  function flexBtn($animate) {
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
      template:'<button class="flex-btn {{bg}}"' +
                'data-ng-mouseenter="vm.startRotation()"' +
                'data-ng-mouseleave="vm.startRotation()"' +
                'data-ng-class="elementClasses">'+
              '<i data-ng-if="icon" next="{{next}}" next-icon="vm.isRotated" class="{{icon}}" ></i>' +
              '</button>',
      controller: 'nextIconController as vm',
      link: function(scope, element, attrs, ctrl, transclude) {

        if(attrs.bg) scope.bg = 'bg-' + attrs.bg;
        var rotate = 'btn-rotate-' + scope.rotate;
        scope.rotateIcon = 'btn-rotate-' + scope.rotate;
        scope.showNext = false;
        scope.elementClasses = {
          'btn-round':scope.round,
          'btn-raised':scope.raised,
          'has-next':scope.next,
          'active':scope.startRotate
        };
        if(!scope.icon){
          transclude(function (clone){
            element.append(clone)
          })
        }
      }
    };
  }

}).call(this, TweenMax);