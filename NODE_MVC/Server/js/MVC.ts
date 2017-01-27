

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
    server:any;
}

export interface IModel{

}

export interface CurrentContext{
    request:any;
    response:any;    
}

export class ActionResult{
    view:any;
    model:any;        
}




export class Controller{

    public server:any;
    public CurrentContext:any;
    public get Server():any{
        return this.server;
    }

    public set Server(value:any){
        this.server= value;
    }


    public View(view:string,model:IModel) {
        return MVC.View(view,model);
    }

    public Log(input:string) {
     console.log(input);
    }

    constructor(){
        console.log("base constructor call");
        debugger;
    }

    //public router:any;// = MVC.router;
    //public authorization:iAuthorization;

}

export class DefaultHelpers{
    
    public static LabelFor(field:any,htmllabelAttribtes?:Array<string>){
        return '<div class="label"> <label for="' + field + '" '  +  DefaultHelpers.stringifyAttributes(htmllabelAttribtes) +'   >' + field +'</label></div>';    
    }

    public static TextBoxFor(field:any,htmlInputAttribtes?:Array<string>,htmllabelAttribtes?:Array<string>){
        var label = this.LabelFor(field,htmllabelAttribtes);
        var input = '<div class="field"><input '  + DefaultHelpers.stringifyAttributes(htmlInputAttribtes) + ' type="text" value="' + field + '"/></div>'; 

        return  '<div>' + label + input + '</div>';
    }

    private static stringifyAttributes(htmlAttributes?:Array<string>){
       
       if (htmlAttributes === null || htmlAttributes === undefined || htmlAttributes === []){
           return "";
       }

       return htmlAttributes.join(" ");
    }

}

export class MVC {  

    static _router;

    static _templateEngine;

    public static get router():any{
        return this._router;
    }

    public static set router(value:any){
        this._router = value;
    }

    public static get templateEngine():any{
        if(this._templateEngine === null || this._templateEngine === undefined){
            throw 'Template engine is undefined.'
        }

        return this._templateEngine;
    }

    public static set templateEngine(value:any){
        this._templateEngine = value;
    }

    public static View(view:string,model:IModel): ActionResult{
        // some work here to find the view.
        // search for a view with the name specified, 
        // inject the model into the view
        // render the view.
        //return the view to the client.
        var actionResult:ActionResult = new ActionResult();
        actionResult.model = model;
        actionResult.view = view;
        return actionResult;
    };

    static fs: any = require("fs");
    static validators: Array<validator> = [];

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
                this.router[method]("/" + name + route,this.routeFunction(descriptor.value,target));
                console.log("registering route: ", "'/" + name + route + "'");

            } else {
                throw "please provide a route for " + propertyKey
            }
        };
    }

    public static routeFunction(fctn:Function,target:any){
        let _target = target;
        return (req:any,res:any)=>{
            _target.__proto__.CurrentContext = {request:req,response:res};
            var values = this.modelBinder(req.params,req.query,req.body);
            var bindingResult:ActionResult = fctn.call(target,values)

            if(bindingResult != undefined){
                if(bindingResult.view != undefined){
                      res.render(bindingResult.view,bindingResult.model)
                      return;
                   }
               
                res.json({
                    message:bindingResult
                })                    
            }

            throw "cannot find a return value do some work here.";

        }
    }

    public static Authorize() {
        return (target: any) => {
            
            var ctrlr: IController = target;
            ctrlr.authorization = null;
            console.log("AuthorizeAttribute",target.name);

        };
    }

    

    /// preppend slash to route if none exists.
    private static cleanRoute(route: string) {
        if (route.substr(0, 1) != "/") {
            route = "/" + route;
        }
        return route;
    }
    
    public static registerHelpers(templateEngine:any){
        //register helpers here.
        
        Object.keys(DefaultHelpers).forEach((item)=>{
         templateEngine.helpers[item] = (field)=> {
            var htmlString = DefaultHelpers[item](field);
           return templateEngine.helpers.raw(htmlString);
    }
    });

        

    }

    public static registerRoutes(router: any, controllerLocation: string) {
        MVC.router = router; 

        //if(!this.fs.exists(controllerLocation)){
        //        router.get('/',function(req,res){
        //        res.send("controller path has not been configured");
        //    });
        //    console.log(controllerLocation);
        //    throw  "MVC.registerRoutes(router,path); path for controller location cannot be found " + controllerLocation;
        //}

        let files = this.fs.readdirSync(controllerLocation);
        
        files.forEach(function(file) {
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
/*
* Recursively merge properties of two objects 
*/
public static MergeObject(obj1, obj2) {

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = MVC.MergeObject(obj1[p], obj2[p]);

      } else {
        obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}
    
    //model binders.
    public static modelBinder(formValues:any,queryString:any,bodyValues:any):any{
        /* NOT COMPLETE.
        1.) Previously bound action parameters, when the action is a child action
        2.) Form fields (Request.Form)
        3.) The property values in the JSON Request body (Request.InputStream), but only when the request is an AJAX request
        4.) Route data (RouteData.Values)
        5.) Querystring parameters (Request.QueryString)
        6.) Posted files (Request.Files)
         */

            var values;
                values = MVC.MergeObject(formValues,bodyValues);
                values = MVC.MergeObject(values,queryString);
            return values;

    }
    
    //vash helpers
public static textBox(item) {

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
