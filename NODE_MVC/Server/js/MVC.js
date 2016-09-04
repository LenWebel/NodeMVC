"use strict";
var ActionResult = (function () {
    function ActionResult() {
    }
    return ActionResult;
}());
exports.ActionResult = ActionResult;
var MVC = (function () {
    function MVC() {
    }
    MVC.View = function (viewName, ViewModel) {
        // some work here to find the view.
        // search for a view with the name specified, 
        // inject the model into the view
        // render the view.
        //return the view to the client. 
        return new ActionResult();
    };
    ;
    MVC.httpGet = function (route) {
        return this.http("get", route);
    };
    MVC.httpPost = function (route) {
        return this.http("post", route);
    };
    MVC.http = function (method, route) {
        var _this = this;
        return function (target, propertyKey, descriptor) {
            if (route !== "") {
                route = _this.cleanRoute(route);
                var name = target.constructor.name; // controller name. 
                name = name.substr(0, name.toLowerCase().indexOf("controller")); // trims controller name eg: PersonController -> Person
                target.constructor.router[method]("/" + name + route, descriptor.value);
                console.log("registering route: ", "'/" + name + route + "'");
            }
            else {
                throw "please provide a route for " + propertyKey;
            }
        };
    };
    MVC.Authorize = function () {
        return function (target) {
            var ctrlr = target;
            ctrlr.authorization = null;
            console.log("AuthorizeAttribute", target.name);
        };
    };
    MVC.prototype.ModelBinderRequest = function (request, model) {
    };
    /// preppend slash to route if none exists.
    MVC.cleanRoute = function (route) {
        if (route.substr(0, 1) != "/") {
            route = "/" + route;
        }
        return route;
    };
    MVC.registerRoutes = function (router, controllerLocation) {
        this.fs.readdirSync(controllerLocation).forEach(function (file) {
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
    };
    //model binders.
    MVC.ModelBinder = function (request) {
    };
    // viewmodel validation
    MVC.ValidateModel = function (model) {
        var errors = [];
        for (var val in MVC.validators) {
            var isValid = MVC.validators[val].function(MVC.validators[val].errorMessage, model);
            if (!isValid) {
                errors.push({
                    property: MVC.validators[val].property,
                    isValid: isValid,
                    errorMessage: MVC.validators[val].errorMessage
                });
            }
        }
        return errors;
    };
    // decorators
    MVC.Required = function (errorMessage, condition) {
        return function (target, propertyKey) {
            if (condition) {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: function (errorMessage, model) { return condition(errorMessage, model); } });
            }
            else {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: function () { return target !== undefined && target !== null && target !== ""; } });
            }
        };
    };
    MVC.Validator = function (errorMessage, condition) {
        return function (target, propertyKey) {
            if (condition) {
                MVC.validators.push({ errorMessage: errorMessage, property: propertyKey, function: function (errorMessage, model) { return condition(errorMessage, model); } });
            }
        };
    };
    MVC.fs = require("fs");
    MVC.validators = [];
    return MVC;
}());
exports.MVC = MVC;
//# sourceMappingURL=MVC.js.map