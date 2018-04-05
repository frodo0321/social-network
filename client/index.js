
console.log("TEST");

angular.module("app", ["templates", "ui.router"])

.run(function ($rootScope) {

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
            console.log("EEEEEE", event);
            //event.preventDefault();
            // transitionTo() promise will be rejected with
            // a 'transition prevented' error
    })

})

.config(function uiRouterConfig($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    //$urlRouterProvider.otherwise("/")
    //$urlRouterProvider.when("/", "news-feed");
    $stateProvider.state("news-feed", {
            url: "/",
            templateUrl: "news-feed",
            controller: "newsFeedController"
        }
    )
    $stateProvider.state("auth", {
            url: "auth",
            templateUrl: "auth",
            controller: "authController"
        }
    )
})




.config(function ($provide) {
    $provide.decorator("$rootScope", function($delegate) {
        //var debugBroadcasts = false;
        //var debugEmits = false;
        var debugBroadcasts = true;
        var debugEmits = true;
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
