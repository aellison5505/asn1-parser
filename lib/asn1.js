"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASN1 = void 0;
const decode_1 = require("./decode");
/**
 * This will decode and build ASN.1
 * Currently supported tags are
 * INTEGER
   BIT_STRING
   OCTET_STRING
   OBJECT_IDENTIFIER
   SEQUENCE
 */
class ASN1 {
    decode(encoding) {
        let decode = new decode_1.Decode();
        return decode.decode(encoding);
    }
    build(tagBuilder) {
        return tagBuilder.coded.toString('hex');
    }
}
exports.ASN1 = ASN1;
