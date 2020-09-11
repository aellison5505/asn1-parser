/// <reference types="node" />
import { tag, tagClass, buildMap } from './util';
declare type baseTagType = baseTagVars;
interface baseTagVars {
    decoded: string;
    buildMap: Map<string, buildMap>;
    step: number;
    encoding: Buffer;
    prefix: number;
}
declare class tagBase {
    private _tagVars;
    constructor(_tagVars?: baseTagType);
    get encoding(): Buffer;
    get decoded(): string;
    get tagVars(): baseTagVars;
    get prefix(): number;
    get buildMap(): Map<string, buildMap>;
    get step(): number;
    set decoded(decoded: string);
    set encoding(encoding: Buffer);
    set prefix(prefix: number);
    set buildMap(buildMap: Map<string, buildMap>);
    set step(step: number);
    strTag(val: tag): string;
    strForm(count: number): string;
    getTag(count: number): number;
    getLength(count: number): number[];
    universal(count: number): number;
    decodeTag(count: number): [number, buildMap] | number | any;
    decodeTag(count: number, x: tagClass): number | any;
    decodeTag(count: number, x: tagClass): number | [number, buildMap];
    decodeTag(count: number, x: buildMap): [number, buildMap] | number | any;
    decodeTag(count: number): [any, any] | any;
    write(strTag: string, map: any): void;
}
export declare class NonUniversal extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number, x?: tagClass | any): number;
}
export declare class SequenceTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class ObjectIdentiferTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class OctetStringTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class UTF8StringTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class PrintableStringTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class UTCTimeTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class IA5StringTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class IntegerTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class BitStringTag extends tagBase {
    constructor(tagVars: baseTagVars);
    decodeTag(count: number): number;
}
export declare class Decode extends tagBase {
    constructor();
    decode(encoding: Buffer): [string, Map<string, buildMap>];
}
export {};
