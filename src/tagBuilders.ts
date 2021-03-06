import { tagClass, tag, form, integerFrame, sequenceFrame, tagFrameType, tagType, tagClassType, bitStringFrame, contextSpecificFrame, objectIdentifierFrame, printableStringFrame, mask, octetStringFrame, UTF8StringFrame, IA5StringFrame, UTCTimeFrame} from './util';
import { threadId } from 'worker_threads';

export type tagBuilderType = TagBuilder 
| BitString 
| ContextSpecific 
| Integer 
| ObjectIdentifier 
| OctetString
| Sequence
| PrintableString
| UTF8String
| IA5String
| UTCTime

class TagBuilder {

    constructor(private _frame: tagFrameType, private _tag: tagType, private _tagClass: tagClassType ) {   
  
    }


    private integerBuffer(int: number): Buffer {
        return Buffer.from(this.integerHex(int), 'hex');
    }

    private integerHex(int: number): string {
        let strNum = int.toString(16);
        (strNum.length%2 != 0 ? strNum = `0${strNum}` : strNum);
        return strNum;
    }

    get tag() {

        return tag[this._tag];
    }

    get data() {
        if(this._frame.data) {
            return this._frame.data;
        } else {
            throw new Error("Missing Data");
        }
    }

    get tagClass() {
        return tagClass[this._tagClass];
    }

    get form() {
        (!this._frame.form ? this._frame.form = 'Primitive' : this._frame.form);
        return form[this._frame.form];
    }

    get dataLength() : number {
        return (this._frame?.data?.length ? this._frame?.data?.length : 0);
    }

    get length(): number {
        if (this._frame?.length) {
            if(!(this._frame?.length === this.dataLength)) 
                 throw new Error('Length Mismatch');
         } else {
             this._frame.length = (this._frame.data?.length ?this._frame.data.length :  0);
         }  
         return this._frame.length;
    }

    get coded(): Buffer {
        if(!this.length)
        throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (this.tagClass | this.tag | this.form));
        // console.log(tagCode);
        let lenBuf = this.integerBuffer(this.length)
        //console.log(lenBuf);
        return  Buffer.concat([tagCode, lenBuf, this.data]);
    }
}

export class UTCTime extends TagBuilder {


    constructor(private _frameTag: UTCTimeFrame) {
        super(_frameTag, 'UTCTime', 'Universal');   
        this.convertDateTime();     
    }

    convertDateTime() {
        let date;
        let utc;
        let utc1;
        if(this._frameTag.str) {
            date = new Date(this._frameTag.str);
            utc1 = date.toISOString()
            utc = utc1.replace('20','').replace(/-/g,'',).replace('T','').replace(/:/g,'').split('.');
            this._frameTag.data = Buffer.from(utc[0]);
           // utc = `${date.getUTCFullYear()-2000}${date.getUTCMonth()+1}${date.getUTCDay()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}Z`
        }
    }
}

export class Integer extends TagBuilder {


    constructor(private _frameTag: integerFrame) {
        super(_frameTag, 'INTEGER', 'Universal');        
    }
}

export class BitString extends TagBuilder {


    constructor(private _frameTag: bitStringFrame) {
        super(_frameTag, 'BIT_STRING', 'Universal'); 
    }
}

export class OctetString extends TagBuilder {

    constructor(private _frameTag: octetStringFrame) {
        super(_frameTag, 'OCTET_STRING', 'Universal'); 
    }
}

export class PrintableString extends TagBuilder {

    constructor(private _frameTag: printableStringFrame) {
        super(_frameTag, 'PrintableString', 'Universal'); 
    }
}

export class IA5String extends TagBuilder {

    constructor(private _frameTag: IA5StringFrame) {
        super(_frameTag, 'IA5String', 'Universal'); 
    }
}

export class UTF8String extends TagBuilder {

    constructor(private _frameTag: UTF8StringFrame) {
        super(_frameTag, 'UTF8String', 'Universal'); 
    }
}

export class ObjectIdentifier extends TagBuilder {

    constructor(private _frameTag: objectIdentifierFrame) {
        super(_frameTag, 'OBJECT_IDENTIFIER', 'Universal');
        (_frameTag.str ? this._frameTag.data = this.buildObjectId() : null) 
    }

    private buildObjectId(): Buffer {
        if(!this._frameTag.str)
            throw new Error('Missing Data or String');
        let retBuf = Buffer.alloc(0);
        let strArray = this._frameTag.str.split('.');
        strArray.forEach((element,i) => {
            if(i === 0) {
                let num1 = parseInt(element);
                let num2 = parseInt(strArray[1]);
                let byte = (num1*40) + num2;
                retBuf = Buffer.concat([retBuf,Buffer.alloc(1,byte)]);
                console.log('build byte', retBuf.toString('hex'));
                return;
            }
            if(i > 1) {
                let num = parseInt(element);
                let numHex;
                let byte;
                numHex = num.toString(16);
                (numHex.length%2 ?  byte = Buffer.from(`0${numHex}`, 'hex') : byte = Buffer.from(numHex, 'hex'));
                
                if(num > 127){
                   let carry = 0;
                   let end = byte.length-1;
                   for(let i = end; i >= 0; i--)  {
                       let newCarry = byte[i] & mask.bit8;
                       newCarry = newCarry >>> 7;
                       byte[i] = byte[i] & ~mask.bit8
                       if(i < end){
                           byte[i] = byte[i] << 1;
                           byte[i] = byte[i] | carry;
                           byte[i] = byte[i] | mask.bit8;
                       }
                       carry = newCarry;
                    }
                    if(carry > 0) {
                        let newByte = Buffer.alloc(1,carry | mask.bit8) ;
                        byte = Buffer.concat([newByte,byte]);
                    }
                    
                }
                retBuf = Buffer.concat([retBuf,byte]);
                console.log('next', byte.toString('hex'));
                return;
            }
        })
        return retBuf;
    }
}
export class Sequence extends TagBuilder {
  
    constructor(private _frameTag: sequenceFrame) {
        super(_frameTag, 'SEQUENCE', 'Universal');
        (!this._frameTag.form ? this._frameTag.form = 'Constructed' : null);
        this._frameTag.data = this.buildData();
    }

    private buildData(): Buffer {
        let retChild = Buffer.alloc(0);
        this._frameTag.children.forEach((child) => {
            retChild = Buffer.concat([retChild, child.coded]);
        });

        return retChild;
    }   
}

export class ContextSpecific extends TagBuilder {
  
    constructor(private _frameTag: contextSpecificFrame) {
        super(_frameTag, 'CUSTOM', 'Context_Specific');
        (!this._frameTag.form ? this._frameTag.form = 'Constructed' : null);
        this._frameTag.data = this._frameTag.child.coded;
    }

    get tag() {
        return this._frameTag.tag;
    }
}

