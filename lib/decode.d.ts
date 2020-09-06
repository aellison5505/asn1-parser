/// <reference types="node" />
export declare class Decode {
    private decoded;
    private pre;
    private ans1Map;
    constructor();
    decode(encoding: Buffer): string;
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
