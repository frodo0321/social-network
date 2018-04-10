const mongoose = require("mongoose");

module.exports = function(app, route) {

    app.route(route)
        .get(function main(request, response, next) {
            console.log("SESSION", request.session);
            console.log("USER", request.user);
            
            if (request.user) {
                return response.json({user: request.user});
            }
            return response.status(401).json({errors: ["Unauthenticated"]});
            //return response.json({test});
        })

}
