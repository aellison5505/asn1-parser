/// <reference types="node" />
import { tagClass, tag, form, integerFrame, sequenceFrame, tagFrameType, tagType, tagClassType, bitStringFrame, contextSpecificFrame, objectIdentifierFrame, octetStringFrame } from './util';
export declare class TagBuilder {
    private _frame;
    private _tag;
    private _tagClass;
    constructor(_frame: tagFrameType, _tag: tagType, _tagClass: tagClassType);
    private integerBuffer;
    private integerHex;
    get tag(): tag;
    get data(): Buffer;
    get tagClass(): tagClass;
    get form(): form;
    get dataLength(): number;
    get length(): number;
    get coded(): Buffer;
}
export declare class Integer extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: integerFrame);
}
export declare class BitString extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: bitStringFrame);
}
export declare class OctetString extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: octetStringFrame);
}
export declare class ObjectIdentifier extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: objectIdentifierFrame);
    private buildObjectId;
}
export declare class Sequence extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: sequenceFrame);
    private buildData;
}
export declare class ContextSpecific extends TagBuilder {
    private _frameTag;
    constructor(_frameTag: contextSpecificFrame);
    get tag(): number;
}
