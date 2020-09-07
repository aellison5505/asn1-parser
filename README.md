
<a name="readmemd"></a>

[asn1-pharser](#globalsmd)

# asn1-pharser



<a name="classes_asn1_asn1md"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md) › [ASN1](#classes_asn1_asn1md)

# Class: ASN1

This will decode and build ASN.1
Currently supported tags are
 INTEGER
 BIT_STRING
 OCTET_STRING
 OBJECT_IDENTIFIER
 SEQUENCE
 Context_Specific

## Hierarchy

* **ASN1**

## Index

### Methods

* [bitString](#bitstring)
* [build](#build)
* [contextSpecific](#contextspecific)
* [decode](#decode)
* [integer](#integer)
* [objectIdentifier](#objectidentifier)
* [octetString](#octetstring)
* [sequence](#sequence)

## Methods

###  bitString

▸ **bitString**(`frameTag`: [bitStringFrame](#interfaces_util_bitstringframemd)): *[BitString](#classes_tagbuilders_bitstringmd)*

Defined in asn1.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [bitStringFrame](#interfaces_util_bitstringframemd) |

**Returns:** *[BitString](#classes_tagbuilders_bitstringmd)*

___

###  build

▸ **build**(`tagBuilder`: [tagBuilderType](#tagbuildertype)): *string*

Defined in asn1.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`tagBuilder` | [tagBuilderType](#tagbuildertype) |

**Returns:** *string*

___

###  contextSpecific

▸ **contextSpecific**(`frameTag`: [contextSpecificFrame](#interfaces_util_contextspecificframemd)): *[ContextSpecific](#classes_tagbuilders_contextspecificmd)*

Defined in asn1.ts:52

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [contextSpecificFrame](#interfaces_util_contextspecificframemd) |

**Returns:** *[ContextSpecific](#classes_tagbuilders_contextspecificmd)*

___

###  decode

▸ **decode**(`encoding`: Buffer): *[string, Map‹string, [buildMap](#interfaces_util_buildmapmd)›]*

Defined in asn1.ts:23

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`encoding` | Buffer | Buffer of DER encoded data |

**Returns:** *[string, Map‹string, [buildMap](#interfaces_util_buildmapmd)›]*

formatted string of decoded, Map of decoded

___

###  integer

▸ **integer**(`frameTag`: [integerFrame](#interfaces_util_integerframemd)): *[Integer](#classes_tagbuilders_integermd)*

Defined in asn1.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [integerFrame](#interfaces_util_integerframemd) |

**Returns:** *[Integer](#classes_tagbuilders_integermd)*

___

###  objectIdentifier

▸ **objectIdentifier**(`frameTag`: [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)): *[ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)*

Defined in asn1.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [objectIdentifierFrame](#interfaces_util_objectidentifierframemd) |

**Returns:** *[ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)*

___

###  octetString

▸ **octetString**(`frameTag`: [octetStringFrame](#interfaces_util_octetstringframemd)): *[OctetString](#classes_tagbuilders_octetstringmd)*

Defined in asn1.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [octetStringFrame](#interfaces_util_octetstringframemd) |

**Returns:** *[OctetString](#classes_tagbuilders_octetstringmd)*

___

###  sequence

▸ **sequence**(`frameTag`: [sequenceFrame](#interfaces_util_sequenceframemd)): *[Sequence](#classes_tagbuilders_sequencemd)*

Defined in asn1.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`frameTag` | [sequenceFrame](#interfaces_util_sequenceframemd) |

**Returns:** *[Sequence](#classes_tagbuilders_sequencemd)*


<a name="classes_decode_decodemd"></a>

[asn1-pharser](#globalsmd) › ["decode"](#modules_decode_md) › [Decode](#classes_decode_decodemd)

# Class: Decode

## Hierarchy

* **Decode**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [buildMap](#private-buildmap)
* [decoded](#private-decoded)
* [pre](#private-pre)
* [step](#private-step)

### Methods

* [bitString](#private-bitstring)
* [decode](#decode)
* [getLength](#private-getlength)
* [getTag](#private-gettag)
* [integerTag](#private-integertag)
* [nonUniversal](#private-nonuniversal)
* [objectIdentifer](#private-objectidentifer)
* [octetStringTag](#private-octetstringtag)
* [sequenceTag](#private-sequencetag)
* [universal](#private-universal)

## Constructors

###  constructor

\+ **new Decode**(): *[Decode](#classes_decode_decodemd)*

Defined in decode.ts:10

**Returns:** *[Decode](#classes_decode_decodemd)*

## Properties

### `Private` buildMap

• **buildMap**: *Map‹string, [buildMap](#interfaces_util_buildmapmd)›*

Defined in decode.ts:9

___

### `Private` decoded

• **decoded**: *string*

Defined in decode.ts:7

___

### `Private` pre

• **pre**: *number*

Defined in decode.ts:8

___

### `Private` step

• **step**: *number*

Defined in decode.ts:10

## Methods

### `Private` bitString

▸ **bitString**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:222

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

###  decode

▸ **decode**(`encoding`: Buffer): *[string, Map‹string, [buildMap](#interfaces_util_buildmapmd)›]*

Defined in decode.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |

**Returns:** *[string, Map‹string, [buildMap](#interfaces_util_buildmapmd)›]*

___

### `Private` getLength

▸ **getLength**(`encoding`: Buffer, `count`: number): *number[]*

Defined in decode.ts:52

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number[]*

___

### `Private` getTag

▸ **getTag**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

### `Private` integerTag

▸ **integerTag**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:244

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

### `Private` nonUniversal

▸ **nonUniversal**(`encoding`: Buffer, `count`: number, `tag`: [tagClassType](#tagclasstype)): *number*

Defined in decode.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |
`tag` | [tagClassType](#tagclasstype) |

**Returns:** *number*

___

### `Private` objectIdentifer

▸ **objectIdentifer**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:157

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

### `Private` octetStringTag

▸ **octetStringTag**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:260

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

### `Private` sequenceTag

▸ **sequenceTag**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:124

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*

___

### `Private` universal

▸ **universal**(`encoding`: Buffer, `count`: number): *number*

Defined in decode.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |
`count` | number |

**Returns:** *number*


<a name="classes_tagbuilders_bitstringmd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [BitString](#classes_tagbuilders_bitstringmd)

# Class: BitString

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **BitString**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

## Constructors

###  constructor

\+ **new BitString**(`_frameTag`: [bitStringFrame](#interfaces_util_bitstringframemd)): *[BitString](#classes_tagbuilders_bitstringmd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:83

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [bitStringFrame](#interfaces_util_bitstringframemd) |

**Returns:** *[BitString](#classes_tagbuilders_bitstringmd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[bitStringFrame](#interfaces_util_bitstringframemd)*

Defined in tagBuilders.ts:86

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*


<a name="classes_tagbuilders_contextspecificmd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [ContextSpecific](#classes_tagbuilders_contextspecificmd)

# Class: ContextSpecific

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **ContextSpecific**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

## Constructors

###  constructor

\+ **new ContextSpecific**(`_frameTag`: [contextSpecificFrame](#interfaces_util_contextspecificframemd)): *[ContextSpecific](#classes_tagbuilders_contextspecificmd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:168

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [contextSpecificFrame](#interfaces_util_contextspecificframemd) |

**Returns:** *[ContextSpecific](#classes_tagbuilders_contextspecificmd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[contextSpecificFrame](#interfaces_util_contextspecificframemd)*

Defined in tagBuilders.ts:170

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *number*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:176

**Returns:** *number*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*


<a name="classes_tagbuilders_integermd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [Integer](#classes_tagbuilders_integermd)

# Class: Integer

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **Integer**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

## Constructors

###  constructor

\+ **new Integer**(`_frameTag`: [integerFrame](#interfaces_util_integerframemd)): *[Integer](#classes_tagbuilders_integermd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:75

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [integerFrame](#interfaces_util_integerframemd) |

**Returns:** *[Integer](#classes_tagbuilders_integermd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[integerFrame](#interfaces_util_integerframemd)*

Defined in tagBuilders.ts:78

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*


<a name="classes_tagbuilders_objectidentifiermd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)

# Class: ObjectIdentifier

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **ObjectIdentifier**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

### Methods

* [buildObjectId](#private-buildobjectid)

## Constructors

###  constructor

\+ **new ObjectIdentifier**(`_frameTag`: [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)): *[ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:98

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [objectIdentifierFrame](#interfaces_util_objectidentifierframemd) |

**Returns:** *[ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[objectIdentifierFrame](#interfaces_util_objectidentifierframemd)*

Defined in tagBuilders.ts:100

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*

## Methods

### `Private` buildObjectId

▸ **buildObjectId**(): *Buffer*

Defined in tagBuilders.ts:105

**Returns:** *Buffer*


<a name="classes_tagbuilders_octetstringmd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [OctetString](#classes_tagbuilders_octetstringmd)

# Class: OctetString

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **OctetString**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

## Constructors

###  constructor

\+ **new OctetString**(`_frameTag`: [octetStringFrame](#interfaces_util_octetstringframemd)): *[OctetString](#classes_tagbuilders_octetstringmd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [octetStringFrame](#interfaces_util_octetstringframemd) |

**Returns:** *[OctetString](#classes_tagbuilders_octetstringmd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[octetStringFrame](#interfaces_util_octetstringframemd)*

Defined in tagBuilders.ts:93

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*


<a name="classes_tagbuilders_sequencemd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [Sequence](#classes_tagbuilders_sequencemd)

# Class: Sequence

## Hierarchy

* [TagBuilder](#classes_tagbuilders_tagbuildermd)

  ↳ **Sequence**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frameTag](#private-_frametag)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

### Methods

* [buildData](#private-builddata)

## Constructors

###  constructor

\+ **new Sequence**(`_frameTag`: [sequenceFrame](#interfaces_util_sequenceframemd)): *[Sequence](#classes_tagbuilders_sequencemd)*

*Overrides [TagBuilder](#classes_tagbuilders_tagbuildermd).[constructor](#constructor)*

Defined in tagBuilders.ts:150

**Parameters:**

Name | Type |
------ | ------ |
`_frameTag` | [sequenceFrame](#interfaces_util_sequenceframemd) |

**Returns:** *[Sequence](#classes_tagbuilders_sequencemd)*

## Properties

### `Private` _frameTag

• **_frameTag**: *[sequenceFrame](#interfaces_util_sequenceframemd)*

Defined in tagBuilders.ts:152

## Accessors

###  coded

• **get coded**(): *Buffer*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[coded](#coded)*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[data](#data)*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[dataLength](#datalength)*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[form](#form)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[length](#length)*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tag](#tag)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

*Inherited from [TagBuilder](#classes_tagbuilders_tagbuildermd).[tagClass](#tagclass)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*

## Methods

### `Private` buildData

▸ **buildData**(): *Buffer*

Defined in tagBuilders.ts:158

**Returns:** *Buffer*


<a name="classes_tagbuilders_tagbuildermd"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md) › [TagBuilder](#classes_tagbuilders_tagbuildermd)

# Class: TagBuilder

## Hierarchy

* **TagBuilder**

  ↳ [Integer](#classes_tagbuilders_integermd)

  ↳ [BitString](#classes_tagbuilders_bitstringmd)

  ↳ [OctetString](#classes_tagbuilders_octetstringmd)

  ↳ [ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)

  ↳ [Sequence](#classes_tagbuilders_sequencemd)

  ↳ [ContextSpecific](#classes_tagbuilders_contextspecificmd)

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_frame](#private-_frame)
* [_tag](#private-_tag)
* [_tagClass](#private-_tagclass)

### Accessors

* [coded](#coded)
* [data](#data)
* [dataLength](#datalength)
* [form](#form)
* [length](#length)
* [tag](#tag)
* [tagClass](#tagclass)

### Methods

* [integerBuffer](#private-integerbuffer)
* [integerHex](#private-integerhex)

## Constructors

###  constructor

\+ **new TagBuilder**(`_frame`: [tagFrameType](#tagframetype), `_tag`: [tagType](#tagtype), `_tagClass`: [tagClassType](#tagclasstype)): *[TagBuilder](#classes_tagbuilders_tagbuildermd)*

Defined in tagBuilders.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`_frame` | [tagFrameType](#tagframetype) |
`_tag` | [tagType](#tagtype) |
`_tagClass` | [tagClassType](#tagclasstype) |

**Returns:** *[TagBuilder](#classes_tagbuilders_tagbuildermd)*

## Properties

### `Private` _frame

• **_frame**: *[tagFrameType](#tagframetype)*

Defined in tagBuilders.ts:13

___

### `Private` _tag

• **_tag**: *[tagType](#tagtype)*

Defined in tagBuilders.ts:13

___

### `Private` _tagClass

• **_tagClass**: *[tagClassType](#tagclasstype)*

Defined in tagBuilders.ts:13

## Accessors

###  coded

• **get coded**(): *Buffer*

Defined in tagBuilders.ts:64

**Returns:** *Buffer*

___

###  data

• **get data**(): *Buffer‹›*

Defined in tagBuilders.ts:33

**Returns:** *Buffer‹›*

___

###  dataLength

• **get dataLength**(): *number*

Defined in tagBuilders.ts:50

**Returns:** *number*

___

###  form

• **get form**(): *[form](#enums_util_formmd)*

Defined in tagBuilders.ts:45

**Returns:** *[form](#enums_util_formmd)*

___

###  length

• **get length**(): *number*

Defined in tagBuilders.ts:54

**Returns:** *number*

___

###  tag

• **get tag**(): *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

Defined in tagBuilders.ts:28

**Returns:** *[INTEGER](#integer) | [BIT_STRING](#bit_string) | [OCTET_STRING](#octet_string) | [NULL](#null) | [OBJECT_IDENTIFIER](#object_identifier) | [UTF8String](#utf8string) | [SEQUENCE](#sequence) | [SET](#set) | [PrintableString](#printablestring) | [IA5String](#ia5string) | [UTCTime](#utctime) | [GeneralizedTime](#generalizedtime) | [CUSTOM](#custom)*

___

###  tagClass

• **get tagClass**(): *[tagClass](#enums_util_tagclassmd)*

Defined in tagBuilders.ts:41

**Returns:** *[tagClass](#enums_util_tagclassmd)*

## Methods

### `Private` integerBuffer

▸ **integerBuffer**(`int`: number): *Buffer*

Defined in tagBuilders.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`int` | number |

**Returns:** *Buffer*

___

### `Private` integerHex

▸ **integerHex**(`int`: number): *string*

Defined in tagBuilders.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`int` | number |

**Returns:** *string*


<a name="enums_util_formmd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [form](#enums_util_formmd)

# Enumeration: form

## Index

### Enumeration members

* [Constructed](#constructed)
* [Primitive](#primitive)

## Enumeration members

###  Constructed

• **Constructed**: = 0x1 << 5

Defined in util.ts:15

___

###  Primitive

• **Primitive**: = 0

Defined in util.ts:14


<a name="enums_util_maskmd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [mask](#enums_util_maskmd)

# Enumeration: mask

## Index

### Enumeration members

* [bit8](#bit8)
* [form](#form)
* [tag](#tag)
* [tagClass](#tagclass)

## Enumeration members

###  bit8

• **bit8**: = 0x01 << 7

Defined in util.ts:42

___

###  form

• **form**: = 0x01 << 5

Defined in util.ts:41

___

###  tag

• **tag**: = 31

Defined in util.ts:39

___

###  tagClass

• **tagClass**: = 0x03 << 6

Defined in util.ts:40


<a name="enums_util_premd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [pre](#enums_util_premd)

# Enumeration: pre

## Index

### Enumeration members

* [](#)
* [	](#	)
* [		](#		)
* [			](#			)

## Enumeration members

• ****:

Defined in util.ts:46

___

###  	

• **	**:

Defined in util.ts:47

___

###  		

• **		**:

Defined in util.ts:48

___

###  			

• **			**:

Defined in util.ts:49


<a name="enums_util_tagmd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [tag](#enums_util_tagmd)

# Enumeration: tag

## Index

### Enumeration members

* [BIT_STRING](#bit_string)
* [CUSTOM](#custom)
* [GeneralizedTime](#generalizedtime)
* [IA5String](#ia5string)
* [INTEGER](#integer)
* [NULL](#null)
* [OBJECT_IDENTIFIER](#object_identifier)
* [OCTET_STRING](#octet_string)
* [PrintableString](#printablestring)
* [SEQUENCE](#sequence)
* [SET](#set)
* [UTCTime](#utctime)
* [UTF8String](#utf8string)

## Enumeration members

###  BIT_STRING

• **BIT_STRING**: = 3

Defined in util.ts:22

___

###  CUSTOM

• **CUSTOM**: = 0

Defined in util.ts:33

___

###  GeneralizedTime

• **GeneralizedTime**: = 24

Defined in util.ts:32

___

###  IA5String

• **IA5String**: = 22

Defined in util.ts:30

___

###  INTEGER

• **INTEGER**: = 2

Defined in util.ts:21

___

###  NULL

• **NULL**: = 5

Defined in util.ts:24

___

###  OBJECT_IDENTIFIER

• **OBJECT_IDENTIFIER**: = 6

Defined in util.ts:25

___

###  OCTET_STRING

• **OCTET_STRING**: = 4

Defined in util.ts:23

___

###  PrintableString

• **PrintableString**: = 19

Defined in util.ts:29

___

###  SEQUENCE

• **SEQUENCE**: = 16

Defined in util.ts:27

___

###  SET

• **SET**: = 17

Defined in util.ts:28

___

###  UTCTime

• **UTCTime**: = 23

Defined in util.ts:31

___

###  UTF8String

• **UTF8String**: = 12

Defined in util.ts:26


<a name="enums_util_tagclassmd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [tagClass](#enums_util_tagclassmd)

# Enumeration: tagClass

## Index

### Enumeration members

* [Application](#application)
* [Context_Specific](#context_specific)
* [Private](#private)
* [Universal](#universal)

## Enumeration members

###  Application

• **Application**: = 0x1 << 6

Defined in util.ts:6

___

###  Context_Specific

• **Context_Specific**: = 0x01 << 7

Defined in util.ts:7

___

###  Private

• **Private**: = 0x03 << 6

Defined in util.ts:8

___

###  Universal

• **Universal**: = 0

Defined in util.ts:5


<a name="globalsmd"></a>

[asn1-pharser](#globalsmd)

# asn1-pharser

## Index

### Modules

* ["asn1"](#modules_asn1_md)
* ["decode"](#modules_decode_md)
* ["tagBuilders"](#modules_tagbuilders_md)
* ["util"](#modules_util_md)


<a name="interfaces_util_bitstringframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [bitStringFrame](#interfaces_util_bitstringframemd)

# Interface: bitStringFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **bitStringFrame**

## Index

### Properties

* [data](#data)
* [form](#optional-form)
* [length](#optional-length)

## Properties

###  data

• **data**: *Buffer*

*Overrides [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:70

___

### `Optional` form

• **form**? : *[formType](#formtype)*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:61

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62


<a name="interfaces_util_buildmapmd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [buildMap](#interfaces_util_buildmapmd)

# Interface: buildMap

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)

  ↳ **buildMap**

## Index

### Properties

* [child](#optional-child)
* [children](#optional-children)
* [data](#optional-data)
* [form](#optional-form)
* [hex](#optional-hex)
* [length](#optional-length)
* [str](#optional-str)
* [value](#optional-value)

## Properties

### `Optional` child

• **child**? : *Map‹string, [buildMap](#interfaces_util_buildmapmd)›*

Defined in util.ts:91

___

### `Optional` children

• **children**? : *Map‹string, [buildMap](#interfaces_util_buildmapmd)›*

Defined in util.ts:92

___

### `Optional` data

• **data**? : *Buffer*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

*Overrides [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:63

___

### `Optional` form

• **form**? : *[formType](#formtype)*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

*Overrides [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:61

___

### `Optional` hex

• **hex**? : *undefined | string*

Defined in util.ts:94

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

*Overrides [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62

___

### `Optional` str

• **str**? : *undefined | string*

*Inherited from [objectIdentifierFrame](#interfaces_util_objectidentifierframemd).[str](#optional-str)*

Defined in util.ts:77

___

### `Optional` value

• **value**? : *any*

Defined in util.ts:93


<a name="interfaces_util_contextspecificframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [contextSpecificFrame](#interfaces_util_contextspecificframemd)

# Interface: contextSpecificFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **contextSpecificFrame**

## Index

### Properties

* [child](#child)
* [data](#optional-data)
* [form](#form)
* [length](#optional-length)
* [tag](#tag)

## Properties

###  child

• **child**: *[tagBuilderType](#tagbuildertype)*

Defined in util.ts:85

___

### `Optional` data

• **data**? : *Buffer*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:63

___

###  form

• **form**: *[formType](#formtype)*

*Overrides [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:86

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62

___

###  tag

• **tag**: *number*

Defined in util.ts:87


<a name="interfaces_util_integerframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [integerFrame](#interfaces_util_integerframemd)

# Interface: integerFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **integerFrame**

## Index

### Properties

* [data](#data)
* [form](#optional-form)
* [length](#optional-length)

## Properties

###  data

• **data**: *Buffer*

*Overrides [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:66

___

### `Optional` form

• **form**? : *[formType](#formtype)*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:61

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62


<a name="interfaces_util_objectidentifierframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)

# Interface: objectIdentifierFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **objectIdentifierFrame**

  ↳ [buildMap](#interfaces_util_buildmapmd)

## Index

### Properties

* [data](#optional-data)
* [form](#optional-form)
* [length](#optional-length)
* [str](#optional-str)

## Properties

### `Optional` data

• **data**? : *Buffer*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:63

___

### `Optional` form

• **form**? : *[formType](#formtype)*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:61

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62

___

### `Optional` str

• **str**? : *undefined | string*

Defined in util.ts:77


<a name="interfaces_util_octetstringframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [octetStringFrame](#interfaces_util_octetstringframemd)

# Interface: octetStringFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **octetStringFrame**

## Index

### Properties

* [data](#data)
* [form](#optional-form)
* [length](#optional-length)

## Properties

###  data

• **data**: *Buffer*

*Overrides [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:73

___

### `Optional` form

• **form**? : *[formType](#formtype)*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:61

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62


<a name="interfaces_util_sequenceframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [sequenceFrame](#interfaces_util_sequenceframemd)

# Interface: sequenceFrame

## Hierarchy

* [tagFrame](#interfaces_util_tagframemd)

  ↳ **sequenceFrame**

## Index

### Properties

* [children](#children)
* [data](#optional-data)
* [form](#form)
* [length](#optional-length)

## Properties

###  children

• **children**: *[tagBuilderType](#tagbuildertype)[]*

Defined in util.ts:81

___

### `Optional` data

• **data**? : *Buffer*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[data](#optional-data)*

Defined in util.ts:63

___

###  form

• **form**: *[formType](#formtype)*

*Overrides [tagFrame](#interfaces_util_tagframemd).[form](#optional-form)*

Defined in util.ts:82

___

### `Optional` length

• **length**? : *undefined | number*

*Inherited from [tagFrame](#interfaces_util_tagframemd).[length](#optional-length)*

Defined in util.ts:62


<a name="interfaces_util_tagframemd"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md) › [tagFrame](#interfaces_util_tagframemd)

# Interface: tagFrame

## Hierarchy

* **tagFrame**

  ↳ [integerFrame](#interfaces_util_integerframemd)

  ↳ [bitStringFrame](#interfaces_util_bitstringframemd)

  ↳ [octetStringFrame](#interfaces_util_octetstringframemd)

  ↳ [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)

  ↳ [sequenceFrame](#interfaces_util_sequenceframemd)

  ↳ [contextSpecificFrame](#interfaces_util_contextspecificframemd)

  ↳ [buildMap](#interfaces_util_buildmapmd)

## Index

### Properties

* [data](#optional-data)
* [form](#optional-form)
* [length](#optional-length)

## Properties

### `Optional` data

• **data**? : *Buffer*

Defined in util.ts:63

___

### `Optional` form

• **form**? : *[formType](#formtype)*

Defined in util.ts:61

___

### `Optional` length

• **length**? : *undefined | number*

Defined in util.ts:62


<a name="modules_asn1_md"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md)

# Module: "asn1"

## Index

### Classes

* [ASN1](#classes_asn1_asn1md)


<a name="modules_decode_md"></a>

[asn1-pharser](#globalsmd) › ["decode"](#modules_decode_md)

# Module: "decode"

## Index

### Classes

* [Decode](#classes_decode_decodemd)


<a name="modules_tagbuilders_md"></a>

[asn1-pharser](#globalsmd) › ["tagBuilders"](#modules_tagbuilders_md)

# Module: "tagBuilders"

## Index

### Classes

* [BitString](#classes_tagbuilders_bitstringmd)
* [ContextSpecific](#classes_tagbuilders_contextspecificmd)
* [Integer](#classes_tagbuilders_integermd)
* [ObjectIdentifier](#classes_tagbuilders_objectidentifiermd)
* [OctetString](#classes_tagbuilders_octetstringmd)
* [Sequence](#classes_tagbuilders_sequencemd)
* [TagBuilder](#classes_tagbuilders_tagbuildermd)

### Type aliases

* [tagBuilderType](#tagbuildertype)

## Type aliases

###  tagBuilderType

Ƭ **tagBuilderType**: *[TagBuilder](#classes_tagbuilders_tagbuildermd) | [BitString](#classes_tagbuilders_bitstringmd) | [ContextSpecific](#classes_tagbuilders_contextspecificmd) | [Integer](#classes_tagbuilders_integermd) | [ObjectIdentifier](#classes_tagbuilders_objectidentifiermd) | [OctetString](#classes_tagbuilders_octetstringmd) | [Sequence](#classes_tagbuilders_sequencemd)*

Defined in tagBuilders.ts:3


<a name="modules_util_md"></a>

[asn1-pharser](#globalsmd) › ["util"](#modules_util_md)

# Module: "util"

## Index

### Enumerations

* [form](#enums_util_formmd)
* [mask](#enums_util_maskmd)
* [pre](#enums_util_premd)
* [tag](#enums_util_tagmd)
* [tagClass](#enums_util_tagclassmd)

### Interfaces

* [bitStringFrame](#interfaces_util_bitstringframemd)
* [buildMap](#interfaces_util_buildmapmd)
* [contextSpecificFrame](#interfaces_util_contextspecificframemd)
* [integerFrame](#interfaces_util_integerframemd)
* [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)
* [octetStringFrame](#interfaces_util_octetstringframemd)
* [sequenceFrame](#interfaces_util_sequenceframemd)
* [tagFrame](#interfaces_util_tagframemd)

### Type aliases

* [formType](#formtype)
* [maskType](#masktype)
* [tagClassType](#tagclasstype)
* [tagFrameType](#tagframetype)
* [tagType](#tagtype)

## Type aliases

###  formType

Ƭ **formType**: *keyof typeof form*

Defined in util.ts:11

___

###  maskType

Ƭ **maskType**: *keyof typeof mask*

Defined in util.ts:36

___

###  tagClassType

Ƭ **tagClassType**: *keyof typeof tagClass*

Defined in util.ts:2

___

###  tagFrameType

Ƭ **tagFrameType**: *[tagFrame](#interfaces_util_tagframemd) | [integerFrame](#interfaces_util_integerframemd) | [sequenceFrame](#interfaces_util_sequenceframemd) | [bitStringFrame](#interfaces_util_bitstringframemd) | [octetStringFrame](#interfaces_util_octetstringframemd) | [contextSpecificFrame](#interfaces_util_contextspecificframemd) | [objectIdentifierFrame](#interfaces_util_objectidentifierframemd)*

Defined in util.ts:52

___

###  tagType

Ƭ **tagType**: *keyof typeof tag*

Defined in util.ts:18
