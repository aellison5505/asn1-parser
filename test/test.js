const { ASN1 } = require('../lib/asn1');

let key = Buffer.from('MHQCAQEEIHOKDeDDw9cruOYkQwyPWL4y+QyFgMurQ91vODhH7xvnoAcGBSuBBAAKoUQDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let pubKey = Buffer.from('MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let sect571k1 = Buffer.from('MIHuAgEBBEgBL68PizRJeKHpR6QRHmDpd0x39lX72781vPVpB/GOjlX5qxLNOVImh7C1KGPvTlinnb2Sarlxm9NQw2+eaTw3J8qnfG5nYT6gBwYFK4EEACahgZUDgZIABAXfGfrX8bclnRA7Hylk7A0kxVMFjD6FXYTazqHy5Qpab46BB6tQrvuF6kNr5FEfMz4JcNwe0ev6tjppiEb6UI5hy8W8bGn5WwW5AHWQ4xtkZltNTdN2vUshMbqxPT1olTeEp33v6LkyeeEhcAmFTTB3HL5PM8RFgXvrea+jaHfMNUyhK8qH2szcLtKyXcihVA==','base64');

console.log(pubKey.toString('hex'));
//console.log(sect571k1.toString('hex'));

let asn1 = new ASN1();
asn1.decode(pubKey);
//asn1.decode(key);
