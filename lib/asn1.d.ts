/// <reference types="node" />
import { TagBuilder } from './tagBuilders';
/**
 * This will decode and build ASN.1
 * Currently supported tags are
 * INTEGER
   BIT_STRING
   OCTET_STRING
   OBJECT_IDENTIFIER
   SEQUENCE
 */
export declare class ASN1 {
    decode(encoding: Buffer): string;
    build(tagBuilder: TagBuilder): string;
}
