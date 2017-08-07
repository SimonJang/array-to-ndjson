'use strict';
const streamify = require('stream-array');
const fs = require('fs');
const eol = require('os').EOL;

const stringifyItem = (item) => JSON.stringify(item);
const stringifyArray = (data) => {
	const result = [];

	for (const item of data) {
		result.push(stringifyItem(item), eol);
	}

	return result;
}

module.exports = (input, path, opts) => {
	const readStream = streamify(stringifyArray(input))
	return !path ? readStream : readStream.pipe(fs.createWriteStream(path));
};
