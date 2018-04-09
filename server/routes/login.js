const express = require("express");
const mongoose = require("mongoose");


module.exports = function(app, route) {

    app.route(route)
        .post(function main(request, response, next) {


            const userQuery = {email: request.body.email};
            return mongoose.model("User").findOne(userQuery).select("+password").then(user => {
                    console.log("USER", user);
                    if (!user) {
                        return response.status(400).json({errors: ["Invalid email or password"]});
                    }
                    return user.verifyPassword(request.body.password)
                        .then(valid => {
                            console.log("IS VALID", valid);
                            if (valid) {
                                return request.login(user, error => {
                                    if (error) {
                                        console.error("LOGIN ERROR", error);
                                        return next(error);
                                    }
                                    response.json({success: true});
                                });
                            }
                            else {
                                return response.status(400).json({errors: ["Invalid email or password"]});
                            }
                        })
                })
                .catch(next)
        })

}
