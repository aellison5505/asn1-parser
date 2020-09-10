"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextSpecific = exports.Sequence = exports.ObjectIdentifier = exports.OctetString = exports.BitString = exports.Integer = void 0;
const util_1 = require("./util");
class TagBuilder {
    constructor(_frame, _tag, _tagClass) {
        this._frame = _frame;
        this._tag = _tag;
        this._tagClass = _tagClass;
    }
    integerBuffer(int) {
        return Buffer.from(this.integerHex(int), 'hex');
    }
    integerHex(int) {
        let strNum = int.toString(16);
        (strNum.length % 2 != 0 ? strNum = `0${strNum}` : strNum);
        return strNum;
    }
    get tag() {
        return util_1.tag[this._tag];
    }
    get data() {
        if (this._frame.data) {
            return this._frame.data;
        }
        else {
            throw new Error("Missing Data");
        }
    }
    get tagClass() {
        return util_1.tagClass[this._tagClass];
    }
    get form() {
        (!this._frame.form ? this._frame.form = 'Primitive' : this._frame.form);
        return util_1.form[this._frame.form];
    }
    get dataLength() {
        var _a, _b, _c, _d;
        return (((_b = (_a = this._frame) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) ? (_d = (_c = this._frame) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length : 0);
    }
    get length() {
        var _a, _b, _c;
        if ((_a = this._frame) === null || _a === void 0 ? void 0 : _a.length) {
            if (!(((_b = this._frame) === null || _b === void 0 ? void 0 : _b.length) === this.dataLength))
                throw new Error('Length Mismatch');
        }
        else {
            this._frame.length = (((_c = this._frame.data) === null || _c === void 0 ? void 0 : _c.length) ? this._frame.data.length : 0);
        }
        return this._frame.length;
    }
    get coded() {
        if (!this.length)
            throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (this.tagClass | this.tag | this.form));
        // console.log(tagCode);
        let lenBuf = this.integerBuffer(this.length);
        //console.log(lenBuf);
        return Buffer.concat([tagCode, lenBuf, this.data]);
    }
}
class Integer extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'INTEGER', 'Universal');
        this._frameTag = _frameTag;
    }
}
exports.Integer = Integer;
class BitString extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'BIT_STRING', 'Universal');
        this._frameTag = _frameTag;
    }
}
exports.BitString = BitString;
class OctetString extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'OCTET_STRING', 'Universal');
        this._frameTag = _frameTag;
    }
}
exports.OctetString = OctetString;
class ObjectIdentifier extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'OBJECT_IDENTIFIER', 'Universal');
        this._frameTag = _frameTag;
        (_frameTag.str ? this._frameTag.data = this.buildObjectId() : null);
    }
    buildObjectId() {
        if (!this._frameTag.str)
            throw new Error('Missing Data or String');
        let retBuf = Buffer.alloc(0);
        let strArray = this._frameTag.str.split('.');
        strArray.forEach((element, i) => {
            if (i === 0) {
                let num1 = parseInt(element);
                let num2 = parseInt(strArray[1]);
                let byte = (num1 * 40) + num2;
                retBuf = Buffer.concat([retBuf, Buffer.alloc(1, byte)]);
                console.log('build byte', retBuf.toString('hex'));
                return;
            }
            if (i > 1) {
                let num = parseInt(element);
                let numHex;
                let byte;
                numHex = num.toString(16);
                (numHex.length % 2 ? byte = Buffer.from(`0${numHex}`, 'hex') : byte = Buffer.from(numHex, 'hex'));
                if (num > 127) {
                    let carry = 0;
                    let end = byte.length - 1;
                    for (let i = end; i >= 0; i--) {
                        // byte[i] += carry;
                        let newCarry = byte[i] & util_1.mask.bit8;
                        newCarry = newCarry >> 7;
                        byte[i] = byte[i] & ~util_1.mask.bit8;
                        if (i < end) {
                            byte[i] = byte[i] << 1;
                            byte[i] = byte[i] | carry;
                            byte[i] = byte[i] | util_1.mask.bit8;
                        }
                        carry = newCarry;
                    }
                    if (carry > 0) {
                        let newByte = Buffer.alloc(1, carry | util_1.mask.bit8);
                        byte = Buffer.concat([newByte, byte]);
                    }
                }
                retBuf = Buffer.concat([retBuf, byte]);
                console.log('next', byte.toString('hex'));
                return;
            }
        });
        return retBuf;
    }
}
exports.ObjectIdentifier = ObjectIdentifier;
class Sequence extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'SEQUENCE', 'Universal');
        this._frameTag = _frameTag;
        (!this._frameTag.form ? this._frameTag.form = 'Constructed' : null);
        this._frameTag.data = this.buildData();
    }
    buildData() {
        let retChild = Buffer.alloc(0);
        this._frameTag.children.forEach((child) => {
            retChild = Buffer.concat([retChild, child.coded]);
        });
        return retChild;
    }
}
exports.Sequence = Sequence;
class ContextSpecific extends TagBuilder {
    constructor(_frameTag) {
        super(_frameTag, 'CUSTOM', 'Context_Specific');
        this._frameTag = _frameTag;
        (!this._frameTag.form ? this._frameTag.form = 'Constructed' : null);
        this._frameTag.data = this._frameTag.child.coded;
    }
    get tag() {
        return this._frameTag.tag;
    }
}
exports.ContextSpecific = ContextSpecific;
//# sourceMappingURL=tagBuilders.js.map