"use strict";
var MVC_1 = require("./js/MVC");
var Server = (function () {
    function Server() {
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.path = require('path');
        this.router = this.express.Router();
        this.fs = require("fs");
        this.vash = require("vash");
        var port = process.env.PORT || 8080;
        this.configureParser();
        //this.app.use(this.express.static(this.path.join(__dirname, 'public'))); // serve all files in the public directory
        this.app.set('view engine', 'vash');
        this.app.set('views', this.path.join(__dirname, 'js/views'));
        // log all access;
        this.app.use('/', function (req, res, next) {
            console.log(new Date(), req.method, req.url);
            next();
        });
        //this.app.engine('jshtml',function (filePath, options, callback) { // define the template engine
        //    this.fs.readFile(filePath, function (err, content) {
        //
        //    if (err) return callback(new Error(err));
        //    // 'compile jshtml file here.'            
        //    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
        //                                     .replace('#message#', '<h1>'+ options.message +'</h1>');
        //        return callback(null, rendered);
        //    })
        //});
        //begin  test for vash
        //var tpl = this.vash.compile('<p>I am a @model.t! @model</p>');
        //var out = tpl({ t: 'template' });
        // <p>I am a template!</p>
        this.app.get('/', function (req, res) {
            res.render('index', { title: 'Title of a thing', message: 'Hello there!' });
        });
        // end test for vash
        this.app.use('/', this.router);
        MVC_1.MVC.registerRoutes(this.router, this.path.resolve('./js/controller')); // register all routes in all controller.        
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