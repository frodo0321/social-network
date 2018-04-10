angular.module("app")
.component("statusUpdate", {
    templateUrl: "status-update",
    replace: true,
    bindings: {
        data: "<"
    },
    controller: function statusUpdateController($scope) {
        console.log("STATUS UPDATE CONTROLLER", $scope);
    }
})

