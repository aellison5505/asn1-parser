import { tagBuilderType } from './tagBuilders';
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
   GeneralizedTime = 0x18,
   CUSTOM = 0x00
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

 export type tagFrameType = tagFrame 
    | integerFrame
    | sequenceFrame
    | bitStringFrame
    | octetStringFrame
    | contextSpecificFrame
    | objectIdentifierFrame

 export interface tagFrame {
     form?: formType;
     length?: number;
     data?: Buffer
}
export interface integerFrame extends tagFrame {
    data: Buffer;
}

export interface bitStringFrame extends tagFrame {
    data: Buffer;
}
   export interface octetStringFrame extends tagFrame {
    data: Buffer;
}

export interface objectIdentifierFrame extends tagFrame {
    str?: string;
}

export interface sequenceFrame extends tagFrame {
    children: tagBuilderType[];
    form: formType
}
export interface contextSpecificFrame extends tagFrame {
    child: tagBuilderType;
    form: formType;
    tag: number;
}

export interface buildMap extends tagFrame, objectIdentifierFrame {
    child?: Map<string, buildMap>;
    children?:  Map<string, buildMap>;
    value?: any;
    hex?: string;
}


