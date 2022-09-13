#! /usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import glob from 'fast-glob';
import os from 'os';
import alignJson from './alignJson';
import specialChars from './specialChars';

const packagejson = require( '../package.json' );

program
	.name( packagejson.name )
	.description( packagejson.description )
	.version( packagejson.version )
	.argument( '<file>', 'file[s] to format' )
	.option( '-w, --wrap <number | boolean>', 'Maximum line width before wrapping. Use false to never wrap, true to always wrap', ( value ) => {
		if ( value ) {
			if ( value === 'true' )
				return true;
			else if ( value === 'false' )
				return false;
			else
				return +value;
		}
	}, 80 )
	.option( '-i, --indent <string>', 'Whitespace used to indent each level when wrapping', specialChars, '\t' )
	.option( '-n, --newline <string>', 'Newline character(s) to use when wrapping', specialChars, os.EOL )
	.option( '-il, --indentLast', 'Indent the closing bracket/brace for arrays and objects' )
	.option( '--short', 'Put opening brackets on the same line as the first value, closing brackets on the same line as the last. This causes the indent and indent_last options to be ignored, instead basing indentation on array and object padding' )
	.option( '-s, --sort', 'Sort objects\' keys in alphabetical order (true), or supply a lambda for custom sorting' )
	.option( '-a, --aligned', 'When wrapping objects, line up the colons (per object)', true )
	.option( '--precision <number>', 'Decimal precision for non-integer numbers', Number )
	.option( '-p, --padding <number>', 'Number of spaces to put inside brackets for arrays and braces for objects', Number )
	.option( '-ap, --arrayPadding <number>', 'Number of spaces to put inside brackets for arrays', Number, 1 )
	.option( '-op, --objectPadding <number>', 'Number of spaces to put inside braces for objects', Number, 1 )
	.option( '-comma, --aroundComma <number>', 'Number of spaces to put before and after commas (for both arrays and objects)', Number )
	.option( '-bComma, --beforeComma <number>', 'Number of spaces to put before commas (for both arrays and objects)', Number, 0 )
	.option( '-aComma, --afterComma <number>', 'Number of spaces to put after commas (for both arrays and objects)', Number, 1 )
	.option( '-colon, --aroundColon <number>', 'Number of spaces before and after a colon', Number )
	.option( '-bColon, --beforeColon <number>', 'Number of spaces before a colon', Number, 0 )
	.option( '-aColon, --afterColon <number>', 'Number of spaces after a colon', Number, 1 );

program.parse();

const options = program.opts();

for ( const search of program.args ) {
	const files = glob.sync( search, { dot: true, ignore: [ '**/node_modules/**' ] } );
	
	for ( const filename of files ) {
		try {
			const file = fs.readFileSync( filename, { encoding: 'utf8' } ).toString();
			fs.writeFileSync( filename, alignJson( JSON.parse( file ), options ) );
		} catch {
		}
	}
}
