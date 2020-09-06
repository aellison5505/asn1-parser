"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre = exports.mask = exports.tag = exports.form = exports.tagClass = void 0;
var tagClass;
(function (tagClass) {
    tagClass[tagClass["Universal"] = 0] = "Universal";
    tagClass[tagClass["Application"] = 64] = "Application";
    tagClass[tagClass["Context_Specific"] = 128] = "Context_Specific";
    tagClass[tagClass["Private"] = 192] = "Private";
})(tagClass = exports.tagClass || (exports.tagClass = {}));
var form;
(function (form) {
    form[form["Primitive"] = 0] = "Primitive";
    form[form["Constructed"] = 32] = "Constructed";
})(form = exports.form || (exports.form = {}));
var tag;
(function (tag) {
    tag[tag["INTEGER"] = 2] = "INTEGER";
    tag[tag["BIT_STRING"] = 3] = "BIT_STRING";
    tag[tag["OCTET_STRING"] = 4] = "OCTET_STRING";
    tag[tag["NULL"] = 5] = "NULL";
    tag[tag["OBJECT_IDENTIFIER"] = 6] = "OBJECT_IDENTIFIER";
    tag[tag["UTF8String"] = 12] = "UTF8String";
    tag[tag["SEQUENCE"] = 16] = "SEQUENCE";
    tag[tag["SET"] = 17] = "SET";
    tag[tag["PrintableString"] = 19] = "PrintableString";
    tag[tag["IA5String"] = 22] = "IA5String";
    tag[tag["UTCTime"] = 23] = "UTCTime";
    tag[tag["GeneralizedTime"] = 24] = "GeneralizedTime";
    tag[tag["CUSTOM"] = 0] = "CUSTOM";
})(tag = exports.tag || (exports.tag = {}));
var mask;
(function (mask) {
    mask[mask["tag"] = 31] = "tag";
    mask[mask["tagClass"] = 192] = "tagClass";
    mask[mask["form"] = 32] = "form";
    mask[mask["bit8"] = 128] = "bit8";
})(mask = exports.mask || (exports.mask = {}));
var pre;
(function (pre) {
    pre[pre[""] = 0] = "";
    pre[pre["\t"] = 1] = "\t";
    pre[pre["\t\t"] = 2] = "\t\t";
    pre[pre["\t\t\t"] = 3] = "\t\t\t";
})(pre = exports.pre || (exports.pre = {}));
