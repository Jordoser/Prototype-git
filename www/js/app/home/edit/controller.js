var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Edit;
        (function (Edit) {
            "use strict";
            var HomeEditController = (function (_super) {
                __extends(HomeEditController, _super);
                function HomeEditController($scope, $timeout, dataService) {
                    _super.call(this, $scope, $timeout, dataService);
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this.dataService = dataService;
                    this.objectId = sessionStorage.getItem("Id");
                    sessionStorage.removeItem("Id");
                    if (this.objectId) {
                        this.loadObject();
                        this.loadRelatedObjects();
                        this.$scope.editObject = false;
                    }
                    else {
                        this.$scope.editObject = true;
                        this.objectId = App.Common.guid();
                        this.$scope.object = {
                            Id: this.objectId,
                            Description: "",
                            Name: "",
                            IsDeleted: false
                        };
                    }
                    this.$scope.searchResults = [];
                }
                HomeEditController.prototype.loadObject = function () {
                    var _this = this;
                    this.dataService.getTestItemById(this.objectId)
                        .then(function (data) {
                        _this.$scope.object = data[0];
                    })
                        .catch(function (ex) {
                        alert(ex);
                    });
                };
                HomeEditController.prototype.loadRelatedObjects = function () {
                    var _this = this;
                    this.dataService.getRelatedItemsForObject(this.objectId)
                        .then(function (data) {
                        _this.$scope.searchResults.length = 0;
                        for (var i = 0; i < data.length; i++) {
                            _this.$scope.searchResults.push(data[i]);
                        }
                    })
                        .catch(function (ex) {
                        alert(ex);
                    });
                };
                HomeEditController.prototype.saveTestObject = function () {
                    this.dataService.saveTestObject(this.$scope.object);
                    this.$scope.editObject = false;
                    this.loadObject;
                };
                HomeEditController.$inject = ['$scope', '$timeout', 'dataService'];
                return HomeEditController;
            }(App.BaseController));
            Edit.HomeEditController = HomeEditController;
        })(Edit = Home.Edit || (Home.Edit = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map