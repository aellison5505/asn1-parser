import { tagClass, tag, form, integerFrame, sequenceFrame } from './util';

//export type tagBuilder = typeof TagBuilder;

export class TagBuilder {

    constructor() {}

    get coded():Buffer {
        return Buffer.alloc(1,0);
    }

    get Length() {
        return 0;
    }
}

export class Integer extends TagBuilder {


    constructor(private tagBuilder: integerFrame) {
        super();
        (tagBuilder.length ? this.calculateLength(tagBuilder.length) : this.calculateLength());
        (!tagBuilder.form ? tagBuilder.form = 'Primitive' : tagBuilder.form);
        
    }

    get tagFrame() {
        return this.tagBuilder;
    }

    private calculateLength(len?: number):void {
        if (len) {
           if(!(this.tagBuilder.data.length === len)) 
                throw new Error('Length Mismatch');
        } else {
            this.tagBuilder.length = this.tagBuilder.data.length;
        }  
    }

    
    get coded(): Buffer {
        if(!this.tagBuilder.length)
            throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (tagClass['Universal'] | tag['INTEGER'] | form[this.tagBuilder.form || 'Primitive']));
        console.log(tagCode);
        let lenBuf = Buffer.alloc(this.tagBuilder.length.toString(16).length);
        lenBuf.writeInt8(this.tagBuilder.length,0)
        console.log(lenBuf);
        return  Buffer.concat([tagCode, lenBuf, this.tagBuilder.data]);
    }
}

export class Sequence extends TagBuilder {
    data: Buffer;

    constructor(private tagBuilder: sequenceFrame) {
        super();
        let child = this.tagBuilder.children[0].coded;
        console.log('seq', child);
        this.data = Buffer.concat([child]);
        this.tagBuilder.length = this.data.length;

    }

    get coded(): Buffer {
        if(!this.tagBuilder.length)
            throw new Error('Bad Length');
        let tagCode = Buffer.alloc(1, (tagClass['Universal'] | tag['SEQUENCE'] | form[this.tagBuilder.form]));
        console.log(tagCode);
        let lenBuf = Buffer.alloc(this.tagBuilder.length.toString(16).length);
        lenBuf.writeInt8(this.tagBuilder.length,0)
        console.log(lenBuf);
        return  Buffer.concat([tagCode, lenBuf, this.data]);
    }


}