"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var person_1 = require('../models/person');
require("reflect-metadata");
var MVC_1 = require("../MVC");
var PersonController = (function (_super) {
    __extends(PersonController, _super);
    function PersonController() {
        _super.apply(this, arguments);
    }
    PersonController.prototype.GetPerson = function (req, res) {
        res.json({ message: req.params.person_id });
    };
    PersonController.prototype.GetStudent = function (req, res) {
        res.json({ message: req.params.student_id });
    };
    PersonController.prototype.GetStudentActionResult = function (person, args) {
        debugger;
        var p = new person_1.Person(person);
        _super.prototype.Log.call(this, "in method log....................................");
        return _super.prototype.View.call(this, "person/index", p);
    };
    PersonController.prototype.CreatePerson = function (req, res) {
        var person = new person_1.Person(req.body);
        person.validationErrors = MVC_1.MVC.ValidateModel(person);
        if (person.isValid) {
            // valid model
            res.json({
                params: req.params.student_id,
                body: req.body
            });
        }
        else {
            // invalid model.
            res.json({
                validationErrors: person.validationErrors
            });
        }
    };
    PersonController.prototype.ViewModelTest = function (person) {
        //req:any,res:any
    };
    __decorate([
        MVC_1.MVC.httpGet('/:person_id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], PersonController.prototype, "GetPerson", null);
    __decorate([
        MVC_1.MVC.httpGet('/getstudent/:student_id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], PersonController.prototype, "GetStudent", null);
    __decorate([
        MVC_1.MVC.httpGet('/getstudentactionresult/:name/:surname/:student_id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [person_1.Person, Object]), 
        __metadata('design:returntype', void 0)
    ], PersonController.prototype, "GetStudentActionResult", null);
    __decorate([
        MVC_1.MVC.httpPost('/:student_id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], PersonController.prototype, "CreatePerson", null);
    __decorate([
        MVC_1.MVC.httpPost('/:student_id'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [person_1.Person]), 
        __metadata('design:returntype', void 0)
    ], PersonController.prototype, "ViewModelTest", null);
    PersonController = __decorate([
        MVC_1.MVC.Authorize(), 
        __metadata('design:paramtypes', [])
    ], PersonController);
    return PersonController;
}(MVC_1.Controller));
exports.PersonController = PersonController;
//export = PersonController; 
//# sourceMappingURL=PersonController.js.map