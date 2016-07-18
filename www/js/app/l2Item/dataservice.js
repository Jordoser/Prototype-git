var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var l2item;
    (function (l2item) {
        var L2DataService = (function (_super) {
            __extends(L2DataService, _super);
            function L2DataService($http, $q) {
                _super.call(this, $http, $q);
                this.$http = $http;
                this.$q = $q;
            }
            L2DataService.prototype.getNavItems = function () {
                return this.getItems("LevelOneNavItems");
            };
            L2DataService.prototype.getL2ItemById = function (Id) {
                return this.getItemByKeyValue("LevelTwoNavItems", "Id", Id);
            };
            L2DataService.prototype.getL3NavItems = function (levelTwoId) {
                return this.getItemByKeyValue("LevelThreeNavItems", "l2NavId", levelTwoId);
            };
            L2DataService.prototype.getL4Items = function (levelThreeId) {
                return this.getItemByKeyValue("LevelFourNavItems", "l3NavId", levelThreeId);
            };
            return L2DataService;
        }(App.BaseJsonDataService));
        l2item.L2DataService = L2DataService;
    })(l2item = App.l2item || (App.l2item = {}));
})(App || (App = {}));
//# sourceMappingURL=dataservice.js.map