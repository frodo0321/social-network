

module.exports = function(app, route) {

    app.route(route)
        .post(function main(request, response, next) {
            request.logout();
            request.session.destroy();
            response.clearCookie();
            return response.json({success: true});
        })

}
