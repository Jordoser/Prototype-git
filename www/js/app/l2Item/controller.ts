module App.l2item{
"use strict";

export class L2Controller extends BaseController{
    public static $inject = ['$scope','$timeout','dataService'];

    public navigatedL2: string;
    public navLevel: string;
    public navigatedL3;

    constructor(public $scope: IL2ItemScope,  public $timeout: ng.ITimeoutService, public dataService: L2DataService){
      super($scope,$timeout,$timeout);
      this.$scope.L3Items = [];
      this.navigatedL2 = sessionStorage.getItem("SelectedL2");
      this.navLevel = sessionStorage.getItem("NavLevel");
      this.navigatedL3 = sessionStorage.getItem("SelectedL3");

      if(this.navigatedL2){
        this.LoadCurrentL2(this.navigatedL2);
      }
    }

    public LoadCurrentL2(objectId){
      this.dataService.getL2ItemById(objectId)
      .then(data =>{
        this.$scope.selectedL2 = data[0];
        if(this.navLevel == '2'){
          this.$scope.currentItem= this.$scope.selectedL2;
        }
        this.$scope.selectedL2 = data[0];
        this.loadRelatedL3Items(data[0].Id)
      })
      .catch(ex => {
        alert(ex);
      });
    }

    public loadRelatedL3Items(id){
      this.dataService.getL3NavItems(id)
      .then(data =>{
        for(var i = 0; i < data.length; i++){
          this.$scope.L3Items[i] = data[i];
          this.$scope.L3Items[i].L4Items = [];
          this.loadRelatedL4Items(data[i].Id , i)
        }
      })
    }

    public loadRelatedL4Items(id, index){
      this.dataService.getL4Items(id)
      .then(data =>{
        for(var i = 0; i < data.length; i++){
          this.$scope.L3Items[index].L4Items.push(data[i]);
        }
        if(id == this.navigatedL3 && this.navLevel == '3'){
          this.$timeout(() =>
          {
            this.$scope.currentItem = this.$scope.L3Items[index];
            this.expandL3(id, true);
          },100);
        }
      })
    }


    public expandL3(id, skipAnimation= false){
      var item = $("#l3"+id +" .l4-item-wrapper");
      var currentHeight =item.height();

      if(currentHeight == 0){
        var height= item.css('height', 'auto').height();
        item.css('height','0');
        if(skipAnimation){
          item.height(height + "px");
          return
        }
        item.animate({height: height + "px"},200);
      }
      else{
        if(skipAnimation){
          item.height("0");
        }
        item.animate({height: "0"},200);
      }

    }

    public redirectToL4Nav(item){

    }

  }
}
