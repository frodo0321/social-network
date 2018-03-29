const mongoose = require("mongoose");
const _ = require("lodash");

const debug = require("debug")("social-network");


module.exports = function(app, route) {
    console.log("route", route);

    app.route(route)
        .get(function main(request, response, next) {
            debug("mognoose model user", mongoose.model("User"));
            return mongoose.model("User").find({})
                .then(users => {
                    debug("users", users);
                    return response.json({users});
                })
                .catch(next)
        })

}
