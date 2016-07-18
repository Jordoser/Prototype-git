module App.Home.Index{
"use strict";

export class HomeIndexController extends BaseController{
    public static $inject = ['$scope','$timeout','dataService'];

    constructor(public $scope: IHomeIndexScope,public $timeout: ng.ITimeoutService, public dataService: HomeDataService){
      super($scope,$timeout,dataService);
      this.$scope.name = "Search Database";
      this.$scope.searchString = ""
      this.$scope.searchResults = [];
    }

    public alert(){
      this.dataService.getTestItemById(this.$scope.searchString)
      .then((data) =>{
        this.$scope.searchResults.length = 0;
        for(var i = 0; i < data.length; i++){
          this.$scope.searchResults.push(data[i])
        }
      })
      .catch((ex) =>{
        alert(ex);
      })
    }

    public redirectToObject(id?: string){
      if(id){
        sessionStorage.setItem("Id",id);
      }
      window.location.href = "editTestItem.html";
    }
  }
}
