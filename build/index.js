var Promise = require('any-promise');
var promiseStream = require('stream-to-promise');

module.exports = all;
module.exports.all = all;
module.exports.race = race;

function all() {
    for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
    }

    return Promise.all(streams.map(promiseStream));
}

function race() {
    for (var _len2 = arguments.length, streams = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        streams[_key2] = arguments[_key2];
    }

    return Promise.race(streams.map(promiseStream));
}
