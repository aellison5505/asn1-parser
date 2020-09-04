import { ECANCELED } from "constants";

 type tagClassType =  "Universal" |
 "Application" |
 "Context-specific"	|
 "Private";
 
 enum tagClass {
    "Universal" = 0x0,
    "Application" =	0x40,
    "Context-specific"	= 0x80,
    "Private" = 0xC0
 }

 type formType = "Primitive" | "Constructed";

 enum form {
    "Primitive" = 0x0,
    "Constructed" = 0x20
 }

export class ASN1 {

   decode(encoding: Buffer): void {
    console.log(encoding[0]);
    console.log(tagClass[encoding[0] & 0xC0]);
    console.log(form[encoding[0] & 0x20]);
    console.log(encoding[0] & 0x1F)

   }
}