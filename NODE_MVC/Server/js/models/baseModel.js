"use strict";
class BaseModel {
    constructor() {
        this.isValid = this.validationErrors === undefined || this.validationErrors.length === 0;
        this.validationErrors = [];
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map