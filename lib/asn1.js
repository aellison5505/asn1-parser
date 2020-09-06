"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASN1 = void 0;
const decode_1 = require("./decode");
class ASN1 {
    decode(encoding) {
        let decode = new decode_1.Decode();
        return decode.decode(encoding);
    }
    encode(tagBuilder) {
        return tagBuilder.coded.toString('hex');
    }
}
exports.ASN1 = ASN1;
