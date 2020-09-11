import { form,formType,mask,tag,tagClass,tagClassType, buildMap, pre, buildMapType, tagType } from './util';

type baseTagType = baseTagVars;

interface baseTagVars  {
   decoded: string;
   buildMap: Map<string, buildMap>;
   step: number;
   encoding: Buffer;
   prefix: number
}

class tagBase {


   constructor(private _tagVars: baseTagType = {
      buildMap: new Map(),
      decoded: '',
      encoding: Buffer.alloc(0),
      step: 0,
      prefix: 0
      }
   ) { }

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
   
   set decoded(decoded: string) {
      this._tagVars.decoded += decoded;
   }

   set encoding(encoding: Buffer) {
      this._tagVars.encoding = encoding;
   }

   set prefix(prefix: number) {
      this._tagVars.prefix = prefix;
   }

   set buildMap(buildMap: Map<string,buildMap>) {
      this._tagVars.buildMap = buildMap;
   } 

   set step(step: number) {
      this._tagVars.step = step;
   }

   strTag(val: tag) {
      return tag[val]
   }

   strForm(count: number) {
      return form[this.encoding[count] & mask.form];
   }

   getTag(count: number): number{
      //   console.log('tag enc',encoding[count].toString(16))
         switch(this.encoding[count] & mask.tagClass) {
            case tagClass.Universal:
               count = this.universal(count);
               break;
            case tagClass.Context_Specific:
               count = new NonUniversal(this.tagVars).decodeTag(count, tagClass.Context_Specific);
               break; 
            default:
               throw new Error(`Unknown Tag Class${(this.encoding[count] & mask.tagClass).toString(10)}`);
         }
         return count;
      }

   getLength(count: number): number[] {
         if(this.encoding[count] & mask.bit8) {
            let hexCount = this.encoding[count] & ~mask.bit8;
            count++;
            let i = count;
            let end = count+hexCount;
            let len = Buffer.alloc(hexCount);
           // console.log(i,end);
            this.encoding.copy(len,0,i,end);
       
            return [parseInt(len.toString('hex'),16),end-1];
         } else {
            return [this.encoding[count],count];
         }
      }

    universal(count: number): number {

         switch (this.encoding[count] & mask.tag) {
            case tag.SEQUENCE:
               count = new SequenceTag(this.tagVars).decodeTag(count);
            
               break;
            case tag.INTEGER:
               count = new IntegerTag(this.tagVars).decodeTag(count);
    
               break;
            case tag.OCTET_STRING:
               count = new OctetStringTag(this.tagVars).decodeTag(count);
               break;
            case tag.OBJECT_IDENTIFIER:
              count = new ObjectIdentiferTag(this.tagVars).decodeTag(count);
               break;
            case tag.BIT_STRING:
                 count = new BitStringTag(this.tagVars).decodeTag(count);
                  break;
            case tag.PrintableString:
               count = new PrintableStringTag(this.tagVars).decodeTag(count);
                  break;
            case tag.IA5String:
               count = new IA5StringTag(this.tagVars).decodeTag(count);
                  break;
            case tag.UTF8String:
               count = new UTF8StringTag(this.tagVars).decodeTag(count);
                  break;
            case tag.UTCTime:
               count = new UTCTimeTag(this.tagVars).decodeTag(count);
                  break;
            default:
               throw new Error(`Tag Not Supported ${(this.encoding[count] & mask.tag).toString(10)}`)
              // count = this.octetStringTag(encoding,count);
         }
         return count;
      }

   //   decodeTag(count: number): number;
      decodeTag(count: number): [number,buildMap]  | number | any;
      decodeTag(count: number, x: tagClass): number | any;
      decodeTag(count: number, x: tagClass): number | [number,buildMap];
      decodeTag(count: number, x: buildMap): [number,buildMap] | number | any;
      decodeTag(count: number): [any,any] | any;
      decodeTag(count: number, x?: any): any{
         let ret = 0;
         let tagClass: tagClass;
         let mapData = <buildMap>{};
         if(typeof x === 'object') {
            mapData = x;
            ret = 1;
         } else {
            tagClass = x;
            mapData = <buildMap>{};
           
         }
           
      
         mapData.form = <formType>this.strForm(count);
         count++;
   
         let len: number; 
         [len, count]= this.getLength(count);
         mapData.length = len;
         
         if(ret === 0) {
            return [count, mapData];
         } else {

         count++;
         let oct = Buffer.alloc(len);
         this.encoding.copy(oct,0,count,count+len);
         count += len;
         mapData.hex = oct.toString('hex');
         
            return [count, mapData];
         }
         
       }



      write(strTag: string, map: any) {
         this.buildMap.set(strTag,map);
         this.decoded = `${pre[this.prefix]}${strTag}\n`; 
         for (let x in <any>map) {
            this.decoded = `${pre[this.prefix+1]}${x}: ${map[x]}\n`;
         }
     
      }

}
export class NonUniversal extends tagBase {

   constructor(tagVars: baseTagVars) {
         super(tagVars);
      }

   decodeTag(count: number, x?: tagClass | any): number {
       let mapData = <buildMap>{};
      let csTag = this.encoding[count] & mask.tag;
      [count, mapData] = super.decodeTag(count, x);
      mapData.tag = csTag;
      this.write(`${tagClass[x]}-${this.step}`,mapData);
      if (!mapData.length)
         throw new Error('bad length');
      this.step++;

      count++;
      this.prefix++;
      
      let end = count+(mapData.length)-1
   
      for(let i = count; i < end;) {
      i = this.getTag(i);
   
      }


      this.prefix--;
      count += mapData.length;
      return count;
   }
}


