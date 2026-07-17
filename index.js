'use strict';
const streamify = require('stream-array');
const isObject = require('is-object');

const validate = item => isObject(item) && Object.keys(item).filter(key => typeof item[key] === 'function').length === 0;

const stringifyItem = item => {
	let serialized;
	try {
		if (!validate(item)) {
			throw new Error('Expected every item to be a JSON-serializable object');
		}

		serialized = JSON.stringify(item);
	} catch (error) {
		throw new Error('Expected every item to be a JSON-serializable object');
	}

	if (typeof serialized !== 'string') {
		throw new Error('Expected every item to be a JSON-serializable object');
	}

	return serialized;
};

const stringifyArray = data => {
	const result = [];
	for (const item of data) {
		result.push(stringifyItem(item), '\n');
	}

	return result;
};

module.exports = input => {
	if (!Array.isArray(input)) {
		throw new TypeError('Expected input to be an array of objects');
	}

	return streamify(stringifyArray(input));
};
