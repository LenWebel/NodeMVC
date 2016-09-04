import {MVC} from "./js/MVC";

export class Server {

    private express:any = require('express');
    private app:any = this.express();
    private bodyParser = require('body-parser');
    private path = require('path');
    private router = this.express.Router();
    private fs: any = require("fs");
    private vash:any = require("vash");
    constructor(){

        
        var port = process.env.PORT || 8080;
        this.configureParser();
        //this.app.use(this.express.static(this.path.join(__dirname, 'public'))); // serve all files in the public directory
        
        this.app.set('view engine', 'vash');
        this.app.set('views',this.path.join(__dirname,'js/views'));
        
        
        // log all access;
        this.app.use('/',(req,res,next)=>{
            console.log(new Date(), req.method, req.url);
            next();
        })

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
          res.render('index', { title: 'Title of a thing', message: 'Hello there!'});
        });

// end test for vash

        this.app.use('/', this.router);
        
        MVC.registerRoutes(this.router,this.path.resolve('./js/controller')); // register all routes in all controller.        
        
        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    
    private configureParser(){
        
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    }
}

var server = new Server();
