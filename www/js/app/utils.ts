module App {
  "use strict";
    export interface IBaseScope extends ng.IScope {
         ctrl: BaseController;
     }

     export class BaseController {
       constructor(public $scope: IBaseScope,public $timeout: ng.ITimeoutService, public dataService){
         this.$scope.ctrl = this;
         this.dataService = dataService;
       }

   }


     /*
        -Superclass to be extened by other dataService, mangages data from json files and local/session storage
        -Allows for query on kvp's, load of entire set, and saving of object in set (saving is per session)
     */
     export class BaseJsonDataService{
       public jsonDataBase: JSONDatabase;
       public static $inject = [
           '$http',
           '$q'
       ];
       constructor(public $http: ng.IHttpService ,public $q: ng.IQService) {
         this.jsonDataBase = new JSONDatabase();


       }

       /*
            -GETS FULL LIST OF ITEMS OF THE DATABASE NAME ENTERED
            -TRIES TO ACCESS SESSION STORAGE FOR CACHED DATA
            -ON CACHE MISS GET DATA FROM JSON FILE
      */
       public getItems(dataBase, showDeleted: boolean = false): ng.IPromise<Array<any>>{
         var deferred = this.$q.defer();
         //If database has already been loaded into session storage load from there
         var isSessionStored = sessionStorage.getItem("IsSessionStored" + dataBase);
         if(isSessionStored){
           var data = $.parseJSON(sessionStorage.getItem(dataBase));
           if(!showDeleted){
             data = $.grep(data, (item) =>{
               if(!item.hasOwnProperty("IsDeleted")){
                 return true
               }
               return (item['IsDeleted'] == "false" || item['IsDeleted'] == false);
             })
           }
           deferred.resolve(data);
           return deferred.promise;
         }

        //If not send a request to the file system and then parse the json into an array
          var data = this.jsonDataBase[dataBase];

          var dataArray =  [];
          $.each(data, (key,val) =>{

            if(!val.hasOwnProperty("IsDeleted")){
              dataArray.push(val);
            }else{
              if(val['IsDeleted'] == "false" || val['IsDeleted'] == false){
                  dataArray.push(val);
              }
            }
          });

          //put the item into session storage for later request
          var jsonData = JSON.stringify(dataArray);
          sessionStorage.setItem("IsSessionStored" + dataBase, "True")
          sessionStorage.setItem(dataBase, jsonData);

          deferred.resolve(dataArray);
        return deferred.promise
       }


       //Get any items with matching key value pairs
       public getItemByKeyValue(dataBase:string ,key: string, value: string): ng.IPromise<Array<any>>{
        var deferred = this.$q.defer();
        this.getItems(dataBase)
        .then(data => {
            var filtered = $.grep(data, (item) => {
              return item[key] == value;
            })
            deferred.resolve(filtered)
          })
          .catch((reason) =>{
            deferred.reject(reason);
          });
        return deferred.promise
      }


      /*
           -Updates specific object if the object exists
           -Push the updated "DB" to cache (session storage)
      */
      public setItem(dataBase: string,key: string,  object){
        var deferred = this.$q.defer();
        this.getItems(dataBase)
        .then(data => {
          //Find the correct object in the database
            var filteredItem = $.grep(data, (item) => {
              return item[key] == object[key];
            });

            //If the item does not exist push item with new ID
            if(filteredItem.length == 0 || filteredItem.length > 1){
              data.push(object);
            }
            else{
              //replace old data
              var i = data.indexOf(filteredItem[0]);
              data[i] = object;
            }

            //update cached data
            var jsonData = JSON.stringify(data);
            sessionStorage.setItem("IsSessionStored" + dataBase, "True")
            sessionStorage.setItem(dataBase, jsonData);

            deferred.resolve(true)
          })
          .catch((reason) =>{
            deferred.reject(reason);
          });
        return deferred.promise
        }


    }

    export class Common{
      // http://slavik.meltser.info/the-efficient-way-to-create-guid-uuid-in-javascript-with-explanation/
       static guid(){
             var gen = (s) => {
                 var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                 return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
             }

             return gen(null) + gen(true) + gen(true) + gen(null);
         }

      static getFriendlyTime(hour, minute){
          var updatedhour = ((hour + 11) %12 + 1);
          minute = this.addZero(minute);

          return(updatedhour+":"+minute)
      }

      private static addZero(integer){
        if (integer < 10) {
        integer = "0" + integer;
        }
        return integer;
      }
    }

}
