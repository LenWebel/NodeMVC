"use strict";
var ActionResult = (function () {
    function ActionResult() {
    }
    return ActionResult;
}());
exports.ActionResult = ActionResult;
var Controller = (function () {
    function Controller() {
        console.log("base constructor call");
        debugger;
    }
    Object.defineProperty(Controller.prototype, "Server", {
        get: function () {
            return this.server;
        },
        set: function (value) {
            this.server = value;
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.View = function (view, model) {
        return MVC.View(view, model);
    };
    Controller.prototype.Log = function (input) {
        console.log(input);
    };
    return Controller;
}());
exports.Controller = Controller;
var DefaultHelpers = (function () {
    function DefaultHelpers() {
    }
    DefaultHelpers.LabelFor = function (field, htmllabelAttribtes) {
        return '<div class="label"> <label for="' + field + '" ' + DefaultHelpers.stringifyAttributes(htmllabelAttribtes) + '   >' + field + '</label></div>';
    };
    DefaultHelpers.TextBoxFor = function (field, htmlInputAttribtes, htmllabelAttribtes) {
        var label = this.LabelFor(field, htmllabelAttribtes);
        var input = '<div class="field"><input ' + DefaultHelpers.stringifyAttributes(htmlInputAttribtes) + ' type="text" value="' + field + '"/></div>';
        return '<div>' + label + input + '</div>';
    };
    DefaultHelpers.stringifyAttributes = function (htmlAttributes) {
        if (htmlAttributes === null || htmlAttributes === undefined || htmlAttributes === []) {
            return "";
        }
        return htmlAttributes.join(" ");
    };
    return DefaultHelpers;
}());
exports.DefaultHelpers = DefaultHelpers;
var MVC = (function () {
    function MVC() {
    }
    Object.defineProperty(MVC, "router", {
        get: function () {
            return this._router;
        },
        set: function (value) {
            this._router = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MVC, "templateEngine", {
        get: function () {
            if (this._templateEngine === null || this._templateEngine === undefined) {
                throw 'Template engine is undefined.';
            }
            return this._templateEngine;
        },
        set: function (value) {
            this._templateEngine = value;
        },
        enumerable: true,
        configurable: true
    });
    MVC.View = function (view, model) {
        // some work here to find the view.
        // search for a view with the name specified, 
        // inject the model into the view
        // render the view.
        //return the view to the client.
        var actionResult = new ActionResult();
        actionResult.model = model;
        actionResult.view = view;
        return actionResult;
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
                _this.router[method]("/" + name + route, _this.routeFunction(descriptor.value, target));
                console.log("registering route: ", "'/" + name + route + "'");
            }
            else {
                throw "please provide a route for " + propertyKey;
            }
        };
    };
    MVC.routeFunction = function (fctn, target) {
        var _this = this;
        return function (req, res) {
            var values = _this.modelBinder(req.params, req.query, req.body);
            var bindingResult = fctn.call(null, values, { req: req, res: res });
            res.render(bindingResult.view, bindingResult.model);
        };
    };
    MVC.Authorize = function () {
        return function (target) {
            var ctrlr = target;
            ctrlr.authorization = null;
            console.log("AuthorizeAttribute", target.name);
        };
    };
    /// preppend slash to route if none exists.
    MVC.cleanRoute = function (route) {
        if (route.substr(0, 1) != "/") {
            route = "/" + route;
        }
        return route;
    };
    MVC.registerHelpers = function (templateEngine) {
        //register helpers here.
        Object.keys(DefaultHelpers).forEach(function (item) {
            templateEngine.helpers[item] = function (field) {
                var htmlString = DefaultHelpers[item](field);
                return templateEngine.helpers.raw(htmlString);
            };
        });
    };
    MVC.registerRoutes = function (router, controllerLocation) {
        MVC.router = router;
        var files = this.fs.readdirSync(controllerLocation);
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
    };
    /*
    * Recursively merge properties of two objects
    */
    MVC.MergeObject = function (obj1, obj2) {
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
    };
    //model binders.
    MVC.modelBinder = function (formValues, queryString, bodyValues) {
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
    };
    //vash helpers
    MVC.textBox = function (item) {
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