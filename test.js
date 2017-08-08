import test from 'ava';
import path from 'path';
import fs from 'fs';
import m from '.';
import * as tempy from 'tempy'

const getStream = require('get-stream');

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

const directory = tempy.directory()
const file = path.join(directory, 'test.json')

test.failing('should fail due to invalid arguments', async t => {
	const badArray1 = ['bla', 1];
	const badArray2 = [{ name: 'Smart Object', do: (item) => console.log(item)}]

	// t.throws(m(badArray1));
	// t.throws(m(badArray2));
	// t.throws(m(objects, 'foo/bad/path'))

})

test('should return a readstream of ndjson qualified objects', async t => {
	const arrayStream = m(objects)

	const result = await getStream.array(arrayStream);
	t.deepEqual(result, [
		'{"name":"Foo","value":1}',
		'\n',
		'{"name":"Bar","value":2}',
		'\n',
		'{"name":"Foobar","value":3}',
		'\n'
	]);
});

test('should write to a file when path is given', async t => {
	m(objects, file);

	t.true(fs.existsSync(file));

	const stream = fs.createReadStream(file);
	const result = await getStream(stream);

	t.deepEqual(result,
		`{"name":"Foo","value":1}\n{"name":"Bar","value":2}\n{"name":"Foobar","value":3}\n`
	);
});
