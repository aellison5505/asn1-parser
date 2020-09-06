"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decode = void 0;
const util_1 = require("./util");
class Decode {
    constructor() {
        this.decoded = '';
        this.pre = 0;
        this.ans1Map = new Map();
    }
    decode(encoding) {
        let count = 0;
        // console.log('len total',encoding.length);
        count = this.getTag(encoding, count);
        //    console.log(count);
        console.log(this.decoded);
        return this.decoded;
    }
    getTag(encoding, count) {
        //   console.log('tag enc',encoding[count].toString(16))
        switch (encoding[count] & util_1.mask.tagClass) {
            case util_1.tagClass.Universal:
                count = this.universal(encoding, count);
                break;
            case util_1.tagClass.Context_Specific:
                count = this.nonUniversal(encoding, count, 'Context_Specific');
                break;
            case util_1.tagClass.Application:
                count = this.nonUniversal(encoding, count, 'Application');
                break;
            case util_1.tagClass.Private:
                count = this.nonUniversal(encoding, count, 'Private');
                break;
            default:
                throw new Error(`Unknown Tag Class${(encoding[count] & util_1.mask.tagClass).toString(10)}`);
        }
        return count;
    }
    getLength(encoding, count) {
        if (encoding[count] & util_1.mask.bit8) {
            // get long length
            let hexCount = encoding[count] & ~util_1.mask.bit8;
            //   console.log('long count', hexCount.toString(10));
            count++;
            let i = count;
            let end = count + hexCount;
            let len = Buffer.alloc(hexCount);
            // console.log(i,end);
            encoding.copy(len, 0, i, end);
            return [parseInt(len.toString('hex'), 16), end - 1];
        }
        else {
            return [encoding[count], count];
        }
    }
    nonUniversal(encoding, count, tag) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tagClass[util_1.tagClass[tag]]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}Tag: ${(encoding[count] & util_1.mask.tag).toString(10)}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n`;
        count++;
        let i = count;
        let end = count + len;
        // console.log(i,end);
        this.pre++;
        do {
            i = this.getTag(encoding, i);
            //   console.log('con', i);
        } while (i < end);
        this.pre--;
        count += len;
        return count;
    }
    universal(encoding, count) {
        switch (encoding[count] & util_1.mask.tag) {
            case util_1.tag.SEQUENCE:
                count = this.sequenceTag(encoding, count);
                break;
            case util_1.tag.INTEGER:
                count = this.integerTag(encoding, count);
                break;
            case util_1.tag.OCTET_STRING:
                count = this.octetStringTag(encoding, count);
                break;
            case util_1.tag.OBJECT_IDENTIFIER:
                count = this.objectIdentifer(encoding, count);
                break;
            case util_1.tag.BIT_STRING:
                count = this.bitString(encoding, count);
                break;
            default:
                throw new Error(`Tag Not Supported ${(encoding[count] & util_1.mask.tag).toString(10)}`);
        }
        return count;
    }
    sequenceTag(encoding, count) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[0x10]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let length;
        [length, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${length}\n`;
        //  console.log('seq len',length);
        count++;
        this.pre++;
        let i = count;
        let end = count + length - 1;
        //   console.log('seq',i,end);
        do {
            i = this.getTag(encoding, i);
            //     console.log('seq', i);
        } while (i < end);
        this.pre--;
        count += length;
        return count;
    }
    objectIdentifer(encoding, count) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.OBJECT_IDENTIFIER]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let obj = Buffer.alloc(len);
        encoding.copy(obj, 0, count, count + len);
        this.decoded += `${util_1.pre[this.pre]}${obj.toString('hex')}\n`;
        count += len;
        return count;
    }
    bitString(encoding, count) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.BIT_STRING]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let bit = Buffer.alloc(len);
        encoding.copy(bit, 0, count, count + len);
        this.decoded += `${util_1.pre[this.pre]}${bit.toString('hex')}\n`;
        count += len;
        return count;
    }
    integerTag(encoding, count) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.INTEGER]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let int = Buffer.alloc(len);
        encoding.copy(int, 0, count, count + len);
        count += len;
        this.decoded += `${util_1.pre[this.pre]}${parseInt(int.toString('hex'), 16)}\n`;
        return count;
    }
    octetStringTag(encoding, count) {
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.OCTET_STRING]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let oct = Buffer.alloc(len);
        encoding.copy(oct, 0, count, count + len);
        count += len;
        this.decoded += `${util_1.pre[this.pre]}${oct.toString('hex')}\n`;
        return count;
    }
}
exports.Decode = Decode;
