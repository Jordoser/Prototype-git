module App.Home{
  export interface ITestObject {
    Description: string;
    Name: string;
    IsDeleted: boolean;
  }
  export class HomeDataService extends BaseJsonDataService{

    constructor(public $http: ng.IHttpService, public $q: ng.IQService){
      super($http, $q);
    }

    public getTestItems(): ng.IPromise<Array<any>>{
      return this.getItems("Test");
    }

    public getTestItemById(id: string) : ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("Test", "Id", id);
    }

    public getRelatedItemsForObject(id: string) : ng.IPromise<Array<any>>{
      return this.getItemByKeyValue("RelatedItemsTest","UserId",id);
    }

    public saveTestObject(object) : ng.IPromise<Array<any>>{
      return this.setItem("Test","Id", object)
    }
  }
}
