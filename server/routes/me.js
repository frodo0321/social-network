const mongoose = require("mongoose");

module.exports = function(app, route) {

    app.route(route)
        .get(function main(request, response, next) {
            return response.status(401).send();
            //return response.json({test});
        })

}
