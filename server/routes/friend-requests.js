const mongoose = require("mongoose");
const _ = require("lodash");

module.exports = function(app, route) {

    app.route(route)
        .get(function main(request, response, next) {
            return mongoose.model("FriendRequest").find(request.query)
                .then(friendRequests => {
                    return response.json({friendRequests});
                })
                .catch(next)
        })
        .post(function main(request, response, next) {

            const data = _.pick(request.body, ["to"]);
            data.from = request.user._id;
            return mongoose.model("FriendRequest").create(data)
                .then(friendRequest => {
                    response.json({friendRequest});
                })
                .catch(next)

        })
}
