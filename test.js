import test from 'ava';
import m from '.';
import * as tempwrite from 'temp-write'

test('Testing output', t => {
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

	m(objects)
});
