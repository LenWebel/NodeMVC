"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const person_1 = require("../models/person");
require("reflect-metadata");
const MVC_1 = require("../MVC");
let PersonController = class PersonController extends MVC_1.Controller {
    GetPerson(model) {
        let currentContext = this.CurrentContext;
        //currentContext.response.json({ 
        // message: currentContext.request.params
        //});
        return currentContext.request.params;
    }
    GetStudent(req, res) {
        res.json({ message: req.params.student_id });
    }
    GetStudentActionResult(person, args) {
        var p = new person_1.Person(person);
        super.Log("in method log....................................");
        return super.View("person/index", p);
    }
    CreatePerson(req, res) {
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
    }
    ViewModelTest(person) {
        //req:any,res:any
    }
};
__decorate([
    MVC_1.MVC.httpGet('/:person_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "GetPerson", null);
__decorate([
    MVC_1.MVC.httpGet('/getstudent/:student_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "GetStudent", null);
__decorate([
    MVC_1.MVC.httpGet('/getstudentactionresult/:name/:surname/:student_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_1.Person, Object]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "GetStudentActionResult", null);
__decorate([
    MVC_1.MVC.httpPost('/:student_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "CreatePerson", null);
__decorate([
    MVC_1.MVC.httpPost('/:student_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_1.Person]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "ViewModelTest", null);
PersonController = __decorate([
    MVC_1.MVC.Authorize()
], PersonController);
exports.PersonController = PersonController;
//export = PersonController; 
//# sourceMappingURL=PersonController.js.map