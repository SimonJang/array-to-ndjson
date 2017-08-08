const m = require('./index.js');
const fs = require('fs');
const zlib = require('zlib');

const objects = [
		{
			name: 'Foo',
			value: 1
		},
		{
			name: 'Bar',
			value: 2
		},
		{
			name: 'Foobar',
			value: 3
		}
	]

m(objects).pipe(fs.createWriteStream('demo.json'));
m(objects, 'demo2.json');
m(objects).pipe(zlib.createGzip()).pipe(fs.createWriteStream('demo.json.gz'));
