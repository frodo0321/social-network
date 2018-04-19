angular.module("app")
.config(function profileUiRouterConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state("profile", {
            url: "/profile",
            templateUrl: "profile",
            controller: "profileController"
        }
    );
})
.controller("profileController", function profileController($scope, $api) {
    console.log("PROFILE", $scope);

    //$api.get("me")
    //    .then(function (response) {
    //        
    //    })

    this.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };


})
