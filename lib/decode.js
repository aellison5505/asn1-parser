"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decode = void 0;
const util_1 = require("./util");
class Decode {
    constructor() {
        this.decoded = '';
        this.pre = 0;
        this.buildMap = new Map();
        this.step = 0;
    }
    decode(encoding) {
        let count = 0;
        // console.log('len total',encoding.length);
        count = this.getTag(encoding, count);
        //    console.log(count);
        let obj = Object.fromEntries(this.buildMap);
        //  console.log(obj);
        // console.log(this.decoded);
        return [this.decoded, this.buildMap];
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
        let mapData = {};
        mapData.form = util_1.form[encoding[count] & util_1.mask.form];
        mapData.value = `${(encoding[count] & util_1.mask.tag).toString(10)}`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.tagClass[util_1.tagClass[tag]]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}Tag: ${(encoding[count] & util_1.mask.tag).toString(10)}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        mapData.length = len;
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n`;
        count++;
        this.buildMap.set(`${util_1.tagClass[util_1.tagClass[tag]]}-${this.step}`, mapData);
        this.step++;
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
            // count = this.octetStringTag(encoding,count);
        }
        return count;
    }
    sequenceTag(encoding, count) {
        let mapData = {
            form: util_1.form[encoding[count] & util_1.mask.form]
        };
        let mapName = `${util_1.tag[0x10]}-${this.step}`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[0x10]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let length;
        [length, count] = this.getLength(encoding, count);
        mapData.length = length;
        this.buildMap.set(mapName, mapData);
        this.decoded += `${util_1.pre[this.pre]}Length: ${length}\n`;
        this.step++;
        //  console.log('seq len',length);
        count++;
        this.pre++;
        // let i = count;
        let end = count + length - 1;
        //   console.log('seq',i,end);
        for (let i = count; i < end;) {
            i = this.getTag(encoding, i);
            //     console.log('seq', i);
        }
        this.pre--;
        count += length;
        return count;
    }
    objectIdentifer(encoding, count) {
        let mapData = {
            form: util_1.form[encoding[count] & util_1.mask.form]
        };
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.OBJECT_IDENTIFIER]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        mapData.length = len;
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let obj = Buffer.alloc(len);
        encoding.copy(obj, 0, count, count + len);
        let strObj = '';
        let pack = 0;
        let carry = 0;
        let strBuf = Buffer.alloc(0);
        obj.forEach((byte, i) => {
            //console.log('b',byte.toString(16))
            if (i === 0) {
                strObj = `${Math.floor(byte / 40)}.${byte % 40}`;
                //console.log(strObj);
                return;
            }
            if (byte & util_1.mask.bit8) {
                byte = byte & ~util_1.mask.bit8;
                let bit1 = byte & 1;
                byte = byte >> 1;
                byte = (carry << 7) | byte;
                carry = bit1;
                pack = 1;
                strBuf = Buffer.concat([strBuf, Buffer.alloc(1, byte)]);
                ////console.log('carry', byte.toString(16));
                return;
            }
            if (pack === 1) {
                byte = (carry << 7) | byte;
                carry = 0;
                pack = 0;
                strBuf = Buffer.concat([strBuf, Buffer.alloc(1, byte)]);
                //console.log('last', byte.toString(16));
                let strTemp = parseInt(strBuf.toString('hex'), 16);
                strObj += `.${strTemp}`;
                //console.log('str',strObj);
                strBuf = Buffer.alloc(0);
                return;
            }
            if (pack === 0) {
                strObj += `.${byte.toString(10)}`;
                //console.log(strObj);
                return;
            }
        });
        mapData.value = strObj;
        mapData.hex = obj.toString('hex');
        this.buildMap.set(`${util_1.tag[util_1.tag.OBJECT_IDENTIFIER]}-${this.step}`, mapData);
        this.step++;
        this.decoded += `${util_1.pre[this.pre]}${obj.toString('hex')}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${strObj}\n`;
        count += len;
        return count;
    }
    bitString(encoding, count) {
        let mapData = {
            form: util_1.form[encoding[count] & util_1.mask.form],
        };
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.BIT_STRING]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        mapData.length = len;
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let bit = Buffer.alloc(len);
        encoding.copy(bit, 0, count, count + len);
        mapData.hex = bit.toString('hex');
        this.buildMap.set(util_1.tag[util_1.tag.BIT_STRING] + '-' + this.step, mapData);
        this.step++;
        this.decoded += `${util_1.pre[this.pre]}${bit.toString('hex')}\n`;
        count += len;
        return count;
    }
    integerTag(encoding, count) {
        let mapData = {};
        mapData.form = util_1.form[encoding[count] & util_1.mask.form];
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.INTEGER]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        mapData.length = len;
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let int = Buffer.alloc(len);
        encoding.copy(int, 0, count, count + len);
        count += len;
        mapData.hex = int.toString('hex');
        mapData.value = BigInt(`0x${int.toString('hex')}`);
        this.buildMap.set(`${util_1.tag[util_1.tag.INTEGER]}-${this.step}`, mapData);
        this.step++;
        this.decoded += `${util_1.pre[this.pre]}Hex: ${int.toString('hex')}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}BigInt: ${BigInt(`0x${int.toString('hex')}`)}\n`;
        return count;
    }
    octetStringTag(encoding, count) {
        let mapData = {};
        mapData.form = util_1.form[encoding[count] & util_1.mask.form];
        this.decoded += `${util_1.pre[this.pre]}${util_1.tag[util_1.tag.OCTET_STRING]}\n\t`;
        this.decoded += `${util_1.pre[this.pre]}${util_1.form[encoding[count] & util_1.mask.form]}\n\t`;
        count++;
        let len;
        [len, count] = this.getLength(encoding, count);
        mapData.length = len;
        this.decoded += `${util_1.pre[this.pre]}Length: ${len}\n\t`;
        count++;
        let oct = Buffer.alloc(len);
        encoding.copy(oct, 0, count, count + len);
        count += len;
        mapData.hex = oct.toString('hex');
        this.buildMap.set(`${util_1.tag[util_1.tag.OCTET_STRING]}-${this.step}`, mapData);
        this.step++;
        this.decoded += `${util_1.pre[this.pre]}${oct.toString('hex')}\n`;
        return count;
    }
}
exports.Decode = Decode;
