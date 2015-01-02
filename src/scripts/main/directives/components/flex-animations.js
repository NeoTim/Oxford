;(function(){

  'use strict';

  angular.module('ui-flex')

  .directive('flexAnimate', flexAnimate)
  .animation('.round-square', function(){
    return {
      addClass: function (element, className){
        console.log('addClass');
        TweenMax.to(element, 1, {width:'100px', height:'100px', borderRadius:'5px', ease:'Cubic.easeOut'})
        TweenMax.to(element, 1, {width:'200px', height:'200px', borderRadius:'0px', ease:'Cubic.easeOut', delay:1})

      },
      removeClass:function(element, className){
        TweenMax.to(element, 1, {width:'50px', height:'50px', borderRadius:'100%', ease:'Cubic.easeOut'})
      }
    }
  })
  function flexAnimate($animate, $timeout, $interval) {
    return function (scope, element, attrs) {

      $interval(function(){

        if(!scope[attrs.flexAnimate]){

          scope[attrs.flexAnimate] = 'round-square'

        } else if (scope[attrs.flexAnimate] === 'round-square'){

          scope[attrs.flexAnimate] = 'square'

        } else if(scope[attrs.flexAnimate] === 'square'){
          scope[attrs.flexAnimate] = false
        } else {
          scope[attrs.flexAnimate] = false
        }

        console.log(scope[attrs.flexAnimate]);
      }, 2000);
      // $timeout(function(){
      //   scope[attrs.flexAnimate] = 'square';
      // }, 2000)

      scope.$watch(attrs.flexAnimate, function (value){
        if (value === 'round-square'){

          $animate.addClass(element, value)

        } else {

          $animate.removeClass(element, 'round-square')
        }

      })
    }
  }

}).call(this);