import { Decode } from './decode';
import { tagBuilderType, Sequence, Integer, BitString, ObjectIdentifier, OctetString, ContextSpecific } from './tagBuilders';
import { integerFrame, sequenceFrame, bitStringFrame, octetStringFrame, objectIdentifierFrame, contextSpecificFrame } from './util';

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
export class ASN1 {

   /**
    * 
    * @param encoding Buffer of DER encoded data
    * @returns formatted string of decoded
    */
   decode(encoding: Buffer) {
      let decode = new Decode();
      return decode.decode(encoding);
   }

   build(tagBuilder: tagBuilderType): string {
      return tagBuilder.coded.toString('hex');
   }

   sequence(frameTag: sequenceFrame): Sequence {
      return new Sequence(frameTag);
   }

   integer(frameTag: integerFrame): Integer {
      return new Integer(frameTag);
   }

   bitString(frameTag: bitStringFrame): BitString {
      return new BitString(frameTag);
   }

   octetString(frameTag: octetStringFrame): OctetString {
      return new OctetString(frameTag);
   }

   objectIdentifier(frameTag: objectIdentifierFrame): ObjectIdentifier {
      return new ObjectIdentifier(frameTag);
   }

   contextSpecific(frameTag: contextSpecificFrame): ContextSpecific {
      return new ContextSpecific(frameTag);
   }






   




}