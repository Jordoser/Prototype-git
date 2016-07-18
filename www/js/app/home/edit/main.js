var App;
(function (App) {
    var Home;
    (function (Home) {
        var Edit;
        (function (Edit) {
            "use strict";
            angular.module('homeEditApp', [])
                .controller('homeEditController', Edit.HomeEditController)
                .service('dataService', Home.HomeDataService);
        })(Edit = Home.Edit || (Home.Edit = {}));
    })(Home = App.Home || (App.Home = {}));
})(App || (App = {}));
//# sourceMappingURL=main.js.map