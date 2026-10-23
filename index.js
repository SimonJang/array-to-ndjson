'use strict';
const streamify = require('stream-array');
const isObject = require('is-object');

const validate = item => isObject(item) && Object.keys(item).filter(key => typeof item[key] === 'function').length === 0;

const stringifyItem = item => {
	if (!validate(item)) {
		throw new Error('Expected every item to be a JSON-serializable object');
	}

	const serialized = JSON.stringify(item);
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
	try {
		return streamify(stringifyArray(input));
	} catch (error) {
		throw new Error('Expected every item to be a JSON-serializable object');
	}
};
