const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const passport = require("passport");

const mongoose = require("mongoose");


passport.serializeUser(function(user, done) {
    console.log("SERIALIZE USER", user);
    return done(null, user._id); 
});

passport.deserializeUser(function(userId, done) {
    console.log("DESERIALIZE USER", userId);
    return mongoose.model("User").findOne({_id: userId})
        .then(user => {
            return done(null, user)
        })
        .catch(done);
});


module.exports = function(app) {

    app.set('trust proxy', 1)


    //const redisOptions = {
    //    host: "",
    //    port: ""
    //};
    const redisOptions = {};

    const sessionConfig =   {
        store: new RedisStore(redisOptions),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    };
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());
}



