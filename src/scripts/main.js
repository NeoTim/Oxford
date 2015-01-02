;(function(){
  'use strict';

  angular.module('ui-flex', [
    'ui-flex.progressbar'
  ])
  .run( rootConfig )

  function rootConfig($rootScope, $state){
    $rootScope.$isActive = function(val){
      if(val === $state.current.name){
        return 'active'
      }
    }
  }

}());
