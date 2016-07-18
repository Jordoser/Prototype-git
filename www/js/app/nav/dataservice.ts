module App.Nav{
  export interface ITestObject {
    Description: string;
    Name: string;
    IsDeleted: boolean;
  }
  export class NavDataService extends BaseJsonDataService{

    constructor(public $http: ng.IHttpService, public $q: ng.IQService){
      super($http, $q);
    }

    public getNavItems(): ng.IPromise<Array<any>>{
      return this.getItems("LevelOneNavItems");
    }

    public getL2NavItems(levelOneId: string): ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("LevelTwoNavItems","l1NavId",levelOneId)
    }

    public getL3NavItems(levelTwoId: string): ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("LevelThreeNavItems","l2NavId",levelTwoId)
    }

  }
}
