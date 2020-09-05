
 export type tagClassType =  keyof typeof tagClass;
 
 export enum tagClass {
    Universal = 0x0,
    Application =	0x1 << 6,
    Context_Specific = 0x01 << 7,
    Private = 0x03 << 6
 }

 export type formType = keyof typeof form;

 export enum form {
    Primitive = 0x0,
    Constructed = 0x1 << 5
 }

 export type tagType = keyof typeof tag;

 export enum tag {
   INTEGER = 0x02,
   BIT_STRING  = 0x03,
   OCTET_STRING = 0x04,
   NULL = 0x05,
   OBJECT_IDENTIFIER = 0x06,
   UTF8String = 0x0C,
   SEQUENCE = 0x10,
   SET = 0x11,
   PrintableString = 0x13,
   IA5String = 0x16,
   UTCTime = 0x17,
   GeneralizedTime = 0x18
 }

 export type maskType = keyof typeof mask;

 export enum mask {
      tag = 0x1F,
      tagClass = 0x03 << 6,
      form = 0x01 << 5,
      bit8 = 0x01 << 7
    

 }

 export enum pre {
     '',
     '\t',
     '\t\t',
     '\t\t\t'
 }
