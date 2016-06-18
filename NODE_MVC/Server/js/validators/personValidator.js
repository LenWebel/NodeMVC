"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Validators_1 = require("./Validators");
var PersonValidator = (function (_super) {
    __extends(PersonValidator, _super);
    function PersonValidator() {
        _super.apply(this, arguments);
    }
    PersonValidator.NameValidation = function (errorMessage, model) {
        if (model.name != "james") {
            console.log("Please provide a valid First name:", model.name);
            return false;
        }
        return true;
    };
    PersonValidator.SurNameValidation = function (errorMessage, model) {
        if (model.surname != "burt") {
            console.log("Please provide a valid First name:", model.surname);
            return false;
        }
        return true;
    };
    PersonValidator.DOBDateValidation = function (errorMessage, model) {
        if (!model.dob) {
            console.log("Please provide a valid date of birth:", model.dob);
            return false;
        }
        return true;
    };
    PersonValidator.DOBAgeValidation = function (errorMessage, model) {
        var birthday = new Date(model.dob);
        var age = parseInt(new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0));
        if (isNaN(age))
            return false;
        if (age < 40)
            return false;
        return true;
    };
    return PersonValidator;
}(Validators_1.Validators));
exports.PersonValidator = PersonValidator;
//# sourceMappingURL=personValidator.js.map