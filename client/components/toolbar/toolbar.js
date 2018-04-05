angular.module("app")

.component("toolbar", {
    templateUrl: "toolbar",
    controller: function toolbarController($scope) {
        console.log("TOOLBAR CONTROLLER");
    }
})

