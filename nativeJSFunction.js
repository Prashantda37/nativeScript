'use strict';
// below link use for JWT token and access token in deffrent server as well
//https://www.youtube.com/watch?v=mbsmsi7l3r4

/*****************NATIVE forEACH*********************/

Array.prototype.myEach = function ( callback ) {
	for ( var i = 0;i < this.length;i++ )
		callback( this[ i ], i, this );
};

//tests
var arr = [ 'biggy smalls', 'bif tannin', 'boo radley', 'hans gruber' ];
arr.myEach( function (word) {
	console.log( word );
} );
//biggy smalls
//bif tannin
//boo radley
//hans gruber

/*****************NATIVE MAP*************************/

Array.prototype.myMap = function ( callback ) {
	arr = [];
	for ( var i = 0;i < this.length;i++ )
		arr.push( callback( this[ i ], i, this ) );
	return arr;
};

//tests
var arrs = [ 'dic tanin', 'boo radley', 'hans gruber' ];
var numbers2 = [ 1, 4, 9 ];

var goodT = arrs.myMap( function ( n ) {
	return n;
} );

var squareRoot = numbers2.myMap( function ( num ) {
	return Math.sqrt( num );
} );

console.log( goodT ); // [ 'dic tanin', 'boo radley', 'hans gruber' ]
console.log( squareRoot ); // [ 1, 2, 3 ]

/*****************NATIVE FILTER*************************/

Array.prototype.myFilter = function ( callback, context ) {
	arr = [];	
	for ( var i = 0;i < this.length;i++ ) {
		if ( callback.call( context, this[ i ], i, this ) )
			arr.push( this[ i ] );
	}
	return arr;
};

//tests
var numbers = [ 1, 20, 30, 80, 2, 9, 3 ];
var newNum = numbers.myFilter( function ( n ) {
	return n >= 10;
} );
console.log( newNum ); // [ 20, 30, 80 ]

/*****************NATIVE REDUCE*************************/


Array.prototype.myReduce = function ( callback, initialVal ) {
	var accumulator = ( initialVal === undefined ) ? undefined : initialVal;
	for ( var i = 0;i < this.length;i++ ) {
		if ( accumulator !== undefined )
			accumulator = callback.call( undefined, accumulator, this[ i ], i, this );
		else
			accumulator = this[ i ];
	}
	return accumulator;
};

//tests
var numbers3 = [ 20, 20, 2, 3 ];
var total = numbers3.myReduce( function ( a, b ) {
	return a + b;
}, 10 );
console.log( total ); // 55

var flattened = [
	[ 0, 1 ],
	[ 2, 3 ],
	[ 4, 5 ]
].reduce( function ( a, b ) {
	return a.concat( b );
} );
console.log( flattened ); //[ 0, 1, 2, 3, 4, 5 ]


/*****************NATIVE EVERY*************************/

Array.prototype.myEvery = function ( callback, context ) {
	for ( var i = 0;i < this.length;i++ ) {
		if ( !callback.call( context, this[ i ], i, this ) )
			return false;
	}
	return true;
};

//tests
var passed = [ 12, 5, 8, 130, 44 ].myEvery( function ( element ) {
	return ( element >= 10 );
} );
console.log( passed ); // false
passed = [ 12, 54, 18, 130, 44 ].myEvery( function ( element ) {
	return ( element >= 10 );
} );
console.log( passed ); // true

passed = [ 12, 54, 18, 130, 44 ].myEvery( function ( element ) {
	return ( element >= 13 );
} );
console.log( passed ); // false



/*****************NATIVE SOME*************************/

Array.prototype.mySome = function ( callback, context ) {
	for ( var i = 0;i < this.length;i++ ) {
		if ( callback.call( context, this[ i ], i, this ) )
			return true;
	}
	return false;
};

//tests
var passed = [ 12, 5, 8, 130, 44 ].mySome( function ( element ) {
	return ( element >= 200 );
} );
console.log( 'some: ' + passed ); //some: false

var passed = [ 12, 5, 8, 130, 44 ].mySome( function ( element ) {
	return ( element >= 100 );
} );
console.log( 'some: ' + passed ); //some: true

// get image dimention
export async function getImageWithDimensions (file) {
  const {
    contentType, type, preview, url,
  } = file;
  const clonedFile = new Blob([file], { type: contentType ?? type });
  Object.assign(clonedFile, file);
  clonedFile.preview = preview ?? url;
  const image = await loadImage(clonedFile.preview);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const { width, height } = image;
      Object.assign(clonedFile, {
        width,
        height,
        data: reader.result,
      });
      resolve(clonedFile);
    };
    reader.onerror = reject;
    reader.readAsDataURL(clonedFile);
  });
}
function loadImage (url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
} 

