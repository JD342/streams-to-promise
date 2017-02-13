# [streams-to-promise][npm]

[![License][license-image]][license-url]
[![Build status][travis-image]][travis-url]

**Promises conclusion of multiple streams (readable or writable)**

Based on Ben Drucker's [`stream-to-promise`][stream-to-promise], it expands the functionality for multiple streams.

## Installation

```
npm install streams-to-promise
```

```js
var all = require('streams-to-promise');
var { all, race } = require('streams-to-promise');
```

## Examples

##### Promising conclusion of all streams

```js
var promiseAllStreams = require('streams-to-promise');

var stream1 = ...;
var stream2 = ...;
...
var streamN = ...;

promiseAllStreams(stream1, stream2, ..., streamN).then(function (results) {
    // results[0] -> streamed data from stream1
    // results[1] -> streamed data from stream2
    // ...
    // results[N-1] -> streamed data from streamN
});
```

##### Racing conclusion of streams

```js
var raceStreams = require('streams-to-promise').race;

var stream1 = ...;
var stream2 = ...;
...
var streamN = ...;

raceStreams(stream1, stream2, ..., streamN).then(function (result) {
    // result -> streamed data from stream that concluded first
});
```

##### Usage with Gulp

```js
...
var { all, race } = require('streams-to-promise');

gulp.task('mytask', () => {

    ...

    // Performs stream operations in parallel and promises its conclusion
    //
    return all(

        gulp.src(...)
            .pipe(...)
            .pipe(...),

        gulp.src(...)
            .pipe(...)
            .pipe(...),

        ...

    );

});
```

## API

##### `all([s1[, s2[, ...[, sN]]]])`

```js
var all = require('streams-to-promise');
var all = require('streams-to-promise').all;
```

 * `s1`, `s2`, ..., `sN`: [Readable][readable-stream], [Writable][writable-stream], [ReadStream][fs-read-stream], [WriteStream][fs-write-stream] streams

 * returns an [`any-promise`][any-promise] promise (defaults to an [ES6 Promise][es6-promise]) that, once all passed streams have concluded, will resolve an array with all the streamed data of each passed stream.

##### `race([s1[, s2[, ...[, sN]]]])`

```js
var race = require('streams-to-promise').race;
```

 * `s1`, `s2`, ..., `sN`: [Readable][readable-stream], [Writable][writable-stream], [ReadStream][fs-read-stream], [WriteStream][fs-write-stream] streams

 * returns an [`any-promise`][any-promise] promise (defaults to an [ES6 Promise][es6-promise]) that will resolve the streamed data of the passed stream that concludes first.

## License

  MIT

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[travis-image]: https://travis-ci.org/JD342/streams-to-promise.svg?branch=master
[travis-url]: https://travis-ci.org/JD342/streams-to-promise
[npm]: https://www.npmjs.com/package/streams-to-promise
[stream-to-promise]: https://www.npmjs.com/package/stream-to-promise
[readable-stream]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[writable-stream]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[fs-read-stream]: https://nodejs.org/api/fs.html#fs_class_fs_readstream
[fs-write-stream]: https://nodejs.org/api/fs.html#fs_class_fs_writestream
[any-promise]: https://www.npmjs.com/package/any-promise
[es6-promise]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
