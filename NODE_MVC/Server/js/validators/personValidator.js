"use strict";
const Validators_1 = require("./Validators");
class PersonValidator extends Validators_1.Validators {
    static NameValidation(errorMessage, model) {
        if (model.name != "james") {
            console.log("Please provide a valid First name:", model.name);
            return false;
        }
        return true;
    }
    static SurNameValidation(errorMessage, model) {
        if (model.surname != "burt") {
            console.log("Please provide a valid First name:", model.surname);
            return false;
        }
        return true;
    }
    static DOBDateValidation(errorMessage, model) {
        if (!model.dob) {
            console.log("Please provide a valid date of birth:", model.dob);
            return false;
        }
        return true;
    }
    static DOBAgeValidation(errorMessage, model) {
        var birthday = new Date(model.dob);
        var age = parseInt(new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0));
        if (isNaN(age))
            return false;
        if (age < 40)
            return false;
        return true;
    }
}
exports.PersonValidator = PersonValidator;
//# sourceMappingURL=personValidator.js.map