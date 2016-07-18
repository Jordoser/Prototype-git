// Created data binding controller for index page
module App.Nav{
  "use strict"
  angular.module('navApp',[])
  .controller('navController', NavController)
  .service('dataService',NavDataService)


  export interface INavScope extends IBaseScope{
      navItems: Array<any>;
      l2NavItems: Array<any>;
      searchArea: string;
      menuClosed: boolean;
      openItemId: string;
      selectedItemId: string;
      selectedL2Id: string;
      selectedL3Id: string;
  }
}
