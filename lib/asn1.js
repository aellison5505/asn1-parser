"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASN1 = void 0;
const decode_1 = require("./decode");
const tagBuilders_1 = require("./tagBuilders");
/**
 * This will decode and build ASN.1
 * Currently supported tags are
 *  INTEGER
 *  BIT_STRING
 *  OCTET_STRING
 *  OBJECT_IDENTIFIER
 *  SEQUENCE
 *  Context_Specific
 *
 */
class ASN1 {
    /**
     *
     * @param encoding Buffer of DER encoded data
     * @returns [string, Map<string, buildMap>] formatted string of decoded, Map of decoded
     */
    decode(encoding) {
        let decode = new decode_1.Decode();
        return decode.decode(encoding);
    }
    build(tagBuilder) {
        return tagBuilder.coded.toString('hex');
    }
    sequence(frameTag) {
        return new tagBuilders_1.Sequence(frameTag);
    }
    integer(frameTag) {
        return new tagBuilders_1.Integer(frameTag);
    }
    bitString(frameTag) {
        return new tagBuilders_1.BitString(frameTag);
    }
    octetString(frameTag) {
        return new tagBuilders_1.OctetString(frameTag);
    }
    objectIdentifier(frameTag) {
        return new tagBuilders_1.ObjectIdentifier(frameTag);
    }
    contextSpecific(frameTag) {
        return new tagBuilders_1.ContextSpecific(frameTag);
    }
}
exports.ASN1 = ASN1;
