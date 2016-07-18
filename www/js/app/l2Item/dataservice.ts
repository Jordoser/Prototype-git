module App.l2item{
  export interface ITestObject {
    Description: string;
    Name: string;
    IsDeleted: boolean;
  }
  export class L2DataService extends BaseJsonDataService{

    constructor(public $http: ng.IHttpService, public $q: ng.IQService){
      super($http, $q);
    }

    public getNavItems(): ng.IPromise<Array<any>>{
      return this.getItems("LevelOneNavItems");
    }

    public getL2ItemById(Id: string): ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("LevelTwoNavItems","Id",Id)
    }

    public getL3NavItems(levelTwoId: string): ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("LevelThreeNavItems","l2NavId",levelTwoId)
    }

    public getL4Items(levelThreeId: string): ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("LevelFourNavItems", "l3NavId", levelThreeId)
    }

  }
}
