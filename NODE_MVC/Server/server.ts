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
                
        var port = process.env.PORT || 8089;
        this.configureParser();


// Register View Engine ###################################################################################
        
        this.app.set('view engine', 'vash');
        this.app.set('views',this.path.join(__dirname,'js/views'));

// Register View Engine ###################################################################################
        
        // log all access;
        this.app.use('/',(req,res,next)=>{
            console.log(new Date(), req.method, req.url);
            next();
        })

        
        this.app.use('/', this.router);
        
// register MVC################################################################
        MVC.registerRoutes(this.router,this.path.resolve('./js/controller')); // register all routes in all controllers.        
        MVC.registerHelpers(this.vash);
// register MVC################################################################


        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    
    private configureParser(){
        
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    }
}

var server = new Server();
