"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decode = exports.BitStringTag = exports.IntegerTag = exports.OctetStringTag = exports.ObjectIdentiferTag = exports.SequenceTag = exports.NonUniversal = void 0;
const util_1 = require("./util");
class tagBase {
    constructor(_tagVars = {
        buildMap: new Map(),
        decoded: '',
        encoding: Buffer.alloc(0),
        step: 0,
        prefix: 0
    }) {
        this._tagVars = _tagVars;
    }
    get encoding() {
        return this._tagVars.encoding;
    }
    get decoded() {
        return this._tagVars.decoded;
    }
    get tagVars() {
        return this._tagVars;
    }
    get prefix() {
        return this._tagVars.prefix;
    }
    get buildMap() {
        return this._tagVars.buildMap;
    }
    get step() {
        return this._tagVars.step;
    }
    set decoded(decoded) {
        this._tagVars.decoded += decoded;
    }
    set encoding(encoding) {
        this._tagVars.encoding = encoding;
    }
    set prefix(prefix) {
        this._tagVars.prefix = prefix;
    }
    set buildMap(buildMap) {
        this._tagVars.buildMap = buildMap;
    }
    set step(step) {
        this._tagVars.step = step;
    }
    strTag(val) {
        return util_1.tag[val];
    }
    strForm(count) {
        return util_1.form[this.encoding[count] & util_1.mask.form];
    }
    getTag(count) {
        //   console.log('tag enc',encoding[count].toString(16))
        switch (this.encoding[count] & util_1.mask.tagClass) {
            case util_1.tagClass.Universal:
                count = this.universal(count);
                break;
            case util_1.tagClass.Context_Specific:
                count = new NonUniversal(this.tagVars).decodeTag(count, util_1.tagClass.Context_Specific);
                break;
            case util_1.tagClass.Application:
                count = this.nonUniversal(count, 'Application');
                break;
            case util_1.tagClass.Private:
                count = this.nonUniversal(count, 'Private');
                break;
            default:
                throw new Error(`Unknown Tag Class${(this.encoding[count] & util_1.mask.tagClass).toString(10)}`);
        }
        return count;
    }
    getLength(count) {
        if (this.encoding[count] & util_1.mask.bit8) {
            // get long length
            let hexCount = this.encoding[count] & ~util_1.mask.bit8;
            //   console.log('long count', hexCount.toString(10));
            count++;
            let i = count;
            let end = count + hexCount;
            let len = Buffer.alloc(hexCount);
            // console.log(i,end);
            this.encoding.copy(len, 0, i, end);
            return [parseInt(len.toString('hex'), 16), end - 1];
        }
        else {
            return [this.encoding[count], count];
        }
    }
    nonUniversal(count, tag) {
        let mapData = {};
        /*
             [count, mapData] = this.decodeTag(count);
             this.write(`${this.strTag(tag.SEQUENCE)}-${this.step}`,mapData);
             if (!mapData.length)
                throw new Error('bad length');
             this.step++;
                mapData.length = len;
                this.decoded +=`${pre[this.prefix]}Length: ${len}\n`;
                count++;
                this.buildMap.set(`${tagClass[tagClass[tag]]}-${this.step}`,mapData);
                this.step++;
                let i = count;
                let end = count+len;
               // console.log(i,end);
                this.prefix++;
                do {
                   i = this.getTag(i);
                //   console.log('con', i);
                } while(i < end);
           
                this.prefix--;
                count += len;
                */
        return count;
    }
    universal(count) {
        switch (this.encoding[count] & util_1.mask.tag) {
            case util_1.tag.SEQUENCE:
                count = new SequenceTag(this.tagVars).decodeTag(count);
                break;
            case util_1.tag.INTEGER:
                count = new IntegerTag(this.tagVars).decodeTag(count);
                break;
            case util_1.tag.OCTET_STRING:
                count = new OctetStringTag(this.tagVars).decodeTag(count);
                break;
            case util_1.tag.OBJECT_IDENTIFIER:
                count = new ObjectIdentiferTag(this.tagVars).decodeTag(count);
                break;
            case util_1.tag.BIT_STRING:
                count = new BitStringTag(this.tagVars).decodeTag(count);
                break;
            default:
                throw new Error(`Tag Not Supported ${(this.encoding[count] & util_1.mask.tag).toString(10)}`);
            // count = this.octetStringTag(encoding,count);
        }
        return count;
    }
    decodeTag(count, x) {
        let ret = 0;
        let tagClass;
        let mapData = {};
        if (typeof x === 'object') {
            mapData = x;
            ret = 1;
        }
        else {
            tagClass = x;
            mapData = {};
        }
        mapData.form = this.strForm(count);
        count++;
        let len;
        [len, count] = this.getLength(count);
        mapData.length = len;
        if (ret === 0) {
            return [count, mapData];
        }
        else {
            count++;
            let oct = Buffer.alloc(len);
            this.encoding.copy(oct, 0, count, count + len);
            count += len;
            mapData.hex = oct.toString('hex');
            return [count, mapData];
        }
    }
    write(strTag, map) {
        this.buildMap.set(strTag, map);
        this.decoded = `${util_1.pre[this.prefix]}${strTag}\n`;
        for (let x in map) {
            this.decoded = `${util_1.pre[this.prefix + 1]}${x}: ${map[x]}\n`;
        }
    }
}
class NonUniversal extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count, x) {
        let mapData = {};
        [count, mapData] = super.decodeTag(count, x);
        this.write(`${util_1.tagClass[x]}-${this.step}`, mapData);
        if (!mapData.length)
            throw new Error('bad length');
        this.step++;
        count++;
        this.prefix++;
        let end = count + (mapData.length) - 1;
        for (let i = count; i < end;) {
            i = this.getTag(i);
        }
        this.prefix--;
        count += mapData.length;
        return count;
    }
}
exports.NonUniversal = NonUniversal;
class SequenceTag extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count) {
        let mapData = {};
        [count, mapData] = super.decodeTag(count);
        this.write(`${this.strTag(util_1.tag.SEQUENCE)}-${this.step}`, mapData);
        if (!mapData.length)
            throw new Error('bad length');
        this.step++;
        count++;
        this.prefix++;
        let end = count + (mapData.length) - 1;
        for (let i = count; i < end;) {
            i = this.getTag(i);
        }
        this.prefix--;
        count += mapData.length;
        return count;
    }
}
exports.SequenceTag = SequenceTag;
class ObjectIdentiferTag extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count) {
        let mapData = {};
        [count, mapData] = super.decodeTag(count);
        if (!mapData.length)
            throw new Error('bad length');
        let len = mapData.length;
        count++;
        let obj = Buffer.alloc(len);
        this.encoding.copy(obj, 0, count, count + len);
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
        this.write(`${this.strTag(util_1.tag.OBJECT_IDENTIFIER)}-${this.step}`, mapData);
        this.step++;
        count += len;
        return count;
    }
}
exports.ObjectIdentiferTag = ObjectIdentiferTag;
class OctetStringTag extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count) {
        let mapData = {};
        [count, mapData] = super.decodeTag(count, mapData);
        this.write(`${this.strTag(util_1.tag.OCTET_STRING)}-${this.step}`, mapData);
        this.step++;
        return count;
    }
}
exports.OctetStringTag = OctetStringTag;
class IntegerTag extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count) {
        let mapData = {};
        mapData.hex = '';
        [count, mapData] = super.decodeTag(count, mapData);
        mapData.value = BigInt(`0x${mapData.hex}`);
        this.write(`${this.strTag(util_1.tag.INTEGER)}-${this.step}`, mapData);
        this.step++;
        return count;
    }
}
exports.IntegerTag = IntegerTag;
class BitStringTag extends tagBase {
    constructor(tagVars) {
        super(tagVars);
    }
    decodeTag(count) {
        let mapData = {};
        mapData.hex = '';
        [count, mapData] = super.decodeTag(count, mapData);
        // mapData.value = BigInt(`0x${mapData.hex}`);
        this.write(`${this.strTag(util_1.tag.BIT_STRING)}-${this.step}`, mapData);
        this.step++;
        return count;
    }
}
exports.BitStringTag = BitStringTag;
class Decode extends tagBase {
    constructor() {
        super();
    }
    decode(encoding) {
        let count = 0;
        this.encoding = encoding;
        count = this.getTag(count);
        return [this.decoded, this.buildMap];
    }
}
exports.Decode = Decode;
//# sourceMappingURL=decode.js.map