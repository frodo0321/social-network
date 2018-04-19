angular.module("app")
.component("toolbar", {
    templateUrl: "toolbar",
    controller: function toolbarController($scope, $api, $state) {
        console.log("TOOLBAR CONTROLLER");

        $scope.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.logout = function logout() {
            return $api.post("logout")
                .then(function(response) {
                    return $state.go("login");
                })
                .catch(function(response) {
                    console.error("error", response);
                })
        }


    }
})

