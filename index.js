'use strict';
const streamify = require('stream-array');
const isObject = require('is-object');

const validate = item => isObject(item) && Object.keys(item).filter(key => typeof item[key] === 'function').length === 0;

const stringifyItem = item => JSON.stringify(item);

const stringifyArray = data => {
	const result = [];
	for (const item of data) {
		if (!validate(item)) {
			throw new Error('Not an object or invalid to parse to JSON');
		}

		result.push(stringifyItem(item), '\n');
	}

	return result;
};

module.exports = input => {
	try {
		return streamify(stringifyArray(input));
	} catch (err) {
		console.error('Something clearly went wrong in array-to-ndjson', err);
		throw new Error();
	}
};
