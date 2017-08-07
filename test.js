import test from 'ava';
import path from 'path';
import fs from 'fs';
import m from '.';
import * as tempy from 'tempy'
import * as getStream from 'get-stream'

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

test('should return a readstream', async t => {

	const directory = tempy.directory()
	const writeStream = fs.createWriteStream(path.join(directory, 'test.json'), { defaultEncoding: 'utf-8' });
	const arrayStream = m(objects)
	arrayStream.pipe(writeStream);

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

test('should write to a file', async t => {
	const directory = tempy.directory()
	const file = path.join(directory, 'test.json')

	const writeStream = fs.createWriteStream(file, { defaultEncoding: 'utf-8' });
	m(objects, file);

	t.true(fs.existsSync(file));
	const result = await getStream.array(fs.createReadStream(file))
	t.deepEqual(result, [
		'{"name":"Foo","value":1}',
		'\n',
		'{"name":"Bar","value":2}',
		'\n',
		'{"name":"Foobar","value":3}',
		'\n'
	]);
})
