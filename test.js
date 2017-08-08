import test from 'ava';
import m from '.';

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
];

test('should fail due to invalid arguments', t => {
	const someFunction = item => console.log(item);
	const badArray1 = ['bla', 1];
	const badArray2 = [{name: 'Smart Object', do: someFunction}];

	t.throws(() => m(badArray1), Error);
	t.throws(() => m(badArray2), Error);
});

test('should return a readstream of ndjson qualified objects', async t => {
	const arrayStream = m(objects);

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
