var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Home;
    (function (Home) {
        var Index;
        (function (Index) {
            "use strict";
            var HomeIndexController = (function (_super) {
                __extends(HomeIndexController, _super);
                function HomeIndexController($scope, $timeout, dataService) {
                    _super.call(this, $scope, $timeout, dataService);
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this.dataService = dataService;
                    this.$scope.name = "Search Database";
                    this.$scope.searchString = "";
                    this.$scope.searchResults = [];
                }
                HomeIndexController.prototype.alert = function () {
                    var _this = this;
                    this.dataService.getTestItemById(this.$scope.searchString)
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
                HomeIndexController.prototype.redirectToObject = function (id) {
                    if (id) {
                        sessionStorage.setItem("Id", id);
                    }
                    window.location.href = "editTestItem.html";
                };
                HomeIndexController.$inject = ['$scope', '$timeout', 'dataService'];
                return HomeIndexController;
            }(App.BaseController));
            Index.HomeIndexController = HomeIndexController;
        })(Index = Home.Index || (Home.Index = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map