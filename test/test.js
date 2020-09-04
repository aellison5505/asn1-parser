const { ASN1 } = require('../lib/asn1');

let asn1 = new ASN1();
asn1.decode(Buffer.from('30','hex'));
