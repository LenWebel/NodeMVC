"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require('./BaseModel');
var Person = (function (_super) {
    __extends(Person, _super);
    function Person(requestBody) {
        _super.call(this);
        this.name = requestBody.name;
        this.dob = requestBody.dob;
        this.surname = requestBody.surname;
    }
    return Person;
}(BaseModel_1.BaseModel));
exports.Person = Person;
//# sourceMappingURL=person.js.map