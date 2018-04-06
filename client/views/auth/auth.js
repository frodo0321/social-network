angular.module("app")
.controller("authController", function($scope) {
    console.log("AUTH CONTROLLER", $scope)

    $scope.signup=false;
    $scope.showSignup = function(signup) {
        console.log("SHOW SIGNUP", signup);
        $scope.signup = signup;
    }

})
