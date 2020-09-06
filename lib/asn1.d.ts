/// <reference types="node" />
import { TagBuilder } from './tagBuilders';
export declare class ASN1 {
    decode(encoding: Buffer): string;
    build(tagBuilder: TagBuilder): string;
}
