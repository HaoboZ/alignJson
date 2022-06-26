# Align JSON

A completely configurable json aligning tool.

## Installation

`npm install alignjson` or `npx alignjson`

## Quick Start

`npx alignjson file.json`

```javascript
import alignJson from 'alignjson';

console.log( alignJson( { a: [ 1, 2, 3 ] }, { wrap: true } ) );
/*
{
	"a": [
		1,
		2,
		3
	]
}
 */
```

## Options

`alignjson --help`

```
-w, --wrap <number | boolean>      Maximum line width before wrapping. Use false to never wrap, true to always wrap
-i, --indent <string>              Whitespace used to indent each level when wrapping
-n, --newline <string>             Newline character(s) to use when wrapping
-il, --indentLast                  Indent the closing bracket/brace for arrays and objects
--short                            Put opening brackets on the same line as the first value, closing brackets on the same line as the last. This causes the indent and indent_last options to be ignored, instead basing indentation on array and object padding
-s, --sort                         Sort objects' keys in alphabetical order (true), or supply a lambda for custom sorting
-a, --aligned                      When wrapping objects, line up the colons (per object)
--precision <number>               Decimal precision for non-integer numbers
-p, --padding <number>             Number of spaces to put inside brackets for arrays and braces for objects
-ap, --arrayPadding <number>       Number of spaces to put inside brackets for arrays
-op, --objectPadding <number>      Number of spaces to put inside braces for objects
-comma, --aroundComma <number>     Number of spaces to put before and after commas (for both arrays and objects
-bComma, --beforeComma <number>    Number of spaces to put before commas (for both arrays and objects)
-aComma, --afterComma <number>     Number of spaces to put after commas (for both arrays and objects)
-colon, --aroundColon <number>     Number of spaces before and after a colon
-bColon, --beforeColon <number>    Number of spaces before a colon
-aColon, --afterColon <number>     Number of spaces after a colon
```
