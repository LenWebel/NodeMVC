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
//import {BaseController} from './BaseController';
require("reflect-metadata");
const MVC_1 = require("../MVC");
class StudentController extends MVC_1.Controller {
    Getthing1(req, res) {
        res.json({ message: "req" });
    }
    Getthing2(req, res) {
        res.json({ message: "req" });
    }
}
__decorate([
    MVC_1.MVC.httpGet('/thing1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "Getthing1", null);
__decorate([
    MVC_1.MVC.httpGet('thing2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "Getthing2", null);
exports.StudentController = StudentController;
//export = PersonController; 
//# sourceMappingURL=StudentController.js.map