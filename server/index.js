const moment = require("moment");
const bluebird = require("bluebird");
const path = require("path");

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

require("./middleware/auth")(app);


const apiRouter = express.Router()
apiRouter.use(function requestLogger(request, response, next) {

    var email = "Unauthenticated";
    if (request.user) {
        email = request.user.email;
    }
    console.log(moment(), email, request.method, request.path, request.ip);

    return next();
})
//apiRouter.get("/", function(request, response, next) {
//    response.json({api: {users: "get", signup: "post"}})
//})

require("./routes")(apiRouter);

app.use("/api", apiRouter)


app.get("/ping", function(request, response, next) {
    return response.json({pong: true});
});

const staticFilePath = path.resolve(path.join(__dirname, "../dist"));
console.log("static files served at", staticFilePath);
app.use("/", express.static(staticFilePath))


app.use(function errorHandler(error, request, response, next) {
    console.error(error);
    response.status(500);
    response.json({error: true});
})


app.listen(8000, () => {console.log("App listening on 8000");})

process.on("uncaughtException", error => {
    console.error(error);
    process.exit(1); // not optional
}
);

module.exports = app;
