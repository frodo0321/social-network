const mongoose = require("mongoose");
const _ = require("lodash");

module.exports = function(app, route) {
    app.route(route)
        .get(function main(request, response, next) {

            return mongoose.model("StatusUpdate").find({}).sort({createdAt: -1}).populate("user").then(statusUpdates => {
                    return response.json({statusUpdates});
                })
                .catch(next)

        })
        .post(function main(request, response, next) {

            const data = _.pick(request.body, ["text"]);
            data.user = request.user._id;
            return mongoose.model("StatusUpdate").create(data).then(statusUpdate => {
                    return response.json({statusUpdate});
                })
                .catch(next)
            
        })
}
