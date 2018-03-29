const fs = require('fs');
const mongoose = require("mongoose");


module.exports = function(app, route) {

    var files = fs.readdirSync(__dirname);

    files
        .filter(file => file.endsWith(".js"))
        .filter(file => file != "index.js")
        .forEach(file => {

            const route = "/" + file.split(".")[0]
            require("./" + file)(app, route);
        })


}
