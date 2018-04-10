
console.log("TEST");

angular.module("app", ["templates", "ui.router", "ui.router.state", "ngMaterial", "ngMessages"])

.config(function($httpProvider) {
    console.log("HTTP PROVIDER", $httpProvider);
    $httpProvider.defaults.transformRequest.unshift(function transformRequest(data) {
        console.log("TRANSFORM REQUEST", data);
        return data;
    })
})


.factory("$api", function apiFactory($http) {
    var ret = {};
    var wrappedMethods = ["get", "post", "delete", "put", "patch", "head"];
    var apiPath = "/api";

    Object.assign(ret, $http);

    wrappedMethods.forEach(method => {
        ret[method] = function() {
            console.log(method, "called", arguments);

            var url = arguments[0];
            url = url.replace(/^\/|\/$/g, '');
            url = apiPath + "/" + url;

            arguments[0] = url;

            return $http[method].apply(null, arguments)
        }
    })


    return ret;
})

.run(function($rootScope, $transitions, $api, $state) {
    console.log("APIAIPIPII", $api);

    $state.go("news-feed");
    $transitions.onStart({}, function(transition) {
        console.log("ON sTART TRANSitioN", transition);
        var state = transition.to().name;
        if (state != "auth") {
            return $api.get("/me")
                .then(function(data) {
                    $rootScope.user = data;
                })
                .catch(function(error) {
                    console.log("THERE WAS AN ERROR", error);
                    if (error.status == 401) {
                        $state.go("auth");
                    }
                    else {
                        console.error(error);
                    }
                });
        }
    })

})

.config(function uiRouterConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $urlRouterProvider.otherwise("/")
    //$urlRouterProvider.when("/", "news-feed");
    $stateProvider.state("news-feed", {
            url: "",
            templateUrl: "news-feed",
            controller: "newsFeedController"
        }
    )
    $stateProvider.state("auth", {
            url: "/auth",
            templateUrl: "auth",
            controller: "authController"
        }
    )
    console.log($urlRouterProvider);
})





.config(function ($provide) {
    $provide.decorator("$rootScope", function($delegate) {
        var debugBroadcasts = false;
        var debugEmits = false;
        var Scope = $delegate.constructor;
        var origBroadcast = Scope.prototype.$broadcast;
        var origEmit = Scope.prototype.$emit;
        Scope.prototype.$broadcast = function(name, args) {
            var ret = origBroadcast.apply(this, arguments)
            function log() {
                console.log("$broadcast happened!", name, args, ret);
            }
            if (debugBroadcasts) {
                log();
            }
            return ret;
        }
        Scope.prototype.$emit = function $emit(name, args) {
            var ret = origEmit.apply(this, arguments);
            function log() {
                console.log("$emit happened!", name, args, ret);
            }
            if (debugEmits) {
                log();
            }
            return ret;
        }
        return $delegate
    })
})


