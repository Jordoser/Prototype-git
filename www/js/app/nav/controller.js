var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Nav;
    (function (Nav) {
        "use strict";
        var NavController = (function (_super) {
            __extends(NavController, _super);
            function NavController($scope, $timeout, dataService) {
                var _this = this;
                _super.call(this, $scope, $timeout, $timeout);
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.dataService = dataService;
                this.$scope.menuClosed = true;
                this.$scope.searchArea = "";
                this.$scope.openItemId = "";
                this.$scope.navItems = [];
                this.$scope.l2NavItems = [];
                this.loadNav();
                this.initiateClock();
                this.initiateDay();
                $(function () {
                    $('[data-toggle="popover"]').popover();
                });
                this.navigatedL1 = sessionStorage.getItem("SelectedL1");
                this.$scope.selectedL2Id = sessionStorage.getItem("SelectedL2");
                this.$scope.selectedL3Id = sessionStorage.getItem("SelectedL3");
                this.clickToClose = function () {
                    _this.openL2NavForItem("", true);
                };
                if (this.navigatedL1) {
                    this.$scope.selectedItemId = this.navigatedL1;
                }
            }
            NavController.prototype.loadNav = function () {
                var _this = this;
                this.dataService.getNavItems()
                    .then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        _this.$scope.navItems.push(data[i]);
                    }
                })
                    .catch(function (ex) {
                    alert(ex);
                });
            };
            NavController.prototype.openL2NavForItem = function (item, forceClose) {
                var _this = this;
                if (forceClose === void 0) { forceClose = false; }
                if (forceClose || this.$scope.openItemId == item.Id) {
                    this.$scope.menuClosed = true;
                    this.$scope.openItemId = "";
                    var contentArea = $(".content-area");
                    contentArea.unbind("click", this.clickToClose);
                    this.$scope.$apply();
                    return;
                }
                if (this.$scope.openItemId == "") {
                    this.loadNavItems(item);
                    return;
                }
                if (this.$scope.openItemId != "") {
                    this.$scope.menuClosed = true;
                    var contentArea = $(".content-area");
                    contentArea.unbind("click", this.clickToClose);
                    this.$timeout(function () {
                        _this.loadNavItems(item);
                    }, 100);
                    return;
                }
                this.loadNavItems(item);
            };
            NavController.prototype.displayApps = function () {
                var item = $(".app-row");
                var currentHeight = item.height();
                var megaMenu = $(".mega-menu");
                var currentPadding = parseInt(megaMenu.css("marginTop"));
                if (currentHeight == 0) {
                    var height = 150;
                    item.css('height', '0');
                    item.animate({ height: height + "px" }, { duration: 200, queue: false });
                }
                else {
                    item.animate({ height: "0" }, { duration: 200, queue: false });
                }
            };
            NavController.prototype.redirectToL2Nav = function (item) {
                if (item.Id) {
                    sessionStorage.setItem("SelectedL2", item.Id);
                    sessionStorage.setItem("NavLevel", "2");
                }
                if (this.$scope.openItemId) {
                    sessionStorage.setItem("SelectedL1", this.$scope.openItemId);
                }
                window.location.href = "l2Nav.html";
            };
            NavController.prototype.redirectToL3Nav = function (item, parent) {
                if (item.Id) {
                    sessionStorage.setItem("SelectedL2", parent.Id);
                    sessionStorage.setItem("SelectedL3", item.Id);
                    sessionStorage.setItem("NavLevel", "3");
                }
                if (this.$scope.openItemId) {
                    sessionStorage.setItem("SelectedL1", this.$scope.openItemId);
                }
                window.location.href = "l3Nav.html";
            };
            NavController.prototype.loadNavItems = function (item) {
                var _this = this;
                var contentArea = $(".content-area");
                contentArea.bind("click", this.clickToClose);
                this.$scope.l2NavItems.length = 0;
                this.$scope.openItemId = item.Id;
                this.dataService.getL2NavItems(item.Id)
                    .then(function (data) {
                    var row = [];
                    var rowIndex = 0;
                    for (var i = 0; i < data.length; i++) {
                        data[i].L3Items = [];
                        row.push(data[i]);
                        var returnIndex = row.indexOf(data[i]);
                        _this.getL3NavForL2(returnIndex, rowIndex, data[i].Id);
                        if (row.length == 3 || i == data.length - 1) {
                            var test = _this.$scope.l2NavItems;
                            _this.$scope.l2NavItems[rowIndex] = (row);
                            rowIndex++;
                            row = [];
                        }
                    }
                    _this.$scope.menuClosed = false;
                });
            };
            NavController.prototype.IsOpenItem = function (itemId) {
                return (this.$scope.openItemId == itemId) || (this.$scope.selectedItemId == itemId);
            };
            NavController.prototype.getL3NavForL2 = function (returnIndex, rowIndex, l2Id) {
                var _this = this;
                this.dataService.getL3NavItems(l2Id)
                    .then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        _this.$scope.l2NavItems[rowIndex][returnIndex].L3Items.push(data[i]);
                    }
                });
            };
            NavController.prototype.initiateClock = function () {
                var _this = this;
                var date = new Date();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var suffix = (hour >= 12) ? "pm" : "am";
                if (hour == 0 && minute < 2) {
                    this.initiateDay();
                }
                var friendlyTime = App.Common.getFriendlyTime(hour, minute);
                $(".date-time > span.time").text(friendlyTime);
                $(".date-time > span.period").text(suffix);
                setTimeout(function () {
                    _this.initiateClock();
                }, 15000);
            };
            NavController.prototype.initiateDay = function () {
                var date = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tues";
                weekday[3] = "Wed";
                weekday[4] = "Thurs";
                weekday[5] = "Fri";
                weekday[6] = "Sat";
                var day = weekday[date.getDay()];
                var numberedDate = date.getDate();
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
                ];
                var month = monthNames[date.getMonth()];
                $(".date-time > span.date").text(day + ", " + month + " " + numberedDate);
            };
            NavController.$inject = ['$scope', '$timeout', 'dataService'];
            return NavController;
        }(App.BaseController));
        Nav.NavController = NavController;
    })(Nav = App.Nav || (App.Nav = {}));
})(App || (App = {}));
//# sourceMappingURL=controller.js.map