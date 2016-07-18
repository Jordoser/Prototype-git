var App;
(function (App) {
    var l2item;
    (function (l2item) {
        "use strict";
        angular.module('l2App', [])
            .controller('l2Controller', l2item.L2Controller)
            .service('dataService', l2item.L2DataService);
    })(l2item = App.l2item || (App.l2item = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map