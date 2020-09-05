import { form,formType,maskType,mask,tag,tagClass,tagClassType, tagType, pre } from './util';


export class ASN1 {

   decoded: string;
   pre: number;
   ans1Map: Map<any,any>;

   constructor() {
      this.decoded = '';
      this.pre = 0;
      this.ans1Map = new Map();
   }

   decode(encoding: Buffer): void {
      let count = 0;
      // console.log('len total',encoding.length);
      count = this.getTag(encoding, count);
  //    console.log(count);
      console.log(this.decoded);

   }

   getTag(encoding: Buffer, count: number): number{
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

   getLength(encoding: Buffer, count: number): number[] {
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

   nonUniversal(encoding: Buffer, count: number, tag: tagClassType): number {
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

   universal(encoding: Buffer, count: number): number {

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
            console.log('Tag Not Supported',(encoding[count] & mask.tag).toString(10));
            throw new Error(`Tag Not Supported ${(encoding[count] & mask.tag).toString(10)}`)
      }
      return count;
   }

   sequenceTag(encoding: Buffer, count: number): number {
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

   objectIdentifer(encoding: Buffer, count: number): number {
      this.decoded +=`${pre[this.pre]}${tag[tag.OBJECT_IDENTIFIER]}\n\t`;
      this.decoded +=`${pre[this.pre]}${form[encoding[count] & mask.form]}\n\t`;
      count++;
      let len: number; 
      [len, count]= this.getLength(encoding,count);
      this.decoded +=`${pre[this.pre]}Length: ${len}\n\t`;
      count++;
      let obj = Buffer.alloc(len);
      encoding.copy(obj,0,count,count+len);
      this.decoded +=`${pre[this.pre]}${obj.toString('hex')}\n`;
      count += len;
      return count;
   }

   bitString(encoding: Buffer, count: number): number {
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

   integerTag(encoding: Buffer, count: number): number {
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

   octetStringTag(encoding: Buffer, count: number): number {
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