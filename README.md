# [streams-to-promise][npm]

[![License][license-image]][license-url]
[![Build status][travis-image]][travis-url]

Based on Ben Drucker's [`stream-to-promise`][stream-to-promise], promises conclusion of multiple streams (readable or writable).

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

## License

  MIT

[license-image]:     https://img.shields.io/badge/license-MIT-blue.svg
[license-url]:       LICENSE
[travis-image]:      https://travis-ci.org/JD342/streams-to-promise.svg?branch=master
[travis-url]:        https://travis-ci.org/JD342/streams-to-promise
[npm]:               https://www.npmjs.com/package/streams-to-promise
[stream-to-promise]: https://www.npmjs.com/package/stream-to-promise
