const fs = require('fs');
const path = require("path");
const mongoose = require("mongoose");


function listFiles(mainDir) {
    console.log("FILE FILES", mainDir);
    var fileList = [];
    function listFilesInner(dir) {
        console.log("LIST FILES INNER", dir);
        var files = fs.readdirSync(dir);
        files.forEach(file => {
            var absPath = path.join(dir, file);
            if (fs.statSync(absPath).isDirectory()) {
                listFilesInner(absPath);
            }
            else {
                if (absPath.endsWith(".js") && file != "index.js") {
                    var route = absPath.replace(mainDir, "").split(".js")[0];
                    var relPath = "." + absPath.replace(mainDir, "");
                    fileList.push({absPath, file, relPath, route});
                }
            }
        })
    }
    listFilesInner(mainDir);
    return fileList;
}
//console.log(listFiles(__dirname));


module.exports = function(app) {

    //var files = fs.readdirSync(__dirname);

    //files = files
    //    .filter(file => file.endsWith(".js"))
    //    .filter(file => file != "index.js")

    //var routes = files
    //    .map(file => {
    //        return "/" + file.split(".")[0];
    //    })

    var files = listFiles(__dirname);

    app.get("/", function main(request, response, next) {
            var html = 
                "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<title>API</title>" +
                "</head>" +
                "<body>" + 
                "<h1>API Endpoints</h1>" + 
                files.reduce((result, file) => {
                    var fullPath = path.join(request.baseUrl, file.route);
                    return result +
                        "<div><a href='" +
                        fullPath +
                        "'>" +
                        file.route +
                        "</a></div>";
                }, "") +
                "</body>" +
                "</html>";

            console.log("PATH", request.baseUrl);

            return response.send(html);
    })

    files 
        .forEach(file => {
            console.log("file", file);
            require(file.relPath)(app, file.route);
        })

}
