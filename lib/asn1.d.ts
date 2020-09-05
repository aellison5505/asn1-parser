/// <reference types="node" />
import { tagClassType } from './util';
export declare class ASN1 {
    decoded: string;
    pre: number;
    ans1Map: Map<any, any>;
    constructor();
    decode(encoding: Buffer): void;
    getTag(encoding: Buffer, count: number): number;
    getLength(encoding: Buffer, count: number): number[];
    nonUniversal(encoding: Buffer, count: number, tag: tagClassType): number;
    universal(encoding: Buffer, count: number): number;
    sequenceTag(encoding: Buffer, count: number): number;
    objectIdentifer(encoding: Buffer, count: number): number;
    bitString(encoding: Buffer, count: number): number;
    integerTag(encoding: Buffer, count: number): number;
    octetStringTag(encoding: Buffer, count: number): number;
}
