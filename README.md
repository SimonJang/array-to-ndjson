# array-to-ndjson [![CI](https://github.com/SimonJang/array-to-ndjson/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/SimonJang/array-to-ndjson/actions/workflows/ci.yml?query=branch%3Amaster+event%3Apush)

> Convert an array of objects to a stream of [ndjson](http://ndjson.org/) data.


## Install

```
$ npm install array-to-ndjson
```


## Usage

```js
const arrayToNdjson = require('array-to-ndjson');

arrayToNdjson([{name: 'Foo', value: 10}]);
	// => Readable Stream


// Example piping the stream

arrayToNdjson([{name: 'Foo', value: 10}, {name: 'Bar', value: 9}])
	.pipe(fs.createWriteStream('foo.json'))
	// => File will contain:
	//
	// {"name":"Foo","value":10}
	// {"name":"Bar","value":9}

```

## API

### arrayToNdjson(input)

#### input

Type: `Iterable<Object>`

An iterable of objects that you want to convert to NDJSON format, including arrays, Sets, and generators. Items are consumed synchronously in iteration order before the stream is returned.

Non-iterable input, invalid items, or errors while reading or serializing them throw a synchronous `Error` with the message `Expected every item to be a JSON-serializable object`. The converter does not log these errors.

## License

MIT © [Simon](https://github.com/SimonJang)
