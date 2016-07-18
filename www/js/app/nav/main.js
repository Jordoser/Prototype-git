var App;
(function (App) {
    var Nav;
    (function (Nav) {
        "use strict";
        angular.module('navApp', [])
            .controller('navController', Nav.NavController)
            .service('dataService', Nav.NavDataService);
    })(Nav = App.Nav || (App.Nav = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map