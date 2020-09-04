
<a name="readmemd"></a>

[asn1-pharser](#globalsmd)

# asn1-pharser



<a name="classes_asn1_asn1md"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md) › [ASN1](#classes_asn1_asn1md)

# Class: ASN1

## Hierarchy

* **ASN1**

## Index

### Methods

* [decode](#decode)

## Methods

###  decode

▸ **decode**(`encoding`: Buffer): *void*

Defined in asn1.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | Buffer |

**Returns:** *void*


<a name="enums_asn1_formmd"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md) › [form](#enums_asn1_formmd)

# Enumeration: form

## Index

### Enumeration members

* [Constructed](#constructed)
* [Primitive](#primitive)

## Enumeration members

###  Constructed

• **Constructed**: = 32

Defined in asn1.ts:19

___

###  Primitive

• **Primitive**: = 0

Defined in asn1.ts:18


<a name="enums_asn1_tagclassmd"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md) › [tagClass](#enums_asn1_tagclassmd)

# Enumeration: tagClass

## Index

### Enumeration members

* [Application](#application)
* [Context-specific](#context-specific)
* [Private](#private)
* [Universal](#universal)

## Enumeration members

###  Application

• **Application**: = 64

Defined in asn1.ts:10

___

###  Context-specific

• **Context-specific**: = 128

Defined in asn1.ts:11

___

###  Private

• **Private**: = 192

Defined in asn1.ts:12

___

###  Universal

• **Universal**: = 0

Defined in asn1.ts:9


<a name="globalsmd"></a>

[asn1-pharser](#globalsmd)

# asn1-pharser

## Index

### Modules

* ["asn1"](#modules_asn1_md)


<a name="modules_asn1_md"></a>

[asn1-pharser](#globalsmd) › ["asn1"](#modules_asn1_md)

# Module: "asn1"

## Index

### Enumerations

* [form](#enums_asn1_formmd)
* [tagClass](#enums_asn1_tagclassmd)

### Classes

* [ASN1](#classes_asn1_asn1md)

### Type aliases

* [formType](#formtype)
* [tagClassType](#tagclasstype)

## Type aliases

###  formType

Ƭ **formType**: *"Primitive" | "Constructed"*

Defined in asn1.ts:15

___

###  tagClassType

Ƭ **tagClassType**: *"Universal" | "Application" | "Context-specific" | "Private"*

Defined in asn1.ts:3
