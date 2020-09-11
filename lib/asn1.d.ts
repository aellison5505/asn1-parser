/// <reference types="node" />
import { tagBuilderType, Sequence, Integer, BitString, UTF8String, ObjectIdentifier, OctetString, ContextSpecific, PrintableString, IA5String, UTCTime } from './tagBuilders';
import { integerFrame, sequenceFrame, bitStringFrame, octetStringFrame, objectIdentifierFrame, contextSpecificFrame, printableStringFrame, UTF8StringFrame, UTCTimeFrame, IA5StringFrame } from './util';
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
export declare class ASN1 {
    /**
     *
     * @param encoding Buffer of DER encoded data
     * @returns [string, Map<string, buildMap>] formatted string of decoded, Map of decoded
     */
    decode(encoding: Buffer): [string, Map<string, import("./util").buildMap>];
    build(tagBuilder: tagBuilderType): string;
    sequence(frameTag: sequenceFrame): Sequence;
    integer(frameTag: integerFrame): Integer;
    bitString(frameTag: bitStringFrame): BitString;
    octetString(frameTag: octetStringFrame): OctetString;
    printableString(frameTag: printableStringFrame): PrintableString;
    ia5String(frameTag: IA5StringFrame): IA5String;
    utf8String(frameTag: UTF8StringFrame): UTF8String;
    utcTime(frameTag: UTCTimeFrame): UTCTime;
    objectIdentifier(frameTag: objectIdentifierFrame): ObjectIdentifier;
    contextSpecific(frameTag: contextSpecificFrame): ContextSpecific;
}
