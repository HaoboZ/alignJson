export default function specialChars( str ) {
	return str
		.replaceAll( '\\b', '\b' )
		.replaceAll( '\\f', '\f' )
		.replaceAll( '\\n', '\n' )
		.replaceAll( '\\r', '\r' )
		.replaceAll( '\\t', '\t' )
		.replaceAll( '\\v', '\v' );
}
