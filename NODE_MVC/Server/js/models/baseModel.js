"use strict";
var BaseModel = (function () {
    function BaseModel() {
        this.isValid = this.validationErrors === undefined || this.validationErrors.length === 0;
        this.validationErrors = [];
    }
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map