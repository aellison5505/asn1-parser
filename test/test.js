const { ASN1 } = require('../lib/asn1');
const { createECDH } = require('crypto');
const { Integer, Sequence, BitString, ContextSpecific, OctetString, ObjectIdentifier } = require('../lib/tagBuilders');

let ec = createECDH('secp256k1');
ec.generateKeys();
let sec = ec.computeSecret(Buffer.from('04411f923b94afdc7df334dcd0bc69eb1647678c08b07934cf2b3c339d9eda196ac2ec9008b7330b3b18ca752f2ca7e9d26489f3e4d3c53540eeb25f5d1c035874', 'hex'));

//console.log(sec.toString('hex'));

let key = Buffer.from('MHQCAQEEIHOKDeDDw9cruOYkQwyPWL4y+QyFgMurQ91vODhH7xvnoAcGBSuBBAAKoUQDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let pubKey = Buffer.from('MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEQR+SO5Sv3H3zNNzQvGnrFkdnjAiweTTPKzwznZ7aGWrC7JAItzMLOxjKdS8sp+nSZInz5NPFNUDusl9dHANYdA==','base64');

let sect571k1 = Buffer.from('MIHuAgEBBEgBL68PizRJeKHpR6QRHmDpd0x39lX72781vPVpB/GOjlX5qxLNOVImh7C1KGPvTlinnb2Sarlxm9NQw2+eaTw3J8qnfG5nYT6gBwYFK4EEACahgZUDgZIABAXfGfrX8bclnRA7Hylk7A0kxVMFjD6FXYTazqHy5Qpab46BB6tQrvuF6kNr5FEfMz4JcNwe0ev6tjppiEb6UI5hy8W8bGn5WwW5AHWQ4xtkZltNTdN2vUshMbqxPT1olTeEp33v6LkyeeEhcAmFTTB3HL5PM8RFgXvrea+jaHfMNUyhK8qH2szcLtKyXcihVA==','base64');

 console.log(pubKey.toString('hex'));

 let bigRsa = Buffer.from('MIIEpQIBAAKCAQEAs6CGhq47DzRZ/ff7eDgl7Z5251jU83oRRjJmO2kNl59gLl1b tIgavVfbcYOyVB17e2KO59jCD8Vz7VP1eLSg6hqNLhXRu6T4RKptzPy5IMnIOALQaUXQ9k1dv0e9iFh7MqGpxvR4ayTOmFl7pz4XnJ3HX5AHrs/VWGHACoKNwHRaP/1nDQNB5A9//LL8grW2h8IolvEGZL6wtWGRcgHhoxnHohIO3EcK6yFMpaU29sTFqjQ2i24u7CZgD6INWibB/JLKSUPc34vweIHiQGuIyGBB5FI5SqvFe4C846DlF+AiyvvlXNLcZB0gNjk5ui9biWC52pm8/X6xFWMOcF46tQIDAQABAoIBACIGYDUWv70rj3haBtpI2HZgM+mym/PaxXbkiRTr21VDLTbbHEngFiCTic/AwIDKbN98VdF475mJL2JfKvpITMrLaL64B1hh8V0gY1gW7wJU9oYVkmC+hsyA7ycSccZn7D40/THgkQbKnA+js5aEXnieMmvZnnrwh1sMeRIElNFFZ573enApTv64m+YWri//tPliQnlHsmJGeZX1b6+CkSWCiJZ8vIlp3nhXjO2ClyNhzuBTIf7DZHIh9ftJmxzB6xYwt/a+iqYONKPbO5tFwIR4mE78KYV39qIf6doY1Y18Dabf/deoS3bScfA2Nrs01W26HeJHoS6Rb3py6pvH12kCgYEA3qjlQdn4XeseIlN0MqP9cACfNvli6qf1dkk2Tn5m0wtQ3LD1Eh7xZt2AZO125aY0wY+4F/MYpaIQYDDPS+jE0/njkr7aKGohLKecg3QUUMi09E7xWaLFRSWXA6vX6Ufpb4J3x5jpGNhyzIsD2Nq/zY91N+kQAnL1R7E5qx5GPiMCgYEAzoYU R9oAo2JULFG2zVyZEz1I5BjURVpcWPmnvhX/bkbfBbqvdsbafUed6M+ol42qklm2GgTme7BSIWrFlzOpHqJ3flN3PtGz9U6mm779rtE/OnR/V6Q9hgaB6dgV3oXQxhzOF8A9V4FQpbBm7xfdvqxuq7cbCqHoxCvQhvDfdUcCgYEA15+j9HOLbBhG5GMBAhGBWzee9/PmcOwab2RS7QzHstUgh7fufI/uovkaX6L/I0IjkNcHJlpKogwh46Ug+pf+FHHIitG8Hqs4WTAwB7Uf/2N+qaDRZUaV13KhnfKKcuUrEMu+B1LzWRYzhhWRsi2U 1RJ6J5zR3i1JjxX3jNkSmRUCgYEAxUS9SoSp52adEFhdTHwOm5oGbhppaHWPkE2oNKG+gw+fKFHSGJqJSPGHnEH+wATJ0VFv6BqWLb+WM+VRJ8Ro3qJBkaEYXiDgzIh8DHi6yKmGw8dTe9ueCM9eeIe3G/6mFRaepYEzFsqmxh1htTAO13rNm6gjZFyTgg53+O1MBTECgYEAgaXo8coHLY+a11wq+L3/ZKWwr6/cQ6j7UkCh+VV1gfC9AhxBX1LlCye8KRSr60/JEUEFW+1CHXKwvaQpWB2qhOCuVGCt/gJguzfxFKbLjcXYf42zhLVI IHrb4hKTO3qFwOe3Hzh8cCOivRQNHzrMRvr29oz+dJeihcMPAPeP/Jg=','base64');

 let rsaKey = Buffer.from('MIICXQIBAAKBgQDJ22bltEuw2tYICTJE36XwR5RKlm46DJlBt4McOOj6O6DHoZKJmdPIgtJw5zz4Fb9d/P1Bd0RqOT5g7Edzehy8P/K6tvGKyoscVsY6QLgaXOcUwavyV4drM34d+gYfqXMn7+BhuOgPk+2R1gRxIVZt/XhmbnLdxOgninYxQNTLmwIDAQAB AoGBAKkidnBoBrf0VTw8gGtnPgI758wricaIAe4nlusR4Fyzk79R6Zf0VZj/zNafWt3AUy2sqoOtLJ0Yw+SwdhoTKnkurOh7Vef4hLdizIS/kuS2UvjUj7lvrJN9yUEhUKAsAK5mEY/8ofToF9Idohk7nd9LXym3cadeBcmCzWS6gwUJAkEA/TeLezgv7eMV8O3BFkylTF5gL7aH8xft0zS/lBikgxK6iLK0jbnRGxdeHrWvCWwYZzlpe6OL5m+zcq3sgG2rpwJBAMwTWZmFIqWDD6KmxlHuYs637z4aJGfd2vLP2f4Ig2TXqKN4oWpBta6GUHuOCPhMOJfhV/vOPTasXuzPJacATu0CQCTeH3rTVXcnZxxrIX/jrPWPkCWiR+0HAOONfI9NfzZuVaZtjohME7wEDPofrdqLWIo++7K6vzXP8aqy1Apm7WUCQH0ISfg2SsDvaK/10EI4dQ9EQG9jIvUER3ZHBL+QxbgOLYNikDsC4WZ5Ymwg3LwMLwxXA0oC1RxfRZV/YQlNtg0CQQCIPAMtD0ca47nWchqHvhsm/rJnnmMqjXz/E2fbJJOJ qQ5O20BG4wTh25gpAVeNmo/lL1ukrKii6d7vpwVv69lL','base64');
console.log(rsaKey.toString('hex'));

let asn1 = new ASN1();
asn1.decode(bigRsa);
/*
asn1.decode(Buffer.from('BgUrgQQACg==','base64'));
//let hex = asn1.encode(new Integer({
 //   data: Buffer.from((100).toString(16),'hex')
//}));
let num = (1400134).toString(16);
(num.length%2 != 0 ? num = `0${num}` : num);
console.log(Buffer.from(num,'hex'));
console.log(num.length%2);

let bitString = Buffer.from('a0f2457709b2d5', 'hex');
let hex2 = asn1.build(new Sequence({
    children: [
        new Integer({
        data: Buffer.from(num,'hex'),
        }),
       
        new ContextSpecific({
            tag: 1,
            form: 'Constructed',
            child:  new ObjectIdentifier({
                str: '1.3.132.0.38'
            })
        })
    ],
    //  form: 'Constructed'
}));
console.log(hex2)
asn1.decode(Buffer.from(hex2, 'hex'));
*/