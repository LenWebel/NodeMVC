"use strict";
var MVC_1 = require("./js/MVC");
var Server = (function () {
    function Server() {
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.path = require('path');
        this.router = this.express.Router();
        var port = process.env.PORT || 8080;
        this.configureParser();
        this.app.use('/static', this.express.static(__dirname + '/public')); // serve all files in the public directory
        MVC_1.MVC.registerRoutes(this.router, this.path.resolve('./js/controller')); // register all routes in all controller.
        this.app.use('/', this.router);
        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    Server.prototype.configureParser = function () {
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map