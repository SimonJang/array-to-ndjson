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

Type: `Object[]`

Array of objects that you want to convert to NDJSON format.

## License

MIT © [Simon](https://github.com/SimonJang)
