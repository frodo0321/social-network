const mongoose = require("mongoose");
const _ = require("lodash");

module.exports = function(app, route) {
    console.log("SIGNUP", route);

    app.route(route)
        .get(function main(request, response, next) {
            return response.json({test: true})
        })
        .post(async function main(request, response, next) {
            console.log(request.body);

            const userData = _.pick(request.body, ["email", "password"]);
            console.log("USER DATA", userData);

            mongoose.model("User").create(request.body)
                .then(user => {
                    return response.json({test: true})
                })
                .catch(next);
        })

}
