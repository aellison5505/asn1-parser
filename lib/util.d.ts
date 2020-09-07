/// <reference types="node" />
import { tagBuilderType } from './tagBuilders';
export declare type tagClassType = keyof typeof tagClass;
export declare enum tagClass {
    Universal = 0,
    Application = 64,
    Context_Specific = 128,
    Private = 192
}
export declare type formType = keyof typeof form;
export declare enum form {
    Primitive = 0,
    Constructed = 32
}
export declare type tagType = keyof typeof tag;
export declare enum tag {
    INTEGER = 2,
    BIT_STRING = 3,
    OCTET_STRING = 4,
    NULL = 5,
    OBJECT_IDENTIFIER = 6,
    UTF8String = 12,
    SEQUENCE = 16,
    SET = 17,
    PrintableString = 19,
    IA5String = 22,
    UTCTime = 23,
    GeneralizedTime = 24,
    CUSTOM = 0
}
export declare type maskType = keyof typeof mask;
export declare enum mask {
    tag = 31,
    tagClass = 192,
    form = 32,
    bit8 = 128
}
export declare enum pre {
    '' = 0,
    '\t' = 1,
    '\t\t' = 2,
    '\t\t\t' = 3
}
export declare type tagFrameType = tagFrame | integerFrame | sequenceFrame | bitStringFrame | octetStringFrame | contextSpecificFrame | objectIdentifierFrame;
export interface tagFrame {
    form?: formType;
    length?: number;
    data?: Buffer;
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
    form: formType;
}
export interface contextSpecificFrame extends tagFrame {
    child: tagBuilderType;
    form: formType;
    tag: number;
}
export interface buildMap extends tagFrame, objectIdentifierFrame {
    child?: Map<string, buildMap>;
    children?: Map<string, buildMap>;
    value?: any;
    hex?: string;
}
