import { form,formType,maskType,mask,tag,tagClass,tagClassType, tagType, pre } from './util';


export class Decode {

   private decoded: string;
   private pre: number;
   private ans1Map: Map<any,any>;

   constructor() {
      this.decoded = '';
      this.pre = 0;
      this.ans1Map = new Map();
   }

   decode(encoding: Buffer): string {
      let count = 0;
      // console.log('len total',encoding.length);
      count = this.getTag(encoding, count);
  //    console.log(count);
      console.log(this.decoded);
      return this.decoded;

   }

   private getTag(encoding: Buffer, count: number): number{
   //   console.log('tag enc',encoding[count].toString(16))
      switch(encoding[count] & mask.tagClass) {
         case tagClass.Universal:
            count = this.universal(encoding, count);
            break;
         case tagClass.Context_Specific:
            count = this.nonUniversal(encoding, count, 'Context_Specific');
            break; 
         case tagClass.Application:
            count = this.nonUniversal(encoding, count, 'Application');
            break;   
         case tagClass.Private:
            count = this.nonUniversal(encoding, count, 'Private');
            break; 
         default:
            throw new Error(`Unknown Tag Class${(encoding[count] & mask.tagClass).toString(10)}`);
      }
      return count;
   }

   private getLength(encoding: Buffer, count: number): number[] {
      if(encoding[count] & mask.bit8) {
         // get long length
         let hexCount = encoding[count] & ~mask.bit8;
      //   console.log('long count', hexCount.toString(10));
         count++;
         let i = count;
         let end = count+hexCount;
         let len = Buffer.alloc(hexCount);
        // console.log(i,end);
         encoding.copy(len,0,i,end);
    
         return [parseInt(len.toString('hex'),16),end-1];
      } else {
         return [encoding[count],count];
      }
   }

   private nonUniversal(encoding: Buffer, count: number, tag: tagClassType): number {
      this.decoded +=`${pre[this.pre]}${tagClass[tagClass[tag]]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      this.decoded +=`${pre[this.pre]}Tag: ${(encoding[count] & mask.tag).toString(10)}\n\t`;
      count++;
      let len: number;
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n`;
      count++;
      let i = count;
      let end = count+len;
     // console.log(i,end);
      this.pre++;
      do {
         i = this.getTag(encoding, i);
      //   console.log('con', i);
      } while(i < end);
 
      this.pre--;
      count += len;
      return count;
   }

   private universal(encoding: Buffer, count: number): number {

      switch (encoding[count] & mask.tag) {
         case tag.SEQUENCE:
            count = this.sequenceTag(encoding, count);
            break;
         case tag.INTEGER:
            count = this.integerTag(encoding,count);
            break;
         case tag.OCTET_STRING:
            count = this.octetStringTag(encoding,count);
            break;
         case tag.OBJECT_IDENTIFIER:
            count = this.objectIdentifer(encoding,count);
            break;
         case tag.BIT_STRING:
               count = this.bitString(encoding,count);
               break;
         default:
            throw new Error(`Tag Not Supported ${(encoding[count] & mask.tag).toString(10)}`)
      }
      return count;
   }

   private sequenceTag(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[0x10]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let length: number;
      [length, count] = this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${length}\n`;
    //  console.log('seq len',length);
      count++;
      this.pre++;
      let i = count;
      let end = count+length-1
   //   console.log('seq',i,end);
      do {
         i = this.getTag(encoding, i);
    //     console.log('seq', i);
      } while(i < end);

      this.pre--;
      count += length;
      return count;
   }

   private objectIdentifer(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[tag.OBJECT_IDENTIFIER]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let len: number; 
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n\t`;
      count++;
      let obj = Buffer.alloc(len);
      encoding.copy(obj,0,count,count+len);
      let strObj = '';
      let pack = 0;
      let carry = 0;
      let strBuf = Buffer.alloc(0);
      obj.forEach((byte,i) => {
         console.log('b',byte.toString(16))
         if(i === 0) {
            strObj = `${Math.floor(byte/40)}.${byte%40}`;
            console.log(strObj);
            return;
         }
         if(byte & mask.bit8) {
            byte = byte & ~mask.bit8;
            let bit1 = byte & 1;
            byte = byte >> 1;
            byte = (carry << 7) | byte;
            carry = bit1;
            pack = 1;
            strBuf = Buffer.concat([strBuf, Buffer.alloc(1,byte)]);
            console.log('carry', byte.toString(16));
            return;
         }
         if(pack === 1) {
            byte = (carry << 7) | byte;
            carry = 0;
            pack = 0;
            strBuf = Buffer.concat([strBuf, Buffer.alloc(1,byte)]);
            console.log('last', byte.toString(16));
            let strTemp = parseInt(strBuf.toString('hex'),16);
            strObj += `.${strTemp}`;
            console.log('str',strObj);
            strBuf = Buffer.alloc(0);
            return;
         }
         if(pack === 0) {
            strObj += `.${byte.toString(10)}`;
            console.log(strObj);
            return;
         }

      });
      this.decoded +=`${pre[this.pre]}${obj.toString('hex')}\n\t`;
      this.decoded +=`${pre[this.pre]}${strObj}\n`;
      count += len;
      return count;
   }

   private bitString(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[tag.BIT_STRING]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let len: number; 
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n\t`;
      count++;
      let bit = Buffer.alloc(len);
      encoding.copy(bit,0,count,count+len);
      this.decoded +=`${pre[this.pre]}${bit.toString('hex')}\n`;
      count += len;
      return count;
   }

   private integerTag(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[tag.INTEGER]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let len: number; 
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n\t`;
      count++;
      let int = Buffer.alloc(len);
      encoding.copy(int,0,count,count+len);
      count += len;
      this.decoded +=`${pre[this.pre]}${parseInt(int.toString('hex'), 16)}\n`;
      return count;
   }

   private octetStringTag(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[tag.OCTET_STRING]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let len: number;
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n\t`;
      count++;
      let oct = Buffer.alloc(len);
      encoding.copy(oct,0,count,count+len);
      count += len;
      this.decoded +=`${pre[this.pre]}${oct.toString('hex')}\n`;
      return count;

   }

}