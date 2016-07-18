module App.Nav{
"use strict";

export class NavController extends BaseController{
    public static $inject = ['$scope','$timeout','dataService'];
    public navigatedL1;
    public navigatedL2;
    public navigatedL3;
    public clickToClose;
    constructor(public $scope: INavScope,  public $timeout: ng.ITimeoutService, public dataService: NavDataService){
      super($scope,$timeout,$timeout);
      this.$scope.menuClosed = true;
      this.$scope.searchArea= "";
      this.$scope.openItemId = "";
      this.$scope.navItems = [];
      this.$scope.l2NavItems = [];
      this.loadNav();
      this.initiateClock();
      this.initiateDay();


      $(function () {
        $('[data-toggle="popover"]').popover()
      });

      this.navigatedL1 = sessionStorage.getItem("SelectedL1");
      this.$scope.selectedL2Id = sessionStorage.getItem("SelectedL2");
      this.$scope.selectedL3Id = sessionStorage.getItem("SelectedL3");

      this.clickToClose = () =>{
        this.openL2NavForItem("",true)
      };
      if(this.navigatedL1){
        this.$scope.selectedItemId = this.navigatedL1;
      }

    }

    public loadNav(){
      this.dataService.getNavItems()
      .then(data =>{
        for(var i = 0; i < data.length; i++){
          this.$scope.navItems.push(data[i])
        }
        })
      .catch(ex => {
        alert(ex);
      })
    }

    public openL2NavForItem(item, forceClose = false){

      if(forceClose || this.$scope.openItemId == item.Id){
        this.$scope.menuClosed = true;
        this.$scope.openItemId = "";
        var contentArea = $(".content-area")
        contentArea.unbind("click", this.clickToClose);
        this.$scope.$apply();
        return;
      }

      if(this.$scope.openItemId == ""){
        this.loadNavItems(item)
        return;
      }

      if(this.$scope.openItemId != ""){
        this.$scope.menuClosed = true;
        var contentArea = $(".content-area")
        contentArea.unbind("click", this.clickToClose);
        this.$timeout(()=>{
          this.loadNavItems(item);
        },100);
        return;
      }
      this.loadNavItems(item)
    }

    public displayApps(){
      var item = $(".app-row");
      var currentHeight =item.height();

      var megaMenu = $(".mega-menu")
      var currentPadding = parseInt(megaMenu.css("marginTop"));

      if(currentHeight == 0){
        //var height= item.css('height', 'auto').height();
        var height = 150;
        item.css('height','0');
        item.animate({height: height + "px"},{ duration: 200, queue: false });
        //megaMenu.animate({marginTop: (currentPadding + height) + "px"},{ duration: 150, queue: false });
      }
      else{
        item.animate({height: "0"},{ duration: 200, queue: false });
        //megaMenu.animate({marginTop: (currentPadding - currentHeight) + "px"},{ duration: 150, queue: false });
      }
    }

    public redirectToL2Nav(item){
      if(item.Id){
        sessionStorage.setItem("SelectedL2",item.Id);
        sessionStorage.setItem("NavLevel", "2");
      }
      if(this.$scope.openItemId){
        sessionStorage.setItem("SelectedL1", this.$scope.openItemId);
      }
      window.location.href = "l2Nav.html";
    }

    public redirectToL3Nav(item, parent){
      if(item.Id){
        sessionStorage.setItem("SelectedL2",parent.Id);
        sessionStorage.setItem("SelectedL3", item.Id)
        sessionStorage.setItem("NavLevel", "3");
      }
      if(this.$scope.openItemId){
        sessionStorage.setItem("SelectedL1", this.$scope.openItemId);
      }
      window.location.href = "l3Nav.html";
    }

    public loadNavItems(item){
      var contentArea = $(".content-area")
      contentArea.bind("click", this.clickToClose);
      this.$scope.l2NavItems.length = 0;
            this.$scope.openItemId = item.Id
      this.dataService.getL2NavItems(item.Id)
      .then(data =>{
        var row = []
        var rowIndex = 0;
        for(var i = 0; i < data.length; i++){
          data[i].L3Items = [];
          row.push(data[i])
          var returnIndex = row.indexOf(data[i])
          this.getL3NavForL2(returnIndex,rowIndex, data[i].Id)
          if(row.length == 3 || i == data.length - 1){
            var test = this.$scope.l2NavItems;
            this.$scope.l2NavItems[rowIndex] = (row);
            rowIndex++;
            row = [];
            }
          }
          this.$scope.menuClosed = false;
        })
    }

    public IsOpenItem(itemId){
      return (this.$scope.openItemId == itemId) || (this.$scope.selectedItemId == itemId);
    }

    public getL3NavForL2(returnIndex,rowIndex,  l2Id){
      this.dataService.getL3NavItems(l2Id)
      .then(data => {
          for(var i = 0; i < data.length; i++){
            this.$scope.l2NavItems[rowIndex][returnIndex].L3Items.push(data[i]);
          }
      })
    }
    private initiateClock(){
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var suffix = (hour >= 12)? "pm" : "am";
      if(hour == 0  && minute< 2){
        this.initiateDay();
      }
      var friendlyTime = App.Common.getFriendlyTime(hour,minute);
      $(".date-time > span.time").text(friendlyTime);
      $(".date-time > span.period").text(suffix)
      setTimeout(() =>{
        this.initiateClock();
        },15000)
    }

    private initiateDay(){
      var date = new Date();
      var weekday = new Array(7);
      weekday[0]=  "Sun";
      weekday[1] = "Mon";
      weekday[2] = "Tues";
      weekday[3] = "Wed";
      weekday[4] = "Thurs";
      weekday[5] = "Fri";
      weekday[6] = "Sat";
      var day = weekday[date.getDay()];
      var numberedDate = date.getDate();
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
      var month = monthNames[date.getMonth()];
      $(".date-time > span.date").text(day +", " + month + " " +numberedDate)
    }

  }
}
