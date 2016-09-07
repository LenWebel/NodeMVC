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
var BaseController_1 = require('./BaseController');
require("reflect-metadata");
var MVC_1 = require("../MVC");
var StudentController = (function (_super) {
    __extends(StudentController, _super);
    function StudentController() {
        _super.apply(this, arguments);
    }
    StudentController.prototype.Getthing1 = function (req, res) {
        res.json({ message: "req" });
    };
    StudentController.prototype.Getthing2 = function (req, res) {
        res.json({ message: "req" });
    };
    __decorate([
        MVC_1.MVC.httpGet('/thing1'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], StudentController.prototype, "Getthing1", null);
    __decorate([
        MVC_1.MVC.httpGet('thing2'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Object]), 
        __metadata('design:returntype', void 0)
    ], StudentController.prototype, "Getthing2", null);
    return StudentController;
}(BaseController_1.BaseController));
exports.StudentController = StudentController;
//export = PersonController; 
//# sourceMappingURL=StudentController.js.map