export class SequenceTag extends tagBase {

   constructor(tagVars: baseTagVars) {
         super(tagVars);
      }

   decodeTag(count: number): number {
       let mapData = <buildMap>{};
 
      [count, mapData] = super.decodeTag(count);
      this.write(`${this.strTag(tag.SEQUENCE)}-${this.step}`,mapData);
      if (!mapData.length)
         throw new Error('bad length');
      this.step++;

      count++;
      this.prefix++;
 
      let end = count+(mapData.length)-1
   
      for(let i = count; i < end;) {
      i = this.getTag(i);
   
      }


      this.prefix--;
      count += mapData.length;
      return count;
   }
}

export class ObjectIdentiferTag extends tagBase {

   constructor(tagVars: baseTagVars) {
         super(tagVars);
      }

   decodeTag(count: number): number {
       let mapData = <buildMap>{};
 
      [count, mapData] = super.decodeTag(count);
      
    
      if (!mapData.length)
         throw new Error('bad length');
         let len = mapData.length;
         count++;
         let obj = Buffer.alloc(len);
         this.encoding.copy(obj,0,count,count+len);
         let strObj = '';
         let pack = 0;
         let carry = 0;
         let strBuf = Buffer.alloc(0);
         obj.forEach((byte,i) => {
            //console.log('b',byte.toString(16))
            if(i === 0) {
               strObj = `${Math.floor(byte/40)}.${byte%40}`;
               //console.log(strObj);
               return;
            }
            if(byte & mask.bit8) {
               byte = byte & ~mask.bit8;
               let bit1 = byte & 1;
               byte = byte >>> 1;
               byte = (carry << 7) | byte;
               carry = bit1;
               pack = 1;
               strBuf = Buffer.concat([strBuf, Buffer.alloc(1,byte)]);
         
               return;
            }
            if(pack === 1) {
               byte = (carry << 7) | byte;
               carry = 0;
               pack = 0;
               strBuf = Buffer.concat([strBuf, Buffer.alloc(1,byte)]);
               //console.log('last', byte.toString(16));
               let strTemp = parseInt(strBuf.toString('hex'),16);
               strObj += `.${strTemp}`;
               //console.log('str',strObj);
               strBuf = Buffer.alloc(0);
               return;
            }
            if(pack === 0) {
               strObj += `.${byte.toString(10)}`;
               //console.log(strObj);
               return;
            }
   
         });
         mapData.value = strObj;
         mapData.hex =  obj.toString('hex');
         this.write(`${this.strTag(tag.OBJECT_IDENTIFIER)}-${this.step}`,mapData);
         this.step++;
         count += len;
         return count;
   }
}

export class OctetStringTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {
      let mapData: buildMap = {};
      [count, mapData] = super.decodeTag(count, mapData);

      this.write(`${this.strTag(tag.OCTET_STRING)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}

export class UTF8StringTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {
      let mapData: buildMap = {};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count, mapData);
     ( !mapData.hex  ? mapData.hex = "00" : null)
      mapData.value = Buffer.from(mapData.hex, 'hex').toString('utf-8');
      this.write(`${this.strTag(tag.UTF8String)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}


export class PrintableStringTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {
      let mapData: buildMap = {};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count, mapData);
     ( !mapData.hex  ? mapData.hex = "00" : null)
      mapData.value = Buffer.from(mapData.hex, 'hex').toString();
      this.write(`${this.strTag(tag.PrintableString)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}

export class UTCTimeTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {
      let mapData: buildMap = {};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count, mapData);
     ( !mapData.hex  ? mapData.hex = "00" : null)
     let time = Buffer.from(mapData.hex, 'hex');
      let aTime = time.toString();
      let strTime = [];
      for(let i = 0; i < aTime.length-1; i++) {
         strTime.push(parseInt(`${aTime[i]}${aTime[i+1]}`));
         i = i +1;
      }
      (strTime[0] < 70 ? strTime[0] = strTime[0]+2000 : null);
       strTime[1] -= 1
   
      // let arrTime = new Array(strTime);
      mapData.value = new Date(Date.UTC.apply(this,<any>strTime));
    //  mapData.value = new Date(Date.UTC(1996)).toUTCString();
      this.write(`${this.strTag(tag.UTCTime)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}

export class IA5StringTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {
      let mapData: buildMap = {};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count, mapData);
     ( !mapData.hex  ? mapData.hex = "00" : null)
      mapData.value = Buffer.from(mapData.hex, 'hex').toString();
      this.write(`${this.strTag(tag.IA5String)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}


export class IntegerTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {

      let mapData = <buildMap>{};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count,mapData);
      mapData.value = BigInt(`0x${mapData.hex}`);

      this.write(`${this.strTag(tag.INTEGER)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}

export class BitStringTag extends tagBase {

   constructor(tagVars: baseTagVars) {
      super(tagVars);
   }

   decodeTag(count: number) {

      let mapData = <buildMap>{};
      mapData.hex = '';
      [count, mapData] = super.decodeTag(count,mapData);
     // mapData.value = BigInt(`0x${mapData.hex}`);

      this.write(`${this.strTag(tag.BIT_STRING)}-${this.step}`,mapData);
      this.step++;
      return count;
   }
}


export class Decode extends tagBase{


   constructor() {
     super();
   }

   decode(encoding: Buffer): [string,Map<string,buildMap>] {
      let count = 0;
      this.encoding = encoding;
      count = this.getTag(count)
   
      return [this.decoded,this.buildMap];

   }
}