var App;
(function (App) {
    "use strict";
    var BaseController = (function () {
        function BaseController($scope, $timeout, dataService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.dataService = dataService;
            this.$scope.ctrl = this;
            this.dataService = dataService;
        }
        return BaseController;
    }());
    App.BaseController = BaseController;
    var BaseJsonDataService = (function () {
        function BaseJsonDataService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.jsonDataBase = new App.JSONDatabase();
        }
        BaseJsonDataService.prototype.getItems = function (dataBase, showDeleted) {
            if (showDeleted === void 0) { showDeleted = false; }
            var deferred = this.$q.defer();
            var isSessionStored = sessionStorage.getItem("IsSessionStored" + dataBase);
            if (isSessionStored) {
                var data = $.parseJSON(sessionStorage.getItem(dataBase));
                if (!showDeleted) {
                    data = $.grep(data, function (item) {
                        if (!item.hasOwnProperty("IsDeleted")) {
                            return true;
                        }
                        return (item['IsDeleted'] == "false" || item['IsDeleted'] == false);
                    });
                }
                deferred.resolve(data);
                return deferred.promise;
            }
            var data = this.jsonDataBase[dataBase];
            var dataArray = [];
            $.each(data, function (key, val) {
                if (!val.hasOwnProperty("IsDeleted")) {
                    dataArray.push(val);
                }
                else {
                    if (val['IsDeleted'] == "false" || val['IsDeleted'] == false) {
                        dataArray.push(val);
                    }
                }
            });
            var jsonData = JSON.stringify(dataArray);
            sessionStorage.setItem("IsSessionStored" + dataBase, "True");
            sessionStorage.setItem(dataBase, jsonData);
            deferred.resolve(dataArray);
            return deferred.promise;
        };
        BaseJsonDataService.prototype.getItemByKeyValue = function (dataBase, key, value) {
            var deferred = this.$q.defer();
            this.getItems(dataBase)
                .then(function (data) {
                var filtered = $.grep(data, function (item) {
                    return item[key] == value;
                });
                deferred.resolve(filtered);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseJsonDataService.prototype.setItem = function (dataBase, key, object) {
            var deferred = this.$q.defer();
            this.getItems(dataBase)
                .then(function (data) {
                var filteredItem = $.grep(data, function (item) {
                    return item[key] == object[key];
                });
                if (filteredItem.length == 0 || filteredItem.length > 1) {
                    data.push(object);
                }
                else {
                    var i = data.indexOf(filteredItem[0]);
                    data[i] = object;
                }
                var jsonData = JSON.stringify(data);
                sessionStorage.setItem("IsSessionStored" + dataBase, "True");
                sessionStorage.setItem(dataBase, jsonData);
                deferred.resolve(true);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseJsonDataService.$inject = [
            '$http',
            '$q'
        ];
        return BaseJsonDataService;
    }());
    App.BaseJsonDataService = BaseJsonDataService;
    var Common = (function () {
        function Common() {
        }
        Common.guid = function () {
            var gen = function (s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            };
            return gen(null) + gen(true) + gen(true) + gen(null);
        };
        Common.getFriendlyTime = function (hour, minute) {
            var updatedhour = ((hour + 11) % 12 + 1);
            minute = this.addZero(minute);
            return (updatedhour + ":" + minute);
        };
        Common.addZero = function (integer) {
            if (integer < 10) {
                integer = "0" + integer;
            }
            return integer;
        };
        return Common;
    }());
    App.Common = Common;
})(App || (App = {}));
//# sourceMappingURL=utils.js.map