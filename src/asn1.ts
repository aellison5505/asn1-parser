import { Decode } from './decode';
import {TagBuilder } from './tagBuilders';

/**
 * This will decode and build ASN.1 
 * Currently supported tags are 
 * INTEGER
   BIT_STRING
   OCTET_STRING
   OBJECT_IDENTIFIER
   SEQUENCE
 */
export class ASN1 {

   decode(encoding: Buffer): string {
      let decode = new Decode();
      return decode.decode(encoding);
   }

   build(tagBuilder: TagBuilder) {
      return tagBuilder.coded.toString('hex');
   }

}