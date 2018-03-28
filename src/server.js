const moment = require("moment");
const bluebird = require("bluebird");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.Promise = bluebird.Promise;
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost/socialnetwork');

require("./models");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function requestLogger(request, response, next) {

    console.log(moment(), request.method, request.path, request.ip);

    return next();
})

app.route("/")
    .get((request, response, next) => {
        return response.json({test: true});
    })

require("./routes")(app);

app.use(function errorHandler(error, request, response, next) {
    console.error(error);
    response.status(500);
    response.json({error: true});
})


app.listen(8000, () => {console.log("App listening on 8000");})

process.on("uncaughtException", console.error);

module.exports = app;
