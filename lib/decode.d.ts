/// <reference types="node" />
export declare class Decode {
    decoded: string;
    pre: number;
    ans1Map: Map<any, any>;
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
