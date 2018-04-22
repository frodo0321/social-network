angular.module("app")
.component("toolbar", {
    templateUrl: "toolbar",
    controller: function toolbarController($rootScope, $scope, $api, $state, $transitions) {
        console.log("TOOLBAR CONTROLLER", $scope);

        $transitions.onSuccess({}, function(transition) {
            console.log("TRANSITIONrwihfi", transition.to());
            if (transition.to().name == "auth") {
                $scope.showMenus = false;
            }
            else {
                if ($scope.showMenus != true) {
                    $scope.showMenus = true;
                }
                fetchFriendRequests();
            }
        });

        $scope.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.logout = function logout() {
            return $api.post("logout")
                .then(function(response) {
                    return $state.go("auth");
                })
                .catch(function(response) {
                    console.error("error", response);
                })
        }

        function fetchFriendRequests() {
            console.log("ROOT SCOPE", $rootScope);
            var user = $rootScope.user;
            if (user) {
                $api.get("friend-requests?to=" + user._id)
                    .then(function(response) {
                        $scope.friendRequests = response.data.friendRequests;
                    })
                    .catch(function(response) {
                        console.error("ERROR", response);
                    })
            }
        
        }

    }
})
