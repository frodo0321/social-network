angular.module("app")
.config(function findFriendsUiRouterConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state("find-friends", {
            url: "/find-friends",
            templateUrl: "find-friends",
            controller: "findFriendsController"
        }
    );
})
.controller("findFriendsController", function findFriendsController($scope, $api) {
    console.log("FIND FRIENDS", $scope);

    $api.get("users")
        .then(function(response) {
            $scope.users = response.data.users;
        })
        .catch(function(response) {
            console.error("ERROR", response);
        })

    $scope.addFriend = function addFriend(user) {
        console.log("ADDING FRIEND", user._id);
        $api.post("friend-requests", {user: user._id})
            .then(function(response) {
                console.log("SUCCESS!", response);
            })
            .catch(function(response) {
                console.log("ERROR", response);
            })
    }


})
