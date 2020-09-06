const { ASN1 } = require('../lib/asn1');
const { createECDH } = require('crypto');
const { Integer, Sequence } = require('../lib/tagBuilders');

let ec = createECDH('secp256k1');
ec.generateKeys();
let sec = ec.computeSecret(Buffer.from('04411f923b94afdc7df334dcd0bc69eb1647678c08b07934cf2b3c339d9eda196ac2ec9008b7330b3b18ca752f2ca7e9d26489f3e4d3c53540eeb25f5d1c035874', 'hex'));

//console.log(sec.toString('hex'));

let key = Buffer.from('MHQCAQEEIHOKDeDDw9cruOYkQwyPWL4y+QyFgMurQ91vODhH7xvnoAcGBSuBBAAKoUQDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let pubKey = Buffer.from('MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let sect571k1 = Buffer.from('MIHuAgEBBEgBL68PizRJeKHpR6QRHmDpd0x39lX72781vPVpB/GOjlX5qxLNOVImh7C1KGPvTlinnb2Sarlxm9NQw2+eaTw3J8qnfG5nYT6gBwYFK4EEACahgZUDgZIABAXfGfrX8bclnRA7Hylk7A0kxVMFjD6FXYTazqHy5Qpab46BB6tQrvuF6kNr5FEfMz4JcNwe0ev6tjppiEb6UI5hy8W8bGn5WwW5AHWQ4xtkZltNTdN2vUshMbqxPT1olTeEp33v6LkyeeEhcAmFTTB3HL5PM8RFgXvrea+jaHfMNUyhK8qH2szcLtKyXcihVA==','base64');

//console.log(pubKey.toString('hex'));
//console.log(sect571k1.toString('hex'));

let asn1 = new ASN1();
//asn1.decode(pubKey);
//asn1.decode(key);
//let hex = asn1.encode(new Integer({
 //   data: Buffer.from((100).toString(16),'hex')
//}));
let num = (1400).toString(16);
(num.length%2 != 0 ? num = `0${num}` : num);
console.log(Buffer.from(num,'hex'));
console.log(num.length%2);


let hex2 = asn1.encode(new Sequence({
    children: [
       new Integer({
           data: Buffer.from(num,'hex'),
       }),   
   ],
   form: 'Constructed'
}));
console.log(hex2)
