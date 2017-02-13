"use strict";
const MVC_1 = require("./js/MVC");
class Server {
    constructor() {
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.path = require('path');
        this.router = this.express.Router();
        this.fs = require("fs");
        this.vash = require("vash");
        var port = process.env.PORT || 8089;
        this.configureParser();
        // Register View Engine ###################################################################################
        this.app.set('view engine', 'vash');
        this.app.set('views', this.path.join(__dirname, 'js/views'));
        // Register View Engine ###################################################################################
        // log all access;
        this.app.use('/', (req, res, next) => {
            console.log(new Date(), req.method, req.url);
            next();
        });
        this.app.use('/', this.router);
        // register MVC################################################################
        MVC_1.MVC.registerRoutes(this.router, this.path.resolve('./js/controller')); // register all routes in all controllers.        
        MVC_1.MVC.registerHelpers(this.vash);
        // register MVC################################################################
        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    configureParser() {
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    }
}
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map