/// <reference types="node" />
import { integerFrame, sequenceFrame } from './util';
export declare class TagBuilder {
    constructor();
    get coded(): Buffer;
    get Length(): number;
}
export declare class Integer extends TagBuilder {
    private tagBuilder;
    constructor(tagBuilder: integerFrame);
    get tagFrame(): integerFrame;
    private calculateLength;
    get coded(): Buffer;
}
export declare class Sequence extends TagBuilder {
    private tagBuilder;
    data: Buffer;
    constructor(tagBuilder: sequenceFrame);
    get coded(): Buffer;
}
