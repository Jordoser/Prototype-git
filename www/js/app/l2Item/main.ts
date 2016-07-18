// Created data binding controller for index page
module App.l2item{
  "use strict"
  angular.module('l2App',[])
  .controller('l2Controller', L2Controller)
  .service('dataService',L2DataService)


  export interface IL2ItemScope extends IBaseScope{
      currentItem: any;
      L3Items: Array<any>;
      selectedL2: any
  }
}
