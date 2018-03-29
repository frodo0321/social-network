const fs = require('fs');
const mongoose = require("mongoose");

var files = fs.readdirSync(__dirname);

files
    .filter(file => file.endsWith(".js"))
    .filter(file => file != "index.js")
    .forEach(file => {
        const schema = require("./" + file);
        const modelName = file.split(".")[0].replace(/(^|-)(\w)/g, (all, $1, $2) => $2.toUpperCase());
        console.log("model name", modelName);
        mongoose.model(modelName, schema);
    })

