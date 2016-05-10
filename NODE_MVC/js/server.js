"use strict";
var Server = (function () {
    function Server() {
        this.fs = require("fs");
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.path = require('path');
        this.router = this.express.Router();
        var port = process.env.PORT || 8080;
        this.configureParser();
        this.configureControllers();
        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    Server.prototype.configureControllers = function () {
        var router = this.router;
        var app = this.app;
        var express = this.express;
        var path = this.path;
        this.app.use('/static', this.express.static(__dirname + '/public'));
        this.fs.readdirSync('./js/controller').forEach(function (file) {
            var controllerName = file.substring(0, file.indexOf(".js"));
            app.use(express.static(path.join(__dirname, 'public')));
            if (file.substr(-3) == '.js' && controllerName != 'basecontroller') {
                var controller = require('./js/controller/' + file);
                try {
                    controller[controllerName](router);
                }
                catch (err) {
                    console.error("cannot register: " + controllerName);
                }
            }
        });
        this.app.use('/', this.router);
    };
    Server.prototype.configureParser = function () {
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    };
    Server.prototype.configureMiddleWare = function () {
        // sample app.use function.
        this.app.use(function (req, res, next) {
            console.log("time:", Date.now());
            next();
        });
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map