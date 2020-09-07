/// <reference types="node" />
import { buildMap } from './util';
export declare class Decode {
    private decoded;
    private pre;
    private buildMap;
    private step;
    constructor();
    decode(encoding: Buffer): [string, Map<string, buildMap>];
    private getTag;
    private getLength;
    private nonUniversal;
    private universal;
    private sequenceTag;
    private objectIdentifer;
    private bitString;
    private integerTag;
    private octetStringTag;
}
