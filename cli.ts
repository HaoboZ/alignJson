#! /usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import glob from 'glob';
import os from 'os';
import neatJSON from './neatJSON';

program
	.name( 'align JSON' )
	.description( 'Aligns and formats json files' )
	.argument( '<file>', 'file[s] to format' )
	.option( '-w, --wrap <number | boolean>', 'Maximum line width before wrapping. Use false to never wrap, true to always wrap', '80' )
	.option( '-i, --indent <string>', 'Whitespace used to indent each level when wrapping', '\t' )
	.option( '-n, --newline <string>', 'Newline character(s) to use when wrapping', os.EOL )
	.option( '-il, --indentLast', 'Indent the closing bracket/brace for arrays and objects' )
	.option( '--short', 'Put opening brackets on the same line as the first value, closing brackets on the same line as the last. This causes the indent and indent_last options to be ignored, instead basing indentation on array and object padding' )
	.option( '-s, --sort', 'Sort objects\' keys in alphabetical order (true), or supply a lambda for custom sorting' )
	.option( '-a, --aligned', 'When wrapping objects, line up the colons (per object)', true )
	.option( '--precision <number>', 'Decimal precision for non-integer numbers' )
	.option( '-p, --padding <number>', 'Number of spaces to put inside brackets for arrays and braces for objects' )
	.option( '-ap, --arrayPadding <number>', 'Number of spaces to put inside brackets for arrays', '1' )
	.option( '-op, --objectPadding <number>', 'Number of spaces to put inside braces for objects', '1' )
	.option( '-comma, --aroundComma <number>', 'Number of spaces to put before and after commas (for both arrays and objects)' )
	.option( '-bComma, --beforeComma <number>', 'Number of spaces to put before commas (for both arrays and objects)', '0' )
	.option( '-aComma, --afterComma <number>', 'Number of spaces to put after commas (for both arrays and objects)', '1' )
	.option( '-colon, --aroundColon <number>', 'Number of spaces before and after a colon' )
	.option( '-bColon, --beforeColon <number>', 'Number of spaces before a colon', '0' )
	.option( '-aColon, --afterColon <number>', 'Number of spaces after a colon', '1' );

program.parse();

const options = program.opts();

function specialChars( str ) {
	return str
		.replaceAll( '\\b', '\b' )
		.replaceAll( '\\f', '\f' )
		.replaceAll( '\\n', '\n' )
		.replaceAll( '\\r', '\r' )
		.replaceAll( '\\t', '\t' )
		.replaceAll( '\\v', '\v' );
}

if ( options.wrap ) {
	if ( options.wrap === 'true' )
		options.wrap = true;
	else if ( options.wrap === 'false' )
		options.wrap = false;
	else
		options.wrap = +options.wrap;
}
options.indent = specialChars( options.indent );
options.newline = specialChars( options.newline );
if ( options.precision ) options.precision = +options.precision;
if ( options.padding ) options.padding = +options.padding;
if ( options.arrayPadding ) options.arrayPadding = +options.arrayPadding;
if ( options.objectPadding ) options.objectPadding = +options.objectPadding;
if ( options.aroundComma ) options.aroundComma = +options.aroundComma;
if ( options.beforeComma ) options.beforeComma = +options.beforeComma;
if ( options.afterComma ) options.afterComma = +options.afterComma;
if ( options.aroundColon ) options.aroundColon = +options.aroundColon;
if ( options.beforeColon ) options.beforeColon = +options.beforeColon;
if ( options.afterColon ) options.afterColon = +options.afterColon;
if ( options.aroundColon1 ) options.aroundColon1 = +options.aroundColon1;
if ( options.beforeColon1 ) options.beforeColon1 = +options.beforeColon1;
if ( options.afterColon1 ) options.afterColon1 = +options.afterColon1;
if ( options.aroundColonN ) options.aroundColonN = +options.aroundColonN;
if ( options.beforeColonN ) options.beforeColonN = +options.beforeColonN;
if ( options.afterColonN ) options.afterColonN = +options.afterColonN;

for ( const search of program.args ) {
	const files = glob.sync( search, { dot: true } );
	
	for ( const filename of files ) {
		const file = fs.readFileSync( filename, { encoding: 'utf8' } ).toString();
		fs.writeFileSync( filename, neatJSON( JSON.parse( file ), options ) );
	}
}

