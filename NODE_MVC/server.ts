import {MVC} from "./js/MVC";

export class Server {

    private express:any = require('express');
    private app:any = this.express();
    private bodyParser = require('body-parser');
    private path = require('path');
    private router = this.express.Router();
    
    constructor(){

        var port = process.env.PORT || 8080;
        
        this.configureParser();
        this.app.use('/static', this.express.static(__dirname + '/public')); // serve all files in the public directory
        MVC.registerRoutes(this.router,this.path.resolve('./js/controller'); // register all routes in all controller.
        
        this.app.use('/', this.router);
        this.app.listen(port);
        console.log('Server started on port:' + port);
    }
    
    private configureParser(){
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.use(this.bodyParser.json());
    }
    
}

var server = new Server();
