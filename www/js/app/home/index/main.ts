// Created data binding controller for index page
module App.Home.Index{
  "use strict"
  angular.module('homeIndexApp',[])
  .controller('homeIndexController', HomeIndexController)
  .service('dataService',HomeDataService);

  export interface IHomeIndexScope extends IBaseScope{
      name: string;
      searchString: string;
      searchResults: Array<any>;
  }
}
