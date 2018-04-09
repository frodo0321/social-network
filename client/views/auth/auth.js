angular.module("app")
.controller("authController", function($scope, $api, $mdToast) {
    console.log("AUTH CONTROLLER", $scope)

    $scope.signup=false;
    $scope.showSignup = function(signup) {
        console.log("SHOW SIGNUP", signup);
        $scope.signup = signup;
    }

    $scope.data = {};
    function submit(endpoint, data) {

        return $api.post(endpoint, data)
            .then(function(response) {
                console.log("LOGIN", response.data);
            })
            .catch(function(response) {
                var error = response.data.errors[0];
                console.log("EROROROROROR", error);
                return $mdToast.showSimple(error);
            })
        
    }

    loginData = {};
    loginData.onSubmit = function loginOnSubmit() {
        submit("/login", {email: loginData.email, password: loginData.password});
    }
    $scope.loginData = loginData;

    signupData = {};
    signupData.onSubmit = function signupOnSubmit() {
        submit("/signup", {email: signupData.email, password: signupData.password});
    }
    $scope.signupData = signupData;
})

.directive("matches", function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.matches = function(modelValue, viewValue) {
                console.log("LINK MATCHES CTRL", ctrl);
                console.log("LINK MATCHES CTRL", ctrl.$$parentForm.password);
                console.log("LINK MATCHES CTRL", );
                var passwordValue = ctrl.$$parentForm.password.$modelValue;
                if (passwordValue == modelValue) {
                    return true;
                }
                return false;
            };
        }
    };
})
