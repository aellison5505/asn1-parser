"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = exports.Integer = exports.TagBuilder = void 0;
const util_1 = require("./util");
//export type tagBuilder = typeof TagBuilder;
class TagBuilder {
    constructor() { }
    get coded() {
        return Buffer.alloc(1, 0);
    }
    get Length() {
        return 0;
    }
}
exports.TagBuilder = TagBuilder;
class Integer extends TagBuilder {
    constructor(tagBuilder) {
        super();
        this.tagBuilder = tagBuilder;
        (tagBuilder.length ? this.calculateLength(tagBuilder.length) : this.calculateLength());
        (!tagBuilder.form ? tagBuilder.form = 'Primitive' : tagBuilder.form);
    }
    get tagFrame() {
        return this.tagBuilder;
    }
    calculateLength(len) {
        if (len) {
            if (!(this.tagBuilder.data.length === len))
                throw new Error('Length Mismatch');
        }
        else {
            this.tagBuilder.length = this.tagBuilder.data.length;
        }
    }
    get coded() {
        if (!this.tagBuilder.length)
            throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (util_1.tagClass['Universal'] | util_1.tag['INTEGER'] | util_1.form[this.tagBuilder.form || 'Primitive']));
        console.log(tagCode);
        let lenBuf = Buffer.alloc(this.tagBuilder.length.toString(16).length);
        lenBuf.writeInt8(this.tagBuilder.length, 0);
        console.log(lenBuf);
        return Buffer.concat([tagCode, lenBuf, this.tagBuilder.data]);
    }
}
exports.Integer = Integer;
class Sequence extends TagBuilder {
    constructor(tagBuilder) {
        super();
        this.tagBuilder = tagBuilder;
        let child = this.tagBuilder.children[0].coded;
        console.log('seq', child);
        this.data = Buffer.concat([child]);
        this.tagBuilder.length = this.data.length;
    }
    get coded() {
        if (!this.tagBuilder.length)
            throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (util_1.tagClass['Universal'] | util_1.tag['SEQUENCE'] | util_1.form[this.tagBuilder.form]));
        console.log(tagCode);
        let lenBuf = Buffer.alloc(this.tagBuilder.length.toString(16).length);
        lenBuf.writeInt8(this.tagBuilder.length, 0);
        console.log(lenBuf);
        return Buffer.concat([tagCode, lenBuf, this.data]);
    }
}
exports.Sequence = Sequence;
