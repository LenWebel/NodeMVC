"use strict";
class ActionResult {
}
exports.ActionResult = ActionResult;
class Controller {
    get Server() {
        return this.server;
    }
    set Server(value) {
        this.server = value;
    }
    View(view, model) {
        return MVC.View(view, model);
    }
    Log(input) {
        console.log(input);
    }
    constructor() {
        console.log("base constructor call");
        debugger;
    }
}
exports.Controller = Controller;
class DefaultHelpers {
    static LabelFor(field, htmllabelAttribtes) {
        return '<div class="label"> <label for="' + field + '" ' + DefaultHelpers.stringifyAttributes(htmllabelAttribtes) + '   >' + field + '</label></div>';
    }
    static TextBoxFor(field, htmlInputAttribtes, htmllabelAttribtes) {
        var label = this.LabelFor(field, htmllabelAttribtes);
        var input = '<div class="field"><input ' + DefaultHelpers.stringifyAttributes(htmlInputAttribtes) + ' type="text" value="' + field + '"/></div>';
        return '<div>' + label + input + '</div>';
    }
    static stringifyAttributes(htmlAttributes) {
        if (htmlAttributes === null || htmlAttributes === undefined || htmlAttributes === []) {
            return "";
        }
        return htmlAttributes.join(" ");
    }
}
exports.DefaultHelpers = DefaultHelpers;
class MVC {
    static get router() {
        return this._router;
    }
    static set router(value) {
        this._router = value;
    }
    static get templateEngine() {
        if (this._templateEngine === null || this._templateEngine === undefined) {
            throw 'Template engine is undefined.';
        }
        return this._templateEngine;
    }
    static set templateEngine(value) {
        this._templateEngine = value;
    }
    static View(view, model) {
        // some work here to find the view.
        // search for a view with the name specified, 
        // inject the model into the view
        // render the view.
        //return the view to the client.
        var actionResult = new ActionResult();
        actionResult.model = model;
        actionResult.view = view;
        return actionResult;
    }
    ;
    static httpGet(route) {
        return this.http("get", route);
    }
    static httpPost(route) {
        return this.http("post", route);
    }
    static http(method, route) {
        return (target, propertyKey, descriptor) => {
            if (route !== "") {
                route = this.cleanRoute(route);
                var name = target.constructor.name; // controller name. 
                name = name.substr(0, name.toLowerCase().indexOf("controller")); // trims controller name eg: PersonController -> Person
                this.router[method]("/" + name + route, this.routeFunction(descriptor.value, target));
                console.log("registering route: ", "'/" + name + route + "'");
            }
            else {
                throw "please provide a route for " + propertyKey;
            }
        };
    }
    static routeFunction(fctn, target) {
        let _target = target;
        return (req, res) => {
            _target.__proto__.CurrentContext = { request: req, response: res };
            var values = this.modelBinder(req.params, req.query, req.body);
            var result = fctn.call(target, values);
            // this probably needs work.
            if (result != undefined) {
                if (result.view != undefined) {
                    res.render(result.view, result.model);
                    return;
                }
                res.json({ result });
                return;
            }
            throw "cannot find a return value do some work here.";
        };
    }
    static Authorize() {
        return (target) => {
            var ctrlr = target;
            ctrlr.authorization = null;
            console.log("AuthorizeAttribute", target.name);
        };
    }
    /// preppend slash to route if none exists.
    static cleanRoute(route) {
        if (route.substr(0, 1) != "/") {
            route = "/" + route;
        }
        return route;
    }
    static registerHelpers(templateEngine) {
        //register helpers here.
        Object.keys(DefaultHelpers).forEach((item) => {
            templateEngine.helpers[item] = (field) => {
                var htmlString = DefaultHelpers[item](field);
                return templateEngine.helpers.raw(htmlString);
            };
        });
    }
    static registerRoutes(router, controllerLocation) {
        MVC.router = router;
        if (!this.fs.existsSync(controllerLocation)) {
            router.get('/', function (req, res) {
                res.send("controller path has not been configured");
            });
            console.log(controllerLocation);
            throw "MVC.registerRoutes(router,path); path for controller location cannot be found " + controllerLocation;
        }
        let files = this.fs.readdirSync(controllerLocation);
        files.forEach(function (file) {
            var controllerName = file.substring(0, file.indexOf(".js"));
            if (file.substr(-3) == '.js') {
                var controller = require(controllerLocation + '/' + file);
                try {
                    var ctrlr = controller[controllerName];
                    ctrlr.router = router;
                }
                catch (err) {
                    console.error("cannot register: " + controllerName);
                }
            }
        });
    }
    /*
    * Recursively merge properties of two objects
    */
    static MergeObject(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = MVC.MergeObject(obj1[p], obj2[p]);
                }
                else {
                    obj1[p] = obj2[p];
                }
            }
            catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }
    //model binders.
    static modelBinder(formValues, queryString, bodyValues) {
        /* NOT COMPLETE.
        1.) Previously bound action parameters, when the action is a child action
        2.) Form fields (Request.Form)
        3.) The property values in the JSON Request body (Request.InputStream), but only when the request is an AJAX request
        4.) Route data (RouteData.Values)
        5.) Querystring parameters (Request.QueryString)
        6.) Posted files (Request.Files)
         */
        var values;
        values = MVC.MergeObject(formValues, bodyValues);
        values = MVC.MergeObject(values, queryString);
        return values;
    }
    //vash helpers
    static textBox(item) {
    }
    // viewmodel validation
    static ValidateModel(model) {
        let errors = [];
        for (var val in MVC.validators) {
            let isValid = MVC.validators[val].function(MVC.validators[val].errorMessage, model);
            if (!isValid) {
                errors.push({
                    property: MVC.validators[val].property,
                    isValid,
                    errorMessage: MVC.validators[val].errorMessage
                });
            }
        }
        return errors;
    }
    // decorators
    static Required(errorMessage, condition) {
        return (target, propertyKey) => {
            if (condition) {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: (errorMessage, model) => condition(errorMessage, model) });
            }
            else {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: () => { return target !== undefined && target !== null && target !== ""; } });
            }
        };
    }
    static Validator(errorMessage, condition) {
        return (target, propertyKey) => {
            if (condition) {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: (errorMessage, model) => condition(errorMessage, model) });
            }
        };
    }
}
MVC.fs = require("fs");
MVC.validators = [];
exports.MVC = MVC;
//# sourceMappingURL=MVC.js.map