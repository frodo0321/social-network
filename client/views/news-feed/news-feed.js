angular.module("app")
.controller("newsFeedController", function newsFeedController($scope, $api) {
    console.log("NEWS FEED CONTROLLER", $scope)

    function fetchStatuses() {
        $api.get("status-updates")
            .then(function(response) {
                $scope.statusUpdates = response.data.statusUpdates;
            })
        //$scope.statusUpdates = [{
        //    user: {
        //        email: "test@example.com",
        //        name: "Test User",
        //        profilePicture: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png",
        //        _id: "testId"
        //    },
        //    text: (new Array(10)).fill(null).reduce(function(result) {return result += "blah "}, ""),
        //    createdAt: new Date().toString()
        //}, {
        //    user: {
        //        email: "test+2@example.com",
        //        name: "Test User 2",
        //        profilePicture: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png",
        //        _id: "testId2"
        //    },
        //    text: (new Array(50)).fill(null).reduce(function(result) {return result += "blah "}, ""),
        //    createdAt: new Date().toString()
        //}];
    }
    fetchStatuses();

    function updateStatus(text) {
        var data = {text: text};
        $api.post("status-updates", data)
            .then(function(response) {
                console.log("SUCCESS", response.data);
                fetchStatuses();
            })
            .catch(function(response) {
                console.error("ERROR", response);
            })
    }
    $scope.updateStatus = updateStatus;

})
