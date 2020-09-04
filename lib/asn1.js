"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASN1 = void 0;
var tagClass;
(function (tagClass) {
    tagClass[tagClass["Universal"] = 0] = "Universal";
    tagClass[tagClass["Application"] = 64] = "Application";
    tagClass[tagClass["Context-specific"] = 128] = "Context-specific";
    tagClass[tagClass["Private"] = 192] = "Private";
})(tagClass || (tagClass = {}));
var form;
(function (form) {
    form[form["Primitive"] = 0] = "Primitive";
    form[form["Constructed"] = 32] = "Constructed";
})(form || (form = {}));
var ASN1 = /** @class */ (function () {
    function ASN1() {
    }
    ASN1.prototype.decode = function (encoding) {
        console.log(encoding[0]);
        console.log(tagClass[encoding[0] & 0xC0]);
        console.log(form[encoding[0] & 0x20]);
        console.log(encoding[0] & 0x1F);
    };
    return ASN1;
}());
exports.ASN1 = ASN1;
