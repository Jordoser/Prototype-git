module App.Home.Edit{
"use strict";

export class HomeEditController extends BaseController{
    public static $inject = ['$scope','$timeout','dataService'];

    public objectId: string;

    constructor(public $scope: IHomeEditScope,public $timeout: ng.ITimeoutService, public dataService: HomeDataService){
      super($scope,$timeout,dataService);

      this.objectId = sessionStorage.getItem("Id");
      sessionStorage.removeItem("Id");

      if(this.objectId){
        this.loadObject();
        this.loadRelatedObjects();
        this.$scope.editObject = false;
      }
      else{
        this.$scope.editObject = true;
        this.objectId = App.Common.guid();
        this.$scope.object = <ITestObject>{
          Id: this.objectId,
          Description: "",
          Name: "",
          IsDeleted: false
        }
      }

      this.$scope.searchResults = [];
    }

    public loadObject(){
      this.dataService.getTestItemById(this.objectId)
      .then(data =>{
        this.$scope.object = data[0];
      })
      .catch(ex => {
        alert(ex);
      })
    }

    public loadRelatedObjects(){
      this.dataService.getRelatedItemsForObject(this.objectId)
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

    public saveTestObject(){
      this.dataService.saveTestObject(this.$scope.object);
      this.$scope.editObject = false;
      this.loadObject
    }

  }
}
