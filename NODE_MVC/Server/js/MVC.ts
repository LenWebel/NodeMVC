

export interface iAuthorization{
    token:string;
    authorized:boolean;
}

export interface validator {
    property: string;
    function: Function;
    errorMessage:string;
}

export interface IController {
    router:any;
    authorization:iAuthorization;
}

export interface IModel{

}
export class Controller{

}

export class ActionResult{
        
}

export class MVC {

    public static View(viewName:string,ViewModel:IModel): ActionResult{
        // some work here to find the view.
        // search for a view with the name specified, 
        // inject the model into the view
        // render the view.
        //return the view to the client. 
        return new ActionResult();
    };

    static fs: any = require("fs");
    static validators: Array<validator> = [];

  static   _router;

 public static get router():any{
      return this._router;
  }

  public static set router(value:any){
      this._router = value;
  }

    public static httpGet(route: string) {
        return this.http("get", route);
    }

    public static httpPost(route: string) {
        return this.http("post", route);
    }

    private static http(method: string, route: string) {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            if (route !== "") {
                route = this.cleanRoute(route);
                var name = target.constructor.name; // controller name. 
                name = name.substr(0, name.toLowerCase().indexOf("controller")); // trims controller name eg: PersonController -> Person
                this.router[method]("/" + name + route, descriptor.value);
                //target.constructor.router[method]("/" + name + route, descriptor.value);
                console.log("registering route: ", "'/" + name + route + "'");
            } else {
                throw "please provide a route for " + propertyKey
            }
        };
    }

    public static Authorize() {
        return (target: any) => {
            
            var ctrlr: IController = target;
            ctrlr.authorization = null;
            console.log("AuthorizeAttribute",target.name);

        };
    }

    public ModelBinderRequest<TModel>(request:any, model:TModel){
    }

    /// preppend slash to route if none exists.
    private static cleanRoute(route: string) {
        if (route.substr(0, 1) != "/") {
            route = "/" + route;
        }
        return route;
    }

    public static registerRoutes(router: any, controllerLocation: string) {
        MVC.router = router;
        this.fs.readdirSync(controllerLocation).forEach((file) => {
            var controllerName = file.substring(0, file.indexOf(".js"));
            if (file.substr(-3) == '.js') {
                var controller = require(controllerLocation + '/' + file);
                try {
                    var ctrlr: IController = controller[controllerName]; 
                    ctrlr.router = router;
                }
                catch (err) {
                    console.error("cannot register: " + controllerName)
                }
            }
        });
    }

    
    //model binders.
    
    public static ModelBinder(request:any):any{
        
    }
    
    // viewmodel validation

    public static ValidateModel(model:any){
        let errors = [];
    
        for(var val in MVC.validators){
            let isValid = MVC.validators[val].function(MVC.validators[val].errorMessage,model);
            if(!isValid){
                errors.push(
                    {
                        property:MVC.validators[val].property,
                        isValid,
                        errorMessage: MVC.validators[val].errorMessage
                    });    
            }
        }
        return errors;
    }



    // decorators

    public static Required(errorMessage?:string,condition?: Function) {
        return (target: any, propertyKey: string) => {
            if (condition) {
                 MVC.validators.push({errorMessage:errorMessage, property: propertyKey, function: (errorMessage,model) => condition(errorMessage,model) });
            }
            else{
                MVC.validators.push({errorMessage:errorMessage, property: propertyKey, function: () => { return target !== undefined && target !== null && target !== ""; } });
            }
        }
    }

    public static Validator(errorMessage?:string,condition?: Function) {
        return (target: any, propertyKey: string) => {
            if (condition) {
                 MVC.validators.push({errorMessage:errorMessage, property: propertyKey, function: (errorMessage,model) => condition(errorMessage,model) });
            }
        }
    }




}
