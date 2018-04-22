const mongoose = require("mongoose");
const _ = require("lodash");

module.exports = function(app, route) {

    app.route(route)
        .get(function main(request, response, next) {
            const friendRequestQuery = _.pick(request.query, ["to", "from"]);

            if (friendRequestQuery.to != request.user._id && friendRequestQuery.from != request.user._id) {
                return response.status(401).json({errors: ["Unauthorized"]});
            }

            return mongoose.model("FriendRequest").find(friendRequestQuery).populate("to").populate("from")
                .then(friendRequests => {
                    return response.json({friendRequests});
                })
                .catch(next)
        })
        .post(function main(request, response, next) {

            const data = {
                to: request.body.user,
                from: request.user._id
            };

            return mongoose.model("FriendRequest").create(data)
                .then(friendRequest => {
                    response.json({friendRequest});
                })
                .catch(next)

        })
}
