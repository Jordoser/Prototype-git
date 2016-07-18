// Created data binding controller for index page
module App.Home.Edit{
  "use strict"
  angular.module('homeEditApp',[])
  .controller('homeEditController', HomeEditController)
  .service('dataService',HomeDataService)


  export interface IHomeEditScope extends IBaseScope{
      object: any;
      searchResults: Array<any>;
      editObject: boolean;
  }
}
