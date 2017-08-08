'use strict';
const streamify = require('stream-array');
const fs = require('fs');
const path = require('path');
const eol = require('os').EOL;
const isObject = require('is-object');

const validate = item => isObject(item) && Object.keys(item).filter(key => typeof key === 'function').length === 0

const stringifyItem = item => JSON.stringify(item);

const stringifyArray = data => {
	const result = [];
	for (const item of data) {
		if (!validate(item)) throw new Error('Not an object or invalid to parse to JSON');
		result.push(stringifyItem(item), eol)
	}

	return result;
}

module.exports = (input, dest) => {
	try {
		const readStream = streamify(stringifyArray(input))

		return !dest ? readStream : readStream.pipe(fs.createWriteStream(dest));
	} catch(err) {
		console.error('Something clearly went wrong in array-to-ndjson', err);
		throw new Error();
	}
};
