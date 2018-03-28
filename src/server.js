

const express = require("express");

const app = express();

app.route("/")
    .get((request, response, next) => {
        return response.json({test});
    })

app.listen(8000, () => {console.log("App listening on 8000");})
