'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const arrayToNdjson = require('./');

const collect = stream => new Promise((resolve, reject) => {
	const chunks = [];
	stream.on('data', chunk => chunks.push(chunk));
	stream.on('end', () => resolve(chunks));
	stream.on('error', reject);
});

test('rejects input that is not an array', () => {
	assert.throws(() => arrayToNdjson(null), {
		name: 'TypeError',
		message: 'Expected input to be an array of objects'
	});
});

test('rejects array items that are not serializable objects', () => {
	const someFunction = item => console.log(item);
	const undefinedJson = Object.create({toJSON: () => undefined});
	undefinedJson.name = 'Invalid JSON object';
	const throwingGetter = {};
	Object.defineProperty(throwingGetter, 'value', {
		enumerable: true,
		get: () => {
			throw new Error('getter failure must not leak');
		}
	});

	assert.throws(() => arrayToNdjson(['bla', 1]), {
		message: 'Expected every item to be a JSON-serializable object'
	});
	assert.throws(() => arrayToNdjson([{name: 'Smart Object', do: someFunction}]), {
		message: 'Expected every item to be a JSON-serializable object'
	});
	assert.throws(() => arrayToNdjson([undefinedJson]), {
		message: 'Expected every item to be a JSON-serializable object'
	});
	assert.throws(() => arrayToNdjson([throwingGetter]), {
		message: 'Expected every item to be a JSON-serializable object'
	});
});

test('normalizes exceptions from array element getters', () => {
	const input = Object.defineProperty([], '0', {
		get: () => {
			throw new RangeError('array element failure must not leak');
		}
	});

	assert.throws(() => arrayToNdjson(input), {
		name: 'Error',
		message: 'Expected every item to be a JSON-serializable object'
	});
});

test('normalizes non-Error exceptions from array iterators', () => {
	const input = [{}];
	input[Symbol.iterator] = () => {
		throw 'iterator failure must not leak';
	};

	assert.throws(() => arrayToNdjson(input), {
		name: 'Error',
		message: 'Expected every item to be a JSON-serializable object'
	});
});

test('returns an empty stream for an empty array', async () => {
	assert.deepEqual(await collect(arrayToNdjson([])), []);
});

test('returns a readable stream of NDJSON objects', async () => {
	const objects = [
		{name: 'Foo', value: 1},
		{name: 'Bar', value: 2},
		{name: 'Foobar', value: 3}
	];

	assert.deepEqual(await collect(arrayToNdjson(objects)), [
		'{"name":"Foo","value":1}',
		'\n',
		'{"name":"Bar","value":2}',
		'\n',
		'{"name":"Foobar","value":3}',
		'\n'
	]);
});
