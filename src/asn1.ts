import { Decode } from './decode';
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
export class ASN1 {

   /**
    * 
    * @param encoding Buffer of DER encoded data
    * @returns [string, Map<string, buildMap>] formatted string of decoded, Map of decoded
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

   
   printableString(frameTag: printableStringFrame): PrintableString {
      (frameTag.str ? frameTag.data = Buffer.from(frameTag.str) : null)
      return new PrintableString(frameTag);
   }

   ia5String(frameTag: IA5StringFrame): IA5String {
      (frameTag.str ? frameTag.data = Buffer.from(frameTag.str) : null)
      return new IA5String(frameTag);
   }

   utf8String(frameTag: UTF8StringFrame): UTF8String {
      (frameTag.str ? frameTag.data = Buffer.from(frameTag.str, 'utf-8') : null)
      return new UTF8String(frameTag);
   }

   utcTime(frameTag: UTCTimeFrame): UTCTime {
     
      return new UTCTime(frameTag);
   }

   objectIdentifier(frameTag: objectIdentifierFrame): ObjectIdentifier {
      return new ObjectIdentifier(frameTag);
   }

   contextSpecific(frameTag: contextSpecificFrame): ContextSpecific {
      return new ContextSpecific(frameTag);
   }






   




}