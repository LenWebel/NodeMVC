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
const BaseModel_1 = require("./BaseModel");
const personValidator_1 = require("../validators/personValidator");
const MVC_1 = require("../MVC");
class Person extends BaseModel_1.BaseModel {
    constructor(requestBody) {
        super();
        this.name = requestBody.name;
        this.dob = requestBody.dob;
        this.surname = requestBody.surname;
        this.student_id = requestBody.student_id;
    }
}
__decorate([
    MVC_1.MVC.Required("Please provide a valid first name", personValidator_1.PersonValidator.NameValidation),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    MVC_1.MVC.Required("Please provide a valid surname", personValidator_1.PersonValidator.SurNameValidation),
    __metadata("design:type", String)
], Person.prototype, "surname", void 0);
__decorate([
    MVC_1.MVC.Required("Please provide a valid date", personValidator_1.PersonValidator.DOBDateValidation),
    MVC_1.MVC.Required("You must be over the age of 37", personValidator_1.PersonValidator.DOBAgeValidation),
    __metadata("design:type", String)
], Person.prototype, "dob", void 0);
exports.Person = Person;
//# sourceMappingURL=person.js.map