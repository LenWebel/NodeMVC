"use strict";
var Attributes = (function () {
    function Attributes() {
    }
    Attributes.httpGet = function () {
        return function (target, propertyKey, descriptor) {
            var t = Reflect.getMetadata("design:type", target, propertyKey);
            Attributes._methodStore.push({ name: propertyKey, method: "get" });
            console.log(Attributes._methodStore.length);
        };
    };
    Attributes._methodStore = [];
    return Attributes;
}());
exports.Attributes = Attributes;
//# sourceMappingURL=Attributes.js.map