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
var BaseModel_1 = require('./BaseModel');
var personValidator_1 = require('../validators/personValidator');
var MVC_1 = require("../MVC");
var Person = (function (_super) {
    __extends(Person, _super);
    function Person(requestBody) {
        _super.call(this);
        this.name = requestBody.name;
        this.dob = requestBody.dob;
        this.surname = requestBody.surname;
    }
    __decorate([
        MVC_1.MVC.Required("Please provide a valid first name", personValidator_1.PersonValidator.NameValidation), 
        __metadata('design:type', String)
    ], Person.prototype, "name", void 0);
    __decorate([
        MVC_1.MVC.Required("Please provide a valid surname", personValidator_1.PersonValidator.SurNameValidation), 
        __metadata('design:type', String)
    ], Person.prototype, "surname", void 0);
    __decorate([
        MVC_1.MVC.Required("Please provide a valid date", personValidator_1.PersonValidator.DOBDateValidation),
        MVC_1.MVC.Required("You must be over the age of 37", personValidator_1.PersonValidator.DOBAgeValidation), 
        __metadata('design:type', String)
    ], Person.prototype, "dob", void 0);
    return Person;
}(BaseModel_1.BaseModel));
exports.Person = Person;
//# sourceMappingURL=person.js.map