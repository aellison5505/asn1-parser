import { Decode } from './decode';
import {TagBuilder } from './tagBuilders';


export class ASN1 {

   decode(encoding: Buffer): string {
      let decode = new Decode();
      return decode.decode(encoding);
   }

   encode(tagBuilder: TagBuilder) {
      return tagBuilder.coded.toString('hex');
   }



}