const mongoose = require("mongoose");

module.exports = function(app, route) {

    app.route(route)
        .get(function main(request, response, next) {
            return mongoose.model("Friendship").find(request.query).populate("users")
                .then(friendships => {
                    return response.json({friendships});
                })
                .catch(next)
        })
        .post(function main(request, response, next) {

            const friendRequestQuery = _.pick(request.body, ["friendRequest"]);
            mongoose.model("FriendRequest").findOne(friendRequestQuery)
                .then(friendRequest => {
                    const friendshipData = {
                        users: [friendRequest.from, friendRequest.to],
                        friendRequest: friendRequest._id
                    };
                    mongoose.model("Friendship").create(friendshipData)
                        .then(friendship => {
                            friendRequest.status = "accepted";
                            return friendRequest.save()
                                .then(() => {
                                    return response.json({friendship});
                                })
                        })
                })
                .catch(next)
        })

}
