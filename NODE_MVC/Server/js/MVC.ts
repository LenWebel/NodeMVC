


export class MVC{
    
    static fs:any = require("fs");
    static router:any; 

        constructor(router:any){
            MVC.router = router;    
        }

    public static httpGet(route:string){
        return this.http("get",route);
    }

    public static httpPost(route:string){
        return this.http("post",route);
    }

    private static http(method:string, route:string){
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            if(route !== ""){
                route = this.cleanRoute(route);
                var name = target.constructor.name; // controller name. 
                    name = name.substr(0,name.toLowerCase().indexOf("controller")); // prefixes controller name IE PersonController -> Person
                MVC.router[method]("/" + name + route,descriptor.value);
                console.log("registering route: ", "'/" + name + route + "'");
            }else{
                throw "please provide a route for " + propertyKey
            }
        };
    }
    
    /// preppend slash to route if none exists.
    private static cleanRoute(route:string){
        if(route.substr(0,1) != "/"){
            route = "/" + route;
        }
        return route;
    }
    
    public static registerRoutes(router:any,controllerLocation:string){
 
        this.fs.readdirSync(controllerLocation).forEach(function (file) {
        var controllerName = file.substring(0,file.indexOf(".js"));
        if(file.substr(-3) == '.js') {
                var controller = require(controllerLocation + '/' + file);
                try{
                      controller[controllerName](router);
                   }
                catch(err){
                    console.error("cannot register: " + controllerName)
                }
            }
        });
}

}
