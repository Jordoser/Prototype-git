var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Home;
    (function (Home) {
        var HomeDataService = (function (_super) {
            __extends(HomeDataService, _super);
            function HomeDataService($http, $q) {
                _super.call(this, $http, $q);
                this.$http = $http;
                this.$q = $q;
            }
            HomeDataService.prototype.getTestItems = function () {
                return this.getItems("Test");
            };
            HomeDataService.prototype.getTestItemById = function (id) {
                return this.getItemByKeyValue("Test", "Id", id);
            };
            HomeDataService.prototype.getRelatedItemsForObject = function (id) {
                return this.getItemByKeyValue("RelatedItemsTest", "UserId", id);
            };
            HomeDataService.prototype.saveTestObject = function (object) {
                return this.setItem("Test", "Id", object);
            };
            return HomeDataService;
        }(App.BaseJsonDataService));
        Home.HomeDataService = HomeDataService;
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=dataservice.js.map