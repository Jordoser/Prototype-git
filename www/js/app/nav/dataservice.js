var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Nav;
    (function (Nav) {
        var NavDataService = (function (_super) {
            __extends(NavDataService, _super);
            function NavDataService($http, $q) {
                _super.call(this, $http, $q);
                this.$http = $http;
                this.$q = $q;
            }
            NavDataService.prototype.getNavItems = function () {
                return this.getItems("LevelOneNavItems");
            };
            NavDataService.prototype.getL2NavItems = function (levelOneId) {
                return this.getItemByKeyValue("LevelTwoNavItems", "l1NavId", levelOneId);
            };
            NavDataService.prototype.getL3NavItems = function (levelTwoId) {
                return this.getItemByKeyValue("LevelThreeNavItems", "l2NavId", levelTwoId);
            };
            return NavDataService;
        }(App.BaseJsonDataService));
        Nav.NavDataService = NavDataService;
    })(Nav = App.Nav || (App.Nav = {}));
})(App || (App = {}));
//# sourceMappingURL=dataservice.js.map